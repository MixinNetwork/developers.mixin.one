---
title: Read Snapshot
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

## GET /snapshots/:snapshot_id

Get the snapshot of a user by id.

:::info
When reading the transfer details, if it is not the transfer record of the current user, 403 will be returned, and 404 will be returned if the record is not found.
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


## GET /snapshots/trace/:id

This API is only for reading transfers, not deposits or withdrawals.

<APIRequest
  title="Read Transfer"
  method="GET"
  url="/transfers/trace/7c67e8e8-b142-488b-80a3-61d4d29c90bf"
/>

<RespTransfer />
