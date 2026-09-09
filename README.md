# 🧮 China Annual Income, Benefit & Tax Calculator

A bilingual web tool that calculates a full calendar year of social insurance, housing fund and comprehensive individual income tax, matching each month against the policy period actually in force.

---

## 📘 Overview

The calculator works on a **calendar year** (January to December). Each month is matched to the policy period that covers it, so a year that spans two policy cycles is calculated correctly. Annual amounts are always summed month by month — never one month multiplied by twelve.

### Supported Profiles

| Profile | Type |
|---|---|
| **Shanghai** 上海企业职工 | Corporation employee |
| **Shanghai Flexible Employment** 上海灵活就业 | Flexible employment |
| **Huzhou, Zhejiang** 浙江湖州灵活就业 | Flexible employment |

Each employment type keeps its own configuration and fallback rules. Nothing is inherited across cities or across employment types.

---

## ⚙️ Key Features

✅ **Per-month policy matching** — a calendar year can span several policy periods
✅ **Carried-over policy fallback** — months without official data reuse the latest period and are labelled as such
✅ **Editable monthly bases for flexible employment**, validated against each month's own range
✅ **Batch apply** a month's values to later months or the whole year, re-validated per month
✅ **Merged contributions module** — rates and annual amounts in one table
✅ **Income category selector for flexible employment** — salary, labor remuneration, author's remuneration or royalties, driving the expense deduction and the tax-exempt part
✅ **Annual comprehensive income tax** with expenses, tax-exempt income, special, additional special and other deductions
✅ **Bilingual interface** — 中文 by default, switchable to English at any time
✅ **Live USD→CNY exchange rate** with manual override

---

## 🗂️ Project Structure

| File | Purpose |
|---|---|
| `index.html` | Page markup and styling |
| `policy-data.js` | Policy data: profiles, policy periods, base groups, rates, tax brackets |
| `calc-engine.js` | Pure calculation engine: policy matching, monthly bases, annual totals, tax |
| `app.js` | UI layer: bilingual rendering, user overrides, event wiring |
| `tests.js` | Validation cases for the engine — run with `node tests.js` |

Policy data is kept out of the page code, so adding a new period or city means editing `policy-data.js` only.

---

## 📅 Policy Periods

Every period stores its own effective range, official/carried status and data source.

### Shanghai (both employee and flexible employment)

| Period | Social insurance base | Housing fund base |
|---|---:|---:|
| 2025.7–2026.6 | ¥7,460–¥37,302 | ¥2,690–¥37,302 |
| 2026.7–2027.6 | ¥7,546–¥37,731 | ¥2,740–¥37,731 |

A 2026 calculation uses the 2025.7–2026.6 period for January–June and the 2026.7–2027.6 period for July–December.

### Zhejiang / Huzhou flexible employment

| Item | Rule | Default | Personal rate |
|---|---|---:|---:|
| Basic pension | ¥4,986–¥25,299, self-selected | ¥4,986 | 20% |
| Basic medical | Unified local standard, not self-selected | ¥4,986 | 10.4% from 2025.09 (9.5% before) |
| Housing fund | Self-determined deposit, ≤ ¥50,000/month; pre-tax deduction capped at ¥3,622.32/month (¥43,467.84/year) | ¥0 | Amount, not a rate |
| Unemployment / work injury / maternity | Not applicable | — | — |

The housing fund deduction cap is derived rather than published as a single figure: Huzhou's flexible employment rules set a maximum deposit rate of 12% and the maximum deposit wage base is ¥30,186, giving ¥30,186 × 12% = ¥3,622.32 a month. That base has been held at ¥30,186 since the 2022 notice — unchanged in 2024, and confirmed again for 2025 in the Huzhou housing fund centre's annual report — so carrying it into 2026 is the well-supported assumption. Huzhou's own rules contain no "personal income × 12%" restriction. Deposits above the cap are still counted as money paid out, they are just not deducted before tax.

Pension and medical follow two different rules. The pension base is chosen freely within the provincial limits and is editable month by month; medical is a unified local standard that does not follow the chosen pension base, so raising the pension base leaves medical untouched. Huzhou's published standard is ¥518.54 a month from 2025.09 (¥4,986 × 10.4%, of which 2% = ¥99.72 goes to the personal account), so 2025 is split into two periods: January–August and September–December.

No 2026 figures have been published yet, so a 2026 calculation carries the 2025.09 period forward and every month is labelled **Carried over**.

---

## 🧾 Contribution Bases

**Corporation employees** — the base is derived and read-only:

```
base = min(max(monthly salary, lower limit), upper limit)
```

