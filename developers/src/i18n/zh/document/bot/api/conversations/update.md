# 更新会话

更新会话这里主要指更新群类型的会话，例如更新群公告、入群、离群、静音等操作，以下操作成功后都会返回完整的会话数据，包括群成员。

### 群名
`POST /conversations/:id`

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| name | String | 新的群名称，最大 512 字符 |

### 群公告
`POST /conversations/:id`

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| announcement | String | 群公告，最大 1024 字符 |

每次更新完该字段所有群成员都能看到一个醒目的群公告提醒条。

### 入群

- 通过链接入群

  `POST /conversations/:id/join`

- 管理员或群主直接拉进群

  `POST /conversations/:id/participants/ADD`

  请求 Body 数据 `[{ user_id: "" }]`

- 重制入群链接

  `POST /conversations/:id/rotate`

### 退出群组

  `POST /conversations/:id/exit`

### 管理员
只有群主才能设置或取消管理员
- 设置管理员

  `POST /conversations/:id/participants/ROLE`

  请求 Body 数据 `[{ user_id: "", role: "ADMIN" }]`

- 取消管理员

  `POST /conversations/:id/participants/ROLE`

  请求 Body 数据 `[{ user_id: "", role: "" }]`  

- 添加用户

  `POST /conversations/:id/participants/ADD`

  请求 Body 数据 `[{ user_id: "", role: "" }]`

- 移除用户

  `POST /conversations/:id/participants/REMOVE`

  请求 Body 数据 `[{ user_id: ""}]`    

### 静音
被静音的会话仍然会收到消息，但是不会收到通知提醒

`POST /conversations/:id/mute`

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| duration | Int64 | 单位秒，设置为 0 表示取消静音，其他值表示静音时间，例如设置 28,800 表示静音 8 个小时  |
| category | String | 可选，类型 |
| participants | Array | 可选，参与会话人员 |

如果静音用户或者机器人，强烈建议传 category 和 participants 参数，否则两用户直接没有创建 conversation 就直接调用静音接口会返回错误信息。
