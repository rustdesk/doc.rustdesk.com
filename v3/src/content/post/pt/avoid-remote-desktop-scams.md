---
publishDate: 2026-07-03T08:18:00Z
lang: 'pt'
translationKey: 'avoid-remote-desktop-scams'
draft: false
title: 'Golpes de Acesso Remoto: Como Identificar e Evitar'
excerpt: 'Como funcionam os golpes de acesso remoto, os sinais de alerta que os denunciam e exatamente o que fazer se um golpista já tiver assumido o controle do seu computador.'
image: '~/assets/images/blog/avoid-remote-desktop-scams-og.webp'
category: 'Segurança'
tags: ['Segurança', 'Solução de problemas']
author: 'RustDesk Team'
slug: 'golpes-de-acesso-remoto-como-identificar-e-evitar'
faq:
  - question: 'O que é um golpe de acesso remoto?'
    answer: 'É uma forma de fraude em que um criminoso convence você a instalar um software de acesso remoto legítimo e depois o usa para controlar o seu computador, geralmente para movimentar dinheiro, roubar dados ou instalar malware. As ferramentas são as mesmas que as equipes de TI usam todos os dias. O que torna isso um golpe é o fato de a pessoa do outro lado ter entrado em contato sob falsos pretextos e convencido você a conceder acesso.'
  - question: 'Um golpista pode acessar meu computador se eu nunca dei um código a ele nem instalei nada?'
    answer: 'No fluxo típico de engenharia social descrito aqui, recusar-se a instalar a ferramenta do interlocutor ou compartilhar um código de conexão geralmente interrompe essa tentativa. Isso não descarta a possibilidade de acesso não assistido já existente, credenciais roubadas, malware ou serviços expostos, como o RDP. Se você notar sessões ou atividades de conta inexplicadas, desconecte o dispositivo e investigue, mesmo que nunca tenha compartilhado um novo código.'
  - question: 'O que devo fazer assim que perceber que fui vítima de um golpe?'
    answer: 'Desconecte o dispositivo da internet, desinstale o aplicativo de acesso remoto que fizeram você executar e altere suas senhas a partir de um dispositivo confiável diferente, começando pelo e-mail e pelo banco. Ligue para o seu banco ou para a operadora do cartão para denunciar a fraude e registre uma denúncia junto à FTC em ReportFraud.ftc.gov e ao Internet Crime Complaint Center do FBI em ic3.gov. Se você compartilhou dados de identidade, solicite um alerta de fraude ou um bloqueio de crédito junto à Equifax, Experian e TransUnion.'
  - question: 'Usar o RustDesk me protege de golpes?'
    answer: 'Nenhuma ferramenta de acesso remoto pode torná-lo imune a golpes, incluindo o RustDesk. Se alguém enganar você para instalar um cliente e ditar um código de conexão para essa pessoa, ela poderá assumir o controle em qualquer plataforma. O que a hospedagem própria e o código aberto mudam é o seu lado da equação: você controla seu próprio servidor de ID e de retransmissão, decide exatamente quais clientes podem se conectar e pode auditar o código. Isso reduz certos riscos, mas não substitui a cautela básica sobre quem você deixa entrar.'
metadata:
  description: 'Como funcionam os golpes de acesso remoto, os sinais de alerta a observar e exatamente o que fazer se um golpista já tiver assumido o controle do seu computador.'
  keywords: 'golpes de acesso remoto, golpe de acesso remoto, golpe de suporte técnico, como evitar golpe de acesso remoto, golpista acesso remoto computador, denunciar golpe de suporte técnico'
---

Um golpe de acesso remoto é um tipo de fraude em que um criminoso convence você a instalar um software de acesso remoto legítimo e, em seguida, o usa para assumir o controle do seu computador — para esvaziar uma conta bancária, roubar dados ou instalar malware. As próprias ferramentas são as mesmas que os departamentos de TI usam todos os dias. O que transforma isso em golpe é quem está do outro lado da linha e como essa pessoa conseguiu entrar.

Este guia é deliberadamente neutro em relação a fornecedores. Qualquer produto de acesso remoto pode ser usado de forma abusiva dessa maneira, incluindo o RustDesk. O objetivo aqui é ajudar você a reconhecer o padrão, recusá-lo e se recuperar caso já tenha caído no golpe.

## Como funciona um golpe de acesso remoto

