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
import RespSnapshot from "../../_partials/_resp.snapshot.md";

## GET /snapshots/:snapshot_id

Get the asset list of a user.

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
