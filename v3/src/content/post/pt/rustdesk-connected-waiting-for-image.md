---
publishDate: 2026-07-06T08:31:00Z
lang: 'pt'
translationKey: 'rustdesk-connected-waiting-for-image'
draft: false
title: 'RustDesk Conectado, Aguardando Imagem: Guia Completo de Correção'
excerpt: '"Conectado, aguardando imagem" significa que a tela remota não está sendo capturada. Aqui estão todas as causas — máquinas headless, suspensão, codecs, drivers — e a solução para cada uma.'
image: '~/assets/images/blog/rustdesk-connected-waiting-for-image-og.png'
category: 'Solução de problemas'
tags: ['RustDesk', 'Solução de problemas']
author: 'RustDesk Team'
slug: 'rustdesk-conectado-aguardando-imagem-guia-completo-de-correcao'
faq:
  - question: 'Por que o RustDesk exibe "Conectado, aguardando imagem"?'
    answer: 'A sessão foi estabelecida com sucesso, mas a máquina remota não está gerando uma imagem de tela para enviar. O motivo mais comum é a ausência de um display ativo para capturar — um servidor headless sem monitor, uma tela que entrou em suspensão ou foi bloqueada, ou um display que o sistema operacional não permite que o RustDesk grave. Corrija a origem da captura e a imagem aparece.'
  - question: 'Como corrigir o RustDesk que fica "aguardando imagem" em um computador headless?'
    answer: 'Uma máquina sem monitor não tem framebuffer para capturar, então o RustDesk não tem nada para enviar. Conecte um monitor real, use um dummy plug HDMI barato que faz a GPU pensar que há um display conectado ou, no Linux, use a configuração headless documentada (github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support). Ativar ou manter o display acordado resolve a maioria dos casos.'
  - question: 'Alterar o codec de vídeo corrige a tela preta?'
    answer: 'Frequentemente, sim. Na barra de ferramentas da sessão remota ou nas configurações, você pode alternar entre codecs — VP8, VP9, AV1 ou H.264/H.265, quando o hardware oferece suporte. Um codec que o hardware remoto não consegue codificar exibirá uma imagem em branco ou congelada, e voltar para um codec por software, como o VP9, geralmente restaura a imagem.'
  - question: 'O RustDesk exibe a imagem em um PC, mas não em outro. Por quê?'
    answer: 'Isso aponta para algo local na máquina com falha — um display em suspensão ou ausente, permissão de gravação de tela ausente no macOS, um driver de GPU desatualizado, um conflito de aceleração de hardware ou um codec que o hardware não consegue processar. Percorra as soluções por causa deste guia na máquina que falha, não naquela que funciona.'
  - question: 'Meu servidor auto-hospedado pode causar o "aguardando imagem"?'
    answer: 'Geralmente, a sessão já está conectada no momento em que você vê essa mensagem, então o servidor está cumprindo sua função. Mas um relay público sobrecarregado ou uma porta de relay bloqueada pode travar o fluxo de vídeo. Para o caminho padrão do servidor, libere as portas TCP 21115-21117 e UDP 21116; libere TCP 21118-21119 somente se você usar clientes WebSocket. Considere auto-hospedar o relay para obter um throughput mais consistente.'

metadata:
  description: '"RustDesk conectado, aguardando imagem"? Corrija a tela preta: displays headless, suspensão/bloqueio, codecs de vídeo, drivers de GPU, Wayland e portas de firewall.'
  keywords: 'RustDesk conectado aguardando imagem, RustDesk tela preta, corrigir RustDesk aguardando imagem, RustDesk sem imagem, RustDesk dummy plug HDMI, RustDesk codec de vídeo, RustDesk aceleração de hardware'
---

Se o RustDesk exibir **"Conectado, aguardando imagem"** e depois mostrar uma tela preta, a boa notícia é que a parte difícil já funcionou: as duas pontas se encontraram e a sessão está estabelecida. O que falta é a _imagem_. Algo na máquina remota não está gerando uma imagem de tela para enviar. Este guia percorre todas as causas conhecidas, da mais comum até os casos extremos, com uma solução concreta para cada uma.

## A resposta curta

A sessão conectou, mas não há framebuffer para capturar. Em uma máquina remota **sem monitor, com o display em suspensão ou bloqueado, ou uma tela que o sistema operacional não permite que o RustDesk grave**, o fluxo de vídeo não tem nada para codificar. Dê ao RustDesk um display real e ativo para capturar — um monitor, um dummy plug HDMI, a permissão correta ou um codec compatível — e a imagem aparece.

