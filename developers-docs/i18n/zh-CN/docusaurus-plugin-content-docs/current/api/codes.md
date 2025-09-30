---
title: Code 信息
sidebar_position: 51
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
} from "@site/src/components/api";

import RespUser from "@site/docs/_partials/_resp.codes-user.md";
import RespPayment from "@site/docs/_partials/_resp.codes-payment.md";
import RespMultisig from "@site/docs/_partials/_resp.codes-multisig.md";
import RespConversation from "@site/docs/_partials/_resp.codes-conversation.md";
import RespCollectibles from "@site/docs/_partials/_resp.codes-collectible.md";

## 获取 Code 信息

### GET /codes/:id

根据 code ID 查询对应的信息。

<APIEndpoint url="/codes/:id" />

<APIMetaPanel scope="Public" />

<APIRequest
  title="Get code information"
  url="/codes/f32a5130-94eb-4f8b-bb46-5b3735c10999"
  isPublic="true"
/>

#### Code 类型

| Code 类型         | 说明                         |
| ----------------- | ---------------------------- |
| User              | 用户的 code ID               |
| Conversation      | 会话的 code ID               |
| Payment           | 支付的 code ID               |
| Multisig Request  | 多签请求的 code ID           |
| Collectible       | 藏品交易的 code ID           |

<RespUser />
<RespConversation />
<RespPayment />
<RespMultisig />
<RespCollectibles />
