---
publishDate: 2026-07-05T18:49:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'fr'
translationKey: 'is-chrome-remote-desktop-safe'
draft: false
title: 'Chrome Remote Desktop est-il sûr ? Sécurité et limites de déploiement'
excerpt: "Chrome Remote Desktop est-il sûr ? Un regard équitable sur son chiffrement, son modèle de code PIN et de compte Google, les risques réels et ce que change l'auto-hébergement."
image: '~/assets/images/blog/is-chrome-remote-desktop-safe-og.webp'
category: 'Sécurité'
tags: ['Chrome Remote Desktop', 'Sécurité']
author: 'RustDesk Team'
slug: 'chrome-remote-desktop-est-il-sur-un-avis-honnete'
faq:
  - question: "Est-il sûr d'utiliser Chrome Remote Desktop ?"
    answer: "Oui, pour un usage personnel. Google documente des sessions Chrome Remote Desktop entièrement chiffrées, un code PIN pour l'accès sans surveillance et des codes d'accès à usage unique pour les sessions d'assistance. Les principaux risques sont un code PIN faible, un compte Google compromis et les arnaqueurs qui poussent leurs victimes à partager un code. Activez l'authentification à deux facteurs sur le compte Google et choisissez un code PIN difficile à deviner."
  - question: 'Chrome Remote Desktop est-il chiffré ?'
    answer: "Oui. Google indique que toutes les sessions Chrome Remote Desktop sont entièrement chiffrées. Son guide réseau pour les entreprises décrit des connexions WebRTC/ICE établies directement entre les ordinateurs lorsque c'est possible, et via un relais TURN dans le cas contraire ; Chromium publie par ailleurs le code source remoting, si bien que les composants hôte, client et protocole peuvent être inspectés."
  - question: 'Quels sont les risques de sécurité de Chrome Remote Desktop ?'
    answer: "Les trois risques concrets sont un code PIN faible ou facile à deviner (le minimum est de six chiffres), la compromission du compte Google auquel l'hôte est lié, et les arnaques par ingénierie sociale, où quelqu'un pousse une victime à partager un code d'accès. L'authentification à deux facteurs sur le compte Google, un code PIN non évident et le refus de partager un code avec quiconque vous a contacté écartent l'essentiel du danger réel."
  - question: 'Puis-je auto-héberger Chrome Remote Desktop ?'
    answer: "Non. Chromium publie le code source remoting de Chrome Remote Desktop, mais le service de coordination de Google ne peut pas être auto-hébergé : chaque connexion est donc établie via Google. RustDesk est une alternative auto-hébergeable : RustDesk Server OSS, le serveur communautaire gratuit, exécute vos propres services ID/rendez-vous et relais, et RustDesk Server Pro ajoute une console web, le Contrôle d'accès et des clients à votre marque."
metadata:
  description: 'Chrome Remote Desktop est-il sûr ? Ce que Google documente sur le chiffrement, le code PIN, les risques concrets et le modèle de confiance du compte Google.'
  keywords: 'Chrome Remote Desktop est-il sûr, sécurité de Chrome Remote Desktop, chiffrement Chrome Remote Desktop, code PIN Chrome Remote Desktop, risques Chrome Remote Desktop, CRD sûr'
---

En bref : pour un usage personnel, Chrome Remote Desktop (CRD) est raisonnablement sûr. C'est un outil gratuit et sans fioritures de Google, qui chiffre les sessions et protège l'accès par un code PIN et votre compte Google. Les réserves : Google exploite le service de coordination, l'administration passe par les stratégies d'entreprise de Google plutôt que par une console d'assistance, et, comme tout outil d'accès à distance, CRD peut être retourné contre vous par un escroc. Voici l'analyse, sources à l'appui.

## La réponse courte

