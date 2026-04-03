---
title: "大模型服务与 API 价格对比（备忘）"
date: 2026-04-03
category: tools
tags: [llm, api, pricing, notes]
description: "云 API、IDE 订阅、聚合路由与官方文档链接；多地域以中美为参考；含 Qwen、OpenRouter、Codex、Gemini 等。"
---

本文整理常见 **大语言模型 API**、**IDE/Agent 产品** 的公开标价入口与 **国家/地区** 说明页，便于对比成本。价格与模型名会随时变更，**下单前务必以各服务商官网为准**。本文不构成法律或合规建议。

## 阅读说明

| 概念 | 说明 |
|------|------|
| **计价单位** | 若无特殊说明，云 API 多为 **美元（USD）**，按 **每百万 token（1M tokens）** 计费。 |
| **输入 / 输出** | 多数厂商对 **prompt（输入）** 与 **completion（输出）** 分别标价；输出通常更贵。 |
| **IDE / Agent** | Cursor、Trae、Claude Code、Codex 等常为 **订阅 + 用量配额** 或 **积分**，与「纯 API 按 token 开票」不是同一套账单。 |
| **聚合层** | OpenRouter 等在下游厂商标价上可能加收 **平台费**（如充值手续费），以对方定价页为准。 |

---

## 多地域与「参考地」说明（中国大陆 vs 美国）

很多厂商存在 **不同法律实体、不同账单币种、不同 Endpoint、不同可用模型清单**。下表仅作 **中国大陆** 与 **美国** 两地对照的**提示性**维度，具体能否使用、是否需备案、税务与数据出境等，**以合同、当地法律及官网为准**。

| 维度 | 中国大陆（参考） | 美国（参考） |
|------|------------------|--------------|
| **典型账单** | 人民币（¥）、国内云发票；阿里云百炼 / 北京 Endpoint 等 | USD；国际信用卡；OpenAI / Anthropic 等美区主体账单 |
| **访问方式** | 常通过 **国内云**（阿里云、腾讯云等）或 **合规备案** 产品 | 直接官网注册、国际信用卡 / 企业合同 |
| **数据与合规** | 常强调 **境内机房 / 不出境**（以厂商 SLA 为准） | 默认 **全球路由**；企业可买 **region / residency**（如 GCP/Azure 区域） |
| **同一品牌差异** | 例如 **阿里云 Model Studio（北京）** 与 **Alibaba Cloud International（新加坡）**：**API Key、Base URL、价目表、模型列表往往不互通** | **OpenAI / Anthropic** 等对 **制裁地区 / 禁运** 有单独列表，见各自 *Supported countries* |

**遇到「多地域」时**：请直接打开该产品的 **Pricing** + **Regions / Data residency** + **Terms** 三页，核对 **你账号所在区域** 与 **调用 Endpoint** 是否一致。

---

## 1. OpenAI（API）与 OpenAI Codex

### Chat / API 定价

