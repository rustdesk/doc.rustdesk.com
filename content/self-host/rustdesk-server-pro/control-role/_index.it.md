---
title: Ruolo di Controllo
weight: 18
---

Il Ruolo di Controllo consente di configurare i permessi di controllo remoto per diversi utenti. Quando un utente controlla remotamente un altro dispositivo, il Ruolo di Controllo definisce quali operazioni l'utente controllante è autorizzato a eseguire dopo che la connessione è stata stabilita.

{{% notice note %}}
**Ruolo di Controllo vs Controllo Accessi vs Strategia**

- **Ruolo di Controllo**: Determina quali operazioni l'utente controllante è autorizzato a eseguire dopo che la connessione è stata stabilita.
- **Controllo Accessi**: Determina se una connessione può essere stabilita tra i dispositivi controllante e controllato.
- **Strategia**: Modifica le impostazioni sul dispositivo controllato.
{{% /notice %}}

## Requisiti

- Dispositivo controllato: RustDesk **1.4.5** o superiore (i dispositivi Android controllati non sono ancora supportati)
- Dispositivo controllante: Nessun requisito di versione

## Calcolo dei Permessi

### Come Funzionano i Permessi

In breve: I permessi di controllo hanno la priorità sulle impostazioni locali.

Esistono due fonti di impostazioni dei permessi:

- **Impostazioni locali sul lato controllato**: Le impostazioni del dispositivo controllato (Impostazioni → Sicurezza → Permessi)
- **Permesso di Controllo**: I permessi del Ruolo di Controllo dell'utente controllante (configurati nella console web)

Ogni permesso ha tre stati:

- **Usa Impostazioni Client**: Nessuna sovrascrittura, usa l'impostazione locale del dispositivo controllato
- **Abilita**: Abilita esplicitamente questo permesso (sovrascrive l'impostazione locale)
- **Disabilita**: Disabilita esplicitamente questo permesso (sovrascrive l'impostazione locale)

I permessi sono calcolati a livello di sessione:

| Permesso di Controllo | Impostazioni Locali | Risultato |
|---|---|---|
| Abilita | Abilita | Abilita |
| Abilita | Disabilita | **Abilita** |
| Disabilita | Abilita | **Disabilita** |
| Disabilita | Disabilita | Disabilita |
| Usa Impostazioni Client | Abilita | Abilita |
| Usa Impostazioni Client | Disabilita | Disabilita |

**Caso speciale: Modifica Configurazione Remota**

Quando più utenti controllanti sono connessi allo stesso dispositivo, il permesso "Modifica Configurazione Remota" viene calcolato su tutte le connessioni:

| Permesso di Controllo di Tutte le Connessioni | Risultato |
|---|---|
| Qualsiasi Disabilita | **Disabilita** |
| Nessun Disabilita, Qualsiasi Abilita | **Abilita** |
| Tutti Usa Impostazioni Client | Usa impostazione locale |

### Quale Ruolo si Applica

Ogni utente può avere un solo Ruolo di Controllo assegnato. Ci sono due ruoli integrati:

| Ruolo | Descrizione |
|------|-------------|
| **Non Connesso** | Per utenti controllanti che non hanno effettuato l'accesso. Non può essere assegnato agli utenti. |
| **Predefinito** | Per utenti controllanti connessi che non hanno un Ruolo di Controllo assegnato, o sono esplicitamente assegnati al ruolo Predefinito. |

Il Ruolo di Controllo applicato dipende dallo stato di accesso dell'utente controllante e dall'assegnazione del ruolo:

| Stato Utente Controllante | Ruolo Assegnato | Ruolo / Stato Ruolo | Ruolo di Controllo Applicato |
|---|---|---|---|
| Non connesso | - | Non Connesso / Abilitato | Non Connesso |
| Non connesso | - | Non Connesso / Disabilitato | - |
| Connesso | Ha ruolo assegnato | Ruolo assegnato / Abilitato | Ruolo assegnato |
| Connesso | Ha ruolo assegnato | Ruolo assegnato / Disabilitato | - |
| Connesso | Nessun ruolo assegnato | Predefinito / Abilitato | Predefinito |
| Connesso | Nessun ruolo assegnato | Predefinito / Disabilitato | - |

## Permessi Disponibili

I 12 permessi controllabili corrispondono alle Impostazioni → Sicurezza → Permessi del dispositivo controllato:

- Tastiera/Mouse
- Stampante Remota
- Appunti
- Trasferimento File
- Audio
- Fotocamera
- Terminale
- Tunnel TCP
- Riavvio Remoto
- Registrazione Sessione
- Blocca Input Utente
- Modifica Configurazione Remota

## Operazioni Console

### Creare un Ruolo

1. Naviga alla pagina **Ruoli di Controllo** e clicca su **Crea**
2. Inserisci un **Nome** per il ruolo
3. Seleziona i **Permessi** da concedere

![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-create-permission.png)

### Assegnazione Ruolo

Ci sono due modi per assegnare Ruoli di Controllo agli utenti:

1. **Pagina Utenti** → Clicca su **Modifica** su un utente → Seleziona un ruolo nel campo **Ruolo di Controllo**
2. **Pagina Ruoli di Controllo** → Clicca sul **conteggio utenti** o **Assegna Utenti** → Aggiungi o rimuovi utenti dal ruolo

![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-assign-role-page.png)

{{% notice note %}}
Il ruolo "Non Connesso" non può essere assegnato agli utenti (si applica solo alle connessioni non autenticate).
{{% /notice %}}
