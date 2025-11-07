---
title: Console Web
weight: 10
---

O console web está integrado no RustDesk Server Pro, servido pela porta `21114`.

Recursos:

- Navegar dispositivos
- Adicionar/modificar usuários e grupos de usuários
- Modificar permissões de acesso a dispositivos
- Navegar logs de conexão de dispositivos e outros logs
- Atualizar configurações
- Gerenciar estratégias de sincronização de configurações do cliente
- Gerenciar cadernos de endereços compartilhados
- Gerar build personalizado do cliente

## Fazer login

A porta padrão do console web é 21114. Digite `http://<ip do servidor>:21114` no navegador para acessar a página do console, conforme mostrado na figura a seguir. O nome de usuário/senha padrão do administrador é `admin`/`test1234`:

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

Se você precisar de suporte HTTPS, instale um servidor web como `Nginx` ou use `IIS` para Windows.

Após fazer login, certifique-se de alterar a senha, selecione `Configurações` no menu da conta no canto superior direito para acessar a página de modificação de senha, conforme mostrado na figura a seguir. Você também pode criar outra conta de administrador e excluir esta. É recomendável habilitar a verificação de login por email.

<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

Usuários não-administradores também podem fazer login para navegar seus dispositivos e logs, alterar suas configurações de usuário.

## Configurações Automáticas
Ao clicar em `Windows EXE` você poderá obter as configurações para seu próprio RustDesk Server Pro, isso ajudará a configurar seus clientes.

Para clientes Windows, você pode omitir a configuração personalizada do servidor e colocar as informações de configuração no nome do arquivo `rustdesk.exe`. Como mostrado acima, vá para a página de boas-vindas do console e clique em `Windows EXE`. **Cliente ≥ 1.1.9 necessário.**

