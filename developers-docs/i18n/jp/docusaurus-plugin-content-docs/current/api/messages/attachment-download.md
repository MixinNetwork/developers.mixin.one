---
title: 添付ファイルのダウンロード
sidebar_position: 6
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespAttachment from "../../_partials/_resp.attachment.md";

## GET /attachments/:id

添付ファイルを取得する際は、`:id`を利用してください。

添付ファイルはすべてAmazon S3に保存され、HTTPでダウンロードされます。詳細は、[S3 Documentation](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html)をご覧ください。

<APIEndpoint url="/attachments/:id" />

<APIMetaPanel scope="Authorized" />

<APIParams
  p-id="The attachment id. You can get it from POST /attachemts"
  p-id-required={true}
/>

<APIRequest
  title="Update attachment meta info"
  method="POST"
  url="/attachments/$ATTACHMENT_ID"
/>

<RespAttachment />

:::注意
`view_url`から添付ファイルをダウンロードすることができます。APIが404を返した場合、ファイルが存在しないか、ファイルの有効期限が切れています。
:::
