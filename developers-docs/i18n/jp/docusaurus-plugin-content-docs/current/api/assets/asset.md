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

<APIEndpoint url="/assets/:asset_id" />

<APIMetaPanel scope="ASSETS:READ" scopeNote="" />

<APIParams
  p-asset_id="the asset's asset_id you are getting"
  p-asset_id-required="true"
/>

<APIRequest title="Get Asset by $ASSET_ID" url="/assets/$ASSET_ID" />

<RespAsset />