Oui, pour un usage personnel. CRD est suffisamment sûr pour ce à quoi il est destiné : accéder à votre propre machine, ou aider un proche, via une connexion que Google sécurise pour vous. Selon la [documentation d'assistance de Google](https://support.google.com/chrome/answer/1649523), toutes les sessions de bureau à distance sont entièrement chiffrées, l'accès sans surveillance nécessite un code PIN, et les sessions d'assistance ponctuelles utilisent un code d'accès qui ne fonctionne qu'une seule fois. C'est une base raisonnable pour un usage personnel.

Pour un usage en organisation, les [stratégies d'administration d'entreprise](https://support.google.com/chrome/a/answer/2799701) et le [guide réseau](https://support.google.com/chrome/a/answer/16364503) de Google permettent aux administrateurs de limiter qui peut utiliser CRD et comment il se connecte ; Google continue toutefois d'exploiter le service de coordination.

## Comment Chrome Remote Desktop protège une session

Trois mécanismes font le vrai travail, tous documentés sur les [pages d'aide de Google](https://support.google.com/chrome/answer/1649523) :

- **Chiffrement et routage.** Google indique que les sessions sont entièrement chiffrées. Son [guide réseau](https://support.google.com/chrome/a/answer/16364503) décrit des connexions ICE/WebRTC qui peuvent être directes, assistées par STUN ou relayées par TURN. La coordination passe par les services Google ; le média de la session ne transite pas toujours par un relais Google.
- **Code PIN pour l'accès sans surveillance.** Pour accéder à un ordinateur configuré pour un accès à distance permanent, vous saisissez un code PIN. C'est ce qui empêche une personne quelconque disposant de votre session Google de se connecter en silence.
- **Codes d'accès à usage unique pour l'assistance.** Lorsque vous aidez quelqu'un en temps réel, l'hôte génère un code qui, selon Google, ne fonctionne qu'une seule fois, et un partage prolongé exige une reconfirmation périodique.

Par-dessus s'ajoute le compte Google lui-même, qui peut — et, pour un accès à distance, doit absolument — être protégé par l'authentification à deux facteurs. Pour un usage personnel sur un réseau de confiance, cet ensemble est tout à fait satisfaisant.

## Où se situent vraiment les risques

Les points faibles de CRD n'ont rien d'exotique. Ce sont les trois qui découlent de sa conception.

**Des codes PIN trop faibles.** Le code PIN est le verrou de l'accès sans surveillance, et le minimum imposé par Google n'est que de six chiffres. Six chiffres suffisent face à un inconnu qui tente sa chance une fois, mais les gens choisissent des nombres prévisibles — dates de naissance, répétitions, suites — ce qui réduit l'espace de recherche réel bien en dessous de ce que suggère le nombre de chiffres. Pour une machine accessible 24 h/24, un code PIN choisi à la légère est la porte d'entrée la plus probable. Choisissez un code qui n'ait rien d'évident.

**La compromission du compte Google.** Le compte Google fait partie du périmètre d'accès de CRD : si quelqu'un obtient votre mot de passe par hameçonnage et que vous n'avez pas activé l'authentification à deux facteurs, votre liste de bureaux à distance fait partie de ce qu'il récupère. Protégez le compte par la 2FA, passez en revue les appareils connectés et révoquez les accès dont vous n'avez plus besoin. L'accès sans surveillance exige en outre le code PIN de l'hôte : le mot de passe du compte seul n'ouvre donc pas tous les hôtes.

**Les arnaques.** Un appelant peut persuader une victime de partager un code d'accès et d'approuver une session. Le [FBI met en garde contre le détournement des logiciels d'accès à distance](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software). Vérifiez les demandes d'assistance par vos propres moyens : le chiffrement ne peut pas protéger une session délibérément autorisée pour un escroc. Voir [comment éviter les arnaques au bureau à distance](/fr/blog/arnaques-au-bureau-a-distance-comment-les-reperer-et-les-eviter).

## Ce que CRD ne vous offre pas

CRD est délibérément minimaliste, et c'est justement ce qui séduit beaucoup de gens. Mais mieux vaut être clair sur les compromis, surtout si vous l'envisagez pour autre chose qu'un usage personnel.

[Chromium publie le code source remoting de CRD](https://chromium.googlesource.com/chromium/src/+/main/remoting/), y compris les composants hôte, client et protocole, mais le service de coordination de Google ne peut pas être auto-hébergé. Les [stratégies d'entreprise](https://support.google.com/chrome/a/answer/2799701) de Google contrôlent qui peut utiliser CRD ; elles n'en font pas une console d'assistance exploitée par vos soins, avec groupes d'appareils, règles d'accès par utilisateur et clients à votre marque. Ce n'est pas un reproche fait à Google : ce n'est simplement pas la vocation de CRD. Si vous en avez besoin, une [alternative à Chrome Remote Desktop](/fr/blog/alternative-a-chrome-remote-desktop-rustdesk-auto-heberge) est l'étape suivante.

Le **client RustDesk et RustDesk Server OSS (le serveur communautaire gratuit) sont [sous licence AGPL](https://github.com/rustdesk/rustdesk)** ; **Server Pro est un logiciel serveur auto-hébergé, commercial et propriétaire**. Server OSS exécute vos propres services ID/rendez-vous et relais, et Server Pro ajoute une console web, un Contrôle d'accès par utilisateur et par groupe d'appareils et des clients à votre marque : la coordination et la politique d'accès résident sur une infrastructure que vous contrôlez, et non derrière une connexion unique à un cloud. Cela répond aux exigences de [souveraineté des données et de RGPD](/fr/blog/souverainete-des-donnees-et-rgpd-pour-le-bureau-a-distance-lauto).

Cette transparence joue dans les deux sens, soyons clairs : un code public signifie que les vulnérabilités de RustDesk sont publiques elles aussi ; surveillez donc les [dernières versions](https://github.com/rustdesk/rustdesk/releases) et les avis de divulgation. Et l'auto-hébergement ne fait que remplacer un type d'entretien par un autre : l'hygiène de compte et de code PIN qu'exige CRD devient un serveur à corriger, et le trafic continue de circuler directement entre les terminaux. C'est un modèle de garantie différent, pas un modèle plus léger.

## Le verdict

Chrome Remote Desktop est-il sûr ? Oui, pour un usage personnel : accéder à votre propre PC ou aider un proche. CRD chiffre les sessions, protège l'accès sans surveillance par un code PIN et utilise des codes à usage unique pour l'assistance. Activez l'authentification à deux facteurs sur votre compte Google, choisissez un code PIN qui ne soit pas votre date de naissance, et ne lisez jamais un code d'accès à une personne qui vous a contacté en premier : vous aurez ainsi traité les risques qui comptent.

Là où CRD atteint ses limites, c'est sur le contrôle et le passage à l'échelle : Google exploite le service de coordination, et l'administration passe par ses stratégies d'entreprise plutôt que par une console d'assistance. Si vous devez garder la coordination sur votre propre infrastructure, limiter les techniciens à des groupes d'appareils ou gérer un parc depuis une seule console, c'est le moment de vous tourner vers RustDesk auto-hébergé — non pas parce que CRD est dangereux, mais parce qu'il n'a jamais cherché à être cet outil-là.
