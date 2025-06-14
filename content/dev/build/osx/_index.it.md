---
title: macOS
weight: 21
---

Ci sono diversi modi per farlo, questa guida presuppone che `Xcode`, `Git` e `Homebrew` siano già installati.

La sfida più grande è probabilmente trovare le versioni di tutti gli strumenti che funzionano insieme, specialmente dato che parti della toolchain come Xcode e LLVM sono dettate dalla tua versione di macOS. Le versioni utilizzate in questa guida probabilmente non sono quelle che dovresti utilizzare. Come punto di partenza per capire quali versioni utilizzare, guarda il [workflow di build di GitHub](https://github.com/rustdesk/rustdesk/blob/master/.github/workflows/flutter-build.yml) per la versione di RustDesk che vuoi compilare. Scegli il tag per vedere il file nell'angolo in alto a sinistra della pagina. Ma questo potrebbe non funzionare necessariamente perché gli strumenti macOS forniti con il runner di GitHub potrebbero non essere le stesse versioni di quelle sul tuo sistema locale.

### Export
`export` viene utilizzato per impostare varie variabili ambientali. Quando esegui `export`, quella variabile viene impostata solo per la sessione terminale corrente, e quindi deve essere ripetuta per ogni nuova finestra terminale che vuoi utilizzare per compilare RustDesk, ora o in futuro. Generalmente, è preferibile aggiungere tutti gli `export` a uno script che viene eseguito automaticamente per ogni terminale che viene aperto, ad esempio `~/.bash_profile`. I comandi `export` completi elencati qui possono essere semplicemente aggiunti al file, ma devono anche essere eseguiti nel terminale corrente perché il file non viene letto fino a quando non viene aperto un *nuovo* terminale.

## Installa gli strumenti che utilizzeremo da Homebrew

```sh
brew install python3 create-dmg nasm cmake gcc wget ninja pkg-config wget rustup
```

Alcune delle installazioni potrebbero fallire perché alcune delle cartelle di destinazione non esistono sul nostro sistema. In quel caso, crea la cartella, imposta proprietario e permessi ed esegui nuovamente il comando `brew`. Esempio se `/usr/local/include` non esiste:
```sh
sudo mkdir /usr/local/include
sudo chown <username>:admin /usr/local/include
sudo chmod 775 /usr/local/include
```

## Installa vcpkg
Vcpkg viene utilizzato per gestire le dipendenze C/C++ utilizzate da RustDesk. Decidi dove vuoi l'installazione ed esegui quanto segue dalla cartella in cui vuoi che risieda la cartella `vcpkg`. In questo esempio `/Users/<username>/repos/` viene utilizzato come posizione, e il tag `2023.04.15` viene utilizzato come versione.

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.04.15
./bootstrap-vcpkg.sh -disableMetrics
./vcpkg install libvpx libyuv opus aom
export VCPKG_ROOT=~/repos/vcpkg
```

## Installa e configura Rust
Utilizziamo `rustup` per gestire Rust, che è già stato installato sopra utilizzando Homebrew. Ma deve ancora essere configurato. Segui le istruzioni e assicurati che sia `rustup` che `rustc` siano nel `PATH`. In questo esempio utilizziamo la versione di Rust `1.75.0`, ma potresti dover utilizzare una versione diversa. Puoi installare e gestire più versioni di Rust con `rustup`.

```sh
rustup-init
rustup default 1.75.0
rustup component add rustfmt
```
Per una panoramica delle toolchain Rust installate e predefinite, esegui `rustup show`.

## Scarica i file sorgente di RustDesk

Decidi dove vuoi i file sorgente di RustDesk ed esegui quanto segue dalla cartella in cui vuoi che risieda la cartella `rustdesk`. In questo esempio `/Users/<username>/repos/` viene utilizzato come posizione.

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk/libs/portable/
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
```

Se `python3` o `pip` sono sconosciuti, aggiungili al `PATH` con qualcosa come (usa i nomi delle tue cartelle effettive):
```sh
export PATH=~/Library/Python/3.9/bin:$PATH
```
Una volta fatto, esegui nuovamente i comandi falliti. Ricorda anche di modificare `~/.bash_profile`.

## Installa i componenti dell'interfaccia utente
RustDesk può essere compilato utilizzando sia [Sciter](https://sciter.com/) che [Flutter](https://flutter.dev/). Entrambi necessitano di componenti aggiuntivi, quindi segui i passaggi per la versione pertinente, o entrambe.

### Sciter

Dalla cartella `rustdesk`, esegui:
```sh
wget https://github.com/c-smile/sciter-sdk/raw/master/bin.osx/libsciter.dylib
```

### Flutter

[FVM](https://fvm.app/) ti consente di gestire quale versione di Flutter viene utilizzata, ed è probabilmente il modo più semplice per poter facilmente provare diverse versioni di Flutter.

```sh
brew tap leoafarias/fvm
brew install fvm cocoapods
```
Installa e usa, ad esempio Flutter `3.16.9`, con:

```sh
fvm global 3.16.9
```
FVM è pensato per utilizzare una configurazione più complessa dove può fornire diverse versioni di Flutter per progetti diversi, ma questo va oltre lo scopo di questa guida. Invece, aggiungi semplicemente la posizione del Flutter predefinito fornito da FVM al tuo `PATH` manualmente, il che significa che devi utilizzare `fvm global` per cambiare versione di Flutter:

```sh
export PATH=$HOME/fvm/default/bin:$PATH
```

Una volta fatto, dovresti disabilitare la telemetria e controllare se tutto è OK:

```sh
flutter --disable-analytics
dart --disable-analytics
flutter doctor -v
```
Non importa se alcuni dei controlli falliscono, di solito lo fanno, quello che è importante è che il controllo per l'ambiente che intendi utilizzare sia OK, ovvero `Xcode`. Se vengono segnalati problemi, affrontali prima di andare avanti.

Una volta che Flutter è attivo e funzionante, è il momento di installare il "bridge" che lega insieme Rust e Flutter. Ecco un'altra delle versioni che devono funzionare insieme a tutto il resto, in questo esempio utilizziamo `1.80.1`:

```sh
cargo install flutter_rust_bridge_codegen --version "1.80.1" --features "uuid"
```

## Build

Compila dalla cartella `rustdesk`. Compila la versione Sciter con:

```sh
python3 ./build.py
```

Compila la versione Flutter con:
```sh
flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart --c-output ./flutter/macos/Runner/bridge_generated.h
python3 ./build.py --flutter
```
Se tutto va bene, ora dovresti avere un file `dmg` pronto per l'installazione nella tua cartella `rustdesk`.