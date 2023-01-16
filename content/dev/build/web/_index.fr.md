---
title: Web 
weight: 23
---

Exécutez les commandes ci-dessous sur Linux ou Mac (fonctionne également sur Windows, mais vous devrez peut-être modifier légèrement certaines commandes, ex: changer `wget` par `curl.exe -O`):

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk/flutter/web/js

# installer ts-protoc http://google.github.io/proto-lens/installing-protoc.html
npm install ts-proto
# fonctionne seulement avec vite<=2.8, voir: https://github.com/vitejs/vite/blob/main/docs/guide/build.md#chunking-strategy
yarn build

cd ..

# pour plus de détails sur yuv converter, se reporter à https://github.com/rustdesk/rustdesk/issues/364#issuecomment-1023562050
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/web_deps.tar.gz
# Décompressez vers le répertoire actuel
tar xzf web_deps.tar.gz

cd ..

# Bonne chance!
flutter run -d chrome
```

> Actuellement, YUV Converter et VP9 sont le goulot d'étranglement
