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

## Se connecter

Le port par défaut de la console web est 21114. Entrez `http://<ip du serveur>:21114` dans le navigateur pour accéder à la page de la console, comme indiqué dans la figure suivante. Le nom d'utilisateur/mot de passe administrateur par défaut est `admin`/`test1234` :

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

Si vous avez besoin du support HTTPS, veuillez installer un serveur web tel que `Nginx` ou utiliser `IIS` pour Windows.

Après vous être connecté, assurez-vous de changer le mot de passe, sélectionnez `Paramètres` dans le menu du compte dans le coin supérieur droit pour accéder à la page de modification du mot de passe, comme indiqué dans la figure suivante. Vous pouvez également créer un autre compte administrateur et supprimer celui-ci. Il est préférable d'activer la vérification de connexion par email.

<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

Les utilisateurs non-administrateurs peuvent également se connecter pour parcourir leurs appareils et journaux, modifier leurs paramètres utilisateur.

## Configurations automatiques
En cliquant sur `Windows EXE`, vous pourrez obtenir les configurations pour votre propre RustDesk Server Pro, cela aidera à configurer vos clients.

Pour les clients Windows, vous pouvez omettre la configuration de serveur personnalisée et mettre les informations de configuration dans le nom de fichier `rustdesk.exe` à la place. Comme indiqué ci-dessus, veuillez aller à la page d'accueil de la console et cliquer sur `Windows EXE`. **Client ≥ 1.1.9 requis.**

