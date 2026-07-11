---
title: Agendă
weight: 201
description: "Folosește agenda în RustDesk Server Pro pentru a salva dispozitive la distanță, a partaja liste de dispozitive, a organiza dispozitive cu tag-uri și a te conecta din clientul RustDesk cu parole partajate."
keywords: ["rustdesk address book", "rustdesk server pro address book", "rustdesk shared address book", "rustdesk device tags", "rustdesk shared password"]
---

Agenda le permite utilizatorilor să salveze ID-uri de dispozitive RustDesk, să le organizeze cu tag-uri, să partajeze liste de dispozitive și să se conecteze din clientul RustDesk cu parole salvate.

## Răspunsuri rapide

- **Agenda mea** este privată pentru utilizatorul autentificat. Parolele introduse manual și memorate sunt salvate în **Agenda mea** și pot fi sincronizate între dispozitivele utilizatorului.
- Agendele **partajate** pot fi partajate cu utilizatori specifici, grupuri de utilizatori sau toți utilizatorii.
- O agendă partajată poate stoca o parolă la nivel de agendă, iar fiecare intrare de dispozitiv poate stoca o parolă la nivel de dispozitiv. Când parola la nivel de dispozitiv nu este setată, este folosită parola la nivel de agendă.
- Tag-urile pot fi folosite pentru a filtra dispozitivele în consola web și în clientul RustDesk.

## Conectare cu un clic folosind o agendă partajată

Folosește o agendă partajată atunci când utilizatorii trebuie să se conecteze fără să introducă manual parola la distanță de fiecare dată.

1. Creează sau deschide o agendă partajată. Opțional, setează o **parolă la nivel de agendă** pentru agendă.

2. Fă clic pe numele agendei pentru a deschide pagina dispozitivelor. Fă clic pe **Import**, selectează dispozitivele de importat în agendă și fă clic pe **Save** în partea de jos pentru a salva dispozitivele selectate. Sau fă clic pe **Add** pentru a adăuga un dispozitiv după ID, folosind o adresă IP ca ID pentru acces IP direct. Opțional, setează o **parolă la nivel de dispozitiv** pentru intrările individuale de dispozitiv.

3. Partajează agenda cu utilizatori specifici, grupuri de utilizatori sau toți utilizatorii.

4. Utilizatorul se autentifică în clientul RustDesk și deschide fila **Agendă**.

5. Utilizatorul selectează agenda partajată și face clic pe cardul dispozitivului.

![Clic pe cardul unui dispozitiv dintr-o agendă partajată în client](/docs/en/self-host/rustdesk-server-pro/address-book/images/click-peer-card.png)

{{% notice warning %}}
Parola partajată este folosită doar la conectarea din agenda partajată corespunzătoare, fie prin clic pe cardul dispozitivului, fie folosind meniul său derulant. Nu este folosită din altă filă de dispozitiv, din butonul **Connect** de lângă câmpul de introducere a ID-ului sau din altă agendă partajată.
{{% /notice %}}

## Permisiunile agendei partajate

| Permisiune | Ce pot face utilizatorii |
| --- | --- |
| **Doar citire** | Pot vedea dispozitivele și tag-urile și pot folosi parola. |
| **Citire/Scriere** | Pot edita dispozitivele și tag-urile. |
| **Control complet** | Pot repartaja, șterge sau redenumi agenda. |

Când mai multe reguli se potrivesc aceluiași utilizator, prioritatea este:

1. Utilizator
2. Grup
3. Toți

De exemplu, dacă **Toți** au Doar citire, dar un anumit utilizator are Control complet, acel utilizator primește permisiunea Control complet.

![Permisiuni de partajare a agendei](/docs/en/self-host/rustdesk-server-pro/address-book/images/share-list.png)

![Permisiunea unei agende partajate în consola web](/docs/en/self-host/rustdesk-server-pro/address-book/images/user1-permission.png)

## Consola web

### Creează sau editează o agendă partajată

În **Agendă > Partajată**, creează o agendă partajată cu un nume, o notă opțională și o **parolă partajată implicită** opțională. Aceasta este parola la nivel de agendă.

