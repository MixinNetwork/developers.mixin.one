---
title: Introduction
sidebar_position: 1
---

User is the basic element in Mixin, for example, message and asset are all based on Users.

## User Type:

1. Messenger User: users that register with phone in iOS, Android.
2. Bot User: created in [Dashborad](https://developers.mixin.one/dashboard).
3. Network User: users that created by bot using [network user api](/zh-CN/docs/api/users/network-user).

There are nearly no differences in Messenger User and Bot User, except the private key is taken care of by its creator.
Network User doesn't have Mixin Id and is not allowed to send messages. Some APIs have limitations for Network User, which we will talk later.
