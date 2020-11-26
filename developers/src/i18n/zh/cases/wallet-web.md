![Mixwallet](./wallet-web-screenshot.png)

基于 Mixin 提供的标准 REST API ，开发者很容易集成 Mixin 全币种钱包，并且向前兼容。本演示版完整的实现了一个 Web 版全币种钱包的所有功能，钱包体验地址：https://wallet.mixcoin.one ，代码地址：https://github.com/over140/mixwallet 。

### 创建账号
演示版钱包为每一位用户对应创建一个 Mixin 钱包，并根据用户设置的 PIN 设置初始密码

### 资产列表
配置自定义钱包资产列表，所有 ERC-20 的代币都可以充值到 ETH 的地址，充值进来后列表会自动显示出来

### 充值提现
可以通过 Mixin Messenger 提现到演示版钱包，免手续费并且实时到账很方便，也可以通过其他钱包链上充值转入

### Keystore
本演示版导出的 Keystore 符合官方的标准 ，可通用于其他支持 Mixin Keystore 的钱包。

---
注意本钱包仅供演示，不可真正用于存储大量资产，Web 服务器的安全措施可能不够，欢迎通过 Mixin Messenger 与我联系，我的 Mixin 762532 。