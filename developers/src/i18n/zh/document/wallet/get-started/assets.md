# 用户资产

调用 `GET /assets` 可以返回用户余额大于 0 的资产，新用户调用该接口会返回空列表，钱包可以内置一个资产列表。

```go
const (
	userId     = ""
	pinToken   = ""
	sessionId  = ""
	privateKey = ""
)

func main() {
	ctx := context.Background()

	//签名授权令牌
	authenticationToken, err := bot.SignAuthenticationToken(user.UserId, user.SessionId, userSessionKey, "GET", "/assets", "")
	if err != nil {
		fmt.Println(err)
		return
	}
	//获取用户资产列表
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

- 调用 `GET /assets/:id` 可以返回单个资产的详情，包括资产的充值地址。 比如要获取 BTC 的充值地址， 就可以调用 `GET /assets/c6d0c728-2624-429b-8e0d-d9d19b6592fa`
- `asset_id` 资产 id 全网唯一且固定不变，可以从 https://mixin.one/snapshots 里搜索资产符号例如 `btc` 获取；也可以将资产充值进 Mixin Messenger 钱包后找到 `7000103061` 机器人搜索并复制资产信息，格式如下：

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

### 下一步

- [用户转账](./transfer)

  钱包用户之间转账免费且实时到账。
