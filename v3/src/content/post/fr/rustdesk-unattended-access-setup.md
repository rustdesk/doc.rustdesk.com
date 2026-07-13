---
publishDate: 2026-07-08T11:04:00Z
lang: 'fr'
translationKey: 'rustdesk-unattended-access-setup'
draft: false
title: 'Accès non surveillé RustDesk : guide de configuration'
excerpt: "Configurez correctement l'accès non surveillé de RustDesk : un mot de passe permanent, une exécution en tant que service pour qu'il démarre avec la machine, et un déploiement à grande échelle grâce à un client préconfiguré."
image: '~/assets/images/blog/rustdesk-unattended-access-setup-og.webp'
category: 'Déploiement'
tags: ['RustDesk', 'Déploiement', 'Accès sans surveillance']
author: 'RustDesk Team'
slug: 'acces-non-surveille-rustdesk-guide-de-configuration'
faq:
  - question: "Comment configurer l'accès non surveillé dans RustDesk ?"
    answer: "Deux éléments sont nécessaires : définir un mot de passe permanent dans Paramètres, Sécurité afin de ne pas avoir besoin qu'une personne approuve chaque connexion, et installer RustDesk en tant que service système afin qu'il s'exécute avant la connexion et survive à la déconnexion. Avec ces deux éléments en place, vous pouvez atteindre la machine à tout moment, y compris à l'écran de connexion, sans présence humaine."
  - question: "Pourquoi ma connexion RustDesk se coupe-t-elle lorsque l'utilisateur se déconnecte ?"
    answer: "Cela se produit lorsque RustDesk est exécuté en tant qu'exécutable portable plutôt qu'installé en tant que service. Une session portable se termine lorsque l'utilisateur se déconnecte ou qu'une invite UAC apparaît. Installez RustDesk (plutôt que d'exécuter l'exécutable portable) et laissez son service activé — le service installé démarre avec le système — afin qu'il s'exécute en arrière-plan indépendamment de tout utilisateur connecté, ce qui rend l'accès non surveillé fiable."
  - question: "L'accès non surveillé avec un mot de passe permanent est-il sûr ?"
    answer: "Il peut être déployé en toute sécurité lorsqu'il est bien configuré. Utilisez un mot de passe permanent long et unique, restreignez qui peut se connecter, activez les contrôles d'identité et d'accès disponibles, mettez à jour les clients et vérifiez les journaux. L'auto-hébergement permet de contrôler les services côté serveur et les données de déploiement stockées ; le terminal reste responsable de la protection de ses identifiants locaux."
  - question: "Puis-je déployer l'accès non surveillé de RustDesk sur de nombreux ordinateurs à la fois ?"
    answer: "Oui. Sur les plans auto-hébergés Basic et supérieurs, le générateur de client personnalisé (Custom Client Generator) produit un programme d'installation préconfiguré avec l'adresse de votre serveur, la clé et les paramètres déjà intégrés, afin que les utilisateurs finaux n'aient rien à saisir. Déployez-le avec votre outil de déploiement existant, et chaque appareil installe le service et s'enregistre automatiquement auprès de votre serveur."
  - question: "L'accès non surveillé fonctionne-t-il à l'écran de connexion Windows ?"
    answer: "Oui, une fois RustDesk installé en tant que service. Le service installé démarre avec le système avant qu'un utilisateur ne se connecte, ce qui vous permet de vous connecter à l'écran de connexion, de vous authentifier et même de déclencher un redémarrage puis de vous reconnecter. L'exécution de l'exécutable portable ne le permet pas, car celui-ci n'existe qu'au sein d'une session utilisateur."

metadata:
  description: "Configurez l'accès non surveillé de RustDesk : mot de passe permanent, exécution en tant que service pour démarrer au démarrage du système, notes spécifiques par plateforme pour Windows/macOS/Linux, et déploiement de flotte."
  keywords: 'accès non surveillé RustDesk, mot de passe permanent RustDesk, démarrage automatique RustDesk, installation du service RustDesk, configuration accès non surveillé RustDesk, déploiement RustDesk à grande échelle, accès à distance non surveillé'
---

