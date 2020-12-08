# 验证密码

### `POST /pin/verify` 

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| pin | String | 加密后的密码 |

```
$$XIN:curl$$ "https://api.mixin.one/pin/verify" -X POST --data '{"pin":"+mRm5rm9bkQztvpsaTyz1Rib0BEM0S1FKl/oYaMfbUJM3ZmrxJhafj/tjHi+3kwQ"}'
```

成功返回空的 json 。