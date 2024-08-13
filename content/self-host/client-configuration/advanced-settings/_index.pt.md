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

### modo-de-acesso

Define o modo de acesso (permissões) para conexões recebidas.

**Localização**:

1. **Desktop:** Configurações → Segurança → Permissões
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | custom, full, view | custom | `access-mode=custom` |

### habilitar-teclado

Habilita a entrada de teclado/mouse para conexões recebidas.

**Localização**:

1. **Desktop**: Configurações → Segurança → Permissões → Habilitar teclado
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-keyboard=Y` |

### habilitar-clipboard

Habilita copiar e colar para conexões recebidas.

**Localização**:

1. **Desktop**: Configurações → Segurança → Permissões → Habilitar clipboard
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-clipboard=Y` |

### habilitar-transferencia-de-arquivos

Habilita copiar e colar arquivos ou transferência de arquivos (sessão) para conexões recebidas.

**Localização**:

1. **Desktop**: Configurações → Segurança → Permissões → Habilitar transferência de arquivos
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-file-transfer=Y` |

### habilitar-audio

Habilita gravação e transferência de áudio para o par.

**Localização**:

1. **Desktop**: Configurações → Segurança → Permissões → Habilitar áudio
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-audio=Y` |

### habilitar-túnel

Habilita tunelamento TCP.

**Localização**:

1. **Desktop**: Configurações → Segurança → Permissões → Habilitar tunelamento TCP
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-tunnel=Y` |

### habilitar-reinicialização-remota

Habilita reinicialização pelo lado de controle.

**Localização**:

1. **Desktop**: Configurações → Segurança → Permissões → Habilitar reinicialização remota
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-restart=Y` |

### habilitar-gravação-de-sessão

Habilita a gravação de sessões.

**Localização**:

1. **Desktop**: Configurações → Segurança → Permissões → Habilitar gravação de sessão
2. **Mobile**: Configurações → Compartilhar tela → Habilitar gravação de sessão

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-record-session=Y` |

### habilitar-bloqueio-de-entrada

Permite que o lado de controle bloqueie a entrada de outros usuários.

**Localização**:

1. **Desktop**: Configurações → Segurança → Permissões → Habilitar bloqueio de entrada do usuário (somente Windows)
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-block-input=Y` |

### permitir-modificação-de-configuração-remota

Permite que o lado de controle altere as configurações na IU controlada do RustDesk.

**Localização**:

1. **Desktop**: Configurações → Segurança → Permissões → Habilitar modificação remota da configuração
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `allow-remote-config-modification=Y` |

### habilitar-descoberta-de-rede-local

Permite que pares da LAN me descubram.

