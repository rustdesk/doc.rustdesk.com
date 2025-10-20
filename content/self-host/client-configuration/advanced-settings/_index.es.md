---
title: Configuración Avanzada
weight: 49
---

Todas las configuraciones avanzadas en clientes personalizados están cubiertas aquí.

## Niveles de Privilegio para Configuraciones

Hay cuatro tipos de configuraciones:

1. Configuraciones de anulación, en `Consola Web` → `Clientes Personalizados`
2. Configuraciones predeterminadas, en `Consola Web` → `Clientes Personalizados`
3. Configuraciones de usuario, en el cliente RustDesk
4. Configuraciones de estrategia, en `Consola Web` → `Estrategias`

La jerarquía de privilegios para estas configuraciones es la siguiente: `Anulación > Estrategia > Usuario > Predeterminado`.

## Configuración de Seguridad

### access-mode

Establece el modo de acceso (permisos) para conexiones entrantes.

**Ubicación**:

1. **Escritorio** Configuración → Seguridad → Permisos
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | custom, full, view | custom | `access-mode=custom` |

### enable-keyboard

Habilita entrada de teclado/ratón para conexiones entrantes.

**Ubicación**:

1. **Escritorio** Configuración → Seguridad → Permisos → Habilitar teclado
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-keyboard=Y` |

### enable-clipboard

Habilita copiar y pegar para conexiones entrantes.

**Ubicación**:

1. **Escritorio** Configuración → Seguridad → Permisos → Habilitar portapapeles
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-clipboard=Y` |

### enable-file-transfer

Habilita copia y pegado de archivos o transferencia de archivos (sesión) para conexiones entrantes.

**Ubicación**:

1. **Escritorio** Configuración → Seguridad → Permisos → Habilitar transferencia de archivos
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-file-transfer=Y` |

### enable-camera

Habilita cámara para conexiones entrantes.

**Ubicación**:

1. **Escritorio** Configuración → Seguridad → Permisos → Habilitar cámara
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-camera=Y` |

### enable-terminal

Habilitar terminal para conexiones entrantes.

**Ubicación**:

**Escritorio** Ajustes → Seguridad → Permisos → Habilitar terminal

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-terminal=Y` |

### enable-remote-printer

Habilita impresora remota para conexiones entrantes.

**Ubicación**:

1. **Windows** Configuración → Seguridad → Permisos → Habilitar impresora remota

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-printer=Y` |

### enable-audio

Habilita grabación de audio y transferencia al par.

**Ubicación**:

1. **Escritorio** Configuración → Seguridad → Permisos → Habilitar audio
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-audio=Y` |

### enable-tunnel

Habilita túnel TCP.

**Ubicación**:

1. **Escritorio** Configuración → Seguridad → Permisos → Habilitar túnel TCP
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-tunnel=Y` |

### enable-remote-restart

Habilita reinicio por el lado de control.

**Ubicación**:

1. **Escritorio** Configuración → Seguridad → Permisos → Habilitar reinicio remoto
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-restart=Y` |

### enable-record-session

Habilita grabación de sesiones.

**Ubicación**:

1. **Escritorio** Configuración → Seguridad → Permisos → Habilitar grabación de sesión
2. **Móvil** Configuración → Compartir pantalla → Habilitar grabación de sesión

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-record-session=Y` |

### enable-block-input

Habilita el lado de control para bloquear entrada de otros usuarios.

**Ubicación**:

1. **Escritorio** Configuración → Seguridad → Permisos → Habilitar bloqueo de entrada de usuario (solo Windows)
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-block-input=Y` |

### allow-remote-config-modification

Permite al lado de control cambiar configuraciones en la UI de RustDesk controlada.

**Ubicación**:

1. **Escritorio** Configuración → Seguridad → Permisos → Habilitar modificación de configuración remota
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remote-config-modification=Y` |

### enable-lan-discovery

Permite a pares LAN descubrirme.

