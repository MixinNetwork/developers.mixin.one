---
title: 读取联系人
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

获取用户的联系人列表。其中联系人，可能是 Messenger 用户，也可能是机器人。

<APIEndpoint url="/users/friends" />

<APIMetaPanel scope="CONTACTS:READ" />

<APIRequest title="Read Contacts" url="/users/friends" />

<RespUsers />
