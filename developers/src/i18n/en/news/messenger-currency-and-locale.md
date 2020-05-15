

Since the version 0.24.0, Mixin Messenger supports returning the current currency and locale, which can be obtained through the code/order getContext. The specific parameters are as follows: 
```
{                 
    "app_version": "0.24.0",
    "immersive": true,
    "appearance": "dark",
    "currency": "USD”, // New
    "locale": "zh-CN”, // New
    "platform": "iOS”, 
    "conversation_id": conversationId 
}
```
Using the same parameters of Mixin Messenger will give users a better experience, make the bot better and faster when use it.