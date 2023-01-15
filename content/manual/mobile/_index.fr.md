---
title: Contrôle distant depuis son mobile
weight: 1
---

### Contrôle d'un appareil distant depuis son mobile

Entrez l'ID de l'appareil distant dans la page d'accueil ou sélectionnez un appareil dans l'historique.
Une fois l'authentification réussie, vous pourez en prendre le contrôle.

| Accueil | Connecté avec succès |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/connection_home_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/connection_en.jpg?width=300px) |

Le contrôle du curseur distant peut être en "mode souris" ou en "mode tactile". Ils peuvent être commutés via la barre d'outils inférieure.    

| Accès configuration souris | Choix du mode |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/manual/mobile/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
En mode souris, vous pouvez déclencher un click droit en tapant à deux doigts
{{% /notice %}}

### Transfert fichier (Android)

> A partir de RustDesk 1.1.9 et +

Dans la liste sur la page d'accueil, sélectionnez l'appareil souhaité.

Appuyez longuement ou appuyez sur le menu de droite pour sélectionner "transférer un fichier"

| Accueil | Connecté avec succès |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/file_connection_en.jpg?width=300px) |

- Le répertoire initial est le répertoire d'accueil de l'appareil, vous pouvez cliquer sur <i class="fas fa-home"></i> pour revenir rapidement à l'accueil.
- Sous la barre de titre se trouve le contenu du répertoire, vous pouvez cliquer sur un dossier pour y acceder.
- Cliquez sur <i class="fas fa-arrow-up"></i> pour accéder au répertoire parent.
- Le chemin absolu actuel et les statistiques du projet sont affichés au bas de la liste.
- Cliquez sur "Local" / "Distant" dans la barre de titre pour basculer d'une vue des dossiers locaux vers les locaux distants.

#### Comment transférer des fichiers ?

1. **Appuyez longuement** sur un fichier ou un dossier dans la liste pour accéder rapidement au **choix multiple**, qui peut sélectionner plusieurs éléments.
2. Après avoir sélectionné le(s) fichier(s), utilisez l'icone double flèche pour copier et basculez de la page "local" vers "Distant" ou vice et versa. 
3. Cliquez sur l'icône coller en bas à droite de la double flèche pour transférer le ou les éléments sélectionnés vers le répertoire cible.

| Mode multi-sélection | Fichier collé |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/file_copy_en.jpg?width=300px) |

### Définir ID/serveur relais

1. Cliquez sur "Paramètres" dans la barre de navigation inférieure.
2. Cliquez sur "ID/Serveur Relais".
3. Saisissez le nom d'hôte ou l'adresse IP de votre Server dans le champ « ID Server ». Laissez "Serveurs relais" et "Serveur API" vides et entrez votre clé publique (facultative, requise pour le chiffrement) dans le champ "Key". Appuyez sur **Confirmer** pour enregistrer vos paramètres. Il basculera automatiquement vers le serveur spécifié.

Vous pouvez également configurer ces paramètres en scannant un code QR. Pour générer un tel code QR, utilisez une chaine de caractères dans le format suivant (modifiez les valeurs "host" et "key" par les vôtres) :
```nolang
config={"host": "xxx", "key": "xxx"}
```

Puis allez sur le site [QR Code Generateur en ligne](https://www.qr-code-generator.com/) et copier alors cette chaine afin de générer un QR code.
L'image ci-dessous est une capture d'écran d'Android. S'il s'agit d'iOS, il faut passer par le menu en haut à droite sur la page d'accueil.
![](/docs/en/manual/mobile/images/id_setting_en.jpg?width=300px)

Pour plus de détails sur comment auto-hébergé votre propre serveur Rustdesk, veuillez vous référer à [Auto-héberger son serveur](/docs/fr/self-host/)
