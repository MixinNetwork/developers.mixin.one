---
title: 操作 PIN
sidebar_position: 4
---

当用户尝试操作自己的资产时，需要 6 位 PIN 码，它的功能非常类似于私钥，丢失后无法找回资产。

:::caution
开发者在操作资金或更改 PIN 时必须非常谨慎。

请注意，PIN 无法恢复或重置！ 错误的转移无法撤消！生产环境和测试环境必须分开，并进行全面测试。
:::

## 加密 PIN

调用 API 时，为了安全地传输 PIN，必须对 PIN 进行加密。在 Go 语言中：

```go
func EncryptPIN(ctx context.Context, pin, pinToken, sessionId, privateKey string, iterator uint64) (string, error) {
	privateBytes, err := base64.RawURLEncoding.DecodeString(privateKey)
	if err != nil {
		return "", err
	}

	private := ed25519.PrivateKey(privateBytes)
	public, err := base64.RawURLEncoding.DecodeString(pinToken)
	if err != nil {
		return "", err
	}
	var dst, curve, pub [32]byte
	PrivateKeyToCurve25519(&curve, private)
	copy(pub[:], public[:])
	curve25519.ScalarMult(&dst, &curve, &pub)

	pinByte := []byte(pin)
	timeBytes := make([]byte, 8)
	binary.LittleEndian.PutUint64(timeBytes, uint64(time.Now().Unix()))
	pinByte = append(pinByte, timeBytes...)
	iteratorBytes := make([]byte, 8)
	binary.LittleEndian.PutUint64(iteratorBytes, iterator)
	pinByte = append(pinByte, iteratorBytes...)
	padding := aes.BlockSize - len(pinByte)%aes.BlockSize
	padtext := bytes.Repeat([]byte{byte(padding)}, padding)
	pinByte = append(pinByte, padtext...)
	block, err := aes.NewCipher(dst[:])
	if err != nil {
		return "", err
	}
	ciphertext := make([]byte, aes.BlockSize+len(pinByte))
	iv := ciphertext[:aes.BlockSize]
	_, err = io.ReadFull(rand.Reader, iv)
	if err != nil {
		return "", err
	}
	mode := cipher.NewCBCEncrypter(block, iv)
	mode.CryptBlocks(ciphertext[aes.BlockSize:], pinByte)
	return base64.RawURLEncoding.EncodeToString(ciphertext), nil
}
```

其他语言的 SDK 请参考[文档](/resources/sdk)。

## Setting PIN

```go
const (
	userId     = ""
	pinToken   = ""
	sessionId  = ""
	privateKey = ""
)

func main() {
	ctx := context.Background()

	// Encrypt PIN
	encryptedPIN, err := bot.EncryptEd25519PIN(ctx, "123456", pinToken, sessionId, privateKey, uint64(time.Now().UnixNano()))
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(encryptedPIN)
	// Set initial code
	err = bot.UpdatePin(ctx, "", encryptedPIN, userId, sessionId, privateKey)
	if err != nil {
		fmt.Println(err)
		return
	}
}
```

:::info

- 参数`iterator`必须是递增的并且大于 0。一般建议使用当前系统 Nano 时间，也可以自己选择一个数字，每次调用递增。
- 加密后的 PIN 只能使用一次，更改密码时需要生成两次，不可重复使用。
- PIN 错误有时间锁定。如果一天失败 5 次，请不要再试，即使 5 次 PIN 正确，也会返回错误。重复更多次将导致更长的锁定时间。建议用户记下试过的 PIN 码，第二天再试。
- 一旦 PIN 丢失，就永远无法找回。建议开发者让每个用户定期输入，帮助记忆。初始设置时，请务必让用户输入 3 次以上，并提醒用户丢失无法找回
- 为了资产安全，建议提醒用户不要设置过于简单或常见的组合 PIN，如`123456`、`111222`。

:::
