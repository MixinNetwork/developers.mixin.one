---
title: Read Information
---

In the [previous article](./oauth), I introduced the OAuth2 flow and how to use it to get an access token. In this article, I will show you how to read information of users.

From now on, SDK will be introduced in the following articles. The Mixin team and the community provide various SDKs for developers to use. You can find the SDKs in the [SDK](/dapp/sdk/overview) page.

## Read User's Profile

:::tip
To obtain the basic personal information of a user, the `PROFILE:READ` permission is required.
:::

We can read the user's profile by using the [`/me`](/api/users/profile) endpoint. `/me` is an authenticated endpoint, so we need to obtain an access token first and put it in the HTTP Headers.

Let's send a request:

```bash
GET -H "Authorization: Bearer $ACCESS_TOKEN" https://api.mixin.one/me
```

```json title="Response"
{
  "data": {
    "type":            "user",
    "user_id":         "773e5e77-4107-45c2-b648-8fc722ed77f5",
    "name":            "Team Mixin",
    "identity_number": "7000"
  }
}
```

:::info
The `user_id` field is an unique id for each "Account" or "User" in the entire Mixin Network.

Additionally, if the user is a Mixin Messenger user, you can send messages to them by using [`POST /messages`](/api/messages/send) with the `user_id` field.
:::

## Read User's Assets

:::tip
To obtain the asset balance of a user, the `ASSETS:READ` permission is required.
:::

Calling `GET /assets` returns assets with a balance greater than 0. When you calls this API with a token which owned by a new user with zero balance, an empty list will be returned.

```bash
GET -H "Authorization: Bearer $ACCESS_TOKEN" https://api.mixin.one/assets
```

import RespAssets from '../../_partials/_resp.assets.md'

<RespAssets />

:::info
The `asset_id` field is an unique id for each asset in the entire Mixin Network.

It can be obtained from https://mixin.one/snapshots by searching for asset code such as `btc`. You can also deposit the asset into the Mixin Messenger wallet and talk to the bot `7000103061`, then search for and copy asset information.
:::

## Read Application's Assets

The Mixin Application is a special type of user. It also has a wallet just like a normal user. You can inspect the assets of the application by visiting "Developer Dashboard - Choosing any app - Clicking the `Wallet` tab".

You can also read the assets programmatically by calling the [`/assets`](/api/assets/assets) with the application's access token. The algorithm for generating access token can be found [here](../guide/generate-jwt-token), but you can also use the [SDK](/sdk/overview) to simplify the process.

Here is the example of generating token and reading assets by using the official Go SDK:

```go
import "github.com/MixinNetwork/bot-api-go-client"
import "fmt"

func main() {
  ctx := context.Background()

  // generate token
  token, err := bot.SignAuthenticationToken(
    CLIENT_ID,
    SESSION_ID,
    CLIENT_SECRET,
    "GET",
    "/assets",
    ""
  )
  if err != nil {
    fmt.Println(err)
    return
  }

  // query assets
  assets, err := bot.AssetList(ctx, token)
  if err != nil {
    fmt.Println(err)
    return
  }
  for _, a := range assets {
    fmt.Println(a.AssetId)
  }
}
```

