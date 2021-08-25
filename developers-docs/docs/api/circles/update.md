---
title: Update Circles
sidebar_position: 5
---

import Request from '../../_partials/request'
import RespCircle from '../../_partials/_resp.circle.md'

## POST /circles/:id

To modify the circle names, you need the `CIRCLES:WRITE` permission.

Request body data:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| name | String | Circle name. |


<Request title="Create a Circle" method="POST" url="/circles/a465ffdb-4441-4cb9-8b45-00cf79dfbc46 --data '{&quot;name&quot;: &quot;Circle Name&quot;}'"/>

<RespCircle />
