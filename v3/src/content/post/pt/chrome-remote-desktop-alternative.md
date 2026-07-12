---
publishDate: 2026-07-01T08:14:00Z
lang: 'pt'
translationKey: 'chrome-remote-desktop-alternative'
draft: false
title: 'Alternativa ao Chrome Remote Desktop: RustDesk Auto-hospedado'
excerpt: 'O Chrome Remote Desktop é gratuito e simples, mas prende você ao Google e deixa de lado recursos essenciais. Conheça uma alternativa de código aberto e auto-hospedada que você controla.'
image: '~/assets/images/blog/chrome-remote-desktop-alternative-og.png'
category: 'Alternativas'
tags: ['RustDesk', 'Chrome Remote Desktop', 'Alternativa', 'Auto-hospedagem']
author: 'RustDesk Team'
slug: 'alternativa-ao-chrome-remote-desktop-rustdesk-auto-hospedado'
faq:
  - question: 'Existe uma alternativa ao Chrome Remote Desktop que não exige conta Google?'
    answer: 'Sim. O RustDesk auto-hospedado não exige nenhuma conta de terceiros (o servidor de demonstração público exige um login gratuito do controlador), usando seus próprios servidores de ID/rendezvous e de retransmissão em vez de uma conta Google, e você pode auto-hospedar esses servidores para que nenhuma nuvem de terceiros fique no meio do caminho. O Chrome Remote Desktop, por outro lado, exige uma conta Google tanto no host quanto no cliente.'
  - question: 'O Chrome Remote Desktop oferece suporte a transferência de arquivos?'
    answer: 'O Chrome Remote Desktop oferece upload/download básico de arquivos, mas não transferência por arrastar e soltar. O RustDesk inclui transferência de arquivos nativa junto com o controle remoto.'
  - question: 'O Chrome Remote Desktop consegue oferecer acesso não assistido?'
    answer: 'Consegue, mas a máquina de destino precisa estar ligada e conectada à mesma conta Google, e o Chrome Remote Desktop não consegue despertar um computador em suspensão. O RustDesk oferece suporte a acesso não assistido com senha permanente para uma frota que você gerencia a partir do seu próprio console.'
  - question: 'O RustDesk é gratuito como o Chrome Remote Desktop?'
    answer: 'O RustDesk é de código aberto sob a AGPL, e você pode rodar o servidor comunitário gratuito indefinidamente, sem custo algum. O Server Pro comercial adiciona recursos de equipe e é auto-hospedado; consulte rustdesk.com/pricing para os termos atuais.'
metadata:
  description: 'O Chrome Remote Desktop é gratuito e simples, mas prende você ao Google e carece de recursos essenciais. Compare com o RustDesk, uma alternativa de código aberto e auto-hospedada.'
  keywords: 'alternativa ao Chrome Remote Desktop, alternativa auto-hospedada ao Chrome Remote Desktop, acesso remoto sem conta Google, RustDesk vs Chrome Remote Desktop'
---

A resposta auto-hospedada e de código aberto ao Chrome Remote Desktop é o RustDesk: você hospeda a intermediação e pode ler o código-fonte do cliente, em vez de rotear cada sessão pela nuvem do Google e vincular o acesso a uma conta Google.

## Por que procurar uma alternativa ao Chrome Remote Desktop

