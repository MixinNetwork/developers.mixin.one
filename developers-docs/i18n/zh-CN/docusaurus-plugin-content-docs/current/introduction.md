---
title: Introduction
description: Mixin Network, a free, lightning fast and decentralized network for transferring digital assets.
---

You can do a lot on Mixin Network. It all depends on what do you want.

## Dive into the Kernel

If you want to build something with the kernel, or create a fork of Mixin Network with some modifications you like, you’d better read the [source code of Mixin Mainnet](https://github.com/MixinNetwork/mixin).

Nevertheless, there are some tutorials that useful:

- [Sync full node](mainnet/tutorials/sync-full-node) - run mixin node in sync mode, sync all snapshots from the Kernel.
- [Deploying Full Node](mainnet/tutorials/full-node-join) - run mixin node in lcoal machine.

## Create Mixin Applications

Mixin Applications are applications that use the Mixin Network. Most of Mixin Applications have an interface called "Messenger bot"(shortened to "bot").

The bot is very similar to Telegram bot. It’s some code running on a server and interact with human being users with Messenger API.

Usually, people interact with bots in a webview, or just chat with bots. Because of that, the bot should host a web service or respond to incoming messages to get its work done.

Here is a tutorial that shows you how to build a bot with the Mixin API:

- [Getting Started](dapp/gettting-started/create-dapp) - build a Mixin Application with the Mixin API.

:::info
Mixin Application uses the Mixin API, a API set that provides the interface for the Mixin Mainnet, simplifys the development of Mixin. Please read [Mixin API Reference](api/guide) for more details.
:::


## Integrate with Mixin

Another common scene is that your business runs well, but you want to make it cooler with cryptocurrency. So you need to integrate your business system with Mixin.

The first thing you need to do is same as above, creating a bot. And then, it's time to think about the way to integrate with Mixin.

For example, if you have a CMS for multiple users, you want to put a donate button at the bottom of each post and receive money from audiences; you need to learn to create accounts for each author, manage accounts' keystores, sync and handle snapshots for each author in the CMS to transfer money to them.

The following examples are also handful for your goal.

    _examples/wallet - an example that shows how to operate an account of Mixin Network, includes verifying and changing PIN, transferring assets, reading transfers and snapshots, creating accounts by a keystore.
    _example/echo_proxy - an example that shows how to provide a proxy service to forward all requests to api.mixin.one

If you are familiar with how webpage connect with Ethereum via MetaMask, please try Fennec, the open source browser wallet on Mixin Network.

    Fennec - the source and the demos
