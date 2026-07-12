---
publishDate: 2026-07-06T12:36:00Z
lang: 'fr'
translationKey: 'rustdesk-and-remote-access-scams'
draft: false
title: "RustDesk et les arnaques à l'accès à distance : ce que nous faisons"
excerpt: "Pourquoi RustDesk a quitté Google Play, ajouté des avertissements et une exigence de connexion sur le serveur public, et comment les utilisateurs peuvent renforcer la sécurité des appareils contrôlés à l'aide de mots de passe, de la 2FA et de listes blanches d'IP."
image: '~/assets/images/blog/rustdesk-and-remote-access-scams-og.png'
category: 'Sécurité'
tags: ['RustDesk', 'Sécurité', 'Arnaques']
author: 'RustDesk Team'
slug: 'rustdesk-et-les-arnaques-a-lacces-a-distance-ce-que-nous-faisons'
faq:
  - question: 'RustDesk est-il une arnaque ?'
    answer: "Non. RustDesk est un logiciel d'accès à distance open source légitime. Comme d'autres outils de bureau à distance, il peut toutefois être détourné lorsqu'un escroc persuade quelqu'un de l'installer, de démarrer son service et d'accorder l'accès. RustDesk publie des avertissements sur les arnaques et a ajouté des restrictions de distribution et de connexion au serveur public pour réduire ces abus, mais aucun produit d'accès à distance ne peut rendre l'ingénierie sociale impossible."
  - question: "Pourquoi RustDesk n'est-il pas disponible sur Google Play ?"
    answer: 'RustDesk a volontairement retiré son application Android de Google Play en septembre 2023 afin de prévenir de nouvelles arnaques ciblant les utilisateurs. Les versions Android restent disponibles sur les releases GitHub officielles de RustDesk et sur F-Droid. Téléchargez uniquement depuis des sources que vous avez vérifiées vous-même, jamais depuis un lien envoyé par un appelant non sollicité.'
  - question: 'Pourquoi le serveur public de RustDesk exige-t-il une connexion ?'
    answer: "RustDesk indique que la connexion du contrôleur est actuellement requise sur son serveur public en raison d'abus persistants liés aux arnaques et aux botnets. La connexion est gratuite via des fournisseurs d'identité tiers pris en charge. Le serveur public est destiné à la démonstration et aux tests, et non à la production ou à des tâches sensibles ; l'auto-hébergement reste disponible pour les organisations qui doivent gérer leur propre infrastructure et leurs propres politiques."
  - question: 'Comment protéger un appareil qui accepte les connexions RustDesk ?'
    answer: "Définissez un mot de passe permanent fort et unique sur l'appareil contrôlé, activez la 2FA par TOTP du client pour les connexions, et utilisez la liste blanche d'IP lorsque les adresses ou plages CIDR de vos contrôleurs sont prévisibles. Limitez au strict minimum les exceptions accordées aux appareils de confiance. Ces couches réduisent les risques liés aux mots de passe et à l'origine réseau, mais elles ne peuvent pas protéger une personne qui communique délibérément à un escroc son mot de passe, le code 2FA du moment, ou une approbation manuelle."
metadata:
  description: "Comment RustDesk répond aux arnaques à l'accès à distance : avertissements publics, retrait de Google Play, connexion au serveur public, 2FA sur l'appareil contrôlé et listes blanches d'IP CIDR."
  keywords: 'arnaque RustDesk, RustDesk est-il une arnaque, RustDesk Google Play, connexion RustDesk requise, RustDesk 2FA, liste blanche IP RustDesk, prévention arnaque accès à distance'
---

RustDesk est un logiciel d'accès à distance open source légitime, mais un logiciel légitime peut être détourné. Un escroc peut appeler une victime, inventer un problème urgent, et la persuader d'installer un outil de contrôle à distance puis de lui accorder l'accès. RustDesk n'échappe pas à ce risque, et le chiffrement ne peut pas corriger un consentement obtenu par tromperie.

Notre réponse a consisté à introduire des avertissements et des points de friction à plusieurs endroits de ce parcours : sur notre site web, dans le flux de l'appareil contrôlé sous Android, au niveau d'un canal de distribution majeur, et sur le serveur public. Ces mesures gênent aussi les utilisateurs légitimes. Cet article documente ce que nous avons fait, pourquoi nous l'avons fait, et où se situent les limites.

