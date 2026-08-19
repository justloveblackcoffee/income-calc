/*
 * Calculation engine: month-by-month policy matching, monthly contribution bases,
 * annual aggregation and annual comprehensive income tax.
 * Pure functions only, so the same code runs in the browser and under node for tests.
 */
(function (root, factory) {
  const engine = factory(
    typeof module !== 'undefined' && module.exports ? require('./policy-data.js') : root.POLICY_DATA
  );
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = engine;
  } else {
    root.CalcEngine = engine;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (POLICY_DATA) {

  const MONTHS = 12;

  function round2(n) {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }

  function ym(year, month) {
    return year * 100 + month;
  }

  /* Quick deductions are derived from the bracket thresholds, never stored twice. */
  function quickDeductions(brackets) {
    const out = [0];
    for (let i = 1; i < brackets.length; i++) {
      out.push(round2(out[i - 1] + (brackets[i].rate - brackets[i - 1].rate) * brackets[i - 1].upTo));
    }
    return out;
  }

  function computeTax(taxableIncome, data) {
    const brackets = (data || POLICY_DATA).taxBrackets;
    const qd = quickDeductions(brackets);
    const taxable = Math.max(taxableIncome, 0);
    const idx = brackets.findIndex(b => taxable <= b.upTo);
    const rate = brackets[idx].rate;
    const quickDeduction = qd[idx];
    return {
      taxableIncome: taxable,
      rate,
      quickDeduction,
      tax: round2(Math.max(taxable * rate - quickDeduction, 0))
    };
  }

  /*
   * Resolve the policy period covering a given month. When no official period covers it,
   * fall back to the most recent earlier period and flag the result as carried over.
   */
  function resolvePeriod(profileKey, targetYm, data) {
    const periods = (data || POLICY_DATA).periods[profileKey] || [];
    if (!periods.length) return null;
    const exact = periods.find(p => targetYm >= p.from && targetYm <= p.to);
    if (exact) return { period: exact, carried: false };
    const earlier = periods.filter(p => p.to < targetYm).sort((a, b) => b.to - a.to)[0];
    if (earlier) return { period: earlier, carried: true };
    const later = periods.slice().sort((a, b) => a.from - b.from)[0];
    return { period: later, carried: true };
  }

  function defaultBase(group, monthlySalary) {
    switch (group.defaultRule) {
      case 'lower': return group.lower;
      case 'upper': return group.upper;
      case 'salary_capped': return Math.min(Math.max(monthlySalary, group.lower), group.upper);
      default: return group.lower;
    }
  }

  function clamp(value, lower, upper) {
    return Math.min(Math.max(value, lower), upper);
  }

  /*
   * Build the 12 months of a calendar year: resolved period, base per base group and
   * self-determined deposit amounts, with user overrides validated against that month.
   */
  function buildYearPlan(profileKey, year, options, data) {
    const opts = options || {};
    const monthlySalary = opts.monthlySalary || 0;
    const baseOverrides = opts.baseOverrides || {};
    const amountOverrides = opts.amountOverrides || {};
    const months = [];

    for (let m = 1; m <= MONTHS; m++) {
      const key = ym(year, m);
      const resolved = resolvePeriod(profileKey, key, data);
      if (!resolved) return months;
      const period = resolved.period;
      const bases = {};

      Object.keys(period.baseGroups || {}).forEach(groupKey => {
        const group = period.baseGroups[groupKey];
        const fallback = defaultBase(group, monthlySalary);
        const override = baseOverrides[key + ':' + groupKey];
        let value = fallback;
        let custom = false;
        let adjusted = false;
        if (group.editable && override !== undefined && override !== null && override !== '') {
          const raw = Number(override);
          if (!Number.isNaN(raw)) {
            value = clamp(raw, group.lower, group.upper);
            custom = true;
            adjusted = value !== raw;
          }
        }
        bases[groupKey] = {
          value: round2(value),
          lower: group.lower,
          upper: group.upper,
          editable: !!group.editable,
          defaultValue: round2(fallback),
          custom,
          adjusted
        };
      });

      const amounts = {};
      Object.keys(period.items || {}).forEach(itemKey => {
        const item = period.items[itemKey];
        if (item.mode !== 'monthly_amount' || item.applicable === false) return;
        const max = item.maxMonthlyAmount !== undefined ? item.maxMonthlyAmount : Infinity;
        const fallback = item.defaultMonthlyAmount || 0;
        const override = amountOverrides[key + ':' + itemKey];
        let value = fallback;
        let custom = false;
        let adjusted = false;
        if (override !== undefined && override !== null && override !== '') {
          const raw = Number(override);
          if (!Number.isNaN(raw)) {
            value = clamp(raw, 0, max);
            custom = true;
            adjusted = value !== raw;
          }
        }
        amounts[itemKey] = { value: round2(value), max, defaultValue: fallback, custom, adjusted };
      });

      months.push({
        month: m,
        ym: key,
        period,
        carried: resolved.carried,
        official: !!period.official && !resolved.carried,
        source: period.source,
        bases,
        amounts
      });
    }
    return months;
  }

  function effectiveRates(item, itemKey, rateOverrides) {
    const override = (rateOverrides || {})[itemKey];
    let employer = item.employerRate || 0;
    let employee = item.employeeRate || 0;
    if (item.rateEditable && override) {
      if (override.employer !== undefined && override.employer !== null && override.employer !== '') {
        employer = Number(override.employer);
      }
      if (override.employee !== undefined && override.employee !== null && override.employee !== '') {
        employee = Number(override.employee);
      }
      if (item.rateRange) {
        employer = clamp(employer, item.rateRange[0], item.rateRange[1]);
        employee = clamp(employee, item.rateRange[0], item.rateRange[1]);
      }
    }
    return { employer, employee };
  }

  /* Annual amounts are always the sum of the twelve monthly amounts, never one month x 12. */
  function computeAnnualContributions(plan, options, data) {
    const opts = options || {};
    const monthlySalary = opts.monthlySalary || 0;
    const rateOverrides = opts.rateOverrides || {};
    const itemOrder = (data || POLICY_DATA).itemOrder;
    const results = {};

    itemOrder.forEach(itemKey => {
      const segments = [];
      let employerAnnual = 0;
      let employeeAnnual = 0;
      let deductibleAnnual = 0;
      let applicable = false;
      let mode = null;
      let sampleItem = null;

      plan.forEach(monthEntry => {
        const item = (monthEntry.period.items || {})[itemKey];
        if (!item || item.applicable === false) return;
        applicable = true;
        sampleItem = item;
        mode = item.mode || 'rate';

        if (item.mode === 'employer_annual_amount') {
          const annual = opts.commercialAnnualAmount !== undefined
            ? Number(opts.commercialAnnualAmount) || 0
            : (item.employerAnnualAmount || 0);
          employerAnnual += round2(annual / MONTHS);
          return;
        }

        let base;
        if (item.mode === 'monthly_amount') {
          base = (monthEntry.amounts[itemKey] || { value: 0 }).value;
          const amount = round2(base);
          employeeAnnual += amount;
          /* Deposits may legally exceed what tax rules allow to be deducted (e.g. Huzhou). */
          const deductibleCap = item.maxDeductibleMonthlyAmount;
          if (item.deductible) {
            deductibleAnnual += deductibleCap === undefined ? amount : Math.min(amount, deductibleCap);
          }
          segments.push({ month: monthEntry.month, employer: 0, employee: null, amount });
          return;
        }

        if (item.baseGroup === 'salary') {
          base = monthlySalary;
        } else {
          base = (monthEntry.bases[item.baseGroup] || { value: 0 }).value;
        }

        const rates = effectiveRates(item, itemKey, rateOverrides);
        const employerAmt = round2(base * rates.employer);
        const employeeAmt = round2(base * rates.employee);
        employerAnnual += employerAmt;
        employeeAnnual += employeeAmt;
        if (item.deductible) deductibleAnnual += employeeAmt;
        segments.push({ month: monthEntry.month, employer: rates.employer, employee: rates.employee });
      });

      results[itemKey] = {
        applicable,
        mode,
        item: sampleItem,
        employerAnnual: round2(employerAnnual),
        employeeAnnual: round2(employeeAnnual),
        deductibleAnnual: round2(deductibleAnnual),
        segments: collapseSegments(segments)
      };
    });

    const totals = itemOrder.reduce((acc, key) => {
      acc.employerAnnual = round2(acc.employerAnnual + results[key].employerAnnual);
      acc.employeeAnnual = round2(acc.employeeAnnual + results[key].employeeAnnual);
      acc.deductibleAnnual = round2(acc.deductibleAnnual + results[key].deductibleAnnual);
      return acc;
    }, { employerAnnual: 0, employeeAnnual: 0, deductibleAnnual: 0 });

    return { items: results, totals };
  }

  /* Collapse consecutive months sharing the same rates, so mid-year changes show as ranges. */
  function collapseSegments(segments) {
    const out = [];
    segments.forEach(seg => {
      const last = out[out.length - 1];
      if (last && last.employer === seg.employer && last.employee === seg.employee && seg.employee !== null) {
        last.toMonth = seg.month;
      } else if (seg.employee !== null) {
        out.push({ fromMonth: seg.month, toMonth: seg.month, employer: seg.employer, employee: seg.employee });
      }
    });
    return out;
  }

  /*
   * Comprehensive income categories. Salary is taxed on the full amount; the other three
   * deduct 20% as expenses, and author's remuneration exempts a further 30% of what remains.
   */
  const INCOME_CATEGORIES = {
    salary: { expenseRate: 0, exemptRate: 0 },
    labor: { expenseRate: 0.2, exemptRate: 0 },
    author: { expenseRate: 0.2, exemptRate: 0.3 },
    royalty: { expenseRate: 0.2, exemptRate: 0 }
  };

  function incomeAdjustments(category, annualIncome) {
    const rules = INCOME_CATEGORIES[category] || INCOME_CATEGORIES.salary;
    const income = annualIncome || 0;
    const expenses = round2(income * rules.expenseRate);
    return {
      expenses,
      taxExemptIncome: round2((income - expenses) * rules.exemptRate)
    };
  }

  /*
   * Annual comprehensive income:
   *   taxable = income - expenses - tax-exempt income - standard deduction
   *             - special deductions - additional special deductions - other deductions
   */
  function computeAnnualTax(input, data) {
    const cfg = data || POLICY_DATA;
    const income = input.annualIncome || 0;
    const deductionsTotal =
      (input.expenses || 0) +
      (input.taxExemptIncome || 0) +
      cfg.annualStandardDeduction +
      (input.specialDeductions || 0) +
      (input.additionalDeductions || 0) +
      (input.otherDeductions || 0);
    const result = computeTax(round2(income - deductionsTotal), cfg);
    result.deductionsTotal = round2(deductionsTotal);
    result.standardDeduction = cfg.annualStandardDeduction;
    return result;
  }

  return {
    MONTHS,
    round2,
    ym,
    quickDeductions,
    computeTax,
    INCOME_CATEGORIES,
    incomeAdjustments,
    resolvePeriod,
    buildYearPlan,
    effectiveRates,
    computeAnnualContributions,
    computeAnnualTax
  };
});
