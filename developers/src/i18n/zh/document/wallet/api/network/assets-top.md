### 全网排名前 100 的资产列表

查询全网排名前 100 的资产列表, 排名换 Mixin Network 里的市值排名，例如 Mixin Network 里有 10000 个 BTC, 当前价格为 $20000, 市值为 10000 * 20000

### `GET /network/assets/top` 

```
$$XIN:curl$$ "https://api.mixin.one/network/assets/top"
```

```json
{  
  "data":{  
    "assets":[  
      $$XIN:asset$$,
    ....
    ]
  }
}
```
