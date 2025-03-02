---
title: Docker 
weight: 30
---

## Come compilare con Docker

Cominciare clonando il repository e compilare i container docker:

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
docker build -t "rustdesk-builder" .
```

Quindi, ogni volta che devi compilare l'applicazione, esegui il comando seguente:

```sh
docker run --rm -it -v $PWD:/home/user/rustdesk -v rustdesk-git-cache:/home/user/.cargo/git -v rustdesk-registry-cache:/home/user/.cargo/registry -e PUID="$(id -u)" -e PGID="$(id -g)" rustdesk-builder
```

Tieni presente che la prima build potrebbe richiedere più tempo prima che le dipendenze vengano memorizzate nella cache, le build successive saranno più veloci. Inoltre, se hai bisogno di specificare argomenti diversi per il comando build, puoi farlo alla fine del comando nella posizione `<OPTIONAL-ARGS>`. Ad esempio, se si desidera creare una versione di rilascio ottimizzata, eseguire il comando sopra seguito da `--release`. L'eseguibile generato sarà creato nella cartella di destinazione del proprio sistema e può essere eseguito con:

```sh
target/debug/rustdesk
```

Oppure, se si sta eseguendo un eseguibile di rilascio:

```sh
target/release/rustdesk
```

Assicurati di eseguire questi comandi dalla radice del repository RustDesk, altrimenti l'applicazione potrebbe non essere in grado di trovare le risorse richieste. Notare inoltre che altri sottocomandi cargo come `install` o `run` non sono attualmente supportati tramite questo metodo poiché installerebbero o eseguirebbero il programma all'interno del container anziché nell'host.