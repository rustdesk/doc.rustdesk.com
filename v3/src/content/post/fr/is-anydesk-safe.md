---
publishDate: 2026-06-30T17:26:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'fr'
translationKey: 'is-anydesk-safe'
draft: false
title: 'AnyDesk est-il sûr ? Chiffrement, incident de sécurité de 2024 et arnaques'
excerpt: "AnyDesk est-il sûr ? Un regard équitable sur son chiffrement, l'incident de sécurité de 2024 sur ses systèmes de production et son détournement par les arnaqueurs — avec la comparaison open source."
image: '~/assets/images/blog/is-anydesk-safe-og.webp'
category: 'Sécurité'
tags: ['AnyDesk', 'Sécurité']
author: 'RustDesk Team'
slug: 'anydesk-est-il-sur-chiffrement-incident-de-securite-de-2024-et-arnaques'
faq:
  - question: 'AnyDesk est-il sûr à utiliser ?'
    answer: "Oui, pour un usage légitime. AnyDesk est un outil commercial éprouvé qui documente TLS 1.2 avec un chiffrement de transport AES 256 bits, l'authentification à deux facteurs pour l'accès sans surveillance et des listes de contrôle d'accès. Les principaux risques sont la compromission de ses systèmes de production révélée le 2 février 2024, la coordination par défaut via le cloud d'AnyDesk (On-Premises est proposé dans Ultimate) et les arnaqueurs qui poussent leurs victimes à l'installer."
  - question: 'AnyDesk a-t-il été piraté ?'
    answer: "Oui. AnyDesk a révélé le 2 février 2024 la compromission de systèmes de production. Son communiqué officiel décrit le remplacement de certificats, la remise en état des systèmes et une réinitialisation préventive des mots de passe my.anydesk.com, et indique ne disposer d'aucune preuve que des appareils d'utilisateurs finaux aient été affectés. Les chercheurs en sécurité d'Akamai ont par ailleurs évoqué une exposition rapportée du code source et du matériel de signature de code."
  - question: 'Pourquoi les arnaqueurs utilisent-ils AnyDesk ?'
    answer: "Parce qu'AnyDesk est gratuit, s'installe en quelques secondes et ne demande aucun compte côté poste contrôlé, les arnaqueurs au faux support technique appellent ou écrivent à leurs victimes pour les convaincre de l'installer et de leur accorder le contrôle. C'est un risque lié à l'usage, pas une vulnérabilité d'AnyDesk : la même ruse fonctionne avec n'importe quel outil de bureau à distance, RustDesk compris. AnyDesk publie des recommandations de prévention des abus."
  - question: "Le chiffrement d'AnyDesk est-il sécurisé ?"
    answer: "La documentation de sécurité d'AnyDesk décrit TLS 1.2 avec AEAD, un échange de clés asymétrique RSA-2048 et un chiffrement de transport AES 256 bits, ainsi que la confidentialité persistante (perfect forward secrecy). Ce sont des protections conformes aux standards du secteur. La réserve : vous faites confiance à un client à code source fermé et, par défaut, au cloud d'AnyDesk pour la mise en relation ; vous dépendez donc de la sécurité opérationnelle de l'éditeur au lieu de pouvoir auditer le code vous-même."
metadata:
  description: "AnyDesk est-il sûr ? Analyse sourcée de son chiffrement TLS/AES, de l'incident de 2024 sur ses systèmes de production, des arnaques et du code source fermé."
  keywords: 'AnyDesk est-il sûr, sécurité AnyDesk, faille AnyDesk 2024, arnaque AnyDesk, chiffrement AnyDesk, AnyDesk est-il fiable, AnyDesk piraté'
---

En bref : AnyDesk est sûr pour un usage légitime. C'est un produit commercial de bureau à distance éprouvé, doté d'un chiffrement de niveau standard, et non un logiciel malveillant. Les risques à comprendre : il est à code source fermé et coordonné par défaut via le cloud d'AnyDesk, l'éditeur a révélé une compromission de ses systèmes de production en février 2024, et les arnaqueurs le détournent massivement. Voici l'état des lieux, sources à l'appui.

## La réponse courte

