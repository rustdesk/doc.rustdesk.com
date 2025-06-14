---
title: Android
weight: 4
---

## Controle remoto

Digite o ID do dispositivo remoto na página inicial ou selecione um dispositivo histórico para verificar.
Após a verificação bem-sucedida, você pode controlar o dispositivo remoto.

| Inicial | Conectado com sucesso |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_en.jpg?width=300px) | ![](/docs/en/client/android/images/connection_en.jpg?width=300px) |

O controle de entrada oferece dois modos: `Modo mouse` e `Modo toque`, que podem ser alternados através da barra de ferramentas inferior.

| Configurações do mouse | Seleção de modo |
| --- | --- |
| ![](/docs/en/client/android/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/client/android/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
No `Modo mouse`, você também pode acionar o `Clique direito` do dispositivo remoto com um `Toque de dois dedos`
{{% /notice %}}

## Transferência de arquivos (Android)

> Requer RustDesk ≥ 1.1.9

Selecione o dispositivo na lista de dispositivos na página inicial.

Pressione e segure ou toque no menu à direita para selecionar `Transferência de arquivos`.

| Inicial | Conectado com sucesso |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_connection_en.jpg?width=300px) |

- O diretório inicial é o diretório home do dispositivo, você pode clicar em <i class="fas fa-home"></i> para retornar rapidamente ao home.
- Abaixo da barra de título está o nível do diretório, você pode clicar na pasta correspondente para pular rapidamente.
- Clique em <i class="fas fa-arrow-up"></i> para acessar o diretório pai.
- O caminho absoluto atual e as estatísticas do projeto serão exibidos na parte inferior da lista.
- Clique em `Local` / `Remoto` na barra de título para trocar páginas.

### Como transferir arquivos?

1. **Pressione e segure** um arquivo ou pasta na lista para entrar rapidamente no **modo de seleção múltipla**, que pode selecionar múltiplos itens.
2. Após selecionar o(s) arquivo(s), troque a página `Local` / `Remoto`. Após a troca, você verá o prompt `Colar aqui?` na parte inferior da tela.
3. Clique no ícone de colar arquivo na imagem para transferir o(s) item(ns) selecionado(s) para o diretório de destino.

| Modo de seleção múltipla | Colar arquivo |
| --- | --- |
| ![](/docs/en/client/android/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_copy_en.jpg?width=300px) |

## Configurar servidor ID/Relay

1. Clique em `Configurações` na barra de navegação inferior.
2. Clique em `Servidor ID/Relay`.
3. Digite o nome do host/endereço IP do seu servidor ID no campo `Servidor ID`. Deixe `Servidor Relay` e `Servidor API` vazios, e digite sua chave pública (opcional, necessária para criptografia) no campo `Chave`. Pressione **OK** para salvar suas configurações. Ele mudará automaticamente para o servidor especificado.

Você também pode configurá-lo escaneando um código QR. Para gerar o código QR, use o seguinte formato (altere os valores `host` e `key` para os seus):

```nolang
config={"host": "xxx", "key": "xxx"}
```

Em seguida, vá para um [Gerador de código QR online](https://www.qr-code-generator.com/) e cole o código acima.

A imagem abaixo é uma captura de tela do Android. Se for iOS, verifique o menu superior direito na página inicial.

![](/docs/en/client/android/images/id_setting_en.jpg?width=300px)

## Compartilhar tela/arquivos do seu telefone Android

A partir da versão 1.1.9, o cliente Android adicionou as funções de compartilhamento da tela do telefone e compartilhamento do sistema de arquivos do telefone.

- Android 6 e superior é necessário para compartilhamento de tela
- Android 10 ou superior é necessário para compartilhar o áudio interno do sistema do telefone móvel
- iOS ainda não suporta compartilhamento de tela

### Solicitar permissões e iniciar serviços

Clique em `Compartilhar tela` na barra de navegação inferior.

Configure várias permissões conforme necessário. Toda vez que você iniciar o RustDesk, precisará solicitar novamente as permissões "Captura de tela" e "Controle de entrada".

![](/docs/en/client/android/images/server_off_en.jpg?width=300px)

| Permissão | Descrição |
| --- | --- |
| Captura de tela | Se deve habilitar a permissão de compartilhamento de captura de tela, o serviço de monitoramento será habilitado ao mesmo tempo que a inicialização |
| Controle de entrada* | Se deve permitir que o controlador controle a entrada do telefone, como operações de tela sensível ao toque virtual com o mouse |
| Transferência de arquivos* | Se deve habilitar a permissão de transferência de arquivos, após a inicialização, você pode controlar remotamente o sistema de arquivos deste telefone |
| Captura de áudio | Se deve compartilhar a música do sistema interno do telefone (não entrada de microfone) |

{{% notice note %}}
O * acima representa permissões especiais. Para obter tais permissões, você precisa pular para a página de configurações do sistema Android para obtê-las manualmente. Os detalhes são os seguintes
{{% /notice %}}

### Solicitação de permissão especial - Arquivo

| Solicitar permissões de arquivo Android pulará automaticamente para a página de configurações do sistema |
| :---: |
| ![](/docs/en/client/android/images/get_file_en.jpg?width=300px) |

### Solicitação de permissão especial - entrada do mouse
| Passo 1: Encontre "Serviços instalados" | Passo 2: Inicie RustDesk Input |
| --- | --- |
| ![](/docs/en/client/android/images/get_input1_en.jpg?width=300px) | ![](/docs/en/client/android/images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
A página de configurações do sistema de diferentes fornecedores pode ser diferente, ajuste-a de acordo com sua página do sistema.
{{% /notice %}}

| Atalhos de controle de mouse remoto | Descrição |
| --- | --- |
| Clique com o botão direito do mouse | Voltar |
| Clique na roda do mouse | Início |
| Pressão longa na roda do mouse | Aplicativos abertos recentemente |
| Rolagem da roda do mouse | Simular deslizamento vertical |

### Iniciar serviço

Após obter a permissão `Captura de tela`, o serviço será iniciado automaticamente. Você também pode clicar no botão `Iniciar serviço` para iniciar o serviço. Uma vez que o serviço seja iniciado, ele pode aceitar solicitações de controle de desktop de outros dispositivos.

Se a permissão `Transferência de arquivos` estiver habilitada, também pode aceitar solicitações de controle de arquivos de outros dispositivos.

Após iniciar o serviço, um ID único e senha aleatória serão automaticamente obtidos para este dispositivo. Outros dispositivos podem controlar o telefone através do ID e senha, ou confirmar manualmente ao receber uma nova solicitação.

| Antes de iniciar o serviço | Após iniciar o serviço |
| --- | --- |
| ![](/docs/en/client/android/images/server_off_en.jpg?width=300px) | ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. Clicar em `Iniciar serviço` habilitará a permissão `Captura de tela` por padrão.
2. Quando a permissão `Captura de tela` não é obtida, outros dispositivos não podem emitir solicitações de controle.
3. Exceto pela permissão `Captura de tela`, a troca de outras permissões só afetará as novas conexões e não afetará a conexão estabelecida. Se você precisar trocar permissões para uma conexão estabelecida, feche primeiro a conexão atual, modifique as permissões e então receba uma solicitação de controle.
{{% /notice %}}

#### PC

![](/docs/en/client/android/images/android_server_pc_side_en.png?width=700px)

#### Terminal móvel

| Você pode parar o serviço ou fechar a conexão especificada a qualquer momento | Você pode receber ou iniciar chats |
| --- | --- |
| ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) | ![](/docs/en/client/android/images/android_server2_en.jpg?width=300px) |