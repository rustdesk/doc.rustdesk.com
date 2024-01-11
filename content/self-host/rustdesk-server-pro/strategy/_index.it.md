---
title: Strategy
weight: 200
---

### Strategy

Strategy è un tool per gli amministratori di Server RustDesk utilizzato per aggiornare in blocco le opzioni di sicurezza dei client. Gli amministratori possono creare strategie diverse ed applicarle a diversi dispositivi.

#### Creazione di una Stragtegia

È possibile creare una nuova strategia facendo clic sul pulsante `+` ed eseguire varie azioni sulla strategia passandoci sopra e facendo clic sul menu.

Nel menu pop-up è possibile scegliere di `Abilitare (Enable)` o `Disabilitare (Disable)` la strategia, `Rinominarla (Rename)`, `Duplicarla (Duplicate)` o `Eliminarla`. Inoltre è possibile cliccare su `Modifica Dispositivi (Edit Devices)` e su `Modifica Utenti` per modificare i dispositivi o gli utenti a cui è stata applicata la strategia.

Sulla parte destra del menu strategia è possibile verificare a quanti dispositivi è stata applicata la strategia.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/strategy_menu.png)

#### Strategie per Dispositivi e per Utenti

Ogni dispositivo può essere gestito da una sola strategia e le strategie sui dispositivi hanno priorità rispetto alle strategie utente. Le strategie utente sono responsabili della gestione di tutti i dispositivi dell'utente a cui non è assegnata una strategia specifica.

#### Modifica Dispositivi

Facendo click sul menu `Modifica Dispositivi (Edit Devices)` si apre una finestra che mostra tutti i dispositivi. Dopo la modifica fare clic sul pulsante `Salva (Save)` per applicare le modifiche apportate. È inoltre possibile utilizzare il menu a discesa disponibile nell'angolo superiore destro per filtrare i dispositivi.

Qui un esempio del menu che appare cliccando `Modifica Dispositivi (Edit Devices)` su "demo2". In questo esempio, il dispositivo "362587269" è applicato alla strategia "demo2". Il dispositivo "157333666" era inizialmente applicato alla strategia default, una volta cliccato il pulsante `Salva (Save)` sarà applicato alla strategia "demo2". Il dispositivo "232026634" ha una strategia dispotivo di "demo1" e una strategia utente di "demo2", la strategia dispositivo ha la priorità quindi "232026634" avrà una strategia di tipo "demo1".

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_devices.png)

#### Modifica Utenti

Facendo click sul menu `Modifica Utenti (Edit Users)` si apre una finestra che mostra tutti gli utenti. Dopo la modifica fare clic sul pulsante `Salva (Save)` per applicare le modifiche apportate. È inoltre possibile utilizzare il menu a discesa disponibile nell'angolo superiore destro per filtrare gli utenti.

Qui un esempio del menu che appare cliccando `Modifica Utenti (Edit Users)` su "demo2". In questo esempio, l' utente "user2" era inizialmente applicato alla strategia default, una volta cliccato il pulsante `Salva (Save)` sarà applicato alla strategia "demo2". L' utente "user1" è applicato alla strategia default e l' utente admin alla strategia "demo2"

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_users.png)

#### Sincronizzazione della Strategia

Ogni dispositivo può essere controllato da una unica strategia, se questa è disabilitata il dispositivo non sarà controllato da nessuna strategia. Per sincronizzare le strategie RustDesk controllerà i timestamp locali e del server per determinare se la sincronizzazione è necessaria. Una volta che la sincronizzazione è completata:

* Se l'utente cambia qualche impostazione, il client userà le impostazioni dell' utente.
* Se l' amministratore cambia la strategia, le opzioni del client saranno sincronizzate.
* Se l'amministratore cambia i dispositivi assegnati alla strategia, le opzioni del client saranno sincronizzate.

##### Modifica delle Strategie

Facendo click sul pulsante `Modifica (Edit)` è possibile modificare una strategia e cliccando `Invia (Submit)` la strategia verrà sincronizzata ai dispositivi entro 30 secondi.