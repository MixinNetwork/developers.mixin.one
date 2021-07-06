# Wrapped Tokens

The market for wrapped tokens(tokenized blockchain coins anchoring with coins on another blockchain) is now huge. The market value of BTC locked by WBTC, tBTC, and RenBTC has exceeded 1 billion U.S. dollars. Using MTG to issue, host wrapped tokens, and develop supporting Dapps is safe, stable, and efficient.


### Advantages

- Decentralization with Security
  
  Protected by Mixin mainnet, assets under custody are well protected through the cold and hot wallet isolation and co-managed by up to 255 party multi-signature. The Dapps can be deployed on 255 node servers.

- Stability 
  
  The Dapps can be developed using more stable and mature languages, such as Go, Java, PHP, etc. The redeem service is stable and smooth, without network congestion and high gas problems. 

- Efficiency
  
  The Dapps can be deployed on high-performance node servers to provide users with low-latency and efficient subscription and redemption services.

- Powerfulness

  It naturally supports a variety of cross-chain assets. Transactions are free and instant with scalability to serve a large number of users.

### Steps

- Decentralized Multi-signature Organization

  The work of a multi-signature organization is mainly to participate in asset co-management, review, and deployment of Dapp programs, governance, etc. It can unite multiple well-known teams and companies to form a decentralized multi-signature organization or issue coins to form a decentralized autonomous organization through voting. Then set a consensus threshold, for example, if 5 nodes are co-managing some assets, 3 node signatures are required to move the assets. A common setting is to require two-thirds of the nodes to sign, such as `3/5 `, `4/7` ... `171/255`.

- Wrapped Token Generation

  Wrapped tokens can be issued based on ERC20, TRC20, EOS, and other platforms that support token issuance. The token issuance contract can be set with a fixed limit or not, then deposit into Mixin network, and transfer to the asset co-management account. The tokens can also be withdrawn to other DeFi platforms that support them for trading.

- Dapp Development

  1. Development Environment: Mature languages such as Go, Java, PHP, and mature database systems such as MySQL, PostgreSQL, and MongoDB.

  2. Transaction processing: Nodes need to synchronize related UTXO transactions continuously. Subscription and redemptiond operations are processed separately according to the `Memo` of the transaction. All operations need to be verified and the data must be signed by enough nodes to be recorded in the database. All operations need to initiate a Mixin mainnet multi-signature, with Memo information including initiator, operation type, amount and other information, the format is as follows (recommended to use MessagePack + base64 to compress the data):

  ```golang
  memo = base64.StdEncoding.EncodeToString(msgpack(OrderAction{
    A:"3596ab64-a575-39ad-964e-43b37f44e8cb",  // Asset ID
    S:"43d61dcd-e413-450d-80b8-101d5e903357",  // Initiator
    M:"10",                                    // Amout
    T:"subscribe"                              // Operation Type
  }))
  ```

  3. Asset management: All assets are managed by the node multi-signature. Collateral for subscription will be saved to the multi-signature address. Redemptions take effect after most nodes have verified the wallet.

- Security Measures

  1. The ability to deal with risks can be further improved through multi-signature management and cold and hot wallet isolation. Try to limit the scale of losses caused by unpredictable risks.

  2. All nodes must independently review the Dapp code to reduce potential risks. Every node has a right and obligation to assets.

  3. Node teams should keep close contact. Once a problem is found, the service can be suspended in time, the problem can be quickly fixed with new code deployed.

- Governance

  The decentralized multi-signature organizations determine the collateral type, commission fees, and other proposals through voting.

---
MTG reference code: https://github.com/MixinNetwork/trusted-group . To contact tech support, search for 762532 in [Mixin Messenger](https://w3c.group/c/1609251387450619).