---
title: Add to/Remove from Circles
sidebar_position: 6
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespCircles from "@site/docs/_partials/_resp.circles.md";

## Add/Remove a User

### POST /users/:id/circles

Set the circle to which a user belongs. You can add the user to or remove the user from a circle.

:::info
Note that one user can only be added to 5 circles at most, otherwise error 20133 will be reported.
:::

<APIEndpoint url="/users/:id/circles" />

<APIMetaPanel scope="CIRCLES:WRITE" />

<APIParams p-id="The ID of user." p-id-required={true} />

<APIPayload>{`{
  "circle_id":  "the circle's id",
  "action":     "Update operation, 'ADD' or 'REMOVE'"
}
`}</APIPayload>

<APIRequest
  title="Add a user to the circle"
  method="POST"
  url='/users/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/circles --data &apos;{"circle_id": "a465ffdb-4441-4cb9-8b45 -00cf79dfbc46e", "action": "ADD" }&apos;'
/>

<RespCircles />

## Add/Remove a Group

### POST /conversations/:id/circles

Set the circle to which a certain group belongs. You can add or remove the group from a certain circle.

<APIEndpoint url="/conversations/:id/circles" />

<APIMetaPanel scope="CIRCLES:WRITE" />

<APIParams p-id="The ID of conversation." p-id-required={true} />

<APIPayload>{`{
  "circle_id":  "the circle's id",
  "action":     "Update operation, 'ADD' or 'REMOVE'"
}
`}</APIPayload>

<APIRequest
  title="Add a group to the circle"
  method="POST"
  url='/conversations/928c5c40-769c-3e97-8387-fb1ae0645311/circles --data &apos;{"circle_id": "a465ffdb-4441-4cb9-8b45 -00cf79dfbc46e", "action": "ADD" }&apos;'
/>

<RespCircles />
