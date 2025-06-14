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
# también puedes usar <NOMBRE DEL CONTENEDOR>, ej. `hbbs` y `hbbr` si sigues nuestro manual.
sudo docker stop <ID DEL CONTENEDOR>
sudo docker rm <ID DEL CONTENEDOR>
sudo docker rmi <ID DE LA IMAGEN>
sudo docker run ..... # igual que lo instalaste antes
```

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

### 2. Instalar Nginx
* Debian/Ubuntu: `sudo apt-get install nginx`
* Fedora/CentOS: `sudo dnf install nginx` o `sudo yum install nginx`
* Arch: `sudo pacman -S install nginx`
* openSUSE: `sudo zypper install nginx`
* Gentoo: `sudo emerge -av nginx`
* Alpine: `sudo apk add --no-cache nginx`

### 3. Instalar Certbot
* Método 1: Si `snap` está instalado, ejecuta `sudo snap install certbot --classic`.
* Método 2: Usa `python3-certbot-nginx` en su lugar, ej. `sudo apt-get install python3-certbot-nginx` para Ubuntu.
* Método 3: Si los dos métodos anteriores fallaron, intenta instalar `certbot-nginx`, ej. `sudo yum install certbot-nginx` para CentOS 7.

### 4. Configurar Nginx
Hay dos formas de hacerlo. Consulta la documentación completa para los pasos detallados.

### 5. Habilitar reglas de firewall para el dominio
```sh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw --force reload
```

### 6. Generar certificado SSL
Reemplaza `$YOUR_DOMAIN` con tu nombre de dominio, luego ejecuta:
`sudo certbot --nginx --cert-name $YOUR_DOMAIN --key-type ecdsa --renew-by-default --no-eff-email --agree-tos --server https://acme-v02.api.letsencrypt.org/directory -d $YOUR_DOMAIN`

### 7. Iniciar sesión en la página web
Abre `https://<YOUR_DOMAIN>` en el navegador, inicia sesión usando el nombre de usuario predeterminado "admin" y contraseña "test1234", luego cambia la contraseña a la tuya.

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

## Después de cambiar la contraseña de admin en la consola web no puedo iniciar sesión. ¿Hay una forma simple de restablecer la contraseña?
1. Asegúrate de tener `rustdesk-utils` instalado. Si no lo tienes puedes obtenerlo [aquí](https://github.com/rustdesk/rustdesk-server-pro).
2. El comando es `rustdesk-utils set_password username password`. Si funciona dirá *Done*.

## Agregar certificado CA raíz al contenedor Docker (para falla TLS con SMTP, OIDC etc.)
https://github.com/rustdesk/rustdesk-server-pro/issues/99#issuecomment-2235014703