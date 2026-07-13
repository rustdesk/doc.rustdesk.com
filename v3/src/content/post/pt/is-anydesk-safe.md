---
publishDate: 2026-06-30T17:26:00Z
lang: 'pt'
translationKey: 'is-anydesk-safe'
draft: false
title: 'O AnyDesk é seguro? Criptografia, o incidente de segurança de 2024 e golpes'
excerpt: 'O AnyDesk é seguro? Uma análise justa sobre sua criptografia, o incidente de segurança nos sistemas de produção em 2024 e por que golpistas o exploram — além de como o código aberto se compara.'
image: ~/assets/images/blog/is-anydesk-safe-og.webp
category: 'Segurança'
tags: ['AnyDesk', 'Segurança']
author: 'RustDesk Team'
slug: 'o-anydesk-e-seguro-criptografia-o-incidente-de-seguranca-de-2024-e'
faq:
  - question: 'O AnyDesk é seguro para usar?'
    answer: 'Para uso legítimo, o AnyDesk é uma ferramenta comercial de acesso remoto madura e, de modo geral, segura. Ele criptografa as sessões com segurança de transporte padrão e oferece autenticação de dois fatores e listas de controle de acesso. As duas coisas a ter em mente são que ele é de código fechado e, por padrão, intermediado pela nuvem, e que seu maior risco no mundo real não é uma falha de software, mas golpistas de suporte técnico que convencem vítimas a instalá-lo.'
  - question: 'O AnyDesk foi hackeado?'
    answer: 'No início de 2024, o AnyDesk divulgou um incidente de segurança que afetou seus sistemas de produção, no qual invasores obtiveram código-fonte e material de assinatura de código. O AnyDesk revogou certificados, lançou uma versão reassinada do cliente e redefiniu as senhas do portal web. A empresa afirmou que nenhum dispositivo de usuário final foi afetado. Confirme o escopo exato e as datas consultando os próprios avisos do AnyDesk e reportagens neutras.'
  - question: 'Por que golpistas usam o AnyDesk?'
    answer: 'Por ser gratuito, rápido de instalar e por não exigir conta para a pessoa que está sendo controlada, o AnyDesk é uma ferramenta favorita de golpistas de suporte técnico, que ligam ou enviam e-mails para vítimas e as convencem a conceder acesso remoto. Esse é um risco de uso, não uma vulnerabilidade do AnyDesk — o mesmo truque de engenharia social funciona com qualquer ferramenta de acesso remoto, incluindo o RustDesk.'
  - question: 'A criptografia do AnyDesk é segura?'
    answer: 'A documentação de segurança do AnyDesk descreve TLS 1.2 com AEAD, uma troca de chaves assimétricas RSA-2048 e criptografia de transporte AES de 256 bits, além de sigilo de encaminhamento perfeito (perfect forward secrecy). Essas são proteções padrão do setor. A ressalva é que você está confiando em um cliente de código fechado e, por padrão, na nuvem do AnyDesk para intermediar a conexão, então você depende da segurança operacional do fornecedor, em vez de poder auditar o código você mesmo.'
metadata:
  description: 'O AnyDesk é seguro? Análise fundamentada de sua criptografia TLS/AES, do incidente de segurança nos sistemas de produção em 2024, do uso por golpistas e das contrapartidas do código fechado.'
  keywords: 'AnyDesk é seguro, segurança do AnyDesk, violação do AnyDesk 2024, golpe do AnyDesk, criptografia do AnyDesk, o AnyDesk é seguro para usar, AnyDesk foi hackeado'
---

Resposta rápida: sim, o AnyDesk é um produto comercial de acesso remoto legítimo e, de modo geral, seguro para quem o utiliza de forma intencional. Os riscos que vale a pena entender não são que o AnyDesk seja malware — não é —, mas sim que ele é de código fechado, intermediado pela nuvem por padrão, sofreu um incidente de segurança notável em 2024 e é uma das ferramentas que golpistas mais adoram explorar. A seguir, um panorama justo e fundamentado em fontes.

## A resposta curta

