---
title: dAppの作成
sidebar_position: 1
---

## 新アプリケーション

[Mixin Messenger](https://mixin.one/messenger)をダウンロードし、[開発者ダッシュボード](https://developers.mixin.one/dashboard)を開き、Qrコードを読み取ってログインしてください。

左側の「New App」ボタンをクリックし、プロンプトに従ってアプリケーションを作成し、アプリケーションアイコンをアップロードし、フォームを記入してください。以下は、重要なパラメータの説明です。

- **カテゴリー**:
  ボットのカテゴリーを選択してください。ボットがMixinメッセンジャートップページ下部のナビゲーションバーに配置されると、カテゴリーに対応したアイコンが表示されます。
- **ホームURL**:
  ボットのトップページへのリンクです。
- **OAuth URL**
  OAuth認証のコールバックに使用します。
- **リソースパターン**
  偽のボットリンクを防ぐために使用されるホワイトリストです。カード型やボタン型のメッセージを開く際に、リンク先のドメイン名がホワイトリストに登録されているかどうかを確認します。「APP_CARD」や 「APP_BUTTON_GROUP」のメッセージでは、「action」 がホワイトリストに含まれていることを確認する必要があります。
- **没入モード**
  没入モードをオンにすると、表示領域がより広くなります。[Immersive Mode](../design/immersive-mode)をご参照ください。

::ヒント
1つの開発者アカウントにつき、2つのアプリケーションを無料で作成することができます。
:::

## キーの生成

「Secret」に切り替え「Generate a new secret」ボタンをタップすると、64ビットの文字列の、新しいアプリの秘密鍵が生成されます。

「Ed25519 session」をクリックすると、アプリケーションPIN、セッションID、PinToken、秘密鍵などの機密情報を含む新しいキーストアが生成されます。

```json
{
  "pin":        "123456",
  "client_id":  "96c1460b-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "session_id": "cc2ae4e2-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "pin_token":  "YcUaTtLL3PnW7NrBNh...XhOiOIHrhAvAYgXZaNag34",
  "private_key":"tbcUDgb4glYbyAkx-nOaqc4SpsDd1TFQMQq...2TxNfQiK9PULgod41QVXwVszVOWKi5TRm2gUK0sqch5A"
}
```

キーストアファイルとアプリのシークレットキーは安全な場所に保存してください。

:::注意
上記の生成されたキー情報は、サーバーやブラウザには保存されませんので、適切に保存してください。**
:::

:::ヒント
旧来のRSAセッションではなく、Ed25519秘密鍵を使用することが推奨されます。現在、RSA秘密鍵からEd25519秘密鍵への切り替えが開発者に推奨されています。詳しくはこちらの[ドキュメント](/docs/api/session-secret-migration)をご参照ください。
:::

次のステップでは、oauthの処理を理解し、アクセストークンを取得します。
