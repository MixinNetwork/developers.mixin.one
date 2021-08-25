---
title: Send Messages
sidebar_position: 3
---

import Request from '../../_partials/request'
import ReqMessages from '../../_partials/_req.msgs.md'

## POST /messages

Send messages in bulk.

:::info
A maximum of 100 messages can be sent in batch each time, and the message body cannot exceed 128Kb. It is recommended to limit the size of a single message, for example:
:::


<Request title="Send Messages" method="POST" url="/messages --data PAYLOAD" />

Request body data is a message array:

<ReqMessages />

It returns empty JSON on success.
