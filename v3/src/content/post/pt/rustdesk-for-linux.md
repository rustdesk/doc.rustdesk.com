---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-09T08:32:00Z
lang: pt
translationKey: rustdesk-for-linux
draft: false
title: 'RustDesk para Linux: o desktop remoto de código aberto'
excerpt: 'Instale e execute o RustDesk no Linux: .deb, .rpm, Flatpak e AppImage, X11 vs Wayland, acesso headless e não assistido, e auto-hospedagem do servidor.'
image: ~/assets/images/blog/rustdesk-for-linux-og.webp
category: 'Guias'
tags: ['RustDesk', 'Linux', 'Auto-hospedagem']
author: 'RustDesk Team'
slug: 'rustdesk-para-linux-o-desktop-remoto-de-codigo-aberto'
faq:
  - question: 'O RustDesk funciona no Wayland?'
    answer: 'Sim. As versões padrão do RustDesk capturam desktops Wayland por meio do PipeWire e do xdg-desktop-portal em uma sessão com login, incluindo vários monitores desde a versão 1.4.3. O portal pede consentimento para compartilhar a tela, e o portal versão 4 ou mais recente pode lembrar a escolha. Uma versão de prévia separada acrescenta acesso não assistido e acesso à tela de login após reiniciar. A prévia é voltada a sistemas x86_64 baseados em Debian/Ubuntu.'
  - question: 'Qual pacote devo instalar no Linux?'
    answer: 'Use o .deb no Debian, Ubuntu e Linux Mint, o .rpm no Fedora, RHEL e openSUSE, o Flatpak do Flathub para uma versão isolada e amplamente compatível, ou o AppImage portátil como alternativa em arquivo único. Os pacotes .deb e .rpm registram e iniciam um serviço systemd, de modo que o RustDesk continua funcionando após reinicializações; o Flatpak e o AppImage não fazem isso por padrão.'
  - question: 'Por que minha máquina Linux headless mostra uma tela preta?'
    answer: 'Normalmente porque a máquina Linux headless não tem uma tela ativa para o RustDesk capturar. Sem monitor, a pilha gráfica muitas vezes não expõe nenhuma saída, então a sessão conecta, mas mostra uma tela preta ou de espera pela imagem. Conecte um plugue dummy HDMI ou DisplayPort, ou configure um display virtual como o xserver-xorg-video-dummy no X11, e conecte de novo.'
  - question: 'Posso auto-hospedar o servidor RustDesk no Linux?'
    answer: 'Sim. O servidor RustDesk (os processos hbbs de ID/rendezvous e hbbr de relay) é feito para Linux, e o Linux é a forma padrão de executá-lo. O RustDesk Server OSS (o servidor comunitário gratuito) não tem taxa de licença nem data de expiração, e o Server Pro acrescenta console web, grupos de dispositivos e um gerador de cliente personalizado. Os dois podem ser instalados em uma VM Linux simples ou em um servidor bare-metal.'
metadata:
  description: 'RustDesk no Linux de ponta a ponta: pacotes para cada distribuição e placa ARM, captura em Wayland e X11, configuração headless e seu próprio servidor.'
  keywords: 'RustDesk para Linux, RustDesk Ubuntu, RustDesk Wayland, RustDesk X11, instalar RustDesk no Linux'
---

O RustDesk é um desktop remoto de código aberto para Linux. O cliente e o RustDesk Server OSS (o servidor comunitário gratuito) são licenciados sob a AGPL, há pacotes nativos para as principais distribuições, e você pode apontar todos os clientes para serviços de ID/rendezvous e relay hospedados por você mesmo. O Server Pro é um software de servidor auto-hospedado, comercial e proprietário, que acrescenta um console web e gerenciamento centralizado. Código auditável, cliente nativo para Linux e infraestrutura auto-hospedável são os motivos pelos quais o RustDesk é uma resposta frequente quando alguém procura um desktop remoto de código aberto para Linux.

Este guia mostra como instalá-lo, o ponto que confunde todo mundo (X11 versus Wayland), como fazer o acesso não assistido e o headless funcionarem e onde o servidor entra nessa história.

## Instalando o RustDesk no Linux

