---
title: "中国大陆连接 Cursor 的网络配置"
date: "2025-03-26"
category: tools
tags: [notes]
description: "中国大陆连接 Cursor 的网络配置"
---

## 环境与工具

| 项 | 设置 |
|----|------|
| Cursor | 2.6.21 | 
| 操作系统 | Windows 10 |
| 工具 | Clash Verge + 可用机场 |

## Clash Verge：基础开关

- **系统代理**：关  
- **虚拟网卡模式**：开  

## 虚拟网卡（TUN）相关

建议项（按需与客户端版本对照）：

- **TUN 模式堆栈**：GVisor  
- **自动设置全局路由**、**严格路由**、**自动选择流量出口接口**：全开  
- **DNS 劫持**：`any:53`  
- **最大输出单元（MTU）**：文中示例为 `1480`（见下说明）  

### MTU 说明（TUN）

TUN 模式下的「最大输出单元」即 **MTU（Maximum Transmission Unit）**。常见参考：

- 一般以太网默认约 **1500** 字节。  
- 代理场景里，外层封装可能导致分片，常把 MTU **略调小**（例如 **1400–1492**），以减少分片、提高稳定性。  
- 若隧道层多或环境特殊，可适当再调小；封装层多时可减少分片开销。  

> 以上为通用经验，具体以你当前网络与 Clash 文档为准。

**参考链接：**

- [蒲公英 MTU 相关说明](https://pgy.oray.com/news/49078.html)  
- [隧道差异（iyyh.net）](https://iyyh.net/posts/tunnel-difference)  
- [Cursor 与 VPN（alicksurf）](https://alicksurf.com/blog/cursor-vpn)  

### 堆栈优先级（若客户端提供）

建议顺序：**System → GVisor → Mixed**

## 代理模式

使用 **规则** 模式。

## 将 Cursor 域名走代理（Clash 订阅 / 覆写）

1. 在 Cursor 中：`Ctrl + Shift + P` → 搜索 **Agent** → 打开 **Cursor Settings → Network → Copy Domains**，复制域名列表。  
2. 在 Clash Verge 的订阅里使用 **全局扩展覆写**，把上述域名加入规则；下面是一段 **示例**（域名以 Cursor 官方为准，请与 Copy Domains 对齐）：  

```yaml
# Profile Enhancement Merge Template for Clash Verge

profile:
  store-selected: true
prepend-rules:
  - DOMAIN,api2.cursor.sh,PROXY
  - DOMAIN,api3.cursor.sh,PROXY
  - DOMAIN,api4.cursor.sh,PROXY
  - DOMAIN-SUFFIX,api5.cursor.sh,PROXY
  - DOMAIN,repo42.cursor.sh,PROXY
  - DOMAIN-SUFFIX,authentication.cursor.sh,PROXY
  - DOMAIN,authenticator.cursor.sh,PROXY
  - DOMAIN-SUFFIX,cursorapi.com,PROXY
  - DOMAIN-SUFFIX,cursor-cdn.com,PROXY
  - DOMAIN-SUFFIX,cursor.com,PROXY
```

## Cursor：HTTP 兼容性

路径：**Cursor Settings → Network → HTTP Compatibility**

- **HTTP/2**：速度通常最好（文中经验：优先级可设为 **2**）。  
- **HTTP/1.1**：兼容性更好（优先级 **1.1**）。  
- **HTTP/1.0**：优先级 **1**；是否完全支持 Agent 模式需以实际版本为准。  

建议尝试顺序：**2 → 1.1 → 1**。

**个人经验（非通用结论）：** 曾用「系统代理 + HTTP/1.1」可用但偏慢、不稳；「TUN + HTTP/1.1」有稳定慢或不稳定慢的情况；「TUN + HTTP/2」在文中环境下效果较好。

## VS Code / Cursor：`settings.json`

`Ctrl + Shift + P` → **Open User Settings (JSON)**，可按需加入（端口与本地代理一致）：

```json
{
  "http.proxy": "http://127.0.0.1:7897",
  "http.proxyStrictSSL": false
}
```

## 网络诊断

`Ctrl + Shift + P` → **Cursor Settings → Networks → Run Diagnostics**，可查看各功能访问情况。
虽然切换成 **HTTP/2** 之后提示 
