---
title: 更新 PIN
sidebar_position: 1
---

import {
  APIRequest,
  APIMetaPanel,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespUser from "../../_partials/_resp.user.md";

## POST /pin/update

更新用户的 PIN 码，如果用户之前没有设置，相当于设置 PIN 码。

<APIEndpoint url="/pin/update" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIPayload>{`{
  "old_pin":  "Empty string or encrypted old PIN"
  "pin":      "Encrypted PIN"
}
`}</APIPayload>

:::info
如果是设置一个新的 PIN 码, 这时候 `old_pin` 应该是空的。
:::

<APIRequest title="Update PIN" method="POST" url="/pin/update --data PAYLOAD" />

<RespUser />
