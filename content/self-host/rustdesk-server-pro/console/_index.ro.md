---
title: Consolă web
weight: 10
---

Consola web este integrată în RustDesk Server Pro și rulează pe portul `21114`.

Funcționalități:

- Răsfoire dispozitive
- Adăugare/modificare utilizatori și grupuri de utilizatori
- Modificare permisiuni de acces ale dispozitivelor
- Răsfoire jurnale de conexiuni și alte jurnale
- Actualizare setări
- Management sincronizare setări client
- Gestionare agende partajate
- Generare build client personalizat

## Autentificare

Portul implicit al consolei web este 21114. Introdu `http://<adresa-serverului>:21114` în browser pentru a accesa consola, așa cum se arată în figura de mai jos. Numele de utilizator/parola implicită pentru administrator este `admin`/`test1234`:

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

Dacă ai nevoie de suport HTTPS, instalează un server web precum `Nginx` sau folosește `IIS` pe Windows.

După autentificare schimbă parola: din meniul contului (colțul din dreapta sus) selectează `Settings` pentru a intra pe pagina de modificare a parolei, așa cum se arată mai jos. Poți crea și un alt cont de administrator și șterge pe cel implicit. Este recomandat să activezi verificarea prin email la autentificare.

<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

Utilizatorii non-administrator pot, de asemenea, să se autentifice pentru a-și vizualiza dispozitivele și jurnalele și pentru a-și modifica setările de utilizator.

## Configurări automate
Făcând click pe `Windows EXE` poți obține configurațiile pentru propriul RustDesk Server Pro — utile pentru configurarea clienților.

Pentru clienții Windows poți omite configurația serverului personalizat și pune informațiile de configurare direct în numele fișierului `rustdesk.exe`. Așa cum se arată mai sus, mergi la pagina de bun venit a consolei și apasă `Windows EXE`. **Client ≥ 1.1.9 necesar.**

