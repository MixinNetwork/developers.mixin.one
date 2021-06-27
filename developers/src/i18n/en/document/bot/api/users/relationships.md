# Relationships

### Adding Friends

`POST /relationships`

Request body data:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| user_id | String | User ID |
| full_name | String | Alias, Optional. |
| action | String | "ADD" |

### Deleting Friends

`POST /relationships`

Request body data:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| user_id | String | User ID |
| action | String | "REMOVE" |

### Blocking Users

`POST /relationships`

Request body data:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| user_id | String | User ID |
| action | String | "BLOCK" |

### Unblocking Users

`POST /relationships`

Request body data:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| user_id | String | User ID |
| action | String | "UNBLOCK" |