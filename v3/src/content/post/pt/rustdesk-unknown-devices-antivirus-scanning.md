---
publishDate: 2026-06-30T13:46:00Z
lang: 'pt'
translationKey: 'rustdesk-unknown-devices-antivirus-scanning'
draft: false
title: 'Dispositivos desconhecidos no seu console RustDesk? Investigue primeiro'
excerpt: 'Está vendo dispositivos desconhecidos no seu console RustDesk? A execução em sandbox por antivírus é uma possibilidade, mas antes é preciso descartar configuração vazada ou registro não autorizado.'
image: '~/assets/images/blog/rustdesk-unknown-devices-antivirus-scanning-og.png'
category: 'Implantação'
tags: ['RustDesk', 'Implantação', 'Segurança']
author: 'RustDesk Team'
slug: 'dispositivos-desconhecidos-no-seu-console-rustdesk-investigue-primeiro'
faq:
  - question: 'Por que aparecem dispositivos desconhecidos no meu console RustDesk que eu nunca instalei?'
    answer: 'A execução em sandbox por antivírus ou proteção de endpoint pode criar registros temporários, mas um dispositivo desconhecido também pode indicar configuração vazada, um token de implantação exposto, registro não autorizado ou um erro de implantação. Trate isso como um evento de segurança até que logs, credenciais, chaves, tokens e registros de implantação identifiquem a causa; depois, restrinja o registro de novos dispositivos.'
  - question: 'Como impeço completamente que dispositivos desconhecidos se registrem?'
    answer: 'Se a sua lista de dispositivos é estável e você não está adicionando máquinas regularmente, desative o registro de novos dispositivos no console em Configurações → Outros → Desativar novos dispositivos no console web. Nada de novo poderá se registrar depois disso, seja em sandbox ou não. Se você ainda integra dispositivos regularmente, use um token de implantação para que as implantações reais continuem funcionando.'
  - question: 'Como exigir um token de implantação para novos dispositivos?'
    answer: 'Ative Configurações → Outros → Exigir implantação para novos dispositivos no console web, crie um token de API com a permissão Dispositivos definida como Leitura e escrita, e faça com que o seu processo de instalação execute rustdesk --deploy --token <api_token> em cada novo dispositivo (com sudo no macOS e Linux). Somente dispositivos que apresentem um token válido podem se registrar, de modo que uma verificação de antivírus em sandbox não consegue se registrar sozinha, enquanto o seu RMM ou implantação via script continua funcionando normalmente.'
  - question: 'Como diferenciar uma verificação de antivírus benigna de uma intrusão real?'
    answer: 'Um registro de curta duração que coincide com uma verificação de segurança conhecida e não apresenta nenhuma sessão subsequente pode sustentar a explicação da sandbox. Sessões inesperadas, registros repetidos, uso de credenciais válidas ou um cliente configurado distribuído fora do canal pretendido não são situações benignas e exigem resposta a incidentes.'

metadata:
  description: 'Dispositivos desconhecidos no seu console RustDesk exigem investigação. Saiba como diferenciar a sandbox de antivírus de configuração vazada ou registro não autorizado.'
  keywords: 'dispositivo desconhecido rustdesk, dispositivo fantasma rustdesk, registro aleatório de dispositivo rustdesk, sandbox de antivírus rustdesk, desativar novos dispositivos rustdesk, rustdesk --deploy'
---

Um dispositivo desconhecido no console RustDesk não é suficiente, por si só, para identificar a causa. A execução em sandbox por antivírus é uma possibilidade conhecida, mas o mesmo sintoma também pode resultar de configuração vazada, registro não autorizado, um token exposto ou um erro de implantação.

## A resposta curta

Alguns produtos de antivírus/EDR executam binários desconhecidos em sandboxes na nuvem. Se uma sandbox recebe uma versão do cliente que contém a configuração do seu servidor e consegue alcançar o servidor de ID, ela pode se registrar brevemente. No entanto, um endereço IP de provedor de nuvem ou um nome de hardware incomum **não** comprova essa explicação; invasores também usam hosts na nuvem. Preserve e analise as evidências antes de descartar o evento.

## Em detalhes

### Por que isso acontece

