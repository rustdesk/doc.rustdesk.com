---
title: Docker 
weight: 30
---

# Comment construire avec Docker

Commencez par cloner le dépôt et construire le conteneur Docker :

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
docker build -t "rustdesk-builder" .
```

Ensuite, chaque fois que vous devez compiler le logiciel, exécutez la commande suivante :

```sh
docker run --rm -it -v $PWD:/home/user/rustdesk -v rustdesk-git-cache:/home/user/.cargo/git -v rustdesk-registry-cache:/home/user/.cargo/registry -e PUID="$(id -u)" -e PGID="$(id -g)" rustdesk-builder
```

Notez que la première compilation peut prendre plus de temps avant que les dépendances ne soient mises en cache, les compilations suivantes seront plus rapides. De plus, si vous devez spécifier différents arguments à la commande de compilation, vous pouvez le faire à la fin de la commande à la position "<OPTIONAL-ARGS>". Par exemple, si vous voulez compiler une version de release optimisée, vous devez exécuter la commande ci-dessus suivie de `--release`. L'exécutable résultant sera disponible dans le dossier cible sur votre système, et peut être lancé avec :

```sh
target/debug/rustdesk
```

Ou, si vous exécutez un exécutable provenant d'une release :

```sh
target/release/rustdesk
```

Veuillez vous assurer que vous exécutez ces commandes à partir de la racine du dépôt RustDesk, sinon l'application ne pourra pas trouver les ressources requises. Notez également que les autres sous-commandes de cargo telles que "install" ou "run" ne sont pas actuellement supportées par cette méthode car elles installeraient ou exécuteraient le programme à l'intérieur du conteneur au lieu de l'hôte.