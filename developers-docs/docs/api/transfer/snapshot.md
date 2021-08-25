---
title: Read Snapshot
sidebar_position: 4
---

import Request from '../../_partials/request'
import RespSnapshot from '../../_partials/_resp.snapshot.md'

## GET /snapshots/:id

To obtain the asset list of a user, the `SNAPSHOTS:READ` permission is required.

:::info
When reading the transfer details, if it is not the transfer record of the current user, 403 will be returned, and 404 will be returned if the record is not found.
:::

<Request title="Read Snapshot" url="/snapshots/8f5b244e-cf86-4374-8eaa-c551fd70cd83"/>

<RespSnapshot />
