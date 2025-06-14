---
title: Android
weight: 4
---

### Control remoto

Ingrese la ID del dispositivo remoto en la página de inicio o seleccione un dispositivo histórico para verificar.
Después de una verificación exitosa, puede controlar el dispositivo remoto.

| Inicio | Conectado exitosamente |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_en.jpg?width=300px) | ![](/docs/en/client/android/images/connection_en.jpg?width=300px) |

El control de entrada ofrece dos modos: `Modo ratón` y `Modo táctil`, que se pueden cambiar a través de la barra de herramientas inferior.

| Configuración del ratón | Selección de modo |
| --- | --- |
| ![](/docs/en/client/android/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/client/android/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
En `Modo ratón`, también puede activar el `Clic derecho` del dispositivo remoto con un `Toque de dos dedos`
{{% /notice %}}

### Transferencia de archivos (Android)

> Requiere RustDesk ≥ 1.1.9

Seleccione el dispositivo en la lista de dispositivos en la página de inicio.

Mantenga presionado o toque el menú a la derecha para seleccionar `Transferencia de archivos`.

| Inicio | Conectado exitosamente |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_connection_en.jpg?width=300px) |

- El directorio inicial es el directorio principal del dispositivo, puede hacer clic en <i class="fas fa-home"></i> para volver rápidamente al inicio.
- Debajo de la barra de título está el nivel de directorio, puede hacer clic en la carpeta correspondiente para saltar rápidamente.
- Haga clic en <i class="fas fa-arrow-up"></i> para acceder al directorio padre.
- La ruta absoluta actual y las estadísticas del proyecto se mostrarán en la parte inferior de la lista.
- Haga clic en `Local` / `Remoto` en la barra de título para cambiar páginas.

#### ¿Cómo transferir archivos?

1. **Mantenga presionado** un archivo o carpeta en la lista para entrar rápidamente en **modo de selección múltiple**, que puede seleccionar múltiples elementos.
2. Después de seleccionar el/los archivo(s), cambie la página `Local` / `Remoto`. Después del cambio, verá el aviso `¿Pegar aquí?` en la parte inferior de la pantalla.
3. Haga clic en el icono de pegar archivo en la imagen para transferir el/los elemento(s) seleccionado(s) al directorio de destino.

| Modo de selección múltiple | Pegar archivo |
| --- | --- |
| ![](/docs/en/client/android/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_copy_en.jpg?width=300px) |

### Configurar servidor ID/Relé

1. Haga clic en `Configuración` en la barra de navegación inferior.
2. Haga clic en `Servidor ID/Relé`.
3. Ingrese el nombre de host/dirección IP de su servidor ID en el campo `Servidor ID`. Deje `Servidor de relé` y `Servidor API` vacíos, e ingrese su clave pública (opcional, requerida para cifrado) en el campo `Clave`. Presione **Aceptar** para guardar su configuración. Cambiará automáticamente al servidor especificado.

También puede configurarlo escaneando un código QR. Para generar el código QR, use el siguiente formato (cambie los valores `host` y `key` por los suyos):

```nolang
config={"host": "xxx", "key": "xxx"}
```

