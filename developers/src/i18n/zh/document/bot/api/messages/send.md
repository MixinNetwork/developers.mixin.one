# 批量发送消息

### `POST /messages`

请求 Body 数据为消息数组：


```json
[
  $$XIN:message$$
]
```

每次最多批量发送 100 条消息，消息 Body 不能超过 128Kb，建议限制单条消息大小，例如：

```
$$XIN:curl$$ "https://api.mixin.one/attachments" -X POST
```

发送成功返回空 JSON。

**本接口仅限用于机器人批量发消息。**
