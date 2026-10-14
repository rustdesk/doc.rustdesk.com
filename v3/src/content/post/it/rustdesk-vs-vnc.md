---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-09T18:44:00Z
lang: 'it'
translationKey: 'rustdesk-vs-vnc'
draft: false
title: 'RustDesk vs VNC: attraversamento NAT, codec e crittografia'
excerpt: 'Confronto pratico tra RustDesk e VNC: attraversamento del NAT senza port-forwarding, codec moderni, crittografia integrata e perché i team passano da VNC a RustDesk.'
image: ~/assets/images/blog/rustdesk-vs-vnc-og.webp
category: 'Confronti'
tags: ['RustDesk', 'VNC', 'Confronto', 'Open source']
author: 'RustDesk Team'
slug: 'rustdesk-vs-vnc-attraversamento-nat-codec-e-crittografia'
faq:
  - question: 'RustDesk è basato su VNC?'
    answer: "No. VNC usa il protocollo RFB (Remote Framebuffer) per inviare aggiornamenti dei pixel. RustDesk è un'applicazione separata, con un client open source (AGPL), una propria architettura di rendezvous/relay, codec video VP8/VP9/AV1 e sessioni basate su ID crittografate end-to-end. RustDesk non è né un client né un server VNC."
  - question: 'VNC funziona via Internet senza port-forwarding?'
    answer: "No, non da solo. Il protocollo VNC/RFB di base non prevede l'attraversamento del NAT, quindi l'uso via Internet richiede in genere il port-forwarding della porta TCP 5900, una VPN o un tunnel SSH, a meno di usare il servizio di intermediazione cloud di un fornitore. RustDesk coordina la connessione tramite un server ID e un relay, quindi attraversa il NAT senza nulla di tutto ciò."
  - question: 'VNC è crittografato?'
    answer: 'Solo in alcune implementazioni. TigerVNC supporta la sicurezza TLS/X509, RealVNC offre la crittografia AES e TightVNC consiglia il tunneling SSH sulle reti non affidabili. RustDesk crittografa end-to-end le sessioni coordinate tramite ID quando i client sono configurati con la chiave pubblica corretta del server. Direct IP Access di RustDesk è una modalità separata e non crittografata, da tenere dietro una VPN.'
  - question: 'RustDesk o VNC: quale è meglio per un home lab su LAN?'
    answer: "Su una LAN affidabile, VNC è spesso la scelta più semplice: è standardizzato, si installa in fretta ed è disponibile su quasi ogni sistema operativo, Raspberry Pi incluso. RustDesk è più adatto quando esci dalla LAN o ti serve un accesso remoto tra sistemi operativi diversi, perché aggiunge l'attraversamento del NAT, codec video moderni e sessioni basate su ID crittografate end-to-end."
metadata:
  description: 'RustDesk vs VNC punto per punto: attraversamento NAT, codec moderni, crittografia integrata, self-hosting e dove semplicità e diffusione di VNC vincono ancora.'
  keywords: 'RustDesk vs VNC, RustDesk vs RealVNC, attraversamento NAT VNC, confronto crittografia VNC'
---

VNC è uno dei metodi più antichi e diffusi per controllare un altro computer. È un vero standard aperto, funziona praticamente ovunque e, in LAN, è difficile da battere in quanto a semplicità. RustDesk punta allo stesso obiettivo di fondo, ma è stato progettato per un mondo fatto di NAT, firewall e sistemi operativi misti. Le differenze si riducono al modo in cui ciascuno attraversa una rete, e a quanto bisogna aggiungere per renderlo sicuro.

Questo confronto si basa su fatti stabili e verificabili, non su benchmark che dipendono dal tuo hardware e dalla tua connessione.

## Cos'è realmente VNC

