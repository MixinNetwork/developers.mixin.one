---
title: OAuth Authorization
sidebar_position: 2
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

To access the profiles, assets, and other data of Mixin Messenger users, the developer needs to apply for authorization from the user.

## Requesting Authorization

```sass
GET https://www.mixin.one/oauth/authorize?client_id=CLIENT_ID&scope=PROFILE:READ+ASSETS:READ&response_type=code&return_to=
```

<APIParams
  p-client_id="Application client_id"
  p-client_id-required={true}
  p-scope="Requested permissions"
  p-scope-required={true}
  p-response_type="Use `code` to return authorization code"
  p-response_type-required={true}
  p-state="A random string generated by your application, which you’ll verify later."
  p-code_challenge="The code challenge generated by your app, it's a SHA256 hash of your code verifier. For more information about it, please https://www.oauth.com/oauth2-servers/pkce/authorization-request"
  p-code_challenge_method="The code challenge method, please set it to `SHA256`"
/>

## Get Access Token

After successful authorization, the page will automatically jump to the application's OAuth URL, the callback URL will be accompanied by the authorization code and return_to parameters, and the developer will then request a token based on the authorization code:

### POST /oauth/token

return the access token.

<APIEndpoint url="/oauth/token" />

<APIPayload>{`{
  "client_id":      "application's client_id",
  "code":           "authorization code returned by the successful authorization callback",
  "client_secret":  "application's app secret"
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
  "access_token": "user authorization token",
  "scope": "list of permissions that the user has given, e.g. 'PROFILE:READ ASSETS:READ'"
}
```

It is recommended that developers cache the access token and subsequently call the API to access the user data via the access token, to determine whether the user has authorized or not.

## Revoking Authorization

Users can find the bot and revoke authorization in Mixin Messenger Settings, Privacy and Security, Authorization. Note that revoking authorization will also clear the cached information of the current bot on the client-side, such as cookies.