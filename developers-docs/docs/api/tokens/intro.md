---
title: Introduction
sidebar_position: 1
---


Mixin Asset is Mixin Network's unified abstraction for a transferable value. No matter which chain an asset comes from (BTC, ETH, Solana, etc.) or whether it is a contract token on that chain, it will be returned as an `asset` object in the Mixin API.

## Key Fields

- **asset_id**
  - The unique identifier of an asset across the entire Mixin Network.
  - Usually used to specify the asset you want to operate on in API calls, for example the withdrawal address API `GET /safe/assets/:asset_id`.
- **chain_id**
  - The identifier of the chain/network the asset belongs to (describes the underlying blockchain/network).
  - A single `chain_id` can have multiple assets (for example, multiple tokens on the same chain).

## Typical Use Cases

- **Query asset information**: get basic token information such as name, symbol, icon, etc.
- **Get withdrawal fee**: read the fee required when withdrawing this asset.

Related `asset_id`s can be searched at https://mixin.space/.
