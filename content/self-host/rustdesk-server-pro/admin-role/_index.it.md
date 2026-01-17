---
title: Ruolo Amministratore
weight: 17
---

Il Ruolo Amministratore consente agli amministratori di delegare permessi di gestione parziali a utenti non amministratori. È possibile definire permessi per risorse globali (come strategie, ruoli di controllo e client personalizzati) nonché per utenti e dispositivi in diversi ambiti.

Una volta assegnato un Ruolo Amministratore a un utente, vedrà le pagine e i menu corrispondenti nella console web in base ai permessi concessi.

## Amministratori vs Ruoli Amministratore

- Solo gli amministratori possono modificare i Ruoli Amministratore e assegnarli agli utenti.
- Gli amministratori non sono limitati dai Ruoli Amministratore, anche se possono essere loro assegnati.
- Gli utenti non admin non possono modificare gli account amministratore, anche con permessi utente globali.

## Tipi di Ruolo

I Ruoli Amministratore sono di tre tipi, ciascuno con ambito e permessi diversi.

| Tipo | Descrizione |
|------|-------------|
| **Globale** | Può gestire tutte le risorse dell'intero team |
| **Individuale** | Può gestire solo i propri dispositivi e log di audit |
| **Ambito Gruppo** | Può gestire utenti e dispositivi nei gruppi specificati |

### Informazioni sull'Ambito Gruppo

| Permessi selezionati | Applicato a |
|-------|-------------|
| **Permessi Utente** | Si applicano agli utenti nei gruppi utenti selezionati |
| **Permessi Dispositivo** | Si applicano ai dispositivi da: <ul><li>Gruppi dispositivi selezionati</li><li>Dispositivi assegnati a utenti nei gruppi selezionati</li><li>Dispositivi non assegnati (se abilitato)</li></ul> |

## Regole dei Permessi

### Qualsiasi Permesso di Modifica Include il Permesso di Visualizzazione Corrispondente

Qualsiasi permesso di modifica include automaticamente il permesso di visualizzazione corrispondente.

### Il Permesso di Modifica Non Include l'Assegnazione

I permessi di modifica per le risorse permettono solo di modificare le risorse stesse, non includono il permesso di assegnarle.

### Il Permesso di Visualizzazione Non Include i Membri

I permessi di visualizzazione permettono solo di vedere le risorse stesse, non includono il permesso di vedere i membri al loro interno.

{{% notice note %}}
La lettura dei dispositivi per le rubriche non è limitata dai Ruoli Amministratore. La scheda dei dispositivi accessibili nel client è controllata solo da **Impostazioni → Altro → Disabilita recupero dispositivi accessibili** nella console e non è limitata nemmeno dai Ruoli Amministratore.
{{% /notice %}}

## Operazioni Console

### Creazione di un Ruolo

1. Navigare alla pagina **Ruoli Amministratore** e cliccare **Crea**
2. Inserire un **Nome** per il ruolo
3. Selezionare un **Tipo** (per **Ambito Gruppo**, configurare anche l'ambito)
4. Selezionare i **Permessi** da concedere

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-permission.png)

### Assegnazione Ruoli

Ci sono due modi per assegnare Ruoli Amministratore agli utenti:

1. **Pagina Utenti** → Cliccare **Modifica** su un utente → Selezionare ruoli nel campo **Ruoli Amministratore**
2. **Pagina Ruoli Amministratore** → Cliccare sul **conteggio utenti** o **Assegna Utenti** → Aggiungere o rimuovere utenti

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-role-page.png)

{{% notice note %}}
- Un utente può avere più Ruoli Amministratore assegnati. I permessi di tutti i ruoli vengono combinati.
{{% /notice %}}

## Riferimento Permessi

### Permessi Globali

