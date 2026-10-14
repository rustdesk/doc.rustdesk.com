---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-06T08:31:00Z
lang: 'pt'
translationKey: 'rustdesk-connected-waiting-for-image'
draft: false
title: 'RustDesk Conectado, Aguardando Imagem: Guia Completo de Correção'
excerpt: 'Diagnostique o “Conectado, aguardando imagem” do RustDesk: disponibilidade do display, permissões de captura, codecs, drivers de GPU, builds Wayland e conectividade do relay.'
image: '~/assets/images/blog/rustdesk-connected-waiting-for-image-og.webp'
category: 'Solução de problemas'
tags: ['RustDesk', 'Solução de problemas']
author: 'RustDesk Team'
slug: 'rustdesk-conectado-aguardando-imagem-guia-completo-de-correcao'
faq:
  - question: 'Por que o RustDesk exibe "Conectado, aguardando imagem"?'
    answer: 'A sessão foi estabelecida, mas nenhuma imagem está chegando. A causa mais relatada é a máquina remota não ter nada para capturar: nenhum monitor, um display em suspensão ou falta de permissão de gravação de tela. Conecte um monitor, um dummy plug HDMI ou um display virtual, ative a tela, conceda a permissão e, depois, experimente outro codec, como o VP9.'
  - question: 'Como corrigir o RustDesk "aguardando imagem" em um computador headless?'
    answer: 'Dê ao computador headless um display para capturar. Conecte um monitor ou um dummy plug HDMI barato, que faz a GPU se comportar como se houvesse um display conectado, ou configure um display virtual. Em seguida, mantenha o display ativo, confirme a permissão de captura de tela e mude para um codec por software, como o VP9, se a imagem ainda não aparecer.'
  - question: 'Alterar o codec de vídeo corrige a tela preta?'
    answer: 'Frequentemente, sim. Na barra de ferramentas da sessão remota ou nas configurações, você pode alternar entre codecs — VP8, VP9, AV1 ou H.264/H.265, quando o hardware oferece suporte. Um codec que o hardware remoto não consegue codificar exibe uma imagem em branco ou congelada, e voltar para um codec por software, como o VP9, geralmente restaura a imagem.'
  - question: 'O RustDesk exibe a imagem em um PC, mas não em outro. Por quê?'
    answer: 'Uma diferença entre dois PCs aponta para algo local na máquina com falha: um display em suspensão ou ausente, falta de permissão de gravação de tela no macOS, um driver de GPU desatualizado, um conflito de aceleração de hardware ou um codec que o hardware não suporta. Aplique as soluções por causa na máquina que falha, não naquela que funciona.'
  - question: 'Meu servidor auto-hospedado pode causar o "aguardando imagem"?'
    answer: 'Geralmente, não. Quando o RustDesk exibe "Conectado, aguardando imagem", o servidor de ID já cumpriu sua função. Uma porta de relay bloqueada ou um relay sobrecarregado ainda pode travar o fluxo de vídeo. Em um servidor auto-hospedado, libere TCP 21115-21117 e UDP 21116, e libere TCP 21118-21119 somente se você usar clientes WebSocket.'

metadata:
  description: '"RustDesk conectado, aguardando imagem"? Corrija a tela preta: máquinas headless, suspensão/bloqueio, codecs, drivers de GPU, Wayland e portas de firewall.'
  keywords: 'RustDesk conectado aguardando imagem, RustDesk tela preta, corrigir RustDesk aguardando imagem, RustDesk sem imagem, RustDesk dummy plug HDMI, RustDesk codec de vídeo, RustDesk aceleração de hardware'
---

Se o RustDesk exibir **"Conectado, aguardando imagem"** (no cliente em português, "Conectado. Aguardando pela imagem...") e depois mostrar uma tela preta, a parte difícil já funcionou: as duas pontas se encontraram e a sessão está estabelecida. O que falta é a _imagem_. Na maioria das vezes, a máquina remota não tem nada para capturar; com menos frequência, um codec, um driver de GPU ou o caminho do relay trava o fluxo. Este guia percorre cada causa, da mais relatada até os casos extremos, com uma solução concreta para cada uma.

## A resposta curta

