# 修改关系

### 添加好友
`POST /relationships`

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| user_id | String | 用户 ID |
| full_name | String | 别名，可选 |
| action | String | "ADD" |

### 删除好友
`POST /relationships`

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| user_id | String | 用户 ID |
| action | String | "REMOVE" |

### 屏蔽用户
`POST /relationships`

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| user_id | String | 用户 ID |
| action | String | "BLOCK" |

### 取消用户屏蔽
`POST /relationships`

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| user_id | String | 用户 ID |
| action | String | "UNBLOCK" |