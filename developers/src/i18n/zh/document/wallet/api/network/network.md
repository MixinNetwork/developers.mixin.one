### 内部地址

Mixin Network 一个优点是实时，免费，对于 Mixin 内部地址的提现操作也同样的免费, 提现前可以这个接口用来检测，地址是否是 Mixin Network 的内部地址, 该操作并不是必须的，直接用 Mixin Network 的内部地址转帐也是免费，实时的。

### `GET /external/addresses/check?asset=&destination=&tag=` 

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| asset | UUID String | 必选，某个资产的 ID |
| destination | String | 必选，某个资产的提现地址 |
| tag | String | 可选，某个资产的提现地址的 memo，与 destination 一同使用 |

```
$$XIN:curl$$ "https://api.mixin.one/external/addresses/check?asset=c6d0c728-2624-429b-8e0d-d9d19b6592fa&destination=18cBEMRxXHqzWWCxZNtU91F5sbUNKhL5PX"
```

返回值

```json
{
  "data":{
    "destination":"18cBEMRxXHqzWWCxZNtU91F5sbUNKhL5PX",
    "tag":"",
  }
}
```
