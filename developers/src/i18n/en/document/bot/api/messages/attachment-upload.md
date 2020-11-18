# Upload Attachment

Create an attachment upload address. We use s3 as our storage, you can follow s3 Browser-Based Upload using HTTP POST. https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html.

### `POST /attachments`

```
$$XIN:curl$$ "https://api.mixin.one/attachments" -XPOST
```

```json
{  
  "data": $$XIN:attachment$$
}
```
