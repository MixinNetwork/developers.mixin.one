---
title: 提现地址列表
sidebar_position: 2
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespAddresses from "@site/docs/_partials/_resp.addrs.md";

## GET /assets/:asset_id/addresses

获取指定资产的提现地址列表。

<APIEndpoint url="/assets/:asset_id/addresses" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIParams
  p-asset_id="要查询的资产 ID"
  p-asset_id-required={true}
/>

<APIRequest
  title="Get addresses of specified asset"
  url="/assets/43d61dcd-e413-450d-80b8-101d5e903357/addresses"
/>

<RespAddresses />
