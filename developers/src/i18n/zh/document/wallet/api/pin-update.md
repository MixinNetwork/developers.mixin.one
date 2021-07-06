# 设置初始密码或修改密码

PIN 码在 Mixin Network 中相当于私钥的存在，非常重要的，这个接口是用来初始化，或者更新 PIN, 注意事项:

- 设置初始密码 old_pin 应传空字符串。 
- 更新时，old_pin 跟 pin 的 iterator 也需要递增

### `POST /pin/update` 

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| old_pin | String | 空字符串或加密后的旧密码 |
| pin | String | 加密后的新密码 |

```
$$XIN:curl$$ "https://api.mixin.one/pin/update" -X POST --data '{"old_pin":"","pin":"+mRm5rm9bkQztvpsaTyz1Rib0BEM0S1FKl/oYaMfbUJM3ZmrxJhafj/tjHi+3kwQ"}'
```

```json
{
  "data":{
    $$XIN:user$$
  }
}
```
