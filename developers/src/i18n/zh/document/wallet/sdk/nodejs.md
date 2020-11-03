# Node.js SDK
## 1. 安装
`npm install mixin-node-sdk --save`

## 2. 例子
### 2.1 Mixin 网络
```js
const { Mixin } = require('mixin-node-sdk')
const CLIENT_CONFIG = {
    client_id: '2cc0c869-xxxx-xxxx-xxxx-5b4a99fea2a9',
    client_secret: 'f3689c1dxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx562b4ff12882fc3bdf',
    pin: '918869',
    session_id: '1510f69c-xxxx-xxxx-xxxx-32560e710cb0',
    pin_token: 'LLqI71tUUG0T6J1fZ7piKjrzx/hYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx1BH7H+NXlV5mLgZ/TGEyPf0UdhgQWZW+33jSveg2YGczfrH667XqwMsO0poYUE0SKy+DlEmV6L4yKG40/aAQ9wNcMpW8zDm7O/r5OtH9o=',
    private_key: `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxcGc250iYf+F7aMr
xPmKo+zlKCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/Q2xG+F5/ouLfu3
1cBwdZVYoJxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxGkLetuu6QIDAQAB
AoGAFoVnjSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxE7gnhOc8S4SO96F
7FO3ITwVuKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyD/U2kzT0iCwCc4
yr8i6IJ2L4xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxQDRn9OIpGLoFE16
FMDe3eHk40xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxKcWaOsOzWnin9v1
v4mLyw3XAkxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxNytyRrUNjP9hGIp
UDsh0XJpJcxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx6qCn1YDEn3b5iq8
ta/775fPH2xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxkgUXm6KRQJAPP2m
2rZhA5abZExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrnF+cyi5ufEfMcz
l4LzCpjTmfxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxfE8l2D1wQvwsa1/
fJ8KHnfjWjERGVnquCUm73MDJnXxqbivoXolv4tkuA==
-----END RSA PRIVATE KEY-----
`
}


const mixin_client = new Mixin(CLIENT_CONFIG, true, true)
// 1. 第一个参数是 keystore 的信息
// 2. 第二个参数是 是否使用中国的域名加速，建议国内服务器填 true。
// 3. 第三个参数是 是否打开 debug 模式，会在控制台显示一些 log 信息。


const asset_id = '965e5c6e-434c-3fa9-b780-c50f43cd955c'

// 更换 PIN
mixin_client.pin_update({
    old_pin: '918869',
    pin: '918869'
})

// 验证 PIN
mixin_client.pin_verify({
    pin: '918869'
})

// 查看账户中该资产详情
mixin_client.query_assets({
    asset_id
})

// 创建一个充值地址
mixin_client.create_address({
    asset_id,
    destination: '0x68bDcAe4966E3c3372830ac13E562B63e51d87D7',
    label: 'Test CNB Address'
})

// 根据 address_id 查询充值地址详情
mixin_client.query_address({
    address_id: 'dba1fed5-bfbf-4c06-9f93-5953ebc38b86'
})

// 删除指定 address_id 的充值地址
mixin_client.delete_address({
    address_id: 'dba1fed5-bfbf-4c06-9f93-5953ebc38b86'
})

// 查看账户中某一资产的所有充值地址
mixin_client.query_my_addresses_by_assetid({
    asset_id
})

// 验证交易
mixin_client.verify_payment({
    asset_id,
    opponent_id: 'e8e8cd79-cd40-4796-8c54-3a13cfe50115',
    amount: '10',
    trace_id: 'd6f913b0-9d28-4b98-b5fa-ee4fdebdf378'
})

// 发起一笔交易
mixin_client.transfer({
    amount: '10',
    asset_id,
    opponent_id: 'e8e8cd79-cd40-4796-8c54-3a13cfe50115'
})

// 根据 trace_id 查询交易详情
mixin_client.query_transfer({
    trace_id: 'd6f913b0-9d28-4b98-b5fa-ee4fdebdf378'
})

// 获取 Mixin 网络中最具价值的资产
mixin_client.query_network_top_assets()

// 通过 asset_id 从 Mixin Network 读取公共资产信息。
mixin_client.query_network_asset({ asset_id })

// 获取 Mixin Network 主网快照集合
mixin_client.query_network_snapshots({})

// 通过 snapshot_id 读取 Mixin Network 的公共快照。
mixin_client.query_network_snapshots({ asset_id })

// 按指定地址、标记和资产id读取外部事务(未决存款)
mixin_client.query_external_transactions({
    destination: '1dice8EMZmqKvrGE4Qc9bUFf9PX3xaYDp'
})

// 搜索资产的符号或代币名称，市场有一定流通量的代币。
mixin_client.query_network_asset_by_symbol({ symbol: 'EOS' })

// 创建用户， session_secret 请填写 RSA 公钥的 Base64，可自行百度 RSA 生成， 请保存好私钥
mixin_client.create_user({
    full_name: 'test',
    session_secret: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8wF10XuA2i90YC1peIY4ZzL0N\n' +
        'pdbXw8uNakCIjMnBeAGGHFvBFgU11uf1asP/8rtLLZfiNwwFlrayErT6SyDB27qv\n' +
        'POb/vaS4X6mfz9qA0nEz4pHvoTnNV0/L+VftHA43uq46VObDejKJp2wuniY1AT22\n' +
        'D+NWTjvp/IZ0FvMVqwIDAQAB'
})


```

