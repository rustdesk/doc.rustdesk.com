---
title: Control de acceso
weight: 16
---

### Permisos de acceso a dispositivos

El dispositivo puede asignarse a un solo usuario, a un solo grupo de dispositivos, o a ambos.

Cuando el dispositivo se asigna a un usuario, puede ser accedido por ese usuario, un grupo de usuarios, o a través de configuraciones apropiadas entre grupos de usuarios.

Cuando el dispositivo se asigna a un grupo de dispositivos, puede ser accedido a través de configuraciones apropiadas entre usuarios y grupos de dispositivos.

Hay tres formas de asignar un dispositivo a un usuario:
- A través de la página de dispositivos de la consola
- Iniciar sesión en la cuenta de usuario específica en el lado del cliente
- Línea de comandos de asignación

Hay dos formas de asignar un dispositivo a un grupo de dispositivos:
- A través de la página de dispositivos de la consola
- Línea de comandos de asignación

Las siguientes dos situaciones impedirán que el dispositivo sea accedido:
- Hacer que el dispositivo esté `deshabilitado` en la página de dispositivos de la consola
- Hacer que el usuario esté `deshabilitado` en la página de usuarios de la consola

### Configuraciones de acceso a grupos de usuarios

Vaya a la página de grupos en la consola web, haga clic en `Editar` para editar las configuraciones entre grupos como se muestra a continuación.

Sus modificaciones a `Acceso con otros grupos` surten efecto inmediatamente sin requerir que haga clic en el botón `OK`.

Tanto `Puede acceder a` como `Puede ser accedido desde` sirven casi la misma función, proporcionamos ambas opciones para su conveniencia. Sin embargo, esto puede causar cierta confusión.

{{% notice note %}}
El usuario y grupo asignados al lado de control están determinados por el usuario que inicia sesión, en lugar del usuario asignado desde la consola web. Lo diseñamos así porque ciertos lados de control no tienen un ID de dispositivo, como el cliente iOS y el cliente web.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/permissions/images/crossgrp.png)

### Configuraciones de acceso a grupos de dispositivos

Los grupos de dispositivos proporcionan otra forma de gestionar permisos de acceso. Estas son las reglas clave:

1. Un dispositivo solo puede agregarse a un grupo de dispositivos
2. Puede establecer permisos de acceso para usuarios o grupos de usuarios a grupos de dispositivos. Estos permisos son acumulativos con los permisos de acceso a grupos de usuarios - lo que significa que se otorga acceso si los permisos del grupo de usuarios o los permisos del grupo de dispositivos lo permiten
3. Cuando un dispositivo no asignado se agrega a un grupo de dispositivos, ya no se considera "no asignado"

{{% notice note %}}
La función de grupo de dispositivos requiere RustDesk cliente >= 1.3.8 y RustDesk Server Pro >= 1.5.0
{{% /notice %}}