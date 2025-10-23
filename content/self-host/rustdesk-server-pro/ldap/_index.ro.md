---
title: LDAP
weight: 17
---

## Configurare
Accesează pagina de setări `LDAP` așa cum se vede mai jos.

![](/docs/en/self-host/rustdesk-server-pro/ldap/images/ldap.png)

- **LDAP Host:** Numele de gazdă sau adresa IP a serverului LDAP. Exemplu: `ldap.example.com` sau `192.0.2.1`.

- **LDAP Port:** Portul pe care ascultă serverul LDAP. Portul implicit pentru LDAP este `389`, iar pentru LDAPS (LDAP peste SSL) este `636`.

- **Base DN:** Punctul de plecare pentru căutarea în LDAP. Exemplu: `dc=example,dc=com`.

- **Scope:** Determină aria de căutare în directorul LDAP. Poate fi `one` (intrările imediat sub Base DN) sau `sub` (inclusiv sub-arbori sub Base DN).

- **Bind DN / Password:** Numele de utilizator (DN) și parola contului de serviciu. Acest cont este folosit pentru a face bind la LDAP și a autentifica alți utilizatori. De obicei este un DN de tip `cn=admin,dc=example,dc=com`.

- **Filter:** Filtrul de căutare pentru interogarea LDAP. Exemplu: `(objectClass=person)` sau `(&(age=28)(!(name=Bob)))`.

- **Username Attribute:** Atributul care conține numele de utilizator. Exemplu: `uid` sau `sAMAccountName`. Implicit folosește `uid` și `cn`. Discuție aici: https://github.com/rustdesk/rustdesk-server-pro/issues/140#issuecomment-1916804393.

- **StartTLS:** Determină dacă se folosește StartTLS pentru a upgrada conexiunea la una securizată.

- **NoTLSVerify:** Determină dacă se sare verificarea certificatului TLS. Recomandat: păstrează setarea pe `false` (să verifice certificatul) decât dacă știi exact ce faci.

## Cum funcționează?
- Cum funcționează autentificările LDAP: trebuie creat un utilizator local înainte, RustDesk creează un utilizator la prima autentificare, etc.?
	> RustDesk creează un utilizator la prima autentificare.
- Cum verific dacă LDAP funcționează (ideal o comandă pe care RustDesk o poate rula pentru a returna utilizatorii descoperiți)?
	> Când trimiți configurația, sistemul se conectează la serverul LDAP folosind `binddn`/parola furnizate și verifică funcționalitatea.
- Cum pot converti utilizatorii locali în utilizatori LDAP?
	> Nu este disponibil momentan.
- Suportă grupuri LDAP?
	> Nu este disponibil momentan.