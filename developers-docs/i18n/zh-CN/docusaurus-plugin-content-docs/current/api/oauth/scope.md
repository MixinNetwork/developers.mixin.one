---
title: OAuth 授权范围
sidebar_position: 1
---

机器人被允许获取的用户的权限范围，即用户可以通过授权一些权限给机器人，做一些辅助的工作，或者使用机器人的一些功能。

| Permission         |  Description                      |
|:-------------------|:----------------------------------|
| PROFILE:READ       | 必需,获取用户 user id, Mixin ID, name, and avatar 等基本信息.|
| ASSETS:READ        | 读取用户资产列表，余额，提现地址信息，交易信息.            |
| PHONE:READ         | 读取用户手机号.                   |
| CONTACTS:READ      | 读取用户联系人列表                 |
| MESSAGES:REPRESENT | 允许机器人代表用户发消息                    |
| SNAPSHOTS:READ     | 读取用户转帐记录        |
| CIRCLES:READ       | 读取用户的圈子信息        |
| CIRCLES:WRITE      | 更改用户的圈子信息        |
| COLLECTIBLES:READ  | 读取用户的 NFT 信息        |
| STICKERS:READ      | 读取用户的表情信息        |


## 注意事项

在 OAuth 请求必须包含 PROFILE:READ, 同时不建议请求多余的权限
