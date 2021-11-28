---
title: 如何配置 MVM
---

基于 Mixin Trusted Group, 可以构建一个 MTG 的网络，这个网络允许开发者在上面部署智能合约。这个网络是由多个节点利用 POS 共识运行的。

该网络不运行任何智能合约虚拟机，而是需要与现有网络一起工作，例如以太坊、EOS 或 Solana。让我们假设智能合约网络是以太坊。

这个群组可以接收到 Messenger 用户的一些交易，这些交易会按照一定的规则放到 Extra 里, 群组会按照一定的规则解析这些信息，并保存起来，同时这些信息会被用来调用合约。开发者合约可以收到群合约中的通知。

在一些情况下，开发者合约需要向 Messenger 用户发送消息或者转账通知, 这时候需要调用群组合约，然后给一些 Messenger 的用户发送消息。

## 1. 创建一个 DAPP 做准备工作

创建 DAPP 的[相关文档](/zh-CN/docs/dapp/getting-started/create-dapp)

## 2. 配置 Metamask

Metamask 安装配置[文档](/zh-CN/docs/mainnet/mvm/metamask)

## 3. 使用 Remix 部署合约

详细的使用 Remix 部署合约[文档](/zh-CN/docs/mainnet/mvm/remix)

## 4. Pubish 一个 MVM APP

下载 Trusted Group 的代码到本地: https://github.com/MixinNetwork/trusted-group

./mvm publish -m config/config.toml -k keystore.json -a 0x2a4630550ad909b90aacd82b5f65e33affa04323 -e 0x1938e2332d7963eff041af4f67586572899c7c7d279c07ac29feb745f8d9b6d6

keystore.json 是从开发者后台下载的密钥文件
-a 是部署合约的地址
-e 是合约的 Transaction Hash

## 5. 通过 MVM 调用合约

./mvm invoke -m config/config.toml -k keystore.json -p b9126674-b07d-49b6-bf4f-48d965b2242b

-p 是该机器人的 App ID
