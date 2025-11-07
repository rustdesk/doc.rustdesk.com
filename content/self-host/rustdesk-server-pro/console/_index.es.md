---
title: Consola Web
weight: 10
---

La consola web está integrada en RustDesk Server Pro, servida por el puerto `21114`.

Características:

- Explorar dispositivos
- Agregar/modificar usuarios y grupos de usuarios
- Modificar permisos de acceso a dispositivos
- Explorar registros de conexión de dispositivos y otros registros
- Actualizar configuraciones
- Gestionar estrategias de sincronización de configuración del cliente
- Gestionar libretas de direcciones compartidas
- Generar compilación personalizada del cliente

## Iniciar sesión

El puerto predeterminado de la consola web es 21114. Ingrese `http://<ip del servidor>:21114` en el navegador para acceder a la página de la consola, como se muestra en la siguiente figura. El nombre de usuario/contraseña predeterminado del administrador es `admin`/`test1234`:

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

Si necesita soporte HTTPS, instale un servidor web como `Nginx` o use `IIS` para Windows.

Después de iniciar sesión, asegúrese de cambiar la contraseña, seleccione `Configuración` en el menú de cuenta en la esquina superior derecha para acceder a la página de modificación de contraseña, como se muestra en la siguiente figura. También puede crear otra cuenta de administrador y eliminar esta. Es recomendable habilitar la verificación de inicio de sesión por correo electrónico.

<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

Los usuarios no administradores también pueden iniciar sesión para explorar sus dispositivos y registros, cambiar sus configuraciones de usuario.

## Configuraciones Automáticas
Al hacer clic en `Windows EXE` podrá obtener las configuraciones para su propio RustDesk Server Pro, esto ayudará a configurar sus clientes.

Para clientes de Windows, puede omitir la configuración personalizada del servidor y poner la información de configuración en el nombre de archivo `rustdesk.exe` en su lugar. Como se muestra arriba, vaya a la página de bienvenida de la consola y haga clic en `Windows EXE`. **Se requiere Cliente ≥ 1.1.9.**

