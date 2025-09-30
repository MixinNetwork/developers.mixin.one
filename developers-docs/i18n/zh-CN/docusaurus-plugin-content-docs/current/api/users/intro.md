---
title: 概述
sidebar_position: 1
---

用户是 Mixin 中最基础的概念，消息、资产等都归属于用户。

## 用户类型

1. Messenger 用户：在 iOS、Android 上使用手机号注册的用户。
2. 机器人用户：在 [控制台](https://developers.mixin.one/dashboard) 创建。
3. 网络用户：通过 [Network User API](/docs/api/users/network-user) 由机器人创建。

Messenger 用户与机器人用户几乎没有区别，唯一差别在于机器人用户的私钥由开发者管理。

网络用户没有 Mixin ID，且不能发送或接收消息。部分接口对网络用户有限制，后文将会说明。
