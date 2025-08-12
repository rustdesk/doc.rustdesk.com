---
title: RustDesk Server Pro
description: "Guía completa de RustDesk Server Pro - la solución premium auto-hospedada de escritorio remoto. Características de autenticación empresarial (OIDC, LDAP, 2FA), consola web, acceso API y controles de seguridad avanzados para despliegue profesional."
keywords: ["rustdesk server pro", "servidor rustdesk pro", "servidor escritorio remoto", "acceso remoto empresarial", "rustdesk profesional", "rdp auto-hospedado", "rustdesk empresarial", "solución escritorio remoto", "licencia rustdesk", "consola web rustdesk"]
weight: 200
pre: "<b>2.2. </b>"
---

RustDesk Server Pro tiene más características comparado con la versión de código abierto.

- Cuenta
- [Consola web](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/)
- [API](https://github.com/rustdesk/rustdesk/wiki/FAQ#api-of-rustdesk-server-pro)
- [OIDC](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/oidc/), [LDAP](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/ldap/), [2FA](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/2fa/)
- Libreta de direcciones
- Gestión de registros (Conexión, transferencia de archivos, alarma, etc.)
- Gestión de dispositivos
- [Sincronización de configuraciones de seguridad](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/strategy/)
- [Control de acceso](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/)
- [Múltiples servidores de retransmisión](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/) (selecciona automáticamente tu retransmisión más cercana)
- [Generador de cliente personalizado](https://rustdesk.com/docs/en/self-host/client-configuration/#1-custom-client-generator-pro-only)
- WebSocket
- Auto-hospedaje de cliente web

{{% notice note %}}
Si construyes tu propio servidor en casa/oficina, y no puedes conectarte a él a través de IP/dominio público, por favor consulta [este artículo](https://rustdesk.com/docs/en/self-host/nat-loopback-issues/).
{{% /notice %}}

{{% notice note %}}
Recomendamos leer esto primero antes de continuar, [¿Cómo funciona el servidor auto-hospedado?](/docs/en/self-host/#how-does-self-hosted-server-work).
{{% /notice %}}

## Requisitos de hardware

El VPS de nivel más bajo es suficiente para tus casos de uso. El software del servidor no es intensivo en CPU y memoria. Nuestro servidor ID público hospedado en un servidor Vultr de 2 CPU/4 GB sirve a más de 1.0 millones de endpoints. Cada conexión de retransmisión consume un promedio de 180kb por segundo. 1 núcleo de CPU y 1G de RAM es suficiente para soportar 1000 conexiones de retransmisión concurrentes.

## Tutoriales de artículos
[Guía paso a paso: Auto-hospedar RustDesk Server Pro en la nube vía Docker para acceso remoto seguro](https://www.linkedin.com/pulse/step-by-step-guide-self-host-rustdesk-server-pro-cloud-montinaro-fwnmf/)

## Tutoriales en video

[Guía para principiantes: Auto-hospedar RustDesk Server Pro para usuario novato de Linux](https://www.youtube.com/watch?v=MclmfYR3frk)

[Guía rápida: Auto-hospedar RustDesk Server Pro para usuario avanzado de Linux](https://youtu.be/gMKFEziajmo)


## Licencia

Puedes obtener la licencia desde https://rustdesk.com/pricing.html, consulta la página [licencia](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) para más detalles.

## Comenzar
### 1. Instalación

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

Para más detalles, por favor consulta [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/).

### 2. Puertos requeridos

Necesitas abrir los puertos `21114`-`21119` TCP y `21116` UDP, por favor asegúrate de que estos puertos estén configurados cuando establezcas las reglas del firewall y el mapeo de puertos de Docker.

Más información sobre estos puertos, por favor consulta [aquí](/docs/en/self-host/rustdesk-server-oss/install/#ports).

### 3. Establecer licencia

Abre tu consola web accediendo a `http://<ip del servidor>:21114`, [inicia sesión](/docs/en/self-host/rustdesk-server-pro/console/#log-in) usando las credenciales predeterminadas admin/test1234 `admin`/`test1234`. Sigue [esta guía](/docs/en/self-host/rustdesk-server-pro/license/#set-license) para establecer la licencia.

### 4. Configurar HTTPS para la consola web

> Puedes omitir este paso si no quieres usar HTTPS durante la prueba, pero recuerda cambiar la dirección API del cliente después de configurar HTTPS

Aquí tienes un tutorial simple de [configuración manual de HTTPS](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).

### 5. Configurar el cliente para usar el servidor auto-hospedado

https://rustdesk.com/docs/en/self-host/client-configuration/

### 6. Configurar WebSocket

Para habilitar que el cliente web o [cliente de escritorio/móvil](/docs/en/self-host/client-configuration/advanced-settings/#allow-websocket) funcione correctamente con WebSocket, necesitas agregar las siguientes configuraciones a tu configuración de proxy inverso.

https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms


## Actualizar servidor

Esta [guía](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#there-is-a-new-version-of-rustdesk-server-pro-out-how-can-i-upgrade) cubre cómo actualizar RustDesk Server Pro desde una versión inferior, abordando diferentes métodos de instalación.

## Migrar a nuevo host y respaldo/restauración

Aquí tienes un [tutorial](https://github.com/rustdesk/rustdesk-server-pro/discussions/184) detallado.

## Migrar licencia

Por favor sigue esta [guía](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-license-retrieval-and-migration).

## Actualizar licencia

Sigue [esta guía](/docs/en/self-host/rustdesk-server-pro/license/#renewupgrade-license) para actualizar tu licencia para más usuarios y dispositivos en cualquier momento.

## Acerca de la seguridad

https://github.com/rustdesk/rustdesk/discussions/9835