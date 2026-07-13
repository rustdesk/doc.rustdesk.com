---
publishDate: 2026-07-07T17:09:00Z
lang: 'it'
translationKey: 'rustdesk-remote-control-android-ios'
draft: false
title: 'Controllo remoto RustDesk su Android e iOS: cosa funziona'
excerpt: 'Come RustDesk controlla da remoto i telefoni Android, trasforma iPhone e iPad in controller e perché nessun fornitore può controllare da remoto iOS.'
image: '~/assets/images/blog/rustdesk-remote-control-android-ios-og.webp'
category: 'Guide'
tags: ['RustDesk', 'Mobile']
author: 'RustDesk Team'
slug: 'controllo-remoto-rustdesk-su-android-e-ios-cosa-funziona'
faq:
  - question: 'Posso controllare da remoto un telefono Android con RustDesk?'
    answer: "Sì. Sul dispositivo Android devi avviare il servizio di acquisizione schermo di RustDesk (che richiede una richiesta di consenso a schermo) e abilitare il servizio di accessibilità RustDesk Input, in modo che tocchi e swipe remoti possano essere iniettati. La condivisione dello schermo richiede Android 6 o versioni successive; la condivisione dell'audio di sistema interno richiede Android 10 o versioni successive. Alcuni produttori limitano l'accessibilità per le app installate manualmente (sideloading), quindi potrebbe essere necessario consentire prima le impostazioni con restrizioni."
  - question: 'RustDesk può controllare un iPhone o un iPad?'
    answer: "Non con nessuna app di desktop remoto: è un limite della piattaforma iOS, non di RustDesk. Le restrizioni di Apple su registrazione dello schermo ed esecuzione in background non permettono a un'app di terze parti di essere controllata da remoto come host, quindi nessun fornitore offre un vero controllo remoto su iPhone o iPad. Ciò che l'app iOS/iPadOS di RustDesk fa bene è funzionare come controller: usa un iPhone o un iPad per controllare i tuoi computer Windows, macOS, Linux e Android."
  - question: 'Posso usare il telefono per controllare il computer?'
    answer: "Sì. Le app RustDesk per Android e iOS funzionano come client controller completi. Puoi connetterti da entrambe a un computer Windows, macOS o Linux e controllarlo con un touchpad a schermo o la modalità mouse. È il caso d'uso mobile più affidabile e funziona come il client desktop."
  - question: 'Le app mobili di RustDesk sono open source?'
    answer: "Sì. I client mobili condividono la stessa base di codice open source AGPL del client desktop. Le build per Android sono disponibili dalle release ufficiali di RustDesk su GitHub e su F-Droid come com.carriez.flutter_hbb; il controller per iOS è disponibile sull'App Store di Apple. Al momento RustDesk non è distribuito tramite Google Play."
  - question: 'Posso configurare un dispositivo Android per il controllo non presidiato?'
    answer: "In parte. RustDesk può mantenere attivo il servizio di acquisizione tramite una notifica in primo piano e riavviarlo all'accensione, ma il consenso alla cattura dello schermo, la tastiera bloccata nella schermata di blocco e la necessità di sbloccare manualmente dopo un riavvio rendono inaffidabile un vero controllo non presidiato su Android. Considera il controllo Android come assistenza presidiata, non come accesso automatico e permanente."
metadata:
  description: 'RustDesk su Android e iOS: controlla Android da remoto, usa entrambe le app mobili per gestire i tuoi desktop e scopri cosa consente Apple su iPhone e iPad.'
  keywords: 'controllo remoto RustDesk Android iOS, controllare il telefono da remoto con RustDesk, RustDesk host Android, controllare Android da remoto, RustDesk iOS, controllare iPhone da remoto, app mobile RustDesk'
---

"Posso connettermi da remoto a un telefono?" è una delle domande più comuni che riceve RustDesk, e merita una risposta onesta, non da marketing. In breve: RustDesk può davvero controllare un dispositivo Android, entrambe le app mobili funzionano come eccellenti _controller_ per i tuoi computer e — la parte che nessuno vuole sentirsi dire — al momento non è possibile connettersi da remoto a un iPhone o un iPad. Questa guida spiega esattamente cosa funziona, cosa no e perché, così puoi pianificare in base alle reali capacità del prodotto invece che a supposizioni.

