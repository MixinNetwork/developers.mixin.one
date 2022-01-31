---
title: 出金アドレスの削除
sidebar_position: 5
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespAddress from "../../_partials/_resp.addr.md";

## POST /addresses/:addr_id/delete

アドレス`:addr_id`で指定されたアドレスを削除します。

<APIEndpoint url="/addresses/:addr_id/delete" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIParams
  p-addr_id="the address' id which you are deleting"
  p-addr_id-required={true}
/>

<APIPayload>{`{
  "pin":          "encrypted PIN",
}
`}</APIPayload>

<APIRequest
  title="Delete an ETH address"
  method="POST"
  url='/addresses/ba3a2e33-efde-40b9-9cac-c293f0d1a3f2/delete --data &apos;{"pin":"d2EJy5kmt56d3U5PeKm+TJLBnXBuyxBTcWxytL8pk/LXwJEak9r8iVMcASjgvoO+"}&apos;'
/>

```json title="Response"
{}
```

上記は、成功すると空のjsonを返します。

:::注意
出金先アドレスを編集するためのAPIはありません。プロダクトに「アドレスの編集」を実装する場合は、まず出金アドレスを削除してから追加してください。
:::
