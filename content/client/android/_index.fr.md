---
title: Contrôle d'un appareil Android distant
weight: 4
---

### Partager l'écran et fichiers de votre téléphone Android
------

À partir de la version 1.1.9, le client Android permet le partage d'écran et du système de fichiers du téléphone.

- Minimum Android 6 pour le partage d'écran
- Minimum Android 10 pour partager l'audio interne du système de téléphonie mobile
- iOS ne prend pas encore en charge le partage d'écran


#### **Donner les autorisations et démarrer les services**

Cliquez sur "Partager l'écran" dans la barre de navigation inférieure

Donnez des autorisations selon vos besoins. Chaque fois que vous démarrez RustDesk, vous devrez demander à nouveau les autorisations "Capture d'écran" et "Contrôle de saisie".

![](/docs/en/client/android/images/server_off_en.jpg?width=300px)

| Autorisations | Descriptif |
| --------------- | --------------------------------------------------------- |
| Capture d'écran | Donne l'autorisation de partage d'écran, le service de surveillance sera démarré en même temps que l'application |
| Contrôle de saisie * | Permettre la saisie clavier ainsi que le contrôle de l'écran tactile virtuel avec la souris |
| Transfert de fichiers * | Donne l'autorisation de transfert de fichiers. Après le démarrage, vous pourrez contrôler à distance le système de fichiers du téléphone |
| Capture audio | Autorise le partage du son système du téléphone (pas l'entrée microphone) |

{{% notice note %}}
\* Autorisations spéciales<br/>
Pour obtenir ces autorisations, vous devez accéder à la page des paramètres système Android afin de les obtenir manuellement. Voir la suite pour plus de détails.
{{% /notice %}}

#### **Demande d'autorisation spéciale - Accès fichiers**

| La demande d'autorisations d'accès aux fichiers Android vous amènera automatiquement à la page des paramètres système |
| :---------------: |
| ![](/docs/en/client/android/images/get_file_en.jpg?width=300px) |

#### **Demande d'autorisation spéciale - contrôler le pointeur**
| Étape 1 - Recherchez Rustdesk dans la liste "Applications téléchargées" | Étape 2 - Activer "Utiliser RustDesk Input" |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/client/android/images/get_input1_en.jpg?width=300px) | ![](/docs/en/client/android/images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
La page configuration système diffère selon les constructeurs. Adaptez s'il vous plait les précédentes étapes à votre situation.
{{% /notice %}}

**Les Raccourcis pour le contrôle à distance du pointeur :**

- Clic bouton droit : retour en arrière
- Clic molette : Accueil
- Clic long molette : applications récemment ouvertes
- Défilement molette: simule un glissement vertical

#### **Démarrer le service**

Après avoir obtenu l'autorisation "capture d'écran", le service sera automatiquement démarré, ou vous pouvez également cliquer sur le bouton "Démarrer le service". Une fois le service démarré, il pourra accepter les demandes de contrôle du bureau provenant d'autres appareils.

Si l'autorisation "transfert de fichiers" est activée, le service pourra également accepter les demandes d'accès fichiers depuis d'autres appareils.

Une fois le service démarré, un identifiant unique et un mot de passe aléatoire seront automatiquement obtenus pour cet appareil. D'autres appareils peuvent contrôler le téléphone via ce couple identifiant et mot de passe, ou vous pourrez confirmer manuellement la réception d'une demande.

| Avant le lancement du service "Capture d'écran" | Après le démarrage du service "Capture d'écran" |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/client/android/images/server_off_en.jpg?width=300px) | ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. Cliquer sur "Démarrer le service" activera l'autorisation "Capture d'écran".
2. Lorsque l'autorisation de "capture d'écran" n'est pas obtenue, les autres appareils ne pourront pas émettre de demandes de contrôle.
3. À l'exception de l'autorisation "capture d'écran", le changement d'autres autorisations n'affectera que la nouvelle connexion et n'affectera pas la connexion établie. Si vous avez besoin de changer les autorisations pour une connexion établie, veuillez d'abord fermer la connexion actuelle, modifier les autorisations, puis recevoir une nouvelle demande de contrôle.
{{% /notice %}}

##### Vue PC

![](/docs/en/client/android/images/android_server_pc_side_en.png?width=700px)

##### Vue Appareil Mobile


| Vous pouvez arrêter le service ou fermer la connexion spécifiée à tout moment | Vous pouvez recevoir ou initier des chats |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) | ![](/docs/en/client/android/images/android_server2_en.jpg?width=300px) |