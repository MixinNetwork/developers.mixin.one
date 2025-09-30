---
title: 获取联系人
sidebar_position: 4
---

import {
  APIRequest,
  APIMetaPanel,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespUsers from "@site/docs/_partials/_resp.users.md";

## GET /friends

获取用户的联系人列表。

结果同时包含用户与机器人，可通过是否存在 app 字段判断是否为机器人。

<APIEndpoint url="/friends" />

<APIMetaPanel scope="CONTACTS:READ" />

<APIRequest title="Read Contacts" url="/friends" />

<RespUsers />
