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

### Iniciar sesión

El puerto predeterminado de la consola web es 21114. Ingrese `http://<ip del servidor>:21114` en el navegador para acceder a la página de la consola, como se muestra en la siguiente figura. El nombre de usuario/contraseña predeterminado del administrador es `admin`/`test1234`:

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

Si necesita soporte HTTPS, instale un servidor web como `Nginx` o use `IIS` para Windows.

Después de iniciar sesión, asegúrese de cambiar la contraseña, seleccione `Configuración` en el menú de cuenta en la esquina superior derecha para acceder a la página de modificación de contraseña, como se muestra en la siguiente figura. También puede crear otra cuenta de administrador y eliminar esta. Es recomendable habilitar la verificación de inicio de sesión por correo electrónico.

<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

Los usuarios no administradores también pueden iniciar sesión para explorar sus dispositivos y registros, cambiar sus configuraciones de usuario.

### Configuraciones Automáticas
Al hacer clic en `Windows EXE` podrá obtener las configuraciones para su propio RustDesk Server Pro, esto ayudará a configurar sus clientes.

Para clientes de Windows, puede omitir la configuración personalizada del servidor y poner la información de configuración en el nombre de archivo `rustdesk.exe` en su lugar. Como se muestra arriba, vaya a la página de bienvenida de la consola y haga clic en `Windows EXE`. **Se requiere Cliente ≥ 1.1.9.**

Puede usar esto junto con [configuración del cliente](https://rustdesk.com/docs/en/self-host/client-configuration/) y [scripts de implementación](https://rustdesk.com/docs/en/self-host/client-deployment/) para configurar sus clientes.

### Crear un nuevo usuario diferente del usuario predeterminado `admin`

{{% notice note %}}
El plan `Individual` no tiene esta característica.
{{% /notice %}}

1. Haga clic en `Usuarios` en el menú de la izquierda.
2. Cree otra cuenta with `administrador` habilitado.
3. Inicie sesión con la nueva cuenta administrativa.
4. Elimine el `admin` en la página `Usuarios`.

### Crear un nuevo usuario
1. Haga clic en `Usuarios` en el menú de la izquierda.
2. Cree un nuevo usuario.
3. Seleccione en qué grupo deberían estar (si necesita agregar nuevos grupos, siga leyendo).

### Agregar un nuevo Grupo
1. Haga clic en `Grupos` en el menú de la izquierda.
2. Cree un nuevo grupo.
3. Una vez creado, puede permitir que los grupos accedan entre sí, haga clic en `Editar`.
4. Seleccione los grupos relevantes a los que desea acceso (los agrega automáticamente en el grupo correspondiente).

### Configurar múltiples servidores de retransmisión
1. Vaya a `Configuración` en el menú de la izquierda.
2. Haga clic en `Retransmisión` en el submenú.
3. Haga clic en `+` junto a `Servidores de Retransmisión`.
4. Ingrese la dirección DNS o dirección IP del servidor de retransmisión en el cuadro que ahora se muestra y presione <kbd>Enter</kbd>.
5. Si tiene más de un servidor de retransmisión, puede seguir haciendo clic en `+` y adaptar la configuración geográfica si es necesario (recuerde y copie su clave a los otros servidores).

### Establecer o cambiar la licencia
1. Vaya a `Configuración` en el menú de la izquierda.
2. Haga clic en `Licencia` en el submenú.
3. Haga clic en `Editar` y pegue su código de licencia.
4. Haga clic en `OK`.

### Ver Registros
En el lado izquierdo, haga clic en `Registros`.

### Configurar Correos Electrónicos
Gmail en este ejemplo

1. Vaya a `Configuración` en el menú de la izquierda.
2. Haga clic en `SMTP` en el submenú.
3. Ingrese la dirección SMTP `smtp.gmail.com`.
4. Ingrese el Puerto 587 en `Puerto SMTP`.
5. Ingrese la cuenta de Gmail, es decir, `myrustdeskserver@gmail.com` en `Cuenta de Correo`.
6. Ingrese su contraseña (podría necesitar una contraseña de aplicación).
7. Ingrese su cuenta de Gmail, es decir, `myrustdeskserver@gmail.com` en `De`.
8. Haga clic en `Verificar` para guardar.

### Asignar Usuarios/Grupos/Estrategias/GrupoDispositivo de Dispositivo a Dispositivos
El Usuario es el Usuario de RustDesk con sesión iniciada en el dispositivo o asignado al dispositivo haciendo clic en `Editar` junto al dispositivo, haga clic en el cuadro `Usuario` y despliegue para seleccionar su usuario, esto asignará automáticamente el grupo basado en el grupo al que ha sido asignado el usuario.

Esto también se puede hacer a través de la API en la línea de comandos durante la implementación o posteriormente llamando al ejecutable de RustDesk seguido de `--assign --token <token generado> --user_name <nombre de usuario>`. Necesita ir a `Configuración → Tokens → Crear` y crear un token con permisos de Dispositivo primero para hacer esto. Un ejemplo de esto en Windows sería `"C:\Program Files\RustDesk\rustdesk.exe" --assign --token <token generado> --user_name <nuevo usuario>`.

También puede asignar estrategia de esta manera, por ejemplo, `--assign --token <token generado> --strategy_name <nombre de estrategia>`.

También puede asignar libreta de direcciones de esta manera, por ejemplo, `--assign --token <token generado> --address_book_name <nombre de libreta de direcciones>` o `--assign --token <token generado> --address_book_name <nombre de libreta de direcciones> --address_book_tag <etiqueta de libreta de direcciones> --address_book_alias <alias>`. `--address_book_alias` requiere RustDesk Server Pro ≥1.5.8 y cliente ≥1.4.1.

También puede asignar nombre de grupo de dispositivo de esta manera, por ejemplo, `--assign --token <token generado> --device_group_name <nombre de grupo de dispositivo>`.

La línea de comandos en Windows no tiene salida por defecto. Para obtener salida, ejecute así, `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more` o `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String`, vea [aquí](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952).

### Buscar un dispositivo
1. Vaya a Dispositivos.
2. En el Campo de Búsqueda de Nombre de Dispositivo escriba el nombre y haga clic en `Consultar` o presione <kbd>Enter</kbd>.
3. Para usar un comodín agregue `%` al inicio, final o ambos del término de búsqueda.