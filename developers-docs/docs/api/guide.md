---
title: API Guide
sidebar_position: 1
---

Most API access is available for signed requests with private key, which can be downloaded from [dashboard](https://developers.mixin.one/dashboard).

There are three kinds of signature in Mixin:
1. JWT signature of bot to access private API, [details](#calling-apis)
2. JWT signature of OAuth user to access private API, [details](#oauth-user-signature)
3. PIN signature to transfer, withdraw and create withdraw addresses, [details](#pin-signature)

## Choosing An API Server

For HTTP requests:

| Domain                         | Type            |
| :----------------------------- | :-------------- |
| [https://api.mixin.one](https://api.mixin.one)          | Global          |

For WebSocket requests:

| Domain                         | Type            |
| :----------------------------- | :-------------- |
| wss://blaze.mixin.one          | Global          |

## Calling APIs

Most APIs need to signed with a JSON Web Tokens (JWT) to access. They utilize the secure data transmissions between clients and servers.

### Signing

:::tip
Most Mixin SDK has already provide a JWT generator, and thet can handle the JWT generation and verification automatically. For more information, please refer to [SDK section](/docs/resources/sdk).
:::

#### JWT Header

| Parameter | Instruction                         |
| :-------- | :---------------------------------- |
| alg       | Signature Algorithm, set to `EdDSA` |
| typ       | Token type, set to `JWT`            |

#### JWT Payload

| Parameter | Instruction           |
|:----------|:----------------------|
| uid       | User Id               |
| sid       | Session Id            |
| iat       | issued at             |
| exp       | Expiration Time       |
| jti       | JWT ID                |
| sig       | Signature             |

#### Sign JWT in Go language

```go
/*
* uid: User Id
* sid: Session Id
* secret: PrivateKey
* method: HTTP Request method, e.g.: GET, POST
* url: URL path without hostname, e.g.: /transfers
* body: HTTP Request body, e.g.: {"pin": "encrypted pin token"}
*/
func SignAuthenticationToken(uid, sid, privateKey, method, uri, body string) (string, error) {
	expire := time.Now().UTC().Add(time.Hour * 24 * 30 * 3)
	sum := sha256.Sum256([]byte(method + uri + body))

	claims := jwt.MapClaims{
		"uid": uid,
		"sid": sid,
		"iat": time.Now().UTC().Unix(),
		"exp": expire.Unix(),
		"jti": UuidNewV4().String(),
		"sig": hex.EncodeToString(sum[:]),
		"scp": "FULL",
	}
	priv, err := base64.RawURLEncoding.DecodeString(privateKey)
	if err != nil {
    return "", err
	}
	// more validate the private key
	if len(priv) != 64 {
		return "", fmt.Errorf("Bad ed25519 private key %s", priv)
	}
	token := jwt.NewWithClaims(jwt.SigningMethodEdDSA, claims)
	return token.SignedString(ed25519.PrivateKey(priv))
}
```

#### An example of signed token

```text
eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMwOTY0ODUsImlhdCI6MTUyNTMyMDQ4NSwianRpIjoiMjU5NGFkNTctOWRhZC00MjRmLTg1OTUtYjE0NzI3ZTI0ZTYxIiwic2lkIjoiYzA5Y2YzMTMtN2RlZC00MjVkLWFkM2YtYTFjZTRjZmQ1ZTVlIiwic2lnIjoiODVkZDIzOGE5ODM0NzE3ZGMxM2QzODQ0ZjYzYTFmZWUxM2Q4MmQyZTZjMmVlNDRlYWM3Yzc5MGY1ZGIyNWY4OCIsInVpZCI6Ijg5ZTBiZGVlLWMzNTUtNDdmMi05NDVhLWJlNDhiZTg3NTYwNiJ9.PYg6Cx5grs0flJe862R3VLEWKyTZPcXOGYF9RouztgR_mi3kleIzJt4vCwUZI9F7QrHBFMtTc3_wG_ymnnjsmnm0pBdoON4I-RxeaztIlyc1Ey9lLFe6_ARRUBXo_15ZORilS1hRdMREd84eQOLlO0ChieBPY0tSSiVqTaFZt3Q
```

You can decode it at [jwt.io](https://jwt.io/).

#### Send Requests with Token

Add signed authentication token to the headers of API requests to get current App's profile:

```shell
curl -i -H "Content-Type: application/json" \
        -H "Authorization: Bearer YOUR_TOKEN_HERE" \
        "https://api.mixin.one/me"
```

### API Responses

The HTTP status codes returned by the Mixin APIs meet the RFC specifications.

On success:

```json
{
  "data": {...}
}
```

or

```json
{
  "data": [...]
}
```

On error:

```json
{
  "error": {
    "status": 500,
    "code": 500,
    "description": "Internal Server Error"
  }
}
```

## OAuth User Signature

Authorization information would be returned after user authorize, details in [OAuth Authorization](/docs/api/oauth).
The signature is nearly as same as bot signature, except different requestIDs are required for different request.

```
/*
* appID: client_id of authorized user
* authorizationID: authorization_id in response after authorization
* privateKey: local generated ED25519 private key
* method: HTTP request method: GET, POST, ...
* url: /me
* body：request body
* scp: access scope that use authorize, like "PROFILE:READ PHONE:READ"
* requestID: random uuid
*/
func SignOauthAccessToken(appID, authorizationID, privateKey, method, uri, body, scp string, requestID string) (string, error) {
	expire := time.Now().UTC().Add(time.Hour * 24 * 30 * 3)
	sum := sha256.Sum256([]byte(method + uri + body))
	claims := jwt.MapClaims{
		"iss": appID,
		"aid": authorizationID,
		"iat": time.Now().UTC().Unix(),
		"exp": expire.Unix(),
		"sig": hex.EncodeToString(sum[:]),
		"scp": scp,
		"jti": requestID,
	}

	kb, err := base64.RawURLEncoding.DecodeString(privateKey)
	if err != nil {
		return "", err
	}
	priv := ed25519.PrivateKey(kb)
	token := jwt.NewWithClaims(jwt.SigningMethodEdDSA, claims)
	return token.SignedString(priv)
}
```

## PIN signature

Mixin Messenger facilitates users to manage private key with TIP protocol and 6 digits PIN.
For more details of TIP, refer to [https://github.com/MixinNetwork/tip](https://github.com/MixinNetwork/tip).

When users try to manage their assets, transfer or withdraw, PIN are required.

Here's a golang example:

```golang
* pin: 6 digits number in string, e.g.: '321321'
* pinTokenBase64: An ed25519 public key, can be found in keystore_7000xxx.json
* privateKey: private key, same as other signatures
* iterator: a number that must increase every signature

func EncryptEd25519PIN(pin, pinTokenBase64, privateKey string, iterator uint64) (string, error) {
	privateBytes, err := base64.RawURLEncoding.DecodeString(privateKey)
	if err != nil {
		return "", err
	}

	private := ed25519.PrivateKey(privateBytes)
	public, err := base64.RawURLEncoding.DecodeString(pinTokenBase64)
	if err != nil {
		return "", err
	}
	var curvePriv, pub [32]byte
	PrivateKeyToCurve25519(&curvePriv, private)
	copy(pub[:], public[:])
	keyBytes, err := curve25519.X25519(curvePriv[:], pub[:])
	if err != nil {
		return "", err
	}

	pinByte := []byte(pin)
	timeBytes := make([]byte, 8)
	binary.LittleEndian.PutUint64(timeBytes, uint64(time.Now().Unix()))
	pinByte = append(pinByte, timeBytes...)
	iteratorBytes := make([]byte, 8)
	binary.LittleEndian.PutUint64(iteratorBytes, iterator)
	pinByte = append(pinByte, iteratorBytes...)
	padding := aes.BlockSize - len(pinByte)%aes.BlockSize
	padtext := bytes.Repeat([]byte{byte(padding)}, padding)
	pinByte = append(pinByte, padtext...)
	block, err := aes.NewCipher(keyBytes[:])
	if err != nil {
		return "", err
	}
	ciphertext := make([]byte, aes.BlockSize+len(pinByte))
	iv := ciphertext[:aes.BlockSize]
	_, err = io.ReadFull(rand.Reader, iv)
	if err != nil {
		return "", err
	}
	mode := cipher.NewCBCEncrypter(block, iv)
	mode.CryptBlocks(ciphertext[aes.BlockSize:], pinByte)
	return base64.RawURLEncoding.EncodeToString(ciphertext), nil
}
```

## Others

Messenger API includes:

* Public API, e.g.: `GET /network/chains` can obtain the information of all chain supported by Mixin
* Private API, available for request with signature, for example, `GET /me` can obtain the information of current user
* Transfer asset API, available for request with signed PIN
* In addition, some response fields which have the suffix `_base64` is base64 coding of the RFC 4648, please refer to [https://pkg.go.dev/encoding/base64#pkg-variables](https://pkg.go.dev/encoding/base64#pkg-variables)
