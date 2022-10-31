---
title: Instalación 
weight: 10
---

## Configura tu propia nube siguiendo simples pasos
-----------

### PASO-1: Descargar programas de software del lado del servidor

[Download](https://github.com/rustdesk/rustdesk-server/) o usa la ventana acoplable [rustdesk/rustdesk-server](https://hub.docker.com/r/rustdesk/rustdesk-server/tags).

Versiones de la plataforma proporcionadas:
   - Linux
   - Windows

El siguiente tutorial se basa en la compilación de Linux.

Hay dos ejecutables y una carpeta:
    - hbbs - ID de RustDesk/servidor Rendezvous
    - hbbr - servidor de retransmisión de RustDesk

Están construidos en Centos7, probados en Centos7/8, Ubuntu 18/20.

#### Requisitos del servidor
Los requisitos de hardware son muy bajos, la configuración mínima del servidor en la nube es suficiente y los requisitos de CPU y memoria son mínimos. Con respecto al tamaño de la red, si falla la conexión directa TCP, se consumirá el tráfico de retransmisión. El tráfico de una conexión de retransmisión está entre 30k-3M/s (pantalla de 1920x1080), según la configuración de resolución y la actualización de la pantalla. Si es solo para demanda de trabajo de oficina, el tráfico es de alrededor de 100K/s.


### PASO-2: Ejecute hbbs y hbbr en el servidor

Ejecute hbbs/hbbr en su servidor (Centos o Ubuntu). Le sugerimos que utilice [pm2](https://pm2.keymetrics.io/) administrar su servicio.

```
./hbbs -r <relay-server-ip[:port]> 
./hbbr 
```

o ejecute hbbs/hbbr con pm2

```
pm2 start hbbs -- -r <relay-server-ip[:port]> 
pm2 start hbbr 
```

<a name="demo"></a>
{{% notice note %}}
pm2 requiere nodejs v16+, si fallas al correr pm2 (e.g. No puedes ver hbbs/hbbr in `pm2 list`), descargue e instale la versión LTS nodejs desde https://nodejs.org. Si desea que hbbs/hbbr se ejecute automáticamente después de reiniciar, consulte `pm2 save` y `pm2 startup`. Más sobre [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/). Otra buena herramienta para su registro es [pm2-logrotate](https://github.com/keymetrics/pm2-logrotate).

El `-r` El parámetro de hhbs no es obligatorio, solo es conveniente que no especifique un servidor de retransmisión en el lado del cliente controlado, no necesita especificar el puerto si está utilizando el puerto predeterminado 21117. El servidor de retransmisión especificado por el cliente tiene una prioridad más alta que esta.
{{% /notice %}}

Por defecto, hbbs escucha en 21115(tcp) y 21116(tcp/udp), 21118(tcp), hbbr escucha en 21117(tcp), 21119(tcp). Asegúrese de abrir estos puertos en el firewall. **Tenga en cuenta que 21116 debe estar habilitado tanto para TCP como para UDP**. 21115 se utiliza para la prueba de tipo NAT, 21116/UDP se utiliza para el registro de ID y el servicio de latidos, 21116/TCP se utiliza para el servicio de conexión y perforación de agujeros TCP, 21117 se utiliza para los servicios de retransmisión, 21118 y 21119 se utilizan para admitir clientes web. Si no necesitas cliente web (21118, 21119) soporte, los puertos correspondientes se pueden deshabilitar.

- TCP(**21115, 21116, 21117, 21118, 21119**)
- UDP(**21116**)

Ejecute con la opción "-h" para ver ayuda si desea elegir su propio puerto.

#### Docker ejemplo

##### Linux/amd64
```
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server hbbs -r <relay-server-ip[:port]> 
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server hbbr 
```

##### Linux/arm64v8
```
sudo docker image pull rustdesk/rustdesk-server:latest-arm64v8
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server:latest-arm64v8 hbbs -r <relay-server-ip[:port]> 
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server:latest-arm64v8 hbbr 
```

<a name="net-host"></a>

{{% notice note %}}
--net=host only works on Linux so far as I know, which make hbbs/hbbr can see the real incoming ip rather than container ip (172.17.0.1).
If --net=host works fine, -p options are useless.

**Elimine --net=host si ve un problema de conexión en su plataforma**
{{% /notice %}}


### PASO 3: Establecer la dirección hbbs/hbbr en el lado del cliente

Haga clic en el botón de menú en el lado derecho de ID como se muestra a continuación, elija "ID/Servidor de retransmisión".

![](/docs/en/self-host/install/images/server-set-menu.png)

Ingrese el host hbbs o la dirección IP en el cuadro de entrada del servidor ID (lado local + lado remoto), las otras dos direcciones se pueden dejar en blanco, RustDesk deducirá automáticamente (si no se configura especialmente), y el servidor de retransmisión se refiere a hbbr (21117 Puerto).

ejemplo

```
hbbs.example.com
```

o

```
hbbs.example.com:21116
```

![](/docs/en/self-host/install/images/server-set-window.png)

#### Coloque la configuración en el nombre del archivo rustdesk.exe (solo Windows)

Cambie `rustdesk.exe` a rustdesk-`host=<host-ip-or-name>,key=<public-key-string>`.exe, p. rustdesk-`host=192.168.1.137,key=xfdsfsd32=32`.exe, puede ver el resultado de la configuración en la ventana Acerca de como se muestra a continuación.

<a name="invalidchar"></a>
{{% notice note %}}
Necesitas configurar `host` y `key` ambos, perder alguno no funcionará.

Si hay caracteres no válidos en la clave que no se pueden usar en el nombre del archivo, elimínelos.
id_ed25519 y reinicie su hbbs/hbbr, el archivo id_ed25519.pub se regenerará, por favor
repita hasta que obtenga caracteres válidos.
{{% /notice %}}

| Menú | Acerca de la página |
| -- | -- |
![](/docs/en/self-host/install/images/aboutmenu.png) | ![](/docs/en/self-host/install/images/lic.png) |

## Key
-----------
A diferencia de la versión anterior, la clave en esta versión es obligatoria, pero no necesita configurarla usted mismo. Cuando hbbs se ejecuta por primera vez, generará automáticamente un par de claves privadas y públicas cifradas (ubicadas respectivamente en los archivos `id_ed25519` y `id_ed25519.pub` en el directorio en ejecución), el objetivo principal es el cifrado de comunicaciones.

Si no completó la `key:` (el contenido en el archivo de clave pública `id_ed25519.pub`) en el paso anterior, no afecta la conexión, pero la conexión no se puede cifrar.

````
cat ./id_ed25519.pub
````

Si desea prohibir que los usuarios sin clave establezcan conexiones no cifradas, agregue el parámetro `-k _` cuando ejecute hbbs y hbbr, por ejemplo:

````
./hbbs -r <relay-server-ip[:port]> -k _
./hbbr -k _
````

Si desea cambiar la clave, elimine los archivos `id_ed25519` e `id_ed25519.pub` y reinicie hbbs/hbbr, hbbs generará un nuevo par de claves.
