---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-07T17:09:00Z
lang: 'it'
translationKey: 'rustdesk-remote-control-android-ios'
draft: false
title: 'Controllo remoto RustDesk su Android e iOS: cosa funziona'
excerpt: "RustDesk può controllare da remoto i telefoni Android e trasforma Android, iPhone e iPad in controller per i tuoi computer. L'app iOS funziona solo come controller."
image: '~/assets/images/blog/rustdesk-remote-control-android-ios-og.webp'
category: 'Guide'
tags: ['RustDesk', 'Mobile']
author: 'RustDesk Team'
slug: 'controllo-remoto-rustdesk-su-android-e-ios-cosa-funziona'
faq:
  - question: 'Posso controllare da remoto un telefono Android con RustDesk?'
    answer: "Sì. Sul dispositivo Android avvii il servizio di cattura dello schermo di RustDesk (che richiede di confermare un consenso a schermo) e abiliti il servizio di accessibilità RustDesk Input, in modo che tocchi e swipe remoti possano essere inviati al dispositivo. La condivisione dello schermo richiede Android 6 o versioni successive; la condivisione dell'audio interno di sistema richiede Android 10 o versioni successive. Alcuni produttori limitano l'accessibilità per le app installate manualmente, quindi potresti dover prima consentire le impostazioni con restrizioni."
  - question: 'RustDesk può controllare un iPhone o un iPad?'
    answer: "No. L'app RustDesk per iOS/iPadOS funziona solo come controller: usa un iPhone o un iPad per controllare dispositivi Windows, macOS, Linux e Android. RustDesk non implementa l'hosting, la condivisione dello schermo né l'input remoto su iOS. Alcuni altri fornitori offrono la visualizzazione assistita dello schermo iOS, e Apple offre il controllo remoto con consenso nelle chiamate FaceTime."
  - question: 'Posso usare il telefono per controllare il computer?'
    answer: "Sì. Le app RustDesk per Android e iOS sono controller completi: connettiti a una macchina Windows, macOS o Linux tramite il suo ID e controllala con un touchpad a schermo o la modalità mouse e una tastiera software. Alcuni flussi di appunti, trasferimento file e tasti speciali variano in base al sistema operativo mobile. Controllare un computer da un telefono è il caso d'uso mobile più affidabile."
  - question: 'Le app mobili di RustDesk sono open source?'
    answer: "Sì. I client mobili condividono la stessa base di codice open source AGPL del client desktop. Le build per Android sono disponibili dalle release ufficiali di RustDesk su GitHub e su F-Droid come com.carriez.flutter_hbb; il controller per iOS è disponibile sull'App Store di Apple. Al momento RustDesk non è distribuito tramite Google Play."
  - question: 'Posso configurare un dispositivo Android per il controllo non presidiato?'
    answer: "In parte. RustDesk può mantenere attivo il servizio di cattura tramite una notifica in primo piano e riavviarlo all'accensione, ma il consenso alla cattura dello schermo, la tastiera bloccata nella schermata di blocco e la necessità di sbloccare manualmente il dispositivo dopo un riavvio rendono inaffidabile un vero controllo non presidiato su Android. Considera il controllo Android come assistenza presidiata, non come un accesso da configurare una volta per tutte."
metadata:
  description: "RustDesk su Android e iOS: controlla Android da remoto, gestisci i desktop da tutte e due le app e scopri perché su iPhone e iPad l'app è solo un controller."
  keywords: 'controllo remoto RustDesk Android iOS, controllare il telefono da remoto con RustDesk, RustDesk host Android, controllare Android da remoto, RustDesk iOS, controllare iPhone da remoto, app mobile RustDesk'
---

RustDesk può davvero controllare un dispositivo Android quando il suo proprietario concede i permessi di cattura dello schermo e di input, ed entrambe le app mobili sono ottimi _controller_ per i tuoi computer. L'app iOS funziona solo come controller: RustDesk non implementa l'hosting né la condivisione dello schermo su iOS, quindi con RustDesk non puoi accedere da remoto a un iPhone o a un iPad. Questa guida spiega cosa funziona, cosa no e perché, così puoi pianificare in base alle funzionalità reali.

