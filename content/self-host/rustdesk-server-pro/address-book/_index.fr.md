---
title: Carnet d’adresses
weight: 201
description: "Utilisez le carnet d’adresses dans RustDesk Server Pro pour enregistrer des appareils distants, partager des listes d'appareils, organiser les appareils avec des tags et vous connecter depuis le client RustDesk avec des mots de passe partagés."
keywords: ["rustdesk address book", "rustdesk server pro address book", "rustdesk shared address book", "rustdesk device tags", "rustdesk shared password"]
---

Le carnet d’adresses permet aux utilisateurs d'enregistrer des IDs d'appareils RustDesk, de les organiser avec des tags, de partager des listes d'appareils et de se connecter depuis le client RustDesk avec des mots de passe enregistrés.

## Réponses rapides

- **Mon carnet d’adresses** est privé pour l'utilisateur connecté. Les mots de passe saisis manuellement et mémorisés sont enregistrés dans **Mon carnet d’adresses** et peuvent être synchronisés entre les appareils de l'utilisateur.
- Les carnets d’adresses **partagés** peuvent être partagés avec des utilisateurs spécifiques, des groupes d'utilisateurs ou tous les utilisateurs.
- Un carnet d’adresses partagé peut stocker un mot de passe au niveau du carnet d’adresses, et chaque entrée d'appareil peut stocker un mot de passe au niveau de l'appareil. Lorsque le mot de passe au niveau de l'appareil n'est pas défini, le mot de passe au niveau du carnet d’adresses est utilisé.
- Les tags peuvent être utilisés pour filtrer les appareils dans la console web et dans le client RustDesk.

## Connexion en un clic avec un carnet d’adresses partagé

Utilisez un carnet d’adresses partagé lorsque les utilisateurs doivent se connecter sans saisir manuellement le mot de passe distant à chaque fois.

1. Créez ou ouvrez un carnet d’adresses partagé. Vous pouvez éventuellement définir un **mot de passe au niveau du carnet d’adresses** sur ce carnet.

2. Cliquez sur le nom du carnet d’adresses pour ouvrir la page des appareils. Cliquez sur **Importer**, sélectionnez les appareils à importer dans le carnet d’adresses, puis cliquez sur **Enregistrer** en bas pour enregistrer les appareils sélectionnés. Vous pouvez aussi cliquer sur **Ajouter** pour ajouter un appareil par ID, en utilisant une adresse IP comme ID pour un accès IP direct. Vous pouvez éventuellement définir un **mot de passe au niveau de l'appareil** sur chaque entrée d'appareil.

3. Partagez le carnet d’adresses avec des utilisateurs spécifiques, des groupes d'utilisateurs ou tous les utilisateurs.

4. L'utilisateur se connecte au client RustDesk et ouvre l'onglet **Carnet d’adresses**.

5. L'utilisateur sélectionne le carnet d’adresses partagé et clique sur la carte de l'appareil.

![Cliquer sur une carte d'appareil d'un carnet d’adresses partagé dans le client](/docs/en/self-host/rustdesk-server-pro/address-book/images/click-peer-card.png)

{{% notice warning %}}
Le mot de passe partagé n'est utilisé que lors d'une connexion depuis le carnet d’adresses partagé correspondant, soit en cliquant sur la carte de l'appareil, soit en utilisant son menu déroulant. Il n'est pas utilisé depuis un autre onglet d'appareil, le bouton **Se connecter** à côté du champ de saisie de l'ID ou un autre carnet d’adresses partagé.
{{% /notice %}}

## Autorisations du carnet d’adresses partagé

| Autorisation | Ce que les utilisateurs peuvent faire |
| --- | --- |
| **Lecture seule** | Peut voir les appareils et les tags, et peut utiliser le mot de passe. |
| **Lecture/Écriture** | Peut modifier les appareils et les tags. |
| **Contrôle total** | Peut repartager, supprimer ou renommer le carnet d’adresses. |

Lorsque plusieurs règles correspondent au même utilisateur, la priorité est :

1. Utilisateur
2. Groupe
3. Tous

Par exemple, si **Tous** est en Lecture seule mais qu'un utilisateur spécifique est en Contrôle total, cet utilisateur reçoit l'autorisation Contrôle total.

![Autorisations de partage du carnet d’adresses](/docs/en/self-host/rustdesk-server-pro/address-book/images/share-list.png)

![Autorisation de carnet d’adresses partagé dans la console web](/docs/en/self-host/rustdesk-server-pro/address-book/images/user1-permission.png)

## Console web

### Créer ou modifier un carnet d’adresses partagé

Dans **Carnet d’adresses > Partagé**, créez un carnet d’adresses partagé avec un nom, une note facultative et un **Mot de passe partagé par défaut** facultatif. Il s'agit du mot de passe au niveau du carnet d’adresses.