O [Chrome Remote Desktop](https://support.google.com/chrome/answer/1649523) é a ferramenta gratuita de acesso remoto baseada em navegador do Google. É simples e rápida: instale um pequeno host, faça login e você já consegue acessar sua máquina a partir de outro dispositivo em poucos minutos — exatamente o que um uso pessoal casual exige.

Mas no momento em que suas necessidades crescem além de "ajudar meu próprio laptop lá do sofá", as costuras começam a aparecer. Você fica preso à identidade e à sinalização do Google, faltam alguns recursos voltados a equipes de suporte, e o plano de controle não pode ser auto-hospedado. O [guia de rede](https://support.google.com/chrome/a/answer/16364503) do Google explica esse limite: as conexões são inicialmente negociadas por meio dos serviços do Google, enquanto o tráfego WebRTC ao vivo usa caminhos diretos, STUN ou TURN/relay. Somente os pacotes de sessão via TURN/relay são retransmitidos pelos data centers do Google. Se você já esbarrou nessas limitações, esta página mostra como é uma alternativa de código aberto e auto-hospedada.

## O que o Chrome Remote Desktop faz bem

Reconhecimento onde é devido. A [análise da TechRadar](https://www.techradar.com/reviews/chrome-remote-desktop-review) o descreve como "completamente gratuito, sem assinaturas ou níveis premium", fácil de configurar e uma boa opção para uso pessoal. Ele funciona em Windows, macOS e Linux, não exige negociação de licença, e não há nada para hospedar. Se você quer verificar seu PC doméstico pelo celular, o CRD é praticamente sem esforço nenhum.

Essa simplicidade é o produto. O problema começa quando você pede que ele faça o que uma equipe de suporte ou uma configuração com várias máquinas realmente precisa.

## Onde o Chrome Remote Desktop encontra seus limites

### Recursos ausentes: controle auto-hospedado, gestão de dispositivos e fluxos de trabalho em equipe

As páginas de ajuda do Google documentam o acesso remoto a arquivos e aplicativos e permitem que administradores controlem o acesso e o comportamento de rede, mas ainda assim descrevem um serviço baseado em conta Google, com coordenação operada pelo Google — a divisão entre sinalização e retransmissão abordada na introdução. Em outras palavras: o CRD é adequado para acesso simples, mas não é um console de suporte auto-hospedado com grupos de dispositivos ou marca personalizada no estilo RustDesk.

### Acesso não assistido e máquinas em suspensão

O CRD é capaz de fazer acesso não assistido, mas a máquina de destino ainda precisa estar **ligada e online** e conectada à **mesma conta Google**. O Google documenta o acesso remoto por PIN, não um substituto para wake-on-LAN. Se a máquina estiver em suspensão ou offline, não há nada para o CRD se conectar. Para uma frota de endpoints remotos, essa é uma restrição operacional real.

### Gerenciamento de usuários e a exigência de conta Google

Todo participante precisa de uma conta Google e, em sessões compartilhadas (não assistidas), alguém precisa estar presente para conceder acesso. Administradores do Google Workspace podem [ativar ou desativar o CRD e restringir a travessia de firewall](https://support.google.com/chrome/a/answer/2799701), mas isso não é o mesmo que um console de suporte auto-hospedado com grupos de dispositivos e acesso de técnicos delimitado por escopo — e o Google continua presente no caminho de identidade e configuração de sessão, como descrito na introdução. (Para o aspecto específico de segurança, veja [o Chrome Remote Desktop é seguro?](/pt/blog/o-chrome-remote-desktop-e-seguro-uma-analise-honesta))

## Chrome Remote Desktop vs. RustDesk em resumo

|                                                                                        | Chrome Remote Desktop                                                             | RustDesk                                                                                                                                             |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Custo                                                                                  | Gratuito                                                                          | Código aberto (AGPL); servidor comunitário gratuito; Server Pro pago                                                                                 |
| Plano de controle e tráfego                                                            | Identidade/sinalização do Google; mídia direta, STUN ou retransmitida pelo Google | Funções de servidor [auto-hospedadas](/pt/blog/por-que-auto-hospedar-seu-software-de-area-de-trabalho-remota); mídia direta ou autorretransmitida    |
| Código-fonte                                                                           | Proprietário                                                                      | Código aberto ([AGPL](https://github.com/rustdesk/rustdesk)), auditável                                                                              |
| Conta necessária                                                                       | Conta Google em ambas as pontas                                                   | ID próprio; nenhuma conta de terceiros necessária                                                                                                    |
| Transferência de arquivos / fluxos de transferência                                    | Somente upload/download (sem arrastar e soltar)                                   | Incluída                                                                                                                                             |
| [Acesso não assistido](/pt/blog/acesso-nao-assistido-do-rustdesk-guia-de-configuracao) | Mesma conta Google, a máquina precisa estar ativa                                 | Acesso por senha permanente a uma frota que você gerencia                                                                                            |
| Gerenciamento central                                                                  | Políticas do Google Admin; sem console de suporte auto-hospedado                  | Console web, [grupos de dispositivos e catálogo de endereços compartilhado](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/permissions/) |
| Marca personalizada                                                                    | Não                                                                               | Gerador de cliente com marca personalizada (a partir do plano Basic)                                                                                 |
| Plataformas                                                                            | Win/macOS/Linux (no Chrome)                                                       | Win/macOS/[Linux](/pt/blog/rustdesk-para-linux-o-desktop-remoto-de-codigo-aberto)/Android; app controlador para iOS                                  |

## Onde o RustDesk se encaixa: auto-hospedado e de código aberto

O RustDesk é construído em torno de duas coisas que o CRD estruturalmente não pode oferecer: **você hospeda a infraestrutura e pode ler o código.**

O RustDesk é de código aberto sob a **[AGPL](https://github.com/rustdesk/rustdesk)** — você pode auditar exatamente o que roda em suas máquinas, compilá-lo você mesmo e executar o **servidor comunitário gratuito indefinidamente**. Ao migrar para o Server Pro, ele é **[auto-hospedado por design](/pt/blog/por-que-auto-hospedar-seu-software-de-area-de-trabalho-remota)**: os servidores de ID/rendezvous e de retransmissão rodam na sua própria máquina ou em uma VPS que você aluga, então não há nuvem do Google (nem de qualquer outro fornecedor) no meio do caminho. Uma nuance para o planejamento de conformidade: as conexões diretas ainda trafegam entre os endpoints, e o tráfego retransmitido usa o seu relay, então revise as [implicações de soberania de dados](/pt/blog/soberania-de-dados-em-desktop-remoto-and-gdpr-auto-hospedagem) em vez de presumir que a localização do servidor controla cada pacote.

Além desse núcleo auto-hospedado, o RustDesk adiciona os recursos de equipe que faltam ao CRD: um [console web auto-hospedado](https://rustdesk.com/docs), um gerador de cliente com marca personalizada, [grupos de dispositivos e catálogo de endereços compartilhado](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/permissions/) para acesso delimitado por escopo, e [LDAP/AD e SSO OIDC](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/ldap/) a partir do plano Basic. Transferência de arquivos de verdade e [acesso não assistido](/pt/blog/acesso-nao-assistido-do-rustdesk-guia-de-configuracao) com senha permanente vêm de série em hosts Windows, macOS, Linux e Android; o aplicativo para iOS é somente controlador.

## Da nuvem do Google para a sua

O salto em relação ao Chrome Remote Desktop é o controle: a intermediação, a política de acesso e os dados de sessão saem dos servidores do Google e passam para um servidor que você opera e pode auditar. Para quem quer um acesso remoto que responda só a si mesmo, esse é o retorno.

## Experimente sem falar com vendas

Você pode avaliar o RustDesk nos seus próprios termos, sem nenhuma conta Google envolvida no processo. O servidor comunitário de código aberto é gratuito para rodar pelo tempo que você quiser; quando os recursos de equipe do Pro forem importantes, [sales@rustdesk.com](mailto:sales@rustdesk.com) pode informar os termos de avaliação atuais, e [rustdesk.com/pricing](https://rustdesk.com/pricing) lista os valores dos planos.

Leia o código você mesmo no [GitHub](https://github.com/rustdesk/rustdesk), aponte alguns dispositivos para o seu próprio servidor e decida se as vantagens e desvantagens fazem sentido antes de se comprometer com qualquer coisa.
