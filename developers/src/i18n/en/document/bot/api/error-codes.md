# Error Codes

Only 20x and 500 will be used by Mixin API, note that error 500  may be caused by the Web Server not Mixin API Server.

| HTTP Status Code | Error Code | Error Description |
| - | - | :- |
|202|	400|	Invalid request body parameters.|
|202|	401|	Unauthorized. |
|202|	403|	Forbidden. |
|202|	404|	Not found. |
|202|	429|	Too many requests. |
|202|	10006|	Update requireed. |
|202|	20116|	Chatgroup is full. |
|202|	20133|	Too many circles set for the session. |
|500|	500| API server error. |
|500|	7000 |  WebSocket server error. |
|500|	7001 | WebSocket timeout. |