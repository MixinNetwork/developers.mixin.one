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
  "data":{
    "type":"conversation",
      "conversation_id":"928c5c40-769c-3e97-8387-fb1ae0645311",
      "creator_id":"8dcf823d-9eb3-4da2-8734-f0aad50c0da6",
      "category":"GROUP",
      "name":"",
      "icon_url":"",
      "announcement":"",
      "created_at":"2018-05-16T12:34:44.134238105Z",
      "code_id":"d8244b92-30e9-44b5-bfb0-ce597c788125",
      "code_url":"https://mixin.one/codes/d8244b92-30e9-44b5-bfb0-ce597c788125",
      "mute_until":"2018-05-16T12:34:44.143010035Z",
      "participants":[
        {
          "type":"participant",
          "user_id":"8dcf823d-9eb3-4da2-8734-f0aad50c0da6",
          "role":"OWNER",
          "created_at":"2018-05-16T12:34:44.134238105Z"
        },
        {
          "type":"participant",
          "user_id":"e8e5b807-fa8b-455a-8dfa-b189d28310ff",
          "role":"",
          "created_at":"2018-05-16T12:34:44.149277666Z"
        }
      ]
  }
}
```

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