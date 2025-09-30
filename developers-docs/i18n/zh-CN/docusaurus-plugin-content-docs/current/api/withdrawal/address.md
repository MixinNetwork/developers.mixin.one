---
title: 查询提现地址
sidebar_position: 3
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespAddress from "@site/docs/_partials/_resp.addr.md";

## GET /addresses/:addr_id

根据地址 ID 获取提现地址。

<APIEndpoint url="/addresses/:addr_id" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIParams
  p-addr_id="要查询的地址 ID"
  p-addr_id-required={true}
/>

<APIRequest
  title="Get an address"
  url="/addresses/ba3a2e33-efde-40b9-9cac-c293f0d1a3f2"
/>

<RespAddress />
