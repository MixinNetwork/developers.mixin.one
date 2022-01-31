---
title: チャットの読み込み
sidebar_position: 1
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespConv from "../../_partials/_resp.conv.md";

## GET /conversations/:id

チャットグループIDよりチャット情報を取得します。

<APIEndpoint url="/conversations/:id" />

<APIMetaPanel scope="Authorized" />

<APIParams p-id="The conversation's id." p-id-required={true} />

<APIRequest
  title="Get Conversation info by ID"
  url="/conversations/928c5c40-769c-3e97-8387-fb1ae0645311"
/>

<RespConv />