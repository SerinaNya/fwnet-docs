import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'fwnet',
  description: 'fwnet is an experimental network. fwnet 是一个实验性网络。',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
  ],

  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://fw.ac.cn',
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/fw-square.svg',
    nav: [{ text: 'Home', link: '/' }],
    sidebar: [
      {
        text: '简介',
        collapsed: true,
        items: [
          { text: '什么是 fwnet？', link: '/what-is-fwnet' },
          { text: '快速开始', link: '/getting-started' },
          { text: '其他项目', link: '/other-projects' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SerinaNya/fwnet-docs' },
    ],

    externalLinkIcon: true,
    
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    lastUpdatedText: '最后更新于',
    outline: {
      label: '在此页面上',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    editLink: {
      pattern: 'https://github.com/SerinaNya/fwnet-docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面',
    },

    footer: {
      message: `
        <a href="https://beian.miit.gov.cn/" target="_blank" style="text-decoration: none">沪ICP备2021021453号-5</a> 
      `,
      copyright: `
        © 2022-present fwnet, <a href="https://serinanya.cn/" target="_blank" style="text-decoration: none">SerinaNya</a>
        <br />
        <small>
        Licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" style="text-decoration: none">CC BY-NC-SA 4.0</a>
        </small>
      `,
    },
  },

  vite: {
    optimizeDeps: {
      exclude: [
        '@nolebase/vitepress-plugin-enhanced-readabilities/client',
        'vitepress',
        '@nolebase/ui',
      ],
    },
    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/vitepress-plugin-highlight-targeted-heading',
        '@nolebase/ui',
      ],
    },
  },
});
