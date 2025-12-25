---
title: Error Codes
sidebar_position: 50
---

# Error Codes

Only 20x and 500 will be used by Mixin API, you need to pay attention to 500 error, which may be caused by Web Server not Mixin API Server.

| Status | Code  | Description                                     |
| ------ | ----- | :---------------------------------------------- |
| 202    | 400   | The request body can’t be pasred as valid data. |
| 202    | 401   | Unauthorized.                                   |
| 202    | 403   | Forbidden.                                      |
| 202    | 404   | The endpoint is not found.                      |
| 202    | 429   | Too Many Requests.                              |
| 202    | 10002 | The request data has invalid field, retrieve detail from extra.             |
| 202    | 10006 | App update required.                            |
| 202    | 10104 | address generating.                             |
| 202    | 10105 | locked by another transaction                   |
| 202    | 20116 | The group chat is full.                         |
| 202    | 20117 | Insufficient balance.                           |
| 202    | 20120 | Transfer amount too small.                      |
| 202    | 20123 | You have created too many apps.                 |
| 202    | 20124 | Insufficient fee.                               |
| 202    | 20125 | Transfer has been paid by someone else.         |
| 202    | 20127 | Withdraw amount too small.                      |
| 202    | 20131 | Withdrawal memo format incorret.                |
| 202    | 20133 | Too many circles for the conversation.          |
| 202    | 20134 | Withdraw amount too large.                      |
| 202    | 20135 | Withdraw fee too small.                         |
| 202    | 20150 | receivers contain duplicate or invalid data.    |
| 202    | 30102 | Invalid address format.                         |
| 500    | 500   | Internal Server Error.                          |
| 500    | 7000  | Blaze server error.                             |
| 500    | 7001  | The blaze operation timeout.                    |
