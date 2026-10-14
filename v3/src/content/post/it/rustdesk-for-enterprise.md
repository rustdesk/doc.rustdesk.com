---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-06-29T16:16:00Z
lang: 'it'
translationKey: rustdesk-for-enterprise
draft: false
title: 'RustDesk per le aziende: self-hosted, scalabile, pronto per AD'
excerpt: 'Perché i team IT aziendali scelgono RustDesk: controllo dei dati in self-hosting, AD/LDAP, controllo di accesso per gruppi di dispositivi e prezzi prevedibili per grandi flotte.'
image: ~/assets/images/blog/rustdesk-for-enterprise-og.webp
category: 'Guide'
tags: ['RustDesk', 'Aziende', 'Self-hosting']
author: RustDesk Team
slug: 'rustdesk-per-le-aziende-self-hosted-scalabile-pronto-per-ad'
faq:
  - question: 'RustDesk può essere distribuito in massa su una flotta aziendale?'
    answer: "Sì. RustDesk fornisce un MSI per Windows per l'installazione silenziosa e non presidiata tramite msiexec, distribuibile con Group Policy (GPO), Microsoft Intune, un RMM o strumenti di packaging, e il generatore di client personalizzati (dal piano Basic in su) produce un client già preconfigurato per il tuo server."
  - question: 'RustDesk dispone di una REST API?'
    answer: 'Sì. RustDesk Server Pro espone una REST API, autorizzata tramite token API creati nella console web, oltre a strumenti di gestione CLI in Python. Gli script possono registrare, elencare, assegnare e rimuovere dispositivi e gestire in blocco utenti, gruppi, rubriche e log di audit, invece di lavorare solo dalla console web.'
  - question: "RustDesk supporta Active Directory e SSO per l'identità aziendale?"
    answer: 'Sì. RustDesk Server Pro include LDAP/Active Directory e SSO OIDC dal piano Basic in su, così i tecnici si autenticano sulla tua fonte di identità esistente invece che su un elenco utenti separato. Il piano Individual non include LDAP/AD né SSO OIDC.'
  - question: 'Le aziende possono mantenere i dati di RustDesk sulla propria infrastruttura?'
    answer: "Sì, è il modello alla base di RustDesk Server Pro. Ospiti in self-hosting il server ID/rendezvous, il relay, la console web e i dati dei dispositivi memorizzati su un'infrastruttura gestita da te. Le sessioni dirette viaggiano tra gli endpoint e quelle tramite relay usano il tuo relay, quindi documenta l'instradamento degli endpoint insieme alla posizione dei server."
  - question: 'Come funzionano i prezzi di RustDesk per le flotte di grandi dimensioni?'
    answer: "RustDesk Server Pro concede in licenza utenti con login e dispositivi gestiti, e i piani standard includono connessioni simultanee illimitate; solo Customized V2 concede in licenza un numero prestabilito di connessioni simultanee. Gli upgrade si possono acquistare in qualsiasi momento ed estendono la licenza a un anno intero dalla data dell'upgrade, accreditando il valore residuo già pagato. Dimensiona entrambi i conteggi su rustdesk.com/pricing."
metadata:
  description: 'RustDesk in azienda: ID, relay e console self-hosted, LDAP/AD e SSO OIDC, accessi per gruppi di dispositivi, deploy MSI e connessioni simultanee illimitate.'
  keywords: 'RustDesk per le aziende, deployment aziendale di RustDesk, supporto remoto integrato con Active Directory, architettura aziendale di RustDesk'
---

## Mantieni l'accesso remoto su un'infrastruttura che controlli

RustDesk Server Pro esegue ID/rendezvous, relay, console web e dati dei dispositivi all'interno del tuo perimetro, con LDAP/AD e SSO OIDC dal piano Basic e connessioni simultanee illimitate nei piani standard. Questo copre i punti su cui di solito si giocano le valutazioni aziendali: controllo dell'infrastruttura, identità, policy di accesso, verificabilità, scalabilità e prevedibilità delle licenze.

Il client di RustDesk e RustDesk Server OSS (il server community gratuito) hanno licenza AGPL; Server Pro è un software server self-hosted commerciale e proprietario.

## La differenza fondamentale: lo ospiti tu, quindi lo controlli tu

