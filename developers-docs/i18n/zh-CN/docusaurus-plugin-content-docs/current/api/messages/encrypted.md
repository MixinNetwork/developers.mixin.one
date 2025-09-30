---
title: 加密消息
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
import RespAttachment from "@site/docs/_partials/_resp.attachment.md";
import ReqEncrypted from "@site/docs/_partials/_req.encrypted.md";
import RespEncrypted from "@site/docs/_partials/_resp.encrypted.md";

Mixin 非常重视个人隐私。早期用户与机器人之间的消息并不会被加密，现在我们已经对此进行了改进。

### 加密消息概览

消息的原始内容会通过 AES-CBC 加密处理。每条消息都会生成一个随机的密钥，用于加密消息正文。我们需要会话中所有接收者基于 ed25519 的公钥，分别加密该消息密钥。接收者收到消息后，需要使用自己的 ed25519 私钥和发送者的公钥解密消息密钥，再使用消息密钥解密正文内容。

加密消息的详细结构：
```
version || session size || sender public key || encrypted message key for receiver session 1 || encrypted message key for receiver session 2 || nonce || encrypted message data

1. version: 1 字节
2. session size：2 字节，小端序，最大 510，受会话参与者数量限制（当前最多 256）
3. sender public key：机器人（或用户）的 curve25519 公钥
4. encrypted message key for receiver session = session id || AESCBC(message key, shared secret key, iv)
5. shared secret key = ECDH(sender private key, receiver session public key)
6. message key 用于加密消息正文
```

关于如何加密消息正文的示例，可以参考：https://github.com/MixinNetwork/bot-api-go-client/blob/master/message.go#L139

### 会话校验和

校验和用于检测会话是否发生变化。如果某个设备重新登录，它的 `session_id` 会发生变化。校验和是按 ASCII 顺序排列的所有会话 `session_id` 做 md5sum。

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

请求体数据是一个消息数组：

<ReqEncrypted />

成功时会返回一个 JSON 数组，包含所有消息的状态。

<RespEncrypted />
