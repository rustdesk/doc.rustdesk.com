---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-08T11:04:00Z
lang: 'pt'
translationKey: rustdesk-unattended-access-setup
draft: false
title: 'Acesso Não Assistido do RustDesk: Guia de Configuração'
excerpt: 'Configure o acesso não assistido do RustDesk do jeito certo: senha permanente, execução como serviço para iniciar com o sistema e implantação em escala com um cliente pré-configurado.'
image: ~/assets/images/blog/rustdesk-unattended-access-setup-og.webp
category: 'Implantação'
tags: ['RustDesk', 'Implantação', 'Acesso não assistido']
author: 'RustDesk Team'
slug: 'acesso-nao-assistido-do-rustdesk-guia-de-configuracao'
faq:
  - question: 'Como configuro o acesso não assistido no RustDesk?'
    answer: 'Em duas etapas: defina uma senha permanente em Configurações → Segurança e instale o RustDesk para que o serviço do sistema inicie com a máquina. O modo de aprovação padrão já aceita a senha permanente; no macOS, também é preciso conceder as permissões de Gravação de Tela e Acessibilidade. Com as duas etapas concluídas, você acessa a máquina online a qualquer momento, inclusive na tela de login do Windows, sem ninguém presente.'
  - question: 'Por que minha conexão do RustDesk cai quando o usuário faz logout?'
    answer: 'Porque o RustDesk está rodando como executável portátil, e não como serviço instalado. Um processo portátil vive dentro da sessão do usuário, então para no logout e, sem elevação, não consegue operar a área de trabalho segura do UAC do Windows. Instale o RustDesk e mantenha o serviço do sistema ativado; ele roda independentemente de qualquer usuário logado. A elevação portátil continua disponível para o suporte assistido no Windows.'
  - question: 'O acesso não assistido com senha permanente é seguro?'
    answer: 'Sim, quando bem configurado. Use uma senha permanente longa e exclusiva, diferente da senha de login do sistema operacional, ative a 2FA de conexão no dispositivo controlado e restrinja quem pode se conectar com uma lista de IPs ou de IDs permitidos e, no Server Pro, com o Controle de acesso. Mantenha os clientes atualizados e revise os logs. A auto-hospedagem coloca o rendezvous, o relay e o console em servidores que você opera.'
  - question: 'Posso implantar o acesso não assistido do RustDesk em vários computadores de uma só vez?'
    answer: 'Sim. Nos planos auto-hospedados Basic e superiores, o Gerador de Cliente Personalizado produz um instalador pré-configurado com o endereço do seu servidor, a chave e as configurações já embutidas, para que os usuários finais não precisem digitar nada. Distribua-o com a ferramenta de implantação que você já usa, e cada dispositivo instala o serviço e se registra automaticamente no seu servidor.'
  - question: 'O acesso não assistido funciona na tela de login do Windows?'
    answer: 'Sim, desde que o RustDesk esteja instalado como serviço. O serviço instalado inicia com o sistema antes de qualquer login de usuário, então você pode se conectar à tela de login, se autenticar e até disparar uma reinicialização e reconectar. O executável portátil não consegue fazer isso, porque só existe dentro de uma sessão de usuário.'

metadata:
  description: 'Acesso não assistido no RustDesk: senha permanente, execução como serviço para iniciar com o sistema, notas para Windows/macOS/Linux e implantação em frota.'
  keywords: 'acesso não assistido RustDesk, senha permanente RustDesk, RustDesk iniciar com o sistema, instalação de serviço RustDesk, configuração de acesso não assistido RustDesk, implantação em escala RustDesk, acesso remoto não assistido'
---

Acesso não assistido significa acessar um computador quando não há ninguém diante dele — um servidor no rack, um quiosque, o PC de um parente do outro lado do país. O RustDesk faz isso bem quando duas coisas estão no lugar: uma **senha permanente**, para que ninguém precise aprovar cada conexão, e o RustDesk rodando **como serviço**, para que esteja disponível antes do login e depois do logout. Este guia cobre as duas, as permissões de cada plataforma e como distribuir tudo em uma frota.

## A resposta curta

