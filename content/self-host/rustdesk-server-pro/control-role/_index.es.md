---
title: Rol de Control
weight: 18
---

El Rol de Control le permite configurar permisos de control remoto para diferentes usuarios. Cuando un usuario controla remotamente otro dispositivo, el Rol de Control define qué operaciones puede realizar el usuario controlador después de establecer una conexión.

{{% notice note %}}
**Rol de Control vs Control de Acceso vs Estrategia**

- **Rol de Control**: Determina qué operaciones puede realizar el usuario controlador después de establecer una conexión.
- **Control de Acceso**: Determina si se puede establecer una conexión entre los dispositivos controlador y controlado.
- **Estrategia**: Modifica la configuración en el dispositivo controlado.
{{% /notice %}}

## Requisitos

- Dispositivo controlado: RustDesk **1.4.5** o superior (los dispositivos Android controlados aún no son compatibles)
- Dispositivo controlador: Sin requisitos de versión

## Cálculo de Permisos

### Cómo Funcionan los Permisos

En resumen: Los permisos de control tienen prioridad sobre la configuración local.

Hay dos fuentes de configuración de permisos:

- **Configuración local en el lado controlado**: La configuración del dispositivo controlado (Configuración → Seguridad → Permisos)
- **Permiso de Control**: Los permisos del Rol de Control del usuario controlador (configurados en la consola web)

Cada permiso tiene tres estados:

- **Usar Configuración del Cliente**: Sin anulación, usar la configuración local del dispositivo controlado
- **Habilitar**: Habilitar explícitamente este permiso (anula la configuración local)
- **Deshabilitar**: Deshabilitar explícitamente este permiso (anula la configuración local)

Los permisos se calculan a nivel de sesión:

| Permiso de Control | Configuración Local | Resultado |
|---|---|---|
| Habilitar | Habilitar | Habilitar |
| Habilitar | Deshabilitar | **Habilitar** |
| Deshabilitar | Habilitar | **Deshabilitar** |
| Deshabilitar | Deshabilitar | Deshabilitar |
| Usar Configuración del Cliente | Habilitar | Habilitar |
| Usar Configuración del Cliente | Deshabilitar | Deshabilitar |

**Caso especial: Modificación de Configuración Remota**

Cuando múltiples usuarios controladores están conectados al mismo dispositivo, el permiso "Modificación de Configuración Remota" se calcula en todas las conexiones:

| Permiso de Control de Todas las Conexiones | Resultado |
|---|---|
| Cualquiera Deshabilitar | **Deshabilitar** |
| Ninguno Deshabilitar, Cualquiera Habilitar | **Habilitar** |
| Todos Usar Configuración del Cliente | Usar configuración local |

### Qué Rol se Aplica

Cada usuario solo puede tener un Rol de Control asignado. Hay dos roles integrados:

| Rol | Descripción |
|------|-------------|
| **No Conectado** | Para usuarios controladores que no han iniciado sesión. No se puede asignar a usuarios. |
| **Predeterminado** | Para usuarios controladores conectados que no tienen Rol de Control asignado, o están explícitamente asignados al rol Predeterminado. |

El Rol de Control aplicado depende del estado de inicio de sesión del usuario controlador y la asignación de rol:

| Estado del Usuario Controlador | Rol Asignado | Rol / Estado del Rol | Rol de Control Aplicado |
|---|---|---|---|
| No conectado | - | No Conectado / Habilitado | No Conectado |
| No conectado | - | No Conectado / Deshabilitado | - |
| Conectado | Tiene rol asignado | Rol asignado / Habilitado | Rol asignado |
| Conectado | Tiene rol asignado | Rol asignado / Deshabilitado | - |
| Conectado | Sin rol asignado | Predeterminado / Habilitado | Predeterminado |
| Conectado | Sin rol asignado | Predeterminado / Deshabilitado | - |

## Permisos Disponibles

Los 12 permisos controlables corresponden a Configuración → Seguridad → Permisos del dispositivo controlado:

- Teclado/Ratón
- Impresora Remota
- Portapapeles
- Transferencia de Archivos
- Audio
- Cámara
- Terminal
- Túnel TCP
- Reinicio Remoto
- Grabación de Sesión
- Bloquear Entrada del Usuario
- Modificación de Configuración Remota

## Operaciones de Consola

### Crear un Rol

1. Navegue a la página **Roles de Control** y haga clic en **Crear**
2. Ingrese un **Nombre** para el rol
3. Seleccione los **Permisos** a otorgar

![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-create-permission.png)

### Asignación de Rol

Hay dos formas de asignar Roles de Control a usuarios:

1. **Página de Usuarios** → Haga clic en **Editar** en un usuario → Seleccione un rol en el campo **Rol de Control**
2. **Página de Roles de Control** → Haga clic en el **conteo de usuarios** o **Asignar Usuarios** → Agregar o eliminar usuarios del rol

![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-assign-role-page.png)

{{% notice note %}}
El rol "No Conectado" no se puede asignar a usuarios (solo aplica a conexiones no autenticadas).
{{% /notice %}}
