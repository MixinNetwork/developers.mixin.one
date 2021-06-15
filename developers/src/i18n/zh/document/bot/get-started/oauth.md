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
当机器人检测到用户没有授权时应跳转至 `https://mixin-www.zeromesh.net/oauth/authorize?client_id=b7347ca4-186e-4e54-9db6-755a4ab0b5d4&scope=PROFILE:READ+ASSETS:READ&response_type=code&return_to=` 向用户申请授权，参数说明：

- client_id - 机器人唯一标识
- scope - 申请权限
- response_type - 固定写 code 返回授权码
- return_to - 当前页面链接，授权后可跳转回当前界面

授权成功后页面会自动跳转至机器人的验证网址，回调 URL 会附带 code 授权码和 return_to 参数，开发者再根据授权码请求令牌：

发请求：

```cmd
POST https://mixin-api.zeromesh.net/oauth/token
```

附带的数据：

```json
{
    "client_id": "机器人唯一标识",
    "code": "授权成功回调返回的授权码",
    "client_secret": "机器人密钥"
}

每个字段的内容：

- `client_id`: 机器人唯一标识
- `code`: 授权成功回调返回的授权码
- `client_secret`: 机器人密钥


返回数据：

```json
{
    "access_token": "",
    "scope": ""
}
```

每个字段的内容：

- `access_token`: 用户授权令牌
- `scope`: 用户同意的授权列表，例如'PROFILE:READ ASSETS:READ'

建议开发者将 access token 缓存起来，后续通过 access token 调用 API 访问用户数据，可据此判断用户是否已授权。

### 取消授权

开发者可以在 Mixin Messenger 设置 - 隐私与安全 - 授权里找到机器人取消授权，注意取消授权同时会清空客户端当前机器人的 Cookies 等缓存信息。

### 下一步

- [获取用户数据](./api)