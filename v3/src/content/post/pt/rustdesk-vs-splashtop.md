---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-06T10:09:00Z
lang: 'pt'
translationKey: 'rustdesk-vs-splashtop'
draft: false
title: 'Alternativa auto-hospedada ao Splashtop: o que avaliar primeiro'
excerpt: 'Guia para avaliar uma alternativa auto-hospedada ao Splashtop: licenciamento, infraestrutura, evidências de confiabilidade, testes de fluxo de trabalho e risco de migração.'
image: ~/assets/images/blog/rustdesk-vs-splashtop-og.webp
category: 'Comparações'
tags: ['RustDesk', 'Splashtop', 'Comparação']
author: 'RustDesk Team'
slug: 'alternativa-auto-hospedada-ao-splashtop-o-que-avaliar-primeiro'
faq:
  - question: 'O RustDesk e o Splashtop podem ser auto-hospedados?'
    answer: 'Sim, mas com modelos de produto diferentes. O RustDesk Server OSS (o servidor comunitário gratuito) e o Server Pro comercial foram feitos para ser auto-hospedados. O Splashtop oferece um produto On-Prem proprietário, licenciado à parte, com um Gateway operado pelo cliente, além dos planos SaaS convencionais operados pelo próprio fornecedor.'
  - question: 'Que infraestrutura o Splashtop On-Prem exige?'
    answer: 'O Splashtop On-Prem usa um Splashtop Gateway operado pelo cliente, instalado em uma DMZ ou atrás do firewall corporativo. A organização planeja a capacidade do servidor, a rede, o TLS, o monitoramento, o backup, as atualizações e a disponibilidade, e a Splashtop publica requisitos de sistema que cobrem os sistemas operacionais, o dimensionamento de hardware e as portas do Gateway.'
  - question: 'Devo auto-hospedar ou usar um serviço operado pelo fornecedor?'
    answer: 'Auto-hospede quando a sua equipe quiser operar os serviços do lado do servidor e puder assumir atualizações, monitoramento, backups e recuperação. O RustDesk faz disso o padrão, com cliente AGPL, o RustDesk Server OSS gratuito e o gerenciamento comercial do Server Pro; a Splashtop vende essa opção como o produto On-Prem, à parte. Escolha um SaaS operado pelo fornecedor quando quiser que outra pessoa opere o serviço.'
  - question: 'Como uma equipe de TI deve testar um substituto do Splashtop?'
    answer: 'Faça um piloto paralelo com usuários, endpoints, redes e fluxos de suporte representativos. Defina critérios de aceitação para confiabilidade de conexão, áudio remoto, mapeamento de monitores, acesso móvel, administração e controles de segurança, e mantenha a solução atual em operação, com um plano de reversão documentado, até que o substituto atenda a esses critérios.'
metadata:
  description: 'Avalie uma alternativa auto-hospedada ao Splashtop: licenciamento, infraestrutura, compatibilidade de fluxos, segurança, desenho do piloto e risco de migração.'
  keywords: 'alternativa auto-hospedada ao Splashtop, substituto do Splashtop, migrar do Splashtop, RustDesk vs Splashtop, alternativa ao Splashtop para equipes de TI'
---

Vale a pena avaliar uma alternativa auto-hospedada ao Splashtop quando sua equipe de TI quer controle sobre os serviços do lado do servidor, código-fonte que possa auditar ou um modelo de licenciamento adequado aos seus usuários, dispositivos e sessões simultâneas. O RustDesk foi feito exatamente para isso. Mesmo assim, a avaliação importa, porque uma migração pode expor lacunas de fluxo de trabalho que uma matriz de recursos não mostra.

A distinção que importa é que existem **três modelos de operação, e não "nuvem versus auto-hospedagem".** A Splashtop vende planos SaaS gerenciados _e_ um produto **On-Prem** licenciado à parte; o RustDesk faz da auto-hospedagem o modelo de implantação principal, com o RustDesk Server OSS (o servidor comunitário gratuito) e o Server Pro.

## A resposta curta

