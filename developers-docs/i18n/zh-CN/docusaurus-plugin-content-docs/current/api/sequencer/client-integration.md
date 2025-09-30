---
title: 客户端接入注意事项
description: 在应用中使用 Sequencer 数据时的实践指南。
---

## 在 Messenger 内获取用户余额

当运行在 Mixin Messenger 内部时，可以调用内置的 `getAssets` bridge 获取当前登录用户的资产余额。

```javascript
window.assetsCallbackFunction = (assets) => {
  const parsed = JSON.parse(assets)
  if (!parsed) return

  parsed.forEach((asset) => {
    if (asset.asset_id === getEnvConfig().assetIdFund) {
      setBalance(asset.balance)
    }
  })
}

if (window.webkit?.messageHandlers?.MixinContext && window.webkit.messageHandlers.getAssets) {
  window.webkit.messageHandlers.getAssets.postMessage([[], 'assetsCallbackFunction'])
} else if (typeof window.MixinContext?.getAssets === 'function') {
  window.MixinContext.getAssets([], 'assetsCallbackFunction')
}
```

## 注意事项与提示

- **请求与响应格式** —— JWT 与 OAuth 认证方式与旧版 API 保持一致。联系人、消息、群组等面向 Messenger 的接口不受影响。
- **Memo 编码** —— 备忘录（`extra`）负载现在使用原始十六进制字符串。请直接提供需要保留的字节数据，不再进行隐式的 msgpack 或 base64 转换。
- **新增错误码** —— 错误码 `10404` 表示目标用户尚未在 Sequencer 中注册。请提示用户完成升级后再重试。
- **批量转账** —— Sequencer 直接处理 Kernel 交易，您可以通过获取多个支付密钥并构造一笔联合 UTXO 支出的方式，实现单次交易向多位收款人分发。
