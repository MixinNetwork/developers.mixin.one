---
title: Introduction
sidebar_position: 1
---

User is the basic in Mixin, messages, assets, etc all belongs to users.

## User Type:

1. Messenger User: users that register with phone in iOS, Android.
2. Bot User: created in [Dashborad](https://developers.mixin.one/dashboard).
3. Network User: users that created by bot using [network user api](/docs/api/users/network-user).

There are nearly no differences in Messenger User and Bot User, except the private key is taken care of by developers.

Network Users don't have Mixin Id and don't allowed to send or receive messages. Some APIs have limitations for Network User, which we will talk later.
