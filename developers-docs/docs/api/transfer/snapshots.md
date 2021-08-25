---
title: Read Snapshot List
sidebar_position: 3
---

import Request from '../../_partials/request'
import RespSnapshots from '../../_partials/_resp.snapshots.md'

## GET /snapshots

To obtain the asset list of a user, the `SNAPSHOTS:READ` permission is required.

| Name | Description |
| :----- | :---- |
| limit | Pagination limit, maximamlly 500. |
| offset | Pagination start time, e.g. `2020-12-12T12:12:12.999999999Z`. |
| asset | Optional, get transfers by asset. |
| opponent | Optional, get transfers by opponent(user or bot). |
| destination | Optional, get transfers by destination. |
| tag | Optional |


<Request title="Read Snapshots" url="/snapshots?limit=10&offset=2018-05-29T16:30:24.845515732%2B08:00"/>

<RespSnapshots />
