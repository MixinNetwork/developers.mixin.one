# Ruby SDK

### Installation

```shell
gem install mixin_bot
```

Or, add the following to gemfile:

```ruby
gem 'mixin_bot'
```
and 

```
bundle install
```

### Quick Start

```ruby
# Initialize params
MixinBot.client_id = '25696f85-b7b4-4509-8c3f-2684a8fc4a2a'
MixinBot.client_secret = 'd9dc58107bacde671...'
MixinBot.session_id ='25696f85-b7b4-4509-8c3f-2684a8fc4a2a'
MixinBot.pin_token = 'T-3RhNg36a4rSCZRpkbRzbl5CnslOMDo...'
MixinBot.private_key = '6rK2AAf3FmDIgNhgPiC-Sn5D5qh7ieq8PuJANnf4-goNRVZPt3cnY0Zr6xF1COaR...'

# Generate a user.
user = MixinBot.api.create_user('New User', key_type: 'Ed25519')
puts user

# The output:
# {
#   "data": {
#     "type":"user",
#     "user_id": "xxxx",
#     "full_name": "New User",
#     "session_id": "xxx",
#     "pin_token": "xxx",
#     ...
#   },
#   ed25519_key: {
#     public_key: "xxx",
#     private_key: "xxx"
#   }
# }
# Create user api instance
# user_id, private_key, session_id, pin_token, private_key are from the above
user_mixin_api = MixinBot::API.new(
  client_id: user_id,
  session_id: session_id,
  pin_token: pin_token,
  private_key: private_key
)

# Set initial PIN
user_mixin_api.update_pin(pin: '123456')

# Update PIN
user_mixin_api.update_pin(old_pin: '123456', pin: '234567')

# Get assets list.
assets = user_mixin_api.read_assets
puts assets
```

Fo more examples, check [spec](https://github.com/an-lee/mixin_bot/blob/master/spec/mixin_bot/api/user_spec.rb)。

---
This SDK is developed by an independent developer [an-lee](https://github.com/an-lee). If you have any question, you can search for 1051445 in Mixin Messenger to contact the author for help.
