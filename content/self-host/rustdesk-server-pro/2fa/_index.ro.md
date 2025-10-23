---
title: 2FA
weight: 16
---

La autentificarea în contul tău, activarea verificării cu două factori (2FA) poate îmbunătăți securitatea contului.

Consola web suportă în prezent două tipuri de 2FA:

1. Verificare prin email
2. TOTP. Este necesară o aplicație de autentificare terță parte pentru a genera codul de verificare, de exemplu [Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) sau [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2).

Mai întâi trebuie să accesezi pagina de setări a contului.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/1-settings-account.png)

## Verificare prin email

Pentru a activa verificarea prin email la autentificare, ai nevoie de:

1. Să setezi o adresă de email.
2. Să activezi opțiunea `Enable email login verification`.
3. Să apeși `Submit`.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-1.png)

La următoarea autentificare, RustDesk îți va trimite un email cu un cod de verificare, iar pagina web te va redirecționa către ecranul de verificare.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-2.png)

## TOTP

TOTP este o metodă 2FA larg utilizată; în consola web a RustDesk Server Pro, 2FA se referă la verificarea TOTP.

### Pregătește o aplicație de autentificare

Mai întâi, instalează o aplicație de autentificare. Poți alege din: [Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) sau [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2).

### Activează 2FA

Când pe pagina de setări apare butonul `Enable 2FA`, înseamnă că 2FA nu este activ momentan.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-1.png)

Apasă butonul și va apărea un formular pentru activarea 2FA.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-2.png)

Deschide aplicația de autentificare și adaugă un cont scanând codul QR.

Dacă nu poți scana codul QR, poți introduce manual codul afișat.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-3.png)

După ce ai adăugat contul în aplicația de autentificare, introdu codul generat în aplicație pentru a activa 2FA.

După activare, RustDesk Server Pro va genera și lega 6 coduri de rezervă (backup codes). Aceste coduri pot fi folosite pentru a trece verificarea în cazul în care nu poți folosi aplicația de autentificare.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-4.png)

{{% notice note %}}
1. Aceste coduri de rezervă pot fi folosite o singură dată fiecare.

2. Păstrează codurile de rezervă într-un loc sigur.
{{% /notice %}}

### Verificare la autentificare

Odată activat 2FA, verificarea prin email nu se mai folosește. La autentificare se va folosi verificarea 2FA.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-5.png)

La autentificare, vei fi redirecționat către pagina de verificare.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-6.png)

### Modificarea setărilor

După ce 2FA este activat, modificarea setărilor contului va necesita verificare 2FA suplimentară.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-1.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-2.png)

### Starea 2FA

2FA are în total 3 stări: neactivat, activat și expirat.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-not-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-expired.png)

{{% notice note %}}
2FA poate fi folosit în continuare chiar și după ce apare ca "expirat". Aceasta înseamnă doar că setările 2FA nu au fost actualizate o perioadă (implicit 180 de zile). Din motive de securitate, recomandăm reactivarea 2FA pentru a regenera secretul.
{{% /notice %}}