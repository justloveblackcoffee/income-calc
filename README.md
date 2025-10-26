# 🧮 China Benefit & Net Income Calculator

A comprehensive web tool for calculating China's social insurance contributions, housing fund payments, and net take-home pay with bilingual support.

---

## 📘 Overview

This web application calculates **employer and employee contributions** to China's social insurance and housing funds, as well as **net take-home pay** after individual income tax. The interface supports both English and Chinese languages with real-time switching.

### Currently Supported Cities
* **Shanghai** (2025 rates)
* **Shanghai Flexible Employment** (2025 rates)
* **Hangzhou** (2025 rates)

---

## ⚙️ Key Features

✅ **Bilingual Interface** - Real-time language switching (English/中文)  
✅ **Automatic Currency Conversion** - USD ↔ RMB with live exchange rate  
✅ **City-Specific Configurations** - Pre-loaded 2025 rates and limits  
✅ **Real-time Calculations** - Instant updates when inputs change  
✅ **Detailed Benefit Notes** - Contextual explanations for each benefit type  
✅ **12-Month Tax Table** - Cumulative individual income tax calculation  
✅ **Flexible Rate Adjustment** - Customize all benefit rates and limits  
✅ **Tax Deduction Settings** - Configure Corporate Pension pre-tax deduction rates  
✅ **Detailed Benefits Breakdown** - Clear visualization of deductible vs non-deductible amounts  

---

## 💡 Input Parameters

| Parameter | Description |
|-----------|-------------|
| **Language Selection** | English / 中文 real-time switching |
| **Base Salary Monthly (USD)** | Can be edited; auto converts to RMB |
| **Exchange Rate (USD→RMB)** | Default 7.12, user can modify |
| **Base Salary Monthly (RMB)** | Auto converts from USD |
| **City** | Shanghai / Shanghai Flexible Employment / Hangzhou with 2025 rates |
| **Social Insurance Upper/Lower Limit** | Auto-loaded per city, user adjustable |
| **Housing Fund Upper/Lower Limit** | Auto-loaded per city, user adjustable |
| **Employer & Employee Rates** | City-specific defaults, fully customizable |
| **Commercial Insurance** | Employer annual cost (RMB/year) |
| **Enterprise Annuity Deduction Rate** | Percentage of Corporate Pension deductible (default 67%) |

---

## 📊 Benefit Categories

| No. | Category | Notes |
|-----|----------|-------|
| 1 | **Pension Insurance** | Both employer and employee contribute |
| 2 | **Medical Insurance** | Includes maternity (merged in 2019) |
| 3 | **Unemployment Insurance** | Both share |
| 4 | **Work Injury Insurance** | Employer only, rate varies by industry |
| 5 | **Maternity Insurance** | Merged into medical insurance |
| 6 | **Housing Provident Fund** | Mandatory within range (5%-12%) |
| 7 | **Supplementary Housing Fund** | Optional (Shanghai only, 1%-6%) |
| 8 | **Corporate Pension** | Optional, employer-defined |
| 9 | **Commercial Insurance** | Optional, employer-defined (RMB/year) |

---

## 📐 Calculation Rules

### 1. Social Insurance (Categories 1–5)
- If base < lower limit → use lower limit
- If base > upper limit → use upper limit
- City-specific rates and limits (2025)

### 2. Housing Fund (Categories 6–7)
- Same rule: bounded by lower/upper limit
- Supplementary HF only available in Shanghai

### 3. Corporate Pension
- Uses actual base salary (no caps)

### 4. Commercial Insurance
- Annual amount divided by 12 months

### 5. Auto-recalculation Triggers
- Salary changes (USD/RMB)
- City selection
- Rate/limit modifications
- Language switching

### 6. Summary Rules
- Social Insurance = sum of categories 1–5
- Housing Fund = sum of categories 6–7
- Total Benefits = Employer + Employee parts

---

## 💰 Tax Calculation

### Monthly Taxable Income
```
= Base Salary − 5000 RMB − Deductible Employee Benefits
```

**Deductible Employee Benefits include:**
- All Employee Social Insurance + Housing Fund (100% deductible)
- Corporate Pension: Only the deductible portion (default 67% of total Corporate Pension)
- Non-deductible Corporate Pension portion is added back to taxable income

### Employee Net Take-home Pay
```
= Monthly Taxable Income − Monthly Individual Income Tax Payable
```

### Individual Income Tax Table

| Annual Taxable Income (CNY) | Tax Rate (%) | Quick Deduction (¥) |
|------------------------------|--------------|-------------------|
| 0 – 36,000 | 3% | 0 |
| 36,001 – 144,000 | 10% | 2,520 |
| 144,001 – 300,000 | 20% | 16,920 |
| 300,001 – 420,000 | 25% | 31,920 |
| 420,001 – 660,000 | 30% | 52,920 |
| 660,001 – 960,000 | 35% | 85,920 |
| >960,000 | 45% | 181,920 |

---