L'accès non surveillé consiste à atteindre un ordinateur alors que personne ne se trouve devant lui — un serveur en rack, un kiosque, l'ordinateur d'un proche à l'autre bout du pays. RustDesk gère très bien ce cas de figure, à condition de configurer correctement deux éléments : un **mot de passe permanent** pour que personne n'ait à approuver chaque connexion, et RustDesk exécuté **en tant que service** afin qu'il soit disponible avant la connexion et après la déconnexion. Ce guide couvre ces deux aspects, ainsi que la manière de le déployer sur toute une flotte.

## La réponse courte

Définissez un **mot de passe permanent** (Paramètres → Sécurité) et **installez RustDesk en tant que service système** — le service installé démarre avec la machine. Le mot de passe élimine la nécessité pour une personne d'accepter l'invite ; le service permet à RustDesk de s'exécuter indépendamment de tout utilisateur connecté, afin que vous puissiez vous connecter à tout moment — y compris à l'écran de connexion. Pour un déploiement à grande échelle, générez un client préconfiguré afin que chaque machine s'installe automatiquement auprès de votre serveur.

## Étape 1 : Définir un mot de passe permanent

Par défaut, RustDesk affiche un mot de passe à usage unique, renouvelé à chaque session, qu'une personne présente à l'autre bout vous lirait à voix haute. Pour l'accès non surveillé, vous le remplacez par un identifiant fixe :

