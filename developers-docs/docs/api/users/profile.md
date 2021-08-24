---
title: Read Profile
sidebar_position: 1
---

import Request from '../../_partials/request'
import RespUserExtra from '../../_partials/_resp.user-extra.md'

## GET /me

To obtain the basic personal information of current dApp, the `PROFILE:READ` permission is required.

If the `PHONE:READ` permission granted, you will obtain the user's mobile phone number

<Request title="Get Profile" url="/me"/>

<RespUserExtra />