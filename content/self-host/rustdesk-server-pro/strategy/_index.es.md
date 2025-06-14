---
title: Estrategia
weight: 200
---

### Estrategia

La estrategia es una herramienta para que los administradores de RustDesk actualicen en lote las opciones de seguridad de las páginas de configuración del cliente. Los administradores pueden crear diferentes estrategias y aplicarlas a diferentes dispositivos.

#### Crear estrategias

Puede crear una nueva estrategia haciendo clic en el botón `+` y realizar varias acciones en la estrategia pasando el cursor por encima y haciendo clic en el menú.

En el menú emergente, puede elegir `Habilitar` o `Deshabilitar` la estrategia, `Renombrar`, `Duplicar` o `Eliminar` la misma. Además, puede hacer clic en `Editar dispositivos` para modificar los dispositivos aplicados a esa estrategia o hacer clic en `Editar usuarios` para modificar los usuarios aplicados a esa estrategia.

En el lado derecho del menú de estrategia, puede ver el número de dispositivos realmente aplicados a la estrategia, teniendo en cuenta la prioridad de la estrategia.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/strategy_menu.png)

#### Estrategia de dispositivo, estrategia de usuario y estrategia de grupo de dispositivos

Las estrategias se aplican según el siguiente orden de prioridad:
1. Estrategia de dispositivo (Prioridad más alta)
2. Estrategia de usuario
3. Estrategia de grupo de dispositivos (Prioridad más baja)

Cada dispositivo solo puede ser gestionado por una estrategia a la vez. El sistema de prioridad funciona de la siguiente manera:
- Las estrategias de dispositivo tienen prioridad sobre las estrategias de usuario y las estrategias de grupo de dispositivos
- Las estrategias de usuario tienen prioridad sobre las estrategias de grupo de dispositivos
- Las estrategias de grupo de dispositivos se aplican a todos los dispositivos en el grupo de dispositivos que no tienen una estrategia de dispositivo o estrategia de usuario asignada

#### Editar dispositivos

Cuando hace clic en el menú `Editar dispositivos`, se abre un cuadro de diálogo de edición que muestra todos los dispositivos. Puede cambiar el estado de selección de las casillas de verificación y luego hacer clic en el botón `Guardar` para aplicar los cambios de dispositivos realizados en la página actual. Si necesita modificar dispositivos en otras páginas, navegue a esas páginas. También puede usar el menú desplegable en la esquina superior derecha para filtrar dispositivos.

Formato de columna de estrategia: estrategia de dispositivo/estrategia de usuario/estrategia de grupo de dispositivos, o "-" para la estrategia predeterminada.

Aquí hay un ejemplo del cuadro de diálogo que aparece cuando hace clic en `Editar dispositivos` en el menú "demo1". En este ejemplo, el dispositivo "1981241962" se aplica a la estrategia "demo3"; el dispositivo "1279471875" se aplica a la estrategia "demo2"; el dispositivo "a123456" se aplica a la estrategia "demo1"; el dispositivo "1227624460" se aplica a la estrategia predeterminada.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_devices.png)

#### Editar usuarios

Cuando hace clic en el menú `Editar usuarios`, se abre un cuadro de diálogo de edición que muestra todos los usuarios. Puede cambiar el estado de selección de las casillas de verificación y luego hacer clic en el botón `Guardar` para aplicar los cambios de usuarios realizados en la página actual. Si necesita modificar usuarios en otras páginas, navegue a esas páginas. También puede usar el menú desplegable en la esquina superior derecha para filtrar usuarios.

Aquí hay un ejemplo del cuadro de diálogo que aparece cuando hace clic en `Editar usuarios` en el menú "demo2". En este ejemplo, el usuario "admin" se aplica a la estrategia "default"; el usuario "user1" se aplica a la estrategia "demo2"; el usuario "user2" se aplica a la estrategia "demo3".

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_users.png)

#### Editar grupos de dispositivos

Cuando hace clic en el menú `Editar grupo de dispositivos`, se abre un cuadro de diálogo de edición que muestra todos los grupos de dispositivos. Puede cambiar el estado de selección de las casillas de verificación y luego hacer clic en el botón `Guardar` para aplicar los cambios de grupos de dispositivos realizados en la página actual. Si necesita modificar grupos de dispositivos en otras páginas, navegue a esas páginas. También puede usar el menú desplegable en la esquina superior derecha para filtrar grupos de dispositivos.

Aquí hay un ejemplo del cuadro de diálogo que aparece cuando hace clic en `Editar grupo de dispositivos` en el menú "demo1". En este ejemplo, el grupo de dispositivos "device_group1" se aplica a la estrategia "demo1"; el grupo de dispositivos "group2" se aplica a la estrategia "demo2"; el grupo de dispositivos "group3" se aplica a la estrategia "default".

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_device_groups.png)

#### Sincronización de estrategias

Cada dispositivo solo puede ser gestionado por una estrategia, y si esa estrategia está deshabilitada, el dispositivo no será gestionado por ninguna estrategia. Al sincronizar estrategias, RustDesk registra las marcas de tiempo de estrategia local y del servidor para determinar si es necesaria la sincronización. Es decir, después de que se complete la sincronización de estrategias:

* Si el usuario cambia algunas opciones, el cliente usará las opciones del usuario.
* Si el administrador cambia el contenido de la estrategia, las opciones del cliente se sincronizarán.
* Si el administrador cambia la estrategia a la que pertenece el dispositivo, las opciones del cliente se sincronizarán.

#### Editar estrategias

En la parte inferior de la estrategia, haga clic en `Editar`, realice modificaciones y haga clic en `Enviar`. La estrategia se sincronizará con los dispositivos en 30 segundos.