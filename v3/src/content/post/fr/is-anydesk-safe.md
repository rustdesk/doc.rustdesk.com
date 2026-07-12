---
publishDate: 2026-06-30T17:26:00Z
lang: 'fr'
translationKey: 'is-anydesk-safe'
draft: false
title: 'AnyDesk est-il sûr ? Chiffrement, incident de sécurité de 2024 et arnaques'
excerpt: "AnyDesk est-il sûr ? Un état des lieux honnête de son chiffrement, de l'incident de sécurité de 2024 sur ses systèmes de production et des raisons pour lesquelles il est détourné par les arnaqueurs — avec une comparaison face à l'open source."
image: '~/assets/images/blog/is-anydesk-safe-og.png'
category: 'Sécurité'
tags: ['AnyDesk', 'Sécurité']
author: 'RustDesk Team'
slug: 'anydesk-est-il-sur-chiffrement-incident-de-securite-de-2024-et-arnaques'
faq:
  - question: 'AnyDesk est-il sûr à utiliser ?'
    answer: "Pour un usage légitime, AnyDesk est un outil commercial de bureau à distance mature et globalement sûr. Il chiffre les sessions avec une sécurité de transport standard et propose l'authentification à deux facteurs ainsi que des listes de contrôle d'accès. Les deux points à garder à l'esprit sont qu'il s'agit d'un logiciel au code source fermé dont les connexions transitent par défaut par le cloud d'AnyDesk, et que son principal danger dans la pratique n'est pas une faille logicielle, mais les arnaqueurs du faux support technique qui convainquent leurs victimes de l'installer."
  - question: 'AnyDesk a-t-il été piraté ?'
    answer: "Début 2024, AnyDesk a révélé un incident de sécurité touchant ses systèmes de production, au cours duquel des attaquants ont obtenu du code source et du matériel de signature de code. AnyDesk a révoqué ses certificats, déployé un client re-signé et réinitialisé les mots de passe de son portail web. L'entreprise a affirmé qu'aucun appareil d'utilisateur final n'avait été touché. Vérifiez l'ampleur exacte et les dates auprès des avis officiels d'AnyDesk et de sources d'information neutres."
  - question: 'Pourquoi les arnaqueurs utilisent-ils AnyDesk ?'
    answer: "Parce qu'il est gratuit, rapide à installer et ne nécessite aucun compte pour la personne contrôlée, AnyDesk est l'outil de prédilection des arnaqueurs du faux support technique, qui appellent leurs victimes ou leur envoient un e-mail pour les convaincre d'accorder un accès à distance. Il s'agit d'un risque lié à l'usage, et non d'une vulnérabilité d'AnyDesk — la même technique d'ingénierie sociale fonctionne avec n'importe quel outil de bureau à distance, y compris RustDesk."
  - question: "Le chiffrement d'AnyDesk est-il sécurisé ?"
    answer: "La documentation de sécurité d'AnyDesk décrit un chiffrement TLS 1.2 avec AEAD, un échange de clés asymétrique RSA-2048 et un chiffrement de transport AES 256 bits, accompagnés de la confidentialité persistante (perfect forward secrecy). Ce sont des protections conformes aux standards du secteur. La réserve à émettre est que vous faites confiance à un client au code source fermé et, par défaut, au cloud d'AnyDesk pour établir la connexion : vous dépendez donc de la sécurité opérationnelle de l'éditeur plutôt que de pouvoir auditer le code vous-même."
metadata:
  description: "AnyDesk est-il sûr ? Analyse sourcée de son chiffrement TLS/AES, de l'incident de sécurité de 2024 sur ses systèmes de production, de son exploitation par les arnaqueurs et des compromis liés à son code source fermé."
  keywords: 'AnyDesk est-il sûr, sécurité AnyDesk, faille AnyDesk 2024, arnaque AnyDesk, chiffrement AnyDesk, AnyDesk est-il fiable, AnyDesk piraté'
---

Réponse rapide : oui, AnyDesk est un produit commercial de bureau à distance légitime et globalement sûr pour les personnes qui l'utilisent en connaissance de cause. Les risques à comprendre ne tiennent pas au fait qu'AnyDesk serait un logiciel malveillant — ce n'est pas le cas — mais plutôt au fait qu'il s'agit d'un logiciel au code source fermé, dont les connexions passent par défaut par le cloud de l'éditeur, qui a subi un incident de sécurité notable en 2024, et qui compte parmi les outils préférés des arnaqueurs. Voici un état des lieux honnête et sourcé.

## La réponse courte

