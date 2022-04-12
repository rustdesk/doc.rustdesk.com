---
title: Docker 
weight: 30
---

## Auf Docker Kompilieren

Beginne damit das Repository zu klonen und den Docker Container zu bauen:

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
docker build -t "rustdesk-builder" .
```

Jedes Mal, wenn du das Programm Kompilieren musst, nutze diesen Befehl:

```sh
docker run --rm -it -v $PWD:/home/user/rustdesk -v rustdesk-git-cache:/home/user/.cargo/git -v rustdesk-registry-cache:/home/user/.cargo/registry -e PUID="$(id -u)" -e PGID="$(id -g)" rustdesk-builder
```

Bedenke, dass das erste Mal Kompilieren länger dauern kann, da die Abhängigkeiten erst kompiliert werden müssen bevor sie zwischengespeichert werden können. Darauf folgende Kompiliervorgänge werden schneller sein. Falls du zusätzliche oder andere Argumente für den Kompilierbefehl angeben musst, kannst du diese am Ende des Befehls an der `<OPTIONAL-ARGS>` Position machen. Wenn du zum Beispiel eine optimierte Releaseversion kompilieren willst, kannst du das tun, indem du `--release` am Ende des Befehls anhängst. Das daraus entstehende Programm kannst du im “target” Ordner auf deinem System finden. Du kannst es mit folgenden Befehlen ausführen:

```sh
target/debug/rustdesk
```

Oder, wenn du eine Releaseversion benutzt:

```sh
target/release/rustdesk
```

Bitte gehe sicher, dass du diese Befehle vom Stammverzeichnis vom RustDesk Repository nutzt, sonst kann es passieren, dass das Programm die Ressourcen nicht finden kann. Bitte bedenke auch, dass Unterbefehle von Cargo, wie z. B. `install` oder `run` aktuell noch nicht unterstützt werden, da sie das Programm innerhalb des Containers starten oder installieren würden, anstatt auf deinem eigentlichen System.

