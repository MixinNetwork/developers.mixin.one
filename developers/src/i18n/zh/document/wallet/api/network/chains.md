### 公链

返回 Mixin Network 支持的公链列表, 里面的信息包含：

- 区块链高度
- 当前的充值高度
- 第三方区块高度
- 提现手续费
- 等

### `GET /network/chains` 

```
$$XIN:curl$$ "https://api.mixin.one/network/chains"
```

```json
{  
  "data":[
    $$XIN:asset$$,
    ...
  ]
}
```
