---
title: OAuth Scope
sidebar_position: 1
---

| Permission         | Description                                                              |
|:-------------------|:-------------------------------------------------------------------------|
| PROFILE:READ       | Get basic user information, such as user id, Mixin ID, name, and avatar. |
| ASSETS:READ        | Read user asset list and balance.                                        |
| PHONE:READ         | Read the user's mobile phone number.                                     |
| CONTACTS:READ      | Read user contact list, block list.                                      |
| MESSAGES:REPRESENT | Allow bots to send messages on behalf of users.                          |
| SNAPSHOTS:READ     | Access user's transfer records, including deposits and reminders.        |
| CIRCLES:READ       | Read user's circles                              |
| CIRCLES:WRITE      | Write user's circles                             |
| COLLECTIBLES:READ  | Read user collectible list and balance.                                  |
| STICKER:READ       | Read user's stickers.                                                    |

## Note

`PROFILE:READ` is required permissions, and others permissions are optional. It is recommended that developers only apply for necessary permissions and make proper guidance GUIs in the absence of permissions.
