<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->

<script setup>
import { ref } from 'vue'

const rpkiData = ref({})
const roas = ref(0)
const buildTime = ref('')

fetch('https://rpki0.fw.ac.cn/rpki.json').then(res => res.json()).then(data => {
    rpkiData.value = data
    roas.value = data.metadata.roas
    buildTime.value = data.metadata.buildtime
})
</script>

# RPKI

在 fwnet 中，RPKI 可以被用于验证网络路由，以确保网络的可靠性和安全性。

## 服务器

fwnet 目前只有一个公开的 RPKI 服务器，地址为 `rpki.fw.ac.cn:8237`。

以下是 BIRD2 的配置方法：

```plain:line-numbers
roa4 table roa4_fwnet;
roa6 table roa6_fwnet;

protocol rpki rpki_fwnet {
    roa4 { table roa4_fwnet; };
    roa6 { table roa6_fwnet; };
    remote "rpki.fw.ac.cn" port 8237;
    refresh 30;
    retry 5;
    expire 600;
}
```

## 自建服务器

你也可以使用 [StarRTR](https://github.com/bgp/stayrtr) 自行部署 RPKI 服务器。

```bash
docker run --name fwnet-rpki -d -it -p 8237:8282 docker.io/rpki/stayrtr:latest -rtr.refresh=60 -rtr.retry=120 -rtr.expire=600 -cache=https://rpki0.fw.ac.cn/rpki.json -checktime=false -refresh=60 -last.modified=false
```

## ROAs

> [!NOTE]
> 共 {{ roas }} ROAs，构建时间：{{ new Date(buildTime).toLocaleString() }}
>
> 数据来源于 <https://rpki0.fw.ac.cn/rpki.json>

<table>
    <thead>
        <tr>
            <th>前缀</th>
            <th>最大长度</th>
            <th>ASN</th>
            <th>来源</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="roa in rpkiData.roas">
            <td>{{ roa.prefix }}</td>
            <td>{{ roa.maxLength }}</td>
            <td>{{ roa.asn }}</td>
            <td>{{ 4237370000 <= roa.asn && roa.asn <= 4237379999 ? 'fwnet' : roa.ta == 'fwnet' ? '其他': roa.ta }}</td>
        </tr>
    </tbody>
</table>
