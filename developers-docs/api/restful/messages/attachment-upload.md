---
title: Upload Attachments
sidebar_position: 5
---

Mixin Messenger uploads the attachments using HTTP and store them on the Amazon S3, see [S3 documentation](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html) for more information.

## POST /attachment

```bash
$$XIN:curl$$ "https://api.mixin.one/attachments" -X POST
```

```json
{
  "Data": $$XIN: Attachment$$
}
```

Upload the attachment to upload_url, and then the attachment_id can be used sending images, videos, files and other messages.
