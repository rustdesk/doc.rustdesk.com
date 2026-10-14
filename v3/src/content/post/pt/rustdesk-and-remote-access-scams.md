---
publishDate: 2026-07-06T12:36:00Z
updateDate: 2026-10-14T00:00:00Z
lang: pt
translationKey: rustdesk-and-remote-access-scams
draft: false
title: 'RustDesk e Golpes de Acesso Remoto: O Que Estamos Fazendo'
excerpt: 'Por que o RustDesk saiu da Google Play, adicionou avisos e exigiu login no servidor público, e como proteger dispositivos controlados com senhas, 2FA e listas de IPs e de IDs permitidos.'
image: ~/assets/images/blog/rustdesk-and-remote-access-scams-og.webp
category: 'Segurança'
tags: ['RustDesk', 'Segurança', 'Golpes']
author: RustDesk Team
slug: 'rustdesk-e-golpes-de-acesso-remoto-o-que-estamos-fazendo'
faq:
  - question: 'O RustDesk é um golpe?'
    answer: 'Não. O RustDesk é um software legítimo de acesso remoto de código aberto. Como outras ferramentas de área de trabalho remota, porém, ele pode ser usado de forma abusiva quando um golpista convence alguém a instalá-lo, iniciar o serviço e conceder acesso. O RustDesk publica avisos sobre golpes e adotou restrições na distribuição e no servidor público para reduzir esse abuso, mas nenhum produto de acesso remoto consegue tornar a engenharia social impossível.'
  - question: 'Por que o RustDesk não está disponível na Google Play?'
    answer: 'O RustDesk removeu voluntariamente seu aplicativo Android da Google Play em setembro de 2023 para evitar novos golpes direcionados a usuários. As versões para Android continuam disponíveis nos releases oficiais do RustDesk no GitHub e na F-Droid. Baixe apenas de fontes que você mesmo verificou, nunca de um link enviado por alguém que ligou sem ser chamado.'
  - question: 'Por que o servidor público do RustDesk exige login?'
    answer: 'O RustDesk exige atualmente o login do controlador em seu servidor público por causa dos golpes e abusos de botnets que continuam ocorrendo. O login é gratuito por meio de provedores de identidade terceirizados compatíveis. O servidor público destina-se a demonstração e testes, não a produção ou trabalho sensível; a auto-hospedagem continua disponível para organizações que precisam operar sua própria infraestrutura e políticas.'
  - question: 'Como devo proteger um dispositivo que aceita conexões do RustDesk?'
    answer: 'Defina uma senha permanente forte e exclusiva no dispositivo controlado, ative no cliente a 2FA por TOTP para conexões e use a lista de IPs permitidos quando os endereços ou intervalos CIDR dos controladores forem previsíveis. A partir do RustDesk 1.5.0, uma lista de IDs permitidos também pode limitar quais IDs do RustDesk podem se conectar. Mantenha as exceções de dispositivos confiáveis restritas. Essas camadas reduzem os riscos ligados a senhas e à origem de rede, mas não protegem quem entrega deliberadamente ao golpista a senha, o código 2FA atual ou a aprovação manual.'
metadata:
  description: 'Como o RustDesk combate golpes de acesso remoto: avisos, saída da Google Play, login no servidor público, 2FA e listas de IPs e de IDs permitidos.'
  keywords: 'golpe RustDesk, RustDesk é golpe, RustDesk Google Play, RustDesk login obrigatório, RustDesk 2FA, lista de IPs permitidos RustDesk, lista de IDs permitidos RustDesk, prevenção de golpes de acesso remoto'
---

O RustDesk é um software legítimo de acesso remoto de código aberto, mas softwares legítimos podem ser usados de forma abusiva. Um golpista pode ligar para uma vítima, inventar um problema urgente e persuadi-la a instalar uma ferramenta de controle remoto e conceder acesso. O RustDesk não está isento desse risco, e a criptografia não pode corrigir um consentimento obtido por meio de engano.

