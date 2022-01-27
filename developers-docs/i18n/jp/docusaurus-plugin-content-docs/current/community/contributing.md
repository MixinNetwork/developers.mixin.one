---
title: Contributing
---

Mixinとこのドキュメントはオープンソースです。私たちはあなたの協力を歓迎します。

## 準備

Mixin開発者向けドキュメントはReact.js用のサイトジェネレーターである[Docusaurus](https://docusaurus.io/docs/en/latest/)をベースにしています。

- Yarnがインストールされていることを確認してください
- ドキュメントのリポジトリをクローンしてください
- `developer-docs`で`yarn`を実行してください
- `yarn start`を実行してドキュメントをプレビューしてください

## ドキュメントの構成

このドキュメントは次のように構成されています:

- すべてのソースは`docs`ディレクトリ内にあります 
- `docs`ディレクトリ内には以下のサブディレクトリが存在します:
  - `api` にはAPIに関するすべてのドキュメントがあります
  - `dapp` にはDAppの説明、チュートリアル、ガイドがあります
  - `mainnet` にはメインネットに関するすべてのドキュメントがあります
  - `community` にはコミュニティに関するすべてのドキュメントがあります
  - `examples` には凡例に関するすべてがあります

 `sidebar.docs.js` ファイルにはDocsとAPIの２つのセクションに分かれたドキュメントのサイドバーがあります

## 新しいコンテンツに貢献する

### 新しいドキュメントを書く

すべてのコンテンツはReactコンポーネントを使ったマークダウン形式で記述されています。

新しいコンテンツを書き始めるために、まずdocsディレクトリ内の適切な場所に新しいマークダウンファイルを作成しましょう。
例えば、このドキュメントは`docs/commnuity/contributing.mdx`にあります。

特定のトピックについて新しいコンテンツを書く場合、以下の情報を既存のファイルに追加することができます:

- `Articles` - 記事に関するコンテンツならば、[`articles.mdx`](./articles)ファイルをアップデートしてください
- `Showcases` - showcaseに関するコンテンツならば以下の２段階の手順に従ってください:
  1. showcaseに関する情報を`src/data/users.tsx`の中にアルファベット順で追加してください
  2. `src/data/showcase/`の中にスクリーンショットを追加してください

### コンポーネントの利用

`src/components/api`ディレクトリの中にドキュメント内で使用できる組み込み型コンポーネントがあります。

- `<APIEndpoint>`は、APIエンドポイントを表示するコンポーネントです。
- `<APIMetaPanel>`は、APIの情報を表示するコンポーネントで、権限や制限などが表示されます。
- `<APIParams>`は、APIのパラメータを表示するコンポーネントです。
- `<APIPayload>`は、APIのペイロードをレンダリングするコンポーネントです。
- `<APIRequest>`は、APIのリクエストを表示するコンポーネントです。

Please refer to the [any document of 'API' section](/docs/api/guide) for the usage of them.

### Using partials

There are code snipples that can be used in the documentation in the directory `docs/partials`. Please consider using them.

### Adding to the sidebar

After you have created a new markdown file, you need to add it to the sidebar.

The sidebar file is `sidebar.docs.js` and it is located in the `docs` directory.

### Making a copy of the new file for translation

If you are adding a new documentation, you need to put a translation file at `i18n/$LANG_CODE` directory.

For example, this document is `docs/community/contributing.mdx` and its `zh-CN` translation is `i18n/zh-CN/docusaurus-plugin-content-docs/current/zh-CN/docs/community/contributing.mdx`.

## Translation

### Generate new translation files for new languages

If you're the maintainer of this project, please follow the instructions in the [i18n tutorial](https://docusaurus.io/docs/i18n/tutorial) to add a new language.

**Translate the index page**

Please follow the instructions [here](https://docusaurus.io/docs/i18n/tutorial#use-the-translation-apis) to translate your index page and react components.

**Generate/Update json files**

```bash
yarn run write-translations --locale $LANG_CODE
```

The `$LANG_CODE` is the language code of the language you want to generate. For example, if you want to generate the translation files for the French language, you should use `fr`.

The translation files are generated in the `i18n/$LANG_CODE/` directory.

**Generate Markdown files**

Copy the docs Markdown files to `i18n/$LANG_CODE/docusaurus-plugin-content-docs/current`, and translate them:

```bash
mkdir -p i18n/$LANG_CODE/docusaurus-plugin-content-docs/current
cp -r docs/** i18n/$LANG_CODE/docusaurus-plugin-content-docs/current
```

### Translate the documents

All the documents are placed in the `i18n/$LANG_CODE/` according to the languages.

- `i18n/$LANG_CODE/code.json`: the translation of the index page and the text used by docusaurus.
- `i18n/$LANG_CODE/docusaurus-theme-classic/footer.json`: the translation of footer.
- `i18n/$LANG_CODE/docusaurus-theme-classic/navbar.json`: the translation of navbar.
- `i18n/$LANG_CODE/docusaurus-plugin-content-docs/current.json`: the label of category on sidebar.
- `i18n/$LANG_CODE/docusaurus-plugin-content-docs/current/**`: the markdown files of documents.

**Preview the translation**

```bash
yarn run start --locale $LANG_CODE
```

## Join our developer group

To participate in Mixin development, search `7000104112` in Mixin Messenger and join the [developer group](https://supergroup.mixin.fan/#/7000104112/home).
