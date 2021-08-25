---
title: Read Snapshots
sidebar_position: 4
---

import Request from '../../_partials/request'
import RespSnapshots from '../../_partials/_resp.snapshots.md'

## GET /network/snapshots

Public transfer records, public access.

| Parameter | Type | Description |
| :----- | :----: | :---- |
| limit | String | Pagination per page data limit, 500 by default, maximally 500. |
| offset | String | Pagination start time, RFC3339Nano format, e.g. `2020-12-12T12:12:12.999999999Z`. |
| asset | UUID String |Optional, transfer records of a certain asset. |
| order | String | Optional, sort in ASC or DESC order, DESC by default. |


<Request title="Read snapshot detail" isPublic url="/network/snapshots?limit=10&offset=2018-05-29T16:30:24.845515732%2B08:00" />

<RespSnapshots />

:::tip
If you need to obtain the private fields like `user_id`, `opponent_id`, `trace_id` and `data`, please make sure the dApp has already grant the `SNAPSHOT:READ` permission and set correct JWT in the request headers.
:::