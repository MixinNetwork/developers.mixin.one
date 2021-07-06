# Deploying Full Node

Mixin Network is a decentralized network based on PoS consensus. Full nodes use XIN as collateral. The XIN collateralized each year is 2% of the circulation. The first year is 10,000 XIN, and the second year 11,000 XIN, and so on. As long as there are enough mortgage tokens, anyone can apply and anonymously join the Mixin mainnet without any permission. The application steps:

### Generating Mainnet Private Keys and Addresses

```
$ git clone https://github.com/MixinNetwork/mixin.git
$ cd mixin
$ go build
```

After successful compilation, use `./mixin createaddress -public` to generate two private keys and addresses, one is used to group and sign mainnet transactions called signer, and the other is used to receive mining rewards called payee. Please properly back up and keep the address, view key, and spend key.

```
$ ./mixin createaddress -public

address: XINRXkrW1CpocUznN5feEBGYtMLku3vRKTZDpT6wFoobYnPhtbdsKjiTp6DPCUHWm8VPrcyaRabGjbxjFR5rWFa9XU77tX6d
view key: 708a8db3011a806e788a518646414ca5750f6a9ca51c0b309e5e45cdf00b2100
spend key: c0619ce9c6fad9d2b6f7f4c0e676aed8f4d07b422e5fa55fee6154961954be0c
```


The address that initiates to join the mainnet can be a signer, payee or some other address. There is no requirement, but the collateral will be returned to the payee address when the node expires or exits the mainnet.

`$$\color{red}{ Note: The signer must be replaced with a new key each year. There is no such requirement for the payee key.}$$`


### Transfering Collateral Tokens

Currently, it is not possible to transfer tokens directly to the mainnet address through Mixin Messenger, and the tokens need to take a transfer through a bot.

- Download [Mixin Messenger](https://mixin-www.zeromesh.net/messenger), and open [Dashboard]](/dashboard) to scan the QR code to log in.

- Click "New Application" on the left and follow the prompts to create a bot, switch to "Key" tab and click "App Session" to download the Keystore, switch to "Wallet" tab, enter the information in the Keystore to enable the wallet.

- Open Mixin Messenger homepage, on top of which search for the Mixin ID of the bot you just created, transfer the collateral tokens to the robot, and refresh the wallet interface to see it.


### Depositing Collateral Tokens To Mainnet Address

There are three ways to deposit the tokens to the mainnet address. It is recommended to use CNB to test first.

- Withdraw on the dashboard

  Click the withdrawal button of XIN assets in the wallet asset list, enter the mainnet address, amount, and other parameters and click the withdrawal button.

- Via transfer API

  Use the bot's authorization token to call `POST /transactions` to transfer to the mainnet address.

- Via command line

  ```
  $ git clone https://github.com/MixinNetwork/bot-api-go-client.git
  $ cd bot-api-go-client/cli
  $ go build
  $ ./cli transaction  \
    -asset c94ac88f-4671-3976-b60a-09064f1811e8 \
    -k XINRXkrW1CpocUznN5feEBGYtMLku3vRKTZDpT6wFoobYnPhtbdsKjiTp6DPCUHWm8VPrcyaRabGjbxjFR5rWFa9XU77tX6d \
    -amount 10000 \
    -uid xxx \
    -sid xxx \
    -pin xxx \
    -pin_token xxx\
    -private "-----BEGIN RSA PRIVATE KEY-----
  xxx
  -----END RSA PRIVATE KEY-----"
  ```

  `-k` mainnet address, get other parameters from the Keystore, mainnet `transaction_hash` will be returned on success, check with the following command:

  ```
  ./mixin --node 35.234.74.25:8239 gettransaction --hash 95d09ebff27f988b276b32d4408ba7fc7f61e4d85af7c2267093f18486cb9a58 
  ```

### Requesting To Join The Mainnet

The pledge transaction is a special transaction for requesting to join the mainnet.

- Construct a signed pledge transaction.

  Use `./mixin signrawtransaction` to construct a signed pledge transaction.

  | Parameter | Description |
  | :----- | :---- |
  | key | Sign the transaction, use view + spend key string splicing, it is a local signature that will not be sent to the network |
  | extra | Extended information, signer public spend key + payee public spend key string splicing,  `./mixin decodeaddress -a XINxxx` to extract the public spend key of both the signer and the payee. |
  | asset | Set this to `a99c2e0e2b1da4d648755ef19bd95139acbbe6564cfb06dec7cd34931ca72cdc`, which is XIN asset id. |
  | inputs | `[{"hash": "xxx", "index":0}]`, `hash` and `index` are each the `transaction_hash` and  `index`  that are passed by the bot to mainnet address. |
  | outputs | `[{"type": 163, "amount":"11000"}]`, `type` 163 means that this is a pledge transaction. |
  | amount | The amount of pledged XIN. |

  ```
  ./mixin -n 35.234.74.25:8239 signrawtransaction -key VIEWSPEND  -raw '{"version":1,"asset":"a99c2e0e2b1da4d648755ef19bd95139acbbe6564cfb06dec7cd34931ca72cdc","inputs":[{"hash":"28926e30a9959fe7e7ce9c347d8fbacae2249425015d455208de70e4c678bd88","index":0}],"outputs":[{"type":163,"amount":"10000"}],"extra":"979939097dd50d0d6be42c47b3235c07108c28ce7cca150eed3b745283a9ef9639d749ab642df3e0e5573052b7031cd1e96c328e6f73d22851c475d96b7c5257"}'
  ```

  **Please make sure the correctness of `extra` ！**

- Send pledge transaction.

  A hex will be generated after a successful signature, execute`./mixin sendrawtransaction` to send a special transaction to request to join the mainnet.

  ```
  ./mixin -n 35.234.74.25:8239 sendrawtransaction -raw 86a756657273696f6e01a54173736574c420a99c2e0e2b1da4d648755ef19bd95139acbbe6564cfb06dec7cd34931ca72cdca6496e707574739185a448617368c42020001842d6eff5129c11f7c053bf1209f0267bf223f1681c9cb9d19fc773a692a5496e6465780ba747656e65736973c0a74465706f736974c0a44d696e74c0a74f7574707574739185a45479706500a6416d6f756e74c7050002addc961da44b65797391c4202902d1f57276eb32882066de06c0d70fc17a3cd8dc801c1c50e6d4918e39344fa6536372697074c403fffe01a44d61736bc4209515d480e6f28b79228c32db33718e1ca03750bbe7748cd3968a5d450cd743d1a54578747261c400aa5369676e6174757265739190
  ```

### Hardware

- **Memory** 64G
- **CPU** 16 core.
- **Hard disk** 1T SSD (required SSD).
- **Bandwidth** Temporarily no special requirement.

### Running A Node

- Download the latest mixin https://github.com/MixinNetwork/mixin/releases
- set `listener` in config.json to your own public IP or domain.
- Properly config `signer`, `private`, `spend`, and `key` in config.json.
- Run mixin as a systemd daemon. https://github.com/MixinNetwork/mixin/blob/master/config/systemd.service

---
**To contact tech support, search for 31911、26596 in Mixin Messenger.**