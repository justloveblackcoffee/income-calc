/*
 * Policy data for the annual income / benefit calculator.
 *
 * Structure: profile (city + employment type) -> policy periods -> base groups + items.
 * Each period records its own effective range and data source, so a calendar year can
 * span several periods and each month resolves independently.
 *
 * When adding a period, record its real effective range, its source and whether the figures
 * are official — never present an estimate as published policy. Periods do not have to share
 * a cycle: Shanghai publishes July-to-June, while Zhejiang publishes per calendar year and may
 * announce mid-year with retroactive effect back to January.
 *
 * Sources:
 *   Zhejiang flexible employment pension rules:
 *     https://zjjcmspublic.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/jcms_files/jcms1/web2758/site/attach/0/1d871e9e532e490ea3762bf9e1456241.pdf
 *   Zhejiang 2025 contribution base limits:
 *     https://zhejiang.chinatax.gov.cn/art/2025/12/11/art_13314_645797.html
 *   Zhejiang 2026 contribution wage declaration notice (no new limits published yet):
 *     https://zhejiang.chinatax.gov.cn/art/2026/1/22/art_8414_84395.html
 *   Huzhou basic medical insurance rules (flexible employment pays a unified standard,
 *   not a self-selected base; the standard is 518.54/month from 2025.09):
 *     https://ybj.huzhou.gov.cn/art/2020/12/15/art_1229515961_1631083.html
 *   Huzhou flexible employment housing fund pilot:
 *     https://zc.51shebao.com/detail/829767
 *     https://zj.people.com.cn/n2/2023/0830/c186327-40550597.html
 *
 * Not implemented yet: field-level inheritance (taking newly published bases while carrying
 * older rates forward) — a month either matches a period or carries the whole previous one.
 */