O RustDesk é distribuído em todos os formatos de pacote comuns do Linux, então raramente é preciso compilar a partir do código-fonte. Baixe a versão atual na [página de releases do RustDesk no GitHub](https://github.com/rustdesk/rustdesk/releases) ou na [documentação de instalação para Linux](https://rustdesk.com/docs/pt/client/linux/) e escolha o formato que corresponde à sua distribuição.

| Formato  | Ideal para                               | Inicia um serviço automaticamente? | Observações                                                                                                 |
| -------- | ---------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `.deb`   | Debian, Ubuntu, Linux Mint               | Sim (systemd)                      | `sudo apt install ./rustdesk-*.deb`                                                                         |
| `.rpm`   | Fedora, RHEL/CentOS, openSUSE            | Sim (systemd)                      | `sudo dnf install ./rustdesk-*.rpm`                                                                         |
| Flatpak  | Qualquer distribuição, isolado (sandbox) | Não                                | `flatpak install flathub com.rustdesk.RustDesk` ([Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) |
| AppImage | Qualquer distribuição, portátil          | Não                                | Pode exigir `libfuse2` em versões recentes do Ubuntu; aplique `chmod +x` e execute                          |
| AUR      | Arch, Manjaro                            | Depende do pacote                  | Mantido pela comunidade (`rustdesk-bin`, `rustdesk-appimage`)                                               |

Os pacotes `.deb` e `.rpm` são os indicados se você quer o RustDesk rodando como serviço em segundo plano que continua funcionando após reinicializações — os dois registram e iniciam uma unidade systemd automaticamente. O Flatpak (`com.rustdesk.RustDesk` no [Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) é uma versão isolada, prática para uso no desktop, mas que não instala um serviço de sistema por padrão. Para uma distribuição que o RustDesk não empacota diretamente, comece pelo **Flatpak** — como ele traz o próprio runtime, costuma ser o mais compatível. O AppImage é uma alternativa portátil em arquivo único, mas, na prática, a compatibilidade dele é mais irregular (por exemplo, pode exigir o `libfuse2` em versões recentes do Ubuntu).

Na prática, o RustDesk é usado em Ubuntu, Debian, Fedora, RHEL/CentOS, openSUSE, Arch e NixOS, com builds para **x86_64, ARM64 (aarch64) e ARM32 (ARMv7)** — ou seja, ele roda tanto em placas e servidores ARM quanto em PCs convencionais.

## X11 vs Wayland: a parte que importa

Este é o ponto mais importante sobre o RustDesk no Linux, porque determina se o controle remoto "simplesmente funciona" de imediato ou se exige antes um pequeno ajuste.

**X11 (Xorg): o caminho de captura mais direto, onde sua distribuição ainda o oferece.** No X11, o RustDesk lê o framebuffer e injeta a entrada diretamente, então a captura e o controle de mouse e teclado são os mais diretos possíveis, e as mudanças de monitor são detectadas dinamicamente. Muitos gerenciadores de exibição (display managers) ainda permitem escolher "Xorg"/"X11" em um menu de engrenagem na tela de login. Lembre-se, porém, de que várias distribuições estão migrando para somente Wayland e aposentando a sessão X11 — então trate o X11 como uma conveniência quando estiver disponível, e não como base para planejar sua implantação.

**Wayland: suportado nas versões padrão, com uma prévia para acesso não assistido.** Como os compositores Wayland não permitem acesso direto ao framebuffer, as versões padrão do RustDesk capturam a tela por meio do `xdg-desktop-portal` e do [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support) na sessão com login e injetam a entrada pelo módulo `uinput` do kernel. O RustDesk 1.4.3 (outubro de 2025) [adicionou o compartilhamento de vários monitores no Wayland](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/). Uma [prévia separada para acesso não assistido no Wayland](/pt/blog/unattended-remote-access-wayland-pt) acrescenta acesso não assistido e acesso à tela de login após reiniciar; ela é voltada a **sistemas x86_64 baseados em Debian/Ubuntu**.

- **Consentimento ao iniciar o compartilhamento.** O portal exibe uma caixa de diálogo perguntando qual tela compartilhar. Isso é um recurso de segurança do Wayland, não um bug do RustDesk: um aplicativo em segundo plano não pode começar a gravar sua tela em silêncio. O portal v4 ou mais recente oferece suporte a um "token de restauração", para que você não precise confirmar a cada conexão.
- **Acesso à tela de login.** As versões padrão capturam a sessão com login. Para a tela de login (greeter) após uma reinicialização, use a prévia não assistida em sistemas x86_64 baseados em Debian/Ubuntu ou um greeter de login X11, onde sua distribuição ainda oferecer.

Se você se conectar a uma máquina Wayland e vir uma tela preta com uma versão padrão, normalmente o caminho portal/PipeWire não foi atendido: o pedido não foi aceito, ou o `xdg-desktop-portal` ou o PipeWire não estão em execução. Nosso guia sobre [RustDesk conectado, mas aguardando imagem](/pt/blog/rustdesk-conectado-aguardando-imagem-guia-completo-de-correcao) detalha o caso do Wayland.

## Acesso não assistido no Linux

Acesso não assistido significa conectar-se a uma máquina sem ninguém na frente dela — o cenário clássico de suporte remoto. No Linux, a receita é:

1. Instale via `.deb` ou `.rpm` para que o serviço systemd seja registrado, ou clique em **Habilitar Serviço** (Enable Service) no aplicativo.
2. Defina uma **senha permanente** forte em **Configurações → Segurança**. O modo de aprovação padrão já a aceita; adicione a 2FA de conexão no dispositivo controlado para ter um segundo fator. Veja o [guia de configuração do acesso não assistido](/pt/blog/acesso-nao-assistido-do-rustdesk-guia-de-configuracao).
3. Para acesso antes do login no Wayland, use a [prévia para acesso não assistido no Wayland](/pt/blog/unattended-remote-access-wayland-pt) em sistemas x86_64 baseados em Debian/Ubuntu ou configure o greeter de login do gerenciador de exibição para usar X11, onde houver suporte. Escolher apenas uma sessão de desktop X11 afeta somente a sessão após o login.

## Linux headless: servidores sem monitor

Um caso de uso comum no Linux é uma máquina sem nenhuma tela conectada: um servidor doméstico, uma máquina de laboratório, uma VM. Sem monitor, a pilha gráfica muitas vezes não expõe nenhuma saída ativa, então não há imagem para capturar e você vê uma tela preta.

Duas formas de dar a ela algo para renderizar:

- **Um plugue dummy** — um adaptador físico HDMI/DisplayPort "headless" e barato, que faz a GPU achar que há um monitor conectado.
- **Um driver de display virtual** — `xserver-xorg-video-dummy` no X11 ou uma opção no nível do kernel, como o VKMS.

## Auto-hospedando o servidor RustDesk no Linux

Tudo o que vimos até aqui é o _cliente_. A outra metade da história do RustDesk no Linux é que o **servidor** — o serviço `hbbs` de ID/rendezvous e o relay `hbbr` — é uma aplicação nativa de Linux, e o Linux é o ambiente natural dele. É isso que permite manter a intermediação das sessões e o tráfego retransmitido em infraestrutura sua, em vez de passar pela nuvem de um fornecedor.

Você tem duas opções. O **Server OSS** é gratuito, sem taxa de licença nem data de expiração, e cobre a função principal de conexão e relay. O **RustDesk Server Pro** acrescenta um console web auto-hospedado, grupos de dispositivos e um catálogo de endereços compartilhado e, a partir do plano Basic, um gerador de cliente com marca personalizada e [SSO via LDAP/Active Directory e OIDC](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/ldap/). Você também não é obrigado a usar Docker — veja [como executar o Server Pro sem Docker](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/installscript/) para uma instalação em VM simples ou bare-metal.

Uma observação sobre a auto-hospedagem: o Server OSS e o Server Pro são seus para operar, corrigir e proteger. Os [requisitos de hardware são muito baixos](https://rustdesk.com/docs/pt/self-host/rustdesk-server-oss/install/) (um servidor básico na nuvem ou até um Raspberry Pi roda o Server OSS); dimensione para os seus dispositivos online e o tráfego de relay, e defina um responsável por atualizações, monitoramento e backups. Os planos pagos incluem suporte. (O Server Pro também verifica a licença via HTTPS de saída cerca de uma vez por dia, então precisa de um caminho até rustdesk.com.)

## Primeiros passos

Instale o pacote da sua distribuição, defina uma senha permanente para o acesso não assistido e — se a soberania de dados é o motivo de você estar aqui — suba o Server OSS. Para os detalhes atuais dos planos, [rustdesk.com/pricing](https://rustdesk.com/pricing) é a fonte oficial, e [sales@rustdesk.com](mailto:sales@rustdesk.com) pode conversar com você sobre o Server Pro. Quer ver funcionando antes? [Veja o RustDesk em ação](https://www.youtube.com/@rustdesk).
