---
title: TIP
sidebar_position: 4
---

# Throttled Identity Protocol

Throttled Identity Protocol (TIP) は、分散型の鍵生成プロトコルであり、6桁の暗証番号など非常にシンプルなパスフレーズで強力な秘密鍵を得ることができます。


### ミッションと概要

ビットコインをはじめとする暗号通貨の隆盛とともに、「not your keys, not your coins」という言葉がよく知られるようになりました。それは、真実で、間違いなくビットコインが人々に与えた権利であり自由です。鍵にアクセスできる人はお金を動かすことができ、鍵を持っていない人はそれができないのです。

このことはつまり、中央集権的な取引所にコインを眠らせておくよりは、自分でビットコインの秘密鍵を管理するほうがいいということを示唆しています。しかし、鍵の管理には優れたスキルが必要であり、ほとんどの人はそのスキルを持ち合わせていません。その結果、鍵を自身で所有している人は様々なアクシデントでコインを永久に失うことになり、何年も前にコインベースのアカウントを開設した人は今でも簡単に資産を取り戻すことができます。

この恥ずかしい結果は、中央集権的な取引所の安全性を証明するものではありませんが、鍵管理の欠点を露呈しています。鍵は人々に自分の財産を真に所有する権利を与えますが、人々は鍵の管理能力の低さのために損失を被ることになります。しかし、その原因は人にあるのではなく、鍵そのものに問題があるのです。

ビットコインは人々に自分の財産を所有する権利と自由を与え、人々は自分の鍵を管理する利便性を得るに値します。現在の秘密鍵やニモニックフレーズのデザインは、人々が適切に管理するには複雑すぎます。中央集権的な金融機関の腐敗を恐れる代わりに、人々は秘密鍵の奴隷になるのです。

TIPの目指すところはここにあります。6桁の暗証番号で人々が本当に自分のコインを所有できるようにするのです。この分散型PINはどんな人でも覚えやすく、特別なスキルやハードウェアを必要とせず、人々はこれまで以上に自信を持って自分のコインを管理できるようになります。

### プロトコルデザイン

TIPは、プロトコルを動作させるために3つの独立した要素を含んでいます。分散型署名ネットワークは、ユーザーからの署名要求を認証し、悪意のある試みを抑制します。トラステッドアカウントマネージャーはユーザーにIDシードを提供し、通常、電子メールまたは電話認証コードによってユーザーを認証します。PINを覚えているユーザーは、アカウントマネージャーからのIDシードを組み合わせて、十分な数の署名ネットワークノードに独立して要求を行い、最後に自分の秘密鍵を導出します。

![protocol design workflow diagram](./workflow.jpg)

### 分散型ネットワークの構築

分散型署名ネットワークは、多くの異なる主体によって協調的に立ち上げられます。具体的には、これらの主体が集まり、コンセンサスを得て、ノードソフトウェアを実行し、そのノードは対話的に分散鍵生成プロトコルを実行します。TIPの場合、DKGは閾値ボネ・リン・シャチャム(BLS)署名です。

n個のエンティティがネットワークを立ち上げることに合意したとすると、それぞれ非対称鍵ペアを生成し、すべてのエンティティの公開鍵を決定論的な順序で含むようにノードソフトウェアを構成します。次にノードを起動し、t-of-n（ここでt = n * 2 / 3 + 1）のDKGプロトコルを実行して、公開鍵Pと秘密鍵shares siをそれぞれセットアップします。

DKGプロトコルの終了後、すべてのエンティティは公開鍵Pを共有して同じものを保持していることを確認し、秘密鍵shares siを慎重に保管し、専門的なバックアップを取る必要があります。

最後に、すべてのエンティティは、ユーザからスロットルされた署名要求を受け入れるために、ノードソフトウェアを起動する必要があります。そしてまた、ノードサーバーを保護し、すべての悪意ある攻撃を防御しなければなりません。

このリポジトリは署名者ノードソフトウェアの実装を含んでいます。説明については署名者ディレクトリを参照してください。

### スロットル秘密分散法

ネットワークは設定と署名者リストを一般ユーザーまたは潜在的なユーザーに発表し、署名要求を待ちます。各署名者は、同じ制限に基づいて要求を絞り込む必要があります。

- **ID** IDはすべての制限の基本要因であり、IDは有効なBLS公開鍵でなければならず、ユーザーはすべての署名者に同じIDを使用しなければなりません。署名者はリクエストをチェックし、公開鍵に対するリクエスト署名を検証します。署名者は、無効な署名が行われた場合、このIDのリクエストクォータを減らさなければなりません。
- **エフェメラル** このパラメータは署名者ごとに異なるランダムな値であるが、エフェメラル猶予期間中は同じ署名者ならば変更しないでおくべきです。猶予期間中にエフェメラルが変更された場合、署名者はこのIDのエフェメラルリクエストクォータを減らさなければなりません。
- **ノンス** 署名要求のたびに、ユーザはエフェメラル猶予期間中にノンスを増加させる必要があります。猶予期間中にノンスが無効になった場合、署名者はこのIDのエフェメラルリクエストクウォータを減らさなければなりません。

