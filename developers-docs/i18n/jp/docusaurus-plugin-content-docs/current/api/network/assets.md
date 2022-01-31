---
title: 資産の読み込み
sidebar_position: 2
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespAssetsNetwork from "../../_partials/_resp.assets-network.md";

## GET /network/assets/:asset_id

資産の公開情報を照会します。

<APIEndpoint url="/network/assets/:asset_id" />

<APIMetaPanel scope="" />

<APIParams p-asset_id="the asset's id" p-asset_id-required={true} />

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
    "snapshots_count": 35224199, // The transfer count of this assets.
    "symbol": "XIN",
    "type": "asset"
  }
}
```

## GET /network/assets/top

ネットワーク全体のTOP100の資産リストを照会します。上位の資産を指定するために`kind`パラメーターを利用します。`kind`を`NORMAL`に設定すると、LPトークンの交換は行われません。

<APIEndpoint url="/network/assets/top?kind=NORMAL" />

<APIMetaPanel scope="" />

<APIParams
  p-kind="ALL, NORMAL, BARREN, ALL by default."
/>

<APIRequest title="Read top 100 assets" isPublic url="/network/assets/top" />

<RespAssetsNetwork />

## GET /network/assets/search/:q?kind=NORMAL

人気のある資産を通貨シンボルや通貨名で検索できます。

:::注意
このAPIは、アイコンや価格を持つ暗号資産のみを返します。
:::

<APIEndpoint url="/network/assets/search/:q" />

<APIMetaPanel scope="" />

<APIParams 
  p-q="the keyword" 
  p-q-required={true}
  p-kind="ALL, NORMAL, BARREN, ALL by default."
/>

<APIRequest
  title="Search assets by keywords"
  isPublic
  url="/network/assets/search/btc"
/>

<RespAssetsNetwork />

## GET /network/assets/multisig

マルチシグネチャをサポートする全資産のリストを照会します。

:::注意
このAPIは**現在利用不可能**です。
:::

<APIEndpoint url="/network/assets/multisig" />

<APIMetaPanel scope="" />

<APIRequest
  title="Query assets that support multisig"
  isPublic
  url="/network/assets/multisig"
/>

<RespAssetsNetwork />
