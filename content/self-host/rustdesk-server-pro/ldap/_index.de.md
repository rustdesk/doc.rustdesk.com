---
Titel: LDAP
Gewicht: 17
---

## Aufbau
Bitte gehen Sie wie folgt zur Seite „LDAP“-Einstellungen.

![](/docs/en/self-host/rustdesk-server-pro/ldap/images/ldap.png)

- **LDAP-Host:** Dies ist der Hostname oder die IP-Adresse des LDAP-Servers. Zum Beispiel ldap.example.com oder 192.0.2.1.

- **LDAP-Port:** Dies ist die Portnummer, die der LDAP-Server überwacht. Der Standardport für LDAP ist 389 und für LDAPS (LDAP über SSL) 636.

- **Basis-DN:** Dies ist der Ausgangspunkt für die LDAP-Suche. Beispiel: dc=example,dc=com.

- **Bereich:** Dies bestimmt den Umfang der Suche im LDAP-Verzeichnis. Es kann eins (die Einträge direkt unter dem Basis-DN) oder sub (die Einträge direkt unter dem Basis-DN) sein.

- **Bind DN/Passwort:** Der Admin-Benutzername und das Passwort Ihres Dienstkontos. Dieses Konto wird zur Bindung an LDAP zur Authentifizierung anderer Benutzer verwendet. Es ist oft ein Benutzer-DN wie cn=admin,dc=example,dc=com.

- **Filter:** Dies ist der Suchfilter für die LDAP-Abfrage. Zum Beispiel „(objectClass=person)“ oder „(&(age=28)(!(name=Bob)))“.

- **Benutzernamensattribut:** Dies ist das Attribut, das den Benutzernamen enthält. Zum Beispiel „uid“ oder „sAMAccountName“. Standardmäßig werden „uid“ und „cn“ verwendet. Hier ist eine Diskussion dazu: [https://github.com/rustdesk/rustdesk-server-pro/issues/140#issuecomment-1916804393](https://github.com/rustdesk/rustdesk-server-pro/issues /140#issuecomment-1916804393).

- **StartTLS:** Dies ist ein boolescher Wert (wahr oder falsch), der bestimmt, ob StartTLS verwendet werden soll, um die Verbindung auf eine sichere Verbindung zu aktualisieren.

- **NoTLSVerify:** Dies ist ein boolescher Wert (wahr oder falsch), der bestimmt, ob die TLS-Zertifikatsüberprüfung übersprungen werden soll. Es wird empfohlen, dies auf „false“ zu belassen (d. h. eine Zertifikatsüberprüfung durchzuführen), es sei denn, Sie sind sich sicher, was Sie tun.

## Wie funktioniert es?
- Wie funktionieren LDAP-Logins, z.B. Muss ich zuerst einen neuen Benutzer erstellen, erstellt RustDesk beim ersten Anmelden einen Benutzer usw.?
   > RustDesk erstellt beim ersten Login einen Benutzer
- Wie überprüfe ich, ob LDAP funktioniert (idealerweise ein Befehl, den ich RustDesk geben kann, um die erkannten Benutzer zurückzugeben)?
   > Wenn Sie die Konfiguration übermitteln, stellt sie mit dem von Ihnen angegebenen Binddn/Passwort eine Verbindung zu Ihrem LDAP-Server her und überprüft, ob sie funktioniert.
- Wie ändere ich lokale Benutzer in LDAP-Benutzer?
   > Noch nicht
- Unterstützt es die LDAP-Gruppe?
   > Noch nicht
