---
title: Client RustDesk
weight: 2
pre: "<b>1. </b>"
---

### Introduction
Le client RustDesk est utilisé sur les appareils pour se connecter via notre serveur RustDesk, qu'il soit open source ou Pro. Il est disponible au téléchargement sur [GitHub](https://github.com/rustdesk/rustdesk/releases/latest).

### Plateformes supportées
- Microsoft Windows
- macOS
- Dérivés Debian (Ubuntu ≥ 16, Linux Mint, etc.)
- Dérivés Red Hat (CentOS, Fedora ≥ 18, Rocky Linux, etc.)
- Arch Linux/Manjaro
- openSUSE
- NixOS
- AppImage / Flatpak
- Android
- iOS (ne supporte pas le contrôle)
- Web

### Installation

#### Windows

Téléchargez l'exécutable depuis GitHub et installez-le.

Pour installer silencieusement, appelez l'exe d'installation avec `--silent-install`.

#### macOS

Téléchargez le fichier dmg depuis GitHub. Plus d'informations sont disponibles sur la [page macOS](https://rustdesk.com/docs/en/client/mac/).

Ouvrez le fichier dmg et faites glisser `RustDesk` vers `Applications`.

Autorisez RustDesk à s'exécuter.

Activez les permissions demandées et suivez les invites sur le côté gauche de RustDesk pour terminer la configuration.

#### Linux

Veuillez consulter les instructions ci-dessous pour installer sur les différentes "saveurs" de Linux (les installeurs sont sur GitHub ou disponibles depuis le dépôt d'une distribution).

##### Dérivés Debian

```sh
# veuillez ignorer le rapport d'utilisation du disque incorrect
sudo apt install -fy ./rustdesk-<version>.deb
```

##### Dérivés Red Hat

```sh
sudo yum localinstall ./rustdesk-<version>.rpm
```

##### Arch Linux/Manjaro

```sh
sudo pacman -U ./rustdesk-<version>.pkg.tar.zst
```

##### openSUSE (≥ Leap 15.0)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<version>-suse.rpm
```

##### Nix / NixOS (≥ 22.05)

Entrer temporairement dans un shell avec `rustdesk` prêt à s'exécuter :

```sh
nix shell nixpkgs#rustdesk
```

Installer dans le profil utilisateur actuel :

```sh
nix profile install nixpkgs#rustdesk
```

Pour installer à l'échelle du système dans NixOS, exécutez `nixos-rebuild switch --flake /etc/nixos` après avoir édité `configuration.nix` :

```
  environment.systemPackages = with pkgs; [
    ...
    rustdesk
  ];
```

#### Android
Installez l'apk depuis notre GitHub. Plus d'informations sont disponibles sur la [page Android](https://rustdesk.com/docs/en/client/android/).

#### iOS (iPhone, iPad)
Téléchargez l'application depuis l'[App Store](https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015).

### Utilisation
Une fois installé (ou exécuté comme un exécutable temporaire), RustDesk se connectera aux serveurs publics. Vous verrez un message en bas indiquant (1) "Prêt, Pour une connexion plus rapide, veuillez configurer votre propre serveur". En haut à gauche, vous verrez votre (2) ID, (3) Mot de passe à usage unique et à droite une (4) boîte pour vous connecter à un autre ordinateur si vous connaissez leur ID.

![](/docs/en/client/images/client.png)

Pour accéder aux paramètres, cliquez sur le bouton (5) Menu [ &#8942; ] à droite de l'ID.

Sous Paramètres, vous trouverez :
- Général - Contrôle du service, Thème, Codec matériel, Audio, Enregistrement et Langue
- Sécurité - Permissions pour quelqu'un prenant le contrôle, Options de mot de passe, possibilité de changer votre ID et Paramètres de sécurité avancés
- Réseau - Configurez ici vos propres paramètres de serveur et proxy
- Affichage - Contrôlez les paramètres d'affichage pour les sessions distantes et autres options par défaut, synchronisation du presse-papiers, etc.
- Compte - Ceci peut être utilisé en conjonction avec le serveur Pro pour se connecter à l'API
- À propos - Affiche des informations sur le logiciel.

### Configuration de RustDesk
Il existe plusieurs façons de configurer RustDesk.

Le moyen le plus simple est d'utiliser RustDesk Server Pro pour obtenir une chaîne de configuration chiffrée, qui peut être utilisée avec `--config` pour importer les paramètres. Pour ce faire :
1. Ouvrez la ligne de commande sur n'importe quel OS que vous utilisez, dans le dossier où RustDesk est installé, c'est-à-dire `C:\Program Files\RustDesk` sur Windows, `/usr/bin` sur Linux.
2. Utilisez la commande `rustdesk.exe --config votre-chaîne-chiffrée` par exemple `rustdesk.exe --config 9JSPSvJzNrBDasJjNSdXOVVBlERDlleoNWZzIHcOJiOikXZr8mcw5yazVGZ0NXdy5CdyciojI0N3boJye`.

Vous pouvez configurer manuellement un client. Pour ce faire :
1. Cliquez sur Paramètres.
2. Cliquez sur Réseau.
3. Cliquez sur Déverrouiller les paramètres réseau.
4. Entrez votre ID, Relais, API (si vous utilisez un serveur pro) et votre clé.

![](/docs/en/client/images/network-settings.png)

Si vous configurez manuellement un client, vous pouvez récupérer le fichier `RustDesk2.toml` (dans le dossier utilisateurs) et utiliser `--import-config` de manière similaire à l'exemple ci-dessus.

### Paramètres de ligne de commande
- `--password` peut être utilisé pour définir un mot de passe permanent.
- `--get-id` peut être utilisé pour récupérer l'ID.
- `--set-id` peut être utilisé pour définir un ID, veuillez noter que les ID doivent commencer par une lettre.
- `--silent-install` peut être utilisé pour installer RustDesk silencieusement sur Windows.

Des paramètres avancés supplémentaires peuvent être trouvés [ici](https://github.com/rustdesk/rustdesk/blob/bdc5cded221af9697eb29aa30babce75e987fcc9/src/core_main.rs#L242).

{{% children depth="3" showhidden="true" %}}
