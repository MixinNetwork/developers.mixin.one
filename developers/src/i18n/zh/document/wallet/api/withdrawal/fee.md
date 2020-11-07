# 提现手续费

### `GET /assets/:id/fee` 

```
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiIzNDcwNzFjYS0zOThkLTQ4M2QtODc3MS1iNWVlNzZmNDRhZDMiLCJleHAiOjE1NTU3MzcxMDksImlhdCI6MTUyNDIwMTEwOSwiaXNzIjoiMWQxNWMzZDAtY2IxNy00NzJkLWJjNjItYjEwYjE1NTUzNzMyIn0.RdTBh-egdWGv0saL5yhuuA5YI1ch87bTJ0jKOwmKu0HT3VgbjeEsC8n9I7sXl8rn8IKYRQAFDvS90RUSN0aVV0J2t0L3HLEXN5gLW7eAOM4PsJP4HgkAUreHbRVg1uDSKGtrFfnZ7CoIg5HId-7quL480Q8de_M6pW5ASMNQVGg" "https://api.mixin.one/assets/3596ab64-a575-39ad-964e-43b37f44e8cb/fee"
```

```json
{  
  "data":{
    "type": "fee",
    "asset_id": "43d61dcd-e413-450d-80b8-101d5e903357",
    "amount":   "0.01",
  }
}
```