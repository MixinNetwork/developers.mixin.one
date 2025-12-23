---
title: Fetch Assets
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

Fetch assets in bulk by `asset_id` array.

:::info
This API only returns existing assets, and ignores non-existent `asset_id`s.
:::

<APIEndpoint url="/safe/assets/fetch" method="POST" />

<APIMetaPanel scope="ASSETS:READ" scopeNote="" />

<APIPayload>{`[
  // array of asset_id
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

| Field | Type | Description |
|:--|:--|:--|
| `type` | string | Object type. |
| `asset_id` | string | Unique identifier of the asset in Mixin Network. |
| `chain_id` | string | Identifier of the chain/network the asset belongs to. |
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
| `collection_hash` | string | Collection hash (may be absent). |
| `withdrawal_memo_possibility` | string | Memo/tag possibility description for withdrawals. |
| `level` | number | Asset level. |
| `price_updated_at` | string | Price updated at (RFC3339). |
