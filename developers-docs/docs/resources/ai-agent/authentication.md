---
title: Authentication
sidebar_position: 2
---

# Authentication

Every bot that calls the Mixin API needs a keystore. It is a JSON file that stores the app identity and the credentials required to sign API requests.

## Step 1 — Create an app

1. Open [developers.mixin.one](https://developers.mixin.one) and sign in with Mixin Messenger.
2. Click **New App**, fill in a name, and save.
3. Go to **Secret** → **Session Secret**, then click **Generate new session**.
4. Download the generated keystore JSON file immediately.

## Step 2 — Add the spend key

The downloaded keystore usually does not include `spend_private_key`. If the bot needs to perform Safe transfers, withdrawals, or other asset operations, generate and copy the spend key from **Secret** → **App Wallet**, then add it to the keystore manually:

```json
{
  "app_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "session_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "server_public_key": "hex...",
  "session_private_key": "hex...",
  "spend_private_key": "hex..."
}
```

:::warning
`spend_private_key` is shown only once. It can move assets from the bot, so store it carefully and never commit it to a repository or write it to logs.
:::

Save this file as `keystore.json`. You can now run examples or ask an AI assistant to generate Mixin code from it.
