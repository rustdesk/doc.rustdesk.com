---
publishDate: 2026-06-30T13:17:00Z
lang: 'pt'
translationKey: rustdesk-vs-teamviewer
draft: false
title: 'RustDesk vs TeamViewer: A Alternativa Auto-hospedada'
excerpt: 'RustDesk vs TeamViewer comparados: recursos, suporte a sistemas operacionais, segurança, modelos de licenciamento e os verdadeiros compromissos envolvidos — auto-hospedagem, código aberto, sem cobrança por canal.'
image: ~/assets/images/blog/rustdesk-vs-teamviewer-og.png
category: 'Comparações'
tags: ['RustDesk', 'TeamViewer', 'Comparação']
author: 'RustDesk Team'
slug: 'rustdesk-vs-teamviewer-a-alternativa-auto-hospedada'
faq:
  - question: 'O RustDesk é uma alternativa gratuita ao TeamViewer?'
    answer: 'O cliente principal e o servidor da comunidade do RustDesk são de código aberto e gratuitos para auto-hospedar, sem prazo de validade. Os planos pagos do Server Pro adicionam gerenciamento centralizado e são licenciados por usuários de login e dispositivos gerenciados; os valores atuais estão em rustdesk.com/pricing.'
  - question: 'O RustDesk continua funcionando se eu parar de pagar, como uma licença perpétua antiga do TeamViewer?'
    answer: 'O servidor da comunidade, de código aberto, continua funcionando sem custo. O Server Pro é uma licença comercial anual; se ela expirar, você mantém o servidor gratuito, mas perde os recursos de gerenciamento do Pro. Nenhum dos dois produtos é uma ferramenta de compra única com uso perpétuo para sempre.'
  - question: 'O RustDesk pode ser auto-hospedado, ao contrário do TeamViewer?'
    answer: 'Sim. O RustDesk Server Pro executa o servidor de ID/rendezvous, o relay, o console e os dados armazenados em uma infraestrutura que você controla, enquanto o TeamViewer intermedeia as sessões por meio de sua própria nuvem.'
  - question: 'O RustDesk mede sessões simultâneas como os planos do TeamViewer?'
    answer: 'Os planos padrão do RustDesk incluem conexões simultâneas ilimitadas; apenas o Customized V2 mede e cobra pela concorrência. O TeamViewer limita as sessões simultâneas de acordo com o nível do plano.'
metadata:
  description: 'RustDesk vs TeamViewer comparados: recursos, suporte a sistemas operacionais, segurança, modelos de licenciamento e prós e contras claros — auto-hospedagem, código aberto, sem cobrança por canal.'
  keywords: 'RustDesk vs TeamViewer, comparação com TeamViewer, TeamViewer vs RustDesk, comparação RustDesk TeamViewer'
---

RustDesk e TeamViewer resolvem o mesmo problema de acesso remoto com modelos opostos: uma stack de código aberto que você mesmo hospeda versus um serviço de nuvem gerenciado ao qual você assina.

O TeamViewer é uma plataforma comercial de acesso remoto com um extenso catálogo de integrações. Esta é uma comparação detalhada: o que cada produto é, como seus recursos e suporte a plataformas se comparam, como seus modelos de segurança e licenciamento diferem, e onde — e por que — as equipes migram para o RustDesk. Sempre que fazemos uma afirmação sobre o TeamViewer, citamos a fonte, e tudo está datado, pois os preços e pacotes de acesso remoto mudam com frequência.

## Sumário

