---
title: 查询用户
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

根据用户 ID 获取用户信息。

<APIEndpoint url="/users/:id" />

<APIMetaPanel
  scope="PROFILE:READ"
  scopeNote="如授予 `PHONE:READ` 权限，可获取用户手机号"
/>

<APIParams p-id="待查询用户的 UUID" p-id-required={true} />

<APIRequest title="Get User Information by $USER_ID" url="/users/$USER_ID" />

<RespUserExtra />
