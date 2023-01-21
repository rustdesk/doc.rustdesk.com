---
title: Web 
weight: 23
---

Führen Sie die folgenden Schritte unter Linux oder Mac aus (funktioniert auch unter Windows, allerdings müssen Sie einige Befehle leicht abändern, z. B. `wget` in `curl.exe -O`):

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk/flutter/web/js

# Zuerst protoc installieren, siehe https://google.github.io/proto-lens/installing-protoc.html
npm install ts-proto
# Funktioniert nur mit vite <= 2.8, siehe https://github.com/vitejs/vite/blob/main/docs/guide/build.md#chunking-strategy
yarn build

cd ..

# Für Details zum YUV-Konverter siehe https://github.com/rustdesk/rustdesk/issues/364#issuecomment-1023562050
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/web_deps.tar.gz
# In das aktuelle Verzeichnis entpacken
tar xzf web_deps.tar.gz

cd ..

# Viel Glück!
flutter run -d chrome
```

> Derzeit sind YUV-Konverter und vp9 der Engpass.
