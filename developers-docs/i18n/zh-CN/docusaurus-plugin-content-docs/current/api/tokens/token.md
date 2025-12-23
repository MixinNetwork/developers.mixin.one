---
title: 获取资产详情
sidebar_position: 3
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
} from "@site/src/components/api";

import RespSafeAsset from "@site/docs/_partials/_resp.safe.asset.md";

## GET /safe/assets/:id

根据 `asset_id` 获取单个资产信息。

<APIEndpoint url="/safe/assets/:id" />

<APIMetaPanel scope="ASSETS:READ" scopeNote="" />

<APIParams p-id="资产的 asset_id" p-id-required={true} />

<APIRequest title="Read Asset" url="/safe/assets/3596ab64-a575-39ad-964e-43b37f44e8cb" />

<RespSafeAsset />

## Response fields

| 字段 | 类型 | 说明 |
|:--|:--|:--|
| `type` | string | 对象类型。 |
| `asset_id` | string | 资产在 Mixin Network 内的唯一标识。 |
| `chain_id` | string | 资产所属链的标识。 |
| `symbol` | string | 资产符号。 |
| `name` | string | 资产名称。 |
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
| `primitive_asset_id` | string | Primitive 资产 ID（可能不存在）。 |
| `collection_hash` | string | Collection hash（可能不存在）。 |
| `withdrawal_memo_possibility` | string | 提现 memo/tag 的可能性描述。 |
| `level` | number | 资产等级。 |
| `price_updated_at` | string | 价格更新时间（RFC3339）。 |
