---
title: 读取信息
---

在[上一篇教程文章](./oauth) 中，我们介绍了 OAuth2 流程以及如何使用它来获取 Access Token。本文将向您展示如何读取用户信息。

为了简化叙述，从现在开始，文章中将会提到 Mixin 的 SDK。 Mixin 团队和社区提供了各种 SDK 供开发者使用。 您可以在 [SDK](/resources/sdk) 页面中找到 SDK。

## 阅读用户资料

:::tip
要获取用户的基本个人信息，需要`PROFILE:READ`权限。
:::

我们可以使用 [`/me`](/api/users/profile) API 读取用户的个人资料。 `/me` 是一个需要身份验证的 API，因此我们需要先获取 Access Token 并将其放入 HTTP 头中。

我们发这样的一个请求来获取信息：

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
`user_id` 字段是整个 Mixin 网络中每个“帐户”或“用户”的唯一 ID。

此外，如果用户是 Mixin Messenger 用户，您可以使用 [`POST /messages`](/api/messages/send) 和 `user_id` 字段向他们发送消息。
:::

## 读取用户的资产

:::tip
要获取用户的资产余额，需要 `ASSETS:READ` 权限。
:::

调用 `GET /assets` 只会返回余额大于 0 的资产。当你使用一个零余额的新用户拥有的 Access Token 调用这个 API 时，将返回一个空列表。

```bash
GET -H "Authorization: Bearer $ACCESS_TOKEN" https://api.mixin.one/assets
```

import RespAssets from '../../_partials/_resp.assets.md'

<RespAssets />

:::info
`asset_id` 字段是整个 Mixin 网络中每个资产的唯一 ID。

可以从 https://mixin.one/snapshots 通过搜索`btc`等资产代码获取。 您也可以将资产存入 Mixin Messenger 钱包并与机器人 “7000103061” 对话，然后搜索并复制资产信息。
:::

## 读取应用程序的资产

Mixin 应用程序是一种特殊类型的用户。 它也有一个像普通用户一样的钱包。 您可以通过访问 开发者仪表板 - 选择任何应用程序 - 单击“钱包”选项卡 来检查应用程序的资产。

您还可以通过使用应用程序的 Access Token 调用 [`/assets`](/api/assets/assets) 以编程方式读取资产。 生成 Access Token 的算法可以在[这里](../guide/generate-jwt-token)找到，但你也可以使用[SDK](/resources/sdk)来简化这个过程。

下面是使用官方Go SDK生成token和读取资产的例子：

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

