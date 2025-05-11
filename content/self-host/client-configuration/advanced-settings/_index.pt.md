---
title: Configurações avançadas
weight: 49
---

Todas as configurações avançadas de clientes personalizados estão cobertas aqui.

## Níveis de Privilegio para Configurações

Existem quatro tipos de configurações:

1. Configurações de Sobrescrita, em "Web Console → Clientes Personalizados"
2. Configurações Padrão, em "Web Console → Clientes Personalizados"
3. Configurações de Usuário, no cliente RustDesk
4. Configurações de Estratégia, em "Web Console → Estratégias"

A hierarquia de privilégios para essas configurações é a seguinte: `Sobrescrita > Estratégia > Usuário > Padrão`.

## Configurações de Segurança

### access-mode

Define o modo de acesso (permissões) para conexões recebidas.

**Localização**:

1. **Desktop:** Configurações → Segurança → Permissões
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | custom, full, view | custom | `access-mode=custom` |

### enable-keyboard

Habilita a entrada de teclado/mouse para conexões recebidas.

**Localização**:

1. **Desktop**: Configurações → Segurança → Permissões → Habilitar teclado
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-keyboard=Y` |

### enable-clipboard

Habilita copiar e colar para conexões recebidas.

**Localização**:

1. **Desktop**: Configurações → Segurança → Permissões → Habilitar clipboard
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-clipboard=Y` |

### enable-file-transfer

Habilita copiar e colar arquivos ou transferência de arquivos (sessão) para conexões recebidas.

**Localização**:

1. **Desktop**: Configurações → Segurança → Permissões → Habilitar transferência de arquivos
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-file-transfer=Y` |

### enable-audio

Habilita gravação e transferência de áudio para o par.

**Localização**:

1. **Desktop**: Configurações → Segurança → Permissões → Habilitar áudio
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-audio=Y` |

### enable-tunnel

Habilita tunelamento TCP.

**Localização**:

1. **Desktop**: Configurações → Segurança → Permissões → Habilitar tunelamento TCP
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-tunnel=Y` |

### enable-remote-restart

Habilita reinicialização pelo lado de controle.

**Localização**:

1. **Desktop**: Configurações → Segurança → Permissões → Habilitar reinicialização remota
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-restart=Y` |

### enable-record-session

Habilita a gravação de sessões.

**Localização**:

1. **Desktop**: Configurações → Segurança → Permissões → Habilitar gravação de sessão
2. **Mobile**: Configurações → Compartilhar tela → Habilitar gravação de sessão

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-record-session=Y` |

### enable-block-input

Permite que o lado de controle bloqueie a entrada de outros usuários.

**Localização**:

1. **Desktop**: Configurações → Segurança → Permissões → Habilitar bloqueio de entrada do usuário (somente Windows)
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-block-input=Y` |

### allow-remote-config-modification

Permite que o lado de controle altere as configurações na IU controlada do RustDesk.

**Localização**:

1. **Desktop**: Configurações → Segurança → Permissões → Habilitar modificação remota da configuração
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `allow-remote-config-modification=Y` |

### enable-lan-discovery

Permite que pares da LAN me descubram.

