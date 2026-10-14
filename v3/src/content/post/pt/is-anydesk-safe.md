---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-06-30T17:26:00Z
lang: 'pt'
translationKey: 'is-anydesk-safe'
draft: false
title: 'O AnyDesk é seguro? Criptografia, o incidente de segurança de 2024 e golpes'
excerpt: 'O AnyDesk é seguro? Uma análise justa da criptografia, do incidente de segurança de 2024 nos sistemas de produção e de por que golpistas o exploram — e de como o código aberto se compara.'
image: ~/assets/images/blog/is-anydesk-safe-og.webp
category: 'Segurança'
tags: ['AnyDesk', 'Segurança']
author: 'RustDesk Team'
slug: 'o-anydesk-e-seguro-criptografia-o-incidente-de-seguranca-de-2024-e'
faq:
  - question: 'O AnyDesk é seguro para usar?'
    answer: 'Sim, para uso legítimo. O AnyDesk é uma ferramenta comercial madura que documenta TLS 1.2 com criptografia de transporte AES de 256 bits, autenticação de dois fatores para acesso não assistido e listas de controle de acesso. Os principais riscos são a invasão dos sistemas de produção divulgada em 2 de fevereiro de 2024, a coordenação pela nuvem da própria AnyDesk por padrão (o On-Premises é oferecido no Ultimate) e golpistas que convencem vítimas a instalá-lo.'
  - question: 'O AnyDesk foi hackeado?'
    answer: 'Sim. A AnyDesk divulgou o comprometimento de sistemas de produção em 2 de fevereiro de 2024. A declaração oficial descreveu a substituição de certificados, a correção dos sistemas e a redefinição preventiva de senhas do my.anydesk.com, e afirmou não haver evidência de que dispositivos de usuários finais tenham sido afetados. Pesquisadores de segurança da Akamai discutiram à parte os relatos de exposição de código-fonte e de assinatura de código.'
  - question: 'Por que golpistas usam o AnyDesk?'
    answer: 'Porque o AnyDesk é gratuito, instala em segundos e não exige conta do lado controlado, golpistas de falso suporte técnico ligam ou mandam e-mail para as vítimas e as convencem a instalá-lo e a conceder o controle. Isso é um risco de uso, não uma vulnerabilidade do AnyDesk: o mesmo truque funciona com qualquer ferramenta de acesso remoto, incluindo o RustDesk. A AnyDesk publica orientações de prevenção de abuso.'
  - question: 'A criptografia do AnyDesk é segura?'
    answer: 'A documentação de segurança do AnyDesk descreve TLS 1.2 com AEAD, troca de chaves assimétricas RSA-2048 e criptografia de transporte AES de 256 bits, além de perfect forward secrecy. São proteções padrão do setor. A ressalva é que você confia em um cliente de código fechado e, por padrão, na nuvem da AnyDesk para intermediar a conexão, então depende da segurança operacional do fornecedor, em vez de poder auditar o código você mesmo.'
metadata:
  description: 'O AnyDesk é seguro? Análise com fontes da criptografia TLS/AES, do incidente de 2024 nos sistemas de produção, do uso em golpes e dos limites do código fechado.'
  keywords: 'AnyDesk é seguro, segurança do AnyDesk, violação do AnyDesk 2024, golpe do AnyDesk, criptografia do AnyDesk, o AnyDesk é seguro para usar, AnyDesk foi hackeado'
---

A resposta rápida: o AnyDesk é seguro para uso legítimo. É um produto comercial maduro de acesso remoto, com criptografia de padrão de mercado, e não um malware. Os riscos que vale entender são que ele é de código fechado e coordenado pela nuvem da AnyDesk por padrão, que a empresa divulgou uma invasão dos sistemas de produção em fevereiro de 2024 e que golpistas o exploram muito. Veja o quadro completo, com fontes.

## A resposta curta

