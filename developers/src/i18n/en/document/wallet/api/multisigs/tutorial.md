# Multi-Signature Guide

A complete 2/3 multi-signature demo: https://github.com/MixinNetwork/trusted-group, online test bot id: 7000101488.

A scenario where the multi-signature could be used: There is an asset that belongs to a team of three people, A, B, and C. Two of them need to agree to use this asset. In this case, a 2/3 multi-signature is appropriate.

A, B, C need to be three different bots or users of Mixin Network (private keys and PINs required).

### 1. Transfer an asset to the common account of A, B, and C. POST /transactions

Transfer an asset to a multi-signature account, refer to the following document for more info.
https://developers.mixin.one/document/wallet/api/transfer-to-multisigs

### 2. Get your own utxo /multisigs/outputs

It should be noted that in a transaction, threshold and members must map to the same members, and the number of signatures (2 of 2/3)
API document: https://developers.mixin.one/document/wallet/api/multisigs/outputs

We need to continuously request the api server, get the latest utxo and save it. 

### 3. The withdrawal of assets, as mentioned above, requires at least two signatures to complete, but the process is the same.

There are 3 different operations related to multi-signature，which are signing, cancelling, and unlocking. A request needs to be constructed before every operation. API document: https://developers.mixin.one/document/wallet/api/multisigs/request

The Goal: A needs to withdraw 100 CNB from a common account.

1. A sends a request (POST /multisigs/requests).
2. A signs, POST /multisigs/requests/:id/sign，in which :id is request id.
3. B, C need to do something similar. Take C as a example, in the outputs C receives，state is now signed, C takes the tx signed by A to repeat step 1 and 2, that is constructing the request and signing.
4. Parse signed tx, and then check whether the number of signers is 2, if >= 2, send the transaction to mainnet.
5. A now gets the 100 CNB, transaction complete.

Code for signing refund after a payment: https://github.com/MixinNetwork/trusted-group/blob/master/sample/models/payment.go#L164

During the process of contructing the transaction, A's GhostKeys will be used(one-time key), which can be retrieved at https://developers.mixin.one/document/wallet/api/network/keys .

### 4. Cancelling The Transaction

1. Construct the request, the process is the same as contructing a transaction.
2. Send the cancel request, POST /multisigs/requests/:id/cancel，:id is request id. Note, only tx in the unspent state can be cancelled.

### 5. Unlocking The Transaction

When the tx is signed but not sent, cacelling the tx means to unlock it, the process is a lot like cancelling.

1. Construct the request, the process is the same as contructing a transaction.
2. Send the request, POST /multisigs/requests/:id/unlock，:id is request id, Note that only signed tx can be cancelled.

### Conclusion

In most cases, only step 1, 2, and 3 are relavent. First deposit, then sign the related outputs and send the tx to mainnet to spend.
