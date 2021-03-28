/** @type {import('@docusaurus/types').DocusaurusConfig} */

const path = require('path');

module.exports = {
  title: 'Crab Network',
  tagline: 'The tagline of my site',
  url: 'https://crab.network.l2me.com/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',
  organizationName: 'darwinia-network', // Usually your GitHub org/user name.
  projectName: 'crab.network', // Usually your repo name.
  themeConfig: {
    colorMode: {
      // disableSwitch: true,
      defaultMode: 'light',
    },
    navbar: {
      title: 'Crab Network',
      // logo: {
      //   alt: 'My Site Logo',
      //   src: 'img/logo.svg',
      // },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/darwinia-network/darwinia/tree/master/runtime/crab',
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
              label: 'Medium',
              href: 'https://medium.com/@DarwiniaNetwork',
            },
            {
              label: 'Twitter',
              href: 'https://t.me/DarwiniaNetwork',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/darwinia-network',
            },
          ],
        },

        {
          title: 'More',
          items: [
            {
              label: 'Darwinia',
              href: 'https://darwinia.network/',
            },
            {
              label: 'Kusama',
              href: 'https://kusama.network/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Crab Network. Built with Docusaurus.`,
    },
  },
  plugins: [
    'docusaurus-plugin-sass',
    path.resolve(__dirname, './src/plugins/seo'),
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/darwinia-network/crab-home/edit/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        label: "English",
      },
      'zh-CN': {
        label: "中文",
      }
    }
  }
};
