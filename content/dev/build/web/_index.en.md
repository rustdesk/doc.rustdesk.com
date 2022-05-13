---
title: Web 
weight: 23
---

Run below on Linux or Mac

Currently, yuv converter and vp9 are the bottleneck

```
git clone https://github.com/rustdesk/rustdesk
cd rustdesk/flutter/web/js
# install protoc first http://google.github.io/proto-lens/installing-protoc.html
npm install ts-proto
yarn build
cp dist/assets/*js ../assets/
# update index.html with above generated js
vi ../index.html
cd ..
# about details of yuv converter, check this https://github.com/rustdesk/rustdesk/issues/364#issuecomment-1023562050
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/web_deps.tar.gz
tar xzf web_deps.tar.gz
# Good Luck!
flutter run -d chrome
```
