---
title: Create Withdrawal Addresses
sidebar_position: 4
---

import Request from '../../_partials/request'
import RespAddress from '../../_partials/_resp.addr.md'

## POST /addresses

The HTTP request body:

| Name | Type | Description |
| :----- | :---- | :---- |
| asset_id | UUID String | Asset ID. |
| label | String | Label for the address. |
| destination | String | Withdrawal address. |
| tag | String | Withdrawal memo. |
| pin | String | Encrypted PIN. |

<Request title="Create an ETH address" method="POST" url="/addresses --data '{&quot;asset_id&quot;:&quot;43d61dcd-e413-450d-80b8-101d5e903357&quot;,&quot;label&quot;:&quot;Jason ETH Address&quot;,&quot;pin&quot;:&quot;nRF5OyFmO4REG6lcPk1jwKDJrENim791uLe+HH0g7EwQHXK9FgCMJl5RDKbeCNDW&quot;,&quot;destination&quot;:&quot;0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0&quot;, &quot;tag&quot;: &quot;&quot;, &quot;label&quot;: &quot;&quot;}'"/>

<RespAddress />