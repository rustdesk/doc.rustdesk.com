---
publishDate: 2026-07-09T18:44:00Z
lang: 'it'
translationKey: 'rustdesk-vs-vnc'
draft: false
title: 'RustDesk vs VNC: attraversamento NAT, codec e crittografia'
excerpt: 'Confronto pratico tra RustDesk e VNC: attraversamento NAT senza port-forwarding, codec moderni, crittografia integrata e perché i team passano da VNC a RustDesk.'
image: ~/assets/images/blog/rustdesk-vs-vnc-og.png
category: 'Confronti'
tags: ['RustDesk', 'VNC', 'Confronto', 'Open source']
author: 'RustDesk Team'
slug: 'rustdesk-vs-vnc-attraversamento-nat-codec-e-crittografia'
faq:
  - question: 'RustDesk è basato su VNC?'
    answer: "No. VNC utilizza il protocollo RFB (Remote Framebuffer) per inviare aggiornamenti dei pixel. RustDesk è un'applicazione separata, open source (AGPL), con un'architettura di rendezvous/relay propria, codec video moderni e crittografia end-to-end. Non è un client né un server VNC."
  - question: 'VNC funziona su internet senza port-forwarding?'
    answer: "Non da solo. Il protocollo VNC/RFB di base non prevede l'attraversamento NAT, quindi l'uso su internet richiede in genere il port-forwarding della porta TCP 5900, una VPN o un tunnel SSH, a meno di utilizzare un servizio di brokering cloud offerto da un fornitore. RustDesk instrada la connessione tramite un server ID e un relay, quindi attraversa il NAT senza bisogno di nulla di tutto ciò."
  - question: 'VNC è crittografato?'
    answer: "Dipende dall'implementazione. RealVNC offre la crittografia AES nel suo prodotto commerciale, mentre TightVNC trasmette i dati dell'immagine senza crittografia ed è pensato per essere incanalato attraverso SSH. RustDesk applica per impostazione predefinita la crittografia end-to-end (NaCl) su tutte le connessioni."
  - question: 'RustDesk o VNC: quale è meglio per un home lab su LAN?'
    answer: "Su una LAN affidabile, VNC è estremamente semplice, standardizzato e disponibile su quasi ogni sistema operativo, persino su Raspberry Pi. RustDesk aggiunge l'attraversamento NAT, codec moderni e crittografia predefinita, elementi che diventano più importanti quando si esce dalla LAN o serve un accesso remoto multipiattaforma."
metadata:
  description: 'RustDesk vs VNC a confronto punto per punto: attraversamento NAT, codec moderni, crittografia integrata, self-hosting e dove la semplicità e la diffusione di VNC vincono ancora.'
  keywords: 'RustDesk vs VNC, RustDesk vs RealVNC, attraversamento NAT VNC, confronto crittografia VNC'
---

VNC è uno dei metodi più antichi e diffusi per controllare un altro computer. È un vero standard aperto, funziona praticamente ovunque e, su una LAN, è difficile da battere in termini di semplicità. RustDesk punta allo stesso obiettivo di fondo, ma è stato progettato per un mondo fatto di NAT, firewall e sistemi operativi misti. Le differenze si riducono al modo in cui ciascuno attraversa una rete — e a quanto bisogna aggiungere per renderlo sicuro.

Questo confronto si basa su fatti solidi e verificabili, non su benchmark che dipendono dal tuo hardware e dalla tua connessione.

## Cos'è realmente VNC