Después del descubrimiento LAN, [WOL](https://en.wikipedia.org/wiki/Wake-on-LAN) puede funcionar si se soporta localmente.

**Ubicación**:

1. **Escritorio** Configuración → Seguridad → Seguridad → Denegar descubrimiento LAN
2. **Móvil** Configuración → Compartir pantalla → Denegar descubrimiento LAN

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| Y | Y, N | Y | `enable-lan-discovery=Y` |

### direct-server

Habilita acceso directo por IP.

**Ubicación**:

1. **Escritorio** Configuración → Seguridad → Seguridad → Habilitar acceso directo por IP
2. **Móvil** Configuración → Compartir pantalla → Acceso directo por IP

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `direct-server=Y` |

### direct-access-port

Puerto de acceso directo por IP.

**Ubicación**:

1. **Escritorio** Configuración → Seguridad → Seguridad → Puerto de acceso directo por IP (Mostrar si "Habilitar acceso directo por IP" está marcado)
2. **Móvil** Configuración → Compartir pantalla → Acceso directo por IP

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N |  | 21118 | `direct-access-port=21118` |

### whitelist

Usar lista blanca de IP.

**Ubicación**:

1. **Escritorio** Configuración → Seguridad → Seguridad → Usar lista blanca de IP
2. **Móvil** Configuración → Compartir pantalla → Usar lista blanca de IP

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | `,` o `<ip1>,<ip2>,<ip3>` | `,` significa sin filtro | `whitelist=,` |

### allow-auto-disconnect & auto-disconnect-timeout

Cierra automáticamente sesiones entrantes después de un período de inactividad del usuario.

**Ubicación**:

1. **Escritorio** Configuración → Seguridad → Seguridad → Cerrar automáticamente sesiones entrantes en inactividad del usuario
2. **Móvil** Configuración → Compartir pantalla → Cerrar automáticamente sesiones entrantes en inactividad del usuario

| Opción | Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: | :------: |
| allow-auto-disconnect | N | Y, N | N | `allow-auto-disconnect=Y` |
| auto-disconnect-timeout | N | Tiempo de espera en minutos | 10 | `auto-disconnect-timeout=10` |

### allow-only-conn-window-open

Solo permite conexión si la ventana de RustDesk está abierta.

**Ubicación**:

1. **Escritorio** Configuración → Seguridad → Seguridad → Solo permitir conexión si la ventana de RustDesk está abierta
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-only-conn-window-open=N` |

### approve-mode

Acepta conexiones entrantes vía contraseña o clic manual.

**Ubicación**:

1. **Escritorio** Configuración → Seguridad → Contraseña → Cuadro desplegable
2. **Móvil** Compartir pantalla → Menú desplegable arriba-derecha

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | password, click, password-click | password-click | `approve-mode=password-click` |

### verification-method

Qué tipo de contraseña se puede usar, `contraseña temporal` se refiere a la contraseña aleatoria de un solo uso.

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | use-temporary-password, use-permanent-password, use-both-passwords | use-both-passwords | `verification-method=use-permanent-password` |

### temporary-password-length

1. **Escritorio** Ajustes → Seguridad → Contraseña → Longitud de la contraseña de un solo uso
2. **Móvil** Compartir pantalla → Menú desplegable en la esquina superior derecha → Longitud de la contraseña de un solo uso

La longitud de la contraseña temporal.

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | 6, 8, 10 | 6 | `temporary-password-length=6` |

### proxy-url

La URL del proxy.

Actualmente soporta `http` y `socks5`.

**Ubicación**:

1. **Escritorio** Configuración → Red → Proxy → Proxy Socks5/Http(s)
2. **Móvil**

Ejemplos:

1. **http** `proxy-url=http://192.168.0.2:12345`
2. **https** `proxy-url=https://192.168.0.2:12345`
3. **socks5** `proxy-url=socks5://192.168.0.2:1080`

### proxy-username & proxy-password

Nombre de usuario y contraseña del proxy.

**Ubicación**:

1. **Escritorio** Configuración → Red → Proxy → Proxy Socks5/Http(s)
2. **Móvil**

| Opción | Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: | :------: |
| proxy-username | N | | | `proxy-username=user` |
| proxy-password | N | | | `proxy-password=pass` |

## Configuración General

### theme

Controla el tema de la UI del cliente RustDesk.

**Ubicación**:

1. **Escritorio** Configuración → General → Tema
2. **Móvil** Configuración → Configuración → Tema

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | dark, light, system | system | `theme=system` |

### lang

Controla el idioma del cliente RustDesk.

**Ubicación**:

1. **Escritorio** Configuración → General → Idioma
2. **Móvil** Configuración → Configuración → Idioma

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | default, ar, bg, ... | default | `lang=default` |

Los idiomas actualmente disponibles son:

ar, bg, ca, cs, da, de, el, en, eo, es, et, fa, fr, he, hr, hu, id, it, ja, ko, kz, lt, lv, nb, nl, pl, pt, ro, ru, sk, sl, sq, sr, sv, th, tr, uk, vn, zh-cn, zh-tw

Puedes revisar [LANGS](https://github.com/rustdesk/rustdesk/blob/master/src/lang.rs#L45) en el código para la lista de idiomas más reciente.

### allow-auto-record-incoming

Graba automáticamente sesiones entrantes.

**Ubicación**:

1. **Escritorio** Configuración → General → Grabación → Grabar automáticamente sesiones entrantes
2. **Móvil** Configuración → Grabación → Grabar automáticamente sesiones entrantes

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-incoming=Y` |

### allow-auto-record-outgoing

Graba automáticamente sesiones salientes.

**Ubicación**:

1. **Escritorio** Configuración → General → Grabación → Grabar automáticamente sesiones salientes
2. **Móvil** Configuración → Grabación → Grabar automáticamente sesiones salientes

| Instalación requerida | Valores | Predeterminado | Ejemplo | Versión |
| :------: | :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-outgoing=Y` | >= 1.3.2 |

### video-save-directory

El directorio para guardar videos grabados.

**Ubicación**:

1. **Escritorio** Configuración → General → Grabación → Directorio de guardado de video
2. **Móvil** Configuración → Grabación

Valores predeterminados:

1. **macOS** ~/Movies/**app_name**
2. **Linux** ~/Videos/**app_name**
3. **Windows** %USERPROFILE%\Videos\\**app_name**
4. **Android** /Storage/emulated/0/**app_name**/ScreenRecord

**Nota**: Reemplaza **app_name** con el nombre actual de la aplicación.

### enable-confirm-closing-tabs

Controla si mostrar un diálogo de confirmación antes de cerrar todas las pestañas remotas.

**Ubicación**:

1. **Escritorio** Configuración → General → Otro → Confirmar antes de cerrar múltiples pestañas
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-confirm-closing-tabs=Y` |

### enable-abr

Habilita bitrate adaptativo.

**Ubicación**:

1. **Escritorio** Configuración → General → Otro → Bitrate adaptativo
2. **Móvil** Configuración → Compartir pantalla → Bitrate adaptativo (beta)

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-abr=Y` |

### allow-remove-wallpaper

Remover fondo de pantalla durante sesiones entrantes.

**Ubicación**:

1. **Escritorio** Configuración → General → Otro → Remover fondo de pantalla durante sesiones entrantes
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remove-wallpaper=N` |

### enable-open-new-connections-in-tabs

Controla si usar una nueva pestaña o una nueva ventana para abrir una nueva conexión.

**Ubicación**:

1. **Escritorio** Configuración → General → Otro → Abrir conexión en nueva pestaña
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-open-new-connections-in-tabs=Y` |

### allow-always-software-render

Siempre usar renderizado por software.

**Ubicación**:

1. **Escritorio** Configuración → General → Otro → Siempre usar renderizado por software
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-always-software-render=N` |

### allow-linux-headless

Permitir conexión entrante si no hay pantallas.

Esta opción requiere entorno de escritorio, servidor Xorg y GDM, ver [PR 3902](https://github.com/rustdesk/rustdesk/pull/3902).

**Ubicación**:

1. **Escritorio** Configuración → General → Otro → Permitir Linux headless
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-linux-headless=N` |

### enable-hwcodec

Habilita codificación por hardware para hacer la imagen más fluida.

**Ubicación**:

1. **Escritorio**
2. **Móvil** Configuración → Codec de hardware

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-hwcodec=Y` |

### peer-card-ui-type

Controla la vista de tarjetas de pares, incluye "Mosaicos grandes", "Mosaicos pequeños" y "Lista".

**Ubicación**:

1. **Escritorio** Inicio → Panel de pares → Icono de cuadrícula arriba-derecha
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | 0, 1, 2 | 0 | `peer-card-ui-type=0` |

**0** Mosaicos grandes  
**1** Mosaicos pequeños  
**2** Lista

### peer-sorting

Controla el orden de las tarjetas de pares.

**Ubicación**:

1. **Escritorio** Inicio → Panel de pares → Icono de ordenar arriba-derecha
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Remote ID, Remote Host, Username | Remote ID | `peer-sorting=Remote ID` |

### sync-ab-with-recent-sessions

Controla si sincronizar la libreta de direcciones con sesiones recientes.

**Ubicación**:

1. **Escritorio** Inicio → Panel de pares → Libreta de direcciones → Etiquetas → Menú desplegable → Sincronizar con sesiones recientes
2. **Móvil** Inicio → Panel de pares → Libreta de direcciones → Etiquetas → Menú desplegable → Sincronizar con sesiones recientes

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-with-recent-sessions=N` |

### sync-ab-tags

Controla si ordenar las etiquetas de la libreta de direcciones.

**Ubicación**:

1. **Escritorio** Inicio → Panel de pares → Libreta de direcciones → Etiquetas → Menú desplegable → Ordenar etiquetas
2. **Móvil** Inicio → Panel de pares → Libreta de direcciones → Etiquetas → Menú desplegable → Ordenar etiquetas

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-tags=N` |

### filter-ab-by-intersection

Filtrar libreta de direcciones por intersección de etiquetas.

**Vista previa**: [PR #5985](https://github.com/rustdesk/rustdesk/pull/5985)

**Ubicación**:

1. **Escritorio** Inicio → Panel de pares → Libreta de direcciones → Etiquetas → Menú desplegable → Filtrar por intersección
2. **Móvil** Inicio → Panel de pares → Libreta de direcciones → Etiquetas → Menú desplegable → Filtrar por intersección

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `filter-ab-by-intersection=N` |

### use-texture-render

**Ubicación**:

**Escritorio** Ajustes → General → Otros → Usar renderizado de texturas

Use el renderizado de texturas para que las imágenes sean más suaves. Puede intentar deshabilitar esta opción si encuentra problemas de renderizado. Solo disponible en escritorio.

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | linux:Y, macOS:N, win7:N, win10+:Y | `use-texture-render=Y` |

### enable-udp-punch

**Ubicación**:

**Escritorio** Ajustes → General → Otros → Habilitar perforación de UDP
**Móvil** Ajustes → Habilitar perforación de UDP

Disponible desde RustDesk 1.4.1, RustDesk Server Pro 1.6.2

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | Y | `enable-udp-punch=N` |

### enable-ipv6-punch

**Ubicación**:

**Escritorio** Ajustes → General → Otros → Habilitar conexión P2P IPv6
**Móvil** Ajustes → General → Otros → Habilitar conexión P2P IPv6

Disponible desde RustDesk 1.4.1, RustDesk Server Pro 1.6.2

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | selfhost:N, de lo contrario:Y | `enable-ipv6-punch=N` |

## Ajustes de pantalla

### view-only

Esta opción establecerá la opción "solo vista" para cada par después de la primera conexión.

Luego la opción "solo vista" en las configuraciones de cada par controlará si la conexión es de solo vista.

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Otras opciones predeterminadas → Modo de vista
2. **Móvil** Configuración → Configuración de pantalla → Otras opciones predeterminadas → Modo de vista

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `view-only=Y` |

### show-monitors-toolbar

Controla si mostrar monitores en la barra de herramientas.

![show-monitors-toolbar](/docs/en/self-host/client-configuration/advanced-settings/images/show-monitors-toolbar.png)

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Otras opciones predeterminadas → Mostrar barra de herramientas de monitores
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-monitors-toolbar=Y` |

### collapse-toolbar

Controla si la barra de herramientas remota se colapsa después de conectar.

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Otras opciones predeterminadas → Colapsar barra de herramientas
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `collapse-toolbar=Y` |

### show-remote-cursor

Esta opción establecerá la opción "mostrar cursor remoto" para cada par después de la primera conexión.

Luego la opción "mostrar cursor remoto" en las configuraciones de cada par controlará si el cursor remoto se muestra en la página de control remoto.

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Otras opciones predeterminadas → Mostrar cursor remoto
2. **Móvil** Configuración → Configuración de pantalla → Otras opciones predeterminadas → Mostrar cursor remoto

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-remote-cursor=N` |

### follow-remote-cursor

Esta opción establecerá la opción "seguir cursor remoto" para cada par después de la primera conexión.

Luego la opción "seguir cursor remoto" en las configuraciones de cada par controlará si seguir el cursor remoto.

**Vista previa**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Otras opciones predeterminadas → Seguir cursor remoto
2. **Móvil** Configuración → Configuración de pantalla → Otras opciones predeterminadas → Seguir cursor remoto

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-cursor=Y` |

### follow-remote-window

Esta opción establecerá la opción "seguir ventana remota" para cada par después de la primera conexión.

Luego la opción "seguir ventana remota" en las configuraciones de cada par controlará si seguir la ventana remota.

**Vista previa**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Otras opciones predeterminadas → Seguir foco de ventana remota
2. **Móvil** Configuración → Configuración de pantalla → Otras opciones predeterminadas → Seguir foco de ventana remota

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-window=Y` |

### zoom-cursor

Esta opción establecerá la opción "zoom cursor" para cada par después de la primera conexión.

La opción "zoom cursor" en las configuraciones de cada par controlará luego si el cursor se escala basado en la escala de imagen actual.

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Otras opciones predeterminadas → Zoom cursor
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `zoom-cursor=Y` |

### show-quality-monitor

Esta opción establecerá la opción "mostrar monitor de calidad" para cada par después de la primera conexión.

La opción "mostrar monitor de calidad" en las configuraciones de cada par controlará luego si mostrar el monitor de calidad.

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Otras opciones predeterminadas → Mostrar monitor de calidad
2. **Móvil** Configuración → Configuración de pantalla → Otras opciones predeterminadas → Mostrar monitor de calidad

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-quality-monitor=Y` |

### disable-audio

Esta opción establecerá la opción "deshabilitar audio" para cada par después de la primera conexión.

La opción "deshabilitar audio" en las configuraciones de cada par controlará luego si reproducir sonido.

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Otras opciones predeterminadas → Silenciar
2. **Móvil** Configuración → Configuración de pantalla → Otras opciones predeterminadas → Silenciar

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-audio=Y` |

### enable-file-copy-paste

Esta opción establecerá la opción "habilitar copiar y pegar archivos" para cada par después de la primera conexión.

La opción "habilitar copiar y pegar archivos" en las configuraciones de cada par controlará luego si habilitar copiar y pegar archivos en la conexión.

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Otras opciones predeterminadas → Habilitar copiar y pegar archivos (solo Windows)
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `enable-file-copy-paste=Y` |

### disable-clipboard

Esta opción establecerá la opción "deshabilitar portapapeles" para cada par después de la primera conexión.

La opción "deshabilitar portapapeles" en las configuraciones de cada par controlará luego si habilitar copiar y pegar texto.

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Otras opciones predeterminadas → Deshabilitar portapapeles
2. **Móvil** Configuración → Configuración de pantalla → Otras opciones predeterminadas → Deshabilitar portapapeles

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-clipboard=Y` |

### lock-after-session-end

Esta opción establecerá la opción "bloquear después del fin de sesión" para cada par después de la primera conexión.

La opción "bloquear después del fin de sesión" en las configuraciones de cada par controlará luego si bloquear la máquina par después de que termine la sesión.

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Otras opciones predeterminadas → Bloquear después del fin de sesión
2. **Móvil** Configuración → Configuración de pantalla → Otras opciones predeterminadas → Bloquear después del fin de sesión

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `lock-after-session-end=Y` |

### privacy-mode

Esta opción establecerá la opción "modo privacidad" para cada par después de la primera conexión.

La opción "modo privacidad" en las configuraciones de cada par controlará luego si usar modo privacidad después de conectar.

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Otras opciones predeterminadas → Modo privacidad
2. **Móvil** Configuración → Configuración de pantalla → Otras opciones predeterminadas → Modo privacidad

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `privacy-mode=Y` |

### i444

Esta opción establecerá la opción "i444" para cada par después de la primera conexión.

La opción "i444" en las configuraciones de cada par controlará luego si usar color verdadero.

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Otras opciones predeterminadas → Color verdadero (4:4:4)
2. **Móvil** Configuración → Configuración de pantalla → Otras opciones predeterminadas → Color verdadero (4:4:4)

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `i444=Y` |

### reverse-mouse-wheel

Esta opción establecerá la opción "invertir rueda del ratón" para cada par después de la primera conexión.

La opción "invertir rueda del ratón" en las configuraciones de cada par controlará luego si invertir la rueda del ratón.

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Otras opciones predeterminadas → Invertir rueda del ratón
2. **Móvil** Configuración → Configuración de pantalla → Otras opciones predeterminadas → Invertir rueda del ratón

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `reverse-mouse-wheel=Y` |

### swap-left-right-mouse

Esta opción establecerá la opción "intercambiar botón izquierdo-derecho del ratón" para cada par después de la primera conexión.

La opción "intercambiar botón izquierdo-derecho del ratón" en las configuraciones de cada par controlará luego si intercambiar el botón izquierdo-derecho del ratón.

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Otras opciones predeterminadas → Intercambiar botón izquierdo-derecho del ratón
2. **Móvil** Configuración → Configuración de pantalla → Otras opciones predeterminadas → Intercambiar botón izquierdo-derecho del ratón

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `swap-left-right-mouse=Y` |

### displays-as-individual-windows

Esta opción establecerá la opción "pantallas como ventanas individuales" para cada par después de la primera conexión.

La opción "pantallas como ventanas individuales" en las configuraciones de cada par controlará luego si mostrar pantallas como ventanas individuales.

**Vista previa**: [PR 5945](https://github.com/rustdesk/rustdesk/pull/5945)

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Otras opciones predeterminadas → Mostrar pantallas como ventanas individuales
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `displays-as-individual-windows=Y` |

### use-all-my-displays-for-the-remote-session

Esta opción establecerá la opción "use-all-my-displays-for-the-remote-session" para cada par después de la primera conexión.

La opción "use-all-my-displays-for-the-remote-session" en la configuración de cada par controlará si se usarán todas mis pantallas para la sesión remota.

**Ubicación**:

1. **Escritorio** Ajustes → Pantalla → Otras opciones predeterminadas → Usar todas mis pantallas para la sesión remota
2. **Móvil** Ajustes → Ajustes de pantalla → Otras opciones predeterminadas → Usar todas mis pantallas para la sesión remota

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `use-all-my-displays-for-the-remote-session=Y` |

### view-style

Esta opción establecerá la opción "view-style" para cada par después de la primera conexión.

La opción "view-style" en las configuraciones de cada par controlará luego el estilo de vista.

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Estilo de vista predeterminado
2. **Móvil** Configuración → Configuración de pantalla → Estilo de vista predeterminado

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | original, adaptive | original | `view-style=original` |

### scroll-style

Esta opción establecerá la opción "estilo de scroll" para cada par después de la primera conexión.

La opción "estilo de scroll" en las configuraciones de cada par controlará luego el estilo de scroll.

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Estilo de scroll predeterminado
2. **Móvil**

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | scrollauto, scrollbar | scrollauto | `scroll-style=scrollauto` |

### image-quality

Esta opción establecerá la opción "calidad de imagen" para cada par después de la primera conexión.

La opción "calidad de imagen" en las configuraciones de cada par controlará luego la calidad de imagen.

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Calidad de imagen predeterminada
2. **Móvil** Configuración → Configuración de pantalla → Calidad de imagen predeterminada

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | best, balanced, low, custom | balanced | `image-quality=balanced` |

### custom-image-quality

Esta opción establecerá la opción "calidad de imagen personalizada" para cada par después de la primera conexión.

La opción "calidad de imagen personalizada" en las configuraciones de cada par controlará luego la calidad de imagen si "calidad de imagen" está establecida en personalizada.

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Calidad de imagen predeterminada → Personalizada
2. **Móvil** Configuración → Configuración de pantalla → Calidad de imagen predeterminada → Personalizada

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | [10.0, 2000.0] | 50.0 | `custom-image-quality=50` |

### custom-fps

Esta opción establecerá la opción "fps personalizado" para cada par después de la primera conexión.

La opción "fps personalizado" en las configuraciones de cada par controlará luego los fps si "calidad de imagen" está establecida en personalizada.

**Ubicación**:

1. **Escritorio** Configuración → Pantalla → Calidad de imagen predeterminada → Personalizada
2. **Móvil** Configuración → Configuración de pantalla → Calidad de imagen predeterminada → Personalizada

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | [5, 120] | 30 | `custom-fps=30` |

### codec-preference

Esta opción establecerá la opción "codec-preference" para cada par después de la primera conexión.

La opción "codec-preference" en la configuración de cada par controlará el códec para la imagen.

**Precaución**: Las opciones que no sean "vp8" y "vp9" pueden no funcionar. Esto depende de lo que admita su máquina.

### terminal-persistent

Esta opción establecerá la opción "terminal-persistent" para cada par después de la primera conexión.

La opción "terminal-persistent" en la configuración de cada par controlará si se mantienen las sesiones de terminal al desconectar.

**Ubicación**:

1. **Escritorio** Ajustes → Pantalla → Otras opciones predeterminadas → Mantener sesiones de terminal al desconectar
2. **Móvil** Ajustes → Ajustes de pantalla → Otras opciones predeterminadas → Mantener sesiones de terminal al desconectar

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `terminal-persistent=Y` |

### trackpad-speed

Esta opción establecerá la opción "trackpad-speed" para cada par después de la primera conexión.

La opción "trackpad-speed" en la configuración de cada par controlará los fps si "trackpad-speed" se establece en personalizado.

**Ubicación**:

1. **Escritorio** Ajustes → Pantalla → Velocidad predeterminada del trackpad
2. **Móvil** Ajustes → Ajustes de pantalla → Velocidad predeterminada del trackpad

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | [10, 1000] | 100 | `trackpad-speed=100` |

## Otros

### preset-address-book-name & preset-address-book-tag & preset-address-book-alias & preset-address-book-password & preset-address-book-note

Nombre de libreta de direcciones, etiqueta de dispositivo, alias de dispositivo, contraseña de dispositivo, nota de dispositivo preestablecidos, https://github.com/rustdesk/rustdesk-server-pro/issues/257.
Puedes establecer preset-address-book-name solamente si no quieres establecer etiqueta.
Por favor usa un nombre y etiqueta de libreta de direcciones válidos en tu página de libreta de direcciones de consola web.

| Opción | Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: | :------: |
| preset-address-book-name | N | | | `preset-address-book-name=<nombre de libreta de direcciones>` |
| preset-address-book-tag | N | | | `preset-address-book-tag=<nombre de etiqueta de libreta de direcciones>` |
| preset-address-book-alias | N | | | `preset-address-book-alias=<alias de dispositivo>` |
| preset-address-book-password | N | | | `preset-address-book-password=<contraseña de dispositivo>` |
| preset-address-book-note | N | | | `preset-address-book-note=<nota de dispositivo>` |

preset-address-book-alias, preset-address-book-password, preset-address-book-note están disponibles en cliente RustDesk >=1.4.3, pro >= 1.6.6.

### disable-group-panel

Deshabilita panel de grupo (junto al panel de libreta de direcciones, se llama "Dispositivos accesibles" desde 1.3.8) en cliente RustDesk, https://github.com/rustdesk/rustdesk-server-pro/issues/250.

| Opción | Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: | :------: |
| disable-group-panel | N | Y, N | N | `disable-group-panel=Y` |

### pre-elevate-service

Elevación automática al ejecutar para Windows portable, https://github.com/rustdesk/rustdesk-server-pro/issues/252.

| Opción | Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: | :------: |
| pre-elevate-service | N | Y, N | N | `pre-elevate-service=Y` |

### disable-floating-window

Cuando el servicio Android inicia, mostrará una ventana flotante, lo cual ayuda a prevenir que el sistema mate el servicio RustDesk.

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `disable-floating-window=Y` |

### floating-window-size

Cuando el servicio Android inicia, mostrará una ventana flotante, lo cual ayuda a prevenir que el sistema mate el servicio RustDesk. Cuando el tamaño es menor a 120, la ventana flotante será difícil de hacer clic. Un tamaño muy pequeño puede no ser capaz de mantener el servicio en segundo plano en algunos dispositivos.

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| [32, 320] | 120 | `floating-window-size=120` |

### floating-window-untouchable

Por defecto, hacer clic en la ventana flotante hará aparecer un menú. Después de establecerla como 'intocable', hacer clic o deslizar pasará a través de la ventana flotante y se transmitirá a la ventana subyacente. Después de ser establecida como 'intocable', la posición de la ventana flotante no puede cambiarse, y el sistema puede establecer automáticamente la ventana flotante como semi-transparente. Sin embargo, esta característica puede no funcionar en un pequeño número de aplicaciones, como la app GitHub.

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `floating-window-untouchable=Y` |

### floating-window-transparency

Las ventanas flotantes Android tienen transparencia ajustable. Si quieres habilitar pero ocultar la ventana flotante, puedes establecer la transparencia en 0, la ventana flotante se establecerá automáticamente como 'intocable' para pasar eventos de clic.

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| [0, 10] | 10 | `floating-window-transparency=5` |

### floating-window-svg

Si no se establece un icono para la ventana flotante Android, mostrará por defecto el icono RustDesk.
Al establecer, por favor escribe el contenido de texto SVG en una línea, y presta atención a las [limitaciones de soporte SVG](https://bigbadaboom.github.io/androidsvg/index.html).

| Predeterminado | Ejemplo |
| :------: | :------: |
| Icono RustDesk | `floating-window-svg=<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1717559129252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4248" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M950.857143 512c0 242.285714-196.571429 438.857143-438.857143 438.857143S73.142857 754.285714 73.142857 512 269.714286 73.142857 512 73.142857s438.857143 196.571429 438.857143 438.857143z" fill="#1296db" p-id="4249"></path></svg>` |

### keep-screen-on

Esto es para el lado controlado Android. Nota que mantener la pantalla encendida depende de la ventana flotante.

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| never, during-controlled, service-on | during-controlled | `keep-screen-on=never` |

### enable-directx-capture

Esto es para el lado controlado Windows. Si no encuentras ningún problema, se recomienda usar la configuración predeterminada, que prioriza usar DirectX para capturas de pantalla en lugar de usar GDI directamente.

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | Y | `enable-directx-capture=N` |

### enable-android-software-encoding-half-scale

Esto es para el lado controlado Android. Por defecto, cuando la resolución es mayor a 1200, la codificación por hardware usa la resolución original, mientras que la codificación por software usa la mitad de la resolución, ya que la codificación por software es más lenta. Esta opción se usa para establecer si la codificación por software debe escalarse a la mitad de la resolución.

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | Y | `enable-android-software-encoding-half-scale=N` |

### allow-remote-cm-modification

Controla si permitir al lado de control hacer clic en la ventana de gestión de conexión para aceptar conexiones, cambiar permisos, etc.

https://github.com/rustdesk/rustdesk/issues/7425

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `allow-remote-cm-modification=Y` |

### remove-preset-password-warning

Controla si remover la advertencia de seguridad en GUI cuando hay contraseña preestablecida en cliente personalizado.

https://github.com/rustdesk/rustdesk-server-pro/discussions/286

https://github.com/rustdesk/rustdesk/discussions/7956

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | Y | `remove-preset-password-warning=Y` |

### hide-security-settings / hide-network-settings / hide-server-settings / hide-proxy-settings / hide-websocket-settings / hide-remote-printer-settings

Controla si ocultar algunas configuraciones. Por favor asegúrate de que `Deshabilitar configuraciones` esté desactivado, de lo contrario estas no funcionarán.

https://github.com/rustdesk/rustdesk-server-pro/issues/263

https://github.com/rustdesk/rustdesk-server-pro/issues/276

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `hide-security-settings=Y` |

### hide-username-on-card

Controla si mostrar nombre de usuario en la lista de dispositivos. Porque a veces, el nombre de usuario es demasiado largo, ocultará la otra información.

https://github.com/rustdesk/rustdesk-server-pro/issues/284#issuecomment-2216521407

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `hide-username-on-card=Y` |

### hide-help-cards

Controla si mostrar advertencias UAC / permisos en GUI.

https://github.com/rustdesk/rustdesk/issues/8687

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `hide-help-cards=Y` |

### display-name

Cambia tu nombre de pantalla que se mostrará en el popup cuando te conectes a dispositivo remoto. Por defecto muestra primero el nombre del usuario logueado, de lo contrario muestra tu nombre de usuario del SO.

https://github.com/rustdesk/rustdesk-server-pro/issues/277

### disable-udp

Controla si usar solo TCP. No usará más UDP 21116, TCP 21116 se usará en su lugar.

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `disable-udp=Y` |

### preset-user-name / preset-strategy-name / preset-device-group-name / preset-device-username / preset-device-name / preset-note

Asigna usuario / estrategia / grupo de dispositivo / nombre de usuario de dispositivo / nombre de dispositivo(hostname) / nota a dispositivo. También puedes hacer esto vía [línea de comandos](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/#assign-device-usersgroupsstrategies-to-devices).

https://github.com/rustdesk/rustdesk-server-pro/discussions/304

grupo de dispositivo está disponible en cliente RustDesk >=1.3.8, pro >= 1.5.0

preset-device-username, preset-device-name, preset-note están disponibles en cliente RustDesk >=1.4.3, pro >= 1.6.6.

### default-connect-password

Usas la `contraseña de conexión predeterminada` para establecer conexiones a dispositivos remotos. Esta contraseña se configura en el lado de control y no debe confundirse con ninguna [contraseña preestablecida](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-can-we-set-up-a-client-with-a-fixed-password-for-unattended-remote-access) encontrada en el cliente controlado (solo entrante).

ej. `default-connect-password=abcd1234`

### enable-trusted-devices

Permite a dispositivos de confianza omitir verificación 2FA.

https://github.com/rustdesk/rustdesk/discussions/8513#discussioncomment-10234494

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | Y | `enable-trusted-devices=N` |

### hide-tray

Deshabilita el icono de bandeja en la bandeja del sistema.

https://github.com/rustdesk/rustdesk-server-pro/issues/332

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `hide-tray=Y` |

### one-way-clipboard-redirection

Deshabilita sincronización de portapapeles del lado controlado al lado de control, disponible en cliente RustDesk >=1.3.1 (lado controlado)

https://github.com/rustdesk/rustdesk/discussions/7837

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `one-way-clipboard-redirection=Y` |

### one-way-file-transfer

Deshabilita transferencia de archivos del lado controlado al lado de control, disponible en cliente RustDesk >=1.3.1 (lado controlado)

https://github.com/rustdesk/rustdesk/discussions/7837

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `one-way-file-transfer=Y` |

### sync-init-clipboard

Si sincronizar portapapeles inicial al establecer conexión (solo del lado de control al lado controlado), disponible en cliente RustDesk >=1.3.1 (lado de control)

https://github.com/rustdesk/rustdesk/discussions/9010

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `sync-init-clipboard=Y` |

### allow-logon-screen-password

Si permitir entrada de contraseña en pantalla de inicio de sesión cuando se usa [modo de aprobación solo clic](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#approve-mode), disponible en cliente RustDesk >=1.3.1 (lado controlado)

https://github.com/rustdesk/rustdesk/discussions/9269

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `allow-logon-screen-password=Y` |

### allow-https-21114

Típicamente, HTTPS usa puerto 443. Cuando el puerto del servidor API está incorrectamente establecido en 21114, el cliente RustDesk removerá por defecto la configuración de puerto 21114. Establecer la opción en Y permite el uso de 21114 como puerto HTTPS. Disponible en cliente RustDesk >=1.3.9.

https://github.com/rustdesk/rustdesk-server-pro/discussions/570

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `allow-https-21114=Y` |

### allow-d3d-render

El renderizado D3D puede obtener FPS alto y reducir el uso de cpu, pero la pantalla de control remoto puede estar negra en algunos dispositivos. Disponible en cliente RustDesk >=1.3.9, solo windows.

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `allow-d3d-render=Y` |

### allow-hostname-as-id

[Usar hostname como id](https://github.com/rustdesk/rustdesk-server-pro/discussions/483), espacios en el hostname se reemplazan con '-'. Esto no está 100% garantizado y solo ocurre la primera vez que se ejecuta el cliente RustDesk (es decir, en un cliente recién instalado); si ocurre un conflicto, se asignará un ID aleatorio.

Disponible en cliente RustDesk versión 1.4.0 y posterior.

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `allow-hostname-as-id=Y` |

### allow-websocket

Usar protocolo WebSocket para conectar servidor y cliente. Solo disponible en cliente RustDesk >=1.4.0 y servidor Pro >= 1.5.7. Nota que WebSocket solo soporta conexión relay.

Para hacer funcionar WebSocket, necesitas configurar tu proxy reverso correctamente, https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `allow-websocket=Y` |

### allow-numeric-one-time-password

Esta opción habilita o deshabilita el uso de contraseñas de un solo uso solo numéricas.
Solo disponible en cliente RustDesk >=1.4.1 y servidor Pro >= 1.5.9.

**Discusión**: https://github.com/rustdesk/rustdesk-server-pro/discussions/685

**Vista previa**: https://github.com/rustdesk/rustdesk/pull/11846

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `allow-numeric-one-time-password=Y` |

### register-device

No registrar el dispositivo, no lo verás en la página de dispositivos en consola web.

**Solo disponible en servidor Pro >= 1.6.0 y requiere [licencia custom2](https://rustdesk.com/pricing#custom2) y número de conexiones concurrentes >= 2.**

Si `register-device=N`, lo siguiente no funcionará para este dispositivo.
- Iniciar sesión
- Comando `--assign`
- `preset-address-book-name`, `preset-address-book-tag`, `preset-address-book-alias`, `preset-address-book-password`, `preset-address-book-note` `preset-user-name`, `preset-strategy-name`, `preset-device-group-name`, `preset-device-username`, `preset-device-name`, `preset-note`
- Registros de auditoría
- Estrategia

**Discusión**: https://github.com/rustdesk/rustdesk-server-pro/discussions/672 y https://github.com/rustdesk/rustdesk-server-pro/discussions/182

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | Y | `register-device=N` |

### main-window-always-on-top

Mantener siempre la ventana principal en la parte superior.

**Discusión**: https://github.com/rustdesk/rustdesk-server-pro/issues/761

Solo disponible en el cliente RustDesk 1.4.2.

| Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `main-window-always-on-top=N` |

### relay-server

https://github.com/rustdesk/rustdesk-server-pro/issues/776#issuecomment-3306524913

### disable-discovery-panel

Desactivar el panel "Descubierto" (junto al panel "Favoritos") en el cliente RustDesk.

| Opción | Instalación requerida | Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: | :------: | :------: |
| disable-discovery-panel | N | Y, N | N | `disable-discovery-panel=Y` |

### touch-mode

Controla si se debe usar el modo táctil o el modo ratón durante las sesiones de control remoto.

#### Diferencias de comportamiento según la versión

##### RustDesk (lado controlador) < 1.4.3

Tras la primera conexión, esta opción establece la configuración "touch-mode" para cada peer. A partir de entonces, las configuraciones individuales de cada peer determinan si se usa el modo táctil o el modo ratón.

**Ubicación**:

1. **Escritorio**
2. **Móvil** Configuración → Pantalla → Otras opciones predeterminadas → Modo táctil

##### RustDesk (lado controlador) >= 1.4.3

Esta opción controla de forma uniforme si todos los dispositivos peer usan el modo táctil o el modo ratón, sobrescribiendo las configuraciones individuales de cada dispositivo.

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `touch-mode=Y` |

### show-virtual-mouse

https://github.com/rustdesk/rustdesk/pull/12911

Controla la visualización del ratón virtual cuando móvil → escritorio.

**Ubicación**:

1. **Escritorio**
2. **Móvil** Sesión remota → barra de navegación inferior → ayuda de gestos

Disponible desde RustDesk 1.4.3

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `show-virtual-mouse=Y` |

**Nota**: Esta opción debe configurarse en **Default settings** en lugar de en **Override settings**.

### show-virtual-joystick

https://github.com/rustdesk/rustdesk/pull/12911

Controla la visualización del joystick virtual cuando móvil → escritorio.

Esta opción requiere que **show-virtual-mouse** esté habilitado.

**Ubicación**:

1. **Escritorio**
2. **Móvil** Sesión remota → barra de navegación inferior → ayuda de gestos

Disponible desde RustDesk 1.4.3

| Valores | Predeterminado | Ejemplo |
| :------: | :------: | :------: |
| Y, N | N | `show-virtual-joystick=Y` |

**Nota**: Esta opción debe configurarse en **Default settings** en lugar de en **Override settings**.
