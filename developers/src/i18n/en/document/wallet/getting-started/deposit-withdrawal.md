# Deposit and Withdrawal

Deposit and withdrawal are among the most important functions of a wallet, and also the most error-prone. Once the deposit or the withdrawal errors happen, the assets cannot be retrieved. So users should be encouraged to try a small amount depositing or withdrawing for the first time!

### Deposit
- Deposit Addresses

  The deposit interface displays deposit information by destinations and tags. Some assets (such as EOS, BTS) require both destination and tag to be used to complete the deposit. You can simply check whether the tag is empty to distinguish.

  The deposit address of the same main chain is the same. For example, you can directly deposit Omni USDT to the deposit address of BTC, and all tokens conforming to ERC-20 can be deposited to the deposit address of ETH.

- Getting Deposit Addresses

  The deposit addresses are created on demand. Calling `GET /assets` will not generate a new deposit address. When calling `GET /assets/:id`, if the user has no deposit address yet, a new one will be generated for him, it takes some time but generally very fast. It is recommended that the wallet app display a spinner at the place of the deposit button while calling the API in the background. You can check if the address is ready by checking whether the `destination` field has a value or not.

- Required Deposit Confirmations

  The required deposit confirmations of Mixin are more than twice that of ordinary wallets and exchanges, so the deposits will be slower for the sake of security, which effectively prevents problems such as double-spending. The number of required confirmations can be dynamically obtained and displayed to users through the `confirmations` field.

- Deposit Progress

  You can use `GET /external/transactions` and specify `asset`, `destination`, and `tag` at the same time to retrieve whether the current deposit address has an on-going deposit record, see [document](../api/network/pending-deposits ).

It is recommended to follow Mixin bot 7000103056 to check the current public chain synchronization status. If the deposit is delayed, it may be due to the block data synchronization failure. Then no worry and all you need is to let the user wait, it will be the top priority of Mixin mainnet team to solve this.

**It is strongly recommended to remind users: Please try a small amount for the first deposit.**

### Withdrawal

Note that users need to add the withdrawal address before withdrawing, please refer to [API Document](../api/withdrawal).


- Withdrawal addresses

  Refer to [Document](../api/address-add) to add the withdrawal addresses via `POST /addresses`, note that the  withdrawal addresses can only be [Add](../api/address-add) and [Delete](.. /api/address-delete), if you want to edit, you can delete it first and then add it.

  Withdrawal to the contract addresses of TRON and EOS is not supported!

- Withdrawal Restrictions

  The minimum withdrawal is displayed with `dust` field, which is generally 0.0001. Some token withdrawals require a reserve in the account (cannot withdraw to zero), which is determined by the `reserve` field, such as XRP.

- Withdrawal Fee

  The withdrawal fee is displayed with `fee` field. The fee is dynamic (automatically adjusted according to the network congestion of the public chain) and can be obtained from `fee` field.

- Internal Withdrawal

   Internal deposit and withdrawal (deposit and withdrawal between Dapps of Mixin Network) are free and fast. For example, deposit or withdrawal from Mixin Messenger to Poolin Wallet, and from FOX.ONE to Mixin Messenger. Due to business considerations, some wallets will still charge a withdrawal fee.


Note that the deposit and withdrawal addresses are not the same. When withdrawing, a user may withdraw from one or more on-chain asset addresses. For details, please refer to Mixin's technical white paper. 

**It is strongly recommended to remind users: Please try a small amount for the first withdrawal.**

### Next Step

- Monitor Reconciliation

  Developers can scan the data on entire network of Mixin and filter wallet user records to do reconciliation, refer to [API Document](../api/network/snapshots). Please attach the current wallet's authentication token in request headers.

---
Please kindly remind the users that once the deposit fails, the assets cannot be retrieved. The Mixin team currently provides some subsidies for users’ deposit failures. If you need it, please contact Mixin customer service through 7000 in Mixin Messenger.