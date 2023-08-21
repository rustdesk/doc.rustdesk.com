---
title: Synology
weight: 22
---

Este tutorial se basa en el último DSM v6.

### Instalar ventana acoplable

Abra el administrador de paquetes e instale la ventana acoplable

|             |                                                   |
| --------------- | -------------------------------------------------------- |
![](/docs/en/self-host/synology/images/package-manager.png) | ![](/docs/en/self-host/synology/images/docker.png)


### Instalar el servidor RustDesk

| Busque rustdesk-server en el registro de Docker e instálelo haciendo doble clic | Imagen de rustdesk-server instalada, haga doble clic para crear el contenedor de rustdesk-server |
| --------------- | -------------------------------------------------------- |
![](/docs/en/self-host/synology/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/synology/images/rustdesk-server-installed.png)


### Crear contenedor hbbs

Como se mencionó anteriormente, haga doble clic en la imagen de rustdesk-server para crear un nuevo contenedor, establezca su nombre en `hbbs`.
![](/docs/en/self-host/synology/images/hbbs.png) 

Haga clic en "Configuración avanzada" arriba.

- Habilitar reinicio automático
![](/docs/en/self-host/synology/images/auto-restart.png) 

- Habilite "Usar la misma red que el host de Docker", para obtener más información sobre la red del host, por favor [check](/docs/en/self-host/install/#net-host)
![](/docs/en/self-host/synology/images/host-net.png) 

- Monte un directorio de host (por ejemplo, `Shared/test/`) en `/root`, hbbs generará algunos archivos (incluido el archivo `key`) en este directorio
| Monte | Archivos generados en el directorio host |
|-- | -- |
![](/docs/en/self-host/synology/images/mount.png?width=500px) | ![](/docs/en/self-host/synology/images/mounted-dir.png?width=300px) 

- Establecer comando
{{% notice note %}}
Synology OS está basado en Debian, os host net (--net=host) funciona bien, no necesitamos asignar puertos con la opción `-p`.

`192.168.16.98` es una IP de intranet utilizada aquí solo para demostración, configúrela en una IP pública cuando implemente.

{{% /notice %}}

![](/docs/en/self-host/synology/images/hbbs-cmd.png?v2) 

- Hecho
  
![](/docs/en/self-host/synology/images/hbbs-config.png) 

### Crear contenedor hbbr

Repita los pasos `hbbs` anteriores, pero cambie el nombre del contenedor a `hbbr` y el comando a `hbbr`.

![](/docs/en/self-host/synology/images/hbbr-config.png) 

### hbbr/hbbs contenedor

![](/docs/en/self-host/synology/images/containers.png?width=500px)


| Haga doble clic en el contenedor y verifique el registro | Doble confirmación de hbbs/hbbr usando la red host |
|-- | -- |
![](/docs/en/self-host/synology/images/log.png?width=500px) | ![](/docs/en/self-host/synology/images/network-types.png?width=500px)

