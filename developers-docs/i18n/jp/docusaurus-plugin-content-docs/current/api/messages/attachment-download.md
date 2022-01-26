---
title: Download Attachment
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

Use the :id to get a specific attachment.

All attachments are stored on Amazon S3 and downloaded via HTTP, see [S3 Documentation](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html) for more information.

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

:::info
You can download the attachment through view_url. If the API returns a 404, it means that the file does not exist or has expired.
:::
