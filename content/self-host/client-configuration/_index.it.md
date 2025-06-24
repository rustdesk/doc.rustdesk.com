---
title: Configurazione Client
weight: 300
pre: "<b>2.3. </b>"
---

## Panoramica

Ci sono diversi modi per configurare i client RustDesk per utilizzare il tuo server self-hosted, ne copriremo alcuni di seguito.

## 1. Generatore di client personalizzato (solo Pro, piano base o piano personalizzato)

Puoi avere il tuo nome, logo, icona, configurazione, firma e altro ancora.

Attualmente sono supportati Windows X64, Mac Arm64 / X64, [Linux](https://twitter.com/rustdesk/status/1788905463678951787), Android Arm 64.

[Video](https://twitter.com/rustdesk/status/1769171628426944539)

![](/docs/en/self-host/client-configuration/images/custom-client-qs.png)
![](/docs/en/self-host/client-configuration/images/web_console_custom_client_config.jpeg)

## 2. Configurazione manuale

Nella home principale del client RustDesk, clicca sul pulsante menu [ &#8942; ] accanto al tuo ID poi clicca su Rete, ora puoi sbloccare le impostazioni usando privilegi elevati e impostare il tuo `ID`, `Relay`, `API` e `Chiave`. È importante notare che questa `Chiave` è la chiave pubblica utilizzata per la crittografia della connessione, distinta dalla chiave di licenza fornita con l'acquisto della versione Pro.

![](/docs/en/self-host/client-configuration/images/network-config.png)

Inserisci l'host o indirizzo IP `hbbs` nella casella di input **Server ID** (lato locale + lato remoto). Gli altri due indirizzi possono essere lasciati vuoti, RustDesk dedurrà automaticamente (se non impostato appositamente), e il Server Relay si riferisce a `hbbr` (porta 21117).

ad esempio

```nolang
hbbs.example.com
```

o

```nolang
hbbs.example.com:21116
```

### Impostare la `Chiave`

Per stabilire una connessione crittografata al tuo server self-hosted, devi inserire la sua chiave pubblica. La chiave è solitamente generata alla prima esecuzione di `hbbs` e può essere trovata nel file `id_ed25519.pub` nella tua directory di lavoro / cartella dati.

Come utente `Pro` sarai inoltre in grado di recuperare la `Chiave` dalla [console web](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/).

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

### Impostare il `Server API`

Questo è solo per utenti `Pro`. Quando puoi accedere alla console web, ma fallisci nell'accedere al client RustDesk, probabilmente non hai impostato il `Server API` correttamente.

Se il tuo Server API non funziona sulla porta predefinita `21114` (potresti non aggiungere questa porta al firewall se vieni dalla versione open source), specifica esplicitamente il `Server API`.
ad esempio se il tuo Server API funziona sulla porta HTTPS predefinita, specifica il `Server API` con `https://hbbs.example.com`.

Se ancora non riesci a confermare il valore del `Server API`, vai alla pagina di benvenuto della console web, il `Server API` è mostrato nell'immagine sopra (La casella di input con etichetta `API:`).

## 3. Configurazione usando Import o Export

1. Usa i passaggi [sopra](https://rustdesk.com/docs/en/self-host/client-configuration/#manual-config) per configurare il Client RustDesk su un dispositivo.
2. Usando la macchina sopra vai su Impostazioni poi Rete e sblocca.
3. Clicca su `Esporta Config Server`.
4. Incolla la stringa copiata in Notepad o simile.
5. Vai al nuovo client, copia quanto sopra negli appunti.
6. Vai su Impostazioni poi Rete nel Client RustDesk, sblocca e clicca su `Importa Config Server`.
7. Incollerà automaticamente le impostazioni.
8. Clicca su `Applica`.

## 4. Configurazione automatica

Il modo più semplice per configurare automaticamente è usare gli script di deployment trovati [qui](https://rustdesk.com/docs/en/self-host/client-deployment/).

## 5. Importa configurazione da `Pro` tramite appunti

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

https://github.com/rustdesk/rustdesk-server-pro/discussions/372#discussioncomment-10473298

## 6. Usa la riga di comando `--config`
`rustdesk.exe --config <stringa-config>`

Puoi ottenere la stringa di configurazione dalla console web (puoi vederla nell'immagine sopra) o dal client RustDesk "Impostazioni → Rete" ([qui](https://github.com/rustdesk/rustdesk/discussions/7118) c'è una discussione su questo).