---
title: "大模型服务与 API 价格对比（备忘）"
date: 2026-04-03
category: tools
tags: [llm, api, pricing, notes]
description: "主流云厂商与独立 API 的模型名称、计价方式与官方定价链接；附各地区可用性原链。"
---

本文整理当时常见 **大语言模型 API** 的公开标价与 **国家/地区** 说明页，便于自己对比成本。价格与模型名会随厂商更新而变化，**下单前务必以各服务商官网为准**。

## 阅读说明

| 概念 | 说明 |
|------|------|
| **计价单位** | 若无特殊说明，下表为 **美元（USD）**，按 **每百万 token（1M tokens）** 计费。 |
| **输入 / 输出** | 多数厂商对 **prompt（输入）** 与 **completion（输出）** 分别标价；输出通常更贵。 |
| **其他计费** | **缓存**（cached input / prompt cache）、**批处理**（Batch）、**长上下文分档**（如 &gt;200K tokens 加价）、**推理/思考 token** 等可能单独计价，见各官方「Pricing」页。 |
| **汇率** | 若使用人民币结算（如国内云），以账单与官网为准，本文不展开换算。 |

---

## 1. OpenAI API

**定价（官方）**：[OpenAI API Pricing](https://platform.openai.com/docs/pricing)  

**支持的国家与地区**：[Supported countries and territories](https://platform.openai.com/docs/supported-countries)

以下为文档中 **Standard** 档、**每 1M tokens** 标价节选（含常见 **cached input** 列，无则标 `-`）。

| API / 模型名 | Input (USD) | Cached input (USD) | Output (USD) |
|--------------|-------------|----------------------|--------------|
| `gpt-5.4`（&lt;272K context） | 2.50 | 0.25 | 15.00 |
| `gpt-5.4-mini` | 0.75 | 0.075 | 4.50 |
| `gpt-5.4-nano` | 0.20 | 0.02 | 1.25 |
| `gpt-4o` | 2.50 | 1.25 | 10.00 |
| `gpt-4o-mini` | 0.15 | 0.075 | 0.60 |

另提供 **Batch**、**Flex**、**Priority** 等档位，单价不同，见 [Pricing](https://platform.openai.com/docs/pricing)。

---

## 2. Anthropic（Claude API）

**定价（官方）**：[Claude API — Pricing](https://docs.anthropic.com/en/docs/about-claude/pricing)  

**API 覆盖地区列表**：[Supported regions](https://docs.anthropic.com/en/api/supported-regions)  

**面向消费者的说明**：[Supported countries](https://www.anthropic.com/supported-countries)

同一模型还有 **Prompt caching**（5 分钟 / 1 小时 cache write、cache hit）等加价或折扣，下表为文档中的 **Base input / Output**（每 1M tokens，USD）节选。

| 模型 | Base input | Output |
|------|------------|--------|
| Claude Opus 4.6 | 5.00 | 25.00 |
| Claude Sonnet 4.6 | 3.00 | 15.00 |
| Claude Haiku 4.5 | 1.00 | 5.00 |

Claude 亦可通过 **AWS Bedrock**、**Google Vertex AI**、**Microsoft Foundry** 等调用，价格与区域策略以各云文档为准（Anthropic 文档中有 [Third-party platform pricing](https://docs.anthropic.com/en/docs/about-claude/pricing) 汇总链接）。

---

## 3. Google（Gemini API / AI Studio）

**定价（官方）**：[Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing)  

**Gemini API / AI Studio 可用地区**：[Available regions](https://ai.google.dev/gemini-api/docs/available-regions)  

**企业侧（Vertex AI）**：[Vertex AI generative AI pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing)

Gemini 多款模型对 **prompt 长度** 分档（例如 ≤200K 与 &gt;200K tokens 单价不同），且区分 **Standard / Batch / Flex / Priority**。下表为 **Gemini 3.1 Pro Preview** 与 **Gemini 3.1 Flash-Lite Preview** 的 **Paid tier、Standard** 节选（每 1M tokens，USD；Pro 的 input/output 随 prompt 长度变化）。

| 模型 | 计价说明（节选） |
|------|------------------|
| `gemini-3.1-pro-preview` | Input：≤200K 为 **$2.00**，&gt;200K 为 **$4.00**；Output：≤200K 为 **$12.00**，&gt;200K 为 **$18.00**（均含 thinking tokens 等规则，见定价页） |
| `gemini-3.1-flash-lite-preview` | Input（文本/图/视频）：**$0.25**；Output：**$1.50**；音频输入单价不同 |

另有 **Batch（约 50% 折扣）**、**Grounding**（搜索调用次数）等条目，以 [定价页](https://ai.google.dev/gemini-api/docs/pricing) 为准。

---

## 4. DeepSeek API

**定价（官方）**：[Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing)

| 模型 | 说明 | 1M input（USD） | 1M output（USD） |
|------|------|-----------------|------------------|
| `deepseek-chat` | DeepSeek-V3.2，非思考模式 | Cache miss：**0.28**；Cache hit：**0.028** | **0.42** |
| `deepseek-reasoner` | 同系列，思考模式 | 同上 | **0.42** |

**Base URL**：[https://api.deepseek.com](https://api.deepseek.com/)（见官方文档）。地区与合规要求以 [DeepSeek 用户协议 / 文档](https://api-docs.deepseek.com/) 更新为准。

---

## 5. Mistral AI（La Plateforme API）

**定价**：[Mistral — Pricing](https://mistral.ai/pricing) · [Docs — Pricing](https://docs.mistral.ai/getting-started/pricing/)

文档指向官网 **API pricing** 表格，型号（如 Mistral Large / Medium / Small）与 **每百万 token** 单价以页面实时展示为准，此处不抄录易过期数字。

---

## 6. 阿里云 Model Studio（通义 / DashScope，OpenAI 兼容）

**模型与价格**：[Model list](https://www.alibabacloud.com/help/en/model-studio/models)  

**计费说明**：[Billable items / Model Studio billing](https://www.alibabacloud.com/help/en/model-studio/billing-for-model-studio)

特点概要：

- 多 **地域**（如新加坡、美东、北京、香港、法兰克福等），**Endpoint、定价、可用模型** 可能不同，见 [What is Model Studio](https://www.alibabacloud.com/help/en/model-studio/what-is-model-studio) 中的区域说明。
- 常见为 **人民币** 按量计费，并与 **模型版本**（如 Qwen-Plus / Flash / Max）挂钩，需直接在 **Model list** 中查当前单价。

---

## 7. 其他常见渠道（同模型、不同账单主体）

| 渠道 | 说明 | 官方定价入口 |
|------|------|----------------|
| **Azure OpenAI** | 微软云上托管 OpenAI 模型 | [Azure OpenAI pricing](https://azure.microsoft.com/pricing/details/cognitive-services/openai-service/) |
| **AWS Bedrock** | 多厂商模型托管，含 Claude 等 | [Amazon Bedrock pricing](https://aws.amazon.com/bedrock/pricing/) |
| **Google Vertex AI** | 企业向 Gemini 等 | [Vertex AI pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing) |

---

## 数据来源与更新方式

- 文中 **标价与模型名** 整理自各厂商 **2026 年前后** 公开发布的 Pricing / Models 页面；**地区列表** 均链接到官方「Supported regions / Available regions」类文档。
- **请勿将本文当作财务或合规承诺**；API 名称、价格、可用区域可能随时变更，请以点击后的官网为准。
- 若你发现某条链接失效或表格与官网不一致，以 **官网当前页** 为准并可自行更新本站这篇 Markdown。

---

## 参考链接汇总

| 服务商 | 定价 | 地区 / 可用性 |
|--------|------|----------------|
| OpenAI | [Pricing](https://platform.openai.com/docs/pricing) | [Supported countries](https://platform.openai.com/docs/supported-countries) |
| Anthropic | [Pricing](https://docs.anthropic.com/en/docs/about-claude/pricing) | [Supported regions](https://docs.anthropic.com/en/api/supported-regions) |
| Google Gemini | [Pricing](https://ai.google.dev/gemini-api/docs/pricing) | [Available regions](https://ai.google.dev/gemini-api/docs/available-regions) |
| DeepSeek | [Pricing](https://api-docs.deepseek.com/quick_start/pricing) | 以官方文档 / 协议为准 |
| Mistral | [Pricing](https://mistral.ai/pricing) | 以官网与法律条款为准 |
| Alibaba Model Studio | [Models](https://www.alibabacloud.com/help/en/model-studio/models) | [Regions / FAQ](https://www.alibabacloud.com/help/en/model-studio/what-is-model-studio) |
