---
title: Client RustDesk
weight: 2
pre: "<b>1. </b>"
---

### Introduzione
Il client RustDesk è utilizzato sui dispositivi per connettersi tramite il nostro server RustDesk, sia open source che Pro. È disponibile per il download su [GitHub](https://github.com/rustdesk/rustdesk/releases/latest).

### Piattaforme Supportate
- Microsoft Windows
- macOS
- Derivati Debian (Ubuntu ≥ 16, Linux Mint, ecc.)
- Derivati Red Hat (CentOS, Fedora ≥ 18, Rocky Linux, ecc.)
- Arch Linux/Manjaro
- openSUSE
- NixOS
- AppImage / Flatpak
- Android
- iOS (non supporta essere controllato)
- Web

### Installazione

#### Windows

Scarica l'exe da GitHub e installa.

Per installare silenziosamente, chiama l'exe di installazione con `--silent-install`.

#### macOS

Scarica il file dmg da GitHub. Maggiori informazioni possono essere trovate nella [pagina macOS](https://rustdesk.com/docs/en/client/mac/).

Apri il file dmg e trascina `RustDesk` in `Applications`.

Consenti l'esecuzione di RustDesk.

Abilita le autorizzazioni richieste e segui le istruzioni sul lato sinistro di RustDesk per completare la configurazione.

#### Linux

Consulta le istruzioni qui sotto per installare sui vari "sapori" di Linux (gli installer sono su GitHub o disponibili dal repository di una distribuzione).

##### Derivati Debian

```sh
# ignora il report errato dell'utilizzo del disco
sudo apt install -fy ./rustdesk-<version>.deb
```

##### Derivati Red Hat

```sh
sudo yum localinstall ./rustdesk-<version>.rpm
```

##### Arch Linux/Manjaro

```sh
sudo pacman -U ./rustdesk-<version>.pkg.tar.zst
```

##### openSUSE (≥ Leap 15.0)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<version>-suse.rpm
```

##### Nix / NixOS (≥ 22.05)

Entra temporaneamente in una shell con `rustdesk` pronto per l'esecuzione:

```sh
nix shell nixpkgs#rustdesk
```

Installa nel profilo utente corrente:

```sh
nix profile install nixpkgs#rustdesk
```

Per installare a livello di sistema in NixOS, esegui `nixos-rebuild switch --flake /etc/nixos` dopo aver modificato `configuration.nix`:

```
  environment.systemPackages = with pkgs; [
    ...
    rustdesk
  ];
```

#### Android
Installa l'apk dal nostro GitHub. Maggiori informazioni possono essere trovate nella [pagina Android](https://rustdesk.com/docs/en/client/android/).

#### iOS (iPhone, iPad)
Scarica l'app dall'[App Store](https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015).

### Utilizzo
Una volta installato (o eseguito come eseguibile temporaneo), RustDesk si connetterà ai server pubblici. Vedrai un messaggio in basso che dice (1) "Pronto, Per una connessione più veloce, configura il tuo server". In alto a sinistra vedrai il tuo (2) ID, (3) Password monouso e a destra una (4) casella per connetterti a un altro computer se conosci il loro ID.

![](/docs/en/client/images/client.png)

Per accedere alle impostazioni, clicca sul pulsante (5) Menu [ &#8942; ] a destra dell'ID.

Nelle Impostazioni troverai:
- Generale - Controllo servizio, Tema, Codec hardware, Audio, Registrazione e Lingua
- Sicurezza - Autorizzazioni per qualcuno che prende il controllo, Opzioni password, possibilità di cambiare il tuo ID e Impostazioni di sicurezza avanzate
- Rete - Configura qui le tue impostazioni server e proxy
- Display - Controlla le impostazioni di visualizzazione per le sessioni remote e altre opzioni predefinite, sincronizzazione appunti, ecc.
- Account - Questo può essere usato insieme al server Pro per accedere all'API
- Informazioni - Mostra informazioni sul software.

### Configurazione di RustDesk
Ci sono diversi modi per configurare RustDesk.

Il modo più semplice è utilizzare RustDesk Server Pro. Puoi ottenere una stringa di configurazione crittografata, che può essere utilizzata insieme a `--config` per importare le impostazioni. Per fare questo:
1. Apri la riga di comando su qualsiasi OS utilizzi, nella cartella dove è installato RustDesk, cioè `C:\Program Files\RustDesk` su Windows, `/usr/bin` su Linux.
2. Usa il comando `rustdesk.exe --config tua-stringa-crittografata`, ad esempio `rustdesk.exe --config 9JSPSvJzNrBDasJjNSdXOVVBlERDlleoNWZzIHcOJiOikXZr8mcw5yazVGZ0NXdy5CdyciojI0N3boJye`.

Puoi configurare manualmente un client. Per fare questo:
1. Clicca su Impostazioni.
2. Clicca su Rete.
3. Clicca su Sblocca impostazioni di rete.
4. Inserisci il tuo ID, Relay, API (se usi il server pro) e la tua chiave.

![](/docs/en/client/images/network-settings.png)

Se configuri manualmente un client, puoi recuperare il file `RustDesk2.toml` (nella cartella utenti) e usare `--import-config` in modo simile all'esempio sopra.

### Parametri da riga di comando
- `--password` può essere usato per impostare una password permanente.
- `--get-id` può essere usato per recuperare l'ID.
- `--set-id` può essere usato per impostare un ID. Nota che gli ID dovrebbero iniziare con una lettera.
- `--silent-install` può essere usato per installare RustDesk silenziosamente su Windows.

Parametri avanzati aggiuntivi possono essere trovati [qui](https://github.com/rustdesk/rustdesk/blob/bdc5cded221af9697eb29aa30babce75e987fcc9/src/core_main.rs#L242).

{{% children depth="3" showhidden="true" %}}
