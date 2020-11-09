### Live Exchange Rates

Read Live Exchange Rates.

### `GET /fiats` 

```
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiIzNDcwNzFjYS0zOThkLTQ4M2QtODc3MS1iNWVlNzZmNDRhZDMiLCJleHAiOjE1NTU3MzcxMDksImlhdCI6MTUyNDIwMTEwOSwiaXNzIjoiMWQxNWMzZDAtY2IxNy00NzJkLWJjNjItYjEwYjE1NTUzNzMyIn0.RdTBh-egdWGv0saL5yhuuA5YI1ch87bTJ0jKOwmKu0HT3VgbjeEsC8n9I7sXl8rn8IKYRQAFDvS90RUSN0aVV0J2t0L3HLEXN5gLW7eAOM4PsJP4HgkAUreHbRVg1uDSKGtrFfnZ7CoIg5HId-7quL480Q8de_M6pW5ASMNQVGg" "https://api.mixin.one/fiats"
```

```json
{
  "data": [
    {"code":"ISK","rate":121.13998},
    {"code":"CNY","rate":6.9669},
    ...
  ]
}
```