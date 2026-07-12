---
title: Registros de auditoría
weight: 19
description: "Use los registros de auditoría en la consola web de RustDesk Server Pro para revisar eventos de conexión, transferencia de archivos, operaciones de consola y alarmas."
keywords: ["rustdesk audit logs", "rustdesk server pro logs", "rustdesk connection logs", "rustdesk file transfer logs", "rustdesk alarm logs", "rustdesk console audit"]
---

Los registros de auditoría en la consola web de RustDesk Server Pro ayudan a los administradores a revisar actividad de acceso remoto, transferencias de archivos, cambios administrativos y alarmas de seguridad.

Abra la consola web y vaya a **Registros** en el menú izquierdo. La sección Registros incluye:

- **Conexión**
- **Archivo**
- **Consola**
- **Alarma**

## Registros de conexión

Vaya a **Registros > Conexión** para revisar sesiones remotas y tipos de conexión relacionados.

Los registros de conexión muestran:

- **Tipo**: Escritorio remoto, Transferencia de archivos, Reenvío de puertos, Ver cámara, Terminal o No conectado. **No conectado** significa que la conexión no se completó o la autenticación no tuvo éxito.
- **Dispositivo controlado**: El ID y nombre del dispositivo de destino.
- **Lado controlador**: El usuario controlador cuando el lado controlador ha iniciado sesión, además del dispositivo controlador, nombre del dispositivo y dirección IP.
- **Hora de inicio**, **Hora de fin** y **Duración**.
- **Autenticación**: Método de autenticación principal, opcionalmente seguido por información de 2FA.
- **Nota**.

![Página de registros de conexión](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/connection-log-page.png)

Los valores de autenticación principal admitidos incluyen:

- Confirmación por clic
- Contraseña de un solo uso
- Contraseña permanente
- Cambiar lados

Los valores de 2FA admitidos incluyen:

- Código 2FA
- Dispositivo de confianza

### Notas de conexión

El lado controlador puede añadir una nota a una conexión de dos formas:

- Durante una sesión remota, use la acción **Nota** en el menú remoto para añadir o actualizar la nota de conexión.

![Cuadro de nota de conexión](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/note-box.png)

- Al final de una sesión remota, active **Configuración > General > Otros > Pedir nota al final de la conexión** en el lado controlador si quiere que RustDesk solicite una nota cuando termine la sesión.

![Cuadro de nota al cerrar conexión](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/close-conn-note-box.png)

La nota se muestra en la columna **Nota** en **Registros > Conexión**. Los usuarios que pueden ver el registro de conexión también pueden usar el botón de edición en la columna **Nota** para actualizar la nota desde la consola web.

### Desconectar una conexión en curso

Si una conexión sigue activa y su cuenta tiene permiso para editar ese elemento de auditoría, la columna **Acción** muestra **Desconectar**. Haga clic y confirme la operación para terminar la conexión en curso.

![Confirmación de desconexión](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/disconnect-confirm.png)

Después de desconectar la conexión desde la consola web, el lado controlador ve un mensaje indicando que la conexión fue desconectada desde la consola web.

![Mensaje desconectado por consola](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/disconnected-by-console.png)

## Registros de transferencia de archivos

Vaya a **Registros > Archivo** para revisar actividad de transferencia de archivos.

![Página de registros de transferencia de archivos](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/file-transfer-logs.png)

Los registros de transferencia de archivos incluyen operaciones de archivos de sesiones dedicadas de **Transferencia de archivos** y copiado/pegado de archivos durante sesiones de **Escritorio remoto**.

Los registros de transferencia de archivos muestran:

- **Dispositivo controlado**.
- **Lado controlador**: El dispositivo controlador y el usuario controlador cuando está disponible.
- **Hora**.
- **Dirección**:
  - Dispositivo controlado -> Lado controlador
  - Lado controlador -> Dispositivo controlado
- **Archivo**: La ruta en el dispositivo controlado.
- **Detalle**: Tamaño de archivo para un solo archivo o cantidad de archivos para transferencias de varios archivos.

Para transferencias de varios archivos, haga clic en la cantidad de archivos en la columna **Detalle** para abrir el panel de detalles. Cuando la transferencia contiene más archivos de los que muestra el panel, se muestran los 10 archivos más grandes por tamaño.

![Detalles de transferencia de archivos](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/file-transfer-details.png)

## Registros de alarma

Vaya a **Registros > Alarma** para revisar eventos relacionados con seguridad.

