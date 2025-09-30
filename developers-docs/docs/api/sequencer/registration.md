---
title: Registration
description: Register users or bots with the Sequencer and verify their status.
---

import { APIEndpoint, APIPayload } from "@site/src/components/api";

import RespUser from "@site/docs/_partials/_resp.safe.me.md";

Before the Sequencer can index activity for a participant, that user (or bot) must register against
the new API. This process binds an Ed25519 public key and TIP-compatible PIN to the account.

## Check registration status

Use this endpoint to confirm whether a user is already onboarded to the Sequencer API:

<APIEndpoint url="/safe/me" method="GET" />

<RespUser />

## Register a user or bot

If the user is not registered, submit the public key, signature, and PIN payload to activate their
account. A dedicated ed25519 key pair per user is recommended to keep permissions isolated from the
Session secret.

<APIEndpoint url="/safe/users" method="POST" />

<APIPayload>
{`{
  "public_key": "ED25519-PUBLIC-KEY-HEX",
  "signature": "ED25519-SIGNATURE-OF-USER-UUID-HEX",
  "pin_base64": "TIP-PIN-BASE64"
}`}
</APIPayload>

<RespUser />

The signature should be derived from `sha256.Sum256([]byte("SEQUENCER:REGISTER:" + USER-UUID +
PUBLIC-KEY-HEX))`.
