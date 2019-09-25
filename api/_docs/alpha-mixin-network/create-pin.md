---
title: Create PIN
category: Mixin Network
order: 7
---

PIN is used to manage user's addresses, assets and etc. There's no default PIN for a Mixin Network user (except APP).

###### POST /pin/update 

| old_pin | String: "" OR Old Encrypted PIN. |
| pin | String: Encrypted New PIN. |

```
// cURL Example
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMDkzMDIsImlhdCI6MTUyNTMzMzMwMiwianRpIjoiZGNjNjM3ZGQtY2UxMi00MTQwLWI2YzItYjU1OGM1MTYxYzQxIiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiZTdkMThmMDJmZjBhMTBjNzQ1MzI4OGIyYzkyNTMyZGQ5OWZlMWYyYjc1MzQzYWY0NWI4YjMyYjk2MTE1ZWRkOSIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.R7p5uWHQJDldW-W2CK9sdn4rVKgUbV8ITD9oZZRgb_7j7YVTGF4ulJzt9M_GprKkXmNG2Ox9IO6uIQE-RvqHziSemGAoW1__fYnWrZ8ZyOo7EZeAkbGQ1W-gjjZKz9BqxBvakew_xdgQdnGv0aJq8WffnQkyNxy1DkmITR4kehg" "https://api.mixin.one/pin/update" -X POST --data '{"old_pin":"","pin":"+mRm5rm9bkQztvpsaTyz1Rib0BEM0S1FKl/oYaMfbUJM3ZmrxJhafj/tjHi+3kwQ"}'
```
```
{{ site.data.user.data }}
```
