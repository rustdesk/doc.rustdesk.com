---
title: Função de Administrador
weight: 17
---

A Função de Administrador permite que administradores deleguem permissões de gestão parcial a usuários não administradores. Você pode definir permissões para recursos globais (como estratégias, funções de controle e clientes personalizados) bem como para usuários e dispositivos em diferentes escopos.

Uma vez atribuída uma Função de Administrador a um usuário, ele verá as páginas e menus correspondentes no console web com base nas permissões concedidas.

## Administradores vs Funções de Administrador

- Apenas administradores podem editar Funções de Administrador e atribuí-las a usuários.
- Administradores não são restringidos por Funções de Administrador, embora possam ser atribuídas a eles.
- Usuários não admin não podem editar contas de administrador, mesmo com permissões globais de usuário.

## Tipos de Função

As Funções de Administrador vêm em três tipos, cada um com escopo e permissões diferentes.

| Tipo | Descrição |
|------|-------------|
| **Global** | Pode gerenciar todos os recursos de toda a equipe |
| **Individual** | Pode gerenciar apenas seus próprios dispositivos e logs de auditoria |
| **Escopo de Grupo** | Pode gerenciar usuários e dispositivos em grupos especificados |

### Sobre o Escopo de Grupo

| Permissões selecionadas | Aplicado a |
|-------|-------------|
| **Permissões de Usuário** | Aplicam-se a usuários nos grupos selecionados |
| **Permissões de Dispositivo** | Aplicam-se a dispositivos de: <ul><li>Grupos de dispositivos selecionados</li><li>Dispositivos atribuídos a usuários nos grupos selecionados</li><li>Dispositivos não atribuídos (se habilitado)</li></ul> |

## Regras de Permissões

### Qualquer Permissão de Edição Inclui a Permissão de Visualização Correspondente

Qualquer permissão de edição inclui automaticamente a permissão de visualização correspondente.

### Permissão de Edição Não Inclui Atribuição

Permissões de edição para recursos permitem apenas editar os recursos, não atribuí-los.

### Permissão de Visualização Não Inclui Membros

Permissões de visualização permitem apenas ver os recursos, não os membros dentro deles.

{{% notice note %}}
A leitura de dispositivos para catálogos de endereços não é afetada por Funções de Administrador. A aba de dispositivos acessíveis no cliente é controlada apenas por **Configurações → Outros → Desabilitar recuperação de dispositivos acessíveis** no console, e também não é restrita por Funções de Administrador.
{{% /notice %}}

## Operações do Console

### Criando uma Função

1. Navegue até a página **Funções de Administrador** e clique em **Criar**
2. Digite um **Nome** para a função
3. Selecione um **Tipo** (para **Escopo de Grupo**, configure também o escopo)
4. Selecione as **Permissões** a conceder

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-permission.png)

### Atribuição de Funções

Há duas formas de atribuir Funções de Administrador a usuários:

1. **Página Usuários** → Clique em **Editar** em um usuário → Selecione funções no campo **Funções de Administrador**
2. **Página Funções de Administrador** → Clique na **contagem de usuários** ou **Atribuir Usuários** → Adicionar ou remover usuários

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-role-page.png)

{{% notice note %}}
- Um usuário pode ter múltiplas Funções de Administrador. As permissões de todas as funções são combinadas.
{{% /notice %}}

## Referência de Permissões

### Permissões Globais

| Permissão | Descrição |
|------------|-------------|
| Users-View | Ler informações de usuários. |
| Users-Create | Criar usuários. |
| Users-Invite | Convidar usuários. |
| Users-Delete | Excluir usuários. |
| Users-Enable/Disable | Ativar/desativar usuários. |
| Users-Edit Email | Alterar email de usuários. |
| Users-Edit Password | Alterar senha de usuários. |
| Users-Edit Note | Alterar notas de usuários. |
| Users-Manage 2FA | Gerenciar 2FA de usuários. |
| Users-Force Logout | Forçar logout de usuários. |
| Users-Update Group | Alterar grupo de usuários. |
| Users-Update Strategy | Alterar estratégia de usuários. |
| Users-Update Control Role | Alterar função de controle de usuários. |
| Devices-View | Ler informações de dispositivos. |
| Devices-Enable/Disable | Ativar/desativar dispositivos. |
| Devices-Delete | Excluir dispositivos. |
| Devices-Edit Info | Editar informações de dispositivos. |
| Devices-Assign to User | Atribuir dispositivos a usuários. |
| Devices-Update Group | Alterar grupo de dispositivos. |
| Devices-Update Strategy | Alterar estratégia de dispositivos. |
| User Groups-View | Ler grupos de usuários. |
| User Groups-Edit | Criar, editar e excluir grupos de usuários. |
| Device Groups-View | Ler grupos de dispositivos. |
| Device Groups-Edit | Criar, editar e excluir grupos de dispositivos. |
| Device Groups-Update Strategy | Alterar estratégia de grupos de dispositivos. |
| Audit Logs-View | Ler logs. |
| Audit Logs-Edit | Desconectar conexões ativas. |
| Strategies-View | Ler estratégias. |
| Strategies-Edit | Criar, editar e excluir estratégias. |
| Control Roles-View | Ler funções de controle. |
| Control Roles-Edit | Criar, editar e excluir funções de controle. |
| Custom Clients-View | Ler clientes personalizados. |
| Custom Clients-Edit | Criar, editar e excluir clientes personalizados. |

### Permissões Individuais

| Permissão | Descrição |
|------------|-------------|
| Devices-View | Ler próprios dispositivos. |
| Devices-Enable/Disable | Ativar/desativar próprios dispositivos. |
| Devices-Delete | Excluir próprios dispositivos. |
| Devices-Edit Info | Editar informações de próprios dispositivos. |
| Devices-Update Strategy | Alterar estratégia de próprios dispositivos. |
| Audit Logs-View | Ler próprios logs. |
| Audit Logs-Edit | Desconectar próprias conexões. |

### Permissões de Escopo de Grupo

| Permissão | Descrição |
|------------|-------------|
| Users-View | Ler usuários nos grupos selecionados. |
| Users-Create | Criar usuários nos grupos selecionados. |
| Users-Invite | Convidar usuários nos grupos selecionados. |
| Users-Delete | Excluir usuários nos grupos selecionados. |
| Users-Enable/Disable | Ativar/desativar usuários nos grupos selecionados. |
| Users-Edit Email | Alterar email de usuários nos grupos selecionados. |
| Users-Edit Password | Alterar senha de usuários nos grupos selecionados. |
| Users-Edit Note | Alterar notas de usuários nos grupos selecionados. |
| Users-Manage 2FA | Gerenciar 2FA de usuários nos grupos selecionados. |
| Users-Force Logout | Forçar logout de usuários nos grupos selecionados. |
| Users-Update Strategy | Alterar estratégia de usuários nos grupos selecionados. |
| Users-Update Control Role | Alterar função de controle de usuários nos grupos selecionados. |
| Devices-View | Ler dispositivos gerenciados pela função. |
| Devices-Enable/Disable | Ativar/desativar dispositivos gerenciados pela função. |
| Devices-Delete | Excluir dispositivos gerenciados pela função. |
| Devices-Edit Info | Editar informações de dispositivos gerenciados pela função. |
| Devices-Update Strategy | Alterar estratégia de dispositivos gerenciados pela função. |
