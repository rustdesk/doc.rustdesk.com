---
title: Estratégia
weight: 200
---

### Estratégia

A estratégia é uma ferramenta para administradores do RustDesk atualizarem em massa as opções de segurança das páginas de configurações do cliente. Os administradores podem criar diferentes estratégias e aplicá-las a diferentes dispositivos.

#### Criar estratégias

Você pode criar uma nova estratégia clicando no botão `+` e executar várias ações na estratégia passando o mouse sobre ela e clicando no menu.

No menu pop-up, você pode escolher `Habilitar` ou `Desabilitar` a estratégia, `Renomear`, `Duplicar` ou `Excluir` ela. Além disso, você pode clicar em `Editar dispositivos` para modificar os dispositivos aplicados a essa estratégia ou clicar em `Editar usuários` para modificar os usuários aplicados a essa estratégia.

No lado direito do menu de estratégia, você pode ver o número de dispositivos realmente aplicados à estratégia, levando em conta a prioridade da estratégia.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/strategy_menu.png)

#### Estratégia de dispositivo, estratégia de usuário e estratégia de grupo de dispositivos

As estratégias são aplicadas de acordo com a seguinte ordem de prioridade:
1. Estratégia de dispositivo (Prioridade mais alta)
2. Estratégia de usuário
3. Estratégia de grupo de dispositivos (Prioridade mais baixa)

Cada dispositivo só pode ser gerenciado por uma estratégia por vez. O sistema de prioridade funciona da seguinte forma:
- Estratégias de dispositivo têm prioridade sobre estratégias de usuário e estratégias de grupo de dispositivos
- Estratégias de usuário têm prioridade sobre estratégias de grupo de dispositivos
- Estratégias de grupo de dispositivos se aplicam a todos os dispositivos no grupo de dispositivos que não têm uma estratégia de dispositivo ou estratégia de usuário atribuída

#### Editar dispositivos

Quando você clica no menu `Editar dispositivos`, uma caixa de diálogo de edição exibindo todos os dispositivos será aberta. Você pode alterar o status de seleção das caixas de seleção e então clicar no botão `Salvar` para aplicar as alterações de dispositivos feitas na página atual. Se você precisar modificar dispositivos em outras páginas, navegue para essas páginas. Você também pode usar o menu suspenso no canto superior direito para filtrar dispositivos.

Formato da coluna de estratégia: estratégia de dispositivo/estratégia de usuário/estratégia de grupo de dispositivos, ou "-" para a estratégia padrão.

Aqui está um exemplo da caixa de diálogo que aparece quando você clica em `Editar dispositivos` no menu "demo1". Neste exemplo, o dispositivo "1981241962" é aplicado à estratégia "demo3"; o dispositivo "1279471875" é aplicado à estratégia "demo2"; o dispositivo "a123456" é aplicado à estratégia "demo1"; o dispositivo "1227624460" é aplicado à estratégia padrão.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_devices.png)

#### Editar usuários

Quando você clica no menu `Editar usuários`, uma caixa de diálogo de edição exibindo todos os usuários será aberta. Você pode alterar o status de seleção das caixas de seleção e então clicar no botão `Salvar` para aplicar as alterações de usuários feitas na página atual. Se você precisar modificar usuários em outras páginas, navegue para essas páginas. Você também pode usar o menu suspenso no canto superior direito para filtrar usuários.

Aqui está um exemplo da caixa de diálogo que aparece quando você clica em `Editar usuários` no menu "demo2". Neste exemplo, o usuário "admin" é aplicado à estratégia "default"; o usuário "user1" é aplicado à estratégia "demo2"; o usuário "user2" é aplicado à estratégia "demo3".

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_users.png)

#### Editar grupos de dispositivos

Quando você clica no menu `Editar grupo de dispositivos`, uma caixa de diálogo de edição exibindo todos os grupos de dispositivos será aberta. Você pode alterar o status de seleção das caixas de seleção e então clicar no botão `Salvar` para aplicar as alterações de grupos de dispositivos feitas na página atual. Se você precisar modificar grupos de dispositivos em outras páginas, navegue para essas páginas. Você também pode usar o menu suspenso no canto superior direito para filtrar grupos de dispositivos.

Aqui está um exemplo da caixa de diálogo que aparece quando você clica em `Editar grupo de dispositivos` no menu "demo1". Neste exemplo, o grupo de dispositivos "device_group1" é aplicado à estratégia "demo1"; o grupo de dispositivos "group2" é aplicado à estratégia "demo2"; o grupo de dispositivos "group3" é aplicado à estratégia "default".

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_device_groups.png)

#### Sincronização de estratégias

Cada dispositivo só pode ser gerenciado por uma estratégia, e se essa estratégia for desabilitada, o dispositivo não será gerenciado por nenhuma estratégia. Ao sincronizar estratégias, o RustDesk registra os carimbos de data/hora da estratégia local e do servidor para determinar se a sincronização é necessária. Ou seja, após a sincronização de estratégias estar completa:

* Se o usuário alterar algumas opções, o cliente usará as opções do usuário.
* Se o administrador alterar o conteúdo da estratégia, as opções do cliente serão sincronizadas.
* Se o administrador alterar a estratégia à qual o dispositivo pertence, as opções do cliente serão sincronizadas.

#### Editar estratégias

Na parte inferior da estratégia, clique em `Editar`, faça modificações e clique em `Enviar`. A estratégia será sincronizada com os dispositivos em 30 segundos.