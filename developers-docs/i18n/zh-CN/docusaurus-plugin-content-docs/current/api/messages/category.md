---
title: Message Category
sidebar_position: 2
---

import MsgCatText from "@site/docs/_partials/_resp.msg.d/text.md";
import MsgCatAudio from "@site/docs/_partials/_resp.msg.d/audio.md";
import MsgCatButtons from "@site/docs/_partials/_resp.msg.d/buttons.md";
import MsgCatCard from "@site/docs/_partials/_resp.msg.d/card.md";
import MsgCatContact from "@site/docs/_partials/_resp.msg.d/contact.md";
import MsgCatFile from "@site/docs/_partials/_resp.msg.d/file.md";
import MsgCatImage from "@site/docs/_partials/_resp.msg.d/image.md";
import MsgCatLive from "@site/docs/_partials/_resp.msg.d/live.md";
import MsgCatLocation from "@site/docs/_partials/_resp.msg.d/location.md";
import MsgCatPost from "@site/docs/_partials/_resp.msg.d/post.md";
import MsgCatSticker from "@site/docs/_partials/_resp.msg.d/sticker.md";
import MsgCatTransfer from "@site/docs/_partials/_resp.msg.d/transfer.md";
import MsgCatVideo from "@site/docs/_partials/_resp.msg.d/video.md";
import MsgEncrypt from "@site/docs/_partials/_resp.msg.d/encrypt.md";

Mixin Messenger supports texts, images, stickers, files and other message types. Note that bots currently only support message types with the prefix `PLAIN_` and `ENCRYPTED_`.

To send images, files, and videos, you need to upload attachments and obtain attachment_id before sending.

## Texts

<MsgCatText />

## Stickers

<MsgCatSticker />

## Images

<MsgCatImage />

## Audios

<MsgCatAudio />

## Videos

<MsgCatVideo />

## Contacts

<MsgCatContact />

## Cards

<MsgCatCard />

:::tip
Card forwarding can be prohibited by setting the `shareable` field to false. This feature is supported by Mixin Messenger 0.31.0 or above, and the default value is true.
:::

## Files

<MsgCatFile />

## Live Shows

<MsgCatLive />

## Locations

<MsgCatLocation />

## Posts

<MsgCatPost />

## Buttons

<MsgCatButtons />

## Transfers

<MsgCatTransfer />

<MsgEncrypt />
