---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "fwnet"
  text: "an experimental network"
  tagline: "一个实验性网络"
  image:
    src: /fw-banner.svg
  actions:
    - theme: brand
      text: 什么是 fwnet?
      link: what-is-fwnet
    - theme: alt
      text: 快速开始
      link: getting-started

features:
  - icon: 🌐
    title: IX
    details: 基于 <a href="https://github.com/ntop/n2n" target="_blank">n2n</a> 的二层交换中心，自动 NAT 打洞以建立 P2P 连接
  - icon: ↔️
    title: Route Server
    details: 多台 Route Server 便于建立对等连接，并减少单点故障
  - icon: 🚀
    title: BFD
    details: 大幅加快路由收敛速度，及时检测故障并更新
  - icon: 🗡️
    title: RPKI
    details: 异常路由的终结者，避免错误蔓延至全网
  - icon: 🏷️
    title: DNS
    details: 基于 PowerDNS 的 DNS 系统，提供内部特色后缀域名解析
  - icon: 🔐
    title: CA
    details: 支持 ACME，用 TLS 保护数据传输安全
  - icon: 🔍️
    title: Looking Glass
    details: 强大的分析工具，洞察路由传播情况，快速定位故障
    link: https://lg.fw.ac.cn/
    target: _blank
  - icon: 🥰
    title: Love
    details: 若干年的迭代升级离不开各位参与者对网络技术的热爱
---

<!-- markdownlint-disable MD033 -->
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://cravatar.com/avatar/764a839cacacf07906786dd9567c505e?s=256',
    name: 'SerinaNya',
    title: '创建者',
    links: [
      { icon: 'github', link: 'https://github.com/SerinaNya' },
    ]
  },
  {
    avatar: 'https://cravatar.com/avatar/0bf16c751d119f1fb5e76d2bdef47fd4?s=256',
    name: '社会易姐QwQ',
    title: '参与者',
    links: [
      { icon: 'github', link: 'https://github.com/SocialSisterYi' },
    ]
  },  
  {
    avatar: 'https://avatars.githubusercontent.com/u/31172177',
    name: '暮光小猿wzt',
    title: '参与者',
    links: [
      { icon: 'github', link: 'https://github.com/kuresaru' },
    ]
  },  
  {
    avatar: 'https://cravatar.com/avatar/58fc16306be544a4c916e4ded9868571?s=256',
    name: 'EchoNoch',
    title: '参与者',
    links: [
      { icon: 'github', link: 'https://github.com/ywnsya' },
    ]
  },
  {
    avatar: 'https://cravatar.com/avatar/8037517bcd01e5f14b9d331c613b1f6d?s=256',
    name: 'Aris / Yakumo itsumi',
    title: '参与者',
    links: [
      { icon: 'github', link: 'https://github.com/2623684696' },
    ]
  },
  {
    avatar: 'https://blog.byteloid.one/img/march7th.webp',
    name: 'Bingxin',
    title: '参与者',
    links: [
      { icon: 'github', link: 'https://github.com/bingxin666/' },
    ]
  },  
  {
    avatar: 'https://cravatar.com/avatar/2defd5540f480625cf9d09e5d4c3b7c4?s=256',
    name: 'XieXiLin',
    title: '参与者',
    links: [
      { icon: 'github', link: 'https://github.com/XieXiLin2' },
    ]
  },
  {
    avatar: 'https://www.6bug.org/img/avatar_hu_c0d697dd8dc16777.png',
    name: 'Stela Haveno',
    title: '参与者',
    links: [
      { icon: 'github', link: 'https://github.com/weiwei-cool' },
    ]
  },
  {
    avatar: 'https://cravatar.com/avatar/9835ac92678b945ba7e9d1902f5d1f50963ac4acb9d1b5f96ec4b4d2ffd22ee0?s=256',
    name: '春秋',
    title: 'CN86.dev',
    links: [
      { icon: 'github', link: 'https://github.com/Chun-QiuCC' },
    ]
  },
  {
    avatar: 'https://vip1.zhuantou.com.cn/2025/10/16/68f0c7659229b.png',
    name: 'Jack≠Hijack',
    title: 'UNET',
    links: [
      { icon: 'github', link: 'https://github.com/daxi20' },
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      成员
    </template>
    <template #lead>
      fwnet 由成员们通过各种方式互联组成
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers size="small" :members />
</VPTeamPage>
