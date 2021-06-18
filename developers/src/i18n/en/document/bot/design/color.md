# Colors

### Theme Color

When a user visits the bot's page, the built-in browser will try to extract the theme-color meta tag from HTML, and the status bar and title bar will automatically adapt the theme color:

```html
<meta name="theme-color" content="#673ab8">
```

### Button Colors


Button colors that are too bright or too dark will bring a poor user experience. The designer has choosen a set of button colors for developers, which performs well in both light and dark modes:

![Button Colors](./color-app-button.png)

Color array:

```
[
    0x7983C2, 0x8F7AC5, 0xC5595A, 0xC97B46, 0x76A048, 0x3D98D0,
    0x5979F0, 0x8A64D0, 0xB76753, 0xAA8A46, 0x9CAD23, 0x6BC0CE,
    0x6C89D3, 0xAA66C3, 0xC8697D, 0xC49B4B, 0x5FB05F, 0x52A98B,
    0x75A2CB, 0xA75C96, 0x9B6D77, 0xA49373, 0x6AB48F, 0x93B289,
]
```

Demo:

![Button Demo](./color-app-button-preview.png)