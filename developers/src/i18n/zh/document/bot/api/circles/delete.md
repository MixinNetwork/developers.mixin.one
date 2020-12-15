# 删除圈子

帮授权用户删除圈子，需要 `CIRCLES:WRITE` 权限。

### `POST /circles/:id/delete`

curl 示例

```
$$XIN:curl$$ "https://api.mixin.one/circles/a465ffdb-4441-4cb9-8b45-00cf79dfbc46/delete"
```

删除成功返回空 json

---
注意删除圈子并不会删除圈子下面的会话和聊天记录。