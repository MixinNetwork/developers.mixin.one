---
title: 读取提现费
sidebar_position: 3
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespFee from "../../_partials/_resp.fee.md";

## GET /assets/:asset_id/fee

本 API 返回指定加密货币资产在 Mixin Network 的提现费。

<APIEndpoint url="/assets/:asset_id/fee" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIParams
  p-asset_id="the asset's asset_id you are getting"
  p-asset_id-required="true"
/>

<APIRequest title="Get Asset's Fee By $ASSET_ID" url="/assets/$ASSET_ID/fee" />

<RespFee />
