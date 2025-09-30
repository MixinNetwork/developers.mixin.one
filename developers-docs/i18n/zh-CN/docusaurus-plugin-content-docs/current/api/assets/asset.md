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
import RespAsset from "@site/docs/_partials/_resp.asset.md";

## GET /assets/:asset_id

该接口用于获取当前用户的指定资产，需要具有 `ASSETS:READ` 权限。

* Messenger 的 asset_id 为 UUID：c94ac88f-4671-3976-b60a-09064f1811e8
* 主网资产的哈希格式为：a99c2e0e2b1da4d648755ef19bd95139acbbe6564cfb06dec7cd34931ca72cdc

可以通过 [https://api.mixin.one/network/assets/c94ac88f-4671-3976-b60a-09064f1811e8](https://api.mixin.one/network/assets/c94ac88f-4671-3976-b60a-09064f1811e8) 或 [https://api.mixin.one/network/assets/a99c2e0e2b1da4d648755ef19bd95139acbbe6564cfb06dec7cd34931ca72cdc](https://api.mixin.one/network/assets/a99c2e0e2b1da4d648755ef19bd95139acbbe6564cfb06dec7cd34931ca72cdc) 查看资产详情。

<APIEndpoint url="/assets/:asset_id" />

<APIMetaPanel scope="ASSETS:READ" scopeNote="" />

<APIParams
  p-asset_id="要查询的资产 ID"
  p-asset_id-required="true"
/>

<APIRequest title="Get Asset by $ASSET_ID" url="/assets/$ASSET_ID" />

<RespAsset />
