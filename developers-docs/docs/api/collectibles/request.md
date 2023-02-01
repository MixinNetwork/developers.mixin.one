---
title: Send Collectibles Requests
sidebar_position: 3
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
  APIResponse,
} from "@site/src/components/api";

## Generating Collectibles Requests

### POST /collectibles/requests

Generate a collectibles request.

<APIEndpoint url="/collectibles/requests" />

<APIMetaPanel scope="Authorized" />

<APIPayload>{`{
  "action": "Operations: could be 'sign' or 'unlock'",
  "raw": "For transactions generated in accordance with the mainnet specifications"
}
`}</APIPayload>

:::info
`raw` is a transaction with mainnet specification. Refer to the implementation in Go and JS provided by our [code](https://github.com/MixinNetwork/multisig-bot/tree/main/common)
:::

<APIRequest
  title="POST collectible request"
  method="POST"
  url='/collectibles/requests --data &apos;{"action": "sign", "raw": "298281....4952f95768b7d1a925c4189b912c343dbb000180e"}&apos;'
/>

Request body data of the request

<APIResponse name="collectible_request" />

## Initiating A Collectible signature

### POST /collectibles/requests/:id/:action

<APIEndpoint url="/collectibles/requests/:id/:action" />

<APIMetaPanel scope="Authorized" />

<APIParams
  p-action="Operations: could be `sign`, `cancel`, and `unlock`"
  p-action-required={true}
  p-pin_base64="Encrypted PIN."
  p-pin-required={true}
/>

## how to generate TIP Pin

```
"TIP:COLLECTIBLE:REQUEST:SIGN:" + request_id

pin_base64 of sign multisig is the sha256-256 sum of above value

"TIP:COLLECTIBLE:REQUEST:UNLOCK:" + request_id

pin_base64 of unlock multisig is the sha256-256 sum of above value
```

<APIRequest
  title="operate the collectible request"
  method="POST"
  url='/collectibles/requests/:id/:action --data &apos;{"pin": "YOUR_PIN"}&apos;'
/>

Request body data of the request

<APIResponse name="collectible_request" />

## Operations

### Initiate or participate in signing

```json
// Generate collectible request.
POST /collectibles/requests
{
  "action": "sign",
  "raw":    "298281....000180e"
}

// Sign collectible request.
POST /collectibles/requests/:id/sign
```

### Cancel my signature

```json
// Generate collectible request.
POST /collectibles/requests
{
  "action": "cancel",
  "raw":    "298281....000180e"
}

// Send collectible cancelling request.
POST /collectibles/requests/:id/cancel
```

### Cancel collectibles

```json
// Generate collectible request.
POST /collectibles/requests
{
  "action": "unlock",
  "raw":    "298281....000180e"
}

// Send collectible unlocking request.
POST /collectibles/requests/:id/unlock
```
