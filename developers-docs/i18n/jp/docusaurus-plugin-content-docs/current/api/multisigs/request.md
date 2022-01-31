---
title: マルチシグネチャリクエストの送信
sidebar_position: 3
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

マルチシグネチャは、まずマルチシグネチャリクエストを生成して`request_id`を取得し、マルチシグネチャの管理を開始する必要があります。

## マルチシグネチャリクエストの生成

### POST /multisigs/requests

マルチシグネチャリクエストを生成します。

<APIEndpoint url="/multisigs/requests" />

<APIMetaPanel scope="Authorized" />

<APIPayload>{`{
  "action": "Operations: could be 'sign' or 'unlock'",
  "raw": "For transactions generated in accordance with the mainnet specifications"
}
`}</APIPayload>

:::注意
`raw`はメインネット仕様のトランザクションです。詳細は、Mixinが提供するGo言語とJavaScript言語により実装された[コード](https://github.com/MixinNetwork/multisig-bot/tree/main/common)をご覧ください。
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

## マルチシグネチャの開始

### POST /multisigs/requests/:id/:action

<APIEndpoint url="/multisigs/requests/:id/:action" />

<APIMetaPanel scope="Authorized" />

<APIParams
  p-action="Operations: could be `sign`, `cancel`, and `unlock`"
  p-action-required={true}
  p-pin="Encrypted PIN."
  p-pin-required={true}
/>

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

## マルチシグネチャの管理

### 署名を開始する/署名へ参加する

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

### 署名を止める

```json
// Generate multisig request.
POST /multisigs/requests
{
  "action": "cancel",
  "raw":    "298281....000180e"
}

// Send multisig cancelling request.
POST /multisigs/requests/:id/cancel
```

### マルチシグネチャを止める

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
