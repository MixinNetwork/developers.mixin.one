# Favorite Apps

Add app to favorite app list. The list will be shown in Messenger user’s Shared Apps. The maximum favorite apps size is 3.

### Read Favorite Apps

Returns the favorite apps are recommended by the user.

`GET /users/:id/apps/favorite`

```
$$XIN:curl$$ "https://api.mixin.one/users/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/apps/favorite"
```

```json
{
  "data": [
    $$XIN:app$$
    ...
  ]
}
```

### Add Favorite App 

Add app to favorite app list.

`POST /apps/:id/favorite`

```
$$XIN:curl$$ "https://api.mixin.one/apps/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/favorite"
```


### Remove Favorite App

Remove an app from favorite app list.

`POST /apps/:id/unfavorite`

```
$$XIN:curl$$ "https://api.mixin.one/apps/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/unfavorite"
```

```
// Sample Response
{ }
```
