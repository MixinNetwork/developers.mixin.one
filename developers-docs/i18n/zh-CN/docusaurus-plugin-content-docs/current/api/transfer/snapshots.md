---
title: Snapshots列表
sidebar_position: 3
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespSnapshots from "@site/docs/_partials/_resp.snapshots.md";

## GET /snapshots

根据多个条件筛选Snapshots。`opponent` 与 `destination`、`tag` 不能同时使用，并且这些参数不支持 `order` 排序。

<APIEndpoint url="/snapshots" />

<APIMetaPanel scope="SNAPSHOTS:READ" scopeNote="" />

<APIParams
  p-limit="分页大小，最大 500"
  p-limit-required={true}
  p-offset="分页起始时间，例如 `2020-12-12T12:12:12.999999999Z`"
  p-offset-required={true}
  p-order="排序方式，例如 `ASC` 或 `DESC`"
  p-asset="可选，按资产筛选"
  p-opponent="可选，按对手（用户或机器人）筛选"
  p-destination="可选，按提现地址筛选"
  p-tag="可选，预留字段"
/>

<APIRequest
  title="Read Snapshots"
  url="/snapshots?limit=10&offset=2018-05-29T16:30:24.845515732%2B08:00"
/>

<RespSnapshots />
