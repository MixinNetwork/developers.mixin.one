---
title: 获取用户 OAuth 授权
sidebar_position: 2
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

机器人如果要访问用户的一些信息，例如用户的手机号，联系人，资产等信息，就需要用户给机器人授权。

## 请求授权

```sass
GET https://www.mixin.one/oauth/authorize?client_id=CLIENT_ID&scope=PROFILE:READ+ASSETS:READ&response_type=code&return_to=
```

<APIParams
  p-client_id="机器人 client_id"
  p-client_id-required={true}
  p-scope="私有需要签名"
  p-scope-required={true}
  p-response_type="返回的 authorization code"
  p-response_type-required={true}
  p-state="可选项, 应用生成的 base64 的字符串. 详细介绍: https://auth0.com/docs/secure/attack-protection/state-parameters"
/>

可选项，利用 PKCE 增加安全性。详情链接: https://www.oauth.com/oauth2-servers/pkce/authorization-request , 下面的方式只是增加了安全性，并不影响上面的使用

<APIParams
  p-client_id="机器人 client_id"
  p-client_id-required={true}
  p-scope="私有需要签名"
  p-scope-required={true}
  p-response_type="返回的 authorization code"
  p-response_type-required={true}
  p-state="可选项, 应用生成的 base64 的字符串. 详细介绍: https://auth0.com/docs/secure/attack-protection/state-parameters"
  p-code_challenge="code challenge 由客户端生成 随机的 code verifier, 然后 SHA256 编码后的结果."
  p-code_challenge_method="默认 `SHA256`"
/>

## 获取访问令牌 (Access Token)

在上一步授权完成后，会拿到 authorization code, 然后根据 code 来获取其它的 OAuth 信息。

### POST /oauth/token

这一步主要是拿到 OAuth 签名所需要的信息, 用 OAuth 签名, [链接](/zh-CN/docs/api/guide#oauth-用户签名)

<APIEndpoint url="/oauth/token" />

<APIPayload>{`{
  "client_id":      "机器人的 client_id",
  "code":           "授权完成后返回的 authorization code",
  "client_secret":  "机器人的 secret",
  "code_verifier": "",
  "ed25519": "ed25519 的随机公钥，客户端需要保存私钥后面签名用",
}`}</APIPayload>

<APIRequest
  title="Get access token"
  method="POST"
  isPublic
  url="/oauth/token --data PAYLOAD"
/>

```json title="Response"
{
  "ed25519": "ed25519 的随机公钥",
  "scope": "用户授权的 scope, e.g. 'PROFILE:READ ASSETS:READ'"
  "authorization_id": "authorization 的 id",
}
```

## 取消授权

在授权之后，用户可以在 Mixin Messenger 中随时取消授权。 此外用户的授权有效期是一年，过期后还需要继续访问相关 API, 需要用户重新授权。

下一篇中我们会列出，机器人可以获取的用户的权限范围。
