---
title: Read Users
sidebar_position: 2
---

import Request from '../../_partials/request'
import RespUsers from '../../_partials/_resp.users.md'

## POST /users/fetch

HTTP body data, `["UUID","UUID","UUID"]` is a array of user IDs.

:::info
This API will only return the list of existing users, and ignore those that do not exist.
:::

<Request title="Read Users" method="POST" url="/users/fetch --data '[&quot;06aed1e3-bd77-4a59-991a-5bb5ae6fbb09&quot;]'"/>

<RespUsers />

