const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Mixin Developers',
  tagline: 'Mixin Development Documents',
  url: 'https://developers.mixin.one',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'images/favicon.ico',
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
    algolia: {
      apiKey: '2d81009f52b49499743802eee11ecf11',
      indexName: 'mixin',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: see doc section below
      appId: '3K3D3FYNPZ',
    },

    navbar: {
      title: 'Mixin Developer',
      logo: {
        alt: 'Mixin Developer',
        src: 'images/logo.svg',
      },
      items: [
        {to: '/docs/api-overview', label: 'API', position: 'left'},
        {to: '/docs/introduction', label: 'Docs', position: 'left'},
        {to: '/showcase', label: 'Showcase', position: 'left'},
        {to: '/blog', label: 'News', position: 'left'},
        {
          href: 'https://developers.mixin.one/dashboard',
          label: 'Dashboard',
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
            {
              label: 'Dashboard',
              href: 'https://developers.mixin.one/dashboard',
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
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebar.docs.js'),
          path: 'docs',
          routeBasePath: '/docs',
          // Please change this to your repo.
          editUrl: 'https://github.com/MixinNetwork/developers.mixin.one/tree/main/developers-docs',
          editLocalizedFiles: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/MixinNetwork/developers.mixin.one/tree/main/developers-docs/blog',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          trailingSlash: false,
        }
      },
    ],
  ],
};
