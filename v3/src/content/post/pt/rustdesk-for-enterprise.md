---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-06-29T16:16:00Z
lang: 'pt'
translationKey: 'rustdesk-for-enterprise'
draft: false
title: 'RustDesk para Empresas: Auto-hospedado, Escalável e Pronto para AD'
excerpt: 'Por que equipes de TI corporativas escolhem o RustDesk: controle de dados auto-hospedado, AD/LDAP, controle de acesso por grupos de dispositivos e preços previsíveis para grandes frotas.'
image: '~/assets/images/blog/rustdesk-for-enterprise-og.webp'
category: 'Guias'
tags: ['RustDesk', 'Empresa', 'Auto-hospedagem']
author: 'RustDesk Team'
slug: 'rustdesk-para-empresas-auto-hospedado-escalavel-e-pronto-para-ad'
faq:
  - question: 'O RustDesk pode ser implantado em massa em uma frota empresarial?'
    answer: 'Sim. O RustDesk oferece um MSI para Windows para instalação silenciosa e não assistida via msiexec, que pode ser distribuído por Política de Grupo (GPO), Microsoft Intune, um RMM ou ferramentas de empacotamento, e o gerador de cliente personalizado (a partir do plano Basic) entrega um cliente já configurado para o seu próprio servidor.'
  - question: 'O RustDesk tem uma API REST?'
    answer: 'Sim. O RustDesk Server Pro expõe uma API REST, autorizada por tokens de API criados no console web, além de ferramentas de gerenciamento via CLI em Python. Scripts podem integrar, listar, atribuir e remover dispositivos e gerenciar em massa usuários, grupos, catálogos de endereços e logs de auditoria, em vez de trabalhar apenas pelo console web.'
  - question: 'O RustDesk é compatível com Active Directory e SSO para identidade corporativa?'
    answer: 'Sim. O RustDesk Server Pro inclui LDAP/Active Directory e SSO OIDC a partir do plano Basic, para que os técnicos se autentiquem na fonte de identidade que você já usa, e não em uma lista de usuários separada. O plano Individual não inclui LDAP/AD nem SSO OIDC.'
  - question: 'As empresas podem manter os dados do RustDesk em sua própria infraestrutura?'
    answer: 'Sim, esse é o modelo central do RustDesk Server Pro. Você auto-hospeda o servidor de ID/rendezvous, o relay, o console web e os dados de dispositivos armazenados em uma infraestrutura que você opera. As sessões diretas trafegam entre os endpoints e as retransmitidas usam o seu próprio relay, então documente o roteamento dos endpoints junto com o posicionamento dos servidores.'
  - question: 'Como funciona o preço do RustDesk para grandes frotas?'
    answer: 'O RustDesk Server Pro licencia usuários com login e dispositivos gerenciados, e os planos padrão incluem conexões simultâneas ilimitadas; apenas o Customized V2 licencia um número definido de conexões simultâneas. Upgrades podem ser comprados a qualquer momento e estendem a licença para um ano completo a partir da data do upgrade, creditando o valor pago restante. Dimensione as duas contagens em rustdesk.com/pricing.'
metadata:
  description: 'RustDesk para empresas: ID, relay e console auto-hospedados, LDAP/AD e SSO OIDC, controle de acesso por grupos, implantação via MSI e simultaneidade ilimitada.'
  keywords: 'RustDesk para empresas, implantação empresarial do RustDesk, suporte remoto integrado ao AD, arquitetura empresarial do RustDesk'
---

## Mantenha o acesso remoto em uma infraestrutura que você controla

O RustDesk Server Pro executa o ID/rendezvous, o relay, o console web e os dados de dispositivos dentro do seu perímetro, com LDAP/AD e SSO OIDC a partir do plano Basic e conexões simultâneas ilimitadas nos planos padrão. Isso cobre os pontos em que as avaliações corporativas costumam se decidir: controle da infraestrutura, identidade, política de acesso, auditabilidade, escala e previsibilidade do licenciamento.

O cliente RustDesk e o RustDesk Server OSS (o servidor comunitário gratuito) são licenciados sob a AGPL; o Server Pro é um software de servidor comercial e proprietário, também auto-hospedado.

## A diferença fundamental: você hospeda, então você controla

