---
title: Windows Portable Elevation
weight: 49
description: "Documentación de RustDesk sobre Windows Portable Elevation. Consulta guías de instalación, configuración, despliegue y solución de problemas."
keywords: ["rustdesk portable elevation", "rustdesk uac", "rustdesk windows admin rights", "rustdesk task manager mouse issue", "rustdesk request elevation"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Respuesta rápida

Use la elevación portátil cuando ejecute el cliente portable de RustDesk pero aún necesite privilegios de administrador para tareas específicas o acciones en el equipo controlado. Es útil cuando no se instala el cliente completo pero sigue haciendo falta soporte remoto elevado.

## Puntos clave

- Decida si la elevación es necesaria al inicio o solo durante la sesión
- Pruebe tanto los avisos en el equipo controlado como en el equipo controlador
- Explique al personal de soporte el flujo de elevación antes del despliegue

<!-- GEO-LOCALIZED-INTRO:END -->

Los programas portables de Windows no tienen privilegios de administrador, esto puede causar los siguientes problemas:

- La pantalla no puede ser transmitida mientras se muestra la pantalla de UAC (User Account Control).
- cuando alguna ventana de alguna aplicación ejecutada con derechos de administrador esta abierta, el puntero no responderá al control remoto.

Mediante la elevación de privilegios, RustDesk puede crear un proceso con privilegios de administrador al iniciar el equipo o al sesión de usuario de esta manera evita los problemas antes mencionados.

## Elevación al encendido del equipo

Mediante estos métodos, los usuarios remotos no necesitan pedir la elevación de permisos cuando se conectan

* Método 1: Agrega `-qs-` o `-qs.exe` o `_qs.exe` al nombre del ejecutable portable (>= 1.4.6), o termina con `qs.exe` (1.2.0 ~ 1.4.5). Ejecuta el archivo y da en `Aceptar` en la ventana de UAC

* Método 2: Click secundario y ejecutar como administrador


## Elevar en el lado controlado

El lado controlado puede hacer click en `Aceptar y Elevar` cuando se este conectando o hacer click en `Elevate` una vez este conectado.

| Conectando | Conectado |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/cm_unauth.jpg) | ![](/docs/en/client/windows/windows-portable-elevation/images/cm_auth.jpg) |

## Pide la elevación de permisos del lado controlador

En el menú de acciones, selecciona `Solicitar Elevación`. Si el usuario remoto tiene privilegios de administrador, elige `Preguntar al remoto por autenticación`. Si utiliza una cuenta estándar de Windows, elige `Transmitir el nombre de usuario y contraseña del administrador` e introduce las credenciales de administrador en el equipo desde el que te conectas. Puedes hacerlo al conectarte, antes de abrir una aplicación como administrador. **En ambos casos, alguien debe responder al aviso de UAC de RustDesk en el equipo remoto.**

| Menu | Dialogo |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/menu.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/dialog.png) |
| **Wait** | **Success** |
| ![](/docs/en/client/windows/windows-portable-elevation/images/wait.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/success.png) |

### Avisos de UAC de las aplicaciones y de RustDesk

Al ejecutar una aplicación como administrador y al elevar los privilegios de RustDesk, Windows muestra dos avisos de UAC distintos. Si el aviso de la aplicación ya está abierto cuando solicitas la elevación de RustDesk, pide al usuario remoto que responda primero al de la aplicación.

1. En el **aviso de la aplicación** (por ejemplo, **Procesador de comandos de Windows**), pulsa **Sí** para ejecutarla como administrador o **No** para cancelar.
2. En el **aviso de `rustdesk.exe`**, pulsa **Sí** para elevar los privilegios de RustDesk. Si Windows solicita credenciales de administrador, introdúcelas antes de confirmar.

Una vez elevados los privilegios de RustDesk, puedes responder a los avisos de UAC y pulsar los botones que requieren permisos de administrador desde el equipo de control. Si el usuario remoto canceló el inicio de la aplicación, ahora puedes volver a abrirla como administrador.

### Si el aviso de UAC de RustDesk vuelve a pedir credenciales

RustDesk utiliza las credenciales que envías para iniciar un proceso auxiliar con la cuenta de administrador. Cuando ese proceso solicita la elevación, Windows aplica la directiva **Control de cuentas de usuario: comportamiento de la solicitud de elevación para los administradores en Modo de aprobación de administrador**. En la directiva de grupo, la encontrarás en **Configuración del equipo → Directivas → Configuración de Windows → Configuración de seguridad → Directivas locales → Opciones de seguridad**.

Con la opción **Solicitar credenciales en el escritorio seguro**, alguien debe introducir las credenciales de administrador en el aviso de UAC de `rustdesk.exe` en el equipo remoto, aunque ya las hayas enviado desde el equipo de control. Esto también ocurre si solicitas la elevación antes de abrir otra aplicación. [Documentación de Microsoft sobre las directivas de UAC](https://learn.microsoft.com/es-es/windows/security/application-security/application-control/user-account-control/settings-and-configuration)

## How to Choose

| Situación | Método |
| :---: | :---: |
| No elevación requerida | Instala el programa |
| Usuario no disponible en el lado controlado | Renombra<br/>*o*<br/> Ejecuta como administrador |
| Usuario disponible en el lado controlado<br/>*and*<br/> Elevación inmediata en la conexión<br/>*y*<br/> Aceptar conexión mediante click | Hace click en `Aceptar y elevar` Cuando recibas la conexión del lado controlador |
| Usuario disponible en el lado controlador<br/>*y*<br/> Elevación Es necesaria | Hace click en `Elevar` en la ventana de control de la conexión en el lado controlado<br/>*o*<br/> Pide la elevación en el lado controlador |
