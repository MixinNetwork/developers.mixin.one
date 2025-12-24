---
title: Sequencer Overview
description: Understand the architecture and prerequisites for the new Mixin Sequencer API stack.
---

The latest Mixin network landscape is built around Mixin Safe. The ecosystem now consists of two
primary services:

- **Mixin Kernel** – the layer that stores and validates transactions.
- **Mixin Sequencer** – an indexer that keeps user data, orders transactions, and exposes a
  simplified API surface on top of Kernel-compatible transactions.

Compared with the legacy Messenger APIs, Sequencer calls are lower level and decentralised. Every
operation ultimately proxies to the Kernel JSON-RPC interface, while the Sequencer adds discovery
and indexing so that Apps can quickly look up users, addresses, UTXOs, and transaction history.

Before you adopt the Sequencer APIs, make sure that your user or bot already migrated to the
latest TIP PIN format. All clients—whether human users or automation bots—must register with the
Sequencer service prior to issuing transactions or withdrawals. The next sections walk through each
area of the API in detail.
