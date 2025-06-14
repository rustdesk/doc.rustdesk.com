---
title: Licenza
weight: 15
---

### Acquistare licenza

Per favore ottieni la tua licenza da [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), inserisci un indirizzo email valido nella pagina di checkout di Stripe. La licenza (e la fattura in una mail separata) verrà inviata alla tua email una volta che il pagamento è completato con successo.

![](/docs/en/self-host/rustdesk-server-pro/license/images/stripe.jpg)

### Impostare licenza

Ti verrà richiesto di inserire la licenza nella console web (`http://<rustdesk-server-pro-ip>:21114`), o cambiare licenza più tardi.

| Impostare licenza | Cambiare licenza |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/set.png) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/change.png) |

### Rinnovare/aggiornare licenza

Rinnovare/aggiornare licenza può essere trovato tramite il [portale licenza self-service](https://rustdesk.com/self-host/account/) come descritto sotto, accedi con l'email che hai usato per comprare la licenza come l'immagine sopra.

| Pagina licenza con azioni di rinnovo/aggiornamento | Finestra di aggiornamento |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/renew.jpg?v2) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/upgrade.png) |

Dopo aver effettuato il pagamento, per favore aggiorna la licenza [come sotto](/docs/en/self-host/rustdesk-server-pro/license/#refresh-license) per attivarla.

#### Aggiornare licenza
Dopo il pagamento, devi procedere alla console web per attivarla manualmente come sotto. Clicca semplicemente su `Modifica`, poi `OK`, non c'è bisogno di modificare nulla, perché la tua chiave di licenza rimane la stessa.

![](/docs/en/self-host/rustdesk-server-pro/license/images/updatelic.jpg)

### Fatture, Recupero Licenza e Migrazione

La licenza può essere usata solo su una macchina (solo per hbbs, hbbr non richiede licenza), se vuoi migrare all'altra macchina, recuperare la tua licenza o scaricare fatture, per favore vai su [https://rustdesk.com/self-host/account/](https://rustdesk.com/self-host/account/). Accedi con l'indirizzo email usato per il checkout di Stripe, scollega la vecchia macchina da cui vuoi migrare come sotto, quando imposti la licenza nella console web del nuovo server assegnerà la licenza e si registrerà automaticamente nella console.

![](/docs/en/self-host/rustdesk-server-pro/license/images/unbind.jpg)

### Proxy
Se il tuo server non può accedere a internet per verificare la licenza direttamente, puoi aggiungere un proxy, es. `proxy=http://username:password@example.com:8080 ./hbbs`.

In alternativa, puoi aggiungere `proxy=http://username:password@example.com:8080` al file `.env` sotto la directory di lavoro (dove risiedono i file `id_ed25519` / `db.sqlite3`).

`http` può essere sostituito con `https` o `socks5`. Se non c'è `username` / `password` / `port`, può essere `proxy=http://example.com`.