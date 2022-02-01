---
title: 出金アドレス一覧の取得
sidebar_position: 2
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespAddresses from "../../_partials/_resp.addrs.md";

## GET /assets/:asset_id/addresses

指定された資産の出金アドレス一覧を取得します。

<APIEndpoint url="/assets/:asset_id/addresses" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIParams
  p-asset_id="the asset's id which you are requesting the withdrawal addresses for"
  p-asset_id-required={true}
/>

<APIRequest
  title="Get addresses of specified asset"
  url="/assets/43d61dcd-e413-450d-80b8-101d5e903357/addresses"
/>

<RespAddresses />
