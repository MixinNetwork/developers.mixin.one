---
title: Sharing Bots
sidebar_position: 13
---

import Request from '../_partials/request'
import RespApps from '../_partials/_resp.apps.md'

Both users and bots can be configured to share 3 bots on their personal pages, and they can also be displayed from the + menu in the lower left corner of the chat interface. This feature can greatly promote the spread of bots among users by word of mouth.

## Get Share List

### GET /users/:id/apps/favorite


<Request title="Get share list" url="/users/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/apps/favorite"/>

<RespApps />

## Add to Shares

### POST /apps/:id/favorite

<Request title="Add to share list" method="POST" url="/apps/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/favorite"/>

Returns the share list on success.

<RespApps />

## Delete from Shares

### POST /apps/:id/unfavorite

<Request title="Delete from share list" method="POST" url="/apps/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/unfavorite"/>

Returns empty json on success.

