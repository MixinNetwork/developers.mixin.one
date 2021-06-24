# 消息类型

Mixin Messenger 支持发送文字、图片、贴纸、文件等多种消息类型，注意机器人发消息目前只支持 `PLAIN_` 前缀的消息类型，发送图片、文件、视频需要先上传附件获得 attachment_id 后才能发送。

### 文字
```json
 $$XIN:text$$
```

### 表情
```json
 $$XIN:sticker$$
```
data 数据结构
```json
 $$XIN:sticker_data$$
```

### 图片
```json
 $$XIN:image$$
```
data 数据结构
```json
 $$XIN:image_data$$
```

### 音频
```json
 $$XIN:audio$$
```
data 数据结构
```json
 $$XIN:audio_data$$
```

### 视频
```json
 $$XIN:video$$
```
data 数据结构
```json
 $$XIN:video_data$$
```

### 联系人
```json
 $$XIN:contact$$
```
data 数据结构
```json
 $$XIN:contact_data$$
```

### 卡片
```json
 $$XIN:card$$
```
data 数据结构
```json
 $$XIN:card_data$$
```

可通过设置 `shareable` 字段为 false 来禁止卡片转发，该属性在 Mixin Messenger 0.31.0 或以上的版本支持，不传默认为 true。

### 文件
```json
 $$XIN:file$$
```
data 数据结构
```json
 $$XIN:file_data$$
```

### 直播
```json
 $$XIN:live$$
```
data 数据结构
```json
 $$XIN:live_data$$
```

### 位置
```json
 $$XIN:location$$
```
data 数据结构
```json
 $$XIN:location_data$$
```

### 文章
```json
 $$XIN:post$$
```

### 按钮
```json
 $$XIN:button$$
```
data 数据结构
```json
 $$XIN:button_data$$
```

### 转账
```json
 $$XIN:category_snapshot$$
```
data 数据结构
```json
 $$XIN:transfer$$
```
