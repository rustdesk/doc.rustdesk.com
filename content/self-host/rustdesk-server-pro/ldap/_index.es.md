---
title: LDAP
weight: 17
---

## Configuración
Por favor vaya a la página de configuración `LDAP` como se muestra a continuación.

![](/docs/en/self-host/rustdesk-server-pro/ldap/images/ldap.png)

- **Host LDAP:** Este es el nombre de host o dirección IP del servidor LDAP. Por ejemplo, `ldap.example.com` o `192.0.2.1`.

- **Puerto LDAP:** Este es el número de puerto en el que está escuchando el servidor LDAP. El puerto predeterminado para LDAP es `389`, y para LDAPS (LDAP sobre SSL) es `636`.

- **DN Base:** Este es el punto de partida para la búsqueda LDAP. Por ejemplo, dc=example,dc=com.

- **Alcance:** Esto determina el alcance de la búsqueda en el directorio LDAP. Puede ser one (Las entradas inmediatamente debajo del DN base), o sub (Las entradas inmediatamente debajo del DN base).

- **DN de Enlace / Contraseña:** El nombre de usuario y contraseña de administrador de su cuenta de servicio. Esta cuenta se usa para enlazar a LDAP para autenticar otros usuarios. A menudo es un DN de usuario como `cn=admin,dc=example,dc=com`.

- **Filtro:** Este es el filtro de búsqueda para la consulta LDAP. Por ejemplo, `(objectClass=person)`, o `(&(age=28)(!(name=Bob)))`.

- **Atributo de Nombre de Usuario:** Este es el atributo que contiene el nombre de usuario. Por ejemplo, `uid` o `sAMAccountName`. Por defecto, usa `uid` y `cn`. Aquí hay una [discusión](https://github.com/rustdesk/rustdesk-server-pro/issues/140#issuecomment-1916804393) sobre esto.

- **StartTLS:** Esto determina si usar StartTLS para actualizar la conexión a una segura.

- **NoTLSVerify:** Esto determina si omitir la verificación del certificado TLS. Se recomienda dejar esto como false (es decir, realizar verificación de certificado) a menos que esté seguro de lo que está haciendo.

## ¿Cómo funciona?
- ¿Cómo funcionan los inicios de sesión LDAP, por ejemplo, necesito crear un nuevo usuario primero, RustDesk crea un usuario en el primer inicio de sesión, etc.?
  > RustDesk crea un usuario en el primer inicio de sesión
- ¿Cómo verifico que LDAP está funcionando (idealmente un comando que puedo dar a RustDesk para devolver los usuarios descubiertos.)?
  > Cuando envía la configuración, se conectará a su servidor LDAP con binddn/contraseña que ha dado y verificará si funciona.
- ¿Cómo cambio usuarios locales a usuarios LDAP?
  > Aún no
- ¿Soporta grupos LDAP?
  > Aún no