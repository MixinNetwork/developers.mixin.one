import moment from 'moment'
import forge from 'node-forge'
import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'
import LittleEndian from "int64-buffer"
import crypto from 'crypto'

export default {
  getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    const results = regex.exec(window.location.search)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
  },
  getJwtToken({ uid, sid, privateKey }, method, url, body = '') {
    return signAuthenticationToken(uid, sid, privateKey, method, url, body)
  },
  signPin(pin, pinToken, sid, private_key, iterator) {
    return signEncryptedPin(pin, pinToken, sid, private_key, iterator)
  },
  getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
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

function signAuthenticationToken(uid, sid, privateKey, method, uri, body, scp) {
  uri = uri.replace('https://api.mixin.one', '')
  method = method.toLocaleUpperCase()
  if (typeof (body) === "object") {
    body = JSON.stringify(body)
  }
  const expire = moment.utc().add(30, 'minutes').unix()
  const md = forge.md.sha256.create()
  md.update(method + uri + body, 'utf8')
  const payload = {
    uid: uid,
    sid: sid,
    iat: moment.utc().unix(),
    exp: expire,
    jti: uuid(),
    sig: md.digest().toHex(),
    scp: 'FULL'
  }
  return jwt.sign(payload, privateKey, { algorithm: 'RS512' })
}

function signEncryptedPin(pin, pinToken, sessionId, privateKey, iterator) {
  const blockSize = 16
  let Uint64LE = LittleEndian.Int64BE

  pinToken = new Buffer(pinToken, 'base64')
  privateKey = forge.pki.privateKeyFromPem(privateKey)
  const pinKey = privateKey.decrypt(pinToken, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    label: sessionId
  })
  let time = new Uint64LE(moment.utc().unix())
  time = [...time.toBuffer()].reverse()
  if (iterator === undefined || iterator === "") {
    iterator = Date.now() * 1000000
  }
  iterator = new Uint64LE(iterator)
  iterator = [...iterator.toBuffer()].reverse()
  pin = Buffer.from(pin, 'utf8')
  let buf = Buffer.concat([pin, Buffer.from(time), Buffer.from(iterator)])
  const padding = blockSize - buf.length % blockSize
  const paddingArray = []
  for (let i = 0; i < padding; i++) {
    paddingArray.push(padding)
  }
  buf = Buffer.concat([buf, new Buffer(paddingArray)])

  const iv16 = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', hexToBytes(forge.util.binary.hex.encode(pinKey)), iv16)
  cipher.setAutoPadding(false)
  let encrypted_pin_buff = cipher.update(buf, 'utf-8')
  encrypted_pin_buff = Buffer.concat([iv16, encrypted_pin_buff])
  return Buffer.from(encrypted_pin_buff).toString('base64')
}

function hexToBytes(hex) {
  const bytes = []
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16))
  }
  return bytes
}
