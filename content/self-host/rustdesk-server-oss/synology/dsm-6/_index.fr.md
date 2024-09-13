---
title: Synology DSM 6
weight: 22
---

Ce tutoriel est basé sur DSM V6, ne diffère que légèrement pour DSM V7.

### Installation de Docker

Avec l'outils centre de paquet, installez docker

|             |                                                   |
| --------------- | -------------------------------------------------------- |
![](images/package-manager.png) | ![](images/docker.png)


### Installation du server RustDesk

| Recherchez Rustdesk-Server dans le registre Docker et l'installer par un double clic  |   L'image rustdesk-Server installée alors double-cliquez pour créer un conteneur Rustdesk-Server                                    |
| --------------- | -------------------------------------------------------- |
![](images/pull-rustdesk-server.png) | ![](images/rustdesk-server-installed.png)


### Créer le conteneur hbbs

Comme mentionné ci-dessus, double-cliquez sur l'image Rustdesk-Server pour créer un nouveau conteneur, nommez-le sur `hbbs`.
![](images/hbbs.png) 

Cliquez sur "Paramètres avancés" ci-dessus.

- Activer le redémarrage automatique
![](images/auto-restart.png) 

- Activer "Utiliser le même réseau que Docker Host", Pour en savoir plus sur le réseau hôte, s'il vous plaît [voir](/docs/en/self-host/install/#net-host)
![](images/host-net.png) 

- Monter un répertoire depuis l'hôte (ex: `partage/test/`) vers `/root`, HBBS générera des fichiers (y compris le fichier clé `key`) dans ce répertoire
| Montage du répertoire hôte | Fichiers générés dans le répertoire de l'hôte |
|-- | -- |
![](images/mount.png?width=500px) | ![](images/mounted-dir.png?width=300px) 

- Définir  command
{{% notice note %}}
Le système d'exploitation Synology est basé sur Debian. La configuration sur réseau hôte (--net = host), nous évitera de définir l'exposition des ports avec l'option `-p`.

`192.168.16.98` est une IP intranet utilisée ici pour la démonstration seulement, vous devrez utiliser une IP publique lors du déploiement.

{{% /notice %}}

![](images/hbbs-cmd.png?v3) 

- Terminé
  
![](images/hbbs-config.png) 

### Créer le conteneur hbbr

Veuillez répéter les même étapes que pour `hbbs` ci-dessus, mais modifiez le nom du conteneur en `hbbr` et saisir en commande `hbbr`.
![](images/hbbr-config.png) 

### conteneurs hbbr/hbbs

![](images/containers.png?width=500px)


| Double-cliquez sur le conteneur et vérifiez le journal | Vérifier et confirmer que les conteneurs HBBS et HBBR utilisent le réseau hôte |
|-- | -- |
![](images/log.png?width=500px) | ![](images/network-types.png?width=500px)

