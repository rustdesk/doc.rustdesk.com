---
title: Web 
weight: 23
---

Ejecutar a continuación en Linux o Mac

Actualmente, el converter yuv y vp9 son cuello de botella

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk/flutter/web/js

# instalar protoc primero http://google.github.io/proto-lens/installing-protoc.html
npm install ts-proto
yarn build

cd ..

# sobre los detalles del convertidor yuv, mira esto https://github.com/rustdesk/rustdesk/issues/364#issuecomment-1023562050
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/web_deps.tar.gz
tar xzf web_deps.tar.gz

cd ..

# Buena suerte!
flutter run -d chrome
```
