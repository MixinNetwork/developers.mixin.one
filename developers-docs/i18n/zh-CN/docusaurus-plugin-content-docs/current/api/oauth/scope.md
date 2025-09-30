---
title: OAuth 权限
sidebar_position: 1
---

| 权限               | 说明                                                   |
|:-------------------|:------------------------------------------------------|
| PROFILE:READ       | 获取基本用户信息，例如 user id、Mixin ID、昵称与头像   |
| ASSETS:READ        | 查看用户资产列表及余额                                 |
| PHONE:READ         | 读取用户手机号                                         |
| CONTACTS:READ      | 查看联系人列表与黑名单                                 |
| MESSAGES:REPRESENT | 允许机器人代表用户发送消息                             |
| SNAPSHOTS:READ     | 访问用户的转账记录，包括充值与提示信息                 |
| CIRCLES:READ       | 读取用户的圈子                                         |
| CIRCLES:WRITE      | 管理用户的圈子                                         |
| COLLECTIBLES:READ  | 查看用户藏品列表与余额                                 |
| STICKER:READ       | 读取用户的贴纸                                         |

## 注意事项

`PROFILE:READ` 为必选权限，其余为可选。建议开发者只申请必要的权限，并在缺少权限时提供合适的界面引导。