O RustDesk Server Pro é **auto-hospedado**: quem opera os servidores é a sua equipe, não um fornecedor ([por que as equipes escolhem a auto-hospedagem](/pt/blog/por-que-auto-hospedar-seu-software-de-area-de-trabalho-remota)). Esse único fato arquitetônico impulsiona a maioria dos benefícios descritos abaixo e faz do **[cliente licenciado sob a AGPL](https://github.com/rustdesk/rustdesk)** mais do que um argumento de venda: uma equipe de segurança que precisa justificar cada agente em um endpoint de produção pode ler o código-fonte e compilar o cliente por conta própria, e "conseguimos auditar exatamente o que roda" vira um requisito de compras que você realmente consegue cumprir.

## Perguntas de arquitetura empresarial a responder primeiro

Antes de comparar matrizes de recursos, torne explícito o design da implantação:

| Decisão                | O que o design precisa definir                                                                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identidade             | Fonte OIDC ou LDAP, política de MFA, acesso de emergência (break-glass) e ciclo de vida das contas                                                 |
| Autorização            | Propriedade dos grupos de dispositivos, funções dos técnicos, limites para terceirizados e modelo de aprovação                                     |
| Rede                   | Posicionamento do ID e do relay, política de conexão direta vs. relay, portas expostas e roteamento regional                                       |
| Disponibilidade        | Premissas de capacidade, monitoramento, backups, objetivos de recuperação e design com múltiplos relays                                            |
| Gestão de endpoints    | Versões de SO suportadas, empacotamento do cliente, aplicação de configurações e SLA de atualização                                                |
| Operações de segurança | Registro de logs, retenção, alertas, resposta a vulnerabilidades e responsabilidade por incidentes                                                 |
| Licenciamento          | Usuários com login necessários, dispositivos gerenciados e eventual cota de simultaneidade do [Customized V2](https://rustdesk.com/pricing#custom2) |

O RustDesk fornece os componentes de acesso remoto e os controles empresariais; sua arquitetura determina se eles atendem aos requisitos de disponibilidade, conformidade e operação da organização.

## Controle de dados e conformidade

A auto-hospedagem permite escolher a localização e o operador do rendezvous, do relay, do console e dos dados de dispositivos armazenados. As sessões diretas continuam trafegando entre os endpoints, portanto a localização do servidor, por si só, não garante tráfego dentro do país nem conformidade com o GDPR. Documente o [fluxo de dados completo e os controles de conformidade](/pt/blog/soberania-de-dados-em-desktop-remoto-and-gdpr-auto-hospedagem).

O Server Pro registra [logs de auditoria](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/audit-logs/) de conexões, transferências de arquivos, alarmes e operações do console. Defina **Configurações > Outros > Retenção de logs (dias)** com um número positivo para excluir automaticamente os logs mais antigos (a limpeza é executada a cada hora); `0` mantém os logs indefinidamente. Você pode desativar ou excluir usuários e dispositivos no console ou pela API para atender a pedidos de eliminação de dados. Os fluxos de saída a planejar são a validação da licença Pro, o serviço de build do cliente personalizado, as atualizações de cliente e qualquer provedor de identidade externo que você conectar.

Esse também é um motivo discreto por trás de migrações motivadas por custo. Muitas equipes empresariais não estão apenas frustradas com o preço; elas pagam por um serviço em nuvem e por um pacote de recursos que não usam por completo. A auto-hospedagem inverte essa lógica: você provisiona o que precisa e não aluga o data center de outra empresa como intermediário obrigatório.

## Escala e licenciamento de conexões simultâneas

As implantações empresariais fracassam em dois eixos: o teto técnico e o teto de preços. O RustDesk aborda os dois.

No aspecto técnico, o servidor público do RustDesk registrou mais de dois milhões de endpoints online em um único host de 12 núcleos e 32 GB em 7 de julho de 2026 (telemetria interna, não um benchmark auditado nem uma garantia do Server Pro). Para o Server Pro, o [guia de planejamento para 200.000 dispositivos](/pt/blog/o-rustdesk-consegue-escalar-para-200-000-dispositivos) cobre a carga de banco de dados, console e relay a validar em um piloto.

O RustDesk cobra **por usuário com login e por dispositivo gerenciado**. Os planos padrão incluem conexões simultâneas ilimitadas; apenas o [Customized V2](https://rustdesk.com/pricing#custom2) licencia um número definido. Você pode [fazer upgrade no meio da assinatura](/pt/blog/atualizar-a-licenca-do-rustdesk-no-meio-da-assinatura-como-funciona) a qualquer momento: o upgrade estende a licença para um ano completo a partir da data do upgrade e credita o valor pago restante da licença atual.

## AD/LDAP e o controle de acesso que seus administradores esperam

O acesso remoto empresarial precisa responder "quem pode acessar quais máquinas, e conseguimos comprovar isso?". Os planos pagos do RustDesk incluem **LDAP/SSO (OIDC) a partir do plano Basic**, para que você provisione o acesso dos técnicos na fonte de identidade que já opera, em vez de manter uma lista de usuários paralela.

O [Controle de acesso](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/permissions/) define quem pode alcançar quais dispositivos, por meio de atribuições de usuários, grupos de dispositivos e regras entre grupos. Cada dispositivo pertence a um único grupo de dispositivos, e as permissões de grupos de usuários e de grupos de dispositivos são cumulativas. O catálogo de endereços compartilhado organiza as entradas de dispositivos para os técnicos; ele não é um limite de acesso. A [Função de controle](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/control-role/) limita o que um técnico pode fazer dentro de uma sessão. O gerador de cliente personalizado também começa no plano Basic; [veja a matriz de planos](https://rustdesk.com/pricing).

## Implantação em massa e automação

Implantar acesso remoto manualmente em milhares de endpoints está fora de cogitação, por isso o RustDesk oferece suporte aos caminhos padrão de implantação empresarial. No Windows, ele fornece um **pacote MSI** para instalação silenciosa e não assistida via `msiexec /qn`, que pode ser distribuído por **Política de Grupo (GPO), Microsoft Intune, um RMM ou qualquer ferramenta de empacotamento**, com parâmetros de linha de comando para local de instalação, atalhos e opções. Combine isso com o [gerador de cliente personalizado](https://rustdesk.com/docs/pt/self-host/client-configuration/) para que o cliente implantado já venha configurado com o seu próprio servidor e as suas configurações, em vez de exigir ajustes máquina por máquina.

Para operações de frota, use a [referência do MSI para Windows](https://rustdesk.com/docs/pt/client/windows/msi/), o [guia de implantação de clientes](https://rustdesk.com/docs/pt/self-host/client-deployment/) e as [ferramentas de API/CLI do Server Pro](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/console/#ferramentas-de-gerenciamento-python-cli). As ferramentas de gerenciamento cobrem usuários, dispositivos, grupos, catálogos de endereços, políticas e auditorias. Restrinja as permissões dos tokens de API à tarefa e teste a integração, a desativação e a exclusão em um piloto.

## Verificações de aceitação antes da implantação

Antes da implantação, verifique a matriz pretendida de acesso de usuários a dispositivos, a recuperação de identidade, o acesso não assistido, as atualizações de cliente, a capacidade de pico do relay, a retenção de logs e a restauração de backups. Essas verificações de aceitação transformam o controle sobre uma infraestrutura auto-hospedada em uma implantação empresarial operável.

## Controle empresarial, nos seus termos

Em escala empresarial, o argumento é direto: o ID/relay, o console e os dados armazenados ficam dentro do seu perímetro, conectados ao seu sistema de identidade e às suas políticas de acesso, sem nenhum fornecedor operando o núcleo. Essa é a postura que as equipes de compras e de segurança pedem, e o RustDesk Server Pro foi feito para entregá-la.

## Experimente antes de se comprometer

Você pode avaliar **[sem precisar de uma ligação com o time de vendas](https://www.youtube.com/@rustdesk)**. Dois caminhos:

- **Valide a arquitetura com o Server OSS.** Ele é gratuito, sem taxa de licença nem prazo de validade, e roda na sua própria rede — uma forma de baixo risco de comprovar o modelo auto-hospedado para a sua equipe de segurança.
- **Para os recursos do Pro — identidade, controle de acesso, geração de clientes —** revise os planos atuais em [rustdesk.com/pricing](https://rustdesk.com/pricing) e depois envie um e-mail para [sales@rustdesk.com](mailto:sales@rustdesk.com) para saber os termos de avaliação disponíveis para a sua organização.

De qualquer forma, coloque um servidor no ar no seu próprio ambiente e valide-o antes de se comprometer.
