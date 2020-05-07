---
title: Websocket Authentication
category: Websocket
order: 20
---

Websocket can be used to receive and handle messages. Here are the things that should be noticed:

1. Use gzip to compress message data.
2. Must send `LIST_PENDING_MESSAGES` to receive pending messages.

How to connect to the Websocket.

```golang
func ConnectMixinBlaze(token string) (*websocket.Conn, error) {
  header := make(http.Header)
  header.Add("Authorization", "Bearer "+token)
  u := url.URL{Scheme: "wss", Host: "blaze.mixin.one", Path: "/"}
  dialer := &websocket.Dialer{
    Subprotocols: []string{"Mixin-Blaze-1"},
  }
  conn, _, err := dialer.Dial(u.String(), header)
  if err != nil {
    return nil, err
  }
  return conn, nil
}
```