AnyDesk sécurise ses sessions grâce à un chiffrement standard et reconnu, et propose les protections de compte que l'on peut attendre d'un tel outil. Il est utilisé chaque jour par des services d'assistance et des entreprises sans incident. Deux réserves entrent en ligne de compte dans votre décision : d'abord, vous faites confiance à un client propriétaire et, par défaut, au cloud d'AnyDesk pour établir les connexions ; vous ne pouvez donc pas auditer le code et vous héritez de la sécurité opérationnelle de l'éditeur — un point qui a cessé d'être abstrait en [2024](https://www.infosecurity-magazine.com/news/anydesk-hit-cyberattack-customer/). Ensuite, et c'est plus susceptible de concerner un utilisateur ordinaire, AnyDesk est un accessoire de choix dans les arnaques à l'accès distant. Ni l'un ni l'autre ne rend son _installation_ dangereuse ; les deux façonnent en revanche la manière dont vous devriez l'_utiliser_.

## Comment AnyDesk sécurise vos sessions

Selon la [documentation de sécurité officielle d'AnyDesk](https://anydesk.com/en/security), les sessions sont protégées par TLS 1.2 avec AEAD, un échange de clés asymétrique RSA-2048 permettant de vérifier les points d'accès et de se prémunir contre les attaques de l'homme du milieu (man-in-the-middle), ainsi qu'un chiffrement de transport AES 256 bits assurant une confidentialité persistante (perfect forward secrecy) grâce à un échange de clés éphémères. Côté compte, AnyDesk prend en charge l'authentification à deux facteurs (TOTP) pour l'accès sans surveillance, une liste de contrôle d'accès (liste blanche) pour restreindre qui peut se connecter, ainsi qu'un hachage salé des mots de passe. (Certains documents d'AnyDesk font référence à des versions plus récentes de TLS ; considérez la page actuelle comme faisant foi et vérifiez-y les détails.)

Ce sont des protections solides, conformes aux standards du secteur — comparables à ce qu'utilise tout concurrent sérieux. Au niveau de la couche de transport, rien d'alarmant ici. Les questions intéressantes portent sur le _modèle de confiance_ et le _comportement humain_, pas sur les suites cryptographiques.

## L'incident de sécurité AnyDesk de 2024 : ce qui s'est réellement passé

Début 2024, AnyDesk a publiquement révélé un incident de sécurité touchant ses **systèmes de production**. Selon [Infosecurity Magazine](https://www.infosecurity-magazine.com/news/anydesk-hit-cyberattack-customer/) et des analystes en sécurité d'[Akamai](https://www.akamai.com/blog/security-research/anydesk-breach-what-to-know-mitigations-and-recommendations), des attaquants ont obtenu un accès à l'infrastructure interne et se sont procuré du code source ainsi que du matériel de signature de code. La réponse d'AnyDesk, selon ses propres déclarations, a notamment consisté à faire appel à des experts externes en investigation numérique, à révoquer et remplacer les certificats liés à la sécurité, à déployer une version re-signée du client, et à réinitialiser par précaution les mots de passe de son portail web.

Pour être juste envers AnyDesk, l'entreprise a affirmé qu'**aucun appareil d'utilisateur final n'avait été touché** et que ses systèmes sont conçus pour ne pas stocker les clés privées, jetons ou mots de passe qui permettraient à un attaquant de se connecter aux machines de ses clients. Les dates et chiffres exacts ont été rapportés de manière variable à l'époque ; vérifiez donc les détails auprès des avis officiels d'AnyDesk et de sources d'information neutres plutôt qu'à partir d'un seul résumé, y compris celui-ci.

L'enseignement honnête à en tirer n'est pas qu'« AnyDesk serait particulièrement peu sûr ». Tous les grands éditeurs d'accès à distance ont déjà connu des incidents. Ce qu'il faut vraiment retenir concerne le **risque de concentration chez le fournisseur** : lorsqu'un tiers exploite l'infrastructure qui met en relation vos sessions et détient les données de votre compte, une compromission de ce côté-là est une compromission que vous n'avez ni choisie ni pu empêcher.

## Le plus grand risque n'est pas un bug — ce sont les arnaques

Pour la plupart des particuliers, le principal danger lié à AnyDesk n'a rien à voir avec une CVE. Il s'agit de l'ingénierie sociale. Le [FBI a mis en garde](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software) contre les arnaqueurs du faux support technique qui poussent régulièrement leurs victimes à installer un logiciel de bureau à distance, avant d'exploiter cet accès pour vider leurs comptes financiers. AnyDesk revient constamment dans ces stratagèmes, et AnyDesk publie d'ailleurs ses propres [recommandations de prévention des abus](https://anydesk.com/en/abuse-prevention), précisément parce que l'outil est si souvent détourné à des fins malveillantes.

Pourquoi AnyDesk en particulier ? Il est gratuit à télécharger, s'installe en quelques secondes et — c'est le point crucial — la personne _contrôlée_ n'a pas besoin de créer de compte. Cette faible friction est un atout pour l'assistance légitime, et une aubaine pour les fraudeurs, qui appellent leur cible ou lui envoient un e-mail, inventent un « problème » urgent, puis la guident pas à pas jusqu'à ce qu'elle accorde le contrôle total à distance.

Voici le point d'équité que les titres alarmistes ont tendance à occulter : **il s'agit d'un risque lié à l'usage, pas d'une vulnérabilité propre à AnyDesk.** Exactement le même stratagème fonctionne avec TeamViewer, Chrome Remote Desktop ou RustDesk. Aucun niveau de chiffrement AES ne vous protège si vous remettez volontairement les clés à un inconnu au téléphone. Si vous cherchez la marche à suivre pour vous en protéger, nous l'avons détaillée séparément dans notre article sur [comment éviter les arnaques au bureau à distance](/fr/blog/arnaques-au-bureau-a-distance-comment-les-reperer-et-les-eviter), et le même raisonnement s'applique à la question de [savoir si Chrome Remote Desktop est sûr](/fr/blog/chrome-remote-desktop-est-il-sur-un-avis-honnete).

## Code source fermé et intermédiation par le cloud : la question de la confiance

C'est ici que les modèles d'AnyDesk et de RustDesk divergent — non pas sur la qualité du chiffrement, mais sur _ce que vous devez accepter sur la seule base de la confiance_.

AnyDesk est un logiciel propriétaire. Vous ne pouvez ni lire le code source du client, ni le compiler vous-même, ni vérifier de façon indépendante ce qu'il fait réellement ; vous faites confiance à AnyDesk pour que le binaire se comporte comme annoncé. Et par défaut, vos sessions transitent par le cloud d'AnyDesk, si bien que la disponibilité et la sécurité de cette infrastructure relèvent de la responsabilité de l'éditeur — comme l'a illustré 2024. Les offres supérieures d'AnyDesk proposent une appliance sur site (on-premises), ce qui réduit cet écart pour celles et ceux qui y souscrivent.

RustDesk part du côté opposé de ces deux paris. Parce qu'il est [open source sous licence AGPL](https://github.com/rustdesk/rustdesk), le client est auditable et compilable : vous ne faites donc pas confiance aveuglément à un binaire propriétaire. Et parce que vous pouvez [héberger vous-même](/fr/blog/pourquoi-heberger-vous-meme-votre-logiciel-de-bureau-a-distance) le serveur d'ID/rendez-vous et le relais, l'infrastructure qui met en relation vos sessions vous appartient plutôt qu'à un tiers — précisément l'exposition au risque de concentration chez le fournisseur que 2024 a rendue concrète. Cela peut aussi appuyer une [conception souveraine des données](/fr/blog/souverainete-des-donnees-et-rgpd-pour-le-bureau-a-distance-lauto), même si l'emplacement des points d'accès, la durée de conservation des données et les obligations légales doivent malgré tout être évalués.

Par souci d'équité, disons-le aussi : cela déplace la confiance plutôt que de la supprimer. Parce que le code est ouvert, les défauts propres à RustDesk sont eux aussi rendus publics ; suivez donc les [dernières versions](https://github.com/rustdesk/rustdesk/releases) ainsi que les registres de vulnérabilités. Et une infrastructure auditable et auto-hébergée est un point de départ, pas une garantie : le trafic des sessions continue de circuler directement entre les points d'accès, et c'est à vous qu'il incombe d'appliquer les correctifs sur le serveur.

## Alors, AnyDesk est-il sûr ?

Pour un usage volontaire et légitime : oui — c'est un produit mature, doté d'un chiffrement conforme aux standards et de contrôles de compte judicieux, utilisé chaque jour en toute sécurité à grande échelle. Considérez-le comme raisonnablement sûr, car c'est ce que confirment les faits.

Les nuances sont la partie honnête de la réponse. Son modèle par défaut — code source fermé et intermédiation par le cloud — signifie que vous faites confiance à la sécurité opérationnelle d'AnyDesk, laquelle a subi un coup dur bien réel en 2024. Et le préjudice le plus fréquent dans la pratique provient des arnaqueurs qui exploitent la facilité d'installation de l'outil — un problème humain, pas cryptographique. Si ces compromis ne vous conviennent pas, une [alternative open source et auto-hébergée](/fr/blog/la-meilleure-alternative-a-teamviewer-en-auto-hebergement) change la base de confiance : un code auditable et une intermédiation que vous maîtrisez vous-même, au prix de devoir gérer votre propre serveur.

Quel que soit l'outil que vous choisissez, la règle qui évite le plus de dégâts est aussi la moins coûteuse : n'installez jamais un logiciel d'accès à distance parce que quelqu'un qui vous a contacté _vous_ le demande.
