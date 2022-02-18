---
title: Upload Album
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

upload custom album, [album sticker format](/docs/dapp/design/sticker)

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
