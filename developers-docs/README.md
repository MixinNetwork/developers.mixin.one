# Mixin Developer Documents Rebundled

## TODO

- [x] [algolia search](https://docusaurus.io/docs/search)
- [ ] reorganize the developer docs
  - [x] showcases
  - [x] support
  - [x] api
  - [x] reusable particles
  - [x] dapp guide
  - [x] tags for permission and bot
  - [x] sdk
  - [-] dapp tutorial
- [ ] polish document details:
  - [x] [admonitions](https://docusaurus.io/docs/markdown-features/react)
  - [x] code blocks
  - [x] more component
- [ ] i18n
  - [ ] chinese translation
  - [ ] [crowdin](https://docusaurus.io/docs/i18n/crowdin)
- [ ] more guides
  - [x] mtg best practices
  - [ ] client side oauth

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
