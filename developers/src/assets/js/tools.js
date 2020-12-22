import forge from 'node-forge'
import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'
import { Uint64LE } from "int64-buffer"
import crypto from 'crypto'
import crypto_scalarmult from './ed25519'

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
  if (uri.startsWith('https://api.mixin.one')) uri = uri.replace('https://api.mixin.one', '')
  if (uri.startsWith('https://mixin-api.zeromesh.net')) uri = uri.replace('https://mixin-api.zeromesh.net', '')
  method = method.toLocaleUpperCase()
  if (typeof (body) === "object") body = JSON.stringify(body)
  let issuedAt = Math.floor(Date.now() / 1000)
  let md = forge.md.sha256.create()
  let _privateKey = toBuffer(privateKey, 'base64')
  md.update(method + uri + body, 'utf8')
  let payload = {
    uid: uid,
    sid: sid,
    iat: issuedAt,
    exp: issuedAt + 3600,
    jti: uuid(),
    sig: md.digest().toHex(),
    scp: scp || 'FULL'
  }
  return _privateKey.length === 64 ? getEd25519Sign(payload, _privateKey) : jwt.sign(payload, privateKey, { algorithm: 'RS512' })
}

function getEd25519Sign(payload, privateKey) {
  const header = toBuffer({ alg: "EdDSA", typ: "JWT" }).toString('base64')
  payload = base64rawUrl(toBuffer(payload))
  const result = [header, payload]
  const sign = base64rawUrl(forge.pki.ed25519.sign({
    message: result.join('.'),
    encoding: 'utf8',
    privateKey
  }))
  result.push(sign)
  return result.join('.')
}

function toBuffer(content, encoding = 'utf8') {
  if (typeof content === 'object') content = JSON.stringify(content)
  return Buffer.from(content, encoding)
}

function base64rawUrl(buffer) {
  return buffer.toString('base64').replace(/\=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

const blockSize = 16
function signEncryptedPin(pin, pinToken, sessionId, privateKey, iterator) {
  let _privateKey = toBuffer(privateKey, 'base64')
  let pinKey = _privateKey.length === 64 ? signEncryptEd25519PIN(pinToken, privateKey) : signPin(pinToken, privateKey, sessionId)
  let time = new Uint64LE(Date.now() / 1000 | 0).toBuffer()
  if (iterator === undefined || iterator === "") {
    iterator = Date.now() * 1000000
  }
  iterator = new Uint64LE(iterator).toBuffer()
  pin = Buffer.from(pin, 'utf8')
  let buf = Buffer.concat([pin, Buffer.from(time), Buffer.from(iterator)])
  const padding = blockSize - buf.length % blockSize
  const paddingArray = []
  for (let i = 0; i < padding; i++) {
    paddingArray.push(padding)
  }
  buf = Buffer.concat([buf, Buffer.from(paddingArray)])

  const iv16 = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', pinKey, iv16)
  cipher.setAutoPadding(false)
  let encrypted_pin_buff = cipher.update(buf, 'utf-8')
  encrypted_pin_buff = Buffer.concat([iv16, encrypted_pin_buff])
  return Buffer.from(encrypted_pin_buff).toString('base64')
}

function signPin(pinToken, privateKey, sessionId) {
  pinToken = Buffer.from(pinToken, 'base64')
  privateKey = forge.pki.privateKeyFromPem(privateKey)
  const pinKey = privateKey.decrypt(pinToken, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    label: sessionId
  })
  return hexToBytes(forge.util.binary.hex.encode(pinKey))
}

function signEncryptEd25519PIN(pinToken, privateKey) {
  privateKey = Buffer.from(privateKey, 'base64')
  pinToken = Buffer.from(pinToken, 'base64')
  return scalarMult(privateKeyToCurve25519(privateKey), pinToken.slice(0, 32))
}

function scalarMult(curvePriv, publicKey) {
  curvePriv[0] &= 248
  curvePriv[31] &= 127
  curvePriv[31] |= 64
  var sharedKey = new Uint8Array(32)
  crypto_scalarmult(sharedKey, curvePriv, publicKey)
  return sharedKey
}

function privateKeyToCurve25519(privateKey) {
  const seed = privateKey.slice(0, 32)
  const sha512 = crypto.createHash('sha512')
  sha512.write(seed, 'binary')
  let digest = sha512.digest()
  digest[0] &= 248
  digest[31] &= 127
  digest[31] |= 64
  return digest.slice(0, 32)
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(32)
  for (let c = 0; c < hex.length; c += 2) {
    bytes[c / 2] = parseInt(hex.substr(c, 2), 16)
  }
  return bytes
}
