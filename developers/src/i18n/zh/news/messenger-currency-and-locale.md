

Mixin Messenger 从 0.24.0 版本开始支持返回当前的 currency 和 locale ，通过 getContext 获取，具体参数如下：
```
{                 
    "app_version": "0.24.0",
    "immersive": true,
    "appearance": "dark",
    "currency": "USD”,    // 新增
    "locale": "zh-CN”,     // 新增
    "platform": "iOS”, 
    "conversation_id": conversationId 
}
```

使用 Mixin Messenger 相同的参数能让用户更好更快的使用开发者的机器人