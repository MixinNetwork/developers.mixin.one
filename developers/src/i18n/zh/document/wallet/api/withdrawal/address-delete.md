# 删除提现地址

### `POST /addresses/:id/delete` 

```
$$XIN:curl$$ "https://api.mixin.one/addresses/ba3a2e33-efde-40b9-9cac-c293f0d1a3f2/delete" -XPOST --data '{"pin":"d2EJy5kmt56d3U5PeKm+TJLBnXBuyxBTcWxytL8pk/LXwJEak9r8iVMcASjgvoO+"}'
```

成功返回空的 json 。

---
没有修改提现地址的 API，产品想实现这个功能可以先删后新增。