Defina uma **senha permanente** (Configurações → Segurança) e **instale o RustDesk como serviço do sistema**, que inicia com a máquina. O modo de aprovação padrão já aceita a senha permanente, então ninguém precisa clicar em aceitar; o serviço roda independentemente de qualquer usuário logado, então você pode se conectar a qualquer momento, inclusive na tela de login do Windows. O macOS também exige as permissões de Gravação de Tela e Acessibilidade. Para implantar em escala, gere um cliente pré-configurado para que cada máquina se instale já apontando para o seu servidor.

## Etapa 1: defina uma senha permanente

Por padrão, o RustDesk exibe uma senha de uso único rotativa, que a pessoa do lado remoto leria para você. Para o acesso não assistido, você a substitui por uma credencial fixa:

1. Abra o RustDesk na máquina que deseja acessar.
2. Vá em **Configurações → Segurança** (em versões mais antigas: a área de senha na tela principal).
3. Escolha **Configurar senha permanente** e insira um valor forte e exclusivo.

As configurações padrão já aceitam essa senha: as sessões são aceitas tanto por senha quanto por clique, e os dois tipos de senha são permitidos. Se alguém mudou o modo de aprovação para apenas clique ou o tipo de senha para apenas a de uso único, volte para **Aceitar sessões via senha** (ou **Aceitar sessões de ambos os modos**) e **Utilizar senha permanente** (ou **Utilizar ambas as senhas**). Em implantações gerenciadas, as [chaves de configuração](https://rustdesk.com/docs/pt/self-host/client-configuration/advanced-settings/#approve-mode) correspondentes são `approve-mode` (padrão `password-click`) e `verification-method` (padrão `use-both-passwords`).

A [documentação do cliente RustDesk](https://rustdesk.com/docs/pt/client/) descreve isso como o núcleo do acesso não assistido. Uma regra que vale reforçar: **não reutilize a senha de login do sistema operacional.** Use uma senha dedicada e de alta entropia para o RustDesk, para que o vazamento de uma credencial não comprometa a outra.

## Etapa 2: instale como serviço e inicie com o sistema

Esta é a etapa que muita gente esquece. Um `.exe` ou `.app` portátil roda dentro da sessão do usuário, então para quando o usuário faz logout e, no Windows, não consegue operar a área de trabalho segura do UAC sem elevação (a [elevação portátil](https://rustdesk.com/docs/pt/client/windows/windows-portable-elevation/) existe para o suporte assistido). Para ser realmente não assistido, o RustDesk precisa rodar como **serviço do sistema** em segundo plano.

- Execute o **instalador** do RustDesk (não a versão portátil) e conclua a instalação.
- Em **Configurações → Geral**, verifique se o **Serviço** está em execução — use **Iniciar** se ele aparecer como parado. Depois de instalado, o serviço inicia automaticamente com a máquina.

Rodando como serviço, o RustDesk carrega antes que alguém faça login, e é isso que permite conectar à **tela de login**, autenticar remotamente e até reiniciar e reconectar sem ninguém presente. O macOS e o Linux têm seus próprios requisitos de captura de tela e de sessão gráfica, descritos abaixo.

## Notas por plataforma

| Plataforma | O que fazer                                                    | Cuidados                                                                                                                                                                      |
| ---------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Windows    | Instale; mantenha o serviço em execução (inicia com a máquina) | O exe portátil para no logout e não consegue operar os avisos do UAC sem elevação; use o instalador                                                                          |
| macOS      | Instale, defina a senha permanente, conceda as permissões      | É preciso conceder Gravação de Tela e Acessibilidade; a captura na tela de login exige o helper instalado                                                                     |
| Linux      | Instale o pacote do serviço                                    | Os builds padrão com Wayland capturam a sessão logada; a [prévia de acesso não assistido](/pt/blog/unattended-remote-access-wayland-pt) adiciona acesso à tela de login (x86_64 Debian/Ubuntu) |
| Android    | Defina a senha permanente; ative a captura                     | A tela precisa estar ativa; conceda o consentimento de captura de tela (MediaProjection) e a permissão de entrada                                                             |

### Windows

O caminho mais simples. Instale, ative o serviço, defina a senha permanente e pronto. Como o serviço é executado na inicialização, o acesso não assistido à tela de login e após reinicializações funciona como esperado.

### macOS

O macOS condiciona a captura de tela e a entrada a permissões. Depois de instalar, abra **Ajustes do Sistema → Privacidade e Segurança** e conceda ao RustDesk tanto **Gravação de Tela** quanto **Acessibilidade**. Para o acesso na _janela de login_ (antes de qualquer login de usuário), o serviço/helper do RustDesk precisa estar instalado para conseguir capturar antes do login — caso contrário, você verá uma tela preta ali, o mesmo [problema de captura abordado em nosso guia sobre tela preta](/pt/blog/rustdesk-conectado-aguardando-imagem-guia-completo-de-correcao).

### Linux

Instale o RustDesk para que o serviço rode na inicialização. Os builds padrão do RustDesk capturam desktops Wayland, inclusive com vários monitores desde a versão 1.4.3, por meio do PipeWire e do `xdg-desktop-portal` em uma sessão com usuário logado. Para uma máquina que fica parada na tela de login, a [prévia de acesso não assistido no Wayland](/pt/blog/unattended-remote-access-wayland-pt), separada, para **sistemas x86_64 baseados em Debian/Ubuntu**, adiciona acesso não assistido e acesso à tela de login após uma reinicialização. Onde a distribuição ainda oferece essa opção, uma tela de login X11 é outra alternativa; em uma máquina headless, adicione um dummy plug ou um display virtual. Veja [RustDesk para Linux](/pt/blog/rustdesk-para-linux-o-desktop-remoto-de-codigo-aberto) para os detalhes.

## Etapa 3: implante em escala com um cliente pré-configurado

Configurar uma máquina manualmente é tranquilo. Configurar cinquenta, não. Nos **planos auto-hospedados Basic e superiores**, o **Gerador de Cliente Personalizado** do console web cria um instalador com **endereço do servidor, chave pública e configurações já embutidos**, para que os usuários finais não precisem digitar nada. Combinado com a ferramenta de implantação que você já usa (Política de Grupo, Intune, o RMM do seu MSP, um script shell), cada dispositivo instala o serviço e se registra no _seu_ servidor logo na primeira execução.

É aqui que a auto-hospedagem compensa para as equipes: a frota inteira se registra em servidores de ID/rendezvous e relay que você opera (veja [RustDesk para MSPs](/pt/blog/rustdesk-para-msps-uma-ferramenta-unica-autogerenciada-e-personalizavel)). Os planos do Server Pro licenciam **usuários com login e dispositivos gerenciados**. Os planos padrão incluem conexões simultâneas ilimitadas; apenas o [Customized V2](https://rustdesk.com/pricing#custom2) licencia um número definido de conexões simultâneas. Faça o orçamento pelo número de máquinas e de administradores — veja [o que conta como dispositivo gerenciado](/pt/blog/o-que-conta-como-dispositivo-gerenciado-no-rustdesk). Publique o console web [via HTTPS](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/faq/#configurar-https-para-console-web-manualmente) atrás de um proxy reverso.

## Tranque o acesso a sete chaves

O acesso não assistido é uma porta permanentemente aberta para dentro de uma máquina, então trate as credenciais com seriedade:

- **Senha permanente forte e exclusiva**, trocada periodicamente.
- **2FA de conexão** no dispositivo controlado e, no Server Pro, o [Controle de acesso](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/permissions/), que define quem pode alcançar quais dispositivos por meio de regras de usuários e de grupos de dispositivos (as permissões de grupos de usuários e de grupos de dispositivos são cumulativas). O catálogo de endereços compartilhado apenas organiza as entradas; ele não é um limite de acesso. A [Função de controle](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/control-role/) limita o que um técnico pode fazer dentro de uma sessão.
- **Auto-hospede o servidor**, para que o rendezvous, o relay, o console e os dados de gerenciamento armazenados rodem na infraestrutura que você escolher. O cliente RustDesk e o Server OSS são licenciados sob a AGPL, então o código de autenticação deles pode ser revisado; o Server Pro é um software de servidor comercial e proprietário, também auto-hospedado.

## Acesso não assistido que você realmente controla

Aponte uma frota sempre ligada para um servidor que você mesmo opera, e o acesso permanente a essas máquinas continua sendo intermediado por hardware que é seu, não por uma nuvem que você aluga. Para um acesso permanente, manter esse caminho em suas próprias mãos vale o pequeno esforço de configuração.