**定价（官方）**：[OpenAI API Pricing](https://platform.openai.com/docs/pricing)  

**支持的国家与地区**：[Supported countries and territories](https://platform.openai.com/docs/supported-countries)

以下为文档中 **Standard** 档、**每 1M tokens** 标价节选（含常见 **cached input**）。

| API / 模型名 | Input (USD) | Cached input (USD) | Output (USD) |
|--------------|-------------|----------------------|--------------|
| `gpt-5.4`（&lt;272K context） | 2.50 | 0.25 | 15.00 |
| `gpt-5.4-mini` | 0.75 | 0.075 | 4.50 |
| `gpt-4o` | 2.50 | 1.25 | 10.00 |
| `gpt-4o-mini` | 0.15 | 0.075 | 0.60 |

另提供 **Batch**、**Flex**、**Priority** 等档位，见 [Pricing](https://platform.openai.com/docs/pricing)。

### OpenAI Codex（CLI / IDE / 云任务）

**Codex 产品与计价说明（官方）**：[Codex Pricing](https://developers.openai.com/codex/pricing/)  

**Help Center（用量、计划对照）**：[Codex rate card](https://help.openai.com/en/articles/20001106-codex-rate-card)

要点：

- Codex 与 **ChatGPT 订阅档位**、**API Key 按量** 等组合有关；**超出配额** 可购买 **Credits** 或走 **标准 API 单价**（见上表）。
- 文档中会列出 **GPT-5.3-Codex**、**GPT-5.4-mini** 等与 **Local / Cloud** 任务相关的用量；**按 token 折算 Credits** 的规则以官网当期说明为准。
- **与「只调 Chat Completions API」不同**：Codex 还涉及 **云任务、Code Review、Slack/GitHub 集成** 等，计费项更多，务必读 [Codex Pricing](https://developers.openai.com/codex/pricing/) 全文。

---

## 2. Anthropic（Claude API）与 Claude Code

### Claude API

**定价（官方）**：[Claude API — Pricing](https://docs.anthropic.com/en/docs/about-claude/pricing)  

**API 覆盖地区列表**：[Supported regions](https://docs.anthropic.com/en/api/supported-regions)  

**面向消费者的说明**：[Supported countries](https://www.anthropic.com/supported-countries)

| 模型 | Base input（USD/MTok） | Output（USD/MTok） |
|------|------------------------|---------------------|
| Claude Opus 4.6 | 5.00 | 25.00 |
| Claude Sonnet 4.6 | 3.00 | 15.00 |
| Claude Haiku 4.5 | 1.00 | 5.00 |

另有 **Prompt caching**、**Batch**、**第三方云（Bedrock / Vertex / Foundry）** 加价，见 [Pricing](https://docs.anthropic.com/en/docs/about-claude/pricing)。

### Claude Code（终端 / IDE / 桌面 / Web）

**产品概览（官方）**：[Claude Code overview](https://docs.anthropic.com/en/docs/claude-code/overview)  

**Claude 订阅价目**：[Claude Pricing](https://claude.com/pricing) · **Console**：[Anthropic Console](https://console.anthropic.com/)

要点：

- Claude Code 通常需要 **Claude 订阅** 或 **Anthropic Console** 账号；用量与 **API 按 token 直购** 不是同一套界面，以 [overview](https://docs.anthropic.com/en/docs/claude-code/overview) 与订阅页为准。
- 文档说明可在 **Cursor** 等第三方 IDE 中安装扩展使用。

---

## 3. Google（Gemini API / Vertex AI）

**定价（官方）**：[Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing)  

**Gemini API / AI Studio 可用地区**：[Available regions](https://ai.google.dev/gemini-api/docs/available-regions)  

**企业侧（Vertex AI）**：[Vertex AI generative AI pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing)

### 计价特点

- 多模型、多 **Tier**（Standard / Batch / Flex / Priority），且常按 **prompt 长度分档**（例如 ≤200K 与 &gt;200K tokens **单价不同**）。
- **图像生成 / 图像输出** 可能按 **token 折算成「每张图」** 展示，见各小节脚注。

### 模型线（节选，以定价页为准）

下表仅列 **模型 ID 与定位**，具体 **USD/MTok** 请点开定价页对应小节（数字更新极快）。

| 系列 | 代表模型 ID（示例） | 备注 |
|------|---------------------|------|
| **Gemini 3.1** | `gemini-3.1-pro-preview`、`gemini-3.1-flash-lite-preview`、`gemini-3.1-flash-live-preview` | Pro 常有 **长上下文分档**；Flash-Lite 偏成本 |
| **Gemini 3** | `gemini-3-flash-preview` | 定价页单独小节 |
| **Gemini 3 图像** | `gemini-3.1-flash-image-preview`、`gemini-3-pro-image-preview` | 官方在 **Gemini 3 Pro Image Preview** 标题旁使用 **🍌** 图标；社区有时把「带香蕉图标的图像模型」口语叫做「香蕉」系。**非独立产品名**，请以定价页 **Model ID** 为准。 |
| **Gemini 2.5** | `gemini-2.5-pro`、`gemini-2.5-flash`、`gemini-2.5-flash-lite` | **Flash-Lite** 常被视为「轻量 / 低价档」；与部分文章里的 **Nano** 称呼不要混用——**Google 当前公开定价以页面上的模型名为准**。 |

**Grounding**（Google Search / Maps）、**Context caching 存储费** 等另计，见 [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing)。

---

## 4. DeepSeek（开放平台 API）

### 官方文档入口（请收藏根路径）

| 用途 | 链接 |
|------|------|
| **文档首页** | [DeepSeek API Docs](https://api-docs.deepseek.com/) |
| **定价与当前 API 模型** | [Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing) |
| **Token 说明** | [Token & Token Usage](https://api-docs.deepseek.com/quick_start/token_usage) |
| **平台（密钥、充值）** | [platform.deepseek.com](https://platform.deepseek.com/) |
| **常见问题** | [FAQ](https://api-docs.deepseek.com/faq) |

### 当前定价表中的 API 模型（以官网为准）

开放平台 **定价页** 上以 **`deepseek-chat`**（非思考）与 **`deepseek-reasoner`**（思考）为主，对应 **DeepSeek-V3.2**，并给出 **cache hit / cache miss** 与 **output** 单价（USD/MTok）。见 [Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing)。

**说明**：你在 **App / 网页** 里看到的「DeepSeek 其它模型名」或历史文章中的 **Coder / V2** 等，**不一定**与「开放平台当前 `model` 字段枚举」一致。**补全（FIM）** 等能力见文档中的指南（如 [FIM Completion](https://api-docs.deepseek.com/guides/fim_completion)），计费仍应以 **定价页** 与 **控制台账单** 为准。

### 多地域提示

- 文档以 **国际版开放平台** 为主；**支付** 支持支付宝、微信、银行卡等（见 [FAQ - Billing](https://api-docs.deepseek.com/faq)）。
- **美国用户**：能否注册、支付方式是否受限，以 **平台注册页与 FAQ** 实时政策为准。

---

## 5. Mistral AI

### 官方文档入口

| 用途 | 链接 |
|------|------|
| **文档站** | [docs.mistral.ai](https://docs.mistral.ai/) |
| **模型列表** | [Models](https://docs.mistral.ai/getting-started/models/) |
| **定价（文档入口）** | [Docs — Pricing](https://docs.mistral.ai/getting-started/pricing/)（跳转至官网价目） |
| **商业价目** | [mistral.ai/pricing](https://mistral.ai/pricing)（含 **API pricing** 表格） |

**说明**：具体 **每百万 token** 单价以 [mistral.ai/pricing](https://mistral.ai/pricing) 实时表格为准；欧洲主体、**GDPR** 与 **区域部署** 见文档 [Deployment / Cloud](https://docs.mistral.ai/deployment/cloud)。

### 多地域提示

- **美国**：常见为直接信用卡购 API。
- **中国大陆**：无单独「DeepSeek 式」国内站时，通常走 **国际站** 或 **云市场转售**；能否使用以 **注册页与风控** 为准。

---

## 6. 通义千问 Qwen（阿里云 DashScope / Model Studio）

**国际站 · 模型与计费**：[Model list](https://www.alibabacloud.com/help/en/model-studio/models) · [Model Studio billing](https://www.alibabacloud.com/help/en/model-studio/billing-for-model-studio)  

**产品与区域说明**：[What is Model Studio](https://www.alibabacloud.com/help/en/model-studio/what-is-model-studio)（含 **新加坡 / 美东 / 北京 / 香港 / 法兰克福** 等 **不同 Base URL、不同定价**）

**中国大陆（中文文档，链接以官网为准）**：

- 搜索 **「大模型服务平台百炼」** 或 **「DashScope」** 进入当前 **模型价格** 与 **开通区域** 说明（域名与路径可能随阿里云改版调整，**请用阿里云站内搜索**）。

### 多地域（中美参考）

| 场景 | 说明 |
|------|------|
| **中国大陆** | 通常 **人民币**、**境内机房**；需阿里云中国账号与实名。 |
| **美国 / 国际** | **Alibaba Cloud International** 控制台；**API Key 与价目表与中国站不通用** 是常态。 |

---

## 7. Cursor（AI IDE）

**官网价目**：[cursor.com/pricing](https://cursor.com/pricing)  

**账户与计费说明**：[Pricing and plans](https://cursor.com/docs/account/billing/pricing) · [Usage-based charges](https://cursor.com/docs/account/billing/usage-based)（若链接变更，请在 [cursor.com/docs](https://cursor.com/docs) 搜索 *billing*）

要点：

- **Pro / Pro+ / Ultra** 等为 **订阅 + 用量积分（credits）** 逻辑，不同模型消耗速度不同，**不是**简单的「按百万 token 公开标价」。
- **多地域**：以 **你购买时的账号区域与支付方式** 为准；详见 Cursor 官方账单说明。

---

## 8. Trae（字节系 AI IDE）

**价目页**：[trae.ai/pricing](https://www.trae.ai/pricing)  

**计费文档**：[Trae IDE — Billing](https://docs.trae.ai/ide/billing) · [Terms of Service](https://www.trae.ai/terms-of-service)

要点：

- 常见为 **免费档 + Pro 订阅**；具体 **模型额度、快慢请求** 以 [Pricing](https://www.trae.ai/pricing) 与 [Billing 文档](https://docs.trae.ai/ide/billing) 为准。
- **多地域**：产品面向全球与部分地区逐步开放，**能否下载 / 是否提供中文站** 以官网为准；邮件支持见 Trae 价目页底部。

---

## 9. OpenRouter（聚合 API）

**价目与平台费**：[OpenRouter Pricing](https://openrouter.ai/pricing)  

**模型与单价目录**：[OpenRouter Models](https://openrouter.ai/models)  

**文档**：[OpenRouter Docs](https://openrouter.ai/docs/quickstart)

要点：

- **统一 OpenAI 兼容接口** 路由到 **多家底层厂商**；**每个模型** 在 [Models](https://openrouter.ai/models) 上有 **单独的 input/output 标价**。
- 官方说明：**不对推理单价加价**，但 **Pay-as-you-go** 可能对 **充值** 收取 **平台费**（如定价页所述比例）；另有 **Enterprise** 议价。
- **地域**：FAQ 提及 **Enterprise / Pay-as-you-go** 可选用 **区域路由**；细则见 [OpenRouter FAQ](https://openrouter.ai/docs/faq)。

---

## 10. 其他常见渠道（同模型、不同账单主体）

| 渠道 | 说明 | 官方定价入口 |
|------|------|----------------|
| **Azure OpenAI** | 微软云上托管 OpenAI 模型 | [Azure OpenAI pricing](https://azure.microsoft.com/pricing/details/cognitive-services/openai-service/) |
| **AWS Bedrock** | 多厂商模型托管 | [Amazon Bedrock pricing](https://aws.amazon.com/bedrock/pricing/) |
| **Google Vertex AI** | 企业向 Gemini 等 | [Vertex AI pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing) |

---

## 数据来源与更新方式

- **标价与模型名** 整理自各厂商公开发布的 Pricing / Models 页面；**地区列表** 链接到官方 Supported / Available regions。
- **请勿将本文当作财务或合规承诺**；API 名称、价格、可用区域可能随时变更，请以官网为准。

---

## 参考链接汇总

| 服务商 / 产品 | 定价 / 产品 | 地区 / 可用性 / 文档 |
|---------------|----------------|------------------------|
| OpenAI | [API Pricing](https://platform.openai.com/docs/pricing) | [Supported countries](https://platform.openai.com/docs/supported-countries) |
| OpenAI Codex | [Codex Pricing](https://developers.openai.com/codex/pricing/) | [Codex rate card](https://help.openai.com/en/articles/20001106-codex-rate-card) |
| Anthropic Claude | [API Pricing](https://docs.anthropic.com/en/docs/about-claude/pricing) | [Supported regions](https://docs.anthropic.com/en/api/supported-regions) |
| Claude Code | [Overview](https://docs.anthropic.com/en/docs/claude-code/overview) | [Claude Pricing](https://claude.com/pricing) |
| Google Gemini | [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing) | [Available regions](https://ai.google.dev/gemini-api/docs/available-regions) |
| DeepSeek | [API Docs](https://api-docs.deepseek.com/) · [Pricing](https://api-docs.deepseek.com/quick_start/pricing) | [FAQ](https://api-docs.deepseek.com/faq) |
| Mistral | [mistral.ai/pricing](https://mistral.ai/pricing) · [Docs](https://docs.mistral.ai/) | [Models](https://docs.mistral.ai/getting-started/models/) |
| Qwen / 阿里云 | [Model Studio (Intl)](https://www.alibabacloud.com/help/en/model-studio/models) | [Regions](https://www.alibabacloud.com/help/en/model-studio/what-is-model-studio) |
| Cursor | [Pricing](https://cursor.com/pricing) | [Billing](https://cursor.com/docs/account/billing/pricing) |
| Trae | [Pricing](https://www.trae.ai/pricing) | [Billing doc](https://docs.trae.ai/ide/billing) |
| OpenRouter | [Pricing](https://openrouter.ai/pricing) · [Models](https://openrouter.ai/models) | [FAQ](https://openrouter.ai/docs/faq) |
