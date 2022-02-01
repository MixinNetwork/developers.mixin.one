---
title: ロボの共有
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

ユーザー、ロボともにホームページで3つのロボを共有できるように設定できるほか、チャット画面左下にある＋メニューから表示することも可能です。この機能により、口コミによるユーザー間でのロボの認知度を大きくあげることができます。

## 共有リストの取得

### GET /users/:user_id/apps/favorite

共有したロボ一覧を取得します。

<APIEndpoint url="/users/:user_id/apps/favorite" />

<APIMetaPanel scope="Authorized" />

<APIParams p-user_id="The user's user_id." p-user_id-required={true} />

<APIRequest
  title="Get share list"
  url="/users/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/apps/favorite"
/>

<RespApps />

## 共有の追加

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

## 共有から削除

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

成功時は空のjsonファイルを返します。
