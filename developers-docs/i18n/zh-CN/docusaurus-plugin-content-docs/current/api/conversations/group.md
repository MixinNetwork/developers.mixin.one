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

import RespConv from "@site/docs/_partials/_resp.conv.md";

## 更新群组

### POST /conversations/:id

用于更新群聊，例如修改群公告、邀请成员、退出或静音等。操作成功后会返回完整的会话数据，包括成员列表。

<APIEndpoint url="/conversations/:id" />

<APIMetaPanel scope="Authorized" />

<APIParams p-id="会话 ID" p-id-required={true} />

<APIPayload>{`{
  "name":         "新的群名称，最多 512 个字符",
  "announcement": "群公告，最多 1024 个字符"
}
`}</APIPayload>

:::info
每次更新公告字段时，所有群成员都会看到显著的公告提示条。
:::

<APIRequest
  title="Update Conversation info by ID"
  method="POST"
  url="/conversations/928c5c40-769c-3e97-8387-fb1ae0645311 --data PAYLOAD"
/>

<RespConv />

## 管理群成员

### POST /conversations/:code_id/join

通过邀请链接入群。`code_id` 为当前群组的加入 ID，可通过 `GET /conversation/:id` 获取，或调用 `POST /conversations/:id/rotate` 生成。

### POST /conversations/:id/participants/ADD

群主或管理员可以使用此接口邀请其他用户入群。

请求体：

```json
[
  { "user_id": "" },
  ...
]
```

### POST /conversations/:id/participants/REMOVE

群主或管理员可以移除指定成员。

请求体：

```json
[
  { "user_id": "" },
  ...
]
```

### POST /conversations/:id/rotate

重置邀请链接与 `code_id`。

### POST /conversations/:id/exit

退出当前群组。

## 管理管理员

仅群主可以设置或取消管理员。

### POST /conversations/:id/participants/ROLE

设置或撤销用户的管理员权限。

设置管理员的请求体：

```json
[{ "user_id": "", "role": "ADMIN" }]
```

撤销管理员的请求体：

```json
[{ "user_id": "", "role": "" }]
```

## 静音群组

静音后的会话仍会接收消息，但不会触发通知。

### POST /conversations/:id/mute

请求体参数：

| 参数     |  类型 | 说明                                                                 |
| :------- | :---: | :------------------------------------------------------------------ |
| duration | Int64 | 单位为秒，设为 0 表示取消静音，其它数值表示静音时长，例如 28800 表示 8 小时 |

静音前需确保已创建会话，否则会返回 403。

### POST /conversations/:id/disappear

请求体参数：

| 参数     |  类型 | 说明                 |
| :------- | :---: | :------------------- |
| duration | Int64 | 单位为秒，最大 12 周 |

阅后即焚消息仅管理员可设置。以 30 秒为例：

1. 已读消息会在 30 秒后删除。
2. 未读消息会在 24 小时 + 30 秒后删除。
