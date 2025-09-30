---
title: 读取加密货币资产列表
sidebar_position: 1
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespAssets from "@site/docs/_partials/_resp.assets.md";

## GET /assets

获取当前用户的资产列表，需要 `ASSETS:READ` 权限。

<APIEndpoint url="/assets" />

<APIMetaPanel scope="ASSETS:READ" scopeNote="" />

<APIRequest title="Get Assets" url="/assets" />

<RespAssets />

:::info
该接口仅返回余额大于 0 的资产，新用户没有任何资产时会得到空列表。
:::