### 2.2 Messenger
```js
const fs = require('fs')
const { Mixin } = require('mixin-node-sdk')
const CLIENT_CONFIG = {
    client_id: '2cc0c869-xxxx-xxxx-xxxx-5b4a99fea2a9',
    client_secret: 'f3689c1dxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx562b4ff12882fc3bdf',
    pin: '918869',
    session_id: '1510f69c-xxxx-xxxx-xxxx-32560e710cb0',
    pin_token: 'LLqI71tUUG0T6J1fZ7piKjrzx/hYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx1BH7H+NXlV5mLgZ/TGEyPf0UdhgQWZW+33jSveg2YGczfrH667XqwMsO0poYUE0SKy+DlEmV6L4yKG40/aAQ9wNcMpW8zDm7O/r5OtH9o=',
    private_key: `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxcGc250iYf+F7aMr
xPmKo+zlKCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/Q2xG+F5/ouLfu3
1cBwdZVYoJxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxGkLetuu6QIDAQAB
AoGAFoVnjSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxE7gnhOc8S4SO96F
7FO3ITwVuKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyD/U2kzT0iCwCc4
yr8i6IJ2L4xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxQDRn9OIpGLoFE16
FMDe3eHk40xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxKcWaOsOzWnin9v1
v4mLyw3XAkxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxNytyRrUNjP9hGIp
UDsh0XJpJcxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx6qCn1YDEn3b5iq8
ta/775fPH2xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxkgUXm6KRQJAPP2m
2rZhA5abZExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrnF+cyi5ufEfMcz
l4LzCpjTmfxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxfE8l2D1wQvwsa1/
fJ8KHnfjWjERGVnquCUm73MDJnXxqbivoXolv4tkuA==
-----END RSA PRIVATE KEY-----
`
}


const mixin_client = new Mixin(CLIENT_CONFIG, true, true)
// 1. 第一个参数是 keystore 的信息
// 2. 第二个参数是 是否使用中国的域名加速，建议国内服务器填 true。
// 3. 第三个参数是 是否打开 debug 模式，会在控制台显示一些 log 信息。

const asset_id = '965e5c6e-434c-3fa9-b780-c50f43cd955c'
const recipient_id = 'e8e8cd79-cd40-4796-8c54-3a13cfe50115'

// 获取自己的基本信息
mixin_client.query_me()


// 更新自己的接收消息的偏好
mixin_client.update_preference({
    receive_message_source: 'EVERYBODY', // CONTACTS
    accept_conversation_source: 'EVERYBODY'
})

// 更新自己的基本信息
mixin_client.update_profile({
    full_name: '玩儿',
    avatar_base64: ''
})

// 获取自己的二维码
mixin_client.rotate_qr_code()

// 根据 user_id 查询用户信息
mixin_client.query_user_fetch(['e8e8cd79-cd40-4796-8c54-3a13cfe50115', '773e5e77-4107-45c2-b648-8fc722ed77f5'])

// 获取会话合集
mixin_client.query_contacts()

// 获取自己的好友
mixin_client.query_friends()

// 查找用户，通过 MixinID 或是 电话号码
mixin_client.search_user({
    mixin_number: '30265'
})

// 上传附件
let file = fs.readFileSync('./1.txt') // 这里请填充文件路径
mixin_client.upload_file({
    file
})

// 发送文字消息
mixin_client.send_text({ recipient_id, data: 'hello mixin' })

// 发送图片
mixin_client.send_image({
    recipient_id,
    data: {
        attachment_id: "e0a0eba2-a92f-4352-b48d-66f89ff3f86d",
        size: 89427,
        thumbnail: "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",
        width: 800,
        mime_type: "image/jpeg",
        height: 800
    }
})

// 发送视频
mixin_client.send_video({
    recipient_id,
    data: {
        thumbnail: "/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAAqACAAQAAAABAAAAJ6ADAAQAAAABAAAAJwAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgAJwAnAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQAA//aAAwDAQACEQMRAD8A/ILUoriRvK+Ysp5x0PPH+FdR4a0a7VotyZJI+vAzn16V90/Gr9n/AFz4c3sptbO31KDbvTIZJApBPXoTx0zXgvhm1ubm4ME+nLGVjEwCbmUKSduMnB6H8a+cnj3UjdKx9bUy6FCXxqXp/wAEfE9vYW5ZVLNwW2DLN7A8fqcCp9O+A/xK+Mei3Grjy9H8O6SQSzbpGdmIUscYOQGAHHGfxr3Dwx8P9Q1+GG1jsHUXJSLzSuQPMO0Y6Yz7fjX6leEfA/h3wp4VtfDTW0c1rNGFuoZgQrKOQcMOSD147816GW4BxvJb9zhxWMTtFrT/ACPzD8MeBPD3g+w/snRlka3t3IMs+Q8zkDMmOwbHAHGMYGOa6b7JZ/7P/j1dZ8XoPEfg3xZfC4077ZDeO1xaNEdy7JXOQx42FANuB6ehryb/AITTxB/0ApP++v8A69fOYzB1XVk5XZ9Lh8VDkXItD//Q+9PHVqXu0sdQRbyGU8sV5yecZ6c4xivlvwf8L/DUPxU1rThbh7a+hgmtIQVBTyt5ljTcRx8+8fUivYvF/j7+2NT1DQtAuURrJhFNJwzKXUSKuDjGFI575rxnRxf+F/G2n+MNWY3Gn2XmLJJGpLI0ikKSAT0B9AM8kHNfD5bXgqqhN2PsMfhak6fPBXPpzTdK8MeFLmyg8owbphJtkXYd0eTjd9374H8RHXtXRanr9hOrB7mGabcoWKORTsDEDccHJIHcjj9a+Yv2nfjj4e8NfC0a74e1ckXckcEjQSqLtI5SWl8pmPyylImRDjAJ5xX4TaD8W/GXhzxZL4l0fUZoXZ5CPMIkKxyccZwA4ULhgFywB6V+iwjpofIYicVy2TT6n9Het3OmXMv2G8ijNu2WXKh8jOcHI/hOO/544wP7N8J/8+0P/fla+TPDPjXWvEPhy1vV1uSSaEhGlkRTGzKCpbsysw6hWIByM9K2P7d8Sf8AQdh/75b/AOLrknVV9joo4VzXMqlvvP/R4j4Y+DtZ+I8EnjOfXtTn06zsEm1FftTRSPetLtjQMm1ihiRmyd2D8vpXs3/CvfDWlaWvizw9a6nZ3e3d5x1B5o5lx0kWRySOO6kisL9lX/kkXi3/AK5Wn/tavZpP+SZxf9cf6NXyWPpqNZqOh9bk2Ik4anzV4V0L4c/Eyy8R6b4y0eLVdTvdQm0uW+MKJc2d6qEIIzjaQwGVYHAx8y9K+Xr39i+bwrrZm1/XIb7TYJMrBFG6yyKSfKV3PChsDcQCQCQPWvpT4If8hzxT/wBj2f8A0W9exfFL/XSf71v/ADNfcTjyQtHofGKbqVJSnufPz/6Jow0O7fieUtPKuQC3MhIA5A3YGASAPpWN/ZOh/wDP435SVq651b/rof5VzleNVqO59llVF+xXLJr0t/kf/9k=",
        height: 1080,
        width: 1920,
        size: 6583161,
        duration: 31790,
        attachment_id: "738bdff6-37c5-4108-a312-b76523474b93",
        mime_type: "video/mp4"
    }
})


// 发送按钮组（最多6个）
mixin_client.send_buttons({
    recipient_id,
    data: [
        {
            label: 'test',
            color: '#f00',
            action: 'https://mixin.one'
        },
        {
            label: 'test',
            color: '#f00',
            action: 'https://mixin.one'
        }
    ]
})

// 发送直播
mixin_client.send_live({
    recipient_id,
    data: {
        url: "https://wuji.zhulong-zuida.com/20191010/10591_98f58691/index.m3u8",
        width: 270,
        thumb_url: "https://img1.jisuysw.com/uploads/vod/2019-09-22/6fc406f7b56b21801c0ff88f116d5bd4.jpg",
        height: 377,
    }
})

// 发送贴纸
mixin_client.send_sticker({
    recipient_id,
    data: {
        name: "eye",
        album_id: "efb5b085-15c5-4072-8f19-1703f63ed14e",
    }
})

// 发送文件
mixin_client.send_file({
    recipient_id,
    data: {
        attachment_id: "efd007ac-650b-4ab8-b546-2bfd248f7e5c",
        mime_type: "image/jpeg",
        name: "hdImg_ea03b5ba0ff3d0336424b6474af3aa1e1574652528243.jpg",
        size: 39369
    }
})

// 发送联系人
mixin_client.send_contact({
    recipient_id,
    data: {
        user_id: "91250bd4-cd07-46e9-969b-ef4686f82a5f"
    }
})

// 发送 APP
mixin_client.send_app({
    recipient_id,
    data: {
        icon_url: 'https://images.mixin.one/OsaSpGZMBV4PmQ2Om-UnDZ-878Bk37heqprakp_Sll6MWM-ciLdUQrvEDIeSF4z3t0sgfXt8Hw4zmDkiR2irag0=s256',
        title: 'Mixin Node.js SDK',
        description: 'Utilities to easy Mixin dapp development',
        action: 'https://github.com/liuzemei/mixin-node-sdk',
    }
})

```

