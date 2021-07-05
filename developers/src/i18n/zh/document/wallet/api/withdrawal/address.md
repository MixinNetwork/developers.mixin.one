# 提现地址详情

读取已经添加的地址，注意事项：

- 地址详情里，同时会返回，手续费，保留值，最小提现金额等, 并不是所有链都会有值，可以针对使用
- 内部地址，没有手续费

### `GET /addresses/:id` 

```
$$XIN:curl$$ "https://api.mixin.one/addresses/e1524f3c-2e4f-411f-8a06-b5e1b1601308"
```

```json
{
  "data":{
    $$XIN:address$$
  }
}
```
