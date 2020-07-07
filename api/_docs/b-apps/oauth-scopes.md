---
title: Oauth Scopes
category: APP
order: 3
---

Oauth allows specific authorization flow for other applications. Below list all Oauth scopes you can ask for Mixin Messenger users.

| Scopes | Description |
| --- | --- |
| PROFILE:READ | Grants read access to profile info, including the User Id, Mixin ID, name, and profile photo. |
| PHONE:READ | Grants access to read the phone number of the user. |
| CONTACTS:READ | Grants access to read friends, contacts and blocking_users. |
| ASSETS:READ | Grants access to read user's assets list, balances etc. |
| SNAPSHOTS:READ | Grants access to read user's snapshots includes deposit, withdrawal and tranfer etc. |
| MESSAGES:REPRESENT | Grants authorization to represent use send messages |

An example of OAuth request:

```
https://mixin.one/oauth/authorize?client_id=CLIENT_ID&scope=PROFILE:READ+ASSETS:READ&response_type=code
```
