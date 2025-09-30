---
title: 快照列表
sidebar_position: 4
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespSnapshots from "@site/docs/_partials/_resp.snapshots.md";

## GET /network/snapshots

查询快照公开信息，包括转账、充值、提现等记录。

<APIEndpoint url="/network/snapshots?offset=:offset&limit=:limit&asset=:asset&order=:order" />

<APIMetaPanel scope="" />

<APIParams
  p-offset="分页起始时间，RFC3339Nano 格式，例如 `2020-12-12T12:12:12.999999999Z`"
  p-offset-required={true}
  p-limit="每页数量，默认 500，最大 500"
  p-limit-required={true}
  p-asset="资产 ID，用于筛选指定资产的快照"
  p-order="排序方式，`ASC` 或 `DESC`，默认 `DESC`"
/>

<APIRequest
  title="Read snapshot detail"
  isPublic
  url="/network/snapshots?limit=10&offset=2018-05-29T16:30:24.845515732%2B08:00"
/>

<RespSnapshots />

:::tip
如需获取 `user_id`、`opponent_id`、`trace_id`、`data` 等私有字段，请确保 dApp 拥有 `SNAPSHOTS:READ` 权限，并在请求头中携带正确的 JWT。
:::
