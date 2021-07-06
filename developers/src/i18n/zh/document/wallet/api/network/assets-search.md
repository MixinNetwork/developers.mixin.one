### 搜索热门资产

通过 symbol 或 name 搜索资产, 注意:

- 并非所有的资产都能查到，基本的原则是有图标，或者有价格
- 返回是一个列表，比如 usdt 会返回 omni, erc20 等所有的 usdt 信息

### `GET /network/assets/search/:q` 

```
$$XIN:curl$$ "https://api.mixin.one/network/assets/search/eos"
```

```json
{
  "data":[
    $$XIN:asset$$,
    ...
  ]
}
```
