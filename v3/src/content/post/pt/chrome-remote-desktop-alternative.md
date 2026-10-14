---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-01T08:14:00Z
lang: 'pt'
translationKey: 'chrome-remote-desktop-alternative'
draft: false
title: 'Alternativa ao Chrome Remote Desktop: RustDesk Auto-hospedado'
excerpt: 'Compare o Chrome Remote Desktop, operado pelo Google, com o RustDesk: rendezvous e relay auto-hospedados, cliente aberto, Server OSS gratuito e gerenciamento de equipes no Pro.'
image: '~/assets/images/blog/chrome-remote-desktop-alternative-og.webp'
category: 'Alternativas'
tags: ['RustDesk', 'Chrome Remote Desktop', 'Alternativa', 'Auto-hospedagem']
author: 'RustDesk Team'
slug: 'alternativa-ao-chrome-remote-desktop-rustdesk-auto-hospedado'
faq:
  - question: 'Existe uma alternativa ao Chrome Remote Desktop que não exige conta Google?'
    answer: 'Sim. Os clientes RustDesk apontados para o seu servidor auto-hospedado se conectam por ID do dispositivo e senha, sem conta Google nem de qualquer outro terceiro. O Server Pro pode acrescentar contas gerenciadas localmente ou o seu próprio provedor de identidade. Só o servidor público de demonstração do RustDesk pede um login gratuito no lado controlador. O Chrome Remote Desktop usa a identidade do Google e uma coordenação operada pelo Google.'
  - question: 'O Chrome Remote Desktop oferece suporte a transferência de arquivos?'
    answer: 'Sim, mas apenas upload e download básicos. O Chrome Remote Desktop não oferece transferência por arrastar e soltar. O RustDesk inclui transferência de arquivos nos dois sentidos junto com o controle remoto, para que o técnico possa mover arquivos para lá e para cá sem sair da sessão nem trocar de ferramenta.'
  - question: 'O Chrome Remote Desktop oferece acesso não assistido?'
    answer: 'Sim. O Chrome Remote Desktop oferece acesso não assistido baseado em conta e protegido por PIN enquanto a máquina de destino está online. O RustDesk usa uma senha permanente, aceita pelas configurações padrão, com o serviço do RustDesk em execução no host; o Server Pro acrescenta o gerenciamento centralizado desses dispositivos. Nenhuma das duas ferramentas liga sozinha uma máquina desligada.'
  - question: 'O RustDesk é gratuito como o Chrome Remote Desktop?'
    answer: 'Sim. O cliente RustDesk e o RustDesk Server OSS (o servidor comunitário gratuito) são licenciados sob a AGPL e gratuitos, sem taxa de licença nem data de expiração; a hospedagem e a banda ficam por sua conta. O Server Pro, comercial e proprietário, acrescenta gerenciamento de equipes auto-hospedado, como console web, grupos de dispositivos e SSO via LDAP/OIDC; veja rustdesk.com/pricing.'
metadata:
  description: 'O Chrome Remote Desktop é gratuito e simples, mas prende você ao Google e deixa de fora recursos-chave. Compare com o RustDesk, aberto e auto-hospedado.'
  keywords: 'alternativa ao Chrome Remote Desktop, alternativa auto-hospedada ao Chrome Remote Desktop, acesso remoto sem conta Google, RustDesk vs Chrome Remote Desktop'
---

A alternativa auto-hospedada e de código aberto ao Chrome Remote Desktop é o RustDesk: você mesmo executa os servidores de ID/rendezvous e relay com o RustDesk Server OSS (o servidor comunitário gratuito) e pode ler o código-fonte do cliente, em vez de amarrar o acesso a uma conta Google e a uma coordenação operada pelo Google. O Server Pro, comercial, acrescenta administração de equipes sobre a mesma base auto-hospedada.

## Por que procurar uma alternativa ao Chrome Remote Desktop

