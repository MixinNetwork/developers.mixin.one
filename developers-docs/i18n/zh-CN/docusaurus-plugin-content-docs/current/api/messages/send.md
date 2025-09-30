---
title: 发送消息
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

批量发送消息。

:::info
每次最多可发送 100 条消息，单条消息体不得超过 128KB。
:::

<APIEndpoint url="/messages" />

<APIMetaPanel scope="Authorized" />

<APIPayload>{`[
  { message object },
  { message object },
  ...
]
`}</APIPayload>

:::info
`message object` 为 JSON 结构，格式请参考 [消息类型](./category)。
:::

<APIRequest
  title="Send Messages"
  method="POST"
  url="/messages --data PAYLOAD"
/>

请求体为消息数组：

<APIResponse name="msgs" />

成功返回空 JSON。
