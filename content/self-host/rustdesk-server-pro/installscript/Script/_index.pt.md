---
title: install.sh 
weight: 4
---

{{% notice note %}}
Não se esqueça de obter sua licença em [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), verifique a página de [licença](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/license/) para mais detalhes.

Leia primeiro a [instalação do OSS](https://rustdesk.com/docs/pt/self-host/rustdesk-server-oss/install/) antes de realizar esta instalação simples. Você pode conhecer mais detalhes subjacentes lá.
{{% /notice %}}

### Instalar

Copie e cole o comando acima em seu terminal Linux para instalar o RustDesk Server Pro.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

O que ele faz:

- Instala algumas dependências
- Configura o firewall UFW, se disponível
- Cria um diretório de trabalho `/var/lib/rustdesk-server` e um diretório de log `/var/log/rustdesk-server`
- Instala executáveis em `/usr/bin`
- Baixa e extrai os serviços RustDesk Pro para a pasta acima
- Cria serviços systemd para hbbs e hbbr (os nomes dos serviços são rustdesk-hbbs.service e rustdesk-hbbr.service)
- Se você escolher Domínio, ele instalará o Nginx e o Certbot, permitindo que a API esteja disponível na porta 443 (HTTPS) e obtenha um certificado SSL pela porta 80, sendo renovado automaticamente
  
{{% notice note %}}
Como configurar [manualmente o HTTPS para o console web](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}

{{% notice note %}}
Se o serviço systemd não iniciar, provavelmente está relacionado ao SELinux. Verifique [aqui](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/faq/#selinux).
{{% /notice %}}

{{% notice note %}}
Se o seu cliente não consegue se conectar ao servidor ou você não consegue acessar o console web, verifique [aqui](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/faq/#firewall).
{{% /notice %}}

### Atualizar

Copie e cole o comando acima em seu terminal Linux para atualizar sua instalação existente do RustDesk Server Pro. Isso também pode ser salvo localmente e agendado com o cron.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh)`

O que ele faz:

- Procura por novas versões do RustDesk Server Pro
- Se encontrar uma nova versão, remove os arquivos da API e baixa novos executáveis e arquivos da API

### Converter do código aberto

Copie e cole o comando acima em seu terminal Linux para converter do RustDesk Server para o RustDesk Server Pro.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh)`

{{% notice note %}}
Adicione a porta TCP `21114` ao seu firewall. Esta é a porta adicional para o console web e login do usuário no cliente RustDesk.
{{% /notice %}}

O que ele faz:

- Desativa e remove os serviços antigos
- Instala algumas dependências
- Configura o firewall UFW, se disponível
- Cria uma pasta `/var/lib/rustdesk-server` e copia os certificados aqui
- Exclui `/var/log/rustdesk` e cria `/var/log/rustdesk-server`
- Baixa e extrai os serviços RustDesk Pro para a pasta acima
- Cria serviços systemd para hbbs e hbbr (os nomes dos serviços são rustdesk-hbbs.service e rustdesk-hbbr.service)
- Se você escolher Domínio, ele instalará o Nginx e o Certbot, permitindo que a API esteja disponível na porta 443 (HTTPS) e obtenha um certificado SSL pela porta 80, sendo renovado automaticamente
