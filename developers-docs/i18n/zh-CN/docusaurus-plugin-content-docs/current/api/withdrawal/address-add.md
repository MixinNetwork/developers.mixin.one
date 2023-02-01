---
title: 创建提现地址
sidebar_position: 4
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespAddress from "../../_partials/_resp.addr.md";

## POST /addresses

创建一个提现地址

<APIEndpoint url="/addresses" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIPayload>{`{
  "asset_id":     "资产 ID",
  "label":        "地址名称",
  "destination":  "提现地址",
  "tag":          "提现地址 memo",
  "pin_base64":   "加密后的 PIN",
}
`}</APIPayload>

## TIP Pin 结构

```
"TIP:ADDRESS:ADD:" + asset_id + destination + tag + label

pin 是上面值的 sha256-256 的结果
```


<APIRequest
  title="Create an ETH address"
  method="POST"
  url='/addresses --data &apos;{"asset_id":"43d61dcd-e413-450d-80b8-101d5e903357","label":"Jason ETH Address","pin":"nRF5OyFmO4REG6lcPk1jwKDJrENim791uLe+HH0g7EwQHXK9FgCMJl5RDKbeCNDW","destination":"0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0", "tag": "", "label": ""}&apos;'
/>

<RespAddress />
