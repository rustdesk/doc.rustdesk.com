---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-05T19:40:00Z
lang: 'pt'
translationKey: 'rustdesk-for-msps'
draft: false
title: 'RustDesk para MSPs: uma ferramenta única, auto-hospedada e personalizável'
excerpt: 'Compare a consolidação do TeamViewer, do AnyDesk e do ScreenConnect em uma única plataforma de suporte remoto auto-hospedada e com a sua marca.'
image: ~/assets/images/blog/rustdesk-for-msps-og.webp
category: 'Guias'
tags: ['RustDesk', 'MSP', 'Auto-hospedagem']
author: 'RustDesk Team'
slug: 'rustdesk-para-msps-uma-ferramenta-unica-autogerenciada-e-personalizavel'
faq:
  - question: 'O RustDesk consegue consolidar várias ferramentas de suporte remoto de um MSP?'
    answer: 'Sim, para controle e suporte remotos. O RustDesk Server Pro oferece a um MSP um único console auto-hospedado, clientes com marca própria a partir do plano Basic, Controle de acesso por usuário e por grupo de dispositivos e conexões simultâneas ilimitadas nos planos padrão, no lugar de consoles e contratos separados. Antes, faça um piloto das integrações de PSA/RMM das quais você depende.'
  - question: 'Como funciona o licenciamento do RustDesk para MSPs?'
    answer: 'Você paga por usuário com login (seus técnicos) e por dispositivo gerenciado (as máquinas que você atende), e os planos padrão incluem conexões simultâneas ilimitadas, para que vários técnicos possam realizar sessões ao mesmo tempo sem comprar canais. Apenas o Customized V2 licencia um número definido de conexões simultâneas; consulte rustdesk.com/pricing.'
  - question: 'Posso aplicar marca própria (white-label) ao cliente do RustDesk?'
    answer: 'Sim. O RustDesk Server Pro inclui um gerador de cliente personalizado, disponível a partir do plano Basic, que cria um cliente com o seu nome, logotipo, ícone e configuração de servidor. Os seus clientes instalam uma ferramenta que leva a sua marca e se conecta ao seu servidor, e não um download com a marca de um fornecedor.'
  - question: 'O RustDesk é auto-hospedado? Quem opera o servidor?'
    answer: 'Sim. O RustDesk Server Pro é auto-hospedado: o MSP executa o servidor de ID/rendezvous, o relay, o console web e os dados de gerenciamento armazenados no próprio host on-premises ou na própria VPS, e é responsável por atualizações, monitoramento, backups e certificados. O RustDesk Server OSS, o servidor comunitário gratuito, oferece ID/rendezvous e relay sem o gerenciamento do Pro.'
  - question: 'Como um MSP deve começar a avaliar o RustDesk?'
    answer: 'Comece pelo RustDesk Server OSS, o servidor comunitário gratuito, em uma VM de teste: ele não tem taxa de licença nem prazo de validade, então os técnicos podem validar um fluxo de suporte representativo antes de pagar qualquer coisa. Adicione o Server Pro quando a equipe precisar do console web, de clientes com a sua marca ou do Controle de acesso, e escreva para sales@rustdesk.com para saber os termos de avaliação atuais.'

metadata:
  description: 'RustDesk para MSPs: alternativa auto-hospedada ao ScreenConnect/TeamViewer, com marca própria, Controle de acesso e simultaneidade ilimitada nos planos padrão.'
  keywords: 'RustDesk para MSPs, suporte remoto auto-hospedado para MSPs, área de trabalho remota com marca própria para MSPs, ferramenta de suporte remoto para MSPs, licenciamento de área de trabalho remota por técnico'
---

A maioria dos MSPs não está em busca de mais uma ferramenta de suporte remoto. Eles querem _menos_ ferramentas: uma licença de suporte remoto na nuvem aqui, uma ferramenta por técnico ali, um utilitário avulso de suporte rápido para trabalhos pontuais, cada um com seu console, seu contrato e sua renovação. O RustDesk substitui esse amontoado por uma única plataforma auto-hospedada e com a sua marca; antes de aposentar qualquer coisa, faça um piloto das integrações de PSA/RMM e dos fluxos de endpoint dos quais os seus técnicos dependem.

Este guia trata do cliente aberto do RustDesk, das opções de servidor auto-hospedado, da administração comercial do Pro, da marca própria e do licenciamento nos fluxos de trabalho de um MSP.

## Opere você mesmo os serviços de acesso remoto

