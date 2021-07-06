# OAuth 授权

要访问 Mixin Messenger 用户的个人信息、资产等数据需要开发者向用户申请授权。

### 权限列表

| 权限                 | 说明                                 |
|:------------------:|:----------------------------------|
| PROFILE:READ       | 获取用户基本信息，例如 user id、Mixin ID、名称、头像 |
| ASSETS:READ        | 读取用户资产列表，资产余额                      |
| PHONE:READ         | 读取用户手机号                            |
| CONTACTS:READ      | 读取用户联系人列表，禁言列表                     |
| MESSAGES:REPRESENT | 允许机器人代表用户发消息                       |
| SNAPSHOTS:READ     | 访问用户的转账记录，包括充值和提醒                  |

申请授权至少包含 PROFILE:READ 权限，用户在授权的时候可能会勾掉某些权限，建议开发者只申请必要的权限并在缺失权限的情况下做好界面引导。

### 申请授权

当机器人检测到用户没有授权时应跳转至 `https://mixin-www.zeromesh.net/oauth/authorize?client_id={client_id}&scope={scope}&response_type=code&return_to=` 向用户申请授权，参数说明：

**必须的参数**

- client_id - 机器人唯一标识
- scope - 申请权限，如果需要多个权限，请用 `+` 拼接
- response_type - 固定写 code 返回授权码

**可选的参数**

- state - 任意字符串，你可以用于在 OAuth 完成后验证
- code_challenge - 你的 app 创建的 code verifier 的 SHA256 摘要，[查看此处](https://www.oauth.com/oauth2-servers/pkce/authorization-request/)了解更多
- code_challenge_method - 请指定`SHA256`

授权成功后页面会自动跳转至机器人的验证网址，回调 URL 会附带 code 授权码和 return_to 参数，开发者再根据授权码请求令牌：

```
POST https://mixin-api.zeromesh.net/oauth/token
{
    "client_id": "机器人唯一标识",
    "code": "授权成功回调返回的授权码",
    "client_secret": "机器人密钥"
}

返回数据
{
    "access_token": "用户授权令牌",
    "scope": "用户同意的授权列表，例如'PROFILE:READ ASSETS:READ'"
}
```

建议开发者将 access token 缓存起来，后续通过 access token 调用 API 访问用户数据，可据此判断用户是否已授权。

### 取消授权

开发者可以在 Mixin Messenger 设置 - 隐私与安全 - 授权里找到机器人取消授权，注意取消授权同时会清空客户端当前机器人的 Cookies 等缓存信息。

### 下一步

- [获取用户数据](./api)