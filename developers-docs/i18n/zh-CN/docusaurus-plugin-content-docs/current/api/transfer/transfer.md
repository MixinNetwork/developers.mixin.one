---
title: Send/Read Transfer
sidebar_position: 1
---

import Request from '../../_partials/request'
import RespTransfer from '../../_partials/_resp.transfer.md'

## POST /transfers

The HTTP request body:

| Name | Type | Description |
| :----- | :---- | :---- |
| asset_id | UUID String | Asset ID |
| opponent_id | UUID String | Receiver |
| amount | String | e.g.: "0.01", supports up to 8 digits after the decimal point |
| pin | String | Encrypted PIN |
| trace_id | UUID String | Optional, used to prevent duplicate payment |
| memo | UUID String | Optional, maximally 200 characters |


<Request title="Send Transfer" method="POST" url="/transfers --data PAYLOAD"/>

<RespTransfer />

:::caution
- Once the transfer API is successfully called, it means that the data has been confirmed by all nodes, and the data is irreversible.
- One can't transfer money to themself.
- The encrypted PIN is one-time, and the PIN must be re-encrypted every time you transfer.
- It is strongly recommended that developers use `trace_id` to handle duplicate transfers, and always attach this parameter to transfers.
- All you need is to do it over again if you encounter `500` error in a transfer.
- If you need to process a large number of concurrent transactions and process hundreds or thousands of transfers per second, it is recommended to use multiple accounts to transfer and send transactions.
- When a transfer error happens, pay attention to the "extra" field in the returned error message.
- If you see the error `20119` password is wrong when you are transferring, do not try again. It is recommended to call the [PIN Verification](../pin-verify) API to confirm.
:::

## GET /transfers/trace/:id

This API is only for reading transfers, not deposits or withdrawals.


<Request title="Read Transfer" method="GET" url="/transfers/trace/7c67e8e8-b142-488b-80a3-61d4d29c90bf"/>

<RespTransfer />
