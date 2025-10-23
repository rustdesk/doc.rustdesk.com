---
title: Strategie
weight: 200
---

Strategia este un instrument pentru administratorii RustDesk care le permite să actualizeze în masă opțiunile de securitate din paginile de setări ale clientului. Administratorii pot crea strategii diferite și le pot aplica dispozitivelor dorite.

## Crearea strategiilor

Puteți crea o nouă strategie făcând clic pe butonul `+` și efectua diverse acțiuni pe strategie plasând cursorul peste ea și făcând clic pe meniul contextual.

În meniul pop‑up puteți alege să `Enable` sau `Disable` strategia, să o `Rename`, `Duplicate` sau `Delete`. În plus, puteți face clic pe `Edit Devices` pentru a modifica dispozitivele cărora li se aplică strategia sau pe `Edit Users` pentru a modifica utilizatorii cărora li se aplică strategia.

În partea dreaptă a meniului strategiei puteți vedea numărul de dispozitive aplicate efectiv strategiei, ținând cont de prioritatea strategiilor.

![](/docs/ro/self-host/rustdesk-server-pro/strategy/images/strategy_menu.png)

## Strategia pentru dispozitiv, strategia pentru utilizator și strategia pentru grup de dispozitive

Strategiile se aplică în ordinea de prioritate următoare:
1. Strategia pentru dispozitiv (cea mai mare prioritate)
2. Strategia pentru utilizator
3. Strategia pentru grup de dispozitive (cea mai mică prioritate)

Fiecare dispozitiv poate fi gestionat de o singură strategie la un moment dat. Sistemul de priorități funcționează astfel:
- Strategiile pentru dispozitiv au prioritate față de strategiile pentru utilizator și cele pentru grupuri de dispozitive
- Strategiile pentru utilizator au prioritate față de strategiile pentru grupuri de dispozitive
- Strategiile pentru grupuri de dispozitive se aplică tuturor dispozitivelor din grupul respectiv care nu au atribuită o strategie pentru dispozitiv sau pentru utilizator


## Editați dispozitivele

Când faceți clic pe meniul `Edit Devices`, se deschide o fereastră de editare care afișează toate dispozitivele. Puteți modifica starea de selecție a casetelor de bifare și apoi faceți clic pe butonul `Save` pentru a aplica modificările dispozitivelor făcute pe pagina curentă. Dacă trebuie să modificați dispozitive aflate pe alte pagini, navigați către acele pagini. Puteți de asemenea folosi meniul drop‑down din colțul din dreapta sus pentru a filtra dispozitivele.

Formatul coloanei Strategy: device strategy/user strategy/device group strategy, sau "-" pentru strategia implicită.

Iată un exemplu al ferestrei care apare când faceți clic pe `Edit Devices` din meniul "demo1". În acest exemplu, dispozitivul "1981241962" este aplicat strategiei "demo3"; dispozitivul "1279471875" este aplicat strategiei "demo2"; dispozitivul "a123456" este aplicat strategiei "demo1"; dispozitivul "1227624460" este aplicat strategiei implicite.

![](/docs/ro/self-host/rustdesk-server-pro/strategy/images/edit_devices.png)

## Editați utilizatorii

Când faceți clic pe meniul `Edit Users`, se deschide o fereastră de editare care afișează toți utilizatorii. Puteți modifica starea de selecție a casetelor de bifare și apoi faceți clic pe butonul `Save` pentru a aplica modificările utilizatorilor făcute pe pagina curentă. Dacă trebuie să modificați utilizatori aflați pe alte pagini, navigați către acele pagini. Puteți de asemenea folosi meniul drop‑down din colțul din dreapta sus pentru a filtra utilizatorii.

Iată un exemplu al ferestrei care apare când faceți clic pe `Edit Users` din meniul "demo2". În acest exemplu, utilizatorul "admin" este aplicat strategiei "default"; utilizatorul "user1" este aplicat strategiei "demo2"; utilizatorul "user2" este aplicat strategiei "demo3".

![](/docs/ro/self-host/rustdesk-server-pro/strategy/images/edit_users.png)

## Editați grupurile de dispozitive

Când faceți clic pe meniul `Edit Device Group`, se deschide o fereastră de editare care afișează toate grupurile de dispozitive. Puteți modifica starea de selecție a casetelor de bifare și apoi faceți clic pe butonul `Save` pentru a aplica modificările grupurilor de dispozitive făcute pe pagina curentă. Dacă trebuie să modificați grupuri de dispozitive aflate pe alte pagini, navigați către acele pagini. Puteți de asemenea folosi meniul drop‑down din colțul din dreapta sus pentru a filtra grupurile de dispozitive.

Iată un exemplu al ferestrei care apare când faceți clic pe `Edit Device Group` din meniul "demo1". În acest exemplu, grupul de dispozitive "device_group1" este aplicat strategiei "demo1"; grupul "group2" este aplicat strategiei "demo2"; grupul "group3" este aplicat strategiei "default".

![](/docs/ro/self-host/rustdesk-server-pro/strategy/images/edit_device_groups.png)

## Sincronizarea strategiilor

Fiecare dispozitiv poate fi gestionat de o singură strategie, iar dacă acea strategie este dezactivată, dispozitivul nu va mai fi gestionat de nicio strategie. La sincronizarea strategiilor, RustDesk înregistrează timpii (timestamp) locali și ai serverului pentru a determina dacă sincronizarea este necesară. Astfel, după ce sincronizarea strategiilor este finalizată:

* Dacă utilizatorul modifică unele opțiuni, clientul va folosi opțiunile stabilite de utilizator.
* Dacă administratorul modifică conținutul strategiei, opțiunile clientului vor fi sincronizate.
* Dacă administratorul modifică strategia căreia îi aparține dispozitivul, opțiunile clientului vor fi sincronizate.

## Editați strategiile

În partea de jos a unei strategii, faceți clic pe `Edit`, efectuați modificările și apoi faceți clic pe `Submit`. Strategia va fi sincronizată către dispozitive în aproximativ 30 de secunde.