### 2.3 监听机器人消息
使用 MixinWebsock 自动回复用户消息有两个步骤：
1. 重写消息函数
2. 启动

```js
const { MixinSocket } = require('mixin-node-sdk')
const CLIENT_CONFIG = {
    client_id: '2cc0c869-xxxx-xxxx-xxxx-5b4a99fea2a9',
    client_secret: 'f3689c1dxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx562b4ff12882fc3bdf',
    pin: '918869',
    session_id: '1510f69c-xxxx-xxxx-xxxx-32560e710cb0',
    pin_token: 'LLqI71tUUG0T6J1fZ7piKjrzx/hYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx1BH7H+NXlV5mLgZ/TGEyPf0UdhgQWZW+33jSveg2YGczfrH667XqwMsO0poYUE0SKy+DlEmV6L4yKG40/aAQ9wNcMpW8zDm7O/r5OtH9o=',
    private_key: `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxcGc250iYf+F7aMr
xPmKo+zlKCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/Q2xG+F5/ouLfu3
1cBwdZVYoJxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxGkLetuu6QIDAQAB
AoGAFoVnjSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxE7gnhOc8S4SO96F
7FO3ITwVuKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyD/U2kzT0iCwCc4
yr8i6IJ2L4xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxQDRn9OIpGLoFE16
FMDe3eHk40xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxKcWaOsOzWnin9v1
v4mLyw3XAkxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxNytyRrUNjP9hGIp
UDsh0XJpJcxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx6qCn1YDEn3b5iq8
ta/775fPH2xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxkgUXm6KRQJAPP2m
2rZhA5abZExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrnF+cyi5ufEfMcz
l4LzCpjTmfxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxfE8l2D1wQvwsa1/
fJ8KHnfjWjERGVnquCUm73MDJnXxqbivoXolv4tkuA==
-----END RSA PRIVATE KEY-----
`
}


let socket_client = new MixinSocket(CLIENT_CONFIG, true, true)
// 1. 第一个参数是 keystore 的信息
// 2. 第二个参数是 是否使用中国的域名加速，建议国内服务器填 true。
// 3. 第三个参数是 是否打开 debug 模式，会在控制台显示一些 log 信息。

// 1.  重写这个接受消息的函数
// 注意：有一个参数 message
socket_client.get_message_handler = async function (message) {

    // 执行已读消息
    await this.read_message(message)

    if (!message.action || message.action === 'ACKNOWLEDGE_MESSAGE_RECEIPT' || message.action === 'LIST_PENDING_MESSAGES' || !message.data || !message.data.data) return;
    if (message.error) return console.log(message.error)
    // 获取消息
    console.log(message)

    // 发送文本消息
    await this.send_text('hello mixin', message)

    // 发送图片消息
    await this.send_image({
        attachment_id: "e0a0eba2-a92f-4352-b48d-66f89ff3f86d",
        size: 89427,
        thumbnail: "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",
        width: 800,
        mime_type: "image/jpeg",
        height: 800
    }, message)

    // 发送视频消息
    await this.send_video({
        thumbnail: "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",
        height: 1080,
        width: 1920,
        size: 6583161,
        duration: 31790,
        attachment_id: "738bdff6-37c5-4108-a312-b76523474b93",
        mime_type: "video/mp4"
    }, message)


    // 发送按钮消息（最多 6 个）
    await this.send_buttons([
        {
            label: 'test',
            color: '#f00',
            action: 'https://mixin.one'
        },
        {
            label: 'test',
            color: '#f00',
            action: 'https://mixin.one'
        }
    ], message)

    // 发送直播消息
    await this.send_live({
        url: "https://wuji.zhulong-zuida.com/20191010/10591_98f58691/index.m3u8",
        width: 270,
        thumb_url: "https://img1.jisuysw.com/uploads/vod/2019-09-22/6fc406f7b56b21801c0ff88f116d5bd4.jpg",
        height: 377,
    }, message)

    // 发送贴纸消息
    await this.send_sticker({
        name: "eye",
        album_id: "efb5b085-15c5-4072-8f19-1703f63ed14e",
    }, message)

    // 发送文件消息
    await this.send_file({
        attachment_id: "efd007ac-650b-4ab8-b546-2bfd248f7e5c",
        mime_type: "image/jpeg",
        name: "hdImg_ea03b5ba0ff3d0336424b6474af3aa1e1574652528243.jpg",
        size: 39369
    }, message)

    // 发送联系人消息
    await this.send_contact({
        user_id: "91250bd4-cd07-46e9-969b-ef4686f82a5f"
    }, message)

    // 发送 APP 消息
    await this.send_app({
        icon_url: 'https://images.mixin.one/OsaSpGZMBV4PmQ2Om-UnDZ-878Bk37heqprakp_Sll6MWM-ciLdUQrvEDIeSF4z3t0sgfXt8Hw4zmDkiR2irag0=s256',
        title: 'Mixin Node.js SDK',
        description: 'Utilities to easy Mixin dapp development',
        action: 'https://github.com/liuzemei/mixin-node-sdk',
    }, message)

}

// 打开 websocket
socket_client.start()

```
