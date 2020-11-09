# 加入全节点

Mixin Network 是一个采用 PoS 共识的去中心化网络，全节点使用 XIN 做节点抵押，XIN 发行总量恒定 100 万，50 万作为挖矿奖励，每年做全节点抵押代币数量为流通量的 2%, 节点挖矿收益为矿池剩余 10%。

### 如何加入全节点？
第一年做全节点需要 10000 个XIN 做抵押，即可加入。第二年 11000 个 XIN。

注意，节点每年的迭代必须要更换新的 signer 的 key， payee 的 key 没有要求。

生成主网私钥和地址
```
$ git clone https://github.com/MixinNetwork/mixin.git
$ cd mixin
$ go build
```
编译成功后使用 ./mixin createaddress -public 生成两个私钥和地址，一个是 signer 用来打包签名主网交易，一个是 payee 用来接受挖矿收益。请一定妥善保管这三个数据 address, view key, spend key。

例如：
```
$ ./mixin createaddress -public
address:	XINRXkrW1CpocUznN5feEBGYtMLku3vRKTZDpT6wFoobYnPhtbdsKjiTp6DPCUHWm8VPrcyaRabGjbxjFR5rWFa9XU77tX6d
view key:	708a8db3011a806e788a518646414ca5750f6a9ca51c0b309e5e45cdf00b2100
spend key:	c0619ce9c6fad9d2b6f7f4c0e676aed8f4d07b422e5fa55fee6154961954be0c
```
1. 发送 pledge 交易抵押代币
从 Mixin Messenger 转 XIN 到你的主网地址

1). 到 https://developers.mixin.one 创建一个你自己的机器人，然后在 Mixin Messenger 给你自己创建的机器人转入 10000 XIN

2). 可以使用开发者后台中的钱包提现功能，填写机器人的 token 信息，Mixin ID 可以填写主网地址即可。或者使用机器人的 access token 调用 POST /transactions API 转入上面生成的主网地址。

这里可以直接编译这个命令行工具来转账 cli 使用 ./cli transaction 来从机器人发送交易

-k 后面就是你要转入的主网地址，例如 XINRXkrW1CpocUznN5feEBGYtMLku3vRKTZDpT6wFoobYnPhtbdsKjiTp6DPCUHWm8VPrcyaRabGjbxjFR5rWFa9XU77tX6d

其他的信息都是机器人的信息。
```
$ git clone https://github.com/MixinNetwork/bot-api-go-client.git
$ cd bot-api-go-client/cli
$ go build
$ ./cli transaction  \
  --asset c94ac88f-4671-3976-b60a-09064f1811e8 \
  -k XINRXkrW1CpocUznN5feEBGYtMLku3vRKTZDpT6wFoobYnPhtbdsKjiTp6DPCUHWm8VPrcyaRabGjbxjFR5rWFa9XU77tX6d \
  --amount 10000 \
  -uid xxx \
  -sid xxx \
  --pin xxx \
  --pin_token xxx\
  --private "-----BEGIN RSA PRIVATE KEY-----
xxx
-----END RSA PRIVATE KEY-----"
```
3). 发送给主网地址成功会显示 transaction_hash, 这个就是主网的 transaction_hash, 可以通过以下命令查看
```
./mixin --node 35.234.74.25:8239 gettransaction --hash 95d09ebff27f988b276b32d4408ba7fc7f61e4d85af7c2267093f18486cb9a58 
```
4). 使用 ./mixin signrawtransaction， 构造签名 pledge 交易。

这里有几个参数：

- key 是用来签名本次交易的 view + spend key 字符串拼接，用来签名交易，不会发送到网络，只会本地签名。
- extra 是 signer public spend key + payee public spend key， 通过 ./mixin decodeaddress -a XINxxx 来分别获取上面生成的 - - signer 和 payee 的 public spend key。 一定要再三确保这个 extra 是正确的。
- asset 是 a99c2e0e2b1da4d648755ef19bd95139acbbe6564cfb06dec7cd34931ca72cdc 代表 XIN， 也可以通过代码获取 asset.go
- inputs 中 hash，index 是上一步的 transaction_hash, index
- outputs 是 [{“type”:163,“amount”:“10000”}]，type 163 表示 pledge 交易，https://github.com/MixinNetwork/mixin/blob/master/common/transaction.go#L17
- amount 为抵押 XIN 数量，第一年 1 万个 XIN
例如：
```
./mixin -n 35.234.74.25:8239 signrawtransaction -key VIEWSPEND  -raw '{"version":1,"asset":"a99c2e0e2b1da4d648755ef19bd95139acbbe6564cfb06dec7cd34931ca72cdc","inputs":[{"hash":"28926e30a9959fe7e7ce9c347d8fbacae2249425015d455208de70e4c678bd88","index":0}],"outputs":[{"type":163,"amount":"10000"}],"extra":"979939097dd50d0d6be42c47b3235c07108c28ce7cca150eed3b745283a9ef9639d749ab642df3e0e5573052b7031cd1e96c328e6f73d22851c475d96b7c5257"}'
```
5). 签名成功会生成一个 hex 字符，然后调用 sendrawtransaction 发送交易

例如：
```
./mixin -n 35.234.74.25:8239 sendrawtransaction -raw 86a756657273696f6e01a54173736574c420a99c2e0e2b1da4d648755ef19bd95139acbbe6564cfb06dec7cd34931ca72cdca6496e707574739185a448617368c42020001842d6eff5129c11f7c053bf1209f0267bf223f1681c9cb9d19fc773a692a5496e6465780ba747656e65736973c0a74465706f736974c0a44d696e74c0a74f7574707574739185a45479706500a6416d6f756e74c7050002addc961da44b65797391c4202902d1f57276eb32882066de06c0d70fc17a3cd8dc801c1c50e6d4918e39344fa6536372697074c403fffe01a44d61736bc4209515d480e6f28b79228c32db33718e1ca03750bbe7748cd3968a5d450cd743d1a54578747261c400aa5369676e6174757265739190
```

### 运行 Mixin Kernel
- 下载最新版本 mixin https://github.com/MixinNetwork/mixin/releases
- config.json 的 listener 里指定好自己的外部 IP 或者域名地址
- config.json 里指定好 signer private spend key
- 使用 systemd 运行 mixin https://github.com/MixinNetwork/mixin/blob/master/config/systemd.service