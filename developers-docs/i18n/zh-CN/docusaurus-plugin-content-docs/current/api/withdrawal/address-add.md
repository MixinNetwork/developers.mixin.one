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

import RespAddress from "@site/docs/_partials/_resp.addr.md";

## POST /addresses

创建新的提现地址。

<APIEndpoint url="/addresses" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIPayload>{`{
  "asset_id":     "资产的 asset_id",
  "label":        "地址标签，最少 1 个字符，最多 64 个字符",
  "destination":  "提现地址，最多 128 个字符",
  "tag":          "可选，提现备注",
  "pin_base64":   "加密后的 PIN"
}
`}</APIPayload>

## 生成 TIP PIN

```
"TIP:ADDRESS:ADD:" + asset_id + destination + tag + label

pin_base64 为上述字符串的 sha256-256 摘要
```

<APIRequest
  title="Create an ETH address"
  method="POST"
  url='/addresses --data &apos;{"asset_id":"43d61dcd-e413-450d-80b8-101d5e903357","label":"Jason ETH Address","pin":"nRF5OyFmO4REG6lcPk1jwKDJrENim791uLe+HH0g7EwQHXK9FgCMJl5RDKbeCNDW","destination":"0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0", "tag": "", "label": ""}&apos;'
/>

<RespAddress />
