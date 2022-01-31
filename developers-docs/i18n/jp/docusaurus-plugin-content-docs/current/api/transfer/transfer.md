---
title: 送信の取得/転送
sidebar_position: 1
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespTransfer from "../../_partials/_resp.transfer.md";

## POST /transfers

特定のユーザーに送信します。

<APIEndpoint url="/transfers" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIPayload>{`{
  "asset_id":     "the asset's asset_id which you are transferring",
  "opponent_id":  "the user's user_id who you are transferring",
  "amount":       "e.g.: "0.01", supports up to 8 digits after the decimal point",
  "pin":          "Encrypted PIN",
  "trace_id":     "Used to prevent duplicate payment, optional",
  "memo":         "Maximally 200 characters, optional",
}
`}</APIPayload>

<APIRequest
  title="Send Transfer"
  method="POST"
  url="/transfers --data PAYLOAD"
/>

<RespTransfer />

:::注意

- 送信APIが正常に呼び出されると、すべてのノードでデータが確認されたことを意味し、データは不可逆的になります。
- ユーザーは自分自身に送金することはできません。
- 暗号化されたPINコードは1回限りであり、送金の都度、PINコードを再暗号化する必要があります。
- 重複した送信を処理するために、開発者は`trace_id`を使用し、常にこのパラメーターを送信に添付することを強くお勧めします。
- 送信中に`500`エラーが発生した場合、もう一度送信をやり直す必要があります。
- 多数の同時取引を処理し、1秒間に数百、数千の送金を処理する必要がある場合は、複数のアカウントで送金・送信を行うことをお勧めします。
- 送信エラーが発生した場合、返されたエラーメッセージの`extra`に注目してください。
- 送信時にパスワードが間違っていることを意味する`20119`というエラーが表示された場合は、再試行しないでください。この場合は[PINコードの認証](../pin/pin-verify) より、APIを呼び出して確認することをお勧めします。

:::

## GET /transfers/trace/:id

このAPIは転送の取得のみであり、入出金はできません。

<APIRequest
  title="Read Transfer"
  method="GET"
  url="/transfers/trace/7c67e8e8-b142-488b-80a3-61d4d29c90bf"
/>

<RespTransfer />
