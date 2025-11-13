---
outline: [2, 3]
---

# CA

fwnet 提供 _证书颁发机构_（CA）服务，并提供 ACME 服务。  
fwnet provides _Certificate Authority_ (CA) services and can issue certificates through ACME.

## Root CA

| 证书名称 Common Name      | 证书文件 files in PEM format                 | 证书到期日 Expiration Date | 签名算法 Algorithm | 颁发者 Issuer |
| ------------------------- | -------------------------------------------- | -------------------------- | ------------------ | ------------- |
| **fwnet ECDSA Root CA 2** | <https://fw.ac.cn/fwnet_ECDSA_Root_CA_2.crt> | 2030/06/07                 | ECDSA + SHA384     | fwnet         |

### fwnet ECDSA Root CA 2

fwnet 的第二个 Root CA，弥补了一些 fwnet ECDSA Root CA 1 的缺陷。

<!-- markdownlint-disable MD033 -->

~~为了在过渡期内使客户端平滑兼容，部分颁发点对 fwnet ECDSA Root CA 1 进行了交叉签名。~~ <Badge text="⏱️ 已过时" type="danger" />  

> [!CAUTION]
> 现已不再支持 fwnet ECDSA Root CA 1，也不再签发交叉签名的证书。

```bash
# 在一些 Linux 发行版上安装 / Install on some Linux distributions
sudo wget -P /usr/local/share/ca-certificates https://fw.ac.cn/fwnet_ECDSA_Root_CA_2.crt
sudo update-ca-certificates
```

## ACME

### SerinaNya TLS Issuing CA 1

- **ACME Directory**  
  `https://serinanya.cn/acme/fwnet`  <Badge text="✨ 更新" type="warning" />

- **Root CA**  
  fwnet ECDSA Root CA 2

- **有效期 Lifespan**  
  90 days

- **签名算法 Algorithm**  
  ECDSA + SHA384

- **✅ IP 证书**  
