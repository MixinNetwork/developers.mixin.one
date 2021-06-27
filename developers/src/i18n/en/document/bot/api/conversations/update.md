# Updating

Updating here is mainly about group chats, such as updating group announcements, joining groups, exiting, muting, and other operations. After the following operations are successful, complete conversation data will be returned, including group members.


### Group Name

`POST /conversations/:id`

Request body data:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| name | String | New group name, 512 characters at most. |

### Group Announcements

`POST /conversations/:id`

Request body data:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| announcement | String | Group Announcements, 1024 characters at most. |

Every time the field is updated, all group members can see an eye-catching group announcement reminder bar.

### Joining

- Join the group via link.

  `POST /conversations/:id/join`

- Added to the group by administrators or group owners. 

  `POST /conversations/:id/participants/ADD`

  Request body data `[{ user_id: "" }]`

- Resetting invitation link.

  `POST /conversations/:id/rotate`

### Exiting

  `POST /conversations/:id/exit`

### Administrators

Only the owners can set or cancel administrators

- Setting Up An Administrator

  `POST /conversations/:id/participants/ROLE`

  Request body Data: `[{ user_id: "", role: "ADMIN" }]`

- Revoking An Administrator

  `POST /conversations/:id/participants/ROLE`

  Request body Data:  `[{ user_id: "", role: "" }]`  

- Adding A User

  `POST /conversations/:id/participants/ADD`

  Request body Data:  `[{ user_id: "", role: "" }]`

- Removing A User

  `POST /conversations/:id/participants/REMOVE`

  Request body Data:  `[{ user_id: ""}]`    

### Muting

Muted conversations will still receive messages, but without notifications.

`POST /conversations/:id/mute`

Request body data:

| Parameter | Type | Description  |
| :----- | :----: | :---- |
| duration | Int64 | In seconds, setting to 0 means unmute, other values means mute time, for example, setting 28,800 means mute 8 hours |
| category | String | Optional |
| participants | Array | Optional, participants in the conversation. |

If you mute users or bots, it is strongly recommended to pass the category and participants parameters, otherwise calling the mute interface without creating a conversation will return an error.