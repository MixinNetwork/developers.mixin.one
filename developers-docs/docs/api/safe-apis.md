---
title: Safe APIs
sidebar_position: 2
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespUser from "@site/docs/_partials/_resp.safe.me.md";
import RespEntry from "@site/docs/_partials/_resp.safe.entry.md";
import RespDeposits from "@site/docs/_partials/_resp.safe.deposits.md";
import RespOutputs from "@site/docs/_partials/_resp.safe.outputs.md";
import RespGhosts from "@site/docs/_partials/_resp.safe.ghosts.md";
import RespRequest from "@site/docs/_partials/_resp.safe.request.md";
import RespMultisigRequests from "@site/docs/_partials/_resp.safe.multisig.requests.md";
import RespMultisigRequest from "@site/docs/_partials/_resp.safe.multisig.request.md";
import RespRequests from "@site/docs/_partials/_resp.safe.requests.md";

import RespSnapshots from "@site/docs/_partials/_resp.safe.snapshots.md";

# Mixin Sequencer API

The latest Mixin overall network is based on Mixin Safe, and the network mainly consists of two parts: Mixin Kernel and Mixin Safe. For ease of use, we developed Mixin Sequencer to index and sort all relevant transactions of Kernel, so we will say on the product that it is a new network based on Mixin Safe, but here we mainly introduce the API based on Mixin Sequencer.

The API based on the latest Mixin Sequencer service is more low-level and decentralized compared to the old version of the API, and the API is also simplified. This API essentially performs all operations by calling the mainnet RPC interface through a proxy, and the main function of this proxy is to facilitate querying users and indexing transaction records.

## Registration

Before using the new version of the API, all users, including robots, need to register with the new API. Only after registration can you use the subsequent APIs, and you cannot send transfers and other operations to those unregistered old users.

Before using the latest Mixin Sequencer API, you need to ensure that the user or robot has been updated to the latest TIP protocol PIN code format.

### Check if registered

You can check if the user is registered with the new Sequencer API through the following API

<APIEndpoint url="/safe/me" method="GET" />

<RespUser />

### Register user

Register user No matter if it is a new user or an old user, they are all unregistered users in front of the new version of the API, and they need to use the following API to register.

<APIEndpoint url="/safe/users" method="POST" />

<APIPayload>
{`{
  "public_key": "ED25519-PUBLIC-KEY-HEX",
  "signature": "ED25519-SIGNATURE-OF-USER-UUID-HEX",
  "pin_base64": "TIP-PIN-BASE64"
}`}
</APIPayload>

<RespUser />

Each user needs to have their own ed25519 private key, which can be the same private key as the current robot or user’s session private key, or generate a new one. We recommend generating a new private key, which facilitates permission separation.

The corresponding PIN signature format is sha256.Sum256([]byte(“SEQUENCER:REGISTER:” + USER-UUID + PUBLIC-KEY-HEX)).

## Get a recharge address

The new version of the API can give any user, including a multi-signature group, a recharge address. For now, a user or a multi-signature group can only get one address, and repeated requests will get the same address.

<APIEndpoint url="/safe/deposit/entries" method="POST" />

<APIPayload>
{`{
  "members": ["UUID-USER-1", "UUID-USER-2"],
  "threshold": 1,
  "chain_id": "CHAIN-UUID"
}`}
</APIPayload>

<RespEntry />

## Transactions in progress

If you want to get the transactions that are being confirmed in the recharge process, you can get them through the following API, which is for the convenience of some applications to display the recharge progress and other aspects of the work.


<APIEndpoint url="/safe/deposits?asset=UUID&destination=ADDRESS&tag=TAG&offset=RFC3339NANO&limit=500" method="GET" />

<RespDeposits />


## Get UTXO list

Because the new version of the API is just a proxy for the mainnet RPC, all operations are based on UTXO. A user, or a multi-signature group, wants to get their own asset situation, needs to access the UTXO list API to get all the UTXO and add them up to get the balance of the relevant asset account.



<APIEndpoint url="/safe/outputs?members=HASH&threshold=NUMBER&offset=NUMBER&limit=NUMBER&state=unspent&order=ASC" method="GET" />

<RespOutputs />

The offset of this API is not using time, because all UTXO in Mixin Sequencer have a unique numeric sequence number sequence, which can be used directly to sort more conveniently.

## Transaction related

The new version of the transaction only has one API, whether it is a normal transfer, a multi-signature transfer, or even a withdrawal, etc., they all need the client to generate a Mixin mainnet compatible transaction and complete the signature, and then send it to the mainnet.

Regardless of whether the transaction initiator is a normal user or a multi-signature group, first get all the UTXO of this user or multi-signature group through the UTXO API, and then get or construct the recipient’s information to get a complete mainnet transaction, and finally send it to the mainnet RPC.

