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

import RespTransfer from "../../_partials/_resp.transfer.md";

## POST /payments

Generate a multisig payment, user can pay to multisig account through code.

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
