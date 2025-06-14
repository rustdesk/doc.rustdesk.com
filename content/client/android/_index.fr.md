---
title: Android
weight: 4
---

### Contrôle à distance

Entrez l'ID de l'appareil distant sur la page d'accueil ou sélectionnez un appareil historique pour vérifier.
Après une vérification réussie, vous pouvez contrôler l'appareil distant.

| Accueil | Connecté avec succès |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_en.jpg?width=300px) | ![](/docs/en/client/android/images/connection_en.jpg?width=300px) |

Le contrôle d'entrée offre deux modes : `Mode souris` et `Mode tactile`, qui peuvent être commutés via la barre d'outils inférieure.

| Paramètres de la souris | Sélection du mode |
| --- | --- |
| ![](/docs/en/client/android/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/client/android/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
En `Mode souris`, vous pouvez également déclencher le `Clic droit` de l'appareil distant avec un `Tap à deux doigts`
{{% /notice %}}

### Transfert de fichiers (Android)

> Nécessite RustDesk ≥ 1.1.9

Sélectionnez l'appareil dans la liste des appareils sur la page d'accueil.

Appuyez longuement ou tapez sur le menu à droite pour sélectionner `Transfert de fichiers`.

| Accueil | Connecté avec succès |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_connection_en.jpg?width=300px) |

- Le répertoire initial est le répertoire principal de l'appareil, vous pouvez cliquer sur <i class="fas fa-home"></i> pour revenir rapidement à l'accueil.
- Sous la barre de titre se trouve le niveau de répertoire, vous pouvez cliquer sur le dossier correspondant pour naviguer rapidement.
- Cliquez sur <i class="fas fa-arrow-up"></i> pour accéder au répertoire parent.
- Le chemin absolu actuel et les statistiques du projet seront affichés en bas de la liste.
- Cliquez sur `Local` / `Distant` dans la barre de titre pour changer de page.

#### Comment transférer des fichiers ?

1. **Appuyez longuement** sur un fichier ou un dossier dans la liste pour entrer rapidement en **mode de sélection multiple**, qui peut sélectionner plusieurs éléments.
2. Après avoir sélectionné le(s) fichier(s), changez de page `Local` / `Distant`. Après le changement, vous verrez l'invite `Coller ici ?` en bas de l'écran.
3. Cliquez sur l'icône de collage de fichier dans l'image pour transférer le(s) élément(s) sélectionné(s) vers le répertoire de destination.

| Mode de sélection multiple | Collage de fichier |
| --- | --- |
| ![](/docs/en/client/android/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_copy_en.jpg?width=300px) |

### Définir le serveur ID/Relais

1. Cliquez sur `Paramètres` dans la barre de navigation inférieure.
2. Cliquez sur `Serveur ID/Relais`.
3. Entrez le nom d'hôte/adresse IP de votre serveur ID dans le champ `Serveur ID`. Laissez `Serveur relais` et `Serveur API` vides, et entrez votre clé publique (optionnel, requis pour le chiffrement) dans le champ `Clé`. Appuyez sur **OK** pour enregistrer vos paramètres. Il basculera automatiquement vers le serveur spécifié.

Vous pouvez également le configurer en scannant un code QR. Pour générer le code QR, utilisez le format suivant (changez les valeurs `host` et `key` pour les vôtres) :

```nolang
config={"host": "xxx", "key": "xxx"}
```

