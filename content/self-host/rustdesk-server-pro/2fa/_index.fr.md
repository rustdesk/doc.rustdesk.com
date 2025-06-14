---
title: 2FA
weight: 16
---

Lors de la connexion à votre compte, activer la vérification d'authentification à deux facteurs (2FA) peut améliorer la sécurité du compte.

Notre console web prend actuellement en charge deux types de 2FA :

1. Vérification par email
2. TOTP. Une application d'authentification tierce est requise pour générer le code de vérification, comme [Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) et [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2).

Vous devez d'abord accéder à la page des paramètres du compte.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/1-settings-account.png)

## Vérification par email

Pour activer la vérification par email pour la connexion, vous devez :

1. Définir l'email.
2. Activer l'option `Activer la vérification de connexion par email`.
3. Cliquer sur `Soumettre`.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-1.png)

Lors de notre prochaine connexion, RustDesk nous enverra un email avec un code de vérification, et la page web redirigera également vers la page de vérification.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-2.png)

## TOTP

TOTP est une méthode 2FA largement utilisée, donc dans la console web de RustDesk Server Pro, 2FA se réfère à la vérification TOTP.

### Préparer l'application d'authentification

Tout d'abord, vous devez préparer une application d'authentification.
Vous pouvez choisir parmi ces types [Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) et [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2).

### Activer 2FA

Lorsque le bouton `Activer 2FA` est affiché sur la page des paramètres, cela signifie que 2FA n'est pas actuellement activé.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-1.png)

Cliquez sur le bouton et un formulaire apparaîtra pour activer 2FA.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-2.png)

Ouvrez l'application d'authentification, ajoutez un compte en scannant le code QR.

Si vous ne pouvez pas scanner le code QR, vous pouvez également entrer le code ici directement.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-3.png)

Après avoir ajouté le compte dans l'application d'authentification, entrez le code de vérification de l'application d'authentification pour activer 2FA.

Après que 2FA soit activé avec succès, RustDesk Server Pro sera également lié à 6 **codes de sauvegarde**. Ainsi, vous pouvez utiliser ces **codes de sauvegarde** pour passer la vérification même si vous ne pouvez pas utiliser l'application d'authentification.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-4.png)

{{% notice note %}}
1. Ces codes de sauvegarde ne peuvent être utilisés qu'une seule fois.

2. Veuillez conserver les codes de sauvegarde dans un endroit sûr.
{{% /notice %}}

### Vérification de connexion

Lorsque 2FA est activé, la vérification de connexion par email n'est plus utilisée. Nous utiliserons la vérification de connexion 2FA à la place.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-5.png)

Lors de la connexion, vous serez redirigé vers la page de vérification.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-6.png)

### Modifier les paramètres

Lorsque 2FA est activé, modifier les paramètres du compte nécessite une vérification 2FA supplémentaire.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-1.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-2.png)

### État 2FA

2FA a un total de 3 états : non activé, activé et expiré.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-not-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-expired.png)

{{% notice note %}}
2FA peut toujours être utilisé normalement après expiration. Cela signifie simplement que les paramètres 2FA n'ont pas été modifiés depuis longtemps (par défaut 180 jours). Pour des raisons de sécurité, nous recommandons de réactiver 2FA, afin que les données secrètes puissent être mises à jour.
{{% /notice %}}