---
title: Docker
weight: 30
---

### Mit Docker erstellen
#### Funktioniert nicht unter Windows

Beginnen Sie mit dem Klonen des Repositorys und der Erstellung des Docker-Containers:

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
docker build -t "rustdesk-builder" .
```

Führen Sie dann jedes Mal, wenn Sie die Anwendung erstellen müssen, den folgenden Befehl aus:

```sh
docker run --rm -it -v $PWD:/home/user/rustdesk -v rustdesk-git-cache:/home/user/.cargo/git -v rustdesk-registry-cache:/home/user/.cargo/registry -e PUID="$(id -u)" -e PGID="$(id -g)" rustdesk-builder
```

Beachten Sie, dass die erste Erstellung länger dauern kann, bis die Abhängigkeiten zwischengespeichert sind. Nachfolgende Erstellungen werden schneller sein. Wenn Sie zusätzlich andere Argumente für den Build-Befehl angeben müssen, können Sie dies am Ende des Befehls an der Position `<OPTIONAL-ARGS>` tun. Wenn Sie zum Beispiel eine optimierte Release-Version bauen wollen, würden Sie den obigen Befehl gefolgt von `--release` ausführen. Die resultierende ausführbare Datei wird im Zielordner auf Ihrem System verfügbar sein und kann ausgeführt werden mit:

```sh
target/debug/rustdesk
```

Oder, wenn Sie eine Release-Version ausführen:

```sh
target/release/rustdesk
```

Bitte stellen Sie sicher, dass Sie diese Befehle aus dem Stammverzeichnis des RustDesk-Repositorys ausführen, da die Anwendung sonst möglicherweise nicht in der Lage ist, die erforderlichen Ressourcen zu finden. Beachten Sie auch, dass andere Cargo-Unterbefehle wie `install` oder `run` derzeit nicht über diese Methode unterstützt werden, da sie das Programm innerhalb des Containers anstatt des Hosts installieren oder ausführen würden.
