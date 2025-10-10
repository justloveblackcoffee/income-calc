# 🧮 China Benefit & Net Income Calculator

# 🇨🇳 中国五险一金及净收入计算器

## 📘 Overview / 概述

This web tool calculates **employer and employee contributions** to China's social insurance and housing funds, as well as **net take-home pay** after individual income tax. The interface supports both English and Chinese languages with real-time switching.
本网页工具可计算中国**企业与员工缴纳的社保与公积金金额**，并计算**员工税后净收入**。界面支持中英文双语实时切换。

It currently supports:
目前支持以下城市：

* Shanghai 上海 (2025 rates)
* Hangzhou 杭州 (2025 rates)

---

## ⚙️ Features / 功能特点

✅ **Bilingual Interface** - Real-time language switching (English/中文)
**双语界面** - 实时语言切换（英文/中文）

✅ **Automatic Currency Conversion** - USD ↔ RMB with live exchange rate
**自动货币转换** - 美元与人民币实时换算

✅ **City-Specific Configurations** - Pre-loaded 2025 rates and limits
**城市专属配置** - 预载2025年费率和基数限制

✅ **Real-time Calculations** - Instant updates when inputs change
**实时计算** - 输入变化时即时更新结果

✅ **Detailed Benefit Notes** - Contextual explanations for each benefit type
**详细福利说明** - 每个险种的背景说明

✅ **12-Month Tax Table** - Cumulative individual income tax calculation
**12个月个税表** - 累计个人所得税计算

✅ **Flexible Rate Adjustment** - Customize all benefit rates and limits
**灵活费率调整** - 可自定义所有福利费率和限制

✅ **Tax Deduction Settings** - Configure Corporate Pension pre-tax deduction rates
**税前扣除设置** - 配置企业年金税前扣除比例

✅ **Detailed Benefits Breakdown** - Clear visualization of deductible vs non-deductible amounts
**详细福利明细** - 清晰显示可扣除与不可扣除金额

---

## 💡 Inputs / 输入项

| English                            | 中文           | Description                         |
| ---------------------------------- | ------------ | ----------------------------------- |
| **Language Selection**             | **语言选择**      | English / 中文 real-time switching |
| Base Salary Monthly (USD)          | 月薪（美元）       | Can be edited; auto converts to RMB |
| Exchange Rate (USD→RMB)            | 汇率（美元兑人民币）   | Default 7.12, user can modify       |
| Base Salary Monthly (RMB)          | 月薪（人民币）      | Auto converts from USD              |
| City                               | 城市           | Shanghai / Hangzhou with 2025 rates |
| Social Insurance Upper/Lower Limit | 社保基数上限 / 下限  | Auto-loaded per city, user adjustable |
| Housing Fund Upper/Lower Limit     | 公积金基数上限 / 下限 | Auto-loaded per city, user adjustable |
| Employer & Employee Rates          | 企业 / 个人缴费比例  | City-specific defaults, fully customizable |
| Commercial Insurance               | 商业保险         | Employer annual cost (RMB/year)     |
| Enterprise Annuity Deduction Rate  | 企业年金税前扣除比例 | Percentage of Corporate Pension deductible (default 67%) |

---

## 📊 Benefits / 缴费项目

| No. | Category                   | 中文名称  | Notes / 说明                            |
| --- | -------------------------- | ----- | ------------------------------------- |
| 1   | Pension Insurance          | 养老保险  | Both employer and employee contribute |
| 2   | Medical Insurance          | 医疗保险  | Includes maternity (merged in 2019)   |
| 3   | Unemployment Insurance     | 失业保险  | Both share                            |
| 4   | Work Injury Insurance      | 工伤保险  | Employer only, rate varies by industry |
| 5   | Maternity Insurance        | 生育保险  | Merged into medical insurance         |
| 6   | Housing Provident Fund     | 住房公积金 | Mandatory within range (5%-12%)      |
| 7   | Supplementary Housing Fund | 补充公积金 | Optional (Shanghai only, 1%-6%)      |
| 8   | Corporate Pension          | 企业年金  | Optional, employer-defined            |
| 9   | Commercial Insurance       | 商业保险  | Optional, employer-defined (RMB/year) |

---

## 📐 Calculation Rules / 计算规则

1. **社保计算 Social Insurance (1–5)**
   * If base < lower limit → use lower limit
   * If base > upper limit → use upper limit
   * City-specific rates and limits (2025)

2. **公积金计算 Housing Fund (6–7)**
   * Same rule: bounded by lower/upper limit
   * Supplementary HF only available in Shanghai

3. **企业年金 (Corporate Pension)** uses actual base salary (no caps)

4. **Commercial Insurance** - Annual amount divided by 12 months

