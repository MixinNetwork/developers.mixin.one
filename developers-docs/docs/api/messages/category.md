---
title: Message Category
sidebar_position: 2
---

import {
  APIResponse,
} from "@site/src/components/api";

Mixin Messenger supports texts, images, stickers, files and other message types. Note that bots currently only support message types with the prefix `PLAIN_`.

To send images, files, and videos, you need to upload attachments and obtain attachment_id before sending.

## Texts

<APIResponse name="msg_text" />

## Stickers

<APIResponse name="msg_sticker" />

## Images

<APIResponse name="msg_image" />

## Audios

<APIResponse name="msg_audio" />

## Videos

<APIResponse name="msg_video" />

## Contacts

<APIResponse name="msg_contact" />

## Cards

<APIResponse name="msg_card" />

:::tip
Card forwarding can be prohibited by setting the `shareable` field to false. This feature is supported by Mixin Messenger 0.31.0 or above, and the default value is true.
:::

:::tip
The `cover_url` and `actions` fields have been added to the data structure. If the data structure contains the `action` field, the client will use the old card style and ignore any other parameters related to the new card style. The new card style, which includes the `cover_url` and `actions` fields, is supported by Mixin Messenger version 1.9.0 and above.
:::

## Files

<APIResponse name="msg_file" />

## Live Shows

<APIResponse name="msg_live" />

## Locations

<APIResponse name="msg_location" />

## Posts

<APIResponse name="msg_post" />

## Buttons

<APIResponse name="msg_buttons" />

## Transfers

<APIResponse name="msg_transfer" />

## Pin Messages

<APIResponse name="pin_message" />
