# 上传附件

我们会将附件存储到亚马逊 S3 服务器，用 HTTP 上传即可，参见 [S3 文档](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html)。

### `POST /attachments`

```
$$XIN:curl$$ "https://api.mixin.one/attachments" -X POST
```

```json
{  
  "data": $$XIN:attachment$$
}
```

将附件上传到 upload_url 这个地址，然后 attachment_id 就可以用于发图片、视频、附件等消息了。
