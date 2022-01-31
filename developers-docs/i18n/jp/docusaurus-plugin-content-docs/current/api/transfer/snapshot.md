---
title: スナップショットの取得
sidebar_position: 4
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespSnapshot from "../../_partials/_resp.snapshot.md";

## GET /snapshots/:snapshot_id

ユーザーのスナップショットをidで取得します。

:::注意
送信内容を取得する際、既存ユーザーの送信記録でない場合は403、見つからない場合は404が返されます。
:::

<APIEndpoint url="/snapshots/:snapshot_id" />

<APIMetaPanel scope="SNAPSHOTS:READ" scopeNote="" />

<APIParams
  p-snapshot_id="the snapshot's id which you are getting"
  p-snapshot_id-required={true}
/>

<APIRequest
  title="Read Snapshot"
  url="/snapshots/8f5b244e-cf86-4374-8eaa-c551fd70cd83"
/>

<RespSnapshot />
