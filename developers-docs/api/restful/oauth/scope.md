---
title: OAuth Scope
sidebar_position: 1
---

| Permission         |  Description                      |
|:------------------:|:----------------------------------|
| PROFILE:READ       | Get basic user information, such as user id, Mixin ID, name, and avatar.|
| ASSETS:READ        | Read user asset list and balance.            |
| PHONE:READ         | Read the user's mobile phone number.                   |
| CONTACTS:READ      | Read user contact list, block list.                 |
| MESSAGES:REPRESENT | Allow bots to send messages on behalf of users.                    |
| SNAPSHOTS:READ     | Access user's transfer records, including deposits and reminders.        |

The permissions requested should contain at least the PROFILE:READ permission. Users may uncheck certain permissions when authorizing. It is recommended that developers only apply for necessary permissions and make proper guidance GUIs in the absence of permissions.