---
title: 充值
description: 通过 Sequencer 申请充值地址并监控在途充值。
---

import { APIEndpoint, APIPayload } from "@site/src/components/api";

import RespEntry from "@site/docs/_partials/_resp.safe.entry.md";
import RespDeposits from "@site/docs/_partials/_resp.safe.deposits.md";

Sequencer 可以为单个用户或多签组提供充值地址，并在链上确认期间展示充值进度。

创建新地址会产生费用，不同网络的价格不同 [（费用说明）](https://discuss.mixin.one/questions/D1pB)：

- Ethereum、Bitcoin：每个地址 2 美元
- Polygon、BSC、Base、Litecoin、Dogecoin、Zcash、Solana、Monero、TRON、TON：每个地址 0.5 美元
- EOS、MobileCoin、Ripple：每次充值 0.1 美元

每笔充值也会收取费用，金额与网络相关，与充值数额无关：

- Ethereum、Bitcoin：每笔 3 美元
- Polygon、BSC、Base、Litecoin、Dogecoin、Zcash、Solana、Monero、TRON、TON：每笔 0.1 美元
- EOS、MobileCoin、Ripple：每笔 0.01 美元

## 申请充值地址

相同成员列表与阈值的重复调用会返回相同地址。

<APIEndpoint url="/safe/deposit/entries" method="POST" />

<APIPayload>
{`{
  "members": ["UUID-USER-1", "UUID-USER-2"],
  "threshold": 1,
  "chain_id": "CHAIN-UUID"
}`}
</APIPayload>

<RespEntry />

## 跟踪在途充值

查询仍在确认中的充值，便于向终端用户展示进度。

<APIEndpoint url="/safe/deposits?asset=UUID&destination=ADDRESS&tag=TAG&offset=RFC3339NANO&limit=500" method="GET" />

<RespDeposits />
