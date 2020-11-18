# Update Conversation

Update the name and announcement of a Conversation, Group only.
### Group Name
`POST /conversations/:id`

| Name | Type | Description |
| :----- | :----: | :---- |
| name | String | group name |

### Group Announcement
`POST /conversations/:id`

| Name | Type | Description |
| :----- | :----: | :---- |
| announcement | String | group announcement |


### Join Group

- Join the group via link

  `POST /conversations/:id/join`

- Join the group via invite

  `POST /conversations/:id/participants/ADD`

  `[{ user_id: "" }]`

- Rotate group link

  `POST /conversations/:id/rotate`

### Remove group

  `POST /conversations/:id/exit`

### Admin
Only the owner can set or cancel the admin.

- Set an admin

  `POST /conversations/:id/ROLE`

  `[{ user_id: "", role: "ADMIN" }]`

- Cancel admin

  `POST /conversations/:id/ROLE`

  `[{ user_id: "", role: "" }]`  

### Mute
Muted conversations will still receive messages, but will not receive notification.

`POST /conversations/:id/mute`

| Name | Type | Description |
| :----- | :----: | :---- |
| duration | Int64 | The unit is second, set to 0 means unmute, other values mean mute time, for example, set 28,800 means mute 8 hours.  |
| category | String | OPTION |
| participants | Array | OPTION |