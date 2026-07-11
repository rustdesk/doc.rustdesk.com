---
title: Directorio
weight: 201
description: "Usa el Directorio en RustDesk Server Pro para guardar dispositivos remotos, compartir listas de dispositivos, organizar dispositivos con etiquetas y conectarte desde el cliente RustDesk con contraseñas compartidas."
keywords: ["rustdesk address book", "rustdesk server pro address book", "rustdesk shared address book", "rustdesk device tags", "rustdesk shared password"]
---

El Directorio permite a los usuarios guardar IDs de dispositivos RustDesk, organizarlos con etiquetas, compartir listas de dispositivos y conectarse desde el cliente RustDesk con contraseñas guardadas.

## Respuestas rápidas

- **Mi directorio** es privado para el usuario que ha iniciado sesión. Las contraseñas introducidas manualmente y recordadas se guardan en **Mi directorio** y pueden sincronizarse entre los dispositivos del usuario.
- Los directorios **compartidos** pueden compartirse con usuarios específicos, grupos de usuarios o todos los usuarios.
- Un directorio compartido puede almacenar una contraseña a nivel de directorio, y cada entrada de dispositivo puede almacenar una contraseña a nivel de dispositivo. Cuando no se establece una contraseña a nivel de dispositivo, se usa la contraseña a nivel de directorio.
- Las etiquetas pueden usarse para filtrar dispositivos en la consola web y en el cliente RustDesk.

## Conexión con un clic usando un directorio compartido

Usa un directorio compartido cuando los usuarios necesiten conectarse sin introducir manualmente la contraseña remota cada vez.

1. Crea o abre un directorio compartido. Opcionalmente, establece una **contraseña a nivel de directorio** en el directorio.

2. Haz clic en el nombre del directorio para abrir la página de dispositivos. Haz clic en **Importar**, selecciona los dispositivos que quieres importar al directorio y haz clic en **Guardar** en la parte inferior para guardar los dispositivos seleccionados. O haz clic en **Agregar** para agregar un dispositivo por ID, usando una dirección IP como ID para acceso IP directo. Opcionalmente, establece una **contraseña a nivel de dispositivo** en entradas de dispositivo individuales.

3. Comparte el directorio con usuarios específicos, grupos de usuarios o todos los usuarios.

4. El usuario inicia sesión en el cliente RustDesk y abre la pestaña **Directorio**.

5. El usuario selecciona el directorio compartido y hace clic en la tarjeta del dispositivo.

![Hacer clic en una tarjeta de dispositivo de un directorio compartido en el cliente](/docs/en/self-host/rustdesk-server-pro/address-book/images/click-peer-card.png)

{{% notice warning %}}
La contraseña compartida solo se usa al conectarse desde el directorio compartido correspondiente, ya sea haciendo clic en la tarjeta del dispositivo o usando su menú desplegable. No se usa desde otra pestaña de dispositivo, desde el botón **Conectar** junto al campo de entrada de ID ni desde otro directorio compartido.
{{% /notice %}}

## Permisos del directorio compartido

| Permiso | Qué pueden hacer los usuarios |
| --- | --- |
| **Solo lectura** | Pueden ver dispositivos y etiquetas, y pueden usar la contraseña. |
| **Lectura/Escritura** | Pueden editar dispositivos y etiquetas. |
| **Control total** | Pueden volver a compartir, eliminar o cambiar el nombre del directorio. |

Cuando varias reglas coinciden con el mismo usuario, la prioridad es:

1. Usuario
2. Grupo
3. Todos

Por ejemplo, si **Todos** tiene Solo lectura pero un usuario específico tiene Control total, ese usuario obtiene permiso de Control total.

![Permisos para compartir el directorio](/docs/en/self-host/rustdesk-server-pro/address-book/images/share-list.png)

![Permiso de directorio compartido en la consola web](/docs/en/self-host/rustdesk-server-pro/address-book/images/user1-permission.png)

## Consola web

### Crear o editar un directorio compartido

En **Directorio > Compartido**, crea un directorio compartido con un nombre, una nota opcional y una **Contraseña compartida predeterminada** opcional. Esta es la contraseña a nivel de directorio.

