---
title: Search
sidebar_position: 3
---

import Request from '../../_partials/request'
import RespUser from '../../_partials/_resp.user.md'

## GET /search/:q

Parameter `:q`: Mixin ID or mobile phone number.

:::caution
In order to avoid malicious crawling of user data, this API has a request frequency limit. If a 429 error occurs, wait 12 hours and try again.
:::

<Request title="Search User by $KEYWORD" url="/search/$KEYWORD"/>

<RespUser />
