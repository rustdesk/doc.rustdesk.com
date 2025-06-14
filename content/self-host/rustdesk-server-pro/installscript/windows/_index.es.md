---
title: Instalación en Windows
weight: 5
---

{{% notice note %}}
La política de seguridad de Windows es complicada, si este tutorial no funciona para ti, o encuentras conexión inestable, por favor migra a un servidor Linux.
{{% /notice %}}

{{% notice note %}}
La versión GUI, `RustDeskServer.setup.exe` ya no se mantiene, no recomendada.
{{% /notice %}}

## Instalar

El Microsoft Visual C++ Redistributable es requerido para ejecutar rustdesk en Windows. Puedes descargarlo [aquí](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist)

1. Obtén tu licencia desde [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), consulta la página de [licencia](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) para más detalles.
2. Descarga el instalador de Windows desde [GitHub](https://github.com/rustdesk/rustdesk-server-pro/releases/latest).
3. Descomprime el instalador de Windows.
4. Ejecuta el Instalador y sigue los pasos en pantalla. O instala manualmente con [PM2 o NSSM](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/windows/).
5. Una vez completado, abre RustDesk Server.
6. Sigue las indicaciones que te guían a través de la instalación.
7. Haz clic en `Services` y luego en `Start`.
8. Una vez que la instalación esté completa ve a `http://youripaddress:21114`.
9. Inicia sesión con el nombre de usuario `admin` y contraseña `test1234`.
10. Ingresa tu código de licencia comprado en el paso 1.

## Usar IIS como Proxy

Por favor asegúrate de que `Dynamic Content Compression` esté instalado (esta es una Característica de IIS que puede instalarse con Roles de Servidor).
1. Abre IIS (O instálalo).
2. Crea un nuevo sitio web para RustDesk con las vinculaciones (Idealmente 443) y certificado relevante. La configuración básica debe apuntar a una carpeta en blanco. (Si usas el sitio predeterminado, asegúrate de que no haya otros archivos en la carpeta).
3. En IIS, instala [Application Request Routing](https://www.iis.net/downloads/microsoft/application-request-routing) y [URL Rewrite](https://learn.microsoft.com/en-us/iis/extensions/url-rewrite-module/using-the-url-rewrite-module).

## Application Request Routing

1. Bajo el Host del Servidor IIS abre Application Request Routing.
2. Ve a Server Proxy Settings.
3. Habilita proxy y todas las configuraciones aparecerán, puedes dejarlas como los valores predeterminados.
4. Guarda las configuraciones y podemos ir al siguiente paso: URL Rewrite.

## URL Rewrite

1. Abre el sitio en IIS en el panel izquierdo y haz doble clic en URL Rewrite.
2. Haz clic en `Add rules`.
3. Configura una nueva regla de proxy inverso.
4. Configura la dirección local (la dirección 21114) \
Regla de Entrada – la dirección interna RustDesk 21114 \
Reglas de Salida – `From` es la dirección interna RustDesk 21114 y `To` es la dirección externa. \
Nota: No http / https antes de las direcciones – se manejan automáticamente. También, asegúrate de que todas las direcciones sean accesibles tanto interna como externamente.

## Compresión

1. Deshabilita `Dynamic Content Compression`.

## Solución de problemas

Si tienes un error 500.52 agrega las variables mencionadas: [IIS acting as reverse proxy: Where the problems start](https://techcommunity.microsoft.com/t5/iis-support-blog/iis-acting-as-reverse-proxy-where-the-problems-start/ba-p/846259).

Podrías necesitar cambiar tu configuración SSL a "Require SSL → Ignore".
