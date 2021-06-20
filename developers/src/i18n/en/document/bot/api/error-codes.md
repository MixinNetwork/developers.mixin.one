# Error Codes

Only 20x and 500 will be used by Mixin API, you need to pay attention to 500 error, which may be caused by Web Server not Mixin API Server.

| Status | Code | Description|
| - | - | :- |
|202|	400|	The request body can’t be pasred as valid data. |
|202|	401|	Unauthorized. |
|202|	403|	Forbidden. |
|202|	404|	The endpoint is not found. |
|202|	429|	Too Many Requests. |
|202|	10006|	App update required.|
|202|	20116|	The group chat is full.|
|202|	20133|	Too many circles for the conversation. |
|500|	500| Internal Server Error. |
|500|	7000 |  Blaze server error. |
|500|	7001 | The blaze operation timeout. |

