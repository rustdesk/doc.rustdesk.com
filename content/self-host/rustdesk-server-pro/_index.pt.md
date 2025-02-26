---
title: RustDesk Server Pro
weight: 200
pre: "<b>2.2. </b>"
---

RustDesk Server Pro tem mais recursos em comparação com a versão de código aberto.

- Conta
- Sem limite de conexões simultâneas, ou seja, sem limite de conexões simultâneas (a versão OSS também não tem limite, mas TeamViewer etc. têm esse limite)
- [Console web](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/)
- API
- [OIDC](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/oidc/), [LDAP](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/ldap/), [2FA](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/2fa/)
- Catálogo de endereços
- Renomear
- Gerenciamento de logs (Conexão, transferência de arquivos, alarme, etc.)
- Gerenciamento de dispositivos
- [Sincronização de configurações de segurança](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/strategy/)
- [Controle de acesso](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/)
- [Múltiplos servidores de retransmissão](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/) (seleciona automaticamente o retransmissor mais próximo)
- [Gerador de cliente personalizado](https://rustdesk.com/docs/en/self-host/client-configuration/#1-custom-client-generator-pro-only)

{{% notice note %}}
Se você construir seu próprio servidor em casa/escritório e não conseguir se conectar através de IP público/domínio, verifique [este artigo](https://rustdesk.com/docs/en/self-host/nat-loopback-issues/).
{{% /notice %}}

{{% notice note %}}
Recomendamos ler isto primeiro antes de prosseguir, [Como funciona o servidor auto-hospedado?](/docs/en/self-host/#how-does-self-hosted-server-work).
{{% /notice %}}

## Requisitos de hardware

O nível mais baixo de VPS é suficiente para seus casos de uso. O software do servidor não é intensivo em CPU e memória. Nosso servidor de ID público hospedado em um servidor Vultr de 2 CPU/4 GB atende a mais de 1,0 milhão de endpoints. Cada conexão de retransmissão consome em média 180 kb por segundo. 1 núcleo de CPU e 1 GB de RAM são suficientes para suportar 1000 conexões de retransmissão simultâneas.

## Tutoriais de artigos
[Guia passo a passo: Auto-hospedar RustDesk Server Pro na nuvem via Docker para acesso remoto seguro](https://www.linkedin.com/pulse/step-by-step-guide-self-host-rustdesk-server-pro-cloud-montinaro-fwnmf/)

## Tutoriais em vídeo

Existem [muitos tutoriais em vídeo](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/#video-tutorials) disponíveis online que podem guiá-lo na instalação da versão gratuita do OSS.

Aqui está outro [bom tutorial](https://www.linkedin.com/pulse/building-your-own-remote-desktop-solution-rustdesk-cloud-montinaro-bv94f/?trackingId=a07rn2fkBW1ctLHaJ0tVcg%3D%3D) sobre auto-hospedagem da versão gratuita do OSS na nuvem Hetzner com docker.

A instalação da versão Pro é quase idêntica, exceto pelas seguintes diferenças:

- Caminho de download diferente e [imagens Docker](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/docker/) / [arquivo compose](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/docker/#docker-compose) são necessários.
- Uma porta TCP adicional (21114) é necessária para o console web.

## Licença

Você pode obter a licença em https://rustdesk.com/pricing.html, verifique a [página de licença](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) para mais detalhes.

## Começando
### 1. Instalação

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
docker compose up -d
```

Para mais detalhes, verifique [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/).

### 2. Portas necessárias

Você precisa abrir as portas `21114`-`21119` TCP e `21116` UDP, certifique-se de que essas portas estejam configuradas ao definir as regras do firewall e o mapeamento de portas do Docker.

Para mais informações sobre essas portas, verifique [aqui](/docs/en/self-host/rustdesk-server-oss/install/#ports).

### 3. Configurar licença

Abra seu console web acessando `http://<server ip>:21114`, [faça login](/docs/en/self-host/rustdesk-server-pro/console/#log-in) usando as credenciais padrão admin/test1234 `admin`/`test1234`. Siga [este guia](/docs/en/self-host/rustdesk-server-pro/license/#set-license) para configurar a licença.

### 4. Configurar HTTPS para o console web

> Você pode pular esta etapa se não quiser usar HTTPS durante o teste, mas lembre-se de alterar o endereço da API do cliente após configurar o HTTPS.

Aqui está um tutorial simples de [configuração manual de HTTPS](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).

### 5. Configurar o cliente para usar o servidor auto-hospedado

https://rustdesk.com/docs/en/self-host/client-configuration/

## Atualizar servidor

Este [guia](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#there-is-a-new-version-of-rustdesk-server-pro-out-how-can-i-upgrade) cobre como atualizar o RustDesk Server Pro de uma versão inferior, abordando diferentes métodos de instalação.

## Migrar para um novo host e backup/restauração

Aqui está um [tutorial detalhado](https://github.com/rustdesk/rustdesk-server-pro/discussions/184).

## Migrar licença

Siga este [guia](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-license-retrieval-and-migration).

## Atualizar licença

Siga [este guia](/docs/en/self-host/rustdesk-server-pro/license/#renewupgrade-license) para atualizar sua licença para mais usuários e dispositivos a qualquer momento.

## Sobre segurança

https://github.com/rustdesk/rustdesk/discussions/9835