### Get payment information

If it is a withdrawal or directly transfer the assets to a Mixin Kernel address, this step is not required. Only when you want to transfer assets to a registered user or multi-signature group of Sequencer, you need to get the one-time payment information of the other party through this API.

<APIEndpoint url="/safe/keys" method="POST" />

<APIPayload>
{`[{
  "receivers": ["USER-1-UUID", "USER-2-UUID"],
  "index": 3,
  "hint": "UNIQUE-UUID"
}]`}
</APIPayload>

<RespGhosts />

### Verify transaction format

Regardless of whether the recipient is a Sequencer user, after the transaction is constructed, you need to send the transaction to Sequencer to verify that the transaction format is correct, and Sequencer will return the corresponding view key signature.

<APIEndpoint url="/safe/transaction/requests" method="POST" />

<APIPayload>
{`[{
  "request_id": "UNIQUE-UUID",
  "raw": "KERNEL-RAW-TRANSACTION"
}]`}
</APIPayload>

<RespRequests />

The successfully returned views array is exactly the view key part signature corresponding to each input in order. Note that both the input and output of this API are arrays, which is for the convenience of batch verification of transactions.

### Sign and send transaction

After receiving the view key signature from Sequencer, the client can use their own ed25519 private key to perform the second formal signature, and the specific code of the signature can be operated using the relevant SDK. At this time, the entire transaction is considered to be completely constructed, and then it can be sent out through the following API.

<APIEndpoint url="/safe/transaction" method="POST" />

<APIPayload>
{`[{
  "request_id": "UNIQUE-UUID",
  "raw": "KERNEL-RAW-TRANSACTION"
}]`}
</APIPayload>

<RespRequests />

Note that this transaction can be sent directly through the Mixin Kernel mainnet RPC, but we do not recommend this operation, because if it is sent directly, Sequencer cannot correctly index this transaction and cannot provide transaction and snapshot query services.

### Query transaction

After the transaction is correctly sent out through the Sequencer API, you can query the transaction status through the request UUID.

<APIEndpoint url="/safe/transactions/:id" method="GET" />

<RespRequest />

## Snapshot

The new version of the API provides a relatively compatible snapshots API for ease of use, which is similar to the old version of the API, and can only get the transaction list of a single user, including all the transfers in and out of this user.

If the authentication information of the request for this API is a robot, you can add the app parameter to return the snapshots of all sub-users created by this robot.

<APIEndpoint url="/safe/snapshots?asset=UUID&app=UUID&opponent=UUID&offset=RFC3339NANO&limit=500" method="GET" />

<RespSnapshots />

## multisigs

The new version of multi-signature is the same as the old version. The client still needs to construct a raw transaction. Other operations are similar to those of the old version.

### create multisigs

<APIEndpoint url="/safe/multisigs" method="POST" />

<APIPayload>
{`[{
  "request_id": "UNIQUE-UUID",
  "raw": "KERNEL-RAW-TRANSACTION"
}]`}
</APIPayload>

<RespMultisigRequests />

### sign multisigs

<APIEndpoint url="/safe/multisigs/:id/sign" method="POST" />

<APIPayload>
{`{
  "request_id": "UNIQUE-UUID",
  "raw": "KERNEL-RAW-TRANSACTION"
}`}
</APIPayload>

<RespMultisigRequest />

### unlock multisigs

notice, multisigs can only be canceled if the signature is not completed

<APIEndpoint url="/safe/multisigs/:id/unlock" method="POST" />

<APIPayload>
{`{
  "request_id": "UNIQUE-UUID",
  "raw": "KERNEL-RAW-TRANSACTION"
}`}
</APIPayload>

<RespMultisigRequest />

### fetch multisigs

<APIEndpoint url="/safe/multisigs/:id" method="GET" />

<APIPayload>
{`{
  "request_id": "UNIQUE-UUID",
  "raw": "KERNEL-RAW-TRANSACTION"
}`}
</APIPayload>

<RespMultisigRequest />


## Precautions

The new version of the API has no changes in the data format of the request and return, including the authentication of JWT and OAuth. In addition, most of the old APIs, as long as they are unrelated to assets, are still normally available, such as contacts, messages, groups, etc.

### MEMO format

All memo or extra fields in the new version of the API are now uniformly HEX encoded raw data, that is, whatever the user or robot enters is what it is, and there is no longer any special encoding requirements such as msgpack or base64.

### New error code

One thing to note is a new error code 10404, which means that this user has not registered to the latest API, and it is recommended to send a reminder to the user to let them upgrade as soon as possible to use it.

### Batch transfer

Because the new API is completely based on the Mixin Kernel mainnet transaction format, you can freely combine and use UTXO, such as if you want to transfer to 100 people at the same time, you can request the payment information of 100 people at once and then construct a transaction to complete it.
