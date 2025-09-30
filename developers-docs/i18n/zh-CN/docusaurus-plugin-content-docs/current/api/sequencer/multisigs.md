---
title: 多签
description: 在 Sequencer 中创建、签名、解锁并查询多签交易。
---

import { APIEndpoint, APIPayload } from "@site/src/components/api";

import RespMultisigRequests from "@site/docs/_partials/_resp.safe.multisig.requests.md";
import RespMultisigRequest from "@site/docs/_partials/_resp.safe.multisig.request.md";

Sequencer 的多签流程与旧版 API 一致。客户端负责组装 Kernel 交易、收集所需签名，然后将负载提交给 Sequencer 进行校验与索引。

## 创建多签交易

<APIEndpoint url="/safe/multisigs" method="POST" />

<APIPayload>
{`[{
  "request_id": "UNIQUE-UUID",
  "raw": "KERNEL-RAW-TRANSACTION"
}]`}
</APIPayload>

<RespMultisigRequests />

## 签名多签请求

<APIEndpoint url="/safe/multisigs/:id/sign" method="POST" />

<APIPayload>
{`{
  "request_id": "UNIQUE-UUID",
  "raw": "KERNEL-RAW-TRANSACTION"
}`}
</APIPayload>

<RespMultisigRequest />

## 解锁未完成的多签

只有尚未达到签名阈值的多签请求可以被解锁。

<APIEndpoint url="/safe/multisigs/:id/unlock" method="POST" />

<APIPayload>
{`{
  "request_id": "UNIQUE-UUID",
  "raw": "KERNEL-RAW-TRANSACTION"
}`}
</APIPayload>

<RespMultisigRequest />

## 获取多签详情

<APIEndpoint url="/safe/multisigs/:id" method="GET" />

<RespMultisigRequest />
