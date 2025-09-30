---
title: 上传附件
sidebar_position: 5
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespAttachment from "@site/docs/_partials/_resp.attachment.md";

## POST /attachments

上传附件前，需要先创建附件对象。

<APIEndpoint url="/attachments" />

<APIMetaPanel scope="Authorized" />

<APIPayload>{`{
  // 保持为空
  "attachment_id":  "",
  "upload_url":     "",
  "view_url":       ""
}
`}</APIPayload>

<APIRequest
  title="Update attachment meta info"
  method="POST"
  url="/attachments --data PAYLOAD"
/>

<RespAttachment />

### 上传附件

响应中会返回 `upload_url`。将文件上传到该地址后，就可以使用 `attachment_id` 发送图片、视频、文件等消息。

Mixin Messenger 通过 HTTP 将附件上传至 Amazon S3，更多细节请参考 [S3 文档](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html)。

上传附件的示例代码可见：[代码片段](https://github.com/fox-one/mixin-sdk-go/blob/master/attachment.go#L42)。
