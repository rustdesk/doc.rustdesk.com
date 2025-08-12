---
title: RustDesk Server Pro
description: "Guia completo do RustDesk Server Pro - a solução premium auto-hospedada de desktop remoto. Recursos de autenticação empresarial (OIDC, LDAP, 2FA), console web, acesso à API e controles de segurança avançados para implantação profissional."
keywords: ["rustdesk server pro", "servidor rustdesk pro", "servidor desktop remoto", "acesso remoto empresarial", "rustdesk profissional", "rdp auto-hospedado", "rustdesk empresarial", "solução desktop remoto", "licença rustdesk", "console web rustdesk"]
weight: 200
pre: "<b>2.2. </b>"
---

O RustDesk Server Pro tem mais recursos comparado à versão de código aberto.

- Conta
- [Console web](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/)
- [API](https://github.com/rustdesk/rustdesk/wiki/FAQ#api-of-rustdesk-server-pro)
- [OIDC](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/oidc/), [LDAP](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/ldap/), [2FA](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/2fa/)
- Catálogo de endereços
- Gerenciamento de logs (Conexão, transferência de arquivos, alarme, etc.)
- Gerenciamento de dispositivos
- [Sincronização de configurações de segurança](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/strategy/)
- [Controle de acesso](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/)
- [Múltiplos servidores de relay](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/) (seleciona automaticamente seu relay mais próximo)
- [Gerador de cliente personalizado](https://rustdesk.com/docs/en/self-host/client-configuration/#1-custom-client-generator-pro-only)
- WebSocket
- Auto-hospedagem de cliente web

{{% notice note %}}
Se você construir seu próprio servidor em casa/escritório, e não conseguir se conectar através de IP/domínio público, por favor verifique [este artigo](https://rustdesk.com/docs/en/self-host/nat-loopback-issues/).
{{% /notice %}}

{{% notice note %}}
Recomendamos ler isto primeiro antes de prosseguir, [Como funciona o servidor auto-hospedado?](/docs/en/self-host/#how-does-self-hosted-server-work).
{{% /notice %}}

## Requisitos de hardware

O VPS de nível mais baixo é suficiente para seus casos de uso. O software do servidor não é intensivo em CPU e memória. Nosso servidor ID público hospedado em um servidor Vultr de 2 CPU/4 GB serve mais de 1,0 milhão de endpoints. Cada conexão de relay consome em média 180kb por segundo. 1 núcleo de CPU e 1G de RAM é suficiente para suportar 1000 conexões de relay concorrentes.

## Tutoriais de artigos
[Guia passo a passo: Auto-hospedar RustDesk Server Pro na nuvem via Docker para acesso remoto seguro](https://www.linkedin.com/pulse/step-by-step-guide-self-host-rustdesk-server-pro-cloud-montinaro-fwnmf/)

## Tutoriais em vídeo

[Guia para iniciantes: Auto-hospedar RustDesk Server Pro para usuário Linux novato](https://www.youtube.com/watch?v=MclmfYR3frk)

[Guia rápido: Auto-hospedar RustDesk Server Pro para usuário Linux avançado](https://youtu.be/gMKFEziajmo)


## Licença

Você pode obter a licença em https://rustdesk.com/pricing.html, verifique a página [licença](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) para mais detalhes.

## Começando
### 1. Instalação

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

Para mais detalhes, por favor verifique [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/).

### 2. Portas necessárias

Você precisa abrir as portas `21114`-`21119` TCP e `21116` UDP, por favor certifique-se de que essas portas estejam configuradas quando você definir as regras do firewall e o mapeamento de portas do Docker.

Mais informações sobre essas portas, por favor verifique [aqui](/docs/en/self-host/rustdesk-server-oss/install/#ports).

### 3. Definir licença

Abra seu console web acessando `http://<ip do servidor>:21114`, [faça login](/docs/en/self-host/rustdesk-server-pro/console/#log-in) usando as credenciais padrão admin/test1234 `admin`/`test1234`. Siga [este guia](/docs/en/self-host/rustdesk-server-pro/license/#set-license) para definir a licença.

### 4. Configurar HTTPS para console web

> Você pode pular este passo se não quiser usar HTTPS durante o teste, mas lembre-se de alterar o endereço da API do cliente após configurar HTTPS

Aqui está um tutorial simples de [configuração manual de HTTPS](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).

### 5. Configurar cliente para usar o servidor auto-hospedado

https://rustdesk.com/docs/en/self-host/client-configuration/

### 6. Configurar WebSocket

Para habilitar que o cliente web ou [cliente desktop/mobile](/docs/en/self-host/client-configuration/advanced-settings/#allow-websocket) funcione adequadamente com WebSocket, você precisa adicionar as seguintes configurações à sua configuração de proxy reverso.

https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms


## Atualizar servidor

Este [guia](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#there-is-a-new-version-of-rustdesk-server-pro-out-how-can-i-upgrade) cobre como atualizar o RustDesk Server Pro de uma versão inferior, abordando diferentes métodos de instalação.

## Migrar para novo host e backup/restauração

Aqui está um [tutorial](https://github.com/rustdesk/rustdesk-server-pro/discussions/184) detalhado.

## Migrar licença

Por favor siga este [guia](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-license-retrieval-and-migration).

## Atualizar licença

Siga [este guia](/docs/en/self-host/rustdesk-server-pro/license/#renewupgrade-license) para atualizar sua licença para mais usuários e dispositivos a qualquer momento.

## Sobre segurança

https://github.com/rustdesk/rustdesk/discussions/9835