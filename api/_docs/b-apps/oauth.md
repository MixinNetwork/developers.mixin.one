---
title: Oauth
category: APP
order: 1
---

As Mixin is a public blockchain, whose data is fully open to the world, all developers can use the blockchain to develop anything.

Mixin Messenger is the first app developed on the Mixin blockchain. To make things easier for both developers and end users, it's recommended to use the Mixin Messenger Open API to develop your apps.

## Create App

The first step to use the Mixin Messenger Open API is to create an app by visiting the Mixin Developers dashboard https://developers.mixin.one/dashboard.

Give your app a name and description, and define an OAuth callback URL, it may be a standard HTTP(S) link, or your own schema if you want to use the Mixin API in a client app. ![Mixin App](https://images.mixin.one/SWLWR9P7zQ2vu_BfNEBGFmZtQVKWj7fJu156FaVytQgdRghW8mUT7ar62jkvyY7W2vCccljlLtPP3OTSkaJAa1w)

## Request Authorization Code

The Mixin Messenger uses a slightly modified OAuth 2 protocol to manage user authentication and permissions. The first step is to request an authorization code by redirecting your user to the URL below.

` class="code">https://mixin.one/oauth/authorize?client_id=CLIENT_ID&amp;scope=SCOPE&amp;code_challenge=PKCE`

CLIENT_ID is the UUID of your app in Mixin Developers dashboard, and there are three supported available scopes for now.

* <strong>PROFILE:READ</strong> - all public user profile, including the Mixin ID, name and profile photo.
* <strong>PHONE:READ</strong> - the phone number of Mixin user.</li>
* <strong>ASSETS:READ</strong> - all the assets list, balances and transaction histories.

The code_challenge PKCE is optional, and only required if you are building a client app and don't want to expose your client secret. The only supported PKCE method is S256.

Then the user will be guided to scan the QR code on the authorization page, once they approved your request, the user will be redirected to your registered redirect URI in your Mixin Developers dashboard.

## Request Access Token

Once you have the authorization code and generate a pair of ed25519 key, make sure you have stored the private key of ed25519, you are ready to request an access token.

```
POST https://api.mixin.one/oauth/token
{
"client_id": "CLIENT_ID",
"code": "authorization code from step above",
"client_secret": "optional client secret",
"code_verifier": "optional PKCE code verifier",
"ed25519": "base64.RawURLEncoding.DecodeString('public key of ed25519')"
}
```

You must choose between the client_secret and code_verifier param, if you are requesting the API from your secret server, it's recommended to use client_secret. And if you are using the API in your client app, it's not safe to expose your client_secret there, you need to use the code_verifier along with code_challenge in step above.

If all correct, you will get a JSON response including the `ed25519 public key`, `authorization_id` and the scopes user have granted to your app. The scopes user granted may be less than what you requested.

## Sign OAuth Access Token

Before sign OAuth access token, a `request id` should be generated, and will be used later. then you can sign an access token like `AuthenticationToken` before. Following is example codes.

``` Golang
func SignOauthAccessToken(clientID, authorizationID, privateKey, method, uri, body, scp string, requestID string) (string, error) {
	expire := time.Now().UTC().Add(time.Hour * 24 * 30 * 3)
	sum := sha256.Sum256([]byte(method + uri + body))
	token := jwt.NewWithClaims(Ed25519SigningMethod, jwt.MapClaims{
		"iss": clientID,
		"aid": authorizationID,
		"iat": time.Now().UTC().Unix(),
		"exp": expire.Unix(),
		"sig": hex.EncodeToString(sum[:]),
		"scp": scp,
		"jti": requestID,
	})

	kb, err := base64.RawURLEncoding.DecodeString(privateKey)
	if err != nil {
		return "", err
	}
	priv := ed25519.PrivateKey(kb)
	return token.SignedString(priv)
}
```

## Access API

With the access token from step above, you can access the Mixin API if you have the requested permissions. Make sure to use the same `request_id` above generated.

```
GET -H "Authorization: Bearer ACCESS_TOKEN" -H "X-Request-Id: request_id from above" https://api.mixin.one/me

=&gt;

{
"data": {
"type": "user",
"user_id": "773e5e77-4107-45c2-b648-8fc722ed77f5",
"name": "Team Mixin",
"identity_number": "7000"
}
}
```
