---
title: Rol de Administrador
weight: 17
---

El Rol de Administrador permite a los administradores delegar permisos de gestión parcial a usuarios no administradores. Puede definir permisos para recursos globales (como estrategias, roles de control y clientes personalizados), así como para usuarios y dispositivos dentro de diferentes ámbitos.

Una vez que se asigna un Rol de Administrador a un usuario, verá las páginas y menús correspondientes en la consola web según los permisos otorgados.

## Administradores vs Roles de Administrador

- Solo los administradores pueden editar Roles de Administrador y asignar Roles de Administrador a usuarios.
- Los administradores no están restringidos por los Roles de Administrador, aunque se les pueden asignar Roles de Administrador.
- Los usuarios no administradores no pueden editar cuentas de administrador, incluso con permisos globales de usuario otorgados.

## Tipos de Rol

Los Roles de Administrador vienen en tres tipos, cada uno con diferente ámbito y permisos disponibles.

| Tipo | Descripción |
|------|-------------|
| **Global** | Puede gestionar todos los recursos en todo el equipo |
| **Individual** | Solo puede gestionar los propios dispositivos del usuario y registros de auditoría |
| **Ámbito de Grupo** | Puede gestionar usuarios y dispositivos dentro de grupos especificados |

### Sobre el Ámbito de Grupo

| Permisos seleccionados | Aplicado a |
|-------|-------------|
| **Permisos de Usuario** | Se aplican a usuarios dentro de los grupos de usuarios seleccionados |
| **Permisos de Dispositivo** | Se aplican a dispositivos de: <ul><li>Grupos de dispositivos seleccionados</li><li>Dispositivos asignados a usuarios dentro de los grupos de usuarios seleccionados</li><li>Dispositivos no asignados (si está habilitado)</li></ul> |

## Reglas de Permisos

### Cualquier Permiso de Edición Incluye el Permiso de Visualización Correspondiente

Cualquier permiso de edición incluye automáticamente el permiso de visualización correspondiente. Por ejemplo, el permiso "Dispositivos Habilitar/Deshabilitar" incluye el permiso "Ver Dispositivos".

### El Permiso de Edición No Incluye Asignación

Los permisos de edición para recursos (Grupos de Usuarios, Grupos de Dispositivos, Estrategias, Roles de Control) solo permiten editar los recursos en sí, no asignarlos a usuarios o dispositivos.

Por ejemplo, el permiso "Editar Grupos de Dispositivos" permite crear y modificar grupos de dispositivos, pero para agregar o eliminar dispositivos de grupos, necesita el permiso "Dispositivos Actualizar Grupo".

### El Permiso de Visualización No Incluye Miembros

Los permisos de visualización para recursos (Grupos de Usuarios, Grupos de Dispositivos, Estrategias, Roles de Control) solo permiten ver los recursos en sí, no ver los miembros dentro de ellos.

Por ejemplo, el permiso "Ver Grupos de Dispositivos" permite ver la lista de grupos de dispositivos, pero para ver los dispositivos dentro de un grupo, necesita el permiso "Ver Dispositivos" o cualquier permiso de edición de dispositivos. Si el permiso de dispositivo es global, puede ver todos los dispositivos en el grupo; si es de ámbito de grupo o individual, solo puede ver dispositivos dentro de su ámbito permitido.

{{% notice note %}}
La lectura de dispositivos para libretas de direcciones no se ve afectada por los Roles de Administrador. La pestaña de dispositivos accesibles en el cliente solo está controlada por **Configuración → Otros → Deshabilitar recuperación de dispositivos accesibles** en la consola, y tampoco está restringida por los Roles de Administrador.
{{% /notice %}}

## Operaciones de Consola

### Crear un Rol

1. Navegue a la página **Roles de Administrador** y haga clic en **Crear**
2. Ingrese un **Nombre** para el rol
3. Seleccione un **Tipo** (para **Ámbito de Grupo**, también configure el ámbito)
4. Seleccione los **Permisos** a otorgar

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-permission.png)

