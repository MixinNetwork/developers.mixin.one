---
title: Multisigs
description: Create, sign, unlock, and inspect Sequencer multisig transactions.
---

import { APIEndpoint, APIPayload } from "@site/src/components/api";

import RespMultisigRequests from "@site/docs/_partials/_resp.safe.multisig.requests.md";
import RespMultisigRequest from "@site/docs/_partials/_resp.safe.multisig.request.md";

Sequencer multisig flows mirror the legacy API. Clients assemble Kernel transactions, gather the
required signatures, and submit the payload to the Sequencer for verification and indexing.

## Create a multisig transaction

<APIEndpoint url="/safe/multisigs" method="POST" />

<APIPayload>
{`[{
  "request_id": "UNIQUE-UUID",
  "raw": "KERNEL-RAW-TRANSACTION"
}]`}
</APIPayload>

<RespMultisigRequests />

## Sign a multisig request

<APIEndpoint url="/safe/multisigs/:id/sign" method="POST" />

<APIPayload>
{`{
  "request_id": "UNIQUE-UUID",
  "raw": "KERNEL-RAW-TRANSACTION"
}`}
</APIPayload>

<RespMultisigRequest />

## Unlock an incomplete multisig

Only multisig requests that have not yet reached the required signature threshold can be unlocked.

<APIEndpoint url="/safe/multisigs/:id/unlock" method="POST" />

<APIPayload>
{`{
  "request_id": "UNIQUE-UUID",
  "raw": "KERNEL-RAW-TRANSACTION"
}`}
</APIPayload>

<RespMultisigRequest />

## Fetch multisig details

<APIEndpoint url="/safe/multisigs/:id" method="GET" />

<RespMultisigRequest />
