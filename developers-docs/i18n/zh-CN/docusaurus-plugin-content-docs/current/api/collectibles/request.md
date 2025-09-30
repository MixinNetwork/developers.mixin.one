---
title: 发起藏品请求
sidebar_position: 3
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
  APIResponse,
} from "@site/src/components/api";

## 生成藏品请求

### POST /collectibles/requests

创建一条藏品请求。

<APIEndpoint url="/collectibles/requests" />

<APIMetaPanel scope="Authorized" />

<APIPayload>{`{
  "action": "操作类型，可选 'sign' 或 'unlock'",
  "raw": "符合主网规范的交易原文"
}
`}</APIPayload>

:::info
`raw` 为遵循主网规范的交易。可参考我们在 [仓库](https://github.com/MixinNetwork/multisig-bot/tree/main/common) 中提供的 Go 与 JS 实现。
:::

<APIRequest
  title="POST collectible request"
  method="POST"
  url='/collectibles/requests --data &apos;{"action": "sign", "raw": "298281....4952f95768b7d1a925c4189b912c343dbb000180e"}&apos;'
/>

请求体示例：

<APIResponse name="collectible_request" />

## 发起藏品签名

### POST /collectibles/requests/:id/:action

<APIEndpoint url="/collectibles/requests/:id/:action" />

<APIMetaPanel scope="Authorized" />

<APIParams
  p-action="操作类型，可选 `sign`、`cancel`、`unlock`"
  p-action-required={true}
  p-pin_base64="加密后的 PIN"
  p-pin-required={true}
/>

## 生成 TIP PIN

```
"TIP:COLLECTIBLE:REQUEST:SIGN:" + request_id

sign 操作的 pin_base64 为上述字符串的 sha256-256 摘要

"TIP:COLLECTIBLE:REQUEST:UNLOCK:" + request_id

unlock 操作的 pin_base64 为上述字符串的 sha256-256 摘要
```

<APIRequest
  title="operate the collectible request"
  method="POST"
  url='/collectibles/requests/:id/:action --data &apos;{"pin": "YOUR_PIN"}&apos;'
/>

请求体示例：

<APIResponse name="collectible_request" />

## 操作示例

### 发起或参与签名

```json
// 生成藏品请求
POST /collectibles/requests
{
  "action": "sign",
  "raw":    "298281....000180e"
}

// 对藏品请求签名
POST /collectibles/requests/:id/sign
```

### 撤销个人签名

```json
// 生成藏品请求
POST /collectibles/requests
{
  "action": "cancel",
  "raw":    "298281....000180e"
}

// 发送撤销签名请求
POST /collectibles/requests/:id/cancel
```

### 解除藏品锁定

```json
// 生成藏品请求
POST /collectibles/requests
{
  "action": "unlock",
  "raw":    "298281....000180e"
}

// 发送解除锁定请求
POST /collectibles/requests/:id/unlock
```