"VNC" non è un singolo programma, ma una famiglia di implementazioni — RealVNC, TightVNC, TigerVNC, UltraVNC e altre — che parlano il protocollo **RFB (Remote Framebuffer)** ([Wikipedia](<https://en.wikipedia.org/wiki/RFB_(protocol)>)). RFB è fondamentalmente **basato sui pixel**: il server invia al viewer gli aggiornamenti del framebuffer. Questo design è estremamente semplice e portabile, ed è il motivo per cui VNC esiste su qualsiasi cosa, dai server aziendali a un Raspberry Pi.

Le licenze sono miste. TigerVNC è distribuito sotto licenza GNU GPL e TightVNC è un fork open source guidato dalla community, mentre il viewer di RealVNC è un prodotto proprietario a sviluppo commerciale. Quindi l'affermazione "VNC è open source" è vera solo per _alcune_ implementazioni, non per tutte.

## Cos'è RustDesk

RustDesk è **un'unica applicazione open source (AGPL)** con un'architettura propria. I client si connettono verso l'esterno a un server ID/rendezvous, che negozia una sessione peer-to-peer o instradata tramite relay. Secondo la [documentazione RustDesk](https://rustdesk.com/docs/en/), il traffico è crittografato end-to-end (basato su NaCl) e il video utilizza codec moderni — VP8, VP9 e AV1 via software, con percorsi hardware H.264/H.265 — invece di semplici rettangoli di pixel grezzi. Puoi far funzionare ogni client contro l'infrastruttura pubblica, un tuo server self-hosted, oppure un rendezvous/relay scritto da te.

## Il problema di internet: l'attraversamento NAT

Questa è la differenza più netta. Il protocollo VNC di base **non prevede l'attraversamento NAT**. Come nota la [documentazione di VNC](https://en.wikipedia.org/wiki/Virtual_Network_Computing), per raggiungere una macchina su internet "un utente deve aprire questa porta nel firewall locale e configurare il port forwarding per inoltrare la porta TCP 5900 ... se si trova dietro un router con network address translation (NAT)." La soluzione comune è "incanalare VNC attraverso Secure Shell (SSH)", il che aggiunge anche la crittografia che il VNC semplice non ha. Alcuni prodotti VNC commerciali (come il servizio cloud di RealVNC) aggiungono un proprio sistema di brokering per evitare tutto ciò, ma si tratta di una funzionalità del fornitore aggiunta sopra, non parte del protocollo.

RustDesk è stato costruito nella direzione opposta. Poiché i client endpoint si connettono **in uscita** a un server rendezvous e ricorrono a un relay quando un percorso diretto non è disponibile, RustDesk **attraversa NAT e firewall senza port-forwarding per singolo endpoint, VPN o tunnel SSH**. Gli endpoint non necessitano di porte in ascolto in entrata, ma un server ID/rendezvous e relay self-hosted deve accettare traffico in entrata sulle porte di servizio documentate. È la stessa logica di attraversamento NAT che lo rende una valida [alternativa a Chrome Remote Desktop o ad altri strumenti gratuiti](/it/blog/il-miglior-software-gratuito-per-il-desktop-remoto-aziendale-2026) per l'accesso remoto e multipiattaforma.

## Crittografia: predefinita contro "dipende"

Con VNC, la crittografia è un dettaglio implementativo. RealVNC offre la crittografia AES nel suo pacchetto commerciale; al contrario, secondo la [documentazione di VNC](https://en.wikipedia.org/wiki/Virtual_Network_Computing), "TightVNC non è sicuro poiché i dati dell'immagine vengono trasmessi senza crittografia" e "dovrebbe essere incanalato attraverso una connessione SSH." Quindi la sicurezza di una sessione VNC dipende interamente da quale server hai scelto e da come lo hai configurato.

RustDesk applica **la crittografia end-to-end per impostazione predefinita** su ogni connessione, self-hosted o meno, senza dover ricordare di configurare alcun tunnel SSH.

## RustDesk vs VNC in breve

|                           | RustDesk                                                                        | VNC (RFB)                                                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Cos'è                     | Un'app AGPL + rendezvous/relay                                                  | Protocollo RFB, molteplici implementazioni                                                                                   |
| Codice sorgente           | Open source (AGPL)                                                              | Misto: GPL/open (TigerVNC, TightVNC), proprietario (RealVNC)                                                                 |
| Multipiattaforma          | Windows, macOS, Linux, Android; iOS (solo controller)                           | Molto ampia, incluso Raspberry Pi                                                                                            |
| Attraversamento NAT       | Integrato (rendezvous + relay)                                                  | Assente nel protocollo di base — [richiede port-forwarding/VPN/SSH](https://en.wikipedia.org/wiki/Virtual_Network_Computing) |
| Crittografia              | End-to-end (NaCl) predefinita ([documentazione](https://rustdesk.com/docs/en/)) | Variabile: da AES (RealVNC) a [nessuna (TightVNC)](https://en.wikipedia.org/wiki/Virtual_Network_Computing)                  |
| Trasmissione video        | Codec moderni (VP8/VP9/AV1, H.264/H.265)                                        | Codifiche RFB basate sui pixel                                                                                               |
| Self-hosting              | Sì — server ID/relay proprio                                                    | Sì per le implementazioni open (nessun broker integrato)                                                                     |
| Configurazione su LAN     | Semplice                                                                        | Molto semplice                                                                                                               |
| Protocollo standardizzato | Specifico di RustDesk                                                           | Standard RFB aperto e consolidato                                                                                            |

Verifica i dettagli aggiornati dei piani RustDesk su [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Dove RustDesk fa la differenza

I vantaggi progettuali di RustDesk emergono nel momento in cui si esce dalla LAN o serve coerenza tra team e piattaforme diverse:

- **Raggiungibilità su internet senza configurazioni complesse.** L'attraversamento NAT e il fallback su relay eliminano la necessità di port-forwarding, VPN o tunnel SSH per ogni endpoint.
- **Crittografia che non devi configurare.** End-to-end per impostazione predefinita, non un'implementazione da dover verificare.
- **Codec moderni.** VP8/VP9/AV1 e i percorsi hardware H.264/H.265 tendono a comportarsi meglio su connessioni limitate o ad alta latenza rispetto alle codifiche a pixel grezzi.
- **Un'unica app verificabile e un unico server self-hosted.** Il software open source (AGPL), insieme a un server ID/relay self-hosted, mantiene sia il codice sia i dati delle tue sessioni su un'infrastruttura che controlli tu.

Il compromesso: il self-hosting di RustDesk significa che **qualcuno deve gestire il server** — provisioning, TLS, porte e aggiornamenti nel tempo. Una configurazione VNC limitata alla LAN evita del tutto tutto questo. Questo è il vero compromesso.

## Quindi quale scegliere?

Per una LAN affidabile, un segmento air-gapped o un Raspberry Pi, la semplicità e la standardizzazione di VNC sono davvero difficili da battere. Quando invece serve attraversare internet in sicurezza, si desidera la crittografia attiva per impostazione predefinita, oppure occorre supportare un mix di Windows, macOS, Linux, Android e iOS con un unico strumento, l'architettura di RustDesk fa gran parte del lavoro al posto tuo. E se stai già valutando gli strumenti nativi di Windows, il nostro confronto [RustDesk vs RDP](/it/blog/rustdesk-vs-rdp-multipiattaforma-contro-nativo-per-windows) copre anche quella alternativa.

## Provalo

Se questo confronto ti convince finalmente a mandare in pensione il tuo tunnel SSH, inizia con il server community gratuito — open source, senza scadenza, attraversamento NAT incluso. Scrivi a [sales@rustdesk.com](mailto:sales@rustdesk.com) quando vuoi conoscere le condizioni di valutazione di Pro; le tariffe aggiornate dei piani sono disponibili su [rustdesk.com/pricing](https://rustdesk.com/pricing).
