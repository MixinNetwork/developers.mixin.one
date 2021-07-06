# Creating Minxin Wallet

Download [Mixin Messenger](https://mixin-www.zeromesh.net/messenger), open [Dashboard](/dashboard), scan the QR code to log in, click "New Application" on the left and follow the prompts to create an application. Things like home page URL, verification URL, and other parameters are for Mixin Messenger. You don’t need to worry about them here, simply type in something random.

Each developer account creates 2 applications for free, pay if you need more.

### Key Generation

Switch to "Key" and click "Ed25519 Private Key" in the application session to generate sensitive information such as the application's PIN, Session ID, PinToken, and private key:


```json
{
  "pin": "123456",
  "client_id": "96c1460b-c7c4-480a-a342-acaa73995a37",
  "session_id": "cc2ae4e2-5f74-4c3e-9128-23892b46851a",
  "pin_token": "YcUaTtLL3PnW7NrBNh...XhOiOIHrhAvAYgXZaNag34",
  "private_key": "tbcUDgb4glYbyAkx-nOaqc4SpsDd1TFQMQq...2TxNfQiK9PULgod41QVXwVszVOWKi5TRm2gUK0sqch5A"
}
```

- It is recommended to use Ed25519 private key rather than old RSA for session key generation. Developers are currently being encouraged to switch from RSA private key to Ed25519 private key. See [document](../api/session-secret).

- "App Key" and "App QR Code" are mainly used in Mixin Messenger, so don't worry about them here.

**Note that the above generated key information will not be saved by the server and browser, please store it properly.**

### Next Step

- [Genenrating Wallet User](./create-network-user)

  Generate a wallet account for each user on the platform.