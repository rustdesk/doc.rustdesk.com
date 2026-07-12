---
publishDate: 2026-07-09T08:32:00Z
lang: pt
translationKey: rustdesk-for-linux
draft: false
title: 'RustDesk para Linux: o desktop remoto de código aberto'
excerpt: 'Instale e execute o RustDesk no Linux: .deb, .rpm, Flatpak e AppImage, X11 vs Wayland, acesso headless e não assistido, e auto-hospedagem do servidor.'
image: ~/assets/images/blog/rustdesk-for-linux-og.png
category: 'Guias'
tags: ['RustDesk', 'Linux', 'Auto-hospedagem']
author: 'RustDesk Team'
slug: 'rustdesk-para-linux-o-desktop-remoto-de-codigo-aberto'
faq:
  - question: 'O RustDesk funciona no Wayland?'
    answer: 'Sim — o RustDesk tem um dos suportes a Wayland mais robustos entre as ferramentas de desktop remoto, incluindo o compartilhamento multimonitor adicionado na versão 1.4.3. No Wayland, ele captura a tela por meio do PipeWire e do portal de desktop XDG, que exibe uma caixa de diálogo de consentimento para escolher um display — na maioria dos casos a escolha é lembrada, então você não precisa confirmar novamente — e funciona dentro da sessão gráfica ativa e autenticada. Essa etapa de consentimento é um recurso de segurança do próprio Wayland, compartilhado por todos os aplicativos de compartilhamento de tela. Para acesso antes do login ou em máquinas totalmente não assistidas, use por enquanto a configuração headless com display virtual (ou uma sessão X11, em distribuições que ainda oferecem essa opção, já que várias estão migrando para usar somente Wayland); a captura Wayland totalmente não assistida está em desenvolvimento ativo (veja github.com/rustdesk/rustdesk/pull/15420).'
  - question: 'Qual pacote devo instalar no Linux?'
    answer: 'Use o .deb no Debian, Ubuntu e Linux Mint, o .rpm no Fedora, RHEL e openSUSE, o Flatpak do Flathub para uma versão isolada e amplamente compatível, ou o AppImage portátil como alternativa em arquivo único. Os pacotes .deb e .rpm registram e iniciam um serviço systemd, de modo que o RustDesk sobrevive a reinicializações; o Flatpak e o AppImage não fazem isso por padrão.'
  - question: 'Por que minha máquina Linux headless mostra uma tela preta?'
    answer: 'Sem nenhum monitor conectado, o X ou o Wayland nunca alocam um framebuffer, então não há nada para o RustDesk capturar, e o visualizador mostra uma tela preta ou de espera pela imagem. Conecte um plugue HDMI/DisplayPort dummy, configure um display virtual como o xserver-xorg-video-dummy ou o VKMS, ou ative o modo headless opcional do RustDesk para Linux, para que um display virtual seja criado automaticamente para você.'
  - question: 'Posso fazer a auto-hospedagem do servidor RustDesk no Linux?'
    answer: 'Sim. O servidor do RustDesk (os processos hbbs de ID/rendezvous e hbbr de retransmissão) é feito para Linux, e essa é a forma padrão de executá-lo. O servidor comunitário, gratuito e de código aberto, roda indefinidamente sem custo, e o Server Pro acrescenta um console web, grupos de dispositivos e um gerador de cliente personalizado. Ambos podem ser instalados em uma VM Linux simples ou em um servidor bare-metal.'
metadata:
  description: 'RustDesk no Linux, de ponta a ponta: escolha de pacotes para cada distribuição e placa ARM, captura de tela em Wayland e X11, configuração headless e execução do seu próprio servidor.'
  keywords: 'RustDesk para Linux, RustDesk Ubuntu, RustDesk Wayland, RustDesk X11, instalar RustDesk no Linux'
---

Usuários de Linux nunca tiveram muitas opções de boas ferramentas de desktop remoto, e as que existem costumam ser produtos comerciais de código fechado ou pilhas VNC já ultrapassadas. O RustDesk ocupa uma posição diferente: é um cliente de desktop remoto de código aberto licenciado sob a AGPL, roda nativamente em todas as principais distribuições, e você pode apontá-lo para um servidor hospedado por você mesmo. Essa combinação — código auditável, cliente nativo para Linux e infraestrutura passível de auto-hospedagem — é o motivo pelo qual o RustDesk se tornou uma das respostas mais indicadas quando alguém procura um desktop remoto de código aberto para Linux.

Este guia mostra como instalá-lo, o ponto que mais confunde as pessoas (X11 versus Wayland), como colocar o acesso não assistido e headless para funcionar, e onde o servidor entra nessa história.

## Instalando o RustDesk no Linux

