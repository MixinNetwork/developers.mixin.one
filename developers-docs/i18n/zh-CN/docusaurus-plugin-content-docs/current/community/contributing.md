---
title: 贡献
---

Mixin 和本文档是开源的。 我们现在欢迎贡献者在这些方面进行合作。

## 准备

Mixin 开发人员文档基于 [Docusaurus](https://docusaurus.io/docs/en/latest/)，一个 React.js 的静态站点生成器。

- 您需要确保已安装 Yarn
- 克隆文档的存储库
- 在 `developer-docs` 的根目录运行 `yarn`
- 运行 `yarn start` 来预览文档

## 文件结构

文档按以下方式组织：

- 所有源代码都在 `docs` 目录中
- `docs` 目录包含以下子目录：
  - `api` 包含所有 API 文档
  - `dapp` 包含所有 DApp 介绍、教程、指南
  - `mainnet` 包含所有主网文档
  - `community` 包含所有社区文档
  - `examples` 包含所有示例

另外，`sidebar.docs.js` 文件包含文档的侧边栏，它分为 2 个部分：“Docs”和“API”。

## 贡献新内容

### 编写新文档

所有内容均以 Markdown 格式编写，并带有 react 组件扩展。

贡献的第一步是在 `docs` 目录的正确位置创建一个新的 Markdown 文件。
例如，这个文档在 `docs/commnuity/contributing.mdx` 中。

特别地，如果您正在为特定主题编写新内容，您可以将它们放在现有文件中：

- `文章` - 对于文章，请更新 [`articles.mdx`](./articles) 文件
- `案例展示` - 对于案例展示，请按照以下 2 个步骤操作：
  1. 在 `src/data/users.tsx` 中按字母顺序添加 showcase 信息。
  2. 将截图放在 `src/data/showcase/`。

### 使用组件

`src/components/api` 目录下的文档中有一些内置组件可以使用：

- `<APIEndpoint>` 是一个渲染 API 端点的组件
- `<APIMetaPanel>` 是一个组件，用于呈现 API 的信息，包括授权和限制
- `<APIParams>` 是一个渲染 API 参数的组件
- `<APIPayload>` 是一个渲染 API 负载的组件
- `<APIRequest>` 是一个渲染 API 请求的组件

它们的使用请参考['API'下的任何文档](/api/guide)。

### 使用代码片段

可以在目录`docs/partials` 中的文档中使用代码片段。请考虑使用它们。

### 添加到侧边栏

创建新的 Markdown 文件后，您需要将其添加到侧边栏。

侧边栏文件是`sidebar.docs.js`，它位于`docs` 目录中。

### 复制新文件以便后续翻译

如果您要添加新文档，则需要将翻译文件放在 `i18n/$LANG_CODE` 目录中。

例如，这个文档是`docs/community/contributing.mdx`，它的`zh-CN`翻译是`i18n/zh-CN/docusaurus-plugin-content-docs/current/zh-CN/docs/community/contributing .mdx`。

## 翻译

### 为新语言生成新的翻译文件

如果您是本项目的维护者，请按照 [i18n 教程](https://docusaurus.io/docs/i18n/tutorial) 中的说明添加新语言。

**翻译索引页**

请按照说明 [此处](https://docusaurus.io/docs/i18n/tutorial#use-the-translation-apis) 翻译您的索引页并响应组件。

**生成/更新 json 文件**

```bash
yarn run write-translations --locale $LANG_CODE
```

`$LANG_CODE` 是您要生成的语言的语言代码。例如，如果你想为法语生成翻译文件，你应该使用`fr`。

翻译文件在`i18n/$LANG_CODE/` 目录中生成。

**生成 Markdown 文件**

将 docs Markdown 文件复制到 `i18n/$LANG_CODE/docusaurus-plugin-content-docs/current`，并翻译它们：

```bash
mkdir -p i18n/$LANG_CODE/docusaurus-plugin-content-docs/current
cp -r docs/** i18n/$LANG_CODE/docusaurus-plugin-content-docs/current
```

### 翻译文件

所有文件都根据语言放在`i18n/$LANG_CODE/`中。

- `i18n/$LANG_CODE/code.json`：索引页和 docusaurus 使用的文本的翻译。
- `i18n/$LANG_CODE/docusaurus-theme-classic/footer.json`：页脚的翻译。
- `i18n/$LANG_CODE/docusaurus-theme-classic/navbar.json`：导航栏的翻译。
- `i18n/$LANG_CODE/docusaurus-plugin-content-docs/current.json`：侧边栏的类别标签。
- `i18n/$LANG_CODE/docusaurus-plugin-content-docs/current/**`：文档的 markdown 文件。

**预览翻译**

```bash
yarn run start --locale $LANG_CODE
```

## 加入我们的开发者群组

参与 Mixin 开发，在 Mixin Messenger 搜索‘7000104112’，加入[开发者群](https://supergroup.mixin.fan/#/7000104112/home)。