Entrambe le app mobili condividono la base di codice del client RustDesk con licenza AGPL; anche RustDesk Server OSS (il server community gratuito) ha licenza AGPL, mentre Server Pro è un software server self-hosted commerciale e proprietario. Le build per Android sono disponibili dalle [release ufficiali di RustDesk su GitHub](https://github.com/rustdesk/rustdesk/releases) e su [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) come `com.carriez.flutter_hbb`, con un'ampia copertura di dispositivi (build arm64, arm32 e x86_64, oltre a un APK universale); il controller per iOS si trova sull'App Store. RustDesk [al momento non è distribuito tramite Google Play](/it/blog/rustdesk-e-le-truffe-di-accesso-remoto-cosa-stiamo-facendo): l'app Android è stata ritirata volontariamente in risposta agli abusi dei truffatori. Stessa base di codice, stesso nucleo verificabile.

## Il riepilogo in una tabella

| Scenario                                                          | Supportato? | Note                                                                          |
| ----------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------- |
| Controllare un PC Windows/macOS/Linux **da** Android              | Sì          | Controller completo; touchpad o modalità mouse                                |
| Controllare un PC **da** iPhone/iPad                              | Sì          | Controller completo; touchpad o modalità mouse                                |
| Controllare **un dispositivo Android** (come host)                | Sì          | Richiede il consenso alla cattura dello schermo + il servizio di accessibilità |
| Controllare **un dispositivo iOS** con RustDesk                   | **No**      | RustDesk per iOS è un'app controller                                          |
| Visualizzare da remoto lo schermo di un dispositivo iOS con RustDesk | **No**   | La visualizzazione dello schermo in ingresso non è implementata in RustDesk   |

Il resto dell'articolo è semplicemente il dettaglio dietro ciascuna riga.

## Usare il telefono come controller (la parte facile)

Questo è il caso d'uso che «funziona e basta». Installa RustDesk sul tuo dispositivo Android o iOS e diventa un controller completo per qualsiasi host RustDesk: il tuo desktop Windows, il tuo [Mac](https://rustdesk.com/docs/it/client/mac/), la tua [macchina Linux](/it/blog/rustdesk-per-linux-il-desktop-remoto-open-source). Inserisci l'ID di destinazione e la password e ottieni lo schermo remoto con un touchpad a schermo, una modalità mouse e una tastiera software. Alcuni flussi di appunti, file e tasti speciali variano in base al sistema operativo mobile. Sul telefono non serve nulla di particolare, perché stai solo _inviando_ il controllo, non lo stai ricevendo.

Se il tuo lavoro è «sistemare un computer ovunque io sia», un telefono con RustDesk è uno strumento davvero valido.

## Controllare un dispositivo Android (come host)

RustDesk può trasformare un telefono o un tablet Android in un host controllabile. La cattura dello schermo e l'input remoto usano servizi Android separati, ed entrambi vanno configurati.

**Cattura dello schermo.** RustDesk usa l'API `MediaProjection` di Android per catturare il display. Quando tocchi **Avvia servizio** nell'app, Android mostra una richiesta di consenso per registrare lo schermo: questa finestra di dialogo è obbligatoria e non può essere aggirata in modo silenzioso. La condivisione dello schermo richiede **Android 6 o versioni successive**; catturare **l'audio interno di sistema** del telefono richiede **Android 10 o versioni successive**. Finché questo permesso di cattura non viene concesso, nessuna connessione in entrata può vedere nulla.

**Input remoto.** Vedere lo schermo non equivale a controllarlo. Per inviare tocchi, swipe ed eventi da tastiera, RustDesk registra un [`AccessibilityService`](https://deepwiki.com/rustdesk/rustdesk/6.5-mobile-platforms) chiamato **RustDesk Input**, che si abilita in **Impostazioni → Accessibilità**. Questo servizio traduce gli eventi remoti del mouse e i gesti in gesti Android e può attivare azioni di sistema come Indietro, Home e App recenti.

**Restare attivo.** RustDesk mantiene una notifica di servizio in primo piano e, facoltativamente, una finestra overlay fluttuante, in modo che Android non termini il processo di cattura, e può riavviare il servizio all'accensione del dispositivo.

Ora i limiti, perché il modello di sicurezza di Android ne impone di reali:

- **Il consenso è obbligatorio per avviare la cattura.** Qualcuno (oppure un'autorizzazione preventiva) deve accettare la richiesta di registrazione dello schermo.
- **La schermata di blocco impedisce l'input.** Android non consente a un servizio di accessibilità di digitare nella schermata di blocco protetta, quindi se il dispositivo si blocca in genere non è possibile inserire il codice di sblocco da remoto: una limitazione [documentata da utenti che l'hanno provata sul campo](https://blog.wirelessmoves.com/2025/10/remote-android-support-with-rustdesk-part-1.html).
- **I riavvii richiedono uno sblocco manuale.** Dopo un riavvio, di solito il dispositivo deve essere sbloccato di persona prima che il controllo possa riprendere.
- **Restrizioni dei produttori.** Su alcune build dei produttori, l'interruttore di accessibilità di **RustDesk Input** risulta disattivato in grigio per le app installate manualmente finché non concedi le «impostazioni con restrizioni» (tocco prolungato sull'icona dell'app → Informazioni app → consenti impostazioni con restrizioni). Anche i gestori della batteria particolarmente aggressivi di alcuni produttori possono terminare il servizio in background.

La conclusione pratica: il controllo Android è eccellente per l'**assistenza presidiata**, cioè per aiutare qualcuno che ha il telefono in mano, mentre l'accesso **non presidiato da configurare una volta per tutte** è un compito che l'host desktop svolge meglio, perché i sistemi operativi mobili limitano l'accesso persistente in background. Scegli la piattaforma adatta al compito. (Per i desktop, la [guida alla configurazione dell'accesso non presidiato](/it/blog/accesso-non-presidiato-con-rustdesk-guida-alla-configurazione) tratta il caso reale.)

## iOS: controller RustDesk, visualizzazione dello schermo e controllo dell'input

**RustDesk per iOS è un controller, non un host.** Usalo per controllare computer supportati o dispositivi Android. La visualizzazione dello schermo e il controllo dell'input in ingresso su iOS non sono implementati in RustDesk, come discusso nella [richiesta di funzionalità per l'host iOS](https://github.com/rustdesk/rustdesk/discussions/4839).

Altri fornitori adottano un approccio diverso. Le API di broadcast di Apple consentono la condivisione dello schermo avviata dall'utente, e [AnyDesk documenta la visualizzazione remota in ingresso su iOS/iPadOS 12 e versioni successive](https://support.anydesk.com/docs/anydesk-for-ios-ipados-tvos), senza controllo remoto dell'input. Un tecnico che guarda uno schermo mentre il proprietario tocca è un flusso di lavoro diverso dal controllarlo.

Apple offre anche il [controllo remoto con consenso in FaceTime](https://support.apple.com/guide/iphone/request-give-remote-control-a-facetime-call-iph5d70f34a3/ios), soggetto ai suoi requisiti di dispositivo, area geografica e sistema operativo. Se il tuo flusso di supporto richiede di vedere lo schermo di un iPhone, usa uno strumento che implementi quel flusso; per controllare computer da un iPhone o un iPad, l'app controller di RustDesk è la scelta giusta.

## Una nota su privacy e self-hosting

Poiché le app mobili sono open source e parlano lo stesso protocollo del client desktop, puoi puntarle verso un tuo [server RustDesk self-hosted](/it/blog/perche-fare-self-hosting-del-tuo-software-di-desktop-remoto) invece che verso la rete pubblica, così le sessioni mobili vengono coordinate da un'infrastruttura che controlli tu, ID compresi. Per i flussi di assistenza remota che coinvolgono dispositivi personali, questo aspetto di sovranità dei dati conta più del solito.

Il compromesso è sempre lo stesso: quel server lo gestisci e lo proteggi tu, compresi aggiornamenti, monitoraggio, backup e pianificazione della capacità, e per molti team mantenere i dati delle sessioni in casa propria vale decisamente la pena.

## Come iniziare

Scarica le build per Android dalle [release ufficiali su GitHub](https://github.com/rustdesk/rustdesk/releases) oppure installa il pacchetto da [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/). RustDesk [al momento non è distribuito tramite Google Play](/it/blog/rustdesk-e-le-truffe-di-accesso-remoto-cosa-stiamo-facendo); il controller per iOS resta disponibile sull'App Store di Apple. Per controllare un telefono, quel telefono deve essere Android: accetta la richiesta di cattura dello schermo e abilita il servizio di accessibilità RustDesk Input. Per controllare i tuoi computer da un telefono, entrambe le app mobili funzionano subito. I piani attuali sono su [rustdesk.com/pricing](https://rustdesk.com/pricing), e [sales@rustdesk.com](mailto:sales@rustdesk.com) può aiutarti con Server Pro. Vuoi vederlo prima in azione? [Guarda RustDesk all'opera](https://www.youtube.com/@rustdesk).
