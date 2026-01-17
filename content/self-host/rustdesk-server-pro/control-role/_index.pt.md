---
title: Função de Controle
weight: 18
---

A Função de Controle permite configurar permissões de controle remoto para diferentes usuários. Quando um usuário controla remotamente outro dispositivo, a Função de Controle define quais operações o usuário controlador pode executar após uma conexão ser estabelecida.

{{% notice note %}}
**Função de Controle vs Controle de Acesso vs Estratégia**

- **Função de Controle**: Determina quais operações o usuário controlador pode executar após uma conexão ser estabelecida.
- **Controle de Acesso**: Determina se uma conexão pode ser estabelecida entre os dispositivos controlador e controlado.
- **Estratégia**: Modifica configurações no dispositivo controlado.
{{% /notice %}}

## Requisitos

- Dispositivo controlado: RustDesk **1.4.5** ou superior (dispositivos Android controlados ainda não são suportados)
- Dispositivo controlador: Sem requisitos de versão

## Cálculo de Permissões

### Como as Permissões Funcionam

Em resumo: As permissões de controle têm prioridade sobre as configurações locais.

Existem duas fontes de configurações de permissão:

- **Configurações locais no lado controlado**: As configurações do dispositivo controlado (Configurações → Segurança → Permissões)
- **Permissão de Controle**: As permissões da Função de Controle do usuário controlador (configuradas no console web)

Cada permissão tem três estados:

- **Usar Configurações do Cliente**: Sem substituição, usar a configuração local do dispositivo controlado
- **Habilitar**: Habilitar explicitamente esta permissão (substitui a configuração local)
- **Desabilitar**: Desabilitar explicitamente esta permissão (substitui a configuração local)

As permissões são calculadas no nível da sessão:

| Permissão de Controle | Configurações Locais | Resultado |
|---|---|---|
| Habilitar | Habilitar | Habilitar |
| Habilitar | Desabilitar | **Habilitar** |
| Desabilitar | Habilitar | **Desabilitar** |
| Desabilitar | Desabilitar | Desabilitar |
| Usar Configurações do Cliente | Habilitar | Habilitar |
| Usar Configurações do Cliente | Desabilitar | Desabilitar |

**Caso especial: Modificação de Configuração Remota**

Quando múltiplos usuários controladores estão conectados ao mesmo dispositivo, a permissão "Modificação de Configuração Remota" é calculada em todas as conexões:

| Permissão de Controle de Todas as Conexões | Resultado |
|---|---|
| Qualquer Desabilitar | **Desabilitar** |
| Nenhum Desabilitar, Qualquer Habilitar | **Habilitar** |
| Todos Usar Configurações do Cliente | Usar configuração local |

### Qual Função se Aplica

Cada usuário pode ter apenas uma Função de Controle atribuída. Existem duas funções integradas:

| Função | Descrição |
|------|-------------|
| **Não Conectado** | Para usuários controladores que não estão conectados. Não pode ser atribuída a usuários. |
| **Padrão** | Para usuários controladores conectados que não têm Função de Controle atribuída, ou são explicitamente atribuídos à função Padrão. |

A Função de Controle aplicada depende do status de login do usuário controlador e da atribuição de função:

| Status do Usuário Controlador | Função Atribuída | Função / Status da Função | Função de Controle Aplicada |
|---|---|---|---|
| Não conectado | - | Não Conectado / Habilitado | Não Conectado |
| Não conectado | - | Não Conectado / Desabilitado | - |
| Conectado | Tem função atribuída | Função atribuída / Habilitado | Função atribuída |
| Conectado | Tem função atribuída | Função atribuída / Desabilitado | - |
| Conectado | Sem função atribuída | Padrão / Habilitado | Padrão |
| Conectado | Sem função atribuída | Padrão / Desabilitado | - |

## Permissões Disponíveis

As 12 permissões controláveis correspondem às Configurações → Segurança → Permissões do dispositivo controlado:

- Teclado/Mouse
- Impressora Remota
- Área de Transferência
- Transferência de Arquivos
- Áudio
- Câmera
- Terminal
- Túnel TCP
- Reinicialização Remota
- Gravação de Sessão
- Bloquear Entrada do Usuário
- Modificação de Configuração Remota

## Operações do Console

### Criar uma Função

1. Navegue até a página **Funções de Controle** e clique em **Criar**
2. Digite um **Nome** para a função
3. Selecione as **Permissões** a conceder

![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-create-permission.png)

### Atribuição de Função

Existem duas maneiras de atribuir Funções de Controle a usuários:

1. **Página de Usuários** → Clique em **Editar** em um usuário → Selecione uma função no campo **Função de Controle**
2. **Página de Funções de Controle** → Clique na **contagem de usuários** ou **Atribuir Usuários** → Adicionar ou remover usuários da função

![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-assign-role-page.png)

{{% notice note %}}
A função "Não Conectado" não pode ser atribuída a usuários (aplica-se apenas a conexões não autenticadas).
{{% /notice %}}
