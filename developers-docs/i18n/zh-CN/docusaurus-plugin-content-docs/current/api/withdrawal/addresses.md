---
title: Read Withdrawal Address List
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

Get a list of withdrawal addresses for the given asset.

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
