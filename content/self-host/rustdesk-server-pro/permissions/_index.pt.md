---
title: Controle de Acesso
weight: 16
---

### Permissões de acesso ao dispositivo

Existem duas maneiras de associar um dispositivo a um usuário:
- Via página de dispositivos do console
- Fazendo login na conta de usuário especificada no lado do cliente

As duas situações a seguir impedirão o acesso ao dispositivo:
- `Desativar` o dispositivo na página de dispositivos do console
- `Desativar` o usuário na página de usuários do console

O dispositivo associado só pode ser acessado por dispositivos do mesmo usuário ou grupo de usuários, ou em configurações de grupo cruzado corretas.

### Configurações de Acesso do Grupo de Usuários

Vá para a página de grupos no console web e clique em `Editar` para editar as configurações de grupo cruzado conforme abaixo.

Suas modificações em `Acesso com outros grupos` entram em vigor imediatamente, sem necessidade de clicar no botão `OK`.

Tanto `Pode acessar para` quanto `Pode ser acessado de` têm quase a mesma função, oferecemos ambas as opções para sua conveniência. No entanto, isso pode causar alguma confusão.

{{% notice note %}}
O usuário e o grupo atribuídos ao lado controlador são determinados pelo usuário que faz login, e não pelo usuário atribuído do console web. Projetamos dessa forma porque alguns lados controladores não possuem um ID de dispositivo, como o cliente iOS e o cliente web.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/permissions/images/crossgrp.png)

### Configurações de Acesso do Grupo de Dispositivos

Os grupos de dispositivos fornecem outra maneira de gerenciar permissões de acesso. Aqui estão as regras principais:

1. Um dispositivo só pode ser adicionado a um grupo de dispositivos
2. Você pode definir permissões de acesso para usuários ou grupos de usuários aos grupos de dispositivos. Essas permissões são cumulativas com as permissões de acesso do grupo de usuários - ou seja, o acesso é concedido se as permissões do grupo de usuários ou do grupo de dispositivos permitirem
3. Quando um dispositivo não atribuído é adicionado a um grupo de dispositivos, ele não é mais considerado "não atribuído"

{{% notice note %}}
O recurso de grupo de dispositivos requer cliente RustDesk >= 1.3.8 e RustDesk Server Pro >= 1.5.0
{{% /notice %}}
