---
title: Élévation Windows Portable
weight: 49
---

Les programmes portables Windows n'ont pas les privilèges d'administrateur, ce qui peut conduire aux problèmes suivants :

- L'écran ne peut pas être transmis lorsque la fenêtre UAC (Contrôle de compte d'utilisateur) apparaît.
- Lorsqu'une fenêtre élevée, comme le Gestionnaire des tâches, apparaît, la souris devient non réactive.

En élevant les privilèges, RustDesk peut créer un processus avec des privilèges d'administrateur pendant le démarrage ou une session, lui permettant d'effectuer des captures d'écran et des opérations de souris, évitant ainsi les problèmes ci-dessus.

## Élever au démarrage

De cette façon, les utilisateurs distants n'ont pas besoin de demander l'élévation lors de la connexion. Il y a deux méthodes :

* Méthode 1 : Changer le nom du programme portable pour inclure `-qs-` (les versions 1.2.0, 1.2.1, 1.2.2, 1.2.3 se terminent par `qs.exe`). Cliquez avec le bouton gauche de la souris pour exécuter, cliquez sur `Accepter` dans la fenêtre UAC.

* Méthode 2 : Faites un clic droit et exécutez en tant qu'administrateur.

## Élever au niveau du côté contrôlé

Le côté contrôlé peut directement cliquer sur `Accepter et Élever` lors de la connexion, ou cliquer sur `Élever` lorsqu'il est déjà connecté.

| Connexion | Connecté |
| :---: | :---: |
| ![](images/cm_unauth.jpg) | ![](images/cm_auth.jpg) |

## Demander l'élévation au niveau du côté contrôleur

Après avoir sélectionné `Demander l'élévation` dans le menu d'action, la boîte de dialogue suivante apparaîtra. Si vous choisissez `Demander à l'utilisateur distant de s'authentifier`, vous n'aurez pas besoin de saisir un nom d'utilisateur et un mot de passe, mais l'utilisateur sur l'ordinateur distant doit avoir des privilèges d'administrateur. Si vous sélectionnez `Transmettre le nom d'utilisateur et le mot de passe de l'administrateur`, l'utilisateur sur l'ordinateur distant n'a qu'à accepter dans la fenêtre UAC. Après avoir envoyé la demande, veuillez attendre que l'utilisateur de l'autre côté accepte la fenêtre UAC. Lors de la confirmation, un message de succès apparaîtra. Notez que **les deux méthodes nécessitent que quelqu'un du côté contrôlé accepte la fenêtre UAC**. Par conséquent, s'il n'y a personne de disponible de l'autre côté, l'élévation ne devrait pas être demandée du côté contrôleur.

| Menu | Dialogue |
| :---: | :---: |
| ![](images/menu.png) | ![](images/dialog.png) |
| **Attendre** | **Succès** |
| ![](images/wait.png) | ![](images/success.png) |

## Comment choisir

| Scénario | Méthode |
| :---: | :---: |
| Aucune élévation requise | Installer le programme |
| Aucun utilisateur disponible du côté contrôlé | Renommer<br/>*ou*<br/> Exécuter en tant qu'administrateur |
| Utilisateur disponible du côté contrôlé<br/>*et*<br/> Élévation immédiate lors de la connexion<br/>*et*<br/> Connexion par acceptation-clic | Cliquer sur `Accepter et Élever` lors de la réception de la connexion du côté contrôlé |
| Utilisateur disponible du côté contrôlé<br/>*et*<br/> Élévation selon les besoins | Cliquer sur `Élever` dans la fenêtre de gestion de connexion du côté contrôlé<br/>*ou*<br/> Demander l'élévation du côté contrôleur |