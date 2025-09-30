---
title: Deposit
description: Request deposit addresses and monitor in-flight deposits through the Sequencer.
---

import { APIEndpoint, APIPayload } from "@site/src/components/api";

import RespEntry from "@site/docs/_partials/_resp.safe.entry.md";
import RespDeposits from "@site/docs/_partials/_resp.safe.deposits.md";

The Sequencer can supply deposit addresses for individual users or multisig groups and expose the
status of pending deposits while they confirm on-chain.

## Request a deposit address

Repeated calls return the same address for a given member set and threshold.

<APIEndpoint url="/safe/deposit/entries" method="POST" />

<APIPayload>
{`{
  "members": ["UUID-USER-1", "UUID-USER-2"],
  "threshold": 1,
  "chain_id": "CHAIN-UUID"
}`}
</APIPayload>

<RespEntry />

## Track pending deposits

Lookup deposits that are still being confirmed so that you can surface progress to end users.

<APIEndpoint url="/safe/deposits?asset=UUID&destination=ADDRESS&tag=TAG&offset=RFC3339NANO&limit=500" method="GET" />

<RespDeposits />
