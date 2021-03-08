### 提现地址检测

检测一种资产的提现地址是否合法，无需授权访问

### `GET /external/addresses/check?asset=&destination=&tag=` 

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| asset | UUID String | 必选，某个资产的 ID |
| destination | String | 必选，某个资产的提现地址 |
| tag | String | 可选，某个资产的提现地址的 memo，与 destination 一同使用 |

```
$$XIN:curl$$ "https://api.mixin.one/external/addresses/check?asset=c6d0c728-2624-429b-8e0d-d9d19b6592fa&destination=18cBEMRxXHqzWWCxZNtU91F5sbUNKhL5PX"
```

```json
{
  "data":{
    "destination":"18cBEMRxXHqzWWCxZNtU91F5sbUNKhL5PX",
      "tag":"",
  }
}
```