Após a descoberta da rede local, o [WOL](https://en.wikipedia.org/wiki/Wake-on-LAN) pode funcionar se for compatível localmente.

**Localização**:

1. **Desktop**: Configurações → Segurança → Segurança → Negar descoberta de rede local
2. **Mobile**: Configurações → Compartilhar tela → Negar descoberta de rede local

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| Y | Y, N | Y | `enable-lan-discovery=Y` |

### servidor-direto

Habilita acesso direto por IP.

**Localização**:

1. **Desktop**: Configurações → Segurança → Segurança → Habilitar acesso direto por IP
2. **Mobile**: Configurações → Compartilhar tela → Servidor direto

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `direct-server=Y` |

### porta-de-acesso-direto

Porta de acesso direto por IP.

**Localização**:

1. **Desktop**: Configurações → Segurança → Segurança → Porta de acesso direto por IP (Mostrado se "Habilitar acesso direto por IP" estiver marcado)
2. **Mobile**: Configurações → Compartilhar tela → Servidor direto

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N |  | 21118 | `direct-access-port=21118` |

### lista-branca

Usar lista branca de IP.

**Localização**:

1. **Desktop**: Configurações → Segurança → Segurança → Usar lista branca de IP
2. **Mobile**: Configurações → Compartilhar tela → Usar lista branca de IP

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | `,` or `<ip1>,<ip2>,<ip3>` | `,` means no filter | `whitelist=,` |

### permitir-desconectar-automaticamente & tempo-limite-desconectar-automaticamente

Fechar automaticamente sessões recebidas após um período de inatividade do usuário.

**Localização**:

1. **Desktop**: Configurações → Segurança → Segurança → Fechar automaticamente sessões recebidas em caso de inatividade do usuário
2. **Mobile**: Configurações → Compartilhar tela → Fechar automaticamente sessões recebidas em caso de inatividade do usuário

| Opção | Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: | :------: |
| allow-auto-disconnect | N | Y, N | N | `allow-auto-disconnect=Y` |
| auto-disconnect-timeout | N | Timeout in minutes | 10 | `auto-disconnect-timeout=10` |

### permitir-conexão-somente-janela-aberta

Permitir conexão apenas se a janela do RustDesk estiver aberta.

**Localização**:

1. **Desktop**: Configurações → Segurança → Segurança → Permitir conexão apenas se a janela do RustDesk estiver aberta
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-only-conn-window-open=N` |

### aprovar-modo

Aceitar conexões recebidas por senha ou clique manual.

**Localização**:

1. **Desktop**: Configurações → Segurança → Senha → Menu suspenso
2. **Mobile**: Compartilhar tela → Menu suspenso no canto superior direito

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | password, click, password-click | password-click | `approve-mode=password-click` |

### url-do-proxy

A URL do proxy.

Atualmente suporta `http` e `socks5`.

**Localização**:

1. **Desktop**: Configurações → Rede → Proxy → Proxy Socks5/Http(s)
2. **Mobile**

Exemplos:

1. **http** `url-do-proxy=http://192.168.0.2:12345`
2. **https** `url-do-proxy=https://192.168.0.2:12345`
3. **socks5** `url-do-proxy=socks5://192.168.0.2:1080`

### nome-de-usuario-do-proxy & senha-do-proxy

Nome de usuário e senha do proxy.

**Localização**:

1. **Desktop**: Configurações → Rede → Proxy → Proxy Socks5/Http(s)
2. **Mobile**

| Opção | Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: | :------: |
| proxy-username | N | | | `proxy-username=user` |
| proxy-password | N | | | `proxy-password=pass` |

## Configurações Gerais

### tema

Controla o tema da interface do cliente RustDesk.

**Localização**:

1. **Desktop**: Configurações → Geral → Tema
2. **Mobile**: Configurações → Configurações → Tema

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | dark, light, system | system | `theme=system` |

### idioma

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

### permitir-gravação-automática-de-entradas

Gravar automaticamente sessões recebidas.

**Localização**:

1. **Desktop**: Configurações → Geral → Gravação → Gravar automaticamente sessões recebidas
2. **Mobile**: Configurações → Gravação → Gravar automaticamente sessões recebidas

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-incoming=N` |

### diretório-de-salvamento-de-vídeo

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

### habilitar-confirmação-fechamento-abas

Controla se mostrar uma caixa de diálogo de confirmação antes de fechar todas as abas remotas.

**Localização**:

1. **Desktop**: Configurações → Geral → Outros → Confirmar antes de fechar várias abas
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-confirm-closing-tabs=Y` |

### habilitar-taxa-de-bits-adaptativa

Habilitar taxa de bits adaptativa.

**Localização**:

1. **Desktop**: Configurações → Geral → Outros → Taxa de bits adaptativa
2. **Mobile**: Configurações → Compartilhar tela → Taxa de bits adaptativa (beta)

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-abr=Y` |

### permitir-remover-papel-de-parede

Remover papel de parede durante sessões recebidas.

**Localização**:

1. **Desktop**: Configurações → Geral → Outros → Remover papel de parede durante sessões recebidas
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remove-wallpaper=N` |

### habilitar-abrir-novas-conexões-em-abas

Controla se usar uma nova aba ou uma nova janela para abrir uma nova conexão.

**Localização**:

1. **Desktop**: Configurações → Geral → Outros → Abrir conexão em nova aba
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-open-new-connections-in-tabs=Y` |

### permitir-renderização-sempre-por-software

Sempre usar renderização por software.

**Localização**:

1. **Desktop**: Configurações → Geral → Outros → Sempre usar renderização por software
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-always-software-render=N` |

### permitir-linux-sem-displays

Permitir conexão recebida se não houver monitores.

Esta opção requer ambiente de desktop, servidor Xorg e GDM, consulte [PR 3902](https://github.com/rustdesk/rustdesk/pull/3902).

**Localização**:

1. **Desktop**: Configurações → Geral → Outros → Permitir Linux displays
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-linux-headless=N` |

### habilitar-codec-de-hardware

Habilitar codificação por hardware para tornar a imagem mais suave.

**Localização**:

1. **Desktop**
2. **Mobile**: Configurações → Codec de hardware

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-hwcodec=Y` |

### tipo-de-interface-do-cartão-par

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

### ordenação-por-par

Controla a ordem dos cartões de pares.

**Localização**:

1. **Desktop**: Início → Painel de pares → Ícone de classificação superior direito
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Remote ID, Remote Host, Username | Remote ID | `peer-sorting=Remote ID` |

### sincronizar-agenda-com-sessões-recentes

Controla se sincronizar a agenda com sessões recentes.

**Localização**:

1. **Desktop**: Início → Painel de pares → Agenda → Tags → Menu suspenso → Sincronizar com sessões recentes
2. **Mobile**: Início → Painel de pares → Agenda → Tags → Menu suspenso → Sincronizar com sessões recentes

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-with-recent-sessions=N` |

### sincronizar-tags-da-agenda

Controla se ordenar as tags da agenda.

**Localização**:

1. **Desktop**: Início → Painel de pares → Agenda → Tags → Menu suspenso → Ordenar tags
2. **Mobile**: Início → Painel de pares → Agenda → Tags → Menu suspenso → Ordenar tags

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-tags=N` |

### filtrar-agenda-por-interseção

Filtrar agenda por interseção de tags.

**Prévia**: [PR #5985](https://github.com/rustdesk/rustdesk/pull/5985)

**Localização**:

1. **Desktop**: Início → Painel de pares → Agenda → Tags → Menu suspenso → Filtrar por interseção
2. **Mobile**: Início → Painel de pares → Agenda → Tags → Menu suspenso → Filtrar por interseção

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `filter-ab-by-intersection=N` |

## Configurações de Exibição

### modo-somente-visualização

Esta opção definirá a opção "somente visualização" para todos os pares após a primeira conexão.

Em seguida, a opção "somente visualização" nas configurações de cada par controlará se a conexão é somente visualização.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Modo de visualização
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Modo de visualização

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `view-only=Y` |

### mostrar-barra-de-ferramentas-de-monitores

Controla se mostrar monitores na barra de ferramentas.

![mostrar-barra-de-ferramentas-de-monitores](/docs/en/self-host/client-configuration/advanced-settings/images/show-monitors-toolbar.png)

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Mostrar barra de ferramentas de monitores
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-monitors-toolbar=Y` |

### colapsar-barra-de-ferramentas

Controla se a barra de ferramentas remota é colapsada após a conexão.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Colapsar barra de ferramentas
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `collapse-toolbar=Y` |

### mostrar-cursor-remoto

Esta opção definirá a opção "mostrar cursor remoto" para todos os pares após a primeira conexão.

Em seguida, a opção "mostrar cursor remoto" nas configurações de cada par controlará se o cursor remoto é exibido na página de controle remoto.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Mostrar cursor remoto
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Mostrar cursor remoto

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-remote-cursor=N` |

### seguir-cursor-remoto

Esta opção definirá a opção "seguir cursor remoto" para todos os pares após a primeira conexão.

Em seguida, a opção "seguir cursor remoto" nas configurações de cada par controlará se seguir o cursor remoto.

**Prévia**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Seguir cursor remoto
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Seguir cursor remoto

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-cursor=Y` |

### seguir-janela-remota

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

### mostrar-monitor-de-qualidade

Esta opção definirá a opção "mostrar-monitor-de-qualidade" para todos os pares após a primeira conexão.

A opção "mostrar-monitor-de-qualidade" nas configurações de cada par controlará então se mostrar o monitor de qualidade.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Mostrar monitor de qualidade
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Mostrar monitor de qualidade

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-quality-monitor=Y` |

### desabilitar-audio

Esta opção definirá a opção "desabilitar-audio" para todos os pares após a primeira conexão.

A opção "desabilitar-audio" nas configurações de cada par controlará então se reproduzir som.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Silenciar
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Silenciar

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-audio=Y` |

### habilitar-copiar-colar-arquivos

Esta opção definirá a opção "habilitar-copiar-colar-arquivos" para todos os pares após a primeira conexão.

A opção "habilitar-copiar-colar-arquivos" nas configurações de cada par controlará então habilitar copiar e colar arquivos na conexão.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Habilitar copiar e colar arquivos (somente Windows)
2. **Mobile**

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `enable-file-copy-paste=Y` |

### desabilitar-clipboard

Esta opção definirá a opção "desabilitar-clipboard" para todos os pares após a primeira conexão.

A opção "desabilitar-clipboard" nas configurações de cada par controlará então se habilitar a cópia e colagem de texto.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Desabilitar clipboard
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Desabilitar clipboard

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-clipboard=Y` |

### bloquear-após-fim-da-sessão

Esta opção definirá a opção "bloquear-após-fim-da-sessão" para todos os pares após a primeira conexão.

A opção "bloquear-após-fim-da-sessão" nas configurações de cada par controlará então se bloquear a máquina do par após o fim da sessão.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Bloquear após fim da sessão
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Bloquear após fim da sessão

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `lock-after-session-end=Y` |

### modo-privacidade

Esta opção definirá a opção "modo-privacidade" para todos os pares após a primeira conexão.

A opção "modo-privacidade" nas configurações de cada par controlará então se usar o modo privacidade após conectar.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Modo privacidade
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Modo privacidade

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `privacy-mode=Y` |

### modo-toque

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

### inverter-roda-do-mouse

Esta opção definirá a opção "inverter-roda-do-mouse" para todos os pares após a primeira conexão.

A opção "inverter-roda-do-mouse" nas configurações de cada par controlará então se inverter a roda do mouse.

**Localização**:

1. **Desktop**: Configurações → Exibição → Outras opções padrão → Inverter roda do mouse
2. **Mobile**: Configurações → Configurações de exibição → Outras opções padrão → Inverter roda do mouse

| Instalação necessária | Valores | Padrão | Exemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `reverse-mouse-wheel=Y` |


