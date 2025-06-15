---
title: Problemas de NAT Loopback
weight: 500
pre: "<b>2.5. </b>"
---

{{% notice note %}}
Esta explicación involucra conocimientos complejos de redes, necesitamos tu asistencia para mejorar su legibilidad.
{{% /notice %}}


Para más detalles sobre NAT Loopback, por favor revisa la página de [Wikipedia](https://en.m.wikipedia.org/wiki/Network_address_translation#NAT_hairpinning).

Cuando estás desplegando el servidor RustDesk en tu red doméstica o cualquier otro entorno de red que esté detrás de un firewall NAT, el servidor RustDesk y tus clientes **DEBEN** ya sea:
A: Usar la dirección IP local para acceder entre sí O:
B: Tener un firewall que soporte y tenga habilitado el NAT Loopback.

Puedes notar que no puedes conectarte a tu servidor a través de tu **IP Pública** o **Dominio** (que en teoría apunta a tu IP pública).

## Problema
En este ejemplo seguiremos lo que sucede cuando los dispositivos LAN intentan conectarse a `rustdesk.example.com`. Asume que la IP pública de tu router será `172.16.16.1`, la IP LAN de tu servidor es `192.168.11.20` y el dominio que deseas es `rustdesk.example.com`, y tienes un cliente usando '192.168.11.2'.

Cuando configuras un servidor detrás del NAT del router puedes agregar un reenvío de puerto en el router para cambiar cualquier mensaje entrante a la IP PÚBLICA 172.16.16.1 para que vaya al servidor en 192.168.11.20

Cuando un dispositivo LAN quiere acceder a internet, digamos un servidor web en 8.8.8.8, envía la solicitud como viniendo de 192.168.11.2, y la envía al router. El router interceptará esa solicitud y reescribirá esa solicitud a 8.8.8.8 como viniendo de 172.16.16.1. Cuando 8.8.8.8 responde a 172.16.16.1 el router verificará una conexión previa y redirigirá esa respuesta de vuelta a 192.168.11.2.

Si el usuario en 8.8.8.8 envía un mensaje a nuestra red usando 172.16.16.1, la regla de reenvío de puerto reescribirá el destino de 172.16.16.1 al servidor en 192.168.11.20 dejando la fuente de la solicitud como 8.8.8.8 para que el servidor pueda responder (más o menos) directamente a 8.8.8.8.

Si el usuario en 8.8.8.8 decide intentar hackear nuestra red y afirma estar enviando sus mensajes desde 192.168.11.2, el router sabe que el tráfico viniendo de 192.168.11.2 solo es válido desde los dispositivos LAN y típicamente bloqueará ese tráfico.

El problema ocurre cuando intentas hacer un bucle de vuelta en la LAN. Si el dispositivo LAN intenta conectarse a `rustdesk.example.com`, que será `172.16.16.1`. En este punto el router tiene muchas decisiones que tomar. Acaba de enviar un mensaje desde su puerto LAN a su puerto WAN viniendo DESDE 192.168.11.2 yendo a 172.16.16.1. Una vez que llega al puerto WAN este mensaje es indistinguible por sí mismo del ejemplo anterior donde alguien en internet estaba intentando hackear nuestra red.

La característica NAT Loopback efectivamente cambiará la parte de origen "Desde 192.168.11.2" de la dirección más temprano en el proceso para que sepa que tiene que usar la tabla NAT para pasar mensajes de ida y vuelta entre el servidor y el cliente.

Si hay un problema con las conexiones solo mientras estás dentro de la LAN, pero funciona bien desde fuera del sitio, este puede ser el problema que estás teniendo.


## Soluciones
Hay tres maneras de resolver este problema.

### 1. Configurar NAT Loopback en tu router
Podrías configurar NAT Loopback en tu router si sabes cómo, pero configurar esto requiere conocimiento de redes. Algunos routers no tienen la capacidad de ajustar esta configuración, por lo que esta no es la mejor opción para todos.

{{% notice note %}}
Un artículo de [MikroTik](https://help.mikrotik.com/docs/display/ROS/NAT#NAT-HairpinNAT) explica esto muy bien. Podrías empezar a aprender desde aquí.
{{% /notice %}}

### 2. Desplegar un servidor DNS en tu LAN
Primero, elige cuál prefieres, [AdGuard Home](https://github.com/AdguardTeam/AdGuardHome/wiki/Docker) o [Pi-hole](https://github.com/pi-hole/docker-pi-hole). Podrías desplegarlo a través de docker, o podrías desplegarlo en el mismo servidor que tu Servidor RustDesk. El ejemplo de abajo te mostrará algunos pasos para este ejemplo.

Ambos son bloqueadores de anuncios basados en DNS, pero podrías deshabilitar esta funcionalidad si no quieres bloquear anuncios.

Primero, apunta tu `dominio` a la IP LAN de tu servidor RustDesk (por ejemplo `192.168.11.20`). Luego ve a la configuración `DHCP` de tu router (Precaución: NO WAN) y establece tu `Primera` IP DNS al servidor donde desplegaste AdGuard Home o Pi-hole. El DNS `Secundario` podría ser el DNS de tu ISP u otro DNS público, ej. `1.1.1.1` para Cloudflare o `8.8.8.8` para Google, ¡y listo!

Aquí hay un ejemplo:
#### AdGuard Home
Bloquear anuncios puede causar problemas, si no quieres averiguar la solución y quieres deshabilitar esta funcionalidad, haz clic en el botón "Deshabilitar protección".

![](images/adguard_home_disable_protection.png)
<br>

Ve a la configuración "Reescrituras DNS".

![](images/adguard_home_click_dns_rewrites.png)
<br>

Haz clic en "Agregar reescritura DNS", luego escribe tu `dominio` y la `IP LAN` del servidor en el campo.

![](images/adguard_home_dns_rewrite_dialog.png)

Así es como se ve el resultado final.

![](images/adguard_home_dns_rewrite_final_result.png)

***¡No olvides asignar tu AdGuard Home al DHCP LAN de tu router!***
<hr>

#### Pi-hole
Bloquear anuncios puede causar problemas, si no quieres averiguar la solución y quieres deshabilitar esta funcionalidad, haz clic en el botón "Indefinidamente" dentro del submenú "Deshabilitar Bloqueo".

![](images/pi_hole_disable_blocking.png)

Ve a "DNS Local → Registros DNS".
Escribe tu `dominio` e `IP` en la caja, luego haz clic en "Agregar".

Para verificar los resultados finales, revisa las líneas amarillas en esta imagen.

![](images/pi_hole_local_dns_dns_records.png)

***¡No olvides asignar tu Pi-hole al DHCP LAN de tu router!***

### 3. Agregar reglas a tu archivo hosts
Este método solo se recomienda si tienes un pequeño número de dispositivos. Si tienes muchos dispositivos, se prefiere el método DNS. De lo contrario tendrías que hacer esto manualmente en cada dispositivo que necesite acceso al servidor.

{{% notice warning %}}
Si este método se usa en un dispositivo portátil como una laptop, no podrá conectarse al servidor cuando esté fuera de tu LAN.
{{% /notice %}}

Ruta para diferentes OS:

#### Windows
```text
C:\Windows\system32\drivers\etc\hosts
```
Puedes editar con privilegios elevados o puedes copiar este archivo al `Escritorio` y editarlo. Después de editarlo, cópialo de vuelta a la ruta original.

#### macOS
```text
/etc/hosts
```
Podrías usar `vim`, viene preinstalado.
```sh
sudo vim /etc/hosts
```

#### Linux
```text
/etc/hosts
```
Podrías usar `vim` o `nano`.
```sh
sudo vim /etc/hosts
```

<hr>

El formato es el mismo en los tres sistemas operativos. `IP` primero seguida del `dominio`. Una entrada por línea.

Por ejemplo:
```text
192.168.11.20   rustdesk.example.com
```