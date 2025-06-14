---
title: Installazione
weight: 2
---

## Metodo 1: Docker (Raccomandato)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

Per maggiori dettagli, controlla [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/).

## Metodo 2: install.sh

Se sei esperto di Linux, utilizza lo script sottostante. Altrimenti, potresti incontrare problemi significativi se fallisce, e potrebbe essere difficile determinare perché non funziona.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

Per maggiori dettagli, controlla [install.sh](/docs/en/self-host/rustdesk-server-pro/installscript/script/).

## Converti da open source

### Docker
Se installi la versione open source usando Docker, non c'è un modo diretto per convertirla. Invece, dovrai eseguire un nuovo container con l'immagine Pro. Prima di farlo, esegui il backup della tua chiave privata (il file `id_ed25519`, non `id_ed25519.pub`). Una volta configurato il nuovo container, copia il vecchio file della chiave privata `id_ed25519` nella directory di lavoro del nuovo container, quindi riavvia il container.

### install.sh
Se installi la versione open source usando install.sh, segui [questo](/docs/en/self-host/rustdesk-server-pro/installscript/script/#convert-from-open-source).