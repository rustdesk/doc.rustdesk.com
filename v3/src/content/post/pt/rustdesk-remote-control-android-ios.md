---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-07T17:09:00Z
lang: 'pt'
translationKey: 'rustdesk-remote-control-android-ios'
draft: false
title: 'Controle Remoto RustDesk no Android e iOS: O Que Funciona'
excerpt: 'O RustDesk controla celulares Android remotamente e transforma Android, iPhone e iPad em controladores para seus computadores. O app para iOS funciona apenas como controlador.'
image: '~/assets/images/blog/rustdesk-remote-control-android-ios-og.webp'
category: 'Guias'
tags: ['RustDesk', 'Móvel']
author: 'RustDesk Team'
slug: 'controle-remoto-rustdesk-no-android-e-ios-o-que-funciona'
faq:
  - question: 'Posso controlar remotamente um celular Android com o RustDesk?'
    answer: 'Sim. No dispositivo Android, você inicia o serviço de captura de tela do RustDesk (que exige aceitar um pedido de consentimento na tela) e ativa o serviço de acessibilidade RustDesk Input para que toques e deslizes remotos sejam injetados. O compartilhamento de tela exige Android 6 ou superior; compartilhar o áudio interno do sistema exige Android 10 ou superior. Alguns fabricantes restringem a acessibilidade para apps instalados fora da loja, então talvez seja preciso permitir as configurações restritas primeiro.'
  - question: 'O RustDesk consegue controlar um iPhone ou iPad?'
    answer: 'Não. O app RustDesk para iOS/iPadOS funciona apenas como controlador: use um iPhone ou iPad para controlar dispositivos Windows, macOS, Linux e Android. O RustDesk não implementa hospedagem, compartilhamento de tela nem entrada remota no iOS. Alguns outros fornecedores oferecem visualização assistida da tela do iOS, e a Apple oferece controle remoto com consentimento em chamadas do FaceTime.'
  - question: 'Posso usar meu celular para controlar meu computador?'
    answer: 'Sim. Os apps RustDesk para Android e iOS são controladores completos: conecte-se a uma máquina Windows, macOS ou Linux pelo ID e controle-a com um touchpad na tela ou modo mouse e um teclado virtual. Alguns fluxos de área de transferência, transferência de arquivos e teclas especiais variam conforme o sistema móvel. Controlar um computador pelo celular é o caso de uso móvel mais confiável.'
  - question: 'Os aplicativos móveis do RustDesk são de código aberto?'
    answer: 'Sim. Os clientes móveis compartilham a mesma base de código aberto AGPL do cliente de desktop. Os builds para Android estão disponíveis nos releases oficiais do RustDesk no GitHub e no F-Droid como com.carriez.flutter_hbb; o controlador para iOS está disponível na App Store da Apple. Atualmente, o RustDesk não é distribuído pela Google Play.'
  - question: 'Posso deixar um dispositivo Android configurado para controle não assistido?'
    answer: 'Parcialmente. O RustDesk consegue manter seu serviço de captura ativo com uma notificação em primeiro plano e reiniciá-lo na inicialização, mas o consentimento de captura de tela, o teclado bloqueado na tela de bloqueio e a necessidade de desbloquear manualmente após uma reinicialização tornam pouco confiável o controle Android realmente não assistido. Trate o controle Android como suporte assistido, e não como acesso do tipo configurar e esquecer.'
metadata:
  description: 'RustDesk no Android e iOS: controle o Android remotamente, comande seus desktops pelo celular e entenda por que o app de iPhone e iPad é apenas controlador.'
  keywords: 'controle remoto RustDesk Android iOS, controlar celular remotamente com RustDesk, RustDesk Android host, controlar Android remotamente, RustDesk iOS, controlar iPhone remotamente, aplicativo móvel RustDesk'
---

O RustDesk consegue de fato controlar um dispositivo Android depois que o dono concede as permissões de captura de tela e de entrada, e os dois apps móveis são excelentes _controladores_ para os seus computadores. O app para iOS funciona apenas como controlador: o RustDesk não implementa hospedagem nem compartilhamento de tela no iOS, então não é possível acessar remotamente um iPhone ou iPad com o RustDesk. Este guia explica o que funciona, o que não funciona e por quê, para que você planeje com base nas capacidades reais.

