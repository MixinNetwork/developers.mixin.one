---
title: OAuth 授权
sidebar_position: 2
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

机器人只能访问有限的用户信息。若要获取 Mixin Messenger 用户的资料、资产等数据，需要征得用户授权。

## 发起授权

```sass
GET https://www.mixin.one/oauth/authorize?client_id=CLIENT_ID&scope=PROFILE:READ+ASSETS:READ&response_type=code&return_to=
```

<APIParams
  p-client_id="应用的 client_id"
  p-client_id-required={true}
  p-scope="申请的权限"
  p-scope-required={true}
  p-response_type="使用 `code` 返回授权码"
  p-response_type-required={true}
  p-state="应用生成的随机字符串，用于后续校验"
/>

`state` 参数可选，结合 PKCE 可提升安全性，详情请参考 [https://www.oauth.com/oauth2-servers/pkce/authorization-request](https://www.oauth.com/oauth2-servers/pkce/authorization-request)。

<APIParams
p-client_id="应用的 client_id"
p-client_id-required={true}
p-scope="申请的权限"
p-scope-required={true}
p-response_type="使用 `code` 返回授权码"
p-response_type-required={true}
p-state="应用生成的随机字符串，用于后续校验"
p-code_challenge="应用生成的 code challenge，即 code verifier 的 SHA256 哈希，更多信息参见上述链接"
p-code_challenge_method="code challenge 的算法，请设置为 `SHA256`"
/>

## 获取访问令牌

用户授权成功后，页面会跳转到应用配置的 OAuth 回调地址，并携带授权码。开发者随后可使用该授权码获取签名所需的其他信息。

### POST /oauth/token

获取 OAuth 签名所需的参数。

<APIEndpoint url="/oauth/token" />

<APIPayload>{`{
  "client_id":      "用户授权给定的 client_id",
  "code":           "回调中返回的授权码",
  "client_secret":  "应用的 app secret",
  "code_verifier":  "",
  "ed25519":        "客户端生成的随机 ed25519 公钥，私钥需本地保存用于签名"
}
`}</APIPayload>

<APIRequest
  title="Get access token"
  method="POST"
  isPublic
  url="/oauth/token --data PAYLOAD"
/>

```json title="Response"
{
  "ed25519":        "服务器返回的随机 ed25519 公钥",
  "authorization_id": "本次授权的 ID",
  "scope": "用户授予的权限列表，例如 'PROFILE:READ ASSETS:READ'"
}
```

## 撤销授权

用户可在 Mixin Messenger 设置中撤销授权，或授权将在一年后过期。开发者需要妥善处理过期的令牌。
