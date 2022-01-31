---
title: プロフィールの取得
sidebar_position: 1
---

import RespUserExtra from "../../_partials/_resp.user-extra.md";
import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
} from "@site/src/components/api";

## GET /me

既存ユーザーの個人データを取得します。

<APIEndpoint url="/me" />

<APIMetaPanel
  scope="PROFILE:READ"
  scopeNote="If the `PHONE:READ` permission granted, you will obtain the user's mobile phone number"
/>

<APIRequest title="Get Profile" url="/me" />

<RespUserExtra />
