---
title: Create Network Users
sidebar_position: 7
---


import Request from '../../_partials/request'
import RespUserNet from '../../_partials/_resp.user-net.md'

## POST /users

The HTTP request body:

| Parameter | Type | Intro |
| :----- | :----: | :---- |
| session_secret | String | Ed25519 Public Key in Base64 |
| full_name | String | Username |

<Request title="Create Network User" method="POST" url="/users -data '{&quot;full_name&quot;: &quot;Bot User&quot;,&quot;session_secret&quot;: SECRET}'"/>

<RespUserNet />
