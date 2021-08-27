---
title: Relationships
sidebar_position: 5
---

import Request from '../../_partials/request'
import RespUsers from '../../_partials/_resp.user-extra.md'

<!-- @TODO refactor this doc -->

## POST /relationships

**Adding Friends**

Request body data:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| user_id | String | User ID |
| full_name | String | Alias, Optional. |
| action | String | "ADD" |


**Deleting Friends**

Request body data:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| user_id | String | User ID |
| action | String | "REMOVE" |


**Blocking Users**

Request body data:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| user_id | String | User ID |
| action | String | "BLOCK" |

**Unblocking Users**

Request body data:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| user_id | String | User ID |
| action | String | "UNBLOCK" |

<Request title="Manage Relationships" method="POST" url="/relationships --data REQUEST_BODY"/>

<RespUsers />

## GET /blocking_users

To obtain the block list of users, the `CONTACTS:READ` permission is required.

<Request title="Read Blocking Users" url="/blocking_users"/>

<RespUsers />
