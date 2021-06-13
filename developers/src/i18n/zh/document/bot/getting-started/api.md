# 访问用户数据

### 用户基本信息

`GET /me` 

获取授权用户的个人基本信息，需要 `PROFILE:READ` 权限；获取用户的手机号需要 `PHONE:READ` 权限，参考[文档](/document/bot/api/profile)。

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

### 其他常用 API

* `GET /assets` 获取授权用户的资产列表，需要 `ASSETS:READ` 权限，参考[文档](/document/bot/api/assets/list)。

* `GET /assets/:id` 获取授权用户某个资产信息，需要 `ASSETS:READ` 权限，参考[文档](/document/bot/api/assets/asset)。

* `GET /friends` 获取授权用户的好友列表，需要 `CONTACTS:READ` 权限，参考[文档](/document/bot/api/users/contacts)。

* `GET /blocking_users` 获取授权用户的屏蔽列表，需要 `CONTACTS:READ` 权限，参考[文档](/document/bot/api/users/blocking)。

* `GET /snapshots` 获取授权用户某个资产的所有转账信息，需要 `SNAPSHOTS:READ` 权限，参考[文档](/document/bot/api/assets/snapshots)。

* `GET /snapshots/:id` 获取授权用户某条转账的详情，需要 `SNAPSHOTS:READ` 权限，参考[文档](/document/bot/api/assets/snapshot)。

* `GET /conversations/:id` 获取授权用户某个会话的信息，包括单聊和群聊，参考[文档](/document/bot/api/conversations/read)。

如果访问 API 返回 401 ，需要清理缓存的 access token 然后重新申请授权。

### 下一步

建议开发者将 `user_id` 存入数据库，以便在需要的时候给用户推送信息，例如重要的公告。

- [Schema 交互](./schema)

  机器人可唤起 Mixin Messenger 某些特定功能和界面，例如转账、分享文字等。

- [接收消息](./websocket)

  通过 Websocket 接收用户的留言和用户添加当前机器人为联系人的通知。