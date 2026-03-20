---
title: Mac 
weight: 3
description: "Documentación de RustDesk sobre Mac. Consulta guías de instalación, configuración, despliegue y solución de problemas."
keywords: ["rustdesk mac", "rustdesk macos", "rustdesk mac install", "rustdesk screen recording permission", "rustdesk accessibility permission", "rustdesk mac remote control"]
---

## ¿Que necesita RustDesk en macOS?

En macOS no basta con instalar la app. Para controlar correctamente otro Mac, normalmente debes mover RustDesk a `Applications`, permitir su ejecucion y conceder `Accessibility`, `Screen Recording` y, en algunos casos, `Input Monitoring`.

## Respuestas rapidas para macOS

- Instala RustDesk desde el `.dmg` en `Applications`.
- Si Gatekeeper bloquea la app, autorizala en la configuracion de seguridad de macOS.
- Concede `Accessibility` y `Screen Recording` para el control remoto.
- Si el teclado o el raton siguen sin funcionar, concede tambien `Input Monitoring`.
- Si restablecer permisos no basta, reinicia el Mac.

## ¿Que permisos de macOS importan mas?

| Permiso | Para que sirve |
| --- | --- |
| Accessibility | Permite a RustDesk controlar teclado y raton |
| Screen Recording | Permite a RustDesk capturar la pantalla local |
| Input Monitoring | Se necesita en versiones recientes de macOS cuando la captura de entrada local sigue fallando |

## Instalación

Abra el archivo .dmg y arrastre `RustDesk` a `Aplicaciones` como se muestra a continuación.

![](/docs/en/client/mac/images/dmg.png)

Asegúrese de haber cerrado todas las instancias de RustDesk en ejecución. También asegúrese de salir del servicio RustDesk que se muestra en la bandeja del sistema.

![](/docs/en/client/mac/images/tray.png)

## Permitir la ejecución de RustDesk

| Desbloquear para cambiar | Haga clic en `App Store y desarrolladores identificados` |
| --- | --- |
| ![](/docs/en/client/mac/images/allow2.png) | ![](/docs/en/client/mac/images/allow.png) |

## Habilitar permisos

{{% notice note %}}
Debido al cambio en la política de seguridad de macOS, nuestra API que captura la entrada en el lado local ya no funciona. Debe habilitar el permiso "Supervisión de entrada" en el lado local de Mac.
Por favor siga esto
[https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923).

En la versión 1.2.4, puede probar `Input source 2` que se puede ver haciendo clic en el icono del teclado en la barra de herramientas.
{{% /notice %}}

Para capturar la pantalla, debe otorgar a RustDesk el permiso de **Accesibilidad** y el permiso de **Grabación de pantalla**. RustDesk lo guiará a la ventana de configuración.

| Ventana de RustDesk | Ventana de configuración |
| --- | --- |
| ![](/docs/en/client/mac/images/acc.png) | ![](/docs/en/client/mac/images/acc3.png?v2) |

Si lo ha habilitado en la ventana de configuración, pero RustDesk aún muestra una advertencia. Por favor elimine `RustDesk` de las ventanas de configuración con el botón `-`, y haga clic en el botón `+`, seleccione `RustDesk` en `Aplicaciones`.

{{% notice note %}}
[https://github.com/rustdesk/rustdesk/issues/3261](https://github.com/rustdesk/rustdesk/issues/3261) <br>
Otros intentos sin éxito: <br>
`tccutil reset ScreenCapture com.carriez.RustDesk` <br>
`tccutil reset Accessibility com.carriez.RustDesk` <br>
Aún se requiere reiniciar.
{{% /notice %}}

| Botones `-` y `+` | Seleccione `RustDesk` |
| --- | --- |
| ![](/docs/en/client/mac/images/acc2.png) | ![](/docs/en/client/mac/images/add.png?v2) |

Por favor copie los pasos anteriores para el permiso de **Grabación de pantalla**.

![](/docs/en/client/mac/images/screen.png?v2)