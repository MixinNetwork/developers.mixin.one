---
title: 添加到圈子/从圈子中删除
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

## 添加或移除用户

### POST /users/:id/circles

设置某个用户所属的圈子，可以将用户添加到圈子或从圈子中移除。

:::info
单个用户最多只能加入 5 个圈子，否则会返回 20133 错误。
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

## 添加或移除群组

### POST /conversations/:id/circles

设置群组所属的圈子，可以将群组添加到某个圈子或将其移除。

<APIEndpoint url="/conversations/:id/circles" />

<APIMetaPanel scope="CIRCLES:WRITE" />

<APIParams p-id="The ID of conversation." p-id-required={true} />

<APIPayload>{`{
  "circle_id":  "圈子 ID",
  "action":     "操作类型，'ADD' 或 'REMOVE'"
}
`}</APIPayload>

<APIRequest
  title="Add a group to the circle"
  method="POST"
  url='/conversations/928c5c40-769c-3e97-8387-fb1ae0645311/circles --data &apos;{"circle_id": "a465ffdb-4441-4cb9-8b45 -00cf79dfbc46e", "action": "ADD" }&apos;'
/>

<RespCircles />
