---
title: OIDC
weight: 16
description: "Documentación de RustDesk sobre OIDC. Consulta guías de instalación, configuración, despliegue y solución de problemas."
keywords: ["rustdesk oidc", "rustdesk openid connect", "rustdesk sso", "rustdesk azure login", "rustdesk okta login", "rustdesk github login"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Respuesta rápida

OIDC permite que RustDesk Server Pro use su proveedor de identidad existente para el inicio de sesión único en lugar de cuentas locales. Úselo cuando quiera gestión centralizada de identidades y menos contraseñas administrativas aisladas.

## Puntos clave

- Prepare la URL del proveedor, el client ID y el client secret
- Confirme que la URL de redirección coincide con la consola web de RustDesk
- Mapee correctamente los campos de usuario necesarios
- Pruebe primero con una cuenta de administrador antes de ampliar el despliegue

<!-- GEO-LOCALIZED-INTRO:END -->

- Usa tus cuentas existentes de `Google`, `Okta`, `Facebook`, `Azure`, `GitHub`, `GitLab`, etc. para crear fácilmente e iniciar sesión en tu cuenta de `RustDesk Pro`.
- Para la especificación ver [OpenID Connect Core 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-core-1_0.html).

# Ejemplos
{{% children depth="4" showhidden="true" %}}