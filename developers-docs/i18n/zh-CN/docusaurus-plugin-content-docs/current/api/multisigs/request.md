---
title: 多重签名请求
sidebar_position: 3
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

多重签名需要先请求 API，生成一个 request_id

## 创建多签请求

### POST /multisigs/requests

<APIEndpoint url="/multisigs/requests" />

<APIMetaPanel scope="Authorized" />

<APIPayload>{`{
  "action": "Operations: could be 'sign' or 'unlock'",
  "raw": "For transactions generated in accordance with the mainnet specifications"
}
`}</APIPayload>

:::info
`raw` 是主网的交易格式。参考 Golang 实现 [code](https://github.com/MixinNetwork/multisig-bot/tree/master/src/utils)
:::

<APIRequest
  title="Get Multisig Outputs"
  method="POST"
  url='/multisigs/requests --data &apos;{"action": "sign", "raw": "298281....4952f95768b7d1a925c4189b912c343dbb000180e"}&apos;'
/>

```json title="Response"
{
  "data": {
    "type": "multisig_request",
    "request_id": "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "user_id": "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "asset_id": "43d61dcd-e413-450d-80b8-101d5e903357",
    "amount": "10",
    "threshold": "2",
    "senders": [
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35"
    ],
    "receivers": [
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35"
    ],
    "signers": [
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35"
    ],
    "memo": "hello",
    "action": "sign",
    "state": "spent",
    "transaction_hash": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "raw_transaction": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "created_at": "2018-05-03T10:08:34.859542588Z",
    "code_id": "ab56be4c-5b20-41c6-a9c3-244f9a433f35"
  }
}
```

## 多签操作

### POST /multisigs/requests/:id/:action

<APIEndpoint url="/multisigs/requests/:id/:action" />

<APIMetaPanel scope="Authorized" />

<APIParams
  p-action="Operations: could be `sign`, `cancel`, and `unlock`"
  p-action-required={true}
  p-pin_base64="Encrypted PIN."
  p-pin-required={true}
/>

## TIP Pin 结构

```
"TIP:MULTISIG:REQUEST:SIGN:" + request_id

sign 多签的 pin_base64 是上面值的 sha256-256 的结果

"TIP:MULTISIG:REQUEST:UNLOCK:" + request_id

unlock 多签的 pin_base64 是上面值的 sha256-256 的结果
```

<APIRequest
  title="Get Multisig Outputs"
  method="POST"
  url='/multisigs/requests/:id/:action --data &apos;{"pin": "YOUR_PIN"}&apos;'
/>

```json title="Response"
{
  "data": {
    "type": "multisig_request",
    "request_id": "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "user_id": "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "asset_id": "43d61dcd-e413-450d-80b8-101d5e903357",
    "amount": "10",
    "threshold": "2",
    "senders": [
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35"
    ],
    "receivers": [
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35"
    ],
    "signers": [
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35"
    ],
    "memo": "hello",
    "action": "sign",
    "state": "spent",
    "transaction_hash": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "raw_transaction": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "created_at": "2018-05-03T10:08:34.859542588Z",
    "code_id": "ab56be4c-5b20-41c6-a9c3-244f9a433f35"
  }
}
```

## 相关操作

### 创建一个多签并且签名

```json
// Generate multisig request.
POST /multisigs/requests
{
  "action": "sign",
  "raw":    "298281....000180e"
}

// Sign multisig request.
POST /multisigs/requests/:id/sign
```

### 删除一个还未签名的请求

```json
// Generate multisig request.
POST /multisigs/requests
{
  "action": "sign",
  "raw":    "298281....000180e"
}

// Send multisig cancelling request.
POST /multisigs/requests/:id/cancel
```

### 取消自己的签名, 注意只有签名还未完成的交易可以取消

```json
// Generate multisig request.
POST /multisigs/requests
{
  "action": "unlock",
  "raw":    "298281....000180e"
}

// Send multisig unlocking request.
POST /multisigs/requests/:id/unlock
```
