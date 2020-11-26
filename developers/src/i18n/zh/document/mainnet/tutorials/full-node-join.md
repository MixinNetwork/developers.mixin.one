# 全节点加入主网

Mixin Network 是一个采用 PoS 共识的去中心化网络，全节点使用 XIN 做节点抵押，每年做全节点抵押代币数量为流通量的 2%，第一年需要 10,000 XIN，第二年需要 11,000 XIN，依次类推。只要有足够的抵押代币任何人都可以申请加入 Mixin 主网，无需许可，可匿名参与，申请步骤：

### 生成主网私钥和地址
```
$ git clone https://github.com/MixinNetwork/mixin.git
$ cd mixin
$ go build
```
编译成功后使用 `./mixin createaddress -public` 生成两个私钥和地址，一个用来打包签名主网交易称为 signer ，另一个用来接受挖矿收益称为 payee。请妥善备份和保管 address、view key、spend key。
```
$ ./mixin createaddress -public

address: XINRXkrW1CpocUznN5feEBGYtMLku3vRKTZDpT6wFoobYnPhtbdsKjiTp6DPCUHWm8VPrcyaRabGjbxjFR5rWFa9XU77tX6d
view key: 708a8db3011a806e788a518646414ca5750f6a9ca51c0b309e5e45cdf00b2100
spend key: c0619ce9c6fad9d2b6f7f4c0e676aed8f4d07b422e5fa55fee6154961954be0c
```

发起加入主网的地址可以是 signer、payee 或者别的地址都可以没有要求，但是节点到期或中途退出节点币会退回到 payee 的地址。

`$$\color{red}{注意：节点每年的迭代必须要更换新的\;signer\;的\;key，\;payee\;的\;key\;没有要求。}$$`

### 中转抵押代币

目前暂时无法通过 Mixin Messenger 直接给主网地址转账，需要通过机器人中转。

- 下载 [Mixin Messenger](https://mixin-www.zeromesh.net/messenger)，打开[开发者后台](/dashboard)扫码登录。

- 点左侧「新应用」按提示创建好机器人，切换 Tab 到「密钥」点「应用 Session」下载 Keystore，切换 Tab 到「钱包」，输入 Keystore 中的信息启用钱包功能。

- 打开 Mixin Messenger 首页顶部搜索刚创建的机器人 Mixin ID，将抵押代币转给机器人，刷新钱包界面即可看到。

### 将抵押代币充值到主网地址

有三种办法可以将抵押代币充值到主网地址，建议先用 CNB 测试。

- 通过开发者后台提现

  钱包资产列表点 XIN 资产的提现按钮，输入主网地址、数量等参数点提现即可。

- 通过 API 转

  通过机器人的授权令牌调用 `POST /transactions` 转入到主网地址。

- 通过命令行工具

  ```
  $ git clone https://github.com/MixinNetwork/bot-api-go-client.git
  $ cd bot-api-go-client/cli
  $ go build
  $ ./cli transaction  \
    -asset c94ac88f-4671-3976-b60a-09064f1811e8 \
    -k XINRXkrW1CpocUznN5feEBGYtMLku3vRKTZDpT6wFoobYnPhtbdsKjiTp6DPCUHWm8VPrcyaRabGjbxjFR5rWFa9XU77tX6d \
    -amount 10000 \
    -uid xxx \
    -sid xxx \
    -pin xxx \
    -pin_token xxx\
    -private "-----BEGIN RSA PRIVATE KEY-----
  xxx
  -----END RSA PRIVATE KEY-----"
  ```

  `-k` 主网地址，其他参数从 Keystore 中提取，转成功后会返回主网 `transaction_hash`，可通过以下命令查看：

  ```
  ./mixin --node 35.234.74.25:8239 gettransaction --hash 95d09ebff27f988b276b32d4408ba7fc7f61e4d85af7c2267093f18486cb9a58 
  ```

### 申请加入主网

pledge 交易是申请加入主网的特殊交易。

- 构造签名 pledge 交易

  使用 `./mixin signrawtransaction` 构造签名 pledge 交易。

  | 参数 | 说明 |
  | :----- | :---- |
  | key | 签名交易，view + spend key 字符串拼接，本地签名不会发送到网络 |
  | extra | 扩展信息，signer public spend key + payee public spend key 字符串拼接，通过 `./mixin decodeaddress -a XINxxx` 分别提取 signer 和 payee 的 public spend key。 |
  | asset | 固定写 `a99c2e0e2b1da4d648755ef19bd95139acbbe6564cfb06dec7cd34931ca72cdc`，这个是 XIN 的资产 id |
  | inputs | `[{"hash": "xxx", "index":0}]` 其中 `hash` 是上一步机器人转给主网地址的 `transaction_hash` 和 `index` |
  | outputs | `[{"type": 163, "amount":"11000"}]` 其中 `type` 163 表示 pledge 交易 |
  | amount | 抵押 XIN 数量 |

  ```
  ./mixin -n 35.234.74.25:8239 signrawtransaction -key VIEWSPEND  -raw '{"version":1,"asset":"a99c2e0e2b1da4d648755ef19bd95139acbbe6564cfb06dec7cd34931ca72cdc","inputs":[{"hash":"28926e30a9959fe7e7ce9c347d8fbacae2249425015d455208de70e4c678bd88","index":0}],"outputs":[{"type":163,"amount":"10000"}],"extra":"979939097dd50d0d6be42c47b3235c07108c28ce7cca150eed3b745283a9ef9639d749ab642df3e0e5573052b7031cd1e96c328e6f73d22851c475d96b7c5257"}'
  ```

  **一定要确保 `extra` 参数的正确性！**

- 发送 pledge 交易

  签名成功会生成一个 hex 字符，调用 `./mixin sendrawtransaction` 发送包含申请加入主网的特殊交易。

  ```
  ./mixin -n 35.234.74.25:8239 sendrawtransaction -raw 86a756657273696f6e01a54173736574c420a99c2e0e2b1da4d648755ef19bd95139acbbe6564cfb06dec7cd34931ca72cdca6496e707574739185a448617368c42020001842d6eff5129c11f7c053bf1209f0267bf223f1681c9cb9d19fc773a692a5496e6465780ba747656e65736973c0a74465706f736974c0a44d696e74c0a74f7574707574739185a45479706500a6416d6f756e74c7050002addc961da44b65797391c4202902d1f57276eb32882066de06c0d70fc17a3cd8dc801c1c50e6d4918e39344fa6536372697074c403fffe01a44d61736bc4209515d480e6f28b79228c32db33718e1ca03750bbe7748cd3968a5d450cd743d1a54578747261c400aa5369676e6174757265739190
  ```

### 硬件配置

- 内存：64G
- CPU：16 核
- 硬盘：1T SSD（必须 SSD）
- 带宽：暂时要求不高

### 运行节点
- 下载最新版本 mixin https://github.com/MixinNetwork/mixin/releases
- config.json 的 listener 里指定好自己的外部 IP 或者域名地址
- config.json 里指定好 signer private spend key
- 使用 systemd 运行 mixin https://github.com/MixinNetwork/mixin/blob/master/config/systemd.service

---
**可以通过 Mixin Messenger 搜索 31911、26596 联系我们提供帮助。**