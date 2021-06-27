# Getting User Data

### Basic User Information

`GET /me` 

To obtain the basic personal information of a user, the `PROFILE:READ` permission is required; to obtain the user's mobile phone number, the `PHONE:READ` permission is required. Refer to [Document](/document/bot/api/profile).


```json
GET -H "Authorization: Bearer ACCESS_TOKEN" https://mixin-api.zeromesh.net/me 

{
  "data": {
    "type": "user",
    "user_id": "773e5e77-4107-45c2-b648-8fc722ed77f5",
    "name": "Team Mixin",
    "identity_number": "7000"
  }
}
```

### Other Common APIs

* `GET /assets` Obtain asset list of the user, `ASSETS:READ` permission is requied, refer to [document](/document/bot/api/assets/list).

* `GET /assets/:id` Obtain information of an asset, `ASSETS:READ` permission is required, refer to [document](/document/bot/api/assets/asset).

* `GET /friends` Obtain the friend list of the user, `CONTACTS:READ` permission is required, refer to [document](/document/bot/api/users/contacts).

* `GET /blocking_users` Obtain the blocked list of the user, `CONTACTS:READ` permission is required, refer to [document](/document/bot/api/users/blocking).

* `GET /snapshots` Obtain all transfer information of an asset of the user, `SNAPSHOTS:READ` permission is required, refer to [document](/document/bot/api/assets/snapshots).

* `GET /snapshots/:id` Obtain the details of a transfer, `SNAPSHOTS:READ` permission is required, refer to [document](/document/bot/api/assets/snapshot).

* `GET /conversations/:id` Obtain the information of a certain conversation of the user, including one to one chat and group chat, refer to [Document](/document/bot/api/conversations/read).

If access to the API returns 401, you need to clean up the cached access token and then apply for authorization again.

### Next Step

It is recommended that developers store `user_id` in the database so that they can push information to users when needed, such as important announcements.

- [Schema Interactions](./schema)

  The bot can evoke certain functions and interfaces of Mixin Messenger, such as transferring money and sharing text.

- [Receiving Messages](./websocket)

  User messages and the notifications that a user adds the current bot as a contact can be received through Websocket.
