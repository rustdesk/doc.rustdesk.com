---
title: Web 
weight: 23
---

Voer het onderstaande uit op Linux of Mac (werkt ook op Windows, maar je moet sommige commando's enigszins aanpassen, *bijvoorbeeld* verander `wget` in `curl.exe -O`):

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk/flutter/web/js

# install protoc first http://google.github.io/proto-lens/installing-protoc.html
npm install ts-proto
# only works with vite<=2.8, see: https://github.com/vitejs/vite/blob/main/docs/guide/build.md#chunking-strategy
yarn build

cd ..

# about details of yuv converter, check this https://github.com/rustdesk/rustdesk/issues/364#issuecomment-1023562050
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/web_deps.tar.gz
# decompress to the current directory
tar xzf web_deps.tar.gz

cd ..

# Good Luck!
flutter run -d chrome
```

> Momenteel zijn yuv converter en vp9 de knelpunten...
