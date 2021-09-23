---
title: Send Raw Transactions
sidebar_position: 2
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespTransferMainnet from "../../_partials/_resp.transfer-mainnet.md";
import RespTransferMultisig from "../../_partials/_resp.transfer-multisig.md";

## POST /transactions

It's possible send raw transactions to the mainnet. This API supports two kinds of address: mainnet address and the multisig address.

### Transfer to a Mainnet Address

Transfer to a specified mainnet address.

<APIEndpoint url="/transactions" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIPayload>{`{
  "asset_id":     "the asset's asset_id which you are transferring",
  "opponent_id":  "the mainnet address which you are transferring",
  "amount":       "e.g.: "0.01", supports up to 8 digits after the decimal point",
  "pin":          "Encrypted PIN",
  "trace_id":     "Used to prevent duplicate payment, optional",
  "memo":         "Maximally 140 characters, optional",
}
`}</APIPayload>

<APIRequest
  title="Transfer to Mainnet"
  method="POST"
  url='/transactions --data &apos;{"amount":"10","asset_id":"43d61dcd-e413-450d-80b8-101d5e903357","opponent_key":"XINDEhAA8ArWDJBF5fJQvrtKdZQ4X28KmkScm5FtwdJGx9CiB1Hjadk4baMLMRjsGY5L8QDbVKuC7jvep1m8k4zZN7BGvvXP","memo":"hello","pin":"F39IsJmUaZW03VMV/01lHyY2RCoZ7/X764akX+EmthIc4uVsWAWQTM/IxX5Z9C1y","trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf"}&apos;'
/>

<RespTransferMainnet />

### Transfer to a Multi-signature Address

Transfer to a specified multisig address.

<APIEndpoint url="/transactions" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIPayload>{`{
  "asset_id":     "the asset's asset_id which you are transferring",
  "opponent_multisig":  "the multi-signature object, identify the address which you are transferring",
  "amount":       "e.g.: "0.01", supports up to 8 digits after the decimal point",
  "pin":          "Encrypted PIN",
  "trace_id":     "Used to prevent duplicate payment, optional",
  "memo":         "Maximally 140 characters, optional",
}
`}</APIPayload>

```json title="opponent_multisig"
{
  "receivers": [
    "user_id",
    "user_id",
    ...
  ],
  "threshold": 3
}
```

<APIRequest
  title="Transfer to Mainnet"
  method="POST"
  url='/transactions --data &apos;{"amount":"10","asset_id":"43d61dcd-e413-450d-80b8-101d5e903357","opponent_multisig":{"receivers": ["00c5a4ae-dcdc-48db-ab8e-a7eef69b441d","087e91ff-7169-451a-aaaa-5b3297411a4b","105f6e8b-d249-4b4d-9beb-e03cefaebc37"], "threshold": 2},"memo":"hello","pin":"F39IsJmUaZW03VMV/01lHyY2RCoZ7/X764akX+EmthIc4uVsWAWQTM/IxX5Z9C1y","trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf"}&apos;'
/>

<RespTransferMultisig />
