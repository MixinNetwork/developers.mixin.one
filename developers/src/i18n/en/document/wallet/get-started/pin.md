# 设置 PIN 密码

6 位数字 PIN 密码是用户转移资产的唯一途径，丢失无法找回，作用等同于私钥。

### 加密 PIN 密码

为了安全的传输 PIN 密码，PIN 密码必须进行加密，Go 语言实现：

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

其他语言的 SDK 参见[文档](../sdk/overview)。

### 设置 PIN 密码

```go
const (
    userId     = ""
    pinToken   = ""
	sessionId  = ""
	privateKey = ""
)

func main() {
    ctx := context.Background()

    // 加密 PIN
	encryptedPIN, err := bot.EncryptEd25519PIN(ctx, "123456", pinToken, sessionId, privateKey, uint64(time.Now().UnixNano()))
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(encryptedPIN)
	// 设置初始密码
	err = bot.UpdatePin(ctx, "", encryptedPIN, userId, sessionId, privateKey)
	if err != nil {
		fmt.Println(err)
		return
	}
}
```

### 注意事项

- `iterator` 参数必须是递增且大于 0，一般推荐用当前系统 Nano 时间，也可以自己计数，每次调用 + 1

- 加密 PIN 只能使用一次，修改密码时需要生成两次加密 PIN，不能复用

- PIN 错误有时间锁，一天错 5 次就不要再试了，超过 5 次即使 PIN 正确也会返回错误，重复更多次锁的时间更长，建议用户记一下试过的 PIN 码，隔日再试

- PIN 丢失无法找回，建议开发者定期让用户输入帮助记忆，初始设置时输入 3 次以上并提醒用户丢失无法找回

- 为了资产安全，建议提醒用户不要设置简单的 PIN 密码，例如 `123456`、`111222` 类似简单常用的组合

**开发者在转账和修改密码必须非常谨慎，忘记密码无法找回！转错账了也无法撤销！生产环境和测试环境一定要分开，并且进行充分的测试。**

### 下一步

- [用户资产](./assets)

  查询并显示用户资产。