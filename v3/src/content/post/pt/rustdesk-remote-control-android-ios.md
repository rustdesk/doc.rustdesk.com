---
publishDate: 2026-07-07T17:09:00Z
lang: 'pt'
translationKey: 'rustdesk-remote-control-android-ios'
draft: false
title: 'Controle Remoto RustDesk no Android e iOS: O Que Funciona'
excerpt: 'Como o RustDesk controla remotamente telefones Android, transforma iPhones e iPads em controladores, e por que nenhum fornecedor consegue controlar remotamente o iOS.'
image: '~/assets/images/blog/rustdesk-remote-control-android-ios-og.png'
category: 'Guias'
tags: ['RustDesk', 'Móvel']
author: 'RustDesk Team'
slug: 'controle-remoto-rustdesk-no-android-e-ios-o-que-funciona'
faq:
  - question: 'Posso controlar remotamente um telefone Android com o RustDesk?'
    answer: 'Sim. No dispositivo Android, você inicia o serviço de captura de tela do RustDesk (que exige uma solicitação de consentimento na tela) e ativa o serviço de acessibilidade RustDesk Input para que toques e deslizamentos remotos sejam injetados. O compartilhamento de tela exige Android 6 ou superior; compartilhar o áudio interno do sistema exige Android 10 ou superior. Alguns fabricantes restringem a acessibilidade para aplicativos instalados fora da loja oficial (sideload), portanto pode ser necessário permitir primeiro as configurações restritas.'
  - question: 'O RustDesk consegue controlar um iPhone ou iPad?'
    answer: 'Não, e isso vale para qualquer aplicativo de acesso remoto — essa é uma limitação da plataforma iOS, e não do RustDesk. As restrições da Apple em relação à gravação de tela e à execução em segundo plano não permitem que um aplicativo de terceiros seja controlado remotamente como host, portanto nenhum fornecedor oferece controle remoto verdadeiro sobre um iPhone ou iPad. O que o aplicativo iOS/iPadOS do RustDesk faz muito bem é funcionar como controlador: use um iPhone ou iPad para controlar suas máquinas Windows, macOS, Linux e Android.'
  - question: 'Posso usar meu telefone para controlar meu computador?'
    answer: 'Sim. Os aplicativos RustDesk para Android e iOS funcionam como clientes controladores completos. Você pode se conectar a partir de qualquer um deles a uma máquina Windows, macOS ou Linux e controlá-la com um touchpad na tela ou modo mouse. Este é o caso de uso móvel mais confiável e funciona da mesma forma que o cliente de desktop.'
  - question: 'Os aplicativos móveis do RustDesk são de código aberto?'
    answer: 'Sim. Os clientes móveis compartilham a mesma base de código aberto AGPL do cliente de desktop. As compilações para Android estão disponíveis nos lançamentos oficiais do RustDesk no GitHub e no F-Droid como com.carriez.flutter_hbb; o controlador iOS está disponível na Apple App Store. Atualmente, o RustDesk não é distribuído pela Google Play.'
  - question: 'Posso deixar um dispositivo Android configurado para controle não assistido?'
    answer: 'Parcialmente. O RustDesk consegue manter seu serviço de captura ativo com uma notificação em primeiro plano e reiniciá-lo na inicialização, mas o consentimento de captura de tela, o teclado bloqueado na tela de bloqueio e a necessidade de desbloquear manualmente após uma reinicialização tornam o controle Android verdadeiramente não assistido pouco confiável. Trate o controle Android como suporte assistido, e não como acesso configurar-e-esquecer.'
metadata:
  description: 'RustDesk no Android e iOS: controle o Android remotamente, use qualquer um dos aplicativos móveis para operar seus desktops, e o que a Apple permite no iPhone e iPad.'
  keywords: 'controle remoto RustDesk Android iOS, controlar telefone remotamente com RustDesk, RustDesk Android host, controlar Android remotamente, RustDesk iOS, controlar iPhone remotamente, aplicativo móvel RustDesk'
---

"Posso acessar remotamente um telefone?" é uma das perguntas mais frequentes que o RustDesk recebe, e ela merece uma resposta honesta, não uma resposta de marketing. Resumindo: o RustDesk realmente consegue controlar um dispositivo Android, os dois aplicativos móveis funcionam como excelentes _controladores_ para os seus computadores e — a parte que ninguém quer ouvir — atualmente não é possível acessar remotamente um iPhone ou iPad. Este guia explica exatamente o que funciona, o que não funciona e por quê, para que você possa planejar com base em capacidades reais, e não em suposições.

