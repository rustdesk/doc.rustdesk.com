---
title: Windows & PM2 ou NSSM
weight: 20
---

{{% notice note %}}
La politique de sécurité de Windows est délicate, si ce tutoriel ne fonctionne pas pour vous, ou si vous rencontrez une connexion instable, veuillez migrer vers un serveur Linux.
{{% /notice %}}

{{% notice note %}}
La version GUI, `RustDeskServer.setup.exe` n'est plus maintenue, non recommandée.
{{% /notice %}}

## Un carrefour
Vous avez maintenant deux choix, vous pouvez soit utiliser PM2 (plus facile) ou NSSM (un peu plus difficile) pour démarrer le serveur RustDesk
Il y a certains avantages à utiliser NSSM :
- Compatibilité avec les anciennes versions de Windows (Windows Server 2008 R2/Windows 7 et antérieures bien que non testé).
- Idéal pour Windows Server
- Démarrage automatique au démarrage sans connexion (L'utilisateur qui a créé l'entrée de démarrage n'a pas besoin de se connecter pour qu'elle démarre).
- Exécution des deux binaires en tant que Services.
- Autonome (aucune dépendance à Node.js)

Tandis que les avantages de PM2 incluent :
- Bonne idée si vous exécutez le serveur sur le même ordinateur que votre ordinateur de travail principal
- Vous vous connectez régulièrement à l'utilisateur qui a créé l'entrée de démarrage RustDesk
- Plus convivial

## Installation avec NSSM

### Installation de NSSM
Veuillez [télécharger](https://github.com/dkxce/NSSM/releases/download/v2.25/NSSM_v2.25.zip) et extraire NSSM en sélectionnant l'architecture appropriée pour votre système Windows (si x86 utilisez le contenu du dossier win32, si x64 utilisez le contenu du dossier win64). Il est également recommandé de déplacer le binaire de NSSM dans le répertoire `Program Files\NSSM` (NSSM une fois démarré en tant que service, ne peut pas être déplacé du répertoire où il a été placé. il est donc préférable de le ranger dans `Program Files`) de votre lecteur d'installation (généralement le lecteur C:). Il est également conseillé d'ajouter le chemin (tel que `C:\Program Files\NSSM`) à la variable de chemin.

### Vérifier si NSSM est correctement installé
Si vous avez tout fait correctement, le dossier `C:\Program Files\NSSM` (dans cet exemple j'utilise le lecteur C: mais vous pouvez utiliser n'importe quel lecteur sur lequel vous avez installé Windows ou n'importe quel chemin que vous désirez) ne devrait contenir que le fichier `nssm.exe`.

Nous utiliserons `C:\Program Files\NSSM` dans cet exemple.

Ouvrez l'invite de commande et exécutez `nssm` si vous voyez une page d'aide, vous êtes prêt à passer à l'étape suivante.

### Exécuter hbbr et hbbs
Téléchargez la version Windows de [RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases).
Décompressez le programme dans `C:\Program Files\RustDesk Server` (ou n'importe où vous le désirez, assurez-vous simplement que cela ne change pas après l'installation du service). Maintenant, revenez à l'invite de commande.

Nous utiliserons `C:\Program Files\RustDesk Server` dans cet exemple.
```cmd
nssm install "RustDesk hbbs service" "C:\Program Files\RustDesk Server\hbbs.exe"
nssm install "RustDesk hbbr service" "C:\Program Files\RustDesk Server\hbbr.exe"
```
**Note :**
- Vous pouvez changer `RustDesk hbbs service` par ce que vous désirez pour nommer le service hbbs
- Vous pouvez changer `RustDesk hbbr service` par ce que vous désirez pour nommer le service hbbr
- Vous pouvez changer `C:\Program Files\RustDesk Server\hbbs.exe` par l'endroit où vous avez placé les binaires RustDesk
- Vous pouvez changer `C:\Program Files\RustDesk Server\hbbr.exe` par l'endroit où vous avez placé les binaires RustDesk

**Modèles de commande :**

Le modèle de commande au cas où vous souhaiteriez simplement copier, coller et modifier.

```cmd
nssm install <Nom de service hbbs souhaité> <Chemin binaire hbbs RustDesk> <Arguments hbbs RustDesk>
nssm install <Nom de service hbbr souhaité> <Chemin binaire hbbr RustDesk> <Arguments hbbr RustDesk>
```

**Démarrer les services**

Après l'installation réussie des services, ils doivent être démarrés.
```cmd
nssm start <Nom de service hbbs souhaité>
nssm start <Nom de service hbbr souhaité>
```

**Terminé !**

(La méthode ci-dessus a été testée sur Windows Server Core 2022 Standard).

## ou

## Installation avec PM2

### Installer Node.js

Veuillez [télécharger](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi) et installer Node.js.
Node.js est l'environnement d'exécution de PM2, vous devez donc d'abord installer Node.js.

### Installer PM2

Entrez ce qui suit dans `cmd.exe`, appuyez sur la touche <kbd>Entrée</kbd> pour chaque ligne, et exécutez-les ligne par ligne.

```cmd
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### Exécuter hbbr et hbbs

Téléchargez la version Windows de [RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases). Décompressez le programme sur le lecteur C:. Exécutez les quatre commandes suivantes :

```cmd
cd C:\rustdesk-server-windows-x64
pm2 start hbbs.exe
pm2 start hbbr.exe
pm2 save
```

### Afficher le journal

```cmd
pm2 log hbbr
pm2 log hbbs
```

## Tutoriels alternatifs
https://pedja.supurovic.net/setting-up-self-hosted-rustdesk-server-on-windows/?lang=lat
