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

### Fazer login

A porta padrão do console web é 21114. Digite `http://<ip do servidor>:21114` no navegador para acessar a página do console, conforme mostrado na figura a seguir. O nome de usuário/senha padrão do administrador é `admin`/`test1234`:

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

Se você precisar de suporte HTTPS, instale um servidor web como `Nginx` ou use `IIS` para Windows.

Após fazer login, certifique-se de alterar a senha, selecione `Configurações` no menu da conta no canto superior direito para acessar a página de modificação de senha, conforme mostrado na figura a seguir. Você também pode criar outra conta de administrador e excluir esta. É recomendável habilitar a verificação de login por email.

<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

Usuários não-administradores também podem fazer login para navegar seus dispositivos e logs, alterar suas configurações de usuário.

### Configurações Automáticas
Ao clicar em `Windows EXE` você poderá obter as configurações para seu próprio RustDesk Server Pro, isso ajudará a configurar seus clientes.

Para clientes Windows, você pode omitir a configuração personalizada do servidor e colocar as informações de configuração no nome do arquivo `rustdesk.exe`. Como mostrado acima, vá para a página de boas-vindas do console e clique em `Windows EXE`. **Cliente ≥ 1.1.9 necessário.**

Você pode usar isso em conjunto com [configuração do cliente](https://rustdesk.com/docs/en/self-host/client-configuration/) e [scripts de implantação](https://rustdesk.com/docs/en/self-host/client-deployment/) para configurar seus clientes.

### Criando um novo usuário diferente do usuário padrão `admin`

{{% notice note %}}
O plano `Individual` não possui este recurso.
{{% /notice %}}

1. Clique em `Usuários` no menu da esquerda.
2. Crie outra conta com `administrador` habilitado.
3. Faça login com a nova conta administrativa.
4. Exclua o `admin` na página `Usuários`.

### Criando um novo usuário
1. Clique em `Usuários` no menu da esquerda.
2. Crie um novo usuário.
3. Selecione em qual grupo eles devem estar (se você precisar adicionar novos grupos, continue lendo).

### Adicionar um novo Grupo
1. Clique em `Grupos` no menu da esquerda.
2. Crie um novo grupo.
3. Uma vez criado, você pode permitir que grupos acessem uns aos outros, clique em `Editar`.
4. Selecione os grupos relevantes que você deseja acesso (adiciona automaticamente no grupo correspondente).

### Configurando múltiplos servidores de relay
1. Vá para `Configurações` no menu da esquerda.
2. Clique em `Relay` no submenu.
3. Clique em `+` ao lado de `Servidores Relay`.
4. Digite o endereço DNS ou endereço IP do servidor relay na caixa que agora aparece e pressione <kbd>Enter</kbd>.
5. Se você tiver mais de um servidor relay, pode continuar clicando em `+` e adaptando as configurações geográficas se necessário (lembre-se e copie sua chave para os outros servidores).

### Definir ou alterar a licença
1. Vá para `Configurações` no menu da esquerda.
2. Clique em `Licença` no submenu.
3. Clique em `Editar` e cole seu código de licença.
4. Clique em `OK`.

### Visualizando Logs
No lado esquerdo, clique em `Logs`.

### Configurar Emails
Gmail neste exemplo

1. Vá para `Configurações` no menu da esquerda.
2. Clique em `SMTP` no submenu.
3. Digite o endereço SMTP `smtp.gmail.com`.
4. Digite a Porta 587 em `Porta SMTP`.
5. Digite a conta Gmail, ou seja, `myrustdeskserver@gmail.com` em `Conta de Email`.
6. Digite sua senha (você pode precisar de uma senha de aplicativo).
7. Digite sua conta Gmail, ou seja, `myrustdeskserver@gmail.com` em `De`.
8. Clique em `Verificar` para salvar.

### Atribuir Usuários/Grupos/Estratégias/GrupoDispositivo de Dispositivo a Dispositivos
O Usuário é o Usuário RustDesk logado no dispositivo ou atribuído ao dispositivo clicando em `Editar` ao lado do dispositivo, clique na caixa `Usuário` e use o dropdown para selecionar seu usuário, isso atribuirá automaticamente o grupo baseado no grupo ao qual o usuário foi atribuído.

Isso também pode ser feito via API na linha de comando durante a implantação ou posteriormente chamando o executável RustDesk seguido de `--assign --token <token gerado> --user_name <nome do usuário>`. Você precisa ir para `Configurações → Tokens → Criar` e criar um token com permissões de Dispositivo primeiro para fazer isso. Um exemplo disso no Windows seria `"C:\Program Files\RustDesk\rustdesk.exe" --assign --token <token gerado> --user_name <novo usuário>`.

Você também pode atribuir estratégia dessa forma, por exemplo, `--assign --token <token gerado> --strategy_name <nome da estratégia>`.

Você também pode atribuir caderno de endereços dessa forma, por exemplo, `--assign --token <token gerado> --address_book_name <nome do caderno de endereços>` ou `--assign --token <token gerado> --address_book_name <nome do caderno de endereços> --address_book_tag <tag do caderno de endereços> --address_book_alias <alias>`. `--address_book_alias` requer RustDesk Server Pro ≥1.5.8 e cliente ≥1.4.1.

Você também pode atribuir nome de grupo de dispositivo dessa forma, por exemplo, `--assign --token <token gerado> --device_group_name <nome do grupo de dispositivo>`.

A linha de comando no Windows não tem saída por padrão. Para obter saída, execute assim, `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more` ou `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String`, veja [aqui](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952).

### Procurando por um dispositivo
1. Vá para Dispositivos.
2. No Campo de Pesquisa de Nome do Dispositivo, digite o nome e clique em `Consultar` ou pressione <kbd>Enter</kbd>.
3. Para usar um curinga, adicione `%` no início, fim ou ambos do termo de pesquisa.