O RustDesk Server Pro é **auto-hospedado**: a sua equipe opera o ID/rendezvous, o relay, o console e os dados de gerenciamento armazenados. O cliente RustDesk e o RustDesk Server OSS (o servidor comunitário gratuito) são **[licenciados sob a AGPL](https://github.com/rustdesk/rustdesk)**; o Server Pro é um software de servidor comercial e proprietário, também auto-hospedado. Quando a revisão de segurança de um cliente pergunta "o que este agente está fazendo nos nossos endpoints?", você pode apontar para o código-fonte do cliente em vez de um binário fechado, e é você quem escolhe onde os serviços do lado do servidor rodam.

Veja como uma única plataforma auto-hospedada se compara ao monte de ferramentas que os MSPs deixam para trás ao consolidar:

|                                         | Ferramentas de suporte remoto em nuvem separadas | RustDesk Server Pro                                                                                             |
| --------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Consoles para gerenciar                 | Um por ferramenta                                | Um único console auto-hospedado                                                                                 |
| Marca própria no cliente                | Depende do produto e do plano                    | Gerador de cliente com marca personalizada a partir do plano Basic                                              |
| Hospedagem                              | Nuvem do fornecedor                              | Auto-hospedado (on-premises ou na sua VPS)                                                                      |
| Código-fonte                            | Depende do produto, geralmente proprietário      | Cliente AGPL auditável                                                                                          |
| Conexões simultâneas/canais licenciados | Cota conforme o plano                            | Ilimitadas nos planos padrão; o [Customized V2](https://rustdesk.com/pricing#custom2) tem uma cota licenciada |
| Base do licenciamento                   | Por assento / por canal                          | [Por usuário com login + por dispositivo gerenciado](https://rustdesk.com/pricing)                              |

Para os níveis exatos de planos e os preços atuais, consulte [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Conexões simultâneas conforme o plano

Você paga pelos usuários com login autorizados (normalmente os técnicos) e pelos dispositivos gerenciados. Os planos padrão incluem conexões simultâneas ilimitadas: quando três engenheiros atendem três clientes diferentes ao mesmo tempo durante uma pane, isso é só mais um dia de trabalho, e não um evento cobrado à parte. Se você vinha racionando sessões simultâneas ou organizando a equipe em torno de um número de canais, essa restrição desaparece nos planos padrão.

Apenas o [Customized V2](https://rustdesk.com/pricing#custom2) licencia um número definido de conexões simultâneas. Na [definição de simultaneidade](https://github.com/rustdesk/rustdesk/wiki/FAQ#concurrent-connections) do RustDesk, uma conexão simultânea é um dispositivo controlador ativo, um "canal": uma máquina de técnico com cinco abas de sessão usa um canal, e três máquinas de técnicos ativas ao mesmo tempo usam três. O Customized V2 também conta como dispositivos gerenciados apenas os dispositivos atribuídos a um usuário ou grupo de dispositivos, então máquinas de atendimentos avulsos não são contadas nem desativadas; veja [o que conta como dispositivo gerenciado](/pt/blog/o-que-conta-como-dispositivo-gerenciado-no-rustdesk).

## Personalize com a sua marca e adicione controle de acesso

O Server Pro oferece a um MSP um console web auto-hospedado e três controles distintos. O [Controle de acesso](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/permissions/) define quais técnicos podem alcançar quais dispositivos, por meio de regras de usuários e de grupos de dispositivos; cada dispositivo pertence a um único grupo de dispositivos, e as permissões de grupos de usuários e de grupos de dispositivos são cumulativas. O catálogo de endereços compartilhado organiza as entradas para os técnicos; ele não é um limite de acesso. A [Função de controle](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/control-role/) limita o que um técnico pode fazer dentro de uma sessão. O gerador de cliente personalizado e o SSO via LDAP/OIDC começam no plano Basic.

O cliente com marca própria importa porque os seus clientes instalam uma ferramenta com o seu nome, o seu logotipo e as configurações do seu servidor, e não a de um fornecedor. O Controle de acesso permite restringir cada técnico aos grupos de dispositivos dos clientes que ele atende.

## Controle sobre a localização dos dados no servidor

A auto-hospedagem permite que um MSP escolha onde o ID/rendezvous, o relay, o console e os dados de dispositivos armazenados rodam e quem os opera, o que costuma ser o ponto decisivo para clientes de setores regulados. É um controle de implantação, não uma certificação de conformidade: as sessões diretas continuam trafegando entre os endpoints, então mapeie a localização e o roteamento dos endpoints, como mostramos em [Soberania de dados em desktop remoto e GDPR](/pt/blog/soberania-de-dados-em-desktop-remoto-and-gdpr-auto-hospedagem).

## Coloque-o à prova, nos seus próprios termos

Você pode avaliar o RustDesk hoje mesmo, sem agendar nenhuma reunião:

- **Suba o Server OSS em uma VM sobressalente.** Ele não tem taxa de licença nem prazo de validade, então você pode validar um fluxo de trabalho real com um cliente antes de gastar qualquer coisa.
- **Quando a marca própria e o controle de acesso entrarem em cena,** compare os níveis de plano em [rustdesk.com/pricing](https://rustdesk.com/pricing) e pergunte a [sales@rustdesk.com](mailto:sales@rustdesk.com) quais termos de avaliação estão em vigor.
- **Pouco tempo para testes em laboratório?** Veja o RustDesk em ação primeiro ou explore os tutoriais no [canal do RustDesk no YouTube](https://www.youtube.com/@rustdesk).

Você pode **[fazer upgrade a qualquer momento](/pt/blog/atualizar-a-licenca-do-rustdesk-no-meio-da-assinatura-como-funciona)** conforme a sua base de clientes cresce: o upgrade estende a licença para um ano completo a partir da data do upgrade e credita o valor pago restante. Comece em [rustdesk.com/pricing](https://rustdesk.com/pricing).
