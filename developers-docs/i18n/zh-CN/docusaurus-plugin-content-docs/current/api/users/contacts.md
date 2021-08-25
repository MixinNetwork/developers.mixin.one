---
title: Read Contacts
sidebar_position: 4
---

import Request from '../../_partials/request'
import RespUsers from '../../_partials/_resp.users.md'

## GET /friends

To obtain the contact list of the user, you need the `CONTACTS:READ` permission.

The list contains users and bots. You can judge whether it is a bot user by whether there is an app field.

<Request title="Read Contacts" url="/users/friends"/>

<RespUsers />


