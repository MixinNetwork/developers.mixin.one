---
title: 批量发送加密消息
sidebar_position: 3
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import ReqMessages from "@site/docs/_partials/_resp.msgs-encrypted.md";

## POST /encrypted_messages

批量创建加密消息接口

:::info

1. 最多创建 100 条消息
2. 兼容不加密消息
:::

<APIEndpoint url="/encrypted_messages" />

<APIMetaPanel scope="Authorized" />

<APIPayload>{`[
  { message object },
  { message object },
  ...
]
`}</APIPayload>

:::info
`message object` 是 JSON 结构, 请参照里面的类型 [Message Category](./category).
:::

<APIRequest
  title="Send Messages"
  method="POST"
  url="/encrypted_messages --data PAYLOAD"
/>

请求返回值是一个数组, 如果 state 是 `FAILED`, sessions 会返回正确的数组值:

<ReqMessages />

## 加密数据的格式

```
  version || session size || sender public key || encrypted message key for receiver session 1 || encrypted message key for receiver session 2 || nonce || encrypted message data
```

1. version 1 byte and session size (2 bytes) in LittleEndian format,
2. sender public key is bot's curve25519 public key
3. encrypted message key for receiver session = session id || AESCBC(message key, shared secret key, iv)
4. shared secret key = ECDH(sender private key, receiver session public key)
5. message key uses to encrypt the message data
