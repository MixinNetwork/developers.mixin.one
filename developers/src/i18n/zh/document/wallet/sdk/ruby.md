# Ruby SDK

### 安装

```shell
gem install mixin_bot
```

或者在 `Gemfile` 添加

```ruby
gem 'mixin_bot', github: 'an-lee/mixin_bot', branch: 'master'
```

再执行

```shell
bundle install
```

### 例子

```ruby
# 配置参数
MixinBot.client_id = '25696f85-b7b4-4509-8c3f-2684a8fc4a2a'
MixinBot.client_secret = 'd9dc58107bacde671...'
MixinBot.session_id ='25696f85-b7b4-4509-8c3f-2684a8fc4a2a'
MixinBot.pin_token = 'b0pjBUKI0Vp9K+NspaL....'
MixinBot.private_key = `
-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQDQYjiR/Te6Bh/1bk8gWRbQkrX0AIGPja1DLUQHu5Uw9M4P53O3
f4pDCGoN3R5+LYjODtquOwmEjcMhbhp6XarrnJVXH8WGmJcpjVwGtwIjPTeRMu4Z
...
-----END RSA PRIVATE KEY-----`

# 生成用户
user = MixinBot.api.create_user('New User')
puts user

# 得到结果如下：
# {
#   "data": {
#     "type":"user",
#     "user_id": "xxxx",
#     "full_name": "New User",
#     "session_id": "xxx",
#     "pin_token": "xxx",
#     ...
#   },
#   rsa_key: {
#     public_key: "xxx",
#     private_key: "xxx"
#   }
# }

# 或者可以自定义 rsa_key
user = MixinBot.api.create_user('New User', private_key: 'xxx', public_key: 'xxx')

# 创建用户 api 实例
# 其中 user_id, private_key, session_id, pin_token, private_key 从上述生成用户的返回值中可以得到
user_mixin_api = MixinBot::API.new(
  client_id: user_id,
  client_secret: OpenSSL::PKey::RSA.new(private_key).public_key.to_pem.gsub(/^-----.*PUBLIC KEY-----$/, '').strip,
  session_id: session_id,
  pin_token: pin_token,
  private_key: private_key
)

# 设置初始密码
user_mixin_api.update_pin(pin: '123456')

# 更新用户密码
user_mixin_api.update_pin(old_pin: '123456', pin: '234567')

# 获取用户资产列表
assets = user_mixin_api.read_assets
puts assets
```

更多例子参见 SDK 的测试示例 [spec](https://github.com/an-lee/mixin_bot/blob/master/spec/mixin_bot/api/user_spec.rb)。

---

本 SDK 由独立开发者 [an-lee](https://github.com/an-lee) 开发和维护，使用有问题可以通过 Mixin Messenger 搜索 1051445 联系作者提供帮助。
