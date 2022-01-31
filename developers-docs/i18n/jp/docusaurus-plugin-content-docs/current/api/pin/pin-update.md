---
title: PINコードのアップデート
sidebar_position: 1
---

import {
  APIRequest,
  APIMetaPanel,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespUser from "../../_partials/_resp.user.md";

## POST /pin/update

ユーザーのPINコードを変更するか、PINコードが設定されていない場合は新たに設定します。

<APIEndpoint url="/pin/update" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIPayload>{`{
  "old_pin":  "Encrypted old PIN or empty for setup a new PIN"
  "pin":      "Encrypted new PIN"
}
`}</APIPayload>

:::注意
初期PINコードを設定するには、`old_pin`に空の文字列を設定します。
:::

<APIRequest title="Update PIN" method="POST" url="/pin/update --data PAYLOAD" />

<RespUser />
