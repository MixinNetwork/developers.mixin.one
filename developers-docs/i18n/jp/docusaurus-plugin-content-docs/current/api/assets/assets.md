---
title: 資産リストの読み込み
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
既存ユーザーの資産リストを取得します。

<APIEndpoint url="/assets" />

<APIMetaPanel scope="ASSETS:READ" scopeNote="" />

<APIRequest title="Get Assets" url="/assets" />

<RespAssets />

:::注意
このインターフェイスは、ウォレットの残高が0以上の資産リストのみを返します。新規ユーザーの場合は空のリストを返します。
:::