O [Chrome Remote Desktop](https://support.google.com/chrome/answer/1649523) é a ferramenta gratuita de acesso remoto do Google, baseada no navegador. É simples e rápida: instale um pequeno host, faça login e, em poucos minutos, você já acessa sua máquina a partir de outro dispositivo — exatamente o que um uso pessoal casual pede.

Mas, assim que suas necessidades vão além de "ajudar meu próprio notebook lá do sofá", as costuras aparecem: você fica preso à identidade e à sinalização do Google, faltam alguns recursos para equipes de suporte e o plano de controle não pode ser auto-hospedado. O [guia de rede](https://support.google.com/chrome/a/answer/16364503) do Google explica o limite: as conexões são negociadas pelos serviços do Google, enquanto o tráfego da sessão ao vivo usa caminhos diretos, STUN ou TURN/relay, e só os pacotes via TURN/relay passam pelos data centers do Google.

## O que o Chrome Remote Desktop faz bem

Mérito a quem merece. A [análise da TechRadar](https://www.techradar.com/reviews/chrome-remote-desktop-review) o descreve como "completamente gratuito, sem assinaturas ou planos premium", fácil de configurar e uma boa opção para uso pessoal. Ele roda em Windows, macOS e Linux, não exige negociar licença e não há nada para hospedar. Se você quer dar uma olhada no PC de casa pelo celular, o CRD praticamente não exige esforço.

Essa simplicidade é o produto. O problema começa quando você pede a ele o que uma equipe de suporte ou um ambiente com várias máquinas realmente precisa.

## Onde o Chrome Remote Desktop encontra seus limites

### Recursos ausentes: controle auto-hospedado, gerenciamento de dispositivos e fluxos de trabalho em equipe

As páginas de ajuda do Google documentam o acesso remoto a arquivos e aplicativos e permitem que administradores controlem o acesso e o comportamento de rede, mas continuam descrevendo um serviço baseado em conta Google, com coordenação operada pelo Google — a divisão entre sinalização e relay vista na introdução. Em outras palavras: o CRD resolve o acesso simples, mas não é um console de suporte auto-hospedado com grupos de dispositivos ou marca personalizada como os do RustDesk.

### Acesso não assistido e máquinas em suspensão

O CRD oferece acesso não assistido protegido por PIN, mas a máquina de destino precisa estar ligada, online e associada à mesma conta Google. O RustDesk também precisa do host online, com o serviço em execução e as permissões da plataforma concedidas. Nenhuma das duas ferramentas liga sozinha uma máquina desligada; a documentação do RustDesk observa que, após a descoberta na LAN, o Wake-on-LAN pode funcionar se houver suporte na rede local.

### Gerenciamento de usuários e a exigência de conta Google

Todo participante precisa de uma conta Google e, em sessões compartilhadas (fora do acesso não assistido), alguém precisa estar presente para conceder o acesso. Administradores do Google Workspace podem [ativar ou desativar o CRD e restringir a travessia de firewall](https://support.google.com/chrome/a/answer/2799701), mas isso não equivale a um console de suporte auto-hospedado com grupos de dispositivos e acesso de técnicos delimitado — e o Google continua no caminho da identidade e da configuração da sessão, como descrito na introdução. (Para o lado da segurança especificamente, veja [o Chrome Remote Desktop é seguro?](/pt/blog/o-chrome-remote-desktop-e-seguro-uma-analise-honesta))

## Chrome Remote Desktop vs. RustDesk em resumo

|                                                                                        | Chrome Remote Desktop                                                                                                                                         | RustDesk                                                                                                                                                       |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Custo                                                                                  | Gratuito                                                                                                                                                      | Cliente e Server OSS gratuitos; Server Pro pago                                                                                                                |
| Plano de controle e tráfego                                                            | Identidade/sinalização do Google; mídia direta, via STUN ou retransmitida pelo Google                                                                         | Funções de servidor [auto-hospedadas](/pt/blog/por-que-auto-hospedar-seu-software-de-area-de-trabalho-remota); mídia direta ou pelo seu próprio relay           |
| Código-fonte                                                                           | [Componentes remoting públicos no Chromium](https://chromium.googlesource.com/chromium/src/+/main/remoting/); o serviço do Google não é oferecido para auto-hospedagem | Cliente e Server OSS sob a AGPL; gerenciamento proprietário no Server Pro                                                                               |
| Conta necessária                                                                       | Conta Google nas duas pontas                                                                                                                                  | Seu próprio ID; nenhuma conta de terceiros exigida                                                                                                             |
| Transferência de arquivos / fluxos de transferência                                    | Somente upload/download (sem arrastar e soltar)                                                                                                               | Integrada                                                                                                                                                      |
| [Acesso não assistido](/pt/blog/acesso-nao-assistido-do-rustdesk-guia-de-configuracao) | Baseado em conta/PIN; a máquina de destino precisa estar online                                                                                               | Senha permanente; serviço em execução e permissões do sistema concedidas; a máquina de destino precisa estar online                                            |
| Gerenciamento central                                                                  | Políticas do Google Admin; não há serviço de controle do CRD operado pelo cliente                                                                            | Console do Server Pro, Controle de acesso, grupos de dispositivos e catálogos de endereços compartilhados                                                      |
| Marca personalizada                                                                    | Não                                                                                                                                                           | Gerador de cliente com marca personalizada (a partir do plano Basic)                                                                                           |
| Plataformas                                                                            | Win/macOS/Linux (no Chrome)                                                                                                                                   | Win/macOS/[Linux](/pt/blog/rustdesk-para-linux-o-desktop-remoto-de-codigo-aberto)/Android; app controlador para iOS                                            |

## Onde o RustDesk se encaixa: auto-hospedado e de código aberto

O diferencial do RustDesk é um **caminho de servidor auto-hospedado que você pode implantar**. [O Chromium publica o código de remoting do CRD](https://chromium.googlesource.com/chromium/src/+/main/remoting/), mas o serviço de coordenação do Google não pode ser auto-hospedado; com o RustDesk, você mesmo executa o Server OSS ou o Server Pro.

O **cliente RustDesk e o Server OSS são licenciados sob a AGPL** e podem ser inspecionados e compilados de forma independente. O Server OSS oferece ID/rendezvous e relay auto-hospedados, sem taxa de licença nem data de expiração. **O Server Pro é um software de servidor auto-hospedado, comercial e proprietário**, que acrescenta administração na sua infraestrutura. As sessões diretas trafegam entre os endpoints; as sessões retransmitidas usam o seu relay. Avalie as [implicações de soberania de dados](/pt/blog/soberania-de-dados-em-desktop-remoto-and-gdpr-auto-hospedagem) junto com a localização do servidor.

O Server Pro acrescenta os recursos de equipe que faltam ao CRD: console web auto-hospedado, grupos de dispositivos, catálogos de endereços compartilhados e [Controle de acesso](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/permissions/) por usuário e por grupo de dispositivos, com geração de cliente personalizado e SSO via LDAP/OIDC a partir do plano Basic. O acesso não assistido por senha permanente funciona em hosts Windows, macOS e Linux depois que o serviço está em execução e as permissões do sistema foram concedidas; hosts Android também precisam do consentimento de captura de tela e da permissão de entrada, e estão sujeitos aos limites de segundo plano dos fabricantes, e o app para iOS funciona apenas como controlador.

## Da nuvem do Google para a sua

O salto em relação ao Chrome Remote Desktop é o controle: a intermediação, a política de acesso e os dados de gerenciamento saem dos servidores do Google e vão para servidores que você opera, com um cliente que você pode auditar. Esse controle traz a responsabilidade por patches, disponibilidade e recuperação.

## Experimente sem falar com vendas

Você pode avaliar o RustDesk nos seus próprios termos, sem nenhuma conta Google no processo. O Server OSS é gratuito, sem taxa de licença nem data de expiração; quando os recursos de equipe do Pro fizerem diferença, [sales@rustdesk.com](mailto:sales@rustdesk.com) informa as condições de avaliação atuais, e [rustdesk.com/pricing](https://rustdesk.com/pricing) lista os preços dos planos.

Leia o código você mesmo no [GitHub](https://github.com/rustdesk/rustdesk), aponte alguns dispositivos para o seu próprio servidor e decida se os prós e contras fazem sentido antes de se comprometer com qualquer coisa.
