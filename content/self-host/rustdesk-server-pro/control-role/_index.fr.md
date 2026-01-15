---
title: Rôle de Contrôle
weight: 18
---

Le Rôle de Contrôle vous permet de configurer les permissions de contrôle à distance pour différents utilisateurs. Lorsqu'un utilisateur contrôle à distance un autre appareil, le Rôle de Contrôle définit les opérations que l'utilisateur contrôleur est autorisé à effectuer après l'établissement d'une connexion.

{{% notice note %}}
**Rôle de Contrôle vs Contrôle d'Accès vs Stratégie**

- **Rôle de Contrôle** : Détermine les opérations que l'utilisateur contrôleur est autorisé à effectuer après l'établissement d'une connexion.
- **Contrôle d'Accès** : Détermine si une connexion peut être établie entre les appareils contrôleur et contrôlé.
- **Stratégie** : Modifie les paramètres sur l'appareil contrôlé.
{{% /notice %}}

## Exigences

- Appareil contrôlé : RustDesk **1.4.5** ou supérieur (les appareils Android contrôlés ne sont pas encore pris en charge)
- Appareil contrôleur : Aucune exigence de version

## Calcul des Permissions

### Comment Fonctionnent les Permissions

En bref : Les permissions de contrôle ont la priorité sur les paramètres locaux.

Il existe deux sources de paramètres de permission :

- **Paramètres locaux côté contrôlé** : Les paramètres de l'appareil contrôlé (Paramètres → Sécurité → Permissions)
- **Permission de Contrôle** : Les permissions du Rôle de Contrôle de l'utilisateur contrôleur (configurées dans la console web)

Chaque permission a trois états :

- **Utiliser les Paramètres Client** : Pas de remplacement, utiliser le paramètre local de l'appareil contrôlé
- **Activer** : Activer explicitement cette permission (remplace le paramètre local)
- **Désactiver** : Désactiver explicitement cette permission (remplace le paramètre local)

Les permissions sont calculées au niveau de la session :

| Permission de Contrôle | Paramètres Locaux | Résultat |
|---|---|---|
| Activer | Activer | Activer |
| Activer | Désactiver | **Activer** |
| Désactiver | Activer | **Désactiver** |
| Désactiver | Désactiver | Désactiver |
| Utiliser les Paramètres Client | Activer | Activer |
| Utiliser les Paramètres Client | Désactiver | Désactiver |

**Cas spécial : Modification de Configuration à Distance**

Lorsque plusieurs utilisateurs contrôleurs sont connectés au même appareil, la permission "Modification de Configuration à Distance" est calculée sur toutes les connexions :

| Permission de Contrôle de Toutes les Connexions | Résultat |
|---|---|
| N'importe lequel Désactiver | **Désactiver** |
| Aucun Désactiver, N'importe lequel Activer | **Activer** |
| Tous Utiliser les Paramètres Client | Utiliser le paramètre local |

### Quel Rôle s'Applique

Chaque utilisateur ne peut avoir qu'un seul Rôle de Contrôle assigné. Il existe deux rôles intégrés :

| Rôle | Description |
|------|-------------|
| **Non Connecté** | Pour les utilisateurs contrôleurs qui ne sont pas connectés. Ne peut pas être assigné aux utilisateurs. |
| **Par Défaut** | Pour les utilisateurs contrôleurs connectés qui n'ont pas de Rôle de Contrôle assigné, ou qui sont explicitement assignés au rôle Par Défaut. |

Le Rôle de Contrôle appliqué dépend du statut de connexion de l'utilisateur contrôleur et de l'assignation de rôle :

| Statut de l'Utilisateur Contrôleur | Rôle Assigné | Rôle / Statut du Rôle | Rôle de Contrôle Appliqué |
|---|---|---|---|
| Non connecté | - | Non Connecté / Activé | Non Connecté |
| Non connecté | - | Non Connecté / Désactivé | - |
| Connecté | A un rôle assigné | Rôle assigné / Activé | Rôle assigné |
| Connecté | A un rôle assigné | Rôle assigné / Désactivé | - |
| Connecté | Pas de rôle assigné | Par Défaut / Activé | Par Défaut |
| Connecté | Pas de rôle assigné | Par Défaut / Désactivé | - |

## Permissions Disponibles

Les 12 permissions contrôlables correspondent aux Paramètres → Sécurité → Permissions de l'appareil contrôlé :

- Clavier/Souris
- Imprimante à Distance
- Presse-papiers
- Transfert de Fichiers
- Audio
- Caméra
- Terminal
- Tunnel TCP
- Redémarrage à Distance
- Enregistrement de Session
- Bloquer l'Entrée Utilisateur
- Modification de Configuration à Distance

## Opérations de Console

### Créer un Rôle

1. Naviguez vers la page **Rôles de Contrôle** et cliquez sur **Créer**
2. Entrez un **Nom** pour le rôle
3. Sélectionnez les **Permissions** à accorder

![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-create-permission.png)

### Assignation de Rôle

Il existe deux façons d'assigner des Rôles de Contrôle aux utilisateurs :

1. **Page Utilisateurs** → Cliquez sur **Modifier** sur un utilisateur → Sélectionnez un rôle dans le champ **Rôle de Contrôle**
2. **Page Rôles de Contrôle** → Cliquez sur le **nombre d'utilisateurs** ou **Assigner des Utilisateurs** → Ajouter ou supprimer des utilisateurs du rôle

![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-assign-role-page.png)

{{% notice note %}}
Le rôle "Non Connecté" ne peut pas être assigné aux utilisateurs (il s'applique uniquement aux connexions non authentifiées).
{{% /notice %}}