| Fator de decisão           | RustDesk                                                                                                                                                                                 | Splashtop SaaS                                                 | Splashtop On-Prem                                                                                                                       |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Operação do servidor       | Server OSS ou Server Pro, operado pelo cliente                                                                                                                                           | Operado pelo fornecedor                                        | Splashtop On-Prem Gateway operado pelo cliente                                                                                          |
| Modelo de código           | Cliente e Server OSS: AGPL; Server Pro: proprietário                                                                                                                                     | Proprietário                                                   | Proprietário                                                                                                                            |
| Licenciamento              | Os planos do Server Pro licenciam usuários com login e dispositivos gerenciados; o [Customized V2](https://rustdesk.com/pricing#custom2) licencia também uma quantidade definida de conexões simultâneas | Varia conforme o plano Remote Access, Remote Support ou Enterprise | Licenciado à parte, com venda direta; confirme a cotação por escrito                                                                |
| Sessões simultâneas        | Ilimitadas nos planos padrão; uma quantidade definida no Customized V2                                                                                                                   | Depende do plano                                               | Depende da licença                                                                                                                      |
| Governança                 | Console web do Server Pro, Controle de acesso por usuário e por grupo de dispositivos e catálogos de endereços compartilhados; SSO via LDAP/OIDC a partir do plano Basic                  | Os controles corporativos dependem do plano                    | Permissões de usuário/grupo, integração com Active Directory, restrições de IP e outros recursos dependem da edição                     |
| Trabalho de infraestrutura | Sua equipe cuida da implantação, do TLS, da exposição na rede, do monitoramento, do backup, das atualizações e da disponibilidade                                                        | O fornecedor cuida da infraestrutura do serviço                | Sua equipe cuida do dimensionamento do Gateway, do posicionamento na rede, do TLS, do monitoramento, do backup, das atualizações e da disponibilidade |
| Melhor ponto de partida    | Server OSS gratuito para a avaliação básica; avaliação do Server Pro via [sales@rustdesk.com](mailto:sales@rustdesk.com) para os recursos de gerenciamento                               | Teste do SaaS para equipes que querem um serviço gerenciado    | Venda direta e uma avaliação de infraestrutura com escopo definido                                                                      |

Escolha o modelo de operação antes de comparar recursos individuais. Se você quer que um fornecedor opere o serviço, compare o esforço de operar o RustDesk por conta própria com o Splashtop SaaS. Se o controle da infraestrutura for obrigatório, compare o RustDesk Server Pro com o Splashtop On-Prem — e não com o teste do SaaS, que diz pouco sobre o On-Prem.

## Compare o produto Splashtop correto

Os planos padrão Remote Access e Remote Support da Splashtop são operados pelo fornecedor. A [página de preços](https://www.splashtop.com/pricing) lista uma opção On-Prem entre as ofertas corporativas, e a [página do produto On-Prem](https://www.splashtop.com/products/on-prem) descreve a instalação de um **Splashtop On-Prem Gateway** em uma DMZ ou atrás do firewall corporativo, com [requisitos de sistema](https://support-splashtoponprem.splashtop.com/hc/en-us/articles/360035393074-Splashtop-On-Prem-System-Requirements) próprios para sistemas operacionais, dimensionamento de hardware e portas.

Portanto, o On-Prem existe — mas é um produto proprietário à parte, com venda direta e infraestrutura do lado do cliente, e não o padrão por trás de toda assinatura do Splashtop. O RustDesk parte do extremo oposto: o Server OSS e o Server Pro são auto-hospedados por padrão. Com o Server Pro, o servidor ID/rendezvous, o relay, o console e os dados de implantação armazenados rodam em infraestrutura que você controla, enquanto as sessões diretas continuam trafegando entre os endpoints.

## Código aberto e o modelo de confiança

O **cliente e o Server OSS do RustDesk são licenciados sob a AGPL**. Uma equipe de segurança ou de engenharia pode ler o código, compilar o cliente e executar o Server OSS sem precisar comprar uma licença comercial antes; **o Server Pro é um software de servidor auto-hospedado, comercial e proprietário**, que acrescenta gerenciamento centralizado por cima. O Splashtop SaaS e o On-Prem são ambos proprietários — o On-Prem muda _onde_ o servidor roda, e não se o código é aberto. Duas perguntas distintas decidem a questão:

1. Os serviços do lado do servidor precisam rodar em infraestrutura que nós controlamos? _(Tanto o On-Prem quanto o RustDesk respondem que sim.)_
2. Precisamos ver o código-fonte e conseguir compilar o cliente nós mesmos? _(Só o RustDesk responde que sim.)_

## Licenciamento e custo

Os planos padrão do RustDesk Server Pro são dimensionados por **usuários com login e dispositivos gerenciados** e incluem conexões simultâneas ilimitadas; somente o [Customized V2](https://rustdesk.com/pricing#custom2) licencia uma quantidade definida de conexões simultâneas. O preço do Splashtop depende de a necessidade ser Remote Access, Remote Support, Enterprise SaaS ou On-Prem, e o Enterprise e o On-Prem são vendidos diretamente pela equipe comercial.

Compare as mesmas quantidades dos dois lados — técnicos ou usuários com login, endpoints gerenciados, sessões simultâneas, os recursos de identidade/auditoria/gravação de que você realmente precisa e a operação do servidor — com base em condições por escrito e datadas, e projete a renovação, e não só o preço do primeiro ano. Um preço de entrada mais baixo ou a cotação antiga de outro cliente não define o custo da implantação de que você precisa. Os valores atuais do RustDesk estão em [preços do RustDesk](https://rustdesk.com/pricing).

## Relatos de confiabilidade: sinais, não prevalência

As discussões públicas apontam para os dois lados. Uma thread de 2025 na [comunidade do Splashtop](https://www.reddit.com/r/Splashtop_Official/comments/1ltgest/constant_crashing_on_local_win10_computer/) documenta travamentos do cliente para Windows; uma [discussão da Atera](https://www.reddit.com/r/atera/comments/1qucbx3/is_splashtop_just_terrible_for_you_guys/) de 2026 traz tanto reclamações quanto administradores relatando anos de uso estável — alguns com o Splashtop entregue por uma integração com RMM, e não pelo produto independente. Trate esses relatos como cenários a reproduzir no seu próprio piloto, com o seu mix de endpoints, redes, pacotes de RMM e versões de sistema operacional, e não como evidência de quão comum é qualquer problema na base instalada.

## O que testar de verdade

Deixe de lado o checklist genérico de matriz de recursos e teste o que de fato decide uma migração do Splashtop na prática:

- **Áudio remoto** e repasse do microfone, incluindo o comportamento do dispositivo de áudio após uma reconexão.
- Layouts com **vários monitores** e se o mapeamento dos monitores se mantém entre as sessões.
- Acesso pelo **celular e pelo navegador** — confirme quais plataformas podem _controlar_ e quais só podem _ser controladas_, e valide as sessões no navegador/WebSocket separadamente dos clientes nativos.
- **Pacotes de RMM** e implantação não assistida nas versões de sistema operacional que você usa em produção.
- **Conexão direta e fallback para o relay**, além do comportamento de reconexão em redes com alta latência e restritas.
- **Governança** — SSO ou integração com diretório, 2FA no dispositivo controlado, logs de auditoria, grupos de dispositivos e a confirmação de que conhecer o ID de um dispositivo não contorna o seu modelo de autorização. O console web, o Controle de acesso e o [LDAP/SSO](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/ldap/) são recursos do Server Pro, então teste a governança em uma avaliação do Server Pro, e não no Server OSS.

Conduza isso como um **piloto paralelo** com uma amostra representativa de técnicos, endpoints e redes; mantenha a solução atual em operação até que a substituta passe nos fluxos de trabalho exigidos; e documente um gatilho de reversão antes de ampliar a implantação.

## Quando o RustDesk é o candidato mais forte

O RustDesk é o candidato mais forte quando:

- **A auto-hospedagem deve ser o padrão.** O Server OSS e o Server Pro rodam na infraestrutura que você escolher; o equivalente da Splashtop é o produto On-Prem, licenciado à parte.
- **A simultaneidade não deve ditar a conta.** Os planos padrão do Server Pro licenciam usuários com login e dispositivos gerenciados e incluem conexões simultâneas ilimitadas.
- **O login pelo diretório é importante.** LDAP/Active Directory e SSO via OIDC vêm a partir do plano Basic.
- **Você quer fazer um piloto gratuito e auditar o cliente.** O Server OSS não tem taxa de licença nem data de expiração, e o cliente pode ser lido e compilado a partir do código-fonte.

Uma ressalva vale tanto para o RustDesk quanto para o Splashtop On-Prem: sua equipe provisiona, protege, monitora, faz backup e atualiza o servidor.

## Avalie o RustDesk sem comprometer a frota

Comece com o Server OSS para a conectividade básica e, depois, avalie o Server Pro se precisar de governança centralizada — usando os mesmos endpoints, redes, fluxos de trabalho dos técnicos e critérios de aceitação que você aplicaria ao Splashtop. Envie um e-mail para [sales@rustdesk.com](mailto:sales@rustdesk.com) para conhecer as condições atuais de avaliação do Server Pro ou consulte os [preços do RustDesk](https://rustdesk.com/pricing).
