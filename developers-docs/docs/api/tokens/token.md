---
title: Read Asset
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

Read a single asset by `asset_id`.

<APIEndpoint url="/safe/assets/:id" />

<APIMetaPanel scope="ASSETS:READ" scopeNote="" />

<APIParams p-id="The asset_id of the asset" p-id-required={true} />

<APIRequest title="Read Asset" url="/safe/assets/3596ab64-a575-39ad-964e-43b37f44e8cb" />

<RespSafeAsset />

## Response fields

| Field | Type | Description |
|:--|:--|:--|
| `type` | string | Object type. |
| `asset_id` | string | Unique identifier of the asset in Mixin Network. |
| `chain_id` | string | Identifier of the chain/network the asset belongs to. |
| `symbol` | string | Asset symbol. |
| `name` | string | Asset name. |
| `display_symbol` | string | Symbol for display. |
| `display_name` | string | Name for display. |
| `icon_url` | string | Asset icon URL. |
| `price_btc` | string | Price quoted in BTC. |
| `price_usd` | string | Price quoted in USD. |
| `change_btc` | string | Change compared to 24 hours ago (BTC quote). |
| `change_usd` | string | Change compared to 24 hours ago (USD quote). |
| `asset_key` | string | Asset identifier on its original chain (e.g. contract address / token identifier). |
| `precision` | number | Decimal precision. |
| `dust` | string | Dust threshold. |
| `confirmations` | number | Required on-chain confirmations. |
| `kernel_asset_id` | string | Kernel asset id. |
| `primitive_asset_id` | string | Primitive asset id (may be absent). |
| `collection_hash` | string | Collection hash (may be absent). |
| `withdrawal_memo_possibility` | string | Memo/tag possibility description for withdrawals. |
| `level` | number | Asset level. |
| `price_updated_at` | string | Price updated at (RFC3339). |
