---
publishDate: 2026-06-28T16:50:00Z
lang: 'fr'
translationKey: 'rustdesk-server-pro-offline-air-gapped'
draft: false
title: 'RustDesk Server Pro peut-il fonctionner hors ligne ou en environnement air-gapped ?'
excerpt: "Non — RustDesk Server Pro autohébergé a besoin d'un accès sortant permanent vers rustdesk.com pour valider sa licence, de sorte qu'un déploiement entièrement air-gapped n'est pas pris en charge."
image: '~/assets/images/blog/rustdesk-server-pro-offline-air-gapped-og.webp'
category: 'Déploiement'
tags: ['RustDesk', 'Déploiement', 'Auto-hébergement']
author: 'RustDesk Team'
slug: 'rustdesk-server-pro-peut-il-fonctionner-hors-ligne-ou-en-environnement'
faq:
  - question: 'RustDesk Server Pro peut-il fonctionner hors ligne ou en environnement air-gapped ?'
    answer: "Non. Server Pro sous licence doit conserver une connexion sortante vers rustdesk.com pour valider sa licence pendant son fonctionnement ; un déploiement entièrement air-gapped, qui ne communique jamais avec l'extérieur, n'est donc pas pris en charge. Vous pouvez néanmoins restreindre fortement les flux sortants et les faire transiter par un proxy."
  - question: "RustDesk Server Pro a-t-il besoin d'une connexion internet permanente ?"
    answer: "Il a besoin d'un accès sortant continu vers rustdesk.com pour valider sa licence, mais pas d'une connexion littéralement ininterrompue. Le serveur se connecte sur le port 443 environ une fois par jour et, en cas d'échec, continue de réessayer jusqu'à ce que la vérification réussisse ou qu'environ sept jours se soient écoulés — une brève coupure est donc tolérée, mais un serveur coupé de rustdesk.com au-delà de ce délai de grâce cesse d'être validé. Les sessions à distance elles-mêmes sont mises en relation par vos propres serveurs de relais et d'ID (rendez-vous) autohébergés."
  - question: 'De quel accès sortant un déploiement isolé de RustDesk Server Pro a-t-il besoin ?'
    answer: "Autorisez le trafic HTTPS sortant du serveur vers rustdesk.com pour la validation de la licence (et pour le provisionnement de client personnalisé, si vous l'utilisez). Un proxy est pris en charge, ce qui permet de garder le reste du réseau verrouillé. Vérifiez les domaines et ports exacts dans la documentation RustDesk."
  - question: 'Existe-t-il une option de licence RustDesk entièrement air-gapped ?'
    answer: "Le produit sous licence standard n'est pas conçu pour un isolement air-gapped total, sans aucun contact avec l'extérieur. Si vos contraintes d'isolement sont strictes, vérifiez votre scénario exact auprès de RustDesk avant de vous engager."
metadata:
  description: "RustDesk Server Pro autohébergé peut-il fonctionner en air-gapped ? Non : la licence Pro nécessite un accès sortant permanent vers rustdesk.com, de sorte qu'un isolement total n'est pas pris en charge."
  keywords: "rustdesk server pro hors ligne, rustdesk air-gapped, rustdesk autohébergé connexion internet, vérification de licence rustdesk server pro, déploiement rustdesk hors ligne, rustdesk a-t-il besoin d'internet"
---

Non — un déploiement autohébergé de RustDesk Server Pro n'est pas conçu pour fonctionner entièrement hors ligne ou en environnement air-gapped. La licence Pro doit joindre rustdesk.com via une connexion sortante pour rester valide — à la fois lors de l'activation et en continu pendant que le serveur fonctionne — si bien qu'un réseau totalement hermétique, qui ne communique jamais avec l'extérieur, sort du cadre du modèle pris en charge.

## La réponse courte

Dans la pratique, la vérification est périodique et non permanente : le serveur contacte rustdesk.com sur le port 443 environ une fois par jour et, en cas d'échec, réessaie jusqu'à ce que la vérification réussisse ou qu'environ sept jours se soient écoulés — passé ce délai, la licence cesse d'être validée. Ce délai de grâce intégré signifie qu'une brève coupure internet ne compromettra pas immédiatement votre déploiement, mais qu'un serveur resté hors ligne en permanence finira, lui, par être affecté. Vos services d'ID et de relais restent autohébergés : les sessions directes circulent directement entre les postes, et les sessions relayées transitent par votre propre relais. Vous pouvez garder un réseau très restreint : un proxy est pris en charge, ce qui vous permet, en pratique, de n'autoriser que le chemin HTTPS sortant requis et de verrouiller tout le reste.

## En détail

Le serveur RustDesk open source, que vous pouvez autohéberger sans licence, est un cas différent ; l'exigence décrite ici s'applique spécifiquement à l'ensemble des fonctionnalités de **Server Pro sous licence**. Si votre préoccupation porte avant tout sur le fait de conserver les données de session sur votre propre infrastructure, l'autohébergement répond déjà à ce besoin — l'exigence de connexion sortante concerne la licence, pas le fait de faire transiter chaque session.

Il existe un second cas de figure à prendre en compte : la **création d'un client personnalisé**. Si vous générez, depuis Server Pro, un client à votre marque ou préconfiguré, cette étape de provisionnement nécessite elle aussi un accès sortant. Vérifiez le comportement actuel pour votre version et votre offre.

Pour un réseau strictement air-gapped, c'est là le point décisif. Un serveur véritablement isolé, qui ne peut _jamais_ joindre rustdesk.com, sort du cadre du modèle par défaut ; si vos contraintes d'isolement sont strictes, vérifiez votre scénario exact auprès de RustDesk avant de vous engager. Pour le cas bien plus courant d'une configuration « majoritairement isolée, aux flux sortants strictement contrôlés », l'essentiel à retenir est de prévoir un chemin HTTPS sortant vers rustdesk.com — directement ou via un proxy — et de définir précisément les domaines, les ports et le processus de validation avant de rédiger votre politique de pare-feu. Consultez la [documentation RustDesk](https://rustdesk.com/docs), et notez que cette même exigence de licence explique pourquoi vous [ne pouvez pas faire fonctionner Server Pro sans aucun accès internet, même en l'installant sans Docker](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/installscript/).

## Qui pose cette question

Les administrateurs de réseaux isolés ou réglementés se posent cette question avant même d'installer RustDesk — aussi bien les équipes sécurité que les [MSP](/fr/blog/rustdesk-pour-les-msp-un-outil-unique-auto-heberge-et-personnalisable-a) qui gèrent des environnements verrouillés. Leurs réseaux peuvent se trouver derrière des pare-feux à flux sortants stricts, ou bien ils cherchent simplement à minimiser les dépendances externes. Savoir que la licence nécessite un accès sortant permanent — mais rien de plus — leur permet de rédiger une règle de pare-feu précise, plutôt que d'ouvrir le réseau plus que nécessaire ou de supposer à tort que le produit fonctionnera en vase clos total.

## Questions connexes

- Domaines et ports sortants : consultez la [documentation RustDesk](https://rustdesk.com/docs).
- [Puis-je installer RustDesk Server Pro sans Docker sur une simple VM ?](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/installscript/)
- Générer un client personnalisé à votre marque : consultez la [documentation RustDesk](https://rustdesk.com/docs).

Vous préparez un déploiement verrouillé ou quasi air-gapped ? Vérifiez les spécificités actuelles de connectivité et de licence sur rustdesk.com avant de finaliser votre politique de pare-feu.
