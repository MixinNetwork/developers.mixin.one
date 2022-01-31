---
title: 添付ファイルのアップロード
sidebar_position: 5
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespAttachment from "../../_partials/_resp.attachment.md";

## POST /attachments

添付ファイルのアップデートには、まず新規添付ファイルを作成する必要があります。

<APIEndpoint url="/attachments" />

<APIMetaPanel scope="Authorized" />

<APIPayload>{`{
  // Just leave them empty.
  "attachment_id":  "",
  "upload_url":     "",
  "view_url":       "",
}
`}</APIPayload>

<APIRequest
  title="Update attachment meta info"
  method="POST"
  url="/attachments --data PAYLOAD"
/>

<RespAttachment />

### 添付ファイルのアップロード

上記のレスポンスから `upload_url` を取得します。ここで、添付ファイルを `upload_url` にアップロードすると、 `attachment_id` を使って画像、動画、ファイル、その他メッセージの送信が可能になります。


Mixin Messengerは添付ファイルをHTTPでアップロードし、Amazon S3に保存します。詳細は、[S3 documentation](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html)をご覧ください。

右記は、添付ファイルをアップロードする[コードスニペット](https://github.com/fox-one/mixin-sdk-go/blob/master/attachment.go#L42)です。
