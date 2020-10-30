# Schema 交互

Mixin Messenger 支持机器人通过 schema 唤起支付等特定界面。

- 支付页 `mixin://pay?recipient=&asset=&amount=&memo=&trace=`
  
  memo 和 trace 是可选参数，recipient 是收款人的 user id，trace 参数可以有效防止重复支付。可轮询 `GET https://mixin-api.zeromesh.net/transfers/trace/:traceid` 是否有返回值来判断支付是否已完成，或者轮询 `POST /payments` 是否返回 paid 状态来判断支付是否已完成，参见[文档](https://developers.mixin.one/api/g-transfer/verify-payment)。

- 用户弹窗 `mixin://users/:userid`

- 转账详情界面 `mixin://snapshots?trace=:traceid` 或者 `mixin://snapshots/:snapshotid`

- 机器人弹窗 `mixin://apps/:appid?action=open`
  action 为可选参数，不传打开机器人弹窗，传 `action=open` 打开机器人首页

- 新增提现地址 `mixin://address?asset=&label=&destination=&tag=`
  
  tag 为可选参数，其他参数必填

- 删除提现地址 `mixin://address?asset=&action=delete&address=`
  
  address 参数为 address id

- 提现 `mixin://withdrawal?address=&asset=&amount=&memo=&trace=`
  
  memo 为可选参数，其他参数必填

- 分享文字 `mixin://send?text=`
  
  可以分享文字内容到 Mixin Messenger 里，客户端会唤起转发的界面

### 下一步

- [授权](/doucument/bot/get-started/create)