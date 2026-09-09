/* UI layer: bilingual rendering, user overrides and wiring to the calculation engine. */
(function () {
  const DATA = window.POLICY_DATA;
  const E = window.CalcEngine;

  const translations = {
    en: {
      pageTitle: 'China Annual Income, Benefit & Tax Calculator',
      langLabel: 'Language / 语言:',
      inputHeader: 'Input',
      resultsHeader: 'Annual Results',
      labelCity: 'City & Employment Type',
      labelYear: 'Calculation Year',
      secSalary: 'Salary & Exchange Rate',
      labelExchangeRate: 'Exchange Rate (USD→CNY)',
      refreshRate: 'Refresh',
      labelSalaryUSD: 'Monthly Salary (USD)',
      labelSalaryRMB: 'Monthly Salary (CNY)',
      labelAnnualUSD: 'Annual Salary (USD, calculated)',
      labelAnnualRMB: 'Annual Salary (CNY, calculated)',
      labelIncomeUSD: 'Monthly Income (USD)',
      labelIncomeRMB: 'Monthly Income (CNY)',
      labelAnnualIncomeUSD: 'Annual Income (USD, calculated)',
      labelAnnualIncomeRMB: 'Annual Income (CNY, calculated)',
      annualReadonlyHint: 'The annual total is the monthly amount × 12 and cannot be edited directly.',
      labelIncomeCategory: 'Income Category',
      catSalary: 'Salary and wages',
      catLabor: 'Labor remuneration',
      catAuthor: "Author's remuneration",
      catRoyalty: 'Royalties',
      incomeCategoryHint: 'The category determines the expense deduction and the tax-exempt part. Salary and wages have neither.',
      expensesHintSalary: 'Salary and wages have no expense deduction.',
      expensesHintOther: '(labor remuneration + author’s remuneration + royalties) × 20%',
      exemptHintAuthor: "author's remuneration × (1 − 20%) × 30%",
      exemptHintNone: "Applies to author's remuneration only.",
      secPolicy: 'Policy Periods Applied This Year',
      thPeriod: 'Policy period',
      thMonths: 'Months',
      thStatus: 'Status',
      thSource: 'Source',
      secMonthly: 'Monthly Contribution Bases',
      thMonth: 'Month',
      thPolicy: 'Policy',
      thActions: 'Apply',
      btnForward: '→ later months',
      btnYear: '→ whole year',
      btnReset: 'Restore defaults',
      thBenefit: 'On unemployment benefits',
      benefitLabel: 'Drawing benefits',
      hintBenefit: 'Tick the months you are drawing unemployment benefits: the unemployment insurance fund pays your medical insurance for those months, so they are excluded from the annual total.',
      waivedMonthsNote: 'Months {months} ({count} in total) are paid by the unemployment insurance fund and are not included.',
      hintReadonlyBases: 'Bases are derived from the monthly salary and each month’s limits, so they are read-only.',
      hintEditableBases: 'Editable months are validated against that month’s policy range. Editing one month affects only that month.',
      warnAdjusted: 'Some values fell outside the allowed range for their month and were adjusted.',
      secContrib: 'Social Insurance, Housing Fund & Benefits',
      thItem: 'Item',
      thEmployerRate: 'Employer %',
      thEmployeeRate: 'Employee %',
      thEmployerAnnual: 'Employer annual (¥)',
      thEmployeeAnnual: 'Employee annual (¥)',
      thRateOrMode: 'Personal rate / method',
      thTotal: 'Total',
      naLabel: 'Not applicable',
      selfDeposit: 'Self-determined deposit',
      annualNote: 'Annual amounts are summed month by month, never one month × 12.',
      amountDeductionCap: 'deductible ≤ {cap}/mo',
      dedCappedNote: 'Deposited ¥{paid}; the amount above the deduction cap is not deductible.',
      secDeduct: 'Expenses, Tax-exempt Income & Pre-tax Deductions',
      deductIntro: 'Items deductible before tax under the applicable rules.',
      grpExpenses: 'Expenses',
      grpExempt: 'Tax-exempt income',
      grpStandard: 'Standard deduction',
      standardHint: '¥60,000 per year',
      additionalHint: 'Enter the deductible amount for the year, not the amount actually spent.',
      labelExpenses: 'Expenses (CNY/year)',
      labelExemptAuthor: "Tax-exempt part of author's remuneration",
      labelExemptOther: 'Other tax-exempt income (CNY/year)',
      labelStandard: 'Standard Deduction (CNY/year)',
      secSpecial: 'Special Deductions (from contributions)',
      secAdditional: 'Additional Special Deductions (CNY/year)',
      labelChildren: "Children's education",
      labelEducation: 'Continuing education',
      labelIllness: 'Serious illness medical',
      labelLoan: 'Housing loan interest',
      labelRent: 'Housing rent',
      labelElderly: 'Elderly support',
      labelInfant: 'Infant care under 3',
      secOther: 'Other Deductions (CNY/year)',
      labelCorpPension: 'Corporate pension (deductible amount)',
      corpPensionHint: 'Enter the deductible amount for the year. Corporate pension is not part of the contributions module above; the statutory limit is 4% of the contribution base.',
      labelHealth: 'Commercial health insurance',
      labelTaxes: 'Deductible taxes',
      labelPersonalPension: 'Personal pension',
      labelOther: 'Other',
      resTaxableHeader: 'Taxable Comprehensive Income',
      resTaxHeader: 'Comprehensive Income Tax',
      resAnnualHeader: 'Annual Income & Employer Cost',
      kvIncome: 'Annual gross income',
      kvExpenses: 'Expenses',
      kvExempt: 'Tax-exempt income',
      kvStandard: 'Standard deduction',
      kvSpecial: 'Special deductions',
      kvAdditional: 'Additional special deductions',
      kvOther: 'Other deductions',
      kvTaxable: 'Taxable comprehensive income',
      kvRate: 'Applicable rate',
      kvQuickDeduction: 'Quick deduction',
      kvTax: 'Annual individual income tax',
      kvPersonalContrib: 'Personal social insurance & housing fund',
      kvNetIncome: 'Annual net income',
      kvEmployerContrib: 'Employer contributions',
      kvEmployerCost: 'Total annual employer cost',
      employerNa: 'Not applicable for flexible employment',
      formulaTaxable: 'Taxable = income − expenses − tax-exempt − standard − special − additional − other',
      formulaTax: 'Tax = taxable income × rate − quick deduction',
      formulaNet: 'Net = gross salary − personal contributions − tax',
      employerCostNote: 'Employer cost covers salary plus employer social insurance and housing fund only. Corporate pension and employer-paid commercial insurance are not included.',
      quickDeductionNote: 'The quick deduction is derived from the bracket thresholds, not stored separately.',
      badgeOfficial: 'Official',
      badgeCarried: 'Carried over',
      badgeCustom: 'Customized',
      badgeAdjusted: 'Adjusted',
      badgeMissing: 'No policy data',
      rateStatusLoading: 'Loading exchange rate...',
      rateStatusFetched: 'Fetched at {time}',
      rateStatusFailed: 'Failed to load rate. Using default.',
      groups: {
        si: 'Social insurance base',
        hf: 'Housing fund base',
        pension: 'Pension base',
        medical: 'Medical base'
      },
      items: {
        pension: 'Pension insurance',
        medical: 'Medical insurance',
        unemployment: 'Unemployment insurance',
        work_injury: 'Work injury insurance',
        maternity: 'Maternity insurance',
        housing_fund: 'Housing provident fund',
        supplementary_housing: 'Supplementary housing fund'
      },
      amountLabels: { housing_fund: 'Housing fund deposit' }
    },
    zh: {
      pageTitle: '中国年度收入、社保公积金及个税计算器',
      langLabel: 'Language / 语言:',
      inputHeader: '输入',
      resultsHeader: '年度计算结果',
      labelCity: '城市与就业类型',
      labelYear: '计算年度',
      secSalary: '工资与汇率',
      labelExchangeRate: '汇率 (美元→人民币)',
      refreshRate: '刷新',
      labelSalaryUSD: '月工资 (美元)',
      labelSalaryRMB: '月工资 (人民币)',
      labelAnnualUSD: '全年工资 (美元，自动计算)',
      labelAnnualRMB: '全年工资 (人民币，自动计算)',
      labelIncomeUSD: '月收入 (美元)',
      labelIncomeRMB: '月收入 (人民币)',
      labelAnnualIncomeUSD: '全年收入 (美元，自动计算)',
      labelAnnualIncomeRMB: '全年收入 (人民币，自动计算)',
      annualReadonlyHint: '全年总额 = 每月金额 × 12，自动计算，不可直接修改。',
      labelIncomeCategory: '收入类别',
      catSalary: '工资薪金',
      catLabor: '劳务报酬',
      catAuthor: '稿酬',
      catRoyalty: '特许权使用费',
      incomeCategoryHint: '收入类别决定费用扣除和免税部分；工资薪金两项均为 0。',
      expensesHintSalary: '工资薪金没有费用扣除。',
      expensesHintOther: '（劳务报酬收入 + 稿酬收入 + 特许权使用费收入）× 20%',
      exemptHintAuthor: '稿酬 × (1 − 20%) × 30%',
      exemptHintNone: '仅稿酬所得适用。',
      secPolicy: '当年适用政策',
      thPeriod: '政策期间',
      thMonths: '适用月份',
      thStatus: '状态',
      thSource: '数据来源',
      secMonthly: '每月缴费基数',
      thMonth: '月份',
      thPolicy: '政策',
      thActions: '批量应用',
      btnForward: '→ 后续月份',
      btnYear: '→ 全年',
      btnReset: '恢复默认',
      thBenefit: '领取失业保险金',
      benefitLabel: '领取中',
      hintBenefit: '勾选正在领取失业保险金的月份：这些月份的基本医疗保险费由失业保险基金支付，个人不缴纳，因此不计入全年合计。',
      waivedMonthsNote: '{months} 月由失业保险基金代缴（共 {count} 个月），未计入合计。',
      hintReadonlyBases: '企业职工基数由月工资和当月上下限自动确定，不可修改。',
      hintEditableBases: '可编辑月份按当月政策范围校验；修改一个月只影响该月。',
      warnAdjusted: '部分数值超出当月政策允许范围，已自动调整到合法范围内。',
      secContrib: '社保、公积金及福利缴费',
      thItem: '缴费项目',
      thEmployerRate: '企业比例',
      thEmployeeRate: '个人比例',
      thEmployerAnnual: '企业年度金额 (¥)',
      thEmployeeAnnual: '个人年度金额 (¥)',
      thRateOrMode: '个人比例或方式',
      thTotal: '合计',
      naLabel: '不适用',
      selfDeposit: '自主缴存',
      annualNote: '年度金额按每月金额逐月汇总，不使用某一个月乘以 12。',
      amountDeductionCap: '税前扣除 ≤ {cap}/月',
      dedCappedNote: '实际缴存 ¥{paid}，超出扣除上限的部分不可税前扣除。',
      secDeduct: '费用、免税收入和税前扣除',
      deductIntro: '各项按政策规定可在税前扣除的项目。',
      grpExpenses: '费用',
      grpExempt: '免税收入',
      grpStandard: '减除费用',
      standardHint: '每年 ¥60,000',
      additionalHint: '填写全年可扣除金额，不是实际支出金额。',
      labelExpenses: '费用 (人民币/年)',
      labelExemptAuthor: '稿酬所得免税部分 (人民币/年)',
      labelExemptOther: '其他免税收入 (人民币/年)',
      labelStandard: '减除费用 (人民币/年)',
      secSpecial: '专项扣除 (由缴费结果自动带入)',
      secAdditional: '专项附加扣除 (人民币/年)',
      labelChildren: '子女教育',
      labelEducation: '继续教育',
      labelIllness: '大病医疗',
      labelLoan: '住房贷款利息',
      labelRent: '住房租金',
      labelElderly: '赡养老人',
      labelInfant: '3 岁以下婴幼儿照护',
      secOther: '其他扣除 (人民币/年)',
      labelCorpPension: '企业年金 (可税前扣除金额)',
      corpPensionHint: '填写全年可税前扣除的金额。缴费模块不包含企业年金；法定扣除上限为本人缴费工资计税基数的 4%。',
      labelHealth: '商业健康保险',
      labelTaxes: '允许扣除的税费',
      labelPersonalPension: '个人养老金',
      labelOther: '其他',
      resTaxableHeader: '综合所得应纳税所得额',
      resTaxHeader: '综合所得应纳税额',
      resAnnualHeader: '年度收入与企业成本汇总',
      kvIncome: '全年税前收入',
      kvExpenses: '费用',
      kvExempt: '免税收入',
      kvStandard: '减除费用',
      kvSpecial: '专项扣除',
      kvAdditional: '专项附加扣除',
      kvOther: '其他扣除',
      kvTaxable: '综合所得应纳税所得额',
      kvRate: '适用税率',
      kvQuickDeduction: '速算扣除数',
      kvTax: '全年个人所得税',
      kvPersonalContrib: '个人社保及公积金合计',
      kvNetIncome: '全年实发收入',
      kvEmployerContrib: '企业缴费总额',
      kvEmployerCost: '企业年度总成本',
      employerNa: '灵活就业不适用',
      formulaTaxable: '应纳税所得额 = 收入 − 费用 − 免税收入 − 减除费用 − 专项扣除 − 专项附加扣除 − 其他扣除',
      formulaTax: '应纳税额 = 应纳税所得额 × 税率 − 速算扣除数',
      formulaNet: '实发收入 = 全年税前工资 − 个人实际缴费 − 全年个人所得税',
      employerCostNote: '企业年度总成本只包含工资和企业承担的社保、公积金，不含企业年金和企业承担的商业保险。',
      quickDeductionNote: '速算扣除数由税率级距推导得出，不单独保存。',
      badgeOfficial: '正式配置',
      badgeCarried: '沿用上一期',
      badgeCustom: '已自定义',
      badgeAdjusted: '已调整',
      badgeMissing: '尚无政策数据',
      rateStatusLoading: '正在加载汇率...',
      rateStatusFetched: '于 {time} 获取',
      rateStatusFailed: '加载汇率失败，使用默认值。',
      groups: {
        si: '社保基数',
        hf: '公积金基数',
        pension: '养老基数',
        medical: '医保基数'
      },
      items: {
        pension: '基本养老保险',
        medical: '基本医疗保险',
        unemployment: '失业保险',
        work_injury: '工伤保险',
        maternity: '生育保险',
        housing_fund: '住房公积金',
        supplementary_housing: '补充公积金'
      },
      amountLabels: { housing_fund: '住房公积金缴存额' }
    }
  };

  const state = {
    lang: 'zh',
    profile: 'shanghai',
    year: new Date().getFullYear(),
    monthlySalaryCNY: 0,
    incomeCategory: 'salary',
    baseOverrides: {},
    amountOverrides: {},
    benefitMonths: {},
    rateTexts: {},
    rateOverrides: {},
    rateStatus: null,
    lastRateUpdate: null
  };

  const $ = id => document.getElementById(id);
  const t = () => translations[state.lang];

  function money(n, decimals) {
    return Number(n || 0).toLocaleString('en-US', {
      minimumFractionDigits: decimals === undefined ? 2 : decimals,
      maximumFractionDigits: decimals === undefined ? 2 : decimals
    });
  }

  function percent(n) {
    return (Number(n || 0) * 100).toFixed(2).replace(/\.00$/, '') + '%';
  }

  function num(id) {
    return parseFloat($(id).value) || 0;
  }

  function exchangeRate() {
    return parseFloat($('rate').value) || 7.12;
  }

  function itemNote(item) {
    if (!item) return '';
    return state.lang === 'zh' ? (item.note_cn || '') : (item.note_en || '');
  }

  function escapeAttr(value) {
    return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  /* While a cell is being typed in, show exactly what the user typed; clamping happens on blur. */
  function editableValue(store, storeKey, fallback) {
    const raw = store[storeKey];
    return escapeAttr(raw === undefined || raw === null ? fallback : raw);
  }

  /* A deposit can be legal yet only partly deductible, so the cell states both limits. */
  function amountCapNote(monthEntry, itemKey) {
    const item = (monthEntry.period.items || {})[itemKey];
    const cap = item && item.maxDeductibleMonthlyAmount;
    if (cap === undefined) return '';
    return '<br>' + t().amountDeductionCap.replace('{cap}', money(cap));
  }

  function rateFieldValue(itemKey, current) {
    const raw = state.rateTexts[itemKey];
    if (raw !== undefined) return escapeAttr(raw);
    return (current * 100).toFixed(2).replace(/\.?0+$/, '');
  }

  function badge(kind) {
    const map = {
      official: ['badge-official', 'badgeOfficial'],
      carried: ['badge-carried', 'badgeCarried'],
      custom: ['badge-custom', 'badgeCustom'],
      adjusted: ['badge-adjusted', 'badgeAdjusted'],
      missing: ['badge-missing', 'badgeMissing']
    }[kind];
    return `<span class="badge ${map[0]}">${t()[map[1]]}</span>`;
  }

  /* ---------- salary fields: monthly is the single editable source ---------- */

  function syncSalary(source) {
    const rate = exchangeRate();
    let monthlyCNY;
    if (source === 'cny') {
      monthlyCNY = parseFloat($('salaryRMB').value) || 0;
      $('salaryUSD').value = (monthlyCNY / rate).toFixed(2);
    } else {
      const monthlyUSD = parseFloat($('salaryUSD').value) || 0;
      monthlyCNY = monthlyUSD * rate;
      $('salaryRMB').value = monthlyCNY.toFixed(2);
    }
    $('salaryAnnualUSD').value = ((parseFloat($('salaryUSD').value) || 0) * E.MONTHS).toFixed(2);
    $('salaryAnnualRMB').value = (monthlyCNY * E.MONTHS).toFixed(2);
    state.monthlySalaryCNY = monthlyCNY;
  }

  /* ---------- rendering ---------- */

  function currentPlan() {
    return E.buildYearPlan(state.profile, state.year, {
      monthlySalary: state.monthlySalaryCNY,
      baseOverrides: state.baseOverrides,
      amountOverrides: state.amountOverrides,
      benefitMonths: state.benefitMonths
    }, DATA);
  }

  function renderPolicySummary(plan) {
    const rows = [];
    plan.forEach(m => {
      const last = rows[rows.length - 1];
      if (last && last.period === m.period && last.carried === m.carried) {
        last.toMonth = m.month;
      } else {
        rows.push({ period: m.period, carried: m.carried, fromMonth: m.month, toMonth: m.month });
      }
    });
    const body = rows.map(r => {
      const periodLabel = `${String(r.period.from).slice(0, 4)}.${String(r.period.from).slice(4)}–${String(r.period.to).slice(0, 4)}.${String(r.period.to).slice(4)}`;
      const months = r.fromMonth === r.toMonth ? `${r.fromMonth}` : `${r.fromMonth}–${r.toMonth}`;
      return `<tr>
        <td>${periodLabel}</td>
        <td>${months}</td>
        <td>${badge(r.carried ? 'carried' : 'official')}</td>
        <td style="text-align:left;font-size:0.72rem;">${r.period.source || ''}</td>
      </tr>`;
    }).join('');
    $('policySummary').innerHTML = `<table>
      <thead><tr>
        <th>${t().thPeriod}</th><th>${t().thMonths}</th><th>${t().thStatus}</th><th style="text-align:left;">${t().thSource}</th>
      </tr></thead>
      <tbody>${body}</tbody>
    </table>`;
  }

  function renderMonthlyTable(plan) {
    const groupKeys = [];
    const amountKeys = [];
    plan.forEach(m => {
      Object.keys(m.bases).forEach(k => { if (!groupKeys.includes(k)) groupKeys.push(k); });
      Object.keys(m.amounts).forEach(k => { if (!amountKeys.includes(k)) amountKeys.push(k); });
    });

    /* The batch-apply column only makes sense when at least one field can be edited. */
    const anyEditable = plan.some(m =>
      Object.keys(m.bases).some(k => m.bases[k].editable) || Object.keys(m.amounts).length > 0);
    /* Only profiles whose policy waives items while on unemployment benefits get the tick box. */
    const anyBenefit = plan.some(m => m.benefitEligible);
    let anyAdjusted = false;

    const head = `<tr>
      <th>${t().thMonth}</th>
      <th style="text-align:left;">${t().thPolicy}</th>
      ${groupKeys.map(k => `<th>${t().groups[k] || k}</th>`).join('')}
      ${amountKeys.map(k => `<th>${t().amountLabels[k] || t().items[k] || k}</th>`).join('')}
      ${anyBenefit ? `<th>${t().thBenefit}</th>` : ''}
      ${anyEditable ? `<th>${t().thActions}</th>` : ''}
    </tr>`;

    const body = plan.map(m => {
      const cells = groupKeys.map(k => {
        const b = m.bases[k];
        if (!b) return '<td>—</td>';
        if (b.adjusted) anyAdjusted = true;
        if (!b.editable) {
          return `<td>${money(b.value, 0)}<span class="cell-note">${money(b.lower, 0)}–${money(b.upper, 0)}</span></td>`;
        }
        return `<td>
          <input type="text" inputmode="decimal" class="num" data-kind="base" data-ym="${m.ym}" data-key="${k}" value="${editableValue(state.baseOverrides, m.ym + ':' + k, b.value)}">
          <span class="cell-note">${money(b.lower, 0)}–${money(b.upper, 0)} ${b.custom ? badge('custom') : ''}${b.adjusted ? badge('adjusted') : ''}</span>
        </td>`;
      }).join('');

      const amountCells = amountKeys.map(k => {
        const a = m.amounts[k];
        if (!a) return '<td>—</td>';
        if (a.adjusted) anyAdjusted = true;
        return `<td>
          <input type="text" inputmode="decimal" class="num" data-kind="amount" data-ym="${m.ym}" data-key="${k}" value="${editableValue(state.amountOverrides, m.ym + ':' + k, a.value)}">
          <span class="cell-note">≤ ${money(a.max, 0)}${amountCapNote(m, k)} ${a.custom ? badge('custom') : ''}${a.adjusted ? badge('adjusted') : ''}</span>
        </td>`;
      }).join('');

      const benefitCell = anyBenefit ? `<td>
        ${m.benefitEligible ? `<label class="tick"><input type="checkbox" data-kind="benefit" data-ym="${m.ym}"${m.onBenefit ? ' checked' : ''}> ${t().benefitLabel}</label>` : '—'}
      </td>` : '';

      const actions = anyEditable ? `<td>
        <button type="button" class="btn btn-ghost btn-mini" data-apply="forward" data-month="${m.month}">${t().btnForward}</button>
        <button type="button" class="btn btn-ghost btn-mini" data-apply="year" data-month="${m.month}">${t().btnYear}</button>
      </td>` : '';

      return `<tr>
        <td>${state.year}.${String(m.month).padStart(2, '0')}</td>
        <td style="text-align:left;">${badge(m.carried ? 'carried' : 'official')}</td>
        ${cells}${amountCells}${benefitCell}${actions}
      </tr>`;
    }).join('');

    $('monthlyTable').innerHTML = `<table><thead>${head}</thead><tbody>${body}</tbody></table>`;
    $('monthlyHint').textContent = (anyEditable ? t().hintEditableBases : t().hintReadonlyBases)
      + (anyBenefit ? ' ' + t().hintBenefit : '');
    $('resetMonthly').hidden = !anyEditable;
    $('monthlyWarning').hidden = !anyAdjusted;
    $('monthlyWarning').textContent = t().warnAdjusted;
  }

  function rateCell(itemKey, result) {
    const item = result.item;
    if (result.mode === 'monthly_amount') {
      return `<td>${t().selfDeposit}</td>`;
    }
    if (item && item.rateEditable) {
      const current = result.segments.length ? result.segments[0].employee : (item.employeeRate || 0);
      const range = item.rateRange ? `<span class="cell-note">${percent(item.rateRange[0])}–${percent(item.rateRange[1])}</span>` : '';
      return `<td><input type="text" inputmode="decimal" class="num" data-kind="rate" data-key="${itemKey}" data-side="employee" value="${rateFieldValue(itemKey, current)}">${range}</td>`;
    }
    return `<td>${segmentText(result, 'employee')}</td>`;
  }

  function segmentText(result, side) {
    if (!result.segments.length) return '—';
    if (result.segments.length === 1) return percent(result.segments[0][side]);
    return result.segments
      .map(s => `${s.fromMonth}–${s.toMonth}月: ${percent(s[side])}`)
      .join('<br>');
  }

  /* Collapse a month list into ranges: [1,2,3,7] -> "1–3", "7". */
  function monthRanges(months) {
    const out = [];
    months.forEach(m => {
      const last = out[out.length - 1];
      if (last && last.to === m - 1) last.to = m;
      else out.push({ from: m, to: m });
    });
    return out.map(r => (r.from === r.to ? `${r.from}` : `${r.from}–${r.to}`))
      .join(state.lang === 'zh' ? '、' : ', ');
  }

  function waivedNote(result) {
    if (!result.waivedMonths || !result.waivedMonths.length) return '';
    const text = t().waivedMonthsNote
      .replace('{months}', monthRanges(result.waivedMonths))
      .replace('{count}', result.waivedMonths.length);
    return `<span class="cell-note">${text}</span>`;
  }

  function renderContributions(annual) {
    const isFlexible = DATA.profiles[state.profile].employment === 'flexible';
    const rows = DATA.itemOrder.map(key => {
      const result = annual.items[key];
      const name = t().items[key];
      const note = itemNote(result.item);
      const noteHtml = (note ? `<span class="cell-note">${note}</span>` : '') + waivedNote(result);
      if (!result.applicable) {
        const span = isFlexible ? 3 : 5;
        return `<tr><td>${name}${noteHtml}</td><td colspan="${span}" style="text-align:center;color:var(--text-secondary);">${t().naLabel}</td></tr>`;
      }
      if (isFlexible) {
        return `<tr>
          <td>${name}${noteHtml}</td>
          ${rateCell(key, result)}
          <td>${money(result.employeeAnnual)}</td>
        </tr>`;
      }
      const employerRate = result.mode === 'employer_annual_amount'
        ? '—'
        : segmentText(result, 'employer');
      return `<tr>
        <td>${name}${noteHtml}</td>
        <td>${employerRate}</td>
        ${rateCell(key, result)}
        <td>${money(result.employerAnnual)}</td>
        <td>${money(result.employeeAnnual)}</td>
      </tr>`;
    }).join('');

    const head = isFlexible
      ? `<tr><th style="text-align:left;">${t().thItem}</th><th>${t().thRateOrMode}</th><th>${t().thEmployeeAnnual}</th></tr>`
      : `<tr><th style="text-align:left;">${t().thItem}</th><th>${t().thEmployerRate}</th><th>${t().thEmployeeRate}</th><th>${t().thEmployerAnnual}</th><th>${t().thEmployeeAnnual}</th></tr>`;

    const totalRow = isFlexible
      ? `<tr class="total-row"><td>${t().thTotal}</td><td></td><td>${money(annual.totals.employeeAnnual)}</td></tr>`
      : `<tr class="total-row"><td>${t().thTotal}</td><td></td><td></td><td>${money(annual.totals.employerAnnual)}</td><td>${money(annual.totals.employeeAnnual)}</td></tr>`;

    $('contributions').innerHTML = `<table><thead>${head}</thead><tbody>${rows}${totalRow}</tbody></table>
      <p class="hint">${t().annualNote}</p>`;
  }

  function renderSpecialDeductions(annual) {
    const keys = ['pension', 'medical', 'unemployment', 'housing_fund', 'supplementary_housing'];
    const rows = keys
      .filter(k => annual.items[k].applicable && annual.items[k].deductibleAnnual > 0)
      .map(k => {
        const result = annual.items[k];
        const capped = result.deductibleAnnual < result.employeeAnnual;
        const note = capped
          ? `<small>${t().dedCappedNote.replace('{paid}', money(result.employeeAnnual))}</small>`
          : '';
        return `<div class="ded-row">
        <span class="ded-label">${t().items[k]}${note}</span>
        <span class="ded-value">¥${money(result.deductibleAnnual)}</span>
      </div>`;
      })
      .join('');
    $('specialDeductions').innerHTML = `${rows}
      <div class="ded-row ded-total">
        <span class="ded-label">${t().kvSpecial}</span>
        <span class="ded-value">¥${money(annual.totals.deductibleAnnual)}</span>
      </div>`;
  }

  function additionalDeductionsTotal() {
    return ['addChildren', 'addEducation', 'addIllness', 'addLoan', 'addRent', 'addElderly', 'addInfant']
      .reduce((sum, id) => sum + num(id), 0);
  }

  function otherDeductionsTotal() {
    return ['othCorpPension', 'othHealth', 'othTaxes', 'othPersonalPension', 'othOther']
      .reduce((sum, id) => sum + num(id), 0);
  }

  function kv(label, value, emphasis) {
    return `<div class="kv${emphasis ? ' emphasis' : ''}"><span>${label}</span><span>${value}</span></div>`;
  }

  /* Expenses and the tax-exempt part follow from the income category, so they are derived. */
  function renderIncomeCategory(annualIncome) {
    const isFlexible = DATA.profiles[state.profile].employment === 'flexible';
    $('incomeCategoryGroup').hidden = !isFlexible;
    const category = isFlexible ? state.incomeCategory : 'salary';
    const activeRadio = document.querySelector(`input[name="incomeCategory"][value="${category}"]`);
    if (activeRadio) activeRadio.checked = true;
    const adjustments = E.incomeAdjustments(category, annualIncome);

    $('dedExpenses').value = adjustments.expenses.toFixed(2);
    $('dedExemptAuthor').value = adjustments.taxExemptIncome.toFixed(2);
    $('expensesHint').textContent = category === 'salary' ? t().expensesHintSalary : t().expensesHintOther;
    $('exemptHint').textContent = category === 'author' ? t().exemptHintAuthor : t().exemptHintNone;

    const salaryLabels = category === 'salary'
      ? ['labelSalaryUSD', 'labelSalaryRMB', 'labelAnnualUSD', 'labelAnnualRMB']
      : ['labelIncomeUSD', 'labelIncomeRMB', 'labelAnnualIncomeUSD', 'labelAnnualIncomeRMB'];
    ['salaryUSD', 'salaryRMB', 'salaryAnnualUSD', 'salaryAnnualRMB'].forEach((id, i) => {
      const label = document.querySelector(`label[for="${id}"]`);
      if (label) label.textContent = t()[salaryLabels[i]];
    });

    return adjustments;
  }

  function renderResults(annual) {
    const rate = exchangeRate();
    const annualIncome = state.monthlySalaryCNY * E.MONTHS;
    const adjustments = renderIncomeCategory(annualIncome);
    const taxExempt = E.round2(adjustments.taxExemptIncome + num('dedExemptOther'));
    const additional = additionalDeductionsTotal();
    const other = otherDeductionsTotal();

    const tax = E.computeAnnualTax({
      annualIncome,
      expenses: adjustments.expenses,
      taxExemptIncome: taxExempt,
      specialDeductions: annual.totals.deductibleAnnual,
      additionalDeductions: additional,
      otherDeductions: other
    }, DATA);

    $('taxableSummary').innerHTML = `<div class="summary-box">
      ${kv(t().kvIncome, '¥' + money(annualIncome))}
      ${kv(t().kvExpenses, '−¥' + money(adjustments.expenses))}
      ${kv(t().kvExempt, '−¥' + money(taxExempt))}
      ${kv(t().kvStandard, '−¥' + money(tax.standardDeduction))}
      ${kv(t().kvSpecial, '−¥' + money(annual.totals.deductibleAnnual))}
      ${kv(t().kvAdditional, '−¥' + money(additional))}
      ${kv(t().kvOther, '−¥' + money(other))}
      ${kv(t().kvTaxable, '<b>¥' + money(tax.taxableIncome) + '</b>', true)}
      <small class="formula">${t().formulaTaxable}</small>
    </div>`;

    $('taxSummary').innerHTML = `<div class="summary-box">
      ${kv(t().kvTaxable, '¥' + money(tax.taxableIncome))}
      ${kv(t().kvRate, percent(tax.rate))}
      ${kv(t().kvQuickDeduction, '¥' + money(tax.quickDeduction))}
      ${kv(t().kvTax, '<b>¥' + money(tax.tax) + '</b> ($' + money(tax.tax / rate) + ')', true)}
      <small class="formula">${t().formulaTax}\n${t().quickDeductionNote}</small>
    </div>`;

    const personalContrib = annual.totals.employeeAnnual;
    const net = E.round2(annualIncome - personalContrib - tax.tax);
    const isFlexible = DATA.profiles[state.profile].employment === 'flexible';
    const employerCost = E.round2(annualIncome + annual.totals.employerAnnual);

    $('annualSummary').innerHTML = `<div class="summary-box">
      ${kv(t().kvIncome, '¥' + money(annualIncome) + ' ($' + money(annualIncome / rate) + ')')}
      ${kv(t().kvPersonalContrib, '−¥' + money(personalContrib))}
      ${kv(t().kvTax, '−¥' + money(tax.tax))}
      ${kv(t().kvNetIncome, '<b>¥' + money(net) + '</b> ($' + money(net / rate) + ')', true)}
      ${kv(t().kvEmployerContrib, isFlexible ? t().employerNa : '¥' + money(annual.totals.employerAnnual))}
      ${kv(t().kvEmployerCost, isFlexible ? t().employerNa : '¥' + money(employerCost) + ' ($' + money(employerCost / rate) + ')')}
      <small class="formula">${t().formulaNet}</small>
      ${isFlexible ? '' : `<p class="hint">${t().employerCostNote}</p>`}
    </div>`;
  }

  /* Re-rendering blurs whatever is focused; ignore the focusout it causes so we don't re-enter. */
  let isRendering = false;

  function render() {
    isRendering = true;
    try {
      renderAll();
    } finally {
      isRendering = false;
    }
  }

  function renderAll() {
    const plan = currentPlan();
    const annual = E.computeAnnualContributions(plan, {
      monthlySalary: state.monthlySalaryCNY,
      rateOverrides: state.rateOverrides
    }, DATA);
    renderPolicySummary(plan);
    renderMonthlyTable(plan);
    renderContributions(annual);
    renderSpecialDeductions(annual);
    renderResults(annual);
  }

  /* Re-rendering replaces inputs, so put the caret back where the user was typing. */
  function renderPreservingFocus() {
    const active = document.activeElement;
    const marker = active && active.dataset && active.dataset.kind
      ? {
        kind: active.dataset.kind, ym: active.dataset.ym, key: active.dataset.key, side: active.dataset.side,
        start: active.selectionStart, end: active.selectionEnd
      }
      : null;
    render();
    if (!marker) return;
    const selector = `input[data-kind="${marker.kind}"]`
      + (marker.ym ? `[data-ym="${marker.ym}"]` : '')
      + (marker.key ? `[data-key="${marker.key}"]` : '')
      + (marker.side ? `[data-side="${marker.side}"]` : '');
    const next = document.querySelector(selector);
    if (next) {
      next.focus();
      const start = marker.start === null ? next.value.length : marker.start;
      try { next.setSelectionRange(start, marker.end === null ? start : marker.end); } catch (err) { /* not all inputs expose a caret */ }
    }
  }

  /* ---------- events ---------- */

  function applyStaticText() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t()[key]) el.textContent = t()[key];
    });
    const additionalHeader = document.querySelector('.ded-header[data-i18n="secAdditional"]');
    if (additionalHeader) additionalHeader.innerHTML += ` <small style="font-weight:400;font-style:italic;">${t().additionalHint}</small>`;
    document.title = t().pageTitle;
    updateRateStatus();
  }

  function fillProfiles() {
    const select = $('profile');
    select.innerHTML = Object.keys(DATA.profiles).map(key => {
      const p = DATA.profiles[key];
      const label = state.lang === 'zh' ? p.label_cn : p.label_en;
      return `<option value="${key}">${label}</option>`;
    }).join('');
    select.value = state.profile;
  }

  function fillYears() {
    const thisYear = new Date().getFullYear();
    const years = [];
    for (let y = thisYear - 1; y <= thisYear + 1; y++) years.push(y);
    $('year').innerHTML = years.map(y => `<option value="${y}">${y}</option>`).join('');
    $('year').value = state.year;
  }

  $('profile').addEventListener('change', () => {
    state.profile = $('profile').value;
    state.baseOverrides = {};
    state.amountOverrides = {};
    state.benefitMonths = {};
    state.rateOverrides = {};
    state.rateTexts = {};
    render();
  });

  $('year').addEventListener('change', () => {
    state.year = parseInt($('year').value, 10);
    state.baseOverrides = {};
    state.amountOverrides = {};
    state.benefitMonths = {};
    render();
  });

  ['salaryUSD', 'rate'].forEach(id => $(id).addEventListener('input', () => { syncSalary('usd'); render(); }));
  $('salaryRMB').addEventListener('input', () => { syncSalary('cny'); render(); });

  document.querySelectorAll('.inputs input[id^="ded"], .inputs input[id^="add"], .inputs input[id^="oth"]')
    .forEach(el => el.addEventListener('input', render));

  document.querySelectorAll('input[name="incomeCategory"]').forEach(radio => {
    radio.addEventListener('change', () => {
      state.incomeCategory = radio.value;
      render();
    });
  });

  $('resetMonthly').addEventListener('click', () => {
    state.baseOverrides = {};
    state.amountOverrides = {};
    state.benefitMonths = {};
    render();
  });

  $('monthlyTable').addEventListener('input', e => {
    const el = e.target;
    if (el.dataset.kind === 'base') {
      state.baseOverrides[el.dataset.ym + ':' + el.dataset.key] = el.value;
    } else if (el.dataset.kind === 'amount') {
      state.amountOverrides[el.dataset.ym + ':' + el.dataset.key] = el.value;
    } else {
      return;
    }
    renderPreservingFocus();
  });

  $('monthlyTable').addEventListener('change', e => {
    const el = e.target;
    if (!el.dataset || el.dataset.kind !== 'benefit') return;
    if (el.checked) state.benefitMonths[el.dataset.ym] = true;
    else delete state.benefitMonths[el.dataset.ym];
    render();
  });

  /* Typing is free-form; on blur the field snaps back to the value the engine actually used. */
  $('monthlyTable').addEventListener('focusout', e => {
    const el = e.target;
    const kind = el.dataset && el.dataset.kind;
    if (isRendering || (kind !== 'base' && kind !== 'amount')) return;
    const store = kind === 'base' ? state.baseOverrides : state.amountOverrides;
    const storeKey = el.dataset.ym + ':' + el.dataset.key;
    const raw = store[storeKey];
    if (raw === undefined) return;
    if (String(raw).trim() === '' || Number.isNaN(Number(raw))) {
      delete store[storeKey];
    } else {
      const month = currentPlan().find(m => String(m.ym) === el.dataset.ym);
      const cell = month && (kind === 'base' ? month.bases : month.amounts)[el.dataset.key];
      if (cell) store[storeKey] = cell.value;
    }
    render();
  });

  /* Batch apply re-uses one month's values; each target month re-validates its own range. */
  $('monthlyTable').addEventListener('click', e => {
    const btn = e.target.closest('button[data-apply]');
    if (!btn) return;
    const sourceMonth = parseInt(btn.dataset.month, 10);
    const plan = currentPlan();
    const source = plan.find(m => m.month === sourceMonth);
    if (!source) return;
    const startMonth = btn.dataset.apply === 'year' ? 1 : sourceMonth + 1;
    plan.forEach(m => {
      if (m.month < startMonth || m.month === sourceMonth) return;
      Object.keys(source.bases).forEach(k => {
        if (source.bases[k].editable) state.baseOverrides[m.ym + ':' + k] = source.bases[k].value;
      });
      Object.keys(source.amounts).forEach(k => {
        state.amountOverrides[m.ym + ':' + k] = source.amounts[k].value;
      });
      if (m.benefitEligible) {
        if (source.onBenefit) state.benefitMonths[m.ym] = true;
        else delete state.benefitMonths[m.ym];
      }
    });
    render();
  });

  $('contributions').addEventListener('input', e => {
    const el = e.target;
    if (el.dataset.kind !== 'rate') return;
    const key = el.dataset.key;
    state.rateTexts[key] = el.value;
    const value = (parseFloat(el.value) || 0) / 100;
    const item = (E.resolvePeriod(state.profile, E.ym(state.year, 1), DATA).period.items || {})[key];
    state.rateOverrides[key] = state.rateOverrides[key] || {};
    state.rateOverrides[key].employee = value;
    if (item && item.linkedRates) state.rateOverrides[key].employer = value;
    renderPreservingFocus();
  });

  $('contributions').addEventListener('focusout', e => {
    if (isRendering || !e.target.dataset || e.target.dataset.kind !== 'rate') return;
    delete state.rateTexts[e.target.dataset.key];
    render();
  });

  $('languageSelect').addEventListener('change', () => {
    state.lang = $('languageSelect').value;
    applyStaticText();
    fillProfiles();
    render();
  });

  /* ---------- exchange rate ---------- */

  function updateRateStatus() {
    const el = $('rateStatus');
    if (!state.rateStatus) { el.textContent = ''; return; }
    if (state.rateStatus === 'loading') el.textContent = t().rateStatusLoading;
    else if (state.rateStatus === 'failed') el.textContent = t().rateStatusFailed;
    else if (state.lastRateUpdate) {
      const time = state.lastRateUpdate.toLocaleString(state.lang === 'zh' ? 'zh-CN' : 'en-US');
      el.textContent = t().rateStatusFetched.replace('{time}', time);
    }
  }

  async function fetchExchangeRate() {
    const btn = $('refreshRateBtn');
    const icon = $('refreshIcon');
    state.rateStatus = 'loading';
    updateRateStatus();
    btn.disabled = true;
    icon.textContent = '⏳';
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (!response.ok) throw new Error('API error');
      const json = await response.json();
      const value = json && json.rates && json.rates.CNY;
      if (!value) throw new Error('no CNY rate');
      $('rate').value = parseFloat(value.toFixed(4));
      state.rateStatus = 'updated';
      state.lastRateUpdate = new Date();
      syncSalary('usd');
      render();
    } catch (error) {
      state.rateStatus = 'failed';
    } finally {
      btn.disabled = false;
      icon.textContent = '🔄';
      updateRateStatus();
    }
  }

  $('refreshRateBtn').addEventListener('click', fetchExchangeRate);

  /* ---------- init ---------- */

  $('languageSelect').value = state.lang;
  fillProfiles();
  fillYears();
  applyStaticText();
  syncSalary('usd');
  render();
  fetchExchangeRate();
})();