## 🧾 Output Results

* **Bilingual benefit breakdown** with detailed calculations
* **Detailed Employee Benefits Breakdown** showing deductible vs non-deductible amounts
* **Corporate Pension Deduction Visualization** with clear percentage breakdown
* **12-month progressive tax table** showing cumulative tax brackets
* **Real-time net income calculation** with formula explanation
* **Employer vs Employee cost breakdown**

---

## ⚙️ Tax Deduction Settings

### Corporate Pension Deduction

The calculator includes **Tax Deduction Settings** that allow you to configure how much of the Corporate Pension employee contribution can be deducted from taxable income.

**Default Setting**: 67% of Corporate Pension is deductible

**How it works:**
1. **Total Corporate Pension**: Full employee contribution amount
2. **Deductible Portion**: 67% of total (default, adjustable)
3. **Non-deductible Portion**: 33% of total (added back to taxable income)

**Formula**: 
```
Monthly Taxable Income = Base Salary - Standard Deduction - (Other Employee Benefits + Deductible Corporate Pension Portion)
```

---

## 🚀 How to Use

1. **Open `index.html`** in any modern browser
2. **Select language** (English/中文) from the top-right dropdown
3. **Enter salary** in USD or RMB (auto-converts)
4. **Choose city** (Shanghai/Shanghai Flexible Employment/Hangzhou) for 2025 rates
5. **Customize rates/limits** if needed (optional)
6. **View results** in real-time as you type

---

## 🏙️ City Configurations

### Shanghai (2025)
- **Social Insurance Base**: ¥7,460 - ¥37,302
- **Housing Fund Base**: ¥2,690 - ¥37,302
- **Housing Fund Rate**: 7% (5%-7% range)
- **Supplementary HF**: Available (1%-6%)
- **Commercial Insurance**: ¥2,000/year default

### Shanghai Flexible Employment (2025)
- **Social Insurance Base**: ¥7,460 - ¥7,460 (fixed at minimum)
- **Housing Fund Base**: ¥2,690 - ¥37,302
- **Employee Rates**: Pension 20%, Medical 10%, Housing Fund 24%
- **Employer Rates**: All 0% (self-employed)
- **Other Benefits**: Not applicable for flexible employment

### Hangzhou (2025)
- **Social Insurance Base**: ¥4,986 - ¥25,299
- **Housing Fund Base**: ¥2,490 - ¥40,694
- **Housing Fund Rate**: 12% (5%-12% range)
- **Supplementary HF**: Not available
- **Commercial Insurance**: ¥0/year default

---

## 🔧 Technical Details

- **Pure HTML/CSS/JavaScript** - No external dependencies
- **Responsive design** - Works on desktop and mobile
- **Real-time calculations** - Instant updates on input changes
- **Bilingual support** - Complete UI translation
- **City-specific data** - Pre-configured 2025 rates and limits
- **Progressive tax calculation** - Accurate cumulative tax brackets

---

# 🇨🇳 中国五险一金及净收入计算器

一个全面的网页工具，用于计算中国社保缴费、公积金支付和净收入，支持双语界面。

---

## 📘 概述

本网页工具可计算中国**企业与员工缴纳的社保与公积金金额**，并计算**员工税后净收入**。界面支持中英文双语实时切换。

### 目前支持的城市
* **上海** (2025年费率)
* **上海灵活就业** (2025年费率)
* **杭州** (2025年费率)

---

## ⚙️ 功能特点

✅ **双语界面** - 实时语言切换（英文/中文）  
✅ **自动货币转换** - 美元与人民币实时换算  
✅ **城市专属配置** - 预载2025年费率和基数限制  
✅ **实时计算** - 输入变化时即时更新结果  
✅ **详细福利说明** - 每个险种的背景说明  
✅ **12个月个税表** - 累计个人所得税计算  
✅ **灵活费率调整** - 可自定义所有福利费率和限制  
✅ **税前扣除设置** - 配置企业年金税前扣除比例  
✅ **详细福利明细** - 清晰显示可扣除与不可扣除金额  

---

## 💡 输入参数

| 参数 | 描述 |
|------|------|
| **语言选择** | 英文/中文实时切换 |
| **月薪（美元）** | 可编辑；自动转换为人民币 |
| **汇率（美元兑人民币）** | 默认7.12，用户可修改 |
| **月薪（人民币）** | 从美元自动转换 |
| **城市** | 上海/上海灵活就业/杭州，使用2025年费率 |
| **社保基数上限/下限** | 按城市自动加载，用户可调整 |
| **公积金基数上限/下限** | 按城市自动加载，用户可调整 |
| **企业/个人缴费比例** | 城市特定默认值，完全可自定义 |
| **商业保险** | 企业年度成本（人民币/年） |
| **企业年金税前扣除比例** | 企业年金可扣除百分比（默认67%） |

---

## 📊 缴费项目

