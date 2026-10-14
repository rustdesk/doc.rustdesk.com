---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-09T10:47:00Z
lang: 'pt'
translationKey: 'rustdesk-scale-50000-200000-devices'
draft: false
title: 'O RustDesk consegue escalar para 200.000 dispositivos?'
excerpt: 'Veja o contexto operacional do próprio RustDesk para planejar frotas grandes, o que a observação do servidor público mostra e o que uma implantação auto-hospedada ainda precisa validar.'
image: ~/assets/images/blog/rustdesk-scale-50000-200000-devices-og.webp
category: 'Implantação'
tags: ['RustDesk', 'Implantação', 'Empresa']
author: 'RustDesk Team'
slug: 'o-rustdesk-consegue-escalar-para-200-000-dispositivos'
faq:
  - question: 'Quantos dispositivos um servidor RustDesk auto-hospedado suporta?'
    answer: 'O servidor público do RustDesk registrou mais de dois milhões de endpoints online em um único host com 12 núcleos e 32 GB em 7 de julho de 2026 (telemetria interna, não um benchmark auditado). No RustDesk Server Pro, trate 200.000 dispositivos como meta de planejamento e valide em um piloto a carga do banco de dados, do console e do relay.'
  - question: 'O que é preciso ajustar para chegar a 200.000 dispositivos?'
    answer: 'Gravações no banco de dados, capacidade do relay e carga do console são o que mais pesa com 200.000 dispositivos. Faça testes de carga do RustDesk Server Pro em etapas, cobrindo a rotatividade de dispositivos online, as sessões remotas simultâneas, a banda do relay, o cache, o desempenho de gravação do banco de dados e a atividade do console de gerenciamento, com a sua própria carga de trabalho, e não apenas a presença de endpoints.'
  - question: 'O RustDesk Server Pro oferece alta disponibilidade ou balanceamento de carga?'
    answer: 'Sim, para os relays: o RustDesk Server Pro oferece suporte a vários servidores relay distribuídos por região, e os relays hbbr não precisam de licença. Uma licença Pro fica vinculada a um único servidor hbbs (ID/rendezvous), então a alta disponibilidade do servidor de ID e do banco de dados é uma questão de projeto; planeje o failover e a recuperação com o RustDesk antes da implantação.'

metadata:
  description: 'Veja o contexto operacional do próprio RustDesk para planejar 200.000 dispositivos e as variáveis de carga que um Server Pro auto-hospedado precisa validar.'
  keywords: 'rustdesk escalar 200000 dispositivos, rustdesk 50000 dispositivos, escalabilidade do servidor auto-hospedado rustdesk, implantação corporativa rustdesk, capacidade do rustdesk server pro, acesso remoto para grandes frotas de dispositivos'
---

A telemetria interna do RustDesk registrou **mais de dois milhões de endpoints online** em um único host do servidor público com **CPU de 12 núcleos e 32 GB de RAM** em 7 de julho de 2026.

Duas ressalvas definem o alcance desse número. Primeiro, "endpoints online" são os dispositivos que constavam como online naquele momento, e não dois milhões de sessões de controle remoto simultâneas. Segundo, é uma observação interna de produção, e não um benchmark auditado de forma independente nem uma garantia do Server Pro: uma implantação do Server Pro acrescenta gravações no banco de dados, atividade de auditoria, uso do console, processamento de políticas e tráfego de relay.

## A resposta curta

**200.000 dispositivos online é uma meta de planejamento realista para o Server Pro.** A observação do servidor público citada acima fica uma ordem de grandeza além disso, em um único host com 12 núcleos e 32 GB. O que você valida em um piloto é a carga que o Server Pro acrescenta à presença dos endpoints: rotatividade de dispositivos, políticas, gravações de auditoria, uso do console e sessões simultâneas via relay.

## Em detalhe

Perguntas de escala estão entre as mais comuns que ouvimos de equipes de TI que estão saindo do TeamViewer ou do AnyDesk, principalmente as que planejam frotas de dezenas ou centenas de milhares de dispositivos. A resposta depende de quantos dispositivos ficam online, de com que frequência o estado deles muda, de quantas sessões remotas rodam ao mesmo tempo e de quanto tráfego passa pelo relay.

Em uma implantação do Server Pro, valide as partes que o número do servidor público não cobre. O cache e o desempenho de gravação do banco de dados importam à medida que os dispositivos entram e saem. A banda e a CPU do relay dependem da quantidade, da duração, da resolução e do codec das sessões simultâneas via relay. Consultas no console, retenção de auditoria, grupos de dispositivos, políticas e integrações acrescentam uma carga que a simples presença de endpoints não mede. Inclua em um teste de carga representativo o número de dispositivos online pretendido, a rotatividade de conexões, as sessões simultâneas diretas e via relay, a retenção do banco de dados e a atividade administrativa.

Para um piloto do Server Pro que possa ser repetido, registre as versões do cliente e do servidor, o hardware e a localização do banco de dados e dos relays. Aumente em etapas a presença de dispositivos online e a rotatividade enquanto executa as consultas no console, as atualizações de políticas e as gravações de auditoria esperadas. Meça o sucesso de registro e reconexão, o tempo de estabelecimento da conexão, a latência do banco de dados, CPU/RAM, o crescimento do disco e a vazão do relay. Inclua o pico de sessões simultâneas e um exercício de recuperação; mantenha essas medições separadas da contagem de endpoints online.

Alta disponibilidade e balanceamento de carga merecem o mesmo tratamento. Os relays escalam horizontalmente: você pode executar vários, distribuí-los por região, e os relays hbbr não precisam de licença. Uma licença Pro fica vinculada a um único servidor hbbs, então projete explicitamente o failover do servidor de ID e do banco de dados e revise-o com o RustDesk no caso de frotas muito grandes.

Depois, dimensione o licenciamento: o Server Pro licencia usuários com login e dispositivos gerenciados, e os planos padrão incluem conexões simultâneas ilimitadas. Escolha o plano para a sua frota em [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Quem faz essa pergunta

Arquitetos de frotas que planejam implantações de vários anos — em empresas, grandes [MSPs](/pt/blog/rustdesk-para-msps-uma-ferramenta-unica-autogerenciada-e-personalizavel) e programas de TI do setor público — colocam essa questão perto do topo da lista de due diligence. Esses compradores costumam estar deixando uma ferramenta comercial por motivos de custo ou de soberania de dados e precisam ter confiança de que uma plataforma auto-hospedada vai crescer com eles, em vez de bater no teto no meio do contrato.

## Perguntas relacionadas

- Limites de conexões simultâneas e licenciamento para grandes quantidades de dispositivos: veja os [preços do RustDesk](https://rustdesk.com/pricing).
- [Posso migrar uma frota existente do TeamViewer ou do AnyDesk para o RustDesk?](/pt/blog/a-melhor-alternativa-auto-hospedada-ao-teamviewer)

Está planejando uma implantação em grande escala? Fale com a [equipe do RustDesk](mailto:sales@rustdesk.com) para dimensionar uma implantação auto-hospedada de acordo com o número de dispositivos, os requisitos de desempenho e o cronograma de crescimento da sua organização.
