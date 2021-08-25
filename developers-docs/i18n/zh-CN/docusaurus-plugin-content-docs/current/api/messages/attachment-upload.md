---
title: Upload Attachments
sidebar_position: 5
---

import Request from '../../_partials/request'
import RespAttachment from '../../_partials/_resp.attachment.md'

Mixin Messenger uploads the attachments using HTTP and store them on the Amazon S3, see [S3 documentation](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html) for more information.

## POST /attachment

Update attachment metadata.

<Request title="Update attachment meta info" method="POST" url="/attachments --data PAYLOAD" />

<RespAttachment />

Upload the attachment to `upload_url`, and then the `attachment_id` can be used sending images, videos, files and other messages.
