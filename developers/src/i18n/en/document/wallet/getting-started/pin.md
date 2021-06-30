# Setting PIN

A 6-digit PIN is required when a user is trying to transfer assets, the code functions pretty much like a private key, not retrievable if lost.

### Encrypting PIN

In order to transmit the PIN securely, the PIN must be encrypted. In Go language:

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

For SDKs in other languages, please refer to [Document](../sdk/overview).

### Setting PIN

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

### Precautions

- The parameter `iterator` must be incremental and greater than 0. It is generally recommended to use the current system Nano time, or you can choose a number by yourself, and increment it with each call.

- The encrypted PIN can only be used once, and it needs to be generated twice when changing the password and cannot be reused.

- There is a time lock for PIN errors. If you have failed 5 times a day, do not try again, even the PIN is correct after 5 times, an error will be returned. Repeating more times will cause a longer lock time. It is recommended that users write down the tried PIN and try again the next day. 

- Once a PIN is lost, it can never be retrieved. It is recommended that the developer let each user enter it regularly to help memorize it. During the initial setting, make sure to let the user enter it more than 3 times and remind the user that it cannot be retrieved if lost

- For asset security, it is recommended to remind users not to set PINs that are too simple or common combinations, such as `123456`, `111222`.

**Developers must be very cautious when transferring funds or changing PINs. Note that PINs cannot be retrieved! The wrong transfers cannot be undone! The production environment and the test environment must be separated and fully tested**

### Next Step

- [User Assets](./assets)

  Query user assets.