![Creează agendă partajată cu parolă partajată implicită](/docs/en/self-host/rustdesk-server-pro/address-book/images/create-shared-address-book.png)

### Adaugă dispozitive și parole

Dispozitivele pot fi adăugate manual după ID sau importate din lista de dispozitive Server Pro. Pentru fiecare intrare poți seta un alias, tag-uri, o notă și, pentru agendele partajate, o parolă la nivel de dispozitiv.

![Adaugă dispozitiv în agenda partajată](/docs/en/self-host/rustdesk-server-pro/address-book/images/import-device.png)

![Dispozitive](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-addressbook-devices.png)

![Editează dispozitiv în agenda partajată](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-edit-device.png)

### Tag-uri și filtrare

Tag-urile organizează și filtrează dispozitivele. `Fără tag` filtrează dispozitivele fără tag-uri. Cu **Filtrare după intersecție** activată, sunt afișate doar dispozitivele care se potrivesc tuturor tag-urilor selectate.

### Coș de reciclare

Ștergerea unui dispozitiv dintr-o agendă mută intrarea în coșul de reciclare al acelei agende. Nu șterge dispozitivul din RustDesk Server Pro.

## Comportamentul parolei partajate

| Nivelul parolei | Prioritate |
| --- | --- |
| Parolă la nivel de dispozitiv | Folosită prima atunci când intrarea dispozitivului are o parolă. |
| Parolă la nivel de agendă | Folosită atunci când intrarea dispozitivului nu are parolă. |

Dacă niciuna dintre parole nu este setată, utilizatorul se conectează normal și poate fi necesar să introducă manual parola. În consola web, coloanele de parole arată doar dacă o parolă este setată.

## Clientul RustDesk

După autentificare, folosește selectorul de agendă pentru a comuta între **Agenda mea** și agendele partajate. Pentru agendele partajate, clientul afișează permisiunea utilizatorului curent.

![Selectorul de agendă al clientului RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-selector.png)

![Agendă doar citire](/docs/en/self-host/rustdesk-server-pro/address-book/images/read-only-address-book.png)

### Editare din client

Utilizatorii cu permisiune de scriere pot adăuga ID-uri, adăuga tag-uri, edita alias-uri, edita tag-uri, edita note, seta parole partajate sau elimina intrări.

![Meniu dispozitiv agendă 1 în clientul RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu1.png)

![Adaugă ID în clientul RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-add-id.png)

![Meniu dispozitiv agendă 2 în clientul RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu2.png)

![Schimbă parola în clientul RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-change-password.png)

## Presetări de implementare

Configurația clientului RustDesk poate preseta atribuirea agendei:

- `preset-address-book-name`
- `preset-address-book-tag`
- `preset-address-book-alias`
- `preset-address-book-password`
- `preset-address-book-note`

`preset-address-book-alias`, `preset-address-book-password` și `preset-address-book-note` necesită RustDesk client 1.4.3 sau mai nou și RustDesk Server Pro 1.6.6 sau mai nou.

Pentru mai multe detalii, vezi [configurația avansată a clientului](/docs/en/self-host/client-configuration/advanced-settings/#preset-address-book-name--preset-address-book-tag--preset-address-book-alias--preset-address-book-password--preset-address-book-note).

## Setări conexe

| Setare | Unde | Efect |
| --- | --- | --- |
| **Permite utilizatorilor non-admin să partajeze agende cu alte grupuri** | **Settings > Others** | Permite utilizatorilor non-admin să partajeze agende cu alte grupuri de utilizatori. |
| **Dezactivează agenda** | **Custom Client** | Ascunde sau dezactivează agenda în clientul personalizat generat. |

## Depanare

### Parolă greșită

Parola salvată într-o agendă partajată este folosită de clientul RustDesk care controlează. Nu este setată pe dispozitivul controlat. Setează parola dispozitivului controlat pe acel dispozitiv în **Settings > Security > Password**.

Pentru a folosi parola partajată, conectează-te din agenda partajată corespunzătoare făcând clic pe cardul dispozitivului. Conectarea din altă agendă, altă filă de dispozitiv sau din butonul **Connect** de lângă câmpul de introducere a ID-ului nu folosește parola partajată a acestei agende.