Assim como o restante do RustDesk, os dois aplicativos móveis são de código aberto sob a licença AGPL. As compilações para Android estão disponíveis nos [lançamentos oficiais do RustDesk no GitHub](https://github.com/rustdesk/rustdesk/releases) e no [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) como `com.carriez.flutter_hbb`, com ampla cobertura de dispositivos — compilações arm64, arm32 e x86_64, além de um APK universal; o controlador iOS está na App Store. O RustDesk [atualmente não é distribuído pela Google Play](/pt/blog/rustdesk-e-golpes-de-acesso-remoto-o-que-estamos-fazendo): o aplicativo Android foi retirado voluntariamente da loja em resposta a abusos por golpistas. Mesma base de código, mesmo núcleo auditável.

## Resumo em uma tabela

| Cenário                                                     | Compatível? | Observações                                                         |
| ----------------------------------------------------------- | ----------- | ------------------------------------------------------------------- |
| Controlar um PC Windows/macOS/Linux **a partir do** Android | Sim         | Controlador completo; touchpad ou modo mouse                        |
| Controlar um PC **a partir do** iPhone/iPad                 | Sim         | Controlador completo                                                |
| Controlar **um dispositivo Android** (como host)            | Sim         | Requer consentimento de captura de tela + serviço de acessibilidade |
| Controlar **um dispositivo iOS** (iPhone/iPad como host)    | **Não**     | Restrições da Apple; não implementado                               |
| Visualizar remotamente a tela de um iOS                     | **Não**     | Não suportado atualmente                                            |

O restante do artigo é apenas o detalhamento por trás de cada linha.

## Usando seu telefone como controlador (a parte fácil)

Este é o caso de uso que "simplesmente funciona". Instale o RustDesk no seu dispositivo Android ou iOS e ele se torna um controlador completo para qualquer host RustDesk — seu desktop Windows, seu [Mac](https://rustdesk.com/docs/pt/client/mac/), sua [máquina Linux](/pt/blog/rustdesk-para-linux-o-desktop-remoto-de-codigo-aberto). Digite o ID de destino e a senha, e você obtém a tela remota com um touchpad na tela, um modo mouse, um teclado virtual e transferência de arquivos. Nada de especial é exigido do lado do telefone, porque você está apenas _enviando_ controle, e não sendo controlado.

Se o seu trabalho é "consertar um computador de onde quer que eu esteja", um telefone rodando RustDesk é uma ferramenta genuinamente boa, e se comporta da mesma forma que o cliente de desktop.

## Controlando um dispositivo Android (como host)

É aqui que o RustDesk faz algo que a maioria das ferramentas de acesso remoto não consegue: transformar um telefone ou tablet Android em um host controlável. Dois subsistemas do Android tornam isso possível, e ambos exigem configuração explícita.

**Captura de tela.** O RustDesk usa a API `MediaProjection` do Android para capturar a exibição da tela. Ao tocar em **Iniciar Serviço** no aplicativo, o Android exibe uma solicitação de consentimento pedindo permissão para gravar a tela — essa caixa de diálogo é obrigatória e não pode ser contornada silenciosamente. O compartilhamento de tela exige **Android 6 ou superior**; capturar o **áudio interno do sistema** do telefone exige **Android 10 ou superior**. Até que essa permissão de captura seja concedida, nenhuma conexão de entrada consegue ver nada.

**Entrada remota.** Ver a tela não é o mesmo que controlá-la. Para injetar toques, deslizamentos e eventos de tecla, o RustDesk registra um [`AccessibilityService`](https://deepwiki.com/rustdesk/rustdesk/6.5-mobile-platforms) chamado **RustDesk Input**, que você ativa em **Configurações → Acessibilidade**. Ele traduz eventos remotos de mouse e gestos em gestos do Android e pode acionar ações do sistema como Voltar, Início e Recentes.

**Mantendo-se ativo.** O RustDesk mantém uma notificação de serviço em primeiro plano e, opcionalmente, uma janela flutuante sobreposta para que o Android não encerre o processo de captura, e pode reiniciar o serviço na inicialização.

Agora as limitações, porque o modelo de segurança do Android impõe restrições reais:

- **É necessário consentimento para iniciar a captura.** Alguém (ou uma aprovação prévia) precisa aceitar a solicitação de gravação de tela.
- **A tela de bloqueio impede a entrada.** O Android não permite que um serviço de acessibilidade digite na tela de bloqueio segura, então, se o dispositivo travar, geralmente não é possível inserir o código de desbloqueio remotamente — uma limitação [documentada por usuários que testaram na prática](https://blog.wirelessmoves.com/2025/10/remote-android-support-with-rustdesk-part-1.html).
- **Reinicializações exigem desbloqueio manual.** Após uma reinicialização, o dispositivo geralmente precisa ser desbloqueado pessoalmente antes que o controle seja retomado.
- **Restrições de fabricantes (OEM).** Em algumas versões de determinados fabricantes, a opção de acessibilidade **RustDesk Input** fica desabilitada para aplicativos instalados fora da loja oficial (sideload) até que você conceda as "configurações restritas" (toque e segure o ícone do aplicativo → Informações do app → permitir configurações restritas). Gerenciadores de bateria agressivos de certos fabricantes também podem encerrar o serviço em segundo plano.

A conclusão prática: o controle Android é excelente para **suporte assistido** — ajudar alguém que está segurando o próprio telefone — enquanto o acesso **não assistido e configurar-e-esquecer** é uma tarefa que o host de desktop faz melhor, porque os sistemas operacionais móveis restringem o acesso persistente em segundo plano. Combine a plataforma com a tarefa certa. (Para desktops, o [guia de configuração de acesso não assistido](/pt/blog/acesso-nao-assistido-do-rustdesk-guia-de-configuracao) cobre o caso real.)

## Controlando um dispositivo iOS: o que a Apple permite

Esta é a parte que é perguntada constantemente e respondida de forma vaga em outros lugares, então vamos ser diretos: **nenhum aplicativo de acesso remoto consegue controlar remotamente um iPhone ou iPad — o RustDesk incluído.** No iOS, o aplicativo RustDesk é um controlador competente — ele se conecta _para fora_ para controlar seus computadores — mas a Apple não permite que nenhum aplicativo de terceiros atue como host controlado remotamente no iOS.

O motivo é a Apple. O iOS restringe fortemente a execução em segundo plano, a gravação de tela e qualquer forma de injeção sintética de entrada, razão pela qual nenhum aplicativo de terceiros oferece um _controle_ remoto verdadeiro de um iPhone. Isso não é uma falha do RustDesk, mas sim uma barreira da plataforma — o suporte a host iOS tem sido repetidamente [solicitado como recurso no GitHub](https://github.com/rustdesk/rustdesk/discussions/4839) e permanece não implementado. As APIs de transmissão da Apple (ReplayKit) podem, em princípio, transmitir uma tela, mas isso é uma transmissão iniciada pelo próprio aplicativo, não algo que uma parte remota possa capturar — portanto, a visualização remota de iOS por terceiros continua indisponível, e o controle remoto completo do iOS a partir de outro dispositivo não é algo que o sistema operacional permite a terceiros.

Então, se a sua necessidade é especificamente "acessar remotamente um iPhone", nenhuma ferramenta de acesso remoto atual consegue fazer isso — é uma barreira da plataforma iOS que todo fornecedor enfrenta, não uma lacuna do RustDesk, como observado em nossa comparação [RustDesk vs AnyDesk](/pt/blog/rustdesk-vs-anydesk-area-de-trabalho-remota-auto-hospedada-e-de-codigo). Preferimos dizer isso logo de início a deixar você descobrir depois de configurar tudo.

## Uma nota sobre privacidade e auto-hospedagem

Como os aplicativos móveis são de código aberto e falam o mesmo protocolo que o cliente de desktop, você pode apontá-los para o seu próprio [servidor RustDesk auto-hospedado](/pt/blog/por-que-auto-hospedar-seu-software-de-area-de-trabalho-remota) em vez da rede pública — assim, as sessões móveis são intermediadas por infraestrutura que você controla, incluindo o ID. Para fluxos de trabalho de suporte remoto que envolvem dispositivos pessoais, esse aspecto de soberania de dados importa mais do que o habitual.

A contrapartida é sempre a mesma: você mesmo executa e protege esse servidor — uma tarefa modesta, dados os requisitos baixos — e, para muitas equipes, manter os dados das sessões em seu próprio território vale bastante a pena.

## Como começar

Baixe as compilações para Android nos [lançamentos oficiais do GitHub](https://github.com/rustdesk/rustdesk/releases) ou instale o pacote pelo [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/). O RustDesk [atualmente não é distribuído pela Google Play](/pt/blog/rustdesk-e-golpes-de-acesso-remoto-o-que-estamos-fazendo); o controlador iOS continua disponível na App Store da Apple. Para controlar um telefone, esse telefone precisa ser Android — aceite a solicitação de captura de tela e ative o serviço de acessibilidade RustDesk Input. Para controlar seus computadores a partir de um telefone, qualquer um dos dois aplicativos móveis funciona imediatamente. Os planos atuais estão em [rustdesk.com/pricing](https://rustdesk.com/pricing), e [sales@rustdesk.com](mailto:sales@rustdesk.com) pode ajudar com o Server Pro. Quer ver antes? [Veja o RustDesk em ação](https://www.youtube.com/@rustdesk).
