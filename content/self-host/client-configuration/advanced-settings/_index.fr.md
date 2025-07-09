---
title: Paramètres Avancés
weight: 49
---

Tous les paramètres avancés des clients personnalisés sont couverts ici.

## Niveaux de Privilège pour les Paramètres

Il existe quatre types de paramètres :

1. Paramètres de substitution, dans `Console Web` → `Clients Personnalisés`
2. Paramètres par défaut, dans `Console Web` → `Clients Personnalisés`
3. Paramètres utilisateur, dans le client RustDesk
4. Paramètres de stratégie, dans `Console Web` → `Stratégies`

La hiérarchie des privilèges pour ces paramètres est la suivante : `Substitution > Stratégie > Utilisateur > Défaut`.

## Paramètres de Sécurité

### access-mode

Définit le mode d'accès (permissions) pour les connexions entrantes.

**Emplacement** :

1. **Bureau** Paramètres → Sécurité → Permissions
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | custom, full, view | custom | `access-mode=custom` |

### enable-keyboard

Active l'entrée clavier/souris pour les connexions entrantes.

**Emplacement** :

1. **Bureau** Paramètres → Sécurité → Permissions → Activer le clavier
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-keyboard=Y` |

### enable-clipboard

Active le copier-coller pour les connexions entrantes.

**Emplacement** :

1. **Bureau** Paramètres → Sécurité → Permissions → Activer le presse-papiers
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-clipboard=Y` |

### enable-file-transfer

Active la copie-collage de fichiers ou le transfert de fichiers (session) pour les connexions entrantes.

**Emplacement** :

1. **Bureau** Paramètres → Sécurité → Permissions → Activer le transfert de fichiers
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-file-transfer=Y` |

### enable-camera

Active la caméra pour les connexions entrantes.

**Emplacement** :

1. **Bureau** Paramètres → Sécurité → Permissions → Activer la caméra
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-camera=Y` |

### enable-terminal

Activer le terminal pour les connexions entrantes.

**Emplacement**:

**Poste de travail** Paramètres → Sécurité → Autorisations → Activer le terminal

| Installation requise | Valeurs | Par défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-terminal=Y` |

### enable-remote-printer

Active l'imprimante distante pour les connexions entrantes.

**Emplacement** :

1. **Windows** Paramètres → Sécurité → Permissions → Activer l'imprimante distante

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-printer=Y` |

### enable-audio

Active l'enregistrement audio et le transfert vers le pair.

**Emplacement** :

1. **Bureau** Paramètres → Sécurité → Permissions → Activer l'audio
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-audio=Y` |

### enable-tunnel

Active le tunneling TCP.

**Emplacement** :

1. **Bureau** Paramètres → Sécurité → Permissions → Activer le tunneling TCP
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-tunnel=Y` |

### enable-remote-restart

Active le redémarrage par le côté contrôleur.

**Emplacement** :

1. **Bureau** Paramètres → Sécurité → Permissions → Activer le redémarrage distant
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-restart=Y` |

### enable-record-session

Active l'enregistrement des sessions.

**Emplacement** :

1. **Bureau** Paramètres → Sécurité → Permissions → Activer l'enregistrement de session
2. **Mobile** Paramètres → Partage d'écran → Activer l'enregistrement de session

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-record-session=Y` |

### enable-block-input

Active le côté contrôleur pour bloquer les entrées d'autres utilisateurs.

**Emplacement** :

1. **Bureau** Paramètres → Sécurité → Permissions → Activer le blocage des entrées utilisateur (Windows uniquement)
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-block-input=Y` |

### allow-remote-config-modification

Permet au côté contrôleur de modifier les paramètres dans l'interface utilisateur RustDesk contrôlée.

**Emplacement** :

1. **Bureau** Paramètres → Sécurité → Permissions → Activer la modification de configuration distante
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remote-config-modification=Y` |

### enable-lan-discovery

Permet aux pairs LAN de me découvrir.

