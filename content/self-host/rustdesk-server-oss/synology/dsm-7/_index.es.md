---
title: Synology DSM 7.2
weight: 20
---
<!-- For translators: When translating elements like "buttons", don't just translate, please refer actual naming in their interface. -->
Después de la actualización DSM 7.2, Synology renombró su paquete "Docker" a "Container Manager". Trae una nueva GUI, y viene con "docker-compose" dentro de su GUI, lo que hace que crear Docker sea más fácil.

## Modelos soportados y requisitos

Container Manager trae soporte ARM64 para algunos modelos de gama baja, como la serie J, para lista detallada de modelos soportados, por favor verifique [sitio web de Synology](https://www.synology.com/en-us/dsm/packages/ContainerManager).
La mayoría de las veces no necesitará instalar RAM extra para instalar Docker y RustDesk Server.

## 1. Instalar Container Manager (Docker)

Abra "Centro de Paquetes", busque e instale "Container Manager".

![](images/dsm7_install_container_manager_though_package_center.png)

## 2. Crear carpeta

Después de instalar "Container Manager", creará una Carpeta Compartida llamada `docker`, pongamos los datos de nuestro servidor aquí.

Abra su File Station, cree una carpeta llamada `rustdesk-server` (o como guste). Luego cree una carpeta llamada `data` en ella como en la imagen.

![](images/dsm7_create_required_folders.png)

## 3. Crear contenedor

Abra su Container Manager, vaya a Proyecto y haga clic en Crear.

Ingrese el nombre del proyecto `rustdesk-server` y cambie Fuente de "Subir compose.yml" a "Crear compose.yml", y copie el siguiente contenido en el cuadro.

![](images/dsm7_creating_project_init.png?v2)

```yaml
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest # Por favor cambie esto a rustdesk/rustdesk-server-pro:latest si quiere instalar Pro.
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: host
    depends_on:
      - hbbr
    restart: always

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest # Por favor cambie esto a rustdesk/rustdesk-server-pro:latest si quiere instalar Pro.
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: host
    restart: always

# Porque usa modo host de docker
# Por si acaso olvidó los puertos:
# 21114 TCP para consola web, solo disponible en versión Pro
# 21115 TCP para prueba de tipo NAT
# 21116 TCP TCP hole punching
# 21116 UDP heartbeat/servidor ID
# 21117 TCP relay
```

Por favor omita `Configuración del portal web` luego termine.

## 4. Verificar que funciona

Abra su File Station, debería ver `id_ed25519`, `id_ed25519.pub` en su carpeta `docker/rustdesk-server/data`. Podría descargarlo y abrirlo a través de cualquier editor de texto o usar [Synology Text Editor](https://www.synology.com/en-us/dsm/packages/TextEditor). Esta es la clave pública que necesita para su cliente RustDesk.

La clave pública se verá así:

![](images/dsm7_viewing_public_key_though_syno_text_editor.png)

Verifique [aquí](/docs/en/client) para configurar su cliente. Solo se necesita `servidor ID` y `Clave`. `Servidor relay` no es necesario porque lo hemos configurado en `hbbs`, `hbbs` proporcionará esta información automáticamente.

## 5. Configurar reenvío de puertos en su router

Vaya a la página web de administración de su router, encuentre cualquier cosa relacionada con `Reenvío de puertos`, debería aparecer en configuraciones de `WAN` o `Firewall`.

Si aún no puede encontrar la configuración, busque en Google `{Marca del router} + reenvío de puertos` o `{Modelo del router} + reenvío de puertos`. Si este dispositivo es de su ISP, pregúnteles.

Abra estos puertos requeridos:
  * `21114` TCP para consola web, solo disponible en versión Pro
  * `21115` TCP para prueba de tipo NAT
  * `21116` TCP TCP hole punching
  * `21116` UDP heartbeat/servidor ID
  * `21117` TCP relay