Nossa resposta tem sido inserir avisos e pontos de atrito em vários momentos desse caminho: em nosso site, no fluxo do dispositivo controlado Android, em um importante canal de distribuição e no servidor público. Essas medidas também incomodam usuários legítimos. Este artigo documenta o que fizemos, por que fizemos e onde permanecem os limites.

## O que o RustDesk fez em relação aos golpes de acesso remoto?

| Ação                                             | O que resolve                                                                      | Custo ou limitação                                                                               |
| ------------------------------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Avisos no site e no cliente                      | Uma pessoa sendo instruída a instalar o RustDesk por um interlocutor desconhecido  | Um aviso ainda pode ser ignorado                                                                 |
| Saída voluntária da Google Play                  | Instalação fácil motivada por golpes por meio de uma loja de aplicativos conhecida | Usuários legítimos do Android perdem a descoberta na loja e as atualizações automáticas do Play  |
| Login no servidor público                        | Uso anônimo de infraestrutura compartilhada por golpistas e botnets                | Usuários legítimos precisam fazer login e alguns fluxos de trabalho existentes são interrompidos |
| Controles de segurança do dispositivo controlado | Roubo de senha, ampla exposição de rede e risco de acesso não assistido            | Precisam ser configurados corretamente e não conseguem impedir a divulgação voluntária           |

Essas são medidas de redução de risco, não uma alegação de que o RustDesk é à prova de golpes.

## Avisos nos locais onde uma vítima em potencial pode vê-los

