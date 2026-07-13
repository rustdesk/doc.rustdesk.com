---
publishDate: 2026-07-02T14:43:00Z
lang: 'pt'
translationKey: 'what-counts-as-a-managed-device'
draft: false
title: 'O Que Conta Como Dispositivo Gerenciado no RustDesk?'
excerpt: 'Nos planos padrão do RustDesk, cada dispositivo que você configura para acessar conta uma única vez. O Customized V2 conta apenas os dispositivos atribuídos a um grupo ou usuário; dispositivos ad-hoc não são contados.'
image: '~/assets/images/blog/what-counts-as-a-managed-device-og.webp'
category: 'Preços'
tags: ['RustDesk', 'Preços', 'Licenciamento']
author: 'RustDesk Team'
slug: 'o-que-conta-como-dispositivo-gerenciado-no-rustdesk'
faq:
  - question: 'Como o RustDesk conta dispositivos gerenciados?'
    answer: 'Nos planos padrão, cada dispositivo que você configura para acessar conta como um dispositivo gerenciado, uma única vez — assistido ou não assistido, seja você conectando uma vez ou mil vezes. O Customized V2 conta de forma diferente: apenas os dispositivos atribuídos a um grupo de dispositivos ou a um usuário contam para o seu número de dispositivos licenciados.'
  - question: 'Como são contados os dispositivos de suporte pontual e ad-hoc?'
    answer: 'No plano Customized V2, apenas os dispositivos atribuídos a um grupo de dispositivos ou a um usuário contam como dispositivos gerenciados. Uma máquina à qual você se conecta uma única vez para um suporte espontâneo — e nunca atribui — não é contada para o seu número de dispositivos licenciados e não é desativada. Para trabalhos que são majoritariamente ad-hoc, isso faz do Customized V2 uma opção mais adequada do que contar cada endpoint.'

metadata:
  description: 'Como o RustDesk conta dispositivos gerenciados: os planos padrão contam cada dispositivo acessível uma vez; o Customized V2 conta apenas os dispositivos atribuídos a um grupo ou usuário.'
  keywords: 'o que conta como dispositivo gerenciado, contagem de dispositivos rustdesk, licenciamento rustdesk vs teamviewer, licença de dispositivo assistido vs não assistido, suporte ad-hoc rustdesk, licenciamento de suporte remoto para msp'
---

Se você está vindo do modelo por assento do TeamViewer, a regra de contagem nos planos padrão do RustDesk é refrescantemente simples: **cada dispositivo que você deseja acessar conta como um dispositivo gerenciado, contado uma única vez.** O plano **[Customized V2](https://rustdesk.com/pricing#custom2)** conta de forma diferente — apenas os dispositivos que você atribui a um grupo ou usuário contam — o que o torna a opção ideal para suporte ad-hoc intenso.

## A resposta curta

Nos planos padrão, um "dispositivo gerenciado" é qualquer máquina que você queira poder acessar, e o servidor conta cada uma delas uma única vez. Não importa:

- se o dispositivo é **assistido** (há alguém sentado nele) ou **não assistido** (um servidor headless, um quiosque ou uma estação de trabalho sempre ligada),
- se você vai se conectar **uma vez** ou **muitas vezes**,
- com que frequência você o acessa.

Se o seu trabalho é majoritariamente suporte espontâneo e pontual, a contagem mais restrita do **[Customized V2](https://rustdesk.com/pricing#custom2)**, abordada a seguir, foi projetada exatamente para esse caso.

## Em detalhes

O que _realmente_ muda as coisas é o plano. No plano **[Customized V2](https://rustdesk.com/pricing#custom2)**, a definição de dispositivo gerenciado é mais restrita: apenas os dispositivos que você **atribui a um grupo de dispositivos ou a um usuário** contam para o seu número de dispositivos licenciados. Máquinas que você acessa apenas para suporte pontual e ad-hoc — e nunca atribui — não são contadas, e não são desativadas. Se você preferir que esses dispositivos não atribuídos nem apareçam no console, a [configuração de cliente `register-device`](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#register-device) controla isso, e ela entra em vigor quando o número de conexões simultâneas licenciadas é 2 ou mais. Na prática, essa sessão de suporte rápido mostra apenas um ID e uma senha de uso único para uma única conexão assistida, de modo que uma interação genuinamente pontual nunca precisa de uma vaga permanente na sua frota. Se boa parte do seu trabalho se parece com isso, o Customized V2 costuma ser a opção mais adequada — envie um e-mail para [sales@rustdesk.com](mailto:sales@rustdesk.com) com o seu cenário para conhecer as condições atuais, ou consulte [rustdesk.com/pricing](https://rustdesk.com/pricing).

Por exemplo, imagine um [MSP](/pt/blog/rustdesk-para-msps-uma-ferramenta-unica-autogerenciada-e-personalizavel) com 20 técnicos dando suporte a cerca de 1.000 máquinas de clientes: ele precisaria satisfazer **ambas** as dimensões de licenciamento — usuários de login suficientes para os 20 técnicos e dispositivos gerenciados suficientes para as máquinas mantidas acessíveis. Para endpoints que são verdadeiramente chamados de suporte únicos, aplica-se a regra do Customized V2 descrita acima; os limites atuais estão em [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Quem faz essa pergunta

Qualquer pessoa que tente converter uma contagem de assentos do TeamViewer ou AnyDesk para as unidades do RustDesk esbarra primeiro nessa definição, porque as unidades de licenciamento não têm correspondência direta. Os planos pagos do RustDesk exigem capacidade tanto para as pessoas que fazem login quanto para os dispositivos mantidos sob gerenciamento.

## Perguntas relacionadas

- Licenciamento por usuário vs. por dispositivo, conexões simultâneas e contagem de dispositivos para o Server Pro: consulte [preços do RustDesk](https://rustdesk.com/pricing).
- [Vindo do TeamViewer — como o preço do RustDesk se compara para MSPs?](/pt/blog/rustdesk-vs-teamviewer-a-alternativa-auto-hospedada)

Está dimensionando uma frota e não tem certeza se os chamados de suporte pontuais devem entrar na sua contagem de dispositivos? Confira as condições atuais em [rustdesk.com/pricing](https://rustdesk.com/pricing) ou pergunte à equipe antes de comprar.
