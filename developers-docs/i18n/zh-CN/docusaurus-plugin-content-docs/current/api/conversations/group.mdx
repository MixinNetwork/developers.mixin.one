---
title: 管理群组
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

## 更新群组

### POST /conversations/:id

这里的更新主要是群聊，比如更新群公告、入群、退出、静音等操作。

以下操作成功后，将返回完整的会话数据，包括群组成员。

<APIEndpoint url="/conversations/:id" />

<APIMetaPanel scope="Authorized" />

<APIParams p-id="The conversation's id." p-id-required={true} />

<APIPayload>{`{
  "name":         "New group name, 512 characters at most.",
  "announcement": "Group Announcements, 1024 characters at most.",
}
`}</APIPayload>

:::info
每次字段更新，所有群成员都能看到醒目的群公告提醒栏。
:::

<APIRequest
  title="Update Conversation info by ID"
  method="POST"
  url="/conversations/928c5c40-769c-3e97-8387-fb1ae0645311 --data PAYLOAD"
/>

<RespConv />

## 管理群成员

### POST /conversations/:code_id/join

通过链接加入群组。 `code_id` 是加入当前组的 ID，由 `GET /conversation/:id` 返回，通过 `POST /conversations/:id/rotate` 生成。

### POST /conversations/:id/participants/ADD

如果您是此群组对话的所有者或管理员，则可以通过调用此 API 将其他用户添加到群组中。

请求内容：

```json
[
  { "user_id": "" },
  ...
]
```

### POST /conversations/:id/participants/REMOVE

如果您是此群组对话的群主或管理员，则可以从群组中删除成员。

请求内容：

```json
[
  { "user_id": "" },
  ...
]
```

### POST /conversations/:id/rotate

重置邀请链接和 `code_id`。

### POST /conversations/:id/exit

离开当前群组。

## 管理群管理员

只有群主可以设置或取消群管理员

### POST /conversations/:id/participants/ROLE

设置或撤销用户的管理员权限。

设置管理员：

```json
[{ "user_id": "", "role": "ADMIN" }]
```

移除管理员：

```json
[{ "user_id": "", "role": "" }]
```

## 设置群为静音

静音对话仍会收到消息，但不会收到通知。

### POST /conversations/:id/mute

请求内容：

| Parameter    |  Type  | Description                                                                                                         |
| :----------- | :----: | :------------------------------------------------------------------------------------------------------------------ |
| duration     | Int64  | In seconds, setting to 0 means unmute, other values means mute time, for example, setting 28,800 means mute 8 hours |
| category     | String | Optional                                                                                                            |
| participants | Array  | Optional, participants in the conversation.                                                                         |

如果您静音用户或机器人，强烈建议传递类别和参与者参数，否则在不创建会话的情况下调用静音接口将返回错误。
