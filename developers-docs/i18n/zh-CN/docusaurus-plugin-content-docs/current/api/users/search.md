---
title: 搜索用户
sidebar_position: 3
---

import {
  APIRequest,
  APIMetaPanel,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespUser from "@site/docs/_partials/_resp.user.md";

## GET /search/:q

根据关键字 `:q` 搜索用户。

<APIEndpoint url="/search/:q" />

<APIMetaPanel
  scope="PROFILE:READ"
  limitation="为避免恶意抓取，接口有频率限制。如遇 429 错误，请等待 12 小时后重试"
/>

<APIParams p-q="Mixin ID 或手机号" p-q-required={true} />

<APIRequest title="Search User by $KEYWORD" url="/search/$KEYWORD" />

<RespUser />
