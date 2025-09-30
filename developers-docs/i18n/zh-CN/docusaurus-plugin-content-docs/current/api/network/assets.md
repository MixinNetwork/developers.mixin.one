---
title: 读取资产信息
sidebar_position: 2
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespAssetsNetwork from "@site/docs/_partials/_resp.assets-network.md";

## GET /network/assets/:asset_id

查询指定资产的公开信息。

<APIEndpoint url="/network/assets/:asset_id" />

<APIMetaPanel scope="" />

<APIParams p-asset_id="资产 ID" p-asset_id-required={true} />

<APIRequest
  title="Read an asset"
  isPublic
  url="/network/assets/c94ac88f-4671-3976-b60a-09064f1811e8"
/>

```json title="Response"
{
  "data": {
    "amount": "296369.17400899",
    "asset_id": "c94ac88f-4671-3976-b60a-09064f1811e8",
    "chain_id": "43d61dcd-e413-450d-80b8-101d5e903357",
    "icon_url": "https://images.mixin.one/UasWtBZO0TZyLTLCFQjvE_UYekjC7eHCuT_9_52ZpzmCC-X-NPioVegng7Hfx0XmIUavZgz5UL-HIgPCBECc-Ws=s128",
    "name": "Mixin",
    "snapshots_count": 35224199, // 该资产的转账次数
    "symbol": "XIN",
    "type": "asset"
  }
}
```

## GET /network/assets/top

查询网络前 100 名的资产，可通过 `kind` 参数指定排名类别；当值为 `NORMAL` 时不会包含 LP 代币。

<APIEndpoint url="/network/assets/top?kind=NORMAL" />

<APIMetaPanel scope="" />

<APIParams
  p-kind="ALL、NORMAL、BARREN，可选，默认为 ALL"
/>

<APIRequest title="Read top 100 assets" isPublic url="/network/assets/top" />

<RespAssetsNetwork />

## GET /network/assets/search/:q?kind=NORMAL

按符号或名称搜索热门资产。

:::info
仅返回带有图标或价格的资产。
:::

<APIEndpoint url="/network/assets/search/:q" />

<APIMetaPanel scope="" />

<APIParams
  p-q="搜索关键字"
  p-q-required={true}
  p-kind="ALL、NORMAL、BARREN，可选，默认为 ALL"
/>

<APIRequest
  title="Search assets by keywords"
  isPublic
  url="/network/assets/search/btc"
/>

<RespAssetsNetwork />

## GET /network/assets/multisig

查询支持多重签名的资产列表。

:::caution
该接口已 **废弃**。
:::

<APIEndpoint url="/network/assets/multisig" />

<APIMetaPanel scope="" />

<APIRequest
  title="Query assets that support multisig"
  isPublic
  url="/network/assets/multisig"
/>

<RespAssetsNetwork />