A [página de suporte do RustDesk](https://rustdesk.com/support) começa com um aviso direto sobre golpes. Ela instrui as pessoas que estão ao telefone com alguém que não conhecem nem em quem confiam, e que foram solicitadas a instalar o RustDesk, a parar. O [repositório do RustDesk no GitHub](https://github.com/rustdesk/rustdesk) também traz um aviso contra o uso indevido para acesso não autorizado, controle e invasão de privacidade.

O aviso também está presente no cliente oficial para Android distribuído pelo [GitHub Releases](https://github.com/rustdesk/rustdesk/releases). Em um dispositivo Android sem login que será controlado, tocar em **Iniciar Serviço** abre um aviso antes que o serviço de captura de tela seja iniciado. O aviso instrui o usuário que foi orientado por um interlocutor desconhecido e não confiável a parar e desligar. As versões oficiais impõem uma contagem regressiva antes que o usuário possa continuar. Tanto o [fluxo atual do lado controlado](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/flutter/lib/mobile/pages/server_page.dart#L244-L421) quanto o [texto do aviso em inglês](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/src/lang/en.rs#L192-L194) estão visíveis no repositório de código aberto.

Esse posicionamento importa. Uma página geral de segurança pode alcançar alguém que está pesquisando um produto; um aviso em **Iniciar Serviço** alcança a pessoa no exato momento em que uma sessão Android de entrada está prestes a se tornar possível. Ainda assim, isso não pode obrigar essa pessoa a desconfiar de um interlocutor convincente.

## Por que o RustDesk não está na Google Play

Em 3 de setembro de 2023, a conta oficial do RustDesk no X afirmou: [“Removemos temporariamente a publicação do RustDesk na Google Play para evitar mais golpes direcionados a usuários.”](https://x.com/rustdesk/status/1698372220379349421) O link e o texto também estão preservados na [Discussão nº 5660 do GitHub](https://github.com/rustdesk/rustdesk/discussions/5660), já respondida, e o atual [FAQ do RustDesk afirma que o projeto se retirou da Google Play por causa de golpes](https://github.com/rustdesk/rustdesk/wiki/FAQ#apple--google-store).

Portanto, o RustDesk **atualmente não é distribuído pela Google Play**. Isso não foi uma alegação de que o cliente Android fosse malware, nem de que toda pessoa que o instalasse estivesse em risco. Foi uma decisão de distribuição destinada a reduzir um caminho comum usado em instruções de golpes.

A contrapartida é real: sair da Google Play reduz a facilidade de descoberta, a instalação familiar e as atualizações automáticas da loja para usuários legítimos. As versões atuais para Android estão disponíveis nos [releases oficiais do RustDesk no GitHub](https://github.com/rustdesk/rustdesk/releases) e na [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/). Verifique o destino você mesmo. Não instale um APK a partir de um link enviado por alguém que ligou oferecendo suporte sem ser chamado. Nosso [guia de Android e iOS](/pt/blog/controle-remoto-rustdesk-no-android-e-ios-o-que-funciona) lista os recursos móveis atuais e as fontes de instalação.

## Por que o servidor público exige login

O atual [guia de login no servidor público](https://github.com/rustdesk/rustdesk/wiki/Login-required-for-public-server) do RustDesk afirma que o login do controlador é exigido devido a golpes contínuos e abuso de botnets. O login é gratuito e usa um provedor de identidade terceirizado compatível, como Google ou GitHub; um nome de usuário e senha separados não são oferecidos no servidor público. O guia atualmente afirma que apenas os controladores são obrigados a fazer login.

Isso adiciona uma etapa de identidade e remove parte do acesso anônimo à infraestrutura que o RustDesk opera para demonstração e testes. A exigência não vale para servidores RustDesk privados e não consegue impedir um golpista que use outra infraestrutura ou estabeleça uma nova identidade.

Isso também causou transtornos. Em uma [discussão no Reddit sobre o novo erro de login](https://www.reddit.com/r/rustdesk/comments/1sm91xv/getting_this_error_when_trying_to_connect_anyone/), alguns usuários legítimos relataram não conseguir acessar dispositivos domésticos ou familiares até entenderem e concluírem a etapa de login. Outros se opuseram a vincular uma identidade de terceiros. Esses comentários não são prova de que a restrição funciona ou falha contra golpistas, mas documentam seu custo operacional. A prevenção de abuso que adiciona atrito deve reconhecer esse custo com clareza.

## Como proteger um dispositivo controlado pelo RustDesk?

As restrições em nível de plataforma são apenas uma camada. O proprietário ou administrador de um dispositivo controlado também deve reduzir quem pode se conectar e o que uma credencial roubada pode fazer.

### 1. Defina uma senha permanente forte e exclusiva

Para [acesso não assistido](/pt/blog/acesso-nao-assistido-do-rustdesk-guia-de-configuracao), defina uma **senha permanente forte e exclusiva** nas configurações de segurança do RustDesk no dispositivo controlado. Não reutilize o login do sistema operacional, a senha de e-mail ou uma senha usada em outro serviço. Altere-a imediatamente se houver possibilidade de ela ter sido divulgada.

Para suporte assistido, prefira uma senha temporária de uso único ou aprovação explícita por clique, quando viável. Uma senha permanente forte reduz o risco de adivinhação, de credential stuffing e de reutilização de senha. Isso não ajuda se a vítima ler essa senha em voz alta para quem ligou.

### 2. Ative a 2FA no dispositivo controlado

O RustDesk inclui 2FA por TOTP para conexões de entrada em um dispositivo controlado. No dispositivo que aceitará conexões, abra as configurações de segurança, ative a **2FA**, escaneie o código QR com um autenticador e confirme a configuração com o código de seis dígitos.

Uma vez ativada, aceitar a senha de conexão normal não é suficiente: o controlador também deve fornecer o código TOTP atual de seis dígitos antes que o dispositivo controlado autorize a sessão. O recurso foi introduzido especificamente como [2FA para acesso não assistido](https://github.com/rustdesk/rustdesk/commit/44e6b7dbb0125dc0c288c19a16a944b5d605852b), e sua [implementação de TOTP é pública](https://github.com/rustdesk/rustdesk/blob/master/src/auth_2fa.rs).

Opcionalmente, o RustDesk pode confiar em um dispositivo controlador e ignorar solicitações de 2FA posteriores. Deixe esse desvio desativado para obter o comportamento mais rigoroso. Se você o utilizar, revise a lista de dispositivos confiáveis e remova os dispositivos perdidos, substituídos, compartilhados ou que não estejam mais autorizados.

A 2FA protege contra uma senha que tenha sido adivinhada, reutilizada ou exposta. Ela não consegue proteger alguém que fornece a um golpista tanto a senha quanto o código atual do autenticador.

### 3. Restrinja conexões de entrada com uma lista de IPs permitidos

A interface do RustDesk chama esse recurso de **Lista de IPs Permitidos** (IP Whitelisting, na interface em inglês). Na prática, é uma lista de permissão: o dispositivo controlado rejeita uma conexão cujo endereço de origem esteja fora da lista configurada, antes mesmo da autorização por senha e 2FA.

Configure em:

- **Dispositivo controlado de desktop:** **Configurações → Segurança → Segurança → Utilizar lista de IPs permitidos**
- **Dispositivo controlado móvel:** **Configurações → Compartilhar Tela → Utilizar lista de IPs permitidos**

A configuração aceita endereços IPv4 ou IPv6 individuais e intervalos CIDR. O CIDR combina um endereço de rede com um comprimento de prefixo. O prefixo indica quantos bits iniciais são fixos: um prefixo maior significa um intervalo permitido menor.

- `203.0.113.10` ou `203.0.113.10/32`: um endereço IPv4.
- `203.0.113.0/24`: 256 endereços IPv4, de `203.0.113.0` até `203.0.113.255`.
- `2001:db8::10/128`: um endereço IPv6.
- `2001:db8:1234::/64`: uma sub-rede IPv6.

Esses são intervalos de exemplo apenas para fins de documentação; não os copie sem alterá-los. Insira os endereços ou as redes reais dos seus controladores. Várias entradas podem ser separadas por vírgulas, ponto e vírgula, espaços ou quebras de linha. O RustDesk documenta essa configuração em sua [referência de configuração avançada do cliente](https://rustdesk.com/docs/pt/self-host/client-configuration/advanced-settings/#whitelist), e a [aplicação no lado controlado está visível no código-fonte](https://github.com/rustdesk/rustdesk/blob/1.5.0/src/server/connection.rs#L1410-L1437).

Use os menores intervalos práticos possíveis. Endereços de saída fixos do escritório e intervalos de VPN conhecidos são bons candidatos. Endereços residenciais dinâmicos e controladores móveis não são. Confirme qual endereço de origem o RustDesk identifica em sua topologia de NAT, VPN, conexão direta ou relay, e teste a nova regra a partir de outra sessão antes de encerrar a sessão em uso. Um endereço ou CIDR incorreto pode bloquear o acesso da equipe de suporte legítima.

Uma lista de IPs permitidos restringe de onde uma conexão pode se originar. Ela não substitui uma senha ou a 2FA, e não consegue impedir um controlador malicioso que já esteja operando a partir de uma rede permitida.

### 4. Limite quais IDs do RustDesk podem se conectar

A partir do RustDesk 1.5.0, um dispositivo controlado também pode aceitar conexões apenas de IDs do RustDesk listados. A interface chama esse recurso de **Lista de IDs permitidos** (ID whitelisting, na interface em inglês). Ele é indicado para equipes de suporte cujos endereços de rede mudam, mas cujos dispositivos controladores são conhecidos, situação em que uma lista de IPs permitidos não é viável.

Configure em:

- **Dispositivo controlado de desktop:** **Configurações → Segurança → Segurança → Utilizar lista de IDs permitidos**
- **Dispositivo controlado móvel:** **Configurações → Compartilhar Tela → Utilizar lista de IDs permitidos**

Insira os IDs do RustDesk dos dispositivos autorizados a controlar este. Assim como na lista de IPs, as entradas podem ser separadas por vírgulas, ponto e vírgula, espaços ou quebras de linha. A correspondência não diferencia maiúsculas de minúsculas, e há suporte a dois curingas:

- `123456789`: um ID.
- `12345678?`: `?` corresponde a exatamente um caractere, então este exemplo permite qualquer ID de nove caracteres que comece com `12345678`.
- `support-*`: `*` corresponde a qualquer número de caracteres, o que ajuda quando seus controladores usam IDs personalizados com um prefixo em comum.

Esses também são valores de exemplo. A configuração aparece como `id-whitelist` na [referência de configuração avançada do cliente](https://rustdesk.com/docs/pt/self-host/client-configuration/advanced-settings/#id-whitelist), de modo que administradores podem predefini-la em um cliente personalizado, e a [sua aplicação está visível no código-fonte](https://github.com/rustdesk/rustdesk/blob/1.5.0/src/server/connection.rs#L1439-L1467).

A verificação ocorre quando o controlador envia sua solicitação de login, antes que a senha ou o código 2FA sejam verificados. Ela também se aplica quando os dois lados de uma sessão trocam de papel, operação que, de outra forma, não exige senha. Se uma lista de IPs permitidos também estiver configurada, a conexão precisa passar pelas duas. Um controlador rejeitado vê a mensagem “Seu ID foi bloqueado pelo dispositivo remoto”, e as tentativas estão sujeitas a limite de taxa, então não é possível sondar a lista rapidamente em busca de IDs permitidos.

Saiba qual é o limite dela. O ID é informado pelo cliente que se conecta. Ele não é prova de identidade, e um cliente modificado pode alegar um ID permitido; o RustDesk exibe essa ressalva ao lado da configuração. O que a lista faz é barrar clientes comuns com IDs não listados antes que cheguem à solicitação de senha. Em um dispositivo no qual um administrador predefiniu a lista, quem liga e convence o usuário a ler em voz alta o ID e a senha ainda assim não consegue se conectar a partir de um ID não listado usando o cliente padrão. Mantenha uma senha forte e a 2FA ativas, e teste a lista a partir de outra sessão antes de encerrar uma sessão em uso: um erro de digitação pode bloquear o acesso da equipe de suporte legítima.

## O que essas medidas não conseguem fazer

Avisos, saída da loja, exigência de login, senhas fortes, 2FA e listas de IPs e de IDs permitidos eliminam, cada um, parte da oportunidade de um invasor. Nenhum deles elimina o risco central de engenharia social: uma pessoa ainda pode ser persuadida a aprovar o acesso ou revelar todos os fatores.

A auto-hospedagem também não torna o abuso impossível. Ela dá a uma organização controle sobre seu servidor RustDesk e suas políticas, mas um golpista também pode operar infraestrutura privada ou distribuir um cliente modificado. As restrições do servidor público do RustDesk valem apenas para o servidor público; uma implantação auto-hospedada segue as políticas que o próprio operador definir.

Se um interlocutor desconhecido disser para você instalar o RustDesk, iniciar seu serviço, compartilhar uma senha, revelar um código de 2FA ou abrir um site bancário, pare. Nosso guia neutro em relação a fornecedores sobre [como identificar, prevenir e se recuperar de golpes de área de trabalho remota](/pt/blog/golpes-de-acesso-remoto-como-identificar-e-evitar) explica os sinais de alerta e o que fazer caso o acesso já tenha sido concedido.

Responsabilidade, aqui, não é uma única configuração nem uma declaração de boas intenções. É o trabalho contínuo de alertar os usuários, aceitar atrito onde o abuso o exige, fornecer controles técnicos, documentar seus limites e adaptar a resposta à medida que os invasores mudam seus métodos.