- [RustDesk e TeamViewer em resumo](#rustdesk-e-teamviewer-em-resumo)
- [Comparação de recursos](#comparação-de-recursos)
- [Suporte a sistemas operacionais e plataformas](#suporte-a-sistemas-operacionais-e-plataformas)
- [Segurança e identidade](#segurança-e-identidade)
- [Modelos de licenciamento e preços](#modelos-de-licenciamento-e-preços)
- [Prós e contras](#prós-e-contras)
- [Por que as equipes migram para o RustDesk mesmo assim](#por-que-as-equipes-migram-para-o-rustdesk-mesmo-assim)
- [Experimente o RustDesk você mesmo](#experimente-o-rustdesk-você-mesmo)
- [Leituras relacionadas](#leituras-relacionadas)

## RustDesk e TeamViewer em resumo

**TeamViewer** é uma plataforma comercial de acesso remoto e suporte remoto da TeamViewer SE, presente no mercado desde 2005 e uma das ferramentas do seu tipo mais amplamente implantadas. Ela é entregue como um SaaS gerenciado e intermediado pela nuvem: o TeamViewer executa a infraestrutura de conexão, você instala um cliente, e as sessões são intermediadas pela própria rede de roteamento do TeamViewer. É de código fechado, vendida por assinaturas anuais, e seus níveis superiores (com a marca **TeamViewer Tensor**) adicionam recursos corporativos como single sign-on, acesso condicional, implantação em massa e um amplo catálogo de integrações com ferramentas como ServiceNow, Jira e Microsoft Intune. ([TeamViewer Tensor / integrações](https://www.teamviewer.com/en/integrations/))

O **RustDesk** é uma ferramenta de desktop remoto de código aberto construída sobre uma premissa diferente: você pode executar tudo por conta própria. O RustDesk é de código aberto sob a licença AGPL, portanto pode ser auditado, compilado a partir do código-fonte e usado com um servidor comunitário gratuito que funciona indefinidamente. A oferta comercial, o **RustDesk Server Pro**, é auto-hospedada — o servidor de ID/rendezvous e o servidor de relay são executados na sua própria máquina ou VPS, o que significa que os metadados de sessão e a intermediação de conexões permanecem em uma infraestrutura que você controla. O RustDesk é licenciado por usuário de login e por dispositivo gerenciado, em vez de por sessão simultânea, e foi projetado para escalar desde um único técnico até grandes frotas. Se a sua objeção ao TeamViewer é, fundamentalmente, sobre _controle_ — sobre os dados, sobre o custo, sobre o próprio software — esse é o eixo em que esses dois produtos mais divergem.

O restante deste artigo detalha a comparação recurso por recurso.

## Comparação de recursos

A tabela abaixo compara as capacidades do dia a dia mais perguntadas pelas equipes. A coluna do RustDesk reflete as capacidades documentadas para o produto e, do lado do TeamViewer, cada "Sim" está referenciado às próprias páginas do TeamViewer. Verifique qualquer informação da qual você dependa na documentação atual.

| Capacidade                         | RustDesk                                                                                       | TeamViewer                                                                                                                                                                                                            |
| ---------------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Controle remoto (sessão principal) | Sim — este é o cliente principal                                                               | Sim ([recursos](https://www.teamviewer.com/en-us/products/remote/features/))                                                                                                                                          |
| Acesso não assistido               | Sim — os dispositivos são licenciados como endpoints gerenciados, sempre controláveis          | Sim ([recursos](https://www.teamviewer.com/en-us/products/remote/features/))                                                                                                                                          |
| Acesso móvel                       | Sim — Android; iOS apenas como controlador                                                     | Sim, por meio de aplicativos móveis ([recursos](https://www.teamviewer.com/en-us/products/remote/features/))                                                                                                          |
| Transferência de arquivos          | Sim (nas duas direções)                                                                        | Sim ([recursos](https://www.teamviewer.com/en-us/products/remote/features/))                                                                                                                                          |
| Chat na sessão                     | Sim — chat de texto                                                                            | Sim, chat em tempo real; VoIP/vídeo/chat são desativados para usuários gratuitos ([suporte](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-remote/remote-control/remote-session-toolbar/)) |
| Gravação de sessão                 | Sim (pode gravar automaticamente conexões de entrada/saída)                                    | Sim ([recursos](https://www.teamviewer.com/en-us/products/remote/features/))                                                                                                                                          |
| Impressão remota                   | Sim — impressora remota para conexões de entrada (Windows)                                     | Sim ([recursos](https://www.teamviewer.com/en-us/products/remote/features/))                                                                                                                                          |
| Suporte a múltiplos monitores      | Sim — múltiplos monitores                                                                      | Sim — múltiplos monitores 4K ([recursos](https://www.teamviewer.com/en-us/products/remote/features/))                                                                                                                 |
| Limite de sessões simultâneas      | Ilimitado nos planos padrão; limitado no [Customized V2](https://rustdesk.com/pricing#custom2) | Limitado de acordo com o nível do plano (veja [licenciamento](#modelos-de-licenciamento-e-preços))                                                                                                                    |

Uma linha merece atenção especial: a **questão da paridade de recursos.** Ambos os produtos cobrem os fluxos de trabalho do dia a dia com os quais a maioria das equipes de suporte e administração convive — controle remoto, acesso não assistido, transferência de arquivos, gravação de sessão, impressão remota e múltiplos monitores. Em vez de confiar cegamente em qualquer tabela, teste o RustDesk com as suas tarefas reais; é por isso que orientamos os avaliadores a entrar em contato com sales@rustdesk.com para uma licença de teste, em vez de assinar um contrato.

## Suporte a sistemas operacionais e plataformas

Ambas as ferramentas cobrem as principais plataformas de desktop e mobile; os detalhes diferem nas bordas, especialmente em Linux e dispositivos embarcados.

| Plataforma      | RustDesk                                                    | TeamViewer                                                                                                                                                                                                                                                                                                    |
| --------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Windows         | Sim — x64, ARM64, 32 bits                                   | Sim, incl. Windows Server 2016/2019/2022 ([sistemas operacionais suportados](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-remote/download-and-installation/supported-operating-systems-for-teamviewer-remote/))                                                                  |
| macOS           | Sim — Apple Silicon e Intel                                 | Sim, macOS 13 (Ventura) e posteriores ([sistemas operacionais suportados](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-remote/download-and-installation/supported-operating-systems-for-teamviewer-remote/))                                                                     |
| Linux           | Sim — x86_64, ARM64 e ARM32; forte suporte a Wayland        | Sim, mas via TeamViewer Classic, com funcionalidade mais limitada ([sistemas operacionais suportados](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-remote/download-and-installation/supported-operating-systems-for-teamviewer-remote/))                                         |
| Android         | Sim — arm64, arm32, x64 (host e controlador)                | Sim, Android 8+ ([sistemas operacionais suportados](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-remote/download-and-installation/supported-operating-systems-for-teamviewer-remote/))                                                                                           |
| iOS / iPadOS    | Apenas controlador (sem host, devido a restrições da Apple) | Aplicativo controlador, iOS/iPadOS 15+ (não pode ser totalmente controlado, devido a restrições da Apple) ([sistemas operacionais suportados](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-remote/download-and-installation/supported-operating-systems-for-teamviewer-remote/)) |
| ChromeOS        | Não verificado para este artigo                             | Sim, mas apenas compartilhamento de tela — controle remoto completo não é oficialmente suportado ([sistemas operacionais suportados](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-remote/download-and-installation/supported-operating-systems-for-teamviewer-remote/))          |
| Raspberry Pi OS | Sim — builds oficiais de Linux ARM64/ARM32                  | Sim, via TeamViewer Classic ([sistemas operacionais suportados](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-remote/download-and-installation/supported-operating-systems-for-teamviewer-remote/))                                                                               |

O ponto principal é que ambos os produtos funcionam em Windows, macOS, Linux, Android e iOS, então, para a grande maioria dos trabalhos de suporte em frotas mistas, qualquer uma das ferramentas alcançará os endpoints de que você precisa. O TeamViewer cobre algumas bordas extras (compartilhamento de tela no ChromeOS e Raspberry Pi via seu cliente Classic mais antigo), enquanto o RustDesk cobre o Pi com seus builds padrão de Linux ARM64/ARM32. Se endpoints exóticos importam para você, verifique o dispositivo específico na lista atual de cada fornecedor antes de se comprometer.

## Segurança e identidade

É aqui que os dois produtos incorporam filosofias genuinamente diferentes, por isso vale a pena separar "recursos de segurança" de "modelo de segurança".

**Os recursos de segurança do TeamViewer** são robustos e bem documentados. O tráfego de sessão usa troca de chaves pública/privada RSA de 4096 bits com criptografia de sessão AES de 256 bits, a mesma categoria de criptografia usada em HTTPS/TLS. Ele oferece criptografia de ponta a ponta, de modo que — segundo o TeamViewer — nem seus servidores de roteamento nem sistemas intermediários conseguem decifrar o tráfego de sessão criptografado de ponta a ponta. O acesso à conta pode ser protegido com autenticação de dois fatores baseada em TOTP, e a plataforma possui certificações de conformidade incluindo SOC 2, ISO/IEC 27001, ISO 9001:2015 e HIPAA/HITECH, além de declarar conformidade com o GDPR. ([Criptografia de ponta a ponta](https://www.teamviewer.com/en/solutions/use-cases/end-to-end-encryption-e2ee/), [declaração de segurança](https://www.teamviewer.com/en/global/support/knowledge-base/teamviewer-remote/security/security-statement/))

No entanto, há um ponto sobre o modelo de segurança que vale a pena destacar ao lado desses recursos. A própria infraestrutura de qualquer fornecedor centralizado é, em si, um alvo de alto valor, e nenhum provedor está imune a essa classe de ataque — que é exatamente o perfil de risco que um modelo auto-hospedado altera.

**O modelo de segurança do RustDesk** parte de um lugar diferente. O RustDesk é de código aberto sob a licença AGPL, portanto o código pode ser auditado de forma independente e compilado a partir do código-fonte. O RustDesk Server Pro é auto-hospedado: você opera o servidor de ID/rendezvous, o relay, o console e os dados de implantação armazenados. As sessões diretas continuam fluindo entre os endpoints. O código aberto também torna as falhas públicas, então revise as [versões mais recentes](https://github.com/rustdesk/rustdesk/releases) e os registros atuais de vulnerabilidades, em vez de presumir que a auto-hospedagem elimina o risco de software.

Sobre **identidade**, uma clarificação importante para o planejamento. O RustDesk suporta LDAP/Active Directory e SSO via OIDC, e isso está disponível **a partir do plano Basic**: não é exclusivo do nível mais alto, mas os planos abaixo do Basic não o incluem — verifique isso em relação ao plano específico que você pretende comprar. Os detalhes completos de configuração estão em [RustDesk LDAP e Active Directory: Guia de Configuração](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/ldap/). Para controle de acesso por usuário, o RustDesk oferece um console web auto-hospedado, grupos de dispositivos e uma lista de endereços compartilhada, além de um gerador de cliente com marca personalizada, para que o aplicativo instalado pelos seus usuários carregue o seu nome, e não o do fornecedor.

Se manter os dados de sessão em uma infraestrutura que você controla é o propósito central de todo esse exercício, a discussão dedicada está em [Desktop Remoto e Soberania de Dados](/pt/blog/soberania-de-dados-em-desktop-remoto-and-gdpr-auto-hospedagem) e [Por Que Auto-Hospedar Seu Software de Desktop Remoto](/pt/blog/por-que-auto-hospedar-seu-software-de-area-de-trabalho-remota).

## Modelos de licenciamento e preços

O preço é a parte mais volátil de qualquer comparação de acesso remoto, então descreveremos os **modelos** em detalhes e trataremos os **números** como registros datados, não como fatos permanentes. Também é nossa política nunca citar um preço fixo do RustDesk no texto — o valor atual está sempre em [rustdesk.com/pricing](https://rustdesk.com/pricing), garantindo que esteja sempre correto.

**O modelo do TeamViewer** é baseado em assinatura e organizado em torno de níveis nomeados, além de limites de sessões simultâneas. Os pacotes e preços variam por região e prazo, então use a página de preços atual do TeamViewer e seu orçamento por escrito, em vez de números históricos de terceiros ou faturas privadas de clientes.

**Uma nota sobre as antigas licenças "vitalícias" do TeamViewer.** Muitas equipes adotaram o TeamViewer pela primeira vez sob uma **licença perpétua** — uma compra única vinculada a uma versão principal específica. O TeamViewer não vende mais licenças perpétuas; agora é apenas por assinatura, e uma licença perpétua antiga continua utilizável apenas na versão para a qual foi originalmente válida, sujeita à política de ciclo de vida de produtos do TeamViewer. Na prática, isso significa que um cliente perpétuo mais antigo pode, eventualmente, deixar de se conectar conforme a versão à qual está vinculado se torna obsoleta, e "a licença perpétua que paguei não conecta mais" é um dos motivos mais comuns pelos quais vemos equipes começarem a procurar alternativas. O modelo do próprio RustDesk é diferente: o servidor da comunidade é gratuito e de código aberto, sem prazo de validade, enquanto o Server Pro comercial é licenciado anualmente, e não como uma compra vitalícia. ([FAQ de assinatura do TeamViewer](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-classic/licensing/subscription/all-about-subscription/))

**O modelo do RustDesk** é diferente em dois aspectos. Primeiro, os planos comerciais contam **usuários de login mais dispositivos gerenciados**. Os planos padrão incluem conexões simultâneas ilimitadas; o Customized V2 tem uma cota de concorrência definida. Os upgrades podem ser proporcionais, então confirme os termos atuais para upgrades no meio do período na página de preços. Segundo, o servidor da comunidade não tem taxa de licença, enquanto o Server Pro é a opção comercial para recursos centralizados. O RustDesk não publica um teste de autoatendimento fixo para o Server Pro; solicite os termos de avaliação atuais antes de planejar uma prova de conceito. Os mecanismos de pagamento estão detalhados na [página de preços do RustDesk](https://rustdesk.com/pricing).

Se o seu ponto de partida é o custo do TeamViewer, compare os orçamentos atuais para o mesmo escopo.

Há também uma particularidade do nível gratuito. O nível gratuito do TeamViewer é destinado ao uso pessoal, não comercial, e a suspeita de uso comercial pode restringir as sessões. O TeamViewer não publica uma fórmula de limite em que os usuários possam confiar. Um verdadeiro falso positivo deve passar pelo processo oficial de redefinição; o uso comercial real exige termos comerciais. ([TeamViewer: suspeita de uso comercial](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-classic/licensing/personal-use/commercial-use-suspected/)) Veja [TeamViewer Detectou Uso Comercial](/pt/blog/uso-comercial-detectado-pelo-teamviewer-como-resolver) para o fluxo de trabalho específico.

## Prós e contras

**RustDesk**

_Prós_

- Licenciado por usuário de login + dispositivo gerenciado, com upgrades proporcionais a qualquer momento — não por canais por assento medidos por sessão simultânea
- Sem sinalizações de "uso comercial" suspeito interrompendo sessões no nível gratuito, nem licença perpétua que deixa de se conectar conforme sua versão se torna obsoleta
- Código aberto (AGPL) — auditável, compilável a partir do código-fonte, com um servidor comunitário gratuito que roda indefinidamente
- Server Pro auto-hospedado: os servidores de ID/rendezvous e relay são executados na sua própria máquina ou VPS, mantendo a intermediação de sessões dentro do seu perímetro
- LDAP/Active Directory e SSO OIDC a partir do plano Basic
- Console web auto-hospedado, grupos de dispositivos, lista de endereços compartilhada e gerador de cliente com marca personalizada; com orientação para planejamento de grandes frotas em implantações maiores

_Contras_

- A auto-hospedagem significa que você mesmo executa, corrige e atualiza o servidor

**TeamViewer**

_Prós_

- Criptografia de sessão AES-256, troca de chaves RSA-4096, criptografia de ponta a ponta opcional e 2FA via TOTP
- Certificações de conformidade publicadas (SOC 2, ISO/IEC 27001, HIPAA/HITECH)
- Integrações nativas com ServiceNow, Jira, Intune e outros via Tensor
- SaaS totalmente gerenciado — sem servidor para você executar

_Contras_

- Código fechado; você confia na infraestrutura do fornecedor e em como ele lida com os metadados da sua sessão
- As sessões simultâneas são medidas de acordo com o nível do plano
- Assinatura anual recorrente, sem opção de licença perpétua
- O nível gratuito é apenas para uso pessoal e pode sinalizar usuários por suspeita de "uso comercial", interrompendo as sessões
- Modelo de nuvem centralizado — a própria infraestrutura do fornecedor é, em si, um alvo de alto valor, um perfil de risco que a auto-hospedagem altera

## Por que as equipes migram para o RustDesk mesmo assim

Tudo o que foi apresentado até aqui é a parte neutra. A seção a seguir explica quais requisitos de compradores se alinham com o modelo do RustDesk.

**Eles querem um modelo diferente de licenciamento e escalabilidade.** As taxas e cotas podem mudar, então projete o crescimento com base na matriz de preços atual — veja os [preços atuais](https://rustdesk.com/pricing) e a [orientação para planejamento de grandes frotas](/pt/blog/o-rustdesk-consegue-escalar-para-200-000-dispositivos).

**Eles querem controle sobre o caminho de dados do lado do servidor.** Executar os serviços de ID/rendezvous e relay permite que uma equipe escolha onde esses serviços e os metadados armazenados residem. O tráfego direto de sessão continua fluindo entre os endpoints, e a auto-hospedagem, por si só, não estabelece conformidade com o GDPR. Veja [Por Que Auto-Hospedar](/pt/blog/por-que-auto-hospedar-seu-software-de-area-de-trabalho-remota) e [Desktop Remoto e Soberania de Dados](/pt/blog/soberania-de-dados-em-desktop-remoto-and-gdpr-auto-hospedagem).

**Eles querem ler o código.** Para compradores preocupados com segurança, "podemos inspecionar" é um nível de garantia diferente de "o fornecedor diz que está tudo bem".

**Eles são MSPs ou empresas que querem uma única ferramenta auto-hospedada e personalizável com marca própria.** Para provedores de serviços gerenciados, o gerador de cliente com marca personalizada transforma o RustDesk em uma plataforma de suporte white-label — veja [RustDesk para MSPs](/pt/blog/rustdesk-para-msps-uma-ferramenta-unica-autogerenciada-e-personalizavel). Para organizações maiores que precisam de AD/LDAP e espaço para crescer, veja [RustDesk para Empresas](/pt/blog/rustdesk-para-empresas-auto-hospedado-escalavel-e-pronto-para-ad).

Também está comparando outras opções? Veja [RustDesk vs AnyDesk](/pt/blog/rustdesk-vs-anydesk-area-de-trabalho-remota-auto-hospedada-e-de-codigo), [RustDesk vs ScreenConnect](/pt/blog/rustdesk-vs-screenconnect-suporte-remoto-auto-hospedado) e [A Melhor Alternativa Auto-Hospedada ao TeamViewer](/pt/blog/a-melhor-alternativa-auto-hospedada-ao-teamviewer).

## Experimente o RustDesk você mesmo

O servidor comunitário gratuito está pronto para você colocar no ar hoje mesmo, sem custo. Quer os recursos do Pro? Entre em contato com [sales@rustdesk.com](mailto:sales@rustdesk.com) para saber os termos de avaliação, ou confira [rustdesk.com/pricing](https://rustdesk.com/pricing) para ver as taxas dos planos — e há um [vídeo demonstrativo completo](https://www.youtube.com/@rustdesk) caso você prefira ver tudo funcionando antes.

## Leituras relacionadas

- [RustDesk vs AnyDesk](/pt/blog/rustdesk-vs-anydesk-area-de-trabalho-remota-auto-hospedada-e-de-codigo)
- [RustDesk vs ScreenConnect](/pt/blog/rustdesk-vs-screenconnect-suporte-remoto-auto-hospedado)
- [A Melhor Alternativa Auto-Hospedada ao TeamViewer](/pt/blog/a-melhor-alternativa-auto-hospedada-ao-teamviewer)
- [TeamViewer vs AnyDesk para MSPs](/pt/blog/teamviewer-vs-anydesk-para-msps-uma-terceira-opcao-auto-hospedada)
- [TeamViewer vs Splashtop](/pt/blog/teamviewer-vs-splashtop-preco-desempenho-e-hospedagem-propria)
- [TeamViewer Detectou Uso Comercial](/pt/blog/uso-comercial-detectado-pelo-teamviewer-como-resolver)