Après la découverte LAN, [WOL](https://en.wikipedia.org/wiki/Wake-on-LAN) peut fonctionner s'il est pris en charge localement.

**Emplacement** :

1. **Bureau** Paramètres → Sécurité → Sécurité → Refuser la découverte LAN
2. **Mobile** Paramètres → Partage d'écran → Refuser la découverte LAN

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| Y | Y, N | Y | `enable-lan-discovery=Y` |

### direct-server

Active l'accès IP direct.

**Emplacement** :

1. **Bureau** Paramètres → Sécurité → Sécurité → Activer l'accès IP direct
2. **Mobile** Paramètres → Partage d'écran → Accès IP direct

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `direct-server=Y` |

### direct-access-port

Port d'accès IP direct.

**Emplacement** :

1. **Bureau** Paramètres → Sécurité → Sécurité → Port d'accès IP direct (Affiché si "Activer l'accès IP direct" est coché)
2. **Mobile** Paramètres → Partage d'écran → Accès IP direct

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N |  | 21118 | `direct-access-port=21118` |

### whitelist

Utilise la liste blanche IP.

**Emplacement** :

1. **Bureau** Paramètres → Sécurité → Sécurité → Utiliser la liste blanche IP
2. **Mobile** Paramètres → Partage d'écran → Utiliser la liste blanche IP

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | `,` ou `<ip1>,<ip2>,<ip3>` | `,` signifie aucun filtre | `whitelist=,` |

### allow-auto-disconnect & auto-disconnect-timeout

Ferme automatiquement les sessions entrantes après une période d'inactivité utilisateur.

**Emplacement** :

1. **Bureau** Paramètres → Sécurité → Sécurité → Fermer automatiquement les sessions entrantes lors d'inactivité utilisateur
2. **Mobile** Paramètres → Partage d'écran → Fermer automatiquement les sessions entrantes lors d'inactivité utilisateur

| Option | Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: | :------: |
| allow-auto-disconnect | N | Y, N | N | `allow-auto-disconnect=Y` |
| auto-disconnect-timeout | N | Délai en minutes | 10 | `auto-disconnect-timeout=10` |

### allow-only-conn-window-open

Autorise uniquement la connexion si la fenêtre RustDesk est ouverte.

**Emplacement** :

1. **Bureau** Paramètres → Sécurité → Sécurité → Autoriser uniquement la connexion si la fenêtre RustDesk est ouverte
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-only-conn-window-open=N` |

### approve-mode

Accepte les connexions entrantes via mot de passe ou clic manuel.

**Emplacement** :

1. **Bureau** Paramètres → Sécurité → Mot de passe → Menu déroulant
2. **Mobile** Partage d'écran → Menu déroulant en haut à droite

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | password, click, password-click | password-click | `approve-mode=password-click` |

### verification-method

Quel type de mot de passe peut être utilisé, `mot de passe temporaire` fait référence au mot de passe aléatoire unique.

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | use-temporary-password, use-permanent-password, use-both-passwords | use-both-passwords | `verification-method=use-permanent-password` |

### temporary-password-length

1. **Poste de travail** Paramètres → Sécurité → Mot de passe → Longueur du mot de passe à usage unique
2. **Mobile** Partager l'écran → Menu déroulant dans le coin supérieur droit → Longueur du mot de passe à usage unique

La longueur du mot de passe temporaire.

| Installation requise | Valeurs | Par défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | 6, 8, 10 | 6 | `temporary-password-length=6` |

### proxy-url

L'URL du proxy.

Prend actuellement en charge `http` et `socks5`.

**Emplacement** :

1. **Bureau** Paramètres → Réseau → Proxy → Proxy Socks5/Http(s)
2. **Mobile**

Exemples :

1. **http** `proxy-url=http://192.168.0.2:12345`
2. **https** `proxy-url=https://192.168.0.2:12345`
3. **socks5** `proxy-url=socks5://192.168.0.2:1080`

### proxy-username & proxy-password

Nom d'utilisateur et mot de passe du proxy.

**Emplacement** :

1. **Bureau** Paramètres → Réseau → Proxy → Proxy Socks5/Http(s)
2. **Mobile**

| Option | Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: | :------: |
| proxy-username | N | | | `proxy-username=user` |
| proxy-password | N | | | `proxy-password=pass` |

## Paramètres Généraux

### theme

Contrôle le thème de l'interface utilisateur du client RustDesk.

**Emplacement** :

1. **Bureau** Paramètres → Général → Thème
2. **Mobile** Paramètres → Paramètres → Thème

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | dark, light, system | system | `theme=system` |

### lang

Contrôle la langue du client RustDesk.

**Emplacement** :

1. **Bureau** Paramètres → Général → Langue
2. **Mobile** Paramètres → Paramètres → Langue

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | default, ar, bg, ... | default | `lang=default` |

Les langues actuellement disponibles sont :

ar, bg, ca, cs, da, de, el, en, eo, es, et, fa, fr, he, hr, hu, id, it, ja, ko, kz, lt, lv, nb, nl, pl, pt, ro, ru, sk, sl, sq, sr, sv, th, tr, uk, vn, zh-cn, zh-tw

Vous pouvez vérifier [LANGS](https://github.com/rustdesk/rustdesk/blob/master/src/lang.rs#L45) dans le code pour la liste des langues la plus récente.

### allow-auto-record-incoming

Enregistre automatiquement les sessions entrantes.

**Emplacement** :

1. **Bureau** Paramètres → Général → Enregistrement → Enregistrer automatiquement les sessions entrantes
2. **Mobile** Paramètres → Enregistrement → Enregistrer automatiquement les sessions entrantes

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-incoming=Y` |

### allow-auto-record-outgoing

Enregistre automatiquement les sessions sortantes.

**Emplacement** :

1. **Bureau** Paramètres → Général → Enregistrement → Enregistrer automatiquement les sessions sortantes
2. **Mobile** Paramètres → Enregistrement → Enregistrer automatiquement les sessions sortantes

| Installation requise | Valeurs | Défaut | Exemple | Version |
| :------: | :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-outgoing=Y` | >= 1.3.2 |

### video-save-directory

Le répertoire pour sauvegarder les vidéos enregistrées.

**Emplacement** :

1. **Bureau** Paramètres → Général → Enregistrement → Répertoire de sauvegarde vidéo
2. **Mobile** Paramètres → Enregistrement

Valeurs par défaut :

1. **macOS** ~/Movies/**app_name**
2. **Linux** ~/Videos/**app_name**
3. **Windows** %USERPROFILE%\Videos\\**app_name**
4. **Android** /Storage/emulated/0/**app_name**/ScreenRecord

**Note** : Remplacez **app_name** par le nom actuel de l'application.

### enable-confirm-closing-tabs

Contrôle s'il faut afficher une boîte de dialogue de confirmation avant de fermer tous les onglets distants.

**Emplacement** :

1. **Bureau** Paramètres → Général → Autre → Confirmer avant de fermer plusieurs onglets
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-confirm-closing-tabs=Y` |

### enable-abr

Active le débit adaptatif.

**Emplacement** :

1. **Bureau** Paramètres → Général → Autre → Débit adaptatif
2. **Mobile** Paramètres → Partage d'écran → Débit adaptatif (bêta)

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-abr=Y` |

### allow-remove-wallpaper

Supprime le fond d'écran pendant les sessions entrantes.

**Emplacement** :

1. **Bureau** Paramètres → Général → Autre → Supprimer le fond d'écran pendant les sessions entrantes
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remove-wallpaper=N` |

### enable-open-new-connections-in-tabs

Contrôle s'il faut utiliser un nouvel onglet ou une nouvelle fenêtre pour ouvrir une nouvelle connexion.

**Emplacement** :

1. **Bureau** Paramètres → Général → Autre → Ouvrir la connexion dans un nouvel onglet
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-open-new-connections-in-tabs=Y` |

### allow-always-software-render

Utilise toujours le rendu logiciel.

**Emplacement** :

1. **Bureau** Paramètres → Général → Autre → Toujours utiliser le rendu logiciel
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-always-software-render=N` |

### allow-linux-headless

Autorise la connexion entrante s'il n'y a pas d'écrans.

Cette option nécessite un environnement de bureau, un serveur Xorg et GDM, voir [PR 3902](https://github.com/rustdesk/rustdesk/pull/3902).

**Emplacement** :

1. **Bureau** Paramètres → Général → Autre → Autoriser Linux headless
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-linux-headless=N` |

### enable-hwcodec

Active l'encodage matériel pour rendre l'image plus fluide.

**Emplacement** :

1. **Bureau**
2. **Mobile** Paramètres → Codec matériel

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-hwcodec=Y` |

### peer-card-ui-type

Contrôle la vue des cartes de pairs, inclut "Grandes tuiles", "Petites tuiles" et "Liste".

**Emplacement** :

1. **Bureau** Accueil → Panneau de pairs → Icône de grille en haut à droite
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | 0, 1, 2 | 0 | `peer-card-ui-type=0` |

**0** Grandes tuiles  
**1** Petites tuiles  
**2** Liste

### peer-sorting

Contrôle l'ordre des cartes de pairs.

**Emplacement** :

1. **Bureau** Accueil → Panneau de pairs → Icône de tri en haut à droite
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Remote ID, Remote Host, Username | Remote ID | `peer-sorting=Remote ID` |

### sync-ab-with-recent-sessions

Contrôle s'il faut synchroniser le carnet d'adresses avec les sessions récentes.

**Emplacement** :

1. **Bureau** Accueil → Panneau de pairs → Carnet d'adresses → Tags → Menu déroulant → Synchroniser avec les sessions récentes
2. **Mobile** Accueil → Panneau de pairs → Carnet d'adresses → Tags → Menu déroulant → Synchroniser avec les sessions récentes

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-with-recent-sessions=N` |

### sync-ab-tags

Contrôle s'il faut trier les tags du carnet d'adresses.

**Emplacement** :

1. **Bureau** Accueil → Panneau de pairs → Carnet d'adresses → Tags → Menu déroulant → Trier les tags
2. **Mobile** Accueil → Panneau de pairs → Carnet d'adresses → Tags → Menu déroulant → Trier les tags

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-tags=N` |

### filter-ab-by-intersection

Filtre le carnet d'adresses par intersection de tags.

**Aperçu** : [PR #5985](https://github.com/rustdesk/rustdesk/pull/5985)

**Emplacement** :

1. **Bureau** Accueil → Panneau de pairs → Carnet d'adresses → Tags → Menu déroulant → Filtrer par intersection
2. **Mobile** Accueil → Panneau de pairs → Carnet d'adresses → Tags → Menu déroulant → Filtrer par intersection

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `filter-ab-by-intersection=N` |

### use-texture-render

**Emplacement**:

**Poste de travail** Paramètres → Général → Autre → Utiliser le rendu de texture

Utilisez le rendu de texture pour rendre les images plus fluides. Vous pouvez essayer de désactiver cette option si vous rencontrez des problèmes de rendu. Uniquement disponible sur le poste de travail.

| Valeurs | Par défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | linux:Y, macOS:N, win7:N, win10+:Y | `use-texture-render=Y` |

### enable-udp-punch

**Emplacement**:

**Poste de travail** Paramètres → Général → Autre → Activer la perforation UDP
**Mobile** Paramètres → Activer la perforation UDP

Disponible depuis RustDesk 1.4.1, RustDesk Server Pro 1.6.2

| Valeurs | Par défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | Y | `enable-udp-punch=N` |

### enable-ipv6-punch

**Emplacement**:

**Poste de travail** Paramètres → Général → Autre → Activer la connexion P2P IPv6
**Mobile** Paramètres → Général → Autre → Activer la connexion P2P IPv6

Disponible depuis RustDesk 1.4.1, RustDesk Server Pro 1.6.2

| Valeurs | Par défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | auto-hébergement:N, sinon:Y | `enable-ipv6-punch=N` |

## Paramètres d'Affichage

### view-only

Cette option définira l'option "vue seule" pour chaque pair après la première connexion.

Ensuite, l'option "vue seule" dans les paramètres de chaque pair contrôlera si la connexion est en vue seule.

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Autres options par défaut → Mode de vue
2. **Mobile** Paramètres → Paramètres d'affichage → Autres options par défaut → Mode de vue

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `view-only=Y` |

### show-monitors-toolbar

Contrôle s'il faut afficher les moniteurs dans la barre d'outils.

![show-monitors-toolbar](/docs/en/self-host/client-configuration/advanced-settings/images/show-monitors-toolbar.png)

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Autres options par défaut → Afficher la barre d'outils des moniteurs
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-monitors-toolbar=Y` |

### collapse-toolbar

Contrôle si la barre d'outils distante est repliée après la connexion.

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Autres options par défaut → Replier la barre d'outils
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `collapse-toolbar=Y` |

### show-remote-cursor

Cette option définira l'option "afficher le curseur distant" pour chaque pair après la première connexion.

Ensuite, l'option "afficher le curseur distant" dans les paramètres de chaque pair contrôlera si le curseur distant est affiché dans la page de contrôle distant.

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Autres options par défaut → Afficher le curseur distant
2. **Mobile** Paramètres → Paramètres d'affichage → Autres options par défaut → Afficher le curseur distant

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-remote-cursor=N` |

### follow-remote-cursor

Cette option définira l'option "suivre le curseur distant" pour chaque pair après la première connexion.

Ensuite, l'option "suivre le curseur distant" dans les paramètres de chaque pair contrôlera s'il faut suivre le curseur distant.

**Aperçu** : [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Autres options par défaut → Suivre le curseur distant
2. **Mobile** Paramètres → Paramètres d'affichage → Autres options par défaut → Suivre le curseur distant

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-cursor=Y` |

### follow-remote-window

Cette option définira l'option "suivre la fenêtre distante" pour chaque pair après la première connexion.

Ensuite, l'option "suivre la fenêtre distante" dans les paramètres de chaque pair contrôlera s'il faut suivre la fenêtre distante.

**Aperçu** : [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Autres options par défaut → Suivre le focus de la fenêtre distante
2. **Mobile** Paramètres → Paramètres d'affichage → Autres options par défaut → Suivre le focus de la fenêtre distante

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-window=Y` |

### zoom-cursor

Cette option définira l'option "zoom curseur" pour chaque pair après la première connexion.

L'option "zoom curseur" dans les paramètres de chaque pair contrôlera ensuite si le curseur est mis à l'échelle selon l'échelle d'image actuelle.

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Autres options par défaut → Zoom curseur
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `zoom-cursor=Y` |

### show-quality-monitor

Cette option définira l'option "afficher le moniteur de qualité" pour chaque pair après la première connexion.

L'option "afficher le moniteur de qualité" dans les paramètres de chaque pair contrôlera ensuite s'il faut afficher le moniteur de qualité.

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Autres options par défaut → Afficher le moniteur de qualité
2. **Mobile** Paramètres → Paramètres d'affichage → Autres options par défaut → Afficher le moniteur de qualité

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-quality-monitor=Y` |

### disable-audio

Cette option définira l'option "désactiver l'audio" pour chaque pair après la première connexion.

L'option "désactiver l'audio" dans les paramètres de chaque pair contrôlera ensuite s'il faut jouer le son.

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Autres options par défaut → Muet
2. **Mobile** Paramètres → Paramètres d'affichage → Autres options par défaut → Muet

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-audio=Y` |

### enable-file-copy-paste

Cette option définira l'option "activer la copie-colle de fichier" pour chaque pair après la première connexion.

L'option "activer la copie-colle de fichier" dans les paramètres de chaque pair contrôlera ensuite s'il faut activer la copie et le collage de fichiers dans la connexion.

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Autres options par défaut → Activer la copie et le collage de fichiers (Windows uniquement)
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `enable-file-copy-paste=Y` |

### disable-clipboard

Cette option définira l'option "désactiver le presse-papiers" pour chaque pair après la première connexion.

L'option "désactiver le presse-papiers" dans les paramètres de chaque pair contrôlera ensuite s'il faut activer la copie et le collage de texte.

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Autres options par défaut → Désactiver le presse-papiers
2. **Mobile** Paramètres → Paramètres d'affichage → Autres options par défaut → Désactiver le presse-papiers

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-clipboard=Y` |

### lock-after-session-end

Cette option définira l'option "verrouiller après la fin de session" pour chaque pair après la première connexion.

L'option "verrouiller après la fin de session" dans les paramètres de chaque pair contrôlera ensuite s'il faut verrouiller la machine pair après la fin de la session.

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Autres options par défaut → Verrouiller après la fin de session
2. **Mobile** Paramètres → Paramètres d'affichage → Autres options par défaut → Verrouiller après la fin de session

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `lock-after-session-end=Y` |

### privacy-mode

Cette option définira l'option "mode privé" pour chaque pair après la première connexion.

L'option "mode privé" dans les paramètres de chaque pair contrôlera ensuite s'il faut utiliser le mode privé après la connexion.

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Autres options par défaut → Mode privé
2. **Mobile** Paramètres → Paramètres d'affichage → Autres options par défaut → Mode privé

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `privacy-mode=Y` |

### touch-mode

Cette option définira l'option "mode tactile" pour chaque pair après la première connexion.

L'option "mode tactile" dans les paramètres de chaque pair contrôlera ensuite s'il faut utiliser le mode tactile ou le mode souris.

**Emplacement** :

1. **Bureau**
2. **Mobile** Paramètres → Paramètres d'affichage → Autres options par défaut → Mode tactile

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `touch-mode=Y` |

### i444

Cette option définira l'option "i444" pour chaque pair après la première connexion.

L'option "i444" dans les paramètres de chaque pair contrôlera ensuite s'il faut utiliser la vraie couleur.

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Autres options par défaut → Vraie couleur (4:4:4)
2. **Mobile** Paramètres → Paramètres d'affichage → Autres options par défaut → Vraie couleur (4:4:4)

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `i444=Y` |

### reverse-mouse-wheel

Cette option définira l'option "inverser la molette de souris" pour chaque pair après la première connexion.

L'option "inverser la molette de souris" dans les paramètres de chaque pair contrôlera ensuite s'il faut inverser la molette de souris.

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Autres options par défaut → Inverser la molette de souris
2. **Mobile** Paramètres → Paramètres d'affichage → Autres options par défaut → Inverser la molette de souris

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `reverse-mouse-wheel=Y` |

### swap-left-right-mouse

Cette option définira l'option "échanger les boutons gauche-droit de la souris" pour chaque pair après la première connexion.

L'option "échanger les boutons gauche-droit de la souris" dans les paramètres de chaque pair contrôlera ensuite s'il faut échanger les boutons gauche-droit de la souris.

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Autres options par défaut → Échanger les boutons gauche-droit de la souris
2. **Mobile** Paramètres → Paramètres d'affichage → Autres options par défaut → Échanger les boutons gauche-droit de la souris

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `swap-left-right-mouse=Y` |

### displays-as-individual-windows

Cette option définira l'option "affichages comme fenêtres individuelles" pour chaque pair après la première connexion.

L'option "affichages comme fenêtres individuelles" dans les paramètres de chaque pair contrôlera ensuite s'il faut afficher les écrans comme des fenêtres individuelles.

**Aperçu** : [PR 5945](https://github.com/rustdesk/rustdesk/pull/5945)

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Autres options par défaut → Afficher les écrans comme des fenêtres individuelles
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `displays-as-individual-windows=Y` |

### use-all-my-displays-for-the-remote-session

Cette option définira l'option "use-all-my-displays-for-the-remote-session" pour chaque pair après la première connexion.

L'option "use-all-my-displays-for-the-remote-session" dans les paramètres de chaque pair contrôlera alors s'il faut utiliser tous mes affichages pour la session à distance.

**Emplacement**:

1. **Bureau** Paramètres → Affichage → Autres options par défaut → Utiliser tous mes affichages pour la session à distance
2. **Mobile** Paramètres → Paramètres d'affichage → Autres options par défaut → Utiliser tous mes affichages pour la session à distance

| Installation requise | Valeurs | Par défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `use-all-my-displays-for-the-remote-session=Y` |

### view-style

Cette option définira l'option "view-style" pour chaque pair après la première connexion.

L'option "view-style" dans les paramètres de chaque pair contrôlera ensuite le style de vue.

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Style de vue par défaut
2. **Mobile** Paramètres → Paramètres d'affichage → Style de vue par défaut

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | original, adaptive | original | `view-style=original` |

### scroll-style

Cette option définira l'option "style de défilement" pour chaque pair après la première connexion.

L'option "style de défilement" dans les paramètres de chaque pair contrôlera ensuite le style de défilement.

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Style de défilement par défaut
2. **Mobile**

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | scrollauto, scrollbar | scrollauto | `scroll-style=scrollauto` |

### image-quality

Cette option définira l'option "qualité d'image" pour chaque pair après la première connexion.

L'option "qualité d'image" dans les paramètres de chaque pair contrôlera ensuite la qualité d'image.

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Qualité d'image par défaut
2. **Mobile** Paramètres → Paramètres d'affichage → Qualité d'image par défaut

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | best, balanced, low, custom | balanced | `image-quality=balanced` |

### custom-image-quality

Cette option définira l'option "qualité d'image personnalisée" pour chaque pair après la première connexion.

L'option "qualité d'image personnalisée" dans les paramètres de chaque pair contrôlera ensuite la qualité d'image si "qualité d'image" est définie sur personnalisée.

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Qualité d'image par défaut → Personnalisée
2. **Mobile** Paramètres → Paramètres d'affichage → Qualité d'image par défaut → Personnalisée

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | [10.0, 2000.0] | 50.0 | `custom-image-quality=50` |

### custom-fps

Cette option définira l'option "fps personnalisé" pour chaque pair après la première connexion.

L'option "fps personnalisé" dans les paramètres de chaque pair contrôlera ensuite les fps si "qualité d'image" est définie sur personnalisée.

**Emplacement** :

1. **Bureau** Paramètres → Affichage → Qualité d'image par défaut → Personnalisée
2. **Mobile** Paramètres → Paramètres d'affichage → Qualité d'image par défaut → Personnalisée

| Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | [5, 120] | 30 | `custom-fps=30` |

### codec-preference

Cette option définira l'option "codec-preference" pour chaque pair après la première connexion.

L'option "codec-preference" dans les paramètres de chaque pair contrôlera alors le codec pour les images.

**Attention**: Les options autres que "vp8" et "vp9" peuvent ne pas fonctionner. Cela dépend de ce que votre machine prend en charge.

### terminal-persistent

Cette option définira l'option "terminal-persistent" pour chaque pair après la première connexion.

L'option "terminal-persistent" dans les paramètres de chaque pair contrôlera alors si les sessions de terminal sont conservées lors de la déconnexion.

**Emplacement**:

1. **Poste de travail** Paramètres → Affichage → Autres options par défaut → Conserver les sessions de terminal lors de la déconnexion
2. **Mobile** Paramètres → Paramètres d'affichage → Autres options par défaut → Conserver les sessions de terminal lors de la déconnexion

| Installation requise | Valeurs | Par défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `terminal-persistent=Y` |

### trackpad-speed

Cette option définira l'option "trackpad-speed" pour chaque pair après la première connexion.

L'option "trackpad-speed" dans les paramètres de chaque pair contrôlera alors les fps si "trackpad-speed" est défini sur personnalisé.

**Emplacement**:

1. **Poste de travail** Paramètres → Affichage → Vitesse du trackpad par défaut
2. **Mobile** Paramètres → Paramètres d'affichage → Vitesse du trackpad par défaut

| Installation requise | Valeurs | Par défaut | Exemple |
| :------: | :------: | :------: | :------: |
| N | [10, 1000] | 100 | `trackpad-speed=100` |

## Autres

### preset-address-book-name & preset-address-book-tag

Nom et tag de carnet d'adresses prédéfinis, https://github.com/rustdesk/rustdesk-server-pro/issues/257.
Vous pouvez définir preset-address-book-name uniquement si vous ne voulez pas définir de tag.
Veuillez utiliser un nom et un tag de carnet d'adresses valides sur votre page de carnet d'adresses de la console web.

| Option | Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: | :------: |
| preset-address-book-name | N | | | `preset-address-book-name=<nom du carnet d'adresses>` |
| preset-address-book-tag | N | | | `preset-address-book-tag=<nom du tag du carnet d'adresses>` |

### disable-group-panel

Désactive le panneau de groupe (à côté du panneau de carnet d'adresses, il est nommé "Appareils accessibles" depuis 1.3.8) sur le client RustDesk, https://github.com/rustdesk/rustdesk-server-pro/issues/250.

| Option | Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: | :------: |
| disable-group-panel | N | Y, N | N | `disable-group-panel=Y` |

### pre-elevate-service

Élévation automatique à l'exécution pour Windows portable, https://github.com/rustdesk/rustdesk-server-pro/issues/252.

| Option | Installation requise | Valeurs | Défaut | Exemple |
| :------: | :------: | :------: | :------: | :------: |
| pre-elevate-service | N | Y, N | N | `pre-elevate-service=Y` |

### disable-floating-window

Quand le service Android démarre, il affichera une fenêtre flottante, ce qui aide à empêcher le système de tuer le service RustDesk.

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | N | `disable-floating-window=Y` |

### floating-window-size

Quand le service Android démarre, il affichera une fenêtre flottante, ce qui aide à empêcher le système de tuer le service RustDesk. Quand la taille est inférieure à 120, la fenêtre flottante sera difficile à cliquer. Une très petite taille peut ne pas être capable de maintenir le service en arrière-plan sur certains appareils.

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| [32, 320] | 120 | `floating-window-size=120` |

### floating-window-untouchable

Par défaut, cliquer sur la fenêtre flottante fera apparaître un menu. Après l'avoir définie comme 'intouchable', cliquer ou glisser passera à travers la fenêtre flottante et sera transmis à la fenêtre sous-jacente. Après avoir été définie comme 'intouchable', la position de la fenêtre flottante ne peut pas être changée, et le système peut automatiquement définir la fenêtre flottante comme semi-transparente. Cependant, cette fonctionnalité peut ne pas fonctionner dans un petit nombre d'applications, comme l'application GitHub.

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | N | `floating-window-untouchable=Y` |

### floating-window-transparency

Les fenêtres flottantes Android ont une transparence ajustable. Si vous voulez activer mais cacher la fenêtre flottante, vous pouvez définir la transparence à 0, la fenêtre flottante sera automatiquement définie comme 'intouchable' pour faire passer les événements de clic.

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| [0, 10] | 10 | `floating-window-transparency=5` |

### floating-window-svg

Si aucune icône n'est définie pour la fenêtre flottante Android, elle affichera par défaut l'icône RustDesk.
Lors de la définition, veuillez écrire le contenu textuel du SVG en une ligne, et faites attention aux [limitations de support SVG](https://bigbadaboom.github.io/androidsvg/index.html).

| Défaut | Exemple |
| :------: | :------: |
| Icône RustDesk | `floating-window-svg=<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1717559129252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4248" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M950.857143 512c0 242.285714-196.571429 438.857143-438.857143 438.857143S73.142857 754.285714 73.142857 512 269.714286 73.142857 512 73.142857s438.857143 196.571429 438.857143 438.857143z" fill="#1296db" p-id="4249"></path></svg>` |

### keep-screen-on

Ceci est pour le côté contrôlé Android. Notez que garder l'écran allumé dépend de la fenêtre flottante.

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| never, during-controlled, service-on | during-controlled | `keep-screen-on=never` |

### enable-directx-capture

Ceci est pour le côté contrôlé Windows. Si vous ne rencontrez aucun problème, il est recommandé d'utiliser les paramètres par défaut, qui priorisent l'utilisation de DirectX pour les captures d'écran au lieu d'utiliser GDI directement.

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | Y | `enable-directx-capture=N` |

### enable-android-software-encoding-half-scale

Ceci est pour le côté contrôlé Android. Par défaut, quand la résolution est supérieure à 1200, l'encodage matériel utilise la résolution originale, tandis que l'encodage logiciel utilise la moitié de la résolution, car l'encodage logiciel est plus lent. Cette option est utilisée pour définir si l'encodage logiciel doit être mis à l'échelle à la moitié de la résolution.

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | Y | `enable-android-software-encoding-half-scale=N` |

### allow-remote-cm-modification

Contrôle s'il faut permettre au côté contrôleur de cliquer sur la fenêtre de gestion de connexion pour accepter les connexions, changer les permissions, etc.

https://github.com/rustdesk/rustdesk/issues/7425

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | N | `allow-remote-cm-modification=Y` |

### remove-preset-password-warning

Contrôle s'il faut supprimer l'avertissement de sécurité sur l'interface graphique quand il y a un mot de passe prédéfini dans le client personnalisé.

https://github.com/rustdesk/rustdesk-server-pro/discussions/286

https://github.com/rustdesk/rustdesk/discussions/7956

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | Y | `remove-preset-password-warning=Y` |

### hide-security-settings / hide-network-settings / hide-server-settings / hide-proxy-settings / hide-websocket-settings / hide-remote-printer-settings

Contrôle s'il faut cacher certains paramètres. Veuillez vous assurer que `Désactiver les paramètres` est désactivé, sinon ceux-ci ne fonctionneront pas.

https://github.com/rustdesk/rustdesk-server-pro/issues/263

https://github.com/rustdesk/rustdesk-server-pro/issues/276

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | N | `hide-security-settings=Y` |

### hide-username-on-card

Contrôle s'il faut afficher le nom d'utilisateur dans la liste des appareils. Parce que parfois, le nom d'utilisateur est trop long, il cachera les autres infos.

https://github.com/rustdesk/rustdesk-server-pro/issues/284#issuecomment-2216521407

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | N | `hide-username-on-card=Y` |

### hide-help-cards

Contrôle s'il faut afficher les avertissements UAC / permission sur l'interface graphique.

https://github.com/rustdesk/rustdesk/issues/8687

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | N | `hide-help-cards=Y` |

### display-name

Change votre nom d'affichage qui sera affiché dans la popup quand vous vous connectez à un appareil distant. Par défaut, il affiche d'abord le nom de l'utilisateur connecté, sinon il affiche votre nom d'utilisateur OS.

https://github.com/rustdesk/rustdesk-server-pro/issues/277

### disable-udp

Contrôle s'il faut utiliser TCP uniquement. Il n'utilisera plus UDP 21116, TCP 21116 sera utilisé à la place.

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | N | `disable-udp=Y` |

### preset-user-name / preset-strategy-name / preset-device-group-name

Assigne utilisateur / stratégie / groupe d'appareils à l'appareil. Vous pouvez aussi faire cela via [ligne de commande](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/#assign-device-usersgroupsstrategies-to-devices).

https://github.com/rustdesk/rustdesk-server-pro/discussions/304

le groupe d'appareils est disponible dans le client RustDesk >=1.3.8, pro >= 1.5.0

### default-connect-password

Vous utilisez le `mot de passe de connexion par défaut` pour établir des connexions aux appareils distants. Ce mot de passe est configuré du côté contrôleur et ne doit pas être confondu avec un [mot de passe prédéfini](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-can-we-set-up-a-client-with-a-fixed-password-for-unattended-remote-access) trouvé sur le client contrôlé (entrant uniquement).

par ex. `default-connect-password=abcd1234`

### enable-trusted-devices

Permet aux appareils de confiance d'ignorer la vérification 2FA.

https://github.com/rustdesk/rustdesk/discussions/8513#discussioncomment-10234494

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | Y | `enable-trusted-devices=N` |

### hide-tray

Désactive l'icône de la barre d'état dans la barre système.

https://github.com/rustdesk/rustdesk-server-pro/issues/332

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | N | `hide-tray=Y` |

### one-way-clipboard-redirection

Désactive la synchronisation du presse-papiers du côté contrôlé vers le côté contrôleur, disponible dans le client RustDesk >=1.3.1 (côté contrôlé)

https://github.com/rustdesk/rustdesk/discussions/7837

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | N | `one-way-clipboard-redirection=Y` |

### one-way-file-transfer

Désactive le transfert de fichiers du côté contrôlé vers le côté contrôleur, disponible dans le client RustDesk >=1.3.1 (côté contrôlé)

https://github.com/rustdesk/rustdesk/discussions/7837

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | N | `one-way-file-transfer=Y` |

### sync-init-clipboard

Si synchroniser le presse-papiers initial lors de l'établissement de la connexion (uniquement du côté contrôleur vers le côté contrôlé), disponible dans le client RustDesk >=1.3.1 (côté contrôleur)

https://github.com/rustdesk/rustdesk/discussions/9010

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | N | `sync-init-clipboard=Y` |

### allow-logon-screen-password

Si permettre la saisie de mot de passe sur l'écran de connexion quand le [mode d'approbation par clic uniquement](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#approve-mode) est utilisé, disponible dans le client RustDesk >=1.3.1 (côté contrôlé)

https://github.com/rustdesk/rustdesk/discussions/9269

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | N | `allow-logon-screen-password=Y` |

### allow-https-21114

Typiquement, HTTPS utilise le port 443. Quand le port du serveur API est incorrectement défini sur 21114, le client RustDesk supprimera par défaut le paramètre de port 21114. Définir l'option sur Y permet l'utilisation de 21114 comme port HTTPS. Disponible dans le client RustDesk >=1.3.9.

https://github.com/rustdesk/rustdesk-server-pro/discussions/570

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | N | `allow-https-21114=Y` |

### allow-d3d-render

Le rendu D3D peut obtenir des FPS élevés et réduire l'utilisation du processeur, mais l'écran de contrôle distant peut être noir sur certains appareils. Disponible dans le client RustDesk >=1.3.9, Windows uniquement.

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | N | `allow-d3d-render=Y` |

### allow-hostname-as-id

[Utilise le nom d'hôte comme id](https://github.com/rustdesk/rustdesk-server-pro/discussions/483), les espaces dans le nom d'hôte sont remplacés par '-'. Ce n'est pas 100% garanti et ne se produit que la première fois que le client RustDesk est exécuté (c'est-à-dire sur un client nouvellement installé) ; si un conflit se produit, un ID aléatoire sera assigné.

Disponible dans le client RustDesk version 1.4.0 et ultérieure.

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | N | `allow-hostname-as-id=Y` |

### allow-websocket

Utilise le protocole WebSocket pour connecter le serveur et le client. Uniquement disponible dans le client RustDesk >=1.4.0 et le serveur Pro >= 1.5.7. Notez que WebSocket ne prend en charge que la connexion relais.

Pour faire fonctionner WebSocket, vous devez configurer votre proxy inverse correctement, https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | N | `allow-websocket=Y` |

### allow-numeric-one-time-password

Cette option active ou désactive l'utilisation de mots de passe à usage unique numériques uniquement.
Uniquement disponible dans le client RustDesk >=1.4.1 et le serveur Pro >= 1.5.9.

**Discussion** : https://github.com/rustdesk/rustdesk-server-pro/discussions/685

**Aperçu** : https://github.com/rustdesk/rustdesk/pull/11846

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | N | `allow-numeric-one-time-password=Y` |

### register-device

Ne pas enregistrer l'appareil, vous ne le verrez pas dans la page des appareils sur la console web.

**Uniquement disponible dans le serveur Pro >= 1.6.0 et nécessite une [licence custom2](https://rustdesk.com/pricing#custom2) et un nombre de connexions simultanées >= 2.**

Si `register-device=N`, les éléments suivants ne fonctionneront pas pour cet appareil.
- Connexion
- Commande `--assign`
- `preset-address-book-name`, `--preset-address-book-tag`, `preset-user-name`, `preset-strategy-name`, `preset-device-group-name`
- Journaux d'audit
- Stratégie

**Discussion** : https://github.com/rustdesk/rustdesk-server-pro/discussions/672 et https://github.com/rustdesk/rustdesk-server-pro/discussions/182

| Valeurs | Défaut | Exemple |
| :------: | :------: | :------: |
| Y, N | Y | `register-device=N` |