---
publishDate: 2026-06-30T13:46:00Z
lang: 'it'
translationKey: 'rustdesk-unknown-devices-antivirus-scanning'
draft: false
title: 'Dispositivi sconosciuti nella console RustDesk? Indaga prima di tutto'
excerpt: 'Vedi dispositivi non riconosciuti nella tua console RustDesk? Il sandboxing antivirus è una possibilità, ma prima bisogna escludere una configurazione trapelata o una registrazione non autorizzata.'
image: '~/assets/images/blog/rustdesk-unknown-devices-antivirus-scanning-og.png'
category: 'Distribuzione'
tags: ['RustDesk', 'Distribuzione', 'Sicurezza']
author: 'RustDesk Team'
slug: 'dispositivi-sconosciuti-nella-console-rustdesk-indaga-prima-di-tutto'
faq:
  - question: 'Perché nella mia console RustDesk compaiono dispositivi sconosciuti che non ho mai installato?'
    answer: 'Il sandboxing di antivirus o soluzioni di endpoint protection può creare registrazioni temporanee, ma un dispositivo sconosciuto può anche indicare una configurazione trapelata, un token di distribuzione esposto, una registrazione non autorizzata o un errore di distribuzione. Trattalo come un evento di sicurezza finché log, credenziali, chiavi, token e registri di distribuzione non ne identificano la causa; quindi limita la registrazione di nuovi dispositivi.'
  - question: 'Come posso impedire completamente la registrazione di dispositivi sconosciuti?'
    answer: 'Se il tuo elenco di dispositivi è stabile e non stai aggiungendo macchine regolarmente, disabilita la registrazione di nuovi dispositivi nella console in Impostazioni → Altro → Disabilita nuovi dispositivi sulla console web. Da quel momento nessun dispositivo nuovo potrà registrarsi, che si tratti di un sandbox o meno. Se invece integri dispositivi regolarmente, usa piuttosto un token di distribuzione, così le distribuzioni reali continuano a funzionare.'
  - question: 'Come posso richiedere un token di distribuzione per i nuovi dispositivi?'
    answer: 'Abilita Impostazioni → Altro → Richiedi distribuzione per i nuovi dispositivi nella console web, crea un token API con il permesso Dispositivi impostato su Lettura e scrittura, e fai in modo che il tuo processo di installazione esegua rustdesk --deploy --token <api_token> su ogni nuovo dispositivo (con sudo su macOS e Linux). Solo i dispositivi che presentano un token valido possono registrarsi, quindi una scansione antivirus in sandbox non può aggiungersi da sola, mentre il tuo RMM o la distribuzione scriptata continuano a funzionare normalmente.'
  - question: 'Come posso distinguere una scansione antivirus innocua da una vera intrusione?'
    answer: "Una registrazione di breve durata che coincide con una scansione di sicurezza nota e non è seguita da alcuna sessione può avvalorare l'ipotesi del sandbox. Sessioni impreviste, registrazioni ripetute, l'uso di credenziali valide o un client configurato distribuito al di fuori del suo canale previsto non sono innocui e richiedono una risposta all'incidente."

metadata:
  description: "I dispositivi sconosciuti nella tua console RustDesk richiedono un'indagine. Scopri come distinguere il sandboxing antivirus da una configurazione trapelata o da una registrazione non autorizzata."
  keywords: 'dispositivo sconosciuto rustdesk, dispositivo fantasma rustdesk, registrazione casuale dispositivi rustdesk, sandbox antivirus rustdesk, disabilitare nuovi dispositivi rustdesk, rustdesk --deploy'
---

La presenza di un dispositivo sconosciuto nella console RustDesk non basta a identificarne la causa. Il sandboxing antivirus è una possibilità nota, ma lo stesso sintomo può derivare anche da una configurazione trapelata, una registrazione non autorizzata, un token esposto o un errore di distribuzione.

## La risposta breve

Alcuni prodotti antivirus/EDR eseguono binari sconosciuti in sandbox nel cloud. Se una sandbox riceve una build del client contenente la configurazione del tuo server ed è in grado di raggiungere l'ID server, potrebbe registrarsi per un breve periodo. Tuttavia, un indirizzo IP di un provider cloud o un nome hardware insolito **non** dimostra questa spiegazione: anche gli aggressori utilizzano host nel cloud. Conserva ed esamina le prove prima di archiviare l'evento.

## Nel dettaglio

### Perché succede

I client RustDesk possono registrarsi presso il server ID/rendezvous configurato quando vengono eseguiti e riescono a raggiungerlo. Questo rende l'esecuzione in sandbox una causa plausibile, come discusso in una [discussione pubblica su GitHub](https://github.com/rustdesk/rustdesk-server-pro/discussions/307), ma significa anche che chiunque ottenga un client configurato o materiale di distribuzione valido può generare una registrazione simile.

