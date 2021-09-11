const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Mixin Developer',
  tagline: 'Mixin Development Documents',
  url: 'https://developers.mixin.one',
  baseUrl: '/docs/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'MixinNetwork', // Usually your GitHub org/user name.
  projectName: 'developers.mixin.one', // Usually your repo name.
  trailingSlash: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      'en': {
        label: 'English',
      },
      'zh-CN': {
        label: '简体中文',
      }
    }
  },
  themeConfig: {
    // algolia: {
      // apiKey: '0658fa0945f44e20e9d148da027a3bd7',
      // indexName: 'mixin',

      // Optional: see doc section below
      // contextualSearch: true,

      // Optional: see doc section below
      // appId: '',

      // Optional: Algolia search parameters
      // searchParameters: {},

      //... other Algolia params
    // },

    navbar: {
      title: 'Mixin Developer',
      logo: {
        alt: 'Mixin Developer',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/introduction', label: 'Docs', position: 'left'},
        {to: '/api-overview', label: 'API', position: 'left'},
        {to: '/showcase', label: 'Showcase', position: 'left'},
        {
          href: 'https://github.com/MixinNetwork/developers.mixin.one',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/mixin',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/Mixin_Network',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/MixinNetwork',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Mixin`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  plugins: [
    'docusaurus-plugin-sass',
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        language: ["en", "zh"],
        // ```
        // When applying `zh` in language, please install `nodejieba` in your project.
      },
    ],
    // [
    //   '@docusaurus/plugin-content-docs',
    //   {
    //     id: 'api',
    //     path: 'docs',
    //     routeBasePath: '/',
    //     editCurrentVersion: false,
    //     sidebarPath: require.resolve('./sidebar.api.js'),
    //     showLastUpdateAuthor: false,
    //     showLastUpdateTime: true,
    //   },
    // ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebar.docs.js'),
          path: 'docs',
          routeBasePath: '/',
          // Please change this to your repo.
          editUrl: 'https://github.com/MixinNetwork/developers.mixin.one/tree/main/developers-docs',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/MixinNetwork/developers.mixin.one/tree/main/developers-docs/blog',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
};
