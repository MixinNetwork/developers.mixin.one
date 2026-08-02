---
title: Introduction
description: Mixin Network, a free, lightning fast and decentralized network for transferring digital assets.
---

Mixin Network is an open network for developers building asset and messaging applications with the Mixin API.

According to their business needs, developers can build websites, Apps, Messenger bots, and other integrations based on Mixin Network.

## Create Mixin Applications

Mixin Applications are applications that use Mixin Network. They can be websites, Apps, Messenger bots, or any other form of application that uses the Mixin API.

:::info
Mixin Applications use the Mixin API, which provides a simpler interface to Mixin services. Please read the [Mixin API Reference](api/guide) for more details.
:::

### Messenger Bot

Most Mixin Applications have an interface called "Messenger bot"(shortened to "bot").

The bot is very similar to Telegram bot. It’s a program running on a server and interact with human being users with Mixin API.

Usually, people interacts with bots in a webview, or just chat with bots. Because of that, the bot should host a web service or respond to incoming messages to get its work done.

Here is [a tutorial](app/getting-started/create-app) that shows you how to build a bot with the Mixin API:

### Integrate with Mixin

Some Mixin Applications don't need the bot interface. They could be a website or a standalone mobile App.

A common scene is that your business runs well, but you want to make it cooler with cryptocurrency. So you need to integrate an existing system with Mixin.

The first thing you need to do is same as above, creating a bot. And then, it's time to think about the way to integrate with Mixin.

For example, if you have a CMS for multiple users, you want to put a donate button at the bottom of each post and receive money from audiences; you need to learn to create accounts for each author, manage accounts' keystores, sync and handle snapshots for each author in the CMS to transfer money to them.

Please read [this guide](app/mixin-applications) for more details.

## Features

- Secure - All assets are stored in PoS-BFT-DAG distributed network
- Fast - More than 1,000,000 TPS capacity with a final confirmation time of under 1 second.
- Powerful - Supported 32 blockchains, such as BTC, ETH, XMR.
- Free - No transaction fee.
- Privacy - End to end encrypted messages.

## Staying informed

- [Github](https://github.com/MixinNetwork)
- [Twitter](https://twitter.com/Mixin_Network)
- [Discussions](https://github.com/MixinNetwork/mixin/discussions)

## Something missing?

If you find issues with the documentation or have suggestions on how to improve the documentation or the project in general, please [file an issue](https://github.com/MixinNetwork/developers.mixin.one/issues) for us, or send a tweet mentioning the @[Mixin_Network](https://twitter.com/Mixin_Network) Twitter account.
