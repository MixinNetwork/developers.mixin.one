---
title: Client Integration Notes
description: Practical guidance for working with Sequencer data inside your applications.
---

## Fetch user balances inside Messenger

When running inside Mixin Messenger you can call the in-app `getAssets` bridge to retrieve asset
balances for the signed-in user.

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

## Precautions and tips

- **Request and response formats** – JWT and OAuth authentication work the same way as the legacy
  APIs. Any messenger-centric endpoints such as contacts, messages, or groups remain unchanged.
- **Memo encoding** – Memo/`extra` payloads are now raw hex strings. Supply the exact bytes you want
  to persist; there is no implicit msgpack or base64 conversion.
- **New error code** – Error code `10404` indicates that the target user has not yet registered with
  the Sequencer. Prompt the user to upgrade before retrying the action.
- **Batch transfers** – Because Sequencer deals directly with Kernel transactions, you can create
  transactions that fan out to many recipients in one go by fetching multiple payment keys and
  constructing a single combined UTXO spend.
