# 下载附件

附件存储到亚马逊 S3 服务器用 HTTP 下载即可，参见 [S3 文档](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html)。

### `GET /attachments/:id`

```
{  
  "data":{  
    "type":"attachment",
    "attachment_id":"7a54e394-1626-4cd4-b967-543932c2a032",
    "view_url":"https://moments.shou.tv/mixin/attachments/1526305123-de9892550143c713c45f6265c9e61959ebfac6cc8de4badf5c0489636796ad8a"
  }
}
```

通过 view_url 下载附件，如果接口返回 404 说明文件不存在或者已过期。