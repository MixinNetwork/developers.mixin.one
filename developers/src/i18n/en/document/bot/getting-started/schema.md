# Schema Interactions

A bot can invoke the native Mixin Messenger windows through the Schema to implement functions, such as payment.

### Sharing

![TODO: English Version IMG, Sharing](./bot-schema-share.png)

`mixin://send?category=&conversation_id=&data=`

The bot can not automatically share messages. If you specify `conversation_id` and it is the `conversation_id` of the user's current session, the confirmation box shown above will appear, the message will be sent after the user clicks the confirmation; if the `conversation_id` is not specified or is not the `conversation_id` of the current session, an interface where the user chooses which session to share with will show up.

- Share text.

  ```js
  const base64 = require('js-base64')

  const data = "hello world!"
  window.open("mixin://send?category=text&data=" + encodeURIComponent(base64.encode(data)))
  ```

- Share images.

  ```js
  const base64 = require('js-base64')

  const data = '"{"url":"https://mixin-www.zeromesh.net/assets/d9bb777b00f4210e107dd3580fe5bf1a.png"}'
  window.open("mixin://send?category=image&data=" + encodeURIComponent(base64.encode(data)))
  ```

- Share contacts.

  ```js
  const base64 = require('js-base64')

  const data = '{"user_id":"773e5e77-4107-45c2-b648-8fc722ed77f5"}'
  window.open("mixin://send?category=contact&data=" + encodeURIComponent(base64.encode(data)))
  ```

- Share cards.

  ```js
  const base64 = require('js-base64')

  const data = '{"action":"http://192.168.31.156:3000/circles/9415878/posts/82","app_id":"c1412f68-6152-40ad-a193-f7fadf9328a1","description":"From debugCircle","icon_url":"https://mixin-images.zeromesh.net/rl_7ufE4eezlZDDjsGz9apzvoa7ULeZLlyixbN04iiaGFng8JL9UtQVZwzHw4Bsh2_7m5WHVPwtWkLKOydGZ4Q=s256","title":"Test"}'
  
  window.open("mixin://send?category=app_card&data=" + encodeURIComponent(base64.encode(data)))
  ```

- Share live shows.

  ```js
  const base64 = require('js-base64')

  const data = '{"height":720,"thumb_url":"https://anchorpost.msstatic.com/cdnimage/anchorpost/1056/41/9771cb5a13901e0ed97514a9cf98e8_1663_1566469032.jpg?imageview/4/0/blur/1/format/webp","url":"https://1400293698.vod2.myqcloud.com/fd69ed6cvodcq1400293698/c1dde9e95285890807215641562/MramAAZccMIA.mp4","width":1280}'

  window.open("mixin://send?category=live&data=" + encodeURIComponent(base64.encode(data)))
  ```

- Share posts.

  ```js
  const base64 = require('js-base64')

  const data = '## Markdown Intro\n> Markdown is a light weight markup language.'

  window.open("mixin://send?category=post&data=" + encodeURIComponent(base64.encode(data)))
  ```


### Payment

- Payment page.

  `mixin://pay?recipient=&asset=&amount=&memo=&trace=`
  
  | Parameter    | Description     |
  |:------------------:|:-----------------|
  | recipient | Receivers user id. |
  | asset     | Asset id.  |
  | amount    | Transfer amount.  |
  | memo      | Optional |
  | trace     | Optional, prevent duplicate payment.|

You can poll `GET /transfers/trace/:traceid` to see if there is a return value to determine whether the payment has been completed.

- Transfer details interface.

  `mixin://snapshots?trace=:traceid` or `mixin://snapshots/:snapshotid`.

- Add withdrawal addresses.

  `mixin://address?asset=&label=&destination=&tag=`
  
  tag is an optional parameter, other parameters are required.

- Delete withdrawal addresses.
 
  `mixin://address?asset=&action=delete&address=`
  
   Assign address id to `address`.

- Withdrawal.

  `mixin://withdrawal?address=&asset=&amount=&memo=&trace=`
  
  `memo` is an optional parameter, other parameters are required.

### Others

- User popups.

  `mixin://users/:userid`

- Bot popups.

  `mixin://apps/:appid?action=open&key1=value1&key2=value2&key3=value3...` 
  
  `action` is an optional parameter, the bot pop-up window will open in the absence of it, passing `action=open` will open the bot homepage; `key1=value1&key2=value2&key3=value3...` Parameters of any name or type can be passed when opening the bot homepage to facilitate the development of features like invitation codes, visitor tracking, etc. This feature is supported in Mixin Messenger 0.29.0 or above.

### Next Step

- [Webview Javascript Bridge](./js)

  Obtaining the current session id makes it possible to provide users with different application scenarios, and obtaining the user's localization settings makes it possible to adapt to it and improve the user experience.