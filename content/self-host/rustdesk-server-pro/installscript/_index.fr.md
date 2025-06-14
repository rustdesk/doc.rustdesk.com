---
title: Installation
weight: 2
---

## Méthode 1 : Docker (Recommandée)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

Pour plus de détails, veuillez consulter [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/).

## Méthode 2 : install.sh

Si vous maîtrisez Linux, veuillez utiliser le script ci-dessous. Sinon, vous pourriez rencontrer des problèmes importants s'il échoue, et il pourrait être difficile de déterminer pourquoi cela ne fonctionne pas.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

Pour plus de détails, veuillez consulter [install.sh](/docs/en/self-host/rustdesk-server-pro/installscript/script/).

## Conversion depuis l'open source

### Docker
Si vous installez la version open source avec Docker, il n'y a pas de moyen direct de la convertir. Au lieu de cela, vous devrez exécuter un nouveau conteneur avec l'image Pro. Avant de faire cela, veuillez sauvegarder votre clé privée (le fichier `id_ed25519`, pas `id_ed25519.pub`). Une fois le nouveau conteneur configuré, copiez l'ancien fichier de clé privée `id_ed25519` dans le répertoire de travail du nouveau conteneur, puis redémarrez le conteneur.

### install.sh
Si vous installez la version open source avec install.sh, veuillez suivre [ceci](/docs/en/self-host/rustdesk-server-pro/installscript/script/#convert-from-open-source).