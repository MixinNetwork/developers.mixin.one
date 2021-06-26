# Multi-Signature

Multi-signature is a safe, reliable, and effective practical technology that can effectively improve the security of custody assets and enhance customer trust. Mixin mainnet supports multi-signature based on ed25519, and t/M can be arbitrarily set to participate in multi-signature, where t is threshold, M is members, and M supports up to 255 people to participate in multi-signature. For example, `2/3` multi-signature means that there are three people who jointly manage the assets, and any two people need to sign the transaction to use the assets.

Different from the Bitcoin multi-signature address starting with `3`, Mixin's multi-signature is based on UTXO but there is no distinctive address for multi-signature. A transfer is sent to multiple people. The transfer needs to specify a set of payees and a threshold. The asset is co-owned by all parties participating in the multi-signature, and the same user can participate in different multi-signature groups at the same time. To facilitate the explanation below, the `multi-signature account` is still used to refer to the encrypted assets jointly managed by multiple people.

### Asset Management

Co-management of assets is one of the main use-cases of multi-signature. Each use of funds requires a valid signature by multiple people. No one can move the assets by himself, and this mechanism can also avoid single-point-of-failures causing permanent loss of assets.

- The multi-signature bot 7000102367 developed by the Mixin team is very simple, all you need is to set up a chat group and you are good to go, it contains only the front-end and it's open-source https://github.com/MixinNetwork/multisig-bot.

- The multi-signature assistant bot 7000102968 developed by the Laomao team is a multi-currency multi-signature wallet with a simple and friendly interface.

### E-Commerce

2/3 multi-signature is commonly used in the e-commerce industry. Buyers, sellers, and platforms are the multi-signature participants. Buyers first transfer funds to the multi-signature account, and then the buyer and seller can confirm the subsequent transaction confirmation and refund process. When disputes arise, the platform will do 2/3 arbitration. The e-commerce platform effectively guarantees the integrity of the two parties by implementing multi-signature transactions, reducing transaction risks and improving efficiency.

- ExinLocal 7000000015 is a global peer-to-peer trading market for buying and selling cryptocurrencies based on Mixin Network. It has successfully applied multi-signature technology to the peer-to-peer OTC trading market. Users can exchange assets freely and securely on this platform, [learn more](https://w3c.group/c/1581684681212744).

### E-government

Multi-signature technology can also be applied to the e-government system of level-by-level approval, where multi-signature transfers are associated with the approval process and electronic contracts. Process participants sign the transaction level-by-level until the electronic signature finally becomes effective and the certificate is stored on-chain. For example, set up a 4/4 financial expenditure approval process, in which the participants are marketing people, department leaders, finance staff, and cashiers. Marketing people initiate and participate in multi-signatures, after the department leaders, finance staff, and cashiers review and sign in turn, automated lending can be realized, and the entire process is automatically recorded on-chain.

### Consensus building

Mixin is the first to apply multi-signature technology to blockchain consensus building, based on which an infinitely expandable sharding network can be realized. Every node participating in multi-signature runs the same code and stores the same data. For example, decentralized applications based on Mixin Network, such as public chains, decentralized exchanges, AMM, and decentralized lending Apps, and so on.

4swap 7000103537 is a decentralized exchange that provides automated market makers, developed by the Fox team, and the Mixin Core, Biyin, BigONE, Fox, and BOX communities jointly manage assets and operations.

### Next Step

- [Decentralized Application Solution MTG](../mtg/overview)

  MTG is the best practice of sharding technology. Each MTG implementation is a para chain of the Mixin Network, composed of multiple independent nodes, and the consensus is reached through the multi-signature technology of the Mixin main network.

- [Multi-Signature API Document](/document/wallet/api/multisigs/outputs)

  Learn how to use the multi-signature API.
