# User Circles

Set the circle to which a user belongs. You can add the user to or remove the user from a circle. The permission of `CIRCLES:WRITE` is required.

### `POST /users/:id/circles`

Request body data:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| circle_id | String | Circle Id |
| action | String | Update operation, `ADD` or `REMOVE` |

curl demo:

```
$$XIN:curl$$ "https://api.mixin.one/users/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/circles -XPOST --data'{"circle_id": "a465ffdb-4441-4cb9-8b45 -00cf79dfbc46", "action": "ADD"}'
```

The list of circles that the user belongs to is returned:

```json
{
  "data":[
    {
      "circle_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
      "user_id":"06aed1e3-bd77-4a59-991a-5bb5ae6fbb09",
      "name":"Friends",
      "created_at":"2018-05-29T09:31:04.202186212Z"
    },
    ...
  ]
}
```

Note that one user can only be added to 5 circles at most, otherwise error 20133 will be reported.