Entrambe le app mobili sono, come il resto di RustDesk, open source con licenza AGPL. Le build per Android sono disponibili dalle [release ufficiali di RustDesk su GitHub](https://github.com/rustdesk/rustdesk/releases) e su [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) come `com.carriez.flutter_hbb`, con un'ampia copertura di dispositivi — build arm64, arm32 e x86_64, oltre a un APK universale; il controller per iOS si trova sull'App Store. RustDesk [al momento non è distribuito tramite Google Play](/it/blog/rustdesk-e-le-truffe-di-accesso-remoto-cosa-stiamo-facendo): l'app Android è stata rimossa volontariamente in risposta ad abusi da parte di truffatori. Stessa base di codice, stesso nucleo verificabile.

## Il riepilogo in una tabella

| Scenario                                                   | Supportato? | Note                                                               |
| ---------------------------------------------------------- | ----------- | ------------------------------------------------------------------ |
| Controllare un PC Windows/macOS/Linux **da** Android       | Sì          | Controller completo; touchpad o modalità mouse                     |
| Controllare un PC **da** iPhone/iPad                       | Sì          | Controller completo                                                |
| Controllare **un dispositivo Android** (come host)         | Sì          | Richiede consenso alla cattura schermo + servizio di accessibilità |
| Controllare **un dispositivo iOS** (iPhone/iPad come host) | **No**      | Restrizioni Apple; non implementato                                |
| Visualizzare da remoto lo schermo di un dispositivo iOS    | **No**      | Non supportato attualmente                                         |

Il resto dell'articolo è semplicemente il dettaglio dietro ciascuna riga.

## Usare il telefono come controller (la parte facile)

Questo è il caso d'uso che "funziona e basta". Installa RustDesk sul tuo dispositivo Android o iOS e diventa un controller completo per qualsiasi host RustDesk — il tuo desktop Windows, il tuo [Mac](https://rustdesk.com/docs/it/client/mac/), la tua [macchina Linux](/it/blog/rustdesk-per-linux-il-desktop-remoto-open-source). Inserisci l'ID di destinazione e la password e ottieni lo schermo remoto con un touchpad a schermo, una modalità mouse, una tastiera software e il trasferimento file. Non è richiesto nulla di speciale sul telefono, perché stai solo _inviando_ il controllo, non subendolo.

Se il tuo compito è "riparare un computer da qualsiasi posto mi trovi", un telefono con RustDesk è uno strumento davvero valido, e si comporta esattamente come il client desktop.

## Controllare un dispositivo Android (come host)

È qui che RustDesk fa qualcosa che la maggior parte degli strumenti di accesso remoto non può fare: può trasformare un telefono o un tablet Android in un host controllabile. Sono due i sottosistemi Android che lo rendono possibile, ed entrambi richiedono una configurazione esplicita.

**Cattura dello schermo.** RustDesk utilizza l'API `MediaProjection` di Android per catturare il display. Quando tocchi **Start Service** nell'app, Android mostra una richiesta di consenso per registrare lo schermo — questa finestra di dialogo è obbligatoria e non può essere aggirata silenziosamente. La condivisione dello schermo richiede **Android 6 o versioni successive**; catturare **l'audio di sistema interno** del telefono richiede **Android 10 o versioni successive**. Finché questo permesso di cattura non viene concesso, nessuna connessione in entrata può vedere alcunché.

**Input remoto.** Vedere lo schermo non è la stessa cosa che controllarlo. Per iniettare tocchi, swipe ed eventi da tastiera, RustDesk registra un [`AccessibilityService`](https://deepwiki.com/rustdesk/rustdesk/6.5-mobile-platforms) chiamato **RustDesk Input**, che si abilita in **Impostazioni → Accessibilità**. Questo servizio traduce gli eventi remoti del mouse e i gesti in gesti Android e può attivare azioni di sistema come Indietro, Home e App recenti.

**Restare attivo.** RustDesk mantiene una notifica di servizio in primo piano e, facoltativamente, una finestra overlay fluttuante, in modo che Android non termini il processo di cattura, e può riavviare il servizio all'accensione del dispositivo.

Ora i limiti, perché il modello di sicurezza di Android ne impone di reali:

- **Il consenso è obbligatorio per avviare la cattura.** Qualcuno (oppure un'autorizzazione preventiva) deve accettare la richiesta di registrazione dello schermo.
- **La schermata di blocco impedisce l'input.** Android non consente a un servizio di accessibilità di digitare nella schermata di blocco protetta, quindi se il dispositivo si blocca in genere non è possibile inserire il codice di sblocco da remoto — una limitazione [documentata da utenti che l'hanno provata sul campo](https://blog.wirelessmoves.com/2025/10/remote-android-support-with-rustdesk-part-1.html).
- **I riavvii richiedono uno sblocco manuale.** Dopo un riavvio, di solito il dispositivo deve essere sbloccato di persona prima che il controllo possa riprendere.
- **Restrizioni degli OEM.** Su alcune build dei produttori, l'interruttore di accessibilità di **RustDesk Input** risulta disattivato in grigio per le app installate manualmente finché non concedi le "impostazioni con restrizioni" (tocco prolungato sull'icona dell'app → Informazioni app → consenti impostazioni con restrizioni). Anche i gestori aggressivi della batteria di alcuni OEM possono terminare il servizio in background.

La conclusione pratica: il controllo Android è eccellente per l'**assistenza presidiata** — aiutare qualcuno che ha il telefono in mano — mentre l'accesso **non presidiato e impostato una volta per tutte** è un compito che l'host desktop svolge meglio, perché i sistemi operativi mobili limitano l'accesso persistente in background. Abbina la piattaforma al compito giusto. (Per i desktop, la [guida alla configurazione dell'accesso non presidiato](/it/blog/accesso-non-presidiato-con-rustdesk-guida-alla-configurazione) tratta il caso reale.)

## Controllare un dispositivo iOS: cosa consente Apple

Ecco la parte a cui viene chiesto di continuo e a cui altrove si risponde in modo vago, quindi saremo diretti: **nessuna app di desktop remoto può controllare da remoto un iPhone o un iPad — RustDesk compreso.** Su iOS l'app RustDesk è un controller capace — si connette _verso l'esterno_ per controllare i tuoi computer — ma Apple non permette a nessuna app di terze parti di funzionare come host controllato da remoto su iOS.

Il motivo è Apple. iOS limita fortemente l'esecuzione in background, la registrazione dello schermo e qualsiasi forma di iniezione di input sintetico, ed è per questo che nessuna app di terze parti offre un vero e proprio _controllo_ remoto di un iPhone. Non è tanto una svista di RustDesk quanto un muro imposto dalla piattaforma — il supporto come host per iOS è una funzionalità [richiesta più volte su GitHub](https://github.com/rustdesk/rustdesk/discussions/4839) che resta tuttora non implementata. Le API di trasmissione di Apple (ReplayKit) possono in linea di principio trasmettere in streaming lo schermo, ma si tratta di una trasmissione avviata dall'app stessa, non di qualcosa che una parte remota può richiamare — quindi la visualizzazione remota di iOS da parte di terze parti resta non disponibile, e il controllo remoto completo di iOS da un altro dispositivo non è qualcosa che il sistema operativo consente a soggetti terzi.

Quindi, se la tua esigenza è specificamente "connettermi da remoto a un iPhone", nessuno strumento di desktop remoto attualmente esistente può farlo — è un muro della piattaforma iOS contro cui si scontra ogni fornitore, non una lacuna di RustDesk, come indicato nel nostro confronto [RustDesk vs AnyDesk](/it/blog/rustdesk-vs-anydesk-desktop-remoto-self-hosted-e-open-source). Preferiamo dirtelo chiaramente fin dall'inizio piuttosto che farti scoprire dopo la configurazione.

## Una nota su privacy e self-hosting

Poiché le app mobili sono open source e parlano lo stesso protocollo del client desktop, puoi indirizzarle verso un tuo [server RustDesk self-hosted](/it/blog/perche-fare-self-hosting-del-tuo-software-di-desktop-remoto) invece che verso la rete pubblica — così le sessioni mobili vengono intermediate da un'infrastruttura che controlli tu, ID incluso. Per i flussi di lavoro di assistenza remota che coinvolgono dispositivi personali, questo aspetto di sovranità dei dati conta più del solito.

Il compromesso è sempre lo stesso: gestisci e proteggi tu stesso quel server — un compito modesto, vista la bassa richiesta di risorse — e per molti team mantenere i dati delle sessioni sul proprio terreno vale decisamente la pena.

## Come iniziare

Scarica le build per Android dalle [release ufficiali su GitHub](https://github.com/rustdesk/rustdesk/releases) oppure installa il pacchetto da [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/). RustDesk [al momento non è distribuito tramite Google Play](/it/blog/rustdesk-e-le-truffe-di-accesso-remoto-cosa-stiamo-facendo); il controller per iOS resta disponibile sull'App Store di Apple. Per controllare un telefono, quel telefono deve essere Android — accetta la richiesta di cattura dello schermo e abilita il servizio di accessibilità RustDesk Input. Per controllare i tuoi computer da un telefono, entrambe le app mobili funzionano subito, senza configurazioni aggiuntive. I piani attuali sono disponibili su [rustdesk.com/pricing](https://rustdesk.com/pricing), e [sales@rustdesk.com](mailto:sales@rustdesk.com) può aiutarti con Server Pro. Vuoi vederlo prima in azione? [Guarda RustDesk in azione](https://www.youtube.com/@rustdesk).
