---
title: 删除提现地址
sidebar_position: 5
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespAddress from "@site/docs/_partials/_resp.addr.md";

## POST /addresses/:addr_id/delete

根据地址 ID 删除提现地址。

<APIEndpoint url="/addresses/:addr_id/delete" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIParams
  p-addr_id="要删除的地址 ID"
  p-addr_id-required={true}
/>

<APIPayload>{`{
  "pin": "加密后的 PIN"
}
`}</APIPayload>

<APIRequest
  title="Delete an ETH address"
  method="POST"
  url='/addresses/ba3a2e33-efde-40b9-9cac-c293f0d1a3f2/delete --data &apos;{"pin":"d2EJy5kmt56d3U5PeKm+TJLBnXBuyxBTcWxytL8pk/LXwJEak9r8iVMcASjgvoO+"}&apos;'
/>

<APIPayload>{`{
  "pin_base64": "加密后的 PIN"
}
`}</APIPayload>

## 生成 TIP PIN

```
"TIP:ADDRESS:REMOVE:" + address_id

pin_base64 为上述字符串的 sha256-256 摘要
```

```json title="Response"
{}
```

成功返回空 JSON。

:::info
当前没有编辑提现地址的 API。如需实现修改功能，请先删除后重新添加。
:::
