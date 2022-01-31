---
title: スナップショットの読み込み
sidebar_position: 4
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespSnapshots from "../../_partials/_resp.snapshots.md";

## GET /network/snapshots

公開情報として登録されている送金、入金、出金などのスナップショット記録を取得します。

<APIEndpoint url="/network/snapshots?offset=:offset&limit=:limit&asset=:asset&order=:order" />

<APIMetaPanel scope="" />

<APIParams
  p-offset="Pagination start time, RFC3339Nano format, e.g. `2020-12-12T12:12:12.999999999Z`"
  p-offset-required={true}
  p-limit="Pagination per page data limit, 500 by default, maximally 500. "
  p-limit-required={true}
  p-asset="The asset's id, transfer records of a certain asset."
  p-order="Sort in `ASC` or `DESC` order, `DESC` by default."
/>

<APIRequest
  title="Read snapshot detail"
  isPublic
  url="/network/snapshots?limit=10&offset=2018-05-29T16:30:24.845515732%2B08:00"
/>

<RespSnapshots />

:::注意
`user_id`、`opponent_id`、`trace_id`、`data` などのプライベートな情報を取得する場合は、dAppに`SNAPSHOT:READ`権限が付与されているか、リクエストヘッダーに正しいJWTが設定されているかを確認する必要があります。
:::
