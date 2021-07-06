# Downloading Attachments

Attachments can be stored on Amazon S3 and downloaded via HTTP, see [S3 Documentation](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html).

### `GET /attachments/:id`

```json
{
  "data": $$XIN:attachment$$
}
```

Download the attachment through view_url. If the interface returns a 404, it means that the file does not exist or has expired.