Você pode usar isso em conjunto com [configuração do cliente](https://rustdesk.com/docs/en/self-host/client-configuration/) e [scripts de implantação](https://rustdesk.com/docs/en/self-host/client-deployment/) para configurar seus clientes.

## Criando um novo usuário diferente do usuário padrão `admin`

{{% notice note %}}
O plano `Individual` não possui este recurso.
{{% /notice %}}

1. Clique em `Usuários` no menu da esquerda.
2. Crie outra conta com `administrador` habilitado.
3. Faça login com a nova conta administrativa.
4. Exclua o `admin` na página `Usuários`.

## Criando um novo usuário
1. Clique em `Usuários` no menu da esquerda.
2. Crie um novo usuário.
3. Selecione em qual grupo eles devem estar (se você precisar adicionar novos grupos, continue lendo).

## Adicionar um novo Grupo
1. Clique em `Grupos` no menu da esquerda.
2. Crie um novo grupo.
3. Uma vez criado, você pode permitir que grupos acessem uns aos outros, clique em `Editar`.
4. Selecione os grupos relevantes que você deseja acesso (adiciona automaticamente no grupo correspondente).

## Configurando múltiplos servidores de relay
1. Vá para `Configurações` no menu da esquerda.
2. Clique em `Relay` no submenu.
3. Clique em `+` ao lado de `Servidores Relay`.
4. Digite o endereço DNS ou endereço IP do servidor relay na caixa que agora aparece e pressione <kbd>Enter</kbd>.
5. Se você tiver mais de um servidor relay, pode continuar clicando em `+` e adaptando as configurações geográficas se necessário (lembre-se e copie sua chave para os outros servidores).

## Definir ou alterar a licença
1. Vá para `Configurações` no menu da esquerda.
2. Clique em `Licença` no submenu.
3. Clique em `Editar` e cole seu código de licença.
4. Clique em `OK`.

## Visualizando Logs
No lado esquerdo, clique em `Logs`.

## Configurar Emails
Gmail neste exemplo

1. Vá para `Configurações` no menu da esquerda.
2. Clique em `SMTP` no submenu.
3. Digite o endereço SMTP `smtp.gmail.com`.
4. Digite a Porta 587 em `Porta SMTP`.
5. Digite a conta Gmail, ou seja, `myrustdeskserver@gmail.com` em `Conta de Email`.
6. Digite sua senha (você pode precisar de uma senha de aplicativo).
7. Digite sua conta Gmail, ou seja, `myrustdeskserver@gmail.com` em `De`.
8. Clique em `Verificar` para salvar.

## Atribuindo Usuários/Estratégias/Grupos de Dispositivos a Dispositivos via Console Web

O Usuário é o usuário RustDesk conectado ao dispositivo ou atribuído ao dispositivo clicando em **Editar** ao lado do dispositivo, clicando na caixa **Usuário** e selecionando seu usuário no menu suspenso.  
Você também pode atribuir dispositivos em lote a um usuário clicando em **Mais → Atribuir Dispositivos** na **Lista de Usuários**.

Para adicionar um dispositivo a um grupo de dispositivos, clique em **Editar** ao lado do dispositivo na **Lista de Dispositivos** e altere o **Grupo**, ou vá para a lista de **Grupos de Dispositivos**, clique no nome de um grupo e ajuste os dispositivos dentro desse grupo.

Para atribuir uma estratégia a um dispositivo, passe o mouse sobre o lado direito da lista de **Estratégia** e clique em **Editar Dispositivos**, **Editar Usuários** ou **Editar Grupos de Dispositivos** no menu para adicionar os dispositivos correspondentes, dispositivos do usuário ou dispositivos do grupo selecionado à estratégia.

---

## Token de API

Primeiro, você deve ir em **Configurações → Tokens → Criar** e criar um token com as permissões necessárias: **Dispositivo, Registro de Auditoria, Usuário, Grupo, Estratégia, Livro de Endereços**.

Depois de criado, você pode usar esses tokens via **linha de comando** ou **CLI Python** para executar ações com as permissões correspondentes.

### Atribuição via Token pelo Linha de Comando

Você também pode realizar atribuições usando o executável RustDesk com o parâmetro `--assign`.  
Isso permite atribuir usuários, estratégias, livros de endereços ou grupos de dispositivos a um dispositivo diretamente da linha de comando.

**Exemplo:**

    "C:\Program Files\RustDesk\rustdesk.exe" --assign --token <generatedtoken> --user_name <username>

Parâmetros suportados

| Parâmetro                               | Descrição                                 | RustDesk Server Pro | RustDesk Client | 
| --------------------------------------- | ---------------------------------------- | ----------------- | --------------- | 
| `--user_name <username>`                | Atribui um usuário ao dispositivo        |                   |                 | 
| `--strategy_name <strategyname>`        | Atribui uma estratégia ao dispositivo    |                   |                 | 
| `--address_book_name <addressbookname>` | Atribui o dispositivo a um livro de endereços |                   |                 | 
| `--address_book_tag <addressbooktag>`   | Atribui com tag do livro de endereços    |                   |                 | 
| `--address_book_alias <alias>`          | Atribui com alias do livro de endereços  | 1.5.8             | 1.4.1           | 
| `--address_book_password <password>`    | Define a senha da entrada do livro       | 1.6.6             | 1.4.3           | 
| `--address_book_note <note>`            | Define nota para a entrada do livro      | 1.6.6             | 1.4.3           | 
| `--device_group_name <devicegroupname>` | Atribui o dispositivo a um grupo         |                   |                 | 
| `--note <note>`                         | Adiciona nota ao dispositivo             | 1.6.6             | 1.4.3           | 
| `--device_username <device_username>`   | Define o nome de usuário do dispositivo  | 1.6.6             | 1.4.3           | 
| `--device_name <device_name>`           | Define o nome do dispositivo             | 1.6.6             | 1.4.3           | 

A linha de comando no Windows não produz saída por padrão. Para obter saída, execute:

    "C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more
    "C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String

veja [aqui](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952).

### Ferramentas de Gerenciamento Python CLI

#### Gerenciamento de Usuários (`users.py`)

**Mostrar ajuda:**  
`./users.py -h`

**Visualizar usuários:**  
`./users.py --url <url> --token <token> view [--name <username>] [--group_name <group_name>]`

**Filtros:**
- `--name`: nome do usuário (busca difusa)
- `--group_name`: grupo de usuários (correspondência exata)

**Exemplo:**  
`./users.py --url https://example.com --token <token> view --group_name Default`

**Operações básicas:**

- **Desativar usuário:**  
  `./users.py --url <url> --token <token> disable --name testuser`

- **Ativar usuário:**  
  `./users.py --url <url> --token <token> enable --name testuser`

- **Excluir usuário:**  
  `./users.py --url <url> --token <token> delete --name testuser`

**Criação e convite de usuários:**

- **Criar novo usuário:**  
  `./users.py --url <url> --token <token> new --name username --password 'password123' --group_name Default [--email user@example.com] [--note "nota"]`
  
  Obrigatório: `--name`, `--password`, `--group_name`  
  Opcional: `--email`, `--note`

- **Convidar usuário por email:**  
  `./users.py --url <url> --token <token> invite --email user@example.com --name username --group_name Default [--note "nota"]`
  
  Obrigatório: `--email`, `--name`, `--group_name`  
  Opcional: `--note`

**Operações 2FA e segurança:**

- **Habilitar imposição 2FA:**  
  `./users.py --url <url> --token <token> enable-2fa-enforce --name username --web-console-url <console_url>`
  
  Obrigatório: `--web-console-url`

- **Desabilitar imposição 2FA:**  
  `./users.py --url <url> --token <token> disable-2fa-enforce --name username [--web-console-url <console_url>]`
  
  Opcional: `--web-console-url`

- **Redefinir 2FA:**  
  `./users.py --url <url> --token <token> reset-2fa --name username`

- **Desabilitar verificação por email:**  
  `./users.py --url <url> --token <token> disable-email-verification --name username`

- **Forçar logout:**  
  `./users.py --url <url> --token <token> force-logout --name username`

**Observações:**
- Ao operar em múltiplos usuários (correspondentes aos filtros), será solicitada confirmação
- Se não houver usuários correspondentes, será exibido "Found 0 users"

---

#### Gerenciamento de Grupos de Usuários (`user_group.py`)

**Mostrar ajuda:**  
`./user_group.py -h`

**Visualizar grupos de usuários:**  
`./user_group.py --url <url> --token <token> view [--name <group_name>]`

**Exemplo:**  
`./user_group.py --url https://example.com --token <token> view --name "Equipe Vendas"`

**Operações de grupo:**

- **Criar grupo de usuários:**  
  `./user_group.py --url <url> --token <token> add --name "NomeGrupo" [--note "descrição"] [--accessed-from '<json>'] [--access-to '<json>']`
  
  Exemplo com controle de acesso:  
  `./user_group.py --url <url> --token <token> add --name "Engenharia" --accessed-from '[{"type":0,"name":"Gerentes"}]' --access-to '[{"type":1,"name":"Servidores Dev"}]'`

- **Atualizar grupo de usuários:**  
  `./user_group.py --url <url> --token <token> update --name "NomeGrupo" [--new-name "Novo Nome"] [--note "nova nota"] [--accessed-from '<json>'] [--access-to '<json>']`

- **Excluir grupo de usuários:**  
  `./user_group.py --url <url> --token <token> delete --name "NomeGrupo"`
  
  Suporta nomes separados por vírgula: `--name "Grupo1,Grupo2,Grupo3"`

**Gerenciamento de usuários em grupos:**

- **Visualizar usuários no grupo:**  
  `./user_group.py --url <url> --token <token> view-users [--name <group_name>] [--user-name <username>]`
  
  Filtros:
  - `--name`: nome do grupo (correspondência exata, opcional)
  - `--user-name`: nome do usuário (busca difusa, opcional)
  
  Exemplo:  
  `./user_group.py --url <url> --token <token> view-users --name Default --user-name john`

- **Adicionar usuários ao grupo:**  
  `./user_group.py --url <url> --token <token> add-users --name "NomeGrupo" --users "user1,user2,user3"`

**Parâmetros de controle de acesso:**

- `--accessed-from`: array JSON que define quem pode acessar este grupo de usuários
  - Type 0 = Grupo de usuários (ex. `[{"type":0,"name":"Admins"}]`)
  - Type 2 = Usuário (ex. `[{"type":2,"name":"john"}]`)

- `--access-to`: array JSON que define o que este grupo de usuários pode acessar
  - Type 0 = Grupo de usuários (ex. `[{"type":0,"name":"Suporte"}]`)
  - Type 1 = Grupo de dispositivos (ex. `[{"type":1,"name":"Servidores"}]`)

**Nota:** Use aspas simples ao redor dos arrays JSON para evitar problemas de análise do shell.

**Requisitos de permissões:**
- Os comandos `view/add/update/delete/add-users` requerem **Permissão de Grupo de Usuários**
- O comando `view-users` requer **Permissão de Usuário**

---

#### Gerenciamento de Grupos de Dispositivos (`device_group.py`)

**Mostrar ajuda:**  
`./device_group.py -h`

**Visualizar grupos de dispositivos:**  
`./device_group.py --url <url> --token <token> view [--name <group_name>]`

**Exemplo:**  
`./device_group.py --url https://example.com --token <token> view`

**Operações de grupo:**

- **Criar grupo de dispositivos:**  
  `./device_group.py --url <url> --token <token> add --name "NomeGrupo" [--note "descrição"] [--accessed-from '<json>']`
  
  Exemplo:  
  `./device_group.py --url <url> --token <token> add --name "Produção" --accessed-from '[{"type":0,"name":"Admins"}]'`

- **Atualizar grupo de dispositivos:**  
  `./device_group.py --url <url> --token <token> update --name "NomeGrupo" [--new-name "Novo Nome"] [--note "nova nota"] [--accessed-from '<json>']`

- **Excluir grupo de dispositivos:**  
  `./device_group.py --url <url> --token <token> delete --name "NomeGrupo"`
  
  Suporta nomes separados por vírgula: `--name "Grupo1,Grupo2,Grupo3"`

**Gerenciamento de dispositivos em grupos:**

- **Visualizar dispositivos no grupo:**  
  `./device_group.py --url <url> --token <token> view-devices [filtros]`
  
  Filtros disponíveis:
  - `--name`: nome do grupo de dispositivos (correspondência exata)
  - `--id`: ID do dispositivo (busca difusa)
  - `--device-name`: nome do dispositivo (busca difusa)
  - `--user-name`: nome do usuário/proprietário (busca difusa)
  - `--device-username`: nome de usuário conectado no dispositivo (busca difusa)
  
  Exemplos:  
  ```bash
  # Visualizar todos os dispositivos em um grupo
  ./device_group.py --url <url> --token <token> view-devices --name Produção
  
  # Buscar por nome de dispositivo
  ./device_group.py --url <url> --token <token> view-devices --device-name server
  
  # Combinar filtros
  ./device_group.py --url <url> --token <token> view-devices --name Produção --user-name john
  ```

- **Visualizar grupos de dispositivos acessíveis:**  
  `./device_group.py --url <url> --token <token> accessible`
  
  Mostra todos os grupos de dispositivos acessíveis ao usuário atual.

- **Adicionar dispositivos ao grupo:**  
  `./device_group.py --url <url> --token <token> add-devices --name "NomeGrupo" --ids "deviceid1,deviceid2"`

- **Remover dispositivos do grupo:**  
  `./device_group.py --url <url> --token <token> remove-devices --name "NomeGrupo" --ids "deviceid1,deviceid2"`

**Parâmetro de controle de acesso:**

- `--accessed-from`: array JSON que define quem pode acessar este grupo de dispositivos
  - Type 0 = Grupo de usuários (ex. `[{"type":0,"name":"Engenheiros"}]`)
  - Type 2 = Usuário (ex. `[{"type":2,"name":"admin"}]`)

**Requisitos de permissões:**
- Os comandos `view/add/update/delete/add-devices/remove-devices` requerem **Permissão de Grupo de Dispositivos**
- O comando `view-devices` requer **Permissão de Dispositivo**

---

#### Gerenciamento de Dispositivos (`devices.py`)

**Mostrar ajuda:**

    ./devices.py -h

**Visualizar dispositivos:**

    ./devices.py --url <url> --token <token> view [--id <device_id>] [--device_name <device_name>] [--user_name <user_name>] [--group_name <group_name>] [--device_group_name <device_group_name>] [--offline_days <days>]

**Filtros:**

    --id : ID do dispositivo
    --device_name : nome do dispositivo
    --user_name : usuário atribuído
    --group_name : grupo de usuários
    --device_group_name : grupo de dispositivos
    --offline_days : dias offline

**Exemplo:**

    ./devices.py --url https://example.com --token <token> view --user_name mike

**Operações:**

`view` pode ser substituído por `enable`, `disable`, `delete` ou `assign`.

**Exemplo (atribuir dispositivo):**

    ./devices.py --url https://example.com --token <token> assign --device_name PC01 --assign_to user_name=mike

---

#### Gerenciamento de Livro de Endereços (`ab.py`)

**Mostrar ajuda:**

    ./ab.py -h

**Visualizar livros de endereços compartilhados:**

    ./ab.py --url <url> --token <token> view-ab [--ab-name <address_book_name>]

**Obter GUID do livro de endereços pessoal:**

    ./ab.py --url <url> --token <token> get-personal-ab

**Adicionar livro de endereços compartilhado:**

    ./ab.py --url <url> --token <token> add-ab --ab-name <name> [--note <note>] [--password <password>]

**Atualizar ou deletar livro de endereços compartilhado:**

    ./ab.py --url <url> --token <token> update-ab --ab-guid <guid> [--ab-update-name <new_name>] [--note <note>]
    ./ab.py --url <url> --token <token> delete-ab --ab-guid <guid>

**Visualizar peers em um livro de endereços:**

    ./ab.py --url <url> --token <token> view-peer --ab-guid <guid> [--peer-id <peer_id>] [--alias <alias>]

**Adicionar, atualizar ou deletar um peer:**

    ./ab.py --url <url> --token <token> add-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]
    ./ab.py --url <url> --token <token> update-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]
    ./ab.py --url <url> --token <token> delete-peer --ab-guid <guid> --peer-id <peer_id>

