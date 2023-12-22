// WebView
(function () {
  const getMixinContext = () => {
    let ctx = {};
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.MixinContext) {
      const contextString = prompt('MixinContext.getContext()');
      if (contextString) {
        ctx = JSON.parse(contextString);
        ctx.platform = ctx.platform || 'iOS';
      }
    } else if (window.MixinContext && typeof window.MixinContext.getContext === 'function') {
      ctx = JSON.parse(window.MixinContext.getContext());
      ctx.platform = ctx.platform || 'Android';
    }

    return ctx;
  };
  
  const reloadTheme = () => {
    switch (getMixinContext().platform) {
      case 'iOS':
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.reloadTheme) window.webkit.messageHandlers.reloadTheme.postMessage('');
        break;
      case 'Android':
      case 'Desktop':
        if (window.MixinContext && typeof window.MixinContext.reloadTheme === 'function') window.MixinContext.reloadTheme();
        break;
      default:
        break;
    }
  };

  const playlist = (audios) => {
    switch (getMixinContext().platform) {
      case 'iOS':
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.playlist) window.webkit.messageHandlers.playlist.postMessage(audios);
        break;
      case 'Android':
      case 'Desktop':
        if (window.MixinContext && typeof window.MixinContext.playlist === 'function') window.MixinContext.playlist(audios);
        break;
      default:
        break;
    }
  };

  const close = () => {
    switch (getMixinContext().platform) {
      case 'iOS':
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.close) window.webkit.messageHandlers.close.postMessage('');
        break;
      case 'Android':
      case 'Desktop':
        if (window.MixinContext && typeof window.MixinContext.close === 'function') window.MixinContext.close();
        break;
      default:
        break;
    }
  };

  /**
   * Must use in Mixin bot page and ASSETS:READ OAuth is required.
   */
  const getAssets = async (assets, cb) => {
    switch (getMixinContext().platform) {
      case 'iOS':
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.getAssets) {
          window.assetsCallbackFunction = cb;
          await window.webkit.messageHandlers.getAssets.postMessage([assets, 'assetsCallbackFunction']);
        }
        break;
      case 'Android':
      case 'Desktop':
        if (window.MixinContext && typeof window.MixinContext.getAssets === 'function') {
          window.assetsCallbackFunction = cb;
          await window.MixinContext.getAssets(assets, 'assetsCallbackFunction');
        }
        break;
      default:
        break;
    }
  };

  const getTipAddress = async (chainId, cb) => {
    switch (getMixinContext().platform) {
      case 'iOS':
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.getTipAddress) {
          window.tipAddressCallbackFunction = cb;
          await window.webkit.messageHandlers.getTipAddress.postMessage([chainId, 'tipAddressCallbackFunction']);
        }
        break;
      case 'Android':
      case 'Desktop':
        if (window.MixinContext && typeof window.MixinContext.getTipAddress === 'function') {
          window.tipAddressCallbackFunction = cb;
          await window.MixinContext.getTipAddress(chainId, 'tipAddressCallbackFunction');
        }
        break;
      default:
        break;
    }
  };

  const tipSign = async (chainId, msg, cb) => {
    switch (getMixinContext().platform) {
      case 'iOS':
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.tipSign) {
          window.tipSignCallbackFunction = cb;
          await window.webkit.messageHandlers.tipSign.postMessage([chainId, msg, 'tipSignCallbackFunction']);
        }
        break;
      case 'Android':
      case 'Desktop':
        if (window.MixinContext && typeof window.MixinContext.tipSign === 'function') {
          window.tipSignCallbackFunction = cb;
          await window.MixinContext.tipSign(chainId, msg, 'tipSignCallbackFunction');
        }
        break;
      default:
        break;
    }
  };

  const MixinWebview = {
    getMixinContext,
    reloadTheme,
    playlist,
    close,
    getAssets,
    getTipAddress,
    tipSign
  };
  window.MixinWebview = MixinWebview;
})();