## Comece por aqui: há algo para capturar?

De longe, a causa mais relatada é uma **máquina headless** — um servidor, mini-PC ou estação de trabalho rodando sem monitor conectado, ou com o display em suspensão. Sem um display ativo, a GPU não produz framebuffer, então o RustDesk conecta, mas não tem nada para enviar. Esse padrão aparece repetidamente no rastreador de problemas do RustDesk, incluindo [relatos de telas pretas especificamente quando o monitor do alvo está desligado](https://github.com/rustdesk/rustdesk/issues/9884) e a [thread de longa duração sobre "Conectado, aguardando imagem"](https://github.com/rustdesk/rustdesk/issues/222).

Três maneiras de dar a ele algo para capturar:

- **Conecte um monitor** e certifique-se de que está ligado e ativo.
- **Use um dummy plug HDMI (ou DisplayPort).** Esses adaptadores baratos fazem a GPU acreditar que há um display conectado, então ela continua renderizando um framebuffer para o RustDesk capturar. Essa é a solução padrão para desktops headless e servidores domésticos.
- **No Linux, use o caminho headless documentado.** O RustDesk oferece suporte a configurações headless no Linux, mas a configuração é diferente de uma sessão de desktop normal — veja a [wiki de Suporte Headless para Linux](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support).

Se um monitor _estiver_ conectado, o próximo suspeito é que ele entrou em suspensão.

## Solução por causa

| Causa                              | Sinal                                    | Solução                                                                                                                                                   |
| ---------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Headless / sem display             | Tela preta em um servidor ou mini-PC     | Conecte um monitor, adicione um dummy plug HDMI ou use o caminho headless do Linux                                                                        |
| Tela em suspensão / bloqueada      | Funcionava antes, preta após inatividade | Ative a tela; desative a suspensão/proteção de tela; no macOS, impeça a suspensão do display nas Configurações                                            |
| Permissão ausente (macOS)          | Conecta, tela preta permanente           | Conceda Gravação de Tela em Privacidade e Segurança; instale o helper para a tela de login                                                                |
| Incompatibilidade de codec         | Imagem em branco ou congelada            | Troque o codec (VP8 / VP9 / AV1 / H.264 / H.265); volte para um codec por software                                                                        |
| Conflito de aceleração de hardware | Preta em GPUs específicas                | Desative o codec de hardware na barra de ferramentas da sessão ou nas Configurações, ou troque o codec                                                    |
| Driver de GPU desatualizado        | Preta após uma atualização de driver/SO  | Atualize o driver da GPU (especialmente NVIDIA)                                                                                                           |
| Sessão Wayland (Linux)             | Sem aviso de consentimento, em branco    | Aceite o aviso do PipeWire/portal e confirme se o portal do desktop está instalado; uma sessão X11 também funciona onde a distro ainda oferece essa opção |
| Travamento de rede / relay         | Fica preso em "aguardando imagem"        | Libere TCP 21115-21117 e UDP 21116; adicione TCP 21118-21119 para clientes WebSocket                                                                      |

### Suspensão, bloqueio e proteção de tela

Se funcionava antes e ficou preto depois que a máquina passou um tempo ociosa, o display entrou em suspensão.

- **Windows:** configure o plano de energia para que o display e a máquina nunca entrem em suspensão durante os horários em que você precisa de acesso remoto, e desative a proteção de tela (ou configure-a para não exigir senha durante a sessão).
- **macOS:** impeça que o display entre em suspensão durante os horários em que você precisa de acesso remoto — configure isso em **Ajustes do Sistema → Monitores** (ou nas configurações de Tela de Bloqueio / Energia), e mantenha o Mac conectado a um adaptador de energia, já que a suspensão se comporta de forma diferente na bateria.
- **Android:** a tela precisa estar ligada para ser compartilhada, então toque no display para ativá-lo antes de conectar. Conectar de um iOS a um dispositivo Android adormecido com a tela desligada é um [caso conhecido de "aguardando imagem"](https://github.com/rustdesk/rustdesk/issues/11479) — ative o dispositivo de destino primeiro.

### Permissões do macOS

O macOS se recusa a permitir que qualquer aplicativo grave a tela sem consentimento explícito. Se o RustDesk conectar mas continuar preto em um Mac, abra **Ajustes do Sistema → Privacidade e Segurança → Gravação de Tela** e habilite o RustDesk, depois reinicie o aplicativo. Uma tela preta especificamente _na janela de login_ significa que o serviço/helper do RustDesk não está instalado para rodar antes de um usuário fazer login — instale-o para capturar antes do login.

### Incompatibilidade de codec de vídeo

O RustDesk pode codificar o fluxo de várias formas, e o padrão nem sempre é adequado ao hardware remoto. Na barra de ferramentas da sessão (ou nas Configurações), troque o codec — **VP8, VP9, AV1 ou H.264/H.265, quando o hardware oferece suporte** — e observe se a imagem aparece. Se um codec de hardware produzir uma imagem em branco em uma GPU específica, voltar para um codec por software, como o VP9, é a alternativa mais confiável.

### Aceleração de hardware e drivers de GPU

Algumas GPUs — configurações NVIDIA aparecem com mais frequência — entram em conflito com os caminhos de captura e renderização acelerados por hardware do RustDesk. Dois ajustes ajudam:

- **Desative o codec de hardware.** Na barra de ferramentas da sessão (ou nas Configurações), desative **Usar codec de hardware** para que a codificação volte para um caminho por software — isso resolve a tela preta em muitas GPUs problemáticas.
- **Atualize o driver da GPU.** Uma tela preta que começou após uma atualização de driver ou do sistema operacional geralmente é corrigida ao migrar para um driver atual, principalmente em hardware NVIDIA.

### Linux e Wayland

No Linux, **a captura de tela no Wayland passa pelo PipeWire e pelo `xdg-desktop-portal`**: ele solicita consentimento para escolher um display na primeira vez — na maioria dos casos, a escolha é lembrada, então não solicita novamente — e funciona dentro de uma sessão de login ativa. Esse é um design de segurança do Wayland, então, por si só, não cobre a tela de login (greeter) nem uma máquina verdadeiramente headless — embora a captura Wayland sem supervisão esteja em desenvolvimento ativo ([PR #15420](https://github.com/rustdesk/rustdesk/pull/15420)). Se você tiver uma tela em branco no Wayland, a solução geralmente é aceitar o aviso de compartilhamento de tela do portal e confirmar que o `xdg-desktop-portal` e o PipeWire estão instalados e em execução; em uma máquina headless, use a [configuração headless](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support) documentada. Fazer login em uma sessão X11/Xorg também evita o caminho do portal onde uma distribuição ainda oferece essa opção — mas, à medida que muitas distribuições migram para Wayland exclusivamente, corrigir o caminho do portal/PipeWire é a abordagem mais preparada para o futuro.

### Rede e relay

Como a mensagem contém a palavra "conectado", a sessão geralmente já está ativa — mas o _vídeo_ ainda pode travar se o relay estiver sobrecarregado ou uma porta de relay estiver bloqueada. Para o caminho padrão do servidor, certifique-se de que **TCP 21115-21117 e UDP 21116** estejam acessíveis de ponta a ponta. Abra **TCP 21118-21119 somente se você usar clientes WebSocket**. O servidor de demonstração público é compartilhado e seu throughput não é garantido, então, se você depende do RustDesk diariamente, auto-hospedar seu próprio relay proporciona um comportamento muito mais consistente. Se a própria sessão estiver caindo ou nunca se estabelecendo, esse é um problema diferente — veja as [perguntas frequentes do RustDesk Server Pro](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/faq/).

## Mantenha tudo atualizado

Builds antigas carregam bugs antigos de captura. Atualize **ambos** — o cliente controlador e o cliente controlado — para a versão mais recente e, se você faz auto-hospedagem, atualize o servidor também. Vários relatos de tela preta simplesmente desaparecem após uma atualização nas duas pontas.

## A vantagem do código aberto

Quando uma tela preta desafia a checklist, o RustDesk oferece algo que ferramentas de código fechado não oferecem: o código real de captura sob licença AGPL. Você (ou um terceirizado) pode ler exatamente como a captura funciona na sua plataforma, reproduzir o problema e registrar um relatório preciso no repositório público — em vez de esperar na fila de suporte de um fornecedor.

## Menos variáveis quando o servidor é seu

Execute [seu próprio relay e servidor de ID](/pt/blog/por-que-auto-hospedar-seu-software-de-area-de-trabalho-remota), e a infraestrutura pública compartilhada sai da equação — uma incógnita a menos quando você está caçando um problema de captura, e controle total sobre as partes que você pode ajustar. Esse é um bônus discreto além de manter os dados sob seu controle.