![Créer un carnet d’adresses partagé avec un mot de passe partagé par défaut](/docs/en/self-host/rustdesk-server-pro/address-book/images/create-shared-address-book.png)

### Ajouter des appareils et des mots de passe

Les appareils peuvent être ajoutés manuellement par ID ou importés depuis la liste des appareils de Server Pro. Pour chaque entrée, vous pouvez définir un alias, des tags, une note et, pour les carnets d’adresses partagés, un mot de passe au niveau de l'appareil.

![Ajouter un appareil au carnet d’adresses partagé](/docs/en/self-host/rustdesk-server-pro/address-book/images/import-device.png)

![Appareils](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-addressbook-devices.png)

![Modifier un appareil dans le carnet d’adresses partagé](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-edit-device.png)

### Tags et filtrage

Les tags organisent et filtrent les appareils. `Sans tag` filtre les appareils sans tags. Lorsque **Filtrer par intersection** est activé, seuls les appareils correspondant à tous les tags sélectionnés sont affichés.

### Corbeille

La suppression d'un appareil depuis un carnet d’adresses déplace l'entrée dans la corbeille de ce carnet d’adresses. Elle ne supprime pas l'appareil de RustDesk Server Pro.

## Comportement du mot de passe partagé

| Niveau de mot de passe | Priorité |
| --- | --- |
| Mot de passe au niveau de l'appareil | Utilisé en premier lorsque l'entrée d'appareil possède un mot de passe. |
| Mot de passe au niveau du carnet d’adresses | Utilisé lorsque l'entrée d'appareil n'a pas de mot de passe. |

Si aucun des deux mots de passe n'est défini, l'utilisateur se connecte normalement et peut devoir saisir le mot de passe manuellement. Dans la console web, les colonnes de mot de passe indiquent seulement si un mot de passe est défini.

## Client RustDesk

Après la connexion, utilisez le sélecteur de carnet d’adresses pour basculer entre **Mon carnet d’adresses** et les carnets d’adresses partagés. Pour les carnets d’adresses partagés, le client affiche l'autorisation de l'utilisateur actuel.

![Sélecteur de carnet d’adresses du client RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-selector.png)

![Carnet d’adresses en lecture seule](/docs/en/self-host/rustdesk-server-pro/address-book/images/read-only-address-book.png)

### Modifier depuis le client

Les utilisateurs disposant d'une autorisation d'écriture peuvent ajouter des IDs, ajouter des tags, modifier des alias, modifier des tags, modifier des notes, définir des mots de passe partagés ou supprimer des entrées.

![Menu d'appareil du carnet d’adresses 1 dans le client RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu1.png)

![Ajouter un ID dans le client RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-add-id.png)

![Menu d'appareil du carnet d’adresses 2 dans le client RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu2.png)

![Modifier le mot de passe dans le client RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-change-password.png)

## Préréglages de déploiement

La configuration du client RustDesk peut prédéfinir l'affectation au carnet d’adresses :

- `preset-address-book-name`
- `preset-address-book-tag`
- `preset-address-book-alias`
- `preset-address-book-password`
- `preset-address-book-note`

`preset-address-book-alias`, `preset-address-book-password` et `preset-address-book-note` nécessitent le client RustDesk 1.4.3 ou ultérieur et RustDesk Server Pro 1.6.6 ou ultérieur.

Pour plus de détails, consultez la [configuration avancée du client](/docs/en/self-host/client-configuration/advanced-settings/#preset-address-book-name--preset-address-book-tag--preset-address-book-alias--preset-address-book-password--preset-address-book-note).

## Paramètres associés

| Paramètre | Où | Effet |
| --- | --- | --- |
| **Autoriser les non-administrateurs à partager des carnets d’adresses avec d'autres groupes** | **Paramètres > Autres** | Permet aux utilisateurs non administrateurs de partager des carnets d’adresses avec d'autres groupes d'utilisateurs. |
| **Désactiver le carnet d’adresses** | **Client personnalisé** | Masque ou désactive le carnet d’adresses dans le client personnalisé généré. |

## Dépannage

### Mot de passe incorrect

Le mot de passe enregistré dans un carnet d’adresses partagé est utilisé par le client RustDesk contrôleur. Il n'est pas défini sur l'appareil contrôlé. Définissez le mot de passe de l'appareil contrôlé sur cet appareil dans **Paramètres > Sécurité > Mot de passe**.

Pour utiliser le mot de passe partagé, connectez-vous depuis le carnet d’adresses partagé correspondant en cliquant sur la carte de l'appareil. Une connexion depuis un autre carnet d’adresses, un autre onglet d'appareil ou le bouton **Se connecter** à côté du champ de saisie de l'ID n'utilise pas le mot de passe partagé de ce carnet d’adresses.