Puede usar esto junto con [configuración del cliente](https://rustdesk.com/docs/en/self-host/client-configuration/) y [scripts de implementación](https://rustdesk.com/docs/en/self-host/client-deployment/) para configurar sus clientes.

## Crear un nuevo usuario diferente del usuario predeterminado `admin`

{{% notice note %}}
El plan `Individual` no tiene esta característica.
{{% /notice %}}

1. Haga clic en `Usuarios` en el menú de la izquierda.
2. Cree otra cuenta with `administrador` habilitado.
3. Inicie sesión con la nueva cuenta administrativa.
4. Elimine el `admin` en la página `Usuarios`.

## Crear un nuevo usuario
1. Haga clic en `Usuarios` en el menú de la izquierda.
2. Cree un nuevo usuario.
3. Seleccione en qué grupo deberían estar (si necesita agregar nuevos grupos, siga leyendo).

## Agregar un nuevo Grupo
1. Haga clic en `Grupos` en el menú de la izquierda.
2. Cree un nuevo grupo.
3. Una vez creado, puede permitir que los grupos accedan entre sí, haga clic en `Editar`.
4. Seleccione los grupos relevantes a los que desea acceso (los agrega automáticamente en el grupo correspondiente).

## Configurar múltiples servidores de retransmisión
1. Vaya a `Configuración` en el menú de la izquierda.
2. Haga clic en `Retransmisión` en el submenú.
3. Haga clic en `+` junto a `Servidores de Retransmisión`.
4. Ingrese la dirección DNS o dirección IP del servidor de retransmisión en el cuadro que ahora se muestra y presione <kbd>Enter</kbd>.
5. Si tiene más de un servidor de retransmisión, puede seguir haciendo clic en `+` y adaptar la configuración geográfica si es necesario (recuerde y copie su clave a los otros servidores).

## Establecer o cambiar la licencia
1. Vaya a `Configuración` en el menú de la izquierda.
2. Haga clic en `Licencia` en el submenú.
3. Haga clic en `Editar` y pegue su código de licencia.
4. Haga clic en `OK`.

## Ver Registros
En el lado izquierdo, haga clic en `Registros`.

## Configurar Correos Electrónicos
Gmail en este ejemplo

1. Vaya a `Configuración` en el menú de la izquierda.
2. Haga clic en `SMTP` en el submenú.
3. Ingrese la dirección SMTP `smtp.gmail.com`.
4. Ingrese el Puerto 587 en `Puerto SMTP`.
5. Ingrese la cuenta de Gmail, es decir, `myrustdeskserver@gmail.com` en `Cuenta de Correo`.
6. Ingrese su contraseña (podría necesitar una contraseña de aplicación).
7. Ingrese su cuenta de Gmail, es decir, `myrustdeskserver@gmail.com` en `De`.
8. Haga clic en `Verificar` para guardar.

## Asignar Usuarios/Estrategias/Grupos de Dispositivos a Dispositivos a través de la Consola Web

El Usuario es el usuario de RustDesk que ha iniciado sesión en el dispositivo o que se asigna al dispositivo haciendo clic en **Editar** junto al dispositivo, haciendo clic en el cuadro **Usuario** y seleccionando su usuario en el menú desplegable.  
También puede asignar dispositivos en lote a un usuario haciendo clic en **Más → Asignar Dispositivos** en la **Lista de Usuarios**.

Para agregar un dispositivo a un grupo de dispositivos, puede hacer clic en **Editar** junto al dispositivo en la **Lista de Dispositivos** y cambiar el **Grupo**, o ir a la lista de **Grupos de Dispositivos**, hacer clic en el nombre de un grupo de dispositivos y ajustar los dispositivos dentro de ese grupo.

Para asignar una estrategia a un dispositivo, pase el cursor sobre el lado derecho de la lista **Estrategia** y haga clic en **Editar Dispositivos**, **Editar Usuarios** o **Editar Grupos de Dispositivos** en el menú para agregar los dispositivos correspondientes, los dispositivos de usuario o los dispositivos del grupo de dispositivos a la estrategia seleccionada.

---

## Token de API

Primero debe ir a **Configuración → Tokens → Crear** y crear un token con los permisos requeridos: **Dispositivo, Registro de Auditoría, Usuario, Grupo, Estrategia, Libreta de Direcciones**.

Una vez creado, puede usar estos tokens a través de **línea de comandos** o **Python CLI** para realizar acciones con los permisos correspondientes.

### Asignar mediante Token desde la Línea de Comandos

También puede realizar asignaciones usando el ejecutable de RustDesk con el parámetro `--assign`.  
Esto permite asignar usuarios, estrategias, libretas de direcciones o grupos de dispositivos a un dispositivo directamente desde la línea de comandos.

**Ejemplo:**

    "C:\Program Files\RustDesk\rustdesk.exe" --assign --token <generatedtoken> --user_name <username>

Parámetros Soportados

| Parámetro                               | Descripción                             | RustDesk Server Pro | RustDesk Client | 
| --------------------------------------- | --------------------------------------- | ----------------- | --------------- | 
| `--user_name <username>`                | Asignar un usuario al dispositivo       |                   |                 | 
| `--strategy_name <strategyname>`        | Asignar una estrategia al dispositivo  |                   |                 | 
| `--address_book_name <addressbookname>` | Asignar dispositivo a una libreta       |                   |                 | 
| `--address_book_tag <addressbooktag>`   | Asignar con etiqueta de libreta        |                   |                 | 
| `--address_book_alias <alias>`          | Asignar con alias de libreta           | 1.5.8             | 1.4.1           | 
| `--address_book_password <password>`    | Establecer contraseña para la entrada  | 1.6.6             | 1.4.3           | 
| `--address_book_note <note>`            | Establecer nota para la entrada        | 1.6.6             | 1.4.3           | 
| `--device_group_name <devicegroupname>` | Asignar dispositivo a un grupo         |                   |                 | 
| `--note <note>`                         | Agregar nota al dispositivo            | 1.6.6             | 1.4.3           | 
| `--device_username <device_username>`   | Establecer el nombre de usuario del dispositivo | 1.6.6 | 1.4.3 | 
| `--device_name <device_name>`           | Establecer el nombre del dispositivo  | 1.6.6             | 1.4.3           | 

La línea de comandos en Windows no muestra salida por defecto. Para obtener salida, ejecute así:  

    "C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more
    "C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String

ver [aquí](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952).

### Herramientas de Gestión Python CLI

#### Gestión de Usuarios (`users.py`)

**Mostrar ayuda:**  
`./users.py -h`

**Ver usuarios:**  
`./users.py --url <url> --token <token> view [--name <username>] [--group_name <group_name>]`

**Filtros:**
- `--name`: nombre de usuario (búsqueda difusa)
- `--group_name`: grupo de usuarios (coincidencia exacta)

**Ejemplo:**  
`./users.py --url https://example.com --token <token> view --group_name Default`

**Operaciones básicas:**

- **Deshabilitar usuario:**  
  `./users.py --url <url> --token <token> disable --name testuser`

- **Habilitar usuario:**  
  `./users.py --url <url> --token <token> enable --name testuser`

- **Eliminar usuario:**  
  `./users.py --url <url> --token <token> delete --name testuser`

**Creación e invitación de usuarios:**

- **Crear nuevo usuario:**  
  `./users.py --url <url> --token <token> new --name username --password 'password123' --group_name Default [--email user@example.com] [--note "nota"]`
  
  Requerido: `--name`, `--password`, `--group_name`  
  Opcional: `--email`, `--note`

- **Invitar usuario por correo:**  
  `./users.py --url <url> --token <token> invite --email user@example.com --name username --group_name Default [--note "nota"]`
  
  Requerido: `--email`, `--name`, `--group_name`  
  Opcional: `--note`

**Operaciones 2FA y seguridad:**

- **Habilitar aplicación 2FA:**  
  `./users.py --url <url> --token <token> enable-2fa-enforce --name username --web-console-url <console_url>`
  
  Requerido: `--web-console-url`

- **Deshabilitar aplicación 2FA:**  
  `./users.py --url <url> --token <token> disable-2fa-enforce --name username [--web-console-url <console_url>]`
  
  Opcional: `--web-console-url`

- **Restablecer 2FA:**  
  `./users.py --url <url> --token <token> reset-2fa --name username`

- **Deshabilitar verificación por correo:**  
  `./users.py --url <url> --token <token> disable-email-verification --name username`

- **Cerrar sesión forzada:**  
  `./users.py --url <url> --token <token> force-logout --name username`

**Notas:**
- Al operar sobre múltiples usuarios (coincidentes con filtros), se solicitará confirmación
- Si no hay usuarios coincidentes, se mostrará "Found 0 users"

---

#### Gestión de Grupos de Usuarios (`user_group.py`)

**Mostrar ayuda:**  
`./user_group.py -h`

**Ver grupos de usuarios:**  
`./user_group.py --url <url> --token <token> view [--name <group_name>]`

**Ejemplo:**  
`./user_group.py --url https://example.com --token <token> view --name "Equipo Ventas"`

**Operaciones de grupo:**

- **Crear grupo de usuarios:**  
  `./user_group.py --url <url> --token <token> add --name "NombreGrupo" [--note "descripción"] [--accessed-from '<json>'] [--access-to '<json>']`
  
  Ejemplo con control de acceso:  
  `./user_group.py --url <url> --token <token> add --name "Ingeniería" --accessed-from '[{"type":0,"name":"Gerentes"}]' --access-to '[{"type":1,"name":"Servidores Dev"}]'`

- **Actualizar grupo de usuarios:**  
  `./user_group.py --url <url> --token <token> update --name "NombreGrupo" [--new-name "Nuevo Nombre"] [--note "nueva nota"] [--accessed-from '<json>'] [--access-to '<json>']`

- **Eliminar grupo de usuarios:**  
  `./user_group.py --url <url> --token <token> delete --name "NombreGrupo"`
  
  Admite nombres separados por comas: `--name "Grupo1,Grupo2,Grupo3"`

**Gestión de usuarios en grupos:**

- **Ver usuarios en grupo:**  
  `./user_group.py --url <url> --token <token> view-users [--name <group_name>] [--user-name <username>]`
  
  Filtros:
  - `--name`: nombre del grupo (coincidencia exacta, opcional)
  - `--user-name`: nombre de usuario (búsqueda difusa, opcional)
  
  Ejemplo:  
  `./user_group.py --url <url> --token <token> view-users --name Default --user-name john`

- **Agregar usuarios al grupo:**  
  `./user_group.py --url <url> --token <token> add-users --name "NombreGrupo" --users "user1,user2,user3"`

**Parámetros de control de acceso:**

- `--accessed-from`: array JSON que define quién puede acceder a este grupo de usuarios
  - Type 0 = Grupo de usuarios (ej. `[{"type":0,"name":"Admins"}]`)
  - Type 2 = Usuario (ej. `[{"type":2,"name":"john"}]`)

- `--access-to`: array JSON que define a qué puede acceder este grupo de usuarios
  - Type 0 = Grupo de usuarios (ej. `[{"type":0,"name":"Soporte"}]`)
  - Type 1 = Grupo de dispositivos (ej. `[{"type":1,"name":"Servidores"}]`)

**Nota:** Use comillas simples alrededor de los arrays JSON para evitar problemas de análisis del shell.

**Requisitos de permisos:**
- Los comandos `view/add/update/delete/add-users` requieren **Permiso de Grupo de Usuarios**
- El comando `view-users` requiere **Permiso de Usuario**

---

#### Gestión de Grupos de Dispositivos (`device_group.py`)

**Mostrar ayuda:**  
`./device_group.py -h`

**Ver grupos de dispositivos:**  
`./device_group.py --url <url> --token <token> view [--name <group_name>]`

**Ejemplo:**  
`./device_group.py --url https://example.com --token <token> view`

**Operaciones de grupo:**

- **Crear grupo de dispositivos:**  
  `./device_group.py --url <url> --token <token> add --name "NombreGrupo" [--note "descripción"] [--accessed-from '<json>']`
  
  Ejemplo:  
  `./device_group.py --url <url> --token <token> add --name "Producción" --accessed-from '[{"type":0,"name":"Admins"}]'`

- **Actualizar grupo de dispositivos:**  
  `./device_group.py --url <url> --token <token> update --name "NombreGrupo" [--new-name "Nuevo Nombre"] [--note "nueva nota"] [--accessed-from '<json>']`

- **Eliminar grupo de dispositivos:**  
  `./device_group.py --url <url> --token <token> delete --name "NombreGrupo"`
  
  Admite nombres separados por comas: `--name "Grupo1,Grupo2,Grupo3"`

**Gestión de dispositivos en grupos:**

- **Ver dispositivos en grupo:**  
  `./device_group.py --url <url> --token <token> view-devices [filtros]`
  
  Filtros disponibles:
  - `--name`: nombre del grupo de dispositivos (coincidencia exacta)
  - `--id`: ID del dispositivo (búsqueda difusa)
  - `--device-name`: nombre del dispositivo (búsqueda difusa)
  - `--user-name`: nombre de usuario/propietario (búsqueda difusa)
  - `--device-username`: nombre de usuario conectado en el dispositivo (búsqueda difusa)
  
  Ejemplos:  
  ```bash
  # Ver todos los dispositivos en un grupo
  ./device_group.py --url <url> --token <token> view-devices --name Producción
  
  # Buscar por nombre de dispositivo
  ./device_group.py --url <url> --token <token> view-devices --device-name server
  
  # Combinar filtros
  ./device_group.py --url <url> --token <token> view-devices --name Producción --user-name john
  ```


- **Agregar dispositivos al grupo:**  
  `./device_group.py --url <url> --token <token> add-devices --name "NombreGrupo" --ids "deviceid1,deviceid2"`

- **Quitar dispositivos del grupo:**  
  `./device_group.py --url <url> --token <token> remove-devices --name "NombreGrupo" --ids "deviceid1,deviceid2"`

**Parámetro de control de acceso:**

- `--accessed-from`: array JSON que define quién puede acceder a este grupo de dispositivos
  - Type 0 = Grupo de usuarios (ej. `[{"type":0,"name":"Ingenieros"}]`)
  - Type 2 = Usuario (ej. `[{"type":2,"name":"admin"}]`)

**Requisitos de permisos:**
- Los comandos `view/add/update/delete/add-devices/remove-devices` requieren **Permiso de Grupo de Dispositivos**
- El comando `view-devices` requiere **Permiso de Dispositivo**

---

#### Gestión de Dispositivos (`devices.py`)

**Mostrar ayuda:**

    ./devices.py -h

**Ver dispositivos:**

    ./devices.py --url <url> --token <token> view [--id <device_id>] [--device_name <device_name>] [--user_name <user_name>] [--group_name <group_name>] [--device_group_name <device_group_name>] [--offline_days <days>]

**Filtros:**

    --id: ID del dispositivo
    --device_name: nombre del dispositivo
    --user_name: usuario asignado
    --group_name: grupo de usuarios
    --device_group_name: grupo de dispositivos
    --offline_days: días sin conexión

**Ejemplo:**

    ./devices.py --url https://example.com --token <token> view --user_name mike

**Operaciones:**

`view` puede reemplazarse por `enable`, `disable`, `delete`, o `assign`.

**Ejemplo (asignar dispositivo):**

    ./devices.py --url https://example.com --token <token> assign --device_name PC01 --assign_to user_name=mike

---

#### Gestión de Libretas de Direcciones (`ab.py`)

**Mostrar ayuda:**

    ./ab.py -h

**Ver libretas de direcciones compartidas:**

    ./ab.py --url <url> --token <token> view-ab [--ab-name <address_book_name>]

**Obtener GUID de libreta personal:**

    ./ab.py --url <url> --token <token> get-personal-ab

**Agregar una libreta compartida:**

    ./ab.py --url <url> --token <token> add-ab --ab-name <name> [--note <note>] [--password <password>]

**Actualizar o eliminar una libreta compartida:**

    ./ab.py --url <url> --token <token> update-ab --ab-guid <guid> [--ab-update-name <new_name>] [--note <note>]
    ./ab.py --url <url> --token <token> delete-ab --ab-guid <guid>

**Ver peers en una libreta:**

    ./ab.py --url <url> --token <token> view-peer --ab-guid <guid> [--peer-id <peer_id>] [--alias <alias>]

**Agregar, actualizar o eliminar un peer:**

    ./ab.py --url <url> --token <token> add-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]
    ./ab.py --url <url> --token <token> update-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]
    ./ab.py --url <url> --token <token> delete-peer --ab-guid <guid> --peer-id <peer_id>

