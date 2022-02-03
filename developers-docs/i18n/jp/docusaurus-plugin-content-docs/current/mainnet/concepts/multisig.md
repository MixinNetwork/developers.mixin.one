---
title: マルチシグネチャー
sidebar_position: 5
---

# マルチシグネチャー

マルチシグネチャは、安全・確実・効果的な実用技術であり、保管資産のセキュリティを効果的に向上させ、お客様の信頼性を高めることができます。Mixinメインネットはed25519に基づくマルチシグネチャをサポートしており、マルチシグネチャへの参加者をt/Mで任意に設定できます。tは閾値、Mはメンバー、Mは最大255人までのマルチシグネチャへの参加をサポートしています。例えば、「2/3」のマルチシグネチャーとは、資産を共同管理する人が3人いることを意味し、資産を利用するためには、任意の2人が取引に署名する必要があります。

ビットコインの「3」で始まるマルチシグネチャーのアドレスとは異なり、MixinのマルチシグネチャーはUTXOをベースにしていますが、マルチシグネチャーに特徴的なアドレスはありません。複数の人に送金が行われます。送金には、受取人のセットと閾値を指定する必要があります。資産はマルチシグネチャに参加するすべての関係者の共有となり、同じユーザーが同時に異なるマルチシグネチャーグループに参加することが可能です。続く説明を容易にするため、複数人で共同管理する暗号化資産を指す場合は、「マルチシグネチャーアカウント」と表記します。

### 資産管理

資産の共同管理は、マルチシグネチャーの主なユースケースの一つです。資金を使用するたびに、複数人による有効な署名が必要です。また、この仕組みにより、一度の失敗による資産の永続的な損失を回避することができます。

- Mixinチームが開発したマルチ署名ボット（ID:7000102367）は非常にシンプルで、チャットグループを設定するだけで作成可能です。フロントエンドのみを含み、そのオープンソースは以下通りです。https://github.com/MixinNetwork/multisig-bot

- Laomaoチームによって開発されたマルチシグネチャーアシスタントボット（ID:7000102968）は、シンプルでフレンドリーなインターフェースを持つ多通貨マルチシグネチャーウォレットです。
- Pandoチームが開発した「CoWallet」（id: 7000103970）というマルチシグネチャーウォレットは、シンプルでフレンドリーなインターフェースを持つ他通貨マルチシグネチャーウォレットです。こちらもオープンソースで、以下より参照可能です。https://github.com/fox-one/cowallet


### Eコマース

2/3 マルチシグネチャは、eコマース業界で一般的に使用されています。買い手、売り手、プラットフォームがマルチシグネチャーの参加者です。買い手はまずマルチシグネチャーの口座に資金を振り込み、その後のトランザクション確認や返金処理を買い手と売り手が確認することができます。紛争が発生した場合、プラットフォームは2/3の仲裁を行う。電子商取引プラットフォームは、マルチシグネチャーの取引を実施することで、両者の整合性を保証し、取引リスクを低減させ、効率性を向上させることができます。

- ExinLocal（7000000015）は、Mixin Networkをベースとした暗号通貨の売買を行うグローバルなP2P取引市場です。マルチシグネチャーの技術をP2PのOTC取引市場に応用することに成功しました。ユーザーはこのプラットフォーム上で自由かつ安全に資産を交換することができます。[詳しくはこちら](https://w3c.group/c/1581684681212744)

### E-government

Multi-signature technology can also be applied to the e-government system of level-by-level approval, where multi-signature transfers are associated with the approval process and electronic contracts. Process participants sign the transaction level-by-level until the electronic signature finally becomes effective and the certificate is stored on-chain. For example, set up a 4/4 financial expenditure approval process, in which the participants are marketing people, department leaders, finance staff, and cashiers. Marketing people initiate and participate in multi-signatures, after the department leaders, finance staff, and cashiers review and sign in turn, automated lending can be realized, and the entire process is automatically recorded on-chain.

### Consensus building

Mixin is the first to apply multi-signature technology to blockchain consensus building, based on which an infinitely expandable sharding network can be realized. Every node participating in multi-signature runs the same code and stores the same data. For example, decentralized applications based on Mixin Network, such as public chains, decentralized exchanges, AMM, and decentralized lending Apps, and so on.

4swap 7000103537 is a decentralized exchange that provides automated market makers, developed by the Fox team, and the Mixin Core, Biyin, BigONE, Fox, and BOX communities jointly manage assets and operations.

### Next Step

- [Decentralized Application Solution MTG](../mtg/overview)

  MTG is the best practice of sharding technology. Each MTG implementation is a para chain of the Mixin Network, composed of multiple independent nodes, and the consensus is reached through the multi-signature technology of the Mixin main network.

- [Multi-Signature API Document](/docs/api/multisigs/outputs)

  Learn how to use the multi-signature API.
