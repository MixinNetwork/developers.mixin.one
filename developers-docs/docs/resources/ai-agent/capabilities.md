---
title: Capabilities
sidebar_position: 4
---

# Capabilities

[mixin-skills](https://github.com/LixvYang/mixin-skills) loads Mixin guidance according to the development task, helping AI assistants generate code that is closer to official SDK usage.

## Skills Coverage

| Skill | Covers |
|-------|--------|
| `mixin-bot` | Keystore loading, JWT auth, messaging, Blaze WebSocket, conversation management |
| `mixin-safe` | Safe UTXO transfers, withdrawals, ghost keys, MixAddress, asset and snapshot queries |
| `mixin-computer` | Mixin Computer client, AddUser, SystemCall |
| `mixin-mtg-multisig` | MTG programs, observer / signer, FROST signing sessions |
| `mixin-oauth` | Mixin OAuth login, including frontend PKCE and backend `client_secret` flows |

## Messaging

| Action | Related SDK / API |
|--------|-------------------|
| Send text message | `client.message.sendText(userId, text)` |
| Send an App Card | `client.message.sendLegacy({ category: "APP_CARD", ... })` |
| Receive realtime messages | Blaze WebSocket loop |
| Create / manage group | `client.conversation.create()` |

## Wallet and Assets

| Action | Related SDK / API |
|--------|-------------------|
| Query Safe balances | Aggregate UTXOs returned by `client.utxo.safeOutputs()` |
| Fetch asset metadata | `client.safe.fetchAssets([assetId])` |
| Query balance changes | `/safe/snapshots` or the SDK Safe snapshots method |

## Transfers

All Safe transfers, withdrawals, and multisig asset operations require `spend_private_key`.

| Action | Example |
|--------|---------|
| Transfer to a user | [05-transfer](https://github.com/LixvYang/mixin-ai-agent-demo/blob/main/examples/05-transfer.mjs) |
| Transfer all assets | `safe-transfer-all.mjs` in the `mixin-safe` skill |

## OAuth

Use the `mixin-oauth` skill when you want users to sign in to a web app with Mixin. Backend authorization-code exchange requires `client_secret` from the developer dashboard. The frontend PKCE flow does not put `client_secret` in the browser.

See the [OAuth API documentation](/docs/api/oauth) for more details.
