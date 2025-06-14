---
title: 2FA
weight: 16
---

Ao fazer login na sua conta, ativar a verificação de Autenticação de Dois Fatores (2FA) pode melhorar a segurança da conta.

Nosso console web atualmente suporta dois tipos de 2FA:

1. Verificação por email
2. TOTP. Um aplicativo de autenticação de terceiros é necessário para gerar o código de verificação, como [Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) e [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2).

Você primeiro precisa ir para a página de configurações da conta.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/1-settings-account.png)

## Verificação por email

Para habilitar a verificação por email para login, você precisa:

1. Definir o email.
2. Habilitar a opção `Habilitar verificação de login por email`.
3. Clicar em `Enviar`.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-1.png)

Quando fizermos login na próxima vez, o RustDesk nos enviará um email com código de verificação, e a página web também saltará para a página de verificação.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-2.png)

## TOTP

TOTP é um método 2FA amplamente usado, então no console web do RustDesk Server Pro, 2FA refere-se à verificação TOTP.

### Preparar aplicativo de autenticação

Primeiro, você precisa preparar um aplicativo de autenticação.
Você pode escolher entre estes tipos [Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) e [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2).

### Habilitar 2FA

Quando o botão `Habilitar 2FA` é exibido na página de configurações, significa que o 2FA não está atualmente habilitado.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-1.png)

Clique no botão e um formulário aparecerá para habilitar 2FA.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-2.png)

Abra o aplicativo de autenticação, adicione uma conta escaneando o código QR.

Se for inconveniente escanear o código QR, você também pode inserir o código aqui diretamente.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-3.png)

Após adicionar a conta no aplicativo de autenticação, insira o código de verificação do aplicativo de autenticação para ativar o 2FA.

Após o 2FA ser ativado com sucesso, o RustDesk Server Pro também será vinculado a 6 **códigos de backup**. Assim você pode usar esses **códigos de backup** para passar na verificação mesmo se não conseguir usar o aplicativo de autenticação.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-4.png)

{{% notice note %}}
1. Esses códigos de backup só podem ser usados uma vez.

2. Por favor mantenha os códigos de backup em um local seguro.
{{% /notice %}}

### Verificação de login

Quando o 2FA está habilitado, a verificação de login por email não é mais usada. Usaremos verificação de login 2FA em seu lugar.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-5.png)

Ao fazer login, você será redirecionado para a página de verificação.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-6.png)

### Modificar configurações

Quando o 2FA está habilitado, modificar as configurações da conta requer verificação 2FA adicional.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-1.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-2.png)

### Estado do 2FA

O 2FA tem um total de 3 estados: não habilitado, habilitado e expirado.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-not-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-expired.png)

{{% notice note %}}
O 2FA ainda pode ser usado normalmente após expirar. Apenas significa que as configurações do 2FA não foram alteradas por muito tempo (padrão 180 dias). Por motivos de segurança, recomendamos reabilitar o 2FA, para que os dados secretos possam ser atualizados.
{{% /notice %}}