---
title: 读取加密货币资产
sidebar_position: 2
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespAsset from "../../_partials/_resp.asset.md";

## GET /assets/:asset_id

本 API 返回当前用户的指定加密资产，由 asset_id 指定。

* Messenger 的 asset_id 为 UUID: c94ac88f-4671-3976-b60a-09064f1811e8
* 主网的 asset 格式为: a99c2e0e2b1da4d648755ef19bd95139acbbe6564cfb06dec7cd34931ca72cdc

可以通过 [https://api.mixin.one/network/assets/c94ac88f-4671-3976-b60a-09064f1811e8](https://api.mixin.one/network/assets/c94ac88f-4671-3976-b60a-09064f1811e8) 或者 [https://api.mixin.one/network/assets/a99c2e0e2b1da4d648755ef19bd95139acbbe6564cfb06dec7cd34931ca72cdc](https://api.mixin.one/network/assets/a99c2e0e2b1da4d648755ef19bd95139acbbe6564cfb06dec7cd34931ca72cdc) 获取资产的详细信息。

<APIEndpoint url="/assets/:asset_id" />

<APIMetaPanel scope="ASSETS:READ" scopeNote="" />

<APIParams
  p-asset_id="资产的唯一标识"
  p-asset_id-required="true"
/>

<APIRequest title="Get Asset by $ASSET_ID" url="/assets/$ASSET_ID" />

<RespAsset />