## Que fait RustDesk contre les arnaques à l'accès à distance ?

| Action                                       | Ce qu'elle traite                                                                                   | Coût ou limite                                                                                                 |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Avertissements sur le site et dans le client | Une personne à qui un appelant inconnu demande d'installer RustDesk                                 | Un avertissement peut quand même être ignoré                                                                   |
| Retrait volontaire de Google Play            | Une installation facile motivée par une arnaque, via une boutique d'applications familière          | Les utilisateurs Android légitimes perdent la découverte via le store et les mises à jour automatiques de Play |
| Connexion sur le serveur public              | L'utilisation anonyme de l'infrastructure partagée à des fins d'arnaque et de botnet                | Les utilisateurs légitimes doivent se connecter et certains flux de travail existants sont perturbés           |
| Contrôles de sécurité de l'appareil contrôlé | Le vol de mot de passe, une exposition réseau étendue, et le risque lié à l'accès sans surveillance | Ils doivent être configurés correctement et ne peuvent pas empêcher une divulgation volontaire                 |

Il s'agit de mesures de réduction des risques, et non d'une affirmation selon laquelle RustDesk serait à l'épreuve des arnaques.

## Des avertissements là où une victime potentielle peut les voir

La [page d'assistance de RustDesk](https://rustdesk.com/support) s'ouvre sur un avertissement direct concernant les arnaques. Elle indique aux personnes qui sont au téléphone avec quelqu'un qu'elles ne connaissent pas et en qui elles n'ont pas confiance, et à qui l'on a demandé d'installer RustDesk, de s'arrêter. Le [dépôt GitHub de RustDesk](https://github.com/rustdesk/rustdesk) comporte également une clause de non-responsabilité contre les usages abusifs : accès non autorisé, prise de contrôle et atteinte à la vie privée.

Cet avertissement se trouve également dans le client Android officiel distribué via [GitHub Releases](https://github.com/rustdesk/rustdesk/releases). Sur un appareil Android non connecté qui va être contrôlé, appuyer sur **Start service** ouvre un avertissement avant que le service de capture d'écran ne démarre. Cet avertissement indique à l'utilisateur, s'il a été dirigé vers cette action par un appelant inconnu et non fiable, de s'arrêter et de raccrocher. Les versions officielles imposent un compte à rebours avant que l'utilisateur puisse continuer. Le [flux actuel côté appareil contrôlé](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/flutter/lib/mobile/pages/server_page.dart#L244-L421) et le [texte d'avertissement en anglais](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/src/lang/en.rs#L192-L194) sont tous deux visibles dans le dépôt open source.

Cet emplacement a son importance. Une page de sécurité générale peut atteindre quelqu'un qui se renseigne sur un produit ; un avertissement au niveau de **Start service** atteint la personne au moment précis où une session Android entrante est sur le point de devenir possible. Cela ne peut toutefois pas contraindre cette personne à se méfier d'un appelant convaincant.

## Pourquoi RustDesk n'est pas sur Google Play

Le 3 septembre 2023, le compte X officiel de RustDesk a déclaré : [« Nous avons temporairement retiré RustDesk de Google Play afin de prévenir de nouvelles arnaques ciblant les utilisateurs. »](https://x.com/rustdesk/status/1698372220379349421) Ce lien et ce texte sont également conservés dans la [discussion GitHub #5660](https://github.com/rustdesk/rustdesk/discussions/5660), et la [FAQ actuelle de RustDesk indique que le projet s'est retiré de Google Play en raison des arnaques](https://github.com/rustdesk/rustdesk/wiki/FAQ#apple--google-store).

RustDesk n'est donc **actuellement pas distribué via Google Play**. Il ne s'agissait pas d'affirmer que le client Android était un logiciel malveillant, ni que chaque personne l'installant était en danger. C'était une décision de distribution destinée à réduire une voie couramment utilisée dans les instructions données lors d'arnaques.

Ce compromis est réel : quitter Google Play réduit la visibilité, la facilité d'installation habituelle, et les mises à jour automatiques du store pour les utilisateurs légitimes. Les versions Android actuelles sont disponibles sur les [releases GitHub officielles de RustDesk](https://github.com/rustdesk/rustdesk/releases) et sur [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/). Vérifiez vous-même la destination du lien. N'installez pas un APK à partir d'un lien de téléchargement envoyé par un appelant du support non sollicité. Notre [guide Android et iOS](/fr/blog/controle-a-distance-rustdesk-sur-android-et-ios-ce-qui-fonctionne) répertorie les fonctionnalités mobiles actuelles et les sources d'installation.

## Pourquoi le serveur public exige une connexion

Le [guide actuel de RustDesk sur la connexion au serveur public](https://github.com/rustdesk/rustdesk/wiki/Login-required-for-public-server) indique que la connexion du contrôleur est requise en raison d'abus persistants liés aux arnaques et aux botnets. La connexion est gratuite et s'effectue via un fournisseur d'identité tiers pris en charge, comme Google ou GitHub ; aucun couple identifiant/mot de passe distinct n'est proposé sur le serveur public. Le guide précise actuellement que seuls les contrôleurs sont tenus de se connecter.

Cela ajoute une étape d'identification et supprime une partie de l'accès anonyme à l'infrastructure que RustDesk exploite à des fins de démonstration et de test. Cela ne s'applique pas à un serveur RustDesk privé, et cela ne peut pas empêcher un escroc qui utilise une autre infrastructure ou qui crée une nouvelle identité.

Cela a également causé des perturbations. Dans une [discussion Reddit à propos de la nouvelle erreur de connexion](https://www.reddit.com/r/rustdesk/comments/1sm91xv/getting_this_error_when_trying_to_connect_anyone/), certains utilisateurs légitimes ont rapporté ne plus pouvoir accéder à leurs appareils personnels ou familiaux tant qu'ils n'avaient pas compris et effectué l'étape de connexion. D'autres se sont opposés au fait de devoir lier une identité tierce. Ces commentaires ne prouvent pas que la restriction fonctionne ou échoue contre les escrocs, mais ils documentent bien son coût opérationnel. Une mesure de prévention des abus qui ajoute de la friction doit reconnaître clairement ce coût.

## Comment sécuriser un appareil RustDesk contrôlé ?

Les restrictions au niveau de la plateforme ne constituent qu'une seule couche de protection. Le propriétaire ou l'administrateur d'un appareil contrôlé doit également limiter qui peut se connecter et ce qu'un identifiant volé permet de faire.

### 1. Définir un mot de passe permanent fort et unique

Pour l'[accès sans surveillance](/fr/blog/acces-non-surveille-rustdesk-guide-de-configuration), définissez un **mot de passe permanent fort et unique** dans les paramètres de sécurité RustDesk de l'appareil contrôlé. Ne réutilisez pas l'identifiant de connexion du système d'exploitation, le mot de passe de messagerie, ni un mot de passe déjà utilisé sur un autre service. Changez-le immédiatement s'il est susceptible d'avoir été divulgué.

Pour une assistance avec supervision, privilégiez, lorsque c'est possible, un mot de passe temporaire à usage unique ou une approbation explicite par clic. Un mot de passe permanent fort réduit les risques de devinette, de credential stuffing et de réutilisation de mot de passe. Cela ne sert à rien si une victime communique ce mot de passe à un appelant.

### 2. Activer la 2FA sur l'appareil contrôlé

RustDesk intègre une 2FA par TOTP pour les connexions entrantes vers un appareil contrôlé. Sur l'appareil qui va accepter les connexions, ouvrez ses paramètres de sécurité, activez la **2FA**, scannez le code QR avec une application d'authentification, puis confirmez la configuration à l'aide du code à six chiffres.

Une fois activée, la simple acceptation du mot de passe de connexion habituel ne suffit plus : le contrôleur doit également fournir le code TOTP à six chiffres du moment avant que l'appareil contrôlé n'autorise la session. Cette fonctionnalité a été introduite spécifiquement comme une [2FA pour l'accès sans surveillance](https://github.com/rustdesk/rustdesk/commit/44e6b7dbb0125dc0c288c19a16a944b5d605852b), et son [implémentation TOTP est publique](https://github.com/rustdesk/rustdesk/blob/master/src/auth_2fa.rs).

RustDesk peut, en option, faire confiance à un appareil contrôleur et ignorer les demandes de 2FA ultérieures. Laissez ce contournement désactivé pour un comportement le plus strict possible. Si vous l'utilisez, passez en revue la liste des appareils de confiance et retirez ceux qui sont perdus, remplacés, partagés ou qui ne sont plus autorisés.

La 2FA protège contre un mot de passe deviné, réutilisé ou exposé. Elle ne peut pas protéger une personne qui communique à un escroc à la fois le mot de passe et le code d'authentification du moment.

### 3. Restreindre les connexions entrantes avec une liste blanche d'IP

Dans l'interface de RustDesk, cette fonctionnalité s'appelle **IP Whitelisting**. En des termes plus explicites, il s'agit d'une liste blanche d'IP : l'appareil contrôlé rejette toute connexion dont l'adresse source se situe en dehors de la liste configurée, avant même l'autorisation par mot de passe et 2FA.

Configurez-la à cet emplacement :

- **Appareil de bureau contrôlé :** **Settings → Security → Security → Use IP Whitelisting**
- **Appareil mobile contrôlé :** **Settings → Share screen → Use IP Whitelisting**

Ce paramètre accepte des adresses IPv4 ou IPv6 individuelles ainsi que des plages CIDR. Le CIDR combine une adresse réseau avec une longueur de préfixe. Le préfixe indique combien de bits de poids fort sont fixes : plus le préfixe est grand, plus la plage autorisée est restreinte.

- `203.0.113.10` ou `203.0.113.10/32` : une seule adresse IPv4.
- `203.0.113.0/24` : 256 adresses IPv4, de `203.0.113.0` à `203.0.113.255`.
- `2001:db8::10/128` : une seule adresse IPv6.
- `2001:db8:1234::/64` : un sous-réseau IPv6.

Il s'agit uniquement de plages d'exemple à visée documentaire ; ne les copiez pas telles quelles. Saisissez les adresses ou réseaux réels de vos contrôleurs. Plusieurs entrées peuvent être séparées par des virgules, des points-virgules, des espaces ou des retours à la ligne. RustDesk documente ce paramètre dans sa [référence de configuration avancée du client](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#whitelist), et [l'application de la restriction côté appareil contrôlé est visible dans le code source](https://github.com/rustdesk/rustdesk/blob/master/src/server/connection.rs#L1347-L1374).

Utilisez les plages les plus restreintes possible en pratique. Les adresses de sortie fixes d'un bureau et les plages VPN connues sont de bons candidats. Les adresses résidentielles dynamiques et les contrôleurs itinérants ne le sont pas. Vérifiez quelle adresse source RustDesk voit réellement dans votre topologie NAT, VPN, directe ou relayée, et testez la nouvelle règle depuis une autre session avant de fermer la session de travail en cours. Une adresse ou un CIDR erroné peut bloquer l'accès à du personnel de support légitime.

Une liste blanche restreint l'origine possible d'une connexion. Elle ne remplace ni un mot de passe ni la 2FA, et elle ne peut pas arrêter un contrôleur malveillant qui opère déjà depuis un réseau autorisé.

## Ce que ces mesures ne peuvent pas faire

Les avertissements, le retrait du store, les exigences de connexion, les mots de passe forts, la 2FA et les listes blanches d'IP suppriment chacun une partie des opportunités qui s'offrent à un attaquant. Aucun ne supprime le risque central lié à l'ingénierie sociale : une personne peut toujours être persuadée d'approuver un accès ou de divulguer chacun de ces facteurs.

L'auto-hébergement ne rend pas non plus les abus impossibles. Il donne à une organisation le contrôle de son serveur RustDesk et de ses politiques, mais un escroc peut lui aussi exploiter une infrastructure privée ou distribuer un client modifié. Les restrictions appliquées au serveur public de RustDesk ne doivent pas être confondues avec une protection qui s'étendrait automatiquement à tout déploiement auto-hébergé.

Si un appelant inconnu vous demande d'installer RustDesk, de démarrer son service, de partager un mot de passe, de divulguer un code 2FA ou d'ouvrir un site bancaire, arrêtez-vous. Notre guide neutre, indépendant de tout éditeur, pour [repérer, prévenir et se remettre des arnaques au bureau à distance](/fr/blog/arnaques-au-bureau-a-distance-comment-les-reperer-et-les-eviter) explique les signes avant-coureurs et la marche à suivre si l'accès a déjà été accordé.

Ici, la responsabilité ne se résume pas à un simple réglage ou à une déclaration de bonnes intentions. C'est un travail continu : avertir les utilisateurs, accepter la friction là où les abus l'exigent, fournir des contrôles techniques, documenter leurs limites, et faire évoluer la réponse à mesure que les attaquants changent de méthodes.
