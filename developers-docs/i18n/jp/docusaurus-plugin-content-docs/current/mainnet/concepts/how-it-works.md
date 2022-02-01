---
title: How it Works
sidebar_position: 1
---

# How it Works

Mixinは、デジタルアセットのための無料かつ高速なP2Pクロスチェーン取引ネットワークです。ドメインゲートウェイを通じて、Bitcoin、Ethereum、Monero、その他多くのパブリックチェーンアセットがMixinネットワークに持ち込まれます。すべてのオフチェーントランザクションは公開されたMixin分散型台帳に記録され、引き出しが行われる際にブロックチェーンに書き込まれます。


![How it Works](./how-it-works.svg)

### 分散型台帳

Mixinの分散型台帳はオープンで透明性が高く、35のメインネットノードによって一括して記帳・管理されています。すべての入出金や送金はこの分散型台帳に記録され、それぞれの記録には資産の種類（ビットコイン、イーサリアムなど）、送金額などの情報が含まれています。

- ノード
 
　各メインネットノードは、帳簿管理に参加するために11,000XIN（流通量の2％）を担保に入れる必要があります。明らかな二重支出の取引を意図的に広めるなど、攻撃者として特定された場合、その担保はマイニングプールに没収されます。

　Mixinは、TEEの実装にIntel SGXを採用し、さらなるセキュリティの向上を図っています。すべてのメインネットノードは、メインネットノードの「実行中のコード」が真に「実行中と主張するコード」であることを保証するために、信頼できる実行環境で実行されなければなりません。信頼された実行環境では、誰にも気づかれずに実行中のコードを変更することはできません。

　SPVライトノードは、メインネットワークノードを監視し、不正を防止します。0.1 XIN単位のXINを担保に入れたユーザーであれば、誰でも参加可能です。自身のUTXO変化とノードのトポロジー順序を記録することで、ノードが不正を働いているかを検出することができます。
  ![Nodes](./how-it-works-nodes.svg)

- DAG

　Mixinは、データ構造の基本モデルとしてDAGを使用しています。他のパブリックDAGチェーン（IOTA、Bytaballなど）とは異なり、Mixinは中央権威ノードを持たず、データは中央権威ノードからの最終確認を待つ必要がありません。データの参照時間を制限するなどの仕組みにより、非同期で効率的な運用を実現し、Asynchronous Byzantine Algorithmにより合意結果の正しさを保証しています。簡潔に言えば、Mixinの各ノードは完全なデータを持ったチェーンであり、データの順番が違っても最終的に同じ結果を導き出すことが可能です。
 
- プライバシー

　UTXOトランザクションプライバシーは、CryptoNoteテクノロジーによって強化されています。取引の内容を知っているのは両当事者だけで、メインネットノードは取引の当事者を知ることができず、取引そのものから取引当事者の身元を把握することは不可能です。

  **なお、Mixinには通貨発行機能はなく、無から資産を生み出すことはありません。メインネットトークンは常にERC-20トークンです。**

### アセットマネジメント

- ドメインゲートウェイ

　Mixinドメインは、Mixin Networkのゲートウェイとして、オンチェーンアセットの入出金を管理する重要な役割を担っています。許可を必要としないメインネットノードへの参加とは異なり、ドメインのゲートウェイは多額のXINを担保に入れる必要があるほか、全ノードの同意が得られた場合にのみ参加することができます。アセット量の増加に伴い、アセット管理を分散化するため、複数のドメインが存在することになります。現在のドメインは、Mixinチームが5万XINをプレッジして管理しています（以下、「ドメイン」と表記）。

　ドメインは、オンチェーンアセットの完全な秘密鍵（ビットコインの秘密鍵など）を持っているわけではありません。秘密鍵はキーシャーディング技術によってノードとドメインが保管します。シャードキーには複数のバックアップがあり、一部のバックアップが失われたり漏洩したりしても、鍵が失われることはありません。ユーザーが出金する際には、メインネットノードとドメインがそれぞれ(t-n)閾値署名技術により署名し、最後にすべてをマージして完全な署名にすることで送金を行います。

- メインネットコールドウォレット

ドメインゲートウェイが管理する資産が担保価値を大幅に超えた場合、ドメインの資産は35ノードが共同管理するコールドウォレットアドレスに強制的に移管されます。


### トランザクションの記録

　アセットがMixinネットワーク内に移されると、すぐに手数料無料でリアルタイムな取引を行うことが可能になります。オリジナルのチェーン（ビットコインネットワークなど）では、取引はオフチェーンですが、Mixinの分散型台帳に記録され、オープンで透明性が高く、不可逆的なものとなります。

- Deposit

  Each user generates a unique deposit address (or distinguished by Tag/Memo), but the private key of the address is managed by the Domain and collected on demand, and the collected assets are jointly managed by mainnet nodes and the Domain.

  When the Domain detects a user's deposit and the deposit has reached the required confirmations, it will initiate a transaction containing the user's deposit information to the nodes. After the nodes confirm the transaction, the user will own a new unspent UTXO (asset balance increase) and the transaction will also be recorded in the distributed ledger.

- Transfer

  When a user transfers, a multi-signature transaction will be generated through the 6-digit password + PIN node private key seed and sent to the mainnet nodes. The transaction will reference the historical transactions of the user's node and other nodes. The mainnet nodes will verify the user’s signature, check if there is enough unspent UTXO and other information, and the transaction will be written into the distributed ledger after more than 2/3 + 1 nodes have verified it.

  ![Transaction](./full-node-transaction.png)

- withdrawal

  When a user initiates a withdrawal, the user needs to add a withdrawal address. The process is similar to the transfer process and will be written into the distributed ledger. When the Domain detected the transaction and signature of the mainnet node withdrawal, it will automatically arrange the withdrawal after the transaction and signature are verified. (No manual review).

  If the withdrawal is delayed, besides wrong address, another reason could be that the withdrawal transaction may not be sent due to the Domain failing to synchronize node data (you can subscribe to bot 7000101498 and will receive a failure alarm), or that the assets of the co-managed address are not enough so the collection of temporary assets is triggered, in this case, all it takes is to wait a moment or two.

### FAQ

- What is the relationship between Mixin, Mixin Network, and Mixin Messenger?
  
  Mixin is short for Mixin Network, and Mixin Messenger is the first open-source Dapp on Mixin Network. Due to historical reasons, Mixin was considered Mixin Messenger for a long time.

- Why does Mixin only allow login via phone number?

  Mixin Messenger is a Dapp product that only allows login via phone numbers, but other Mixin Network-based products can be logged in by email or Apple Id, etc., it depends on the products themselves, such as [Poolin Wallet](http://poolin.fi).  

- Why aren't airdrops supported? Why can't I get the balance of the BTC deposit address in my wallet with a blockchain browser?

  The deposit and withdrawal of Mixin do not use the same address. After the user deposits, the assets will be transferred to the address jointly managed by the Domain gateway and the nodes. More than 2/3 + 1 nodes need to verify and sign before withdrawing from the co-managed address to a target address. Therefore all deposit addresses are empty, and the balance cannot be checked and airdrops based on the balance cannot be accepted.
  
- Why aren't the BTC withdrawal addresses managed by the Domain multi-signature addresses?

  Because Bitcoin multi-signature can only support more than a dozen people and cannot support 35 nodes to do multi-signature. Even though Mixin's withdrawal address is an ordinary address, the private key is based on cryptographic key sharding and (t, n) threshold signatures, so the result is equally safe and reliable.

- Where is the Mixin blockchain browser?

  Blockchair, third party, https://blockchair.com/mixin

  Mixin core team, https://mixin.one/snapshots