Ensuite, allez sur un [Générateur de code QR en ligne](https://www.qr-code-generator.com/) et collez le code ci-dessus.

L'image ci-dessous est une capture d'écran d'Android. Si c'est iOS, veuillez vérifier le menu en haut à droite de la page d'accueil.

![](/docs/en/client/android/images/id_setting_en.jpg?width=300px)

### Partager l'écran/fichiers de votre téléphone Android

À partir de la version 1.1.9, le client Android a ajouté les fonctions de partage de l'écran du téléphone et de partage du système de fichiers du téléphone.

- Android 6 et plus est requis pour le partage d'écran
- Android 10 ou plus est requis pour partager l'audio interne du système de téléphone mobile
- iOS ne prend pas encore en charge le partage d'écran

#### Demander des autorisations et démarrer les services

Cliquez sur `Partager l'écran` dans la barre de navigation inférieure.

Configurez diverses autorisations selon les besoins. Chaque fois que vous démarrez RustDesk, vous devez demander à nouveau les autorisations "Capture d'écran" et "Contrôle d'entrée".

![](/docs/en/client/android/images/server_off_en.jpg?width=300px)

| Autorisation | Description |
| --- | --- |
| Capture d'écran | Activer ou non l'autorisation de partage de capture d'écran, le service de surveillance sera activé en même temps que le démarrage |
| Contrôle d'entrée* | Permettre ou non au contrôleur de contrôler l'entrée du téléphone, comme les opérations d'écran tactile virtuel avec la souris |
| Transfert de fichiers* | Activer ou non l'autorisation de transfert de fichiers, après le démarrage, vous pouvez contrôler à distance le système de fichiers de ce téléphone |
| Capture audio | Partager ou non la musique système interne du téléphone (pas l'entrée du microphone) |

{{% notice note %}}
Le * ci-dessus représente des autorisations spéciales. Pour obtenir de telles autorisations, vous devez accéder à la page des paramètres du système Android pour les obtenir manuellement. Les détails sont les suivants
{{% /notice %}}

#### Demande d'autorisation spéciale - Fichier

| Demander des autorisations de fichier Android sautera automatiquement à la page des paramètres système |
| :---: |
| ![](/docs/en/client/android/images/get_file_en.jpg?width=300px) |

#### Demande d'autorisation spéciale - entrée souris
| Étape 1 : Trouvez "Services installés" | Étape 2 : Démarrez RustDesk Input |
| --- | --- |
| ![](/docs/en/client/android/images/get_input1_en.jpg?width=300px) | ![](/docs/en/client/android/images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
La page des paramètres système de différents fournisseurs peut être différente, veuillez l'ajuster selon votre page système.
{{% /notice %}}

| Raccourcis de contrôle de souris à distance | Description |
| --- | --- |
| Cliquer avec le bouton droit de la souris | Retour |
| Cliquer sur la molette de la souris | Accueil |
| Appui long sur la molette de la souris | Applications récemment ouvertes |
| Défilement de la molette de la souris | Simuler le glissement vertical |

#### Démarrer le service

Après avoir obtenu l'autorisation `Capture d'écran`, le service sera automatiquement démarré. Vous pouvez également cliquer sur le bouton `Démarrer le service` pour démarrer le service. Une fois le service démarré, il peut accepter les demandes de contrôle de bureau d'autres appareils.

Si l'autorisation `Transfert de fichiers` est activée, il peut également accepter les demandes de contrôle de fichiers d'autres appareils.

Après le démarrage du service, un ID unique et un mot de passe aléatoire seront automatiquement obtenus pour cet appareil. D'autres appareils peuvent contrôler le téléphone via l'ID et le mot de passe, ou confirmer manuellement lors de la réception d'une nouvelle demande.

| Avant de démarrer le service | Après avoir démarré le service |
| --- | --- |
| ![](/docs/en/client/android/images/server_off_en.jpg?width=300px) | ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. Cliquer sur `Démarrer le service` activera l'autorisation `Capture d'écran` par défaut.
2. Lorsque l'autorisation `Capture d'écran` n'est pas obtenue, d'autres appareils ne peuvent pas émettre de demandes de contrôle.
3. Sauf pour l'autorisation `Capture d'écran`, le changement d'autres autorisations n'affectera que les nouvelles connexions et n'affectera pas la connexion établie. Si vous devez changer les autorisations pour une connexion établie, veuillez d'abord fermer la connexion actuelle, modifier les autorisations, puis recevoir une demande de contrôle.
{{% /notice %}}

##### PC

![](/docs/en/client/android/images/android_server_pc_side_en.png?width=700px)

##### Terminal mobile

| Vous pouvez arrêter le service ou fermer la connexion spécifiée à tout moment | Vous pouvez recevoir ou initier des discussions |
| --- | --- |
| ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) | ![](/docs/en/client/android/images/android_server2_en.jpg?width=300px) |