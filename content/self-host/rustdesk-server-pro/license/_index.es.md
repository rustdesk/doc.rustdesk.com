---
title: Licencia
weight: 15
---

## Comprar licencia

Por favor obtén tu licencia desde [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), ingresa una dirección de correo electrónico válida en la página de pago de Stripe. La licencia (y la factura en un correo separado) será enviada a tu correo electrónico una vez que el pago se complete exitosamente.

![](/docs/en/self-host/rustdesk-server-pro/license/images/stripe.jpg)

## Establecer licencia

Se te requerirá ingresar la licencia en la consola web (`http://<rustdesk-server-pro-ip>:21114`), o cambiar la licencia más tarde.

| Establecer licencia | Cambiar licencia |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/set.png) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/change.png) |

## Renovar/actualizar licencia

Renovar/actualizar licencia se puede encontrar a través del [portal de licencia de autoservicio](https://rustdesk.com/self-host/account/) como se describe a continuación, inicia sesión con el correo electrónico que usaste para comprar la licencia como la imagen anterior.

| Página de licencia con acciones de renovación/actualización | Ventana de actualización |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/renew.jpg?v2) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/upgrade.png) |

Después de realizar el pago, por favor actualiza la licencia [como se muestra a continuación](/docs/en/self-host/rustdesk-server-pro/license/#refresh-license) para activarla.

### Actualizar licencia
Después del pago, necesitas proceder a la consola web para activarla manualmente como se muestra a continuación. Solo haz clic en `Editar`, luego `OK`, no necesitas editar nada, porque tu clave de licencia permanece igual.

![](/docs/en/self-host/rustdesk-server-pro/license/images/updatelic.jpg)

## Facturas, Recuperación de Licencia y Migración

La licencia solo puede ser usada en una máquina (solo para hbbs, hbbr no requiere licencia), si quieres migrar a otra máquina, recuperar tu licencia o descargar facturas, por favor ve a [https://rustdesk.com/self-host/account/](https://rustdesk.com/self-host/account/). Inicia sesión con la dirección de correo electrónico usada para el pago de Stripe, desvincula la máquina anterior de la que quieres migrar como se muestra a continuación, cuando establezas la licencia en la consola web del nuevo servidor, asignará la licencia y se registrará automáticamente en la consola.

![](/docs/en/self-host/rustdesk-server-pro/license/images/unbind.jpg)

## Proxy
Si tu servidor no puede acceder a internet para verificar la licencia directamente, puedes agregar un proxy, ej. `proxy=http://username:password@example.com:8080 ./hbbs`.

Alternativamente, puedes agregar `proxy=http://username:password@example.com:8080` al archivo `.env` bajo el directorio de trabajo (donde residen los archivos `id_ed25519` / `db.sqlite3`).

`http` puede ser reemplazado con `https` o `socks5`. Si no hay `username` / `password` / `port`, puede ser `proxy=http://example.com`.