Prima di classificare l'evento, esamina i log di registrazione e connessione del server, l'orario di prima comparsa del dispositivo e il suo IP di origine, i registri di distribuzione e il percorso di distribuzione dei client personalizzati. Ruota le password esposte, i token API/di distribuzione e la configurazione o le chiavi del server, se opportuno. Verifica se le stesse credenziali sono state riutilizzate altrove e se il dispositivo sconosciuto ha tentato o completato una sessione.

### Come fermarlo

Due impostazioni della console risolvono il problema, e quella più adatta dipende dal fatto che tu stia ancora attivamente integrando nuovi dispositivi reali.

**Opzione 1 — disabilita completamente la registrazione di nuovi dispositivi.** Se il tuo elenco di dispositivi è sostanzialmente stabile e non aggiungi macchine regolarmente, questa è la soluzione più semplice: vai su **Impostazioni → Altro → Disabilita nuovi dispositivi sulla console web**. Da quel momento nessun dispositivo nuovo potrà registrarsi, che provenga da un sandbox o meno.

**Opzione 2 — richiedi un token di distribuzione.** Se stai ancora distribuendo nuovi dispositivi regolarmente (un MSP che integra clienti, un team IT che esegue l'imaging di nuove macchine), un'impostazione generica "disabilita nuovi dispositivi" ti intralcia il lavoro. In alternativa, abilita **Impostazioni → Altro → Richiedi distribuzione per i nuovi dispositivi**, crea un token API (permesso Dispositivi, Lettura e scrittura) e fai in modo che il tuo processo di installazione esegua il [comando di distribuzione](https://rustdesk.com/docs/en/self-host/client-deployment/#explicit-deployment-for-new-devices) documentato su ogni dispositivo:

```
rustdesk --deploy --token <api_token>
```

Il flag esatto può cambiare da una versione all'altra, quindi consideralo come illustrativo e verifica la sintassi attuale nella documentazione di RustDesk Server Pro prima di scriptarlo. Solo un dispositivo che presenta un token valido viene aggiunto al tuo inventario. Una scansione antivirus in sandbox — che non ha modo di conoscere o fornire quel token — non riesce a registrarsi, mentre la tua distribuzione reale continua a funzionare normalmente. Questo è anche il meccanismo che gli MSP utilizzano per integrare i dispositivi tramite RMM o un'installazione scriptata, senza che un tecnico debba accedere manualmente a ogni macchina.

**Un controllo correlato, più circoscritto:** se preferisci lasciare la registrazione aperta ma semplicemente tenere i dispositivi non assegnati fuori dalla vista finché non li avrai esaminati, c'è anche **Impostazioni → Altro → Solo l'amministratore può accedere ai dispositivi non assegnati** — questo non blocca la registrazione, ma fa sì che gli utenti normali non vedano né possano toccare nulla che compaia prima che tu abbia avuto modo di controllarlo.

### Come valutare il risultato

La sola registrazione non dimostra che un aggressore abbia controllato un altro endpoint, ma resta comunque un'attività non autorizzata finché non viene spiegata. Una registrazione di breve durata che coincide con una scansione di sicurezza nota e non è seguita da alcun accesso successivo può avvalorare l'ipotesi del sandbox. Sessioni impreviste, registrazioni ripetute, l'uso di credenziali valide o la distribuzione di un client configurato al di fuori del suo canale previsto richiedono una risposta all'incidente.

## Chi se lo chiede

I nuovi operatori di server — amministratori IT e MSP allo stesso modo — tendono a imbattersi in questo problema pochi giorni dopo aver avviato un server self-hosted, prima ancora che i controlli di registrazione siano stati irrigiditi. Un'indagine tempestiva è importante perché una scansione innocua e una registrazione non autorizzata possono apparire simili nella console.

## Domande correlate

- Generare un client personalizzato con il proprio marchio: consulta la [documentazione di RustDesk](https://rustdesk.com/docs).
- [Cosa si intende per dispositivo gestito in RustDesk?](/it/blog/cosa-conta-come-dispositivo-gestito-in-rustdesk)
- [Consulta le release attuali di RustDesk e le correzioni di sicurezza](https://github.com/rustdesk/rustdesk/releases)
- [RustDesk per gli MSP: uno strumento self-hosted e personalizzabile](/it/blog/rustdesk-per-gli-msp-un-unico-strumento-self-hosted-e-personalizzabile)
  Hai notato un dispositivo che non riconosci? Conserva i log pertinenti, limita le nuove registrazioni, ruota eventuali segreti potenzialmente esposti e contatta il supporto RustDesk fornendo dettagli diagnostici non sensibili se la causa rimane poco chiara.