| 编号 | 类别 | 说明 |
|------|------|------|
| 1 | **养老保险** | 企业和个人共同缴费 |
| 2 | **医疗保险** | 包含生育保险（2019年合并） |
| 3 | **失业保险** | 双方共同承担 |
| 4 | **工伤保险** | 仅企业缴费，费率因行业而异 |
| 5 | **生育保险** | 已合并到医疗保险 |
| 6 | **住房公积金** | 强制缴费，范围5%-12% |
| 7 | **补充公积金** | 可选（仅上海，1%-6%） |
| 8 | **企业年金** | 可选，企业定义 |
| 9 | **商业保险** | 可选，企业定义（人民币/年） |

---

## 📐 计算规则

### 1. 社保计算（项目1-5）
- 基数 < 下限 → 使用下限
- 基数 > 上限 → 使用上限
- 城市特定费率和限制（2025年）

### 2. 公积金计算（项目6-7）
- 相同规则：受上下限约束
- 补充公积金仅在上海可用

### 3. 企业年金
- 使用实际基本工资（无上限）

### 4. 商业保险
- 年度金额除以12个月

### 5. 自动重新计算触发条件
- 薪资变化（美元/人民币）
- 城市选择
- 费率/限制修改
- 语言切换

### 6. 汇总规则
- 社保 = 项目1-5之和
- 公积金 = 项目6-7之和
- 总福利 = 企业部分 + 个人部分

---

## 💰 个税计算

### 月应纳税所得额
```
= 基本工资 - 5000元 - 可扣除员工福利
```

**可扣除员工福利包括：**
- 所有员工社保 + 公积金（100%可扣除）
- 企业年金：仅可扣除部分（默认67%的企业年金总额）
- 不可扣除的企业年金部分加回到应纳税所得额

### 员工到手收入
```
= 月应纳税所得额 - 月应纳个人所得税
```

### 综合所得税率表

| 年累计应纳税所得额（元） | 税率（%） | 速算扣除数（元） |
|------------------------|-----------|------------------|
| 0 – 36,000 | 3% | 0 |
| 36,001 – 144,000 | 10% | 2,520 |
| 144,001 – 300,000 | 20% | 16,920 |
| 300,001 – 420,000 | 25% | 31,920 |
| 420,001 – 660,000 | 30% | 52,920 |
| 660,001 – 960,000 | 35% | 85,920 |
| >960,000 | 45% | 181,920 |

---

## 🧾 输出结果

* **双语福利明细表**，包含详细计算过程
* **详细个人福利明细**，显示可扣除与不可扣除金额
* **企业年金扣除明细**，清晰显示扣除比例
* **12个月累进个税表**，显示累计税率档次
* **实时净收入计算**，包含公式说明
* **企业与个人成本明细**

---

## ⚙️ 税前扣除设置

### 企业年金扣除

计算器包含**税前扣除设置**，允许您配置企业年金员工缴费中有多少可以从应纳税所得额中扣除。

**默认设置**：67%的企业年金可税前扣除

**工作原理：**
1. **企业年金总额**：员工缴费全额
2. **可扣除部分**：总额的67%（默认，可调整）
3. **不可扣除部分**：总额的33%（加回到应纳税所得额）

**公式**：
```
月应纳税所得额 = 基本工资 - 标准扣除 - （其他员工福利 + 可扣除企业年金部分）
```

---

## 🚀 使用方法

1. **打开浏览器访问** `index.html`
2. **选择语言**（英文/中文）从右上角下拉菜单
3. **输入月薪**（美元或人民币，自动转换）
4. **选择城市**（上海/上海灵活就业/杭州）获取2025年费率
5. **自定义费率**（如需要，可选）
6. **实时查看结果**，输入时即时更新

---

## 🏙️ 城市配置

### 上海（2025年）
- **社保基数**：¥7,460 - ¥37,302
- **公积金基数**：¥2,690 - ¥37,302
- **公积金费率**：7%（5%-7%范围）
- **补充公积金**：可用（1%-6%）
- **商业保险**：默认¥2,000/年

### 上海灵活就业（2025年）
- **社保基数**：¥7,460 - ¥7,460（固定为最低基数）
- **公积金基数**：¥2,690 - ¥37,302
- **个人缴费比例**：养老保险20%，医疗保险10%，住房公积金24%
- **单位缴费比例**：全部0%（自雇人员）
- **其他福利**：灵活就业不适用

### 杭州（2025年）
- **社保基数**：¥4,986 - ¥25,299
- **公积金基数**：¥2,490 - ¥40,694
- **公积金费率**：12%（5%-12%范围）
- **补充公积金**：不可用
- **商业保险**：默认¥0/年

---

## 🔧 技术细节

- **纯HTML/CSS/JavaScript** - 无外部依赖
- **响应式设计** - 支持桌面和移动设备
- **实时计算** - 输入变化时即时更新
- **双语支持** - 完整UI翻译
- **城市特定数据** - 预配置2025年费率和限制
- **累进税计算** - 准确的累计税率档次