---
title: 上传相册
sidebar_position: 30
---

import RespAlbumExtra from "@site/docs/_partials/_resp.album.md";
import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

上传自定义相册，格式要求见 [贴纸相册规范](/docs/dapp/design/sticker)

## POST /albums

<APIEndpoint url="/albums" />

<APIMetaPanel scope="Authorized" />

<APIParams p-data_zip_base64="使用 Base64 编码的相册 zip 文件" p-data_zip_base64-required={true} />

<APIRequest
  title="POST album"
  method="POST"
  url="/albums"
/>

<RespAlbumExtra />
