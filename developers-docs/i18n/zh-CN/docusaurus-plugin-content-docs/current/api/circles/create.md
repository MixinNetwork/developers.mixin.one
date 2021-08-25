---
title: Create Circles
sidebar_position: 3
---

import Request from '../../_partials/request'
import RespCircle from '../../_partials/_resp.circle.md'

## POST /circles

To create circles, you need the `CIRCLES:WRITE` permission.

Request body data:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| name | String | Name of the circle. |

<Request title="Create a Circle" method="POST" url="/circles --data '{&quot;name&quot;: &quot;Circle Name&quot;}'"/>

<RespCircle />
