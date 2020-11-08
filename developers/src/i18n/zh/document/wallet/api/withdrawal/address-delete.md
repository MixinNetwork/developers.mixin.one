# 删除提现地址

### `POST /addresses/:id/delete` 

```
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTY4NTEsImlhdCI6MTUyNTM0MDg1MSwianRpIjoiMmVkYWFjNzgtMzBjOS00MmI0LWJlMGEtMTVhMTJmZDdmZmM1Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiYWY5YzMwOGEwYmU4YzI0OTNiYmIyYWY2YzQ5YzhjODVkZjZkZTZlYjFhZTAwZjcwZjBjZmM2YTE5YmUyNTRlMyIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.JuGSnuK-zH-F9ifKB1eDj7sE1mtA20RH7pprVJjczL-QiuKgmDF6Mdyadp0QX9Pf8sUGNY2r-bdpRxji1JtG62lXhSi_62GGGKVB8VLO-9Kf25Y7vH89qh431BKN8C0NAS9AUYbL7UyiY-d2TiRKewa2gIWVr2pt5zeIP4vIJSg" "https://api.mixin.one/addresses/ba3a2e33-efde-40b9-9cac-c293f0d1a3f2/delete" -XPOST --data '{"pin":"d2EJy5kmt56d3U5PeKm+TJLBnXBuyxBTcWxytL8pk/LXwJEak9r8iVMcASjgvoO+"}'
```

成功返回空的 json 。

---
没有修改提现地址的 API，产品想实现这个功能可以先删后新增。