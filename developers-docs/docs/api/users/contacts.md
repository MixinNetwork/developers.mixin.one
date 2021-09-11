---
title: Read Contacts
sidebar_position: 4
---

## GET /friends

To obtain the contact list of the user, you need the `CONTACTS:READ` permission. The list contains users and bots. You can judge whether it is a bot user by whether there is an app field.

```
$$XIN:curl$$ "https://api.mixin.one/friends"
```

```json
{
  "data":[
    $$XIN:user$$,
  ...
  ]
}
```