Tanto a [Federal Trade Commission dos EUA](https://consumer.ftc.gov/articles/how-spot-avoid-and-report-tech-support-scams) quanto o [FBI](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/tech-support-scams) descrevem um roteiro surpreendentemente consistente:

1. **A isca.** Um pop-up avisa que "seu computador está infectado", ou você recebe uma ligação, um e-mail ou uma mensagem de texto inesperada. O remetente se passa por um nome em que você confia — Microsoft, Apple, Amazon, seu banco, uma concessionária de serviços públicos ou até mesmo o seu próprio departamento de TI.
2. **Urgência artificial.** Sua conta foi comprometida, um vírus está se espalhando, há um reembolso à sua espera, ou o seu serviço será cortado. Segundo a FTC, os golpistas "querem que você aja antes de ter tempo para pensar", então a pressão para agir depressa é justamente o objetivo.
3. **Instalar a ferramenta.** Eles pedem que você baixe um "software gratuito de suporte remoto" para que possam "corrigir" o problema. É um software real — e é isso que torna o golpe convincente.
4. **Ditar o código em voz alta.** Você é instruído a ler para eles o ID de conexão ou o código de uso único exibido na sua tela. Essa única etapa é o momento em que eles conseguem entrar.
5. **Assumir o controle.** Eles simulam uma verificação de vírus, abrem o site do seu banco, movimentam dinheiro ou criam novas contas. O [escritório do FBI em Boston](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software) alertou que os golpistas usam esse acesso para abrir contas de moeda virtual e liquidar os saldos bancários reais das vítimas.

As perdas não são teóricas. Nesse mesmo alerta do FBI, os investigadores descreveram o caso de um casal do Maine que, depois que um pop-up os instruiu a ligar para um número da suposta "Fidelity", foi orientado a instalar um software de acesso remoto e permitir que falsos representantes da "Microsoft" e da "Fidelity" observassem suas contas — perdendo aproximadamente **US$ 1,1 milhão**.

## Os sinais de alerta

Quase todo golpe de acesso remoto aciona pelo menos um destes sinais:

- **Contato não solicitado.** Um desconhecido entra em contato para corrigir um problema no computador que você nunca relatou. A FTC é direta sobre isso: ela e seus administradores de reembolso "nunca vão pedir que você pague com cartões-presente" nem "solicitar acesso remoto ao seu dispositivo". Nem a Microsoft, a Apple ou o seu banco fariam isso.
- **Um pop-up com um número de telefone.** Avisos de segurança legítimos nunca pedem que você ligue para uma central de suporte. Esse número pertence ao golpista.
- **Pressão e urgência.** "Faça isso agora ou você vai perder tudo" é uma tática de manipulação, não um processo de suporte.
- **Um pedido para instalar um software e ditar um código.** Esse é o núcleo mecânico do golpe. Nenhum contato legítimo e não solicitado precisa disso.
- **Uma guinada para o dinheiro.** Cartões-presente, transferências bancárias, criptomoedas ou um "reembolso" que, de alguma forma, é grande demais e precisa ser "devolvido".
- **Permanecer na linha enquanto você faz login.** Eles querem observar você digitar suas credenciais bancárias.

## Suporte legítimo versus golpe

|                          | Suporte remoto legítimo                                          | Um golpe                                               |
| ------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------ |
| Quem inicia o contato    | Você entra em contato, usando um número que você mesmo pesquisou | Eles entram em contato do nada                         |
| O problema               | Um problema que você já relatou                                  | Um problema que eles "descobriram" e informaram a você |
| Urgência                 | Agendado, sem pressa                                             | "Aja agora, ou..."                                     |
| O código de conexão      | Você escolhe compartilhá-lo, conscientemente                     | Você é pressionado a ditá-lo em voz alta, rapidamente  |
| Pagamento                | Faturamento normal, se houver                                    | Cartões-presente, transferência, cripto, "reembolsos"  |
| Acesso a dados bancários | Nunca é necessário para consertar um PC                          | O verdadeiro objetivo                                  |

## O que fazer se você já deu acesso a um golpista

Se você perceber, durante a ligação ou depois dela, que foi vítima de um golpe, aja rapidamente e na seguinte ordem:

1. **Desconecte-se da internet.** Desligue o Wi-Fi ou desconecte o cabo de rede para encerrar a sessão deles imediatamente.
2. **Desinstale o aplicativo de acesso remoto** que fizeram você instalar. Se você não tiver certeza de como fazer isso, um técnico local de confiança pode ajudar.
3. **Faça uma varredura em busca de malware.** Execute uma verificação completa de antivírus; considere uma limpeza profissional caso máquinas sensíveis estejam envolvidas. Presuma que eles podem ter deixado algo para trás.
4. **Altere suas senhas a partir de um dispositivo diferente e confiável** — primeiro e-mail e banco, depois qualquer coisa que compartilhe uma senha.
5. **Ligue para o seu banco e para as operadoras dos seus cartões.** Denuncie a fraude, pergunte sobre a possibilidade de reverter transferências e fique atento a atividades não autorizadas.
6. **Proteja sua identidade.** Se você compartilhou dados pessoais, solicite um alerta de fraude ou um bloqueio de crédito junto aos três principais birôs de crédito dos EUA: Equifax, Experian e TransUnion.
7. **Denuncie o ocorrido.** Registre uma denúncia junto à FTC em [ReportFraud.ftc.gov](https://reportfraud.ftc.gov) e ao [Internet Crime Complaint Center (IC3)](https://www.ic3.gov) do FBI. Denunciar ajuda os investigadores e pode contribuir para a recuperação dos valores perdidos.

## Como preveni-lo

A prevenção se resume a alguns hábitos:

- **Nunca instale um software de acesso remoto a pedido de alguém que entrou em contato com você.** Inverta a lógica: se você precisar de ajuda, procure o número real do fornecedor e ligue para ele.
- **Nunca dite um código de conexão em voz alta** para alguém que você não tenha contatado deliberadamente.
- **Trate números de telefone exibidos em pop-ups como falsos.** Feche o navegador — forçando o encerramento, se necessário — em vez de ligar para o número.
- **Vá com calma.** A urgência é a ferramenta do golpista. Uma instituição de verdade deixa você desligar e retornar a ligação.
- **Converse sobre isso.** Esses golpes atingem desproporcionalmente idosos e pessoas sob estresse. Um simples "isso faz sentido para você?" dito a um familiar já é suficiente para quebrar o encanto.

## Onde as ferramentas de acesso remoto entram nessa história

Vale repetir: o software não é o vilão. As ferramentas de acesso remoto são o que permite que as equipes de TI mantenham os computadores do mundo inteiro funcionando, e o mesmo aplicativo pode ser uma tábua de salvação ou uma arma, dependendo de quem está no controle. Culpar um único produto não resolve a questão — a defesa está em controlar quem você deixa entrar.

Dito isso, se você _presta_ suporte remoto profissionalmente, algumas escolhas estruturais reduzem a sua exposição. Hospedar o próprio servidor RustDesk significa que os servidores de ID e de retransmissão rodam em uma infraestrutura que você controla, de modo que você decide exatamente quais clientes têm permissão para se conectar, em vez de confiar em uma nuvem de terceiros para arbitrar isso. Para a sua própria frota de dispositivos, pratique a [higiene básica de acesso não assistido](/pt/blog/acesso-nao-assistido-do-rustdesk-guia-de-configuracao): senhas permanentes fortes e exclusivas, conexões restritas aos seus grupos de dispositivos e à [lista de endereços compartilhada](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/permissions/), e autenticação de dois fatores. E, como o RustDesk é [código aberto](https://github.com/rustdesk/rustdesk), você ou uma equipe de segurança pode auditar exatamente o que ele faz nas suas máquinas.

Nada disso torna o RustDesk — ou qualquer outra ferramenta — imune a golpes. Um usuário enganado para instalar um cliente e ditar um código pode ser vitimado em qualquer plataforma. A estrutura reduz certos riscos; ela nunca substitui a regra simples que está no centro de todos os avisos acima: não entregue o controle do seu computador a alguém que entrou em contato com _você_.

Se você quiser se aprofundar em como ferramentas específicas lidam com a segurança e como elas são personificadas por golpistas, confira nossos guias complementares sobre se o [AnyDesk é seguro](/pt/blog/o-anydesk-e-seguro-criptografia-o-incidente-de-seguranca-de-2024-e) e se o [Chrome Remote Desktop é seguro](/pt/blog/o-chrome-remote-desktop-e-seguro-uma-analise-honesta).