Após a descoberta da rede local, o [WOL](https://en.wikipedia.org/wiki/Wake-on-LAN) pode funcionar se for compatível localmente.

**Localização**:

1. **Desktop**: Configurações → Segurança → Segurança → Negar descoberta de rede local
2. **Mobile**: Configurações → Compartilhar tela → Negar descoberta de rede local

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| Y | Y, N | Y | `enable-lan-discovery=Y` |

### direct-server

Habilita acesso direto por IP.

**Localização**:

1. **Desktop**: Configurações → Segurança → Segurança → Habilitar acesso direto por IP
2. **Mobile**: Configurações → Compartilhar tela → Servidor direto

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `direct-server=Y` |

### direct-access-port

Porta de acesso direto por IP.

**Localização**:

1. **Desktop**: Configurações → Segurança → Segurança → Porta de acesso direto por IP (Mostrado se "Habilitar acesso direto por IP" estiver marcado)
2. **Mobile**: Configurações → Compartilhar tela → Servidor direto

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N |  | 21118 | `direct-access-port=21118` |

### whitelist

Usar lista branca de IP.

**Localização**:

1. **Desktop**: Configurações → Segurança → Segurança → Usar lista branca de IP
2. **Mobile**: Configurações → Compartilhar tela → Usar lista branca de IP

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | `,` or `<ip1>,<ip2>,<ip3>` | `,` means no filter | `whitelist=,` |

### allow-auto-disconnect & auto-disconnect-timeout

Fechar automaticamente sessões recebidas após um período de inatividade do usuário.

**Localização**:

1. **Desktop**: Configurações → Segurança → Segurança → Fechar automaticamente sessões recebidas em caso de inatividade do usuário
2. **Mobile**: Configurações → Compartilhar tela → Fechar automaticamente sessões recebidas em caso de inatividade do usuário

| Opção | Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: | :------: |
| allow-auto-disconnect | N | Y, N | N | `allow-auto-disconnect=Y` |
| auto-disconnect-timeout | N | Timeout in minutes | 10 | `auto-disconnect-timeout=10` |

### allow-only-conn-window-open

Permitir conexão apenas se a janela do RustDesk estiver aberta.

**Localização**:

1. **Desktop**: Configurações → Segurança → Segurança → Permitir conexão apenas se a janela do RustDesk estiver aberta
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-only-conn-window-open=N` |

### approve-mode

Aceitar conexões recebidas por senha ou clique manual.

**Localização**:

1. **Desktop**: Configurações → Segurança → Senha → Menu suspenso
2. **Mobile**: Compartilhar tela → Menu suspenso no canto superior direito

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | password, click, password-click | password-click | `approve-mode=password-click` |

### proxy-url

A URL do proxy.

Atualmente suporta `http` e `socks5`.

**Localização**:

1. **Desktop**: Configurações → Rede → Proxy → Proxy Socks5/Http(s)
2. **Mobile**

Exemplos:

1. **http** `url-do-proxy=http://192.168.0.2:12345`
2. **https** `url-do-proxy=https://192.168.0.2:12345`
3. **socks5** `url-do-proxy=socks5://192.168.0.2:1080`

### proxy-username & proxy-password

Nome de usuário e senha do proxy.

**Localização**:

1. **Desktop**: Configurações → Rede → Proxy → Proxy Socks5/Http(s)
2. **Mobile**

| Opção | Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: | :------: |
| proxy-username | N | | | `proxy-username=user` |
| proxy-password | N | | | `proxy-password=pass` |

## Configurações Gerais

### theme

Controla o tema da interface do cliente RustDesk.

**Localização**:

1. **Desktop**: Configurações → Geral → Tema
2. **Mobile**: Configurações → Configurações → Tema

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | dark, light, system | system | `theme=system` |

### lang

Controla o idioma do cliente RustDesk.

**Localização**:

1. **Desktop**: Configurações → Geral → Idioma
2. **Mobile**: Configurações → Configurações → Idioma

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | default, ar, bg, ... | default | `lang=default` |

Os idiomas disponíveis atualmente são:

ar, bg, ca, cs, da, de, el, en, eo, es, et, fa, fr, he, hr, hu, id, it, ja, ko, kz, lt, lv, nb, nl, pl, pt, ro, ru, sk, sl, sq, sr, sv, th, tr, uk, vn, zh-cn, zh-tw

Você pode verificar o arquivo [LANGS](https://github.com/rustdesk/rustdesk/blob/master/src/lang.rs#L45) no código para obter a lista de idiomas mais recente.

### allow-auto-record-incoming

Gravar automaticamente sessões recebidas.

**Localização**:

1. **Desktop**: Configurações → Geral → Gravação → Gravar automaticamente sessões recebidas
2. **Mobile**: Configurações → Gravação → Gravar automaticamente sessões recebidas

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-incoming=Y` |

### allow-auto-record-outgoing

Grave automaticamente sessões de saída.

**Localização**:

1. **Desktop**: Configurações → Geral → Gravação → Grave automaticamente sessões de saída
2. **Mobile**: Configurações → Gravação → Grave automaticamente sessões de saída

| Instalação necessária | Valores | Padrão | Exemplo | Versão |
| :------: | :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-outgoing=Y` | >= 1.3.2 |

### video-save-directory

O diretório para salvar vídeos gravados.

**Localização**:

1. **Desktop**: Configurações → Geral → Gravação → Diretório de salvamento de vídeo
2. **Mobile**: Configurações → Gravação

Valores padrão:

1. **macOS** ~/Movies/**nome_do_aplicativo**
2. **Linux** ~/Videos/**nome_do_aplicativo**
3. **Windows** %USERPROFILE%\Videos\**nome_do_aplicativo**
4. **Android** /Storage/emulated/0/**nome_do_aplicativo**/ScreenRecord

**Nota**: Substitua **nome_do_aplicativo** pelo nome atual do aplicativo.

### enable-confirm-closing-tabs

Controla se mostrar uma caixa de diálogo de confirmação antes de fechar todas as abas remotas.

**Localização**:

1. **Desktop**: Configurações → Geral → Outros → Confirmar antes de fechar várias abas
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-confirm-closing-tabs=Y` |

### enable-abr

Habilitar taxa de bits adaptativa.

**Localização**:

1. **Desktop**: Configurações → Geral → Outros → Taxa de bits adaptativa
2. **Mobile**: Configurações → Compartilhar tela → Taxa de bits adaptativa (beta)

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-abr=Y` |

### allow-remove-wallpaper

Remover papel de parede durante sessões recebidas.

**Localização**:

1. **Desktop**: Configurações → Geral → Outros → Remover papel de parede durante sessões recebidas
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remove-wallpaper=N` |

### enable-open-new-connections-in-tabs

Controla se usar uma nova aba ou uma nova janela para abrir uma nova conexão.

**Localização**:

1. **Desktop**: Configurações → Geral → Outros → Abrir conexão em nova aba
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-open-new-connections-in-tabs=Y` |

### allow-always-software-render

Sempre usar renderização por software.

**Localização**:

1. **Desktop**: Configurações → Geral → Outros → Sempre usar renderização por software
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-always-software-render=N` |

### allow-linux-headless

Permitir conexão recebida se não houver monitores.

Esta opção requer ambiente de desktop, servidor Xorg e GDM, consulte [PR 3902](https://github.com/rustdesk/rustdesk/pull/3902).

**Localização**:

1. **Desktop**: Configurações → Geral → Outros → Permitir Linux displays
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-linux-headless=N` |

### enable-hwcodec

Habilitar codificação por hardware para tornar a imagem mais suave.

**Localização**:

1. **Desktop**
2. **Mobile**: Configurações → Codec de hardware

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-hwcodec=Y` |

### peer-card-ui-type

Controla a visualização dos cartões de pares, incluindo "Blocos grandes", "Blocos pequenos" e "Lista".

**Localização**:

1. **Desktop**: Início → Painel de pares → Ícone de grade superior direito
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | 0, 1, 2 | 0 | `peer-card-ui-type=0` |

**0** Blocos grandes  
**1** Blocos pequenos
**2** Lista

### peer-sorting

Controla a ordem dos cartões de pares.

**Localização**:

1. **Desktop**: Início → Painel de pares → Ícone de classificação superior direito
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Remote ID, Remote Host, Username | Remote ID | `peer-sorting=Remote ID` |

### sync-ab-with-recent-sessions

Controla se sincronizar a agenda com sessões recentes.

**Localização**:

1. **Desktop**: Início → Painel de pares → Agenda → Tags → Menu suspenso → Sincronizar com sessões recentes
2. **Mobile**: Início → Painel de pares → Agenda → Tags → Menu suspenso → Sincronizar com sessões recentes

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-with-recent-sessions=N` |

### sync-ab-tags

Controla se ordenar as tags da agenda.

**Localização**:

1. **Desktop**: Início → Painel de pares → Agenda → Tags → Menu suspenso → Ordenar tags
2. **Mobile**: Início → Painel de pares → Agenda → Tags → Menu suspenso → Ordenar tags

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-tags=N` |

### filter-ab-by-intersection

Filtrar agenda por interseção de tags.

**Prévia**: [PR #5985](https://github.com/rustdesk/rustdesk/pull/5985)

**Localização**:

1. **Desktop**: Início → Painel de pares → Agenda → Tags → Menu suspenso → Filtrar por interseção
2. **Mobile**: Início → Painel de pares → Agenda → Tags → Menu suspenso → Filtrar por interseção

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `filter-ab-by-intersection=N` |

## Configurações de Exibição

### view-only

Esta opção definirá a opção "somente visualização" para todos os pares após a primeira conexão.

Em seguida, a opção "somente visualização" nas configurações de cada par controlará se a conexão é somente visualização.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Modo de visualização
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Modo de visualização

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `view-only=Y` |

### show-monitors-toolbar

Controla se mostrar monitores na barra de ferramentas.

![mostrar-barra-de-ferramentas-de-monitores](/docs/en/self-host/client-configuration/advanced-settings/images/show-monitors-toolbar.png)

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Mostrar barra de ferramentas de monitores
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-monitors-toolbar=Y` |

### collapse-toolbar

Controla se a barra de ferramentas remota é colapsada após a conexão.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Colapsar barra de ferramentas
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `collapse-toolbar=Y` |

### show-remote-cursor

Esta opção definirá a opção "mostrar cursor remoto" para todos os pares após a primeira conexão.

Em seguida, a opção "mostrar cursor remoto" nas configurações de cada par controlará se o cursor remoto é exibido na página de controle remoto.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Mostrar cursor remoto
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Mostrar cursor remoto

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-remote-cursor=N` |

### follow-remote-cursor

Esta opção definirá a opção "seguir cursor remoto" para todos os pares após a primeira conexão.

Em seguida, a opção "seguir cursor remoto" nas configurações de cada par controlará se seguir o cursor remoto.

**Prévia**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Seguir cursor remoto
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Seguir cursor remoto

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-cursor=Y` |

### follow-remote-window

Esta opção definirá a opção "seguir janela remota" para todos os pares após a primeira conexão.

Em seguida, a opção "seguir janela remota" nas configurações de cada par controlará se seguir a janela remota.

**Prévia**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Seguir foco da janela remota
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Seguir foco da janela remota

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-window=Y` |

### zoom-cursor

Esta opção definirá a opção "zoom-cursor" para todos os pares após a primeira conexão.

A opção "zoom-cursor" nas configurações de cada par controlará então se o cursor será escalonado com base na escala de imagem atual.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Zoom do cursor
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `zoom-cursor=Y` |

### show-quality-monitor

Esta opção definirá a opção "mostrar-monitor-de-qualidade" para todos os pares após a primeira conexão.

A opção "mostrar-monitor-de-qualidade" nas configurações de cada par controlará então se mostrar o monitor de qualidade.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Mostrar monitor de qualidade
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Mostrar monitor de qualidade

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-quality-monitor=Y` |

### disable-audio

Esta opção definirá a opção "desabilitar-audio" para todos os pares após a primeira conexão.

A opção "desabilitar-audio" nas configurações de cada par controlará então se reproduzir som.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Silenciar
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Silenciar

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-audio=Y` |

### enable-file-copy-paste

Esta opção definirá a opção "habilitar-copiar-colar-arquivos" para todos os pares após a primeira conexão.

A opção "habilitar-copiar-colar-arquivos" nas configurações de cada par controlará então habilitar copiar e colar arquivos na conexão.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Habilitar copiar e colar arquivos (somente Windows)
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `enable-file-copy-paste=Y` |

### disable-clipboard

Esta opção definirá a opção "desabilitar-clipboard" para todos os pares após a primeira conexão.

A opção "desabilitar-clipboard" nas configurações de cada par controlará então se habilitar a cópia e colagem de texto.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Desabilitar clipboard
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Desabilitar clipboard

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-clipboard=Y` |

### lock-after-session-end

Esta opção definirá a opção "bloquear-após-fim-da-sessão" para todos os pares após a primeira conexão.

A opção "bloquear-após-fim-da-sessão" nas configurações de cada par controlará então se bloquear a máquina do par após o fim da sessão.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Bloquear após fim da sessão
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Bloquear após fim da sessão

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `lock-after-session-end=Y` |

### privacy-mode

Esta opção definirá a opção "modo-privacidade" para todos os pares após a primeira conexão.

A opção "modo-privacidade" nas configurações de cada par controlará então se usar o modo privacidade após conectar.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Modo privacidade
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Modo privacidade

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `privacy-mode=Y` |

### touch-mode

Esta opção definirá a opção "modo-toque" para todos os pares após a primeira conexão.

A opção "modo-toque" nas configurações de cada par controlará então se usar o modo toque ou modo mouse.

**Localização**:

1. **Desktop**
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Modo toque

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `touch-mode=Y` |

### i444

Esta opção definirá a opção "i444" para todos os pares após a primeira conexão.

A opção "i444" nas configurações de cada par controlará então se usar cores verdadeiras.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Cor verdadeira (4:4:4)
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Cor verdadeira (4:4:4)

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `i444=Y` |

### reverse-mouse-wheel

Esta opção definirá a opção "inverter-roda-do-mouse" para todos os pares após a primeira conexão.

A opção "inverter-roda-do-mouse" nas configurações de cada par controlará então se inverter a roda do mouse.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Inverter roda do mouse
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Inverter roda do mouse

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `reverse-mouse-wheel=Y` |

### swap-left-right-mouse

Esta opção definirá a opção "trocar-botões-do-mouse" para todos os pares após a primeira conexão.

A opção "trocar-botões-do-mouse" nas configurações de cada par controlará então se trocar os botões esquerdo e direito do mouse.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Trocar botões do mouse
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Trocar botões do mouse

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `swap-left-right-mouse=Y` |

### displays-as-individual-windows

Esta opção definirá a opção "exibir-monitores-como-janelas-individuais" para todos os pares após a primeira conexão.

A opção "exibir-monitores-como-janelas-individuais" nas configurações de cada par controlará então se mostrar monitores como janelas individuais.

**Preview**: [PR 5945](https://github.com/rustdesk/rustdesk/pull/5945)

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Exibir monitores como janelas individuais
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `displays-as-individual-windows=Y` |

### use-all-my-displays-for-the-remote_session

Esta opção definirá a opção "usar-todos-os-meus-monitores-para-sessão-remota" para todos os pares após a primeira conexão.

A opção "usar-todos-os-meus-monitores-para-sessão-remota" nas configurações de cada par controlará então se usar todos os meus monitores para a sessão remota.

**Preview**: [PR 6064](https://github.com/rustdesk/rustdesk/pull/6064)

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Usar todos os meus monitores para a sessão remota
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `use-all-my-displays-for-the-remote_session=Y` |

### view-style

Esta opção definirá a opção "estilo-de-visualização" para todos os pares após a primeira conexão.

A opção "estilo-de-visualização" nas configurações de cada par controlará então o estilo de visualização.

**Localização**:

1. **Desktop**: Configurações → Exibição → Estilo de visualização padrão
2. **Mobile**: Configurações → Configurações de exibição → Estilo de visualização padrão

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | original, adaptive | original | `view-style=original` |

### scroll-style

Esta opção definirá a opção "estilo-de-rolagem" para todos os pares após a primeira conexão.

A opção "estilo-de-rolagem" nas configurações de cada par controlará então o estilo de rolagem.

**Localização**:

1. **Desktop**: Configurações → Exibição → Estilo de rolagem padrão
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | scrollauto, scrollbar | scrollauto | `scroll-style=scrollauto` |

### image-quality

Esta opção definirá a opção "qualidade-da-imagem" para todos os pares após a primeira conexão.

A opção "qualidade-da-imagem" nas configurações de cada par controlará então a qualidade da imagem.

**Localização**:

1. **Desktop**: Configurações → Exibição → Qualidade de imagem padrão
2. **Mobile**: Configurações → Configurações de exibição → Qualidade de imagem padrão

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | best, balanced, low, custom | balanced | `image-quality=balanced` |

### custom-image-quality

Esta opção definirá a opção "qualidade-da-imagem-personalizada" para todos os pares após a primeira conexão.

A opção "qualidade-da-imagem-personalizada" nas configurações de cada par controlará a qualidade da imagem se "qualidade-da-imagem" estiver definido como personalizado.

**Localização**:

1. **Desktop**: Configurações → Exibição → Qualidade de imagem padrão → Personalizado
2. **Mobile**: Configurações → Configurações de exibição → Qualidade de imagem padrão → Personalizado

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | [10.0, 2000.0] | 50.0 | `custom-image-quality=50` |

### custom-fps

Esta opção definirá a opção "fps-personalizado" para todos os pares após a primeira conexão.

A opção "fps-personalizado" nas configurações de cada par controlará o fps se "qualidade-da-imagem" estiver definido como personalizado.

**Localização**:

1. **Desktop**: Configurações → Exibição → Qualidade de imagem padrão → Personalizado
2. **Mobile**: Configurações → Configurações de exibição → Qualidade de imagem padrão → Personalizado

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | [5, 120] | 30 | `custom-fps=30` |

### codec-preference

Esta opção definirá a opção "preferência-de-codec" para todos os pares após a primeira conexão.

A opção "preferência-de-codec" nas configurações de cada par controlará o codec para imagens.

**Localização**:

1. **Desktop**: Configurações → Exibição → Codec padrão
2. **Mobile**: Configurações → Configurações de exibição → Codec padrão

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | auto, vp8, vp9, av1, h264, h265 | auto | `codec-preference=auto` |

**Atenção**: Opções diferentes de "vp8" e "vp9" podem não funcionar. Isso depende do que sua máquina suporta.

### preset-address-book-name & preset-address-book-tag

Nome e tag predefinidos da lista de endereços, https://github.com/rustdesk/rustdesk-server-pro/issues/257.
Você pode definir somente preset-address-book-name se não quiser definir a tag.
Use um nome e uma tag de lista de endereços válidos na página da lista de endereços do console web.

| Opção | Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: | :------: |
| preset-address-book-name | N | | | `preset-address-book-name=<address book name>` |
| preset-address-book-tag | N | | | `preset-address-book-tag=<address book tag name>` |

### disable-group-panel

Desabilita o painel de grupo (ao lado do painel da lista de endereços) no cliente RustDesk, https://github.com/rustdesk/rustdesk-server-pro/issues/250.

| Opção | Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: | :------: |
| disable-group-panel | N | Y, N | N | `disable-group-panel=Y` |

### pre-elevate-service

Elevação automática na execução para Windows portátil, https://github.com/rustdesk/rustdesk-server-pro/issues/252.

| Opção | Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: | :------: |
| pre-elevate-service | N | Y, N | N | `pre-elevate-service=Y` |

### disable-floating-window

Quando o serviço do Android inicia, ele exibe uma janela flutuante, o que ajuda a impedir que o sistema finalize o serviço RustDesk.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `disable-floating-window=Y` |

### floating-window-size

Quando o serviço do Android inicia, ele exibe uma janela flutuante, o que ajuda a impedir que o sistema finalize o serviço RustDesk. Quando o tamanho for menor que 120, a janela flutuante será difícil de clicar. Um tamanho muito pequeno pode não ser capaz de manter o serviço em segundo plano em alguns dispositivos.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| [32, 320] | 120 | `floating-window-size=120` |

### floating-window-untouchable

Por padrão, clicar na janela flutuante abrirá um menu. Depois de defini-lo como "intocavel", clicar ou deslizar passará pela janela flutuante e será transmitido para a janela subjacente. Depois de ser definida como "intocavel", a posição da janela flutuante não pode ser alterada e o sistema pode definir automaticamente a janela flutuante para ser semi-transparente. No entanto, esse recurso pode não funcionar em um pequeno número de aplicativos, como o aplicativo GitHub.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `floating-window-untouchable=Y` |

### floating-window-transparency

As janelas flutuantes do Android têm transparência ajustável. Se você deseja habilitar, mas ocultar a janela flutuante, você pode definir a transparência para 0, a janela flutuante será automaticamente definida como "intocavel" para passar pelos eventos de clique.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| [0, 10] | 10 | `floating-window-transparency=5` |

### floating-window-svg

Se um ícone não for definido para a janela flutuante do Android, o padrão será exibir o ícone do RustDesk.
Ao definir, escreva o conteúdo do texto do SVG em uma linha e preste atenção às [limitações de suporte do SVG](https://bigbadaboom.github.io/androidsvg/index.html).

| Padrão | Exemplo |
| :------: | :------: |
| RustDesk icon | `floating-window-svg=<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1717559129252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4248" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M950.857143 512c0 242.285714-196.571429 438.857143-438.857143 438.857143S73.142857 754.285714 73.142857 512 269.714286 73.142857 512 73.142857s438.857143 196.571429 438.857143 438.857143z" fill="#1296db" p-id="4249"></path></svg>` |

### keep-screen-on

Esta opção é para o lado controlado do Android. Observe que manter a tela ligada depende da janela flutuante.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| never, during-controlled, service-on | during-controlled | `keep-screen-on=never` |

### enable-directx-capture

Esta opção é para o lado controlado do Windows. Se você não encontrar nenhum problema, é recomendável usar as configurações padrão, que priorizam o uso do DirectX para capturas de tela em vez de usar o GDI diretamente.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | Y | `enable-directx-capture=N` |

### enable-android-software-encoding-half-scale

Esta opção é para o lado controlado do Android. Por padrão, quando a resolução é maior que 1200, a codificação por hardware usa a resolução original, enquanto a codificação por software usa metade da resolução, pois a codificação por software é mais lenta. Esta opção é usada para definir se a codificação por software deve ser dimensionada para metade da resolução.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | Y | `enable-android-software-encoding-half-scale=N` |

### allow-remote-cm-modification

Controla se permite que o lado de controle clique na janela de gerenciamento de conexão para aceitar conexões, alterar permissões etc.

https://github.com/rustdesk/rustdesk/issues/7425

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `allow-remote-cm-modification=Y` |

### remove-preset-password-warning

Controla se deve remover o aviso de segurança na GUI quando houver uma senha predefinida no cliente personalizado.

https://github.com/rustdesk/rustdesk-server-pro/discussions/286

https://github.com/rustdesk/rustdesk/discussions/7956

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | Y | `remove-preset-password-warning=Y` |

### hide-security-settings / hide-network-settings / hide-server-settings / hide-proxy-settings / hide-websocket-settings / hide-remote-printer-settings

Controla se deseja ocultar algumas configurações. Certifique-se de que "Desativar configurações" esteja desativado, caso contrário, elas não funcionarão.

https://github.com/rustdesk/rustdesk-server-pro/issues/263

https://github.com/rustdesk/rustdesk-server-pro/issues/276

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `hide-security-settings=Y` |

### hide-username-on-card

Controla se deseja mostrar o nome de usuário na lista de dispositivos. Porque às vezes, o nome de usuário é muito longo e oculta as outras informações.

https://github.com/rustdesk/rustdesk-server-pro/issues/284#issuecomment-2216521407

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `hide-username-on-card=Y` |

### hide-help-cards

Controla se deseja mostrar avisos de UAC / permissão na GUI.

https://github.com/rustdesk/rustdesk/issues/8687

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `hide-help-cards=Y` |

### display-name

Altere seu nome de exibição que será mostrado no pop-up quando você se conectar a um dispositivo remoto. Por padrão, ele exibe o nome de usuário do seu sistema operacional.

https://github.com/rustdesk/rustdesk-server-pro/issues/277

### disable-udp

Controla se deseja usar apenas TCP. Não usará mais UDP 21116, TCP 21116 será usado.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `disable-udp=Y` |

### preset-user-name / preset-strategy-name / preset-device-group-name

Atribuir usuário/estratégia/grupo de dispositivos aos dispositivos. Você também pode fazer isso via [linha de comando](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/#assign-device-usersgroupsstrategies-to-devices).

https://github.com/rustdesk/rustdesk-server-pro/discussions/304

grupo de dispositivos está disponível no cliente RustDesk >=1.3.8, pro >= 1.5.0

### default-connect-password

Senha padrão usada para conectar a dispositivos remotos, esta senha tem prioridade inferior à senha da lista de endereços e à senha salva localmente.

Exemplo: `senha-de-conexão-padrão=abcd1234`

### enable-trusted-devices

Permitir que dispositivos confiáveis ignorem a verificação 2FA.

https://github.com/rustdesk/rustdesk/discussions/8513#discussioncomment-10234494

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | Y | `enable-trusted-devices=N` |


### allow-https-21114

Normalmente, o HTTPS usa a porta 443. Quando a porta do servidor de API é definida erroneamente como 21114, a ação padrão será remover a configuração da porta 21114. Definir a opção como Y permite o uso de 21114 como a porta HTTPS. Disponível no cliente RustDesk >=1.3.9.

https://github.com/rustdesk/rustdesk-server-pro/discussions/570

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `allow-https-21114=Y` |

### allow-d3d-render

A renderização D3D pode obter FPS mais alto e reduzir o uso da CPU, mas a tela de controle remoto pode ficar preta em alguns dispositivos. Disponível apenas no cliente RustDesk >=1.3.9, somente para Windows.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `allow-d3d-render=Y` |

### allow-websocket

Use o protocolo WebSocket para conectar servidor e cliente. Disponível apenas no cliente RustDesk >=1.4.0 e servidor Pro >= 1.5.7. Observe que o WebSocket suporta apenas conexão de retransmissão.

| Valores | Padrão | Exemplo |
| :------: | :------: | :------: |
| Y, N | N | `allow-websocket=Y` |
