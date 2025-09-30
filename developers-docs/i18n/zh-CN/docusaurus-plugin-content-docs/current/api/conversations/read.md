---
title: 查看会话
sidebar_position: 1
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespConv from "@site/docs/_partials/_resp.conv.md";

## GET /conversations/:id

根据会话 ID 获取会话信息。

<APIEndpoint url="/conversations/:id" />

<APIMetaPanel scope="Authorized" />

<APIParams p-id="会话 ID" p-id-required={true} />

<APIRequest
  title="Get Conversation info by ID"
  url="/conversations/928c5c40-769c-3e97-8387-fb1ae0645311"
/>

<RespConv />
