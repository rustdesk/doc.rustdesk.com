---
publishDate: 2026-07-07T18:21:00Z
lang: 'pt'
translationKey: 'why-self-host-remote-desktop-software'
draft: false
title: 'Por Que Auto-Hospedar Seu Software de Área de Trabalho Remota'
excerpt: 'Por que as equipes que estão deixando o TeamViewer e o AnyDesk optam por hospedar o próprio acesso remoto: controle dos dados, custo previsível e nenhuma nuvem no meio do caminho.'
image: ~/assets/images/blog/why-self-host-remote-desktop-software-og.webp
category: 'Guias'
tags: ['RustDesk', 'Auto-hospedagem']
author: 'RustDesk Team'
slug: 'por-que-auto-hospedar-seu-software-de-area-de-trabalho-remota'
faq:
  - question: 'O que significa auto-hospedar um software de área de trabalho remota?'
    answer: 'Significa executar, em uma infraestrutura sob seu controle, o servidor que coordena as conexões e retransmite o tráfego quando a conectividade direta falha, em vez de rotear as sessões pela nuvem de um fornecedor. Com o RustDesk Server Pro, o servidor de ID/rendezvous, o relay, o console e os dados de implantação armazenados são executados na sua própria infraestrutura.'
  - question: 'O que realmente envolve executar um servidor RustDesk auto-hospedado?'
    answer: 'Os requisitos de hardware são baixos e a maior parte do trabalho é feita apenas uma vez: você provisiona um host Linux pequeno, abre somente as portas que usa (os clientes nativos exigem TCP 21115-21117 e UDP 21116), configura o TLS em um proxy reverso e agenda backups; depois disso, é apenas aplicação de patches e monitoramento de rotina, com o suporte do RustDesk disponível caso você encontre algum problema.'
  - question: 'A auto-hospedagem ajuda com a residência de dados e a conformidade com o GDPR?'
    answer: 'Sim — ela oferece controle real nesse aspecto: você escolhe onde o rendezvous, o relay, o console e os dados dos dispositivos são executados. No entanto, trata-se de uma base, não de uma garantia absoluta, porque as conexões diretas ainda trafegam entre os endpoints — então manter o tráfego dentro do país e cumprir as obrigações do GDPR também depende de como você roteia e opera a implantação.'
  - question: 'A auto-hospedagem é indicada para todas as equipes?'
    answer: 'A auto-hospedagem é indicada para equipes que querem controle sobre seus dados e sua infraestrutura. Ela envolve, sim, executar um servidor — algo modesto, e cuja configuração é, em grande parte, feita apenas uma vez — então, se você preferir não executar servidor algum, um SaaS gerenciado é o modelo alternativo. Mas o RustDesk Server Pro é auto-hospedado por design, justamente para que seus dados permaneçam na sua própria infraestrutura, sem nenhuma nuvem de fornecedor no meio do caminho — e, para equipes que já operam infraestrutura, essa propriedade é exatamente o ponto principal.'

metadata:
  description: 'Os argumentos a favor da auto-hospedagem de software de área de trabalho remota: controle dos dados, custo previsível, nenhuma dependência de fornecedor e nenhuma indisponibilidade de nuvem. O RustDesk como exemplo concreto.'
  keywords: 'por que auto-hospedar área de trabalho remota, benefícios da área de trabalho remota auto-hospedada, acesso remoto on-premise, área de trabalho remota sem nuvem de fornecedor'
---

A maioria das ferramentas de área de trabalho remota é vendida de uma única forma: como assinatura em nuvem, com os servidores do fornecedor intermediando — e muitas vezes retransmitindo — cada sessão. Existe outra forma de operar o acesso remoto, e ela não é nova — é apenas menos divulgada, porque não vem acompanhada de uma assinatura recorrente em nuvem. É a decisão de **auto-hospedar o seu software de área de trabalho remota**: executar, em uma infraestrutura sob seu controle, o servidor que coordena as conexões e retransmite o tráfego quando a conectividade direta falha. Este artigo defende esse modelo e usa o RustDesk como exemplo concreto.

## O que "auto-hospedar a área de trabalho remota" realmente significa

O preço da comodidade de depender apenas da nuvem é que a lista dos seus dispositivos, os metadados das suas conexões e, às vezes, o próprio tráfego das suas sessões passam por um terceiro, sujeitos à disponibilidade, aos preços e à postura de segurança desse terceiro.

