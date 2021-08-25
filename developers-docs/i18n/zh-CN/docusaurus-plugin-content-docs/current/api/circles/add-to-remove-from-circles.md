---
title: Add to/Remove from Circles
sidebar_position: 6
---


import Request from '../../_partials/request'
import RespCircles from '../../_partials/_resp.circles.md'

## Add/Remove a User

Set the circle to which a user belongs. You can add the user to or remove the user from a circle. The permission of `CIRCLES:WRITE` is required.

:::info
Note that one user can only be added to 5 circles at most, otherwise error 20133 will be reported.
:::

### POST /users/:id/circles

Request body data:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| circle_id | String | Circle Id |
| action | String | Update operation, `ADD` or `REMOVE` |

<Request title="Add a user to the circle" method="POST" url="/users/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/circles --data '{&quot;circle_id&quot;: &quot;a465ffdb-4441-4cb9-8b45 -00cf79dfbc46e&quot;, &quot;action&quot;: &quot;ADD&quot; }'"/>

The list of circles that the user belongs to is returned:

<RespCircles />

## Add/Remove a Group

Set the circle to which a certain group belongs. You can add or remove the group from a certain circle. You need the `CIRCLES:WRITE` permission.

### POST /conversations/:id/circles

Request body data:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| circle_id | String | Circle Id |
| action | String | Update operation, `ADD` or `REMOVE` |

<Request title="Add a group to the circle" method="POST" url="/conversations/928c5c40-769c-3e97-8387-fb1ae0645311/circles --data '{&quot;circle_id&quot;: &quot;a465ffdb-4441-4cb9-8b45 -00cf79dfbc46e&quot;, &quot;action&quot;: &quot;ADD&quot; }'"/>

The list of circles that the group belongs to is returned:

<RespCircles />
