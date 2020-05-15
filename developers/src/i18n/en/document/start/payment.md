## Payment

With the Mixin inter-blockchain protocol, it's easier than ever to send and accept any popular cryptocurrencies. The Mixin Messenger API has simplified the process further, please be sure to read the get started guide to help understand the following content.

### Request Payment
Any Mixin user can send you a payment if they have your Mixin ID or phone number, you can also request a payment by redirect a user to the following URL.

https://mixin.one/pay?recipient=USER_ID&asset=ASSET_ID&amount=FLOAT&trace=UUID&memo=TEXT

- USER_ID is the UUID of you, or the CLIENT_ID of your Mixin App.
- ASSET_ID is the UUID of a cryptocurrency uniquely identified in Mixin Network, you can typically get the ID by requesting a user's assets list with the ASSETS:READ scope.

The FLOAT is the amount of your selected cryptocurrency that you would love the user to pay.

The trace UUID is recommended to set to help relate a transfer to your purpose, and prevent a payment to be made twice, as a single trace UUID can only be paid once.

Then the user will be guided to scan the QR code on the payment page, or they will be prompted the payment dialog automatically if the URL is opened in Mixin App.

### Send Transfer
To send a transfer with your App, you should get a new session with asset PIN. Please go to the developers dashboard to generate a new session.

The 6 digit number is your asset PIN, the UUID is the new session ID and the RSA PRIVATE KEY is your session KEY.

A new generated session will expire all previous sessions, so please make sure your old session is not in used before generating a new one.

With the new session ID and KEY, you can generate an JWT ACCESS_TOKEN with payload CLIENT_ID as uid and session ID as sid, sign the payload with KEY.
```
POST -H "Authorization: Bearer ACCESS_TOKEN" https://api.mixin.one/transfers

{
  "asset_id":        ASSET,
  "counter_user_id": RECIPIENT,
  "amount":          STRING,
  "pin":             PIN,
  "trace_id":        UUID
}

=>

{
  "data": {
    "type":     "transfer",
    "trace_id": "UUID",
    ...
  }
}

```
Please access these assets related API cautiously and protect your session and PIN, any loss is permanent and can't be recovered.