---
title: 读取 Top 100 资产
sidebar_position: 30
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespAssetsNetwork from "@site/docs/_partials/_resp.assets-network.md";

## GET /network/assets/top

查询整个网络排名前 100 的资产，此接口无需授权。

<APIEndpoint url="/network/assets/top" />

<APIMetaPanel scope="" />

<APIParams p-asset_id="资产的 ID" p-asset_id-required={true} />

<APIRequest
  title="读取单个资产"
  isPublic
  url="/network/assets/c94ac88f-4671-3976-b60a-09064f1811e8"
/>

```json title="响应示例"
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

查询网络前 100 名资产列表。

<APIEndpoint url="/network/assets/top" />

<APIMetaPanel scope="" />

<APIRequest title="读取 Top 100 资产" isPublic url="/network/assets/top" />

<RespAssetsNetwork />

## GET /network/assets/search/:q

根据符号或名称搜索热门资产。

:::info
此接口仅返回带有图标或价格的资产。
:::

<APIEndpoint url="/network/assets/search/:q" />

<APIMetaPanel scope="" />

<APIParams p-q="搜索关键字" p-q-required={true} />

<APIRequest
  title="按关键字搜索资产"
  isPublic
  url="/network/assets/search/btc"
/>

<RespAssetsNetwork />

## GET /network/assets/multisig

查询支持多重签名的资产列表。

:::caution
此接口已经 **废弃**。
:::

<APIEndpoint url="/network/assets/multisig" />

<APIMetaPanel scope="" />

<APIRequest
  title="查询支持多签的资产"
  isPublic
  url="/network/assets/multisig"
/>

<RespAssetsNetwork />