Os clientes RustDesk podem se registrar no servidor de ID/rendezvous configurado quando são executados e conseguem alcançá-lo. Isso torna a execução em sandbox uma causa plausível, como discutido em uma [thread pública no GitHub](https://github.com/rustdesk/rustdesk-server-pro/discussions/307), mas também significa que qualquer pessoa que obtenha um cliente configurado ou material de implantação válido pode produzir um registro semelhante.

Antes de classificar o evento, analise os logs de registro e conexão do servidor, o horário em que o dispositivo foi visto pela primeira vez e o respectivo IP de origem, os registros de implantação e o caminho de distribuição de clientes personalizados. Rotacione senhas expostas, tokens de API/implantação e a configuração ou chaves do servidor, conforme apropriado. Verifique se as mesmas credenciais foram reutilizadas em outro lugar e se o dispositivo desconhecido tentou ou concluiu alguma sessão.

### Como impedir isso

Duas configurações do console resolvem isso, e qual delas é a mais adequada depende de você ainda estar integrando ativamente novos dispositivos reais ou não.

**Opção 1 — desativar completamente o registro de novos dispositivos.** Se a sua lista de dispositivos é basicamente estável e você não está adicionando máquinas regularmente, esta é a solução mais simples: acesse **Configurações → Outros → Desativar novos dispositivos no console web**. Nada de novo poderá se registrar, seja em sandbox ou não.

**Opção 2 — exigir um token de implantação.** Se você ainda está implantando novos dispositivos regularmente (uma MSP integrando clientes, uma equipe de TI clonando novas máquinas), uma configuração genérica de "desativar novos dispositivos" acaba atrapalhando o seu próprio trabalho. Em vez disso, ative **Configurações → Outros → Exigir implantação para novos dispositivos**, crie um token de API (permissão Dispositivos, Leitura e escrita) e faça com que o seu processo de instalação execute o [comando de implantação](https://rustdesk.com/docs/en/self-host/client-deployment/#explicit-deployment-for-new-devices) documentado em cada dispositivo:

```
rustdesk --deploy --token <api_token>
```

A flag exata pode mudar entre versões, portanto trate isso apenas como ilustrativo e verifique a sintaxe atual na documentação do RustDesk Server Pro antes de usá-la em um script. Somente um dispositivo que apresente um token válido é adicionado ao seu inventário. Uma verificação de antivírus em sandbox — que não tem como saber ou fornecer esse token — não consegue se registrar, enquanto a sua implantação real continua funcionando normalmente. Esse também é o mecanismo que as MSPs usam para integrar dispositivos via RMM ou instalação por script, sem que um técnico precise fazer login manualmente em cada máquina.

**Um controle relacionado, porém mais restrito:** se você preferir deixar o registro aberto, mas simplesmente manter os dispositivos não atribuídos fora de vista até revisá-los, também existe a opção **Configurações → Outros → Somente o administrador pode acessar dispositivos não atribuídos** — isso não impede o registro, mas garante que usuários comuns não vejam nem consigam mexer em nada que apareça antes de você ter a chance de analisar.

### Como avaliar o resultado

O registro isolado não comprova que um invasor controlou outro endpoint, mas ainda assim é uma atividade não autorizada até que seja explicada. Um registro de curta duração que coincide com uma verificação de segurança conhecida e não apresenta acesso subsequente pode sustentar a hipótese da sandbox. Sessões inesperadas, registros repetidos, uso de credenciais válidas ou distribuição de um cliente configurado fora do canal pretendido exigem resposta a incidentes.

## Quem faz essa pergunta

Novos operadores de servidor — tanto administradores de TI quanto MSPs — costumam se deparar com isso poucos dias depois de colocar um servidor auto-hospedado no ar, antes de os controles de registro terem sido reforçados. A investigação precoce é importante porque uma verificação benigna e um registro não autorizado podem parecer semelhantes no console.

## Perguntas relacionadas

- Gerar um cliente personalizado com marca própria: consulte a [documentação do RustDesk](https://rustdesk.com/docs).
- [O que conta como um dispositivo gerenciado no RustDesk?](/pt/blog/o-que-conta-como-dispositivo-gerenciado-no-rustdesk)
- [Confira as versões mais recentes do RustDesk e as correções de segurança](https://github.com/rustdesk/rustdesk/releases)
- [RustDesk para MSPs: uma única ferramenta auto-hospedada e personalizável](/pt/blog/rustdesk-para-msps-uma-ferramenta-unica-autogerenciada-e-personalizavel)
  Está vendo um dispositivo que você não reconhece? Preserve os logs relevantes, restrinja novos registros, rotacione quaisquer segredos potencialmente expostos e entre em contato com o suporte do RustDesk informando detalhes de diagnóstico não sensíveis, caso a causa continue incerta.
