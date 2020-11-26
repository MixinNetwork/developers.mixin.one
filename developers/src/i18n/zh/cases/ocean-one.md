### Ocean ONE 简介
Ocean ONE 是基于 Mixin Network 构建的新一代去中心化交易所，这是第一个与中心化交易所获得相同体验的去中心化交易所。

- 去中心化，用户资产和撮合引擎安全隔离，挂单成交后资产立即返回用户的钱包
- 交易上链，所有挂单、吃单、退单都对应的交易记录上链，交易真实可查可追溯
- 安全透明，代码完全开源且通过了第三方机构审计
- 性能卓越，高性能撮合引擎可满足量化需求，测试 24 小时可完成 10,000,000 比交易
- 币种丰富，支持 28 条公链超过 10 万种代币充值、提现和交易
- 独特优势，所有基于 Mixin Network 的 Dapp 与交易所之间充值和提现都是免费、秒到；上币无须申请，默认全部自动支持；交易手续费全额返还给开发者

### Ocean ONE 架构
Ocean 是基于 Mixin Network 使用 Go 语言实现的高性能撮合引擎，而 Ocean ONE 是基于 Mixin Network 的钱包 + 交易所前端 Dapp，通过转账来实现挂单、吃单和撤单，有效的隔离了用户资产同时交易上链提高透明度实现了去中心化的效果。

![OceanONE](./ocean-one-structure.png)

 如图所有 Mixin Network 上的 Dapp 都可以直接给 Ocean 撮合引擎挂单，可以直接在 OceanONE 的源码上改改创建一个新的 Dapp 然后部署一下就是一个新的交易所了，显示什么交易对你说的算！

### OOO 代币
Ocean ONE 所有的操作都是通过转账附带特定的 Memo 来完成的，为此发行了 OOO (Ocean ONE Object) 共计 1 万亿代币仅用于辅助交易（撤单），例如取消订单时会给交易引擎发送一笔 0.00000001 的转账并在 Memo 中附带取消订单的数据。

### 账号注册
和传统中心化交易所一样，Ocean ONE 通过手机号或邮箱注册和登录，同时会自动为每一个用户创建一个 Mixin 钱包并赠送 1000 OOO 用于辅助交易。

### 挂单
以下以 0.1 BTC / XIN 的价格出售 0.7 XIN 为例：
```golang
type OrderAction struct {
  S string    // side
  A uuid.UUID // asset
  P string    // price
  T string    // type, 
  O uuid.UUID // order
}

memo = base64.StdEncoding.EncodeToString(msgpack(OrderAction{
  T: "L",
  P: "0.1",
  S: "A",
  A: uuid.FromString("c6d0c728-2624-429b-8e0d-d9d19b6592fa"),
}))
```
> T 取值 “L" 表示限价单，取值 “M”表示市价单；S 取值 "A” 表示卖出，取值 “B" 表示买入

### 撤单
```golang
memo = base64.StdEncoding.EncodeToString(msgpack(OrderAction{
  O: uuid.FromString("2497b2bb-4d67-49bf-b2bc-211b0543d7ac"),
}))
```
> O 是订单 ID ，挂单时生成

### 手续费
Maker 手续费为 0 ，Taker 手续费为千一

### 扩展案例
欢迎为 Ocean 撮合引擎开发更多前端交易程序，与 Ocean 共享深度，更欢迎为 Ocean ONE 贡献开源代码
- Mixcoin 交易所，根据钱包自动显示交易对，Mixin Messenger 搜索 7000101524 体验
- F1EX 数字交易所 https://fox.one/zh/products/exchange
- BigDEX 去中心化交易所 https://dex.b1.run/

### 链接
- Ocean ONE 官网：https://ocean.one/
- Github 源码：https://github.com/MixinNetwork/ocean.one

---
挂单资产和钱包资产分离极大降低了风险同时保障了高性能，交易上链确保了所有的交易都是真实有效，代码开源确保了交易的公平性，欢迎来 https://ocean.one 体验。
