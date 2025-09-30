---
title: Transactions
description: Construct, verify, and broadcast Sequencer transactions.
---

import { APIEndpoint, APIPayload } from "@site/src/components/api";

import RespGhosts from "@site/docs/_partials/_resp.safe.ghosts.md";
import RespRequests from "@site/docs/_partials/_resp.safe.requests.md";
import RespRequest from "@site/docs/_partials/_resp.safe.request.md";

Sequencer transactions are Kernel-compatible. Clients assemble the full transaction locally, gather
signatures, and then ask the Sequencer to verify and relay it to the network.

## Fetch payment information

When transferring to another Sequencer user or multisig group, obtain their one-time payment
information first. Withdrawals that target Kernel addresses do not require this step.

<APIEndpoint url="/safe/keys" method="POST" />

<APIPayload>
{`[{
  "receivers": ["USER-1-UUID", "USER-2-UUID"],
  "index": 3,
  "hint": "UNIQUE-UUID"
}]`}
</APIPayload>

<RespGhosts />

## Verify transaction structure

Submit the constructed raw transaction to Sequencer to validate its format. The response includes
view-key signatures aligned with each input to help you complete the final signature pass.

<APIEndpoint url="/safe/transaction/requests" method="POST" />

<APIPayload>
{`[{
  "request_id": "UNIQUE-UUID",
  "raw": "KERNEL-RAW-TRANSACTION"
}]`}
</APIPayload>

<RespRequests />

## Broadcast the transaction

After attaching your own Ed25519 signatures, push the final transaction back to Sequencer so it can
relay it to the mainnet and keep the index in sync.

<APIEndpoint url="/safe/transaction" method="POST" />

<APIPayload>
{`[{
  "request_id": "UNIQUE-UUID",
  "raw": "KERNEL-RAW-TRANSACTION"
}]`}
</APIPayload>

<RespRequests />

Avoid broadcasting directly to the Kernel RPC: doing so prevents Sequencer from indexing the
transaction and breaks downstream queries.

## Query transaction status

Look up the state of a transaction by its request UUID after broadcasting.

<APIEndpoint url="/safe/transactions/:id" method="GET" />

<RespRequest />
