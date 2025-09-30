---
title: 下载附件
sidebar_position: 6
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespAttachment from "@site/docs/_partials/_resp.attachment.md";

## GET /attachments/:id

根据附件 ID 获取附件。

所有附件存储在 Amazon S3，并通过 HTTP 下载，更多信息可参考 [S3 文档](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html)。

<APIEndpoint url="/attachments/:id" />

<APIMetaPanel scope="Authorized" />

<APIParams
  p-id="附件 ID，可通过 POST /attachments 获取"
  p-id-required={true}
/>

<APIRequest
  title="Update attachment meta info"
  method="POST"
  url="/attachments/$ATTACHMENT_ID"
/>

<RespAttachment />

:::info
可以通过返回的 view_url 下载附件。如果接口返回 404，表示文件不存在或已过期。
:::
