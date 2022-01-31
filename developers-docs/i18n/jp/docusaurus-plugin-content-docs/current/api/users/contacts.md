---
title: 連絡先の取得
sidebar_position: 4
---

import {
  APIRequest,
  APIMetaPanel,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespUsers from "../../_partials/_resp.users.md";

## GET /friends

ユーザーの連絡先リストを取得します。

リストには、ユーザーとロボが含まれています。両者の区別は、`app`欄の有無で判断できます。

<APIEndpoint url="/friends" />

<APIMetaPanel scope="CONTACTS:READ" />

<APIRequest title="Read Contacts" url="/friends" />

<RespUsers />
