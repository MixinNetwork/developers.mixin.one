---
title: Read Assets
sidebar_position: 2
---

Query public information of assets, permission-less access.

## GET /network/assets/:id

```bash
$$XIN:curl$$ "https://api.mixin.one/network/assets/c94ac88f-4671-3976-b60a-09064f1811e8"
```

```json
{
  "data": {
    "amount": "296369.17400899",
    "asset_id": "c94ac88f-4671-3976-b60a-09064f1811e8",
    "chain_id": "43d61dcd-e413-450d-80b8-101d5e903357",
    "icon_url": "https://images.mixin.one/UasWtBZO0TZyLTLCFQjvE_UYekjC7eHCuT_9_52ZpzmCC-X-NPioVegng7Hfx0XmIUavZgz5UL-HIgPCBECc-Ws=s128",
    "name": "Mixin",
    "snapshots_count": 35224199,    // The transfer count of this assets.
    "symbol": "XIN",
    "type": "asset"
  }
}
```

## GET /network/assets/top

Query the list of the top 100 assets on the entire network

```bash
$$XIN:curl$$ "https://api.mixin.one/network/assets/top"
```

```json
{
  "data":{
    "assets":[
    {
      "type": "asset",
      "asset_id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
      "chain_id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
      "symbol": "BTC",
      "name": "Bitcoin",
      "icon_url": "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128",
      "price_btc": "1",
      "price_usd": "14996.98",
      "change_btc": "0",
      "change_usd": "-0.03773542533280206",
      "asset_key": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
      "mixin_id": "fe6b7788944d328778f98e3e81588215b5a07de4f9a4a7de4db4535b404e65db",
      "reserve": "0",
      "confirmations": 3,
      "capitalization": 144241811.6455701,    // Market cap.
      "liquidity": "9618.05721189"            // The amount of this asset in Minxin.
    },
      ....
    ]
  }
}
```

## `GET /network/assets/search/:q`

Search for popular assets by symbol or name, permission-less access.

:::info
This API only returns assets with icons or prices.
:::

```bash
$$XIN:curl$$ "https://api.mixin.one/network/assets/search/eos"
```

```json
{
  "data":[{
    "type":"asset",
    "asset_id":"3596ab64-a575-39ad-964e-43b37f44e8cb",
    "chain_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "symbol":"EOS",
    "name":"eos",
    "icon_url":"https://images.mixin.one/HovctUnrBkLPlDotWvWPsIuFb8qKrLddwF5-f2Fi9q9uO829YB2qGITgOd2YmTMKnGg_z9XrVYzEwFE_rD_REz9C=s128",
    "price_btc":"0",
    "price_usd":"0"
    "change_btc": "1",
    "change_usd": "2",
    "asset_key": "",
    "confirmations": 10,
    "capitalization": 1000.3
  },
  ...
  ]
}
```


## GET /network/assets/multisig

Query the list of all assets that support multi-signature, permission-less access.

:::caution
This API is **Obsoleted**.
:::

```bash
$$XIN:curl$$ "https://api.mixin.one/network/assets/multisig"
```

```json
{
  "data":{
    "assets":[
    {
      "type": "asset",
      "asset_id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
      "chain_id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
      "symbol": "BTC",
      "name": "Bitcoin",
      "icon_url": "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128",
      "price_btc": "1",
      "price_usd": "14996.98",
      "change_btc": "0",
      "change_usd": "-0.03773542533280206",
      "asset_key": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
      "mixin_id": "fe6b7788944d328778f98e3e81588215b5a07de4f9a4a7de4db4535b404e65db",
      "reserve": "0",
      "confirmations": 3,
      "capitalization": 144241811.6455701,
      "liquidity": "9618.05721189"
    },
      ....
    ]
  }
}
```