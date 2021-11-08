---
title: Web 容器 JS API
sidebar_position: 5
---

Mixin Messenger 的 WebView 中有几个 Javascript 方法，可以被 bot 的网页使用。 方便开发人员阅读对话信息和更改区域设置等。

## getContext()

这将返回当前网页的上下文。

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

The response:

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

从 html meta 中读取主题颜色并应用：

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

请阅读[设计指南](./dapp/design/overview) 了解更多关于主题的细节。

## playlist(audios)

调用播放列表。 `audios` 是一个字符串数组，其中包含 mp3 文件的 URI 列表。

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

:::info
Mixin Messenger 0.30.0 或以上版本支持此方法。
:::


## close()

关闭当前机器人窗口： 

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

:::info
Mixin Messenger 0.33.0 或以上版本支持此方法。
:::

## 第三方 SDK

为了方便使用，第三方团队将这些 Javascript 方法打包到 JsBridge SDK 中。 SDK 提供了统一的访问方式，并给出了所有 Javascript 方法和使用示例的列表。 请[访问此处了解更多详情](https://fox-one.github.io/mixin-sdk-jsbridge/#/)。
