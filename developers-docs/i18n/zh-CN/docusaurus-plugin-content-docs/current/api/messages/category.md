---
title: 消息类型
sidebar_position: 2
---

import {
  APIResponse,
} from "@site/src/components/api";

Mixin Messenger 支持文本、图片、贴纸、文件等多种消息类型。需要注意，机器人目前仅支持以 `PLAIN_` 为前缀的消息类型。

发送图片、文件和视频前，需要先上传附件并获取 attachment_id。

## 文本

<APIResponse name="msg_text" />

## 贴纸

<APIResponse name="msg_sticker" />

## 图片

<APIResponse name="msg_image" />

## 音频

<APIResponse name="msg_audio" />

## 视频

<APIResponse name="msg_video" />

## 联系人

<APIResponse name="msg_contact" />

## 卡片

<APIResponse name="msg_card" />

:::tip
将 `shareable` 字段设置为 false 可以禁止转发卡片。该特性需要 Mixin Messenger 0.31.0 及以上版本，默认值为 true。
:::

:::tip
数据结构新增了 `cover_url` 与 `actions` 字段。如果结构中仍包含 `action` 字段，客户端会使用旧版卡片样式并忽略与新版样式相关的其它参数。新版卡片样式（包含 `cover_url` 与 `actions`）需要 Mixin Messenger 1.9.0 及以上版本支持。
:::

## 文件

<APIResponse name="msg_file" />

## 直播

<APIResponse name="msg_live" />

## 位置

<APIResponse name="msg_location" />

## 动态

<APIResponse name="msg_post" />

## 按钮

<APIResponse name="msg_buttons" />

## 转账 {#transfers}

<APIResponse name="msg_transfer" />

## 置顶消息

<APIResponse name="pin_message" />
