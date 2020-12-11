# 门罗币（Monero）

Monero 是一个安全、隐私和不可追踪的加密货币，通过使用环形签名技术确保所有交易保持 100% 的不可关联和不可追溯性。

### 基本信息

- 主网上线：2014/04/18
- 共识机制：RandomX（具有 ASIC 抵抗能力的 PoW 算法）
- 主网代币：Monero（XMR）
- 最大发行：无上限
- 出块时间：120 秒
- 区块大小：动态区块大小，[最近半年](https://bitinfocharts.com/comparison/monero-size.html#6m)约为 40K ~ 60K
- 区块奖励：2.1984 XMR（持续到 2021/03/24）
- 区块数据：[63.75 GB](https://bitinfocharts.com/monero/)（截止到 2020/11/29）
- 交易数据：1 千万（截止到 2020/11/29）
- 最小单位：0.000000000001 XMR（[piconero 皮罗](https://web.getmonero.org/resources/moneropedia/denominations.html)）

### 主网特征

- 强匿名性

  门罗币使用环签名、环机密交易和加密地址来混淆所有交易的来源、金额和目的地，甚至连交易 IP 地址都隐藏，区块数据无法关联交易和特定的用户。
  
- 默认加密

  每个门罗币的交易都默认必须是混淆交易地址和金额的，让所有人必须保持匿名意味着每一个门罗币用户的活动都会增强其他所有人的隐私，这和其他可选匿名的加密货币在匿名效果上有着本质上的不同。

- 抗 ASIC 矿机

  门罗币从一开始的开发理念中就包含了对抗 ASIC 的理念，不惜通过硬分叉来对抗矿霸算力集中带来的中心化问题。为了对抗矿霸与黑客，门罗币平均每六个月就升级一次算法，门罗币最初使用的是 CryptoNight 算法，后来在对抗 ASIC 矿机中升级了 RandomX 算法，在对抗黑客的过程中加入了防弹协议（bulletproofs）。

- 可互换性

  门罗使用多项隐私保护技术确保其区块链上不会记录任何门罗币负面信息，像现金一样让资产具备可互换性，所有的门罗币价值相等可互换。

### 核心概念

- RandomX 共识算法

  RandomX 使用**随机代码执行**和**内存密集型技术**，以最大程度地降低专用硬件的效率优势。RandomX 还专门针对通用CPU 进行了优化，因此在分配奖励方面更加去中心化和公平。

- 环形签名（Ring Signature）

  环形签名技术可以隐藏发送方信息，通过将多个发送方地址混合，从而让外界无法得知发送方的真实地址。

- 环形机密交易（RingCT）

  环形机密交易技术能够隐藏任何交易中发送的门罗币数量。RingCT 主要依靠承诺（commitments）和范围证明（range proofs）这两项技术来实现，前者可实现在不披露具体金额的前提下来保证交易的合法性且不会被伪造或双花，后者主要用于保证保障承诺的值介于 0 和特定值之间，防止负值及异常值出现。

- 混淆地址（Stealth addresses）

  混淆地址技术能够隐藏接收方信息。当发送者要发起一笔转账的时候，这笔资金不会直接打到接收方的地址，而是打到一个系统临时生成的地址，接收方通过搜索区块链上的临时地址查看是否有属于自己的来认领。

- IP 地址保护

  用户可以运行 [I2P-zero](https://web.getmonero.org/resources/user-guides/node-i2p-zero.html) 或 [Dandelion++](https://www.monerooutreach.org/stories/dandelion.html) 对 IP 地址进行保护。

- 多重密钥（multiple keys）

  `view key` 用于接受和查看门罗币，`public view key` 用于生成一次性的隐匿的公开地址，资金将会通过这个地址发送给接收者；`private view key` 用于接收者扫描区块链来找到发送给他们的资金。如需要， `view key` 可提供给第三方审核和验证交易，例如慈善捐款、向授权的审计机构提供财务信息访问权等。
  
  `spend key` 用来发送门罗币，`public spend key` 帮助发送方参与环交易并验证密钥镜像(key image)的签名；`private spend key` 帮助创建密钥镜像，密钥镜像能够使得他们能够发送交易。

- 区块奖惩（Block Reward Penalty）

  由于区块大小不固定，为了防止矿工挖超大区块堵塞系统，门罗币设计了一套根据当前区块大小来决定区块奖励到机制。当新区块的大小大于 M100（最后区块 100 区块大小的中位数）时区块奖励开始递减，超过 M100 的 2 倍就没有区块奖励了，如果区块小于等于 60kb 也会免于任何的区块奖励惩罚。

### 地址

公布门罗币地址不会危机到隐私，因为门罗币的交易和公开地址是脱钩的，公开地址不会被记录到门罗的区块数据中。

- 子地址（Subaddress）

  子地址以 `8` 开头，95 个字符，例如 `899Ao1NQtu4ezACgw1QKXK4QBf5s8a3WHHtAjFfPm3Nf71mAkREEgAuKzASXHt8E7vVJFKsQJuvApBfu21WY9WN97Put8M5`

  推荐使用子地址作为默认收款地址，方便资金分组，相比集成地址更短同时又能避免交易所漏填付款 ID 导致充值不到账。

- 普通地址 + 付款 ID（Payment ID）

  普通地址以 `4` 开头，95 个字符，用[门罗定制版 Base58](https://monerodocs.org/cryptography/base58/) 进行编码，例如 `465ZU4vBnQNFuiZn4t4oXAi1smDYaFicFFvW4EtTCMQ1fu87zRhSBTaA3q1m3G6spHBXV2ZwdMtRyTLckH6Af18f4LSSFon`。

  付款 ID（Payment ID）由 32 个字节组成（64 个十六进制字符），类似其他区块链 `memo` 的概念为交易附加额外的信息，可用于交易所区分用户的充值，参见[文档](https://www.getmonero.org/resources/moneropedia/paymentid.html)。

- 集成地址（Integrated Address）

  普通地址 + 付款 ID 合并的地址，例如 `4FdfTRX2yV8MtFngCX8KAjPUKHDtkqa2yJiHgnAAQMisV3YVs9MPFgxhuBUw4wmFM1Q7Jd36Gcvu91mkNo7L5kkbTPMoje2BpacN4swpLH`

### 入账参考

| 交易所 | 入账区块确认数 | 预计时间 |
| :-----: | :----: | :---- |
| 币安 | 3 | 6 分钟 |
| 火币 | 12 | 24 分钟 |
| OKEx | 3 | 6 分钟 |