(function (root) {
  const POLICY_DATA = {
    profiles: {
      shanghai: {
        key: 'shanghai',
        employment: 'employee',
        label_en: 'Shanghai Corporation Employee',
        label_cn: '上海企业职工'
      },
      shanghai_flexible: {
        key: 'shanghai_flexible',
        employment: 'flexible',
        label_en: 'Shanghai Flexible Employment',
        label_cn: '上海灵活就业'
      },
      huzhou_flexible: {
        key: 'huzhou_flexible',
        employment: 'flexible',
        label_en: 'Huzhou (Zhejiang) Flexible Employment',
        label_cn: '浙江湖州灵活就业'
      }
    },

    /* Comprehensive income annual tax brackets. Quick deductions are derived, not stored. */
    taxBrackets: [
      { upTo: 36000, rate: 0.03 },
      { upTo: 144000, rate: 0.10 },
      { upTo: 300000, rate: 0.20 },
      { upTo: 420000, rate: 0.25 },
      { upTo: 660000, rate: 0.30 },
      { upTo: 960000, rate: 0.35 },
      { upTo: Infinity, rate: 0.45 }
    ],

    annualStandardDeduction: 60000,

    periods: {
      shanghai: [
        {
          from: 202507,
          to: 202606,
          official: true,
          source: '上海市人力资源和社会保障局 2025 年度缴费基数公告',
          baseGroups: {
            si: { lower: 7460, upper: 37302, defaultRule: 'salary_capped', editable: false },
            hf: { lower: 2690, upper: 37302, defaultRule: 'salary_capped', editable: false }
          },
          items: shanghaiEmployeeItems()
        },
        {
          from: 202607,
          to: 202706,
          official: true,
          source: '上海市人力资源和社会保障局 2026 年度缴费基数公告',
          baseGroups: {
            si: { lower: 7546, upper: 37731, defaultRule: 'salary_capped', editable: false },
            hf: { lower: 2740, upper: 37731, defaultRule: 'salary_capped', editable: false }
          },
          items: shanghaiEmployeeItems()
        }
      ],

      shanghai_flexible: [
        {
          from: 202507,
          to: 202606,
          official: true,
          source: '上海市人力资源和社会保障局 2025 年度缴费基数公告',
          baseGroups: {
            si: { lower: 7460, upper: 37302, defaultRule: 'lower', editable: true },
            hf: { lower: 2690, upper: 37302, defaultRule: 'upper', editable: true }
          },
          items: shanghaiFlexibleItems()
        },
        {
          from: 202607,
          to: 202706,
          official: true,
          source: '上海市人力资源和社会保障局 2026 年度缴费基数公告',
          baseGroups: {
            si: { lower: 7546, upper: 37731, defaultRule: 'lower', editable: true },
            hf: { lower: 2740, upper: 37731, defaultRule: 'upper', editable: true }
          },
          items: shanghaiFlexibleItems()
        }
      ],

      huzhou_flexible: [
        {
          from: 202501,
          to: 202508,
          official: true,
          source: '浙江省 2025 年社会保险费缴费基数上下限说明',
          baseGroups: {
            pension: { lower: 4986, upper: 25299, defaultRule: 'lower', editable: true },
            medical: { lower: 4986, upper: 4986, defaultRule: 'lower', editable: false }
          },
          items: huzhouFlexibleItems(0.095)
        },
        {
          from: 202509,
          to: 202512,
          official: true,
          source: '湖州市职工基本医疗保险灵活就业人员缴费标准（2025 年 9 月起）',
          baseGroups: {
            pension: { lower: 4986, upper: 25299, defaultRule: 'lower', editable: true },
            medical: { lower: 4986, upper: 4986, defaultRule: 'lower', editable: false }
          },
          items: huzhouFlexibleItems(0.104)
        }
      ]
    }
  };

  function shanghaiEmployeeItems() {
    return {
      pension: { baseGroup: 'si', employerRate: 0.16, employeeRate: 0.08, deductible: true },
      medical: { baseGroup: 'si', employerRate: 0.09, employeeRate: 0.02, deductible: true },
      unemployment: { baseGroup: 'si', employerRate: 0.005, employeeRate: 0.005, deductible: true },
      work_injury: {
        baseGroup: 'si', employerRate: 0.002, employeeRate: 0, deductible: false,
        note_en: 'Rate varies by industry risk (0.2%–1.9%)',
        note_cn: '行业风险高低决定费率 (0.2%–1.9%)'
      },
      maternity: {
        baseGroup: 'si', employerRate: 0, employeeRate: 0, deductible: false,
        note_en: 'Merged into medical insurance', note_cn: '已并入医疗保险'
      },
      housing_fund: {
        baseGroup: 'hf', employerRate: 0.07, employeeRate: 0.07, deductible: true,
        rateEditable: true, rateRange: [0.05, 0.07], linkedRates: true,
        note_en: 'Company-defined, employer and employee equal (5%-7%)',
        note_cn: '企业可自主选择，单位和个人比例相同（5%-7%）'
      },
      supplementary_housing: {
        baseGroup: 'hf', employerRate: 0, employeeRate: 0, deductible: true,
        rateEditable: true, rateRange: [0, 0.06], linkedRates: true, optional: true,
        note_en: 'Optional, defaults to 0; company-defined, employer and employee equal (up to 6%)',
        note_cn: '可选，默认 0；企业可自主选择，单位和个人比例相同（最高 6%）'
      }
    };
  }

  function shanghaiFlexibleItems() {
    return {
      pension: {
        baseGroup: 'si', employerRate: 0, employeeRate: 0.20, deductible: true,
        note_en: 'Flexible employment: 20% personally (8% to personal account)',
        note_cn: '灵活就业：个人缴纳 20%（8% 进入个人账户）'
      },
      medical: {
        baseGroup: 'si', employerRate: 0, employeeRate: 0.10, deductible: true,
        note_en: 'Flexible employment: 10% personally',
        note_cn: '灵活就业：个人缴纳 10%'
      },
      unemployment: { baseGroup: 'si', employerRate: 0, employeeRate: 0, applicable: false },
      work_injury: { baseGroup: 'si', employerRate: 0, employeeRate: 0, applicable: false },
      maternity: {
        baseGroup: 'si', employerRate: 0, employeeRate: 0, applicable: false,
        note_en: 'Covered by medical insurance', note_cn: '包含在医保政策中'
      },
      housing_fund: {
        baseGroup: 'hf', employerRate: 0, employeeRate: 0.24, deductible: true,
        rateEditable: true, rateRange: [0.10, 0.24],
        note_en: 'Flexible employment may choose 10%-24%',
        note_cn: '灵活就业人员可自主选择缴存比例，范围 10%–24%'
      },
      supplementary_housing: { baseGroup: 'hf', employerRate: 0, employeeRate: 0, applicable: false }
    };
  }

  /* Medical is a unified local standard, not a self-selected base: 4,986 x 10.4% = 518.54/month
     from 2025.09 (of which 2% = 99.72 goes to the personal account). Only the rate changed. */
  function huzhouFlexibleItems(medicalRate) {
    const pooledRate = Math.round((medicalRate - 0.02) * 1000) / 1000;
    const monthlyMedical = Math.round(4986 * medicalRate * 100) / 100;
    return {
      pension: {
        baseGroup: 'pension', employerRate: 0, employeeRate: 0.20, deductible: true,
        note_en: 'Personal rate 20%, of which 8% goes to the personal account',
        note_cn: '个人缴费比例 20%，其中 8% 计入个人账户'
      },
      medical: {
        baseGroup: 'medical', employerRate: 0, employeeRate: medicalRate, deductible: true,
        note_en: `Unified local standard: ¥${monthlyMedical.toFixed(2)}/month `
          + `(${(pooledRate * 100).toFixed(1)}% pooled, 2% to personal account)`,
        note_cn: `按当地统一缴费标准 ${monthlyMedical.toFixed(2)} 元/月缴纳`
          + `（${(pooledRate * 100).toFixed(1)}% 进入统筹基金，2% 划入个人账户）`
      },
      unemployment: { baseGroup: 'pension', employerRate: 0, employeeRate: 0, applicable: false },
      work_injury: { baseGroup: 'pension', employerRate: 0, employeeRate: 0, applicable: false },
      maternity: {
        baseGroup: 'medical', employerRate: 0, employeeRate: 0, applicable: false,
        note_en: 'Covered by the local medical insurance policy', note_cn: '包含在当地医保政策中'
      },
      housing_fund: {
        /* Deposits are self-determined up to 50,000/month, but only 12% of the maximum
           deposit wage base (30,186) is deductible: 30,186 x 12% = 3,622.32. That base has
           been held at 30,186 since 2022 (unchanged in 2024 and in the fund centre's 2025
           annual report), so carrying it into 2026 is safe even though no 2026 document
           writes 3,622.32 down as a single figure. */
        mode: 'monthly_amount', maxMonthlyAmount: 50000, defaultMonthlyAmount: 0, deductible: true,
        maxDeductibleMonthlyAmount: 3622.32,
        note_en: 'Self-determined deposit up to ¥50,000/month; pre-tax deduction capped at ¥3,622.32/month '
          + '(12% x the ¥30,186 deposit wage base, unchanged since 2022; ¥43,467.84/year)',
        note_cn: '自主决定缴存金额，最高 50,000 元/月；税前扣除上限 3,622.32 元/月'
          + '（30,186 元缴存工资基数 × 12%，该基数自 2022 年起未调整；全年 43,467.84 元）'
      },
      supplementary_housing: { mode: 'monthly_amount', applicable: false }
    };
  }

  POLICY_DATA.itemOrder = [
    'pension', 'medical', 'unemployment', 'work_injury', 'maternity',
    'housing_fund', 'supplementary_housing'
  ];

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = POLICY_DATA;
  } else {
    root.POLICY_DATA = POLICY_DATA;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
