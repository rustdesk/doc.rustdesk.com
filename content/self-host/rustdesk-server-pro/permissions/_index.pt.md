---
title: Controle de acesso
weight: 16
---

## Permissões de acesso a dispositivos

O dispositivo pode ser atribuído a um único usuário, a um único grupo de dispositivos, ou a ambos.

Quando o dispositivo é atribuído a um usuário, ele pode ser acessado por esse usuário, um grupo de usuários, ou através de configurações apropriadas entre grupos de usuários.

Quando o dispositivo é atribuído a um grupo de dispositivos, ele pode ser acessado através de configurações apropriadas entre usuários e grupos de dispositivos.

Existem três maneiras de atribuir um dispositivo a um usuário:
- Através da página de dispositivos do console
- Fazer login na conta de usuário especificada no lado do cliente
- Linha de comando de atribuição

Existem duas maneiras de atribuir um dispositivo a um grupo de dispositivos:
- Através da página de dispositivos do console
- Linha de comando de atribuição

As duas situações a seguir impedirão que o dispositivo seja acessado:
- Tornar o dispositivo `desabilitado` na página de dispositivos do console
- Tornar o usuário `desabilitado` na página de usuários do console

## Configurações de acesso a grupos de usuários

Vá para a página de grupos no console web, clique em `Editar` para editar as configurações entre grupos conforme mostrado abaixo.

Suas modificações em `Acesso com outros grupos` fazem efeito imediatamente sem exigir que você clique no botão `OK`.

Tanto `Pode acessar` quanto `Pode ser acessado de` servem quase a mesma função, fornecemos ambas as opções para sua conveniência. No entanto, isso pode causar alguma confusão.

{{% notice note %}}
O usuário e grupo atribuídos ao lado de controle são determinados pelo usuário que faz login, em vez do usuário atribuído pelo console web. Projetamos dessa forma porque certos lados de controle não têm um ID de dispositivo, como o cliente iOS e o cliente web.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/permissions/images/crossgrp.png)

## Configurações de acesso a grupos de dispositivos

Os grupos de dispositivos fornecem outra maneira de gerenciar permissões de acesso. Aqui estão as regras principais:

1. Um dispositivo só pode ser adicionado a um grupo de dispositivos
2. Você pode definir permissões de acesso para usuários ou grupos de usuários para grupos de dispositivos. Essas permissões são cumulativas com as permissões de acesso a grupos de usuários - o que significa que o acesso é concedido se as permissões do grupo de usuários ou as permissões do grupo de dispositivos permitirem
3. Quando um dispositivo não atribuído é adicionado a um grupo de dispositivos, ele não é mais considerado "não atribuído"

{{% notice note %}}
O recurso de grupo de dispositivos requer RustDesk cliente >= 1.3.8 e RustDesk Server Pro >= 1.5.0
{{% /notice %}}