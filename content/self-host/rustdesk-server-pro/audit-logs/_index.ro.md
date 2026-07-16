---
title: Jurnale de audit
weight: 19
description: "Folosește jurnalele de audit din consola web RustDesk Server Pro pentru a revizui evenimente de conexiune, transfer de fișiere, operații în consolă și alarme."
keywords: ["rustdesk audit logs", "rustdesk server pro logs", "rustdesk connection logs", "rustdesk file transfer logs", "rustdesk alarm logs", "rustdesk console audit"]
---

Jurnalele de audit din consola web RustDesk Server Pro ajută administratorii să revizuiască activitatea de acces la distanță, transferurile de fișiere, modificările administrative și alarmele de securitate.

Deschide consola web, apoi mergi la **Jurnale** în meniul din stânga. Secțiunea Jurnale include:

- **Conexiune**
- **Fișier**
- **Consolă**
- **Alarmă**

## Jurnale de conexiuni

Mergi la **Jurnale > Conexiune** pentru a revizui sesiunile la distanță și tipurile de conexiune asociate.

Jurnalele de conexiuni afișează:

- **Tip**: Desktop la distanță, Transfer fișiere, Transfer port, Vizualizare cameră, Terminal sau Neautentificat. **Neautentificat** înseamnă că autentificarea nu a reușit.
- **Dispozitiv controlat**: ID-ul și numele dispozitivului țintă.
- **Partea de control**: utilizatorul care controlează atunci când partea de control este autentificată, plus dispozitivul de control, numele dispozitivului și adresa IP.
- **Ora de început**, **Ora de sfârșit** și **Durata**.
- **Autentificare**: metoda principală de autentificare, opțional urmată de informații 2FA.
- **Notă**.

![Pagina jurnalelor de conexiuni](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/connection-log-page.png)

Valorile principale de autentificare acceptate includ:

- Confirmare prin click
- Parolă unică
- Parolă permanentă
- Schimbare părți

Valorile 2FA acceptate includ:

- Cod 2FA
- Dispozitiv de încredere

### Note de conexiune

Partea de control poate adăuga o notă la o conexiune în două moduri:

- În timpul unei sesiuni la distanță, folosește acțiunea **Notă** din meniul remote pentru a adăuga sau actualiza nota conexiunii.

![Casetă notă conexiune](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/note-box.png)

- La finalul unei sesiuni la distanță, activează **Setări > General > Altele > Cere notă la finalul conexiunii** pe partea de control dacă vrei ca RustDesk să ceară o notă când sesiunea se încheie.

![Casetă notă la închiderea conexiunii](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/close-conn-note-box.png)

Nota este afișată în coloana **Notă** din **Jurnale > Conexiune**. Utilizatorii care pot vedea jurnalul de conexiuni pot folosi și butonul de editare din coloana **Notă** pentru a actualiza nota din consola web.

### Deconectarea unei conexiuni active

Dacă o conexiune este încă activă și contul tău are permisiunea de a edita acel element de audit, coloana **Acțiune** afișează **Deconectare**. Apasă și confirmă operația pentru a încheia conexiunea activă.

![Confirmare deconectare](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/disconnect-confirm.png)

După ce conexiunea este deconectată din consola web, partea de control vede un mesaj că această conexiune a fost deconectată din consola web.

![Mesaj deconectat de consolă](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/disconnected-by-console.png)

## Jurnale de transfer fișiere

Mergi la **Jurnale > Fișier** pentru a revizui activitatea de transfer fișiere.

![Pagina jurnalelor de transfer fișiere](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/file-transfer-logs.png)

Jurnalele de transfer fișiere includ operații de fișiere din sesiuni dedicate de **Transfer fișiere** și copiere/lipire de fișiere în timpul sesiunilor de **Desktop la distanță**.

Jurnalele de transfer fișiere afișează:

- **Dispozitiv controlat**.
- **Partea de control**: dispozitivul de control și utilizatorul care controlează, când sunt disponibile.
- **Timp**.
- **Direcție**:
  - Dispozitiv controlat -> Partea de control
  - Partea de control -> Dispozitiv controlat
- **Fișier**: calea de pe dispozitivul controlat.
- **Detalii**: dimensiunea fișierului pentru un singur fișier sau numărul de fișiere pentru transferuri cu mai multe fișiere.

Pentru transferuri cu mai multe fișiere, apasă pe numărul de fișiere din coloana **Detalii** pentru a deschide panoul de detalii. Când transferul conține mai multe fișiere decât listează panoul, panoul arată cele mai mari 10 fișiere după dimensiune.

![Detalii transfer fișiere](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/file-transfer-details.png)

## Jurnale de alarme

Mergi la **Jurnale > Alarmă** pentru a revizui evenimente legate de securitate.

![Pagina jurnalelor de alarme](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/alarm-logs.png)

Jurnalele de alarme afișează:

