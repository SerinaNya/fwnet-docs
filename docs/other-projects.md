# 其他项目

<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD028 -->

以下是一些与 fwnet 类似的实验网络，其中部分网络已与 fwnet 互联。

## dn42

[dn42](https://dn42.dev/) 是一个大型、去中心化的网络。其目的是模拟一个互联网。它使用了大量在目前互联网骨干上应用的技术（例如 BGP 和递归 DNS），可以很好地模拟一个真实的网络环境。

## CN86 <Badge text="已与 fwnet 互联" type="tip" />

[CN86 Networks](https://cn86.dev/) 为网络爱好者打造的私有学习与测试网络，一个迷你的互联网沙盒。

CN86 已通过以下途径与 fwnet 进行互联：

| CN86 设施 | fwnet 设施 | 协议 |
| --------- | ---------- | ---- |
| 宁波节点  | vIX2       | BGP  |

---

> [!INFO] CN86 RPKI 描述文件
> <https://pub-9cfc6b50844a45d9bb7fc958ece64bcc.r2.dev/CN86/rpki.json>

> [!TIP]
> fwnet 的过滤器暂时只允许来自 ASN 4286860000 ~ 4286869999 的路由。

> [!WARNING]
> fwnet 的过滤器对来自 CN86 的路由进行 **严格 ROA 检查**，任何来自 CN86 的路由都需要被登记才能被 fwnet 接受。

## LuocyNet <Badge text="连接已中断" type="warning" />

[LuocyNet](https://www.luocynet.com/) 是一个小型的去中心化网络
