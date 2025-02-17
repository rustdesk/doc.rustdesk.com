---
title: Estratégia
weight: 200
---

## Estratégia

Estratégia é uma ferramenta para administradores do RustDesk atualizarem em massa as opções de segurança das páginas de configurações do cliente. Os administradores podem criar diferentes estratégias e aplicá-las a diferentes dispositivos.

### Criar Estratégias

Você pode criar uma nova estratégia clicando no botão `+` e realizar várias ações na estratégia passando o mouse sobre ela e clicando no menu.

No menu pop-up, você pode escolher `Ativar` ou `Desativar` a estratégia, `Renomear`, `Duplicar` ou `Excluir`. Além disso, você pode clicar em `Editar Dispositivos` para modificar os dispositivos aplicados a essa estratégia ou clicar em `Editar Usuários` para modificar os usuários aplicados a essa estratégia.

No lado direito do menu de estratégia, você pode ver o número de dispositivos realmente aplicados à estratégia, levando em conta a prioridade da estratégia.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/strategy_menu.png)

## Estratégia de Dispositivo, Usuário e Grupo de Dispositivos

As estratégias são aplicadas de acordo com a seguinte ordem de prioridade:
1. Estratégia de Dispositivo (Prioridade mais alta)
2. Estratégia de Usuário
3. Estratégia de Grupo de Dispositivos (Prioridade mais baixa)

Cada dispositivo só pode ser gerenciado por uma estratégia por vez. O sistema de prioridade funciona da seguinte forma:
- Estratégias de dispositivo têm prioridade sobre estratégias de usuário e de grupo de dispositivos
- Estratégias de usuário têm prioridade sobre estratégias de grupo de dispositivos
- Estratégias de grupo de dispositivos se aplicam a todos os dispositivos no grupo que não têm estratégia de dispositivo ou usuário atribuída

### Editar Dispositivos

Quando você clica no menu `Editar Dispositivos`, uma caixa de diálogo de edição exibindo todos os dispositivos será aberta. Você pode alterar o status de seleção das caixas de seleção e então clicar no botão `Salvar` para aplicar as alterações de dispositivo feitas na página atual. Se você precisar modificar dispositivos em outras páginas, navegue até essas páginas. Você também pode usar o menu suspenso no canto superior direito para filtrar dispositivos.

Formato da coluna de estratégia: estratégia de dispositivo/estratégia de usuário/estratégia de grupo de dispositivos, ou "-" para a estratégia padrão.

Aqui está um exemplo da caixa de diálogo que aparece quando você clica em `Editar Dispositivos` no menu "demo1". Neste exemplo, o dispositivo "1981241962" está aplicado à estratégia "demo3"; O dispositivo "1279471875" está aplicado à estratégia "demo2"; O dispositivo "a123456" está aplicado à estratégia "demo1"; O dispositivo "1227624460" está aplicado à estratégia padrão.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_devices.png)

### Editar Usuários

Quando você clica no menu `Editar Usuários`, uma caixa de diálogo de edição exibindo todos os usuários será aberta. Você pode alterar o status de seleção das caixas de seleção e então clicar no botão `Salvar` para aplicar as alterações de usuário feitas na página atual. Se você precisar modificar usuários em outras páginas, navegue até essas páginas. Você também pode usar o menu suspenso no canto superior direito para filtrar usuários.

Aqui está um exemplo da caixa de diálogo que aparece quando você clica em `Editar Usuários` no menu "demo2". Neste exemplo, o usuário "admin" está aplicado à estratégia "default"; O usuário "user1" está aplicado à estratégia "demo2"; O usuário "user2" está aplicado à estratégia "demo3".

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_users.png)

### Editar Grupos de Dispositivos

Quando você clica no menu `Editar Grupo de Dispositivos`, uma caixa de diálogo de edição exibindo todos os grupos de dispositivos será aberta. Você pode alterar o status de seleção das caixas de seleção e então clicar no botão `Salvar` para aplicar as alterações de grupo de dispositivos feitas na página atual. Se você precisar modificar grupos de dispositivos em outras páginas, navegue até essas páginas. Você também pode usar o menu suspenso no canto superior direito para filtrar grupos de dispositivos.

Aqui está um exemplo da caixa de diálogo que aparece quando você clica em `Editar Grupo de Dispositivos` no menu "demo1". Neste exemplo, o grupo de dispositivos "device_group1" está aplicado à estratégia "demo1"; O grupo de dispositivos "group2" está aplicado à estratégia "demo2"; O grupo de dispositivos "group3" está aplicado à estratégia "default".

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_device_groups.png)

### Sincronização de Estratégia

Cada dispositivo só pode ser gerenciado por uma estratégia, e se essa estratégia estiver desativada, o dispositivo não será gerenciado por nenhuma estratégia. Ao sincronizar estratégias, o RustDesk registra os timestamps da estratégia local e do servidor para determinar se a sincronização é necessária. Ou seja, após a sincronização da estratégia estar completa:

* Se o usuário alterar algumas opções, o cliente usará as opções do usuário.
* Se o administrador alterar o conteúdo da estratégia, as opções do cliente serão sincronizadas.
* Se o administrador alterar a estratégia à qual o dispositivo pertence, as opções do cliente serão sincronizadas.

### Editar Estratégias

Na parte inferior da estratégia, clique em `Editar`, faça as modificações e clique em `Enviar`. A estratégia será sincronizada com os dispositivos dentro de 30 segundos.
