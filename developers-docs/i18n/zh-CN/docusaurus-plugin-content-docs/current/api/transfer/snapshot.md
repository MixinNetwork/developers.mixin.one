---
title: 查询快照
sidebar_position: 4
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespSnapshot from "@site/docs/_partials/_resp.snapshot.md";
import RespTransfer from "@site/docs/_partials/_resp.transfer.md";

## GET /snapshots/:snapshot_id

根据快照 ID 获取用户快照。

:::info
读取转账详情时，若目标记录不属于当前用户将返回 403，未找到记录则返回 404。
:::

<APIEndpoint url="/snapshots/:snapshot_id" />

<APIMetaPanel scope="SNAPSHOTS:READ" scopeNote="" />

<APIParams
  p-snapshot_id="要查询的快照 ID"
  p-snapshot_id-required={true}
/>

<APIRequest
  title="Read Snapshot"
  url="/snapshots/8f5b244e-cf86-4374-8eaa-c551fd70cd83"
/>

<RespSnapshot />

## GET /snapshots/trace/:id

仅用于读取转账，不包含充值或提现记录。

<APIRequest
  title="Read Transfer"
  method="GET"
  url="/transfers/trace/7c67e8e8-b142-488b-80a3-61d4d29c90bf"
/>

<RespTransfer />