A sessão conectou, mas nenhuma imagem está chegando. A causa mais relatada é uma máquina remota sem nada para capturar: **nenhum monitor, um display em suspensão ou falta de permissão de gravação de tela**. Dê ao RustDesk um display real e ativo (um monitor, um dummy plug HDMI ou um display virtual) e a permissão correta e, se a imagem ainda não aparecer, mude para outro codec, como o VP9. Se continuar preto, atualize o driver da GPU e verifique se as portas do relay estão acessíveis.

## Comece por aqui: há algo para capturar?

A causa mais relatada é uma **máquina headless** — um servidor, mini-PC ou estação de trabalho rodando sem monitor conectado, ou com o display em suspensão. Sem um display ativo, muitas vezes não há framebuffer para capturar, então o RustDesk conecta, mas não tem nada para enviar. Esse padrão aparece repetidamente no rastreador de problemas do RustDesk, incluindo [relatos de telas pretas especificamente quando o monitor do alvo está desligado](https://github.com/rustdesk/rustdesk/issues/9884) e a [longa thread sobre "Connected, waiting for image"](https://github.com/rustdesk/rustdesk/issues/222).

Duas maneiras de dar a ele algo para capturar:

- **Conecte um monitor** e certifique-se de que está ligado e ativo.
- **Use um dummy plug HDMI (ou DisplayPort).** Esses adaptadores baratos fazem a GPU acreditar que há um display conectado, então ela continua renderizando um framebuffer para o RustDesk capturar. Essa é a solução padrão para desktops headless e servidores domésticos.

Se um monitor _estiver_ conectado, o próximo suspeito é que ele entrou em suspensão.

## Solução por causa

| Causa                              | Sinal                                    | Solução                                                                                                                                                   |
| ---------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Headless / sem display             | Tela preta em um servidor ou mini-PC     | Conecte um monitor ou adicione um dummy plug HDMI                                                                                                         |
| Tela em suspensão / bloqueada      | Funcionava antes, preta após inatividade | Ative a tela; mantenha o display ativo nos horários de acesso; mantenha o bloqueio com senha ativado                                                     |
| Permissão ausente (macOS)          | Conecta, tela preta permanente           | Conceda Gravação de Tela em Privacidade e Segurança; instale o helper para a tela de login                                                                |
| Incompatibilidade de codec         | Imagem em branco ou congelada            | Troque o codec (VP8 / VP9 / AV1 / H.264 / H.265); volte para um codec por software                                                                        |
| Conflito de aceleração de hardware | Preta em GPUs específicas                | Desative o codec de hardware na barra de ferramentas da sessão ou nas Configurações, ou troque o codec                                                    |
| Driver de GPU desatualizado        | Preta após uma atualização de driver/SO  | Atualize o driver da GPU (especialmente NVIDIA)                                                                                                           |
| Sessão Wayland (Linux)             | Sem aviso de consentimento, em branco    | Aceite o aviso do PipeWire/portal e confirme que o portal do desktop está instalado; uma sessão X11 também funciona onde a distro ainda oferece essa opção |
| Travamento de rede / relay         | Fica preso em "aguardando imagem"        | Libere TCP 21115-21117 e UDP 21116; adicione TCP 21118-21119 para clientes WebSocket                                                                      |

### Suspensão, bloqueio e proteção de tela

Se funcionava antes e ficou preto depois que a máquina passou um tempo ociosa, o display entrou em suspensão.

- **Windows:** configure o plano de energia para que o display e a máquina fiquem ativos durante os horários em que você precisa de acesso remoto. Com o RustDesk instalado como serviço, você consegue se conectar na tela de bloqueio, então mantenha o bloqueio com senha ativado.
- **macOS:** impeça que o display entre em suspensão durante os horários em que você precisa de acesso remoto — configure isso em **Ajustes do Sistema → Monitores** (ou nas configurações de Tela de Bloqueio / Energia) e mantenha o Mac ligado ao carregador, já que a suspensão se comporta de forma diferente na bateria.
- **Android:** a tela precisa estar ligada para ser compartilhada, então toque no display para ativá-lo antes de conectar. Conectar de um iOS a um dispositivo Android em repouso com a tela desligada é um [caso conhecido de "aguardando imagem"](https://github.com/rustdesk/rustdesk/issues/11479) — ative o dispositivo de destino primeiro.

### Permissões do macOS

O macOS não permite que nenhum aplicativo grave a tela sem consentimento explícito. Se o RustDesk conectar mas continuar preto em um Mac, abra **Ajustes do Sistema → Privacidade e Segurança → Gravação de Tela**, habilite o RustDesk e reinicie o aplicativo. Uma tela preta especificamente _na janela de login_ significa que o serviço/helper do RustDesk não está instalado para rodar antes de um usuário fazer login — instale-o para capturar antes do login.

### Incompatibilidade de codec de vídeo

O RustDesk pode codificar o fluxo de várias formas, e o padrão nem sempre é adequado ao hardware remoto. Na barra de ferramentas da sessão (ou nas Configurações), troque o codec — **VP8, VP9, AV1 ou H.264/H.265, quando o hardware oferece suporte** — e observe se a imagem aparece. Se um codec de hardware produzir uma imagem em branco em uma GPU específica, voltar para um codec por software, como o VP9, é a alternativa mais confiável.

### Aceleração de hardware e drivers de GPU

Algumas GPUs — configurações NVIDIA aparecem com mais frequência — entram em conflito com os caminhos de captura e renderização acelerados por hardware do RustDesk. Dois ajustes ajudam:

- **Desative o codec de hardware.** Na barra de ferramentas da sessão (ou nas Configurações), desmarque **Habilitar codec de hardware** para que a codificação volte para um caminho por software — isso resolve a tela preta em muitas GPUs problemáticas.
- **Atualize o driver da GPU.** Uma tela preta que começou após uma atualização de driver ou do sistema operacional geralmente é corrigida com um driver atual, principalmente em hardware NVIDIA.

### Linux e Wayland

No Linux, os builds padrão do RustDesk capturam desktops Wayland, inclusive com vários monitores desde a versão 1.4.3, por meio do **PipeWire e do `xdg-desktop-portal`** em uma sessão com usuário logado. O portal pede que você escolha qual tela compartilhar, e o portal v4 ou mais recente pode lembrar essa escolha. Se a tela ficar em branco no Wayland, aceite o pedido de compartilhamento de tela do portal e confirme que o `xdg-desktop-portal` e o PipeWire estão instalados e em execução. Entrar em uma sessão X11/Xorg também evita o caminho do portal onde a distribuição ainda oferece essa opção. Uma tela preta na tela de login (greeter) é esperada com os builds padrão, que capturam a sessão logada; a [prévia de acesso não assistido no Wayland](/pt/blog/unattended-remote-access-wayland-pt), separada, para **sistemas x86_64 baseados em Debian/Ubuntu**, adiciona acesso não assistido e acesso à tela de login após a reinicialização.

### Rede e relay

Como a mensagem contém a palavra "conectado", a sessão geralmente já está ativa — mas o _vídeo_ ainda pode travar se o relay estiver sobrecarregado ou uma porta de relay estiver bloqueada. Para o caminho padrão do servidor, certifique-se de que **TCP 21115-21117 e UDP 21116** estejam acessíveis de ponta a ponta. Abra **TCP 21118-21119 somente se você usar clientes WebSocket**. O servidor de demonstração público é compartilhado e seu throughput não é garantido; se você depende do RustDesk diariamente, auto-hospedar o seu relay dá a você controle sobre capacidade e monitoramento. Se a própria sessão estiver caindo ou nunca se estabelecendo, o problema é outro — veja as [perguntas frequentes do RustDesk Server Pro](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/faq/).

## Mantenha tudo atualizado

Builds antigos carregam bugs antigos de captura. Atualize **ambos** — o cliente controlador e o cliente controlado — para a versão mais recente e, se você usa auto-hospedagem, atualize o servidor também. Vários relatos de tela preta simplesmente desaparecem após uma atualização nas duas pontas.

## A vantagem do código aberto

Quando uma tela preta resiste à checklist, o RustDesk oferece algo que ferramentas de código fechado não oferecem: o código real de captura sob licença AGPL. Você (ou um terceirizado) pode ler exatamente como a captura funciona na sua plataforma, reproduzir o problema e registrar um relatório preciso no repositório público — em vez de esperar na fila de suporte de um fornecedor.

## Menos variáveis quando o servidor é seu

Execute [seu próprio relay e servidor de ID](/pt/blog/por-que-auto-hospedar-seu-software-de-area-de-trabalho-remota), e a infraestrutura pública compartilhada sai da equação — uma incógnita a menos quando você está caçando um problema de captura, e controle total sobre as partes que você pode ajustar. É um bônus discreto, além de manter os dados com você.
