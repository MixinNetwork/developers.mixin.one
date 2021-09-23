---
title: Delete Withdrawal Addresses
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

Delete a specified address by address :addr_id.

<APIEndpoint url="/addresses/:addr_id/delete" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIParams
  p-addr_id="the address' id which you are deleting"
  p-addr_id-required={true}
/>

<APIRequest
  title="Delete an ETH address"
  method="POST"
  url='/addresses/ba3a2e33-efde-40b9-9cac-c293f0d1a3f2/delete --data &apos;{"pin":"d2EJy5kmt56d3U5PeKm+TJLBnXBuyxBTcWxytL8pk/LXwJEak9r8iVMcASjgvoO+"}&apos;'
/>

<RespAddress />

The above will return an empty json on success.

:::info
There is no API for editing withdrawal addresses. If you want to implement editing in your product, please first delete and then add.
:::
