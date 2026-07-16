---
title: Journaux d’audit
weight: 19
description: "Utilisez les journaux d’audit dans la console web RustDesk Server Pro pour consulter les événements de connexion, de transfert de fichiers, d’opérations de console et d’alarme."
keywords: ["rustdesk audit logs", "rustdesk server pro logs", "rustdesk connection logs", "rustdesk file transfer logs", "rustdesk alarm logs", "rustdesk console audit"]
---

Les journaux d’audit dans la console web RustDesk Server Pro aident les administrateurs à consulter l’activité d’accès à distance, les transferts de fichiers, les changements administratifs et les alarmes de sécurité.

Ouvrez la console web, puis allez dans **Journaux** dans le menu de gauche. La section Journaux contient :

- **Connexion**
- **Fichier**
- **Console**
- **Alarme**

## Journaux des connexions

Allez dans **Journaux > Connexion** pour consulter les sessions distantes et les types de connexion associés.

Les journaux des connexions affichent :

- **Type** : Bureau à distance, Transfert de fichiers, Transfert de port, Voir la caméra, Terminal ou Non connecté. **Non connecté** signifie que l’authentification n’a pas réussi.
- **Appareil contrôlé** : l’ID et le nom de l’appareil cible.
- **Côté contrôleur** : l’utilisateur contrôleur lorsque le côté contrôleur est connecté, ainsi que l’appareil contrôleur, le nom de l’appareil et l’adresse IP.
- **Heure de début**, **Heure de fin** et **Durée**.
- **Authentification** : méthode d’authentification principale, éventuellement suivie d’informations 2FA.
- **Note**.

![Page des journaux des connexions](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/connection-log-page.png)

Les valeurs d’authentification principale prises en charge incluent :

- Confirmation par clic
- Mot de passe à usage unique
- Mot de passe permanent
- Inverser les côtés

Les valeurs 2FA prises en charge incluent :

- Code 2FA
- Appareil de confiance

### Notes de connexion

Le côté contrôleur peut ajouter une note à une connexion de deux façons :

- Pendant une session distante, utilisez l’action **Note** dans le menu distant pour ajouter ou modifier la note de connexion.

![Zone de note de connexion](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/note-box.png)

- À la fin d’une session distante, activez **Paramètres > Général > Autre > Demander une note à la fin de la connexion** côté contrôleur si vous voulez que RustDesk demande une note lorsque la session se termine.

![Zone de note de fin de connexion](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/close-conn-note-box.png)

La note est affichée dans la colonne **Note** de **Journaux > Connexion**. Les utilisateurs qui peuvent consulter le journal de connexion peuvent aussi utiliser le bouton de modification dans la colonne **Note** pour mettre à jour la note depuis la console web.

### Déconnecter une connexion en cours

Si une connexion est encore active et que votre compte a l’autorisation de modifier cet élément d’audit, la colonne **Action** affiche **Déconnecter**. Cliquez dessus et confirmez l’opération pour terminer la connexion en cours.

![Confirmation de déconnexion](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/disconnect-confirm.png)

Après la déconnexion depuis la console web, le côté contrôleur voit un message indiquant que la connexion a été déconnectée depuis la console web.

![Message déconnecté par la console](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/disconnected-by-console.png)

## Journaux des transferts de fichiers

Allez dans **Journaux > Fichier** pour consulter l’activité de transfert de fichiers.

![Page des journaux de transfert de fichiers](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/file-transfer-logs.png)

Les journaux de transfert de fichiers incluent les opérations de fichiers issues des sessions dédiées de **Transfert de fichiers** ainsi que le copier/coller de fichiers pendant les sessions de **Bureau à distance**.

Les journaux de transfert de fichiers affichent :

- **Appareil contrôlé**.
- **Côté contrôleur** : l’appareil contrôleur et, si disponible, l’utilisateur contrôleur.
- **Temps**.
- **Direction** :
  - Appareil contrôlé -> Côté contrôleur
  - Côté contrôleur -> Appareil contrôlé
- **Fichier** : le chemin sur l’appareil contrôlé.
- **Détails** : taille du fichier pour un seul fichier, ou nombre de fichiers pour les transferts de plusieurs fichiers.

Pour les transferts de plusieurs fichiers, cliquez sur le nombre de fichiers dans la colonne **Détails** pour ouvrir le panneau de détails. Lorsque le transfert contient plus de fichiers que le panneau n’en liste, le panneau affiche les 10 plus gros fichiers par taille.

![Détails du transfert de fichiers](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/file-transfer-details.png)

## Journaux d’alarme

Allez dans **Journaux > Alarme** pour consulter les événements liés à la sécurité.

![Page des journaux d’alarme](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/alarm-logs.png)

Les journaux d’alarme affichent :

