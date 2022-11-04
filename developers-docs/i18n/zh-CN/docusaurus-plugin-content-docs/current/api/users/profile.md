---
title: 个人信息
sidebar_position: 1
---

import RespUserExtra from "../../_partials/_resp.user-extra.md";
import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
} from "@site/src/components/api";

## GET /me

获取当前用户的信息, 根据授权的不同返回的内容有区别，如果没有授权获取手机号，手机号就不会返回

<APIEndpoint url="/me" />

<APIMetaPanel
  scope="PROFILE:READ"
  scopeNote="If the `PHONE:READ` permission granted, you will obtain the user's mobile phone number"
/>

<APIRequest title="Get Profile" url="/me" />

<RespUserExtra />
