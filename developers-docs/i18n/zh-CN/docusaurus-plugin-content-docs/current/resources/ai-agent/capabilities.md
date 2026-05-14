---
title: 能力
sidebar_position: 4
---

# 能力

[mixin-skills](https://github.com/LixvYang/mixin-skills) 会根据开发场景加载对应的 Mixin 指南，帮助 AI 助手生成更接近官方 SDK 用法的代码。

## 技能覆盖范围

| 技能 | 覆盖内容 |
|------|----------|
| `mixin-bot` | keystore 加载、JWT 认证、消息收发、Blaze WebSocket、会话管理 |
| `mixin-safe` | Safe UTXO 转账、提现、ghost key、MixAddress、资产和快照查询 |
| `mixin-computer` | Mixin Computer 客户端、AddUser、SystemCall |
| `mixin-mtg-multisig` | MTG 程序、observer / signer、FROST 签名会话 |
| `mixin-oauth` | Mixin OAuth 登录，包含前端 PKCE 和后端 `client_secret` 流程 |

## 消息

| 操作 | 相关 SDK / 接口 |
|------|-----------------|
| 发送文本消息 | `client.message.sendText(userId, text)` |
| 发送 App Card | `client.message.sendLegacy({ category: "APP_CARD", ... })` |
| 接收实时消息 | Blaze WebSocket loop |
| 创建或管理群组 | `client.conversation.create()` |

## 钱包和资产

| 操作 | 相关 SDK / 接口 |
|------|-----------------|
| 查询 Safe 余额 | 聚合 `client.utxo.safeOutputs()` 返回的 UTXO |
| 获取资产信息 | `client.safe.fetchAssets([assetId])` |
| 查询余额变动 | `/safe/snapshots` 或 SDK 的 Safe snapshots 方法 |

## 转账

所有 Safe 转账、提现、multisig 资产操作都需要 `spend_private_key`。

| 操作 | 示例 |
|------|------|
| 转账给用户 | [05-transfer](https://github.com/LixvYang/mixin-ai-agent-demo/blob/main/examples/05-transfer.mjs) |
| 转出全部资产 | `mixin-safe` skill 中的 `safe-transfer-all.mjs` |

## OAuth

如果要让用户通过 Mixin 登录网页应用，可以使用 `mixin-oauth` skill。后端授权码交换需要在开发者后台获取 `client_secret`，前端 PKCE 流程则不需要把 `client_secret` 放到浏览器。

更多细节见 [OAuth API 文档](/docs/api/oauth)。
