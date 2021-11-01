---
title: Encrypted Message
sidebar_position: 7
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
  APIResponse,
} from "@site/src/components/api";
import RespAttachment from "../../_partials/_resp.attachment.md";
import ReqEncrypted from "../../_partials/_req.encrypted.md";
import RespEncrypted from "../../_partials/_resp.encrypted.md";

Mixin is very concerned about personal privacy. Before this, the messages between user and bots were not encrypted. Now we supported encrypted messages.

### Overview of Encrypted Message

Original body of message will be encrypted by AES CBC. The key will be randomly generated for each message. The key is used to encrypt the message body. We need all recipients' public key in ed25519 format to encrypt the message key respectively. After the recipient receive the message, they need to use the private key (in ed25519 format) with the sender's public key decrypt the message key. Then use the message key decrypt the body of message.

For details of an encrypted message:
```
version || session size || sender public key || encrypted message key for receiver session 1 || encrypted message key for receiver session 2 || nonce || encrypted message data

1. version: 1 byte 
2. session size (2 bytes) in LittleEndian format, max 510, ristricted by participants  size of conversation (max 256 right now).
3. sender public key is bot's (maybe user's) curve25519 public key
4. encrypted message key for receiver session = session id || AESCBC(message key, shared secret key, iv)
5. shared secret key = ECDH(sender private key, receiver session public key)
6. message key uses to encrypt the message data
```

A demo of how to encrypt the body of message can be found here: https://github.com/MixinNetwork/bot-api-go-client/blob/master/message.go#L139

### checksum of the conversation

The checksum uses to validate if there is any change in this conversation. If there's a device signed in again, there `session_id` will changed.

```
func GenerateUserChecksum(sessions []*Session) string {
	if len(sessions) < 1 {
		return ""
	}
	sort.Slice(sessions, func(i, j int) bool {
		return sessions[i].SessionID < sessions[j].SessionID
	})
	h := md5.New()
	for _, s := range sessions {
		io.WriteString(h, s.SessionID)
	}
	sum := h.Sum(nil)
	return hex.EncodeToString(sum[:])
}
```

<APIEndpoint url="/encrypted_messages" />

<APIMetaPanel scope="Authorized" />

<APIRequest
  title="Send Messages"
  method="POST"
  url="/encrypted_messages --data PAYLOAD"
/>

Request body data is a message array:

<ReqEncrypted />

It returns an JSON array for success, witch contains all the messages status.

<RespEncrypted />
