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
import RespFee from "@site/docs/_partials/_resp.fee.md";

## GET /assets/:asset_id/fee

获取指定资产的提现手续费。

<APIEndpoint url="/assets/:asset_id/fee" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIParams
  p-asset_id="待查询的资产 ID"
  p-asset_id-required="true"
/>

<APIRequest title="Get Asset's Fee By $ASSET_ID" url="/assets/$ASSET_ID/fee" />

<RespFee />
