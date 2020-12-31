### 公链

返回 Mixin 所有支持的公链列表，无需授权

### `GET /network/chains` 

```
$$XIN:curl$$ "https://api.mixin.one/network/chains"
```

```json
{  
  "data":[
  {
    "type": "chain",
    "chain_id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
    "name": "Bitcoin",
    "icon_url": "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128",
    "managed_block_height": 663798,       // Mixin 同步公链节点数据高度
    "deposit_block_height": 663795,       // Mixin 处理充值高度
    "external_block_height": 663798,      // 第三方 API 区块高度
    "threshold": 3,                       // 充值入账确认数
    "withdrawal_pending_count": 1,        // 正在提现的数量
    "withdrawal_timestamp": "2020-12-31T07:17:08.061836303Z",
    "withdrawal_fee": "6.75645",          // 提现手续费
    "is_synchronized": true               // 当前公链的节点数据同步是否正常
  },
  ...
  ]
}
```