Vous pouvez utiliser ceci en conjonction avec [configuration client](https://rustdesk.com/docs/en/self-host/client-configuration/) et [scripts de déploiement](https://rustdesk.com/docs/en/self-host/client-deployment/) pour configurer vos clients.

## Créer un nouvel utilisateur autre que l'utilisateur `admin` par défaut

{{% notice note %}}
Le plan `Individual` n'a pas cette fonctionnalité.
{{% /notice %}}

1. Cliquez sur `Utilisateurs` dans le menu de gauche.
2. Créez un autre compte avec `administrateur` activé.
3. Connectez-vous avec le nouveau compte administrateur.
4. Supprimez l'`admin` sur la page `Utilisateurs`.

## Créer un nouvel utilisateur
1. Cliquez sur `Utilisateurs` dans le menu de gauche.
2. Créez un nouvel utilisateur.
3. Sélectionnez dans quel groupe il devrait être (si vous devez ajouter de nouveaux groupes, continuez à lire).

## Ajouter un nouveau groupe
1. Cliquez sur `Groupes` dans le menu de gauche.
2. Créez un nouveau groupe.
3. Une fois créé, vous pouvez permettre aux groupes d'accéder les uns aux autres, Cliquez `Modifier`.
4. Sélectionnez les groupes pertinents auxquels vous voulez accéder (cela les ajoute automatiquement dans le groupe correspondant).

## Configurer plusieurs serveurs de relay
1. Allez dans `Paramètres` dans le menu de gauche.
2. Cliquez sur `Relay` dans le sous-menu.
3. Cliquez `+` à côté de `Serveurs Relay`.
4. Entrez l'adresse DNS du serveur Relay ou l'adresse IP dans la boîte qui s'affiche maintenant et appuyez sur <kbd>Entrée</kbd>.
5. Si vous avez plus d'un serveur Relay, vous pouvez continuer à cliquer `+` et adapter les paramètres Geo si nécessaire (rappelez-vous et copiez votre clé vers les autres serveurs).

## Définir ou changer la licence
1. Allez dans `Paramètres` dans le menu de gauche.
2. Cliquez sur `Licence` dans le sous-menu.
3. Cliquez `Modifier` et collez votre code de licence.
4. Cliquez `OK`.

## Afficher les journaux
Sur le côté gauche, cliquez sur `Journaux`.

## Configurer les emails
Gmail dans cet exemple

1. Allez dans `Paramètres` dans le menu de gauche.
2. Cliquez sur `SMTP` dans le sous-menu.
3. Entrez l'adresse SMTP `smtp.gmail.com`.
4. Entrez le Port 587 dans `Port SMTP`.
5. Entrez le compte Gmail c'est-à-dire `myrustdeskserver@gmail.com` dans `Compte Mail`.
6. Entrez votre mot de passe (vous pourriez avoir besoin d'un mot de passe d'application).
7. Entrez votre compte Gmail c'est-à-dire `myrustdeskserver@gmail.com` dans `De`.
8. Cliquez `Vérifier` pour sauvegarder.

## Attribution des utilisateurs/stratégies/groupes de périphériques aux périphériques via la Console Web

L’Utilisateur est l’utilisateur RustDesk connecté sur le périphérique ou attribué au périphérique en cliquant sur **Modifier** à côté du périphérique, en cliquant dans la case **Utilisateur** et en sélectionnant votre utilisateur dans le menu déroulant.  
Vous pouvez également attribuer des périphériques en masse à un utilisateur en cliquant sur **Plus → Attribuer des périphériques** dans la **Liste des utilisateurs**.

Pour ajouter un périphérique à un groupe de périphériques, vous pouvez cliquer sur **Modifier** à côté du périphérique dans la **Liste des périphériques** et changer le **Groupe**, ou aller dans la liste des **Groupes de périphériques**, cliquer sur le nom d’un groupe de périphériques et ajuster les périphériques dans ce groupe.

Pour attribuer une stratégie à un périphérique, survolez le côté droit de la liste **Stratégie** et cliquez sur **Modifier les périphériques**, **Modifier les utilisateurs** ou **Modifier les groupes de périphériques** dans le menu pour ajouter les périphériques correspondants, les périphériques des utilisateurs ou les périphériques du groupe de périphériques à la stratégie sélectionnée.

---

## Jeton API

Vous devez d’abord aller dans **Paramètres → Jetons → Créer** et créer un jeton avec les permissions requises : **Périphérique, Journal d’Audit, Utilisateur, Groupe, Stratégie, Carnet d’Adresses**.

Une fois créé, vous pouvez utiliser ces jetons via **ligne de commande** ou **Python CLI** pour effectuer des actions avec les permissions correspondantes.

### Attribution via Jeton depuis la Ligne de Commande

Vous pouvez également effectuer des attributions en utilisant l’exécutable RustDesk avec le paramètre `--assign`.  
Cela permet d’assigner des utilisateurs, des stratégies, des carnets d’adresses ou des groupes de périphériques à un périphérique directement depuis la ligne de commande.

**Exemple :**

    "C:\Program Files\RustDesk\rustdesk.exe" --assign --token <generatedtoken> --user_name <username>

Paramètres pris en charge

| Paramètre                               | Description                              | RustDesk Server Pro | RustDesk Client | 
| --------------------------------------- | ---------------------------------------- | ----------------- | --------------- | 
| `--user_name <username>`                | Assigner un utilisateur au périphérique |                   |                 | 
| `--strategy_name <strategyname>`        | Assigner une stratégie au périphérique  |                   |                 | 
| `--address_book_name <addressbookname>` | Assigner le périphérique à un carnet    |                   |                 | 
| `--address_book_tag <addressbooktag>`   | Assigner avec un tag du carnet          |                   |                 | 
| `--address_book_alias <alias>`          | Assigner avec un alias de carnet        | 1.5.8             | 1.4.1           | 
| `--address_book_password <password>`    | Définir le mot de passe de l’entrée     | 1.6.6             | 1.4.3           | 
| `--address_book_note <note>`            | Définir une note pour l’entrée          | 1.6.6             | 1.4.3           | 
| `--device_group_name <devicegroupname>` | Assigner le périphérique à un groupe    |                   |                 | 
| `--note <note>`                         | Ajouter une note au périphérique        | 1.6.6             | 1.4.3           | 
| `--device_username <device_username>`   | Définir le nom d’utilisateur du périphérique | 1.6.6 | 1.4.3 | 
| `--device_name <device_name>`           | Définir le nom du périphérique          | 1.6.6             | 1.4.3           | 

La ligne de commande sous Windows ne produit pas de sortie par défaut. Pour obtenir une sortie, exécutez :

    "C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more
    "C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String

voir [ici](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952).

### Outils de Gestion Python CLI

#### Gestion des Utilisateurs (`users.py`)

**Afficher l’aide :**

    ./users.py -h

**Voir les utilisateurs :**

    ./users.py --url <url> --token <token> view [--name <username>] [--group_name <group_name>]

**Filtres :**

    --name : nom d’utilisateur
    --group_name : groupe d’utilisateurs

**Exemple :**

    ./users.py --url https://example.com --token <token> view --group_name admins

**Opérations :**

`view` peut être remplacé par `enable`, `disable`, ou `delete`.

**Exemple (désactiver un utilisateur) :**

    ./users.py --url https://example.com --token <token> disable --name testuser

---

#### Gestion des Périphériques (`devices.py`)

**Afficher l’aide :**

    ./devices.py -h

**Voir les périphériques :**

    ./devices.py --url <url> --token <token> view [--id <device_id>] [--device_name <device_name>] [--user_name <user_name>] [--group_name <group_name>] [--device_group_name <device_group_name>] [--offline_days <days>]

**Filtres :**

    --id : ID du périphérique
    --device_name : nom du périphérique
    --user_name : utilisateur assigné
    --group_name : groupe d’utilisateurs
    --device_group_name : groupe de périphériques
    --offline_days : jours hors ligne

**Exemple :**

    ./devices.py --url https://example.com --token <token> view --user_name mike

**Opérations :**

`view` peut être remplacé par `enable`, `disable`, `delete`, ou `assign`.

**Exemple (assigner un périphérique) :**

    ./devices.py --url https://example.com --token <token> assign --device_name PC01 --assign_to user_name=mike

---

#### Gestion du Carnet d’Adresses (`ab.py`)

**Afficher l’aide :**

    ./ab.py -h

**Voir les carnets partagés :**

    ./ab.py --url <url> --token <token> view-ab [--ab-name <address_book_name>]

**Obtenir le GUID du carnet personnel :**

    ./ab.py --url <url> --token <token> get-personal-ab

**Ajouter un carnet partagé :**

    ./ab.py --url <url> --token <token> add-ab --ab-name <name> [--note <note>] [--password <password>]

**Mettre à jour ou supprimer un carnet partagé :**

    ./ab.py --url <url> --token <token> update-ab --ab-guid <guid> [--ab-update-name <new_name>] [--note <note>]
    ./ab.py --url <url> --token <token> delete-ab --ab-guid <guid>

**Voir les pairs dans un carnet :**

    ./ab.py --url <url> --token <token> view-peer --ab-guid <guid> [--peer-id <peer_id>] [--alias <alias>]

**Ajouter, mettre à jour ou supprimer un pair :**

    ./ab.py --url <url> --token <token> add-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]
    ./ab.py --url <url> --token <token> update-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]
    ./ab.py --url <url> --token <token> delete-peer --ab-guid <guid> --peer-id <peer_id>

