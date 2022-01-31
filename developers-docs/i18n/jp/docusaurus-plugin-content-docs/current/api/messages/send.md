---
title: メッセージの送信
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

## POST /messages

メッセージを一括送信します。

:::注意
一括送信は1回につき最大100通まで行うことができます。また、メッセージ本文は128Kbを超えてはいけません。
:::

<APIEndpoint url="/messages" />

<APIMetaPanel scope="Authorized" />

<APIPayload>{`[
  { message object },
  { message object },
  ...
]
`}</APIPayload>

:::注意
`message object`はJSONオブジェクトです。詳細は、[メッセージカテゴリー](./category)をご覧ください。
:::

<APIRequest
  title="Send Messages"
  method="POST"
  url="/messages --data PAYLOAD"
/>

リクエストボディデータはメッセージ配列です。

<APIResponse name="msgs" />

It returns empty JSON on success.
