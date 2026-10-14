---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-06-28T16:50:00Z
lang: 'it'
translationKey: 'rustdesk-server-pro-offline-air-gapped'
draft: false
title: 'RustDesk Server Pro può funzionare offline o air-gapped?'
excerpt: 'No: RustDesk Server Pro self-hosted ha bisogno di un accesso in uscita continuativo a rustdesk.com per convalidare la licenza, quindi un deployment completamente air-gapped non è supportato.'
image: '~/assets/images/blog/rustdesk-server-pro-offline-air-gapped-og.webp'
category: 'Distribuzione'
tags: ['RustDesk', 'Distribuzione', 'Self-hosting']
author: 'RustDesk Team'
slug: 'rustdesk-server-pro-puo-funzionare-offline-o-air-gapped'
faq:
  - question: 'RustDesk Server Pro può funzionare offline o air-gapped?'
    answer: "No. RustDesk Server Pro verifica la licenza con rustdesk.com tramite HTTPS in uscita (porta 443) circa una volta al giorno e, se un controllo fallisce, continua a riprovare per circa 7 giorni, quindi un deployment Pro permanentemente air-gapped esula dal modello di licenza standard. È supportato l'uso di un proxy. RustDesk Server OSS, il server community gratuito, non ha alcun controllo della licenza."
  - question: 'RustDesk Server Pro ha bisogno di una connessione Internet permanente?'
    answer: 'Ha bisogno di un accesso in uscita continuativo a rustdesk.com per la convalida della licenza, ma non letteralmente ininterrotto. Il server esegue un controllo sulla porta 443 circa una volta al giorno e, se il controllo fallisce, continua a riprovare finché non riesce o finché non trascorrono circa sette giorni: una breve interruzione viene quindi tollerata, ma un server isolato da rustdesk.com più a lungo di questo margine smette di convalidare la licenza. Le sessioni remote vere e proprie sono coordinate dai tuoi server relay e ID (rendezvous) self-hosted.'
  - question: 'Di quale accesso in uscita ha bisogno un deployment isolato di RustDesk Server Pro?'
    answer: "Consenti il traffico HTTPS in uscita dal server verso rustdesk.com per la convalida della licenza, più il servizio di build dei client personalizzati se generi client con il tuo marchio. È supportato l'uso di un proxy, così il resto della rete può restare blindato. Gli altri flussi in uscita da pianificare sono gli aggiornamenti dei client e l'eventuale provider di identità esterno che colleghi."
  - question: "Esiste un'opzione di licenza RustDesk completamente air-gapped?"
    answer: "No. La licenza standard di RustDesk Server Pro richiede una verifica online periodica. RustDesk Server OSS, il server community gratuito, non ha alcun controllo della licenza: i suoi servizi ID/rendezvous e relay girano all'interno di una rete isolata, senza la console web né le funzionalità di gestione di Pro. Per un requisito di air gap rigido su Pro, contatta sales@rustdesk.com descrivendo il tuo scenario."
metadata:
  description: 'RustDesk Server Pro self-hosted funziona air-gapped? No: la licenza Pro deve raggiungere regolarmente rustdesk.com, quindi un air gap totale non è supportato.'
  keywords: 'rustdesk server pro offline, rustdesk air-gapped, requisito internet rustdesk self-hosted, controllo licenza rustdesk server pro, deployment offline rustdesk, rustdesk richiede internet'
---

No: un deployment self-hosted di RustDesk Server Pro non è pensato per funzionare completamente offline o air-gapped. Per restare valida, la licenza Pro deve raggiungere rustdesk.com tramite una connessione in uscita, sia al momento dell'attivazione sia in modo continuativo mentre il server è in funzione, quindi una rete completamente isolata esula dal modello supportato.

## La risposta breve

