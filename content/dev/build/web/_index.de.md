---
title: Web
weight: 23
---

## Auf Linux erstellen

Führen Sie die folgenden Schritte unter Linux oder Mac aus (funktioniert auch unter Windows, allerdings müssen Sie einige Befehle leicht abändern, z. B. `wget` in `curl.exe -O`):

```sh
git clone https://github.com/JelleBuning/rustdesk.git
cd rustdesk
git switch fix_build
cd flutter/web/js

# Zuerst protoc installieren, siehe https://google.github.io/proto-lens/installing-protoc.html
npm install ts-proto
# Funktioniert nur mit vite ≤ 2.8, siehe https://github.com/vitejs/vite/blob/main/docs/guide/build.md#chunking-strategy
npm install vite@2.8

# Für die Erstellung von yarn erforderlich
npm install yarn -g
npm install typescript -g
npm install protoc -g

yarn build

cd ..

# Für Details zum YUV-Konverter siehe https://github.com/rustdesk/rustdesk/issues/364#issuecomment-1023562050
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/web_deps.tar.gz
# In den aktuellen Ordner entpacken
tar xzf web_deps.tar.gz

cd ..

# Viel Glück!
flutter run -d chrome
```

## Version auf Linux erstellen

Wenn Sie den Webclient hosten wollen, sollten Sie eine Version erstellen, bevor Sie ihn auf einem Webserver ausführen.
Führen Sie dazu die oben beschriebenen Schritte aus, mit Ausnahme des Befehls `flutter run -d chrome`. Fahren Sie mit den folgenden Befehlen fort:

```sh
flutter build web --release
cd build/web
# Sie können jeden beliebigen Server verwenden, hier nur ein Beispiel
python -m http.server 8000
```

Um die Erstellung auf HTTPS zu konfigurieren, empfehlen wir, dieser [Anleitung](https://medium.com/flutter-community/how-to-host-flutter-using-nginx-a71bcb11d96) zu folgen.

> Derzeit sind YUV-Konverter und VP9 der Engpass.

## Mit Docker erstellen

Führen Sie die folgenden Schritte unter Linux oder Mac aus:
- Beginnen Sie mit der Installation von flutter für [Linux](https://docs.flutter.dev/get-started/install/linux#install-flutter-manually) oder [macOS](https://docs.flutter.dev/get-started/install/macos).
- Flutter-App lokal einrichten:

```sh
git clone https://github.com/JelleBuning/rustdesk.git
cd rustdesk
git switch fix_build
cd flutter/web/js

# Zuerst protoc installieren, siehe https://google.github.io/proto-lens/installing-protoc.html
npm install ts-proto
# Funktioniert nur mit vite ≤ 2.8, siehe https://github.com/vitejs/vite/blob/main/docs/guide/build.md#chunking-strategy
npm install vite@2.8

# Für die Erstellung von yarn erforderlich
npm install yarn -g
npm install typescript -g
npm install protoc -g

yarn build
```

- Erstellen Sie ein `Dockerfile` im Ordner `flutter` mit folgendem Inhalt:

```Dockerfile
# Betriebssystem und Abhängigkeiten installieren
FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get install -y curl git wget unzip libgconf-2-4 gdb libstdc++6 libglu1-mesa fonts-droid-fallback lib32stdc++6 python3 clang cmake ninja-build pkg-config libgtk-3-dev
RUN apt-get clean

# Flutter SDK vom GitHub-Repository herunterladen
RUN git clone https://github.com/flutter/flutter.git /usr/local/flutter

# Flutter-Umgebungspfad einstellen
ENV PATH="/usr/local/flutter/bin:/usr/local/flutter/bin/cache/dart-sdk/bin:${PATH}"

# flutter doctor ausführen
RUN flutter doctor

# flutter web aktivieren
RUN flutter channel master
RUN flutter upgrade
RUN flutter config --enable-web

# Dateien in den Container kopieren und erstellen
RUN mkdir /app/
# Die Web-App kann nicht aus dem Dockerfile gebaut werden.
# Stattdessen wird sie lokal gebaut und "flutter build web" wird auskommentiert.
COPY . /app/
WORKDIR /app/
# RUN flutter build web

# Erfassung des offenen Ports
EXPOSE 5000

# Startskript des Servers ausführbar machen und den Webserver starten
RUN ["chmod", "+x", "/app/server/server.sh"]

ENTRYPOINT [ "/app/server/server.sh"]
```

- Legen Sie den Ordner `server` unter `flutter` an.
- Erstellen Sie eine Datei `server.sh` im Ordner `flutter/server` mit folgendem Inhalt:

```sh
#!/bin/bash

# Port festlegen
PORT=5000

# Anhalten aller Programme, die derzeit auf dem eingestellten Port laufen
echo 'Vorbereitung des Ports' $PORT '...'
fuser -k 5000/tcp

# Ordner wechseln
cd build/web/

# Server starten
echo 'Server startet auf Port' $PORT '...'
python3 -m http.server $PORT
```

- Das Docker-Image erstellen:

```sh
docker build -t rustdesk-web-client .
```

- Das Docker-Image ausführen:

```sh
docker run -p 5000:5000 rustdesk-web-client
```

- Öffnen Sie Ihren Browser und gehen Sie zu `localhost:5000`, um die Webanwendung zu sehen.

### RustDesk-Webclient mit vorhandenem Docker-Image

Wenn Sie das Docker-Image nicht selbst erstellen möchten, können Sie das Image auf [Docker Hub](https://hub.docker.com/r/keyurbhole/flutter_web_desk) verwenden.

- Das Image ziehen:

```sh
docker pull keyurbhole/flutter_web_desk
```

- Das Docker-Image ausführen:

```sh
docker run -p 5000:5000 keyurbhole/flutter_web_desk
```

- Öffnen Sie Ihren Browser und gehen Sie zu `localhost:5000`, um die Webanwendung zu sehen.
