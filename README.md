# China Benefit & Net Income Calculator / 中国五险一金及净收入计算器

## Overview / 概述

This HTML calculator allows users to calculate social insurance, housing fund contributions, and net income in China. It supports key cities and provides detailed monthly tax calculations.

该HTML计算器用于计算中国五险一金缴费及净收入。支持主要城市，并提供详细的每月个人所得税计算。

---

## Features / 功能

* Input base salary in USD or RMB; auto-convert between currencies. / 输入月薪（美元或人民币），可自动换算。
* Select city (Shanghai or Hangzhou). / 选择城市（上海或杭州）。
* Configure social insurance and housing fund upper/lower limits. / 配置社保和公积金上下限。
* Configure employer and employee contribution rates for:

  * Pension Insurance / 养老保险
  * Medical Insurance / 医疗保险
  * Unemployment Insurance / 失业保险
  * Work Injury Insurance / 工伤保险
  * Maternity Insurance / 生育保险
  * Housing Provident Fund / 住房公积金
  * Supplementary Housing Fund / 补充公积金
  * Corporate Pension / 企业年金
* Input annual commercial insurance cost. / 输入商业保险年缴费用。
* Automatically calculate benefits, taxable income, monthly tax, and net pay. / 自动计算五险一金缴费、应纳税所得额、每月税额及到手工资。
* Displays a 12-month cumulative tax table. / 显示12个月累计个人所得税表。

---

## Inputs / 输入项

1. Base Salary Monthly (USD) / 月薪（美元）
2. Exchange Rate USD→RMB / 汇率（美元→人民币）
3. Base Salary Monthly (RMB) / 月薪（人民币）
4. City / 城市
5. Social Insurance Upper Limit / 社保上限
6. Social Insurance Lower Limit / 社保下限
7. Housing Fund Upper Limit / 公积金上限
8. Housing Fund Lower Limit / 公积金下限
9. Employer Rate for each benefit / 企业缴费比例
10. Employee Rate for each benefit / 个人缴费比例
11. Commercial Insurance annual cost (RMB) / 商业保险年缴费用（人民币）

---

## Calculation Rules / 计算规则

1. If salary is below lower limit, use lower limit for social insurance or housing fund calculation. / 若月薪低于下限，则按下限计算社保或公积金。
2. If salary is above upper limit, use upper limit for social insurance or housing fund calculation. / 若月薪高于上限，则按上限计算社保或公积金。
3. Taxable income = Monthly Salary - Standard Deduction (¥5000) - (Social Insurance + Housing Fund + Corporate Pension). / 应纳税所得额 = 月薪 - 5000 - (五险 + 公积金 + 企业年金)
4. Employee net take-home pay = Monthly Taxable Income - Monthly Individual Income Tax. / 员工月到手工资 = 月应纳税所得额 - 月个税
5. Monthly tax table is calculated cumulatively for 12 months using China's annual comprehensive income tax brackets. / 按中国居民综合所得税率表计算12个月累计税额。

---

## Cities Supported / 支持城市

* Shanghai / 上海
* Hangzhou / 杭州

---

## How to Use / 使用方法

1. Open `index.html` in a web browser. / 在浏览器中打开 `index.html`
2. Enter your monthly salary and exchange rate. / 输入月薪及汇率
3. Select city and adjust any limits or rates if needed. / 选择城市并根据需要调整上下限和缴费比例
4. Results will update automatically. / 计算结果会自动显示

---

## Notes / 注意事项

* Ensure input values are numeric. / 确保输入为数字
* Commercial insurance is optional; default is ¥2000/year. / 商业保险为可选，默认2000元/年
* Calculation uses default Shanghai limits; adjust for Hangzhou manually if needed. / 默认使用上海上下限，如需杭州可手动调整
