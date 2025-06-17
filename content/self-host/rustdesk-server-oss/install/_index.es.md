---
title: Instalación
weight: 1
---

## Tutoriales en video
Hay muchos tutoriales en video en YouTube, https://github.com/rustdesk/rustdesk/wiki/FAQ#video-tutorials.

## Requisitos del servidor
Los requisitos de hardware son muy bajos; la configuración mínima de un servidor en la nube básico es suficiente, y los requisitos de CPU y memoria son mínimos. También puede usar una Raspberry Pi o algo similar. Con respecto al tamaño de la red, si falla la conexión directa de perforación de TCP, se consumirá el tráfico de retransmisión. El tráfico de una conexión de retransmisión está entre 30 K/s y 3 M/s (pantalla 1920x1080) dependiendo de la configuración de resolución y actualización de pantalla. Si es solo para demanda de trabajo de oficina, el tráfico es de alrededor de 100 K/s.

## Firewall
Si tiene UFW instalado, use los siguientes comandos para configurar el firewall:
```
ufw allow 21114:21119/tcp
ufw allow 21116/udp
sudo ufw enable
```

## Instalación
### Método 1: Docker (Recomendado)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/oss.yml -O compose.yml
sudo docker compose up -d
```

Para más detalles, por favor consulte [Docker](/docs/en/self-host/rustdesk-server-oss/docker/).

### Método 2: Instale su propio servidor como servicio systemd usando un script de instalación simple
El script está alojado en [Techahold](https://github.com/techahold/rustdeskinstall) y tiene soporte en nuestro [Discord](https://discord.com/invite/nDceKgxnkV).

Actualmente, el script descargará y configurará los servidores de retransmisión y señal (hbbr y hbbs), generará configuraciones y las alojará en una página web protegida con contraseña para una implementación simple en los clientes.

Ejecute los siguientes comandos:
```
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```

También hay un script de actualización en el repositorio de [Techahold](https://github.com/techahold/rustdeskinstall).

Desde allí, tome nota de la IP/DNS y la clave que se muestran al final de la instalación e insértelas en los campos `Servidor ID` y `Clave` de Configuración > Red > Servidor ID/Retransmisión del cliente, respectivamente, dejando los otros campos en blanco (ver nota a continuación).

### Método 3: Instale su propio servidor como servicio systemd usando archivo deb para distribuciones debian

Por favor [descargue](https://github.com/rustdesk/rustdesk-server/releases/latest) los archivos deb usted mismo e instálelos con `apt-get -f install <filename>.deb` o `dpkg -i <filename>.deb`.

## Configurar cliente
Por favor consulte [esto](/docs/en/self-host/client-configuration/#2-manual-config).
