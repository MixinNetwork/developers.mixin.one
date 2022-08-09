---
title: Mixin API 简介
sidebar_position: 1
---

Mixin 有几个不同的产品，Mixin Messenger 是一个区块链钱包 + 端对端加密的聊天软件, Messenger 主要给普通的用户使用。这个 API 主要是开发者可以针对 Messenger 的用户做进一步的开发。

## 创建机器人

开发者首先需要去[开发者后台](https://developers.mixin.one/dashboard), 申请一个机器人帐号。申请完成后，可能下载到机器人的私钥，格式：keystore-7000xxx.json, 请注意保存。

请注意，每个开发者帐号，只允许免费创建 2 个机器人帐号，想创建更多的帐号，需要支付 XIN 来购买

## 加入开发者社群

Mixin 群组链接: [https://mixin.one/codes/50d49416-dcf5-4f8b-ae98-b7836a26a84a](https://mixin.one/codes/50d49416-dcf5-4f8b-ae98-b7836a26a84a)

## 开源

Mixin Messenger 目前包括 iOS, Android，PC 端都已经开源，另外也包含其它的开源项目，地址：https://github.com/MixinNetwork

## 目录结构

- [API 参考](./api/guide)：Mixin API 层的 API 参考，提供对 Mixin 消息服务和 Mixin 钱包服务的便捷访问。
- [Mainnet RPC](./mainnet-rpc): 主网的 JSON-RPC API。
- [JS Bridge](./js-bridge): Mixin Messenger 的 WebView 的 JS 桥。
- [Schema](./schema): Mixin Messenger 的 Schema 列表。
