# Full Node
Like the Bitcoin network, Ethereum, and other public chains, Mixin is also an open, permissionless network where anyone can become a full node. There is no election, and the only requirement is to pledge 2% of the tokens in circulation the previous year.

与比特币网络、以太坊等公链一样，Mixin 也是一个公开的、无许可的网络，任何人都能成为加入全节点，没有选举，只需抵押代币上年流通量的 2% 即可加入。

### Recommended configuration
- __Memeory__ 64G
- __CPU__ 16 core
- __Storage__ 1T SSD(SSD is indispensable)
- __Bandwidth__ No requirement for now

### 推荐配置

- 内存：64G
- CPU：16 核
- 硬盘：1T SSD（必须 SSD）
- 带宽：暂时要求不高

### Node Count
The limited number of nodes is one of the key factors for high performance. Mixin network supports up to 50 full nodes, and at least 7 nodes are required.

### 节点数量

有限的节点数量是高性能的关键因素之一，Mixin 网络最多支持 50 个全节点，至少需要 7 个。

### Node Bookkeeping
The chief job of full nodes is bookkeeping, which is verifying and recording every transaction in the Mixin network.

- Every transaction needs to reference a record of this node and other nodes, and the referenced height must be increasing

  ![交易引用](./full-node-transaction.png)

- The order in which each node records transactions may be different, so as to realize asynchronous and concurrent processing of transactions. It can be understood that each node is an independent blockchain

  ![DAG](./full-node-dag.png)



### 节点记账

全节点的工作主要是记账，需要验证和记录 Mixin 网络发生的每一笔转账。


- 每一笔交易都需要引用本节点和其他节点的一笔记录，引用高度必须是递增的

  ![交易引用](./full-node-transaction.png)

- 各节点记录交易的顺序可能是不一样的，从而实现异步并发处理交易，可以理解为每一个节点都是一条独立的区块链

  ![DAG](./full-node-dag.png)

## Asset Management

When the assets managed by the Domain exceed its collateral, the assets will be forcibly transferred to the multi-signature cold wallet address jointly managed by the mainnet nodes.

### 资产管理

当 Domain 管理的资产超过其抵押时，资产将强制转移到由主网节点共同管理的多签冷钱包地址。

## Node Reward

90% of 10% of all leftover mining pool tokens from last year will be given to full nodes(10% for light nodes). The distribution cycle is once a day, the nodes are distributed equally, currently the daily income of each node is 110.95890408 XIN / 35 nodes = 3.1702544 XIN.

### 节点奖励

按矿池上年剩余 10% * 90% 来分布全节点收益（10% 分给轻节点），分配周期为每天一次，节点平均分配，现在每天每个节点的收益为 110.95890408 XIN / 35 个节点 = 3.1702544 XIN。

### Punishment for evil

If a full node commits evil, such as broadcasting an obvious double-spending transaction, it will be marked as a potential attacker. Once a full node is confirmed as an attacker, all its collateral will be recycled into the mining pool and it will be kicked out of the node network.

When a node launches an attack for the first time, its rights and interests cannot be revoked immediately, but it will be marked as a potential attacker. The number of kernel consensus nodes will temporarily decrease by 1. Note that this decrease is invisible to potential attackers. If the potentially attacking node continues to broadcast illegal transactions, the kernel will mark the node and the collateral of the node will be transferred to the mining pool. The marked node can appeal for a period of time.

### 作恶惩罚

如果全节点作恶，例如广播明显的双花交易，则会被标记为潜在攻击者，一旦被确认为攻击者所有抵押被回收进矿池并且踢出节点网络。

当节点第一次发起攻击时，其权益不能马上被回收，但是会被标记为潜在攻击者，内核共识节点数量将暂时减少 1，注意这种减少对于潜在的攻击者来说是不可见的。如果潜在攻击节点继续广播非法交易，内核将标记该节点，该节点的抵押品将被转移到矿池。被标记的节点有一段时间可以申诉。

## Join As Mixin Full Node

[Full Node Joining Guide](../tutorials/full-node-join)

### 参与 Mixin 全节点

参加文档[节点加入指南](../tutorials/full-node-join)。
