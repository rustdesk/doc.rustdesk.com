---
title: Docker 
weight: 30
---

## Hogyan építs Dockerrel

Kezdjünk a repo clónozásával, majd pedig a Docker container megépítésével:

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
docker build -t "rustdesk-builder" .
```

Ezután, minden egyes alkalommal amikor meg kell építened a RustDesk-et, futtasd a kövezkező parancsot:

```sh
docker run --rm -it -v $PWD:/home/user/rustdesk -v rustdesk-git-cache:/home/user/.cargo/git -v rustdesk-registry-cache:/home/user/.cargo/registry -e PUID="$(id -u)" -e PGID="$(id -g)" rustdesk-builder
```

Fontos, hogy az első építés lehet hogy több ideig fog tartani mint a következőek, mivel a dependenciek még nincsenek cachelve. Emelett, ha esetleg szeretnél valamilyen argumentumot hozzáadni az építő parancshoz, akkor megteheted a paracssor végén, a `<OPTIONAL-ARGS>` argumentum használatával. Például ha egy optimalizált release éptést szeretnél megépíteni, akkor add hozzá a fenti parancsorhoz a `--release` opciót. A futtatható binary elérhető lesz a target mappában a rendszereden, futtatni a következőképpen tudod: 

```sh
target/debug/rustdesk
```

Vagy ha release binary, akkor:

```sh
target/release/rustdesk
```

Kérlek mindenképpen nézd meg hogy ezeket a parancsokat a root RustDesk mappában futtatod e, különben a RustDesk lehet hogy nem fogja megtalálni az építéshez szükséges elemeket. Fontos az is, hogy jelenleg más cargo subparancsok, például `install`vagy `run` nem támogatottak, mivel egy Dockeres építés esetén elindítanák a programot a containeren belül.