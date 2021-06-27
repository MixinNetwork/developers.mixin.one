# Exchange

The next-generation high-performance decentralized on-chain exchange based on the MTG feature high performance, low latency, asset isolation, multi-signature co-management, on-chain transactions checkable and traceable, instant maker orders, zero gas fee for transactions.

### Advantages

- Decentralization with Security
  
  Protected by Mixin mainnet, maker order assets and wallet assets are independent of each other to reduce concentration risks. Assets under custody are well protected through the cold and hot wallet isolation and co-managed by up to 255 party multi-signature. The matching engine can be deployed on 255 node servers.

- Openness and transparency
  
  The code is completely open-source and audited by a third-party organization. Transactions are recorded on-chain and kept checkable and traceable.

- High performance
  
  The decentralized matching engine can be deployed on high-performance node servers to provide users with low-latency and efficient transaction services.

- Powerfulness

  It naturally supports a variety of cross-chain assets. gas-fee free and instant maker orders,  scalability to serve a large number of users.

### Steps

- Decentralized Multi-signature Organization

  The work of a multi-signature organization is mainly to participate in asset co-management, review, and deployment of Dapp programs, governance, etc. It can unite multiple well-known teams and companies to form a decentralized multi-signature organization or issue coins to form a decentralized autonomous organization through voting. Then set a consensus threshold, for example, if 5 nodes are co-managing some assets, 3 node signatures are required to move the assets. A common setting is to require two-thirds of the nodes to sign, such as `3/5 `, `4/7` ... `171/255`.

- Decentralized Exchange Development
  
  1. Development Environment: Mature languages such as Go, Java, PHP, and mature database systems such as MySQL, PostgreSQL, and MongoDB.

  2. Matching engine: Maker, taker orders, and order cancellations are realized through transfers, user assets are effectively isolated while transparency are improved because of transactions recorded on-chain. Nodes need to synchronize related UTXO transactions continuously. Collateral loans and borrowing operations are processed separately according to the `Memo` of the transaction. All operations need to be verified and the data must be signed by enough nodes to be recorded in the database. All operations need to initiate a Mixin mainnet multi-signature, with Memo information including operation type, amount and others, the format is as follows (recommended to use MessagePack + base64 to compress the data):

  ```golang
  memo = base64.StdEncoding.EncodeToString(msgpack(OrderAction{
    T: "L",                                    // Limit Order
    P: "0.1",                                  // Price
    S: "B",                                    // Purchase Order
    A: uuid.FromString("c94ac88f-4671-3976-b60a-09064f1811e8"), // Asset ID
  }))
  ```

  3. Asset management: All assets are managed by the node multi-signature, and the user's maker order assets are directly saved to the multi-signature address, and taking and canceling orders require most nodes to verify the wallet to take effect.

  4. Front-end development: A front-end can be developed to allow wallet users to directly transfer to the matching engine to post maker orders or take orders because it is safer without custody of assets.

- Security Measures

  1. The ability to deal with risks can be further improved through multi-signature management and cold and hot wallet isolation. Try to limit the scale of losses caused by unpredictable risks.

  2. All nodes must independently review the Dapp code to reduce potential risks. Every node has a right and obligation to assets.

  3. Node teams should keep close contact. Once a problem is found, the service can be suspended in time, the problem can be quickly fixed with new code deployed.

- Governance

  The decentralized multi-signature organizations determine the order of trading pairs, commission fees, and other proposals through voting.

---
MTG reference code: https://github.com/MixinNetwork/trusted-group . To contact tech support, search for 762532 in [Mixin Messenger](https://w3c.group/c/1609251387450619) .