---
title: Élévation Windows Portable
weight: 49
description: "Documentation RustDesk sur Élévation Windows Portable. Consultez les guides d'installation, de configuration, de déploiement et de dépannage."
keywords: ["rustdesk portable elevation", "rustdesk uac", "rustdesk windows admin rights", "rustdesk task manager mouse issue", "rustdesk request elevation"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Réponse rapide

Utilisez l’élévation portable si vous exécutez le client portable RustDesk mais avez quand même besoin de droits administrateur pour certaines tâches ou actions côté machine contrôlée. C’est utile quand le client complet n’est pas installé mais qu’un support distant élevé reste nécessaire.

## Points clés

- Déterminez si l’élévation est requise au démarrage ou seulement pendant la session
- Testez les invites côté machine contrôlée et côté machine contrôlante
- Expliquez le flux d’élévation aux équipes support avant le déploiement

<!-- GEO-LOCALIZED-INTRO:END -->

Les programmes portables Windows n'ont pas les privilèges d'administrateur, ce qui peut conduire aux problèmes suivants :

- L'écran ne peut pas être transmis lorsque la fenêtre UAC (Contrôle de compte d'utilisateur) apparaît.
- Lorsqu'une fenêtre élevée, comme le Gestionnaire des tâches, apparaît, la souris devient non réactive.

En élevant les privilèges, RustDesk peut créer un processus avec des privilèges d'administrateur pendant le démarrage ou une session, lui permettant d'effectuer des captures d'écran et des opérations de souris, évitant ainsi les problèmes ci-dessus.

## Élever au démarrage

De cette façon, les utilisateurs distants n'ont pas besoin de demander l'élévation lors de la connexion. Il y a deux méthodes :

* Méthode 1 : Changer le nom du programme portable pour inclure `-qs-` ou `-qs.exe` ou `_qs.exe` (>= 1.4.6), ou se terminant par `qs.exe` (1.2.0 ~ 1.4.5). Cliquez avec le bouton gauche de la souris pour exécuter, cliquez sur `Accepter` dans la fenêtre UAC.

* Méthode 2 : Faites un clic droit et exécutez en tant qu'administrateur.

## Élever au niveau du côté contrôlé

Le côté contrôlé peut directement cliquer sur `Accepter et Élever` lors de la connexion, ou cliquer sur `Élever` lorsqu'il est déjà connecté.

| Connexion | Connecté |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/cm_unauth.jpg) | ![](/docs/en/client/windows/windows-portable-elevation/images/cm_auth.jpg) |

## Demander l'élévation au niveau du côté contrôleur

Dans le menu d’action, sélectionnez `Demander l'élévation`. Si l’utilisateur distant dispose de droits d’administrateur, choisissez `Demander à l'utilisateur distant de s'authentifier`. S’il utilise un compte Windows standard, choisissez `Transmettre le nom d'utilisateur et le mot de passe de l'administrateur` et saisissez les identifiants d’un administrateur sur l’ordinateur depuis lequel vous vous connectez. Vous pouvez le faire dès la connexion, avant de lancer une application en tant qu’administrateur. **Dans les deux cas, une personne doit répondre à l’invite UAC de RustDesk sur l’ordinateur distant.**

| Menu | Dialogue |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/menu.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/dialog.png) |
| **Attendre** | **Succès** |
| ![](/docs/en/client/windows/windows-portable-elevation/images/wait.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/success.png) |

### Invites UAC des applications et de RustDesk

Le lancement d’une application en tant qu’administrateur et l’élévation des privilèges de RustDesk déclenchent chacun une invite UAC. Si l’invite de l’application est déjà affichée lorsque vous demandez l’élévation de RustDesk, demandez à l’utilisateur distant d’y répondre en premier.

1. Dans **l’invite de l’application** (par exemple **Processeur de commandes Windows**), cliquez sur **Oui** pour la lancer en tant qu’administrateur ou sur **Non** pour annuler.
2. Dans **l’invite de `rustdesk.exe`**, cliquez sur **Oui** pour accorder les privilèges à RustDesk. Si Windows demande des identifiants d’administrateur, saisissez-les avant de confirmer.

Une fois les privilèges accordés à RustDesk, vous pouvez répondre aux invites UAC et utiliser les boutons qui nécessitent des droits d’administrateur depuis l’ordinateur de contrôle. Si l’utilisateur distant a annulé le lancement de l’application, vous pouvez la relancer en tant qu’administrateur.

### Si l’invite UAC de RustDesk redemande des identifiants

RustDesk utilise les identifiants transmis pour démarrer un processus auxiliaire sous le compte administrateur. Lorsque ce processus demande une élévation, Windows applique la stratégie **Contrôle de compte d’utilisateur : comportement de l’invite d’élévation pour les administrateurs en mode d’approbation Administrateur**. Dans la stratégie de groupe, elle se trouve sous **Configuration ordinateur → Stratégies → Paramètres Windows → Paramètres de sécurité → Stratégies locales → Options de sécurité**.

Avec le réglage **Demander des informations d’identification sur le Bureau sécurisé**, une personne doit saisir les identifiants d’un administrateur dans l’invite UAC de `rustdesk.exe` sur l’ordinateur distant, même si vous les avez déjà transmis depuis l’ordinateur de contrôle. Cela s’applique aussi si vous demandez l’élévation avant d’ouvrir une autre application. [Documentation Microsoft sur les stratégies UAC](https://learn.microsoft.com/fr-fr/windows/security/application-security/application-control/user-account-control/settings-and-configuration)

## Comment choisir

| Scénario | Méthode |
| :---: | :---: |
| Aucune élévation requise | Installer le programme |
| Aucun utilisateur disponible du côté contrôlé | Renommer<br/>*ou*<br/> Exécuter en tant qu'administrateur |
| Utilisateur disponible du côté contrôlé<br/>*et*<br/> Élévation immédiate lors de la connexion<br/>*et*<br/> Connexion par acceptation-clic | Cliquer sur `Accepter et Élever` lors de la réception de la connexion du côté contrôlé |
| Utilisateur disponible du côté contrôlé<br/>*et*<br/> Élévation selon les besoins | Cliquer sur `Élever` dans la fenêtre de gestion de connexion du côté contrôlé<br/>*ou*<br/> Demander l'élévation du côté contrôleur |