---
title: Installazione Windows
weight: 5
---

{{% notice note %}}
La politica di sicurezza di Windows è complicata, se questo tutorial non funziona per te, o incontri connessioni instabili, migra a un server Linux.
{{% /notice %}}

{{% notice note %}}
La versione GUI, `RustDeskServer.setup.exe` non è più mantenuta, non raccomandata.
{{% /notice %}}

### Installare

## Pre-requisito
Il Microsoft Visual C++ Redistributable è richiesto per eseguire rustdesk su Windows. Puoi scaricarlo [qui](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist)

1. Ottieni la tua licenza da [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), controlla la pagina [licenza](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) per maggiori dettagli.
2. Scarica l'installer Windows da [GitHub](https://github.com/rustdesk/rustdesk-server-pro/releases/latest).
3. Estrai l'installer Windows.
4. Esegui l'Installer e segui i passaggi sullo schermo. O installa manualmente con [PM2 o NSSM](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/windows/).
5. Una volta completato apri RustDesk Server.
6. Segui i prompt che ti guidano attraverso l'installazione.
7. Clicca `Services` e poi `Start`.
8. Una volta che l'installazione è completa vai a `http://youripaddress:21114`.
9. Accedi con il nome utente `admin` e password `test1234`.
10. Inserisci il tuo codice licenza acquistato al passo 1.

### Usare IIS come Proxy

Assicurati che `Dynamic Content Compression` sia installato (questa è una Funzionalità IIS che può essere installata con Ruoli Server).
1. Apri IIS (O installalo).
2. Crea un nuovo sito web per RustDesk con i binding (Idealmente 443) e certificato rilevante. Le impostazioni di base dovrebbero puntare a una cartella vuota. (Se usi il sito predefinito, assicurati che non ci siano altri file nella cartella).
3. Su IIS, installa [Application Request Routing](https://www.iis.net/downloads/microsoft/application-request-routing) e [URL Rewrite](https://learn.microsoft.com/en-us/iis/extensions/url-rewrite-module/using-the-url-rewrite-module).

### Application Request Routing

1. Sotto l'Host del Server IIS apri Application Request Routing.
2. Vai a Server Proxy Settings.
3. Abilita proxy e tutte le impostazioni appariranno, puoi lasciarle come predefinite.
4. Salva le impostazioni e possiamo andare al prossimo passo: URL Rewrite.

### URL Rewrite

1. Apri il sito su IIS nel pannello sinistro e fai doppio clic su URL Rewrite.
2. Clicca `Add rules`.
3. Imposta una nuova regola reverse proxy.
4. Imposta l'indirizzo locale (l'indirizzo 21114) \
Regola in Entrata – l'indirizzo interno RustDesk 21114 \
Regole in Uscita – `From` è l'indirizzo interno RustDesk 21114 e `To` è l'indirizzo esterno. \
Nota: Nessun http / https prima degli indirizzi – vengono gestiti automaticamente. Inoltre, assicurati che tutti gli indirizzi siano accessibili sia internamente che esternamente.

### Compressione

1. Disabilita `Dynamic Content Compression`.

### Risoluzione dei problemi

Se hai un errore 500.52 aggiungi le variabili menzionate: [IIS acting as reverse proxy: Where the problems start](https://techcommunity.microsoft.com/t5/iis-support-blog/iis-acting-as-reverse-proxy-where-the-problems-start/ba-p/846259).

Potresti dover cambiare le tue Impostazioni SSL a "Require SSL → Ignore".