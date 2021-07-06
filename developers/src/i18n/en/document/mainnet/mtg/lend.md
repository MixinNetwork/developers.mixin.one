# Lending

The collateral loan market based on the demand for crypto assets can greatly improve the liquidity of the assets and capital utilization.  Decentralized lending applications based on MTG feature security, stability, and efficiency.

### Advantages

- Decentralization With Security
  
  The Mixin mainnet is very secure supporting up to 255 parties multi-signature co-management of assets. Assets under custody are well protected through the cold and hot wallet isolation. The decentralized lending program can be deployed on 255 node servers.

- Stability 
  
  Decentralized lending programs can be developed using more stable and mature languages, such as Go, Java, PHP, etc., to make lending services more stable and smooth, without network congestion and high gas problems.

- Efficiency
  
  Decentralized lending programs can be deployed on high-performance node servers to provide users with low-latency and efficient collateral lending services.

- Powerfulness

  It naturally supports a variety of cross-chain assets. The transactions are free and instant and can support a large number of users.

### Steps

- Decentralized Multi-signature Organization

  The work of a multi-signature organization is mainly to participate in asset co-management, review, and deployment of Dapp programs, governance, etc. It can unite multiple well-known teams and companies to form a decentralized multi-signature organization or issue coins to form a decentralized autonomous organization through voting. Then set a consensus threshold, for example, if 5 nodes are co-managing some assets, 3 node signatures are required to move the assets. A common setting is to require two-thirds of the nodes to sign, such as `3/5 `, `4/7` ... `171/255`.

- Decentralized Lending Applications Development
  
  1. Development Environment: Mature languages such as Go, Java, PHP, and mature database systems such as MySQL, PostgreSQL, and MongoDB.

  2. Transaction processing: Nodes need to synchronize related UTXO transactions continuously. Collateral loans and borrowing operations are processed separately according to the `Memo` of the transaction. All operations need to be verified and the data must be signed by enough nodes to be recorded in the database. All operations need to initiate a Mixin mainnet multi-signature, with Memo information including initiator, operation type, amount and other information, the format is as follows (recommended to use MessagePack + base64 to compress the data):

  ```golang
  memo = base64.StdEncoding.EncodeToString(msgpack(OrderAction{
    T:"3596ab64-a575-39ad-964e-43b37f44e8cb",  // Collateral asset ID
    M:"c6d0c728-2624-429b-8e0d-d9d19b6592fa",  // Loan asset ID
    S:"43d61dcd-e413-450d-80b8-101d5e903357",  // Initiator
    M:"10",                                    // Amount
    T:"lend"                                   // Operation type
  }))
  ```

  3. Asset management: All assets are managed by the node multi-signature. User borrowing and collateral will be saved to the multi-signature address. Redemptions take effect after most nodes have verified the wallet.

- Security Measures

  1. The ability to deal with risks can be further improved through multi-signature management and cold and hot wallet isolation. Try to limit the scale of losses caused by unpredictable risks.

  2. All nodes must independently review the Dapp code to reduce potential risks. Every node has a right and obligation to assets.

  3. Node teams should keep close contact. Once a problem is found, the service can be suspended in time, the problem can be quickly fixed with new code deployed.

- Governance

  The decentralized multi-signature organizations determine the type of collateral, collateral rate, interest rate, and other proposals through voting.


---
MTG reference code: https://github.com/MixinNetwork/trusted-group . To contact tech support, search for 762532 in [Mixin Messenger](https://w3c.group/c/1609251387450619) .
