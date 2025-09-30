---
title: 读取Snapshot
sidebar_position: 5
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespSnapshot from "@site/docs/_partials/_resp.snapshot.md";

## GET /network/snapshots/:snapshot_id

根据Snapshots ID 查看详情。

<APIEndpoint url="/network/snapshots/:snapshot_id" />

<APIMetaPanel scope="" />

<APIParams p-snapshot_id="snapshots ID" p-snapshot_id-required={true} />

<APIRequest
  title="Read snapshot detail"
  isPublic
  url="/network/snapshots/8f5b244e-cf86-4374-8eaa-c551fd70cd83"
/>

<RespSnapshot />

:::tip
如需获取 `user_id`、`opponent_id`、`trace_id`、`data` 等私有字段，请确保 dApp 具备 `SNAPSHOTS:READ` 权限，并在请求头中携带正确的 JWT。
:::
