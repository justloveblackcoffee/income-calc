# 🧮 China Benefit & Net Income Calculator

# 🇨🇳 中国五险一金及净收入计算器

## 📘 Overview / 概述

This web tool calculates **employer and employee contributions** to China’s social insurance and housing funds, as well as **net take-home pay** after individual income tax.
本网页工具可计算中国**企业与员工缴纳的社保与公积金金额**，并计算**员工税后净收入**。

It currently supports:
目前支持以下城市：

* Shanghai 上海
* (Hangzhou 杭州 — coming soon 可后续添加)

---

## ⚙️ Features / 功能特点

✅ Automatic conversion between USD and RMB
自动在美元与人民币之间换算

✅ Default city configurations (upper/lower limits, rates)
城市默认配置（基数上下限、缴费比例）

✅ Auto-updating benefit calculations when salary changes
修改月薪时自动刷新计算结果

✅ Tooltip notes for each benefit (可选)
每个险种可添加提示说明

✅ Displays 12-month cumulative individual income tax table
显示 12 个月个人所得税累计表

---

## 💡 Inputs / 输入项

| English                            | 中文           | Description                         |
| ---------------------------------- | ------------ | ----------------------------------- |
| Base Salary Monthly (USD)          | 月薪（美元）       | Can be edited; auto converts to RMB |
| Exchange Rate (USD→RMB)            | 汇率（美元兑人民币）   | Default 7.12, user can modify       |
| Base Salary Monthly (RMB)          | 月薪（人民币）      | Auto converts from USD              |
| City                               | 城市           | Supports Shanghai / Hangzhou        |
| Social Insurance Upper/Lower Limit | 社保基数上限 / 下限  | User can modify defaults            |
| Housing Fund Upper/Lower Limit     | 公积金基数上限 / 下限 | User can modify defaults            |
| Employer & Employee Rates          | 企业 / 个人缴费比例  | Default values for each benefit     |
| Commercial Insurance               | 商业保险         | Employer annual cost (RMB/year)     |

---

## 📊 Benefits / 缴费项目

| No. | Category                   | 中文名称  | Notes / 说明                            |
| --- | -------------------------- | ----- | ------------------------------------- |
| 1   | Pension Insurance          | 养老保险  | Both employer and employee contribute |
| 2   | Medical Insurance          | 医疗保险  | Includes maternity                    |
| 3   | Unemployment Insurance     | 失业保险  | Both share                            |
| 4   | Work Injury Insurance      | 工伤保险  | Employer only                         |
| 5   | Maternity Insurance        | 生育保险  | Merged into medical                   |
| 6   | Housing Provident Fund     | 住房公积金 | Mandatory within range                |
| 7   | Supplementary Housing Fund | 补充公积金 | Optional                              |
| 8   | Corporate Pension          | 企业年金  | Optional                              |
| 9   | Commercial Insurance       | 商业保险  | Optional, employer-defined            |

---

## 📐 Calculation Rules / 计算规则

1. **社保计算 Social Insurance (1–5)**

   * If base < lower limit → use lower limit
   * If base > upper limit → use upper limit

2. **公积金计算 Housing Fund (6–7)**

   * Same rule: bounded by lower/upper limit

3. **企业年金 (Corporate Pension)** uses actual base salary

4. Automatically recalculates when user inputs base salary or switches city

5. **汇总规则 Summary:**

   * Social Insurance = sum of 1–5
   * Housing Fund = sum of 6–7
   * Total Benefits = Employer + Employee parts

---

## 💰 Tax Calculation / 个税计算

**Monthly Taxable Income (月应纳税所得额)**
= Base Salary − 5000 RMB − (Employee Social Insurance + Housing Fund + Corporate Pension)

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

* Detailed benefit breakdown (明细表)
* Monthly & cumulative tax table (月度与累计个税表)
* Net monthly income (月到手收入)

---

## 🚀 How to Use / 使用方法

1. Open `index.html` in any browser 打开浏览器访问 `index.html`
2. Enter your salary (USD or RMB) 输入月薪（美元或人民币）
3. Adjust city, limits, or rates if needed 调整城市、上下限、比例
4. View results instantly in the “计算结果” section 实时查看计算结果

---

## 🧩 Future Enhancements / 后续功能

* Add Hangzhou defaults 添加杭州默认配置
* Add tooltip descriptions for each benefit 险种提示信息
* API-based live exchange rate 实时汇率获取
* Data export to CSV 导出计算结果为 CSV