Sim, para uso deliberado e legítimo. O AnyDesk documenta TLS 1.2 com criptografia de transporte AES de 256 bits, autenticação de dois fatores para acesso não assistido e listas de controle de acesso. Três pontos definem como você deve usá-lo: a [invasão dos sistemas de produção de 2 de fevereiro de 2024](https://anydesk.com/en/public-statement-2-2-2024), a coordenação pela nuvem da própria AnyDesk por padrão (um appliance On-Premises é oferecido no Ultimate) e os golpistas de falso suporte técnico que convencem vítimas a instalá-lo. Nenhum deles torna inseguro _instalar_ o AnyDesk; todos eles influenciam como você o _usa_.

## Como o AnyDesk protege suas sessões

De acordo com a [documentação de segurança da própria AnyDesk](https://anydesk.com/en/security), as sessões são protegidas com TLS 1.2 usando AEAD, troca de chaves assimétricas RSA-2048 para verificar os endpoints e proteger contra ataques man-in-the-middle e criptografia de transporte AES de 256 bits, com perfect forward secrecy obtido por meio de uma troca de chaves efêmera. Do lado da conta, o AnyDesk oferece autenticação de dois fatores (TOTP) para acesso não assistido, uma lista de controle de acesso / lista de permissões para restringir quem pode se conectar e hashing de senhas com salt. (Alguns materiais da AnyDesk mencionam versões mais recentes do TLS; a página de segurança indicada acima é a referência atual.)

São proteções sólidas e padrão do setor — comparáveis, em essência, às que qualquer concorrente sério usa. Na camada de transporte, não há nada alarmante. As perguntas interessantes dizem respeito ao _modelo de confiança_ e ao _comportamento humano_, e não aos conjuntos de cifras.

## O incidente de segurança do AnyDesk em 2024: o que realmente aconteceu

Em **2 de fevereiro de 2024**, a [AnyDesk divulgou o comprometimento de sistemas de produção](https://anydesk.com/en/public-statement-2-2-2024). A declaração descreveu a resposta ao incidente com a CrowdStrike, a revogação e substituição de certificados, a correção dos sistemas e a redefinição preventiva de senhas do portal web. A [análise da Akamai](https://www.akamai.com/blog/security-research/anydesk-breach-what-to-know-mitigations-and-recommendations) discute os relatos de exposição de código-fonte e de assinatura de código separadamente da divulgação pública do fornecedor.

A [AnyDesk afirmou **não ter evidência de que dispositivos de usuários finais tenham sido afetados**](https://anydesk.com/en/public-statement-2-2-2024) e disse que não armazenava credenciais que pudessem ser usadas para se conectar a eles.

A lição não é que o AnyDesk seja excepcionalmente inseguro. É sobre o **risco de concentração no fornecedor**: quando um terceiro opera a infraestrutura que coordena suas sessões e guarda os dados da sua conta, um comprometimento ali é algo que você não escolheu e não podia evitar.

## Golpes de engenharia social são um risco à parte

Para a maioria das pessoas, o maior perigo ligado ao AnyDesk é a engenharia social, e não uma CVE. O [FBI alerta que golpistas de falso suporte técnico orientam as vítimas a instalar software de acesso remoto](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software) e depois abusam do acesso concedido, e a AnyDesk publica [orientações de prevenção de abuso](https://anydesk.com/en/abuse-prevention) justamente por isso. O risco está em quem é autorizado a se conectar, e não na força da criptografia da sessão.

Por que o AnyDesk especificamente? Ele é gratuito para baixar, instala em segundos e — o mais importante — a pessoa que está sendo _controlada_ não precisa criar uma conta. Essa baixa fricção é uma vantagem para o suporte legítimo e um presente para fraudadores, que ligam ou mandam e-mail para o alvo, inventam um "problema" urgente e o conduzem passo a passo até conceder controle remoto total.

Este é o ponto de justiça que se perde nas manchetes alarmistas: **isso é um risco de uso, não uma vulnerabilidade do AnyDesk.** O mesmo truque funciona com o TeamViewer, o Chrome Remote Desktop ou o RustDesk. Nenhuma quantidade de AES protege você se você entregar as chaves por vontade própria a um estranho ao telefone. Se você quer o roteiro de defesa, escrevemos sobre isso à parte em [como evitar golpes de acesso remoto](/pt/blog/golpes-de-acesso-remoto-como-identificar-e-evitar), e o mesmo raciocínio vale para [saber se o Chrome Remote Desktop é seguro](/pt/blog/o-chrome-remote-desktop-e-seguro-uma-analise-honesta).

## Código fechado e intermediado pela nuvem: a questão da confiança

É aqui que o modelo do AnyDesk e o do RustDesk se separam — não na qualidade da criptografia, mas no _que você precisa aceitar na base da fé._

O AnyDesk é proprietário. Você não pode ler o código-fonte do cliente, compilá-lo nem verificar de forma independente o que ele faz; você confia na palavra da AnyDesk de que o binário se comporta como anunciado. E, por padrão, suas sessões são intermediadas pela nuvem da AnyDesk, então a disponibilidade e a segurança dessa infraestrutura ficam a cargo do fornecedor — como 2024 mostrou. O AnyDesk Ultimate oferece um appliance on-premises, que reduz essa lacuna para quem o contrata.

O RustDesk parte do lado oposto nas duas apostas. O cliente RustDesk e o RustDesk Server OSS (o servidor comunitário gratuito) são [de código aberto sob a AGPL](https://github.com/rustdesk/rustdesk); o Server Pro é um software de servidor auto-hospedado, comercial e proprietário. O cliente pode ser auditado e compilado, então você não aceita um binário proprietário na base da fé. E, como você pode [auto-hospedar](/pt/blog/por-que-auto-hospedar-seu-software-de-area-de-trabalho-remota) o ID/rendezvous e o relay, a infraestrutura que intermedeia suas sessões é sua, e não de um terceiro — justamente a exposição à concentração no fornecedor que 2024 tornou concreta. Isso também sustenta um [projeto com soberania de dados](/pt/blog/soberania-de-dados-em-desktop-remoto-and-gdpr-auto-hospedagem).

Para ser igualmente justo: isso desloca a confiança, em vez de eliminá-la. Como o código é aberto, os defeitos do próprio RustDesk também são públicos, então acompanhe as [versões mais recentes](https://github.com/rustdesk/rustdesk/releases) e os registros de vulnerabilidades. E uma infraestrutura auditável e auto-hospedada é um ponto de partida, não uma garantia: as sessões continuam sendo roteadas diretamente entre os endpoints, e aplicar patches no servidor é tarefa sua.

## Então, o AnyDesk é seguro?

Para uso deliberado e legítimo: sim. O AnyDesk é um produto maduro, com criptografia de padrão de mercado e controles de conta sensatos. Mantenha-o atualizado, proteja o acesso não assistido com autenticação de dois fatores, restrinja as conexões recebidas com a lista de controle de acesso e confirme cada pedido de suporte.

As ressalvas são sobre confiança, e não sobre cifras. O modelo padrão, de código fechado e coordenado pela nuvem, significa depender da segurança operacional da AnyDesk, que foi comprometida de fato em 2024; o Ultimate On-Premises reduz essa lacuna. Se essa troca não agrada você, [uma alternativa auto-hospedada ao TeamViewer e ao AnyDesk](/pt/blog/a-melhor-alternativa-auto-hospedada-ao-teamviewer) muda a base de garantia: código auditável e coordenação sob o seu controle, ao custo de operar um servidor você mesmo.

Seja qual for a ferramenta escolhida, a regra que evita mais danos é também a mais barata: nunca instale software de acesso remoto porque alguém que entrou em contato com _você_ pediu.
