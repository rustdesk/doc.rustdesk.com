---
title: Веб
weight: 23
---

Запустите нежописанное на Linux или Mac

В настоящее время конвертер yuv и vp9 являются "бутылочным горлышком"

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk/flutter/web/js

# сначала установим protoc http://google.github.io/proto-lens/installing-protoc.html
npm install ts-proto
yarn build

cd ..

# подробности о конвертере yuv смотрите здесь https://github.com/rustdesk/rustdesk/issues/364#issuecomment-1023562050
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/web_deps.tar.gz
tar xzf web_deps.tar.gz

cd ..

# Удачи!
flutter run -d chrome
```
