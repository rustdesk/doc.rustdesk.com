---
title: Rôle Administrateur
weight: 17
---

Le Rôle Administrateur permet aux administrateurs de déléguer des permissions de gestion partielles à des utilisateurs non-administrateurs. Vous pouvez définir des permissions pour les ressources globales (telles que les stratégies, les rôles de contrôle et les clients personnalisés) ainsi que pour les utilisateurs et appareils dans différentes portées.

Une fois qu'un Rôle Administrateur est attribué à un utilisateur, il verra les pages et menus correspondants dans la console web selon les permissions accordées.

## Administrateurs vs Rôles Administrateur

- Seuls les administrateurs peuvent modifier les Rôles Administrateur et attribuer des Rôles Administrateur aux utilisateurs.
- Les administrateurs ne sont pas restreints par les Rôles Administrateur, bien que des Rôles Administrateur puissent leur être attribués.
- Les utilisateurs non-admin ne peuvent pas modifier les comptes administrateur, même avec des permissions utilisateur globales accordées.

## Types de Rôle

Les Rôles Administrateur existent en trois types, chacun avec une portée et des permissions disponibles différentes.

| Type | Description |
|------|-------------|
| **Global** | Peut gérer toutes les ressources de l'équipe entière |
| **Individuel** | Ne peut gérer que les propres appareils et journaux d'audit de l'utilisateur |
| **Portée de Groupe** | Peut gérer les utilisateurs et appareils dans les groupes spécifiés |

### À propos de la Portée de Groupe

| Permissions sélectionnées | Appliqué à |
|-------|-------------|
| **Permissions Utilisateur** | S'appliquent aux utilisateurs dans les groupes d'utilisateurs sélectionnés |
| **Permissions Appareil** | S'appliquent aux appareils de : <ul><li>Groupes d'appareils sélectionnés</li><li>Appareils assignés aux utilisateurs dans les groupes d'utilisateurs sélectionnés</li><li>Appareils non assignés (si activé)</li></ul> |

Vous pouvez sélectionner uniquement les Permissions Utilisateur ou uniquement les Permissions Appareil dans un rôle de Portée de Groupe pour rendre les permissions et la portée plus claires. Par exemple, sélectionner uniquement les Permissions Utilisateur permet de gérer les utilisateurs sans accès aux appareils, tandis que sélectionner uniquement les Permissions Appareil permet de gérer les appareils en sélectionnant des groupes d'utilisateurs, des groupes d'appareils ou des appareils non assignés comme portée.

## Règles de Permissions

### Toute Permission de Modification Inclut la Permission de Visualisation Correspondante

Toute permission de modification inclut automatiquement la permission de visualisation correspondante. Par exemple, la permission "Appareils Activer/Désactiver" inclut la permission "Voir Appareils".

### La Permission de Modification N'Inclut Pas l'Attribution

Les permissions de modification pour les ressources (Groupes d'Utilisateurs, Groupes d'Appareils, Stratégies, Rôles de Contrôle) permettent uniquement de modifier les ressources elles-mêmes, pas de les assigner aux utilisateurs ou appareils.

Par exemple, la permission "Modifier Groupes d'Appareils" permet de créer et modifier des groupes d'appareils, mais pour ajouter ou retirer des appareils des groupes, vous avez besoin de la permission "Appareils Mettre à jour Groupe".

### La Permission de Visualisation N'Inclut Pas les Membres

Les permissions de visualisation pour les ressources permettent uniquement de voir les ressources elles-mêmes, pas de voir les membres qu'elles contiennent.

{{% notice note %}}
La lecture des appareils pour les carnets d'adresses n'est pas affectée par les Rôles Administrateur. L'onglet des appareils accessibles dans le client est uniquement contrôlé par **Paramètres → Autres → Désactiver la récupération des appareils accessibles** dans la console, et n'est pas non plus restreint par les Rôles Administrateur.
{{% /notice %}}

## Opérations Console

### Créer un Rôle

1. Naviguez vers la page **Rôles Administrateur** et cliquez sur **Créer**
2. Entrez un **Nom** pour le rôle
3. Sélectionnez un **Type** (pour **Portée de Groupe**, configurez également la portée)
4. Sélectionnez les **Permissions** à accorder

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-permission.png)

### Attribution de Rôles

Il y a deux façons d'attribuer des Rôles Administrateur aux utilisateurs :

1. **Page Utilisateurs** → Cliquez sur **Modifier** sur un utilisateur → Sélectionnez les rôles dans le champ **Rôles Administrateur**
2. **Page Rôles Administrateur** → Cliquez sur le **nombre d'utilisateurs** ou **Assigner Utilisateurs** → Ajouter ou retirer des utilisateurs du rôle

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-role-page.png)

{{% notice note %}}
- Un utilisateur peut avoir plusieurs Rôles Administrateur attribués. Les permissions de tous les rôles attribués sont combinées (union de toutes les permissions).
{{% /notice %}}

## Référence des Permissions

### Permissions Globales

