---
title: Installation
weight: 6
---

# Docker (Recommended)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
docker compose up -d
```

For more details, please check [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/).

# install.sh

If you are proficient in Linux, please use the script below. Otherwise, you may encounter significant issues if it fails, and it could be difficult to determine why it isn’t working.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

