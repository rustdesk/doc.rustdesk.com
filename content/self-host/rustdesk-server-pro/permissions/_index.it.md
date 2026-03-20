---
title: Controllo di accesso
weight: 16
description: "Documentazione RustDesk su Controllo di accesso. Consulta le guide per installazione, configurazione, distribuzione e risoluzione dei problemi."
keywords: ["rustdesk access control", "rustdesk device permissions", "rustdesk user group access", "rustdesk server pro permissions", "rustdesk device assignment"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Risposta rapida

Il controllo di accesso in RustDesk Server Pro definisce quali utenti o gruppi possono collegarsi a quali dispositivi o gruppi di dispositivi. Inizia con il set minimo pratico di permessi ed espandilo solo dopo i test.

## Punti chiave

- Organizza prima gruppi di utenti e gruppi di dispositivi
- Imposta con attenzione le regole di accesso ai dispositivi
- Usa il privilegio minimo come impostazione predefinita
- Verifica l’accesso basato sui gruppi con account di test reali

<!-- GEO-LOCALIZED-INTRO:END -->

## Permessi di accesso ai dispositivi

Il dispositivo può essere assegnato a un singolo utente, a un singolo gruppo di dispositivi, o a entrambi.

Quando il dispositivo è assegnato a un utente, può essere accessibile da quell'utente, da un gruppo di utenti, o attraverso appropriate impostazioni inter-gruppo utente.

Quando il dispositivo è assegnato a un gruppo di dispositivi, può essere accessibile tramite appropriate impostazioni inter-gruppo utente-dispositivo.

Ci sono tre modi per assegnare un dispositivo a un utente:
- Tramite la pagina dispositivi della console
- Accedere all'account utente specificato sul lato client
- Riga di comando di assegnazione

Ci sono due modi per assegnare un dispositivo a un gruppo di dispositivi:
- Tramite la pagina dispositivi della console
- Riga di comando di assegnazione

Le seguenti due situazioni impediranno l'accesso al dispositivo:
- Rendere il dispositivo `disabilitato` nella pagina dispositivi della console
- Rendere l'utente `disabilitato` nella pagina utenti della console

## Impostazioni di accesso ai gruppi utente

Vai alla pagina gruppi nella console web, clicca su `Modifica` per modificare le impostazioni inter-gruppo come mostrato di seguito.

Le tue modifiche a `Accesso con altri gruppi` hanno effetto immediatamente senza richiedere di cliccare il pulsante `OK`.

Sia `Può accedere a` che `Può essere accessibile da` servono quasi la stessa funzione, forniamo entrambe le opzioni per la tua comodità. Tuttavia, questo può causare confusione.

{{% notice note %}}
L'utente e il gruppo assegnati al lato di controllo sono determinati dall'utente che effettua l'accesso, piuttosto che dall'utente assegnato dalla console web. Lo abbiamo progettato così perché certi lati di controllo non hanno un ID dispositivo, come il client iOS e il client web.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/permissions/images/crossgrp.png)

## Impostazioni di accesso ai gruppi dispositivi

I gruppi dispositivi forniscono un altro modo per gestire i permessi di accesso. Ecco le regole principali:

1. Un dispositivo può essere aggiunto solo a un gruppo di dispositivi
2. Puoi impostare permessi di accesso per utenti o gruppi di utenti ai gruppi dispositivi. Questi permessi sono cumulativi con i permessi di accesso ai gruppi utente - il che significa che l'accesso viene concesso se i permessi del gruppo utente o i permessi del gruppo dispositivi lo consentono
3. Quando un dispositivo non assegnato viene aggiunto a un gruppo dispositivi, non è più considerato "non assegnato"

{{% notice note %}}
La funzionalità gruppo dispositivi richiede RustDesk client >= 1.3.8 e RustDesk Server Pro >= 1.5.0
{{% /notice %}}