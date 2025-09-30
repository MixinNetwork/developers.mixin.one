---
title: 如何配置机器人使用 MVM
sidebar_position: 5
---

:::info
因 MVM 正式网尚未上线，本文所述的内容和操作都在 MVM 测试网执行。
:::

基于 Mixin Trusted Group, 可以构建一个 MTG 的网络，这个网络允许开发者在上面部署智能合约。这个网络是由多个节点利用 POS 共识运行的。

该网络不运行任何智能合约虚拟机，而是需要与现有网络一起工作，例如以太坊、EOS 或 Solana。让我们假设智能合约网络是以太坊。

这个群组可以接收到 Messenger 用户的一些交易，这些交易会按照一定的规则放到 Extra 里, 群组会按照一定的规则解析这些信息，并保存起来，同时这些信息会被用来调用合约。开发者合约可以收到群合约中的通知。

在一些情况下，开发者合约需要向 Messenger 用户发送消息或者转账通知, 这时候需要调用群组合约，然后给一些 Messenger 的用户发送消息。

## 1. 创建一个 DAPP 做准备工作

创建 DAPP 的[相关文档](/zh-CN/docs/dapp/getting-started/create-dapp)。

:::info
创建完 DAPP 之后，需要给它转入 10 CNB, 作为手续费。
:::

## 2. 配置 Metamask

Metamask 安装配置[文档](/zh-CN/docs/mainnet/mvm/metamask)。

## 3. 使用 Remix 部署合约

详细的使用 Remix 部署合约[文档](/zh-CN/docs/mainnet/mvm/remix)。

## 4. Pubish 一个 MVM APP

下载 Trusted Group 的代码到本地: [https://github.com/MixinNetwork/trusted-group](https://github.com/MixinNetwork/trusted-group), 然后编译 ./mvm 的内容，首先需要配置 Golang 环境。

下载安装 Golang 环境相关[文档](https://go.dev/doc/install)。

复制 ./config/config.example.toml 到 config/config.toml, 并修改以下内容

```toml
/* 以下内容是测试网的配置项 */
[mtg.genesis]
members = [
  "a15e0b6d-76ed-4443-b83f-ade9eca2681a",
  "b9126674-b07d-49b6-bf4f-48d965b2242b",
  "15141fe4-1cfd-40f8-9819-71e453054639",
  "3e72ca0c-1bab-49ad-aa0a-4d8471d375e7"
]
threshold = 3
timestamp = 1637699415378769097
```

其它内容，在以下命令中并不会用到

```shell
mvm publish -m config/config.toml -k keystore.json \
  -a 0x2A4630550Ad909B90aAcD82b5f65E33afFA04323 \
  -e 0x1938e2332d7963eff041af4f67586572899c7c7d279c07ac29feb745f8d9b6d6
```

- **-k** 是从开发者后台下载的密钥文件。
- **-a** 是部署的合约地址，必须是大小写标准的格式。
- **-e** 是合约创建时的 TXID。

:::info
一个机器人只能部署一个合约地址，合约无法更新。也就是说这个 publish 一旦成功，相应的机器人 UUID 和合约地址都不能再次使用。为了方便，可以使用机器人 **7000103716** 通过聊天方式获取一个虚拟 UUID 并通过机器人直接部署更方便。
:::

## 5. 通过 MVM 调用合约

下面的命令可以生成一个方便的二维码来调用相应的 MVM 进程。

```shell
mvm invoke -m config/config.toml -k keystore.json \
  -p b9126674-b07d-49b6-bf4f-48d965b2242b
```

- **-p** 是该机器人的 UUID
