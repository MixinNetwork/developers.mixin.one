---
title: Error Codes
category: Mixin Network
order: 6
---

Only 20x and 500 will be used by Mixin API, you need to pay attention to 500 error, which may be caused by Web Server not Mixin API Server.

| Status | Code | Description |
| --- | --- | --- |
| 202 | 400 | The request body can’t be pasred as valid data. |
| 202 | 403 | Forbidden. |
| 202 | 404 | The endpoint is not found. |
| 202 | 429 | Too Many Requests. |
| 202 | 10002 | The request data has invalid field. |
| 202 | 10003 | Failed to deliver SMS to +8613800138000. |
| 202 | 10004 | Recaptcha is invalid. |
| 202 | 10005 | Recaptcha is required. |
| 202 | 20110 | Invalid phone number +8613800138000|
| 202 | 20111 | Insufficient identity numbers. | 
| 202 | 20112 | Invalid invitation code. |
| 202 | 20113 | Invalid phone verification code. |
| 202 | 20114 | Expired phone verification code. |
| 202 | 20115 | Invalid QR code. |
| 202 | 20116 | The group chat is full. |
| 202 | 20117 | Insufficient balance. |
| 202 | 20118 | Invalid PIN format. |
| 202 | 20119 | PIN incorrect. |
| 202 | 20120 | Transfer amount too small. |
| 202 | 20121 | Authorization code expired. |
| 202 | 20122 | Phone number used by someone else. |
| 202 | 20123 | You have created too many apps, the maximum is 10. |
| 202 | 20124 | Insufficient fee. |
| 202 | 20125 | Transfer has been paid by someone else. |
| 202 | 20126 | Too many stickers. |
| 202 | 20127 | Withdraw amount too small. |
| 202 | 30100 | Chain not in sync. |
| 202 | 30101 | Private key for XYZ missing. |
| 202 | 30102 | Invalid address format. |
| 202 | 30103 | Insufficient %asset_id% pool |
| 500 | 500 | Internal Server Error. |
| 500 | 7000 | Blaze server error. |
| 500 | 7001 | The blaze operation timeout. |

An response error example.

```
{  
  "error":{
    "status":500,
    "code":500,
    "description":"Internal Server Error"
  }
}
```
