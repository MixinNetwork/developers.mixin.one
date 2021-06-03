# Public Chains

Using the MTG solution to develop a PoS public chain can save the time and cost of modules such as consensus, network, and transactions. The new chain obtains Mixin mainnet security, high performance, free transfer within seconds, multi-chain support, and many other features while maintaining the independence of accounting. It is a parallel chain of Mixin.


### Info

- **Consensus** PoS
- **Mainnet Tokens** Mainnet tokens can be issued based on ERC20, EOS, TRC20
- **Number of Nodes** supports up to 255 nodes and at least 5
- **Node Collateral** (100 / maximum number of nodes)% of circulation
- **Data storage** MySQL, PostgreSQL, SQL Server and other high-performance databases
- **Mining Rules** N% kept in mining pools every year

### Advantages

- Security

   Mixin mainnet PoS combined with the application's consensus doubles the security.

- Multi-chain support

  It supports all public chains supported by Mixin, cross-chain asset exchange can be achieved easily.

- High performance

  It supports high concurrency and can be applied to commercial scenarios for a large number of users on a large scale.

- Free and Instant Transfers

   Transfers are free and instant, which meets the requirement of commercial scenarios such as micropayments and everyday payment.

- Developer Friendly

   Developers can freely pick any language (Go, Java, PHP, Rust, etc.) to implement node functions, and directly use traditional high-performance databases such as MySQL, PostgreSQL, MongoDB, or SQL Server for bookkeeping.

### Steps

- Mainnet Token Creation

  Mainnet tokens can be issued based on ERC20, TRC20, EOS, and other platforms that support the issuance of tokens. The issuance contracts can set a fixed upper limit or not, and then deposit all tokens into the Mixin network.

- Node Network Building

  Attract users and teams to participate in the new public chain through airdrops, advertisements, etc., and select super nodes through voting. Up to 255 super nodes are supported, and `2/3 + 1` nodes can reach a consensus through the Mixin network.

- Public Chain Development

  1. User management: Each user of the new public chain needs to create a user on the Mixin network and bind the two. This account is mainly used to receive the user's deposits. Because it takes time to register on Mixin network, you can create 100,000 accounts at a time and register on the Mixin network for later use.

  2. Node bookkeeping: The nodes of the new public chain do bookkeeping independently, and can verify the transactions through Mixin transfer records. When a user transfers money, the node initiates a multi-signature transfer on the Mixin mainnet (such as CNB). The attached Memo information contains information such as both parties and the amount of the transfer. The format is as follows (it is recommended to use MessagePack + base64 to compress the data):


  ```golang
  memo = base64.StdEncoding.EncodeToString(msgpack(OrderAction{
    A:"3596ab64-a575-39ad-964e-43b37f44e8cb",      // Asset ID
    S:"43d61dcd-e413-450d-80b8-101d5e903357",      // Sender
    R:"43d61dcd-e413-450d-80b8-101d5e903357",      // Receiver
    M:"10",                                        // Amount
    T:"transfer"                                   // Operation Type: transfer、withdrawal、deposit etc.
  }))
  ```

  Each node needs to poll for multi-signature transactions related to itself. After receiving the above information, first verify the legality of the data (for example, whether it has over-spent), confirm that it is correct, and then sign it. Once the multi-signature takes effect, write the data to a block or database and update the user's balance.

  3. Asset management: All assets of the new public chain are managed by the node multi-signature. When the user deposits to the account, the assets in the user's Mixin account are transferred to the multi-signature address right away, and the user's balance is updated at the same time. When the user withdraws cash from the multi-signed address to the target address, the user's balance will be updated after the withdrawal is completed. Make sure to remind users to correctly type in deposit and withdrawal addresses. If it is the first time, it is recommended only to withdraw small amounts to a new address.

  4. Node management: Every time a new node joins or exits, all assets need to be transferred to the latest node list for co-management. It is strongly recommended to add the queuing mechanism when nodes join or exit. For example, only one node can join or exit within 1 hour to ensure that the asset migration is complete.

  5. Mining rules: According to the economic model of the public chain, either choose to keep N% tokens in the mining pool every year or have an additional issuance each year. 

- Node network

  If a new node wants to join, in addition to preparing the server, bandwidth, and other hardware, it also needs to raise enough collateral, and then initiate a special transaction that includes the collateral to the main network multi-signature address. After the multi-signature nodes receive the transfer, they start to check the collateral and the maximum number of nodes. If the verification fails, the collateral will be returned. Otherwise, the asset will be arranged for migration, and the network will stop receiving new nodes to join or exit for a period of time.

- Governance

  Holding the mainnet tokens makes you qualified to vote to modify the mining rewards, the use of project promotion funds, etc.

- Reconciliation

  Since all transfers have corresponding multi-signature transfer records on Mixin (cannot be tampered with), in theory, all data can be completely restored based on this transfer record, which can be compared and verified with the local data of the parachain. There is no need for additional DAG graphs or blockchain technology to correlate the data. The sequence of transactions has been recorded on Mixin, and the node data is relatively simple to store.
   

---
MTG reference code: https://github.com/MixinNetwork/trusted-group . If you need tech support，Please search for 762532 in [Mixin Messenger](https://w3c.group/c/1609251387450619) to get connected.
