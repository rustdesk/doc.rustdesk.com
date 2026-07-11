---
title: Lista de endereços
weight: 201
description: "Use a Lista de endereços no RustDesk Server Pro para salvar dispositivos remotos, compartilhar listas de dispositivos, organizar dispositivos com tags e conectar-se pelo cliente RustDesk com senhas compartilhadas."
keywords: ["rustdesk address book", "rustdesk server pro address book", "rustdesk shared address book", "rustdesk device tags", "rustdesk shared password"]
---

A Lista de endereços permite que usuários salvem IDs de dispositivos RustDesk, organizem-nos com tags, compartilhem listas de dispositivos e conectem-se pelo cliente RustDesk com senhas salvas.

## Respostas rápidas

- **Minha lista de contatos** é privada para o usuário conectado. Senhas digitadas manualmente e lembradas são salvas em **Minha lista de contatos** e podem ser sincronizadas entre os dispositivos do usuário.
- Listas de endereços **compartilhadas** podem ser compartilhadas com usuários específicos, grupos de usuários ou todos os usuários.
- Uma lista de endereços compartilhada pode armazenar uma senha no nível da lista de endereços, e cada entrada de dispositivo pode armazenar uma senha no nível do dispositivo. Quando a senha no nível do dispositivo não está definida, a senha no nível da lista de endereços é usada.
- Tags podem ser usadas para filtrar dispositivos na console web e no cliente RustDesk.

## Conexão com um clique usando uma lista de endereços compartilhada

Use uma lista de endereços compartilhada quando os usuários precisarem se conectar sem digitar manualmente a senha remota todas as vezes.

1. Crie ou abra uma lista de endereços compartilhada. Opcionalmente, defina uma **senha no nível da lista de endereços** para a lista.

2. Clique no nome da lista de endereços para abrir a página de dispositivos. Clique em **Importar**, selecione os dispositivos para importar para a lista de endereços e clique em **Salvar** na parte inferior para salvar os dispositivos selecionados. Ou clique em **Adicionar** para adicionar um dispositivo por ID, usando um endereço IP como ID para acesso IP direto. Opcionalmente, defina uma **senha no nível do dispositivo** em entradas individuais de dispositivo.

3. Compartilhe a lista de endereços com usuários específicos, grupos de usuários ou todos os usuários.

4. O usuário entra no cliente RustDesk e abre a aba **Lista de endereços**.

5. O usuário seleciona a lista de endereços compartilhada e clica no cartão do dispositivo.

![Clicar no cartão de dispositivo de uma lista de endereços compartilhada no cliente](/docs/en/self-host/rustdesk-server-pro/address-book/images/click-peer-card.png)

{{% notice warning %}}
A senha compartilhada é usada somente ao conectar-se pela lista de endereços compartilhada correspondente, seja clicando no cartão do dispositivo ou usando seu menu suspenso. Ela não é usada em outra aba de dispositivo, no botão **Conectar** ao lado do campo de entrada de ID ou em outra lista de endereços compartilhada.
{{% /notice %}}

## Permissões da lista de endereços compartilhada

| Permissão | O que os usuários podem fazer |
| --- | --- |
| **Somente leitura** | Podem visualizar dispositivos e tags, e podem usar a senha. |
| **Leitura/Escrita** | Podem editar dispositivos e tags. |
| **Controle total** | Podem compartilhar novamente, excluir ou renomear a lista de endereços. |

Quando várias regras correspondem ao mesmo usuário, a prioridade é:

1. Usuário
2. Grupo
3. Todos

Por exemplo, se **Todos** estiver como Somente leitura, mas um usuário específico tiver Controle total, esse usuário receberá a permissão Controle total.

![Permissões de compartilhamento da lista de endereços](/docs/en/self-host/rustdesk-server-pro/address-book/images/share-list.png)

![Permissão de lista de endereços compartilhada na console web](/docs/en/self-host/rustdesk-server-pro/address-book/images/user1-permission.png)

## Console web

### Criar ou editar uma lista de endereços compartilhada

Em **Lista de endereços > Compartilhado**, crie uma lista de endereços compartilhada com um nome, uma nota opcional e uma **Senha compartilhada padrão** opcional. Esta é a senha no nível da lista de endereços.

