# 分享机器人

用户和机器人都可以设置分享 3 个机器人到个人页，聊天时还能从左下角 + 菜单里显示出来，该功能能极大的促进机器人靠口碑在用户之间传播。

### 获取分享列表

`GET /users/:id/apps/favorite`

```
$$XIN:curl$$ "https://api.mixin.one/users/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/apps/favorite"
```

```json
{
  "data": [
    $$XIN:app$$
    ...
  ]
}
```

### 添加分享

`POST /apps/:id/favorite`

```
$$XIN:curl$$ "https://api.mixin.one/apps/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/favorite"
```

添加成功会返回分享的机器人列表


### 删除分享

`POST /apps/:id/unfavorite`

```
$$XIN:curl$$ "https://api.mixin.one/apps/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/unfavorite"
```

删除成功返回空 json
