# Deleting Withdrawal Addresses

### `POST /addresses/:id/delete` 

```
$$XIN:curl$$ "https://api.mixin.one/addresses/ba3a2e33-efde-40b9-9cac-c293f0d1a3f2/delete" -XPOST --data '{"pin":"d2EJy5kmt56d3U5PeKm+TJLBnXBuyxBTcWxytL8pk/LXwJEak9r8iVMcASjgvoO+"}'
```

The above will return an empty json on success.

---
There is no API for editing withdrawal addresses. If you want to implement editing in your product, please first delete and then add.