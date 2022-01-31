---
title: メッセージの種類
sidebar_position: 2
---

import {
  APIResponse,
} from "@site/src/components/api";

Mixin Messengerは、テキスト、画像、ステッカー、ファイルなどのメッセージタイプに対応しています。ロボは現在、各メッセージタイプの接頭に`PLAIN_`と記入されているメッセージタイプのみをサポートしていることに注意してください。

画像、ファイル、動画を送信するには、送信前に添付ファイルをアップロードし、`attachment_id`を取得する必要があります。

## テキスト

<APIResponse name="msg_text" />

## ステッカー

<APIResponse name="msg_sticker" />

## 画像

<APIResponse name="msg_image" />

## ボイスメッセージ

<APIResponse name="msg_audio" />

## 動画

<APIResponse name="msg_video" />

## 連絡先

<APIResponse name="msg_contact" />

## カード

<APIResponse name="msg_card" />

:::注意
`shareable`を`false`に設定することで、カードの転送を禁止することができます。この機能は Mixin Messenger 0.31.0 以降でサポートされており、デフォルトでは`true`に設定されています。
:::

## ファイル

<APIResponse name="msg_file" />

## ライブ配信

<APIResponse name="msg_live" />

## 位置情報

<APIResponse name="msg_location" />

## 記事

<APIResponse name="msg_post" />

## ボタン

<APIResponse name="msg_buttons" />

## 送信

<APIResponse name="msg_transfer" />

## ピン留めされたメッセージ

<APIResponse name="pin_message" />
