---
title: Mixin MTG 开发指南
---

[mtg](https://developers.mixin.one/document/mainnet/mtg/overview) 是由mixin 提供的一套智能合约解决方案，通过让多个独立的节点共同维护一个多签钱包，来实现资产的去中心化管理。

mtg 开发的核心要点可概括为：

> 所有节点在保证独立的前提下，在转账和消费 utxo 的选择上始终保持一致。

## 同步 utxo

> 跟 snaphot 不同，utxo 有三种状态 `unspent -> signed -> spent`。

mixin 提供 api [GET /multisigs/outputs](https://developers.mixin.one/document/wallet/api/multisigs/outputs) 来获取一个多签 Group 里所有的 utxo 更新，返回的 utxo 列表按 utxo 的 **updated_at** 升序排序。因为 utxo 状态每次变化， **updated_at** 都会更新，这意味着 ```GET /multisigs/outputs``` 的结果不是幂等的，即使使用同样的 ```offset``` 参数，在不同的时候调用这个 api，得到的 utxo 列表也会不同。

为了让多签组内的节点都得到同样顺序的 utxo 列表，可以把 utxo 分成两组 ```[pending, commited]```。通过 ```/multisigs/outputs``` 得到的 utxo 先放入 ```pending``` 组，直到 ```/multisigs/outputs``` 返回的 utxo 数量小于 **limit**（已经同步到了最新状态），再将 ```pending``` 组内所有的 utxo 按照 ```(created_at, transaction_hash, output_index)``` 升序的顺序转移入 ```commited``` 组。

实现可以参考 [pando/syncer](https://github.com/fox-one/pando/blob/main/worker/syncer/syncer.go)

## 处理 utxo

与普通 dapp 开发按顺序处理 snapshot 类似，mtg 程序也是按顺序处理 ```commited``` 组内的 utxo。

### 对照表

| snapshot (amount > 0) | utxo | 备注 |
|---|----|-----|
| opponent_id | sender | 付款用户 |
| trace_id | trace_id | 唯一标识 |
| memo | memo | 转账备注 |
| asset_id | asset_id | 币种 |
| amount | amount | 转账数量 |

两者基本一致，根据转账 memo 处理业务逻辑，生成对外转出的转账。比如 4swap 里面用户付款 pUSD 购买 BTC，购买成功的话需要给用户转账 BTC，反之购买失败的话需要退款 USDT。

## 处理转出

多签转出需要先发起一个 [Multisig Request](https://developers.mixin.one/document/wallet/api/multisigs/request) ，同样的 ```raw``` 参数会返回同一个 Multisig Request，这样所有节点就能对同一个转账进行校验和签名。当签名个数满足 ```threshold``` 之后，就会得到一个包含足够签名的 ```Raw Transaction```，将它提交到主网节点，即可完成转账。

实现参考 [pando/assigner](https://github.com/fox-one/pando/blob/main/worker/assigner/assigner.go) 、 [pando/cashier](https://github.com/fox-one/pando/blob/main/worker/cashier/cashier.go) 和 [pando/spentsync](https://github.com/fox-one/pando/blob/main/worker/spentsync/spentsync.go)

### 如何选择 utxo

在 ```commited utxo``` 组内按顺序选出 asset_id 相同并且 amount 之和大于等于 transfer.amount 的最少 utxo。因为一次消费的 utxo 个数有限，如果 utxo 太碎的话，就需要先合并，即把前 n 个 utxo 合并消费转给自己变成一个，n 建议 32。

已经用掉的 utxo 需要标记成已使用，注意这个状态和 utxo 的 spent 状态是分开的，一个是 local status ，一个是 remote statue。比如有一个 utxo 已经被其他节点签名提交了状态变成了 spent，但是因为进度慢的原因还没有被自己使用，这样一个 spent 状态的 utxo 仍然是未使用的状态。选择 utxo 的时候从 local status 是 unspent 的里面选择。

### 提交 Raw Transaction 到哪个节点

mixin 提供的 proxy api 可以把 Raw Transaction 随机提交到任何一个主网节点，但为了保证提交真正成功，在提交完之后，还需要再使用 transaction hash 去同一节点读取几次，确保读取到了 Transaction 并且生成了 Snapshot，否则换个节点继续提交。因此不建议直接使用mixin提供的这套api，而是自己配置一些节点，点对点提交并确认。

### 发送到账 Snapshot 卡片

因为在多签转账中用户不会收到转账卡片，故为了优化用户体验，节点会在转完账之后用 ```AppCard``` 给用户发送一个卡片来模拟到账消息。另外，因为用户会在有足够的节点签名且提交主网成功之后才收到转账，因此节点应该在消费的 uxto 的状态变成 ```spent``` 之后，再给用户发消息。卡片 action 是 ```mixin://snapshots?trace={trace_id}```，trace_id 由被消费的 utxo transaction_hash 和 output_index 生成。
参考 [pando/notifier](https://github.com/fox-one/pando/blob/main/notifier/utils.go#L15)。

## 其他

### 如何修改业务参数

> 比如 4swap 交易对的手续费率，必须所有节点统一修改保持一致

通过转账修改，这样所有节点都能在同一状态下处理并修改。为了避免中心化治理问题，可以引入节点投票机制，任何人可以转账发起一个 Proposal，节点的管理员们投票，收集到足够票数之后，再执行修改。

### 如何执行定时任务

> 比如 当4swap 注入流动性超时时，如果 10 分钟之内两笔注入没有完成，则退款给用户

把定时任务的触发逻辑转移到 mtg 之外，当定时任务被触发后，以转账的方式通知节点，这样所有节点都能在同一状态下执行此任务。



