---
title: Read Asset
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

This api obtain the asset list of a user, the `ASSETS:READ` permission is required.

* asset_id in Messenger is UUID: c94ac88f-4671-3976-b60a-09064f1811e8
* Asset in Mixin Mainnet is a99c2e0e2b1da4d648755ef19bd95139acbbe6564cfb06dec7cd34931ca72cdc

Can get the detail of the asset by [https://api.mixin.one/network/assets/c94ac88f-4671-3976-b60a-09064f1811e8](https://api.mixin.one/network/assets/c94ac88f-4671-3976-b60a-09064f1811e8) or [https://api.mixin.one/network/assets/a99c2e0e2b1da4d648755ef19bd95139acbbe6564cfb06dec7cd34931ca72cdc](https://api.mixin.one/network/assets/a99c2e0e2b1da4d648755ef19bd95139acbbe6564cfb06dec7cd34931ca72cdc) .

<APIEndpoint url="/assets/:asset_id" />

<APIMetaPanel scope="ASSETS:READ" scopeNote="" />

<APIParams
  p-asset_id="the asset's asset_id you are getting"
  p-asset_id-required="true"
/>

<APIRequest title="Get Asset by $ASSET_ID" url="/assets/$ASSET_ID" />

<RespAsset />