![Crear directorio compartido con contraseña compartida predeterminada](/docs/en/self-host/rustdesk-server-pro/address-book/images/create-shared-address-book.png)

### Agregar dispositivos y contraseñas

Los dispositivos pueden agregarse manualmente por ID o importarse desde la lista de dispositivos de Server Pro. Para cada entrada puedes establecer un alias, etiquetas, una nota y, en los directorios compartidos, una contraseña a nivel de dispositivo.

![Agregar dispositivo a un directorio compartido](/docs/en/self-host/rustdesk-server-pro/address-book/images/import-device.png)

![Dispositivos](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-addressbook-devices.png)

![Editar dispositivo en un directorio compartido](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-edit-device.png)

### Etiquetas y filtrado

Las etiquetas organizan y filtran dispositivos. `Sin etiqueta` filtra los dispositivos sin etiquetas. Con **Filtrar por intersección** activado, solo se muestran los dispositivos que coinciden con todas las etiquetas seleccionadas.

### Papelera de reciclaje

Eliminar un dispositivo de un directorio mueve la entrada a la papelera de reciclaje de ese directorio. No elimina el dispositivo de RustDesk Server Pro.

## Comportamiento de la contraseña compartida

| Nivel de contraseña | Prioridad |
| --- | --- |
| Contraseña a nivel de dispositivo | Se usa primero cuando la entrada del dispositivo tiene una contraseña. |
| Contraseña a nivel de directorio | Se usa cuando la entrada del dispositivo no tiene contraseña. |

Si no se establece ninguna de las dos contraseñas, el usuario se conecta normalmente y puede necesitar introducir la contraseña manualmente. En la consola web, las columnas de contraseña solo muestran si hay una contraseña establecida.

## Cliente RustDesk

Después de iniciar sesión, usa el selector de directorio para cambiar entre **Mi directorio** y los directorios compartidos. Para los directorios compartidos, el cliente muestra el permiso del usuario actual.

![Selector de directorio del cliente RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-selector.png)

![Directorio de solo lectura](/docs/en/self-host/rustdesk-server-pro/address-book/images/read-only-address-book.png)

### Editar desde el cliente

Los usuarios con permiso de escritura pueden agregar IDs, agregar etiquetas, editar alias, editar etiquetas, editar notas, establecer contraseñas compartidas o quitar entradas.

![Menú de dispositivo del directorio 1 en el cliente RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu1.png)

![Agregar ID en el cliente RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-add-id.png)

![Menú de dispositivo del directorio 2 en el cliente RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu2.png)

![Cambiar contraseña en el cliente RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-change-password.png)

## Preajustes de despliegue

La configuración del cliente RustDesk puede predefinir la asignación del directorio:

- `preset-address-book-name`
- `preset-address-book-tag`
- `preset-address-book-alias`
- `preset-address-book-password`
- `preset-address-book-note`

`preset-address-book-alias`, `preset-address-book-password` y `preset-address-book-note` requieren el cliente RustDesk 1.4.3 o posterior y RustDesk Server Pro 1.6.6 o posterior.

Para más detalles, consulta la [configuración avanzada del cliente](/docs/en/self-host/client-configuration/advanced-settings/#preset-address-book-name--preset-address-book-tag--preset-address-book-alias--preset-address-book-password--preset-address-book-note).

## Ajustes relacionados

| Ajuste | Dónde | Efecto |
| --- | --- | --- |
| **Permitir que los no administradores compartan directorios con otros grupos** | **Ajustes > Otros** | Permite que los usuarios no administradores compartan directorios con otros grupos de usuarios. |
| **Deshabilitar directorio** | **Cliente personalizado** | Oculta o deshabilita el directorio en el cliente personalizado generado. |

## Solución de problemas

### Contraseña incorrecta

La contraseña guardada en un directorio compartido la usa el cliente RustDesk controlador. No se establece en el dispositivo controlado. Establece la contraseña del dispositivo controlado en ese dispositivo desde **Ajustes > Seguridad > Contraseña**.

Para usar la contraseña compartida, conéctate desde el directorio compartido correspondiente haciendo clic en la tarjeta del dispositivo. Conectarse desde otro directorio, otra pestaña de dispositivo o el botón **Conectar** junto al campo de entrada de ID no usa la contraseña compartida de este directorio.
