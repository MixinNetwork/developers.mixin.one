# Schema 唤起

机器人可以通过 Schema 唤起 Mixin Messenger 原生窗口来完成业务流程，例如支付。

### 分享
![分享](./bot-schema-share.png)

`mixin://send?category=&conversation_id=&data=`

机器人无法自动分享消息，如果指定 `conversation_id` 并且与用户当前所在会话的 `conversation_id` 一致会出现上图所示确认框，由用户点确认后发送；未指定 `conversation_id` 或者与当前会话不一致会出现用户选人的界面，由用户选择分享要分享的会话。

- 分享文字

  ```js
  const base64 = require('js-base64')

  const data = "hello world!"
  window.open("mixin://send?category=text&data=" + encodeURIComponent(base64.encode(data)))
  ```

- 分享图片

  ```js
  const base64 = require('js-base64')

  const data = '"{"url":"https://mixin-www.zeromesh.net/assets/d9bb777b00f4210e107dd3580fe5bf1a.png"}'
  window.open("mixin://send?category=image&data=" + encodeURIComponent(base64.encode(data)))
  ```

- 分享联系人

  ```js
  const base64 = require('js-base64')

  const data = '{"user_id":"773e5e77-4107-45c2-b648-8fc722ed77f5"}'
  window.open("mixin://send?category=contact&data=" + encodeURIComponent(base64.encode(data)))
  ```

- 分享卡片

  ```js
  const base64 = require('js-base64')

  const data = '{"action":"http://192.168.31.156:3000/circles/9415878/posts/82","app_id":"c1412f68-6152-40ad-a193-f7fadf9328a1","description":"来自debugCircle","icon_url":"https://mixin-images.zeromesh.net/rl_7ufE4eezlZDDjsGz9apzvoa7ULeZLlyixbN04iiaGFng8JL9UtQVZwzHw4Bsh2_7m5WHVPwtWkLKOydGZ4Q=s256","title":"抽奖测试"}'
  
  window.open("mixin://send?category=app_card&data=" + encodeURIComponent(base64.encode(data)))
  ```

- 分享直播

  ```js
  const base64 = require('js-base64')

  const data = '{"height":720,"thumb_url":"https://anchorpost.msstatic.com/cdnimage/anchorpost/1056/41/9771cb5a13901e0ed97514a9cf98e8_1663_1566469032.jpg?imageview/4/0/blur/1/format/webp","url":"https://1400293698.vod2.myqcloud.com/fd69ed6cvodcq1400293698/c1dde9e95285890807215641562/MramAAZccMIA.mp4","width":1280}'

  window.open("mixin://send?category=live&data=" + encodeURIComponent(base64.encode(data)))
  ```

- 分享文章

  ```js
  const base64 = require('js-base64')

  const data = '## Markdown简介\n> Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。'

  window.open("mixin://send?category=post&data=" + encodeURIComponent(base64.encode(data)))
  ```


### 支付

- 支付页 

  `mixin://pay?recipient=&asset=&amount=&memo=&trace=`
  
  | 参数       | 说明        |
  |:------------------:|:-----------------|
  | recipient | 收款人的 user id |
  | asset     | 资产编号  |
  | amount    | 转账金额  |
  | memo      | 可选，备注 |
  | trace     | 可选，该参数可有效防止重复支付 |

  可轮询 `GET /transfers/trace/:traceid` 是否有返回值来判断支付是否已完成。

- 转账详情界面

  `mixin://snapshots?trace=:traceid` 或 `mixin://snapshots/:snapshotid`

- 新增提现地址

  `mixin://address?asset=&label=&destination=&tag=`
  
  tag 为可选参数，其他参数必填

- 删除提现地址
 
  `mixin://address?asset=&action=delete&address=`
  
  address 参数为 address id

- 提现

  `mixin://withdrawal?address=&asset=&amount=&memo=&trace=`
  
  memo 为可选参数，其他参数必填

### 其他

- 用户弹窗

  `mixin://users/:userid`

- 机器人弹窗

  `mixin://apps/:appid?action=open&key1=value1&key2=value2&key3=value3...` 
  
   action 为可选参数，不传打开机器人弹窗，传 `action=open` 打开机器人首页；`key1=value1&key2=value2&key3=value3...` 参数可在打开机器人首页时带过去，不限制参数的名称和类型，方便开发邀请码、统计来源等功能，该参数在 Mixin Messenger 0.29.0 或以上的版本支持。


### 下一步

- [JS 容器交互](./js)

  获取当前会话 id 能为用户提供不用的应用场景，而获取用户的本地化信息并加以适配能有效提升用户体验。