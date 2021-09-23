---
title: Create Network Users
sidebar_position: 7
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespUserNet from "../../_partials/_resp.user-net.md";

## POST /users

Create a network user.

<APIEndpoint url="/users" />

<APIMetaPanel
  scope=""
  limitation="Only application user can create network users."
/>

<APIPayload>{`{
  // Ed25519 Public Key in Base64
  "session_secret": 'Ed25519 Public Key in Base64'
  // display name
  "full_name": 'A name'
}
`}</APIPayload>

<APIRequest
  title="Create Network User"
  method="POST"
  url='/users -data &apos;{"full_name": "Bot User","session_secret": SECRET}&apos;'
/>

<RespUserNet />
