---
publishDate: 2026-07-05T18:49:00Z
lang: 'fr'
translationKey: 'is-chrome-remote-desktop-safe'
draft: false
title: 'Chrome Remote Desktop est-il sûr ? Un avis honnête'
excerpt: "Chrome Remote Desktop est-il sûr ? Un examen honnête de son chiffrement, de son modèle de code PIN et de compte Google, des risques réels, et de ce qui différencie l'auto-hébergement."
image: '~/assets/images/blog/is-chrome-remote-desktop-safe-og.webp'
category: 'Sécurité'
tags: ['Chrome Remote Desktop', 'Sécurité']
author: 'RustDesk Team'
slug: 'chrome-remote-desktop-est-il-sur-un-avis-honnete'
faq:
  - question: "Est-il sûr d'utiliser Chrome Remote Desktop ?"
    answer: "Pour un usage personnel occasionnel, Chrome Remote Desktop est raisonnablement sûr. Google indique que toutes les sessions de bureau à distance sont entièrement chiffrées, que l'accès nécessite un code PIN, et que les sessions d'assistance à distance utilisent des codes d'accès à usage unique. Les principaux risques sont des codes PIN trop faibles, la compromission du compte Google auquel il est lié et — comme pour tout outil d'accès à distance — des escrocs qui vous poussent à accorder l'accès. Il offre un contrôle administratif limité et fonctionne entièrement sur le cloud de Google."
  - question: 'Chrome Remote Desktop est-il chiffré ?'
    answer: "Oui. La documentation d'assistance de Google indique que toutes les sessions Chrome Remote Desktop sont entièrement chiffrées, et des analyses indépendantes décrivent l'utilisation d'une sécurité de transport web standard. Google ne publie pas de description détaillée du protocole sur ses pages d'aide grand public. Pour tout usage allant au-delà du cadre occasionnel, considérez donc ce chiffrement comme suffisant, mais impossible à auditer de manière indépendante."
  - question: 'Quels sont les risques de sécurité de Chrome Remote Desktop ?'
    answer: "Les trois risques concrets sont un code PIN faible ou facile à deviner (le minimum étant de six chiffres), la compromission du compte Google auquel l'hôte est lié, et les escroqueries par ingénierie sociale, où quelqu'un pousse une victime à l'installer et à partager un code d'accès. Activer l'authentification à deux facteurs sur votre compte Google et ne jamais partager de code avec une personne qui vous a contacté en premier élimine l'essentiel du danger réel."
  - question: 'Puis-je auto-héberger Chrome Remote Desktop ?'
    answer: "Non. Chrome Remote Desktop passe entièrement par l'infrastructure de Google et reste lié à votre compte Google ; il n'existe aucune option pour exécuter le service de connexion sur votre propre serveur, ni pour auditer le code du client. Si l'auto-hébergement et la possibilité d'inspecter le code comptent pour vous, une alternative open source offre un modèle de confiance différent."
metadata:
  description: 'Chrome Remote Desktop est-il sûr ? Ce que documente Google sur le chiffrement de CRD, la protection par code PIN, les risques concrets et le modèle de confiance basé sur le compte Google.'
  keywords: 'Chrome Remote Desktop est-il sûr, sécurité de Chrome Remote Desktop, chiffrement Chrome Remote Desktop, code PIN Chrome Remote Desktop, risques Chrome Remote Desktop, CRD sûr'
---

Version courte : pour un usage personnel occasionnel, Chrome Remote Desktop (CRD) est raisonnablement sûr. C'est un outil gratuit et sans fioritures de Google, qui chiffre votre session et verrouille l'accès derrière un code PIN et votre compte Google. Les réserves honnêtes à formuler : c'est un logiciel fermé, entièrement dépendant du cloud de Google, qui offre peu de contrôle administratif et qui, comme tout outil d'accès à distance, peut être détourné contre vous par un escroc. Voici une analyse équitable et sourcée.

## La réponse courte

