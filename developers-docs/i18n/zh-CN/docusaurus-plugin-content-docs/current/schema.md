---
title: Schema 唤起
---

机器人可以通过 Schema 调用原生的 Mixin Messenger 窗口来实现支付等功能。

## 分享

```
mixin://send?category=CATEGORY&conversation_id=CONV_ID&data=DATA
```

机器人无法自动共享消息。 如果你指定了 `conversation_id` 并且是用户当前会话的`conversation_id`，会出现一个确认框，用户点击确认后会发送消息；如果没有指定`conversation_id` 或者不是当前会话的 `conversation_id`，则会出现用户选择与哪个会话共享的界面。

### 分享文本

```js
const data = "hello world!"
window.open("mixin://send?category=text&data=" + encodeURIComponent(base64.encode(data)))
```

### 分享图片

```js
const data = '{"url":"https://mixin-www.zeromesh.net/assets/d9bb777b00f4210e107dd3580fe5bf1a.png"}'
window.open("mixin://send?category=image&data=" + encodeURIComponent(base64.encode(data)))
```

### 分享联系人

```js
const data = '{"user_id":"773e5e77-4107-45c2-b648-8fc722ed77f5"}'
window.open("mixin://send?category=contact&data=" + encodeURIComponent(base64.encode(data)))
```

### 分享链接卡片

```js
const data = {
  action: "http://192.168.31.156:3000/circles/9415878/posts/82",
  app_id: "c1412f68-6152-40ad-a193-f7fadf9328a1",
  description: "From debugCircle",
  icon_url: "https://mixin-images.zeromesh.net/rl_7ufE4eezlZDDjsGz9apzvoa7ULeZLlyixbN04iiaGFng8JL9UtQVZwzHw4Bsh2_7m5WHVPwtWkLKOydGZ4Q=s256",
  title: "Test"
};
window.open("mixin://send?category=app_card&data=" + encodeURIComponent(base64.encode(JSON.stringify(data))))
```

### 分享直播卡片

```js
const data = '{"height":720,"thumb_url":"https://anchorpost.msstatic.com/cdnimage/anchorpost/1056/41/9771cb5a13901e0ed97514a9cf98e8_1663_1566469032.jpg?imageview/4/0/blur/1/format/webp","url":"https://1400293698.vod2.myqcloud.com/fd69ed6cvodcq1400293698/c1dde9e95285890807215641562/MramAAZccMIA.mp4","width":1280}'
window.open("mixin://send?category=live&data=" + encodeURIComponent(base64.encode(data)))
```

### 分享 Post 消息

```js
const data = '## Markdown Intro\n> Markdown is a light weight markup language.'
window.open("mixin://send?category=post&data=" + encodeURIComponent(base64.encode(data)))
```


## 支付

### 调起支付页面

```
mixin://pay?recipient=&asset=&amount=&memo=&trace=
```

| 参数    | 描述     |
|:------------------:|:-----------------|
| recipient | Receivers user id. |
| asset     | Asset id.  |
| amount    | Transfer amount.  |
| memo      | Optional |
| trace     | Optional, UUID, prevent duplicate payment.|

可以轮询 `GET /transfers/trace/:traceid` 看看是否有返回值来判断支付是否已经完成。

### 调起转账页面

```
mixin://transfer/:recipient_id
```

### 调起转账详情

```
mixin://snapshots?trace=:traceid
```

或者

```
mixin://snapshots/:snapshotid
```

### 添加提现地址

```
mixin://address?asset=&label=&destination=&tag=
```

`tag` is an optional parameter, other parameters are required.

### 删除提现地址

```
mixin://address?asset=&action=delete&address=
```

Assign address id to `address`.

### 发起提现

```
mixin://withdrawal?address=&asset=&amount=&memo=&trace=
```

`memo` is an optional parameter, other parameters are required.

## 其它

### 调起用户 Profile

```
mixin://users/:userid
```

### 调起机器人 Profile

```
mixin://apps/:appid?action=open&key1=value1&key2=value2&key3=value3...
```

`action` 是一个可选参数，如果没有它，bot profile 窗口将打开；传递 `action=open` 将打开 bot 主页； `key1=value1&key2=value2&key3=value3...` 打开 bot 主页时可以传入任意名称或类型的参数，方便开发邀请码、访客追踪等功能，Mixin Messenger 0.29 和以上版本支持此功能。

### 打开会话

```
mixin://conversations/:conversationid?user=:userid
```
  
`user` 是一个可选参数，如果是群组不带 `user` 参数，注意如果用户不在当前群组里无法打开会话；如果是个人会话（包括与机器人会话）强烈建议带上 `user` 参数，如果不带并且用户之间之前没有相互发过消息将无法打开聊天界面，conversations 的 Schema 在 Mixin Messenger 0.31.1 或以上的版本支持。