RustDesk Server Pro è **self-hosted**: è il tuo team, non un fornitore, a gestire i server ([perché i team scelgono il self-hosting](/it/blog/perche-fare-self-hosting-del-tuo-software-di-desktop-remoto)). Questo singolo fatto architetturale determina la maggior parte dei vantaggi descritti di seguito, e rende il **[client con licenza AGPL](https://github.com/rustdesk/rustdesk)** più di un argomento di vendita: un team di sicurezza che deve giustificare ogni agent su un endpoint di produzione può leggere il codice sorgente e compilare il client da sé, quindi «possiamo verificare esattamente cosa gira» diventa un requisito di procurement che puoi davvero spuntare.

## Domande di architettura aziendale a cui rispondere per prime

Prima di confrontare le matrici delle funzionalità, rendi esplicito il design del deployment:

| Decisione               | Cosa deve specificare il design                                                                                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identità                | Fonte OIDC o LDAP, policy MFA, accesso break-glass e ciclo di vita degli account                                                                                        |
| Autorizzazione          | Proprietà dei gruppi di dispositivi, ruoli dei tecnici, confini per i collaboratori esterni e modello di approvazione                                                   |
| Rete                    | Posizionamento di ID e relay, policy diretto o relay, porte esposte e instradamento regionale                                                                           |
| Disponibilità           | Ipotesi di capacità, monitoraggio, backup, obiettivi di ripristino e design multi-relay                                                                                 |
| Gestione degli endpoint | Versioni del sistema operativo supportate, packaging del client, applicazione delle configurazioni e SLA di aggiornamento                                               |
| Operazioni di sicurezza | Logging, conservazione, alerting, risposta alle vulnerabilità e responsabilità sugli incidenti                                                                          |
| Licenze                 | Utenti con login richiesti, dispositivi gestiti ed eventuale numero di connessioni simultanee previsto da [Customized V2](https://rustdesk.com/pricing#custom2)         |

RustDesk fornisce i componenti per l'accesso remoto e i controlli aziendali; è la tua architettura a determinare se soddisfano i requisiti di disponibilità, conformità e operatività della tua organizzazione.

## Controllo dei dati e conformità

Il self-hosting ti permette di scegliere dove si trovano e chi gestisce rendezvous, relay, console e dati dei dispositivi memorizzati. Le sessioni dirette continuano comunque a passare tra gli endpoint, quindi la sola posizione del server non garantisce che il traffico resti nel paese né la conformità al GDPR. Documenta il [flusso completo dei dati e i controlli di conformità](/it/blog/sovranita-dei-dati-del-desktop-remoto-e-gdpr-self-hosting).

Server Pro registra [log di audit](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/audit-logs/) per connessioni, trasferimenti di file, allarmi e operazioni della console. Imposta **Impostazioni > Altro > Conservazione log (giorni)** su un numero positivo per eliminare automaticamente i log più vecchi (la pulizia avviene ogni ora); `0` conserva i log a tempo indeterminato. Puoi disattivare o eliminare utenti e dispositivi dalla console o tramite API per gestire le richieste di cancellazione. I flussi in uscita da pianificare sono la convalida della licenza Pro, il servizio di build dei client personalizzati, gli aggiornamenti dei client e l'eventuale provider di identità esterno che colleghi.

Questo è anche uno dei motivi meno evidenti per cui avvengono le migrazioni guidate dai costi. Molti team aziendali non sono frustrati solo dal prezzo: stanno pagando un servizio cloud e un pacchetto di funzionalità che non usano appieno. Il self-hosting ribalta questa logica: predisponi solo ciò che ti serve e non affitti il data center di qualcun altro come intermediario obbligato.

## Scalabilità e licenze delle connessioni simultanee

I deployment aziendali falliscono lungo due assi: il limite tecnico e il limite di prezzo. RustDesk affronta entrambi.

Sul piano tecnico, il server pubblico di RustDesk ha registrato più di due milioni di endpoint online su un singolo host da 12 core e 32 GB il 7 luglio 2026 (telemetria interna, non un benchmark sottoposto a verifica indipendente né una garanzia per Server Pro). Per Server Pro, la [guida alla pianificazione per 200.000 dispositivi](/it/blog/rustdesk-puo-scalare-fino-a-200-000-dispositivi) descrive il carico su database, console e relay da convalidare in un progetto pilota.

RustDesk applica la licenza **per utente con login e per dispositivo gestito**. I piani standard includono connessioni simultanee illimitate; solo [Customized V2](https://rustdesk.com/pricing#custom2) ne concede in licenza un numero prestabilito. Puoi [effettuare l'upgrade a metà abbonamento](/it/blog/aggiornare-la-licenza-rustdesk-a-meta-abbonamento-come-funziona) in qualsiasi momento: l'upgrade estende la licenza a un anno intero dalla data dell'upgrade e accredita il valore residuo già pagato della licenza attuale.

## AD/LDAP e il controllo degli accessi che i tuoi amministratori si aspettano

L'accesso remoto aziendale deve rispondere alla domanda «chi può raggiungere quali macchine, e possiamo dimostrarlo?». I piani a pagamento di RustDesk includono **LDAP/SSO (OIDC) dal piano Basic in su**, così puoi assegnare l'accesso ai tecnici in base alla fonte di identità che già usi, invece di mantenere un elenco utenti parallelo.

Il [Controllo di accesso](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/permissions/) decide chi può raggiungere quali dispositivi, tramite assegnazioni agli utenti, gruppi di dispositivi e regole tra gruppi. Un dispositivo appartiene a un solo gruppo di dispositivi, e i permessi dei gruppi di utenti e dei gruppi di dispositivi sono cumulativi. La rubrica condivisa organizza le voci dei dispositivi per i tecnici; non è un confine di accesso. Il [Ruolo di controllo](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/control-role/) limita cosa può fare un tecnico all'interno di una sessione. Anche il generatore di client personalizzati parte dal piano Basic; [vedi la matrice dei piani](https://rustdesk.com/pricing).

## Deployment di massa e automazione

Distribuire a mano l'accesso remoto su migliaia di endpoint non è un'opzione, per questo RustDesk supporta i percorsi di deployment aziendali standard. Su Windows fornisce un **pacchetto MSI** per l'installazione silenziosa e non presidiata tramite `msiexec /qn`, che puoi distribuire con **Group Policy (GPO), Microsoft Intune, un RMM o qualsiasi strumento di packaging**, con parametri da riga di comando per percorso di installazione, collegamenti e opzioni. Abbinalo al [generatore di client personalizzati](https://rustdesk.com/docs/it/self-host/client-configuration/#1-generatore-di-client-personalizzato-solo-pro-piano-base-o-piano-personalizzato) in modo che il client che distribuisci sia già preconfigurato per il tuo server e le tue impostazioni, senza configurazioni macchina per macchina.

Per le operazioni sul parco dispositivi, usa il [riferimento MSI per Windows](https://rustdesk.com/docs/it/client/windows/msi/), la [guida al deployment dei client](https://rustdesk.com/docs/it/self-host/client-deployment/) e gli [strumenti API/CLI di Server Pro](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/console/#strumenti-di-gestione-python-cli). Gli strumenti di gestione coprono utenti, dispositivi, gruppi, rubriche, strategie e audit. Limita i permessi dei token API all'attività da svolgere e testa registrazione, disattivazione ed eliminazione in un progetto pilota.

## Verifiche di accettazione prima del rollout

Prima del rollout, verifica la matrice di accesso utenti-dispositivi prevista, il recupero delle identità, l'accesso non presidiato, gli aggiornamenti dei client, la capacità di picco del relay, la conservazione dei log e il ripristino dei backup. Queste verifiche di accettazione trasformano il controllo dell'infrastruttura self-hosted in un deployment aziendale gestibile.

## Controllo aziendale, alle tue condizioni

Su scala aziendale il ragionamento è semplice: ID/relay, console e dati memorizzati restano all'interno del tuo perimetro, collegati al tuo sistema di identità e alle tue policy di accesso, senza che un fornitore gestisca il nucleo. È la postura che chiedono i team di procurement e sicurezza, e RustDesk Server Pro è costruito per offrirla.

## Provalo prima di impegnarti

Puoi effettuare una valutazione **[senza una chiamata commerciale](https://www.youtube.com/@rustdesk)**. Due percorsi possibili:

- **Convalida l'architettura con Server OSS.** È gratuito, senza canone di licenza né scadenza, e gira sulla tua rete: un modo a basso rischio per dimostrare il modello self-hosted al tuo team di sicurezza.
- **Per le funzionalità Pro (identità, controllo degli accessi, generazione dei client)** consulta i piani attuali su [rustdesk.com/pricing](https://rustdesk.com/pricing), poi scrivi a [sales@rustdesk.com](mailto:sales@rustdesk.com) per conoscere le condizioni di valutazione disponibili per la tua organizzazione.

In entrambi i casi, avvia un server nel tuo ambiente e convalidalo prima di impegnarti.