- **Type**.
- **Depuis** : pour les alarmes de compte de connexion, il s’agit de l’appareil de connexion. Pour les alarmes de connexion distante, il s’agit du côté contrôleur.
- **Cible** : pour les alarmes de compte de connexion, il s’agit du compte de connexion. Pour les alarmes de connexion distante, il s’agit de l’appareil contrôlé.
- **Heure de l’événement**.

Les types d’alarme de connexion distante incluent :

- Tentative d’accès depuis une IP hors liste blanche
- Plus de 30 tentatives d’accès consécutives
- Plusieurs tentatives d’accès en une minute
- Trop de tentatives d’accès consécutives depuis un seul préfixe IPv6
- Plusieurs échecs de connexion au Terminal (Exécuter en tant qu’administrateur) (nom d’utilisateur/mot de passe incorrect)
- Plusieurs tentatives de connexion simultanées au Terminal (Exécuter en tant qu’administrateur)
- Violation du périmètre de session

Les types d’alarme de compte de connexion incluent :

- Plus de 30 tentatives de connexion consécutives
- Plusieurs tentatives de connexion en une minute
- Plusieurs tentatives de connexion en une heure

## Journaux des opérations de console

Allez dans **Journaux > Console** pour consulter les actions effectuées dans la console web.

![Page des journaux des opérations de console](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/console-logs.png)

Les journaux de console affichent :

- **Type**.
- **Utilisateur** : l’utilisateur de la console web qui a effectué l’opération.
- **Opération** : l’action spécifique.
- **Temps**.
- **Détails** : champs supplémentaires enregistrés pour l’opération.

Les types incluent :

- Gestion des groupes
- Gestion des utilisateurs
- Gestion des appareils
- Gestion des carnets d’adresses
- Gestion des rôles admin
- Gestion des rôles de contrôle

Les opérations suivies incluent la connexion utilisateur, les changements d’utilisateur et d’appareil, la déconnexion d’un appareil, les changements de carnet d’adresses, les changements 2FA, la réinitialisation de mot de passe, les changements de rôle admin/contrôle, etc.

## Visibilité et conservation des journaux

La visibilité des journaux dépend du fait que l’utilisateur soit administrateur, qu’il ait un [rôle admin](/docs/fr/self-host/rustdesk-server-pro/admin-role/) avec des autorisations de journaux d’audit, et du réglage dans **Paramètres > Autre**.

| Type d’utilisateur ou réglage | Visibilité des journaux |
| --- | --- |
| Administrateur | Peut voir tous les journaux d’audit. |
| Rôle admin avec **Global > Audit Logs-View** | Peut voir tous les journaux d’audit, même lorsque **Seul l’administrateur peut accéder aux journaux** est activé. |
| Rôle admin avec **Individual > Audit Logs-View** | Peut voir les journaux d’audit personnels, même lorsque **Seul l’administrateur peut accéder aux journaux** est activé. Cela donne le même périmètre de journaux personnels qu’un utilisateur non administrateur normal, mais il n’est pas bloqué par ce réglage. |
| Utilisateur non administrateur sans autorisations de journaux d’audit | Peut voir les journaux d’audit personnels uniquement lorsque **Seul l’administrateur peut accéder aux journaux** est désactivé. |
| **Paramètres > Autre > Seul l’administrateur peut accéder aux journaux** activé | Les utilisateurs non administrateurs sans autorisations de journaux d’audit ne peuvent pas accéder aux journaux d’audit. |

Les journaux personnels incluent les enregistrements de connexion et de transfert de fichiers où un appareil actuellement attribué à l’utilisateur est l’appareil contrôlé ou contrôleur, ainsi que les enregistrements où l’utilisateur est le contrôleur. Pour les journaux d’alarme, les journaux personnels incluent les enregistrements des appareils attribués à l’utilisateur ou du compte de connexion de l’utilisateur. Pour les journaux des opérations de console, les journaux personnels incluent les enregistrements où l’utilisateur est l’opérateur.

Utilisez **Paramètres > Autre > Conservation des journaux (jours)** pour contrôler la durée de conservation des journaux d’audit. Saisissez `0` pour conserver tous les journaux indéfiniment. Saisissez un nombre supérieur à `0` pour supprimer automatiquement les journaux plus anciens que le nombre de jours spécifié. Le nettoyage s’exécute une fois par heure.

## Exporter les journaux d’audit

Chaque page de journaux contient **Exporter en CSV** dans la barre d’outils. Le fichier exporté respecte les filtres actuels de la page et utilise les mêmes valeurs de temps que celles affichées dans la console web. Chaque export inclut jusqu’à 1000 enregistrements, mais vous pouvez utiliser le filtre **Heure de début** pour exporter tous les journaux par lots.

Vous pouvez aussi utiliser un [jeton d’API](/docs/fr/self-host/rustdesk-server-pro/console/#audits-auditspy) avec `audits.py` pour interroger les journaux d’audit.
