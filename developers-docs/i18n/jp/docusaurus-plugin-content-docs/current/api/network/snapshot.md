---
title: スナップショットの読み込み
sidebar_position: 5
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespSnapshot from "../../_partials/_resp.snapshot.md";

## GET /network/snapshots/:snapshot_id

IDでスナップショットの詳細を読み取ります。

<APIEndpoint url="/network/snapshots/:snapshot_id" />

<APIMetaPanel scope="" />

<APIParams p-snapshot_id="The snapshot's id" p-snapshot_id-required={true} />

<APIRequest
  title="Read snapshot detail"
  isPublic
  url="/network/snapshots/8f5b244e-cf86-4374-8eaa-c551fd70cd83"
/>

<RespSnapshot />

:::注意
`user_id`、`opponent_id`、`trace_id`、`data` などのプライベートな情報を取得する場合は、dAppに`SNAPSHOT:READ`権限が付与されているか、リクエストヘッダーに正しいJWTが設定されているかを確認する必要があります。
:::
