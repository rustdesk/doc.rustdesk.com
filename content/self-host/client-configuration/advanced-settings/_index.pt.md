---
title: Configurações Avançadas
weight: 49
---

Todas as configurações avançadas em clientes personalizados são abordadas aqui.

## Níveis de Privilégio para Configurações

Há quatro tipos de configurações:

1. Configurações de substituição, em `Console Web` → `Clientes Personalizados`
2. Configurações padrão, em `Console Web` → `Clientes Personalizados`
3. Configurações do usuário, no cliente RustDesk
4. Configurações de estratégia, em `Console Web` → `Estratégias`

A hierarquia de privilégios para essas configurações é a seguinte: `Substituição > Estratégia > Usuário > Padrão`.

## Configurações de Segurança

### access-mode

Define o modo de acesso (permissões) para conexões de entrada.

**Localização**:

1. **Desktop** Configurações → Segurança → Permissões
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | custom, full, view | custom | `access-mode=custom` |

### enable-keyboard

Habilita entrada de teclado/mouse para conexões de entrada.

**Localização**:

1. **Desktop** Configurações → Segurança → Permissões → Habilitar teclado
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-keyboard=Y` |

### enable-clipboard

Habilita copiar e colar para conexões de entrada.

**Localização**:

1. **Desktop** Configurações → Segurança → Permissões → Habilitar área de transferência
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-clipboard=Y` |

### enable-file-transfer

Habilita cópia e colagem de arquivos ou transferência de arquivos (sessão) para conexões de entrada.

**Localização**:

1. **Desktop** Configurações → Segurança → Permissões → Habilitar transferência de arquivos
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-file-transfer=Y` |

### enable-camera

Habilita câmera para conexões de entrada.

**Localização**:

1. **Desktop** Configurações → Segurança → Permissões → Habilitar câmera
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-camera=Y` |

### enable-terminal

Ativar o terminal para ligações de entrada.

**Localização**:

**Desktop** Definições → Segurança → Permissões → Ativar terminal

| Requer instalação | Valores | Predefinição | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-terminal=Y` |

### enable-remote-printer

Ativar a impressora remota para ligações de entrada.

**Localização**:

1. **Windows** Configurações → Segurança → Permissões → Habilitar impressora remota

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-printer=Y` |

### enable-audio

Habilita gravação de áudio e transferência para o par.

**Localização**:

1. **Desktop** Configurações → Segurança → Permissões → Habilitar áudio
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-audio=Y` |

### enable-tunnel

Habilita tunelamento TCP.

**Localização**:

1. **Desktop** Configurações → Segurança → Permissões → Habilitar tunelamento TCP
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-tunnel=Y` |

### enable-remote-restart

Habilita reinicialização pelo lado de controle.

**Localização**:

1. **Desktop** Configurações → Segurança → Permissões → Habilitar reinicialização remota
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-restart=Y` |

### enable-record-session

Habilita gravação de sessões.

**Localização**:

1. **Desktop** Configurações → Segurança → Permissões → Habilitar gravação de sessão
2. **Móvel** Configurações → Compartilhar tela → Habilitar gravação de sessão

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-record-session=Y` |

### enable-block-input

Habilita o lado de controle para bloquear entrada de outros usuários.

**Localização**:

1. **Desktop** Configurações → Segurança → Permissões → Habilitar bloqueio de entrada do usuário (apenas Windows)
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-block-input=Y` |

### allow-remote-config-modification

Permite ao lado de controle alterar configurações na UI RustDesk controlada.

**Localização**:

1. **Desktop** Configurações → Segurança → Permissões → Habilitar modificação de configuração remota
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remote-config-modification=Y` |

### enable-lan-discovery

Permite que pares LAN me descubram.

