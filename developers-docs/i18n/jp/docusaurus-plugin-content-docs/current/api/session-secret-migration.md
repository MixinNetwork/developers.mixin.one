---
title: RSAからEd25519への移行
sidebar_position: 14
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## POST /session/secret

RSAからEd25519へのアップグレード内容は、主にPINコードの暗号化とAPIアクセス署名になります。Ed25519がローカルに生成された後、`POST /session/secret`インターフェースの呼び出しに成功すると、移行が成功したことを意味します。このプロセスは不可逆であり、Ed25519からRSAへの移行はできないことに注意してください。


<APIEndpoint url="/session/secret" />

<APIMetaPanel scope="Authorized" />

<APIPayload>{`{
  "session_secret": "Ed25519 public key in base64"
}
`}</APIPayload>

<APIRequest
  title="Upgrade secret"
  method="POST"
  url='/session/secret --data &apos;{"session_secret":"AAAAC3NzaC1lZDI1NTE5AAAAIB8Ht8Z3j6yDWPBHQtOp/R9rjWvfMYo3MSA/K6q8D86r"}&apos;'
/>

```json title="Response"
{
  "data": [
  {
    "pin_token": "..."
  }
}
```
