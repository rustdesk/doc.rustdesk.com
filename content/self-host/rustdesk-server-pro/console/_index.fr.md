---
title: Console Web
weight: 10
---

La console web est intégrée dans RustDesk server Pro, servie par le port `21114`.

Fonctionnalités :

- Parcourir les appareils
- Ajouter/modifier les utilisateurs et groupes d'utilisateurs
- Modifier les permissions d'accès aux appareils
- Parcourir les journaux de connexion des appareils et autres journaux
- Mettre à jour les paramètres
- Gérer les stratégies de synchronisation des paramètres client
- Gérer les carnets d'adresses partagés
- Générer une construction client personnalisée

### Se connecter

Le port par défaut de la console web est 21114. Entrez `http://<ip du serveur>:21114` dans le navigateur pour accéder à la page de la console, comme indiqué dans la figure suivante. Le nom d'utilisateur/mot de passe administrateur par défaut est `admin`/`test1234` :

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

Si vous avez besoin du support HTTPS, veuillez installer un serveur web tel que `Nginx` ou utiliser `IIS` pour Windows.

Après vous être connecté, assurez-vous de changer le mot de passe, sélectionnez `Paramètres` dans le menu du compte dans le coin supérieur droit pour accéder à la page de modification du mot de passe, comme indiqué dans la figure suivante. Vous pouvez également créer un autre compte administrateur et supprimer celui-ci. Il est préférable d'activer la vérification de connexion par email.

<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

Les utilisateurs non-administrateurs peuvent également se connecter pour parcourir leurs appareils et journaux, modifier leurs paramètres utilisateur.

### Configurations automatiques
En cliquant sur `Windows EXE`, vous pourrez obtenir les configurations pour votre propre RustDesk Server Pro, cela aidera à configurer vos clients.

Pour les clients Windows, vous pouvez omettre la configuration de serveur personnalisée et mettre les informations de configuration dans le nom de fichier `rustdesk.exe` à la place. Comme indiqué ci-dessus, veuillez aller à la page d'accueil de la console et cliquer sur `Windows EXE`. **Client ≥ 1.1.9 requis.**

Vous pouvez utiliser ceci en conjonction avec [configuration client](https://rustdesk.com/docs/en/self-host/client-configuration/) et [scripts de déploiement](https://rustdesk.com/docs/en/self-host/client-deployment/) pour configurer vos clients.

### Créer un nouvel utilisateur autre que l'utilisateur `admin` par défaut

{{% notice note %}}
Le plan `Individual` n'a pas cette fonctionnalité.
{{% /notice %}}

1. Cliquez sur `Utilisateurs` dans le menu de gauche.
2. Créez un autre compte avec `administrateur` activé.
3. Connectez-vous avec le nouveau compte administrateur.
4. Supprimez l'`admin` sur la page `Utilisateurs`.

### Créer un nouvel utilisateur
1. Cliquez sur `Utilisateurs` dans le menu de gauche.
2. Créez un nouvel utilisateur.
3. Sélectionnez dans quel groupe il devrait être (si vous devez ajouter de nouveaux groupes, continuez à lire).

### Ajouter un nouveau groupe
1. Cliquez sur `Groupes` dans le menu de gauche.
2. Créez un nouveau groupe.
3. Une fois créé, vous pouvez permettre aux groupes d'accéder les uns aux autres, Cliquez `Modifier`.
4. Sélectionnez les groupes pertinents auxquels vous voulez accéder (cela les ajoute automatiquement dans le groupe correspondant).

### Configurer plusieurs serveurs de relay
1. Allez dans `Paramètres` dans le menu de gauche.
2. Cliquez sur `Relay` dans le sous-menu.
3. Cliquez `+` à côté de `Serveurs Relay`.
4. Entrez l'adresse DNS du serveur Relay ou l'adresse IP dans la boîte qui s'affiche maintenant et appuyez sur <kbd>Entrée</kbd>.
5. Si vous avez plus d'un serveur Relay, vous pouvez continuer à cliquer `+` et adapter les paramètres Geo si nécessaire (rappelez-vous et copiez votre clé vers les autres serveurs).

### Définir ou changer la licence
1. Allez dans `Paramètres` dans le menu de gauche.
2. Cliquez sur `Licence` dans le sous-menu.
3. Cliquez `Modifier` et collez votre code de licence.
4. Cliquez `OK`.

### Afficher les journaux
Sur le côté gauche, cliquez sur `Journaux`.

### Configurer les emails
Gmail dans cet exemple

1. Allez dans `Paramètres` dans le menu de gauche.
2. Cliquez sur `SMTP` dans le sous-menu.
3. Entrez l'adresse SMTP `smtp.gmail.com`.
4. Entrez le Port 587 dans `Port SMTP`.
5. Entrez le compte Gmail c'est-à-dire `myrustdeskserver@gmail.com` dans `Compte Mail`.
6. Entrez votre mot de passe (vous pourriez avoir besoin d'un mot de passe d'application).
7. Entrez votre compte Gmail c'est-à-dire `myrustdeskserver@gmail.com` dans `De`.
8. Cliquez `Vérifier` pour sauvegarder.

### Assigner des Utilisateurs/Groupes/Stratégies/GroupeAppareil aux Appareils
L'Utilisateur est l'Utilisateur RustDesk connecté sur l'appareil ou assigné à l'appareil en cliquant `Modifier` à côté de l'appareil, cliquez dans la boîte `Utilisateur` et déroulez pour sélectionner votre utilisateur, cela assignera automatiquement le groupe basé sur le groupe auquel l'utilisateur a été assigné.

Ceci peut également être fait via l'API en ligne de commande lors du déploiement ou plus tard en appelant l'exécutable RustDesk suivi de `--assign --token <token généré> --user_name <nom d'utilisateur>`. Vous devez aller dans `Paramètres → Tokens → Créer` et créer un token avec les permissions Appareil d'abord pour faire ceci. Un exemple de ceci sur windows serait `"C:\Program Files\RustDesk\rustdesk.exe" --assign --token <token généré> --user_name <nouvel utilisateur>`.

Vous pouvez également assigner une stratégie de cette façon, par exemple `--assign --token <token généré> --strategy_name <nom de stratégie>`.

Vous pouvez également assigner un carnet d'adresses de cette façon, par exemple `--assign --token <token généré> --address_book_name <nom du carnet d'adresses>` ou `--assign --token <token généré> --address_book_name <nom du carnet d'adresses> --address_book_tag <tag du carnet d'adresses> --address_book_alias <alias>`. `--address_book_alias` nécessite RustDesk server Pro ≥1.5.8 et client ≥1.4.1.

Vous pouvez également assigner un nom de groupe d'appareils de cette façon, par exemple `--assign --token <token généré> --device_group_name <nom du groupe d'appareils>`.

La ligne de commande sur Windows n'a pas de sortie par défaut. Pour obtenir une sortie, veuillez exécuter comme ceci, `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more` ou `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String`, voir [ici](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952).

### Rechercher un appareil
1. Allez dans Appareils.
2. Dans le Champ de Recherche de Nom d'Appareil, tapez le nom et cliquez `Requête` ou appuyez sur <kbd>Entrée</kbd>.
3. Pour utiliser un joker, ajoutez `%` au début, à la fin ou aux deux du terme de recherche.