| Permesso | Descrizione |
|------------|-------------|
| Users-View | Leggere le informazioni di tutti gli utenti. |
| Users-Create | Creare utenti non amministratori. |
| Users-Invite | Invitare utenti via email. |
| Users-Delete | Eliminare utenti non amministratori. |
| Users-Enable/Disable | Abilitare o disabilitare utenti non amministratori. |
| Users-Edit Email | Modificare l'email degli utenti. |
| Users-Edit Password | Modificare la password degli utenti. |
| Users-Edit Note | Modificare le note degli utenti. |
| Users-Manage 2FA | Gestire la verifica 2FA degli utenti. |
| Users-Force Logout | Forzare il logout degli utenti. |
| Users-Update Group | Modificare il gruppo degli utenti. |
| Users-Update Strategy | Modificare la strategia degli utenti. |
| Users-Update Control Role | Modificare il ruolo di controllo degli utenti. |
| Devices-View | Leggere le informazioni di tutti i dispositivi. |
| Devices-Enable/Disable | Abilitare o disabilitare dispositivi. |
| Devices-Delete | Eliminare dispositivi. |
| Devices-Edit Info | Modificare le informazioni dei dispositivi. |
| Devices-Assign to User | Assegnare dispositivi agli utenti. |
| Devices-Update Group | Modificare il gruppo dei dispositivi. |
| Devices-Update Strategy | Modificare la strategia dei dispositivi. |
| User Groups-View | Leggere i gruppi utenti. |
| User Groups-Edit | Creare, modificare ed eliminare gruppi utenti. |
| Device Groups-View | Leggere i gruppi dispositivi. |
| Device Groups-Edit | Creare, modificare ed eliminare gruppi dispositivi. |
| Device Groups-Update Strategy | Modificare la strategia dei gruppi dispositivi. |
| Audit Logs-View | Leggere tutti i log. |
| Audit Logs-Edit | Disconnettere connessioni attive. |
| Strategies-View | Leggere le strategie. |
| Strategies-Edit | Creare, modificare ed eliminare strategie. |
| Control Roles-View | Leggere i ruoli di controllo. |
| Control Roles-Edit | Creare, modificare ed eliminare ruoli di controllo. |
| Custom Clients-View | Leggere i client personalizzati. |
| Custom Clients-Edit | Creare, modificare ed eliminare client personalizzati. |

### Permessi Individuali

| Permesso | Descrizione |
|------------|-------------|
| Devices-View | Leggere i propri dispositivi. |
| Devices-Enable/Disable | Abilitare o disabilitare i propri dispositivi. |
| Devices-Delete | Eliminare i propri dispositivi. |
| Devices-Edit Info | Modificare le informazioni dei propri dispositivi. |
| Devices-Update Strategy | Modificare la strategia dei propri dispositivi. |
| Audit Logs-View | Leggere i log personali. |
| Audit Logs-Edit | Disconnettere le proprie connessioni attive. |

### Permessi Ambito Gruppo

| Permesso | Descrizione |
|------------|-------------|
| Users-View | Leggere utenti nei gruppi selezionati. |
| Users-Create | Creare utenti nei gruppi selezionati. |
| Users-Invite | Invitare utenti nei gruppi selezionati. |
| Users-Delete | Eliminare utenti nei gruppi selezionati. |
| Users-Enable/Disable | Abilitare o disabilitare utenti nei gruppi selezionati. |
| Users-Edit Email | Modificare email utenti nei gruppi selezionati. |
| Users-Edit Password | Modificare password utenti nei gruppi selezionati. |
| Users-Edit Note | Modificare note utenti nei gruppi selezionati. |
| Users-Manage 2FA | Gestire 2FA utenti nei gruppi selezionati. |
| Users-Force Logout | Forzare logout utenti nei gruppi selezionati. |
| Users-Update Strategy | Modificare strategia utenti nei gruppi selezionati. |
| Users-Update Control Role | Modificare ruolo di controllo utenti nei gruppi selezionati. |
| Devices-View | Leggere dispositivi gestiti dal ruolo. |
| Devices-Enable/Disable | Abilitare o disabilitare dispositivi gestiti dal ruolo. |
| Devices-Delete | Eliminare dispositivi gestiti dal ruolo. |
| Devices-Edit Info | Modificare informazioni dispositivi gestiti dal ruolo. |
| Devices-Update Strategy | Modificare strategia dispositivi gestiti dal ruolo. |
