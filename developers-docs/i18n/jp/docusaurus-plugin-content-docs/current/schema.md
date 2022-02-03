---
title: スキーマのインテラクション
sidebar_position: 4
---

ロボは、スキーマを通じてネイティブのMixinメッセンジャーウィンドウを呼び出し、支払いなどの機能を実装することができます。

## 共有

```
mixin://send?category=CATEGORY&conversation_id=CONV_ID&data=DATA
```

ロボは、メッセージを自動的に共有することはできません。`conversation_id`を指定し、それがユーザの現在のセッションの`conversation_id`であれば、上記のような確認ボックスが表示され、ユーザが確認をクリックした後にメッセージが送信されます。`conversation_id`を指定しないか、現在のセッションの`conversation_id`でない場合は、ユーザがどのセッションと共有するかを選択するインターフェースが表示されます。

### テキストの共有

```js
const data = "hello world!"
window.open("mixin://send?category=text&data=" + encodeURIComponent(base64.encode(data)))
```

### 画像の共有

```js
const data = '{"url":"https://mixin-www.zeromesh.net/assets/d9bb777b00f4210e107dd3580fe5bf1a.png"}'
window.open("mixin://send?category=image&data=" + encodeURIComponent(base64.encode(data)))
```

### 連絡先の共有

```js
const data = '{"user_id":"773e5e77-4107-45c2-b648-8fc722ed77f5"}'
window.open("mixin://send?category=contact&data=" + encodeURIComponent(base64.encode(data)))
```

### カードの共有

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

### ライブ配信の共有

```js
const data = '{"height":720,"thumb_url":"https://anchorpost.msstatic.com/cdnimage/anchorpost/1056/41/9771cb5a13901e0ed97514a9cf98e8_1663_1566469032.jpg?imageview/4/0/blur/1/format/webp","url":"https://1400293698.vod2.myqcloud.com/fd69ed6cvodcq1400293698/c1dde9e95285890807215641562/MramAAZccMIA.mp4","width":1280}'
window.open("mixin://send?category=live&data=" + encodeURIComponent(base64.encode(data)))
```

### 記事の共有

```js
const data = '## Markdown Intro\n> Markdown is a light weight markup language.'
window.open("mixin://send?category=post&data=" + encodeURIComponent(base64.encode(data)))
```


## 決済

### 決済画面の呼び出し

```
mixin://pay?recipient=&asset=&amount=&memo=&trace=
```

| パラメーター    | 説明     |
|:------------------:|:-----------------|
| recipient | Receivers user id. |
| asset     | Asset id.  |
| amount    | Transfer amount.  |
| memo      | Optional |
| trace     | Optional, UUID, prevent duplicate payment.|

You can poll `GET /transfers/trace/:traceid` to see if there is a return value to determine whether the payment has been completed.

### 送金画面の呼び出し

```
mixin://transfer/:recipient_id
```

### 送金情報のインターフェース

```
mixin://snapshots?trace=:traceid
```

or

```
mixin://snapshots/:snapshotid
```

### 出金アドレスの追加

```
mixin://address?asset=&label=&destination=&tag=
```

`tag` is an optional parameter, other parameters are required.

### 出金アドレスの削除

```
mixin://address?asset=&action=delete&address=
```

Assign address id to `address`.

### 出金

```
mixin://withdrawal?address=&asset=&amount=&memo=&trace=
```

`memo` is an optional parameter, other parameters are required.

## その他

### ユーザープロフィールのポップアップ

```
mixin://users/:userid
```

### ロボのプロフィールのポップアップ

```
mixin://apps/:appid?action=open&key1=value1&key2=value2&key3=value3...
```

`action` is an optional parameter, the bot pop-up window will open in the absence of it, passing `action=open` will open the bot homepage; `key1=value1&key2=value2&key3=value3...` Parameters of any name or type can be passed when opening the bot homepage to facilitate the development of features like invitation codes, visitor tracking, etc. This feature is supported in Mixin Messenger 0.29.0 or above.

