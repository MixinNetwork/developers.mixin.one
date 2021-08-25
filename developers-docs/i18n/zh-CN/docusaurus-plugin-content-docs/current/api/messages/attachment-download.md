---
title: Download Attachment
sidebar_position: 6
---

import RespAttachment from '../../_partials/_resp.attachment.md'

## GET /attachments/:id

Attachments can be stored on Amazon S3 and downloaded via HTTP, see [S3 Documentation](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html) for more information.


<RespAttachment />

:::info
You can download the attachment through view_url. If the API returns a 404, it means that the file does not exist or has expired.
:::
