---
title: MTG Development Guide
---

[mtg](https://developers.mixin.one/document/mainnet/mtg/overview)  is a set of smart contract solutions provided by mixin, which realizes the decentralized management of assets by allowing multiple independent nodes to jointly maintain a multi-signature wallet.

The core points of mtg development can be summarized as follows:

:::info
Under the premise of ensuring independence, all nodes always keep the same in the choice of transfer and consumption of utxo.
:::

## Sync utxo

Mixin provides api [GET /multisigs/outputs](https://developers.mixin.one/document/wallet/api/multisigs/outputs) to get all utxo updates in a multi-signature Group, the utso list is sorted in ascending order by utxo's **updated_at**.Because every time the utxo state changes, **updated_at** will be updated, which means that the result of ```GET /multisigs/outputs``` is not idempotent. Even if the same ```offset``` parameter is used, calling this api at different times will result in different utxo lists.

In order for the nodes in the multi-signature group to get the utxo list in the same order, the utxo can be divided into two groups ```[pending, commited]```. The utxo obtained through ```/multisigs/outputs```  is put into the ```pending```  group first, until the number of utxo returned by ```/multisigs/outputs```  is less than **limit** (it has been synchronized to the latest state), and then transfer all utxo in the ```pending```  group to the  ```commited```  group in ascending order of ```(created_at, transaction_hash, output_index)``` .

Implementation can refer to [pando/syncer](https://github.com/fox-one/pando/blob/main/worker/syncer/syncer.go)

:::tip
Unlike snapshot, utxo has three states  `unspent -> signed -> spent`.
:::

## Processing utxo

Similar to the sequential processing of snapshots in ordinary dapp development, the mtg program also processes the utxo in the  ```commited```  group in sequence.

### Chart

| snapshot (amount > 0) | utxo | description|
|---|----|-----|
| opponent_id | sender  |Paying user|
| trace_id | trace_id  |Uniquely identifies|
| memo | memo  |Transfer notes|
| asset_id | asset_id  |Currency|
| amount | amount  |Number of transfers|

The processing of Snapshot and utxo is basically the same, that is, according to the transfer memo processing business logic to generate external transfers.For example, in 4swap, the user pays pUSD to purchase BTC. If the purchase is successful, it needs to transfer the BTC to the user. If the purchase fails, it needs to refund USDT to the user.

## Process transfer

Multi-sign-out transfer needs to initiate a [Multisig Request](https://developers.mixin.one/document/wallet/api/multisigs/request).The same  ```raw```  parameter will return the same Multisig Request, so that all nodes can verify and sign the same transfer.When the number of signatures meets the  ```threshold``` , a ```Raw Transaction``` containing enough signatures will be obtained, and then it will be submitted to the main network node to complete the transfer.

Implementation can refer to[pando/assigner](https://github.com/fox-one/pando/blob/main/worker/assigner/assigner.go) 、 [pando/cashier](https://github.com/fox-one/pando/blob/main/worker/cashier/cashier.go) and [pando/spentsync](https://github.com/fox-one/pando/blob/main/worker/spentsync/spentsync.go)

### How to choose utxo

In the ```commited utxo``` group, select the least utxo with the same asset_id and the sum of amount greater than or equal to transfer.amount in order.Because the number of utxo consumed at one time is limited, if utxo is too fragmented, it needs to be merged first, that is, transfer the first n utxo combined consumption to oneself, n suggestion 32.

The used utxo needs to be marked as used. Note that this status is separate from the spent status of utxo. The former is local status and the latter is remote status.For example, after a utxo is signed and submitted by other nodes, the status becomes spent, but because the progress is slow and has not been used by itself, it is still unused.Then when choosing utxo, you need to choose from the utxo whose local status is unspent.

### Which node to submit Raw Transaction to

The proxy api provided by mixin can randomly submit Raw Transaction to any mainnet node, but in order to ensure that the submission is truly successful, after submission, you need to use the transaction hash to read the same node several times to ensure that the transaction is read and Snapshot is generated, otherwise change to another node and continue to submit.Therefore, it is not recommended to directly use this set of APIs provided by mixin, but to configure some nodes by yourself, submit and confirm point-to-point.

### Send snapshot card

Because the user will not receive the transfer card in the multi-signature transfer, in order to optimize the user experience, the node will use the  ```AppCard```  to send a card to the user after the transfer is completed to simulate the arrival message. In addition, because the user will receive the transfer after having sufficient node signatures and submitting the mainnet successfully, the node should send a message to the user after the status of the consumed uxto becomes ```spent```.The card action is  ```mixin://snapshots?trace={trace_id}```, trace_id is generated by the consumed utxo transaction_hash and output_index.
Refer to [pando/notifier](https://github.com/fox-one/pando/blob/main/notifier/utils.go#L15).

## Others

### How to modify business parameters

The business parameters must be modified by transfer, so that all nodes can be modified in the same state to be consistent. In order to avoid the problem of centralized governance, a node voting mechanism can be introduced, that is, anyone can transfer money to initiate a proposal, and the node administrators will vote, and the modification will be implemented when enough votes are collected.

:::info
For example, the handling fee rate of 4swap trading pairs must be uniformly modified by all nodes to maintain consistency
:::

### How to perform scheduled tasks

Transfer the trigger logic of the timing task to outside of mtg. When the timing task is triggered, the node is notified by transfer, so that all nodes can perform this task in the same state.

:::info
For example, when the 4swap injection liquidity timeout, if two injections are not completed within 10 minutes, the user will be refunded
:::
