---
publishDate: 2026-07-08T11:04:00Z
lang: 'pt'
translationKey: rustdesk-unattended-access-setup
draft: false
title: 'Acesso Não Assistido do RustDesk: Guia de Configuração'
excerpt: 'Configure o acesso não assistido do RustDesk da maneira correta: uma senha permanente, execução como serviço para iniciar com o sistema, e implantação em escala com um cliente pré-configurado.'
image: ~/assets/images/blog/rustdesk-unattended-access-setup-og.png
category: 'Implantação'
tags: ['RustDesk', 'Implantação', 'Acesso não assistido']
author: 'RustDesk Team'
slug: 'acesso-nao-assistido-do-rustdesk-guia-de-configuracao'
faq:
  - question: 'Como configuro o acesso não assistido no RustDesk?'
    answer: 'São necessárias duas coisas: definir uma senha permanente em Configurações, Segurança, para que você não precise que alguém aprove cada conexão, e instalar o RustDesk como serviço do sistema, para que ele seja executado antes do login e continue ativo após o logout. Com ambos configurados, você pode acessar a máquina a qualquer momento, inclusive na tela de login, sem que haja ninguém presente.'
  - question: 'Por que minha conexão do RustDesk cai quando o usuário faz logout?'
    answer: 'Isso acontece quando o RustDesk é executado como um executável portátil em vez de instalado como serviço. Uma sessão portátil termina quando o usuário faz logout ou quando aparece um prompt de UAC. Instale o RustDesk (em vez de executar o executável portátil) e mantenha o serviço ativado — o serviço instalado inicia com o sistema — para que ele seja executado em segundo plano, independentemente de qualquer usuário conectado, o que é o que torna o acesso não assistido confiável.'
  - question: 'O acesso não assistido com senha permanente é seguro?'
    answer: 'Pode ser implantado com segurança quando bem configurado. Use uma senha permanente longa e única, restrinja quem pode se conectar, ative os controles de identidade e acesso disponíveis, mantenha os clientes atualizados e revise os logs. A auto-hospedagem dá controle sobre os serviços do lado do servidor e os dados de implantação armazenados; o endpoint continua sendo responsável por proteger suas próprias credenciais locais.'
  - question: 'Posso implantar o acesso não assistido do RustDesk em vários computadores de uma só vez?'
    answer: 'Sim. Nos planos auto-hospedados Basic e superiores, o Gerador de Cliente Personalizado produz um instalador pré-configurado com o endereço do seu servidor, a chave e as configurações já embutidas, para que os usuários finais não precisem digitar nada. Distribua-o com sua ferramenta de implantação já existente, e cada dispositivo instala o serviço e se registra automaticamente no seu servidor.'
  - question: 'O acesso não assistido funciona na tela de login do Windows?'
    answer: 'Sim, desde que o RustDesk esteja instalado como serviço. O serviço instalado inicia com o sistema antes de qualquer login de usuário, permitindo que você se conecte à tela de login, se autentique e até mesmo reinicie e reconecte. Executar o executável portátil não permite isso, pois ele só existe dentro de uma sessão de usuário.'

metadata:
  description: 'Configure o acesso não assistido do RustDesk: senha permanente, execução como serviço para iniciar com o sistema, notas específicas para Windows/macOS/Linux e implantação em frotas de dispositivos.'
  keywords: 'acesso não assistido RustDesk, senha permanente RustDesk, RustDesk iniciar com o sistema, instalação de serviço RustDesk, configuração de acesso não assistido RustDesk, implantação em escala RustDesk, acesso remoto não assistido'
---

Acesso não assistido significa alcançar um computador quando não há ninguém na frente dele — um servidor em um rack, um quiosque, o PC de um familiar do outro lado do país. O RustDesk faz isso muito bem, mas somente se você configurar duas coisas corretamente: uma **senha permanente**, para que ninguém precise aprovar cada conexão, e o RustDesk em execução **como serviço**, para que fique disponível antes do login e depois do logout. Este guia aborda os dois pontos, além de como implantar essa configuração em toda uma frota de dispositivos.

## A resposta rápida

Defina uma **senha permanente** (Configurações → Segurança) e **instale o RustDesk como um serviço do sistema** — o serviço instalado inicia junto com a máquina. A senha elimina a necessidade de uma pessoa aceitar o prompt; o serviço faz o RustDesk funcionar de forma independente de qualquer usuário conectado, para que você possa se conectar a qualquer momento — inclusive na tela de login. Para implantar em grande escala, gere um cliente pré-configurado para que cada máquina se instale automaticamente e se registre no seu servidor.

## Etapa 1: defina uma senha permanente

Por padrão, o RustDesk exibe uma senha temporária rotativa que a pessoa do lado remoto leria para você. Para o acesso não assistido, você substitui isso por uma credencial fixa:

1. Abra o RustDesk na máquina que deseja acessar.
2. Vá em **Configurações → Segurança** (em versões mais antigas: a área de senha na tela principal).
3. Escolha **Definir senha permanente** e digite um valor forte e único.

