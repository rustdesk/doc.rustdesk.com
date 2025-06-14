---
title: 2FA
weight: 16
---

Quando accedi al tuo account, attivare la verifica dell'Autenticazione a Due Fattori (2FA) può migliorare la sicurezza dell'account.

La nostra console web attualmente supporta due tipi di 2FA:

1. Verifica email
2. TOTP. È richiesta un'app di autenticazione di terze parti per generare il codice di verifica, come [Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) e [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2).

Devi prima andare alla pagina delle impostazioni dell'account.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/1-settings-account.png)

## Verifica email

Per abilitare la verifica email per il login, devi:

1. Impostare l'email.
2. Abilitare l'opzione `Abilita verifica login email`.
3. Cliccare su `Invia`.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-1.png)

Quando effettueremo il login la prossima volta, RustDesk ci invierà un'email con codice di verifica, e la pagina web salterà anche alla pagina di verifica.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-2.png)

## TOTP

TOTP è un metodo 2FA ampiamente utilizzato, quindi nella console web di RustDesk Server Pro, 2FA si riferisce alla verifica TOTP.

### Preparare l'app di autenticazione

Prima, devi preparare un'app di autenticazione.
Puoi scegliere tra questi tipi [Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) e [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2).

### Abilitare 2FA

Quando il pulsante `Abilita 2FA` viene visualizzato nella pagina delle impostazioni, significa che 2FA non è attualmente abilitato.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-1.png)

Clicca il pulsante e apparirà un modulo per abilitare 2FA.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-2.png)

Apri l'app di autenticazione, aggiungi un account scansionando il codice QR.

Se è scomodo scansionare il codice QR, puoi anche inserire il codice qui direttamente.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-3.png)

Dopo aver aggiunto l'account nell'app di autenticazione, inserisci il codice di verifica dall'app di autenticazione per attivare 2FA.

Dopo che 2FA è stato attivato con successo, RustDesk Server Pro sarà anche associato a 6 **codici di backup**. Così puoi usare questi **codici di backup** per superare la verifica anche se non riesci a usare l'app di autenticazione.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-4.png)

{{% notice note %}}
1. Questi codici di backup possono essere usati solo una volta.

2. Per favore mantieni i codici di backup in un posto sicuro.
{{% /notice %}}

### Verifica di login

Quando 2FA è abilitato, la verifica login email non viene più usata. Useremo invece la verifica login 2FA.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-5.png)

Quando fai il login, sarai reindirizzato alla pagina di verifica.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-6.png)

### Modificare le impostazioni

Quando 2FA è abilitato, modificare le impostazioni dell'account richiede verifica 2FA aggiuntiva.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-1.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-2.png)

### Stato 2FA

2FA ha un totale di 3 stati: non abilitato, abilitato e scaduto.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-not-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-expired.png)

{{% notice note %}}
2FA può ancora essere usato normalmente dopo la scadenza. Significa solo che le impostazioni 2FA non sono state cambiate per molto tempo (default 180 giorni). Per motivi di sicurezza, raccomandiamo di riabilitare 2FA, così i dati segreti possono essere aggiornati.
{{% /notice %}}