**Flexible employment** — the user chooses within the allowed range:

- Social insurance base defaults to the lower limit
- Housing fund base defaults to the upper limit
- Any month can be edited; the value is clamped to that month's range and flagged when adjusted
- Rates the policy lets the user choose (e.g. Shanghai flexible housing fund, 10%–24%) are editable too
- Each month has a **领取失业保险金 / on unemployment benefits** tick box. While a person draws unemployment benefits the unemployment insurance fund pays their basic medical insurance premium and the individual pays nothing (社会保险法 第四十八条), so ticked months contribute nothing to the annual medical total or to its pre-tax deduction; the contributions table names the months that were left out

The supplementary housing fund defaults to 0% and is filled in only when it applies. Corporate pension and group commercial insurance are not part of the contributions module: a corporate pension is entered as a deductible annual amount under other deductions, and group commercial insurance is out of scope.

---

## 💰 Annual Tax Calculation

```
Taxable comprehensive income
= annual income
− expenses
− tax-exempt income
− 60,000 standard deduction
− special deductions
− additional special deductions
− other deductions            (never below 0)

Tax = taxable income × rate − quick deduction
```

### Income categories (flexible employment)

| Category | Expenses | Tax-exempt part | Taxable share of income |
|---|---|---|---:|
| Salary and wages | none | none | 100% |
| Labor remuneration | income × 20% | none | 80% |
| Author's remuneration | income × 20% | (income − expenses) × 30% | 56% |
| Royalties | income × 20% | none | 80% |

Expenses and the tax-exempt part are derived from the category and shown read-only. Corporation employees are always salary and wages. The 60,000 standard deduction applies to every category.

**Special deductions** are filled in automatically from the calculated contributions (pension, medical, unemployment, housing fund, supplementary housing fund) and shown read-only.

**Additional special deductions** and **other deductions** are entered as the deductible amount for the year, not the amount actually spent. A corporate pension is entered here as its deductible amount; it is not part of the contributions module.

### Annual tax brackets

| Annual taxable income (CNY) | Rate | Quick deduction |
|---|---:|---:|
| ≤ 36,000 | 3% | 0 |
| 36,000–144,000 | 10% | 2,520 |
| 144,000–300,000 | 20% | 16,920 |
| 300,000–420,000 | 25% | 31,920 |
| 420,000–660,000 | 30% | 52,920 |
| 660,000–960,000 | 35% | 85,920 |
| > 960,000 | 45% | 181,920 |

Quick deductions are **derived**, not stored:

```
quick deduction(1) = 0
quick deduction(n) = quick deduction(n-1) + (rate n − rate n-1) × upper limit of bracket n-1
```

---

## 📊 Results

The results area is annual only — there is no monthly tax table.

- Taxable comprehensive income, with each deduction listed
- Applicable rate, quick deduction and annual individual income tax
- Annual gross salary, personal contributions, annual tax and net income
- Employer contributions and total employer cost (corporation employees only)

```
Net income = annual gross salary − personal contributions − annual tax
Employer cost = annual salary + employer contributions
```

Employer cost covers social insurance and housing fund only; corporate pension and employer-paid commercial insurance are not included.

Deductions reduce taxable income only; they are not cash outflows and are never subtracted from net income.

---

## 🚀 How to Use

1. Open `index.html` in any modern browser
2. Pick the city / employment type and the calculation year (the interface starts in Chinese)
3. Enter the monthly salary in USD or CNY — the annual total is calculated and read-only
4. Review the monthly bases; edit them where the policy allows
5. Adjust rates, deductions and additional deductions as needed
6. Read the annual results on the right

Run `node tests.js` to check the engine after changing policy data.

---

## 🔧 Technical Details

- Pure HTML/CSS/JavaScript, no build step and no external dependencies
- Calculation engine is framework-free and runs both in the browser and under node
- Responsive layout, real-time recalculation, complete bilingual UI
- Rounding: bases to 2 decimals, monthly amounts to the cent, annual amounts summed from monthly amounts
- One exchange rate is used for the whole year

---

## ⚠️ Scope & Limits

- Salary is a single monthly figure repeated across the year; per-month salaries and the separately taxed annual bonus are not supported
- Withholding (累计预扣法) is not shown; only the annual settlement figure is calculated, with no prepaid tax, refund or top-up
- Shanghai bases are derived from the current monthly salary rather than the previous year's average wage
- The Huzhou housing fund deduction cap (¥3,622.32/month) is derived from the 12% rate and the ¥30,186 deposit wage base rather than taken from an official 2026 figure; the base has not moved since 2022, but if Huzhou raises it the cap moves with it
