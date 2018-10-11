---
title: Oauth Scopes
category: Mixin Messenger
order: 1 
---

Mixin allows developers use OAuth to get authorized access to some of users’ information.

| Scopes | Description |
| --- | --- |
| PROFILE:READ | Grants read access to profile info, including the Mixin ID, name and profile photo. |
| PHONE:READ | Grants access to read the phone number of user. |
| CONTACTS:READ | Grants access to read friends, contacts and blocking_users. |
| ASSETS:READ | Grants access to read user's assets list, balances and transaction histories. |

An example of OAuth request:

```
https://mixin.one/oauth/authorize?client_id=CLIENT_ID&scope=PROFILE:READ+ASSETS:READ&response_type=code
```
