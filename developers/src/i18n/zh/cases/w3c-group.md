### W3c.Group 简介
W3C（Web3.0 Content Group）创作者社区，是以小组形式聚集各类主题的内容平台，是由多个小组组成的一个整体，努力方向是运用区块链特性促进小组成员间的协作。

### WGT 通证
WGT 是 W3c.Group 官方唯一通证，是平台价值的体现，总量 1 亿，永不增发。WGT 已发布为 ERC20 Token [0x8c1d0b1655375dd87b1ce710f302071d84029ed5](https://etherscan.io/token/0x8c1d0b1655375dd87b1ce710f302071d84029ed5)，并且将平台内交易数据在 Mixin 网络上进行了同步以保证交易的真实性 [6eece248-09db-3417-8f70-767896cf5217](https://mixin.one/snapshots/6eece248-09db-3417-8f70-767896cf5217)，交易 id 从 115643 开始皆可在 Mixin 网络进行验证。 积分也已通过Mixin网络进行管理 [91ef9bed-ef6f-3a0b-a994-4b10f1a1d832](https://w3c.group/point)，随时可查且不可篡改，变动皆有记录，做到有理有据，没有后门不存在黑箱操作的可能。WGT 用途：
- 支付提币手续费、协作相关及其他平台费用
- 作为价值交换的媒介：支付加入小组费用、给主题赞赏等
- 购买积分永久参与挖矿赚取收益
- 在交易所换出 WGT 获得 BTC 等数字货币

### W3C 架构
![W3c.Group](./w3c-group-structure.png)

W3C 的通证系统借助 Mixin 完成，此架构图较为清晰的体现 Mixin 和 W3C 前后端如何交互。

### 钱包
W3C 为每个用户创建了一个 Mixin 钱包，除了用于接收和存储 WGT，还可以很方便的接受 BTC、ETH、EOS 等多种数字货币打赏


### 挖矿和存证
WGT 总量 90% 由将作为挖矿奖励奖励给所有为社区作出贡献的创作者们，每日近千 WGT 挖矿收益通过 Mixin Network 免费、实时分发给有贡献的创作者们，每一笔分发都是一笔转账记录上链，这些记录不可篡改，公开透明，能更直接激励用户保持活跃。以下是一笔存证记录：
```
交易ID：659e0572-0b39-4b5c-86b8-9faddc53364f
接口返回：
转出 {"data":{"type":"transfer","snapshot_id":"6069bac9-ce10-44b1-8c1f-d74c79e09dc4","opponent_id":"58769446-253a-35ba-ba43-8ea689892e0d","asset_id":"6eece248-09db-3417-8f70-767896cf5217","amount":"-0.606","opening_balance":"89943016.35684771","closing_balance":"89943015.75084771","trace_id":"659e0572-0b39-4b5c-86b8-9faddc53364f","memo":"领取昨日挖矿收益;from:0x000000000000000000;to:0x59fbc6857b0d06e32b","created_at":"2020-05-02T12:21:16.911489Z","counter_user_id":"58769446-253a-35ba-ba43-8ea689892e0d"}}
接收 {"data":{"type":"transfer","snapshot_id":"e8f1dbbf-e4d6-4185-92d4-7a33f5be8c69","opponent_id":"29a2084d-662a-4b29-ab39-b8e8e13fb69b","asset_id":"6eece248-09db-3417-8f70-767896cf5217","amount":"0.606","opening_balance":"70.689","closing_balance":"71.295","trace_id":"659e0572-0b39-4b5c-86b8-9faddc53364f","memo":"领取昨日挖矿收益;from:0x000000000000000000;to:0x59fbc6857b0d06e32b","created_at":"2020-05-02T12:21:16.911489Z","counter_user_id":"29a2084d-662a-4b29-ab39-b8e8e13fb69b"}}
```

### 打赏
作者除了挖矿收益还可以额外的获得打赏收益，所有打赏的收益 100% 转给作者，平台不参与分账，除了可以接收 W3C 打赏，还可以通过 Mixin Messenger 打赏 BTC、ETH、EOS 等数千总数字货币，如果通过 Mixin Messenger 登录还可以收到打赏的通知提醒，所有打赏读者的头像都会显示到文章底部，非常强大而且很方便。

### 交易
WGT 目前还没有上交易所，但你可以在 Mixin Messenger 中搜索 7000101524 找到 Mixcoin 这个机器人交易 WGT，或者直接在 Mixin Messenger 里打开这个链接 https://mixcoin.one/market/wgt 。


### 参考
- [W3c.Group - WGT](https://w3c.group/wgt)
- [面向开发者的W3C完整介绍（Mixin开发实例）](https://w3c.group/c/1587703726761197)

---
我是 W3c.Group 瓦工，欢迎通过 Mixin Messenger 与我联系，我的 Mixin ID：916716 。
