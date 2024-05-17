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

本篇我们主要介绍 inscription 相关的 API 调用，关于 Inscription 的部署跟铭记，可以参考该协议: https://github.com/MixinNetwork/mixin/blob/master/INSCRIPTION.md

默认情况下，交易的 memo 长度是 256 byte, 所以 inscription 的部署需要用到 Mixin Object Storage, 相关的内容可以参考：https://github.com/MixinNetwork/mixin/blob/master/STORAGE.md

Inscription 主要包含两部分:

1. 藏品的集合, 包含的图片跟币的相关信息
2. 单个的藏品, 主要包含

## 获取集合信息

通过集合的交易 hash, 或者这个集合资产的 kernel_asset_id 来获取集合的详细信息

<APIEndpoint url="/inscriptions/collections/:hash" method="GET" />

<RespCollection />

## 获取藏品信息

通过 inscription hash 来获取藏品的详情

<APIEndpoint url="/inscriptions/items/:hash" method="GET" />

<RespItem />
