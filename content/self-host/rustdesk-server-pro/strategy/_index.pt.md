---
title: Estratégia
weight: 200
---


### Estratégia
A estratégia é uma ferramenta para administradores RustDesk atualizarem em massa as opções de segurança das páginas de configurações do cliente. Os administradores podem criar diferentes estratégias e aplicá-las a diferentes dispositivos.

### Criar Estratégias

Você pode criar uma nova estratégia clicando no botão `+` e realizar várias ações na estratégia passando o mouse sobre ela e clicando no menu.

No menu pop-up, você pode escolher `Ativar` ou `Desativar` a estratégia, `Renomear`, `Duplicar` ou `Excluir` ela. Além disso, você pode clicar em `Editar Dispositivos` para modificar os dispositivos aplicados àquela estratégia ou clicar em `Editar Usuários` para modificar os usuários aplicados àquela estratégia.

Do lado direito do menu de estratégia, você pode ver o número de dispositivos realmente aplicados à estratégia, levando em consideração a prioridade da estratégia.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/strategy_menu.png)

#### Estratégia de Dispositivo e Estratégia de Usuário

Cada dispositivo só pode ser gerenciado por uma estratégia, e as estratégias de dispositivo têm prioridade sobre as estratégias de usuário. As estratégias de usuário são responsáveis por gerenciar todos os dispositivos sob o usuário que não estão atribuídos a uma estratégia específica.

#### Editar Dispositivos

Quando você clica no menu `Editar Dispositivos`, uma caixa de diálogo de edição exibindo todos os dispositivos será aberta. Você pode alterar o status de seleção das caixas de seleção e, em seguida, clicar no botão `Salvar` para aplicar as alterações do dispositivo feitas na página atual. Se você precisar modificar dispositivos em outras páginas, navegue até essas páginas. Você também pode usar o menu suspenso no canto superior direito para filtrar dispositivos.

Aqui está um exemplo da caixa de diálogo que aparece quando você clica em `Editar Dispositivos` no menu "demo2". Neste exemplo, o dispositivo "362587269" é aplicado à estratégia "demo2". O dispositivo "157333666" foi originalmente aplicado à estratégia padrão, mas será aplicado à estratégia "demo2" após clicar em `Salvar`. O dispositivo "232026634" tem uma estratégia de dispositivo para "demo1" e uma estratégia de usuário para "demo2", uma vez que a estratégia de dispositivo tem prioridade, este dispositivo será aplicado à estratégia "demo1".

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_devices.png)

#### Editar Usuários

Quando você clica no menu `Editar Usuários`, uma caixa de diálogo de edição exibindo todos os usuários será aberta. Você pode alterar o status de seleção das caixas de seleção e, em seguida, clicar no botão `Salvar` para aplicar as alterações do usuário feitas na página atual. Se você precisar modificar usuários em outras páginas, navegue até essas páginas. Você também pode usar o menu suspenso no canto superior direito para filtrar usuários.

Aqui está um exemplo da caixa de diálogo que aparece quando você clica em `Editar Usuários` no menu "demo2". Neste exemplo, o usuário "user2" foi originalmente aplicado à estratégia padrão e será aplicado à estratégia "demo2" após clicar em `Salvar`. O usuário "user1" é aplicado à estratégia padrão e o usuário "admin" é aplicado à estratégia "demo2".

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_users.png)

#### Sincronização de Estratégia

Cada dispositivo só pode ser gerenciado por uma estratégia, e se essa estratégia estiver desativada, o dispositivo não será gerenciado por nenhuma estratégia. Ao sincronizar estratégias, o RustDesk registra os timestamps da estratégia local e do servidor para determinar se é necessária sincronização. Ou seja, após a sincronização da estratégia ser concluída:

* Se o usuário alterar algumas opções, o cliente usará as opções do usuário.
* Se o administrador alterar o conteúdo da estratégia, as opções do cliente serão sincronizadas.
* Se o administrador alterar a estratégia à qual o dispositivo pertence, as opções do cliente serão sincronizadas.
  
#### Editar Estratégias

Na parte inferior da estratégia, clique em `Editar`, faça as modificações e clique em `Enviar`. A estratégia será sincronizada com os dispositivos dentro de 30 segundos.
