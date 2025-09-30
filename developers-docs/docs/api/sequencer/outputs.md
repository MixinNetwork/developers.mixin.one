---
title: Outputs
description: Retrieve UTXO sets to compute balances for users or multisig groups.
---

import { APIEndpoint } from "@site/src/components/api";

import RespOutputs from "@site/docs/_partials/_resp.safe.outputs.md";

Because Sequencer is a thin proxy over the Mixin Kernel, balances are derived from unspent
transaction outputs. Fetch the current UTXO set, aggregate the values that belong to your user or
multisig group, and derive balances client-side.

<APIEndpoint url="/safe/outputs?members=HASH&threshold=NUMBER&offset=NUMBER&limit=NUMBER&state=unspent&order=ASC" method="GET" />

<RespOutputs />

The `offset` parameter is numeric rather than time-based: every Sequencer UTXO has an incremental
sequence number so you can paginate deterministically.
