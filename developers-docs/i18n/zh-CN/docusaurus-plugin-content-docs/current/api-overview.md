---
title: Mixin API 简介
sidebar_position: 1
---

Mixin Messenger 是一个区块链钱包 + 端对端加密的聊天软件, Messenger 主要给普通的用户使用。这个 API 主要是开发者可以针对 Messenger 的用户做进一步的开发。

## 创建机器人

开发者首先需要到[开发者后台](https://developers.mixin.one/dashboard), 申请一个机器人帐号。申请完成后，可以下载到机器人的私钥，格式：keystore-7000xxx.json, 请注意保存。

请注意，每个开发者帐号，只允许免费创建 2 个机器人帐号，想创建更多的帐号，需要支付 XIN 来购买

## 加入开发者社群

Mixin 群组链接: [https://mixin.one/codes/2db90a85-edff-4ab0-ae89-ce0619e2638e](https://mixin.one/codes/2db90a85-edff-4ab0-ae89-ce0619e2638e)

## 相关网站

* Mixin 官网 [https://mixin.one](https://mixin.one)
* Mixin 区块链浏览器 [https://mixin.one/snapshots](https://mixin.one/snapshots)

## 相关的 SDK

1. Golang SDK: [https://github.com/MixinNetwork/bot-api-go-client](https://github.com/MixinNetwork/bot-api-go-client)
2. Nodejs SDK: [https://github.com/MixinNetwork/bot-api-nodejs-client](https://github.com/MixinNetwork/bot-api-nodejs-client)
3. [Kotlin/Java SDK](https://github.com/MixinNetwork/bot-api-kotlin-client): the official SDK for Kotlin/Java.
4. Python SDK: [https://github.com/learnforpractice/mixin-python](https://github.com/learnforpractice/mixin-python)
5. Ruby Demo: [https://github.com/an-lee/mixin_bot](https://github.com/an-lee/mixin_bot)
6. PHP SDK : [Laravel](https://github.com/ExinOne/laravel-mixin-sdk) / [without Laravel](https://github.com/ExinOne/mixin-sdk-php)
7. C# (CSharp) SDK : [c#](https://github.com/wjfree/mixin-csharp-sdk)

## 开源

Mixin Messenger 目前包括 iOS, Android，PC 端都已经开源，另外也包含其它的开源项目，地址：https://github.com/MixinNetwork

## 目录结构

- [API 参考](./api/guide)：Mixin API 层的 API 参考，提供对 Mixin 消息服务和 Mixin 钱包服务的便捷访问。
- [Mainnet RPC](./mainnet-rpc): 主网的 JSON-RPC API。
- [JS Bridge](./js-bridge): Mixin Messenger 的 WebView 的 JS 桥。
- [Schema](./schema): Mixin Messenger 的 Schema 列表。
