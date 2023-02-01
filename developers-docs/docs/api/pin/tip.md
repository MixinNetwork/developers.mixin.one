---
title: Migrate to TIP
sidebar_position: 3
---

:::caution
* The document is for mixin app
* Since the TIP Private Key can not be updated once create, please keep it safety and carefully
:::


## Generate a pair of ed25519 private & public key

There needs a public key to be uploaded to mixin server. We need to prepare a pair of private & public key.

Here is an example from Golang: https://pkg.go.dev/crypto/ed25519#GenerateKey

## Upload the public key to mixin server

Should upload the public key, use [update PIN interface](/zh-CN/docs/api/pin/pin-update)

1. If there's don't have old pin, `old_pin` is blank string.
2. If there's have old six number pin, then should use the encrypted old pin as before.
3. The new pin is the ed25519 public key above, combine a uint64 number (initialize 1)

Pseudo codes example

```
pub, priv, err := ed25519.GenerateKey(rand.Reader) // keep the priv safety and carefully locally
if err != nil {
    return err
}
counter := make([]byte, 8)
binary.BigEndian.PutUint64(counter, 1) // need to be BigEndian bytes
// pinToken, privateKey, iterator is similar with the six number pin
encryptedPin, err := bot.EncryptEd25519PIN(pub, pinToken, privateKey, uint64(time.Now().UnixNano()))
if err != nil {
    return err
}

// encryptedPin need to be uploaded to the server
```

As a result, the TIP works for the mixin app.

## How to use tip to get a signature

Here use `/pin/verify` as an example

```
TIPVerify := "TIP:VERIFY:"
timestamp := time.Now().UnixNano()
tipBody := []byte(fmt.Sprintf("%s%032d", TIPVerify, timestamp)) // difference tip body is used for difference RPC
sig := ed25519.Sign(priv, tipBody) // priv is generated in previous 
encryptedPin, err := bot.EncryptEd25519PIN(sign, pinToken, privateKey, uint64(time.Now().UnixNano()))
if err != nil {
    return err
}
```

Then we can try to POST /pin/verify with the following parameters, if there's has user's info as result, TIP works right now.

```
{
  "pin_base64": encryptedPin,
  "timestamp":  timestamp,
}
```

Others RPC will be document separately.


The document of how Messenger use TIP, repo link：https://github.com/MixinNetwork/tip