---
title: RustDesk Server Pro
weight: 200
pre: "<b>2.2. </b>"
---

O RustDesk Server Pro oferece mais recursos em comparação com a versão gratuita:

- Sem limite de conexões simultâneas (a versão gratuita também não tem limite, mas softwares como TeamViewer possuem)
- [Console web](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/console/)
- API
- Suporte a OIDC, LDAP e 2FA:
- [OIDC](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/oidc/)
- [LDAP](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/ldap/)
- [2FA](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/2fa/)
- Lista de endereços
- Renomeação de dispositivos
- Gerenciamento de logs (conexão, transferência de arquivos, alarmes, etc.)
- Gerenciamento de dispositivos
- [Sincronização de configurações de segurança](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/strategy/)
- [Controle de acesso](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/permissions/)
- [Servidores de retransmissão múltiplos](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/relay/) (seleciona automaticamente o mais próximo)
- [Gerador de cliente personalizado](https://rustdesk.com/docs/pt/self-host/client-configuration/#1-custom-client-generator-pro-only) (para configurações avançadas)

{{% notice note %}}
Cliente RustDesk ≥ 1.2.0 necessário.
{{% /notice %}}
{{% notice note %}}
Se você montar seu próprio servidor em casa/trabalho e não conseguir se conectar por IP público/domínio, [consulte este artigo](https://rustdesk.com/docs/pt/self-host/nat-loopback-issues/) (Solução para problemas de loopback NAT ).
{{% /notice %}}

### Requisitos de hardware

Um VPS básico é suficiente para a maioria dos casos. O software do servidor não exige muito processamento nem memória. Nosso servidor público de ID, hospedado em um servidor Vultr de 2 CPUs e 4 GB de RAM, atende a mais de 1,5 milhão de dispositivos.

## Tutoriais em vídeo
Existem muitos tutoriais em vídeo disponíveis online que podem guiá-lo pela instalação da versão gratuita (OSS), [consulte a documentação](https://rustdesk.com/docs/pt/self-host/rustdesk-server-oss/install/#video-tutorials).

A instalação da versão Pro é quase idêntica, exceto pelas seguintes diferenças:

- São necessários caminhos de download e imagens Docker diferentes.
- Uma porta TCP adicional (21114) é necessária para a console web.

## Licença

Você pode obter a licença em https://rustdesk.com/pricing.html. Para mais detalhes, consulte a página [licença](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/license/).

### Download

O download da versão Pro do RustDesk Server pode ser feito clicando [aqui](https://github.com/rustdesk/rustdesk-server-pro/releases/latest).

### Instalação simples

Para facilitar, desenvolvemos scripts que cuidam de tudo (instalar/atualizar/converter de código aberto) [Script de instalação simples](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/installscript/).

{{% notice note %}}
Você pode obter a licença em [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html). Para mais detalhes sobre a licença, consulte a [página](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/license/) .
{{% /notice %}}

### Instalação manual

É quase idêntica à versão [gratuita](https://rustdesk.com/docs/pt/self-host/rustdesk-server-oss/install/), mas você não precisa executar hbbs/hbbr com nenhum argumento. Eles podem ser definidos posteriormente no console web.

- `-k _` é definido por padrão.
- `-r <servidor:host>` não é mais necessário se o servidor de retransmissão estiver executando na mesma máquina que o hbbs, e você pode definir vários servidores de retransmissão no console web.

#### Instalação Docker

A maioria dos usuários opta por instalar o RustDesk Server Pro com o [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/).

#### Portas necessárias
Certifique-se de que essas portas estejam configuradas ao definir as regras do firewall e o mapeamento de portas do Docker.

- TCP 21114-21119
- UDP 21116
  
Para obter mais informações sobre essas portas, consulte [aqui](/docs/pt/self-host/rustdesk-server-oss/install/#portas).

### Atualização

Este [guia](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/faq/#there-is-a-new-version-of-rustdesk-server-pro-out-how-can-i-upgrade) aborda como atualizar o RustDesk Server Pro de uma versão inferior, considerando diferentes métodos de instalação.

## Configurar https para o console web

O script de instalação simples inclui configuração https, mas pode falhar ou não ser do seu agrado. Além disso, ele não pode ser usado para outros métodos de instalação.

Aqui está um tutorial simples de [configuração https manual](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/faq/#configurar-https-para-web-console-manualmente).

##Migrar para novo host e backup / restauração

Aqui está um tutorial [detalhado](https://github.com/rustdesk/rustdesk-server-pro/discussions/184) (Documentação em Inglês).

## Migrar licença
Siga este [guia](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/license/#recupera%C3%A7%C3%A3o-e-migra%C3%A7%C3%A3o-de-fatura-e-licen%C3%A7a).

