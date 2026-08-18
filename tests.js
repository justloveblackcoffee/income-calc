/* Validation cases for policy matching and annual aggregation. Run: node tests.js */
const DATA = require('./policy-data.js');
const E = require('./calc-engine.js');

let failures = 0;
function check(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) {
    failures++;
    console.error(`FAIL ${name}\n  expected: ${JSON.stringify(expected)}\n  actual:   ${JSON.stringify(actual)}`);
  } else {
    console.log(`ok   ${name}`);
  }
}

/* Quick deductions must be derivable from the brackets alone. */
check('quick deductions match the statutory table',
  E.quickDeductions(DATA.taxBrackets),
  [0, 2520, 16920, 31920, 52920, 85920, 181920]);

/* A calendar year spans two Shanghai policy periods. */
check('2026-06 uses the 2025.7-2026.6 period',
  E.resolvePeriod('shanghai', 202606).period.from, 202507);
check('2026-07 switches to the 2026.7-2027.6 period',
  E.resolvePeriod('shanghai', 202607).period.from, 202607);
check('Shanghai 2026 months are official, not carried over',
  E.buildYearPlan('shanghai', 2026, { monthlySalary: 20000 }).every(m => m.official && !m.carried), true);

/* Huzhou has no 2026 configuration yet, so every month carries the 2025 data forward. */
const huzhou = E.buildYearPlan('huzhou_flexible', 2026, { monthlySalary: 20000 });
check('Huzhou 2026 falls back to the 2025 period', huzhou.every(m => m.carried && m.period.from === 202501), true);
check('Huzhou pension base defaults to the lower limit', huzhou[0].bases.pension.value, 4986);
check('Huzhou medical base is fixed and not editable',
  [huzhou[0].bases.medical.value, huzhou[0].bases.medical.editable], [4986, false]);

/* Documented monthly minimums for Huzhou flexible employment. */
const huzhouAnnual = E.computeAnnualContributions(huzhou, { monthlySalary: 20000 });
check('Huzhou pension is 997.20 a month', E.round2(huzhouAnnual.items.pension.employeeAnnual / 12), 997.2);
check('Huzhou medical is 473.67 a month', E.round2(huzhouAnnual.items.medical.employeeAnnual / 12), 473.67);
check('Huzhou housing fund defaults to zero', huzhouAnnual.items.housing_fund.employeeAnnual, 0);

/* Self-determined housing fund deposits are capped per month and fully deductible. */
const huzhouWithHf = E.buildYearPlan('huzhou_flexible', 2026, {
  monthlySalary: 20000,
  amountOverrides: { '202601:housing_fund': 60000, '202602:housing_fund': 3000 }
});
check('deposit above 50,000 is clamped and flagged',
  [huzhouWithHf[0].amounts.housing_fund.value, huzhouWithHf[0].amounts.housing_fund.adjusted], [50000, true]);
const huzhouHfAnnual = E.computeAnnualContributions(huzhouWithHf, { monthlySalary: 20000 });
check('deposits sum across months', huzhouHfAnnual.items.housing_fund.employeeAnnual, 53000);
check('deductible amount equals the deposited amount', huzhouHfAnnual.items.housing_fund.deductibleAnnual, 53000);

/* Shanghai flexible employment defaults: social insurance at the floor, housing fund at the ceiling. */
const shFlex = E.buildYearPlan('shanghai_flexible', 2026, { monthlySalary: 20000 });
check('flexible social insurance base defaults to the lower limit',
  [shFlex[0].bases.si.value, shFlex[6].bases.si.value], [7460, 7546]);
check('flexible housing fund base defaults to the upper limit',
  [shFlex[0].bases.hf.value, shFlex[6].bases.hf.value], [37302, 37731]);

/* An override applies to one month only and is re-validated against that month's range. */
const shFlexOverride = E.buildYearPlan('shanghai_flexible', 2026, {
  monthlySalary: 20000,
  baseOverrides: { '202601:si': 10000, '202607:si': 100 }
});
check('override applies to its own month only',
  [shFlexOverride[0].bases.si.value, shFlexOverride[1].bases.si.value], [10000, 7460]);
check('out-of-range override is clamped and flagged',
  [shFlexOverride[6].bases.si.value, shFlexOverride[6].bases.si.adjusted], [7546, true]);

/* Annual totals must be summed month by month, not one month multiplied by twelve. */
const shPlan = E.buildYearPlan('shanghai', 2026, { monthlySalary: 40000 });
const shAnnual = E.computeAnnualContributions(shPlan, { monthlySalary: 40000 });
const janPension = E.round2(37302 * 0.08);
const julPension = E.round2(37731 * 0.08);
check('pension sums the two policy periods',
  shAnnual.items.pension.employeeAnnual, E.round2(janPension * 6 + julPension * 6));
check('one month x 12 would have been wrong', shAnnual.items.pension.employeeAnnual !== E.round2(janPension * 12), true);
check('rate segments collapse to one range when unchanged',
  shAnnual.items.pension.segments.length, 1);

/* Editable rates stay within the configured range. */
const shRates = E.computeAnnualContributions(shPlan, {
  monthlySalary: 40000,
  rateOverrides: { housing_fund: { employer: 0.05, employee: 0.05 }, supplementary_housing: { employee: 0.99 } }
});
check('housing fund rate override is applied',
  shRates.items.housing_fund.employeeAnnual, E.round2(E.round2(37302 * 0.05) * 6 + E.round2(37731 * 0.05) * 6));
check('rate above the allowed range is clamped',
  shRates.items.supplementary_housing.employeeAnnual, E.round2(E.round2(37302 * 0.06) * 6 + E.round2(37731 * 0.06) * 6));

/* Income categories drive expenses and the tax-exempt part of author's remuneration. */
check('salary has no expense deduction', E.incomeAdjustments('salary', 100000), { expenses: 0, taxExemptIncome: 0 });
check('labor remuneration deducts 20% as expenses',
  E.incomeAdjustments('labor', 100000), { expenses: 20000, taxExemptIncome: 0 });
check('royalties deduct 20% as expenses',
  E.incomeAdjustments('royalty', 100000), { expenses: 20000, taxExemptIncome: 0 });
check("author's remuneration exempts 30% of the amount after expenses",
  E.incomeAdjustments('author', 100000), { expenses: 20000, taxExemptIncome: 24000 });
check("author's remuneration leaves 56% of the income taxable", (() => {
  const a = E.incomeAdjustments('author', 100000);
  return E.round2(100000 - a.expenses - a.taxExemptIncome);
})(), 56000);

/* Annual comprehensive income tax. */
const tax = E.computeAnnualTax({
  annualIncome: 480000,
  specialDeductions: 100000,
  additionalDeductions: 24000
});
check('taxable income subtracts the 60,000 standard deduction and all deductions',
  tax.taxableIncome, 296000);
check('tax uses the annual rate and derived quick deduction',
  [tax.rate, tax.quickDeduction, tax.tax], [0.2, 16920, E.round2(296000 * 0.2 - 16920)]);
check('taxable income never goes below zero',
  E.computeAnnualTax({ annualIncome: 30000 }).taxableIncome, 0);
check('zero taxable income produces zero tax',
  E.computeAnnualTax({ annualIncome: 30000 }).tax, 0);

console.log(failures ? `\n${failures} failing` : '\nall passing');
process.exit(failures ? 1 : 0);
