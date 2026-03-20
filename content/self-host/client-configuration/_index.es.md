---
title: Configuración del Cliente
description: "Configure clientes RustDesk para servidores auto-hospedados. Características: generador de cliente personalizado (Pro) para aplicaciones con marca con su logo, configuración manual, configuraciones de importar/exportar y estrategias de despliegue empresarial."
keywords: ["configuración cliente rustdesk", "generador cliente personalizado", "cliente rustdesk con marca", "rustdesk marca blanca", "despliegue empresarial rustdesk", "configuración cliente rustdesk", "aplicación rustdesk personalizada", "cliente rustdesk pro", "gestión configuración rustdesk", "marca corporativa rustdesk"]
weight: 300
pre: "<b>2.3. </b>"
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Respuesta rápida

Para la mayoría de los despliegues de RustDesk Server Pro, la mejor opción es el generador de clientes personalizados porque entrega clientes con la configuración correcta del servidor y la marca ya integradas. Para despliegues OSS pequeños o entornos de prueba, la configuración manual, la importación/exportación o los scripts de despliegue suelen ser más rápidos.

## Puntos clave

- `ID Server`: el host o la IP de su `hbbs`
- `Key`: la clave pública usada para conexiones cifradas
- `API Server`: necesario para el inicio de sesión Pro y las funciones de la consola web
- `Relay Server`: normalmente es opcional salvo que quiera fijarlo de forma explícita

<!-- GEO-LOCALIZED-INTRO:END -->

## Descripción general

Hay varias formas de configurar los clientes de RustDesk para usar su propio servidor auto-hospedado, cubriremos algunas a continuación.

## 1. Generador de cliente personalizado (solo Pro, plan básico o plan personalizado)

Puede tener su propio nombre, logotipo, icono, configuración, firma y más.

Actualmente se admite Windows X64, Mac Arm64 / X64, [Linux](https://twitter.com/rustdesk/status/1788905463678951787), Android Arm 64.

[Video](https://twitter.com/rustdesk/status/1769171628426944539)

![](/docs/en/self-host/client-configuration/images/custom-client-qs.png)
![](/docs/en/self-host/client-configuration/images/web_console_custom_client_config.jpeg)

## 2. Configuración manual

En la página principal del cliente RustDesk, haga clic en el botón de menú [ &#8942; ] al lado de su ID y luego haga clic en Red, ahora puede desbloquear la configuración usando privilegios elevados y establecer su `ID`, `Relé`, `API` y `Clave`. Es importante tener en cuenta que esta `Clave` es la clave pública utilizada para el cifrado de conexión, distinta de la clave de licencia proporcionada con su compra de la versión Pro.

![](/docs/en/self-host/client-configuration/images/network-config.png)

Ingrese el host o dirección IP `hbbs` en el cuadro de entrada **Servidor ID** (lado local + lado remoto). Las otras dos direcciones se pueden dejar en blanco, RustDesk las deducirá automáticamente (si no se establece especialmente), y el Servidor de Relé se refiere a `hbbr` (puerto 21117).

por ejemplo

```nolang
hbbs.example.com
```

o

```nolang
hbbs.example.com:21116
```

### Establecer `Clave`

Para establecer una conexión cifrada a su servidor auto-hospedado, necesita ingresar su clave pública. La clave generalmente se genera en la primera ejecución de `hbbs` y se puede encontrar en el archivo `id_ed25519.pub` en su directorio de trabajo / carpeta de datos.

Como usuario `Pro`, adicionalmente podrá recuperar la `Clave` desde la [consola web](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/).

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

### Establecer `Servidor API`

Esto es solo para usuarios `Pro`. Cuando puede iniciar sesión en la consola web, pero falla al iniciar sesión en el cliente RustDesk, probablemente no haya establecido el `Servidor API` correctamente.

Si su servidor API no funciona en el puerto por defecto `21114` (es posible que no agregue este puerto al firewall si viene de la versión de código abierto), especifique explícitamente el `Servidor API`.
por ejemplo, si su servidor API funciona en el puerto HTTPS por defecto, especifique el `Servidor API` con `https://hbbs.example.com`.

Si aún no puede confirmar el valor del `Servidor API`, vaya a la página de bienvenida de la consola web, el `Servidor API` se muestra en la imagen anterior (El cuadro de entrada con la etiqueta `API:`).

## 3. Configuración usando Importar o Exportar

1. Use los pasos [anteriores](https://rustdesk.com/docs/en/self-host/client-configuration/#manual-config) para configurar el Cliente RustDesk en un dispositivo.
2. Usando la máquina anterior, vaya a Configuración luego Red y desbloquee.
3. Haga clic en `Exportar Configuración del Servidor`.
4. Pegue la cadena copiada en el Bloc de notas o similar.
5. Vaya al nuevo cliente, copie lo anterior al portapapeles.
6. Vaya a Configuración luego Red en el Cliente RustDesk, desbloquee y haga clic en `Importar Configuración del Servidor`.
7. Pegará automáticamente la configuración.
8. Haga clic en `Aplicar`.

## 4. Configuración automática

La forma más fácil de configurar automáticamente es usar los scripts de implementación que se encuentran [aquí](https://rustdesk.com/docs/en/self-host/client-deployment/).

## 5. Importar configuración desde `Pro` a través del portapapeles

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

https://github.com/rustdesk/rustdesk-server-pro/discussions/372#discussioncomment-10473298

## 6. Usar línea de comandos `--config`
`rustdesk.exe --config <cadena-config>`

Puede obtener la cadena de configuración desde la consola web (puede verla en la imagen anterior) o desde el cliente RustDesk "Configuración → Red" ([aquí](https://github.com/rustdesk/rustdesk/discussions/7118) hay una discusión sobre esto).