- **Tip**.
- **De la**: pentru alarmele de cont de autentificare, acesta este dispozitivul de autentificare. Pentru alarmele de conexiune la distanță, aceasta este partea de control.
- **Țintă**: pentru alarmele de cont de autentificare, acesta este contul de autentificare. Pentru alarmele de conexiune la distanță, acesta este dispozitivul controlat.
- **Ora evenimentului**.

Tipurile de alarme pentru conexiuni la distanță includ:

- Încercare de acces din afara listei albe de IP
- Peste 30 de încercări consecutive de acces
- Mai multe încercări de acces într-un minut
- Prea multe încercări consecutive de acces dintr-un singur prefix IPv6
- Mai multe încercări eșuate de autentificare în Terminal (Rulează ca administrator) (nume de utilizator/parolă greșite)
- Mai multe încercări simultane de autentificare în Terminal (Rulează ca administrator)
- Încălcarea domeniului sesiunii

Tipurile de alarme pentru conturi de autentificare includ:

- Peste 30 de încercări consecutive de autentificare
- Mai multe încercări de autentificare într-un minut
- Mai multe încercări de autentificare într-o oră

## Jurnale de operații în consolă

Mergi la **Jurnale > Consolă** pentru a revizui acțiunile efectuate în consola web.

![Pagina jurnalelor de operații în consolă](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/console-logs.png)

Jurnalele consolei afișează:

- **Tip**.
- **Utilizator**: utilizatorul consolei web care a efectuat operația.
- **Operație**: acțiunea specifică.
- **Timp**.
- **Detalii**: câmpuri suplimentare înregistrate pentru operație.

Tipurile includ:

- Management grupuri
- Management utilizatori
- Management dispozitive
- Management agendă
- Management roluri admin
- Management roluri de control

Operațiile urmărite includ autentificarea utilizatorului, schimbări ale utilizatorilor și dispozitivelor, deconectarea unui dispozitiv, schimbări ale agendei, schimbări 2FA, resetarea parolei, schimbări ale rolurilor admin/control și altele.

## Vizibilitatea și retenția jurnalelor

Vizibilitatea jurnalelor depinde de faptul că utilizatorul este administrator, dacă utilizatorul are un [Rol de Administrator](/docs/ro/self-host/rustdesk-server-pro/admin-role/) cu permisiuni pentru jurnale de audit și de setarea din **Setări > Altele**.

| Tip utilizator sau setare | Vizibilitate jurnale |
| --- | --- |
| Administrator | Poate vedea toate jurnalele de audit. |
| Rol de Administrator cu **Global > Audit Logs-View** | Poate vedea toate jurnalele de audit, chiar și când **Doar administratorul poate accesa jurnalele** este activat. |
| Rol de Administrator cu **Individual > Audit Logs-View** | Poate vedea jurnalele de audit personale, chiar și când **Doar administratorul poate accesa jurnalele** este activat. Aceasta oferă același domeniu de jurnale personale ca un utilizator obișnuit non-administrator, dar nu este blocat de acea setare. |
| Utilizator non-administrator fără permisiuni pentru jurnale de audit | Poate vedea jurnalele de audit personale doar când **Doar administratorul poate accesa jurnalele** este dezactivat. |
| **Setări > Altele > Doar administratorul poate accesa jurnalele** activat | Utilizatorii non-administrator fără permisiuni pentru jurnale de audit nu pot accesa jurnalele de audit. |

Jurnalele personale includ înregistrări de conexiune și transfer fișiere unde un dispozitiv atribuit în prezent utilizatorului este dispozitivul controlat sau dispozitivul de control, precum și înregistrări unde utilizatorul este controlorul. Pentru jurnalele de alarme, jurnalele personale includ înregistrări pentru dispozitive atribuite utilizatorului sau pentru contul de autentificare al utilizatorului. Pentru jurnalele de operații în consolă, jurnalele personale includ înregistrări unde utilizatorul este operatorul.

Folosește **Setări > Altele > Retenție jurnale (zile)** pentru a controla cât timp sunt păstrate jurnalele de audit. Introdu `0` pentru a păstra toate jurnalele pe termen nelimitat. Introdu un număr mai mare decât `0` pentru a șterge automat jurnalele mai vechi decât numărul specificat de zile. Curățarea rulează o dată pe oră.

## Export jurnale de audit

Fiecare pagină de jurnale are **Exportă ca CSV** în bara de instrumente. Fișierul exportat respectă filtrele curente de pe pagină și folosește aceleași valori de timp afișate în consola web. Fiecare export include până la 1000 de înregistrări, dar poți folosi filtrul **Ora de început** pentru a exporta toate jurnalele în loturi.

Poți folosi și un [token API](/docs/ro/self-host/rustdesk-server-pro/console/#audits-auditspy) cu `audits.py` pentru a interoga jurnalele de audit.
