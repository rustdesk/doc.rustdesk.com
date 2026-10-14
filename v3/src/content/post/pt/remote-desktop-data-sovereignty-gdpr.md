---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-04T17:05:00Z
lang: 'pt'
translationKey: 'remote-desktop-data-sovereignty-gdpr'
draft: false
title: 'Soberania de Dados em Desktop Remoto & GDPR: Auto-hospedagem'
excerpt: 'Como a auto-hospedagem dá a equipes reguladas controle sobre rendezvous, relay e dados de dispositivos — e quais questões de GDPR e conformidade continuam em aberto.'
image: '~/assets/images/blog/remote-desktop-data-sovereignty-gdpr-og.webp'
category: 'Segurança'
tags: ['RustDesk', 'Segurança', 'GDPR', 'Auto-hospedagem']
author: 'RustDesk Team'
slug: 'soberania-de-dados-em-desktop-remoto-and-gdpr-auto-hospedagem'
faq:
  - question: 'O RustDesk está em conformidade com ISO 27001, SOC 2 ou HIPAA?'
    answer: 'O RustDesk auto-hospedado é avaliado dentro do seu próprio programa de conformidade: o ID/rendezvous, o relay e o console rodam em infraestrutura que você opera, então entram no seu escopo ISO 27001, nos seus controles SOC 2 ou nas suas salvaguardas HIPAA, como o restante do ambiente. A auto-hospedagem é um controle de implantação, não uma certificação. Pergunte a sales@rustdesk.com quais relatórios do fornecedor, BAA, DPA ou documentos para compras estão disponíveis no seu cenário.'
  - question: 'A auto-hospedagem do RustDesk ajuda na conformidade com o GDPR?'
    answer: 'Sim — ela dá o controle que o GDPR normalmente exige: você escolhe onde ficam o ID/rendezvous, o relay, o console e os dados de dispositivos e pode mantê-los na região, em infraestrutura que você opera. Isso é uma base sólida, não uma garantia automática, porque o GDPR é um programa: base legal, papéis de controlador e operador, retenção, controle de acesso, localização dos endpoints e resposta a incidentes continuam a ser definidos por você, e o controlador segue responsável.'
  - question: 'Para onde vão, de fato, os dados de sessão do RustDesk?'
    answer: 'O RustDesk tenta primeiro uma conexão direta ponto a ponto; se ela falhar, o tráfego passa pelo relay que você configurou. A auto-hospedagem tira do caminho um rendezvous e um relay operados por fornecedor, mas uma sessão entre endpoints em países diferentes continua atravessando essas redes — a localização do servidor, sozinha, não confina todo o tráfego a uma única jurisdição.'
  - question: 'Posso manter os dados de área de trabalho remota dentro da UE com o RustDesk?'
    answer: 'Sim. Você pode colocar o ID/rendezvous, o relay, o console e os dados de dispositivos armazenados em um data center na UE. Para restringir também o tráfego das sessões, os dois endpoints precisam estar dentro da fronteira e a política deve forçar o tráfego pelo relay aprovado; documente a localização dos endpoints e o roteamento junto com a localização dos servidores.'
  - question: 'Quais recursos do RustDesk ajudam a atender ao GDPR?'
    answer: 'O RustDesk Server Pro oferece logs de auditoria com retenção configurável (Configurações > Outros > Retenção de logs (dias); 0 mantém os logs indefinidamente), Controle de acesso e Função de controle para o privilégio mínimo, SSO via LDAP/OIDC, consentimento por conexão, modo de privacidade no Windows e no macOS e exclusão de usuários e dispositivos pelo console ou pela API para pedidos de eliminação. A auto-hospedagem permite escolher onde tudo isso roda.'
metadata:
  description: 'Soberania de dados e GDPR no acesso remoto: o que a auto-hospedagem controla, sessões diretas vs. via relay e por que a conformidade vai além do servidor.'
  keywords: 'soberania de dados em desktop remoto, GDPR no acesso remoto, residência de dados em desktop remoto, conformidade de acesso remoto auto-hospedado'
---

Se a sua organização está sujeita ao GDPR, a regras de privacidade da área da saúde ou a uma exigência do setor público do tipo "nossos dados ficam na nossa infraestrutura", uma pergunta decide quais ferramentas de área de trabalho remota podem sequer entrar na lista: **para onde vão, de fato, os dados da sessão?**

