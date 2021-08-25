---
title: Read Snapshot
sidebar_position: 5
---

import Request from '../../_partials/request'
import RespSnapshot from '../../_partials/_resp.snapshot.md'

## GET /network/snapshots/:id

Read public transfer details, public access.

<Request title="Read snapshot detail" isPublic url="/network/snapshots/8f5b244e-cf86-4374-8eaa-c551fd70cd83" />

<RespSnapshot />

:::tip
If you need to obtain the private fields like `user_id`, `opponent_id`, `trace_id` and `data`, please make sure the dApp has already grant the `SNAPSHOT:READ` permission and set correct JWT in the request headers.
:::