---
title: 读取公链信息
sidebar_position: 1
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## GET /network/chains

返回 Mixin 支持的所有公链列表，无需权限。

<APIEndpoint url="/network/chains" />

<APIMetaPanel scope="" />

<APIRequest title="Read chains information" isPublic url="/network/chains" />

```json title="Response"
{
  "data":[
    {
      "type":                   "chain",
      "chain_id":               "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
      "name":                   "Bitcoin",
      "icon_url":               "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128",
      "managed_block_height":   663798,       // Mixin 已同步到的区块高度
      "deposit_block_height":   663795,       // 当前处理充值的区块高度
      "external_block_height":  663798,       // 第三方 API 的区块高度
      "threshold":              3,            // 充值所需确认数
      "withdrawal_pending_count": 1,          // 正在处理的提现数量
      "withdrawal_timestamp":   "2020-12-31T07:17:08.061836303Z",
      "withdrawal_fee":         "6.75645",    // 提现手续费
      "is_synchronized":        true          // 当前公链节点是否正常同步
    },
    ...
  ]
}
```
