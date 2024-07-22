---
title: Codificação Personalizada de Configurações
weight: 49
---

### Servidor Personalizado
{{% notice note %}}
Para codificar configurações personalizadas do servidor em seus [executáveis](https://rustdesk.com/docs/en/dev/build/), você precisa compilar manualmente o cliente em sua máquina ou com o [GitHub Actions](https://rustdesk.com/docs/pt/dev/build/all/). <br>
**Observação**: [executores auto-hospedados](https://docs.github.com/pt/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners) para Arm são usados em nossas ações do GitHub. Configure-o você mesmo.
{{% /notice %}}
{{% notice note %}}
**Se você definir qualquer um desses valores sem definir o outro, seu executável não funcionará!**
{{% /notice %}}

Você pode definir as seguintes variáveis de ambiente em seu sistema operacional e o RustDesk usará essas variáveis ao compilar seu cliente, em vez dos servidores padrão rustdesk.com.

Se você não sabe como definir uma variável de ambiente em seu sistema, deve encontrar documentação online para o seu sistema operacional que explique isso.

#### RENDEZVOUS_SERVER
Esta variável deve ser definida para a URL do seu servidor.

Deve ser uma string como
```
rustdesk.my-domain.com
```

#### RS_PUB_KEY
Esta variável será sua chave pública. Mais informações sobre a chave estão disponíveis [aqui](https://rustdesk.com/docs/pt/self-host/install/#key).

Deve ser uma string como
```
OeVuKk5nlHiXp+APNn0Y3pC1Iwpwn44JGqrQCsWqmBw=
```

#### API_SERVER
Por padrão, o API_SERVER é executado em `http://rustdesk.meu-dominio.com:21114`. É recomendável executá-lo por trás do Nginx por segurança com HTTPS.

Deve ser uma string como
```
https://rustdesk.my-domain.com
```
