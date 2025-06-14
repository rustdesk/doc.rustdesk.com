---
title: Configurar servidores de relé
weight: 17
---

## RustDesk Pro - Instalar servidores de relé adicionales con geolocalización usando docker

{{% notice note %}}
[La instalación simple](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/) crea un servidor de relé (el proceso `hbbr`) implícitamente en la misma máquina, no necesita especificar el servidor de relé explícitamente.

Si desea crear un servidor de relé adicional explícitamente en otra máquina, ejecute `hbbr` siguiendo la [instalación OSS](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/). Puede encontrar `hbbr` en `rustdesk-server-linux-amd64.tar.gz`, `rustdesk-server-hbbr_<version>-<arch>.deb`, `rustdesk-server-windows-x86_64.tar.gz` o en `docker` (`sudo docker run ... rustdesk/rustdesk-server-pro hbbr`).

`hbbr` no requiere una licencia y es igual a la versión de código abierto.
{{% /notice %}}

Puede tener varios servidores de relé ejecutándose por todo el mundo y aprovechar la geolocalización automáticamente para usar el servidor de relé más cercano, proporcionándole una experiencia más rápida al conectarse a computadoras remotas. `hbbs` verifica automáticamente si estos servidores de relé están en línea cada varios segundos, solo elige servidores de relé en línea.

{{% notice note %}}
Problema conocido: https://github.com/rustdesk/rustdesk/discussions/7934
{{% /notice %}}

> Necesitará el par de claves privadas `id_ed25519` y `id_ed25519.pub`.

1 - Si docker ya está instalado, conéctese a su servidor a través de SSH y cree un volumen para hbbr.

```
# docker volume create hbbr
```

El volumen hbbr debería estar ubicado en `/var/lib/docker/volumes/hbbr/_data`.

2 - Copie el par de claves privadas a la ubicación del volumen, en este caso usaremos SCP para copiar los archivos.

La sintaxis del comando es `scp <ruta/nombre_archivo> usuario@servidor:</ruta/destino>`.

```
# scp id_ed25519 root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
# scp id_ed25519.pub root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
```

3 - Despliegue el contenedor hbbr usando el volumen creado previamente. Este volumen tiene el par de claves privadas necesario para ejecutar su servidor de relé privado.

```
# sudo docker run --name hbbr -v hbbr:/root -td --net=host rustdesk/rustdesk-server hbbr -k _
```

4 - Verifique los registros de ejecución para verificar que hbbr está ejecutándose usando su par de claves.

```
# docker logs hbbr

INFO [src/common.rs:121] **Private key comes from id_ed25519**
NFO [src/relay_server.rs:581] Key: XXXXXXXXXXXXXXXXXXXXX
INFO [src/relay_server.rs:60] #blacklist(blacklist.txt): 0
INFO [src/relay_server.rs:75] #blocklist(blocklist.txt): 0
INFO [src/relay_server.rs:81] Listening on tcp :21117
```

Dependiendo de su SO, es posible que desee bloquear/permitir IPs usando un firewall.

En nuestro caso, ejecutando Ubuntu queremos permitir cualquier conexión TCP, a los puertos 21117 y 21119.

```
# sudo ufw allow proto tcp from any to any port 21117,21119
```

**Habilitar el firewall**
```
# sudo ufw enable
```

**Verificar el estado**
```
# ufw status

Status: active

To                         Action      From
--                         ------      ----
21117,21119/tcp            ALLOW       Anywhere
21117,21119/tcp (v6)       ALLOW       Anywhere (v6)
```

## Configurar RustDesk Pro para geolocalización usando la consola web

### Registrarse y descargar el archivo de base de datos GeoLite2 City

Para usar geolocalización, hbbs necesita acceso a la base de datos MaxMind GeoLite2 City. La base de datos es gratuita y puede registrarse para descargar el archivo y obtener una clave API.

