# PIN Verification

### `POST /pin/verify` 

The HTTP request body:

| Name | Type | Description |
| :----- | :----: | :---- |
| pin | String | Encrypted PIN |

```
$$XIN:curl$$ "https://api.mixin.one/pin/verify" -X POST --data '{"pin":"+mRm5rm9bkQztvpsaTyz1Rib0BEM0S1FKl/oYaMfbUJM3ZmrxJhafj/tjHi+3kwQ"}'
```

The above return an empty json on success.

### Error 20119 Debugging
- If you forget your PIN, there is no way to retrieve it. It is recommended to try 5 times a day and write down the tried code on paper.
- It might be due to the misuse of `iterator`, which should be incremental. Generally, it is recommended to use the current system Nano time, or you can set a number by yourself, and increment it with each call.
- The encrypted PIN is wrong, such as wrong format, wrong time, etc. It may be a problem of the SDK itself. It is recommended to contact the SDK developer for help.

Pay attention to the `extra` field in the returned error message. The error count will only increase if the PIN is incorrect, and the wrong `iterator` or wrong encrypted PIN will not cause the PIN to be locked.