![Criar lista de endereços compartilhada com senha compartilhada padrão](/docs/en/self-host/rustdesk-server-pro/address-book/images/create-shared-address-book.png)

### Adicionar dispositivos e senhas

Dispositivos podem ser adicionados manualmente por ID ou importados da lista de dispositivos do Server Pro. Para cada entrada, você pode definir um alias, tags, nota e, para listas de endereços compartilhadas, uma senha no nível do dispositivo.

![Adicionar dispositivo à lista de endereços compartilhada](/docs/en/self-host/rustdesk-server-pro/address-book/images/import-device.png)

![Dispositivos](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-addressbook-devices.png)

![Editar dispositivo na lista de endereços compartilhada](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-edit-device.png)

### Tags e filtragem

Tags organizam e filtram dispositivos. `Sem tag` filtra dispositivos sem tags. Com **Filtrar por interseção** ativado, somente dispositivos que correspondem a todas as tags selecionadas são exibidos.

### Lixeira

Excluir um dispositivo de uma lista de endereços move a entrada para a lixeira dessa lista de endereços. Isso não exclui o dispositivo do RustDesk Server Pro.

## Comportamento da senha compartilhada

| Nível da senha | Prioridade |
| --- | --- |
| Senha no nível do dispositivo | Usada primeiro quando a entrada do dispositivo tem uma senha. |
| Senha no nível da lista de endereços | Usada quando a entrada do dispositivo não tem senha. |

Se nenhuma senha estiver definida, o usuário se conecta normalmente e talvez precise digitar a senha manualmente. Na console web, as colunas de senha mostram apenas se uma senha está definida.

## Cliente RustDesk

Após entrar, use o seletor de lista de endereços para alternar entre **Minha lista de contatos** e listas de endereços compartilhadas. Para listas de endereços compartilhadas, o cliente mostra a permissão do usuário atual.

![Seletor de lista de endereços do cliente RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-selector.png)

![Lista de endereços somente leitura](/docs/en/self-host/rustdesk-server-pro/address-book/images/read-only-address-book.png)

### Editar pelo cliente

Usuários com permissão de escrita podem adicionar IDs, adicionar tags, editar aliases, editar tags, editar notas, definir senhas compartilhadas ou remover entradas.

![Menu de dispositivo da lista de endereços 1 no cliente RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu1.png)

![Adicionar ID no cliente RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-add-id.png)

![Menu de dispositivo da lista de endereços 2 no cliente RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu2.png)

![Alterar senha no cliente RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-change-password.png)

## Predefinições de implantação

A configuração do cliente RustDesk pode predefinir a atribuição da lista de endereços:

- `preset-address-book-name`
- `preset-address-book-tag`
- `preset-address-book-alias`
- `preset-address-book-password`
- `preset-address-book-note`

`preset-address-book-alias`, `preset-address-book-password` e `preset-address-book-note` exigem RustDesk client 1.4.3 ou posterior e RustDesk Server Pro 1.6.6 ou posterior.

Para mais detalhes, consulte a [configuração avançada do cliente](/docs/en/self-host/client-configuration/advanced-settings/#preset-address-book-name--preset-address-book-tag--preset-address-book-alias--preset-address-book-password--preset-address-book-note).

## Configurações relacionadas

| Configuração | Onde | Efeito |
| --- | --- | --- |
| **Permitir que não administradores compartilhem listas de endereços com outros grupos** | **Configurações > Outros** | Permite que usuários não administradores compartilhem listas de endereços com outros grupos de usuários. |
| **Desabilitar lista de endereços** | **Cliente personalizado** | Oculta ou desabilita a Lista de endereços no cliente personalizado gerado. |

## Solução de problemas

### Senha incorreta

A senha salva em uma lista de endereços compartilhada é usada pelo cliente RustDesk controlador. Ela não é definida no dispositivo controlado. Defina a senha do dispositivo controlado nesse dispositivo em **Configurações > Segurança > Senha**.

Para usar a senha compartilhada, conecte-se pela lista de endereços compartilhada correspondente clicando no cartão do dispositivo. Conectar-se por outra lista de endereços, outra aba de dispositivo ou pelo botão **Conectar** ao lado do campo de entrada de ID não usa a senha compartilhada desta lista de endereços.
