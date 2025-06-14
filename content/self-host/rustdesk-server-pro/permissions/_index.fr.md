---
title: Contrôle d'accès
weight: 16
---

## Permissions d'accès aux appareils

L'appareil peut être assigné soit à un seul utilisateur, soit à un seul groupe d'appareils, soit aux deux.

Lorsque l'appareil est assigné à un utilisateur, il peut être accessible par cet utilisateur, un groupe d'utilisateurs, ou via des paramètres croisés utilisateur-groupe appropriés.

Lorsque l'appareil est assigné à un groupe d'appareils, il peut être accessible via des paramètres croisés utilisateur-groupe d'appareils appropriés.

Il y a trois façons d'assigner un appareil à un utilisateur :
- Via la page d'appareils de la console
- Se connecter au compte utilisateur spécifié côté client
- Ligne de commande d'assignation

Il y a deux façons d'assigner un appareil à un groupe d'appareils :
- Via la page d'appareils de la console
- Ligne de commande d'assignation

Les deux situations suivantes empêcheront l'appareil d'être accessible :
- Rendre l'appareil `désactivé` dans la page d'appareils de la console
- Rendre l'utilisateur `désactivé` dans la page d'utilisateurs de la console

## Paramètres d'accès aux groupes d'utilisateurs

Veuillez aller à la page des groupes dans la console web, cliquez sur `Modifier` pour éditer les paramètres croisés de groupe comme ci-dessous.

Vos modifications à `Accès avec d'autres groupes` prennent effet immédiatement sans nécessiter de cliquer sur le bouton `OK`.

`Peut accéder à` et `Peut être accessible depuis` servent presque la même fonction, nous fournissons les deux options pour votre commodité. Cependant, cela peut causer une certaine confusion.

{{% notice note %}}
L'utilisateur et le groupe assignés au côté contrôlant sont déterminés par l'utilisateur qui se connecte, plutôt que par l'utilisateur assigné depuis la console web. Nous l'avons conçu ainsi car certains côtés contrôlants n'ont pas d'ID d'appareil, comme le client iOS et le client web.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/permissions/images/crossgrp.png)

## Paramètres d'accès aux groupes d'appareils

Les groupes d'appareils fournissent une autre façon de gérer les permissions d'accès. Voici les règles clés :

1. Un appareil ne peut être ajouté qu'à un seul groupe d'appareils
2. Vous pouvez définir des permissions d'accès pour les utilisateurs ou les groupes d'utilisateurs vers les groupes d'appareils. Ces permissions sont cumulatives avec les permissions d'accès aux groupes d'utilisateurs - ce qui signifie que l'accès est accordé si les permissions du groupe d'utilisateurs ou les permissions du groupe d'appareils le permettent
3. Lorsqu'un appareil non assigné est ajouté à un groupe d'appareils, il n'est plus considéré comme "non assigné"

{{% notice note %}}
La fonctionnalité de groupe d'appareils nécessite RustDesk client >= 1.3.8 et RustDesk Server Pro >= 1.5.0
{{% /notice %}}