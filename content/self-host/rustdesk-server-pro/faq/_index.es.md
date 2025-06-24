---
title: FAQ
weight: 600
---

## ¿Cómo puedo instalar con el script de instalación simple?
1. Obtén tu licencia desde [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), consulta la página de [licencia](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) para más detalles.
2. Inicia un VPS, metal desnudo o VM Linux.
3. Si quieres usar DNS y SSL, crea un nombre DNS como `rustdesk.yourdomain.com`.
4. [Esta página](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#install).
5. Copia y pega el comando en tu terminal Linux.
6. Sigue las indicaciones que te guían a través de la instalación.
7. Una vez completada la instalación, ve a `https://rustdesk.yourdomain.com` o `http://youripaddress:21114`.
8. Inicia sesión con el nombre de usuario `admin` y contraseña `test1234`.
9. Ingresa tu código de licencia comprado en el paso 1.

## ¿Cómo puedo convertir de RustDesk Server Open Source a RustDesk Server Pro?
1. Obtén tu licencia desde [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), consulta la página de [licencia](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) para más detalles.
2. Abre el puerto TCP 21114.
3. Inicia sesión en tu RustDesk Server.
4. Si aún no usas DNS y quieres usar SSL, crea un nombre DNS como `rustdesk.yourdomain.com`.
5. [Esta página](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#convert-from-open-source).
6. Copia y pega el comando en tu terminal Linux.
7. Sigue las indicaciones que te guían a través de la instalación.
8. Una vez completada la instalación, ve a `https://rustdesk.yourdomain.com` o `http://youripaddress:21114`.
9. Inicia sesión con el nombre de usuario `admin` y contraseña `test1234`.
10. Ingresa tu código de licencia comprado en el paso 1.

## Hay una nueva versión de RustDesk Server Pro, ¿cómo puedo actualizar?
Es mejor hacer una copia de seguridad de los archivos de datos (archivos sqlite3, etc.) primero, https://github.com/rustdesk/rustdesk-server-pro/discussions/184#discussioncomment-8013375.
- ### Si instalaste con script (`install.sh`)
Por favor ejecuta [update.sh](/docs/en/self-host/rustdesk-server-pro/installscript/script/#upgrade).
- ### Docker Compose
```
sudo docker compose down
sudo docker compose pull 
sudo docker compose up -d
```
Pero esto depende de tu versión de docker, para más discusión, consulta [esto](https://stackoverflow.com/questions/37685581/how-to-get-docker-compose-to-use-the-latest-image-from-repository).
- ### Docker
```
sudo docker ps
## también puedes usar <NOMBRE DEL CONTENEDOR>, ej. `hbbs` y `hbbr` si sigues nuestro manual.
sudo docker stop <ID DEL CONTENEDOR>
sudo docker rm <ID DEL CONTENEDOR>
sudo docker rmi <ID DE LA IMAGEN>
sudo docker run ..... # igual que lo instalaste antes
```

ej.

```
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED          STATUS                         PORTS     NAMES
30822972c220   rustdesk/rustdesk-server-pro   "hbbr"    10 seconds ago   Restarting (1) 2 seconds ago             hbbr
0f3a6f185be3   rustdesk/rustdesk-server-pro   "hbbs"    15 seconds ago   Up 14 seconds                            hbbs
root@hz:~# sudo docker kill hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
root@hz:~# sudo docker rm hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker rmi rustdesk/rustdesk-server-pro
Untagged: rustdesk/rustdesk-server-pro:latest
Untagged: rustdesk/rustdesk-server-pro@sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Deleted: sha256:a3d9d43a3d1dd84b10c39fe0abf7767b18a87819ff0981443ce9e9a52604c889
Deleted: sha256:65ae79ecc0f8b1c8a21085d04af7c8d8f368dd5ad844982d4c7b3ac1f38ba33a
Deleted: sha256:9274a824aef10f2ef106d8f85fbd1905037169cf610951f63dc5109dae4b0825
Deleted: sha256:aa89ac8b57a49f49f041c01b9c0f016060e611cf282e3fda281bc6bebbabaf3f
Deleted: sha256:4af9839016f72586a46f915cae8a5ccf3380ba88a2f79532692d3b1d7020387e
Deleted: sha256:e900a7ffc2fc14fa432cc04823740dcbb78c0aa3508abbbe287ce8b274541ada
Deleted: sha256:503eeab76c11e8316a2a450ef0790d31c5af203309e9c5b44d1bf8a601e6e587
Deleted: sha256:825683356e7dbfcbaabcbf469c9aeb34d36ebeab0308170432b9553e28203116
Deleted: sha256:24a48d4af45bab05d8712fe22abec5761a7781283500e32e34bdff5798c09399
root@hz:~# sudo docker images
REPOSITORY         TAG       IMAGE ID       CREATED        SIZE
rustdesk/makepkg   latest    86a981e2e18f   2 months ago   2.23GB
root@hz:~# sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbs
Unable to find image 'rustdesk/rustdesk-server-pro:latest' locally
latest: Pulling from rustdesk/rustdesk-server-pro
4ce000a43472: Pull complete
1543f88421d3: Pull complete
9b209c1f5a8d: Pull complete
d717f548a400: Pull complete
1e60b98f5660: Pull complete
a86960d9bced: Pull complete
acb361c4bbf6: Pull complete
4f4fb700ef54: Pull complete
Digest: sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Status: Downloaded newer image for rustdesk/rustdesk-server-pro:latest
0cc5387efa8d2099c0d8bc657b10ed153a6b642cd7bbcc56a6c82790a6e49b04
root@hz:~# sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbr
4eb9da2dc460810547f6371a1c40a9294750960ef2dbd84168079e267e8f371a
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED         STATUS                                  PORTS     NAMES
4eb9da2dc460   rustdesk/rustdesk-server-pro   "hbbr"    5 seconds ago   Restarting (1) Less than a second ago             hbbr
0cc5387efa8d   rustdesk/rustdesk-server-pro   "hbbs"    8 seconds ago   Up 7 seconds                                      hbbs
root@hz:~# sudo docker images
REPOSITORY                     TAG       IMAGE ID       CREATED        SIZE
rustdesk/rustdesk-server-pro   latest    a3d9d43a3d1d   5 days ago     193MB
rustdesk/makepkg               latest    86a981e2e18f   2 months ago   2.23GB
```

Para más detalles, consulta [esto](https://www.cherryservers.com/blog/how-to-update-docker-image).

## Instalé con el script, ¿cómo puedo iniciar y detener servicios?
Los servicios usan systemd así que pueden iniciarse y detenerse usando `sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr` ej. `sudo systemctl restart rustdesk-hbbs`.

## Instalé con el script, ¿cómo puedo ver los logs de Linux?
Los logs se almacenan en `/var/log/rustdesk-server`, puedes verlos usando `tail /var/log/rustdesk-server/hbbs.log` o `tail /var/log/rustdesk-server/hbbs.error`.

## Instalé con el script, ¿cómo puedo verificar el estado de los servicios RustDesk?
Para verificar el estado `sudo systemctl status rustdesk-hbbs|rustdesk-hbbr` ej. `sudo systemctl status rustdesk-hbbs`.

## ¿Cómo puedo cambiar la contraseña de admin?
1. Ve a `https://rustdesk.yourdomain.com` o `http://youripaddress:21114`.
2. Inicia sesión con el nombre de usuario `admin` y contraseña `test1234`.
3. Haz clic en `admin` en la esquina superior derecha.
4. Haz clic en `Configuración`.
5. Ingresa tu nueva contraseña en las casillas proporcionadas.

## ¿Cómo puedo mover mi licencia a un nuevo servidor?
Por favor ve [aquí](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-and-migration).

## Los correos electrónicos no funcionan desde mi VPS
Muchos proveedores de VPS bloquean los puertos 465 y 25.

Una forma simple de verificar es usando telnet. Para probar en el terminal Linux escribe `telnet your.mailserver.com 25`. En Windows usa PowerShell con `Test-NetConnection -ComputerName your.mailserver.com -Port 25`.

Tu servidor de correo puede no estar usando el puerto 25. Asegúrate de usar los puertos correctos.

## ¿Puedo desplegar RustDesk usando PowerShell o similar?
Por supuesto, puedes encontrar scripts para ayudar con el despliegue [aquí](https://rustdesk.com/docs/en/self-host/client-deployment/).

## ¿Cómo puedo reportar un error?
Por favor reporta vía [GitHub](https://github.com/rustdesk/rustdesk-server-pro/issues).

## ¿Por qué si estoy auto-hospedando esto no es gratis y código abierto?
1. RustDesk se ha convertido en un trabajo de tiempo completo para varias personas, tienen vidas, esposas, trabajos e hijos que requieren atención y cuestan dinero!
2. Queremos estar aquí y seguir haciendo grandes progresos en los años venideros.
3. La versión código abierto continuará siendo código abierto y alentamos a otros a hacer desarrollos en línea con la licencia AGPL.

## No puedo conectarme a dispositivos en diferentes grupos, ¿por qué?
Esto se soluciona fácilmente, necesitas permitir acceso entre grupos.
1. Agregar nuevos grupos.
2. Hacer clic en `Editar`.
3. Seleccionar los grupos relevantes a los que quieres acceso (los agrega automáticamente en el grupo correspondiente).

## ¿Cómo puedo obtener configuraciones automáticamente?
Las configuraciones se generan automáticamente.
1. Descarga los clientes más nuevos de [GitHub](https://github.com/rustdesk/rustdesk/releases/latest).
2. En la página principal de la consola web haz clic en `Windows EXE`.
3. Llena el host y API (si es diferente de tu configuración).
4. Haz clic en `Enviar`.
5. Escanea el código QR en Android y renombra el exe a lo que se ha generado.

## ¿Ofrecen hosting para RustDesk Server Pro?
Por favor ponte en contacto con nuestro equipo de [ventas](mailto://sales@rustdesk.com).

## ¿Hay algún lugar donde pueda ver guías de configuración en video?
¡Sí! Tenemos un [Canal de YouTube](https://youtube.com/@RustDesk).

## ¿Por qué mis logs / nombres de dispositivo están vacíos?
Asegúrate de que la API esté configurada correctamente en el dispositivo controlado, https://github.com/rustdesk/rustdesk-server-pro/issues/21#issuecomment-1637935750.

## ¿Cómo puedo desinstalar RustDesk Server Pro?
Ejecuta los siguientes comandos:
```sh
sudo systemctl stop rustdesk-hbbs.service
sudo systemctl disable rustdesk-hbbs.service
sudo systemctl stop rustdesk-hbbr.service
sudo systemctl disable rustdesk-hbbr.service
sudo systemctl daemon-reload
sudo rm /etc/systemd/system/rustdesk-hbbs.service
sudo rm etc/systemd/system/rustdesk-hbbr.service
sudo rm /usr/bin/hbbs
sudo rm /usr/bin/hbbr
sudo rm -rf /var/lib/rustdesk-server/
sudo rm -rf /var/log/rustdesk-server/
```
Si el script instaló Nginx entonces remueve usando:
```sh
sudo apt remove nginx
```

## ¿Cómo puedo eliminar dispositivos de la lista de dispositivos en la consola web?
Desactiva y luego eliminar estará disponible.

## ¿Cómo puedo actualizar RustDesk con PowerShell?
```ps
$ErrorActionPreference= 'silentlycontinue'

$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq "1.2.6")
{
    Write-Output "RustDesk $rdver is the newest version."
    Exit
}

if (!(Test-Path C:\Temp))
{
    New-Item -ItemType Directory -Force -Path C:\Temp > null
}

cd C:\Temp

Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe" -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install -wait
```

## Error `Key mismatch`
Por favor configura tu cliente con la [clave correcta](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/).

## Error `Failed to connect to relay server`
Por favor asegúrate de que `hbbr` esté ejecutándose. Más información sobre `hbbr`, puedes encontrarla [aquí](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/).
Si tu `hbbr` no se ejecuta en la misma máquina que `hbbs`, o tienes múltiples servidores relay, o no lo ejecutas en el puerto predeterminado `21117`, tienes que decirle a `hbbs` explícitamente. Por favor consulta [aquí](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/).

## Restablecer MFA para cuenta Admin
https://github.com/rustdesk/rustdesk/discussions/6576

## Configurar HTTPS para consola web manualmente

### 1. Comprar un nombre de dominio y resolverlo a la dirección IP de tu servidor.
* Compra un nombre de dominio de un registrador como GoDaddy, Namecheap o Namesilo.
* Resuelve el nombre de dominio a la dirección IP de tu servidor con uno de los siguientes:
    - El panel de control de tu registrador de dominios (recomendado)
    - [Proveedores DNS](https://en.wikipedia.org/wiki/List_of_managed_DNS_providers)

Por ejemplo, si compras un nombre de dominio `example.com` de `Namesilo` y la dirección IP de tu servidor es `123.123.123.123`, quieres usar el subdominio `rustdesk.example.com` como tu dirección de consola web HTTPS. Necesitas abrir [link](https://www.namesilo.com/account_domains.php), hacer clic en el botón con información sobre herramientas `Manage dns for the domain`, agregar un registro `A` con el nombre de host `rustdesk` y la dirección IP de tu servidor.
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-button.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-add-a-record.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-table.png)
* Toma algún tiempo para que el DNS surta efecto, https://www.whatsmydns.net y verifica si el nombre de dominio se ha resuelto a la dirección IP de tu servidor. El paso 6 depende del resultado correcto de resolución. En los siguientes pasos, reemplaza `YOUR_DOMAIN` con tu subdominio, ej. `rustdesk.example.com`.

### 2. Instalar Nginx
* Debian/Ubuntu: `sudo apt-get install nginx`
* Fedora/CentOS: `sudo dnf install nginx` o `sudo yum install nginx`
* Arch: `sudo pacman -S install nginx`
* openSUSE: `sudo zypper install nginx`
* Gentoo: `sudo emerge -av nginx`
* Appine: `sudo apk add --no-cache nginx`

Ejecuta `nginx -h` para verificar si se ha instalado correctamente.

### 3. Instalar Certbot
* Método 1: Si `snap` está instalado, ejecuta `sudo snap install certbot --classic`.
* Método 2: Usando `python3-certbot-nginx` en su lugar, ej. `sudo apt-get install python3-certbot-nginx` para Ubuntu.
* Método 3: Si los dos métodos anteriores fallaron, intenta instalar `certbot-nginx`, ej. `sudo yum install certbot-nginx` para CentOS 7.

Ejecuta `certbot -h` para verificar si se ha instalado correctamente.

### 4. Configurar Nginx
Hay dos formas:
* Si existen los directorios `/etc/nginx/sites-available` y `/etc/nginx/sites-enabled`, reemplaza `YOUR_DOMAIN` del siguiente comando con tu nombre de dominio y ejecútalo.
```sh
cat > /etc/nginx/sites-available/rustdesk.conf << EOF
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
Luego ejecuta `sudo ln -s /etc/nginx/sites-available/rustdesk.conf /etc/nginx/sites-enabled/rustdesk.conf`.

Ejecuta `cat /etc/nginx/sites-available/rustdesk.conf` para asegurarte de que su contenido sea correcto.

* Si los directorios `/etc/nginx/sites-available` y `/etc/nginx/sites-enabled` no existen y existe el directorio `/etc/nginx/conf.d`, reemplaza `YOUR_DOMAIN` del siguiente comando con tu nombre de dominio y ejecútalo.
```sh
cat > /etc/nginx/conf.d/rustdesk.conf << EOF
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
Ejecuta `cat /etc/nginx/conf.d/rustdesk.conf` para asegurarte de que su contenido sea correcto.

### 5. Habilitar reglas de firewall para el dominio
Ejecuta los siguientes comandos:

```sh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw --force reload
```

### 6. Generar certificado SSL
Reemplaza `$YOUR_DOMAIN` con tu nombre de dominio, luego ejecuta
`sudo certbot --nginx --cert-name $YOUR_DOMAIN --key-type ecdsa --renew-by-default --no-eff-email --agree-tos --server https://acme-v02.api.letsencrypt.org/directory -d $YOUR_DOMAIN`.

Si te solicita `Enter email address (used for urgent renewal and security notices)`, ingresa tu dirección de correo electrónico.

Finalmente, el contenido de `rustdesk.conf` debería ser así:
```
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = YOUR_DOMAIN) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name YOUR_DOMAIN;
    listen 80;
    return 404; # managed by Certbot
}
```

Aquí hay algunos errores comunes:

* La consola imprime `Successfully deployed certificate for YOUR_DOMAIN to /etc/nginx/.../default` en lugar de `Successfully deployed certificate for YOUR_DOMAIN to /etc/nginx/.../rustdesk.conf`.

La razón puede ser que Certbot no encuentra el archivo `rustdesk.conf`, puedes probar una de las siguientes soluciones:
- Verifica el resultado del paso 5, ejecuta `sudo service nginx restart`.
- Copia las configuraciones del servidor `server{...}` que contienen `YOUR_DOMAIN` a `rustdesk.conf`, y cambia `location{...}` al contenido siguiente.

```sh
location / {
    proxy_set_header        X-Real-IP       $remote_addr;
    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:21114/;
}
```

* `too many certificates (5) already issued for this exact set of domains in the last 168 hours`

Solución: Agrega otro nombre de dominio a DNS y cambia `YOUR_DOMAIN` por él, ej. `rustdesk2.example.com`. Luego repite los pasos 1, 4, 6.

* `Error getting validation data`

Solución: puede ser causado por el firewall, por favor consulta https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall

Aviso: Ejecuta `sudo service nginx restart` si cambias `rustdesk.conf` manualmente.

### 7. Iniciar sesión en la página web
* Abre `https://YOUR_DOMAIN` en el navegador, inicia sesión usando el nombre de usuario predeterminado "admin" y contraseña "test1234", luego cambia la contraseña a la tuya.

### 8. Agregar soporte WebSocket Secure (WSS) para el servidor de ID y el servidor relay para habilitar comunicación segura en todas las plataformas.

Agrega la siguiente configuración a la primera sección `server` del archivo `/etc/nginx/.../rustdesk.conf`, luego reinicia el servicio `Nginx`.
El cliente web se puede acceder a través de `https://YOUR_DOMAIN/web`. Los clientes personalizados pueden usar WebSocket estableciendo `allow-websocket=Y` en las opciones avanzadas. Si se usa el cliente personalizado con WebSocket habilitado, no utilizará TCP/UDP y solo podrá conectarse a través de relay (excepto para conexiones IP directas). Si solo se usa este cliente con WebSocket habilitado, el servidor puede cerrar los puertos 21114 a 21119 y solo mantener abierto el puerto 443.




```
    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }
```

La configuración completa es

```
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = YOUR_DOMAIN) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name YOUR_DOMAIN;
    listen 80;
    return 404; # managed by Certbot
}
```

{{% notice note %}}
Si has implementado previamente para clientes web y quieres usarlo en todas las plataformas, necesitas agregar `proxy_read_timeout`.
{{% /notice %}}

### 9. Evitar CORS si usas el cliente web público de RustDesk `https://rustdesk.com/web`

Necesitas agregar lo siguiente en la sección `location /` del `/etc/nginx/.../rustdesk.conf` para evitar la limitación CORS de los navegadores. Omite este paso si estás usando tu propio cliente web.

```
        if ($http_origin ~* (https?://(www\.)?rustdesk\.com)) {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
        }
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            return 204;
        }
```

## SELinux
Si aparece `Waiting for RustDesk Relay service to become active...` al instalar, puede ser causado por SELinux. Puedes intentar los siguientes comandos:

```sh
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbs'
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbr'
sudo restorecon -v '/usr/bin/hbbs'
sudo restorecon -v '/usr/bin/hbbr'
```

## Firewall
### Firewall de la nube
Si ejecutas en AWS/Azure/Google/DigitalOcean cloud, por favor abre los puertos entrantes UDP (21116) y TCP (21114-21119) en el dashboard del proveedor de la nube.

- [AWS] https://docs.aws.amazon.com/network-firewall/latest/developerguide/getting-started.html
- [Azure] https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview
- [Google] https://cloud.google.com/firewall/docs/firewalls
- [DigitalOcean] https://docs.digitalocean.com/products/networking/firewalls/

### Firewall del servidor local
RustDesk configura firewall con `ufw`. Puede no funcionar en algunas distribuciones como CentOS 9, puedes intentar con `firewall-cmd`:

```sh
sudo firewall-cmd --permanent --add-port=21115/tcp
sudo firewall-cmd --permanent --add-port=21116/tcp
sudo firewall-cmd --permanent --add-port=21117/tcp
sudo firewall-cmd --permanent --add-port=21118/tcp
sudo firewall-cmd --permanent --add-port=21119/tcp
sudo firewall-cmd --permanent --add-port=21116/udp
```

Si usas IP:

```sh
sudo firewall-cmd --permanent --add-port=21114/tcp
```

Si usas DNS/Dominio:

```sh
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
```

Después de lo anterior, ejecuta `sudo firewall-cmd --reload` para recargar el firewall.

## Después de cambiar la contraseña de admin en la consola web no puedo iniciar sesión. ¿Hay una forma simple de restablecer la contraseña?
1. Asegúrate de tener `rustdesk-utils` instalado. Si no lo tienes puedes obtenerlo [aquí](https://github.com/rustdesk/rustdesk-server-pro). También necesitas ejecutar el comando desde la carpeta donde está la base de datos, es decir, `/var/lib/rustdesk-server`.
2. El comando es `rustdesk-utils set_password username password`. Si funciona dirá *Done*.

También tienes los siguientes otros comandos `genkeypair`, `validatekeypair [public key] [secret key]`, `doctor [rustdesk-server]`, `reset_email_verification` y `reset_2fa_verification` que se pueden usar con `rustdesk-utils`.

https://github.com/rustdesk/rustdesk-server-pro/discussions/183

## Agregar certificado CA raíz al contenedor Docker (para falla TLS con SMTP, OIDC etc.)
https://github.com/rustdesk/rustdesk-server-pro/issues/99#issuecomment-2235014703
