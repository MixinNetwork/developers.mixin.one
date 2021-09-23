---
title: 分享机器人
sidebar_position: 13
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespApps from "../_partials/_resp.apps.md";

用户和机器人都可以在自己的个人页面上配置分享 3 个机器人，这个分享也会出现在聊天界面左下角的+菜单中。

此功能有助于机器人通过口耳相传，促进机器人在用户中的传播。

## 获得分享列表

### GET /users/:user_id/apps/favorite

返回指定用户分享的机器人的列表

<APIEndpoint url="/users/:user_id/apps/favorite" />

<APIMetaPanel scope="Authorized" />

<APIParams p-user_id="The user's user_id." p-user_id-required={true} />

<APIRequest
  title="Get share list"
  url="/users/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/apps/favorite"
/>

<RespApps />

## 添加到自己分享列表

### POST /apps/:client_id/favorite

<APIEndpoint url="/apps/:client_id/favorite" />

<APIMetaPanel scope="Authorized" />

<APIParams
  p-client_id="The application's client_id who you are adding to your share list."
  p-client_id-required={true}
/>

<APIRequest
  title="Add to share list"
  method="POST"
  url="/apps/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/favorite"
/>

<RespApps />

## 从分享列表中移除

### POST /apps/:client_id/unfavorite

<APIEndpoint url="/apps/:client_id/unfavorite" />

<APIMetaPanel scope="Authorized" />

<APIParams
  p-client_id="The application's client_id who you are removing from your share list."
  p-client_id-required={true}
/>

<APIRequest
  title="Delete from share list"
  method="POST"
  url="/apps/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/unfavorite"
/>

成功时返回空的 json。
