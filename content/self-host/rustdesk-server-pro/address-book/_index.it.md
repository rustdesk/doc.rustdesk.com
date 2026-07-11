---
title: Rubrica
weight: 201
description: "Usa la rubrica in RustDesk Server Pro per salvare dispositivi remoti, condividere elenchi di dispositivi, organizzare i dispositivi con tag e connetterti dal client RustDesk con password condivise."
keywords: ["rustdesk address book", "rustdesk server pro address book", "rustdesk shared address book", "rustdesk device tags", "rustdesk shared password"]
---

La rubrica consente agli utenti di salvare ID dispositivo RustDesk, organizzarli con tag, condividere elenchi di dispositivi e connettersi dal client RustDesk con password salvate.

## Risposte rapide

- **Rubrica** è privata per l'utente che ha effettuato l'accesso. Le password inserite manualmente e ricordate vengono salvate in **Rubrica** e possono essere sincronizzate tra i dispositivi dell'utente.
- Le rubriche **condivise** possono essere condivise con utenti specifici, gruppi di utenti o tutti gli utenti.
- Una rubrica condivisa può memorizzare una password a livello di rubrica, e ogni voce dispositivo può memorizzare una password a livello di dispositivo. Quando la password a livello di dispositivo non è impostata, viene usata la password a livello di rubrica.
- I tag possono essere usati per filtrare i dispositivi nella console web e nel client RustDesk.

## Connessione con un clic usando una rubrica condivisa

Usa una rubrica condivisa quando gli utenti devono connettersi senza inserire manualmente ogni volta la password remota.

1. Crea o apri una rubrica condivisa. Facoltativamente, imposta una **password a livello di rubrica** sulla rubrica.

2. Fai clic sul nome della rubrica per aprire la pagina dei dispositivi. Fai clic su **Importa**, seleziona i dispositivi da importare nella rubrica e fai clic su **Salva** in basso per salvare i dispositivi selezionati. Oppure fai clic su **Aggiungi** per aggiungere un dispositivo tramite ID, usando un indirizzo IP come ID per l'accesso IP diretto. Facoltativamente, imposta una **password a livello di dispositivo** sulle singole voci dispositivo.

3. Condividi la rubrica con utenti specifici, gruppi di utenti o tutti gli utenti.

4. L'utente accede al client RustDesk e apre la scheda **Rubrica**.

5. L'utente seleziona la rubrica condivisa e fa clic sulla scheda del dispositivo.

![Fare clic sulla scheda dispositivo di una rubrica condivisa nel client](/docs/en/self-host/rustdesk-server-pro/address-book/images/click-peer-card.png)

{{% notice warning %}}
La password condivisa viene usata solo quando ci si connette dalla rubrica condivisa corrispondente, facendo clic sulla scheda del dispositivo o usando il relativo menu a discesa. Non viene usata da un'altra scheda dispositivo, dal pulsante **Connetti** accanto al campo di inserimento ID o da un'altra rubrica condivisa.
{{% /notice %}}

## Permessi della rubrica condivisa

| Permesso | Cosa possono fare gli utenti |
| --- | --- |
| **Sola lettura** | Possono visualizzare dispositivi e tag, e possono usare la password. |
| **Lettura/Scrittura** | Possono modificare dispositivi e tag. |
| **Controllo completo** | Possono ricondividere, eliminare o rinominare la rubrica. |

Quando più regole corrispondono allo stesso utente, la priorità è:

1. Utente
2. Gruppo
3. Tutti

Ad esempio, se **Tutti** è in sola lettura ma un utente specifico ha Controllo completo, quell'utente ottiene il permesso Controllo completo.

![Permessi di condivisione della rubrica](/docs/en/self-host/rustdesk-server-pro/address-book/images/share-list.png)

![Permesso di rubrica condivisa nella console web](/docs/en/self-host/rustdesk-server-pro/address-book/images/user1-permission.png)

## Console web

### Creare o modificare una rubrica condivisa

In **Rubrica > Condivisa**, crea una rubrica condivisa con un nome, una nota opzionale e una **Password condivisa predefinita** opzionale. Questa è la password a livello di rubrica.

