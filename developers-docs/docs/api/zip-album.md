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

## POST /albums

<APIEndpoint url="/albums" />

<APIMetaPanel scope="Authorized" />

<APIParams p-data_zip_base64="album zip file encoded with base64" p-data_zip_base64-required={true} />

<APIRequest
  title="POST album"
  method="POST"
  url="/albums"
/>

<RespAlbumExtra />
