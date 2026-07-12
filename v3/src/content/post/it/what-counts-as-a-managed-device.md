---
publishDate: 2026-07-02T14:43:00Z
lang: 'it'
translationKey: 'what-counts-as-a-managed-device'
draft: false
title: 'Cosa conta come dispositivo gestito in RustDesk?'
excerpt: "Nei piani standard di RustDesk, ogni dispositivo che configuri per l'accesso conta una sola volta. Customized V2 conta solo i dispositivi assegnati a un gruppo o a un utente; i dispositivi ad-hoc non vengono conteggiati."
image: '~/assets/images/blog/what-counts-as-a-managed-device-og.png'
category: 'Prezzi'
tags: ['RustDesk', 'Prezzi', 'Licenze']
author: 'RustDesk Team'
slug: 'cosa-conta-come-dispositivo-gestito-in-rustdesk'
faq:
  - question: 'Come conta RustDesk i dispositivi gestiti?'
    answer: "Nei piani standard, ogni dispositivo che configuri per l'accesso conta come un dispositivo gestito, una sola volta — presidiato o non presidiato, che tu ti connetta una volta o mille. Customized V2 conta in modo diverso: contano ai fini del numero di dispositivi con licenza solo i dispositivi assegnati a un gruppo di dispositivi o a un utente."
  - question: 'Come vengono conteggiati i dispositivi per il supporto ad-hoc e occasionale?'
    answer: 'Nel piano Customized V2, contano come dispositivi gestiti solo i dispositivi assegnati a un gruppo di dispositivi o a un utente. Una macchina a cui ti connetti una sola volta per un supporto estemporaneo — e che non assegni mai — non viene conteggiata ai fini del numero di dispositivi con licenza e non viene disabilitata. Per un lavoro prevalentemente ad-hoc, questo rende Customized V2 una soluzione più adatta rispetto al conteggio di ogni singolo endpoint.'

metadata:
  description: 'Come RustDesk conta i dispositivi gestiti: i piani standard contano una volta ogni dispositivo raggiungibile; Customized V2 conta solo i dispositivi assegnati a un gruppo o a un utente.'
  keywords: 'cosa conta come dispositivo gestito, conteggio dispositivi rustdesk, licenza rustdesk vs teamviewer, licenza dispositivo presidiato vs non presidiato, supporto ad-hoc rustdesk, licenza supporto remoto per msp'
---

Se provieni dal modello a postazione (per-seat) di TeamViewer, la regola di conteggio dei piani standard di RustDesk è sorprendentemente semplice: **ogni dispositivo a cui vuoi accedere conta come un dispositivo gestito, conteggiato una sola volta.** Il piano **[Customized V2](https://rustdesk.com/pricing#custom2)** conta in modo diverso — contano solo i dispositivi che assegni a un gruppo o a un utente — ed è proprio questo che lo rende adatto a un supporto ad-hoc intensivo.

## La risposta breve

Nei piani standard, un "dispositivo gestito" è qualsiasi macchina a cui vuoi poter accedere, e il server la conta una sola volta. Non importa:

- se il dispositivo è **presidiato** (qualcuno è seduto davanti) o **non presidiato** (un server headless, un chiosco o una postazione sempre attiva),
- se ti connetterai **una sola volta** o **molte volte**,
- con quale frequenza vi accedi.

Se il tuo lavoro consiste in gran parte in supporto estemporaneo e occasionale, il conteggio più ristretto di **[Customized V2](https://rustdesk.com/pricing#custom2)**, descritto più avanti, è pensato esattamente per questo caso.

## Nel dettaglio

Ciò che _cambia_ le cose è il piano. Nel piano **[Customized V2](https://rustdesk.com/pricing#custom2)** la definizione di dispositivo gestito è più ristretta: contano ai fini del numero di dispositivi con licenza solo i dispositivi che **assegni a un gruppo di dispositivi o a un utente**. Le macchine a cui accedi solo per supporto ad-hoc, occasionale — e che non assegni mai — non vengono conteggiate e non vengono disabilitate. Se preferisci che questi dispositivi non assegnati non compaiano affatto nella console, l'impostazione client [`register-device`](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#register-device) controlla proprio questo aspetto, ed entra in vigore quando il numero di connessioni simultanee con licenza è pari o superiore a 2. In pratica, una sessione di supporto rapido di questo tipo mostra solo un ID e una password monouso per un'unica connessione presidiata, quindi un'interazione realmente occasionale non richiede mai uno slot permanente nel tuo parco dispositivi. Se gran parte del tuo lavoro assomiglia a questo scenario, Customized V2 è di solito la scelta più adatta: scrivi a [sales@rustdesk.com](mailto:sales@rustdesk.com) descrivendo il tuo scenario per conoscere le condizioni attuali, oppure consulta [rustdesk.com/pricing](https://rustdesk.com/pricing).

Ad esempio, immagina un [MSP](/it/blog/rustdesk-per-gli-msp-un-unico-strumento-self-hosted-e-personalizzabile) con 20 tecnici che supportano circa 1.000 macchine dei clienti: dovrebbe soddisfare **entrambe** le dimensioni della licenza — utenti di accesso sufficienti per tutti i 20 tecnici e dispositivi gestiti sufficienti per le macchine mantenute raggiungibili. Per gli endpoint che sono davvero interventi di supporto occasionali, si applica la regola di Customized V2 descritta sopra; i limiti attualmente previsti sono disponibili su [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Chi se lo chiede

Chiunque debba tradurre un conteggio di postazioni TeamViewer o AnyDesk nelle unità di RustDesk si scontra prima di tutto con questa definizione, perché le unità di licenza non corrispondono in modo diretto. I piani a pagamento di RustDesk richiedono capacità sia per le persone che effettuano l'accesso sia per i dispositivi mantenuti sotto gestione.

## Domande correlate

- Licenza per utente vs. per dispositivo, connessioni simultanee e conteggio dei dispositivi per Server Pro: vedi [prezzi di RustDesk](https://rustdesk.com/pricing).
- [Arrivi da TeamViewer? Come si confrontano i prezzi di RustDesk per gli MSP?](/it/blog/rustdesk-vs-teamviewer-lalternativa-self-hosted)

Stai dimensionando un parco dispositivi e non sei sicuro se gli interventi di supporto occasionali debbano rientrare nel tuo conteggio dei dispositivi? Consulta le condizioni attuali su [rustdesk.com/pricing](https://rustdesk.com/pricing) oppure chiedi al team prima di acquistare.
