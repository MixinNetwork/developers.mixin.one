---
title: Read Asset List
sidebar_position: 1
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespAssets from "../../_partials/_resp.assets.md";

## GET /assets

Get the asset list of current user.

<APIEndpoint url="/assets" />

<APIMetaPanel scope="ASSETS:READ" scopeNote="" />

<APIRequest title="Get Assets" url="/assets" />

<RespAssets />

:::info
This interface will only return a list of assets with a balance greater than 0, and an empty list will be returned when a user is new.
:::
