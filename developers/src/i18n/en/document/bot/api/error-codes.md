# Error Codes

Only 20x and 500 will be used by Mixin API, note that error 500  may be caused by the Web Server not Mixin API Server.

| HTTP 状态码 | 错误码 | 错误说明|
| - | - | :- |
|202|	400|	请求体参数无效|
|202|	401|	未经授权的请求|
|202|	403|	请求拒绝|
|202|	404|	无法找到请求地址|
|202|	429|	请求太频繁|
|202|	10002|	请求参数不合法|
|202|	20117|	余额不足|
|202|	20118|	PIN 密码格式错误|
|202|	20119|	PIN 密码错误|
|202|	20120|	转账金额太小|
|202|	20121|	授权码已过期|
|202|	20124|	提现手续费不足|
|202|	20125|	转账已被其他人支付|
|202|	20127|	提现金额太小|
|202|	20131|	提现 Memo 格式错误|
|202|	20131|	提现 Memo 格式错误|
|500|	30100| 当前资产所属公链同步异常 |
|500|	30101| 当前私钥不正确 |
|500|	30102| 错误的提现地址 |
|500|	7000 |  WebSocket 服务器错误 |
|500|	7001 | WebSocket 操作超时 |





| Status | Code | Description|
| - | - | :- |
|202|	400|	The request body can’t be pasred as valid data. |
|202|	401|	Unauthorized. |
|202|	403|	Forbidden. |
|202|	404|	The endpoint is not found. |
|202|	429|	Too Many Requests. |
|202|	10006|	App update required.|
|202|	20116|	The group chat is full.|
|500|	500| Internal Server Error. |
|500|	7000 |  Blaze server error. |
|500|	7001 | The blaze operation timeout. |