![Página de registros de alarma](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/alarm-logs.png)

Los registros de alarma muestran:

- **Tipo**.
- **Desde**: Para alarmas de cuenta de inicio de sesión, es el dispositivo de inicio de sesión. Para alarmas de conexión remota, es el lado controlador.
- **Destino**: Para alarmas de cuenta de inicio de sesión, es la cuenta de inicio de sesión. Para alarmas de conexión remota, es el dispositivo controlado.
- **Hora del evento**.

Los tipos de alarma de conexión remota incluyen:

- Intento de acceso desde una IP fuera de la lista blanca
- Más de 30 intentos de acceso consecutivos
- Múltiples intentos de acceso en un minuto
- Demasiados intentos de acceso consecutivos desde un solo prefijo IPv6
- Múltiples intentos fallidos de inicio de sesión en Terminal (Ejecutar como administrador) (usuario/contraseña incorrectos)
- Múltiples intentos simultáneos de inicio de sesión en Terminal (Ejecutar como administrador)
- Violación del alcance de la sesión

Los tipos de alarma de cuenta de inicio de sesión incluyen:

- Más de 30 intentos de inicio de sesión consecutivos
- Múltiples intentos de inicio de sesión en un minuto
- Múltiples intentos de inicio de sesión en una hora

## Registros de operaciones de consola

Vaya a **Registros > Consola** para revisar acciones realizadas en la consola web.

![Página de registros de operaciones de consola](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/console-logs.png)

Los registros de consola muestran:

- **Tipo**.
- **Usuario**: El usuario de la consola web que realizó la operación.
- **Operación**: La acción específica.
- **Hora**.
- **Detalle**: Campos adicionales registrados para la operación.

Los tipos incluyen:

- Gestión de grupos
- Gestión de usuarios
- Gestión de dispositivos
- Gestión de libretas de direcciones
- Gestión de roles de admin
- Gestión de roles de control

Las operaciones registradas incluyen inicio de sesión de usuario, cambios de usuarios y dispositivos, desconectar un dispositivo, cambios de libreta de direcciones, cambios de 2FA, restablecimiento de contraseña, cambios de roles de admin/control, etc.

## Visibilidad y retención de registros

La visibilidad de los registros depende de si el usuario es administrador, de si tiene un [Rol de admin](/docs/es/self-host/rustdesk-server-pro/admin-role/) con permisos de registros de auditoría y de la configuración en **Configuración > Otros**.

| Tipo de usuario o configuración | Visibilidad de registros |
| --- | --- |
| Administrador | Puede ver todos los registros de auditoría. |
| Rol de admin con **Global > Audit Logs-View** | Puede ver todos los registros de auditoría, incluso cuando **Solo el administrador puede acceder a registros** está habilitado. |
| Rol de admin con **Individual > Audit Logs-View** | Puede ver registros de auditoría personales, incluso cuando **Solo el administrador puede acceder a registros** está habilitado. Esto concede el mismo alcance de registros personales que un usuario normal no administrador, pero no queda bloqueado por esa configuración. |
| Usuario no administrador sin permisos de registros de auditoría | Puede ver registros de auditoría personales solo cuando **Solo el administrador puede acceder a registros** está deshabilitado. |
| **Configuración > Otros > Solo el administrador puede acceder a registros** habilitado | Los usuarios no administradores sin permisos de registros de auditoría no pueden acceder a los registros de auditoría. |

Los registros personales incluyen registros de conexión y transferencia de archivos donde un dispositivo actualmente asignado al usuario es el dispositivo controlado o controlador, y registros donde el usuario es el controlador. Para registros de alarma, los registros personales incluyen registros de dispositivos asignados al usuario o de la cuenta de inicio de sesión del usuario. Para registros de operaciones de consola, los registros personales incluyen registros donde el usuario es el operador.

Use **Configuración > Otros > Retención de registros (días)** para controlar cuánto tiempo se conservan los registros de auditoría. Introduzca `0` para conservar todos los registros indefinidamente. Introduzca un número mayor que `0` para eliminar automáticamente registros más antiguos que el número de días especificado. La limpieza se ejecuta una vez por hora.

## Exportar registros de auditoría

Cada página de registros tiene **Exportar como CSV** en la barra de herramientas. El archivo exportado sigue los filtros actuales de la página y usa los mismos valores de hora mostrados en la consola web. Cada exportación incluye hasta 1000 registros, pero puede usar el filtro **Hora de inicio** para exportar todos los registros por lotes.