**Gestión de etiquetas:**

    ./ab.py --url <url> --token <token> view-tag --ab-guid <guid>
    ./ab.py --url <url> --token <token> add-tag --ab-guid <guid> --tag-name <name> [--tag-color 0xFF00FF00]
    ./ab.py --url <url> --token <token> update-tag --ab-guid <guid> --tag-name <name> --tag-color 0xFFFF0000
    ./ab.py --url <url> --token <token> delete-tag --ab-guid <guid> --tag-name <name>

**Gestión de reglas de acceso:**

    ./ab.py --url <url> --token <token> view-rule --ab-guid <guid>
    ./ab.py --url <url> --token <token> add-rule --ab-guid <guid> [--rule-type user|group|everyone] [--rule-user <user>] [--rule-group <group>] --rule-permission ro|rw|full
    ./ab.py --url <url> --token <token> update-rule --rule-guid <rule_guid> --rule-permission rw
    ./ab.py --url <url> --token <token> delete-rule --rule-guid <rule_guid>

**Ejemplo (agregar regla de solo lectura para el usuario "mike"):**

    ./ab.py --url https://example.com --token <token> add-rule --ab-guid <guid> --rule-user mike --rule-permission ro

---

#### Gestión de Estrategias (`strategies.py`)

**Mostrar ayuda:**  
`./strategies.py -h`

