---
title: 上传表情包
sidebar_position: 30
---

import RespAlbumExtra from "../_partials/_resp.album.md";
import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

上传自定义表情包, 具体的表情包格式参照: [贴纸制作规范](/zh-CN/docs/dapp/design/sticker)

## POST /album


<APIEndpoint url="/album" />

<APIMetaPanel scope="Authorized" />

<APIParams p-data_zip_base64="表情包的 zip 文件" p-data_zip_base64-required={true} />

<APIRequest
  title="POST album"
  method="POST"
  url="/albums"
/>

<RespAlbumExtra />
