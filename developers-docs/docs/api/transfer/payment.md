---
title: Generate a payment
sidebar_position: 10
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
  APIResponse,
} from "@site/src/components/api";

import RespTransfer from "@site/docs/_partials/_resp.transfer.md";

## POST /payments

There're two functions for this api

1. Create a multisig payment code:  
  a. the api needs authorization token  
  b. will response 403, if using an incorrect `trace_id`   
  c. the state will be paid if the payment existing, otherwise pending

1. Validate the payment parameters  
  a. the api is public, without authorization token  
  b. the state will be paid if the payment existing, otherwise pending

<APIEndpoint url="/payments" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIPayload>{`{
  "asset_id":     "the asset's asset_id which you are transferring",
  "amount":       "e.g.: "0.01", supports up to 8 digits after the decimal point",
  "trace_id":     "Used to prevent duplicate payment, optional",
  "memo":         "Maximally 200 characters, optional",
  "opponent_multisig": {
    "receivers":    "An array of users' id, Maximally 256",
    "threshold":    "number, must not bigger than the size of receivers",
  },
}
`}</APIPayload>

<APIRequest
  title="Generate a multisig payment"
  method="POST"
  url="/payments --data PAYLOAD"
/>

<APIResponse name="payment" />

### Validate payment parameters

<APIPayload>{`{
  "asset_id":     "the asset's asset_id which you are transferring",
  "amount":       "e.g.: "0.01", supports up to 8 digits after the decimal point",
  "trace_id":     "Used to prevent duplicate payment, optional",
  "opponent_id":  "optional，receiver's uuid",
  "address_id":   "optional，uuid",
  "destination":  "optional, withdrawal public key",
  "tag":          "optional, withdrawal memo"
}
`}</APIPayload>

<APIRequest
  title="Generate a multisig payment"
  method="POST"
  url='/payments --data {"asset_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa","amount":"0.01","trace_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa","memo":"","opponent_multisig":{"receivers":["c6d0c728-2624-429b-8e0d-d9d19b6592fa","c6d0c728-2624-429b-8e0d-d9d19b6592fa"],"threshold":1}}'
/>

<APIResponse name="payment" />

<APIRequest
  title="Validate payment"
  method="POST"
  url='/payments --data {"asset_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa","amount":"0.01","trace_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa","address_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa"}'
/>

<APIRequest
  title="Validate payment"
  method="POST"
  url='/payments --data {"asset_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa","amount":"0.01","trace_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa","opponent_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa"}'
/>

<APIRequest
  title="Validate payment"
  method="POST"
  url='/payments --data {"asset_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa","amount":"0.01","trace_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa","destination":"3GqjTwAwWyJ2YZ3v1vYPCkC4SzwVHLgivj","key":""}'
/>
