---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-07T18:21:00Z
lang: 'pt'
translationKey: 'why-self-host-remote-desktop-software'
draft: false
title: 'Por Que Auto-Hospedar Seu Software de Área de Trabalho Remota'
excerpt: 'Por que equipes que deixam o TeamViewer e o AnyDesk auto-hospedam o acesso remoto: você escolhe onde os servidores rodam, quem os opera e pelo que você paga.'
image: ~/assets/images/blog/why-self-host-remote-desktop-software-og.webp
category: 'Guias'
tags: ['RustDesk', 'Auto-hospedagem']
author: 'RustDesk Team'
slug: 'por-que-auto-hospedar-seu-software-de-area-de-trabalho-remota'
faq:
  - question: 'O que significa auto-hospedar um software de área de trabalho remota?'
    answer: 'Auto-hospedar um software de área de trabalho remota significa executar o servidor de conexão (o serviço de ID/rendezvous do RustDesk) e o relay de contingência em uma infraestrutura que você controla, em vez da nuvem de um fornecedor. Com o RustDesk Server Pro, o console web e os dados dos dispositivos também ficam ali; as sessões diretas continuam trafegando de endpoint para endpoint.'
  - question: 'O que realmente envolve executar um servidor RustDesk auto-hospedado?'
    answer: 'Um host Linux pequeno, algumas portas abertas e manutenção de rotina. Provisione uma VM, abra TCP 21115-21117 e UDP 21116 para os clientes nativos do RustDesk, coloque o console e a API do Server Pro atrás de HTTPS na porta 443 e agende backups cuja restauração você já testou. Depois disso, o trabalho contínuo é aplicar atualizações, monitorar, acompanhar a capacidade do relay e renovar certificados.'
  - question: 'A auto-hospedagem ajuda com a residência de dados e a conformidade com o GDPR?'
    answer: 'Sim. Auto-hospedar o RustDesk permite escolher onde o ID/rendezvous, o relay, o console e os dados dos dispositivos rodam e quem os opera, que é o controle que as regras de residência de dados exigem. É um controle de implantação, não uma certificação de conformidade: as sessões diretas continuam trafegando entre os endpoints, então a conformidade com o GDPR também depende do roteamento, da retenção e do seu programa de conformidade como um todo.'
  - question: 'A auto-hospedagem é indicada para todas as equipes?'
    answer: 'Não, mas atende à maioria das equipes que já operam a própria infraestrutura e querem controlar seus servidores de acesso remoto. O RustDesk Server OSS, o servidor comunitário gratuito, não tem taxa de licença, e o RustDesk Server Pro adiciona o console web, o Controle de acesso e o SSO. Equipes que não querem operar servidor nenhum ficam mais bem atendidas por um serviço gerenciado.'

metadata:
  description: 'Por que auto-hospedar o acesso remoto: você escolhe onde os servidores rodam e quem os opera, com o RustDesk Server OSS e o Server Pro como exemplo.'
  keywords: 'por que auto-hospedar área de trabalho remota, benefícios da área de trabalho remota auto-hospedada, acesso remoto on-premise, área de trabalho remota sem nuvem de fornecedor'
---

A maioria das ferramentas de área de trabalho remota é vendida de um único jeito: como assinatura em nuvem, com os servidores do fornecedor coordenando as sessões e retransmitindo-as quando o caminho direto falha. A auto-hospedagem transfere essas funções para uma infraestrutura que você controla: os clientes se coordenam pelo seu servidor de ID/rendezvous, conectam-se diretamente quando possível e recorrem ao seu relay quando necessário. Este artigo apresenta os argumentos, usando o RustDesk Server OSS (o servidor comunitário gratuito) e o Server Pro como exemplo concreto.

## O que "auto-hospedar a área de trabalho remota" realmente significa

O preço da comodidade de depender só da nuvem é que a lista dos seus dispositivos, os metadados das suas conexões e, às vezes, o próprio tráfego das suas sessões passam por um terceiro — sujeitos à disponibilidade, aos preços e à postura de segurança dele.

