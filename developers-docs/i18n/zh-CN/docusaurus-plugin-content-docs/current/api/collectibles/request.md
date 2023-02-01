---
title: 转让 NFT
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

## 转让 NFT 的请求

### POST /collectibles/requests

生成一个转让 NFT 的请求。

<APIEndpoint url="/collectibles/requests" />

<APIMetaPanel scope="Authorized" />

<APIPayload>{`{
  "action": "请求操作: 'sign' 或者 'unlock'",
  "raw": "这个交易的签名后数据"
}
`}</APIPayload>

:::info
`raw` 是按照主网要求生成的一个交易的 hash 值。可以参考 Go 跟 JS 的代码  [code](https://github.com/MixinNetwork/multisig-bot/tree/main/common)
:::

<APIRequest
  title="POST collectible request"
  method="POST"
  url='/collectibles/requests --data &apos;{"action": "sign", "raw": "298281....4952f95768b7d1a925c4189b912c343dbb000180e"}&apos;'
/>

请求的数据结构

<APIResponse name="collectible_request" />

## 对请求进行操作

### POST /collectibles/requests/:id/:action

<APIEndpoint url="/collectibles/requests/:id/:action" />

<APIMetaPanel scope="Authorized" />

<APIParams
  p-action="操作有: `sign`, `cancel` 跟 `unlock`"
  p-action-required={true}
  p-pin_base64="加密后的 PIN."
  p-pin-required={true}
/>

## TIP Pin 结构

```
"TIP:COLLECTIBLE:REQUEST:SIGN:" + request_id

sign 多签的 pin_base64 是上面值的 sha256-256 的结果

"TIP:COLLECTIBLE:REQUEST:UNLOCK:" + request_id

unlock 多签的 pin_base64 是上面值的 sha256-256 的结果
```

<APIRequest
  title="operate the collectible request"
  method="POST"
  url='/collectibles/requests/:id/:action --data &apos;{"pin": "YOUR_PIN"}&apos;'
/>

请求的数据结构

<APIResponse name="collectible_request" />

## 主要的操作

### 签名

```json
// Generate collectible request.
POST /collectibles/requests
{
  "action": "sign",
  "raw":    "298281....000180e"
}

// Sign collectible request.
POST /collectibles/requests/:id/sign
```

### 未签名时，取消签名请求

```json
// Generate collectible request.
POST /collectibles/requests
{
  "action": "cancel",
  "raw":    "298281....000180e"
}

// Send collectible cancelling request.
POST /collectibles/requests/:id/cancel
```

### 签名后取消签名，需要未达到签名数

```json
// Generate collectible request.
POST /collectibles/requests
{
  "action": "unlock",
  "raw":    "298281....000180e"
}

// Send collectible unlocking request.
POST /collectibles/requests/:id/unlock
```
