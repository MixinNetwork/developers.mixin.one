---
title: Sharing Bots
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

Both users and bots can be configured to share 3 bots on their personal pages, and they can also be displayed from the + menu in the lower left corner of the chat interface. This feature can greatly promote the spread of bots among users by word of mouth.

## Get Share List

### GET /users/:user_id/apps/favorite

Get the share bot list

<APIEndpoint url="/users/:user_id/apps/favorite" />

<APIMetaPanel scope="Authorized" />

<APIParams p-user_id="The user's user_id." p-user_id-required={true} />

<APIRequest
  title="Get share list"
  url="/users/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09/apps/favorite"
/>

<RespApps />

## Add to Shares

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

## Delete from Shares

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

Returns empty json on success.
