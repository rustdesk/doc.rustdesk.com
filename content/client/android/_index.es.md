---
title: Controla tu Android 
weight: 4
---

### Comparte pantalla/archivos de tu teléfono Android
------

A partir de la versión 1.1.9, el cliente de Android ha agregado las funciones de compartir la pantalla del teléfono y compartir el sistema de archivos del teléfono.

- Se requiere Android 6 y superior para compartir pantalla
- Se requiere Android 10 o superior para compartir el audio interno del sistema del teléfono móvil
- iOS aún no admite compartir pantalla


#### **Solicitar permisos e iniciar servicios**

Haga clic en `Compartir pantalla` desde la barra de navegación inferior

Configure varios permisos según sea necesario. Cada vez que inicia RustDesk, debe solicitar los permisos de "Captura de pantalla" y "Control de entrada" nuevamente.

![](/docs/en/manual/mobile/images/server_off_en.jpg?width=300px)

| Permisos                   | Descripción                                               |
| -------------------------- | --------------------------------------------------------- |
| Captura de pantalla        | Ya sea para habilitar el permiso para compartir capturas de pantalla, el servicio de monitoreo se habilitará al mismo tiempo que se inicia |
| Control de entrada*        | Ya sea para permitir que el controlador controle la entrada del teléfono móvil, como la operación de pantalla táctil virtual con el mouse |
| Transferencia de archivos* | Ya sea para habilitar el permiso de transferencia de archivos, después del inicio, puede controlar de forma remota el sistema de archivos de este teléfono |
| Captura de audio           | Ya sea para compartir la música del sistema dentro del teléfono (sin entrada de micrófono) |

{{% notice note %}}
Arriba * representa permisos especiales. Para obtener dichos permisos, debe ir a la página de configuración del sistema Android para obtenerlos manualmente. Los detalles son los siguientes
{{% /notice %}}

#### **Solicitud de Permiso Especial - Archivo**

| Al solicitar permisos de archivo de Android, se saltará automáticamente a la página de configuración del sistema |
| :---------------: |
| ![](/docs/en/manual/mobile/images/get_file_en.jpg?width=300px) |

#### **Solicitud de permiso especial: entrada del mouse**
| Paso 1 Busque "Servicios instalados" | Paso 2 Inicie la entrada de RustDesk |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/get_input1_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
La página de configuración del sistema de diferentes proveedores puede ser diferente, ajústela de acuerdo con la página de su sistema
{{% /notice %}}

**Métodos abreviados de control remoto del ratón:**

- Hacer clic con el botón derecho del ratón: volver
- Haga clic en la rueda del mouse: Inicio
- Mantenga presionada la rueda del mouse: aplicaciones abiertas recientemente
- Desplazamiento de la rueda del mouse: simule el deslizamiento vertical

#### **Empieza el servicio**

Después de obtener la `screen capture` permiso, el servicio se iniciará automáticamente. También puede hacer clic en el `Start service` botón para iniciar el servicio. Una vez que se inicia el servicio, puede aceptar solicitudes de control de escritorio de otros dispositivos.

Si el `file transfer` el permiso está habilitado, también puede aceptar solicitudes de control de archivos de otros dispositivos.

Una vez iniciado el servicio, se obtendrá automáticamente una identificación única y una contraseña aleatoria para este dispositivo. Otros dispositivos pueden controlar el teléfono a través de la identificación y la contraseña, o confirmar manualmente cuando se recibe una nueva solicitud.

| Antes de iniciar el servicio | Después de iniciar el servicio |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/server_off_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. Haciendo clic `Start Service` habilitará el `Screen capture` permiso por defecto.
2. Cuando el `screen capture` no se obtiene el permiso, otros dispositivos no pueden emitir solicitudes de control.
3. Excepto por el `screen capture` permiso, el cambio de otros permisos solo afectará la nueva conexión y no afectará la conexión establecida. Si necesita cambiar los permisos para una conexión establecida, primero cierre la conexión actual, modifique los permisos y luego reciba una solicitud de control.
{{% /notice %}}

**PC:**

![](/docs/en/manual/mobile/images/android_server_pc_side_en.png?width=700px)

**Terminal móvil:**
| Puede detener el servicio o cerrar la conexión especificada en cualquier momento | Puedes recibir o iniciar chats |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/server_on_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/android_server2_en.jpg?width=300px) |
