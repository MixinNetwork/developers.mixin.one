# 验证 PIN 密码

验证密码是否正常,如果密码错误, 可能的原因:

- 忘记 PIN 密码，这个没有办法，密码丢失无法找回，建议把试过的密码用纸写下来，每天试 5 次。
- `iterator` 使用有问题，应该始终保持递增，一般推荐用当前系统 Nano 时间，也可以自己计数，每次调用 + 1。
- 加密后的 PIN 密码不对，例如格式不对、时间不对等，可能是 SDK 本身的问题，建议直接联系 SDK 的开发者。

注意返回错误信息里的 `extra` 字段，只有 PIN 密码不对密码错误计数才会增加，`iterator` 和加密后的 PIN 密码不对不会导致密码被锁。

### `POST /pin/verify` 

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| pin | String | 加密后的 PIN 密码 |

```
$$XIN:curl$$ "https://api.mixin.one/pin/verify" -X POST --data '{"pin":"+mRm5rm9bkQztvpsaTyz1Rib0BEM0S1FKl/oYaMfbUJM3ZmrxJhafj/tjHi+3kwQ"}'
```

```json
{
  "data":{
    $$XIN:user$$
  }
}
```

