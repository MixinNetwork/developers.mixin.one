const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Mixin Developer',
  tagline: 'Mixin Development Documents',
  url: 'https://developers.mixin.one/',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'fox-one', // Usually your GitHub org/user name.
  projectName: 'mixin-dev-docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Mixin Developer',
      logo: {
        alt: 'Mixin Developer',
        src: 'img/logo.svg',
      },
      items: [
        // {
        //   type: 'doc',
        //   docId: 'intro',
        //   position: 'left',
        //   label: 'Tutorial',
        // },
        {to: '/mainnet/overview', label: 'Docs', position: 'left'},
        {to: '/api-overview', label: 'API', position: 'left'},
        {
          href: 'https://github.com/fox-one/mixin-dev-docs',
          label: 'GitHub',
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
              label: 'Discord',
              href: 'https://discordapp.com/invite/mixin',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/MixinNetwork',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  plugins: [
    'docusaurus-plugin-sass',
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
          editUrl:
            'https://github.com/MixinNetwork/developer.mixin.one/developer-docs/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/MixinNetwork/developer.mixin.one/developer-docs/blog',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
};
