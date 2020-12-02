# 大零币（Zcash）

Zcash 是首个采用零知识证明机制的区块链系统，与比特币相比更注重隐私，以及对交易透明可控。

### 基本信息

- 主网上线：2016/10/28
- 共识机制：PoW
- 主网代币：Zcash（ZEC）
- 最大发行：21,000,000
- 减半周期：约 4 年（84 万个区块）
- 出块时间：150 秒
- 区块大小：2M
- 区块奖励：3.125 ZEC
- 区块数据：24.34 GB（截止到 2020/11/26）
- 交易数据：7 百万（截止到 2020/11/26）
- 最小单位：0.00000001 ZEC（1 zatoshi）

### 主网特征

- 零币协议（Zerocash）

  使用零知识证明（zk-SNARKS）来允许匿名交易，这就可以允许双方相互提供经验证的信息，但过程中不会暴露他们的身份。零知识证明还能有效减少区块容量，缓解网络计算压力。

- Equihash 算法

  Equihash 算法是一种以内存为导向的工作证明算法，降低了 ASIC 矿机优势，机器算力大小主要取决于拥有多少内存，算法比较公平，更适合于具有大量内存的通用计算机。

- 对审计及监管友好

  Zcash 用户可以公开隐私地址和交易用于分享信息、第三方审计或适应监管要求。

- 低手续费

  默认 0.0001 ZEC，但可配置。

### 地址

- 公开地址

  以 `t1` 开头普通地址，其他与比特币地址一致，例如 `t14oHp2v54vfmdgQ3v3SNuQga8JKHTNi2a1`

  以 `t3` 开头多签地址，其他与比特币地址一致例如 `t3XyYW8yBFRuMnfvm5KLGFbEVz25kckZXym`

- 隐私地址

  新地址以 `zs` 开头，伴随 Sapling 网络升级，例如 `zs1z7rejlpsa98s2rrrfkwmaxu53e4ue0ulcrw0h4x5g8jl04tak0d3mm47vdtahatqrlkngh9sly`

  【不推荐】老地址以 `zc` 开头，长度 96 个字符，前 2 位为标记，例如 `zcU1Cd6zYyZCd2VJF8yKgmzjxdiiU1rgTTjEwoN1CGUWCziPkUTXUjXmX7TMqdMNsTfuiGN1jQoVN4kGxUR4sAPN4XZ7pxb`

### 入账参考

| 交易所 & 钱包 | 入账区块确认数 | 预计时间 |
| :-----: | :----: | :---- |
| Coinbase | 24 | 1 小时 |
| 币安 | 12 | 30 分钟 |
| 火币 | 12 | 30 分钟 |
| OKEx | 12 | 30 分钟 |

### 小知识

- Zcash 的历史

  Zcash 源自 "Zerocash/Zerocoin"，是基于比特币 0.11.2 版代码修改而来，更注重隐私以及对交易透明的可控。

- Zerocoin，Zerocash，Zcash 有什么区别？

  Zerocoin 是在 2013 年发明的一种加密货币协议，Zerocash 是对 Zerocoin 协议的升级，提升了效率（容量更小和验证更快）和增强了隐私功能（对金额和发收件方地址进行加密），Zcash 是 Zerocash 协议的实现。