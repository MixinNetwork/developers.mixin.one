import { v4 as uuid } from 'uuid'
import forge from "node-forge";
import BigNumber from "bignumber.js";

export default {
  getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    const results = regex.exec(window.location.search)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
  },
  getUUID() {
    return uuid()
  },
  isImmersive() {
    let ctx
    switch (environment()) {
      case 'iOS':
        ctx = prompt('MixinContext.getContext()')
        return JSON.parse(ctx).immersive
      case 'Android':
        ctx = window.MixinContext.getContext()
        return JSON.parse(ctx).immersive
      default:
        return false
    }
  },
  changeTheme(color) {
    const head = document.getElementsByTagName('head')[0]
    const metas = document.getElementsByTagName('meta')
    for (let i = 0; i < metas.length; i++) {
      if (metas[i].name === 'theme-color') {
        head.removeChild(metas[i])
      }
    }
    const meta = document.createElement('meta')
    meta.name = 'theme-color'
    meta.content = color
    head.appendChild(meta)
    reloadTheme()
  },
  get_pin() {
  let pin = ''
  for (let i = 0; i < 6; i++) {
    pin += i ? _get_pin_num(9) + 1 : _get_pin_num(10)
  }
  return pin
},
  get_private_key() {
    let keypair = forge.pki.rsa.generateKeyPair({ bits: 1024, e: 0x10001 })
    let body = forge.asn1.toDer(forge.pki.publicKeyToAsn1(keypair.publicKey)).getBytes()
    let session_secret = forge.util.encode64(body, 64)
    let private_key = forge.pki.privateKeyToPem(keypair.privateKey)
    return { session_secret, private_key }
  },
  assetSortCompare(a, b) {
    let cmp = 0
    let ap = new BigNumber(a.balance).times(a.price_usd)
    let bp = new BigNumber(b.balance).times(b.price_usd)
    cmp = calc_cmp(ap, bp)
    if (cmp === 0) cmp = calc_cmp(a.balance, b.balance)
    if (cmp === 0) cmp = calc_cmp(a.price_usd, b.price_usd)
    return cmp

    function calc_cmp(a, b) {
      a = new BigNumber(a)
      b = new BigNumber(b)
      if (a.gt(b)) return -1
      if (a.lt(b)) return 1
      return 0
    }
  }
}

function reloadTheme() {
  switch (environment()) {
    case 'iOS':
      return window.webkit.messageHandlers.reloadTheme && window.webkit.messageHandlers.reloadTheme.postMessage('')
    case 'Android':
      return window.MixinContext.reloadTheme()
  }
}

function environment() {
  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.MixinContext) {
    return 'iOS'
  }
  if (window.MixinContext && window.MixinContext.getContext) {
    return 'Android'
  }
  return undefined
}

function _get_pin_num(max) {
  return max * Math.random() | 0
}