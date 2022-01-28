---
title: コレクティブルのリクエストの送信
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

## Generating Collectibles Requests

### POST /collectibles/requests

コレクティブルのリクエストを生成します。

<APIEndpoint url="/collectibles/requests" />

<APIMetaPanel scope="Authorized" />

<APIPayload>{`{
  "action": "Operations: could be 'sign' or 'unlock'",
  "raw": "For transactions generated in accordance with the mainnet specifications"
}
`}</APIPayload>

:::注意
`raw`はメインネット使用のトランザクションです。生成の際には、Mixinが提供するGo言語とJavaScript言語の[コード](https://github.com/MixinNetwork/multisig-bot/tree/main/common)を参照してください。
:::

<APIRequest
  title="POST collectible request"
  method="POST"
  url='/collectibles/requests --data &apos;{"action": "sign", "raw": "298281....4952f95768b7d1a925c4189b912c343dbb000180e"}&apos;'
/>

リクエストのボディデータを要求する

<APIResponse name="collectible_request" />

## コレクティブシグネチャの開始

### POST /collectibles/requests/:id/:action

<APIEndpoint url="/collectibles/requests/:id/:action" />

<APIMetaPanel scope="Authorized" />

<APIParams
  p-action="Operations: could be `sign`, `cancel`, and `unlock`"
  p-action-required={true}
  p-pin="Encrypted PIN."
  p-pin-required={true}
/>

<APIRequest
  title="operate the collectible request"
  method="POST"
  url='/collectibles/requests/:id/:action --data &apos;{"pin": "YOUR_PIN"}&apos;'
/>

リクエストのボディデータを要求する

<APIResponse name="collectible_request" />

## 操作方法

### 署名の開始/署名へ参加

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

### 署名の取消

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

### コレクティブルの取消

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
