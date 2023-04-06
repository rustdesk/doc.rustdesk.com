---
title: Web 
weight: 23
---

Run below on Linux or Mac (works on Windows too, however you may need to slightly modify some commands, *e.g.* change `wget` to `curl.exe -O`):

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
git checkout 3e8f7ed36df60045fc98f1cc989151548442a141
cd flutter/web/js

# install protoc first http://google.github.io/proto-lens/installing-protoc.html
npm install ts-proto
# only works with vite<=2.8, see: https://github.com/vitejs/vite/blob/main/docs/guide/build.md#chunking-strategy
npm install vite@2.8
npm install --global yarn
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

> Currently, yuv converter and vp9 are the bottleneck
