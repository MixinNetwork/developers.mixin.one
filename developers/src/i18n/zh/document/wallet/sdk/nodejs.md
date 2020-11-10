# Node.js SDK
### 安装
```shell
npm install mixin-node-sdk --save
```

### 例子
```js
const { Mixin } = require('mixin-node-sdk')
const CLIENT_CONFIG = {
    client_id: '',
    client_secret: '',
    pin: '',
    session_id: '',
    pin_token: '',
    private_key: ``
}

// 1. 第一个参数是 keystore 的信息
// 2. 第二个参数是 是否使用中国的域名加速，建议国内服务器填 true。
// 3. 第三个参数是 是否打开 debug 模式，会在控制台显示一些 log 信息。
const client = new Mixin(CLIENT_CONFIG, true, true)

// 创建用户， session_secret 请填写 RSA 公钥的 Base64，可自行谷歌(百度) RSA 生成， 请保存好私钥
const user = client.create_user({
    full_name: 'test',
    session_secret: `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8wF10XuA2i90YC1peIY4ZzL0N
        pdbXw8uNakCIjMnBeAGGHFvBFgU11uf1asP/8rtLLZfiNwwFlrayErT6SyDB27qv
        POb/vaS4X6mfz9qA0nEz4pHvoTnNV0/L+VftHA43uq46VObDejKJp2wuniY1AT22
        D+NWTjvp/IZ0FvMVqwIDAQAB`
})
console.log(user)

// 更换 PIN, 
client.pin_update({
    old_pin: '918869',
    pin: '918869'
})

// 查看账户中该资产详情
const assets = client.query_assets({
    asset_id
})
console.log(assets)
```

### 常见问题
- `query_assets` 当需要查询所有资产时，请传入空对象

---
本 SDK 由 Mixin 团队开发和维护，如有使用问题可以联系 MixinID: `30265`
