---
title: Sequencer 概览
description: 了解全新的 Mixin Sequencer API 架构与接入前提。
---

最新版的 Mixin 网络围绕 Mixin Safe 构建。整个生态目前由两个核心服务组成：

- **Mixin Kernel** —— 负责存储并验证交易。
- **Mixin Sequencer** —— 作为索引层维护用户数据、排序交易，并在兼容 Kernel 交易的基础上提供简化的 API 接口。

与传统的 Messenger API 相比，Sequencer 调用更底层也更去中心化。所有操作最终都会代理到 Kernel 的 JSON-RPC 接口，而 Sequencer 在其之上提供发现与索引能力，便于 dApp 快速查询用户、地址、UTXO 以及交易历史。

在接入 Sequencer API 之前，请确保您的用户或机器人已经迁移至最新的 TIP PIN 格式。无论是人工用户还是自动化机器人，在发起交易或提现之前都必须先向 Sequencer 注册。接下来的章节会详细介绍该 API 的各个部分。
