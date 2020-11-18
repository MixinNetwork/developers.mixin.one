# 下载附件

附件存储到亚马逊 S3 服务器用 HTTP 下载即可，参见 [S3 文档](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html)。

### `GET /attachments/:id`

```json
{  
  "data": $$XIN:attachment$$
}
```

通过 view_url 下载附件，如果接口返回 404 说明文件不存在或者已过期。
