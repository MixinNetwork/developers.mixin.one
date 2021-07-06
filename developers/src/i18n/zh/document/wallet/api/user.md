# 注册 Mixin Network 用户

Mixin Network 中分为几种用户，Messenger 用户, 机器人用户，机器人子用户:

- Messenger 用户，需要下载 Mixin Messenger, 通过手机号注册
- 机器人用户，需要通过开发者后台注册，两个免费额度
- 机器人的子用户

他们之间区别:

- Messenger 用户跟机器人几乎是完全一致，机器人的私钥是由开发者
- Messenger 用户可以授权给机器人，目前只有读取权限，像个人信息，资产信息等
- 子用户，只能对资产进行操作，无法发送消息, 打电话, 另外要注意保存好私钥，无法被找回

### `POST /users` 

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| session_secret | String | base64 之后的 Ed25519 公钥 |
| full_name | String | 用户名 |

curl 示例

```
$$XIN:curl$$ "https://api.mixin.one/users" -X POST --data '{"full_name":"Bot User","session_secret":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDMTuli9K9k7F+L7Rq34se23nQeV2yvjVGCZyRTbp8qNASnRq6N679ZflgVxNUsr2qkHN4eqvafrQ9IIcRXfofMlWWIU6MrgVVD0UEVyH4jKA5gUr4smU/SDnVLqb3TojYMELIKHgqnrjqDJ0b+vMUG1Iix4fi+CvjSiJzsWPOavQIDAQAB"}'
```

返回数据

```json
{
  "data":{
    $$XIN:user$$
  }
}
```