署名要求がすべてのスロットルチェックを通過した後、署名者はIDに署名することによってt-of-n閾値BLS署名の一部を返します。ユーザーが有効なパーシャルをt個集めると、最終的な集合署名を復元し、集合公開鍵で検証することができる。

最終的な集合署名は、ユーザーの秘密鍵のシードとなります。その後、ビットコインや他の用途のために別のアルゴリズムを使って秘密鍵を生成するかどうかは、ユーザー次第です。この秘密鍵を使用するために追加のリクエストは必要なく、万が一紛失した場合でも、ユーザーは同じリクエストをすることで回復することが可能です。

スロットル制限の詳細については、Keeperディレクトリを参照してください。

## 閾値IDの生成

TIPネットワークのミッションは、人々が6桁の暗証番号を覚えるだけでコインを真に所有できるようにすることで、IDやエフェメラル、ノンスなどを保存する義務があるべきではありません。TIPネットワークは、トラステッドアカウントマネージャーの助けを借り、閾値のID生成プロセスを通じて、この目標を達成することが可能です。


1. ユーザーは、電子メールまたは電話による認証コードを通じて、トラステッドアカウントマネージャーにより本人認証を行い、マネージャーはIDシードSiを返します。
2. ユーザーは非常に遅いハッシュ関数Hs、例えばargon2idを選択し、ID I = Hs(PIN || Si)を生成します。
3.ユーザーはランダムなエフェメラルシードSeを生成し、そのシードをデバイスに安全に保存します。
4.公開鍵Piを持つネットワーク上の各署名者iに対して、ユーザーはエフェメラルei = Hs(I || Se || Pi)を生成します。
5.ユーザは署名要求（I, ei, nonce, grace）を各署名者iに送り、十分な部分署名を集めた後、最終的な集合署名を復元する。
6.ユーザは、このプロセスをしばらく繰り返し、エフェメラル猶予期間を更新する必要があります。

IDシードはすべてのなりすましを禁止し、デバイス上のランダムなエフェメラルシードはアカウントマネージャと署名者の共謀を防止し、エフェメラル猶予期間はデバイス紛失時に秘密鍵を回復することを可能にします。

さらに、アカウント管理者が多数のIDを管理する場合、他のユーザーと協力してIDを結合し、エントロピーを増大させることで、閾値ID生成をより安全にすることができます。

そして、ユーザは従来の鍵管理方法と同様に、自分のシードをバックアップすることができ、このバックアップは紛失や盗難に対してより安全であると考えられています。

### ネットワークの進化

DKGプロトコルは、すべてのシェアが変化しない場合にのみ有効であるため、分散型署名ネットワークを立ち上げた後は、その署名者は一定であるべきで、新しいエンティティが署名者に加わることや古い署名者に代わることは許可されません。しかし、人々はネットワークが強くなることを必要とし、そのためにはより多くの主体がネットワークに参加する必要があります。そこでTIPは、ネットワークの進化を可能にします。


新しいエンティティがネットワークに受け入れられると、古い署名者を置き換えた場合でも、新しい署名者として参加した場合でも、進化が起こります。実際、進化は前の進化と同じプロセスで新しいDKGプロトコルを開始しますが、署名者が異なるため、署名者ごとに全く異なるシェアになります。エンティティがネットワークを離れても、残りのシェアはまだリクエストに応えることができるので、進化は起きないことに注意してください。

In a new evolution, all signers should reference the number and the hash of signers list from previous evolution. After a new evolution starts, the previous evolution still works. For each signer in the new evolution, if it is a signer of previous evolution, it must maintain its availability to serve signing requests to previous evolution, otherwise it should be punished.

Any user requests for the throttled secret derivation should include the evolution number to get the correct signature. And in any case of the network changes, the user is assured their key security due to various backups discussed in previous sections.

### Incentive and Punishment

The code doesn't include any incentive or punishment for the entities running the signer node software. It's up to their consensus on their mission, either to serve their customers better user experience, or charge a small key signing request fee, or they could make some tokens to do community development.

### Security

All the cryptography libraries used in this repository are being developed and used by industry leading institutions, notably the drand project and its league of entropy that includes Cloudflare, EPFL, Kudelski Security, Protocol Labs, Celo, UCL, and UIUC.

However there are no finished audits for this repository yet. This code is offered as-is, and without warranty of any kind. It will need an independent security review before it should be considered ready for use in security-critical applications.

### Contribution

The project doesn't accept feature requests, and welcome all security improvement contributions. Shall you find any security issues, please email security@mixin.one before any public disclosures or pull requests.

The core team highly values the contributions and provides at most $100K bounty for any vulnerability report according to the severity.

### Code and License

The TIP implementation https://github.com/MixinNetwork/tip is released under Apache 2.0 license.
