# 创建会话

新建群或与用户第一次会话都需要调用这个 API 确保先创建会话。

### `POST /conversations`

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| category | String | 类别，取值为 "GROUP" 或 "CONTACT" |
| conversation_id | String | 唯一标识，参见下文生成 |
| name | String | 群名，当 category 为 "GROUP" 时有效，最大 512 字符 |
| participants | Array | 成员列表 ```[{ user_id: "" }]```，最多 256 人 |

会话创建成功返回

```json
{
  "data": $$XIN:conversation$$
}
```

**注意不能用用户的 access_token 去创建会话，需要用当前机器人的 token 去创建会话**

**注意类别为“CONTACT”时， participants 的值应为长度等于 1 的数组，user_id 的取值为对方的 user_id 。**
### 生成会话唯一标识

- 单人会话 `category = "CONTACT"`

根据会话双方生成会话唯一标识，算法实现：

```golang
 // Go
 func UniqueConversationId(userId, recipientId string) string {
    minId, maxId := userId, recipientId
    if strings.Compare(userId, recipientId) > 0 {
      maxId, minId = userId, recipientId
    }
    h := md5.New()
    io.WriteString(h, minId)
    io.WriteString(h, maxId)
    sum := h.Sum(nil)
    sum[6] = (sum[6] & 0x0f) | 0x30
    sum[8] = (sum[8] & 0x3f) | 0x80
    return uuid.FromBytesOrNil(sum).String()
  }
```

- 多人会话 `category = "GROUP"`

```Swift
 // Swift
 UUID().uuidString.lowercased()
```
**注意 UUID 字符串统一转成小写**
