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

<APIEndpoint url="/assets/:asset_id" />

<APIMetaPanel scope="ASSETS:READ" scopeNote="" />

<APIParams
  p-asset_id="the asset's asset_id you are getting"
  p-asset_id-required="true"
/>

<APIRequest title="Get Asset by $ASSET_ID" url="/assets/$ASSET_ID" />

<RespAsset />
