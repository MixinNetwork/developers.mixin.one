---
title: 注册
description: 在 Sequencer 中注册用户或机器人并校验其状态。
---

import { APIEndpoint, APIPayload } from "@site/src/components/api";

import RespUser from "@site/docs/_partials/_resp.safe.me.md";

在 Sequencer 开始为某个参与者建立索引之前，该用户（或机器人）必须先在新的 API 中完成注册。注册过程会为账号绑定一把 Ed25519 公钥以及与 TIP 兼容的 PIN。

## 检查注册状态

使用此接口确认某个用户是否已经接入 Sequencer：

<APIEndpoint url="/safe/me" method="GET" />

<RespUser />

## 注册用户或机器人

如果用户尚未注册，请提交公钥、签名和 PIN 负载以激活账号。建议每位用户使用独立的 Ed25519 密钥对，以便将权限与 Session secret 隔离。

<APIEndpoint url="/safe/users" method="POST" />

<APIPayload>
{`{
  "public_key": "ED25519-PUBLIC-KEY-HEX",
  "signature": "ED25519-SIGNATURE-OF-USER-UUID-HEX",
  "pin_base64": "TIP-PIN-BASE64"
}`}
</APIPayload>

<RespUser />

签名应来源于 `sha256.Sum256([]byte("SEQUENCER:REGISTER:" + USER-UUID + PUBLIC-KEY-HEX))`。