Comience creando una cuenta (si no tiene una) yendo al [sitio web](https://www.maxmind.com/en/account/login).
Vaya a `Download Databases` y descargue GeoLite2 City, elija el archivo gzip y debería tener el archivo `mmdb` al descomprimirlo.

<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/e14318fb-ec52-463c-af77-d08c9479c1b5">

Si instaló RustDesk Pro usando el script de instalación en una máquina Linux, el archivo `mmdb` debe moverse a `/var/lib/rustdesk-server/`.

Para instalaciones de Docker, el archivo debería estar en el volumen que mapeó al desplegar el contenedor mapeado a `/root`.

### Obtener una clave API para automatizar el proceso - servidores Linux

Necesita actualizar este archivo regularmente y podemos usar un cronjob para eso. Necesitará una clave API para acceder al enlace de descarga que es gratuito.

Vaya a `Manage License Keys` y genere una nueva clave de licencia. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/632aeb33-4f5d-4a31-9010-38e01c22d3c9">
<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/3e178174-5fbf-46b7-a335-01f77125dfad">

Puede automatizar el [proceso de descarga](https://dev.maxmind.com/geoip/updating-databases) de algunas maneras, pero agregue el siguiente comando a su crontab reemplazando {Your Access Key} con la clave API que obtuvo del paso anterior.

```
/usr/bin/curl -L --silent 'https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key={Your Access Key}&suffix=tar.gz' | /bin/tar -C '/var/lib/rustdesk-server/' -xvz --keep-newer-files --strip-components=1 --wildcards '*GeoLite2-City.mmdb'
```

### Cambiar configuraciones en la consola web RustDesk Pro

Agregue sus direcciones IP o nombres DNS de servidores de relé (DNS es compatible desde la versión 1.1.11) a los `Servidores de relé`. **El puerto no es requerido, el puerto `21117` se usa explícitamente.** <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/c4452ba4-5e1d-437a-ae1d-fc0070bfa26c">

Agregue una anulación geográfica agregando la dirección IP del servidor y las coordenadas donde se encuentra el servidor. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/41c558e3-423b-4296-90d3-cb0769f4a369">

Haga clic en `Reload Geo` y su lista debería verse similar a esto. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/5a0d39a9-4fec-46b4-a7a2-7ed38b6baeb7">

Para confirmar los resultados, verifique sus registros hbbs al hacer clic en `Reload Geo`, debería ver un mensaje mostrando las direcciones IP de los servidores de relé y sus coordenadas.

> Si está ejecutando RustDesk Pro en una máquina Linux use el comando `RUST_LOG=debug ./hbbs` para ver los registros. Si está ejecutando en un contenedor Docker use `docker logs hbbs`.

```
RUST_LOG=debug ./hbbs

INFO [src/common.rs:130] GEOIP_FILE: ./GeoLite2-City.mmdb
INFO [src/common.rs:159] override 1xx.xxx.xxx.x7: -1.xx 5x.xxx
[src/common.rs:159] override 1xx.xxx.xxx.xx8: -3.xxx 5x.xxxx
[src/common.rs:159] override 7xx.xxx.xxxx.xx1: 6.xxx 5x.xxxx
GEOIP_FILE loaded, #overrides 3
INFO [src/common.rs:119] relay-servers=["1xx.xxx.xxx.x7", "1xx.xxx.xxx.xx8", "7xx.xxx.xxx.xx1"]
NFO [src/rendezvous_server.rs:1467] parsed relay servers: [("1xx.xxxx.xxx.xx7", Some((-1x, xxx))), ("1xx.xxx.xxx.xx8", Some((-3x, xxx))), ("7xx.xxx.xxx.xx1", Some((6x, xxx)))]
```

También puede confirmar las solicitudes de relé directamente en sus instancias hbbr, simplemente verificando los registros del contenedor.

```
# docker logs hbbr

INFO [src/relay_server.rs:436] Relayrequest 0593e64e-4fe8-4a59-a94f-b3420ab043eb from [::ffff:100.100.123.233]:52038 got paired
INFO [src/relay_server.rs:442] Both are raw
```