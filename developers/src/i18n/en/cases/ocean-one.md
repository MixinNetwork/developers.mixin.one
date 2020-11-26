### Introduction
Ocean ONE is a new generation of decentralized exchange based on the Mixin Network, which is the first decentralized exchange for having the same experience as centralized exchange.

- Decentralization. Safe isolation between user assets and matchmaking engine and assets are returned to the user's wallet immediately after the order is executed.
- Transactions are on-chain. All orders, such as pending orders, canceling orders, are taking place on-chain, which can be traced to the explorer.
- Secure and transparent. The code is completely open-source and has passed the audit by a third party.
- Excellent performance. High-performance matchmaking engine to meet quantitative needs, during a test for 24 hours, it completed 10,000,000 transactions.
- Multiple cryptocurrencies supported. It has supported 28 public chains and more than 100000 assets to deposit, withdraw, and trade.
- Unique advantages: all transfers between Mixin Network-based Dapps and OceanOne are free and instant, and it no need to apply for new token listing. Once the network supports, the engine will automatically support by default; the exchange fees are fully refunded to developers.

### Architecture
Ocean is a high-performance matchmaking engine based on Mixin Network using Go language, while Ocean ONE is a wallet based on Mixin Network + Dapp with the exchange front-end. To execute taking, making, and canceling orders by transfers, effectively isolating users' assets and improving the transparency of transactions to achieve the effect of decentralization.

![OceanONE](./ocean-one-structure.png)

As shown in the picture, all the Dapps on the Mixin Network can send orders directly to the Ocean matching engine, and you can create a new Dapp by changing the source code of OceanONE, then deploy it to a new exchange, custom trading pairs on your own!

### OOO token.
All the operations of Ocean ONE are done by specific Memo noted on each transfer. For this reason, a total of 1 trillion tokens of OOO (Ocean ONE Object) has been issued only to assist transactions (cancellation of orders). For example, when canceling an order, 0.00000001 OOO will be sent to the engine with cancellation data attached to the Memo.

### Account registration.
Like traditional centralized exchanges, register and logs in Ocean ONE via the mobile phone number or email, while automatically creating a wallet for each user and airdrop 1000 OOO to assist trading.

### Pending order.
The following is an example of selling 0.7 XIN at 0.1 BTC / XIN:
```golang
type OrderAction struct {
S string // side
A uuid.UUID // asset
P string // price
T string // type,
O uuid.UUID // order
}

memo = base64.StdEncoding.EncodeToString(msgpack(OrderAction{
T: "L",
P: "0.1",
S: "A",
A: uuid.FromString("c6d0c728-2624-429b-8e0d-d9d19b6592fa"),
}))
```
> T value "L" indicates limit order, value "M" indicates market order, S value "A" indicates selling, and value "B" indicates buying.

### Canceling order
```golang
memo = base64.StdEncoding.EncodeToString(msgpack(OrderAction{
O: uuid.FromString("2497b2bb-4d67-49bf-b2bc-211b0543d7ac"),
}))
```
> O is the order ID, which is generated when the order is pending.

### Fee
The fees for Maker is 0, and that for Taker is 0.1%.

### extended case
Welcome to develop more front-end trading platform based on Ocean matchmaking engine, share depth with Ocean, and contribute open-source code to Ocean ONE.
- Mixcoin Exchange, a lite exchange, is running on Mixin Messenger, the trading pairs displayed according to the user's wallet. Search Mixin ID 7000101524 to try.
- F1EX Digital Assets Exchange https://fox.one/zh/products/exchange.
- BigDEX, a decentralized exchange https://dex.b1.run/.

### Links
- Ocean ONE official website: https://ocean.one/.
- Source code on Github: https://github.com/MixinNetwork/ocean.one.

---
The separation of pending assets and wallet assets greatly reduces risk. It ensures high performance, and the on-chain transaction provides that all transfers are real and effective, and open-source code ensures the fairness of transactions. Welcome to try and experience the https://ocean.one.