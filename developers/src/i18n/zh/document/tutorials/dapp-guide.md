## 钱包开发指南

本教程将介绍如何将 Mixin 去中心化钱包集成到您的产品中。

### 注册开发者

下载并登录 [Mixin Messenger](https://mixin.one/messenger) ，扫码并登录[开发者后台](/dashboard)。

### 创建应用

进入开发者后台，点左侧「新应用」按提示创建应用，应用可用于独立的 Dapp 钱包也可用于 Mixin Messenger 机器人，前者为您产品每个用户生成一个钱包，后者主要是通过授权来获取 Mixin Messenger 用户并提供相应的服务。 

每个开发者账号可免费创建 2 个应用，可付费创建更多。

### 应用密钥

切换应用到「密钥」点「生成新的 Session」为 Mixin App 生成 PIN、Session ID、PinToken、私钥等敏感信息，内容如下：

```
{
 "pin": "123456",
 "client_id": "b08dd879-7366-4d48-bf16-a2ce6014e213",
 "session_id": "6ef85e29-2dac-48ba-899a-cf64593e6ba8",
 "pin_token": "Qc8O7oI0Uw4NZkE1j5xL3I6Iq1iNraF18Y8yOhxGCsZn3n/KaBY66sLbkoLqTvNzwLxxqUYJ12HRaJgyHMql6ezLW5mgfh0wXxH2m3tSvP9qywX0YzuyCUGOrR1h4b8CyOdwm25Rtjdo8OBr6R4V4kJnE8DvY/mBfkpF0WqNLxY=",
 "private_key": "-----BEGIN RSA PRIVATE KEY-----\r\nMIICEAIBAAKBgQCRybXjMUn9OZnxxtfuHPHcK2OADKQmejSDVr/i/3GaqljcVv4H\r\nyTiil/WcO1kVSyOSi8XarcikO5rR8ceM0paZs0drk7+cxdVMSJCsjoGZ6WrdtW9L\r\n5RROJ/Z6vnhKDzaqH43K4JKAeFtH11LDaWb8kC2CAy8RpZSUdI69bm2E4QIDAQAB\r\nAoGAAnXW/fiM+RsJwAzNBBW09zQ8P6L2+jdBv52tK1WIQ0XwrfdB3jvFGulZmcNe\r\no39bIFPzHReltS/UUwqzhWrgY7z0AVuR9ZZzfC/3MUkoUzghaepJMJNmgR7rMaHw\r\nfV9PY9ZgYLz9aPODRcwmG8yqEw7V5ER+ivxfAX40zc0XpskCQQDyoddxgoCQjRXV\r\n6ukZwWFSOVyakugsGwnkREFl7MxALhslxrPzTjrPTN8Qg6a81df4jlqKZeJ9sUck\r\nsjtDC4LvAkEAmdHyq2yGH70voYwDQmGyPFAMDaSjeGBhGX8slZ+OhUBOrru4or7j\r\niYZ3uWfkBI2A97Dz/0+N2EQV8Vri8hs1LwJAXR1NMCu0KUVrztfDM3YqYkLPTib4\r\n4QxTZH3pVzNkQ3EuS/YQ01v/Z9UJei38DFZI9wOyrZBiNniVY/jek2FUkwJAAOYg\r\nM+5DbmYNpDUMQ9QMVZvmJiJDLk3p41tB6HHxREgW7aB9OL4xo7kcdAHubDRjf48S\r\nLfjKDGyBcFKmpuGP0wJBANP/qrYroIHugYgJ7RumKlbp7ep0ApBLD8R9+HlHOLoh\r\nao6cSE5BlKeEUQzKIGPG1VqZPpaW2gbezpJbfUC+3ao=\r\n-----END RSA PRIVATE KEY-----\r\n"
}
```

- pin - 应用密码

- client_id - 应用唯一标识，重置 Session 不会变

- session_id - 应用会话标识，重置 Session 会变

- pin_token - 用于加密 PIN，重置 Session 会变

- private_key - 应用私钥，重置 Session 会变
  
  **请妥善保管这些敏感信息，注意服务器和浏览器缓存都不会保存这些敏感信息。**

### 创建用户

将 Mixin 钱包集成到新的产品中通常需要为每一个平台用户对应创建一个 Mixin 钱包用户，具体步骤：

- 生成一个新的 RSA 私钥，通过私钥导出公钥
- 将公钥和用户名作为参数，通过 `POST /users`  注册为 Mixin 钱包用户，参考[文档](https://developers.mixin.one/api/c-users/app-user/)，参考[代码](https://github.com/MixinNetwork/ocean.one/blob/master/example/models/pool_key.go)。

注意事项：

- 私钥字符串换行有空格可能导致创建用户失败
- [官方 Golang SDK](https://github.com/MixinNetwork/bot-api-go-client)中 uid 对应 client_id 参数，session_id 对应 session_id 参数，sessionKey 对应 private_key 参数。

### 用户设置 PIN

用户的 6 位数字 PIN 码是用户转移资产的唯一途径，丢失无法找回，作用等同于 BTC、ETH 链上资产私钥。**强烈建议不要替用户保管 PIN 码，除非特殊用途并且有能力保管好**。注意用户的初始密码为空，必须先引导用户设置密码：

- 通过用户的 user_id、session_id、pin_token 为 PIN 加密
- 将加密后的 PIN 作为参数，通过 `POST /pin/update` 更新 PIN

注意事项：

- 不要明文传输 PIN ，在客户端完成 PIN 加密再传输
- 设置初始 PIN 不要传 old_pin 参数或者传空
- 加密 PIN 的 iterator 参数必须是递增的 ，没有并发问题用当前系统纳秒时间也可以
- 加密后的 PIN 只能用一次，不能设置完 PIN 后又马上拿上一次的加密 PIN 去转账或者修改 PIN，必须重新生成
- 特别注意：**必须使用用户的私钥、user_id、session_id 等参数去加密 PIN 和调用接口，不能使用应用的去调用接口**。

为了帮助用户安全记住自己的 6 位数字 PIN 码，Mixin Messenger 做了如下提醒：

- 设置初始 PIN 码或修改 PIN 码会让用户反复输入多达 4 - 5 次。
- 设置 PIN 码时会提醒用户不要设置过于简单不安全的 PIN 码，例如 123456。
- 每输入 PIN 码后间隔 24 小时进入钱包首页都会提醒用户输入一次 PIN 码辅助用户记忆。

关于安全的指纹支付方案 iOS 可以搜索 Secure Enclave 、Android 搜索 isInsideSecureHardware ，也可以直接使用 Mixin Messenger 的源码来实现。

### 用户资产

调用 `GET /assets` 可返回用户的资产列表，参见[文档](https://developers.mixin.one/api/f-assets/read-assets)。

注意事项：

- 注意使用用户的私钥、user_id、session_id 等参数调用接口
- 如果用户没有资产 API 会返回空列表，您产品的服务器端可自定义一个列表返回，例如 OceanONE 的就用一个 json 来配置的，参见[ json 文件](https://github.com/MixinNetwork/ocean.one/blob/master/example/web/src/api/assets.json)。
- 有图标的资产是经过主网开发团队和节点验证过的，如需显示项目代币图标，请先把项目信息提交到 https://coinmarketcap.com ，然后在 https://github.com/MixinNetwork/asset-profile 提 pr 。
- 想要特定资产 asset id 可以充值或转账该类型的代币，到账后再次调用资产接口就有了。

### 用户充值

 调用 `GET /assets/:id` 可返回用户某个币种的详细信息，参见[文档](https://developers.mixin.one/api/f-assets/read-asset)。

- 根据 destination 和 tag 来显示充值信息，有些资产（例如 EOS、BTS）需要两个字段同时使用才能完成充值，可以简单的判断 tag 是否为空来区分处理
- 调用 `GET /assets` 资产列表并不会自动帮用户创建链上充值地址，首次调用 `GET /assets/:id` 会为用户自动创建链上充值地址，可根据 destination 字段是否为空来判断充值地址是否已创建。如果 destination 为空界面上可以显示一个转圈，然后定时调用`GET /assets/:id` ，一般很快。
- 同一主链的充值地址是相同的，例如可以直接往 BTC 的充值地址充入 Omni USDT，符合 ERC-20 的代币都可以充到 ETH 的充值地址。Mixin 网络支持所有 ERC20 、TRC 20 和基于 EOS 发的币。
- 可以根据 confirmations 来提醒用户充值需要等待多少个区块确认才能入账。Mixin 充值确认数一般高于钱包和交易所两倍以上，充值会慢一些，主要目的是为了安全，可以有效阻止双花等问题。
- 调用 `GET /external/transactions` 可获得充值进度，接口的 confirmations 字段表示当前充值已完成的区块确认数，BTC、BCH、BSV、LTC 这四种资产 0 确认就有数据，其他的资产需要有 1 个区块确认才会有数据。注意该接口与 `GET /snapshots` 不会同时返回，可通过 asset id 、type 和 transaction hash 字段来映射为同一条记录，参考[文档](https://developers.mixin.one/api/m-mixin-network/external-transactions/)。
- 如果遇到充值迟迟不到账的问题，地址没错一般提醒用户等着就行，有可能是区块数据同步慢导致的，可访问 https://mixin.one/network/chains 对比 Mixin 的区块高度和数据所在的区块即可。
- 建议产品做足充值相关的提醒，尽量避免用户充错。
- **强烈建议提醒用户：首次充值请小额尝试！首次充值请小额尝试！首次充值请小额尝试！**

### 用户提现

调用 `POST /withdrawals` 可将资产提现至其他钱包和交易所，注意提现需要先添加提现地址，参见[提现文档](https://developers.mixin.one/api/g-transfer/withdrawal/)和[添加地址文档](https://developers.mixin.one/api/e-addresses/create-address)。

- Mixin 应用之间充值提现实际上是 Mixin 内部转账，免费且秒到，例如从 Mixin 钱包提现至币印钱包
- 提现地址不支持修改，可以先删除后增加
- 提现前调用 `GET /addresses/:id` 刷新提现信息，例如提现手续费、最小限额和是否需要保留储备金。
- 根据 dust 字段判断提现最小限制
- 根据 reserve 字段判断账户是否需要保留储备金，例如 XRP
- 根据 fee 字段获取提现手续费，提现手续费根据公链拥堵情况自动调整，个别应用出于业务考虑仍然会收提现手续费
- 除了可以通过 `GET /addresses/:id` 获取提现手续费信息，还可以单独调用 `GET /assets/:id/fee` 获取。
- 建议产品做足提现相关的提醒，尽量避免用户提到错误的地址，资产提现后如果被其他交易所和钱包原路打回资产无法回到用户钱包！
- **强烈建议提醒用户：首次提现请小额尝试！首次提现请小额尝试！首次提现请小额尝试！**

### 用户转账

调用 `POST /transfers` 可实现用户与用户、用户与应用、应用与应用之间转账，参见[文档](https://developers.mixin.one/api/g-transfer/transfer/)。

- trace_id 参数非常重要，可有效的防止重复支付，同一个 trace_id 只能成功转账一次
- 可以使用 snapshot_id 来做随机数，转账成功才会生成，Mixin Network 能确保唯一性
- 调用 `POST /payments` 可验证一笔转账是不是已支付的状态，参见[文档](https://developers.mixin.one/api/g-transfer/verify-payment)。
- 分页调用 `GET /snapshots` 可获取资产的所有的转账记录，参考[文档](https://developers.mixin.one/api/m-mixin-network/network-snapshots/)，注意 url 没有 network 也不支持 order 参数，别的都一样。
- 如果调用 API 返回 500 的错误码一般重试一下就好了

### 应用充值

必须通过 Mixin Messenger 充值，搜索当前应用的 Mixin ID 进入会话后从 + 菜单里选择转账即可，注意只有机器人的开发者与当前用户是同一人时才会显示转账按钮。

### 应用提现

进入开发者后台，选中应用并切换至钱包，输入应用的密钥信息点更新即可看到资产列表，按提示提现即可。

### 应用对账

调用 `GET /network/snapshots` 可抓取 Mixin 全网所有的交易记录，如果通过应用的密钥信息访问接口，是你的用户就会返回 user_id 等信息，这样就能过滤出应用所有用户的充值、提醒和转账数据，从而实现对账功能，参考[文档](https://developers.mixin.one/api/m-mixin-network/network-snapshots/)。

### 错误码

| 错误码   | 错误说明         |
|:-----:|:------------:|
| 20117 | 余额不足         |
| 20118 | PIN 格式不对     |
| 20119 | PIN 不对       |
| 20120 | 转账金额太小       |
| 20124 | 手续费不足        |
| 20125 | 请勿重复支付       |
| 20127 | 提现金额太小       |
| 20131 | 提现 Memo 格式不对 |
| 30100 | 区块同步异常，请稍后重试 |
| 30102 | 提现地址格式错误     |

**错误码 429 比较特殊，凡是不需要 PIN 作为参数的 API 都是请求过快，稍后重试即可；凡是需要 PIN 作为参数的 API 报 429 都说明用户最近 24 小时使用错误的密码大于等于 5 次，需要让用户等 24 小时再尝试，超过次数再尝试就算是 PIN 正确的也不会返回正确的结果，而且可能锁更长时间；**

### 资源

* Golang SDK（Mixin 团队）： https://github.com/MixinNetwork/bot-api-go-client 
* Golang SDK（Fox.ONE 团队）： https://github.com/fox-one/mixin-sdk-go 
* PHP SDK（Exin 团队）： https://github.com/ExinOne/mixin-sdk-php
* 其他 SDK 、教程和开源项目汇总： https://github.com/awesome-mixin-network/mixin_network_sdk_resource

### 其他

- 注意 Mixin 钱包不支持 EOS、BTS 空投，但用户有可能会收到数量不定的空投币，充值和提现地址不同可以说明这点，这与 Mixin Network 整体设计有关。
- 极少数情况下会出现提现失败的情况，可能是因为合约有问题或者有限制导致链上交易失败了，但是手续费已经花了，这种情况下不退还手续费。
- 订阅 7000101498 机器人可接受异常的推送，例如提现故障、主网节点故障、某条公链数据同步慢或异常等，一般不用管，收到报警 Mixin 团队一般都会立刻开始处理，等着就行。

### 案例

- [币印钱包](https://blockinwallet.io/) - 除了为矿工提供方便好用的全币种钱包，还提供借贷、理财等增值服务。
- [开源 Web 钱包](https://wallet.mixcoin.one/) - 源码： https://github.com/over140/mixwallet

---

**现在接入 Mixin 全币种钱包享受 100% 提现费补贴，以 XIN 的形式按月结算！** 想加入 Mixin 开发者群或者有其他问题请联系 Mixin ID 762532 找长老。