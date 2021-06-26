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
