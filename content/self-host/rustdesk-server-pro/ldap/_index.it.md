---
title: LDAP
weight: 17
---

## Configurazione
Si prega di andare alla pagina delle impostazioni `LDAP` come mostrato di seguito.

![](/docs/en/self-host/rustdesk-server-pro/ldap/images/ldap.png)

- **Host LDAP:** Questo è il nome host o indirizzo IP del server LDAP. Ad esempio, `ldap.example.com` o `192.0.2.1`.

- **Porta LDAP:** Questo è il numero di porta su cui il server LDAP sta ascoltando. La porta predefinita per LDAP è `389`, e per LDAPS (LDAP su SSL) è `636`.

- **DN Base:** Questo è il punto di partenza per la ricerca LDAP. Ad esempio, dc=example,dc=com.

- **Ambito:** Questo determina l'ambito della ricerca nella directory LDAP. Può essere one (Le voci immediatamente sotto il DN base), o sub (Le voci immediatamente sotto il DN base).

- **DN di Bind / Password:** Il nome utente e password amministratore del tuo account di servizio. Questo account è usato per legare a LDAP per autenticare altri utenti. Spesso è un DN utente come `cn=admin,dc=example,dc=com`.

- **Filtro:** Questo è il filtro di ricerca per la query LDAP. Ad esempio, `(objectClass=person)`, o `(&(age=28)(!(name=Bob)))`.

- **Attributo Nome Utente:** Questo è l'attributo che contiene il nome utente. Ad esempio, `uid` o `sAMAccountName`. Per impostazione predefinita, usa `uid` e `cn`. Ecco una [discussione](https://github.com/rustdesk/rustdesk-server-pro/issues/140#issuecomment-1916804393) su questo.

- **StartTLS:** Questo determina se usare StartTLS per aggiornare la connessione a una sicura.

- **NoTLSVerify:** Questo determina se saltare la verifica del certificato TLS. È raccomandato lasciare questo come false (cioè, eseguire la verifica del certificato) a meno che tu non sia sicuro di quello che stai facendo.

## Come funziona?
- Come funzionano i login LDAP, ad esempio devo creare prima un nuovo utente, RustDesk crea un utente al primo login, ecc.?
  > RustDesk crea un utente al primo login
- Come verifico che LDAP funzioni (idealmente un comando che posso dare a RustDesk per restituire gli utenti scoperti.)?
  > Quando invii la configurazione, si connetterà al tuo server LDAP con binddn/password che hai fornito e verificherà se funziona.
- Come cambio utenti locali in utenti LDAP?
  > Non ancora
- Supporta i gruppi LDAP?
  > Non ancora