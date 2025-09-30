---
title: 铭刻
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

# Mixin 铭刻 API

本文介绍铭刻相关概念。关于部署或铭刻的详细步骤可参考：https://github.com/MixinNetwork/mixin/blob/master/INSCRIPTION.md

默认情况下，交易 memo 长度小于 256 字节；若超过该长度，需要使用 Mixin 对象存储，参见：https://github.com/MixinNetwork/mixin/blob/master/STORAGE.md

:::info
1. 如何区分普通交易与铭刻交易，请参考 [Sequencer API](./sequencer/overview)。若交易包含 `inscription_hash` 字段，即为铭刻交易。
2. 铭刻交易同样是 UTXO 交易。转移藏品时必须直接花费对应的 UTXO，不能拆分或合并，因此铭刻交易只能包含 1 个输入和 1 个输出。
3. 如果不慎释放了藏品，可以按照上述铭刻文档，通过新的占位交易重新占用。
:::

铭刻包含两个部分：

1. 铭刻的合集（Collection）
2. 铭刻的藏品（Collectible）

## 获取合集详情

通过部署交易哈希或资产的 kernel_asset_id 获取合集详情。

<APIEndpoint url="/safe/inscriptions/collections/:hash" method="GET" />

<RespCollection />

## 获取藏品详情

根据铭刻哈希获取藏品详情。

<APIEndpoint url="/safe/inscriptions/items/:hash" method="GET" />

<RespItem />
