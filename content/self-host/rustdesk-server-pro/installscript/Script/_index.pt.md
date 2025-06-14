---
title: install.sh
weight: 4
---

{{% notice note %}}
Não esqueça de obter sua licença em [https://rustdesk.com/pricing/](https://rustdesk.com/pricing/), consulte a página de [licença](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) para mais detalhes.

Por favor leia [instalação OSS](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/) primeiro antes de fazer esta instalação simples. Você pode conhecer mais detalhes subjacentes lá.
{{% /notice %}}

### Instalar

Copie e cole o comando acima em seu terminal Linux para instalar o RustDesk Server Pro.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh | bash`

{{% notice note %}}
Eu recomendo usar [a imagem Docker](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/docker/#docker-compose); simplifica enormemente o processo de implantar a solução bem como atualizá-la. O consumo de recursos é muito baixo.

E por favor execute o acima sob seu diretório home ao invés de um diretório onde você não tem permissão de escrita.
{{% /notice %}}

O que faz:

- Instalar algumas dependências
- Configurar firewall UFW se disponível
- Criar um diretório de trabalho `/var/lib/rustdesk-server` e um diretório de log `/var/log/rustdesk-server`
- Instalar executáveis em `/usr/bin`
- Baixar e extrair Serviços RustDesk Pro para a pasta acima
- Criar serviços systemd para hbbs e hbbr (nomes de serviço são `rustdesk-hbbs.service` e `rustdesk-hbbr.service`)
- Se você escolher Domínio, ele instalará Nginx e Certbot, permitindo que a API esteja disponível na porta `443` (HTTPS) e obter um certificado SSL na porta `80`, é renovado automaticamente. Quando o https estiver pronto, acesse com `https://seudominio.com` ao invés de `https://seudominio.com:21114`.

{{% notice note %}}
Como [configurar HTTPS para console web manualmente](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}

{{% notice note %}}
Se o serviço systemd falhar ao iniciar, provavelmente está relacionado ao SELinux, por favor verifique [isto](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#selinux).
{{% /notice %}}

{{% notice note %}}
Se seu cliente não conseguir conectar ao seu servidor ou você não conseguir acessar o console web, por favor verifique [isto](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall).
{{% /notice %}}

### Atualizar

Copie e cole o comando acima em seu terminal Linux para atualizar sua instalação existente do RustDesk Server Pro, isto também poderia ser salvo localmente e agendado com cron.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh | bash`

{{% notice note %}}
Se você encontrar problemas com este script, eu sugeriria que você percorresse o script e executasse os passos manualmente, um por um.

E por favor execute o acima sob seu diretório home ao invés de um diretório onde você não tem permissão de escrita.
{{% /notice %}}

O que faz:

- Verifica novas versões do RustDesk Server Pro
- Se encontrar uma nova versão, remove os arquivos da API e baixa novos executáveis e arquivos da API

### Converter do código aberto

Copie e cole o comando acima em seu terminal Linux para converter do RustDesk Server para RustDesk Server Pro.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh | bash`

{{% notice note %}}
Por favor adicione a porta TCP `21114` ao seu firewall, esta é uma porta adicional para console web e login de usuário no cliente RustDesk.
{{% /notice %}}

{{% notice note %}}
Eu sugeriria mudar para uma instalação Docker se você encontrar problemas com este script. Alternativamente, você pode percorrer o script e executar os passos manualmente, um por um.
{{% /notice %}}

O que faz:

- Desabilitar e remover os serviços antigos
- Instalar algumas dependências
- Configurar firewall UFW se disponível
- Criar uma pasta `/var/lib/rustdesk-server` e copiar os certificados aqui
- Deletar `/var/log/rustdesk` e criar `/var/log/rustdesk-server`
- Baixar e extrair Serviços RustDesk Pro para a pasta acima
- Criar serviços systemd para hbbs e hbbr (nomes de serviço são rustdesk-hbbs.service e rustdesk-hbbr.service)
- Se você escolher Domínio, ele instalará Nginx e Certbot, permitindo que a API esteja disponível na porta 443 (HTTPS) e obter um certificado SSL na porta 80, é renovado automaticamente