«VNC» è una famiglia di implementazioni (RealVNC, TightVNC, TigerVNC, UltraVNC e altre) che parlano il **protocollo RFB (Remote Framebuffer)**. RFB invia aggiornamenti del framebuffer usando codifiche negoziate, che possono comprimere le immagini o usare il video. Per esempio, [TigerVNC supporta le codifiche Tight, JPEG, ZRLE, Hextile, H.264 e Raw](https://tigervnc.org/doc/vncviewer.html). Le prestazioni dipendono quindi dall'implementazione e dalla codifica, non da RFB in sé.

Le licenze sono miste. TigerVNC è distribuito con licenza GNU GPL e TightVNC è un fork aperto guidato dalla community, mentre il viewer di RealVNC è un prodotto proprietario a sviluppo commerciale. Quindi «VNC è open source» è vero solo per _alcune_ implementazioni, non per tutte.

## Cos'è RustDesk

Il client di RustDesk e RustDesk Server OSS (il server community gratuito) hanno **licenza AGPL**; Server Pro è un software server self-hosted commerciale e proprietario che aggiunge la gestione centralizzata. RustDesk usa un'architettura con server ID/rendezvous e relay. I client si connettono in uscita al server ID, che coordina sessioni peer-to-peer dirette o tramite relay. Il [client supporta i codec software VP8, VP9 e AV1 e i codec hardware H.264/H.265](https://rustdesk.com/docs/it/). Puoi usare il tuo server per coordinamento e relay senza predisporre una VPN o un tunnel SSH separato per ogni endpoint.

## Il problema di Internet: l'attraversamento del NAT

Il protocollo RFB di base non prevede l'attraversamento del NAT. Un deployment VNC diretto in genere richiede un percorso di rete raggiungibile, come una VPN, un tunnel SSH o una porta inoltrata. [TightVNC documenta le sue opzioni di port-forwarding e SSH](https://www.tightvnc.com/faq.php). Alcuni prodotti VNC aggiungono un'intermediazione cloud; si tratta di una funzionalità del prodotto, non di un requisito di RFB.

RustDesk è stato costruito nella direzione opposta. Poiché i client sugli endpoint si connettono **in uscita** a un server rendezvous e ripiegano su un relay quando un percorso diretto non riesce, RustDesk **attraversa NAT e firewall senza port-forwarding per singolo endpoint, VPN o tunnel SSH**. Gli endpoint non hanno bisogno di porte in ascolto in entrata, ma un server ID/rendezvous e relay self-hosted deve accettare traffico in entrata sulle porte di servizio documentate. È la stessa capacità di attraversare il NAT che lo rende un'[opzione di desktop remoto gratuita e pratica per le aziende](/it/blog/il-miglior-software-gratuito-per-il-desktop-remoto-aziendale-2026) per l'accesso remoto e tra sistemi operativi diversi.

## Crittografia: predefinita contro «dipende»

La sicurezza di VNC varia a seconda dell'implementazione. [TigerVNC supporta i tipi di sicurezza TLS e X509](https://tigervnc.org/doc/vncviewer.html), mentre [TightVNC avverte che il traffico della sessione non è crittografato e consiglia il tunneling SSH sulle reti non affidabili](https://www.tightvnc.com/faq.php). Sono il server, il viewer e il tipo di sicurezza configurato a decidere se una sessione VNC è crittografata.

RustDesk supporta **sessioni coordinate tramite ID crittografate end-to-end**, sia che il percorso negoziato sia diretto sia che passi da un relay. Con un server self-hosted, i client hanno bisogno della [chiave pubblica corretta del server](https://rustdesk.com/docs/it/self-host/client-configuration/). **Direct IP Access** (inserire un indirizzo IP invece di usare un ID) è una [modalità diversa e non crittografata](https://github.com/rustdesk/rustdesk/wiki/FAQ#i-only-use-rustdesk-for-a-few-devices-on-my-local-network-with-no-internet-connectivity-can-i-still-use-rustdesk-with-direct-ip-access); proteggi quel percorso con una VPN.

## RustDesk vs VNC in breve

|                           | RustDesk                                                                                                 | VNC (RFB)                                                                                                       |
| ------------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Cos'è                     | Un'app + server rendezvous/relay                                                                         | Protocollo RFB, molte implementazioni                                                                           |
| Codice sorgente           | Client e Server OSS: AGPL; Server Pro: proprietario                                                      | Misto: GPL/open (TigerVNC, TightVNC), proprietario (RealVNC)                                                    |
| Multipiattaforma          | Windows, macOS, Linux, Android; iOS (solo controller)                                                    | Molto ampia, incluso Raspberry Pi                                                                               |
| Attraversamento del NAT   | Rendezvous e relay integrati                                                                             | Non fa parte di RFB di base; broker specifici dei prodotti o percorsi VPN/SSH possono fornire l'accesso         |
| Crittografia              | Sessioni coordinate tramite ID crittografate con la chiave corretta; Direct IP Access non è crittografato | Dipende dall'implementazione; TLS/X509 in TigerVNC, AES in RealVNC, SSH consigliato per TightVNC               |
| Trasmissione video        | VP8/VP9/AV1, H.264/H.265 hardware facoltativi                                                            | Le codifiche RFB variano in base all'implementazione; possono esserci percorsi con immagini compresse e video   |
| Self-hosting              | Sì — il tuo server ID/relay                                                                              | Sì per le implementazioni open (nessun broker integrato)                                                        |
| Configurazione in LAN     | Semplice                                                                                                 | Molto semplice                                                                                                  |
| Protocollo standardizzato | Specifico di RustDesk                                                                                    | Standard RFB aperto e consolidato                                                                               |

Verifica i dettagli aggiornati dei piani RustDesk su [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Dove RustDesk fa la differenza

I vantaggi progettuali di RustDesk emergono nel momento in cui esci dalla LAN o ti serve coerenza tra team e piattaforme diverse:

- **Raggiungibilità via Internet senza impianti aggiuntivi.** L'attraversamento del NAT e il fallback su relay eliminano port-forwarding, VPN o tunnel SSH per ogni endpoint.
- **Crittografia sul percorso tramite ID.** Le sessioni basate su ID sono crittografate end-to-end, dirette o tramite relay, una volta che i client hanno la chiave pubblica del tuo server.
- **Una scelta di codec.** VP8, VP9 e AV1 in software, più i codec hardware H.264/H.265 dove il dispositivo li supporta.
- **Un client aperto e un server da distribuire in proprio.** Puoi ispezionare e compilare tu stesso il client e Server OSS; i tuoi servizi ID e relay coordinano le connessioni e trasportano il traffico inoltrato.

Il compromesso: il self-hosting di RustDesk significa che **qualcuno deve gestire il server**: provisioning, TLS, porte e aggiornamenti nel tempo. Una configurazione VNC limitata alla LAN evita del tutto questo lavoro.

## Quindi quale scegliere?

Per una LAN affidabile, un segmento air-gapped o un Raspberry Pi, la semplicità e la standardizzazione di VNC sono davvero difficili da battere. Quando invece devi attraversare Internet in sicurezza, vuoi la crittografia attiva per impostazione predefinita o devi supportare un mix di Windows, macOS, Linux, Android e iOS con un unico strumento, l'architettura di RustDesk fa gran parte del lavoro al posto tuo. E se stai già valutando gli strumenti nativi di Windows, il nostro confronto [RustDesk vs RDP](/it/blog/rustdesk-vs-rdp-multipiattaforma-contro-nativo-per-windows) copre anche quella alternativa.

## Provalo

Se questo confronto è quello che finalmente manda in pensione il tuo tunnel SSH, inizia con Server OSS: gratuito, senza canone di licenza né scadenza, attraversamento del NAT incluso. Scrivi a [sales@rustdesk.com](mailto:sales@rustdesk.com) quando vuoi le condizioni di valutazione di Pro; le tariffe aggiornate dei piani sono su [rustdesk.com/pricing](https://rustdesk.com/pricing).
