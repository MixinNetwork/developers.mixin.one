---
title: Create a dApp
sidebar_position: 1
---

# Creating Bots

Download [Mixin Messenger](https://mixin-www.zeromesh.net/messenger), open [dashboard](/dashboard) and login by scanning the quad code. Click the `New App` button on the left side and create the bot by following the prompt. Below are descriptions of some of the important parameters.

- Category

  Please select a category for the bot, when the bot is placed at the navigation bar on the bottom of the Mixin Messenger homepage, the corresponding icon of the category will be displayed.

- Homepage Address

  Link to the homepage of the bot.

- Verification Page Address

  For the callback of OAuth authorization.

- Domain Whitelist

  It is used to prevent fake bot links. When opening card and button type messages, it will check whether the linked domain name is in the whitelist. For APP_CARD or APP_BUTTON_GROUP, you need to ensure that the action is in the whitelist.


- Immersive Mode

  Turn on immersive mode to get more display space, refer to [Immersive Mode](../design/immersive-mode)document.

### Next Step

After saving the newly created bot, you can get the Mixin ID of the current bot. You can directly search for the ID at the top of the Mixin Messenger homepage to access your own bot.

- [Authorization](./oauth)

  Developers can read the user's personal, asset, transfer, and other information after authorization, and accordingly can provide users with a variety of more refined information and financial services.

- [Receiving Messages](./websocket)

  If you are developing news, images only, and other informational bots that do not need to read user info, all you need is to develop the front-end, and you are ready to go live. It is strongly recommended that developers provide tech support for the users.


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