Os dois apps móveis compartilham a base de código do cliente RustDesk, licenciada sob a AGPL; o RustDesk Server OSS (o servidor comunitário gratuito) também é AGPL, enquanto o Server Pro é um software de servidor comercial e proprietário, também auto-hospedado. Os builds para Android estão disponíveis nos [releases oficiais do RustDesk no GitHub](https://github.com/rustdesk/rustdesk/releases) e no [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) como `com.carriez.flutter_hbb`, com ampla cobertura de dispositivos — builds arm64, arm32 e x86_64, além de um APK universal; o controlador para iOS está na App Store. O RustDesk [atualmente não é distribuído pela Google Play](/pt/blog/rustdesk-e-golpes-de-acesso-remoto-o-que-estamos-fazendo): o app Android foi retirado voluntariamente da loja em resposta a abusos de golpistas. Mesma base de código, mesmo núcleo auditável.

## Resumo em uma tabela

| Cenário                                                     | Compatível? | Observações                                                         |
| ----------------------------------------------------------- | ----------- | ------------------------------------------------------------------- |
| Controlar um PC Windows/macOS/Linux **a partir do** Android | Sim         | Controlador completo; touchpad ou modo mouse                        |
| Controlar um PC **a partir do** iPhone/iPad                 | Sim         | Controlador completo; touchpad ou modo mouse                        |
| Controlar **um dispositivo Android** (como host)            | Sim         | Requer consentimento de captura de tela + serviço de acessibilidade |
| Controlar **um dispositivo iOS** com o RustDesk             | **Não**     | O RustDesk para iOS é um app controlador                            |
| Visualizar remotamente a tela de um iOS com o RustDesk      | **Não**     | A visualização de tela de entrada não é implementada no RustDesk    |

O restante do artigo é apenas o detalhamento por trás de cada linha.

## Usando seu celular como controlador (a parte fácil)

Este é o caso de uso que "simplesmente funciona". Instale o RustDesk no seu dispositivo Android ou iOS e ele se torna um controlador completo para qualquer host RustDesk — seu desktop Windows, seu [Mac](https://rustdesk.com/docs/pt/client/mac/), sua [máquina Linux](/pt/blog/rustdesk-para-linux-o-desktop-remoto-de-codigo-aberto). Digite o ID de destino e a senha, e você tem a tela remota com um touchpad na tela, um modo mouse e um teclado virtual. Alguns fluxos de área de transferência, arquivos e teclas especiais variam conforme o sistema móvel. Nada de especial é exigido do lado do celular, porque você está apenas _enviando_ controle, e não sendo controlado.

Se o seu trabalho é "consertar um computador de onde quer que eu esteja", um celular rodando RustDesk é uma ferramenta realmente boa.

## Controlando um dispositivo Android (como host)

O RustDesk pode transformar um celular ou tablet Android em um host controlável. A captura de tela e a entrada remota usam serviços separados do Android, e os dois exigem configuração.

**Captura de tela.** O RustDesk usa a API `MediaProjection` do Android para capturar a tela. Ao tocar em **Iniciar Serviço** no app, o Android exibe um pedido de consentimento para gravar a tela — essa caixa de diálogo é obrigatória e não pode ser contornada silenciosamente. O compartilhamento de tela exige **Android 6 ou superior**; capturar o **áudio interno do sistema** do celular exige **Android 10 ou superior**. Até que essa permissão de captura seja concedida, nenhuma conexão de entrada consegue ver nada.

**Entrada remota.** Ver a tela não é o mesmo que controlá-la. Para injetar toques, deslizes e eventos de tecla, o RustDesk registra um [`AccessibilityService`](https://deepwiki.com/rustdesk/rustdesk/6.5-mobile-platforms) chamado **RustDesk Input**, que você ativa em **Configurações → Acessibilidade**. Ele traduz eventos remotos de mouse e gestos em gestos do Android e pode acionar ações do sistema como Voltar, Início e Recentes.

**Mantendo-se ativo.** O RustDesk mantém uma notificação de serviço em primeiro plano e, opcionalmente, uma janela flutuante sobreposta para que o Android não encerre o processo de captura, e pode reiniciar o serviço na inicialização.

Agora as limitações, porque o modelo de segurança do Android impõe restrições reais:

- **É necessário consentimento para iniciar a captura.** Alguém (ou uma aprovação prévia) precisa aceitar o pedido de gravação de tela.
- **A tela de bloqueio impede a entrada.** O Android não permite que um serviço de acessibilidade digite na tela de bloqueio segura, então, se o dispositivo bloquear, geralmente não é possível inserir o código de desbloqueio remotamente — uma limitação [documentada por usuários que testaram na prática](https://blog.wirelessmoves.com/2025/10/remote-android-support-with-rustdesk-part-1.html).
- **Reinicializações exigem desbloqueio manual.** Após uma reinicialização, o dispositivo geralmente precisa ser desbloqueado presencialmente antes que o controle seja retomado.
- **Restrições de fabricantes (OEM).** Em versões de alguns fabricantes, a opção de acessibilidade **RustDesk Input** fica desabilitada para apps instalados fora da loja até que você conceda as "configurações restritas" (toque e segure o ícone do app → Informações do app → permitir configurações restritas). Gerenciadores de bateria agressivos de certos fabricantes também podem encerrar o serviço em segundo plano.

A conclusão prática: o controle Android é excelente para **suporte assistido** — ajudar alguém que está com o celular na mão —, enquanto o acesso **não assistido, do tipo configurar e esquecer**, é uma tarefa que o host de desktop faz melhor, porque os sistemas operacionais móveis restringem o acesso persistente em segundo plano. Escolha a plataforma de acordo com a tarefa. (Para desktops, o [guia de configuração de acesso não assistido](/pt/blog/acesso-nao-assistido-do-rustdesk-guia-de-configuracao) cobre o caso real.)

## iOS: controladores RustDesk, visualização de tela e controle de entrada

**O RustDesk para iOS é um controlador, não um host.** Use-o para controlar computadores ou dispositivos Android compatíveis. A visualização de tela e o controle de entrada de um iOS não são implementados no RustDesk, como discutido no [pedido de recurso de host para iOS](https://github.com/rustdesk/rustdesk/discussions/4839).

Outros fornecedores seguem outra abordagem. As APIs de transmissão da Apple permitem o compartilhamento de tela iniciado pelo usuário, e [o AnyDesk documenta a visualização remota de entrada no iOS/iPadOS 12 e posteriores](https://support.anydesk.com/docs/anydesk-for-ios-ipados-tvos), sem controle de entrada remoto. Um técnico vendo uma tela enquanto o dono toca nela é um fluxo de trabalho diferente de controlá-la.

A Apple também oferece [controle remoto com consentimento no FaceTime](https://support.apple.com/guide/iphone/request-give-remote-control-a-facetime-call-iph5d70f34a3/ios), sujeito aos requisitos de dispositivo, região e sistema. Se o seu fluxo de suporte exige ver a tela de um iPhone, use uma ferramenta que implemente esse fluxo; para controlar computadores a partir de um iPhone ou iPad, o app controlador do RustDesk é a escolha certa.

## Uma nota sobre privacidade e auto-hospedagem

Como os apps móveis são de código aberto e falam o mesmo protocolo que o cliente de desktop, você pode apontá-los para o seu próprio [servidor RustDesk auto-hospedado](/pt/blog/por-que-auto-hospedar-seu-software-de-area-de-trabalho-remota) em vez da rede pública — assim, as sessões móveis são intermediadas por infraestrutura que você controla, incluindo o ID. Para fluxos de suporte remoto que envolvem dispositivos pessoais, esse aspecto de soberania de dados importa mais do que o habitual.

A contrapartida é a de sempre: você mesmo executa e protege esse servidor — incluindo atualizações, monitoramento, backups e planejamento de capacidade —, e, para muitas equipes, manter os dados das sessões no próprio território vale muito a pena.

## Como começar

Baixe os builds para Android nos [releases oficiais do GitHub](https://github.com/rustdesk/rustdesk/releases) ou instale o pacote pelo [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/). O RustDesk [atualmente não é distribuído pela Google Play](/pt/blog/rustdesk-e-golpes-de-acesso-remoto-o-que-estamos-fazendo); o controlador para iOS continua disponível na App Store da Apple. Para controlar um celular, ele precisa ser Android — aceite o pedido de captura de tela e ative o serviço de acessibilidade RustDesk Input. Para controlar seus computadores a partir de um celular, qualquer um dos dois apps móveis funciona de imediato. Os planos atuais estão em [rustdesk.com/pricing](https://rustdesk.com/pricing), e [sales@rustdesk.com](mailto:sales@rustdesk.com) pode ajudar com o Server Pro. Quer ver antes? [Veja o RustDesk em ação](https://www.youtube.com/@rustdesk).