CRD est suffisamment sûr pour la tâche à laquelle il est destiné : accéder à votre propre machine, ou aider un proche, via une connexion sécurisée par Google. Selon la [documentation d'assistance officielle de Google](https://support.google.com/chrome/answer/1649523), toutes les sessions de bureau à distance sont entièrement chiffrées, l'accès sans surveillance nécessite un code PIN, et les sessions d'assistance ponctuelles utilisent un code d'accès à usage unique qui ne fonctionne qu'une seule fois. C'est une base raisonnable pour un usage personnel.

Là où il faut marquer une pause, c'est pour tout usage allant au-delà du cadre occasionnel. CRD est lié à votre compte Google et fonctionne sur l'infrastructure de Google avec des contrôles d'administration limités, et ses points faibles concrets sont un code PIN devinable, un compte Google compromis et l'ingénierie sociale. Rien de tout cela ne le rend dangereux à installer — cela détermine simplement à quel point vous devriez vous y fier.

## Comment Chrome Remote Desktop protège une session

Trois mécanismes font le vrai travail, tous documentés sur les [pages d'aide de Google](https://support.google.com/chrome/answer/1649523) :

- **Chiffrement.** Google affirme que « toutes les sessions de bureau à distance sont entièrement chiffrées ». Les analyses indépendantes décrivent généralement la connexion comme utilisant une sécurité de transport web standard (TLS avec AES). Google ne publie pas de description détaillée du protocole sur ses pages destinées au grand public, donc considérez ce chiffrement comme suffisant, mais impossible à auditer de manière indépendante.
- **Code PIN pour l'accès sans surveillance.** Pour accéder à un ordinateur que vous avez configuré pour un accès à distance permanent, vous devez saisir un code PIN. C'est ce qui empêche une personne quelconque disposant de votre session Google de se connecter silencieusement.
- **Codes d'accès à usage unique pour l'assistance.** Lorsque vous aidez quelqu'un en temps réel, l'hôte génère un code qui, selon Google, ne fonctionne qu'une seule fois, et le partage prolongé nécessite une reconfirmation périodique.

Par-dessus tout cela s'ajoute le compte Google lui-même, qui peut — et devrait absolument, dans le cas d'un accès à distance — être protégé par une authentification à deux facteurs. Pour un usage personnel sur un réseau de confiance, cet ensemble est réellement satisfaisant.

## Où se situent vraiment les risques

Les points faibles de CRD n'ont rien d'exotique. Ce sont les trois qui découlent directement de sa conception.

**Des codes PIN trop faibles.** Le code PIN est le verrou de l'accès sans surveillance, et le minimum imposé par Google n'est que de six chiffres. Six chiffres suffisent à décourager un inconnu qui tenterait sa chance une seule fois, mais les gens choisissent des nombres prévisibles — dates de naissance, répétitions, séquences — ce qui réduit l'espace de recherche réel bien en dessous de ce que suggère le nombre de chiffres. Pour une machine que vous laissez accessible 24 h/24 et 7 j/7, un code PIN choisi à la légère est la porte d'entrée la plus probable. Choisissez quelque chose qui ne soit pas évident.

**La compromission du compte Google.** Comme l'accès sans surveillance de CRD est lié à votre compte Google, ce compte _constitue_ le périmètre de sécurité. Si quelqu'un obtient votre mot de passe Google par hameçonnage et que vous n'avez pas activé l'authentification à deux facteurs, votre bureau à distance fait partie de ce qu'il récupère. Ce n'est pas tant une faille de CRD qu'une conséquence du fait de tout miser sur le compte Google — c'est précisément pour cela qu'activer la 2FA sur ce compte n'est pas négociable si vous utilisez CRD.

**Les arnaques.** Comme pour tout outil d'accès à distance, le préjudice réel le plus important ne vient pas d'une faille cryptographique, mais de l'ingénierie sociale. Le [FBI a averti](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software) que les escrocs se faisant passer pour un support technique persuadent régulièrement leurs victimes d'installer un logiciel de bureau à distance et de partager l'accès, avant de vider leurs comptes. Les codes à usage unique de CRD sont faciles à lire à voix haute à un « technicien serviable » au téléphone, ce qui est précisément le problème. Pour être honnête, il s'agit d'un risque lié à l'usage, pas d'une vulnérabilité de CRD — la même technique fonctionne avec [AnyDesk](/fr/blog/anydesk-est-il-sur-chiffrement-incident-de-securite-de-2024-et-arnaques), TeamViewer ou RustDesk. Nous détaillons les bons réflexes défensifs dans notre article sur [comment éviter les arnaques au bureau à distance](/fr/blog/arnaques-au-bureau-a-distance-comment-les-reperer-et-les-eviter).

## Ce que CRD ne vous offre pas

CRD est délibérément minimaliste, et c'est justement ce qui séduit beaucoup de gens. Mais il vaut la peine d'être clair sur les compromis, surtout si vous l'envisagez pour un usage allant au-delà du cadre personnel.

Vous ne pouvez pas l'auto-héberger. Chaque connexion CRD transite par le cloud de Google et reste liée à un compte Google ; il n'existe aucune option pour exécuter le service de rendez-vous sur votre propre serveur, ni aucun code source à auditer — vous devez faire confiance à Google quant au comportement réel de l'hôte. Il manque également presque tout ce qui relève de l'administration d'équipe, des politiques centralisées, des listes de contrôle d'accès, de la journalisation des sessions ou du regroupement d'appareils. Ce n'est pas un reproche fait à Google ; ce n'est simplement pas la vocation de CRD. Si vous avez besoin de ces fonctionnalités, c'est que vous avez dépassé ses limites, et [un outil de bureau à distance gratuit plus complet](/fr/blog/meilleurs-logiciels-de-bureau-a-distance-gratuits-pour-les-entreprises) ou une [alternative dédiée à Chrome Remote Desktop](/fr/blog/alternative-a-chrome-remote-desktop-rustdesk-auto-heberge) constitue alors la prochaine étape honnête.

C'est là qu'un modèle open source et auto-hébergé apporte un _type_ de garantie différent, plutôt que simplement davantage de fonctionnalités. CRD vous demande de considérer son chiffrement comme suffisant sans protocole publié à inspecter ; RustDesk est au contraire [open source sous licence AGPL](https://github.com/rustdesk/rustdesk), de sorte que le client et sa cryptographie sont là pour être audités plutôt que pris sur parole. Et là où CRD fait de votre compte Google le périmètre de sécurité, [l'auto-hébergement](/fr/blog/pourquoi-heberger-vous-meme-votre-logiciel-de-bureau-a-distance) place les serveurs ID/rendez-vous et de relais sur votre propre machine ou VPS — de sorte que la mise en relation et la politique d'accès reposent sur une infrastructure que vous contrôlez, et non derrière un unique identifiant cloud — ce qui répond directement aux enjeux de [souveraineté des données et de conformité RGPD](/fr/blog/souverainete-des-donnees-et-rgpd-pour-le-bureau-a-distance-lauto).

Cette transparence joue dans les deux sens, soyons clairs : puisque le code est public, les vulnérabilités propres à RustDesk le sont aussi, donc surveillez les [dernières versions](https://github.com/rustdesk/rustdesk/releases) et les registres de divulgation. Et l'auto-hébergement ne fait que remplacer un type d'entretien par un autre — l'hygiène de compte et de code PIN dont CRD a besoin devient un serveur que vous mettez à jour et un trafic qui continue de circuler directement entre les points d'extrémité. Un modèle de garantie différent, pas un modèle plus léger.

## Le verdict

Chrome Remote Desktop est-il sûr ? Pour un usage personnel occasionnel — accéder à votre propre PC, aider un proche — oui, il est raisonnablement sûr, simple et peu coûteux. Évaluez-le en conséquence. Activez l'authentification à deux facteurs sur votre compte Google, choisissez un code PIN qui n'est pas votre date de naissance, et ne communiquez jamais un code d'accès à une personne qui vous a contacté en premier : vous aurez ainsi traité les risques qui comptent vraiment.

Là où CRD atteint ses limites, c'est sur le contrôle et le passage à l'échelle : c'est un logiciel fermé, dépendant du cloud de Google, et pauvre en fonctions d'administration. Si vous avez besoin d'auditer le code, de garder la mise en relation sur votre propre infrastructure, ou de gérer plus de deux ou trois machines, c'est le moment de vous tourner vers une solution open source et auto-hébergée — non pas parce que CRD est dangereux, mais parce qu'il n'a jamais cherché à être cet outil-là.
