---
title: Send Messages
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

Send messages in bulk.

:::info
A maximum of 100 messages can be sent in batch each time, and the message body cannot exceed 128Kb.
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
`message object` is a JSON object, please refer to the [Message Category](./category).
:::

<APIRequest
  title="Send Messages"
  method="POST"
  url="/messages --data PAYLOAD"
/>

Request body data is a message array:

<APIResponse name="msgs" />

It returns empty JSON on success.
