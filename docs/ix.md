---
outline: [2, 3]
---

# IX

<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD028 -->

fwnet 基于开源项目 [n2n](https://github.com/ntop/n2n) 构建 Layer-2 虚拟网络，为分布式节点提供虚拟互联网交换（IX）服务。

fwnet 中的虚拟 IX 致力于集中 BGP 会话并反射路由，其数据平面由 n2n 担当。数据并不会经过 Route Server，因此即使 PoP 和 Route Server 的物理位置距离较远，也不会对与其他成员的互联质量造成额外影响。

> [!NOTE] PoP-to-PoP 直连
> n2n 会建立端到端的 P2P 连接，而不依赖中继设备转发，显著降低 PoP 之间的通信延迟。

> [!NOTE] 按需 NAT 穿透
> n2n 支持自动按需 NAT 穿透 (NAT traversal)，使位于 NAT 后（无公网 IP）的 PoP 也能无缝接入虚拟 IX。

> [!IMPORTANT] 需使用特定版本的 n2n
> fwnet 使用 n2n [pre-release 3.1.1](https://github.com/ntop/n2n/releases/tag/3.1.1)。

> [!TIP] 关于 tinc
> 未来有可能引入对 [tinc](https://www.tinc-vpn.org/) 的支持。

## vIX2

vIX2 是目前最主要的 IX，在两个地域分别部署了一台 Route Server，均运行 BIRD2，每台 Route Server 的配置几乎相同。

| Route Server | IP                                             | 地理位置     | 提供者                                                                           |
| ------------ | ---------------------------------------------- | ------------ | -------------------------------------------------------------------------------- |
| RS1          | `169.254.232.33` / `fe80::707d:63ff:fed0:f7c7` | 北京 / CN-BJ | [@ShakaiAneE](https://shakaianee.top/)                                           |
| RS2          | `169.254.232.34` / `fe80::8caa:90ff:fe93:2ffb` | 河南 / CN-HA | [@Luochancy](https://www.luochancy.com/) / [LuocyNet](https://www.luocynet.com/) |

vIX2 使用 4237370602 作为 ASN，IPv4 网段为 169.254.232.32/27，IPv6 则直接使用接口的 Link-Local 地址。

> [!IMPORTANT] 需要固定 MAC 地址
> Link-Local 地址是由接口的 MAC 地址计算得来的，而 n2n 的 edge 的默认行为是在每次启动时随机生成一个 MAC 地址。
>
> 因此，需要在 edge 配置文件中通过 `-m` 参数手动设置一个固定的 MAC 地址，以确保 n2n 接口的 Link-Local 地址始终保持一致。

### BFD

> [!NOTE] 关于 BFD
> BFD（Bidirectional Forwarding Detection / 双向转发检测）是一种独立的工具，通过毫秒级的探测和回应消息来提供存活性和故障检测。
>
> - 如果 BFD 检测到故障，它会迅速通知 BGP 会话，然后 BGP 会话会断开并切换到其他的可用路由。
> - 如果 BFD 检测到故障已消失，它会迅速通知 BGP 恢复会话。

vIX2 的 Route Servers 均支持 BFD，但默认配置为被动模式，BFD 会话必须由 PoP 侧主动发起。

这确保了即使 PoP 侧无法启用或不愿意启用 BFD 也可正常建立 BGP 会话。

> [!IMPORTANT] 📢 fwnet 建议所有 PoP 都启用 BFD

### MP-BGP

> [!NOTE] 关于 MP-BGP
> MP-BGP 允许不同类型的地址族并行分发。
>
> 浅显地来说，在建立 MP-BGP 会话时，仅需填写 IPv6 的对端地址即可同时传递 IPv4 和 IPv6 的路由，并自动为 IPv4 的路由确定合适的 next hop。

vIX2 支持 MP-BGP，可使用 IPv6 Link-Local 地址作为 BGP 会话的对端地址。

### Extended Next Hop <Badge text="暂不支持" type="danger" />

> [!NOTE] 关于 Extended Next Hop
> Extended Next Hop 允许将 IPv6 地址作为 IPv4 路由的 next hop。反之亦然。

vIX2 **暂不支持** Extended Next Hop，这是由多个因素决定的：

- vIX2 的 IPv4 网段前缀长度为 /27，地址池暂时充足，还未出现无法分配更多 IPv4 地址而不得不使用纯 IPv6 环境的情况。
- vIX2 的现有 PoP 大多只在接口上配置了固定的 IPv4 地址，没有配置固定的 IPv6 地址，而 fwnet 更倾向于 IPv6 地址作为 next hop。

### Add-Paths <Badge text="暂不开放" type="warning" />

> [!NOTE] 关于 Add-Paths
> Add-Paths / Additional Paths 允许在 BGP 会话中为一个前缀传递更多的路径，而不仅仅是最优的那条。

此功能目前仅作 **初步实验**，不对所有 PoP 开放。

Route Servers 依旧会向一般的 PoP 传递最优的路由。

### ROA Check

> [!NOTE] 关于 ROA
> ROA（Route Origin Authorization / 路由来源认证）校验可以确保接收到的路由是合法的，可有效避免 _一人配错全网爆炸_ 的情况。

Route Servers 会在接收到来自 PoP 的路由时进行 ROA 校验，如果不符合策略则拒绝接收。在将路由分发给其他 PoP 时不会再做 ROA 校验。

- ⛔ 任何情况下，如果一条路由的 prefix & length & ASN 与 ROAs 中的数据不匹配，那么该路由将被 **拒绝**。
- ✅ _Simple_ 策略下，如果一条路由的 prefix 不在 ROAs 中，那么该路由将被 **接受**。
- ⛔ _Strict_ 策略下，如果一条路由的 prefix 不在 ROAs 中，那么该路由将被 **拒绝**。

使用的 ROAs 数据来自 [fwnet RPKI](./rpki.md)。

fwnet 会基于风险评估，为不同的 PoP 的 BGP 会话选用 _Simple_ 或 _Strict_ 策略。

### Large Communities

经过 vIX2 的 Route Server 反射的路由将会被添加上一个 Large Community：**(4237370602, 567, x)** —— 其中 x 为 Route Server 的序号，也就是 `1` 或 `2`。

如此就可以在网络中识别路由的传播路径，并防止路由回环至 vIX2 的其他 Route Servers。
