### 资产详情

Mixin Network 里的单个资产信息，像价格，确认数，流通量, 交易笔数, 注意事项

- 这个接口返回的是 Mixin Network 的资产信息，跟用户的返回内容不一样

### `GET /network/assets/:id` 

```
$$XIN:curl$$ "https://api.mixin.one/network/assets/c94ac88f-4671-3976-b60a-09064f1811e8"
```

```json
{
  "data": $$XIN:network_asset$$
}
```