**Listar todas las estrategias:**  
`./strategies.py --url <url> --token <token> list`

**Ver una estrategia específica:**  
```bash
# Por nombre
./strategies.py --url <url> --token <token> view --name "Default"

# Por GUID
./strategies.py --url <url> --token <token> view --guid "01983006-fcca-7c12-9a91-b1df483c6073"
```

**Habilitar o deshabilitar una estrategia:**  
```bash
./strategies.py --url <url> --token <token> enable --name "NombreEstrategia"
./strategies.py --url <url> --token <token> disable --name "NombreEstrategia"
```

**Asignar estrategia a dispositivos, usuarios o grupos de dispositivos:**  
```bash
# Asignar a dispositivos (por ID de dispositivo)
./strategies.py --url <url> --token <token> assign --name "Default" --peers "1849118658,1337348840"

# Asignar a usuarios (por nombre de usuario)
./strategies.py --url <url> --token <token> assign --name "Default" --users "admin,user1"

# Asignar a grupos de dispositivos (por nombre de grupo)
./strategies.py --url <url> --token <token> assign --name "Default" --device-groups "device_group1,Production"

# Asignación mixta
./strategies.py --url <url> --token <token> assign \
  --name "Default" \
  --peers "1849118658" \
  --users "admin" \
  --device-groups "device_group1"
```

