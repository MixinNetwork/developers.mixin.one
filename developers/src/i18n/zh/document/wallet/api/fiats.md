### 实时汇率

Mixin Network 的资产默认返回的都是对应 usdt 或者 btc 的价格, 这个接口返回法币跟 usdt 之间的汇率, 方便转换成对应的法币价格。

### `GET /fiats` 

```
$$XIN:curl$$ "https://api.mixin.one/fiats"
```

```json
{
  "data": [
    {"code":"ISK","rate":121.13998},
    {"code":"CNY","rate":6.9669},
    ...
  ]
}
```
