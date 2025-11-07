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

**Afficher l'aide :**  
`./users.py -h`

**Voir les utilisateurs :**  
`./users.py --url <url> --token <token> view [--name <username>] [--group_name <group_name>]`

**Filtres :**
- `--name` : nom d'utilisateur (recherche floue)
- `--group_name` : groupe d'utilisateurs (correspondance exacte)

**Exemple :**  
`./users.py --url https://example.com --token <token> view --group_name Default`

**Opérations de base :**

- **Désactiver un utilisateur :**  
  `./users.py --url <url> --token <token> disable --name testuser`

- **Activer un utilisateur :**  
  `./users.py --url <url> --token <token> enable --name testuser`

- **Supprimer un utilisateur :**  
  `./users.py --url <url> --token <token> delete --name testuser`

**Création et invitation d'utilisateurs :**

- **Créer un nouvel utilisateur :**  
  `./users.py --url <url> --token <token> new --name username --password 'password123' --group_name Default [--email user@example.com] [--note "note"]`
  
  Requis : `--name`, `--password`, `--group_name`  
  Optionnel : `--email`, `--note`

- **Inviter un utilisateur par e-mail :**  
  `./users.py --url <url> --token <token> invite --email user@example.com --name username --group_name Default [--note "note"]`
  
  Requis : `--email`, `--name`, `--group_name`  
  Optionnel : `--note`

**Opérations 2FA et sécurité :**

- **Activer l'application 2FA :**  
  `./users.py --url <url> --token <token> enable-2fa-enforce --name username --web-console-url <console_url>`
  
  Requis : `--web-console-url`

- **Désactiver l'application 2FA :**  
  `./users.py --url <url> --token <token> disable-2fa-enforce --name username [--web-console-url <console_url>]`
  
  Optionnel : `--web-console-url`

- **Réinitialiser 2FA :**  
  `./users.py --url <url> --token <token> reset-2fa --name username`

- **Désactiver la vérification par e-mail :**  
  `./users.py --url <url> --token <token> disable-email-verification --name username`

- **Déconnexion forcée :**  
  `./users.py --url <url> --token <token> force-logout --name username`

**Remarques :**
- Lors d'opérations sur plusieurs utilisateurs (correspondants aux filtres), une confirmation sera demandée
- Si aucun utilisateur ne correspond, "Found 0 users" sera affiché

---

#### Gestion des Groupes d'Utilisateurs (`user_group.py`)

**Afficher l'aide :**  
`./user_group.py -h`

**Voir les groupes d'utilisateurs :**  
`./user_group.py --url <url> --token <token> view [--name <group_name>]`

**Exemple :**  
`./user_group.py --url https://example.com --token <token> view --name "Équipe Ventes"`

**Opérations sur les groupes :**

- **Créer un groupe d'utilisateurs :**  
  `./user_group.py --url <url> --token <token> add --name "NomGroupe" [--note "description"] [--accessed-from '<json>'] [--access-to '<json>']`
  
  Exemple avec contrôle d'accès :  
  `./user_group.py --url <url> --token <token> add --name "Ingénierie" --accessed-from '[{"type":0,"name":"Managers"}]' --access-to '[{"type":1,"name":"Serveurs Dev"}]'`

- **Mettre à jour un groupe d'utilisateurs :**  
  `./user_group.py --url <url> --token <token> update --name "NomGroupe" [--new-name "Nouveau Nom"] [--note "nouvelle note"] [--accessed-from '<json>'] [--access-to '<json>']`

- **Supprimer un groupe d'utilisateurs :**  
  `./user_group.py --url <url> --token <token> delete --name "NomGroupe"`
  
  Prend en charge les noms séparés par des virgules : `--name "Groupe1,Groupe2,Groupe3"`

**Gestion des utilisateurs dans les groupes :**

- **Voir les utilisateurs dans un groupe :**  
  `./user_group.py --url <url> --token <token> view-users [--name <group_name>] [--user-name <username>]`
  
  Filtres :
  - `--name` : nom du groupe (correspondance exacte, optionnel)
  - `--user-name` : nom d'utilisateur (recherche floue, optionnel)
  
  Exemple :  
  `./user_group.py --url <url> --token <token> view-users --name Default --user-name john`

- **Ajouter des utilisateurs à un groupe :**  
  `./user_group.py --url <url> --token <token> add-users --name "NomGroupe" --users "user1,user2,user3"`

**Paramètres de contrôle d'accès :**

- `--accessed-from` : tableau JSON définissant qui peut accéder à ce groupe d'utilisateurs
  - Type 0 = Groupe d'utilisateurs (ex. `[{"type":0,"name":"Admins"}]`)
  - Type 2 = Utilisateur (ex. `[{"type":2,"name":"john"}]`)

- `--access-to` : tableau JSON définissant ce à quoi ce groupe d'utilisateurs peut accéder
  - Type 0 = Groupe d'utilisateurs (ex. `[{"type":0,"name":"Support"}]`)
  - Type 1 = Groupe de périphériques (ex. `[{"type":1,"name":"Serveurs"}]`)

**Remarque :** Utilisez des guillemets simples autour des tableaux JSON pour éviter les problèmes d'analyse du shell.

**Exigences de permissions :**
- Les commandes `view/add/update/delete/add-users` nécessitent **Permission de Groupe d'Utilisateurs**
- La commande `view-users` nécessite **Permission d'Utilisateur**

---

#### Gestion des Groupes de Périphériques (`device_group.py`)

**Afficher l'aide :**  
`./device_group.py -h`

