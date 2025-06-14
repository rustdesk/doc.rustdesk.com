---
title: install.sh
weight: 4
---

{{% notice note %}}
No olvides obtener tu licencia desde [https://rustdesk.com/pricing/](https://rustdesk.com/pricing/), consulta la página de [licencia](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) para más detalles.

Por favor lee [instalación OSS](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/) primero antes de hacer esta instalación simple. Puedes conocer más detalles subyacentes allí.
{{% /notice %}}

## Instalar

Copia y pega el comando anterior en tu terminal Linux para instalar RustDesk Server Pro.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh | bash`

{{% notice note %}}
Recomiendo usar [la imagen Docker](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/docker/#docker-compose); simplifica enormemente el proceso de desplegar la solución así como actualizarla. El consumo de recursos es muy bajo.

Y por favor ejecuta lo anterior bajo tu directorio home en lugar de un directorio donde no tengas permisos de escritura.
{{% /notice %}}

Lo que hace:

- Instalar algunas dependencias
- Configurar el firewall UFW si está disponible
- Crear un directorio de trabajo `/var/lib/rustdesk-server` y un directorio de logs `/var/log/rustdesk-server`
- Instalar ejecutables en `/usr/bin`
- Descargar y extraer Servicios RustDesk Pro al directorio anterior
- Crear servicios systemd para hbbs y hbbr (nombres de servicios son `rustdesk-hbbs.service` y `rustdesk-hbbr.service`)
- Si eliges Dominio, instalará Nginx y Certbot, permitiendo que la API esté disponible en el puerto `443` (HTTPS) y obtener un certificado SSL sobre el puerto `80`, se renueva automáticamente. Cuando el https esté listo, por favor accede con `https://tudominio.com` en lugar de `https://tudominio.com:21114`.

{{% notice note %}}
Cómo [configurar HTTPS para la consola web manualmente](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}

{{% notice note %}}
Si el servicio systemd falla al iniciar, probablemente esté relacionado con SELinux, por favor revisa [esto](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#selinux).
{{% /notice %}}

{{% notice note %}}
Si tu cliente no puede conectarse a tu servidor o no puedes acceder a la consola web, por favor revisa [esto](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall).
{{% /notice %}}

## Actualizar

Copia y pega el comando anterior en tu terminal Linux para actualizar tu instalación existente de RustDesk Server Pro, esto también podría guardarse localmente y programarse con cron.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh | bash`

{{% notice note %}}
Si encuentras problemas con este script, sugeriría que revises el script y ejecutes los pasos manualmente, uno por uno.

Y por favor ejecuta lo anterior bajo tu directorio home en lugar de un directorio donde no tengas permisos de escritura.
{{% /notice %}}

Lo que hace:

- Verifica nuevas versiones de RustDesk Server Pro
- Si encuentra una nueva versión, elimina los archivos de API y descarga nuevos ejecutables y archivos de API

## Convertir desde código abierto

Copia y pega el comando anterior en tu terminal Linux para convertir de RustDesk Server a RustDesk Server Pro.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh | bash`

{{% notice note %}}
Por favor añade el puerto TCP `21114` a tu firewall, este es un puerto adicional para la consola web e inicio de sesión de usuario en el cliente RustDesk.
{{% /notice %}}

{{% notice note %}}
Sugeriría cambiar a una instalación Docker si encuentras problemas con este script. Alternativamente, puedes revisar el script y ejecutar los pasos manualmente, uno por uno.
{{% /notice %}}

Lo que hace:

- Deshabilitar y eliminar los servicios antiguos
- Instalar algunas dependencias
- Configurar el firewall UFW si está disponible
- Crear una carpeta `/var/lib/rustdesk-server` y copiar los certificados aquí
- Eliminar `/var/log/rustdesk` y crear `/var/log/rustdesk-server`
- Descargar y extraer Servicios RustDesk Pro al directorio anterior
- Crear servicios systemd para hbbs y hbbr (nombres de servicios son rustdesk-hbbs.service y rustdesk-hbbr.service)
- Si eliges Dominio, instalará Nginx y Certbot, permitiendo que la API esté disponible en el puerto 443 (HTTPS) y obtener un certificado SSL sobre el puerto 80, se renueva automáticamente