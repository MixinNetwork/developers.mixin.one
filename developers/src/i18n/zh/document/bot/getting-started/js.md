# JavaScript 容器交互

客户端 WebView 容器提供一些 JavaScript 方法供机器人网页调用，可以方便读取机器人所处的会话和一些本地化设置信息。

- getContext()

  返回客户端用户设置和当前所处的会话，JavaScript 调用方法：

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

  返回值

  ```json
  {
    "app_version": "0.24.0",      // Mixin Messenger 版本
    "immersive": true,            // 是否开启沉浸模式
    "appearance": "dark",         // 暗色主题/浅色主题
    "currency": "USD",            // 货币类型
    "locale": "zh-CN",            // 语言
    "platform": "iOS",            // 客户端类型，Android、iOS、Desktop
    "conversation_id": ""         // 返回当前所处会话的 ID，没有返回空
  }
  ```

- reloadTheme()

  重新读取机器人的 theme-color 信息并应用，适合机器人动态换肤功能，调用方法：

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

  关于 theme-color 推荐参考[交互与设计](../design/overview)。

- playlist(audios)

  唤起播放列表，`audios` 参数是一个 mp3 字符串数组，调用方法：

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
  客户端支持自动读取 mp3 的 Artwork 封面、Title 标题、Artist 艺术家这三个 metadata 信息。

  **该方法在 Mixin Messenger 0.30.0 或以上的版本支持。**

### 第三方 SDK

为了便于使用，第三方团队将这些 Javascript 方法包装成 JsBridge SDK。该 SDK 提供了统一的访问方式，并且给出了所有 Javascript 方法的列表，和使用示例。请[点击此处查看](https://fox-one.github.io/mixin-sdk-jsbridge/#/)。

### 下一步

- 前端优化

  推荐使用 PWA 技术优化机器人 https://developers.google.com/web/ilt/pwa/

- [接收消息](./websocket)

  通过 WebSocket 接收用户的留言并予以回复能帮助用户更好的使用机器人提供的各种服务。

