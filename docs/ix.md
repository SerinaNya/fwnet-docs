# IX

fwnet 基于开源项目 [n2n](https://github.com/ntop/n2n) 构建 Layer-2 虚拟网络，为分布式节点提供虚拟互联网交换（IX）服务。

> [!NOTE] PoP-to-PoP 直连
> n2n 会建立端到端的 P2P 连接，而不依赖中继设备转发，显著降低 PoP 之间的通信延迟。

> [!NOTE] 按需 NAT 穿透
> n2n 支持自动按需 NAT 穿透 (NAT traversal)，使位于 NAT 后（无公网 IP）的 PoP 也能无缝接入虚拟 IX。

> [!IMPORTANT]
> fwnet 使用 n2n [pre-release 3.1.1](https://github.com/ntop/n2n/releases/tag/3.1.1)。
