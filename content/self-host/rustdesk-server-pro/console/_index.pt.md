---
title: Web Console
weight: 10
---

O console web está integrado ao RustDesk Server Pro, acessado pela porta `21114`.

Recursos:

- Explorar dispositivos
- Adicionar/modificar usuários e grupos de usuários
- Modificar permissões de acesso a dispositivos
- Explorar logs de conexão de dispositivos e outros logs
- Atualizar configurações
- Gerenciar estratégias de sincronização de configurações do cliente
- Gerenciar catálogos de endereços compartilhados
- Gerar compilação de cliente personalizado

### Login
A porta padrão do console web é 21114. Digite `http://<host do hbbs>:21114` no navegador para acessar a página do console, conforme mostrado na figura a seguir. O nome de usuário/senha padrão do administrador é **admin/test1234**:

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

Se precisar de suporte a HTTPS, instale um servidor web como `Nginx` ou use o `IIS` para Windows.

Após o login, certifique-se de alterar a senha. Selecione `Configurações` no menu da conta no canto superior direito para entrar na página de modificação de senha, conforme mostrado na figura a seguir. Você também pode criar outra conta de administrador e excluir esta. É recomendável ativar a verificação de login por e-mail.

<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

Usuários não administradores também podem fazer login para navegar em seus dispositivos e logs, além de alterar suas configurações de usuário.

### Configurações Automáticas
Ao clicar em `Windows EXE`, você poderá obter as configurações para o seu próprio RustDesk Server Pro, o que ajudará a configurar seus clientes.

Para clientes Windows, você pode ignorar a configuração personalizada do servidor e colocar as informações de configuração no nome do arquivo `rustdesk.exe`. Conforme mostrado acima, acesse a página inicial do console e clique em `Windows EXE`. **Requer Cliente ≥ 1.1.9.**

Você pode usar isso em conjunto com [configuração do cliente](https://rustdesk.com/docs/pt/self-host/client-configuration/) e [scripts de implantação](https://rustdesk.com/docs/en/self-host/client-deployment/) para configurar seus clientes.

### Criando um novo usuário (diferente do padrão `admin`)

{{% notice note %}}
The `Individual` plan does not have this feature.
{{% /notice %}}

1. Clique em `Users` no menu à esquerda.
2. Crie uma nova conta com a opção `administrador` habilitada.
3. Faça login com a nova conta administrativa.
4. Exclua o usuário `admin` na página `Usuários`.
   
### Criando um novo usuário
1. Clique em `Users` no menu à esquerda.
2. Crie um novo usuário.
3. Selecione o grupo ao qual ele deve pertencer (se precisar adicionar novos grupos, continue lendo).

### Adicionando um novo grupo
1. Clique em `Groups` no menu à esquerda.
2. Crie um novo grupo.
3. Após a criação, você pode permitir que os grupos acessem uns aos outros. Clique em `Editar`.
4. Selecione os grupos relevantes que você deseja que tenham acesso (eles serão adicionados automaticamente ao grupo correspondente).

### Configurando vários servidores relay
1. Acesse `Configurações` no menu à esquerda.
2. Clique em `Relay` no submenu.
3. Clique em `+` ao lado de `Relay Servers`.
4. Digite o endereço DNS ou IP do servidor Relay na caixa que aparece e pressione <kbd>Enter</kbd>.
5. Se você tiver mais de um servidor Relay, continue clicando em `+` e ajuste as configurações geográficas, se necessário (lembre-se de copiar sua chave para os outros servidores).

### Definindo ou alterando a licença
1. Acesse `Configurações` no menu à esquerda.
2. Clique em `Licença` no submenu.
3. Clique em `Editar` e cole seu código de licença.
4. Clique em `OK`.

### Visualizando logs
Clique em `Logs` no lado esquerdo.

### Configuração de e-mails (Gmail neste exemplo)

1. Acesse `Configurações` no menu à esquerda.
2. Clique em `SMTP` no submenu.
3. Digite o endereço SMTP `smtp.gmail.com`.
4. Digite a porta 587 em `Porta SMTP`.
5. Digite a conta do Gmail, por exemplo, `meuservidorderustdesk@gmail.com` em `Conta de Email`.
6. Digite sua senha (você pode precisar de uma senha de aplicativo).
7. Digite a conta do Gmail, por exemplo, `meuservidorderustdesk@gmail.com` em `De`.
8. Clique em `Verificar` para salvar.

### Atribuir Usuários/Grupos/Estratégias de Dispositivo aos Dispositivos
O Usuário é o Usuário RustDesk conectado no dispositivo ou atribuído ao dispositivo clicando em `Editar` ao lado do dispositivo. Clique na caixa `Usuário` e selecione o usuário desejado no menu suspenso. Isso atribuirá automaticamente o grupo com base no grupo ao qual o usuário foi atribuído.

Isso também pode ser feito por meio da API na linha de comando na implantação ou posteriormente, chamando o executável RustDesk seguido de `--assign --token <tokengerado> --user_name <nomedo usuário>`. Para fazer isso, primeiro você precisa acessar `Configurações → Tokens → Criar` e criar um token com permissões de dispositivo. Um exemplo disso no Windows seria `"C:\Program Files\RustDesk\rustdesk.exe" --assign --token <tokengerado> --user_name <novousuario>`.

Você também pode atribuir estratégias dessa forma, por exemplo, `--assign --token <tokengerado> --strategy_name <nomedaestratégia>`.

A linha de comando no Windows não tem saída por padrão. Para obter saída, execute assim: `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more` ou `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String` ([veja aqui](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952)).

### Pesquisando por um dispositivo
1. Acesse `Dispositivos`.
2. No campo `Pesquisar Nome do Dispositivo`, digite o nome e clique em `Pesquisar` ou pressione <kbd>Enter</kbd>.
3. Para usar um curinga, adicione `%` no início, final ou ambos do termo de pesquisa.