**Gerenciamento de tags:**

    ./ab.py --url <url> --token <token> view-tag --ab-guid <guid>
    ./ab.py --url <url> --token <token> add-tag --ab-guid <guid> --tag-name <name> [--tag-color 0xFF00FF00]
    ./ab.py --url <url> --token <token> update-tag --ab-guid <guid> --tag-name <name> --tag-color 0xFFFF0000
    ./ab.py --url <url> --token <token> delete-tag --ab-guid <guid> --tag-name <name>

**Gerenciamento de regras de acesso:**

    ./ab.py --url <url> --token <token> view-rule --ab-guid <guid>
    ./ab.py --url <url> --token <token> add-rule --ab-guid <guid> [--rule-type user|group|everyone] [--rule-user <user>] [--rule-group <group>] --rule-permission ro|rw|full
    ./ab.py --url <url> --token <token> update-rule --rule-guid <rule_guid> --rule-permission rw
    ./ab.py --url <url> --token <token> delete-rule --rule-guid <rule_guid>

**Exemplo (adicionar regra somente leitura para usuário "mike"):**

    ./ab.py --url https://example.com --token <token> add-rule --ab-guid <guid> --rule-user mike --rule-permission ro

---

#### Gestão de Estratégias (`strategies.py`)

**Mostrar ajuda:**  
`./strategies.py -h`

