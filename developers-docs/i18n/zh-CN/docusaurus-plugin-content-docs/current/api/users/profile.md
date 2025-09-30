---
title: 获取个人信息
sidebar_position: 1
---

import RespUserExtra from "@site/docs/_partials/_resp.user-extra.md";
import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
} from "@site/src/components/api";

## GET /me

获取当前用户的个人资料。

<APIEndpoint url="/me" />

<APIMetaPanel
  scope="PROFILE:READ"
  scopeNote="如授予 `PHONE:READ` 权限，可同时获取用户手机号"
/>

<APIRequest title="Get Profile" url="/me" />

<RespUserExtra />
