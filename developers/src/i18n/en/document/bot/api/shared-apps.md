# Sharing Bots

Both users and bots can be configured to share 3 bots on their personal pages, and they can also be displayed from the + menu in the lower left corner of the chat interface. This feature can greatly promote the spread of bots among users by word of mouth.

### Getting Share List

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

### Adding To Shares

`POST /apps/:id/favorite`

```
$$XIN:curl$$ "https://api.mixin.one/apps/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/favorite"
```

Returns the share list on success.


### Deleting Shares

`POST /apps/:id/unfavorite`

```
$$XIN:curl$$ "https://api.mixin.one/apps/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/unfavorite"
```

Returns empty json on success.