### Asignación de Roles

Hay dos formas de asignar Roles de Administrador a usuarios:

1. **Página de Usuarios** → Haga clic en **Editar** en un usuario → Seleccione roles en el campo **Roles de Administrador**
2. **Página de Roles de Administrador** → Haga clic en el **conteo de usuarios** o **Asignar Usuarios** → Agregar o eliminar usuarios del rol

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-role-page.png)

{{% notice note %}}
- Un usuario puede tener múltiples Roles de Administrador asignados. Los permisos de todos los roles asignados se combinan (unión de todos los permisos).
{{% /notice %}}

## Referencia de Permisos

### Permisos Globales

| Permiso | Descripción |
|------------|-------------|
| Users-View | Leer información de lista de todos los usuarios. |
| Users-Create | Crear directamente usuarios no administradores. |
| Users-Invite | Invitar usuarios por correo electrónico. |
| Users-Delete | Eliminar cualquier usuario no administrador. Los usuarios deben estar deshabilitados antes de poder eliminarlos. |
| Users-Enable/Disable | Habilitar o deshabilitar cualquier usuario no administrador. |
| Users-Edit Email | Cambiar el correo electrónico de cualquier usuario no administrador. |
| Users-Edit Password | Cambiar la contraseña de cualquier usuario no administrador. |
| Users-Edit Note | Cambiar la nota de cualquier usuario no administrador. |
| Users-Manage 2FA | Gestionar verificación de inicio de sesión para cualquier usuario no administrador. Incluye habilitar/deshabilitar aplicación de 2FA, restablecer configuración de 2FA, deshabilitar verificación de inicio de sesión por correo. |
| Users-Force Logout | Forzar cierre de sesión de cualquier usuario no administrador en todos los dispositivos. |
| Users-Update Group | Cambiar el grupo de cualquier usuario no administrador. |
| Users-Update Strategy | Cambiar la estrategia de cualquier usuario no administrador. |
| Users-Update Control Role | Cambiar el rol de control de cualquier usuario no administrador. |
| Devices-View | Leer información de lista de todos los dispositivos. |
| Devices-Enable/Disable | Habilitar o deshabilitar cualquier dispositivo. |
| Devices-Delete | Eliminar cualquier dispositivo. Los dispositivos deben estar deshabilitados antes de poder eliminarlos. |
| Devices-Edit Info | Editar nombre del dispositivo, nombre de usuario del dispositivo (nombre de usuario del sistema del dispositivo, no el usuario de RustDesk) y nota para cualquier dispositivo. |
| Devices-Assign to User | Asignar cualquier dispositivo a cualquier usuario. |
| Devices-Update Group | Cambiar el grupo de cualquier dispositivo. |
| Devices-Update Strategy | Cambiar la estrategia de cualquier dispositivo. |
| User Groups-View | Leer información de lista de todos los grupos de usuarios. Con permiso Users View, puede ver miembros del grupo. Con permiso Users Update Group, puede actualizar grupos de usuarios por lotes aquí. |
| User Groups-Edit | Crear, editar y eliminar grupos de usuarios, no incluye actualizar miembros del grupo. |
| Device Groups-View | Leer información de lista de todos los grupos de dispositivos. Con permiso Devices View, puede ver miembros del grupo. Con permiso Devices Update Group, puede actualizar grupos de dispositivos por lotes aquí. |
| Device Groups-Edit | Crear, editar y eliminar grupos de dispositivos, no incluye actualizar miembros del grupo. Incluye permiso Update Strategy. |
| Device Groups-Update Strategy | Cambiar la estrategia de cualquier grupo de dispositivos. |
| Audit Logs-View | Leer todos los registros. Puede editar notas. Incluso cuando la opción "Solo admin puede acceder a registros" está habilitada. |
| Audit Logs-Edit | Puede desconectar cualquier conexión activa. |
| Strategies-View | Leer cualquier estrategia. Con permisos Users View, Devices View y Device Groups View, puede leer estrategias para usuarios, dispositivos y grupos de dispositivos. Con permisos Update Strategy correspondientes, puede actualizar estrategias por lotes aquí. |
| Strategies-Edit | Crear, editar y eliminar estrategias, no incluye actualizar estrategias para usuarios, dispositivos y grupos de dispositivos. |
| Control Roles-View | Leer cualquier rol de control. Con permiso Users View, puede leer roles de control para usuarios. Con permiso Users Update Control Role, puede actualizar roles de control por lotes aquí. |
| Control Roles-Edit | Crear, editar y eliminar roles de control, no incluye actualizar roles de control para usuarios. |
| Custom Clients-View | Leer la lista de clientes personalizados. Puede descargar clientes personalizados compilados. No puede leer configuración detallada de clientes personalizados. |
| Custom Clients-Edit | Crear, editar y eliminar clientes personalizados. |

