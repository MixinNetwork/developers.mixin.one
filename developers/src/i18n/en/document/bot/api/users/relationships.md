# Relationships

### Add Friend
`POST /relationships`

请求 Body 数据

| Name | Type | Description |
| :----- | :----: | :---- |
| user_id | String | user id |
| full_name | String | another name |
| action | String | "ADD" |

### Remove Friend
`POST /relationships`

| Name | Type | Description |
| :----- | :----: | :---- |
| user_id | String | user id |
| action | String | "REMOVE" |

### Block User
`POST /relationships`

| Name | Type | Description |
| :----- | :----: | :---- |
| user_id | String | user id |
| action | String | "BLOCK" |

### Unblock User
`POST /relationships`

| Name | Type | Description |
| :----- | :----: | :---- |
| user_id | String | user id |
| action | String | "UNBLOCK" |