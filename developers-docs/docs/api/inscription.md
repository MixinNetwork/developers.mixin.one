---
title: Inscription
sidebar_position: 3
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespCollection from "@site/docs/_partials/_req.inscription.collection.md";
import RespItem from "@site/docs/_partials/_req.inscription.item.md";

# Mixin Inscription API

In this post We'll explain inscription. For Inscription deploy or inscribe, you can refer to this doc https://github.com/MixinNetwork/mixin/blob/master/INSCRIPTION.md

In default, the memo of the transaction is less than 256 bytes, if the memo large than that, we need to use Mixin Object Storage, refer to https://github.com/MixinNetwork/mixin/blob/master/STORAGE.md

Inscription include two sections

1. Collection of inscription
2. Collectible of inscription

## How to get the detail of collection

Fetch the collection detail by the deploy transaction hash, or the kernel_asset_id of the asset.

<APIEndpoint url="/inscriptions/collections/:hash" method="GET" />

<RespCollection />

## How to get the detail of the collectible

Fetch the collectible by the inscription hash

<APIEndpoint url="/inscriptions/items/:hash" method="GET" />

<RespItem />
