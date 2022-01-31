---
title: PINコードの認証
sidebar_position: 2
---

import {
  APIRequest,
  APIMetaPanel,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespUser from "../../_partials/_resp.user.md";

## POST /pin/verify

ユーザーのPINコードを認証すると、PINコードのイテレータもインクリメントされることに注意してください。

<APIEndpoint url="/pin/verify" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIPayload>{`{
  "pin": "Encrypted PIN"
}
`}</APIPayload>

<APIRequest title="Verify PIN" method="POST" url="/pin/verify --data PAYLOAD" />

APIは、成功時に空のjsonを返します。

## エラー20119のデバッグ

- PINコードを忘れてしまった場合、復元する方法はありません。1日5回程度試して、試したPINコードを紙に書き留めておくことをお勧めします。
- これは、インクリメンタルであるべき`iterator`の使い方を誤ったためと思われます。一般に、現在のシステムナノ時間を使うか、自分で数値を設定して、呼び出すたびにインクリメントすることが推奨されます。
- コードの形式が違う、または生成された時刻が違うなど、暗号化されたPINコードが間違っています。もしくは、SDK自体の問題である可能性があります。SDKの開発元に問い合わせることをお勧めします。

返されたエラーメッセージの`extra`に注意してください。エラー数はPINコードが正しくない場合にのみ増加し、間違った`iterator`や暗号化されたPINコードはPINコード自体がロックされる原因にはなりません。
