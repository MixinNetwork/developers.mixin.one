## 一次性 Ghost Keys

获取用户一次性的 keys

### `POST /outputs` 

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| receivers | String Array | user id 的数组 |
| index | Integer | output 的 index |
| hint | String | 为用户生成唯一的 ghosts |

调用例子
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
