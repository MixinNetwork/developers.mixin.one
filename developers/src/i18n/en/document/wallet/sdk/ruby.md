# Ruby SDK

### Installation

Add to gemfile, and `bundle install`
```ruby
gem 'mixin_bot', github: 'an-lee/mixin_bot', branch: 'master'
```

Or

```shell
gem install mixin_bot
```

### Usage

```ruby
# Initialize params
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

# Generate user
user = MixinBot.api.create_user('New User')
puts user

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

user = MixinBot.api.create_user('New User', private_key: 'xxx', public_key: 'xxx')

user_mixin_api = MixinBot::API.new(
  client_id: user_id,
  client_secret: OpenSSL::PKey::RSA.new(private_key).public_key.to_pem.gsub(/^-----.*PUBLIC KEY-----$/, '').strip,
  session_id: session_id,
  pin_token: pin_token,
  private_key: private_key
)

user_mixin_api.update_pin(pin: '123456')

user_mixin_api.update_pin(old_pin: '123456', pin: '234567')

# get assets of the bot
assets = user_mixin_api.read_assets
puts assets
```

Fo more examples, see [spec](https://github.com/an-lee/mixin_bot/blob/master/spec/mixin_bot/api/user_spec.rb)。

---

This SDK is developed by an independent developer [an-lee](https://github.com/an-lee). If you have any questions, you can search for 1051445 through Mixin Messenger to contact the author for help.