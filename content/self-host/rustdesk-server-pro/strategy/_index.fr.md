---
title: Stratégie
weight: 200
---

La stratégie est un outil pour les administrateurs RustDesk pour mettre à jour en masse les options de sécurité des pages de paramètres client. Les administrateurs peuvent créer différentes stratégies et les appliquer à différents appareils.

## Créer des stratégies

Vous pouvez créer une nouvelle stratégie en cliquant sur le bouton `+` et effectuer diverses actions sur la stratégie en la survolant et en cliquant sur le menu.

Dans le menu contextuel, vous pouvez choisir d'`Activer` ou de `Désactiver` la stratégie, la `Renommer`, la `Dupliquer` ou la `Supprimer`. De plus, vous pouvez cliquer sur `Modifier les appareils` pour modifier les appareils appliqués à cette stratégie ou cliquer sur `Modifier les utilisateurs` pour modifier les utilisateurs appliqués à cette stratégie.

Sur le côté droit du menu de stratégie, vous pouvez voir le nombre d'appareils réellement appliqués à la stratégie, en tenant compte de la priorité de la stratégie.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/strategy_menu.png)

## Stratégie d'appareil, stratégie d'utilisateur et stratégie de groupe d'appareils

Les stratégies sont appliquées selon l'ordre de priorité suivant :
1. Stratégie d'appareil (Priorité la plus élevée)
2. Stratégie d'utilisateur
3. Stratégie de groupe d'appareils (Priorité la plus faible)

Chaque appareil ne peut être géré que par une seule stratégie à la fois. Le système de priorité fonctionne comme suit :
- Les stratégies d'appareil ont la priorité sur les stratégies d'utilisateur et les stratégies de groupe d'appareils
- Les stratégies d'utilisateur ont la priorité sur les stratégies de groupe d'appareils
- Les stratégies de groupe d'appareils s'appliquent à tous les appareils du groupe d'appareils qui n'ont pas de stratégie d'appareil ou de stratégie d'utilisateur assignée

## Modifier les appareils

Lorsque vous cliquez sur le menu `Modifier les appareils`, une boîte de dialogue d'édition affichant tous les appareils s'ouvre. Vous pouvez changer l'état de sélection des cases à cocher puis cliquer sur le bouton `Enregistrer` pour appliquer les modifications d'appareils effectuées sur la page actuelle. Si vous devez modifier des appareils sur d'autres pages, veuillez naviguer vers ces pages. Vous pouvez également utiliser le menu déroulant dans le coin supérieur droit pour filtrer les appareils.

Format de colonne de stratégie : stratégie d'appareil/stratégie d'utilisateur/stratégie de groupe d'appareils, ou "-" pour la stratégie par défaut.

Voici un exemple de la boîte de dialogue qui apparaît lorsque vous cliquez sur `Modifier les appareils` dans le menu "demo1". Dans cet exemple, l'appareil "1981241962" est appliqué à la stratégie "demo3" ; l'appareil "1279471875" est appliqué à la stratégie "demo2" ; l'appareil "a123456" est appliqué à la stratégie "demo1" ; l'appareil "1227624460" est appliqué à la stratégie par défaut.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_devices.png)

## Modifier les utilisateurs

Lorsque vous cliquez sur le menu `Modifier les utilisateurs`, une boîte de dialogue d'édition affichant tous les utilisateurs s'ouvre. Vous pouvez changer l'état de sélection des cases à cocher puis cliquer sur le bouton `Enregistrer` pour appliquer les modifications d'utilisateurs effectuées sur la page actuelle. Si vous devez modifier des utilisateurs sur d'autres pages, veuillez naviguer vers ces pages. Vous pouvez également utiliser le menu déroulant dans le coin supérieur droit pour filtrer les utilisateurs.

Voici un exemple de la boîte de dialogue qui apparaît lorsque vous cliquez sur `Modifier les utilisateurs` dans le menu "demo2". Dans cet exemple, l'utilisateur "admin" est appliqué à la stratégie "default" ; l'utilisateur "user1" est appliqué à la stratégie "demo2" ; l'utilisateur "user2" est appliqué à la stratégie "demo3".

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_users.png)

## Modifier les groupes d'appareils

Lorsque vous cliquez sur le menu `Modifier le groupe d'appareils`, une boîte de dialogue d'édition affichant tous les groupes d'appareils s'ouvre. Vous pouvez changer l'état de sélection des cases à cocher puis cliquer sur le bouton `Enregistrer` pour appliquer les modifications de groupes d'appareils effectuées sur la page actuelle. Si vous devez modifier des groupes d'appareils sur d'autres pages, veuillez naviguer vers ces pages. Vous pouvez également utiliser le menu déroulant dans le coin supérieur droit pour filtrer les groupes d'appareils.

Voici un exemple de la boîte de dialogue qui apparaît lorsque vous cliquez sur `Modifier le groupe d'appareils` dans le menu "demo1". Dans cet exemple, le groupe d'appareils "device_group1" est appliqué à la stratégie "demo1" ; le groupe d'appareils "group2" est appliqué à la stratégie "demo2" ; le groupe d'appareils "group3" est appliqué à la stratégie "default".

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_device_groups.png)

## Synchronisation des stratégies

Chaque appareil ne peut être géré que par une seule stratégie, et si cette stratégie est désactivée, l'appareil ne sera géré par aucune stratégie. Lors de la synchronisation des stratégies, RustDesk enregistre les horodatages de stratégie locaux et serveur pour déterminer si la synchronisation est nécessaire. C'est-à-dire qu'après la synchronisation complète des stratégies :

* Si l'utilisateur modifie certaines options, le client utilisera les options de l'utilisateur.
* Si l'administrateur modifie le contenu de la stratégie, les options du client seront synchronisées.
* Si l'administrateur modifie la stratégie à laquelle appartient l'appareil, les options du client seront synchronisées.

## Modifier les stratégies

Au bas de la stratégie, cliquez sur `Modifier`, effectuez des modifications et cliquez sur `Soumettre`. La stratégie sera synchronisée avec les appareils dans les 30 secondes.
