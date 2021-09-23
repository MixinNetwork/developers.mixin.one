---
title: 简介
description: Mixin Network，一个免费、闪电般快速和去中心化的加密资产传输网络。
---

Mixin Network 是一个开放的去中心化网络，它在内核（也称为“主网”）和 Mixin API 两个层面对开发者开放。

开发者可以根据业务需求和要求，选择合适的方式来开发自己的 dApp、链以及任何基于 Mixin Network 的应用。


## 深入内核

如果你想用内核构建一些东西，或者通过你喜欢的一些修改创建一个 Mixin Network 的分支，你可以阅读 Mixin Mainnet 的[源代码](https://github.com/MixinNetwork/mixin)。


有一些有用的教程：

- [部署全节点](mainnet/guide/full-node-join) - 在 lcoal 机器上运行 mixin 节点。
- [同步全节点](mainnet/guide/sync-full-node) - 以同步模式运行混合节点，同步内核中的所有快照。

## 创建 Mixin 应用程序

Mixin 应用程序是使用 Mixin Network 的应用程序。 它可以是一个网站、一个应用程序、一个信使机器人或任何其他形式的使用 Mixin API 或与主网交互的应用程序。

:::info
Mixin 应用程序使用 Mixin API，这是一个为 Mixin 主网提供接口的 API 集，简化了 Mixin 的开发。 更多细节请阅读[Mixin API 参考](api/guide)。
:::

### Messenger 机器人（Bot）

大多数 Mixin 应用程序都有一个名为“Messenger 机器人”（缩写为“bot”）的界面。该机器人与 Telegram 机器人非常相似。 它是一个运行在服务器上的程序，通过 Mixin API 与人类用户交互。

通常，人们在 web 视图中与机器人交互，或者只是与机器人聊天。 因此，机器人应该托管 Web 服务或响应传入的消息以完成其工作。

这里有一份[教程](dapp/getting-started/create-dapp)向您展示如何使用 Mixin API 构建机器人。

### 与 Mixin 集成

一些 Mixin 应用程序不需要机器人界面。 它们可以是网站或独立的移动应用程序。

一个常见的场景是你的业务运行良好，但你想用加密货币让它变得更酷。 所以你需要将现有的系统与 Mixin 集成。

你需要做的第一件事和上面一样，创建一个机器人。然后，是时候考虑如何与 Mixin 集成了。

例如，如果您有一个供多个用户使用的 CMS，您想在每个帖子的底部放置一个捐赠按钮，并从受众那里获得金钱； 您需要学习为每个作者创建帐户、管理帐户的密钥库、同步和处理 CMS 中每个作者的快照以向他们转移资金。

请阅读[本文档](dapp/mixin-applications)了解更多详情。

## 特性

- Privacy - End to end encrypted messages.
- 安全 - 所有资产都存储在 PoS-BFT-DAG 分布式网络中
- 快速 - 超过 1,000,000 TPS 的容量，最终确认时间不到 1 秒。
- 强大 - 支持 40 个区块链，例如 BTC、ETH、XMR。
- 免费 - 无转账费。
- 隐私 - 端到端加密消息。

## 获取最新信息

- [Github](https://github.com/MixinNetwork)
- [Twitter](https://twitter.com/Mixin_Network)
- [Discussions](https://github.com/MixinNetwork/mixin/discussions)

## 感觉哪里不对劲？

如果您发现文档有问题或对如何改进文档或项目有总体上的建议，请为我们[提交问题](https://github.com/MixinNetwork/developers.mixin.one/issues)，或发送 一条提及@[Mixin_Network](https://twitter.com/Mixin_Network) Twitter 帐户的推文。
