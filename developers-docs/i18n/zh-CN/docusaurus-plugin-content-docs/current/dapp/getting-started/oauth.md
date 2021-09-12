---
title: OAuth 授权
---

在某些情况下，您的应用程序需要读取 Messenger 用户的个人资料、资产、快照等数据，因此您需要使用 [OAuth 2.0](https://tools.ietf.org/html/rfc6749) 协议来 验证用户。

### 请求授权

当bot检测到自己没有被用户授权时，它应该跳转到以下url向用户请求授权：

```
https://oauth.mixin.one/authorize?client_id=CLIENT_ID&scope=SCOPE&response_type=code&return_to=
```

其中参数为：

**必需参数**

- **client_id** - 应用的client_id，可以从上一篇提到的keystore中获取。
- **scope** - 请求的权限，请参阅[本文档](/api/oauth/scope/) 了解更多详细信息。 它应该至少包含`PROFILE:READ` 权限。
- **response_type** - 使用 `code` 返回授权码

**可选参数**

- **state** - 由您的应用程序生成的随机字符串，稍后您将对其进行验证。
- **code_challenge** - 由您的应用程序生成的代码挑战，它是您的代码验证器的 SHA256 哈希值。 有关更多信息，请[访问这里](https://www.oauth.com/oauth2-servers/pkce/authorization-request/)
- **code_challenge_method** - 代码挑战方法，请设置为`SHA256`

:::tip
用户在授权时可以取消选中某些权限。

建议开发者只申请必要的权限，在没有权限的情况下做适当的引导GUI。
:::

## 交换 Access Token 的授权码

授权成功后，页面会自动跳转到应用的`OAuth URL`，会附带授权码和 `return_to` 参数：

```
YOUR_APP_OAUTH_URL?code=AUTHORIZATION_CODE&return_to=YOUR_APP_RETURN_URL
```

开发人员需要阅读 `AUTHORIZATION_CODE` 并与之交换 Access Token：

```
POST https://api.mixin.one/oauth/token
```

```json title="Payload"
{
    "client_id":    "application's client_id from keystore",
    "code":         "AUTHORIZATION_CODE in the callback URL",
    "client_secret":"the `app secret` that generated in the previous article"
}
```

```json title="Response"
{
    "access_token": "user's authorization token",
    "scope":        "list of permissions that the user has given, e.g. 'PROFILE:READ ASSETS:READ'"
}
```

:::tip
建议开发者缓存 Access Token，然后调用API通过 Access Token 访问用户数据，判断用户是否已经授权。
:::

