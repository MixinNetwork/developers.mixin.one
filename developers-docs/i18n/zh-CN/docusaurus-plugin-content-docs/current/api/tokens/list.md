---
title: 批量获取资产
sidebar_position: 2
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIPayload,
} from "@site/src/components/api";

import RespSafeAssets from "@site/docs/_partials/_resp.safe.assets.md";

## POST /safe/assets/fetch

根据 `asset_id` 数组批量获取资产信息。

:::info
仅返回已存在的资产，不存在的 `asset_id` 会被忽略。
:::

<APIEndpoint url="/safe/assets/fetch" method="POST" />

<APIMetaPanel scope="ASSETS:READ" scopeNote="" />

<APIPayload>{`[
  // asset_id 数组
  "UUID",
  "UUID"
]`}</APIPayload>

<APIRequest
  title="Fetch Assets"
  method="POST"
  url="/safe/assets/fetch --data '[&quot;3596ab64-a575-39ad-964e-43b37f44e8cb&quot;]'"
/>

<RespSafeAssets />

## Response fields

| 字段 | 类型 | 说明 |
|:--|:--|:--|
| `type` | string | 对象类型。 |
| `asset_id` | string | 资产在 Mixin Network 内的唯一标识。 |
| `chain_id` | string | 资产所属链的标识。 |
| `display_symbol` | string | 展示用符号。 |
| `display_name` | string | 展示用名称。 |
| `icon_url` | string | 资产图标 URL。 |
| `price_btc` | string | 计价为 BTC 的价格。 |
| `price_usd` | string | 计价为 USD 的价格。 |
| `change_btc` | string | 相比 24 小时前的涨跌幅（BTC 计价）。 |
| `change_usd` | string | 相比 24 小时前的涨跌幅（USD 计价）。 |
| `asset_key` | string | 资产在其所属链上的标识（例如合约地址/Token 标识等）。 |
| `precision` | number | 精度（小数位数）。 |
| `dust` | string | Dust 阈值。 |
| `confirmations` | number | 链上确认数要求。 |
| `kernel_asset_id` | string | Kernel 资产 ID。 |
| `collection_hash` | string | Collection hash（可能不存在）。 |
| `withdrawal_memo_possibility` | string | 提现 memo/tag 的可能性描述。 |
| `level` | number | 资产等级。 |
| `price_updated_at` | string | 价格更新时间（RFC3339）。 |
