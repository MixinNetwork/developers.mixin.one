# Error Codes

Only 20x and 500 will be used by Mixin API, note that error 500  may be caused by the Web Server not Mixin API Server.

| HTTP Status Code | Error Code | Error Description |
| - | - | :- |
|202|	400|	Invalid request body parameters. |
|202|	401|	Unauthorized. |
|202|	403|	Forbidden. |
|202|	404|	Not found. |
|202|	429|	Too many requests. |
|202|	10002|	Illegal request paramters. |
|202|	20117|	Insufficient balance。 |
|202|	20118|	PIN format error. |
|202|	20119|	PIN error. |
|202|	20120|	Transfer amount is too small. |
|202|	20121|	Authorization code has expired. |
|202|	20124|	Insufficient withdrawal fee. |
|202|	20125|	The transfer has been paid by someone else. |
|202|	20127|	The withdrawal amount is too small. |
|202|	20131|	Withdrawal Memo format error. |
|500|	30100| The current asset's public chain synchronization error.|
|500|	30101| Wrong private key. |
|500|	30102| Wrong withdrawal address. |
|500|	7000 |  WebSocket server error. |
|500|	7001 | WebSocket operation timeout. |
