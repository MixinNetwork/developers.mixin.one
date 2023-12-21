---
title: 用户
sidebar_position: 1
---


import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
} from "@site/src/components/api";
import RespUserExtra from "@site/docs/_partials/_resp.user-extra.md";

## GET /users/:id

通过 User Id 获取一个用户的基本信息。

<APIEndpoint url="/users/:id" />

<APIMetaPanel
  scope="PROFILE:READ"
  scopeNote="如果用户授权了 `PHONE:READ` 会返回用户的手机号。"
/>

<APIParams p-id="用户的 User Id。" p-id-required={true} />

<APIRequest title="Get User Information by $USER_ID" url="/users/$USER_ID" />

<RespUserExtra />
