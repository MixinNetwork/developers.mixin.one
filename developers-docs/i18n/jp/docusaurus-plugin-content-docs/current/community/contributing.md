---
title: 貢献
---

Mixinとこのドキュメントはオープンソースです。私たちはあなたの協力を歓迎します。

## 準備

Mixin開発者向けドキュメントはReact.js用のサイトジェネレーターである[Docusaurus](https://docusaurus.io/docs/en/latest/)をベースにしています。

- Yarnがインストールされていることを確認してください。
- ドキュメントのリポジトリをクローンしてください。
- `developer-docs`で`yarn`を実行してください。
- `yarn start`を実行してドキュメントをプレビューしてください。

## ドキュメントの構成

このドキュメントは次のように構成されています。:

- すべてのソースは`docs`ディレクトリ内にあります。
- `docs`ディレクトリ内には以下のサブディレクトリが存在します。:
  - `api` にはAPIに関するすべてのドキュメントがあります。
  - `dapp` にはDAppの説明、チュートリアル、ガイドがあります。
  - `mainnet` にはメインネットに関するすべてのドキュメントがあります。
  - `community` にはコミュニティに関するすべてのドキュメントがあります。
  - `examples` には凡例に関するすべてがあります。

 `sidebar.docs.js` ファイルにはDocsとAPIの２つのセクションに分かれたドキュメントのサイドバーがあります。

## 新しいコンテンツに貢献する

### 新しいドキュメントを書く

すべてのコンテンツはReactコンポーネントを使ったマークダウン形式で記述されています。

新しいコンテンツを書き始めるために、まずdocsディレクトリ内の適切な場所に新しいマークダウンファイルを作成しましょう。
例えば、このドキュメントは`docs/commnuity/contributing.mdx`にあります。

特定のトピックについて新しいコンテンツを書く場合、以下の情報を既存のファイルに追加することができます。:

- `Articles` - 記事に関するコンテンツならば、[`articles.mdx`](./articles)ファイルをアップデートしてください。
- `Showcases` - showcaseに関するコンテンツならば以下の２段階の手順に従ってください。:
  1. showcaseに関する情報を`src/data/users.tsx`の中にアルファベット順で追加してください。
  2. `src/data/showcase/`の中にスクリーンショットを追加してください。

### コンポーネントの利用

`src/components/api`ディレクトリの中にドキュメント内で使用できる組み込み型コンポーネントがあります。

- `<APIEndpoint>`は、APIエンドポイントを表示するコンポーネントです。
- `<APIMetaPanel>`は、APIの情報を表示するコンポーネントで、権限や制限などが表示されます。
- `<APIParams>`は、APIのパラメータを表示するコンポーネントです。
- `<APIPayload>`は、APIのペイロードをレンダリングするコンポーネントです。
- `<APIRequest>`は、APIのリクエストを表示するコンポーネントです。

APIの使い方は [any document of 'API' section](/docs/api/guide)をご参照ください。

### partialの使用

ドキュメントで使用可能なコードスニップルは`doc/partials`ディレクトリ内にあります。是非ご利用をご検討ください。

### サイドバーへの追加

新しくマークダウンファイルを作成した後には、そのファイルをサイドバーに追加する必要があります。

サイドバーのファイルは`sidebar.docs.js`で、そのファイルは`docs`ディレクトリ内にあります。

### 翻訳用に新しいファイルのコピーを作成する

新しいドキュメントを追加した場合、`i18n/$LANG_CODE`ディレクトリに翻訳ファイルを作る必要があります。

例えば、このドキュメントは`docs/community/contributing.mdx`の翻訳ファイルになっていますが、元のドキュメントの中文翻訳は、`i18n/zh-CN/docusaurus-plugin-content-docs/current/zh-CN/docs/community/contributing.mdx`になります。

## 翻訳

### 新しい言語の翻訳ファイルを作成する

もしあなたがこのプロジェクトの管理者なら、[i18n tutorial](https://docusaurus.io/docs/i18n/tutorial)の指示に従って新しい言語を追加してください。

**インデックスページの翻訳**

[こちら](https://docusaurus.io/docs/i18n/tutorial#use-the-translation-apis)の指示に従ってインデックスページとりアクトコンポーネントの翻訳を行ってください。

**ファイルの作成、アップデート**

```bash
yarn run write-translations --locale $LANG_CODE
```

`$LANG_CODE`はあなたが作りたい言語の言語コードになります。例えば、フランス語の翻訳ファイルを作成したいならば、`fr`を使いましょう。

翻訳ファイルは、`i18n/$LANG_CODE/`ディレクトリ内に生成されます。

**マークダウンファイルの作成**

`i18n/$LANG_CODE/docusaurus-plugin-content-docs/current`にマークダウンファイルをコピーして, それを翻訳してください:

```bash
mkdir -p i18n/$LANG_CODE/docusaurus-plugin-content-docs/current
cp -r docs/** i18n/$LANG_CODE/docusaurus-plugin-content-docs/current
```

### ドキュメントの翻訳

すべてのドキュメントは言語によって`i18n/$LANG_CODE/`に格納されます。

- `i18n/$LANG_CODE/code.json`:インデックスページとdocusaurusに使われたテキストの翻訳
- `i18n/$LANG_CODE/docusaurus-theme-classic/footer.json`:フッターの翻訳
- `i18n/$LANG_CODE/docusaurus-theme-classic/navbar.json`:ナビゲーションバーの翻訳
- `i18n/$LANG_CODE/docusaurus-plugin-content-docs/current.json`:サイドバーのカテゴリーラベル
- `i18n/$LANG_CODE/docusaurus-plugin-content-docs/current/**`:ドキュメントのマークダウンファイル

**翻訳のプレビュー**

```bash
yarn run start --locale $LANG_CODE
```

## ディベロッパーグループへの参加

Mixin developmentに参加するには、Mixin Messengerで`7000104112`を検索し、[developer group](https://supergroup.mixin.fan/#/7000104112/home)に参加してください。

