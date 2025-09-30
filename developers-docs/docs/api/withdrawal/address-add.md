---
title: Create Withdrawal Addresses
sidebar_position: 4
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespAddress from "@site/docs/_partials/_resp.addr.md";

## POST /addresses

Create a new withdrawal address.

<APIEndpoint url="/addresses" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIPayload>{`{
  "asset_id":     "the asset's asset_id",
  "label":        "the label for the address, Min: 1, Max: 64",
  "destination":  "the withdrawal address, Max 128",
  "tag":          "Optional, the withdrawal memo",
  "pin_base64":   "encrypted PIN",
}
`}</APIPayload>

## How to generate TIP Pin

```
"TIP:ADDRESS:ADD:" + asset_id + destination + tag + label

pin_base64 is the sha256-256 sum of above value
```

<APIRequest
  title="Create an ETH address"
  method="POST"
  url='/addresses --data &apos;{"asset_id":"43d61dcd-e413-450d-80b8-101d5e903357","label":"Jason ETH Address","pin":"nRF5OyFmO4REG6lcPk1jwKDJrENim791uLe+HH0g7EwQHXK9FgCMJl5RDKbeCNDW","destination":"0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0", "tag": "", "label": ""}&apos;'
/>

<RespAddress />
