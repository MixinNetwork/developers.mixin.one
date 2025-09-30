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

import RespApps from "@site/docs/_partials/_resp.apps.md";

用户和机器人都可以在个人页面配置最多 3 个分享的机器人，同时会展示在聊天界面左下角的 + 菜单中。借助该功能可以通过口口相传提升机器人传播效率。

## 获取分享列表

### GET /users/:user_id/apps/favorite

查询用户分享的机器人列表。

<APIEndpoint url="/users/:user_id/apps/favorite" />

<APIMetaPanel scope="Authorized" />

<APIParams p-user_id="用户 ID" p-user_id-required={true} />

<APIRequest
  title="Get share list"
  url="/users/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/apps/favorite"
/>

<RespApps />

## 添加分享

### POST /apps/:client_id/favorite

<APIEndpoint url="/apps/:client_id/favorite" />

<APIMetaPanel scope="Authorized" />

<APIParams
  p-client_id="要添加到分享列表的应用 client_id"
  p-client_id-required={true}
/>

<APIRequest
  title="Add to share list"
  method="POST"
  url="/apps/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/favorite"
/>

<RespApps />

## 移除分享

### POST /apps/:client_id/unfavorite

<APIEndpoint url="/apps/:client_id/unfavorite" />

<APIMetaPanel scope="Authorized" />

<APIParams
  p-client_id="要从分享列表移除的应用 client_id"
  p-client_id-required={true}
/>

<APIRequest
  title="Delete from share list"
  method="POST"
  url="/apps/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/unfavorite"
/>

成功返回空 JSON。
