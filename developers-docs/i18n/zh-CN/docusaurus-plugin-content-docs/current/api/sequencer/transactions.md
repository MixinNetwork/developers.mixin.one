---
title: 交易
description: 构建、校验并广播 Sequencer 交易。
---

import { APIEndpoint, APIPayload } from "@site/src/components/api";

import RespGhosts from "@site/docs/_partials/_resp.safe.ghosts.md";
import RespRequests from "@site/docs/_partials/_resp.safe.requests.md";
import RespRequest from "@site/docs/_partials/_resp.safe.request.md";

Sequencer 交易与 Kernel 完全兼容。客户端需要在本地组装完整交易、收集签名，再让 Sequencer 验证并转发到网络。

## 获取支付信息

当向另一位 Sequencer 用户或多签组转账时，首先获取他们的一次性支付信息。针对 Kernel 地址的提现则无需此步骤。

<APIEndpoint url="/safe/keys" method="POST" />

<APIPayload>
{`[{
  "receivers": ["USER-1-UUID", "USER-2-UUID"],
  "index": 3,
  "hint": "UNIQUE-UUID"
}]`}
</APIPayload>

<RespGhosts />

## 校验交易结构

将已构建的原始交易提交给 Sequencer，用于验证格式。响应中会返回与每个输入对应的 view-key 签名，帮助您完成最终签名。

<APIEndpoint url="/safe/transaction/requests" method="POST" />

<APIPayload>
{`[{
  "request_id": "UNIQUE-UUID",
  "raw": "KERNEL-RAW-TRANSACTION"
}]`}
</APIPayload>

<RespRequests />

## 广播交易

附加自己的 Ed25519 签名后，将最终交易推送回 Sequencer，使其转发至主网并保持索引同步。

<APIEndpoint url="/safe/transaction" method="POST" />

<APIPayload>
{`[{
  "request_id": "UNIQUE-UUID",
  "raw": "KERNEL-RAW-TRANSACTION"
}]`}
</APIPayload>

<RespRequests />

请避免直接向 Kernel RPC 广播交易，否则 Sequencer 将无法建立索引，后续查询也会失效。

## 查询交易状态

广播之后，可通过请求 UUID 查询交易状态。

<APIEndpoint url="/safe/transactions/:id" method="GET" />

<RespRequest />
