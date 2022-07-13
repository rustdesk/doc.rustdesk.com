---
title: Web 
weight: 23
---

A lenti parancsokat Mac, vagy Linux masinán futtasd.

Jelenleg, a yuv converter, és a vp9 akadályoz minket a legjobban.

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk/flutter/web/js

# Telepítsd a Protocot elsőnek: http://google.github.io/proto-lens/installing-protoc.html
npm install ts-proto
yarn build

cd ..

# Yuv converter infókért, checkold: https://github.com/rustdesk/rustdesk/issues/364#issuecomment-1023562050
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/web_deps.tar.gz
tar xzf web_deps.tar.gz

cd ..

# Sok sikert!
flutter run -d chrome
```
