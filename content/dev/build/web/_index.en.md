---
title: Web 
weight: 23
---

## How to build on Linux

Run below on Linux or Mac (works on Windows too, however you may need to slightly modify some commands, e.g. change `wget` to `curl.exe -O`):

```sh
git clone https://github.com/JelleBuning/rustdesk.git
cd rustdesk 
git switch fix_build 
cd flutter/web/js

# Install protoc first, see: https://google.github.io/proto-lens/installing-protoc.html
npm install ts-proto
# Only works with vite <= 2.8, see: https://github.com/vitejs/vite/blob/main/docs/guide/build.md#chunking-strategy
npm install vite@2.8

# Required for yarn build
npm install yarn -g
npm install typescript -g
npm install protoc -g

yarn build

cd ..

# About details of yuv converter, check this https://github.com/rustdesk/rustdesk/issues/364#issuecomment-1023562050
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/web_deps.tar.gz
# Decompress to the current directory
tar xzf web_deps.tar.gz

cd ..

# Good Luck!
flutter run -d chrome
```

## How to build release on Linux

If you want to host the webclient you should build a release before running it on a webserver. 
To do so follow the steps shown above except the `flutter run -d chrome` command. Continue with the following commands:

```sh
flutter build web --release
cd build/web
# You could use any server, just an example
python -m http.server 8000
```

> Currently, yuv converter and vp9 are the bottleneck

## How to build with Docker

Run below on Linux or Mac:
- Begin by installing flutter for [Linux](https://docs.flutter.dev/get-started/install/linux#install-flutter-manually) or [macOS](https://docs.flutter.dev/get-started/install/macos)
- Setup the flutter app locally:

```sh
git clone https://github.com/JelleBuning/rustdesk.git
cd rustdesk 
git switch fix_build
cd flutter/web/js

# Install protoc first, see: https://google.github.io/proto-lens/installing-protoc.html
npm install ts-proto
# Only works with vite <= 2.8, see: https://github.com/vitejs/vite/blob/main/docs/guide/build.md#chunking-strategy
npm install vite@2.8

# Required for yarn build
npm install yarn -g
npm install typescript -g
npm install protoc -g

yarn build
```

- Create a `Dockerfile` with the following content under `flutter` directory:

```Dockerfile
# Install operating system and dependencies
FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive 

RUN apt-get update 
RUN apt-get install -y curl git wget unzip libgconf-2-4 gdb libstdc++6 libglu1-mesa fonts-droid-fallback lib32stdc++6 python3 clang cmake ninja-build pkg-config libgtk-3-dev
RUN apt-get clean

# Download Flutter SDK from Flutter Github repo
RUN git clone https://github.com/flutter/flutter.git /usr/local/flutter

# Set flutter environment path
ENV PATH="/usr/local/flutter/bin:/usr/local/flutter/bin/cache/dart-sdk/bin:${PATH}"

# Run flutter doctor
RUN flutter doctor

# Enable flutter web
RUN flutter channel master
RUN flutter upgrade
RUN flutter config --enable-web

# Copy files to container and build
RUN mkdir /app/
# I was unable to build web app from dockerfile 
# So instead I built it locally and commented the "flutter build web" in this file
COPY . /app/
WORKDIR /app/
# RUN flutter build web

# Record the exposed port
EXPOSE 5000

# Make server startup script executable and start the web server
RUN ["chmod", "+x", "/app/server/server.sh"]

ENTRYPOINT [ "/app/server/server.sh"]
```

- Create `server` directory under `flutter`
- Create a `server.sh` file with the following content under `flutter/server` directory:

```sh
#!/bin/bash

# Set the port
PORT=5000

# Stop any program currently running on the set port
echo 'preparing port' $PORT '...'
fuser -k 5000/tcp

# Switch directory
cd build/web/

# Start the server
echo 'Server starting on port' $PORT '...'
python3 -m http.server $PORT
```

- Build the docker image:

```sh
docker build -t rustdesk-web-client .
```

- Run the docker image:

```sh
docker run -p 5000:5000 rustdesk-web-client
```

- Open your browser and go to `localhost:5000` to see the web app

### RustDesk Web Client using existing Docker image

If you do not want to build the docker image yourself, you can use the image I built and uploaded to [Docker Hub](https://hub.docker.com/r/keyurbhole/flutter_web_desk)

- Pull the image:

```sh
docker pull keyurbhole/flutter_web_desk
```

- Run the image:

```sh
docker run -p 5000:5000 keyurbhole/flutter_web_desk
```

- Open your browser and go to `localhost:5000` to see the web app
