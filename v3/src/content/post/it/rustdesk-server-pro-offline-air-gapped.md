---
publishDate: 2026-06-28T16:50:00Z
lang: 'it'
translationKey: 'rustdesk-server-pro-offline-air-gapped'
draft: false
title: 'RustDesk Server Pro può funzionare offline o air-gapped?'
excerpt: 'No: RustDesk Server Pro self-hosted necessita di un accesso in uscita continuo a rustdesk.com per convalidare la licenza, quindi un deployment completamente air-gapped non è supportato.'
image: '~/assets/images/blog/rustdesk-server-pro-offline-air-gapped-og.png'
category: 'Distribuzione'
tags: ['RustDesk', 'Distribuzione', 'Self-hosting']
author: 'RustDesk Team'
slug: 'rustdesk-server-pro-puo-funzionare-offline-o-air-gapped'
faq:
  - question: 'RustDesk Server Pro può funzionare offline o air-gapped?'
    answer: "No. Server Pro con licenza deve mantenere una connessione in uscita verso rustdesk.com per convalidare la licenza mentre è in funzione, quindi un deployment completamente air-gapped, che non comunica mai con l'esterno, non è supportato. È comunque possibile limitare rigorosamente il traffico in uscita e instradarlo tramite un proxy."
  - question: 'RustDesk Server Pro ha bisogno di una connessione internet permanente?'
    answer: 'Ha bisogno di un accesso in uscita continuativo a rustdesk.com per la convalida della licenza, ma non letteralmente ininterrotto. Il server esegue un controllo sulla porta 443 circa una volta al giorno e, se il controllo fallisce, continua a riprovare finché non ha successo o finché non trascorrono circa sette giorni: una breve interruzione viene quindi tollerata, ma un server isolato da rustdesk.com per un periodo più lungo di questo margine di tolleranza smette di convalidare la licenza. Le sessioni remote vere e proprie sono gestite dai tuoi server relay e ID (rendezvous) self-hosted.'
  - question: 'Di quale accesso in uscita ha bisogno un deployment isolato di RustDesk Server Pro?'
    answer: "Consenti il traffico HTTPS in uscita dal server verso rustdesk.com per la convalida della licenza (e per il provisioning del client personalizzato, se lo utilizzi). È supportato l'uso di un proxy, così il resto della rete può restare blindato. Verifica i domini e le porte esatti nella documentazione di RustDesk."
  - question: "Esiste un'opzione di licenza RustDesk completamente air-gapped?"
    answer: "Il prodotto con licenza standard non è pensato per un air gap che non comunica mai con l'esterno. Se hai requisiti di air gap rigidi, verifica il tuo scenario esatto con RustDesk prima di procedere."
metadata:
  description: 'RustDesk Server Pro self-hosted può funzionare in modalità air-gapped? No: la licenza Pro richiede un accesso in uscita continuativo a rustdesk.com, quindi un air gap completo non è supportato.'
  keywords: 'rustdesk server pro offline, rustdesk air-gapped, requisito internet rustdesk self-hosted, controllo licenza rustdesk server pro, deployment offline rustdesk, rustdesk richiede internet'
---

No: un'implementazione self-hosted di RustDesk Server Pro non è pensata per funzionare completamente offline o in modalità air-gapped. Per rimanere valida, la licenza Pro deve raggiungere rustdesk.com tramite una connessione in uscita, sia al momento dell'attivazione sia in modo continuativo mentre il server è operativo: una rete pensata per non comunicare mai con l'esterno esula quindi dal modello supportato.

## La risposta breve

In pratica il controllo è periodico, non costante: il server contatta rustdesk.com sulla porta 443 circa una volta al giorno e, se un controllo fallisce, continua a riprovare finché non ha successo oppure finché non trascorrono circa sette giorni, dopodiché la licenza smette di essere convalidata. Questo margine di tolleranza integrato fa sì che una breve interruzione di internet non comprometta immediatamente il tuo deployment, mentre un server permanentemente offline sì. I tuoi servizi ID e relay restano self-hosted: le sessioni dirette passano tra gli endpoint e le sessioni con relay utilizzano il tuo relay. Puoi mantenere la rete strettamente limitata: è supportato l'uso di un proxy, quindi in pratica consenti il percorso HTTPS in uscita necessario e blocchi tutto il resto.

## Nel dettaglio

Il server RustDesk open source, che puoi self-hostare senza licenza, è un caso diverso; il requisito descritto qui riguarda specificamente il set di funzionalità di **Server Pro con licenza**. Se la tua preoccupazione riguarda fondamentalmente il mantenimento dei dati di sessione sulla tua infrastruttura, il self-hosting raggiunge già questo obiettivo: il requisito di connessione in uscita riguarda la licenza, non la gestione di ogni singola sessione.

C'è un secondo flusso di lavoro da considerare: la **creazione di un client personalizzato**. Se generi un client brandizzato o preconfigurato da Server Pro, anche questo passaggio di provisioning richiede l'accesso in uscita. Verifica il comportamento attuale per la tua versione e il tuo piano.

Per una rete rigorosamente air-gapped, questo è il dettaglio decisivo. Un server realmente isolato che non può _mai_ raggiungere rustdesk.com esula dal modello predefinito: se hai requisiti di air gap rigidi, verifica il tuo scenario esatto con RustDesk prima di procedere. Per la configurazione "per lo più isolata, con uscita limitata" — molto più comune — l'indicazione pratica è prevedere un unico percorso HTTPS in uscita verso rustdesk.com, diretto o tramite proxy, definendo domini, porte e flusso di approvazione esatti prima di scrivere la policy del firewall. Consulta la [documentazione di RustDesk](https://rustdesk.com/docs) e tieni presente che lo stesso requisito di licenza è il motivo per cui [non è possibile eseguire Server Pro senza alcun accesso a internet nemmeno installandolo senza Docker](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/installscript/).

## Chi se lo chiede

Chi gestisce reti isolate o regolamentate se lo chiede ancora prima di installare RustDesk: sia i team di sicurezza sia gli [MSP](/it/blog/rustdesk-per-gli-msp-un-unico-strumento-self-hosted-e-personalizzabile) che operano in ambienti blindati. Le loro reti possono trovarsi dietro firewall in uscita molto restrittivi, oppure vogliono semplicemente ridurre al minimo le dipendenze esterne. Sapere che la licenza richiede un percorso in uscita continuativo — ma solo quello — permette loro di scrivere una regola firewall precisa, invece di aprire eccessivamente la rete o di presumere erroneamente che il prodotto funzioni in un vuoto totale.

## Domande correlate

- Domini e porte in uscita: consulta la [documentazione di RustDesk](https://rustdesk.com/docs).
- [Posso installare RustDesk Server Pro senza Docker su una VM standard?](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/installscript/)
- Generare un client personalizzato con il proprio marchio: consulta la [documentazione di RustDesk](https://rustdesk.com/docs).

Stai pianificando un rollout blindato o quasi air-gapped? Verifica su rustdesk.com i dettagli attuali su connettività e licenza prima di finalizzare la policy del firewall.