Luego vaya a un [Generador de código QR en línea](https://www.qr-code-generator.com/) y pegue el código anterior.

La imagen a continuación es una captura de pantalla de Android. Si es iOS, verifique el menú superior derecho en la página de inicio.

![](/docs/en/client/android/images/id_setting_en.jpg?width=300px)

### Compartir pantalla/archivos de su teléfono Android

A partir de la versión 1.1.9, el cliente Android ha agregado las funciones de compartir la pantalla del teléfono y compartir el sistema de archivos del teléfono.

- Se requiere Android 6 y superior para compartir pantalla
- Se requiere Android 10 o superior para compartir el audio interno del sistema del teléfono móvil
- iOS aún no admite el uso compartido de pantalla

#### Solicitar permisos e iniciar servicios

Haga clic en `Compartir pantalla` en la barra de navegación inferior.

Configure varios permisos según sea necesario. Cada vez que inicie RustDesk, debe solicitar nuevamente los permisos "Captura de pantalla" y "Control de entrada".

![](/docs/en/client/android/images/server_off_en.jpg?width=300px)

| Permiso | Descripción |
| --- | --- |
| Captura de pantalla | Si habilitar el permiso de uso compartido de captura de pantalla, el servicio de monitoreo se habilitará al mismo tiempo que el inicio |
| Control de entrada* | Si permitir que el controlador controle la entrada del teléfono, como operaciones de pantalla táctil virtual con el ratón |
| Transferencia de archivos* | Si habilitar el permiso de transferencia de archivos, después del inicio, puede controlar remotamente el sistema de archivos de este teléfono |
| Captura de audio | Si compartir la música del sistema interno del teléfono (no entrada de micrófono) |

{{% notice note %}}
El * anterior representa permisos especiales. Para obtener tales permisos, debe saltar a la página de configuración del sistema Android para obtenerlos manualmente. Los detalles son los siguientes
{{% /notice %}}

#### Solicitud de permiso especial - Archivo

| Solicitar permisos de archivo de Android saltará automáticamente a la página de configuración del sistema |
| :---: |
| ![](/docs/en/client/android/images/get_file_en.jpg?width=300px) |

#### Solicitud de permiso especial - entrada de ratón
| Paso 1: Encuentre "Servicios instalados" | Paso 2: Inicie RustDesk Input |
| --- | --- |
| ![](/docs/en/client/android/images/get_input1_en.jpg?width=300px) | ![](/docs/en/client/android/images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
La página de configuración del sistema de diferentes proveedores puede ser diferente, ajústela según su página del sistema.
{{% /notice %}}

| Atajos de control de ratón remoto | Descripción |
| --- | --- |
| Clic derecho del ratón | Atrás |
| Clic de la rueda del ratón | Inicio |
| Presión larga de la rueda del ratón | Aplicaciones abiertas recientemente |
| Desplazamiento de la rueda del ratón | Simular deslizamiento vertical |

#### Iniciar servicio

Después de obtener el permiso `Captura de pantalla`, el servicio se iniciará automáticamente. También puede hacer clic en el botón `Iniciar servicio` para iniciar el servicio. Una vez iniciado el servicio, puede aceptar solicitudes de control de escritorio de otros dispositivos.

Si el permiso `Transferencia de archivos` está habilitado, también puede aceptar solicitudes de control de archivos de otros dispositivos.

Después de iniciar el servicio, se obtendrá automáticamente una ID única y una contraseña aleatoria para este dispositivo. Otros dispositivos pueden controlar el teléfono a través de la ID y contraseña, o confirmar manualmente al recibir una nueva solicitud.

| Antes de iniciar el servicio | Después de iniciar el servicio |
| --- | --- |
| ![](/docs/en/client/android/images/server_off_en.jpg?width=300px) | ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. Hacer clic en `Iniciar servicio` habilitará el permiso `Captura de pantalla` por defecto.
2. Cuando no se obtiene el permiso `Captura de pantalla`, otros dispositivos no pueden emitir solicitudes de control.
3. Excepto por el permiso `Captura de pantalla`, el cambio de otros permisos solo afectará las nuevas conexiones y no afectará la conexión establecida. Si necesita cambiar permisos para una conexión establecida, cierre primero la conexión actual, modifique los permisos y luego reciba una solicitud de control.
{{% /notice %}}

##### PC

![](/docs/en/client/android/images/android_server_pc_side_en.png?width=700px)

##### Terminal móvil

| Puede detener el servicio o cerrar la conexión especificada en cualquier momento | Puede recibir o iniciar chats |
| --- | --- |
| ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) | ![](/docs/en/client/android/images/android_server2_en.jpg?width=300px) |