Em um serviço hospedado pelo fornecedor, em geral é o fornecedor que opera a coordenação e armazena os dados de gerenciamento e de conta. A mídia da sessão pode trafegar diretamente entre os endpoints ou passar por um relay. Uma análise de fluxo de dados precisa distinguir esses caminhos; "intermediado pela nuvem" não significa que cada pacote de tela passe por ela.

Este guia trata de **soberania de dados em área de trabalho remota**: o que significa, por que importa para compradores regulados e da UE e quais partes de uma implantação de acesso remoto a auto-hospedagem permite controlar. Vamos usar o RustDesk como exemplo prático.

## O que "soberania de dados" significa no acesso remoto

Soberania de dados é o princípio de que os dados estão sujeitos às leis do país onde são fisicamente armazenados e processados. No suporte remoto, os dados sensíveis não são apenas os arquivos que você transfere — é a própria sessão: o que aparece na tela, a lista de dispositivos que você gerencia, os metadados de conexão e, muitas vezes, o roteamento dos pixels em tempo real.

As perguntas centrais são: **quais sistemas armazenam metadados, quais sistemas retransmitem o tráfego e onde estão os dois endpoints?** A auto-hospedagem pode tirar do caminho um serviço de rendezvous ou relay operado por fornecedor, mas não garante que uma sessão entre endpoints em países diferentes permaneça em uma única jurisdição.

## A diferença central: nuvem do fornecedor vs. sua infraestrutura

É aqui que a arquitetura, e não o marketing, decide o resultado.

**O RustDesk Server Pro é auto-hospedado.** O servidor ID/rendezvous, o servidor relay, o console web e os dados de dispositivos gerenciados rodam na infraestrutura que você escolher. O RustDesk tenta primeiro uma conexão direta ponto a ponto por hole punching; se isso falhar, o tráfego da sessão passa pelo relay que você configurou. Isso dá a você controle sobre a camada de rendezvous/relay e sobre os dados de dispositivos armazenados, mas são os endpoints e suas rotas de rede que determinam por onde passa o tráfego direto.

