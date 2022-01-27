---
title: サークルへ追加/サークルから削除
sidebar_position: 6
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespCircles from "../../_partials/_resp.circles.md";

## サークルへ追加/サークルから削除

### POST /users/:id/circles

Set the circle to which a user belongs. You can add the user to or remove the user from a circle.
ユーザーが参加するサークルを設定します。ユーザーをサークルに追加したり、削除したりすることができます。

:::注意
なお、1人のユーザーが追加できるサークル数は最大5つです。それ以上追加しようとすると、エラー（20133）が発生します。
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

## グループの追加/削除

### POST /conversations/:id/circles

あるグループが所属するサークルを設定します。グループをサークルに追加したり、削除したりすることができます。

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
