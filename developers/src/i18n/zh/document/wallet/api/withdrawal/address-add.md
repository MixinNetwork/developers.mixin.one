# 新增提现地址

用户提现操作之前，需要先对相应的资产添加提现地址, 需要注意事项：

- 像 btc, eth 只需要 destination 参数即可
- eos 需要提供 destination, tag (备注)
- 每个资产的提现地址只能添加一次

### `POST /addresses` 

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :---- | :---- |
| asset_id | UUID String | 资产 id |
| label | String | 地址名称，长度为 1 ~ 64 |
| destination | String | 提现地址 |
| tag | String | 提现备注（Tag）, 不能大于 128 个字符|
| pin | String | 加密后的 PIN |

```
$$XIN:curl$$ "https://api.mixin.one/addresses" -XPOST --data '{"asset_id":"43d61dcd-e413-450d-80b8-101d5e903357","label":"Jason ETH Address","pin":"nRF5OyFmO4REG6lcPk1jwKDJrENim791uLe+HH0g7EwQHXK9FgCMJl5RDKbeCNDW","destination":"0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0", "tag": "", "label": ""}'
```

```json
{
  "data":{
    $$XIN:address$$
  }
}
```