O RustDesk é distribuído em todos os formatos de pacote comuns do Linux, então raramente é preciso compilar a partir do código-fonte. Baixe a versão atual na [página de releases do RustDesk no GitHub](https://github.com/rustdesk/rustdesk/releases) ou na [documentação de instalação para Linux](https://rustdesk.com/docs/en/client/linux/) e escolha o formato compatível com sua distribuição.

| Formato  | Ideal para                               | Inicia um serviço automaticamente? | Notas                                                                                                       |
| -------- | ---------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `.deb`   | Debian, Ubuntu, Linux Mint               | Sim (systemd)                      | `sudo apt install ./rustdesk-*.deb`                                                                         |
| `.rpm`   | Fedora, RHEL/CentOS, openSUSE            | Sim (systemd)                      | `sudo dnf install ./rustdesk-*.rpm`                                                                         |
| Flatpak  | Qualquer distribuição, isolado (sandbox) | Não                                | `flatpak install flathub com.rustdesk.RustDesk` ([Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) |
| AppImage | Qualquer distribuição, portátil          | Não                                | Pode exigir `libfuse2` em versões recentes do Ubuntu; aplique `chmod +x` e depois execute                   |
| AUR      | Arch, Manjaro                            | Depende do pacote                  | Mantido pela comunidade (`rustdesk-bin`, `rustdesk-appimage`)                                               |

Os pacotes `.deb` e `.rpm` são os indicados se você quer o RustDesk rodando como um serviço em segundo plano que sobrevive a reinicializações — ambos registram e iniciam uma unidade systemd automaticamente. O Flatpak (`com.rustdesk.RustDesk` no [Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) é uma versão isolada, conveniente para uso em desktop, mas que não instala um serviço de sistema por padrão. Para uma distribuição que o RustDesk não empacota diretamente, opte primeiro pelo **Flatpak** — como ele empacota seu próprio runtime, costuma ser o mais compatível de forma ampla. O AppImage é uma alternativa portátil em arquivo único, mas, na prática, sua compatibilidade é mais inconsistente (por exemplo, pode exigir o `libfuse2` em versões recentes do Ubuntu).

Na prática, o RustDesk é usado em Ubuntu, Debian, Fedora, RHEL/CentOS, openSUSE, Arch e NixOS, com builds para **x86_64, ARM64 (aarch64) e ARM32 (ARMv7)** — ou seja, ele roda tanto em placas e servidores ARM quanto em PCs convencionais.

## X11 vs Wayland: a parte que importa

Esta é a coisa mais importante a entender sobre o RustDesk no Linux, pois é isso que determina se o controle remoto "simplesmente funciona" de imediato ou se exige um pequeno ajuste de configuração antes.

**X11 (Xorg): o caminho de captura mais direto, onde sua distribuição ainda o oferecer.** No X11, o RustDesk lê o framebuffer diretamente e injeta a entrada diretamente, então a captura e o controle de mouse/teclado são o mais direto possível, e mudanças de monitor são detectadas dinamicamente. Muitos gerenciadores de exibição (display managers) ainda permitem escolher "Xorg"/"X11" em um menu de engrenagem na tela de login. Vale lembrar, porém, que várias distribuições estão migrando para usar somente Wayland e removendo a sessão X11 — portanto, trate o X11 como uma conveniência disponível quando existir, não como algo em torno do qual planejar sua implantação.

**Wayland: o RustDesk tem, sem dúvida, um dos suportes mais fortes entre as ferramentas de desktop remoto.** O RustDesk oferece suporte a Wayland desde a versão 1.2.0 e continua expandindo esse suporte. Como os compositores do Wayland não permitem acesso direto ao framebuffer, o RustDesk captura a tela por meio do serviço `xdg-desktop-portal` e do [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support), e injeta a entrada por meio do módulo `uinput` do kernel. Duas consequências decorrem do próprio design do Wayland — e elas se aplicam a qualquer ferramenta de compartilhamento de tela no Wayland, não só ao RustDesk:

- **Consentimento a cada conexão.** O portal exibe uma caixa de diálogo pedindo que você selecione qual display compartilhar. Esse é um recurso de segurança deliberado do Wayland, não um bug do RustDesk — um aplicativo em segundo plano não pode começar a gravar sua tela silenciosamente. O Portal v4 e versões mais recentes oferecem suporte a um "token de restauração" para que você não precise confirmar toda vez, mas o primeiro compartilhamento exige um clique na tela.
- **Somente sessão ativa.** A captura no Wayland está vinculada à sessão gráfica com login já efetuado. A captura da tela de login (greeter) do Wayland ainda não é suportada — está em desenvolvimento ativo ([PR #15420](https://github.com/rustdesk/rustdesk/pull/15420)). Para acesso antes do login hoje, use a configuração headless/display virtual abaixo, ou uma sessão X11 em distribuições que ainda oferecem essa opção.

O suporte ao Wayland continua melhorando — o RustDesk 1.4.3 (outubro de 2025), por exemplo, [adicionou compartilhamento multimonitor para o Wayland](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/). Mas, se você se conectar e ver uma tela preta em uma máquina Wayland, isso quase sempre significa que o caminho do portal/PipeWire não foi satisfeito. Nosso artigo dedicado a [RustDesk conectado, mas aguardando imagem](/pt/blog/rustdesk-conectado-aguardando-imagem-guia-completo-de-correcao) detalha especificamente o caso da tela preta no Wayland.

## Acesso não assistido no Linux

Acesso não assistido significa se conectar a uma máquina sem ninguém sentado na frente dela — o cenário clássico de suporte remoto. No Linux, a receita é:

1. Instale via `.deb` ou `.rpm` para que o serviço systemd seja registrado, ou clique em **Enable Service** (Ativar serviço) no aplicativo.
2. No RustDesk, defina uma **senha permanente** forte nas configurações de conexão (e, idealmente, ative a autenticação de dois fatores).
3. Para acesso antes do login ou em trocas entre usuários, use a configuração headless com display virtual abaixo (a lacuna do Wayland no login, mencionada acima, também se aplica aqui).

Uma realidade do Wayland para a qual você deve se planejar: o portal baseado em consentimento descrito na seção sobre Wayland torna a captura totalmente não assistida mais difícil do que no X11, até que o suporte não assistido — ainda em desenvolvimento — seja lançado; portanto, planeje usar a configuração headless com display virtual para máquinas que operam sem intervenção.

## Linux headless: servidores sem monitor

Um caso de uso muito comum no Linux é uma máquina sem nenhum display conectado — um servidor doméstico, uma máquina de laboratório, uma VM. Aqui o problema não é o RustDesk, é a pilha gráfica: sem nenhum monitor conectado, o X ou o Wayland nunca alocam um framebuffer, então literalmente não há imagem para capturar, e você obtém uma tela preta.

Três formas de dar a ele algo para renderizar:

- **Um plugue dummy** — um adaptador físico HDMI/DisplayPort "headless" barato que faz a GPU pensar que há um monitor conectado.
- **Um driver de display virtual** — `xserver-xorg-video-dummy` no X11, ou uma opção em nível de kernel como o VKMS.
- **O modo headless opcional do RustDesk** — ative-o com `sudo rustdesk --option allow-linux-headless Y`. Segundo a [wiki de suporte a Linux headless](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support), ele vem desativado por padrão, é testado principalmente no Ubuntu com GNOME, e espera pacotes como `xserver-xorg-video-dummy` e `lightdm`. Você pode obter o ID da máquina com `sudo rustdesk --get-id` e definir uma senha com `sudo rustdesk --password <password>`.

O modo headless ainda tem algumas arestas para aparar, então trate-o como algo que "funciona, com cuidado", não como uma solução pronta para uso imediato.

## Auto-hospedagem do servidor RustDesk no Linux

Tudo o que vimos até aqui é o _cliente_. A outra metade da história do RustDesk no Linux é que o **servidor** — o serviço `hbbs` de ID/rendezvous e o relay `hbbr` — é uma aplicação nativa de Linux, e o Linux é o seu ambiente natural. É isso que permite manter a intermediação de sessões e o tráfego retransmitido em uma infraestrutura que é sua, em vez de depender da nuvem de um fornecedor.

Você tem duas opções. O **servidor comunitário**, gratuito e de código aberto, roda indefinidamente sem custo e cobre a função principal de conexão e retransmissão. O **RustDesk Server Pro** acrescenta um console web auto-hospedado, grupos de dispositivos, uma lista de endereços compartilhada, um gerador de cliente com marca personalizada, e [SSO via LDAP/Active Directory e OIDC](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/ldap/). Você também não é obrigado a usar Docker — veja [como executar o Server Pro sem Docker](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/installscript/) para uma instalação em VM simples ou em bare-metal. Se você está dimensionando hardware para uma frota grande, planeje a capacidade com base no seu perfil real de simultaneidade e de retransmissão antes de se comprometer.

Uma observação sobre a auto-hospedagem: tanto o servidor comunitário gratuito quanto o Server Pro são seus para executar, corrigir e proteger. Os requisitos de hardware são baixos e, uma vez configurado, a manutenção é leve — e o suporte do RustDesk pode ajudar se surgir alguma dúvida. Essa autonomia é exatamente o objetivo. (A licença do Server Pro também precisa de um caminho de saída até rustdesk.com para ser ativada e permanecer licenciada.)

## Primeiros passos

Instale o pacote da sua distribuição, defina uma senha permanente para acesso não assistido e — se a soberania dos dados é o motivo de você estar aqui — coloque no ar o servidor comunitário gratuito. Para detalhes atuais dos planos, [rustdesk.com/pricing](https://rustdesk.com/pricing) é a fonte oficial, e [sales@rustdesk.com](mailto:sales@rustdesk.com) pode explicar o Server Pro em detalhes. Quer ver funcionando antes? [Veja o RustDesk em ação](https://www.youtube.com/@rustdesk).
