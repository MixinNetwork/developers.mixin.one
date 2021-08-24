---
title: Read Information
sidebar_position: 3
---

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


# User Assets

Calling `GET /assets` returns assets with a balance greater than 0. When a new user calls this API, an empty list will be returned, and the wallet can have a built-in asset list.

```go
const (
    userId     = ""
    pinToken   = ""
	sessionId  = ""
	privateKey = ""
)

func main() {
    ctx := context.Background()

	//Sign Authentication Token
	authenticationToken, err := bot.SignAuthenticationToken(user.UserId, user.SessionId, userSessionKey, "GET", "/assets", "")
	if err != nil {
		fmt.Println(err)
		return
	}
	//Query Asset List
	assets, err := bot.AssetList(ctx, authenticationToken)
	if err != nil {
		fmt.Println(err)
		return
	}
	for _, a := range assets {
		fmt.Println(a.AssetId)
	}
}
```

- Calling `GET /assets/:id` returns the details of a single asset, including the asset's deposit address. For example, to get the deposit address of BTC, call `GET /assets/c6d0c728-2624-429b-8e0d-d9d19b6592fa`
- The `asset_id` is unique and fixed in the entire network. It can be obtained from https://mixin.one/snapshots by searching for asset code such as `btc`; you can also deposit the asset into the Mixin Messenger wallet and talk to the bot `7000103061`, then search for and copy asset information, the format is as follows:

  ```json
  {
    "name":"Bitcoin",
    "symbol":"BTC",
    "asset_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa",
    "chain_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa",
    "chain_icon_url":"https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128",
    "icon_url":"https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128"
  }
  ```

### Next Step

- [Transfer](./transfer)

  Transfers among wallet users are free and instant.

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
