---
title: UTXO 输出
description: 获取 UTXO 集，以便为用户或多签组计算余额。
---

import { APIEndpoint } from "@site/src/components/api";

import RespOutputs from "@site/docs/_partials/_resp.safe.outputs.md";

由于 Sequencer 是对 Mixin Kernel 的轻量代理，余额由未花费交易输出（UTXO）决定。调用接口获取当前的 UTXO 集，然后在客户端聚合属于目标用户或多签组的数值，从而得出余额。

<APIEndpoint url="/safe/outputs?members=HASH&threshold=NUMBER&offset=NUMBER&limit=NUMBER&state=unspent&order=ASC" method="GET" />

<RespOutputs />

`offset` 参数为纯数字，而非基于时间的游标：每个 Sequencer UTXO 都拥有自增序号，便于您按顺序分页。