A [documentação do cliente RustDesk](https://rustdesk.com/docs/en/client/) descreve isso como o núcleo do acesso não assistido. Uma regra que vale a pena reforçar: **não reutilize a senha de login do sistema operacional.** Use uma senha dedicada e de alta entropia para o RustDesk, para que o vazamento de uma credencial não comprometa a outra.

## Etapa 2: instale como serviço e inicie com o sistema

Esta é a etapa que costuma passar despercebida. Se você apenas executar o `.exe` ou `.app` portátil, a sessão **termina no momento em que o usuário faz logout ou surge um prompt de UAC/permissão** — porque esse processo só existe dentro da sessão do usuário. Para ser verdadeiramente não assistido, o RustDesk precisa ser executado como um **serviço do sistema** em segundo plano.

- Execute o **instalador** do RustDesk (não a versão portátil) e conclua a instalação.
- Em **Configurações → Geral**, verifique se o **Serviço** está em execução — use **Iniciar** se estiver marcado como parado. Depois de instalado, o serviço inicia automaticamente com a máquina.

Assim que o RustDesk passa a rodar como serviço, ele é carregado antes de qualquer login, o que permite conectar-se à **tela de login**, autenticar remotamente e até reiniciar e reconectar sem ninguém presente. Artigos da comunidade sobre a [configuração correta do serviço no Windows](https://www.smolkin.org/blog/2026/03/rustdesk-unattended-service-windows.html) reforçam a mesma distinção: versão portátil equivale a acesso somente assistido; serviço instalado equivale a não assistido.

## Notas por plataforma

| Plataforma | O que fazer                                                    | Cuidados                                                                                                                                                                 |
| ---------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Windows    | Instale; mantenha o serviço em execução (inicia com a máquina) | O executável portátil perde a sessão no logout ou em prompts de UAC; use o instalador                                                                                    |
| macOS      | Instale, defina a senha permanente, conceda as permissões      | É preciso conceder Gravação de Tela e Acessibilidade; a captura na tela de login exige o helper instalado                                                                |
| Linux      | Instale o pacote de serviço                                    | O Wayland precisa de uma sessão ativa; para pré-login use a configuração de display virtual sem monitor (headless), ou X11 onde a distribuição ainda oferecer essa opção |
| Android    | Defina a senha permanente; ative a captura                     | A tela precisa estar ativa; conceda o consentimento de captura de tela (MediaProjection) e a permissão de entrada                                                        |

### Windows

O caminho mais simples. Instale, ative o serviço, defina a senha permanente e pronto. Como o serviço é executado na inicialização, o acesso não assistido à tela de login e após reinicializações funciona como esperado.

### macOS

O macOS restringe a captura de tela e a entrada por trás de permissões. Depois de instalar, abra **Configurações do Sistema → Privacidade e Segurança** e conceda ao RustDesk tanto **Gravação de Tela** quanto **Acessibilidade**. Para o acesso na _tela de login_ (antes de qualquer login de usuário), o serviço/helper do RustDesk precisa estar instalado para conseguir capturar antes do login — caso contrário, você verá uma tela preta ali, o mesmo [problema de captura abordado em nosso guia sobre tela preta](/pt/blog/rustdesk-conectado-aguardando-imagem-guia-completo-de-correcao).

### Linux

Instale o RustDesk para que o componente de serviço seja executado na inicialização. Em uma máquina parada na tela de login (greeter), o Wayland ainda não consegue capturar o greeter — uma limitação do design do Wayland (não uma limitação do RustDesk) que a equipe está trabalhando ativamente para resolver ([PR #15420](https://github.com/rustdesk/rustdesk/pull/15420)). Em uma máquina headless, use a configuração de display virtual; em um desktop, uma sessão X11/Xorg ainda resolve isso onde a distribuição oferecer essa opção, embora várias estejam migrando para Wayland exclusivamente. Veja [RustDesk para Linux](/pt/blog/rustdesk-para-linux-o-desktop-remoto-de-codigo-aberto) para mais detalhes.

## Etapa 3: implante em escala com um cliente pré-configurado

Configurar uma máquina manualmente é tranquilo. Configurar cinquenta, não. Nos **planos auto-hospedados Basic e superiores**, o **Gerador de Cliente Personalizado** no console web cria um instalador com **endereço do servidor, chave pública e configurações já embutidas**, para que os usuários finais não precisem digitar nada. Combinado com sua ferramenta de implantação já existente (Group Policy, Intune, uma RMM de MSP, um script shell), cada dispositivo instala o serviço e se registra no _seu_ servidor logo na primeira execução.

É aqui que a auto-hospedagem compensa para as equipes: você obtém uma [frota não assistida totalmente sob seu controle](/pt/blog/rustdesk-para-msps-uma-ferramenta-unica-autogerenciada-e-personalizavel), sem cobrança na nuvem por usuário decidindo quantos endpoints você está "autorizado" a alcançar. Configure o gerador pelo [console web na porta 21114](https://rustdesk.com/docs). Observe que o RustDesk é licenciado por **usuário de login e dispositivo gerenciado**, não por sessão simultânea, então planeje o orçamento de acordo com quantas máquinas e administradores você tem — veja [o que conta como um dispositivo gerenciado](/pt/blog/o-que-conta-como-dispositivo-gerenciado-no-rustdesk).

## Tranque o acesso a sete chaves

O acesso não assistido é uma porta permanentemente aberta para dentro de uma máquina, então trate as credenciais com seriedade:

- **Senha permanente forte e única**, trocada periodicamente.
- **Autenticação de dois fatores** e, no Pro, **controles de acesso**, para que somente contas autorizadas possam se conectar. Nosso artigo sobre [controle de acesso por usuário e grupos de dispositivos](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/permissions/) explica como delimitar quem alcança o quê.
- **Auto-hospede os serviços do lado do servidor** quando precisar de controle sobre rendezvous, relay, console e dados de implantação armazenados. As credenciais do endpoint continuam sendo responsabilidade de segurança do próprio endpoint. Como o RustDesk é open source sob a licença AGPL, sua implementação de autenticação pode ser auditada.

## Acesso não assistido que você realmente controla

Aponte uma frota sempre ativa para um servidor que você mesmo administra, e o acesso permanente a essas máquinas continua sendo intermediado por hardware que é seu, não por uma nuvem que você aluga. Para um acesso permanente, manter esse caminho em suas próprias mãos vale o pequeno esforço de configuração.