![Creare una rubrica condivisa con password condivisa predefinita](/docs/en/self-host/rustdesk-server-pro/address-book/images/create-shared-address-book.png)

### Aggiungere dispositivi e password

I dispositivi possono essere aggiunti manualmente tramite ID o importati dall'elenco dispositivi di Server Pro. Per ogni voce puoi impostare un alias, tag, una nota e, per le rubriche condivise, una password a livello di dispositivo.

![Aggiungere dispositivo alla rubrica condivisa](/docs/en/self-host/rustdesk-server-pro/address-book/images/import-device.png)

![Dispositivi](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-addressbook-devices.png)

![Modificare dispositivo nella rubrica condivisa](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-edit-device.png)

### Tag e filtri

I tag organizzano e filtrano i dispositivi. `Senza tag` filtra i dispositivi senza tag. Con **Filtra per intersezione** attivato, vengono mostrati solo i dispositivi che corrispondono a tutti i tag selezionati.

### Cestino

L'eliminazione di un dispositivo da una rubrica sposta la voce nel cestino di quella rubrica. Non elimina il dispositivo da RustDesk Server Pro.

## Comportamento della password condivisa

| Livello password | Priorità |
| --- | --- |
| Password a livello di dispositivo | Usata per prima quando la voce dispositivo ha una password. |
| Password a livello di rubrica | Usata quando la voce dispositivo non ha una password. |

Se nessuna delle due password è impostata, l'utente si connette normalmente e potrebbe dover inserire la password manualmente. Nella console web, le colonne password mostrano solo se una password è impostata.

## Client RustDesk

Dopo l'accesso, usa il selettore della rubrica per passare tra **Rubrica** e le rubriche condivise. Per le rubriche condivise, il client mostra il permesso dell'utente corrente.

![Selettore rubrica del client RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-selector.png)

![Rubrica in sola lettura](/docs/en/self-host/rustdesk-server-pro/address-book/images/read-only-address-book.png)

### Modificare dal client

Gli utenti con permesso di scrittura possono aggiungere ID, aggiungere tag, modificare alias, modificare tag, modificare note, impostare password condivise o rimuovere voci.

![Menu dispositivo rubrica 1 nel client RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu1.png)

![Aggiungi ID nel client RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-add-id.png)

![Menu dispositivo rubrica 2 nel client RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu2.png)

![Cambia password nel client RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-change-password.png)

## Preimpostazioni di distribuzione

La configurazione del client RustDesk può preimpostare l'assegnazione della rubrica:

- `preset-address-book-name`
- `preset-address-book-tag`
- `preset-address-book-alias`
- `preset-address-book-password`
- `preset-address-book-note`

`preset-address-book-alias`, `preset-address-book-password` e `preset-address-book-note` richiedono RustDesk client 1.4.3 o successivo e RustDesk Server Pro 1.6.6 o successivo.

Per maggiori dettagli, consulta la [configurazione avanzata del client](/docs/en/self-host/client-configuration/advanced-settings/#preset-address-book-name--preset-address-book-tag--preset-address-book-alias--preset-address-book-password--preset-address-book-note).

## Impostazioni correlate

| Impostazione | Dove | Effetto |
| --- | --- | --- |
| **Consenti ai non amministratori di condividere rubriche con altri gruppi** | **Impostazioni > Altro** | Consente agli utenti non amministratori di condividere rubriche con altri gruppi di utenti. |
| **Disabilita rubrica** | **Client personalizzato** | Nasconde o disabilita la rubrica nel client personalizzato generato. |

## Risoluzione dei problemi

### Password errata

La password salvata in una rubrica condivisa viene usata dal client RustDesk che controlla. Non viene impostata sul dispositivo controllato. Imposta la password del dispositivo controllato su quel dispositivo in **Impostazioni > Sicurezza > Password**.

Per usare la password condivisa, connettiti dalla rubrica condivisa corrispondente facendo clic sulla scheda del dispositivo. La connessione da un'altra rubrica, da un'altra scheda dispositivo o dal pulsante **Connetti** accanto al campo di inserimento ID non usa la password condivisa di questa rubrica.
