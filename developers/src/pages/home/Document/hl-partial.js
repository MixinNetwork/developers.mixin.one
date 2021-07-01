const curl = `curl -i -H "Content-Type: application/json"`
const token = `-H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMDg3OTYsImlhdCI6MTUyNTMzMjc5NiwianRpIjoiYzJiYzFiY2MtZTA4ZC00M2JlLWJhN2EtZGJlMWFlN2UxMzU3Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiYzlkNDU1M2Q3ZmI3YjM4NDkxZjAxMmYyODQ0MTNhZmM0ODYzZTdhYWM4Nzg2NTVkNWU3NWFmM2VjYjQ0NjE5MyIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.vBp791ho-lgGgGnRWw3CAtRXgK7TvQxXwYOikB-XVbBGRYeMEmkGdja8r461w-5t5JzEt9Y-yNYGWRE0oZ8DEuxgdcBe13FIP4UBgFw7dTG1SyvcQEO0BQtfiBL_8de8VuKntezfONkseOXUkG6IQ2qCBzZgijLwIbh3h-wPs6Q"`

export default {
  curl: curl + token,
  user: {
    "type": "user",
    "user_id": "773e5e77-4107-45c2-b648-8fc722ed77f5",
    "identity_number": "7000",
    "phone": "+8613801380138",
    "full_name": "Team Mixin",
    "biography": "",
    "avatar_url": "https://images.mixin.one/E2y0BnTopFK9qey0YI-8xV3M82kudNnTaGw0U5SU065864SsewNUo6fe9kDF1HIzVYhXqzws4lBZnLj1lPsjk-0=s256",
    "relationship": "STRANGER",
    "mute_until": "0001-01-01T00:00:00Z",
    "created_at": "2017-12-23T18:23:26.996149Z",
    "is_verified": true
  },
  user_extra: {
    "session_id": "a34c07a9-755d-4b54-94c5-e45e9a2dd43e",
    "pin_token": "",
    "code_id": "dabcf1c2-6a5e-4ea3-ad51-6e6641a06c7c",
    "code_url": "https://mixin.one/codes/dabcf1c2-6a5e-4ea3-ad51-6e6641a06c7c",
    "has_pin": true,
    "has_emergency_contact": true,
    "receive_message_source": "CONTACTS",
    "accept_conversation_source": "CONTACTS",
    "fiat_currency": "USD",
    "transfer_notification_threshold": 0
  },
  conversation: {
    "type": "conversation",
    "conversation_id": "928c5c40-769c-3e97-8387-fb1ae0645311",
    "creator_id": "8dcf823d-9eb3-4da2-8734-f0aad50c0da6",
    "category": "GROUP",
    "name": "",
    "icon_url": "",
    "announcement": "",
    "created_at": "2018-05-16T12:34:44.134238105Z",
    "code_id": "d8244b92-30e9-44b5-bfb0-ce597c788125",
    "code_url": "https://mixin.one/codes/d8244b92-30e9-44b5-bfb0-ce597c788125",
    "mute_until": "2018-05-16T12:34:44.143010035Z",
    "participants": [
      {
        "type": "participant",
        "user_id": "8dcf823d-9eb3-4da2-8734-f0aad50c0da6",
        "role": "OWNER",
        "created_at": "2018-05-16T12:34:44.134238105Z"
      },
      {
        "type": "participant",
        "user_id": "e8e5b807-fa8b-455a-8dfa-b189d28310ff",
        "role": "",
        "created_at": "2018-05-16T12:34:44.149277666Z"
      }
    ]
  },
  app: {
    "type": "app",
    "user_id": "06aed1e3-bd77-4a59-991a-5bb5ae6fbb09",
    "app_id": "c94ac88f-4671-3976-b60a-09064f1811e8",
    "created_at": "2017-12-23T18:23:26.996149Z",
  },
  message: {
    "conversation_id": "UUID",
    "recipient_id": "UUID",
    "message_id": "UUID",
    "category": "",
    "representative_id": "UUID",
    "quote_message_id": "UUID",
    "data": "Base64 encoded data",
  },
  attachment: {
    "type": "attachment",
    "attachment_id": "7a54e394-1626-4cd4-b967-543932c2a032",
    "view_url": "https://moments.shou.tv/mixin/attachments/1526305123-de9892550143c713c45f6265c9e61959ebfac6cc8de4badf5c0489636796ad8a"
  },
  text: {
    "id": "UUID",
    "action": "CREATE_MESSAGE",
    "params": {
      "conversation_id": "UUID",
      "category": "PLAIN_TEXT",
      "status": "SENT",
      "message_id": "UUID",
      "data": "Base64 encoded data",
    }
  },
  sticker: {
    "id": "UUID",
    "action": "CREATE_MESSAGE",
    "params": {
      "conversation_id": "UUID",
      "category": "PLAIN_STICKER",
      "status": "SENT",
      "message_id": "UUID",
      "data": "Base64 encoded data"
    }
  },
  sticker_data: {
    "sticker_id": "UUID"
  },
  image: {
    "id": "UUID",
    "action": "CREATE_MESSAGE",
    "params": {
      "conversation_id": "UUID",
      "category": "PLAIN_IMAGE",
      "status": "SENT",
      "message_id": "UUID",
      "data": "Base64 encoded data"
    }
  },
  image_data: {
    "attachment_id": "Read From POST /attachments",
    "mime_type": "image/jpeg",
    "width": 1024,
    "height": 1024,
    "size": 1024,
    "thumbnail": "base64 encoded"
  },
  audio: {
    "id": "UUID",
    "action": "CREATE_MESSAGE",
    "params": {
      "conversation_id": "UUID",
      "category": "PLAIN_AUDIO",
      "status": "SENT",
      "message_id": "UUID",
      "data": "Base64 encoded data"
    }
  },
  audio_data: {
    "attachment_id": "Read From POST /attachments",
    "mime_type": "audio/ogg",
    "size": 1024,
    "duration": 60,
    "waveform": "QIQQSA...AAIAA"
  },
  video: {
    "id": "UUID",
    "action": "CREATE_MESSAGE",
    "params": {
      "conversation_id": "UUID",
      "category": "PLAIN_VIDEO",
      "status": "SENT",
      "message_id": "UUID",
      "data": "Base64 encoded data"
    }
  },
  video_data: {
    "attachment_id": "Read From POST /attachments",
    "mime_type": "video/mp4",
    "width": 1024,
    "height": 1024,
    "size": 1024,
    "duration": 60,
    "thumbnail": "base64 encoded"
  },
  contact: {
    "id": "UUID",
    "action": "CREATE_MESSAGE",
    "params": {
      "conversation_id": "UUID",
      "category": "PLAIN_CONTACT",
      "status": "SENT",
      "message_id": "UUID",
      "data": "Base64 encoded data"
    }
  },
  contact_data: {
    "user_id": "UUID"
  },
  card: {
    "id": "UUID",
    "action": "CREATE_MESSAGE",
    "params": {
      "conversation_id": "UUID",
      "category": "APP_CARD",
      "status": "SENT",
      "message_id": "UUID",
      "data": "Base64 encoded data"
    }
  },
  card_data: {
    "app_id": "7404c815-0393-4ea3-b9f2-b08efe4c72da",
    "icon_url": "https://mixin.one/assets/98b586edb270556d1972112bd7985e9e.png",
    "title": "Mixin",
    "description": "Hello World.",
    "action": "https://mixin.one",
    "shareable": true
  },
  file: {
    "id": "UUID",
    "action": "CREATE_MESSAGE",
    "params": {
      "conversation_id": "UUID",
      "category": "PLAIN_DATA",
      "status": "SENT",
      "message_id": "UUID",
      "data": "Base64 encoded data",
    }
  },
  file_data: {
    "attachment_id": "Read From POST /attachments",
    "mime_type": "application/pdf",
    "size": 1024,
    "name": "2020-12-12.pdf"
  },
  live: {
    "id": "UUID",
    "action": "CREATE_MESSAGE",
    "params": {
      "conversation_id": "UUID",
      "category": "PLAIN_LIVE",
      "status": "SENT",
      "message_id": "UUID",
      "data": "Base64 encoded data"
    }
  },
  live_data: {
    "width": 650,
    "height": 366,
    "thumb_url": "https://mixin.one/logo.png",
    "url": "https://mixin.one/live.m3u8"
  },
  location: {
    "id": "UUID",
    "action": "CREATE_MESSAGE",
    "params": {
      "conversation_id": "UUID",
      "category": "PLAIN_LOCATION",
      "status": "SENT",
      "message_id": "UUID",
      "data": "Base64 encoded data"
    }
  },
  location_data: {
    "longitude": 126.5893955829421,
    "latitude": 53.478451778240661,
    "name": "China",           // Optional
    "address": "中国北京市"      // Optional
  },
  post: {
    "id": "UUID // generated by client",
    "action": "CREATE_MESSAGE",
    "params": {
      "conversation_id": "UUID",
      "category": "PLAIN_POST",
      "status": "SENT",
      "message_id": "UUID",
      "data": "Base64 encoded data",  // markdown
    }
  },
  post_data: {},
  button: {
    "id": "UUID",
    "action": "CREATE_MESSAGE",
    "params": {
      "conversation_id": "UUID",
      "category": "APP_BUTTON_GROUP",
      "status": "SENT",
      "message_id": "UUID",
      "data": "Base64 encoded data"
    }
  },
  button_data: {
    "label": "Mixin Website",
    "color": "#ABABAB",
    "action": "https://mixin.one"
  },
  category_snapshot: {
    "id": "UUID",
    "action": "CREATE_MESSAGE",
    "params": {
        "conversation_id": "UUID",
        "category": "SYSTEM_ACCOUNT_SNAPSHOT",
        "status": "SENT",
        "message_id": "UUID",
        "data": "Base64 encoded data"
    }
  },
  asset: {
    "type": "asset",
    "asset_id": "3596ab64-a575-39ad-964e-43b37f44e8cb",
    "chain_id": "43d61dcd-e413-450d-80b8-101d5e903357",
    "symbol": "eos",
    "name": "eos",
    "icon_url": "https://images.mixin.one/HovctUnrBkLPlDotWvWPsIuFb8qKrLddwF5-f2Fi9q9uO829YB2qGITgOd2YmTMKnGg_z9XrVYzEwFE_rD_REz9C=s128",
    "balance": "203.975",
    "destination": "0x2CEab41716F4ce0Db36B6FdABEdc6a0BE5DC442B",
    "tag": "",
    "label": "",
    "price_btc": "0",
    "price_usd": "0",
    "change_btc": "1",
    "change_usd": "2",
    "asset_key": "",
    "confirmations": 10,
    "capitalization": 1000.3
  },
  transfer: {
    "type": "transfer",
    "snapshot_id": "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "opponent_id": "a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
    "asset_id": "43d61dcd-e413-450d-80b8-101d5e903357",
    "amount": "-10",
    "trace_id": "7c67e8e8-b142-488b-80a3-61d4d29c90bf",
    "memo": "hello",
    "created_at": "2018-05-03T10:08:34.859542588Z"
  },
  fee: {
    "type": "fee",
    "asset_id": "43d61dcd-e413-450d-80b8-101d5e903357",
    "amount": "0.01"
  },
  snapshot: {
    "amount": "-1688168",
    "asset": {
      "asset_id": "965e5c6e-434c-3fa9-b780-c50f43cd955c",
      "chain_id": "43d61dcd-e413-450d-80b8-101d5e903357",
      "icon_url": "https://images.mixin.one/0sQY63dDMkWTURkJVjowWY6Le4ICjAFuu3ANVyZA4uI3UdkbuOT5fjJUT82ArNYmZvVcxDXyNjxoOv0TAYbQTNKS=s128",
      "name": "Chui Niu Bi",
      "symbol": "CNB",
      "type": "asset"
    },
    "created_at": "2018-05-29T09:31:04.202186212Z",
    "data": "",
    "snapshot_id": "529934b0-abfd-43ab-9431-1805773000a4",
    "source": "TRANSFER_INITIALIZED",
    "type": "snapshot",
  },
  multisig_body: {
    "type":"multisig_request",
    "request_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "user_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "amount":"10",
    "threshold":"2",
    "senders": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "receivers": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "signers": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "memo":"hello",
    "action":"sign",
    "state": "spent",
    "transaction_hash": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "raw_transaction": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "created_at":"2018-05-03T10:08:34.859542588Z",
    "code_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
  }
}
