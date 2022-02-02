---
title: JavaScriptブリッジ
sidebar_position: 5
---

MixinメッセンジャーのウェブビューにはいくつかのJavascriptメソッドがあり、ロボのウェブページから利用することができます。開発者が会話情報を取得したり、ロケール設定を変更したりするのに便利です。

## getContext()

現在のWebページのコンテキストを返します。

```js
getMixinContext: function () {
  let ctx = {};
  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.MixinContext) {
    ctx = JSON.parse(prompt('MixinContext.getContext()'))
    ctx.platform = ctx.platform || 'iOS'
  } else if (window.MixinContext && (typeof window.MixinContext.getContext === 'function')) {
    ctx = JSON.parse(window.MixinContext.getContext())
    ctx.platform = ctx.platform || 'Android'
  }
  return ctx
},
```

レスポンス:

```json
{
  "app_version": "0.24.0",      // Mixin Messenger version
  "immersive": true,            // immersive mode on/off
  "appearance": "dark",         // light or dark theme, according to system settings
  "currency": "USD",            // currency
  "locale": "en-US",            // language
  "platform": "iOS",            // Android | iOS | Desktop
  "conversation_id": ""         // the conversation ID. it would be empty if the webpage is not open in a conversation
}
```

## reloadTheme()

htmlからテーマカラーを取得して適用する

```js
reloadTheme: function () {
  switch (this.getMixinContext().platform) {
    case 'iOS':
      window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.reloadTheme && window.webkit.messageHandlers.reloadTheme.postMessage('');
      return
    case 'Android':
    case 'Desktop':
      window.MixinContext && (typeof window.MixinContext.reloadTheme === 'function') && window.MixinContext.reloadTheme()
      return
  }
}
```

テーマの詳細については、[デザインガイド](./dapp/design/overview)をご覧ください。

## プレイリスト(音声)

プレイリストを呼び出します。`Audios`はmp3ファイルのURIリストを含む文字列配列です。

```js
playlist: function (audios) {
  switch (this.getMixinContext().platform) {
    case 'iOS':
      window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.playlist && window.webkit.messageHandlers.playlist.postMessage(audios);
      return
    case 'Android':
    case 'Desktop':
      window.MixinContext && (typeof window.MixinContext.playlist === 'function') && window.MixinContext.playlist(audios)
      return
  }
}
```

:::注意
このメソッドは、Mixinメッセンジャーの0.30.0以降でサポートされています。
:::

## close()

ウィンドウを閉じます。

```js
close: function () {
  switch (this.getMixinContext().platform) {
    case 'iOS':
      window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.close && window.webkit.messageHandlers.close.postMessage('');
      return
    case 'Android':
    case 'Desktop':
      window.MixinContext && (typeof window.MixinContext.close === 'function') && window.MixinContext.close()
      return
  }
}
```

:::注意
このメソッドは、Mixinメッセンジャーの0.33.0以降でサポートされています。
:::

## サードパーティSDK

これらのJavascriptメソッドを使いやすくするために、JsBridge SDKとしてパッケージ化しました。このSDKは、アクセス方法を統一し、すべてのJavascriptメソッドのリストと使用例を提供しています。[詳細はこちらをご覧ください](https://fox-one.github.io/mixin-sdk-jsbridge/#/)。
