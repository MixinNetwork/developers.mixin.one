---
title: 搜索
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

通过关键词搜索用户。关健词包括：

1. 用户的 Mixin Id  
1. 手机号


<APIEndpoint url="/search/:q" />

<APIMetaPanel
  scope="PROFILE:READ"
  limitation="为了避免恶意的抓取行为，该 API 会有访问限制，如果返回了 429 错误，需要过 12 小时，再次访问。"
/>

<APIParams p-q="用户的 Mixin ID 或者手机号" p-q-required={true} />

<APIRequest title="Search User by $KEYWORD" url="/search/$KEYWORD" />

<RespUser />
