---
title: Read Assets
sidebar_position: 2
---

import Request from '../../_partials/request'
import RespAssetsNetwork from '../../_partials/_resp.assets-network.md'

## GET /network/assets/:id

Query public information of a specified asset, permission-less access.

<Request title="Read an asset" isPublic url="/network/assets/c94ac88f-4671-3976-b60a-09064f1811e8" />

```json title="Response"
{
  "data": {
    "amount":   "296369.17400899",
    "asset_id": "c94ac88f-4671-3976-b60a-09064f1811e8",
    "chain_id": "43d61dcd-e413-450d-80b8-101d5e903357",
    "icon_url": "https://images.mixin.one/UasWtBZO0TZyLTLCFQjvE_UYekjC7eHCuT_9_52ZpzmCC-X-NPioVegng7Hfx0XmIUavZgz5UL-HIgPCBECc-Ws=s128",
    "name":     "Mixin",
    "snapshots_count": 35224199,    // The transfer count of this assets.
    "symbol":   "XIN",
    "type":     "asset"
  }
}
```

## GET /network/assets/top

Query the list of the top 100 assets on the entire network

<Request title="Read top 100 assets" isPublic url="/network/assets/top" />

<RespAssetsNetwork />

## GET /network/assets/search/:q

Search for popular assets by symbol or name, permission-less access.

:::info
This API only returns assets with icons or prices.
:::

<Request title="Search assets by keywords" isPublic url="/network/assets/search/btc" />

<RespAssetsNetwork />


## GET /network/assets/multisig

Query the list of all assets that support multi-signature, permission-less access.

:::caution
This API is **Obsoleted**.
:::

<Request title="Query assets that support multisig" isPublic url="/network/assets/multisig" />

<RespAssetsNetwork />