**Voir les groupes de périphériques :**  
`./device_group.py --url <url> --token <token> view [--name <group_name>]`

**Exemple :**  
`./device_group.py --url https://example.com --token <token> view`

**Opérations sur les groupes :**

- **Créer un groupe de périphériques :**  
  `./device_group.py --url <url> --token <token> add --name "NomGroupe" [--note "description"] [--accessed-from '<json>']`
  
  Exemple :  
  `./device_group.py --url <url> --token <token> add --name "Production" --accessed-from '[{"type":0,"name":"Admins"}]'`

- **Mettre à jour un groupe de périphériques :**  
  `./device_group.py --url <url> --token <token> update --name "NomGroupe" [--new-name "Nouveau Nom"] [--note "nouvelle note"] [--accessed-from '<json>']`

- **Supprimer un groupe de périphériques :**  
  `./device_group.py --url <url> --token <token> delete --name "NomGroupe"`
  
  Prend en charge les noms séparés par des virgules : `--name "Groupe1,Groupe2,Groupe3"`

**Gestion des périphériques dans les groupes :**

- **Voir les périphériques dans un groupe :**  
  `./device_group.py --url <url> --token <token> view-devices [filtres]`
  
  Filtres disponibles :
  - `--name` : nom du groupe de périphériques (correspondance exacte)
  - `--id` : ID du périphérique (recherche floue)
  - `--device-name` : nom du périphérique (recherche floue)
  - `--user-name` : nom d'utilisateur/propriétaire (recherche floue)
  - `--device-username` : nom d'utilisateur connecté sur le périphérique (recherche floue)
  
  Exemples :  
  ```bash
  # Voir tous les périphériques dans un groupe
  ./device_group.py --url <url> --token <token> view-devices --name Production
  
  # Rechercher par nom de périphérique
  ./device_group.py --url <url> --token <token> view-devices --device-name server
  
  # Combiner les filtres
  ./device_group.py --url <url> --token <token> view-devices --name Production --user-name john
  ```


- **Ajouter des périphériques à un groupe :**  
  `./device_group.py --url <url> --token <token> add-devices --name "NomGroupe" --ids "deviceid1,deviceid2"`

- **Retirer des périphériques d'un groupe :**  
  `./device_group.py --url <url> --token <token> remove-devices --name "NomGroupe" --ids "deviceid1,deviceid2"`

**Paramètre de contrôle d'accès :**

- `--accessed-from` : tableau JSON définissant qui peut accéder à ce groupe de périphériques
  - Type 0 = Groupe d'utilisateurs (ex. `[{"type":0,"name":"Ingénieurs"}]`)
  - Type 2 = Utilisateur (ex. `[{"type":2,"name":"admin"}]`)

**Exigences de permissions :**
- Les commandes `view/add/update/delete/add-devices/remove-devices` nécessitent **Permission de Groupe de Périphériques**
- La commande `view-devices` nécessite **Permission de Périphérique**

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

#### Gestion des Stratégies (`strategies.py`)

**Afficher l'aide :**  
`./strategies.py -h`

**Lister toutes les stratégies :**  
`./strategies.py --url <url> --token <token> list`

**Voir une stratégie spécifique :**  
```bash
# Par nom
./strategies.py --url <url> --token <token> view --name "Default"

# Par GUID
./strategies.py --url <url> --token <token> view --guid "01983006-fcca-7c12-9a91-b1df483c6073"
```

**Activer ou désactiver une stratégie :**  
```bash
./strategies.py --url <url> --token <token> enable --name "NomStratégie"
./strategies.py --url <url> --token <token> disable --name "NomStratégie"
```

**Attribuer une stratégie aux périphériques, utilisateurs ou groupes de périphériques :**  
```bash
# Attribuer aux périphériques (par ID de périphérique)
./strategies.py --url <url> --token <token> assign --name "Default" --peers "1849118658,1337348840"

# Attribuer aux utilisateurs (par nom d'utilisateur)
./strategies.py --url <url> --token <token> assign --name "Default" --users "admin,user1"

# Attribuer aux groupes de périphériques (par nom de groupe)
./strategies.py --url <url> --token <token> assign --name "Default" --device-groups "device_group1,Production"

# Attribution mixte
./strategies.py --url <url> --token <token> assign \
  --name "Default" \
  --peers "1849118658" \
  --users "admin" \
  --device-groups "device_group1"
```

**Retirer l'attribution de stratégie :**  
```bash
# Retirer des périphériques
./strategies.py --url <url> --token <token> unassign --peers "1849118658,1337348840"

# Retirer des utilisateurs
./strategies.py --url <url> --token <token> unassign --users "admin"

# Retirer des groupes de périphériques
./strategies.py --url <url> --token <token> unassign --device-groups "device_group1"
```

**Remarques :**
- Le script prend en charge les noms et les GUIDs pour les utilisateurs et les groupes de périphériques
- Les IDs de périphériques sont automatiquement convertis en GUIDs
- Toutes les opérations assign/unassign peuvent cibler plusieurs ressources à la fois

**Exigences de permissions :**
- Les commandes `list/view/enable/disable/assign/unassign` nécessitent **Permission de Stratégie**
- `--peers` nécessite **Permission de Périphérique:r** (pour la recherche d'ID vers GUID)
- `--users` nécessite **Permission d'Utilisateur:r** (pour la recherche de nom d'utilisateur vers GUID)
- `--device-groups` nécessite **Permission de Groupe de Périphériques:r** (pour la recherche de nom de groupe vers GUID)

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