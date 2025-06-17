---
title: Synology DSM 6
weight: 22
---

> Un tutorial alternativo actualizado de terceros está [aquí](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/).

Este tutorial está basado en las últimas versiones DSM v6 y v7.

{{% notice note %}}
Después de la actualización DSM 7.2, Docker fue actualizado al nuevo "Container Manager", por favor verifique [este artículo](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7) en su lugar.
{{% /notice %}}

## Instalar Docker

| Abrir Centro de Paquetes | Instalar Docker |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/package-manager.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/docker.png) |

## Instalar RustDesk Server

| Buscar rustdesk-server en el registro de Docker e instalar haciendo doble clic | Imagen rustdesk-server instalada, hacer doble clic para crear contenedor rustdesk-server |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/rustdesk-server-installed.png) |

## Crear contenedor hbbs

Como se mencionó anteriormente, haga doble clic en la imagen rustdesk-server para crear un nuevo contenedor, establezca el nombre como `hbbs`.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs.png)

Haga clic en `Configuración Avanzada` arriba.

- Habilite `Habilitar reinicio automático`.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/auto-restart.png)

- Habilite `Usar la misma red que Docker Host`. Para más sobre host net, por favor [verifique](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/docker/#net-host).
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/host-net.png)

- Monte un directorio host (ej. `/home/rustdesk/`) a `/root`, hbbs generará algunos archivos (base de datos y archivos `key`) en este directorio que necesitan persistir a través de reinicios.

| Montar | Archivos generados en el directorio host |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mount.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mounted-dir.png) |

- Establecer comando
{{% notice note %}}
El SO de Synology está basado en Debian, por lo que host net (--net=host) funciona bien, no necesitamos mapear puertos con la opción `-p`.

{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs-cmd.png?v3)

- ¡Listo!

## Crear contenedor hbbr

Por favor repita los pasos `hbbs` anteriores, pero nombre el contenedor `hbbr` y el comando (para el Paso Establecer Comando) debe ser `hbbr`.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbr-config.png)

## contenedores hbbr/hbbs

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/containers.png)

| Haga doble clic en el contenedor y verifique el log | Confirme doblemente que hbbs/hbbr usan red host |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/log.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/network-types.png) |

## Recuperar su Clave

Navegue a la carpeta configurada anteriormente usando File Station, descargue `id_ed25519.pub` y ábralo con un editor de texto para ver su clave.