5. **Auto-recalculation triggers:**
   * Salary changes (USD/RMB)
   * City selection
   * Rate/limit modifications
   * Language switching

6. **汇总规则 Summary:**
   * Social Insurance = sum of 1–5
   * Housing Fund = sum of 6–7
   * Total Benefits = Employer + Employee parts

---

## 💰 Tax Calculation / 个税计算

**Monthly Taxable Income (月应纳税所得额)**
= Base Salary − 5000 RMB − Deductible Employee Benefits

Where **Deductible Employee Benefits** includes:
- All Employee Social Insurance + Housing Fund (100% deductible)
- Corporate Pension: Only the deductible portion (default 67% of total Corporate Pension)
- Non-deductible Corporate Pension portion is added back to taxable income

**Employee Net Take-home Pay (员工到手收入)**
= Monthly Taxable Income − Monthly Individual Income Tax Payable

**Individual Income Tax Table (综合所得税率表)**

| 年累计应纳税所得额 (CNY)   | 税率 (%) | 速算扣除数 (¥) |
| ----------------- | ------ | --------- |
| 0 – 36,000        | 3%     | 0         |
| 36,001 – 144,000  | 10%    | 2,520     |
| 144,001 – 300,000 | 20%    | 16,920    |
| 300,001 – 420,000 | 25%    | 31,920    |
| 420,001 – 660,000 | 30%    | 52,920    |
| 660,001 – 960,000 | 35%    | 85,920    |
| >960,000          | 45%    | 181,920   |

---

## 🧾 Output / 输出结果

* **Bilingual benefit breakdown** with detailed calculations
**双语福利明细表**，包含详细计算过程

* **Detailed Employee Benefits Breakdown** showing deductible vs non-deductible amounts
**详细个人福利明细**，显示可扣除与不可扣除金额

* **Corporate Pension Deduction Visualization** with clear percentage breakdown
**企业年金扣除明细**，清晰显示扣除比例

* **12-month progressive tax table** showing cumulative tax brackets
**12个月累进个税表**，显示累计税率档次

* **Real-time net income calculation** with formula explanation
**实时净收入计算**，包含公式说明

* **Employer vs Employee cost breakdown**
**企业与个人成本明细**

---

## ⚙️ Tax Deduction Settings / 税前扣除设置

### Corporate Pension Deduction / 企业年金扣除

The calculator now includes **Tax Deduction Settings** that allow you to configure how much of the Corporate Pension (企业年金) employee contribution can be deducted from taxable income.

**Default Setting**: 67% of Corporate Pension is deductible
**默认设置**: 67%的企业年金可税前扣除

**How it works:**
1. **Total Corporate Pension**: Full employee contribution amount
2. **Deductible Portion**: 67% of total (default, adjustable)
3. **Non-deductible Portion**: 33% of total (added back to taxable income)

**Formula**: Monthly Taxable Income = Base Salary - Standard Deduction - (Other Employee Benefits + Deductible Corporate Pension Portion)

---

## 🚀 How to Use / 使用方法

1. **Open `index.html`** in any modern browser
   **打开浏览器访问** `index.html`

2. **Select language** (English/中文) from the top-right dropdown
   **选择语言**（英文/中文）从右上角下拉菜单

3. **Enter salary** in USD or RMB (auto-converts)
   **输入月薪**（美元或人民币，自动转换）

4. **Choose city** (Shanghai/Hangzhou) for 2025 rates
   **选择城市**（上海/杭州）获取2025年费率

5. **Customize rates/limits** if needed (optional)
   **自定义费率**（如需要，可选）

6. **View results** in real-time as you type
   **实时查看结果**，输入时即时更新

---

## 🏙️ City Configurations / 城市配置

### Shanghai 上海 (2025)
- **Social Insurance Base**: ¥7,460 - ¥37,302
- **Housing Fund Base**: ¥2,690 - ¥37,302
- **Housing Fund Rate**: 7% (5%-7% range)
- **Supplementary HF**: Available (1%-6%)
- **Commercial Insurance**: ¥2,000/year default

### Hangzhou 杭州 (2025)
- **Social Insurance Base**: ¥4,986 - ¥25,299
- **Housing Fund Base**: ¥2,490 - ¥40,694
- **Housing Fund Rate**: 12% (5%-12% range)
- **Supplementary HF**: Not available
- **Commercial Insurance**: ¥0/year default

---

## 🔧 Technical Details / 技术细节

- **Pure HTML/CSS/JavaScript** - No external dependencies
- **Responsive design** - Works on desktop and mobile
- **Real-time calculations** - Instant updates on input changes
- **Bilingual support** - Complete UI translation
- **City-specific data** - Pre-configured 2025 rates and limits
- **Progressive tax calculation** - Accurate cumulative tax brackets