A auto-hospedagem inverte essa equação. Com o RustDesk Server Pro, o servidor de ID/rendezvous, o relay, o console e os dados de implantação armazenados são executados na **sua infraestrutura**. As sessões diretas continuam fluindo entre os endpoints; as sessões retransmitidas usam o relay configurado por você. O RustDesk é [código aberto (AGPL)](https://github.com/rustdesk/rustdesk) e o servidor gratuito da comunidade pode ser executado indefinidamente.

## Somente nuvem x auto-hospedado, em resumo

|                                   | Ferramenta típica somente em nuvem    | Auto-hospedado (RustDesk Server Pro)                                                                                                                                                               |
| --------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Onde as sessões são intermediadas | Nuvem do fornecedor                   | Seu servidor local (on-prem) ou VPS                                                                                                                                                                |
| Residência dos dados              | Controlada pelo fornecedor            | Os serviços do lado do servidor são executados em infraestrutura sob seu controle; [as rotas dos endpoints ainda importam](/pt/blog/soberania-de-dados-em-desktop-remoto-and-gdpr-auto-hospedagem) |
| Limites de conexões simultâneas   | Frequentemente por canal/assento      | Planos padrão ilimitados; Customized V2 medido                                                                                                                                                     |
| Modelo de preço                   | Assinatura em nuvem por assento/canal | [Por usuário de login + por dispositivo gerenciado](https://rustdesk.com/pricing) ([preços](https://rustdesk.com/pricing))                                                                         |
| Código-fonte                      | Fechado                               | Código aberto (AGPL), auditável                                                                                                                                                                    |
| Dependência de indisponibilidade  | Disponibilidade do fornecedor         | Suas próprias operações                                                                                                                                                                            |
| Quem executa o servidor           | Fornecedor                            | Você                                                                                                                                                                                               |

A auto-hospedagem não significa abrir mão de escala ou de capacidade. O RustDesk publica [orientações de planejamento para grandes frotas](/pt/blog/o-rustdesk-consegue-escalar-para-200-000-dispositivos) voltadas a equipes que precisam dar suporte a parques maiores. Para [MSPs](/pt/blog/rustdesk-para-msps-uma-ferramenta-unica-autogerenciada-e-personalizavel) e equipes internas de TI, há um [console web auto-hospedado](https://rustdesk.com/docs), um gerador de clientes com marca personalizada e [grupos de dispositivos além de um catálogo de endereços compartilhado](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/permissions/) para controle de acesso por usuário. O [LDAP/SSO](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/ldap/) (OIDC) está disponível a partir do plano Basic.

## O que realmente envolve executar o servidor

O controle vem acompanhado de algum trabalho operacional — menos do que a maioria das equipes espera, e, em grande parte, feito apenas uma vez. Eis a realidade concreta:

- **Provisione um host.** Os requisitos de hardware do RustDesk são baixos, então uma VM Linux modesta — local (on-prem) ou uma VPS barata — é suficiente para executar os serviços de ID/rendezvous e relay. Dimensione-a de acordo com a quantidade de dispositivos e com a proporção de tráfego que acaba sendo retransmitido em vez de peer-to-peer.
- **Abra somente as portas que você usa.** Os clientes nativos do RustDesk exigem **TCP 21115-21117 e UDP 21116** para teste de NAT, serviços de conexão, registro, heartbeat e relay. Não exponha a faixa inteira 21114-21119. TCP 21118-21119 são backends WebSocket, e TCP 21114 é o backend da API HTTP/console do Pro. Quando um proxy reverso HTTPS/WSS fica na frente da API do Pro e dos serviços WebSocket, exponha publicamente apenas TCP 443 para esse tráfego e mantenha 21114 e 21118-21119 internos. A porta pública 443 não substitui as portas principais dos clientes nativos quando clientes nativos também se conectam. Consulte a [referência oficial de portas](https://rustdesk.com/docs/en/self-host/).
- **Configure o TLS.** Encerre o HTTPS e o WSS no proxy reverso para que as credenciais, as chamadas de API e o tráfego do cliente de navegador usem a porta pública TCP 443, em vez de expor o console/API em HTTP simples ou os backends WebSocket brutos.
- **Faça backup.** O servidor armazena o inventário dos seus dispositivos, as contas de usuário, o catálogo de endereços e as regras de acesso. Agende backups — e realmente teste se consegue restaurá-los.
- **Mantenha um ritmo de atualizações.** Novas versões do servidor são lançadas ao longo do tempo, e você é responsável pelo sistema operacional subjacente. Decida quem aplica as atualizações e com que frequência.
- **Monitore.** O serviço de coordenação agora é seu, então você acompanha a disponibilidade, o disco e a taxa de transferência do relay, além de ser responsável pelos alertas e pela recuperação.

Nada disso é exótico, e a maior parte é uma configuração feita apenas uma vez. Se surgir alguma dúvida em qualquer momento, o [suporte do RustDesk](mailto:support@rustdesk.com) pode ajudar você.

## Como avaliar a auto-hospedagem

- **Comece pelo servidor da comunidade.** O núcleo é AGPL — implante o servidor gratuito de código aberto ainda hoje à tarde, audite-o e execute-o pelo tempo que quiser, sem custo algum.
- **Precisa do conjunto de recursos do Pro?** Os valores atuais dos planos estão em [rustdesk.com/pricing](https://rustdesk.com/pricing), e [sales@rustdesk.com](mailto:sales@rustdesk.com) pode informar quais opções de avaliação existem no momento.
- **Prefere assistir em vez de instalar?** Há uma demonstração em vídeo completa no [canal do RustDesk no YouTube](https://www.youtube.com/@rustdesk).

Se reajustes de preço, código fechado ou uma nuvem que você não controla foram o que fez você começar a procurar alternativas, a auto-hospedagem é a solução estrutural, não apenas um desconto. Para uma equipe que já opera infraestrutura, isso é um próximo passo, não um salto: seja dono do servidor, seja dono dos dados, seja dono do custo.
