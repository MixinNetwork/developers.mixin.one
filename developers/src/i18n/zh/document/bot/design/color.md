# 颜色

### 主题色

当用户访问机器人的页面时，内置的浏览器会尝试从 HTML 提取 theme-color meta 标签，状态栏和标题栏会自动适配主题色：

```html
<meta name="theme-color" content="#673ab8">
```

### 按钮颜色

按钮颜色太亮或太暗都会给用户带来较差的体验，设计师专门给开发者调配了一套按钮颜色，该颜色在浅色和深色模式下显示效果均表现良好：

![按钮颜色](./color-app-button.png)

颜色数组：

```
[
    0x7983C2, 0x8F7AC5, 0xC5595A, 0xC97B46, 0x76A048, 0x3D98D0,
    0x5979F0, 0x8A64D0, 0xB76753, 0xAA8A46, 0x9CAD23, 0x6BC0CE,
    0x6C89D3, 0xAA66C3, 0xC8697D, 0xC49B4B, 0x5FB05F, 0x52A98B,
    0x75A2CB, 0xA75C96, 0x9B6D77, 0xA49373, 0x6AB48F, 0x93B289,
]
```

页面效果：

![按钮颜色效果](./color-app-button-preview.png)