**Desasignar estrategia:**  
```bash
# Desasignar de dispositivos
./strategies.py --url <url> --token <token> unassign --peers "1849118658,1337348840"

# Desasignar de usuarios
./strategies.py --url <url> --token <token> unassign --users "admin"

# Desasignar de grupos de dispositivos
./strategies.py --url <url> --token <token> unassign --device-groups "device_group1"
```

**Notas:**
- El script admite nombres y GUIDs para usuarios y grupos de dispositivos
- Los IDs de dispositivos se convierten automáticamente en GUIDs
- Todas las operaciones assign/unassign pueden trabajar con múltiples objetivos a la vez

**Requisitos de permisos:**
- Los comandos `list/view/enable/disable/assign/unassign` requieren **Permiso de Estrategia**
- `--peers` requiere **Permiso de Dispositivo:r** (para búsqueda de ID a GUID)
- `--users` requiere **Permiso de Usuario:r** (para búsqueda de nombre de usuario a GUID)
- `--device-groups` requiere **Permiso de Grupo de Dispositivos:r** (para búsqueda de nombre de grupo a GUID)

---


#### Auditorías (`audits.py`)

**Mostrar ayuda:**

    ./audits.py -h

**Ver auditorías de conexión:**

    ./audits.py --url <url> --token <token> view-conn [--remote <peer_id>] [--conn-type <type>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Ver auditorías de archivos:**

    ./audits.py --url <url> --token <token> view-file [--remote <peer_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Ver auditorías de alarmas:**

    ./audits.py --url <url> --token <token> view-alarm [--device <device_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Ver auditorías de consola:**

    ./audits.py --url <url> --token <token> view-console [--operator <username>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Filtros:**

    --remote: ID del peer (para auditorías de conexión o archivos)
    --conn-type: 0=Escritorio Remoto, 1=Transferencia de Archivos, 2=Transferencia de Puertos, 3=Ver Cámara, 4=Terminal
    --device: ID del dispositivo (para auditorías de alarmas)
    --operator: nombre de usuario del operador (para auditorías de consola)
    --created-at: filtro de hora local, por ejemplo, "2025-09-16 14:15:57"
    --days-ago: filtrar registros más recientes que los días indicados
    --page-size / --current: paginación

**Ejemplo:**

    ./audits.py --url https://example.com --token <token> view-conn --remote 123456789 --days-ago 7

## Buscar un dispositivo
1. Vaya a Dispositivos.
2. En el Campo de Búsqueda de Nombre de Dispositivo escriba el nombre y haga clic en `Consultar` o presione <kbd>Enter</kbd>.
3. Para usar un comodín agregue `%` al inicio, final o ambos del término de búsqueda.