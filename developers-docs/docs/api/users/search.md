---
title: Search
sidebar_position: 3
---

import {
  APIRequest,
  APIMetaPanel,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespUser from "../../_partials/_resp.user.md";

## GET /search/:q

search users by keyword `:q`

<APIEndpoint url="/search/:q" />

<APIMetaPanel
  scope="PROFILE:READ"
  limitation="In order to avoid malicious crawling of user data, this API has a request frequency limit. If a 429 error occurs, wait 12 hours and try again"
/>

<APIParams p-q="Mixin ID or mobile phone number." p-q-required={true} />

<APIRequest title="Search User by $KEYWORD" url="/search/$KEYWORD" />

<RespUser />
