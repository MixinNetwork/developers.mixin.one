---
title: Authentication
position: 1
parameters:
  - name:
    content:
content_markdown: |-
  Mixin use The WebSocket Protocol to handle messages. You also need to use gzip to compress before you send it. You must send `LIST_PENDING_MESSAGES`, in order to receive pending messages.

  ``` json
    {
      "id": "89e0bdee-c355-47f2-945a-be48be875606",
      "action": "LIST_PENDING_MESSAGES",
    }
  ```

  You can also find a full example about how to handle messages, [https://github.com/crossle/hacker-news-mixin-bot](https://github.com/crossle/hacker-news-mixin-bot)

left_code_blocks:
  - code_block:
    title:
    language:
right_code_blocks:
  - code_block: |-
      // token is signed authentication token
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
    title: 
    language: golang
---
