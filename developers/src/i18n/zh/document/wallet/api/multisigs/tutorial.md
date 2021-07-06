# Mixin Network 多签

多签在 Mixin 有非常多的应用，像 4swap, 资产管理等, 举个简单的多签的例子，有一笔资产是属于团队的，团队中有 A, B, C 三个人，需要其中的两个人同意就可以动用这笔资产，这就是最经典的 2/3 签的示例。

一个 2/3 多签的一个完整示例：https://github.com/MixinNetwork/trusted-group, 线上测试机器人 id: 7000101488

## 1. 将一笔资产转入 A, B, C 共同的账户 POST /transactions

将一笔资产转入到多签帐户，具体的描述在下面的文档
https://developers.mixin.one/document/wallet/api/transfer-to-multisigs

## 2. 拿到自己的 utxo /multisigs/outputs

这里需要注意的是在同一笔交易中， threshold, members 必须是相同的成员，跟签名数（2/3 其中的 2）
API 详细描述 https://developers.mixin.one/document/wallet/api/multisigs/outputs

这个过程需要不断请求 api 服务器, 拿到最新的 utxo 并且保存。以 CNB 为例，假如这里有 50, 30, 80 个数量的 outputs

## 3. 提取资产，如上所述，需要至少两个签名才能完成，但是过程相同

关于多签操作总共有三种，分别是 sign, cancel, unlock, 每一步操作之前都需要先创建一个 request, 相关 api 文档：https://developers.mixin.one/document/wallet/api/multisigs/request


需求： 假设如果 A 需要从共同帐户里取 100 CNB

1. A 发起一个 request (POST /multisigs/requests)
2. A 完成签名 POST /multisigs/requests/:id/sign，:id 为  request id
3. B, C 的操作类似，以 C 为例，C 同步的 outputs 里，state 会变成 signed, C 需要用 A 签名后的  signed tx 重复 1，2 过程，创建 request, 并签名。
4. 解析 signed tx, 然后检测签名人数是否是 2，如果 >= 2 就像主网，发送该交易
5. A 收到 100 CNB, 交易完成

付款完成后签名退款的相关代码： https://github.com/MixinNetwork/trusted-group/blob/master/sample/models/payment.go#L164

构造交易的过程中需要用到 A 的 GhostKeys (注意只能使用一次),  可以通过 https://developers.mixin.one/document/wallet/api/network/keys 拿到

## 4. 取消交易

1. 创建 request, 跟创建交易相同
2. 发送取消请求 POST /multisigs/requests/:id/cancel，:id 为  request id，注意只有 unspent 状态的交易可以取消

## 5. unlock 交易

当这笔交易已经被签名，但是还没发送的时候，想要取消交易就只能 unlock 了，步骤跟取消类似

1. 创建 request, 跟创建交易相同
2. 发送取消请求 POST /multisigs/requests/:id/unlock，:id 为  request id，注意只有 signed 状态的交易可以取消

## 总结：

大部分情况下，用到的步骤是 1， 2，3， 先存入，花之前需要，用适当的 outputs, 然后签名，发送到主网
