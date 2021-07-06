# One-time Ghost Keys

Get one-time user keys.

### `POST /outputs` 

| Parameter | Type | Description |
| :----- | :----: | :---- |
| receivers | String Array | A array of user id. |
| index | Integer | Output index. |
| hint | String | Unique ghosts generated for users. |

Demo:

```
$$XIN:curl$$ "https://api.mixin.one/outputs"
```

```json
{  
  "data":{  
    "type":"ghost_key",
    "mask":"ab56be4cxxxx244f9a433f35",
    "keys": ["ab56be4cxxxx244f9a433f35"],
  }
}
```