A auto-hospedagem inverte essa equação. Com o RustDesk, a sua equipe opera os serviços de ID/rendezvous e de relay, e o Server Pro também coloca o console web e os dados dos dispositivos armazenados na sua infraestrutura. As sessões diretas trafegam entre os endpoints; as sessões retransmitidas usam o seu relay. O **cliente e o Server OSS do RustDesk são [licenciados sob a AGPL](https://github.com/rustdesk/rustdesk)**; o **Server Pro é um software de servidor comercial e proprietário, também auto-hospedado**.

## Somente nuvem x auto-hospedado, em resumo

|                                                  | Ferramenta típica somente em nuvem                                 | Auto-hospedado (RustDesk Server Pro)                                                                                                                                                       |
| ------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Onde as sessões são intermediadas                | Nuvem do fornecedor                                                | Seu servidor local (on-prem) ou VPS                                                                                                                                                        |
| Residência dos dados                             | Controlada pelo fornecedor                                         | Os serviços do lado do servidor rodam em infraestrutura sob seu controle; [as rotas entre os endpoints ainda importam](/pt/blog/soberania-de-dados-em-desktop-remoto-and-gdpr-auto-hospedagem) |
| Conexões simultâneas/canais licenciados          | Cota conforme o plano                                              | Ilimitadas nos planos padrão; o Customized V2 tem uma cota licenciada                                                                                                                      |
| Modelo de preço                                  | Usuários, endpoints e cotas de conexão específicos de cada produto | [Usuários com login mais dispositivos gerenciados](https://rustdesk.com/pricing); o Customized V2 também licencia a simultaneidade                                                         |
| Código-fonte                                     | Depende do produto, geralmente proprietário                        | Cliente AGPL auditável                                                                                                                                                                     |
| Dependência em caso de indisponibilidade         | Disponibilidade do fornecedor                                      | Suas próprias operações                                                                                                                                                                    |
| Quem executa o servidor                          | Fornecedor                                                         | Você                                                                                                                                                                                       |

A auto-hospedagem não custa capacidade. Para [MSPs](/pt/blog/rustdesk-para-msps-uma-ferramenta-unica-autogerenciada-e-personalizavel) e equipes internas de TI, o Server Pro adiciona um console web auto-hospedado com [Controle de acesso](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/permissions/) por usuário e por grupo de dispositivos, além de um gerador de cliente personalizado e [SSO via LDAP/OIDC](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/ldap/) a partir do plano Basic. Também não custa escala: o servidor público do RustDesk registrou mais de dois milhões de endpoints online em um único host de 12 núcleos e 32 GB em 7 de julho de 2026 (telemetria interna), e o [guia de planejamento para grandes frotas](/pt/blog/o-rustdesk-consegue-escalar-para-200-000-dispositivos) mostra o que validar no Server Pro.

## O que realmente envolve executar o servidor

O controle vem acompanhado de trabalho operacional: uma configuração inicial e, depois, manutenção de rotina. Esta é a lista concreta:

- **Provisione um host.** Os requisitos de hardware do RustDesk são baixos, então uma VM Linux modesta — local (on-prem) ou uma VPS barata — executa os serviços de ID/rendezvous e relay. Dimensione-a de acordo com a quantidade de dispositivos e com quanto do tráfego acaba retransmitido em vez de ponto a ponto.
- **Abra somente as portas que você usa.** Os clientes nativos do RustDesk exigem **TCP 21115-21117 e UDP 21116** para teste de NAT, serviços de conexão, registro, heartbeat e relay. Não exponha a faixa inteira 21114-21119. TCP 21118-21119 são backends WebSocket, e TCP 21114 é o backend da API HTTP/console do Pro. Quando um proxy reverso HTTPS/WSS fica na frente da API do Pro e dos serviços WebSocket, exponha publicamente apenas TCP 443 para esse tráfego e mantenha 21114 e 21118-21119 internas. A porta pública 443 não substitui as portas principais dos clientes nativos quando eles também se conectam. Consulte a [referência oficial de portas](https://rustdesk.com/docs/pt/self-host/).
- **Configure o TLS.** Encerre o HTTPS e o WSS no proxy reverso para que as credenciais, as chamadas de API e o tráfego do cliente de navegador usem a porta pública TCP 443, em vez de expor o console/API em HTTP simples ou os backends WebSocket brutos.
- **Faça backup.** O servidor armazena o inventário dos seus dispositivos, as contas de usuário, o catálogo de endereços e as regras de acesso. Agende backups — e teste de verdade se consegue restaurá-los.
- **Mantenha um ritmo de atualizações.** Novas versões do servidor são lançadas ao longo do tempo, e o sistema operacional por baixo é responsabilidade sua. Decida quem aplica as atualizações e com que frequência.
- **Monitore.** O serviço de coordenação agora é seu, então você acompanha a disponibilidade, o disco e a taxa de transferência do relay, e é responsável pelos alertas e pela recuperação.

Nada disso é exótico para uma equipe que já opera servidores Linux. Defina um responsável e um calendário para atualizações, backups, renovação de certificados e testes de restauração, e o servidor passa a funcionar como infraestrutura de rotina.

## Como avaliar a auto-hospedagem

- **Comece pelo Server OSS.** Implante-o hoje à tarde, inspecione o código e use-o pelo tempo que quiser: não há taxa de licença nem prazo de validade, apenas a sua própria hospedagem e banda.
- **Precisa do conjunto de recursos do Pro?** Os valores atuais dos planos estão em [rustdesk.com/pricing](https://rustdesk.com/pricing), e [sales@rustdesk.com](mailto:sales@rustdesk.com) pode informar quais opções de avaliação existem no momento.
- **Prefere assistir em vez de instalar?** Há uma demonstração completa em vídeo no [canal do RustDesk no YouTube](https://www.youtube.com/@rustdesk).

Se mudanças de preço, código fechado ou a nuvem de um fornecedor levaram você a procurar alternativas, a auto-hospedagem é a solução estrutural, não um desconto: você escolhe onde os servidores rodam e quem os opera. Para uma equipe que já opera infraestrutura, é um próximo passo, não um salto; faça um piloto no Server OSS, dimensione o relay para os seus picos de sessões e migre a frota quando o fluxo de trabalho se sustentar.
