# JavaScript bridge of Webview

There are several Javascript methods in App's WebView, which could be used by the bot's webpage. It's convenient for the developers to read conversation information and change locale settings.

- getContext()

  return the context of current webpage.

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

  Return

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

- reloadTheme()

  read the theme-color from the html and apply:

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

  Please read [Design Guide](../design/overview) for more details about theme.

- playlist(audios)

  Invoke the playlist. `audios` is an string array which contains the URI list of mp3 files.

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

  **This method is supported in Mixin Messenger 0.30.0 or above**

### 3rd-party SDK

For ease of use, a third-party team packaged these Javascript methods into JsBridge SDK. The SDK provides a unified access method, and gives a list of all Javascript methods and usage examples. please [vist here for more details](https://fox-one.github.io/mixin-sdk-jsbridge/#/)。

### Next

- Improve the performance by PWA: https://developers.google.com/web/ilt/pwa/

