---
title: Codes
sidebar_position: 51
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
} from "@site/src/components/api";

import RespUser from "../_partials/_resp.codes-user.md";
import RespPayment from "../_partials/_resp.codes-payment.md";
import RespMultisig from "../_partials/_resp.codes-multisig.md";
import RespConversation from "../_partials/_resp.codes-conversation.md";
import RespCollectibles from "../_partials/_resp.codes-collectible.md";

## Get code information

### GET /codes/:id

Get the code information by code ID.

<APIEndpoint url="/codes/:id" />

<APIMetaPanel scope="Public" />

<APIRequest
  title="Get code information"
  url="/codes/f32a5130-94eb-4f8b-bb46-5b3735c10999"
  isPublic="true"
/>

#### Code types

| Type of code            | Description                           |
| ----------------------- | ------------------------------------- |
| User                    | Code ID of a user.                    |
| Conversation            | Code ID of a conversation.            |
| Payment                 | Code ID of a payment.                 |
| Multisig Request        | Code ID of a multi-signature request. |
| Collectible             | Code ID of a collectible transaction. |


<RespUser />
<RespConversation />
<RespPayment />
<RespMultisig />
<RespCollectibles />
