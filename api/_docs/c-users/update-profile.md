---
title: Update Profile
category: User
order: 3 
---

Update user's profile.

###### POST /me

| full_name | String: "Mixin Develeper" |
| avatar_base64 | String: Base64 of image, supports format png, jpeg and gif, base64 image size > 1024. |

```
// cURL Example
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMDUzODIsImlhdCI6MTUyNTMyOTM4MiwianRpIjoiZDcwMjdiOWUtNzcxYy00ZDA5LTlkMjQtNGVlYjc5YmJhNGM2Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiNzEyNjY0ZmE4NDI4ZWM4Njg5MjA3YzdhOWE1MTNlMzlhNTk2MWMxODQwNmVkOTlkMzViNzNmMTIyYTdlOWIwMyIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.FZryq34iN5TSxG4eMhYe4oe56IR5E_PaiKxIqwlIrAExg8ghJ5uXmOAg6_9V6lWXjl4ZIDuadQ5mGMNqxJfrj0kYS9Tb5dJUzA4xKKqbUXmPsk4VFLyFLg3CJUJmgQqpL62doHSW_0T9EA7W03tLTQZ-nbjhpca7eK3U-KRgK-E" "https://api.mixin.one/me" -XPOST --data '{"avatar_base64":"","full_name":"Around World"}'
```

```
{{ site.data.user.data }}
```
