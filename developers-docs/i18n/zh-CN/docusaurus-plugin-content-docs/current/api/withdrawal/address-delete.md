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

删除一个提现地址

<APIEndpoint url="/addresses/:addr_id/delete" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIParams
  p-addr_id="the address' id which you are deleting"
  p-addr_id-required={true}
/>

<APIPayload>{`{
  "pin_base64":   "加密后的 PIN",
}
`}</APIPayload>

## TIP Pin 结构

```
"TIP:ADDRESS:REMOVE:" + address_id

如果使用 TIP, pin_base64 是上面值的 sha256-256 的结果
```

<APIRequest
  title="Delete an ETH address"
  method="POST"
  url='/addresses/ba3a2e33-efde-40b9-9cac-c293f0d1a3f2/delete --data &apos;{"pin":"d2EJy5kmt56d3U5PeKm+TJLBnXBuyxBTcWxytL8pk/LXwJEak9r8iVMcASjgvoO+"}&apos;'
/>

如何删除成功，没有返回值

:::info
目前没有修改地址信息的 API, 如果需要修改旧的地址，可以先删除，然后再重新添加
:::
