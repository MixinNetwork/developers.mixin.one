# Stablecoin

Stable coins have a wide range of uses. In addition to serving as a safe-haven asset, there is a great demand for them at times of short-term loans, cross-border remittances, and fiat currency deposits. Using MTG to issue, host stablecoins and develop supporting Dapps is secure, stable, and highly efficient.

### Advantages

- Decentralization with Security
  
  Protected by Mixin mainnet, assets under custody are well protected through the cold and hot wallet isolation and co-managed by up to 255 party multi-signature. Dapps can be deployed on 255 node servers.

- Stability 
  
  Stablecoin Dapps can be developed using more stable and mature languages, such as Go, Java, PHP, etc. The exchange service is more stable and smooth, without network congestion and high gas problems. 


- High performance
  
  Stablecoin Dapps can be deployed on high-performance node servers to provide users with low-latency and efficient collateral loan and clearing services.

- Powerfulness

  It naturally supports a variety of cross-chain assets. Transactions are free and instant with scalability to serve a large number of users.

### Steps

- Decentralized Multi-signature Organization

  The work of a multi-signature organization is mainly to participate in asset co-management, review, and deployment of Dapp programs, governance, etc. It can unite multiple well-known teams and companies to form a decentralized multi-signature organization or issue coins to form a decentralized autonomous organization through voting. Then set a consensus threshold, for example, if 5 nodes are co-managing some assets, 3 node signatures are required to move the assets. A common setting is to require two-thirds of the nodes to sign, such as `3/5 `, `4/7` ... `171/255`.

- Generate Stablecoins

  Stable coins can be issued based on platforms that support coin issuance such as ERC20, TRC20, EOS, etc. The coin issuance contract can be set with a fixed upper limit or not, and then deposit into the Mixin network, and transfer to the asset co-management account.

- Dapp Development
  
  The core team uses mature languages like Go, Java or PHP to develop functions, such as automated stablecoin borrowing, redemptation, clearing and so on. Dapp data will be recorded independantly in node database. Nodes need to continuously synchronize related UTXO transactions, write those with valid signatures into databases and sign those without. All operations need to initiate a Mixin mainnet multi-signature, with Memo information including initiator, operation type, amount and other information, the format is as follows (recommended to use MessagePack + base64 to compress the data):
 
  ```golang
  memo = base64.StdEncoding.EncodeToString(msgpack(OrderAction{
    A:"3596ab64-a575-39ad-964e-43b37f44e8cb",  // Asset ID
    S:"43d61dcd-e413-450d-80b8-101d5e903357",  // Initiator
    M:"10",                                    // Amout
    T:"mortgage"                               // Operation Type
  }))
  ```

  User collateral assets go directly into the multi-signature account, every withdrawal needs to be verified and signed by most nodes.
  
  The program will be deployed to each of the node servers once development is finished. All development and operation cost is foreseeable, since being gas-fee free means no extra unpredictable cost.

- Security Measures

  1. The ability to deal with risks can be further improved through multi-signature management and cold and hot wallet isolation. Try to limit the scale of losses caused by unpredictable risks.

  2. All nodes must independently review the Dapp code to reduce potential risks. Every node has a right and obligation to assets.

  3. Node teams should keep close contact. Once a problem is found, the service can be suspended in time, the problem can be quickly fixed with new code deployed.

- Governance

  The decentralized multi-signature organizations determine types of collaterals, commission fees, clearing schemes and other proposals through voting.

### Example

The stablecoin Pando USD jointly issued by Mixin Core, Biyin, BigONE, Fox, and Exin has been launched recently. Five teams jointly manage assets and Dapp programs.

- **Name** Pando USD (pUSD)
- **Limit** 1 trillion
- **Issuance Network** Ethereum ERC20
- **Circulation** 7,500,000 pUSD (2021/01/01)
- **Collaterral** BTC
- **Collateralization** Over-collateralization (200%)
- **Number Of Nodes** 5

---
MTG reference code: https://github.com/MixinNetwork/trusted-group . To contact tech support, search for 762532 in [Mixin Messenger](https://w3c.group/c/1609251387450619).