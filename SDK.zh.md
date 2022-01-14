## SDK 需要实现的 API 列表:

#### 用户相关

- GET  /me
- GET  /users/:id
- POST /users 创建机器人用户
- POST /users/fetch 获取用户列表
- POST /me 更新用户信息
- GET  /me/code 二维码信息
- POST /me/preferences 
- POST /pin/update
- POST /pin/verify

#### 用户交易（私有）

- GET  /snapshots
- GET  /snapshots/:id
- GET  /snapshots/trace/:id

#### 提现地址

- POST /addresses
- POST /addresses/:id/delete
- GET  /addresses/:id
- GET /assets/:id/addresses

#### 资产

- GET   /assets
- GET  /assets/:id
- GET  /assets/:id/fee
- GET  /assets/:id/snapshots 单一资产的交易

#### 附件

- POST /attachments
- GET  /attachments/:id

#### 二维码

- GET  /codes/:id

#### NFT

- GET   /collectibles/collections/:id
- GET  /collectibles/tokens/:id
- GET  /collectibles/outputs
- POST /collectibles/requests
- POST /collectibles/requests/:id/cancel
- POST /collectibles/requests/:id/sign
- POST /collectibles/requests/:id/unlock

#### 群组会话

- POST /conversations
- POST /conversations/:id
- POST /conversations/:id/participants/:action
- POST /conversations/:id/exit
- POST /conversations/:id/join
- POST /conversations/:id/mute
- POST /conversations/:id/rotate
- GET  /conversations/:id

#### 消息

- POST /messages
- POST /encrypted_messages
- POST /acknowledgements

#### 多签

- GET  /multisigs/outputs
- POST /multisigs/requests
- POST /multisigs/requests/:id/cancel
- POST /multisigs/requests/:id/sign
- POST /multisigs/requests/:id/unlock

#### Mixin 公开 API

- GET  /network
- GET  /network/chains
- GET  /network/assets/:id
- GET  /network/snapshots/:id
- GET  /network/snapshots
- GET  /network/assets/search/:q
- GET /network/assets/top
- GET /network/assets/multisig 支持多签的列表
- GET /network/ticker
- GET /external/fiats
- GET /external/addresses/check
- GET /external/transactions
- POST /external/proxy

#### 用户关系

- POST /relationships 
- POST /reports 举报用户

#### 搜索

- GET /search/:q

#### 支付相关

- POST /transactions 主网交易
- POST /payments 
- POST /transfers 
- POST /outputs
- GET  /transfers/trace/:id

#### 提现

- POST /withdrawals