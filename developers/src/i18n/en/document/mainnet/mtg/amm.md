# Automated Market Maker

Compared with the traditional order book transactions, automated market makers makes the process automated and free of human interventions. Developing automated market makers with MTG is more efficient than Ethereum-based Uniswap, and has higher security, stability and fault tolerance, etc.

### Advantages

- Decentralization with Security
  
  Protected by Mixin mainnet, assets under custody are well protected through the cold and hot wallet isolation and co-managed by up to 255 party multi-signature. The automated market maker program can be deployed on 255 node servers.

- Stability 
  
  Automated market maker programs can be developed using more stable and mature languages, such as Go, Java, PHP, etc., without network congestion and high gas problems. It also brings more stability and capacity to the transaction process.

- Efficiency
  
  Automated market maker programs can be deployed on high-performance node servers to provide users with low-latency and efficient exchange and market making services.

- Powerfulness

  It naturally supports a variety of cross-chain assets. Transactions are free and instant with scalability to serve a large number of users.

### Steps

- Decentralized Multi-signature Organization

  The work of a multi-signature organization is mainly to participate in asset co-management, review, and deployment of Dapp programs, governance, etc. It can unite multiple well-known teams and companies to form a decentralized multi-signature organization or issue coins to form a decentralized autonomous organization through voting. Then set a consensus threshold, for example, if 5 nodes are co-managing some assets, 3 node signatures are required to move the assets. A common setting is to require two-thirds of the nodes to sign, such as `3/5 `, `4/7` ... `171/255`.

- Automated Market Maker Program Development
  
  1. Development Environment: Mature languages such as Go, Java, PHP, and mature database systems such as MySQL, PostgreSQL, and MongoDB.
  2. Transaction processing: Nodes need to synchronize related UTXO transactions continuously. Maket making, trading and redemptiond operations are processed separately according to the `Memo` of the transaction. All operations need to be verified and the data must be signed by enough nodes to be recorded in the database. All operations need to initiate a Mixin mainnet multi-signature, with Memo information including initiator, operation type, amount and other information, the format is as follows (recommended to use MessagePack + base64 to compress the data):

  ```golang
  memo = base64.StdEncoding.EncodeToString(msgpack(OrderAction{
    T:"3596ab64-a575-39ad-964e-43b37f44e8cb",  // ID of the asset to be sold
    M:"c6d0c728-2624-429b-8e0d-d9d19b6592fa",  // Target Asset ID
    S:"43d61dcd-e413-450d-80b8-101d5e903357",  // Initiator
    M:"10",                                    // Amount
    T:"swap"                                   // Operation Type
  }))
  ```
  3. Asset management: All assets are managed by the node multi-signature. Assets injected by users for liquidity will be saved to the multi-signature address. Redemptions take effect after most nodes have verified the wallet.

  4. LP tokens: ERC20 tokens can be issued according to the algorithm as proof for liquidity users injected, and users can freely transfer and trade LP tokens.

- Security Measures

  1. The ability to deal with risks can be further improved through multi-signature management and cold and hot wallet isolation. Try to limit the scale of losses caused by unpredictable risks.

  2. All nodes must independently review the Dapp code to reduce potential risks. Every node has a right and obligation to assets.

  3. Node teams should keep close contact. Once a problem is found, the service can be suspended in time, the problem can be quickly fixed with new code deployed.

- Governance

  The decentralized multi-signature organizations determine commission fees, rewards, and other proposals through voting.

- Reconciliation

  Since all transfers have corresponding multi-signature transfer records(cannot be tampered with) and the order of transactions on Mixin, all data can be completely restored based on this transfer record, which can be compared with the node data to verify. 

### Example

Developed by the Fox team and jointly operated by the Mixin Core, Biyin, BigONE, Fox, and BOX communities, 4swap has been launched. The five teams jointly manage assets and operate and maintain automated market maker programs.

- **Language** Go
- **Storage** MySQL
- **Launched** 2020/12/25
- **Fund Size** 12,734,286 USD (2021/01/01)
- **Daily Trading Volume** 500,000 USD (the last week of January 01, 2021)
- **Number Of Nodes** 5
- **Supported Transactions** All assets that support multi-signature are supported
- **How To Use** Search in Mixin Messenger for Chatbot 7000103537

---
MTG reference code: https://github.com/MixinNetwork/trusted-group . To contact tech support, search for 762532 in [Mixin Messenger](https://w3c.group/c/1609251387450619).