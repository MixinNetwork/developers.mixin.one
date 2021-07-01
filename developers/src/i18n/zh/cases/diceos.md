
### DICEOS 简介
DICEOS 骰子游戏基于 Mixin 开发，现支持 BTC、EOS、BOX、XIN、ETH、DOGE 下注，界面美观、交互体验友好，游戏公平可验证。

![Diceos](./diceos-screenshot.png)

### 公平性
DICEOS 使用可验证、公平的加密系统，无需用户盲目信任，每一次掷骰子的结果都是公平的，可以轻松验证结果。

### 随机性
DICEOS 使用 Mixin Network 的 snapshot Id 作为随机数生成投注结果，每次转账都会生成一个全网唯一的 UUID 字符串 snapshot Id，点击 WIN 或 LOST 按钮查看链上转账记录。

### 可验证
以下代码示例可用于验证投注：
```
function verify (msg) {
  let digits = sha512.array(msg)
  let s = sum(digits)
  return s MOD 100 + 1
}
```

--- 
** 用 snapshot id 做随机数非常可靠，得益于 Mixin Network 卓越的性能不会出现交易回滚，可广泛用于游戏、抽奖等。**
