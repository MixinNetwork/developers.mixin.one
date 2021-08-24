---
title: Update PIN
sidebar_position: 1
---

import Request from '../../_partials/request'
import RespUser from '../../_partials/_resp.user.md'

## POST /pin/update

The HTTP request body:

| Name | Type | Description |
| :----- | :----: | :---- |
| old_pin | String | Empty string or encrypted old PIN |
| pin | String | Encrypted new PIN |

:::info
To set an initial PIN, set `old_pin` to an empty string.
:::

<Request title="Update PIN" method="POST" url="/pin/update --data PAYLOAD" />

<RespUser />

