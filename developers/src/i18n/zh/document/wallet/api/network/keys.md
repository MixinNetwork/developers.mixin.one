## 一次性 Ghost Keys

Mixin Network 里的转账都是匿名，所以在通过主网转回资产到 Mixin Messenger 用户的时候，需要先获取用户一次性的 Ghost Keys, 注意:

- 请求的参数是一个数组
- hint 是为了给用户生成一个全网唯一的 Ghost Key，类似于交易中的 trace_id
- 从多签帐户中转出资产也需要请求这个 API

### `POST /outputs` 

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| receivers | String Array | user id 的数组 |
| index | Integer | output 的 index |
| hint | String | 为用户生成唯一的 ghosts |

调用示例

```
$$XIN:curl$$ "https://api.mixin.one/outputs"
```

```json
{  
  "data":[
  {  
    "type":"ghost_key",
      "mask":"ab56be4cxxxx244f9a433f35",
      "keys": ["ab56be4cxxxx244f9a433f35"],
  },
  ...
  ]
}
```