Le [FAQ ufficiali sul controllo della licenza](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-often-does-pro-check-license) descrivono una verifica periodica: il server contatta rustdesk.com sulla porta 443 circa una volta al giorno e, se un controllo fallisce, riprova finché non ha successo oppure finché non trascorrono circa sette giorni, dopodiché la licenza smette di essere convalidata. Questo margine di tolleranza integrato fa sì che una breve interruzione di Internet non comprometta subito il tuo deployment, mentre un server permanentemente offline sì. I tuoi servizi ID e relay restano self-hosted: le sessioni dirette passano tra gli endpoint e quelle tramite relay usano il tuo relay. È supportato l'uso di un proxy, quindi puoi consentire il percorso HTTPS in uscita necessario e bloccare il resto della rete.

## Nel dettaglio

Questo requisito riguarda **Server Pro**. **RustDesk Server OSS (il server community gratuito)** non ha alcun controllo della licenza. Il client di RustDesk e Server OSS hanno licenza AGPL; Server Pro è un software server self-hosted commerciale e proprietario. In una rete isolata, client e servizi ID/relay locali hanno comunque bisogno di percorsi funzionanti, chiavi corrette e permessi della piattaforma. Le sessioni dirette negoziate tramite ID viaggiano tra gli endpoint; quelle tramite relay usano il tuo server. Le sessioni basate su ID sono crittografate end-to-end quando i client hanno la chiave pubblica del tuo server, mentre [Direct IP Access non è crittografato](https://github.com/rustdesk/rustdesk/wiki/FAQ), quindi non sostituisce una connessione tramite ID configurata correttamente.

C'è un altro flusso di lavoro da considerare: la **creazione di un client personalizzato**. Se generi da Server Pro un client con il tuo marchio o preconfigurato, la build gira sul servizio di build di RustDesk, quindi anche questa richiede l'accesso in uscita. La configurazione inviata viene eliminata al termine della build e l'installer viene rimosso automaticamente dopo circa un giorno, quindi scaricalo e conservalo nel tuo repository.

Per una rete rigorosamente air-gapped, questo è il dettaglio decisivo: un server che non può _mai_ raggiungere rustdesk.com esula dal modello predefinito, quindi se hai requisiti di air gap rigidi, verifica il tuo scenario esatto con RustDesk prima di procedere. Per la configurazione molto più comune «per lo più isolata, con uscita limitata», prevedi un unico percorso HTTPS in uscita verso rustdesk.com, diretto o tramite proxy, e definisci domini, porte e flusso di approvazione esatti prima di scrivere la policy del firewall. Consulta la [documentazione di RustDesk](https://rustdesk.com/docs/it/) e tieni presente che lo stesso requisito di licenza è il motivo per cui [non puoi eseguire Server Pro senza alcun accesso a Internet nemmeno installandolo senza Docker](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/installscript/).

## Censisci ogni dipendenza in uscita

I team di sicurezza e gli [MSP](/it/blog/rustdesk-per-gli-msp-un-unico-strumento-self-hosted-e-personalizzabile) che servono ambienti blindati di solito se lo chiedono prima di installare RustDesk. Il loro elenco di uscite per Server Pro è breve: convalida della licenza verso rustdesk.com via HTTPS, il servizio di build dei client personalizzati se generi client con il tuo marchio, gli aggiornamenti dei client, SMTP se il server di posta si trova fuori dalla rete e l'eventuale provider di identità esterno che colleghi. Server ID/rendezvous, relay e console girano all'interno della tua rete, quindi una regola firewall precisa sostituisce un'apertura eccessiva della rete.

## Domande correlate

- Domini e porte in uscita: consulta la [documentazione di RustDesk](https://rustdesk.com/docs/it/).
- [Posso installare RustDesk Server Pro senza Docker su una VM standard?](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/installscript/)
- Generare un client personalizzato con il tuo marchio: consulta la [documentazione di RustDesk](https://rustdesk.com/docs/it/).

Stai pianificando un rollout blindato o quasi air-gapped? Apri il percorso per la licenza e i flussi in uscita che usi davvero, mantieni interno tutto il resto e scrivi a [sales@rustdesk.com](mailto:sales@rustdesk.com) se il tuo requisito è un air gap permanente.
