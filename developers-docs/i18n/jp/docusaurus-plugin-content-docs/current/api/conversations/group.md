---
title: グループ管理
sidebar_position: 3
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespConv from "../../_partials/_resp.conv.md";

## グループの更新

### POST /conversations/:id

ここでの更新は、主にグループチャットに関するものです。具体的には、グループアナウンスの更新、グループへの参加/退出、ミュートなどの操作を行うことが可能です。

以下の操作に成功すると、グループメンバーを含む完全なグループデータが返されます。

<APIEndpoint url="/conversations/:id" />

<APIMetaPanel scope="Authorized" />

<APIParams p-id="The conversation's id." p-id-required={true} />

<APIPayload>{`{
  "name":         "New group name, 512 characters at most.",
  "announcement": "Group Announcements, 1024 characters at most.",
}
`}</APIPayload>

:::注意
グループが更新されるたびに、グループメンバーへ更新についてのリマインダーバーが表示されます。
:::

<APIRequest
  title="Update Conversation info by ID"
  method="POST"
  url="/conversations/928c5c40-769c-3e97-8387-fb1ae0645311 --data PAYLOAD"
/>

<RespConv />

## グループメンバーの管理

### POST /conversations/:code_id/join

リンク経由でグループに参加することができます。`code_id`は既存のグループに参加するためのIDです。このIDは、`GET /conversation/:id`によって返され、`POST /conversations/:id/rotate`によって生成されます。

### POST /conversations/:id/participants/ADD

グループチャットのオーナーまたは管理者である場合、このAPIを呼び出すことでユーザーをグループに追加することができます。

ペイロード:

```json
[
  { "user_id": "" },
  ...
]
```

### POST /conversations/:id/participants/REMOVE

グループチャットのオーナーまたは管理者である場合、このAPIを呼び出すことでユーザーをグループから削除することができます。

ペイロード:

```json
[
  { "user_id": "" },
  ...
]
```

### POST /conversations/:id/rotate

Reset invitation link and `code_id`.
招待リンクと`code_id`を再設定します。

### POST /conversations/:id/exit

既存のグループから脱退します。

## 管理者の管理

管理者の設定/解除はオーナーのみ可能です。

### POST /conversations/:id/participants/ROLE

Set or revoke admin privileges for a user.
ユーザーの管理者権限を設定する、もしくは取り消します。

管理者権限設定のリクエストボディ:

```json
[{ "user_id": "", "role": "ADMIN" }]
```

管理者権限設定のリクエストボディ:

```json
[{ "user_id": "", "role": "" }]
```

## グループのミュート

Muted conversations will still receive messages, but without notifications.
ミュートされたグループは、メッセージを受信しますが、ユーザーへ通知されません。

### POST /conversations/:id/mute

リクエストボディデータ:

| パラメータ    |  タイプ  | 説明                                                                                                         |
| :----------- | :----: | :------------------------------------------------------------------------------------------------------------------ |
| duration     | Int64  | 0に設定するとミュート解除、その他の値はミュート時間を示します。（単位は「秒」）例えば、28,800に設定すると8時間ミュートとなります。 |
| category     | String | 記入は任意です。「CONTACT」のみ設定可能です。                                                            　|
| participants | Array  | 記入は任意です。「category」パラメータが設定されている時のみ、設定可能です。　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　|

ユーザーまたはロボをミュートする場合、「category」と「participants」パラメータを設定してください。チャットを作成せずにミュート設定を行うと、エラーが生じます。