Poți folosi aceasta în combinație cu [config client](https://rustdesk.com/docs/en/self-host/client-configuration/) și [scripturi de deployment](https://rustdesk.com/docs/en/self-host/client-deployment/) pentru a configura clienții.

## Crearea unui utilizator nou în afară de utilizatorul implicit `admin`

{{% notice note %}}
Planul `Individual` nu are această funcționalitate.
{{% /notice %}}

1. Click pe `Users` în meniul din stânga.
2. Creează un cont nou și activează `administrator`.
3. Autentifică-te cu noul cont administrativ.
4. Șterge utilizatorul `admin` din pagina `Users`.

## Crearea unui utilizator nou
1. Click pe `Users` în meniul din stânga.
2. Creează un utilizator nou.
3. Selectează grupul din care să facă parte (dacă trebuie să adaugi grupuri noi, vezi secțiunea următoare).

## Adăugarea unui grup nou
1. Click pe `Groups` în meniul din stânga.
2. Creează un grup nou.
3. După creare poți permite accesul între grupuri: click `Edit`.
4. Selectează grupurile relevante cărora vrei să le permiți acces (se adaugă automat în grupul corespunzător).

## Configurarea mai multor servere relay
1. Mergi la `Settings` în meniul din stânga.
2. Click pe `Relay` din submenu.
3. Apasă `+` lângă `Relay Servers`.
4. Introdu adresa DNS sau IP a serverului Relay și apasă <kbd>Enter</kbd>.
5. Dacă ai mai multe servere Relay continuă să apeși `+` și ajustează setările Geo dacă este necesar (amintește-ți să copiezi cheia către celelalte servere).

## Setare sau schimbare licență
1. Mergi la `Settings` în meniul din stânga.
2. Click pe `License` din submenu.
3. Apasă `Edit` și lipește codul licenței.
4. Apasă `OK`.

## Vizualizare jurnale
În meniul din stânga click pe `Logs`.

## Configurare emailuri
Exemplu folosind Gmail:

1. Mergi la `Settings` în meniul din stânga.
2. Click pe `SMTP` din submenu.
3. Introdu serverul SMTP `smtp.gmail.com`.
4. În `SMTP Port` introdu 587.
5. În `Mail Account` pune contul Gmail, ex. `myrustdeskserver@gmail.com`.
6. Introdu parola (s-ar putea să ai nevoie de o parolă de aplicație).
7. În `From` pune același cont Gmail `myrustdeskserver@gmail.com`.
8. Click `Check` pentru a salva.

## Atribuirea utilizatorilor/strategiilor/grupurilor de dispozitive prin Consola Web

Utilizatorul este contul RustDesk conectat pe dispozitiv sau atribuit dispozitivului prin click pe **Edit** lângă dispozitiv; click în câmpul **User** și alege din listă. Poți atribui în masă dispozitive unui utilizator din **User List** → **More → Assign Devices**.

Pentru a adăuga un dispozitiv într-un grup de dispozitive, click pe **Edit** lângă dispozitiv în **Device List** și modifică **Group**, sau mergi la lista **Device Groups**, click pe numele grupului și ajustează dispozitivele din acel grup.

Pentru a atribui o strategie unui dispozitiv, plasează cursorul în partea dreaptă a listei **Strategy** și click pe **Edit Devices**, **Edit Users** sau **Edit Device Groups** pentru a adăuga device-urile, dispozitivele utilizatorilor sau grupurile de dispozitive corespunzătoare strategiei selectate.

---

## Token API

Mai întâi trebuie să mergi la **Settings → Tokens → Create** și să creezi un token cu permisiunile necesare: **Device, Audit Log, User, Group, Strategy, Address Book**.

Odată creat, poți folosi aceste token-uri din linia de comandă sau din CLI Python pentru a efectua acțiuni cu permisiunile respective.

### Atribuire via token din linia de comandă

Poți folosi executabilul RustDesk cu parametrul `--assign` pentru a face atribuiri din linia de comandă:

Exemplu:

```bash
"C:\Program Files\RustDesk\rustdesk.exe" --assign --token <generatedtoken> --user_name <username>
```

Parametri suportati

| Parameter                               | Descriere                             | RustDesk Server Pro | RustDesk Client |
| --------------------------------------- | ------------------------------------- | ------------------- | --------------- |
| `--user_name <username>`                | Atribuie un utilizator dispozitivului  |                     |                 |
| `--strategy_name <strategyname>`        | Atribuie o strategie dispozitivului    |                     |                 |
| `--address_book_name <addressbookname>` | Atribuie dispozitivul la o agendă      |                     |                 |
| `--address_book_tag <addressbooktag>`   | Atribuire folosind tag-ul agendei      |                     |                 |
| `--address_book_alias <alias>`          | Atribuire folosind aliasul             | 1.5.8               | 1.4.1           |
| `--address_book_password <password>`    | Setează parola pentru înregistrare     | 1.6.6               | 1.4.3           |
| `--address_book_note <note>`            | Setează nota pentru înregistrare       | 1.6.6               | 1.4.3           |
| `--device_group_name <devicegroupname>` | Atribuie dispozitiv la grup            |                     |                 |
| `--note <note>`                         | Adaugă o notă dispozitivului           | 1.6.6               | 1.4.3           |
| `--device_username <device_username>`   | Setează username pentru dispozitiv     | 1.6.6               | 1.4.3           |
| `--device_name <device_name>`           | Setează numele dispozitivului          | 1.6.6               | 1.4.3           |

Linia de comandă pe Windows nu afișează output implicit. Pentru a obține output rulează comanda astfel: `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more` sau `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String` (vezi discuție referință în repo).

### Unelte CLI Python

#### Management utilizatori (`users.py`)

**Afișează help:**  
`./users.py -h`

**Vezi utilizatori:**  
`./users.py --url <url> --token <token> view [--name <username>] [--group_name <group_name>]`

**Filtre:**  
`--name`: username  
`--group_name`: grup utilizatori

**Exemplu:**  
`./users.py --url https://example.com --token <token> view --group_name admins`

**Operații:**  
`view` poate fi înlocuit cu `enable`, `disable`, sau `delete`.

**Exemplu (dezactivează utilizator):**  
`./users.py --url https://example.com --token <token> disable --name testuser`

---

#### Management dispozitive (`devices.py`)

**Afișează help:**  
`./devices.py -h`

**Vezi dispozitive:**  
`./devices.py --url <url> --token <token> view [--id <device_id>] [--device_name <device_name>] [--user_name <user_name>] [--group_name <group_name>] [--device_group_name <device_group_name>] [--offline_days <days>]`

**Filtre:**  
`--id`: ID dispozitiv  
`--device_name`: nume dispozitiv  
`--user_name`: utilizator atribuit  
`--group_name`: grup utilizatori  
`--device_group_name`: grup dispozitive  
`--offline_days`: zile de când este offline

**Exemplu:**  
`./devices.py --url https://example.com --token <token> view --user_name mike`

**Operații:**  
`view` poate fi înlocuit cu `enable`, `disable`, `delete`, sau `assign`.

**Exemplu (atribuie device):**  
`./devices.py --url https://example.com --token <token> assign --device_name PC01 --assign_to user_name=mike`

---

#### Management agendă (`ab.py`)

**Afișează help:**  
`./ab.py -h`

**Vezi agende partajate:**  
`./ab.py --url <url> --token <token> view-ab [--ab-name <address_book_name>]`

**Obține GUID-ul agendei personale:**  
`./ab.py --url <url> --token <token> get-personal-ab`

**Adaugă o agendă partajată:**  
`./ab.py --url <url> --token <token> add-ab --ab-name <name> [--note <note>] [--password <password>]`

**Actualizează sau șterge o agendă partajată:**  
`./ab.py --url <url> --token <token> update-ab --ab-guid <guid> [--ab-update-name <new_name>] [--note <note>]`  
`./ab.py --url <url> --token <token> delete-ab --ab-guid <guid>`

**Vezi peer-ii dintr-o agendă:**  
`./ab.py --url <url> --token <token> view-peer --ab-guid <guid> [--peer-id <peer_id>] [--alias <alias>]`

**Adaugă/actualizează/șterge un peer:**  
`./ab.py --url <url> --token <token> add-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]`  
`./ab.py --url <url> --token <token> update-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]`  
`./ab.py --url <url> --token <token> delete-peer --ab-guid <guid> --peer-id <peer_id>`

**Management tag-uri:**  
`./ab.py --url <url> --token <token> view-tag --ab-guid <guid>`  
`./ab.py --url <url> --token <token> add-tag --ab-guid <guid> --tag-name <name> [--tag-color 0xFF00FF00]`  
`./ab.py --url <url> --token <token> update-tag --ab-guid <guid> --tag-name <name> --tag-color 0xFFFF0000`  
`./ab.py --url <url> --token <token> delete-tag --ab-guid <guid> --tag-name <name>`

**Management reguli de acces:**  
`./ab.py --url <url> --token <token> view-rule --ab-guid <guid>`  
`./ab.py --url <url> --token <token> add-rule --ab-guid <guid> [--rule-type user|group|everyone] [--rule-user <user>] [--rule-group <group>] --rule-permission ro|rw|full`  
`./ab.py --url <url> --token <token> update-rule --rule-guid <rule_guid> --rule-permission rw`  
`./ab.py --url <url> --token <token> delete-rule --rule-guid <rule_guid>`

**Exemplu (adaugă regulă read-only pentru utilizatorul "mike"):**  
`./ab.py --url https://example.com --token <token> add-rule --ab-guid <guid> --rule-user mike --rule-permission ro`

---

#### Audits (`audits.py`)

**Afișează help:**  
`./audits.py -h`

**Vezi audituri conexiuni:**  
`./audits.py --url <url> --token <token> view-conn [--remote <peer_id>] [--conn-type <type>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**Vezi audituri fișiere:**  
`./audits.py --url <url> --token <token> view-file [--remote <peer_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**Vezi audituri alarme:**  
`./audits.py --url <url> --token <token> view-alarm [--device <device_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**Vezi audituri consolă:**  
`./audits.py --url <url> --token <token> view-console [--operator <username>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**Filtre:**  
`--remote`: Peer ID (pentru conexiuni sau audituri fișiere)  
`--conn-type`: 0=Remote Desktop, 1=File Transfer, 2=Port Transfer, 3=View Camera, 4=Terminal  
`--device`: ID dispozitiv (pentru audit alarme)  
`--operator`: username operator (pentru audit consolă)  
`--created-at`: Filtru după timp local, ex. "2025-09-16 14:15:57"  
`--days-ago`: Filtru pentru înregistrări mai noi decât numărul de zile  
`--page-size` / `--current`: Paginare

**Exemplu:**  
`./audits.py --url https://example.com --token <token> view-conn --remote 123456789 --days-ago 7`


## Căutarea unui dispozitiv
1. Mergi la Devices.
2. În câmpul Device Name tastează numele și apasă `Query` sau <kbd>Enter</kbd>.
3. Pentru wildcard adaugă `%` la început, sfârșit sau ambele părți ale termenului de căutare.