Após descoberta LAN, [WOL](https://en.wikipedia.org/wiki/Wake-on-LAN) pode funcionar se suportado localmente.

**Localização**:

1. **Desktop** Configurações → Segurança → Segurança → Negar descoberta LAN
2. **Móvel** Configurações → Compartilhar tela → Negar descoberta LAN

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| Y | Y, N | Y | `enable-lan-discovery=Y` |

### direct-server

Habilita acesso direto por IP.

**Localização**:

1. **Desktop** Configurações → Segurança → Segurança → Habilitar acesso direto por IP
2. **Móvel** Configurações → Compartilhar tela → Acesso direto por IP

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `direct-server=Y` |

### direct-access-port

Porta de acesso direto por IP.

**Localização**:

1. **Desktop** Configurações → Segurança → Segurança → Porta de acesso direto por IP (Mostrar se "Habilitar acesso direto por IP" estiver marcado)
2. **Móvel** Configurações → Compartilhar tela → Acesso direto por IP

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N |  | 21118 | `direct-access-port=21118` |

### whitelist

Usar lista branca de IP.

**Localização**:

1. **Desktop** Configurações → Segurança → Segurança → Usar lista branca de IP
2. **Móvel** Configurações → Compartilhar tela → Usar lista branca de IP

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | `,` ou `<ip1>,<ip2>,<ip3>` | `,` significa sem filtro | `whitelist=,` |

### allow-auto-disconnect & auto-disconnect-timeout

Fecha automaticamente sessões de entrada após um período de inatividade do usuário.

**Localização**:

1. **Desktop** Configurações → Segurança → Segurança → Fechar automaticamente sessões de entrada na inatividade do usuário
2. **Móvel** Configurações → Compartilhar tela → Fechar automaticamente sessões de entrada na inatividade do usuário

| Opção | Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: | :------: |
| allow-auto-disconnect | N | Y, N | N | `allow-auto-disconnect=Y` |
| auto-disconnect-timeout | N | Timeout em minutos | 10 | `auto-disconnect-timeout=10` |

### allow-only-conn-window-open

Permite conexão apenas se a janela RustDesk estiver aberta.

**Localização**:

1. **Desktop** Configurações → Segurança → Segurança → Permitir conexão apenas se a janela RustDesk estiver aberta
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-only-conn-window-open=N` |

### approve-mode

Aceita conexões de entrada via senha ou clique manual.

**Localização**:

1. **Desktop** Configurações → Segurança → Senha → Caixa suspensa
2. **Móvel** Compartilhar tela → Menu suspenso superior direito

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | password, click, password-click | password-click | `approve-mode=password-click` |

### verification-method

Que tipo de senha pode ser usada, `senha temporária` refere-se à senha aleatória de uso único.

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | use-temporary-password, use-permanent-password, use-both-passwords | use-both-passwords | `verification-method=use-permanent-password` |

### temporary-password-length

1. **Desktop** Definições → Segurança → Palavra-passe → Comprimento da palavra-passe de utilização única
2. **Mobile** Partilhar ecrã → Menu suspenso no canto superior direito → Comprimento da palavra-passe de utilização única

O comprimento da palavra-passe temporária.

| Requer instalação | Valores | Predefinição | Exemplo |
| :------: | :------: | :------: | :------: |
| N | 6, 8, 10 | 6 | `temporary-password-length=6` |

### proxy-url

A URL do proxy.

Atualmente suporta `http` e `socks5`.

**Localização**:

1. **Desktop** Configurações → Rede → Proxy → Proxy Socks5/Http(s)
2. **Móvel**

Exemplos:

1. **http** `proxy-url=http://192.168.0.2:12345`
2. **https** `proxy-url=https://192.168.0.2:12345`
3. **socks5** `proxy-url=socks5://192.168.0.2:1080`

### proxy-username & proxy-password

Nome de usuário e senha do proxy.

**Localização**:

1. **Desktop** Configurações → Rede → Proxy → Proxy Socks5/Http(s)
2. **Móvel**

| Opção | Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: | :------: |
| proxy-username | N | | | `proxy-username=user` |
| proxy-password | N | | | `proxy-password=pass` |

## Configurações Gerais

### theme

Controla o tema da UI do cliente RustDesk.

**Localização**:

1. **Desktop** Configurações → Geral → Tema
2. **Móvel** Configurações → Configurações → Tema

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | dark, light, system | system | `theme=system` |

### lang

Controla o idioma do cliente RustDesk.

**Localização**:

1. **Desktop** Configurações → Geral → Idioma
2. **Móvel** Configurações → Configurações → Idioma

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | default, ar, bg, ... | default | `lang=default` |

Os idiomas atualmente disponíveis são:

ar, bg, ca, cs, da, de, el, en, eo, es, et, fa, fr, he, hr, hu, id, it, ja, ko, kz, lt, lv, nb, nl, pl, pt, ro, ru, sk, sl, sq, sr, sv, th, tr, uk, vn, zh-cn, zh-tw

Você pode verificar [LANGS](https://github.com/rustdesk/rustdesk/blob/master/src/lang.rs#L45) no código para a lista de idiomas mais recente.

### allow-auto-record-incoming

Grava automaticamente sessões de entrada.

**Localização**:

1. **Desktop** Configurações → Geral → Gravação → Gravar automaticamente sessões de entrada
2. **Móvel** Configurações → Gravação → Gravar automaticamente sessões de entrada

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-incoming=Y` |

### allow-auto-record-outgoing

Grava automaticamente sessões de saída.

**Localização**:

1. **Desktop** Configurações → Geral → Gravação → Gravar automaticamente sessões de saída
2. **Móvel** Configurações → Gravação → Gravar automaticamente sessões de saída

| Instalação necessária | Valores | Padrão | Exemplo | Versão |
| :------: | :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-outgoing=Y` | >= 1.3.2 |

### video-save-directory

O diretório para salvar vídeos gravados.

**Localização**:

1. **Desktop** Configurações → Geral → Gravação → Diretório de salvamento de vídeo
2. **Móvel** Configurações → Gravação

Valores padrão:

1. **macOS** ~/Movies/**app_name**
2. **Linux** ~/Videos/**app_name**
3. **Windows** %USERPROFILE%\Videos\\**app_name**
4. **Android** /Storage/emulated/0/**app_name**/ScreenRecord

**Nota**: Substitua **app_name** pelo nome atual do aplicativo.

### enable-confirm-closing-tabs

Controla se deve mostrar um diálogo de confirmação antes de fechar todas as abas remotas.

**Localização**:

1. **Desktop** Configurações → Geral → Outro → Confirmar antes de fechar múltiplas abas
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-confirm-closing-tabs=Y` |

### enable-abr

Habilita bitrate adaptativo.

**Localização**:

1. **Desktop** Configurações → Geral → Outro → Bitrate adaptativo
2. **Móvel** Configurações → Compartilhar tela → Bitrate adaptativo (beta)

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-abr=Y` |

### allow-remove-wallpaper

Remove papel de parede durante sessões de entrada.

**Localização**:

1. **Desktop** Configurações → Geral → Outro → Remover papel de parede durante sessões de entrada
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remove-wallpaper=N` |

### enable-open-new-connections-in-tabs

Controla se deve usar uma nova aba ou uma nova janela para abrir uma nova conexão.

**Localização**:

1. **Desktop** Configurações → Geral → Outro → Abrir conexão em nova aba
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-open-new-connections-in-tabs=Y` |

### allow-always-software-render

Sempre usar renderização por software.

**Localização**:

1. **Desktop** Configurações → Geral → Outro → Sempre usar renderização por software
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-always-software-render=N` |

### allow-linux-headless

Permitir conexão de entrada se não houver displays.

Esta opção requer ambiente desktop, servidor Xorg e GDM, veja [PR 3902](https://github.com/rustdesk/rustdesk/pull/3902).

**Localização**:

1. **Desktop** Configurações → Geral → Outro → Permitir Linux headless
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-linux-headless=N` |

### enable-hwcodec

Habilita codificação por hardware para tornar a imagem mais suave.

**Localização**:

1. **Desktop**
2. **Móvel** Configurações → Codec de hardware

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-hwcodec=Y` |

### peer-card-ui-type

Controla a visualização de cartões de pares, inclui "Tiles grandes", "Tiles pequenos" e "Lista".

**Localização**:

1. **Desktop** Início → Painel de pares → Ícone de grade superior direito
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | 0, 1, 2 | 0 | `peer-card-ui-type=0` |

**0** Tiles grandes  
**1** Tiles pequenos  
**2** Lista

### peer-sorting

Controla a ordem dos cartões de pares.

**Localização**:

1. **Desktop** Início → Painel de pares → Ícone de classificação superior direito
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Remote ID, Remote Host, Username | Remote ID | `peer-sorting=Remote ID` |

### sync-ab-with-recent-sessions

Controla se deve sincronizar o catálogo de endereços com sessões recentes.

**Localização**:

1. **Desktop** Início → Painel de pares → Catálogo de endereços → Tags → Menu suspenso → Sincronizar com sessões recentes
2. **Móvel** Início → Painel de pares → Catálogo de endereços → Tags → Menu suspenso → Sincronizar com sessões recentes

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-with-recent-sessions=N` |

### sync-ab-tags

Controla se deve classificar as tags do catálogo de endereços.

**Localização**:

1. **Desktop** Início → Painel de pares → Catálogo de endereços → Tags → Menu suspenso → Classificar tags
2. **Móvel** Início → Painel de pares → Catálogo de endereços → Tags → Menu suspenso → Classificar tags

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-tags=N` |

### filter-ab-by-intersection

Filtrar catálogo de endereços por interseção de tags.

**Prévia**: [PR #5985](https://github.com/rustdesk/rustdesk/pull/5985)

**Localização**:

1. **Desktop** Início → Painel de pares → Catálogo de endereços → Tags → Menu suspenso → Filtrar por interseção
2. **Móvel** Início → Painel de pares → Catálogo de endereços → Tags → Menu suspenso → Filtrar por interseção

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `filter-ab-by-intersection=N` |

### use-texture-render

**Localização**:

**Desktop** Definições → Geral → Outro → Usar renderização de textura

Use a renderização de textura para tornar as imagens mais suaves. Pode tentar desativar esta opção se encontrar problemas de renderização. Apenas disponível no desktop.

| Valores | Predefinição | Exemplo |
| :------: | :------: | :------: |
| Y, N | linux:Y, macOS:N, win7:N, win10+:Y | `use-texture-render=Y` |

### enable-udp-punch

**Localização**:

**Desktop** Definições → Geral → Outro → Ativar perfuração UDP
**Mobile** Definições → Ativar perfuração UDP

Disponível desde RustDesk 1.4.1, RustDesk Server Pro 1.6.2

| Valores | Predefinição | Exemplo |
| :------: | :------: | :------: |
| Y, N | Y | `enable-udp-punch=N` |

### enable-ipv6-punch

**Localização**:

**Desktop** Definições → Geral → Outro → Ativar ligação P2P IPv6
**Mobile** Definições → Geral → Outro → Ativar ligação P2P IPv6

Disponível desde RustDesk 1.4.1, RustDesk Server Pro 1.6.2

| Valores | Predefinição | Exemplo |
| :------: | :------: | :------: |
| Y, N | selfhost:N, caso contrário:Y | `enable-ipv6-punch=N` |

## Definições de visualização

### view-only

Esta opção definirá a opção "apenas visualização" para cada par após a primeira conexão.

Então a opção "apenas visualização" nas configurações de cada par controlará se a conexão é apenas visualização.

**Localização**:

1. **Desktop** Configurações → Display → Outras opções padrão → Modo de visualização
2. **Móvel** Configurações → Configurações de display → Outras opções padrão → Modo de visualização

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `view-only=Y` |

### show-monitors-toolbar

Controla se deve mostrar monitores na barra de ferramentas.

![show-monitors-toolbar](/docs/en/self-host/client-configuration/advanced-settings/images/show-monitors-toolbar.png)

**Localização**:

1. **Desktop** Configurações → Display → Outras opções padrão → Mostrar barra de ferramentas de monitores
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-monitors-toolbar=Y` |

### collapse-toolbar

Controla se a barra de ferramentas remota é recolhida após conectar.

**Localização**:

1. **Desktop** Configurações → Display → Outras opções padrão → Recolher barra de ferramentas
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `collapse-toolbar=Y` |

### show-remote-cursor

Esta opção definirá a opção "mostrar cursor remoto" para cada par após a primeira conexão.

Então a opção "mostrar cursor remoto" nas configurações de cada par controlará se o cursor remoto é exibido na página de controle remoto.

**Localização**:

1. **Desktop** Configurações → Display → Outras opções padrão → Mostrar cursor remoto
2. **Móvel** Configurações → Configurações de display → Outras opções padrão → Mostrar cursor remoto

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-remote-cursor=N` |

### follow-remote-cursor

Esta opção definirá a opção "seguir cursor remoto" para cada par após a primeira conexão.

Então a opção "seguir cursor remoto" nas configurações de cada par controlará se deve seguir o cursor remoto.

**Prévia**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Localização**:

1. **Desktop** Configurações → Display → Outras opções padrão → Seguir cursor remoto
2. **Móvel** Configurações → Configurações de display → Outras opções padrão → Seguir cursor remoto

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-cursor=Y` |

### follow-remote-window

Esta opção definirá a opção "seguir janela remota" para cada par após a primeira conexão.

Então a opção "seguir janela remota" nas configurações de cada par controlará se deve seguir a janela remota.

**Prévia**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Localização**:

1. **Desktop** Configurações → Display → Outras opções padrão → Seguir foco da janela remota
2. **Móvel** Configurações → Configurações de display → Outras opções padrão → Seguir foco da janela remota

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-window=Y` |

### zoom-cursor

Esta opção definirá a opção "zoom cursor" para cada par após a primeira conexão.

A opção "zoom cursor" nas configurações de cada par controlará então se o cursor é dimensionado com base na escala de imagem atual.

**Localização**:

1. **Desktop** Configurações → Display → Outras opções padrão → Zoom cursor
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `zoom-cursor=Y` |

### show-quality-monitor

Esta opção definirá a opção "mostrar monitor de qualidade" para cada par após a primeira conexão.

A opção "mostrar monitor de qualidade" nas configurações de cada par controlará então se deve mostrar o monitor de qualidade.

**Localização**:

1. **Desktop** Configurações → Display → Outras opções padrão → Mostrar monitor de qualidade
2. **Móvel** Configurações → Configurações de display → Outras opções padrão → Mostrar monitor de qualidade

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-quality-monitor=Y` |

### disable-audio

Esta opção definirá a opção "desabilitar áudio" para cada par após a primeira conexão.

A opção "desabilitar áudio" nas configurações de cada par controlará então se deve reproduzir som.

**Localização**:

1. **Desktop** Configurações → Display → Outras opções padrão → Mudo
2. **Móvel** Configurações → Configurações de display → Outras opções padrão → Mudo

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-audio=Y` |

### enable-file-copy-paste

Esta opção definirá a opção "habilitar cópia e colagem de arquivo" para cada par após a primeira conexão.

A opção "habilitar cópia e colagem de arquivo" nas configurações de cada par controlará então se deve habilitar cópia e colagem de arquivo na conexão.

**Localização**:

1. **Desktop** Configurações → Display → Outras opções padrão → Habilitar cópia e colagem de arquivo (apenas Windows)
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `enable-file-copy-paste=Y` |

### disable-clipboard

Esta opção definirá a opção "desabilitar área de transferência" para cada par após a primeira conexão.

A opção "desabilitar área de transferência" nas configurações de cada par controlará então se deve habilitar cópia e colagem de texto.

**Localização**:

1. **Desktop** Configurações → Display → Outras opções padrão → Desabilitar área de transferência
2. **Móvel** Configurações → Configurações de display → Outras opções padrão → Desabilitar área de transferência

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-clipboard=Y` |

### lock-after-session-end

Esta opção definirá a opção "bloquear após fim da sessão" para cada par após a primeira conexão.

A opção "bloquear após fim da sessão" nas configurações de cada par controlará então se deve bloquear a máquina par após o fim da sessão.

**Localização**:

1. **Desktop** Configurações → Display → Outras opções padrão → Bloquear após fim da sessão
2. **Móvel** Configurações → Configurações de display → Outras opções padrão → Bloquear após fim da sessão

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `lock-after-session-end=Y` |

### privacy-mode

Esta opção definirá a opção "modo privacidade" para cada par após a primeira conexão.

A opção "modo privacidade" nas configurações de cada par controlará então se deve usar modo privacidade após conectar.

**Localização**:

1. **Desktop** Configurações → Display → Outras opções padrão → Modo privacidade
2. **Móvel** Configurações → Configurações de display → Outras opções padrão → Modo privacidade

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `privacy-mode=Y` |

### i444

Esta opção definirá a opção "i444" para cada par após a primeira conexão.

A opção "i444" nas configurações de cada par controlará então se deve usar cor verdadeira.

**Localização**:

1. **Desktop** Configurações → Display → Outras opções padrão → Cor verdadeira (4:4:4)
2. **Móvel** Configurações → Configurações de display → Outras opções padrão → Cor verdadeira (4:4:4)

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `i444=Y` |

### reverse-mouse-wheel

Esta opção definirá a opção "reverter roda do mouse" para cada par após a primeira conexão.

A opção "reverter roda do mouse" nas configurações de cada par controlará então se deve reverter a roda do mouse.

**Localização**:

1. **Desktop** Configurações → Display → Outras opções padrão → Reverter roda do mouse
2. **Móvel** Configurações → Configurações de display → Outras opções padrão → Reverter roda do mouse

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `reverse-mouse-wheel=Y` |

### swap-left-right-mouse

Esta opção definirá a opção "trocar botão esquerdo-direito do mouse" para cada par após a primeira conexão.

A opção "trocar botão esquerdo-direito do mouse" nas configurações de cada par controlará então se deve trocar o botão esquerdo-direito do mouse.

**Localização**:

1. **Desktop** Configurações → Display → Outras opções padrão → Trocar botão esquerdo-direito do mouse
2. **Móvel** Configurações → Configurações de display → Outras opções padrão → Trocar botão esquerdo-direito do mouse

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `swap-left-right-mouse=Y` |

### displays-as-individual-windows

Esta opção definirá a opção "displays como janelas individuais" para cada par após a primeira conexão.

A opção "displays como janelas individuais" nas configurações de cada par controlará então se deve mostrar displays como janelas individuais.

**Prévia**: [PR 5945](https://github.com/rustdesk/rustdesk/pull/5945)

**Localização**:

1. **Desktop** Configurações → Display → Outras opções padrão → Mostrar displays como janelas individuais
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `displays-as-individual-windows=Y` |

### use-all-my-displays-for-the-remote_session

Esta opção definirá a opção "usar todos os meus displays para a sessão remota" para cada par após a primeira conexão.

A opção "usar todos os meus displays para a sessão remota" nas configurações de cada par controlará então se deve usar todos os meus displays para a sessão remota.

**Prévia**: [PR 6064](https://github.com/rustdesk/rustdesk/pull/6064)

**Localização**:

1. **Desktop** Configurações → Display → Outras opções padrão → Usar todos os meus displays para a sessão remota
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `use-all-my-displays-for-the-remote_session=Y` |

### view-style

Esta opção definirá a opção "estilo de visualização" para cada par após a primeira conexão.

A opção "estilo de visualização" nas configurações de cada par controlará então o estilo de visualização.

**Localização**:

1. **Desktop** Configurações → Display → Estilo de visualização padrão
2. **Móvel** Configurações → Configurações de display → Estilo de visualização padrão

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | original, adaptive | original | `view-style=original` |

### scroll-style

Esta opção definirá a opção "estilo de rolagem" para cada par após a primeira conexão.

A opção "estilo de rolagem" nas configurações de cada par controlará então o estilo de rolagem.

**Localização**:

1. **Desktop** Configurações → Display → Estilo de rolagem padrão
2. **Móvel**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | scrollauto, scrollbar, scrolledge | scrollauto | `scroll-style=scrollauto` |

**Nota**: A opção `scrolledge` está disponível a partir do RustDesk 1.4.4.

### edge-scroll-edge-thickness

Esta opção controla a espessura da borda quando `scroll-style` está definido como `scrolledge`. A espessura da borda determina o tamanho da área rolável nas bordas da tela.

Esta opção só é efetiva quando `scroll-style=scrolledge`.

**Localização**:

1. **Desktop** Configurações → Display → Espessura da borda de rolagem

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | 20-150 | 100 | `edge-scroll-edge-thickness=100` |

**Nota**: Esta opção está disponível a partir do RustDesk 1.4.4.

### image-quality

Esta opção definirá a opção "qualidade de imagem" para cada par após a primeira conexão.

A opção "qualidade de imagem" nas configurações de cada par controlará então a qualidade da imagem.

**Localização**:

1. **Desktop** Configurações → Display → Qualidade de imagem padrão
2. **Móvel** Configurações → Configurações de display → Qualidade de imagem padrão

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | best, balanced, low, custom | balanced | `image-quality=balanced` |

### custom-image-quality

Esta opção definirá a opção "qualidade de imagem personalizada" para cada par após a primeira conexão.

A opção "qualidade de imagem personalizada" nas configurações de cada par controlará então a qualidade da imagem se "qualidade de imagem" estiver definida como personalizada.

**Localização**:

1. **Desktop** Configurações → Display → Qualidade de imagem padrão → Personalizada
2. **Móvel** Configurações → Configurações de display → Qualidade de imagem padrão → Personalizada

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | [10.0, 2000.0] | 50.0 | `custom-image-quality=50` |

### custom-fps

Esta opção definirá a opção "fps personalizado" para cada par após a primeira conexão.

A opção "fps personalizado" nas configurações de cada par controlará então os fps se "qualidade de imagem" estiver definida como personalizada.

**Localização**:

1. **Desktop** Configurações → Display → Qualidade de imagem padrão → Personalizada
2. **Móvel** Configurações → Configurações de display → Qualidade de imagem padrão → Personalizada

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | [5, 120] | 30 | `custom-fps=30` |

### codec-preference

Esta opção irá definir a opção "codec-preference" para cada par após a primeira ligação.

A opção "codec-preference" nas definições de cada par irá então controlar o codec para as imagens.

**Atenção**: opções diferentes de "vp8" e "vp9" podem não funcionar. Isto depende do que a sua máquina suporta.

### terminal-persistent

Esta opção irá definir a opção "terminal-persistent" para cada par após a primeira ligação.

A opção "terminal-persistent" nas definições de cada par irá então controlar se as sessões de terminal são mantidas na desconexão.

**Localização**:

1. **Desktop** Definições → Visualização → Outras opções predefinidas → Manter sessões de terminal na desconexão
2. **Mobile** Definições → Definições de visualização → Outras opções predefinidas → Manter sessões de terminal na desconexão

| Requer instalação | Valores | Predefinição | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `terminal-persistent=Y` |

### trackpad-speed

Esta opção irá definir a opção "trackpad-speed" para cada par após a primeira ligação.

A opção "trackpad-speed" nas definições de cada par irá então controlar os fps se "trackpad-speed" estiver definido como personalizado.

**Localização**:

1. **Desktop** Definições → Visualização → Velocidade predefinida do trackpad
2. **Mobile** Definições → Definições de visualização → Velocidade predefinida do trackpad

| Requer instalação | Valores | Predefinição | Exemplo |
| :------: | :------: | :------: | :------: |
| N | [10, 1000] | 100 | `trackpad-speed=100` |

## Outros

### preset-address-book-name & preset-address-book-tag & preset-address-book-alias & preset-address-book-password & preset-address-book-note

Nome do catálogo de endereços, tag do dispositivo, alias do dispositivo, senha do dispositivo, nota do dispositivo predefinidos, https://github.com/rustdesk/rustdesk-server-pro/issues/257.
Você pode definir preset-address-book-name apenas se não quiser definir tag.
Por favor, use nome e tag de catálogo de endereços válidos na sua página de catálogo de endereços do console web.

| Opção | Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: | :------: |
| preset-address-book-name | N | | | `preset-address-book-name=<nome do catálogo de endereços>` |
| preset-address-book-tag | N | | | `preset-address-book-tag=<nome da tag do catálogo de endereços>` |
| preset-address-book-alias | N | | | `preset-address-book-alias=<alias do dispositivo>` |
| preset-address-book-password | N | | | `preset-address-book-password=<senha do dispositivo>` |
| preset-address-book-note | N | | | `preset-address-book-note=<nota do dispositivo>` |

preset-address-book-alias, preset-address-book-password, preset-address-book-note estão disponíveis no cliente RustDesk >=1.4.3, pro >= 1.6.6.

### disable-group-panel

Desabilita painel de grupo (ao lado do painel de catálogo de endereços, é nomeado "Dispositivos acessíveis" desde 1.3.8) no cliente RustDesk, https://github.com/rustdesk/rustdesk-server-pro/issues/250.

| Opção | Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: | :------: |
| disable-group-panel | N | Y, N | N | `disable-group-panel=Y` |

### pre-elevate-service

Elevação automática na execução para Windows portable, https://github.com/rustdesk/rustdesk-server-pro/issues/252.

| Opção | Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: | :------: |
| pre-elevate-service | N | Y, N | N | `pre-elevate-service=Y` |

### disable-floating-window

Quando o serviço Android inicia, ele exibirá uma janela flutuante, o que ajuda a prevenir que o sistema mate o serviço RustDesk.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `disable-floating-window=Y` |

### floating-window-size

Quando o serviço Android inicia, ele exibirá uma janela flutuante, o que ajuda a prevenir que o sistema mate o serviço RustDesk. Quando o tamanho é menor que 120, a janela flutuante será difícil de clicar. Um tamanho muito pequeno pode não conseguir manter o serviço em segundo plano em alguns dispositivos.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| [32, 320] | 120 | `floating-window-size=120` |

### floating-window-untouchable

Por padrão, clicar na janela flutuante fará aparecer um menu. Após defini-la como 'intocável', clicar ou deslizar passará pela janela flutuante e será transmitido para a janela subjacente. Após ser definida como 'intocável', a posição da janela flutuante não pode ser alterada, e o sistema pode automaticamente definir a janela flutuante como semi-transparente. No entanto, este recurso pode não funcionar em um pequeno número de aplicações, como o app GitHub.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `floating-window-untouchable=Y` |

### floating-window-transparency

Janelas flutuantes Android têm transparência ajustável. Se você quiser habilitar mas ocultar a janela flutuante, pode definir a transparência para 0, a janela flutuante será automaticamente definida como 'intocável' para passar eventos de clique.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| [0, 10] | 10 | `floating-window-transparency=5` |

### floating-window-svg

Se nenhum ícone for definido para a janela flutuante Android, ela exibirá por padrão o ícone RustDesk.
Ao definir, por favor escreva o conteúdo de texto SVG em uma linha, e preste atenção às [limitações de suporte SVG](https://bigbadaboom.github.io/androidsvg/index.html).

| Padrão | Exemplo |
| :------: | :------: |
| Ícone RustDesk | `floating-window-svg=<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1717559129252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4248" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M950.857143 512c0 242.285714-196.571429 438.857143-438.857143 438.857143S73.142857 754.285714 73.142857 512 269.714286 73.142857 512 73.142857s438.857143 196.571429 438.857143 438.857143z" fill="#1296db" p-id="4249"></path></svg>` |

### keep-screen-on

Isto é para o lado controlado Android. Note que manter a tela ligada depende da janela flutuante.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| never, during-controlled, service-on | during-controlled | `keep-screen-on=never` |

### enable-directx-capture

Isto é para o lado controlado Windows. Se você não encontrar problemas, é recomendado usar as configurações padrão, que priorizam usar DirectX para capturas de tela em vez de usar GDI diretamente.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | Y | `enable-directx-capture=N` |

### enable-android-software-encoding-half-scale

Isto é para o lado controlado Android. Por padrão, quando a resolução é maior que 1200, codificação por hardware usa a resolução original, enquanto codificação por software usa metade da resolução, já que codificação por software é mais lenta. Esta opção é usada para definir se a codificação por software deve ser dimensionada para metade da resolução.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | Y | `enable-android-software-encoding-half-scale=N` |

### allow-remote-cm-modification

Controla se deve permitir que o lado de controle clique na janela de gerenciamento de conexão para aceitar conexões, alterar permissões, etc.

https://github.com/rustdesk/rustdesk/issues/7425

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `allow-remote-cm-modification=Y` |

### remove-preset-password-warning

Controla se deve remover o aviso de segurança na GUI quando há senha predefinida no cliente personalizado.

https://github.com/rustdesk/rustdesk-server-pro/discussions/286

https://github.com/rustdesk/rustdesk/discussions/7956

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | Y | `remove-preset-password-warning=Y` |

### hide-security-settings / hide-network-settings / hide-server-settings / hide-proxy-settings / hide-websocket-settings / hide-remote-printer-settings

Controla se deve ocultar algumas configurações. Por favor, certifique-se de que `Desabilitar configurações` esteja desligado, caso contrário estas não funcionarão.

https://github.com/rustdesk/rustdesk-server-pro/issues/263

https://github.com/rustdesk/rustdesk-server-pro/issues/276

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `hide-security-settings=Y` |

### hide-username-on-card

Controla se deve mostrar nome de usuário na lista de dispositivos. Porque às vezes, o nome de usuário é muito longo, ocultará as outras informações.

https://github.com/rustdesk/rustdesk-server-pro/issues/284#issuecomment-2216521407

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `hide-username-on-card=Y` |

### hide-help-cards

Controla se deve mostrar avisos UAC / permissão na GUI.

https://github.com/rustdesk/rustdesk/issues/8687

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `hide-help-cards=Y` |

### display-name

Altere seu nome de exibição que será mostrado no popup quando você se conectar ao dispositivo remoto. Por padrão, exibe primeiro o nome do usuário logado, caso contrário exibe seu nome de usuário do SO.

https://github.com/rustdesk/rustdesk-server-pro/issues/277

### disable-udp

Controla se deve usar apenas TCP. Não usará mais UDP 21116, TCP 21116 será usado no lugar.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `disable-udp=Y` |

### preset-user-name / preset-strategy-name / preset-device-group-name / preset-device-username / preset-device-name / preset-note

Atribui usuário / estratégia / grupo de dispositivo / nome de usuário do dispositivo / nome do dispositivo(hostname) / nota ao dispositivo. Você também pode fazer isso via [linha de comando](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/#assign-device-usersgroupsstrategies-to-devices).

https://github.com/rustdesk/rustdesk-server-pro/discussions/304

grupo de dispositivo está disponível no cliente RustDesk >=1.3.8, pro >= 1.5.0

preset-device-username, preset-device-name, preset-note estão disponíveis no cliente RustDesk >=1.4.3, pro >= 1.6.6.

### default-connect-password

Você usa a `senha de conexão padrão` para estabelecer conexões com dispositivos remotos. Esta senha é configurada no lado de controle e não deve ser confundida com qualquer [senha predefinida](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-can-we-set-up-a-client-with-a-fixed-password-for-unattended-remote-access) encontrada no cliente controlado (apenas entrada).

ex. `default-connect-password=abcd1234`

### enable-trusted-devices

Permite que dispositivos confiáveis pulem verificação 2FA.

https://github.com/rustdesk/rustdesk/discussions/8513#discussioncomment-10234494

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | Y | `enable-trusted-devices=N` |

### hide-tray

Desabilita o ícone da bandeja na bandeja do sistema.

https://github.com/rustdesk/rustdesk-server-pro/issues/332

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `hide-tray=Y` |

### one-way-clipboard-redirection

Desabilita sincronização de área de transferência do lado controlado para o lado de controle, disponível no cliente RustDesk >=1.3.1 (lado controlado)

https://github.com/rustdesk/rustdesk/discussions/7837

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `one-way-clipboard-redirection=Y` |

### one-way-file-transfer

Desabilita transferência de arquivo do lado controlado para o lado de controle, disponível no cliente RustDesk >=1.3.1 (lado controlado)

https://github.com/rustdesk/rustdesk/discussions/7837

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `one-way-file-transfer=Y` |

### sync-init-clipboard

Se sincronizar área de transferência inicial ao estabelecer conexão (apenas do lado de controle para o lado controlado), disponível no cliente RustDesk >=1.3.1 (lado de controle)

https://github.com/rustdesk/rustdesk/discussions/9010

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `sync-init-clipboard=Y` |

### allow-logon-screen-password

Se permitir entrada de senha na tela de logon quando [modo de aprovação apenas clique](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#approve-mode) for usado, disponível no cliente RustDesk >=1.3.1 (lado controlado)

https://github.com/rustdesk/rustdesk/discussions/9269

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `allow-logon-screen-password=Y` |

### allow-https-21114

Tipicamente, HTTPS usa porta 443. Quando a porta do servidor API está incorretamente definida para 21114, o cliente RustDesk removerá por padrão a configuração da porta 21114. Definir a opção para Y permite o uso de 21114 como porta HTTPS. Disponível no cliente RustDesk >=1.3.9.

https://github.com/rustdesk/rustdesk-server-pro/discussions/570

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `allow-https-21114=Y` |

### allow-d3d-render

Renderização D3D pode obter FPS alto e reduzir o uso de cpu, mas a tela de controle remoto pode ficar preta em alguns dispositivos. Disponível no cliente RustDesk >=1.3.9, apenas windows.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `allow-d3d-render=Y` |

### allow-hostname-as-id

[Usar hostname como id](https://github.com/rustdesk/rustdesk-server-pro/discussions/483), espaços no hostname são substituídos por '-'. Isso não é 100% garantido e só ocorre na primeira vez que o cliente RustDesk é executado (ou seja, em um cliente recém-instalado); se um conflito ocorrer, um ID aleatório será atribuído.

Disponível no cliente RustDesk versão 1.4.0 e posterior.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `allow-hostname-as-id=Y` |

### allow-websocket

Usar protocolo WebSocket para conectar servidor e cliente. Disponível apenas no cliente RustDesk >=1.4.0 e servidor Pro >= 1.5.7. Note que WebSocket apenas suporta conexão relay.

Para fazer WebSocket funcionar, você precisa configurar seu proxy reverso corretamente, https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms

**Localização**:

**Desktop** Configurações → Rede → Usar Websocket
**Móvel** Configurações → Usar Websocket

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `allow-websocket=Y` |

### allow-numeric-one-time-password

Esta opção habilita ou desabilita o uso de senhas de uso único apenas numéricas.
Disponível apenas no cliente RustDesk >=1.4.1 e servidor Pro >= 1.5.9.

**Discussão**: https://github.com/rustdesk/rustdesk-server-pro/discussions/685

**Prévia**: https://github.com/rustdesk/rustdesk/pull/11846

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `allow-numeric-one-time-password=Y` |

### register-device

Não registrar o dispositivo, você não o verá na página de dispositivos no console web.

**Disponível apenas no servidor Pro >= 1.6.0 e requer [licença custom2](https://rustdesk.com/pricing#custom2) e número de conexões simultâneas >= 2.**

Se `register-device=N`, o seguinte não funcionará para este dispositivo.
- Login
- Comando `--assign`
- `preset-address-book-name`, `preset-address-book-tag`, `preset-address-book-alias`, `preset-address-book-password`, `preset-address-book-note` `preset-user-name`, `preset-strategy-name`, `preset-device-group-name`, `preset-device-username`, `preset-device-name`, `preset-note`
- Logs de Auditoria
- Estratégia

**Discussão**: https://github.com/rustdesk/rustdesk-server-pro/discussions/672 e https://github.com/rustdesk/rustdesk-server-pro/discussions/182

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | Y | `register-device=N` |

### main-window-always-on-top

Mantenha sempre a janela principal no topo.

**Discussão**: https://github.com/rustdesk/rustdesk-server-pro/issues/761

Disponível apenas no cliente RustDesk 1.4.2.

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `main-window-always-on-top=N` |

### relay-server

https://github.com/rustdesk/rustdesk-server-pro/issues/776#issuecomment-3306524913

### disable-discovery-panel

Desabilita o painel `Descobertos` (ao lado do painel `Favoritos`) no cliente RustDesk

| Opção | Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: | :------: |
| disable-discovery-panel | N | Y, N | N | `disable-discovery-panel=Y` |

### touch-mode

Controla se deve ser usado o modo toque (touch) ou o modo mouse durante sessões de controle remoto.

#### Diferenças de comportamento por versão

##### RustDesk (lado controlador) < 1.4.3

Após a primeira conexão, esta opção define a configuração "touch-mode" para cada peer. A partir daí, as configurações individuais de cada peer determinam se será usado o modo toque ou o modo mouse.

**Localização**:

1. **Desktop**
2. **Mobile** Configurações → Tela → Outras opções padrão → Modo toque

##### RustDesk (lado controlador) >= 1.4.3

Esta opção controla de forma uniforme se todos os dispositivos peer usam o modo toque ou o modo mouse, sobrescrevendo as configurações individuais dos dispositivos.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `touch-mode=Y` |

### show-virtual-mouse

https://github.com/rustdesk/rustdesk/pull/12911

Controla a exibição do mouse virtual quando mobile → desktop.

**Localização**:

1. **Desktop**
2. **Mobile** Sessão remota → barra de navegação inferior → auxiliar de gestos

Disponível desde RustDesk 1.4.3

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `show-virtual-mouse=Y` |

**Nota**: Esta opção deve ser configurada nas **Default settings**, e não nas **Override settings**.

### show-virtual-joystick

https://github.com/rustdesk/rustdesk/pull/12911

Controla a exibição do joystick virtual quando mobile → desktop.

Esta opção requer que **show-virtual-mouse** esteja ativado.

**Localização**:

1. **Desktop**
2. **Mobile** Sessão remota → barra de navegação inferior → auxiliar de gestos

Disponível desde RustDesk 1.4.3

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `show-virtual-joystick=Y` |

**Nota**: Esta opção deve ser configurada nas **Default settings**, e não nas **Override settings**.

### allow-insecure-tls-fallback

Por padrão, o RustDesk verifica o certificado do servidor para protocolos que usam TLS.

Com esta opção habilitada, o RustDesk irá recorrer a pular a etapa de verificação e prosseguir em caso de falha de verificação.

**Localização**:

**Desktop** Configurações → Rede → Permitir fallback TLS inseguro
**Móvel** Configurações → Permitir fallback TLS inseguro

Disponível desde RustDesk 1.4.4

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `allow-insecure-tls-fallback=Y` |

### disable-change-permanent-password

Desabilita a capacidade de alterar a senha permanente. Quando habilitado, os usuários não podem definir ou modificar a senha permanente através da interface do usuário ou linha de comando.

Disponível desde RustDesk 1.4.5

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `disable-change-permanent-password=Y` |

### disable-change-id

Desabilita a capacidade de alterar o ID do dispositivo. Quando habilitado, os usuários não podem alterar o ID através da interface do usuário ou linha de comando.

Disponível desde RustDesk 1.4.5

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `disable-change-id=Y` |

### disable-unlock-pin

Desabilita o uso do PIN para desbloquear as configurações. Quando habilitado, os usuários devem usar privilégios de administrador do sistema para desbloquear as configurações, mesmo que um PIN tenha sido definido.

Disponível desde RustDesk 1.4.5

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `disable-unlock-pin=Y` |
