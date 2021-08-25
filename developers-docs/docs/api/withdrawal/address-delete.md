---
title: Delete Withdrawal Addresses
sidebar_position: 5
---

import Request from '../../_partials/request'
import RespAddress from '../../_partials/_resp.addr.md'

## POST /addresses/:id/delete

Delete a specified address by address :id.

<Request title="Delete an ETH address" method="POST" url="/addresses/ba3a2e33-efde-40b9-9cac-c293f0d1a3f2/delete --data '{&quot;pin&quot;:&quot;d2EJy5kmt56d3U5PeKm+TJLBnXBuyxBTcWxytL8pk/LXwJEak9r8iVMcASjgvoO+&quot;}'"/>

<RespAddress />

The above will return an empty json on success.

:::info
There is no API for editing withdrawal addresses. If you want to implement editing in your product, please first delete and then add.
:::