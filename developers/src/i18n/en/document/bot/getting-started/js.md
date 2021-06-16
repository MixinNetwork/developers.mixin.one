# Webview Javascript Bridge

There are several Javascript methods in the App's WebView, which can be used by the bot's webpage. It's convenient for the developers to read conversation information and change locale settings.

- getContext()

  This returns the context of the current webpage.

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
      "app_version": "0.24.0",      // Mixin Messenger Version.
      "immersive": true,            // Immersive mode on/off.
      "appearance": "dark",         // Light or dark theme, according to system settings.
      "currency": "USD",            
      "locale": "zh-CN",           
      "platform": "iOS",            // Client type, Android、iOS、Desktop
      "conversation_id": ""         // The conversation ID. it would be empty if the webpage is not open in a conversation.
  }
  ```

- reloadTheme()

  Read the theme-color from the html and apply:

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

  Start the playlist. `audios` is a string array that contains the URI list of mp3 files.

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

  **This method is supported in Mixin Messenger 0.30.0 or above.**

### Third-Party SDK

For ease of use, a third-party team packaged these Javascript methods into JsBridge SDK. The SDK provides a unified access method and gives a list of all Javascript methods and examples. please [vist here for more details](https://fox-one.github.io/mixin-sdk-jsbridge/#/).

### Next Step

- Front-end Optimization

  PWA is recommended to optimize the bot, refer to  https://developers.google.com/web/ilt/pwa/.

- [Receiving Messages](./websocket)

  Receiving users' messages and replying via WebSocket can help users better the services provided by the bots.

