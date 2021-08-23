---
title: Search
sidebar_position: 3
---

## GET /search/:q

Parameter `:q`: Mixin ID or mobile phone number.

```
$$XIN:curl$$ "https://api.mixin.one/search/7000"
```

```json
{
  "data": $$XIN:user$$
}
```

:::warning
**In order to avoid malicious crawling of user data, this API has a request frequency limit. If a 429 error occurs, wait 12 hours and try again.**
:::
