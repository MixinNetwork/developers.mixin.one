---
title: 验证 PIN
sidebar_position: 2
---

import {
  APIRequest,
  APIMetaPanel,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespUser from "@site/docs/_partials/_resp.user.md";

## POST /pin/verify

验证用户的 PIN 码。

<APIEndpoint url="/pin/verify" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIPayload>{`{
  "pin_base64": "Encrypted PIN",
  "timestamp": 1234,
}
`}</APIPayload>

```
fmt.Sprintf("%s%032d", "TIP:VERIFY:", timestamp)

timestamp 是 UnixNano 的值，单位是 int64
```

<APIRequest title="Verify PIN" method="POST" url="/pin/verify --data PAYLOAD" />

如果验证成功，会返回当前用户的信息。

## PIN 码错误 20119 相关问题

- 请注意一旦设置 PIN 码，请注意保存好。没有任何途径打回。
- 如果一个 PIN 码是对的，之前也能正常使用，突然报告出错，那么通常是由于 `iterator` 不对导致的。iterator 是为了安全性，保证 PIN 只会用一次。
- 如果是 PIN 码不对，需要注意时间格式，
- 每天的密码错误都有一定的数量限制，如果是 iterator 导致的，密码错误，不在这个范围之内。