### Permisos Individuales

| Permiso | Descripción |
|------------|-------------|
| Devices-View | Leer información de lista de los dispositivos del usuario. |
| Devices-Enable/Disable | Habilitar o deshabilitar los dispositivos del usuario. |
| Devices-Delete | Eliminar los dispositivos del usuario. Los dispositivos deben estar deshabilitados antes de poder eliminarlos. |
| Devices-Edit Info | Editar nombre del dispositivo, nombre de usuario del dispositivo y nota para los dispositivos del usuario. |
| Devices-Update Strategy | Cambiar la estrategia de los dispositivos del usuario. |
| Audit Logs-View | Leer registros personales. Puede editar notas. Incluso cuando la opción "Solo admin puede acceder a registros" está habilitada. |
| Audit Logs-Edit | Puede desconectar conexiones activas personales. |

### Permisos de Ámbito de Grupo

| Permiso | Descripción |
|------------|-------------|
| Users-View | Leer información de lista de usuarios dentro de los grupos de usuarios seleccionados. |
| Users-Create | Crear usuarios no administradores dentro de los grupos de usuarios seleccionados. |
| Users-Invite | Invitar usuarios por correo electrónico dentro de los grupos de usuarios seleccionados. |
| Users-Delete | Eliminar usuarios no administradores dentro de los grupos de usuarios seleccionados. Los usuarios deben estar deshabilitados antes de poder eliminarlos. |
| Users-Enable/Disable | Habilitar o deshabilitar usuarios no administradores dentro de los grupos de usuarios seleccionados. |
| Users-Edit Email | Cambiar el correo electrónico de usuarios no administradores dentro de los grupos de usuarios seleccionados. |
| Users-Edit Password | Cambiar la contraseña de usuarios no administradores dentro de los grupos de usuarios seleccionados. |
| Users-Edit Note | Cambiar la nota de usuarios no administradores dentro de los grupos de usuarios seleccionados. |
| Users-Manage 2FA | Gestionar verificación de inicio de sesión para usuarios no administradores dentro de los grupos de usuarios seleccionados. |
| Users-Force Logout | Forzar cierre de sesión de usuarios no administradores dentro de los grupos de usuarios seleccionados. |
| Users-Update Strategy | Cambiar la estrategia de usuarios no administradores dentro de los grupos de usuarios seleccionados. |
| Users-Update Control Role | Cambiar el rol de control de usuarios no administradores dentro de los grupos de usuarios seleccionados. |
| Devices-View | Leer información de lista de dispositivos gestionados por el rol actual. |
| Devices-Enable/Disable | Habilitar o deshabilitar dispositivos gestionados por el rol actual. |
| Devices-Delete | Eliminar dispositivos gestionados por el rol actual. Los dispositivos deben estar deshabilitados antes de poder eliminarlos. |
| Devices-Edit Info | Editar nombre del dispositivo, nombre de usuario del dispositivo y nota para dispositivos gestionados por el rol actual. |
| Devices-Update Strategy | Cambiar la estrategia de dispositivos gestionados por el rol actual. |