|                                      | Ferramentas na nuvem do fornecedor  | RustDesk auto-hospedado                                                                               |
| ------------------------------------ | ----------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Onde as sessões são coordenadas      | Na nuvem do fornecedor              | No seu servidor ID/rendezvous                                                                         |
| Por onde passa o tráfego da sessão   | Roteamento definido pelo fornecedor | Direto entre os endpoints quando possível; caso contrário, pelo seu relay                             |
| Quem controla a residência dos dados | O fornecedor                        | Você escolhe a localização do lado do servidor e a política de relay; os endpoints continuam importando |
| Auditabilidade do cliente            | Em geral, código fechado            | [Código aberto (AGPL)](https://github.com/rustdesk/rustdesk) — leia e compile você mesmo              |
| Quem opera o servidor                | O fornecedor                        | A sua equipe                                                                                          |

As equipes que avaliam a auto-hospedagem costumam citar esse controle em primeiro lugar: escolher a localização e o operador dos sistemas de rendezvous, relay e gerenciamento.

## Vantagem 1: você controla a localização dos dados do lado do servidor

Coloque os serviços de ID, relay e gerenciamento em um data center na Alemanha e você consegue documentar exatamente onde ficam esses serviços e os dados que eles armazenam. Mantenha os dois endpoints dentro da fronteira exigida e force o tráfego pelo relay aprovado, e você também consegue restringir a rota da sessão.

## Vantagem 2: código aberto significa que você pode verificar o cliente

O **cliente RustDesk e o RustDesk Server OSS (o servidor comunitário gratuito) são [licenciados sob a AGPL](https://github.com/rustdesk/rustdesk)**; **o Server Pro é um software de servidor auto-hospedado, comercial e proprietário**. Sua equipe de segurança pode ler o código do cliente, auditar o que ele faz em um endpoint e compilá-lo por conta própria. Isso pesa mais do que o normal no acesso remoto: o software recebe a confiança de controlar uma máquina inteira, e compradores regulados querem cada vez mais verificar o que um cliente faz, em vez de aceitar a palavra do fornecedor.

## Vantagem 3: um modelo diferente de licenciamento do servidor

Os planos padrão do RustDesk são licenciados **por usuário com login e por dispositivo gerenciado** e incluem conexões simultâneas ilimitadas; somente o [Customized V2](https://rustdesk.com/pricing#custom2) licencia uma quantidade definida de conexões simultâneas. Você pode [fazer o upgrade de uma licença](/pt/blog/atualizar-a-licenca-do-rustdesk-no-meio-da-assinatura-como-funciona) a qualquer momento, conforme os requisitos mudam.

O modelo acompanha o tamanho do seu parque: o [guia de planejamento para frotas grandes](/pt/blog/o-rustdesk-consegue-escalar-para-200-000-dispositivos) cobre implantações de até 200.000 dispositivos. O Server Pro acrescenta [Controle de acesso](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/permissions/) por usuário e por grupo de dispositivos, além de SSO via LDAP/OIDC e geração de cliente personalizado a partir do plano Basic.

## Como o RustDesk se encaixa nos requisitos de ISO 27001, SOC 2 ou HIPAA

Equipes de compras corporativas e da área da saúde quase sempre perguntam como uma ferramenta de acesso remoto se relaciona com ISO 27001, SOC 2 ou HIPAA. Com um produto em nuvem, você depende da certificação que o fornecedor tem da própria infraestrutura e dos termos de responsabilidade compartilhada. O RustDesk auto-hospedado funciona ao contrário: o ID/rendezvous, o relay e o console rodam em infraestrutura que o seu programa já cobre, então você os avalia dentro do seu próprio escopo ISO 27001, dos seus controles SOC 2 ou das suas salvaguardas HIPAA, e sua equipe de segurança pode inspecionar o código-fonte do cliente como parte dessa avaliação. A auto-hospedagem é um controle de implantação, não uma certificação; é a avaliação que a coloca dentro do escopo.

Algumas notas práticas:

- A auto-hospedagem permite escolher a localização e o operador do rendezvous, do relay, do console e dos dados de gerenciamento armazenados. Documente o roteamento dos endpoints, os backups e o acesso de administradores junto com essas localizações.
- Se o seu processo de compras exige especificamente um relatório SOC 2 do fornecedor, um Business Associate Agreement (BAA) assinado, um DPA ou questionários de segurança preenchidos, pergunte à equipe do RustDesk em [sales@rustdesk.com](mailto:sales@rustdesk.com) o que está disponível hoje para o seu cenário.
- Como o cliente é de código aberto, a pergunta "como sabemos o que ele faz?" é respondida pela inspeção; relatórios de garantia do fornecedor respondem a outra pergunta do processo de compras.

Em resumo, a auto-hospedagem traz o acesso remoto para dentro do programa de conformidade que você já opera, o que muitas vezes é uma posição mais forte para uma equipe regulada do que depender da certificação de um fornecedor sobre uma infraestrutura que você não pode inspecionar.

## Controles que apoiam um programa de GDPR auto-hospedado

A auto-hospedagem é a base e, sobre ela, o RustDesk oferece controles concretos em que as equipes auto-hospedadas se apoiam em um programa de GDPR:

- **Os dados do servidor ficam onde você os coloca, com uma lista curta de fluxos de saída.** Os serviços auto-hospedados de ID/rendezvous, relay e gerenciamento Pro processam os dados da implantação onde você os executa. Os fluxos de saída a documentar são a validação da licença Pro (HTTPS para rustdesk.com cerca de uma vez por dia), o serviço de build de clientes personalizados, as atualizações do cliente, o SMTP, se você configurar um servidor de e-mail externo, e qualquer provedor de identidade externo que você conectar. Veja o [guia do Server Pro offline e em rede isolada](/pt/blog/o-rustdesk-server-pro-pode-funcionar-offline-ou-em-rede-isolada-air).
- **Retenção de auditoria configurável.** Os [logs de auditoria do Server Pro](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/audit-logs/#visibilidade-e-retenção-de-logs) cobrem conexões, transferência de arquivos, alarmes e operações do console. Em **Configurações → Outros → Retenção de logs (dias)** (Settings → Other → Log Retention (Days)), `0` mantém todos os logs indefinidamente; um valor positivo exclui os logs mais antigos, com limpeza uma vez por hora. Defina separadamente a retenção de exportações e backups.
- **Acesso granular e delimitado.** O [Controle de acesso](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/permissions/) define quem pode acessar quais dispositivos por meio de atribuições por usuário, grupos de dispositivos e regras entre grupos (as permissões de grupos de usuários e de grupos de dispositivos são cumulativas). O catálogo de endereços compartilhado apenas organiza entradas; ele não é uma fronteira de acesso. A [Função de controle](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/control-role/) limita o que um técnico pode fazer durante a sessão — teclado/mouse, área de transferência, transferência de arquivos, áudio, câmera, terminal, impressão, gravação e mais. Junto com SSO/LDAP e 2FA no dispositivo controlado, esses controles aplicam o privilégio mínimo e a limitação de finalidade.
- **Modo de privacidade e consentimento por conexão.** O lado controlado pode exigir aprovação para cada conexão recebida, e o modo de privacidade (suportado no Windows e no macOS) apaga a tela local durante a sessão, limitando a exposição acidental de dados pessoais na tela.
- **Exclusão nos seus termos.** Como os dados ficam no seu servidor, você pode desativar ou remover usuários, excluir dispositivos e registros — inclusive pela API REST — e atender diretamente a pedidos de eliminação e de retenção.
- **Infraestrutura na região, operada por você.** O ID/rendezvous, o relay, o console e os dados armazenados rodam onde você os coloca, em hardware que você controla.
- **Os builds de cliente personalizado são temporários.** Gerar um cliente com a sua marca é a única etapa que usa o serviço de build do RustDesk, e ela é propositalmente de curta duração: a configuração de build enviada é excluída assim que o build termina, e o instalador gerado é removido automaticamente depois de cerca de um dia, então você o baixa e o guarda no seu próprio repositório aprovado.

Essas são alavancas que um programa de GDPR consegue de fato acionar: você ainda as documenta e opera, mas não fica esperando um fornecedor agir sobre a solicitação de um titular de dados.

## Soberania que você pode demonstrar

Hospedar você mesmo o rendezvous, o relay, o console e os dados armazenados dá ao programa de conformidade algo concreto: infraestrutura que você posiciona, opera e audita. É um ponto de partida, e não a linha de chegada, mas é a parte sobre a qual todo o resto se apoia.

## Checklist de implantação para GDPR e soberania

A auto-hospedagem dá opções; a implantação precisa transformar essas opções em controles:

- Documente onde ficam o servidor de ID, o relay, o console, os backups, os logs e os administradores.
- Mapeie as rotas diretas ponto a ponto separadamente das rotas via relay. Um servidor na Alemanha não mantém dentro da Alemanha uma sessão direta entre a Alemanha e outro país.
- Decida quando o relay deve ser forçado, porque rotear por um local controlado importa mais do que o desempenho ponto a ponto.
- Registre a finalidade, o período de retenção e a política de acesso dos metadados de dispositivos, contas, auditoria e conexões.
- Aplique grupos de dispositivos com privilégio mínimo, MFA/SSO onde houver e um processo de entrada, mudança e saída (joiner-mover-leaver) para técnicos.
- Coloque o console web atrás de HTTPS, restrinja o acesso administrativo pela rede e teste a restauração dos backups.
- Conclua a avaliação jurídica adequada ao seu caso de uso — como o registro das operações de tratamento, a avaliação de operadores, a avaliação de transferências internacionais e a DPIA.

O RustDesk pode apoiar uma arquitetura de soberania, mas o controlador continua responsável pela arquitetura e por sua base legal.

## Avalie dentro do seu próprio perímetro

Você pode avaliar nos seus próprios termos. Auto-hospede o Server OSS hoje mesmo ou envie um e-mail para [sales@rustdesk.com](mailto:sales@rustdesk.com) para conhecer as condições de avaliação atuais dos recursos Pro. Confira os planos atuais e os recursos exatos em [rustdesk.com/pricing](https://rustdesk.com/pricing). Prefere assistir antes? Há um tutorial completo em vídeo no [canal do RustDesk no YouTube](https://www.youtube.com/@rustdesk).
