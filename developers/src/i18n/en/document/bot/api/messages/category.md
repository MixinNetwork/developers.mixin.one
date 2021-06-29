# Category

Mixin Messenger supports texts, images, stickers, files and other message types. Note that bots currently only support message types with the prefix `PLAIN_`. Sending images, files, and videos requires uploading attachments and obtaining attachment_id before sending.

### Texts

```json
  $$XIN:text$$
```

### Stickers

```json
 $$XIN:sticker$$
```

data:

```json
 $$XIN:sticker_data$$
```

### Images

```json
 $$XIN:image$$
```

data:

```json
 $$XIN:image_data$$
```

### Audios

```json
 $$XIN:audio$$
```

data:

```json
 $$XIN:audio_data$$
```

### Videos

```json
 $$XIN:video$$
```

data:
```json
 $$XIN:video_data$$
```

### Contacts

```json
 $$XIN:contact$$
```

data:

```json
 $$XIN:contact_data$$
```

### Cards

```json
 $$XIN:card$$
```
data:
```json
 $$XIN:card_data$$
```


Card forwarding can be prohibited by setting the `shareable` field to false. This feature is supported by Mixin Messenger 0.31.0 or above, and the default value is true.

### Files

```json
 $$XIN:file$$
```
data:
```json
 $$XIN:file_data$$
```

### Live Shows

```json
 $$XIN:live$$
```

data:
```json
 $$XIN:live_data$$
```

### Locations

```json
 $$XIN:location$$
```

data:
```json
 $$XIN:location_data$$
```

### Posts

```json
 $$XIN:post$$
```

### Buttons

```json
  $$XIN:button$$
```

data:
```json
 $$XIN:button_data$$
```

### Transfers

```json
 $$XIN:category_snapshot$$
```

data:
```json
 $$XIN:transfer$$
```
