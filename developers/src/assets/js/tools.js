import { v4 as uuid } from 'uuid'
import BigNumber from "bignumber.js";
import { WebviewApi } from "@mixin.dev/mixin-node-sdk";

const client = WebviewApi()

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
    const ctx = client.getMixinContext()
    return ctx.immersive ? ctx.immersive : false
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

    client.reloadTheme()
  },
  get_pin() {
    let pin = ''
    for (let i = 0; i < 6; i++) {
      pin += i ? _get_pin_num(9) + 1 : _get_pin_num(10)
    }
    return pin
  },
  assetSortCompare(a, b) {
    let cmp = 0
    let ap = new BigNumber(a.balance).times(a.price_usd)
    let bp = new BigNumber(b.balance).times(b.price_usd)
    cmp = calc_cmp(ap, bp)
    if (cmp === 0) cmp = calc_cmp(a.balance, b.balance)
    if (cmp === 0) cmp = calc_cmp(a.price_usd, b.price_usd)
    return cmp
  }
}

function _get_pin_num(max) {
  return max * Math.random() | 0
}

function calc_cmp(a, b) {
  a = new BigNumber(a)
  b = new BigNumber(b)
  if (a.gt(b)) return -1
  if (a.lt(b)) return 1
  return 0
}
