# Creating

To create a new group or to have a conversation with a user for the first time, you need to call this API to ensure that the conversation is created first.


### `POST /conversations`

Request body data:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| category | String | "GROUP" or "CONTACT" |
| conversation_id | String | Unique identifier, see below to generate. |
| name | String | Group name, valid when category is "GROUP", 512 characters at most. |
| participants | Array | Member list ```[{ user_id: "" }]```, up to 256 people. |

On success:

```json
{
  "data": $$XIN:conversation$$
}
```

**Note that you cannot use the user's access_token to create a conversation, you need to use the current bot's token to create a conversation**

**Note that when the category is "CONTACT", the value of participants should be an array with length equal to 1, and the value of user_id is the other party's user_id.**

### Generating Unique Conversation ID

- Single chat `category = "CONTACT"`

  The unique identification of the session is generated according to both parties, in Go:

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

- Group chat `category = "GROUP"`

```Swift
 // Swift
 UUID().uuidString.lowercased()
```
**Note that UUID strings are unexceptionally converted to lowercase**
