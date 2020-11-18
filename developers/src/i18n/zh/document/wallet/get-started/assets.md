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

### 下一步

- [用户转账](./transfer)

  钱包用户之间转账免费且实时到账。