---
title: Android
weight: 4
---

### Controle Remoto

Insira o ID do dispositivo remoto na página inicial ou selecione um dispositivo histórico para verificar.
Após a verificação ser bem-sucedida, você pode controlar o dispositivo remoto.

| Home | Conectado com Sucesso |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_en.jpg?width=300px) | ![](/docs/en/client/android/images/connection_en.jpg?width=300px) |

O controle de entrada fornece dois modos: `Modo Mouse` e `Modo Toque`, que podem ser alternados através da barra de ferramentas inferior.

| Configuração de Mouse | Modo de Seleção |
| --- | --- |
| ![](/docs/en/client/android/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/client/android/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
No `Modo Mouse`, você também pode ativar o `Botão Direito` do mouse do dispositivo remoto com um `Toque de dois dedos`.
{{% /notice %}}

### Transferência de Arquivos (Android)

> Requer RustDesk ≥ 1.1.9

Na lista de dispositivos da página inicial, selecione o dispositivo.

Pressione longamente ou toque no menu à direita para selecionar `Transferência de Arquivos`.

| Home | Conectado com Sucesso |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_connection_en.jpg?width=300px) |

- O diretório inicial é o diretório Home do dispositivo, você pode clicar em <i class="fas fa-home"></i> para retornar rapidamente para Home.
- Abaixo da barra de título está o nível do diretório, você pode clicar na pasta correspondente para saltar rapidamente.
- Clique em <i class="fas fa-arrow-up"></i> para acessar o diretório pai.
- O caminho absoluto atual e as estatísticas do projeto serão exibidos na parte inferior da lista.
- Clique em `Local` / `Remoto` na barra de título para alternar as páginas.

#### Como transferir arquivos?

1. **Pressione longamente** em um arquivo ou pasta na lista para entrar rapidamente no modo de seleção múltipla, que pode selecionar vários itens.
2. Após selecionar o(s) arquivo(s), alterne a página `Local` / `Remoto`. Após a troca, você verá o prompt `Colar aqui?` na parte inferior da tela.
3. Clique no ícone de colar arquivo na imagem para transferir o(s) item(s) selecionado(s) para o diretório de destino.

| Modo de Multi-Seleção | Colar Arquivo |
| --- | --- |
| ![](/docs/en/client/android/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_copy_en.jpg?width=300px) |

### Definir ID/Servidor Relé

1. Clique em `Configurações` na barra de navegação inferior.
2. Clique em `Servidor ID/Relay`.
3. Insira o nome de host/IP do seu no campo `Servidor de ID`. Deixe `Servidor de Relay` e `Servidor da API` em branco e insira sua chave pública (opcional, necessária para criptografia) no campo `Key`. Pressione OK para salvar suas configurações. Ele irá alternar automaticamente para o servidor especificado.

Você também pode configurá-lo escaneando um código QR. Para gerar o código QR, use o seguinte formato (altere os valores `host` e `key` para os seus):

```nolang
config={"host": "xxx", "key": "xxx"}
```

Em seguida, vá para um [Gerador de Código QR Online](https://www.qr-code-generator.com/) e cole o código acima.

A imagem abaixo é uma captura de tela do Android. Se for iOS, verifique o menu superior direito na página inicial.

![](/docs/en/client/android/images/id_setting_en.jpg?width=300px)

### Compartilhar tela/arquivos do seu telefone Android

A partir da versão 1.1.9, o cliente Android adicionou as funções de compartilhamento da tela do telefone e compartilhamento do sistema de arquivos do telefone.

- Android 6 ou superior é necessário para o compartilhamento de tela
- Android 10 ou superior é necessário para compartilhar o áudio interno do sistema do telefone móvel
- iOS ainda não suporta compartilhamento de tela

#### Solicitar permissões e iniciar serviços

Clique em `Compartilhar Tela` na barra de navegação inferior.

Configure as várias permissões conforme necessário. Toda vez que você iniciar o RustDesk, você precisará solicitar novamente as permissões "Captura de Tela" e "Controle de Entrada".

![](/docs/en/client/android/images/server_off_en.jpg?width=300px)

| Permissões | Descrição |
| --- | --- |
| Captura de Tela | Se permitir a permissão de compartilhamento de captura de tela, o serviço de monitoramento será ativado simultaneamente ao início |
| Controle de Entrada* | Se permitir que o controlador controle a entrada do telefone móvel, como operação da tela sensível ao toque virtual com o mouse |
| Transferência de Arquivos* | Se permitir a permissão de transferência de arquivos, após a inicialização, você pode controlar remotamente o sistema de arquivos deste telefone |
| Captura de Áudio  | Se compartilhar a música do sistema dentro do telefone (não a entrada do microfone) |

{{% notice note %}}
Acima, * representa permissões especiais. Para obter tais permissões, você precisa ir para a página de configurações do sistema Android para obtê-las manualmente. Os detalhes são os seguintes
{{% /notice %}}

#### Solicitação de Permissão Especial - Arquivo

| Solicitar permissões de arquivo Android irá saltar automaticamente para a página de configurações do sistema |
| :---: |
| ![](/docs/en/client/android/images/get_file_en.jpg?width=300px) |

#### Solicitação de Permissão Especial - entrada do mouse

| Etapa 1: Encontre "Serviços Instalados" | Etapa 2: Iniciar Entrada RustDesk |
| --- | --- |
| ![](/docs/en/client/android/images/get_input1_en.jpg?width=300px) | ![](/docs/en/client/android/images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
A página de configuração do sistema de diferentes fornecedores pode ser diferente, por favor ajuste de acordo com a sua página do sistema.
{{% /notice %}}

| Atalhos de controle do mouse remoto | Descrição |
| --- | --- |
| Clique com o botão direito do mouse | Voltar |
| Clique na roda do mouse | Início |
| Pressione longamente a roda do mouse | Aplicativos abertos recentemente |
| Rolagem da roda do mouse| Simular deslizamento vertical |

#### Iniciar Serviço

Após obter a permissão `Captura de Tela`, o serviço será iniciado automaticamente. Você também pode clicar no botão `Iniciar Serviço` para iniciar o serviço. Após o serviço ser iniciado, ele pode aceitar solicitações de controle de desktop de outros dispositivos.

Se a permissão `Transferência de Arquivos` estiver habilitada, ela também pode aceitar solicitações de controle de arquivos de outros dispositivos.

Após o serviço ser iniciado, um ID único e uma senha aleatória serão obtidos automaticamente para este dispositivo. Outros dispositivos podem controlar o telefone através do ID e senha, ou confirmar manualmente quando uma nova solicitação for recebida.

| Antes de iniciar o serviço | Após iniciar o serviço |
| --- | --- |
| ![](/docs/en/client/android/images/server_off_en.jpg?width=300px) | ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. Clicar em `Iniciar Serviço` habilitará a permissão Captura de Tela por padrão.
2. Quando a permissão `Captura de Tela` não for obtida, outros dispositivos não podem emitir solicitações de controle.
3. Exceto pela permissão `Captura de Tela`, a alteração de outras permissões afetará apenas a nova conexão e não afetará a conexão estabelecida. Se você precisar alterar as permissões para uma conexão estabelecida, feche primeiro a conexão atual, modifique as permissões e, em seguida, receba uma solicitação de controle.
{{% /notice %}}

##### PC

![](/docs/en/client/android/images/android_server_pc_side_en.png?width=700px)

##### Terminal móvel

| Você pode parar o serviço ou fechar a conexão especificada a qualquer momento | Você pode receber ou iniciar chats |
| --- | --- |
| ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) | ![](/docs/en/client/android/images/android_server2_en.jpg?width=300px) |
