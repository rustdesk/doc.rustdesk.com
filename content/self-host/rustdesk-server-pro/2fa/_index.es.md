---
title: 2FA
weight: 16
---

Al iniciar sesión en tu cuenta, activar la verificación de Autenticación de Dos Factores (2FA) puede mejorar la seguridad de la cuenta.

Nuestra consola web actualmente soporta dos tipos de 2FA:

1. Verificación por email
2. TOTP. Se requiere una aplicación de autenticación de terceros para generar el código de verificación, como [Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) y [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2).

Primero necesitas ir a la página de configuración de la cuenta.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/1-settings-account.png)

### Verificación por email

Para habilitar la verificación por email para el inicio de sesión, necesitas:

1. Configurar el email.
2. Habilitar la opción `Habilitar verificación de inicio de sesión por email`.
3. Hacer clic en `Enviar`.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-1.png)

Cuando iniciemos sesión la próxima vez, RustDesk nos enviará un email con código de verificación, y la página web también saltará a la página de verificación.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-2.png)

### TOTP

TOTP es un método 2FA ampliamente utilizado, por lo que en la consola web de RustDesk Server Pro, 2FA se refiere a la verificación TOTP.

#### Preparar aplicación de autenticación

Primero, necesitas preparar una aplicación de autenticación.
Puedes elegir entre estos tipos [Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) y [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2).

#### Habilitar 2FA

Cuando se muestra el botón `Habilitar 2FA` en la página de configuración, significa que 2FA no está habilitado actualmente.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-1.png)

Haz clic en el botón y aparecerá un formulario para habilitar 2FA.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-2.png)

Abre la aplicación de autenticación, agrega una cuenta escaneando el código QR.

Si no es conveniente escanear el código QR, también puedes ingresar el código aquí directamente.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-3.png)

Después de agregar la cuenta en la aplicación de autenticación, ingresa el código de verificación de la aplicación de autenticación para activar 2FA.

Después de que 2FA se active exitosamente, RustDesk Server Pro también se vinculará a 6 **códigos de respaldo**. Así podrás usar estos **códigos de respaldo** para pasar la verificación incluso si no puedes usar la aplicación de autenticación.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-4.png)

{{% notice note %}}
1. Estos códigos de respaldo solo se pueden usar una vez.

2. Por favor mantén los códigos de respaldo en un lugar seguro.
{{% /notice %}}

#### Verificación de inicio de sesión

Cuando 2FA está habilitado, la verificación de inicio de sesión por email ya no se usa. Usaremos verificación de inicio de sesión 2FA en su lugar.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-5.png)

Al iniciar sesión, serás redirigido a la página de verificación.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-6.png)

#### Modificar configuraciones

Cuando 2FA está habilitado, modificar la configuración de la cuenta requiere verificación 2FA adicional.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-1.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-2.png)

#### Estado 2FA

2FA tiene un total de 3 estados: no habilitado, habilitado y expirado.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-not-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-expired.png)

{{% notice note %}}
2FA aún puede usarse normalmente después de expirar. Simplemente significa que la configuración 2FA no ha sido cambiada por mucho tiempo (por defecto 180 días). Por razones de seguridad, recomendamos volver a habilitar 2FA, para que los datos secretos puedan ser actualizados.
{{% /notice %}}