**Listar todas as estratégias:**  
`./strategies.py --url <url> --token <token> list`

**Ver uma estratégia específica:**  
```bash
# Por nome
./strategies.py --url <url> --token <token> view --name "Default"

# Por GUID
./strategies.py --url <url> --token <token> view --guid "01983006-fcca-7c12-9a91-b1df483c6073"
```

**Ativar ou desativar uma estratégia:**  
```bash
./strategies.py --url <url> --token <token> enable --name "NomeEstrategia"
./strategies.py --url <url> --token <token> disable --name "NomeEstrategia"
```

**Atribuir estratégia a dispositivos, usuários ou grupos de dispositivos:**  
```bash
# Atribuir a dispositivos (por ID de dispositivo)
./strategies.py --url <url> --token <token> assign --name "Default" --peers "1849118658,1337348840"

# Atribuir a usuários (por nome de usuário)
./strategies.py --url <url> --token <token> assign --name "Default" --users "admin,user1"

# Atribuir a grupos de dispositivos (por nome de grupo)
./strategies.py --url <url> --token <token> assign --name "Default" --device-groups "device_group1,Production"

# Atribuição mista
./strategies.py --url <url> --token <token> assign \
  --name "Default" \
  --peers "1849118658" \
  --users "admin" \
  --device-groups "device_group1"
```