Oui, pour un usage délibéré et légitime. AnyDesk documente TLS 1.2 avec un chiffrement de transport AES 256 bits, l'authentification à deux facteurs pour l'accès sans surveillance et des listes de contrôle d'accès. Trois éléments déterminent la façon de l'utiliser : la [compromission de ses systèmes de production du 2 février 2024](https://anydesk.com/en/public-statement-2-2-2024), la coordination par défaut via le cloud d'AnyDesk (une appliance On-Premises est proposée dans Ultimate) et les arnaqueurs au faux support technique qui poussent leurs victimes à l'installer. Aucun ne rend son _installation_ dangereuse ; tous influencent la manière dont vous devriez l'_utiliser_.

## Comment AnyDesk sécurise vos sessions

Selon la [documentation de sécurité d'AnyDesk](https://anydesk.com/en/security), les sessions sont protégées par TLS 1.2 avec AEAD, un échange de clés asymétrique RSA-2048 qui authentifie les terminaux et protège contre les attaques de l'homme du milieu (man-in-the-middle), et un chiffrement de transport AES 256 bits, avec une confidentialité persistante (perfect forward secrecy) assurée par un échange de clés éphémères. Côté compte, AnyDesk prend en charge l'authentification à deux facteurs (TOTP) pour l'accès sans surveillance, une liste de contrôle d'accès (liste blanche) pour restreindre qui peut se connecter, ainsi qu'un hachage salé des mots de passe. (Certains documents d'AnyDesk mentionnent des versions plus récentes de TLS ; la page de sécurité citée ci-dessus fait référence.)

Ce sont des protections solides, conformes aux standards du secteur — de même nature que celles de tout concurrent sérieux. Au niveau de la couche de transport, rien d'alarmant. Les questions intéressantes portent sur le _modèle de confiance_ et le _comportement humain_, pas sur les suites cryptographiques.

## L'incident de sécurité AnyDesk de 2024 : ce qui s'est réellement passé

Le **2 février 2024**, [AnyDesk a annoncé la compromission de systèmes de production](https://anydesk.com/en/public-statement-2-2-2024). Le communiqué décrit une réponse à incident menée avec CrowdStrike, la révocation et le remplacement de certificats, la remise en état des systèmes et une réinitialisation préventive des mots de passe du portail web. L'[analyse d'Akamai](https://www.akamai.com/blog/security-research/anydesk-breach-what-to-know-mitigations-and-recommendations) traite de l'exposition rapportée du code source et de la signature de code, séparément de la communication publique de l'éditeur.

[AnyDesk a déclaré ne disposer d'**aucune preuve que des appareils d'utilisateurs finaux aient été affectés**](https://anydesk.com/en/public-statement-2-2-2024), et ne pas stocker d'identifiants permettant de s'y connecter.

La leçon n'est pas qu'AnyDesk serait particulièrement peu sûr. Elle porte sur le **risque de concentration chez l'éditeur** : lorsqu'un tiers exploite l'infrastructure qui coordonne vos sessions et détient les données de votre compte, une compromission chez lui est un incident que vous n'avez pas choisi et que vous ne pouviez pas empêcher.

## Les arnaques par ingénierie sociale sont un risque distinct

Pour la plupart des particuliers, le principal danger lié à AnyDesk relève de l'ingénierie sociale, pas d'une CVE. Le [FBI avertit que les arnaqueurs au faux support technique demandent à leurs victimes d'installer un logiciel d'accès à distance](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software), puis détournent l'accès obtenu, et AnyDesk publie des [recommandations de prévention des abus](https://anydesk.com/en/abuse-prevention) précisément pour cette raison. Le risque tient à qui est autorisé à se connecter, pas à la robustesse du chiffrement des sessions.

Pourquoi AnyDesk en particulier ? Il est gratuit à télécharger, s'installe en quelques secondes et — point crucial — la personne _contrôlée_ n'a pas besoin de créer de compte. Cette faible friction est un atout pour l'assistance légitime et une aubaine pour les fraudeurs, qui appellent leur cible ou lui écrivent, inventent un « problème » urgent, puis la guident pas à pas jusqu'à ce qu'elle leur accorde le contrôle total à distance.

Voici le point d'équité que les titres alarmistes occultent : **il s'agit d'un risque lié à l'usage, pas d'une vulnérabilité d'AnyDesk.** Exactement la même ruse fonctionne avec TeamViewer, Chrome Remote Desktop ou RustDesk. Aucun chiffrement AES ne vous protège si vous remettez volontairement les clés à un inconnu au téléphone. Si vous cherchez la marche à suivre pour vous en protéger, nous l'avons détaillée dans notre article sur [comment éviter les arnaques au bureau à distance](/fr/blog/arnaques-au-bureau-a-distance-comment-les-reperer-et-les-eviter), et le même raisonnement s'applique à la question de [savoir si Chrome Remote Desktop est sûr](/fr/blog/chrome-remote-desktop-est-il-sur-un-avis-honnete).

## Code source fermé et mise en relation par le cloud : la question de la confiance

C'est ici que les modèles d'AnyDesk et de RustDesk divergent — non pas sur la qualité du chiffrement, mais sur _ce que vous devez accepter sur parole_.

AnyDesk est un logiciel propriétaire. Vous ne pouvez ni lire le code source du client, ni le compiler vous-même, ni vérifier de façon indépendante ce qu'il fait ; vous faites confiance à AnyDesk pour que le binaire se comporte comme annoncé. Et par défaut, la mise en relation de vos sessions passe par le cloud d'AnyDesk : la disponibilité et la sécurité de cette infrastructure relèvent donc de l'éditeur — comme l'a montré 2024. AnyDesk Ultimate propose une appliance sur site (On-Premises), ce qui réduit cet écart pour ceux qui y souscrivent.

RustDesk part du côté opposé de ces deux paris. Le client RustDesk et RustDesk Server OSS (le serveur communautaire gratuit) sont [open source sous licence AGPL](https://github.com/rustdesk/rustdesk) ; Server Pro est un logiciel serveur auto-hébergé, commercial et propriétaire. Le client est auditable et compilable : vous n'acceptez pas un binaire propriétaire sur parole. Et comme vous pouvez [héberger vous-même](/fr/blog/pourquoi-heberger-vous-meme-votre-logiciel-de-bureau-a-distance) le serveur ID/rendez-vous et le relais, l'infrastructure qui met en relation vos sessions vous appartient au lieu d'appartenir à un tiers — c'est précisément l'exposition au risque de concentration que 2024 a rendue concrète. Cela permet aussi une [conception souveraine des données](/fr/blog/souverainete-des-donnees-et-rgpd-pour-le-bureau-a-distance-lauto).

Par souci d'équité, disons-le aussi : cela déplace la confiance sans la supprimer. Le code étant ouvert, les défauts de RustDesk sont eux aussi publics : suivez donc les [dernières versions](https://github.com/rustdesk/rustdesk/releases) et les registres de vulnérabilités. Et une infrastructure auditable et auto-hébergée est un point de départ, pas une garantie : les sessions continuent de circuler directement entre les terminaux, et c'est à vous d'appliquer les correctifs sur le serveur.

## Alors, AnyDesk est-il sûr ?

Pour un usage délibéré et légitime : oui. AnyDesk est un produit éprouvé, doté d'un chiffrement de niveau standard et de contrôles de compte sensés. Tenez-le à jour, protégez l'accès sans surveillance par l'authentification à deux facteurs, restreignez les connexions entrantes avec sa liste de contrôle d'accès et vérifiez chaque demande d'assistance.

Les réserves portent sur la confiance, pas sur le chiffrement. Son modèle par défaut, à code source fermé et coordonné par le cloud, implique de compter sur la sécurité opérationnelle d'AnyDesk, qui a subi un vrai revers en 2024 ; Ultimate On-Premises réduit cet écart. Si ce compromis ne vous convient pas, [une alternative auto-hébergée à TeamViewer et AnyDesk](/fr/blog/la-meilleure-alternative-a-teamviewer-en-auto-hebergement) change la base de confiance : un code auditable et une coordination que vous maîtrisez, au prix de l'exploitation de votre propre serveur.

Quel que soit l'outil choisi, la règle qui évite le plus de dégâts est aussi la moins coûteuse : n'installez jamais un logiciel d'accès à distance parce que quelqu'un qui _vous_ a contacté vous l'a demandé.
