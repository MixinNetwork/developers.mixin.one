---
title: Create a dApp
sidebar_position: 1
---

## New Application

Download [Mixin Messenger](https://mixin.one/messenger), open [Developers Dashboard](https://developers.mixin.one/dashboard) and login by scanning the QrCode.

Click the `New App` button on the left side and create an application by following the prompt, please upload the application icon and fill the form. Below are descriptions of some of the important parameters.

- **Category**:
  Please select a category for the bot, when the bot is placed at the navigation bar on the bottom of the Mixin Messenger homepage, the corresponding icon of the category will be displayed.
- **Home URL**:
  Link to the homepage of the bot.
- **OAuth URL**
  For the callback of OAuth authorization.
- **Resource Patterns**
  It is a whitelist that used to prevent fake bot links. When opening card and button type messages, it will check whether the linked domain name is in the whitelist. For `APP_CARD` or `APP_BUTTON_GROUP` messages, you need to ensure that the `action` is in the whitelist.
- **Immersive Mode**
  Turn on immersive mode to get more display space, refer to [Immersive Mode](../design/immersive-mode).

:::tip
Each developer account can creates 2 applications for free, pay if you need more.
:::

## Generate Keys

Switch to "Secret" and tap "Generate a new secret" button to generate a new app secret, which is a 64-bit string.

Click "Ed25519 session" button to generate a new keystore, which includes sensitive information such as the application's PIN, Session ID, PinToken, and private key:

```json
{
  "pin":        "123456",
  "client_id":  "96c1460b-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "session_id": "cc2ae4e2-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "pin_token":  "YcUaTtLL3PnW7NrBNh...XhOiOIHrhAvAYgXZaNag34",
  "private_key":"tbcUDgb4glYbyAkx-nOaqc4SpsDd1TFQMQq...2TxNfQiK9PULgod41QVXwVszVOWKi5TRm2gUK0sqch5A"
}
```

Please save the keystore file and the app secret in a safe place.

:::caution
Note that the above generated key information will not be saved by the server and browser, please store it properly.**
:::

:::tip
It is recommended to use Ed25519 private key rather than old RSA session. Developers are currently being encouraged to switch from RSA private key to Ed25519 private key. See this [document](/docs/api/session-secret-migration) for more information.
:::

In the next step, you will understand the oauth process, and get the access token.