1. Ouvrez RustDesk sur la machine que vous souhaitez atteindre.
2. Accédez à **Paramètres → Sécurité** (versions plus anciennes : la zone du mot de passe sur l'écran principal).
3. Choisissez **Définir un mot de passe permanent** et saisissez une valeur forte et unique.

La [documentation client de RustDesk](https://rustdesk.com/docs/en/client/) présente cette étape comme le cœur même de l'accès non surveillé. Une règle mérite d'être soulignée : **ne réutilisez pas le mot de passe de connexion du système d'exploitation.** Utilisez pour RustDesk un mot de passe dédié à forte entropie, afin que la fuite d'un identifiant ne compromette pas l'autre.

## Étape 2 : Installer en tant que service et démarrer au démarrage du système

C'est l'étape que l'on oublie le plus souvent. Si vous vous contentez d'exécuter le fichier portable `.exe` ou `.app`, la session **se termine dès que l'utilisateur se déconnecte ou qu'une invite UAC/de permission apparaît** — car ce processus n'existe qu'au sein de la session de l'utilisateur. Pour un véritable accès non surveillé, RustDesk doit s'exécuter en arrière-plan en tant que **service système**.

- Exécutez le **programme d'installation** de RustDesk (et non la version portable) et terminez l'installation.
- Dans **Paramètres → Général**, assurez-vous que le **Service** est en cours d'exécution — utilisez **Démarrer** s'il apparaît comme arrêté. Une fois installé, le service démarre automatiquement avec la machine.

Une fois que RustDesk s'exécute en tant que service, il se charge avant que quiconque ne se connecte, ce qui vous permet de vous connecter à l'**écran de connexion**, de vous authentifier à distance, et même de redémarrer puis de vous reconnecter sans présence humaine. Des articles communautaires sur la [bonne configuration du service Windows](https://www.smolkin.org/blog/2026/03/rustdesk-unattended-service-windows.html) insistent sur la même distinction : version portable signifie assisté uniquement ; service installé signifie non surveillé.

## Notes spécifiques par plateforme

| Plateforme | Que faire                                                                    | Points de vigilance                                                                                                                                                             |
| ---------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Windows    | Installer ; garder le service en cours d'exécution (démarre avec la machine) | L'exe portable se coupe à la déconnexion/UAC ; utilisez le programme d'installation                                                                                             |
| macOS      | Installer, définir un mot de passe permanent, accorder les autorisations     | Enregistrement de l'écran et Accessibilité doivent être accordés ; la capture à l'écran de connexion nécessite l'installation de l'assistant                                    |
| Linux      | Installer le paquet du service                                               | Wayland nécessite une session active ; pour l'accès avant connexion, utilisez la configuration d'affichage virtuel headless, ou X11 là où une distribution en propose encore un |
| Android    | Définir un mot de passe permanent ; activer la capture                       | L'écran doit être allumé ; accordez le consentement de capture d'écran (MediaProjection) et l'autorisation de saisie                                                            |

### Windows

La voie la plus simple. Installez, activez le service, définissez le mot de passe permanent, et c'est terminé. Comme le service s'exécute au démarrage, l'accès non surveillé à l'écran de connexion et lors des redémarrages fonctionne comme prévu.

### macOS

macOS conditionne la capture d'écran et la saisie à des autorisations. Après l'installation, ouvrez **Réglages Système → Confidentialité et sécurité** et accordez à RustDesk à la fois **Enregistrement de l'écran** et **Accessibilité**. Pour un accès à la _fenêtre de connexion_ (avant qu'un utilisateur ne se connecte), le service/assistant RustDesk doit être installé afin de pouvoir capturer l'écran avant la connexion — sinon vous obtiendrez un écran noir à cet endroit, le même [problème de capture traité dans notre guide sur l'écran noir](/fr/blog/rustdesk-connected-waiting-for-image-guide-de-depannage-complet).

### Linux

Installez RustDesk afin que son composant de service s'exécute au démarrage. Pour une machine qui reste à l'écran d'accueil de connexion (greeter), Wayland ne peut pas encore capturer ce greeter — une limitation de conception propre à Wayland (et non une limite de RustDesk) que RustDesk s'efforce activement de résoudre ([PR #15420](https://github.com/rustdesk/rustdesk/pull/15420)). Sur une machine headless, utilisez la configuration d'affichage virtuel ; sur un poste de bureau, une session X11/Xorg s'en charge encore là où une distribution en propose une, bien que plusieurs migrent désormais vers Wayland exclusivement. Consultez [RustDesk pour Linux](/fr/blog/rustdesk-pour-linux-le-bureau-a-distance-open-source) pour plus de détails.

## Étape 3 : Déployer à grande échelle avec un client préconfiguré

Configurer une machine à la main, c'est jouable. En configurer cinquante, ça ne l'est plus. Sur les **plans auto-hébergés Basic et supérieurs**, le **générateur de client personnalisé** (Custom Client Generator) de la console web crée un programme d'installation avec **l'adresse de votre serveur, la clé publique et les paramètres déjà intégrés**, de sorte que les utilisateurs finaux n'ont rien à saisir. Combiné à votre outil de déploiement existant (stratégie de groupe, Intune, un RMM de MSP, un script shell), chaque appareil installe le service et s'enregistre auprès de _votre_ serveur dès le premier lancement.

C'est là que l'auto-hébergement devient rentable pour les équipes : vous obtenez une [flotte non surveillée entièrement sous votre contrôle](/fr/blog/rustdesk-pour-les-msp-un-outil-unique-auto-heberge-et-personnalisable-a), sans facturation cloud par poste qui décide combien de terminaux vous êtes « autorisé » à atteindre. Configurez le générateur via la [console web sur le port 21114](https://rustdesk.com/docs). Notez que RustDesk est sous licence par **utilisateur connecté et appareil géré**, et non par session simultanée ; budgétez donc en fonction du nombre de machines et d'administrateurs dont vous disposez — voir [ce qui compte comme appareil géré](/fr/blog/quest-ce-qui-compte-comme-appareil-gere-dans-rustdesk).

## Verrouillez l'accès

L'accès non surveillé est une porte ouverte en permanence sur une machine ; traitez donc les identifiants avec le plus grand sérieux :

- **Un mot de passe permanent fort et unique**, changé régulièrement.
- **L'authentification à deux facteurs** et, sur Pro, des **contrôles d'accès** afin que seuls les comptes autorisés puissent se connecter. Notre article sur le [contrôle d'accès par utilisateur et les groupes d'appareils](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/permissions/) explique comment délimiter qui peut atteindre quoi.
- **L'auto-hébergement des services côté serveur** lorsque vous avez besoin de contrôler le serveur de rendez-vous, le relais, la console et les données de déploiement stockées. Les identifiants du terminal restent une responsabilité de sécurité propre au terminal. Comme RustDesk est open source sous licence AGPL, son implémentation de l'authentification peut être auditée.

## Un accès non surveillé que vous contrôlez réellement

Pointez une flotte toujours active vers un serveur que vous exploitez vous-même, et l'accès permanent à ces machines reste géré par du matériel qui vous appartient, et non par un cloud que vous louez. Pour un accès permanent, garder ce chemin entre vos propres mains vaut largement le temps de configuration.
