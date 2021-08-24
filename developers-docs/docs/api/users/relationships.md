---
title: Relationships
sidebar_position: 5
---

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

## GET /blocking_users

To obtain the block list of users, the `CONTACTS:READ` permission is required.

```
$$XIN:curl$$ "https://api.mixin.one/blocking_users"
```

```json
{
  "data":[
    $$XIN:user$$
  ...
  ]
}
```