---
title: Send Raw Transactions
sidebar_position: 2
---

import Request from '../../_partials/request'
import RespTransferMainnet from '../../_partials/_resp.transfer-mainnet.md'
import RespTransferMultisig from '../../_partials/_resp.transfer-multisig.md'

## POST /transactions

It's possible send raw transactions to the mainnet. This API supports two kinds of address: mainnet address and the multisig address.

### Transfer to a Mainnet Address

The HTTP request body:

| Name | Type | Description |
| :----- | :---- | :---- |
| asset_id | UUID String | Asset ID. |
| opponent_key | String | Mainnet address. |
| amount | String | e.g.: "0.01", supports up to 8 digits after the decimal point. |
| pin | String | Encrypted PIN. |
| trace_id | UUID String | Optional, used to prevent duplicate payment. |
| memo | UUID String | Optional, maximally 140 characters. |

<Request title="Transfer to Mainnet" method="POST" url="/transactions --data '{&quot;amount&quot;:&quot;10&quot;,&quot;asset_id&quot;:&quot;43d61dcd-e413-450d-80b8-101d5e903357&quot;,&quot;opponent_key&quot;:&quot;XINDEhAA8ArWDJBF5fJQvrtKdZQ4X28KmkScm5FtwdJGx9CiB1Hjadk4baMLMRjsGY5L8QDbVKuC7jvep1m8k4zZN7BGvvXP&quot;,&quot;memo&quot;:&quot;hello&quot;,&quot;pin&quot;:&quot;F39IsJmUaZW03VMV/01lHyY2RCoZ7/X764akX+EmthIc4uVsWAWQTM/IxX5Z9C1y&quot;,&quot;trace_id&quot;:&quot;7c67e8e8-b142-488b-80a3-61d4d29c90bf&quot;}'"/>

<RespTransferMainnet />


### Transfer to a Multi-signature Address

The HTTP request body:

| Name | Type | Description |
| :----- | :---- | :---- |
| asset_id | UUID String | Asset ID. |
| opponent_multisig | Object | Multi-signature `{ "receivers": ["userid", "userid", ...], "threshold": 3 }`. |
| amount | String | e.g.: "0.01", supports up to 8 digits after the decimal point. |
| pin | String | Encrypted PIN. |
| trace_id | UUID String | Optional, used to prevent duplicate payment. |
| memo | UUID String | Optional, maximally 140 characters. |


<Request title="Transfer to Mainnet" method="POST" url="/transactions --data '{&quot;amount&quot;:&quot;10&quot;,&quot;asset_id&quot;:&quot;43d61dcd-e413-450d-80b8-101d5e903357&quot;,&quot;opponent_multisig&quot;:{&quot;receivers&quot;: [&quot;00c5a4ae-dcdc-48db-ab8e-a7eef69b441d&quot;,&quot;087e91ff-7169-451a-aaaa-5b3297411a4b&quot;,&quot;105f6e8b-d249-4b4d-9beb-e03cefaebc37&quot;], &quot;threshold&quot;: 2},&quot;memo&quot;:&quot;hello&quot;,&quot;pin&quot;:&quot;F39IsJmUaZW03VMV/01lHyY2RCoZ7/X764akX+EmthIc4uVsWAWQTM/IxX5Z9C1y&quot;,&quot;trace_id&quot;:&quot;7c67e8e8-b142-488b-80a3-61d4d29c90bf&quot;}'"/>

<RespTransferMultisig />
