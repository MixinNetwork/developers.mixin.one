---
title: TIP 迁移
sidebar_position: 3
---

:::caution
* 该文档适用于机器人使用 TIP
* TIP Private Key 一旦生成不可以修改，丢失也不可以恢复，请妥善保管
:::

### 生成 ed25519 私钥跟公钥

迁移到 TIP 需要准备好一个 ed25519 私钥, 公钥需要上传到服务器，会在接下来介绍。

生成方式可参考 Golang 文档：https://pkg.go.dev/crypto/ed25519#GenerateKey

### 上传私钥到服务器

调用 [更新密码接口](/zh-CN/docs/api/pin/pin-update)

1. 如果没有旧密码, `old_pin` 是空字符
2. 如果有旧密码就还是用旧密码加密
3. 新密码是由上面的 ed25519 的公钥加一个 counter (初始化是 1) 的组成, 然后再进行密钥签名

伪代码示例:

```
pub, priv, err := ed25519.GenerateKey(rand.Reader) // priv 要本地保存
if err != nil {
    return err
}
counter := make([]byte, 8)
binary.BigEndian.PutUint64(counter, 1) // 保存成 BigEndian 的 bytes
// 其余的参数分别是 pinToken, privateKey, iterator, 与加密六位 PIN 的一致
encryptedPin, err := bot.EncryptEd25519PIN(pub, pinToken, privateKey, uint64(time.Now().UnixNano()))
if err != nil {
    return err
}

// encryptedPin 就是需要上传到服务器的新的 PIN 值
```

上传成功之后，机器人就迁移到了 TIP, 接下来介绍如何使用 TIP 签名。

### 如何使用 TIP 签名

伪代码以 `/pin/verify` 为例

```
TIPVerify := "TIP:VERIFY:"
timestamp := time.Now().UnixNano()
tipBody := []byte(fmt.Sprintf("%s%032d", TIPVerify, timestamp)) // 不用的 RPC 有不同的 tip body
sig := ed25519.Sign(priv, tipBody) // priv 是上一部分，通过 ed25519 生成本地保存的
encryptedPin, err := bot.EncryptEd25519PIN(sign, pinToken, privateKey, uint64(time.Now().UnixNano()))
if err != nil {
    return err
}
```

把以下的参数, POST /pin/verify, 如果返回用户信息，即迁移成功

```
{
  "pin_base64": encryptedPin,
  "timestamp":  timestamp,
}
```

其它相关的 RPC 会在相关的页面详细描述。

关于 Messenger 如何使用 TIP, 开源地址：https://github.com/MixinNetwork/tip
