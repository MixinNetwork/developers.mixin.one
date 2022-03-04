---
title: MVM setup
sidebar_position: 1
---

:::info
This is a testnet of MVM, all the operations below are executed in the MVM testnet
:::

Based on Mixin Trusted Group, we can be built an MTG network, which allows developers to deploy smart contracts on it. The network is run by multiple nodes utilizing POS consensus.

The network does not run any smart contract virtual machines, it works with existing networks such as Ethereum, EOS or Solana. Here we're using EVM.

This group can receive some transactions from Messenger users, and these transactions will be placed in Extra according to some certain rules. Then the group will parse the information according to the rules and save it. Meanwhile, those informations will be used to call the contract. The developer contract can receive notifications in the group contract.

In some cases, the developer contract needs to send a message or transfer notification to Messenger users. The group contract needs to be called, and then send a message to some Messenger users.

## 1. Register a Dapp

Create a DAPP [guide](/docs/dapp/getting-started/create-dapp)

:::info
After create the Dapp，you should transfer 10 CNB for transaction fee
:::

## 2. Setup Metamask

How to setup Metamask [guide](/docs/mainnet/mvm/metamask)

## 3. How to use Remix 

How to deploy a contract with Remix [gide](/docs/mainnet/mvm/remix)

## 4. Pubish a MVM APP

Clone Trusted Group to local, url https://github.com/MixinNetwork/trusted-group, build ./mvm

How to install golang [guide](https://go.dev/doc/install)

Copy ./config/config.example.toml to config/config.toml

```
mvm publish -m config/config.toml -k keystore.json \
  -a 0x2A4630550Ad909B90aAcD82b5f65E33afFA04323 \
  -e 0x1938e2332d7963eff041af4f67586572899c7c7d279c07ac29feb745f8d9b6d6
```

- **-k** is the private key of the app
- **-a** the address of the contrace, case-sensitive
- **-e** the contract transaction id

:::info
Notice: an app can only deploy one contract address, and the contract cannot be updated. That means, once the publish is successful, the corresponding app UUID and contract address cannot be used again. For convenience, it is more convenient to use the app **7000103716** to obtain a bare user UUID and deploy.
:::

## 5. Invoke contract through MVM

Generate a QR code for user to payment, in order to invoke contract.

```
mvm invoke -m config/config.toml -k keystore.json \
  -p b9126674-b07d-49b6-bf4f-48d965b2242b
```

- **-p** the UUID of the app
