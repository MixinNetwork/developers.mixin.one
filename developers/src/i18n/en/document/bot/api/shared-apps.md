# Favorite Apps

Add app to favorite app list. The list will be shown in Messenger user’s Shared Apps. The maximum favorite apps size is 3.

### Read Favorite Apps

Returns the favorite apps are recommended by the user.

`GET /users/:id/apps/favorite`

```
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMjAyMzAsImlhdCI6MTUyNTM0NDIzMCwianRpIjoiNjEyZDRjYTQtOGUwNC00YTk3LTgwZTMtN2UwMjY0OGE5ZmQ0Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiMTI3YWVhOWU3MmZhMDJiZWE0MDdhZGNiYTA0M2IzMmM0YTRhN2U2NGIzMDU0NzcyMGRlMjk3YjE2NGU5MWVhMiIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.g_sED63nqS_cf68FKh8Ow1-0B4Ew_ojYS76P52hhqcF-gjImI93vM7Q4PI0t8i4ddiePD9vT470pD3obtzpo7eHD1ECfDuQkxqJqvN8elRYLWPYHjzElu0JqHDDIXh1TCtzGLReR4ZmC9g9DkhxDhocP9srWdVDAU_FbJOjznOE" "https://api.mixin.one/users/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/apps/favorite"
```

```json
{
  "data":[
  {
    "type":"app",
    "user_id":"06aed1e3-bd77-4a59-991a-5bb5ae6fbb09",
    "app_id":"c94ac88f-4671-3976-b60a-09064f1811e8",
    "created_at":"2017-12-23T18:23:26.996149Z",
  },
  ...
  ]
}
```

### Add Favorite App 

Add app to favorite app list.

`POST /apps/:id/favorite`

```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMjAyMzAsImlhdCI6MTUyNTM0NDIzMCwianRpIjoiNjEyZDRjYTQtOGUwNC00YTk3LTgwZTMtN2UwMjY0OGE5ZmQ0Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiMTI3YWVhOWU3MmZhMDJiZWE0MDdhZGNiYTA0M2IzMmM0YTRhN2U2NGIzMDU0NzcyMGRlMjk3YjE2NGU5MWVhMiIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.g_sED63nqS_cf68FKh8Ow1-0B4Ew_ojYS76P52hhqcF-gjImI93vM7Q4PI0t8i4ddiePD9vT470pD3obtzpo7eHD1ECfDuQkxqJqvN8elRYLWPYHjzElu0JqHDDIXh1TCtzGLReR4ZmC9g9DkhxDhocP9srWdVDAU_FbJOjznOE" "https://api.mixin.one/apps/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/favorite"
```


### Remove Favorite App

Remove an app from favorite app list.

`POST /apps/:id/unfavorite`

```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMjAyMzAsImlhdCI6MTUyNTM0NDIzMCwianRpIjoiNjEyZDRjYTQtOGUwNC00YTk3LTgwZTMtN2UwMjY0OGE5ZmQ0Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiMTI3YWVhOWU3MmZhMDJiZWE0MDdhZGNiYTA0M2IzMmM0YTRhN2U2NGIzMDU0NzcyMGRlMjk3YjE2NGU5MWVhMiIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.g_sED63nqS_cf68FKh8Ow1-0B4Ew_ojYS76P52hhqcF-gjImI93vM7Q4PI0t8i4ddiePD9vT470pD3obtzpo7eHD1ECfDuQkxqJqvN8elRYLWPYHjzElu0JqHDDIXh1TCtzGLReR4ZmC9g9DkhxDhocP9srWdVDAU_FbJOjznOE" "https://api.mixin.one/apps/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/unfavorite"
```

```
// Sample Response
{ }
```