| Permission | Description |
|------------|-------------|
| Users-View | Lire les informations de liste de tous les utilisateurs. |
| Users-Create | Créer directement des utilisateurs non-administrateurs. |
| Users-Invite | Inviter des utilisateurs par email. |
| Users-Delete | Supprimer tout utilisateur non-administrateur. Les utilisateurs doivent être désactivés avant suppression. |
| Users-Enable/Disable | Activer ou désactiver tout utilisateur non-administrateur. |
| Users-Edit Email | Modifier l'email de tout utilisateur non-administrateur. |
| Users-Edit Password | Modifier le mot de passe de tout utilisateur non-administrateur. |
| Users-Edit Note | Modifier la note de tout utilisateur non-administrateur. |
| Users-Manage 2FA | Gérer la vérification de connexion pour tout utilisateur non-administrateur. |
| Users-Force Logout | Forcer la déconnexion de tout utilisateur non-administrateur. |
| Users-Update Group | Modifier le groupe de tout utilisateur non-admin. |
| Users-Update Strategy | Modifier la stratégie de tout utilisateur non-admin. |
| Users-Update Control Role | Modifier le rôle de contrôle de tout utilisateur non-admin. |
| Devices-View | Lire les informations de liste de tous les appareils. |
| Devices-Enable/Disable | Activer ou désactiver tout appareil. |
| Devices-Delete | Supprimer tout appareil. Les appareils doivent être désactivés avant suppression. |
| Devices-Edit Info | Modifier le nom, le nom d'utilisateur système et la note de tout appareil. |
| Devices-Assign to User | Assigner tout appareil à tout utilisateur. |
| Devices-Update Group | Modifier le groupe de tout appareil. |
| Devices-Update Strategy | Modifier la stratégie de tout appareil. |
| User Groups-View | Lire les informations de liste de tous les groupes d'utilisateurs. |
| User Groups-Edit | Créer, modifier et supprimer des groupes d'utilisateurs. |
| Device Groups-View | Lire les informations de liste de tous les groupes d'appareils. |
| Device Groups-Edit | Créer, modifier et supprimer des groupes d'appareils. |
| Device Groups-Update Strategy | Modifier la stratégie de tout groupe d'appareils. |
| Audit Logs-View | Lire tous les journaux. Peut modifier les notes. |
| Audit Logs-Edit | Peut déconnecter toute connexion active. |
| Strategies-View | Lire toute stratégie. |
| Strategies-Edit | Créer, modifier et supprimer des stratégies. |
| Control Roles-View | Lire tout rôle de contrôle. |
| Control Roles-Edit | Créer, modifier et supprimer des rôles de contrôle. |
| Custom Clients-View | Lire la liste des clients personnalisés. |
| Custom Clients-Edit | Créer, modifier et supprimer des clients personnalisés. |

### Permissions Individuelles

| Permission | Description |
|------------|-------------|
| Devices-View | Lire les informations des appareils de l'utilisateur. |
| Devices-Enable/Disable | Activer ou désactiver les appareils de l'utilisateur. |
| Devices-Delete | Supprimer les appareils de l'utilisateur. |
| Devices-Edit Info | Modifier les informations des appareils de l'utilisateur. |
| Devices-Update Strategy | Modifier la stratégie des appareils de l'utilisateur. |
| Audit Logs-View | Lire les journaux personnels. |
| Audit Logs-Edit | Peut déconnecter les connexions actives personnelles. |

### Permissions de Portée de Groupe

| Permission | Description |
|------------|-------------|
| Users-View | Lire les informations des utilisateurs dans les groupes sélectionnés. |
| Users-Create | Créer des utilisateurs non-admin dans les groupes sélectionnés. |
| Users-Invite | Inviter des utilisateurs dans les groupes sélectionnés. |
| Users-Delete | Supprimer des utilisateurs non-admin dans les groupes sélectionnés. |
| Users-Enable/Disable | Activer ou désactiver des utilisateurs dans les groupes sélectionnés. |
| Users-Edit Email | Modifier l'email des utilisateurs dans les groupes sélectionnés. |
| Users-Edit Password | Modifier le mot de passe des utilisateurs dans les groupes sélectionnés. |
| Users-Edit Note | Modifier la note des utilisateurs dans les groupes sélectionnés. |
| Users-Manage 2FA | Gérer la 2FA des utilisateurs dans les groupes sélectionnés. |
| Users-Force Logout | Forcer la déconnexion des utilisateurs dans les groupes sélectionnés. |
| Users-Update Strategy | Modifier la stratégie des utilisateurs dans les groupes sélectionnés. |
| Users-Update Control Role | Modifier le rôle de contrôle des utilisateurs dans les groupes sélectionnés. |
| Devices-View | Lire les informations des appareils gérés par le rôle actuel. |
| Devices-Enable/Disable | Activer ou désactiver les appareils gérés par le rôle actuel. |
| Devices-Delete | Supprimer les appareils gérés par le rôle actuel. |
| Devices-Edit Info | Modifier les informations des appareils gérés par le rôle actuel. |
| Devices-Update Strategy | Modifier la stratégie des appareils gérés par le rôle actuel. |