**Gestion des étiquettes :**

    ./ab.py --url <url> --token <token> view-tag --ab-guid <guid>
    ./ab.py --url <url> --token <token> add-tag --ab-guid <guid> --tag-name <name> [--tag-color 0xFF00FF00]
    ./ab.py --url <url> --token <token> update-tag --ab-guid <guid> --tag-name <name> --tag-color 0xFFFF0000
    ./ab.py --url <url> --token <token> delete-tag --ab-guid <guid> --tag-name <name>

**Gestion des règles d’accès :**

    ./ab.py --url <url> --token <token> view-rule --ab-guid <guid>
    ./ab.py --url <url> --token <token> add-rule --ab-guid <guid> [--rule-type user|group|everyone] [--rule-user <user>] [--rule-group <group>] --rule-permission ro|rw|full
    ./ab.py --url <url> --token <token> update-rule --rule-guid <rule_guid> --rule-permission rw
    ./ab.py --url <url> --token <token> delete-rule --rule-guid <rule_guid>

**Exemple (ajouter une règle en lecture seule pour l’utilisateur "mike") :**

    ./ab.py --url https://example.com --token <token> add-rule --ab-guid <guid> --rule-user mike --rule-permission ro

---

#### Audits (`audits.py`)

**Afficher l’aide :**

    ./audits.py -h

**Voir les audits de connexion :**

    ./audits.py --url <url> --token <token> view-conn [--remote <peer_id>] [--conn-type <type>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Voir les audits de fichiers :**

    ./audits.py --url <url> --token <token> view-file [--remote <peer_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Voir les audits d’alarme :**

    ./audits.py --url <url> --token <token> view-alarm [--device <device_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Voir les audits de console :**

    ./audits.py --url <url> --token <token> view-console [--operator <username>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Filtres :**

    --remote : ID du peer (pour audits de connexion ou fichiers)
    --conn-type : 0=Bureau à distance, 1=Transfert de fichiers, 2=Transfert de ports, 3=Vision caméra, 4=Terminal
    --device : ID du périphérique (pour audits d’alarme)
    --operator : nom de l’opérateur (pour audits de console)
    --created-at : filtre de temps local, ex. "2025-09-16 14:15:57"
    --days-ago : filtrer les enregistrements plus récents que le nombre de jours indiqué
    --page-size / --current : pagination

**Exemple :**

    ./audits.py --url https://example.com --token <token> view-conn --remote 123456789 --days-ago 7

## Rechercher un appareil
1. Allez dans Appareils.
2. Dans le Champ de Recherche de Nom d'Appareil, tapez le nom et cliquez `Requête` ou appuyez sur <kbd>Entrée</kbd>.
3. Pour utiliser un joker, ajoutez `%` au début, à la fin ou aux deux du terme de recherche.