---
title: Le tout avec les actions Github
weight: 35
---

{{% notice note %}}
Cette méthode utilise les actions github, vous aurez besoin d'un compte github, la construction peut également être lente, mais cela ne nécessite aucun environnement de développement.
{{% /notice %}}

## Créer un fork du github RustDesk

A l'adresse du [Github Rustdesk](https://github.com/rustdesk/rustdesk/fork), puis cliquez sur "create fork"

## Définissez vos variables d'environnement (facultatif)

{{% notice note %}}
Vous ne devez faire cela que si vous souhaitez modifier l'URL serveur et la clé publique par défaut.

L'URL et la clé du serveur que vous utilisez sont cachées aux autres utilisateurs sur "Github", mais ils peuvent télécharger votre client et se connecter à votre serveur. Si vous avez besoin d'un dépôt entièrement privé, vous pouvez importer le dépôt du client RustDesk en utilisant https://github.com/new/import.

**Si vous utilisez un dépôt privé, vous avez un nombre limité de builds par mois, si vous en avez besoin de plus, vous devrez avoir un compte Github payant.**
{{% /notice %}}

Sur le fork que vous venez de créer allez dans "settings" -> "Secrets and Variables" -> "Actions"

Cliquez sur "New repository Secret" pour le nom mettez `RENDEZVOUS_SERVER` pour le secret mettez le nom et l'adresse IP de votre serveur.

Ensuite cliquez sur "Add Secret"

Après, cliquez sur "New repository Secret" pour le nom mettez `RS_PUB_KEY` pour le secret saisir la clé publique de votre serveur.

Enfin, cliquez sur "add Secret"

## Activer les "workflows"

Sur la page du "fork" vous venez de créer allez dans "settings" -> "Actions" -> "General"

À droite, sélectionnez "Allow all actions and reusable workflows"

Une fois les "workflows" activés, vous pouvez cliquer sur "Flutter Nightly Build" à gauche, puis sur "Run workflow" à droite, ceci lancera la création des clients RustDesk pour toutes les plates-formes prises en charge.

## Activer les autorisations de téléversement pour les "workflows"

Allez dans "settings" -> "Actions" -> "General"

Faites défiler vers le bas et sous "Workflow permissions", activez "Read and Write permissions".

## Téléchargez vos paquets construits

Une fois le processus "workflow" terminé, vous pouvez télécharger les paquets qu'il a créés.

Allez sur la page principale de votre "fork", sur la droite cliquez sur "Releases". Les paquets que vous venez de créer apparaîtront sous "Nightly" et en ouvrant la section "Assets".