O AnyDesk protege suas sessões com criptografia padrão e bem conceituada, além de oferecer as proteções de conta esperadas. É usado todos os dias por help desks e empresas sem incidentes. Duas ressalvas importam para sua decisão: primeiro, você está confiando em um cliente proprietário e, por padrão, na própria nuvem do AnyDesk para intermediar as conexões, então você não pode auditar o código e herda a segurança operacional do fornecedor — um ponto que deixou de ser abstrato em [2024](https://www.infosecurity-magazine.com/news/anydesk-hit-cyberattack-customer/). Segundo, e com mais chances de afetar um usuário comum, o AnyDesk é uma das ferramentas favoritas em golpes de acesso remoto. Nenhum dos dois torna inseguro _instalá-lo_; ambos moldam a forma como você deve _usá-lo_.

## Como o AnyDesk protege suas sessões

De acordo com a [própria documentação de segurança do AnyDesk](https://anydesk.com/en/security), as sessões são protegidas com TLS 1.2 usando AEAD, uma troca de chaves assimétricas RSA-2048 para verificar os endpoints e proteger contra ataques man-in-the-middle, e criptografia de transporte AES de 256 bits, com sigilo de encaminhamento perfeito (perfect forward secrecy) obtido por meio de uma troca de chaves efêmeras. No que diz respeito à conta, o AnyDesk oferece suporte a autenticação de dois fatores (TOTP) para acesso não assistido, uma lista de controle de acesso / lista de permissões para restringir quem pode se conectar, e hashing de senhas com salt. (Alguns materiais do AnyDesk fazem referência a versões mais recentes do TLS; considere a página atual como a fonte oficial e verifique os detalhes lá.)

Essas são proteções sólidas e padrão do setor — comparáveis, em essência, ao que qualquer concorrente sério utiliza. Na camada de transporte, não há nada alarmante aqui. As perguntas interessantes dizem respeito ao _modelo de confiança_ e ao _comportamento humano_, não aos conjuntos de cifras.

## O incidente de segurança do AnyDesk em 2024: o que realmente aconteceu

No início de 2024, o AnyDesk divulgou publicamente um incidente de segurança que afetou seus **sistemas de produção**. Segundo a [Infosecurity Magazine](https://www.infosecurity-magazine.com/news/anydesk-hit-cyberattack-customer/) e analistas de segurança da [Akamai](https://www.akamai.com/blog/security-research/anydesk-breach-what-to-know-mitigations-and-recommendations), os invasores obtiveram acesso à infraestrutura interna e conseguiram código-fonte e material de assinatura de código. A resposta do AnyDesk, segundo a própria empresa, incluiu a contratação de perícia forense externa, a revogação e substituição de certificados relacionados à segurança, o lançamento de uma versão reassinada do cliente e, por precaução, a redefinição das senhas do portal web.

Para ser justo com o AnyDesk, a empresa afirmou que **nenhum dispositivo de usuário final foi afetado** e que seus sistemas são projetados para não armazenar as chaves privadas, tokens ou senhas que permitiriam a um invasor se conectar às máquinas dos clientes. Datas e números exatos foram divulgados de formas variadas na época, então confirme os detalhes consultando os avisos do AnyDesk e a cobertura jornalística neutra, em vez de confiar em um único resumo, incluindo este.

A conclusão honesta não é que "o AnyDesk é excepcionalmente inseguro". Todo grande fornecedor de acesso remoto tem um histórico de incidentes. A conclusão real diz respeito ao **risco de concentração no fornecedor**: quando um terceiro opera a infraestrutura que intermedeia suas sessões e guarda os dados da sua conta, um comprometimento ali é um comprometimento que você não escolheu e não poderia ter evitado.

## O maior risco não é um bug — são golpes

Para a maioria das pessoas, o maior perigo relacionado ao AnyDesk não tem nada a ver com um CVE. Trata-se de engenharia social. O [FBI já alertou](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software) que golpistas de suporte técnico rotineiramente orientam vítimas a instalar software de acesso remoto e, em seguida, usam esse acesso para esvaziar contas financeiras. O AnyDesk aparece constantemente nesses esquemas, e o próprio AnyDesk publica [orientações de prevenção contra abusos](https://anydesk.com/en/abuse-prevention) justamente porque é uma ferramenta tão frequentemente usada como arma.

Por que o AnyDesk especificamente? É gratuito para baixar, instala-se em segundos e — o mais importante — a pessoa que está sendo _controlada_ não precisa criar uma conta. Essa baixa fricção é um recurso valioso para suporte legítimo e um presente para fraudadores, que ligam ou enviam e-mails para um alvo, inventam um "problema" urgente e o conduzem passo a passo até conceder controle remoto total.

Este é o ponto de justiça que se perde em manchetes alarmistas: **isso é um risco de uso, não uma vulnerabilidade do AnyDesk.** Exatamente o mesmo truque funciona com o TeamViewer, o Chrome Remote Desktop ou o RustDesk. Nenhuma quantidade de AES protege você se você entregar as chaves de bom grado a um estranho ao telefone. Se você quiser o roteiro de defesa, escrevemos sobre isso separadamente em [como evitar golpes de acesso remoto](/pt/blog/golpes-de-acesso-remoto-como-identificar-e-evitar), e o mesmo raciocínio se aplica a [saber se o Chrome Remote Desktop é seguro](/pt/blog/o-chrome-remote-desktop-e-seguro-uma-analise-honesta).

## Código fechado e intermediado pela nuvem: a questão da confiança

É aqui que o modelo do AnyDesk e o do RustDesk se separam — não quanto à qualidade da criptografia, mas quanto a _o que você precisa aceitar como um ato de fé._

O AnyDesk é proprietário. Você não pode ler o código-fonte do cliente, compilá-lo você mesmo ou verificar de forma independente o que ele faz; você confia na palavra do AnyDesk de que o binário se comporta como anunciado. E, por padrão, suas sessões são intermediadas pela nuvem do AnyDesk, então a disponibilidade e a segurança dessa infraestrutura ficam a cargo do fornecedor — como 2024 demonstrou. Os planos superiores do AnyDesk oferecem um appliance on-premises, o que reduz essa lacuna para quem opta por essa opção.

O RustDesk parte do lado oposto em ambas as apostas. Por ser [código aberto sob a licença AGPL](https://github.com/rustdesk/rustdesk), o cliente pode ser auditado e compilado, então você não aceita um binário proprietário como um ato de fé. E, por poder [auto-hospedar](/pt/blog/por-que-auto-hospedar-seu-software-de-area-de-trabalho-remota) o ID/rendezvous e o relay, a infraestrutura que intermedeia suas sessões é sua, e não de um terceiro — justamente a exposição ao risco de concentração no fornecedor que 2024 tornou concreta. Isso também pode sustentar um [design com soberania de dados](/pt/blog/soberania-de-dados-em-desktop-remoto-and-gdpr-auto-hospedagem), embora a localização dos endpoints, a retenção de dados e as obrigações legais ainda precisem ser avaliadas.

Para ser igualmente justo: isso desloca a confiança, em vez de eliminá-la. Como o código é aberto, os próprios defeitos do RustDesk também são públicos, então acompanhe os [lançamentos mais recentes](https://github.com/rustdesk/rustdesk/releases) e os registros de vulnerabilidades. E uma infraestrutura auditável e auto-hospedada é um ponto de partida, não uma garantia: as sessões ainda são roteadas diretamente entre os endpoints, e o servidor é seu para aplicar patches.

## Então, o AnyDesk é seguro?

Para uso deliberado e legítimo: sim — é um produto maduro, com criptografia de nível padrão e controles de conta sensatos, usado com segurança em larga escala todos os dias. Trate-o como razoavelmente seguro, porque é isso que o histórico sustenta.

As ressalvas são a parte honesta disso. Seu modelo padrão — de código fechado e intermediado pela nuvem — significa que você está confiando na segurança operacional do AnyDesk, que sofreu um golpe real em 2024. E o dano mais comum no mundo real vem de golpistas que exploram a facilidade de instalação — um problema humano, não criptográfico. Se essas contrapartidas não lhe parecerem aceitáveis, uma [alternativa de código aberto e autoalojada](/pt/blog/a-melhor-alternativa-auto-hospedada-ao-teamviewer) muda a base de garantia: código auditável e intermediação sob seu controle, ao custo de você mesmo operar um servidor.

Seja qual for a ferramenta escolhida, a regra que evita mais danos é também a mais simples: nunca instale software de acesso remoto porque alguém que entrou em contato com _você_ pediu para você fazer isso.
