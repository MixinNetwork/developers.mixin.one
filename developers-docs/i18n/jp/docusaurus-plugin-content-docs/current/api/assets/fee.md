---
title: 手数料の読み込み
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

指定された資産の手数料を取得します。

<APIEndpoint url="/assets/:asset_id/fee" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIParams
  p-asset_id="the asset's asset_id you are getting"
  p-asset_id-required="true"
/>

<APIRequest title="Get Asset's Fee By $ASSET_ID" url="/assets/$ASSET_ID/fee" />

<RespFee />