**Cancelar atribuição de estratégia:**  
```bash
# Cancelar de dispositivos
./strategies.py --url <url> --token <token> unassign --peers "1849118658,1337348840"

# Cancelar de usuários
./strategies.py --url <url> --token <token> unassign --users "admin"

# Cancelar de grupos de dispositivos
./strategies.py --url <url> --token <token> unassign --device-groups "device_group1"
```

**Notas:**
- O script suporta nomes e GUIDs para usuários e grupos de dispositivos
- IDs de dispositivos são automaticamente convertidos em GUIDs
- Todas as operações assign/unassign podem trabalhar com múltiplos alvos de uma vez

**Requisitos de permissões:**
- Os comandos `list/view/enable/disable/assign/unassign` requerem **Permissão de Estratégia**
- `--peers` requer **Permissão de Dispositivo:r** (para pesquisa de ID para GUID)
- `--users` requer **Permissão de Usuário:r** (para pesquisa de nome de usuário para GUID)
- `--device-groups` requer **Permissão de Grupo de Dispositivos:r** (para pesquisa de nome de grupo para GUID)

---


#### Auditorias (`audits.py`)

**Mostrar ajuda:**

    ./audits.py -h

**Visualizar auditoria de conexões:**

    ./audits.py --url <url> --token <token> view-conn [--remote <peer_id>] [--conn-type <type>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Visualizar auditoria de arquivos:**

    ./audits.py --url <url> --token <token> view-file [--remote <peer_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Visualizar auditoria de alarmes:**

    ./audits.py --url <url> --token <token> view-alarm [--device <device_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Visualizar auditoria de console:**

    ./audits.py --url <url> --token <token> view-console [--operator <username>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Filtros:**

    --remote : ID do peer (para auditoria de conexão ou arquivos)
    --conn-type : 0=Desktop Remoto, 1=Transferência de Arquivos, 2=Transferência de Portas, 3=Visualizar Câmera, 4=Terminal
    --device : ID do dispositivo (para auditoria de alarmes)
    --operator : nome do operador (para auditoria de console)
    --created-at : filtro de horário local, ex: "2025-09-16 14:15:57"
    --days-ago : filtra registros mais recentes do que n dias atrás
    --page-size / --current : paginação

**Exemplo:**

    ./audits.py --url https://example.com --token <token> view-conn --remote 123456789 --days-ago 7

## Procurando por um dispositivo
1. Vá para Dispositivos.
2. No Campo de Pesquisa de Nome do Dispositivo, digite o nome e clique em `Consultar` ou pressione <kbd>Enter</kbd>.
3. Para usar um curinga, adicione `%` no início, fim ou ambos do termo de pesquisa.