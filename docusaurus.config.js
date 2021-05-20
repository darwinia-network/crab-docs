/** @type {import('@docusaurus/types').DocusaurusConfig} */

const path = require('path');

module.exports = {
  title: 'Crab Docs',
  tagline: 'The tagline of my site',
  url: 'https://docs.crab.network.l2me.com/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',
  organizationName: 'darwinia-network', // Usually your GitHub org/user name.
  projectName: 'crab-docs', // Usually your repo name.
  themeConfig: {
    colorMode: {
      // disableSwitch: true,
      defaultMode: 'light',
    },
    navbar: {
      title: 'Crab Network',
      logo: {
        alt: 'My Site Logo',
        src: 'img/favicon.svg',
      },
      items: [
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/darwinia-network/darwinia/tree/master/runtime/crab',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://darwinia.network/Darwinia_Genepaper_EN.pdf',
          label: 'WhitePaper',
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
          editUrl: 'https://github.com/darwinia-network/crab-docs/',
          routeBasePath: '/',
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
