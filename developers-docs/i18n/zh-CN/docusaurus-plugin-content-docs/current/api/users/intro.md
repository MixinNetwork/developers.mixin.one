---
title: 简介
sidebar_position: 1
---

用户是 Mixin 的基本构成，像消息，资产等，都是基于用户

## 在 Mixin 中用户可以分为以下几种类型:

1. Messenger 用户，用 iOS，Android 通过手机号注册的用户。
2. 机器人，通过 [开发者后台](https://developers.mixin.one/dashboard) 创建的机器人
3. 机器人通过 api 创建的 [网络用户](/zh-CN/docs/api/users/network-user)

  其中 1, 2 几乎没有区别，机器人的私钥会由开发者保存并使用, 3 类型的用户简单来说，没有 Mixin Id, 不可以发消息，对其它的 API 使用会有简单的限制，具体我们会在相关的 api 详细介绍。
