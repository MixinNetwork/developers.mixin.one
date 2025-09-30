---
title: 发送与查询转账
sidebar_position: 1
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespTransfer from "@site/docs/_partials/_resp.transfer.md";

## POST /transfers

向指定用户转账。

<APIEndpoint url="/transfers" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIPayload>{`{
  "asset_id":     "转出的资产 ID",
  "opponent_id":  "收款方的用户 ID",
  "amount":       "例如 \"0.01\"，支持小数点后最多 8 位",
  "pin":          "加密后的 PIN",
  "trace_id":     "用于防止重复支付，可选",
  "memo":         "备注，可选，最多 200 个字符"
}
`}</APIPayload>

<APIRequest
  title="Send Transfer"
  method="POST"
  url="/transfers --data PAYLOAD"
/>

<RespTransfer />

:::caution
- 转账接口一旦调用成功即表示所有节点已确认，数据不可逆。
- 不能向自己转账。
- 加密后的 PIN 只能使用一次，每次转账都需要重新加密。
- 强烈建议使用 `trace_id` 处理重复转账问题，并在转账时始终携带该参数。
- 如遇到 500 错误，请重新发起转账。
- 若需要处理高并发交易（每秒数百到数千笔），建议使用多个账号分担转账并发送交易。
- 转账失败时请关注返回错误中的 `extra` 字段。
- 如果出现 `20119`（密码错误），请勿继续重试，建议调用 [PIN 验证](/docs/api/pin/pin-verify) 接口确认。
:::
