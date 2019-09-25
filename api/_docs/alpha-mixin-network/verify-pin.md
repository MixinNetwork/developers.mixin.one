---
title: Verify PIN
category: Mixin Network
order: 8
---

Verify PIN if is valid or not. For example, you can verify PIN before updating it.

###### POST /pin/verify

| pin | String: Encrypted PIN. |

```
// cURL Example
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMDkzMDIsImlhdCI6MTUyNTMzMzMwMiwianRpIjoiZGNjNjM3ZGQtY2UxMi00MTQwLWI2YzItYjU1OGM1MTYxYzQxIiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiZTdkMThmMDJmZjBhMTBjNzQ1MzI4OGIyYzkyNTMyZGQ5OWZlMWYyYjc1MzQzYWY0NWI4YjMyYjk2MTE1ZWRkOSIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.R7p5uWHQJDldW-W2CK9sdn4rVKgUbV8ITD9oZZRgb_7j7YVTGF4ulJzt9M_GprKkXmNG2Ox9IO6uIQE-RvqHziSemGAoW1__fYnWrZ8ZyOo7EZeAkbGQ1W-gjjZKz9BqxBvakew_xdgQdnGv0aJq8WffnQkyNxy1DkmITR4kehg" "https://api.mixin.one/pin/verify" -X POST --data '{"pin":"rIqULBd+xaiLuKImKAI7r72azK0zMPy7dIw1fQfhYskWKxkObZvOv5E6A8bACaws"}'
```

```
{{ site.data.user.data }}
```
