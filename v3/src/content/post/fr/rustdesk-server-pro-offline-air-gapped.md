---
publishDate: 2026-06-28T16:50:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'fr'
translationKey: 'rustdesk-server-pro-offline-air-gapped'
draft: false
title: 'RustDesk Server Pro peut-il fonctionner hors ligne ou en environnement air-gapped ?'
excerpt: "Non — RustDesk Server Pro auto-hébergé a besoin d'un accès sortant régulier à rustdesk.com pour valider sa licence : un déploiement entièrement air-gapped n'est donc pas pris en charge."
image: '~/assets/images/blog/rustdesk-server-pro-offline-air-gapped-og.webp'
category: 'Déploiement'
tags: ['RustDesk', 'Déploiement', 'Auto-hébergement']
author: 'RustDesk Team'
slug: 'rustdesk-server-pro-peut-il-fonctionner-hors-ligne-ou-en-environnement'
faq:
  - question: 'RustDesk Server Pro peut-il fonctionner hors ligne ou en environnement air-gapped ?'
    answer: "Non. RustDesk Server Pro vérifie sa licence auprès de rustdesk.com en HTTPS sortant (port 443) environ une fois par jour et continue de réessayer pendant environ 7 jours si une vérification échoue : un déploiement Pro isolé en permanence sort donc du modèle de licence standard. Un proxy est pris en charge. RustDesk Server OSS, le serveur communautaire gratuit, n'a aucune vérification de licence."
  - question: "RustDesk Server Pro a-t-il besoin d'une connexion internet permanente ?"
    answer: "Il a besoin d'un accès sortant régulier à rustdesk.com pour valider sa licence, mais pas d'une connexion littéralement ininterrompue. Le serveur se signale sur le port 443 environ une fois par jour et, en cas d'échec, réessaie jusqu'à réussir ou pendant environ sept jours : une brève coupure est tolérée, mais un serveur coupé de rustdesk.com au-delà de ce délai de grâce n'est plus validé. Les sessions elles-mêmes sont mises en relation par vos propres serveurs ID (rendez-vous) et de relais auto-hébergés."
  - question: 'De quel accès sortant un déploiement isolé de RustDesk Server Pro a-t-il besoin ?'
    answer: "Autorisez le HTTPS sortant du serveur vers rustdesk.com pour la validation de la licence, ainsi que vers le service de compilation des clients personnalisés si vous générez des clients à votre marque. Un proxy est pris en charge, si bien que le reste du réseau peut rester verrouillé. Les autres flux sortants à prévoir sont les mises à jour des clients et tout fournisseur d'identité externe que vous connectez."
  - question: 'Existe-t-il une option de licence RustDesk entièrement air-gapped ?'
    answer: "Non. La licence standard de RustDesk Server Pro exige une vérification en ligne périodique. RustDesk Server OSS, le serveur communautaire gratuit, n'a aucune vérification de licence : ses services ID/rendez-vous et de relais tournent à l'intérieur d'un réseau isolé, sans la console web ni les fonctions de gestion de Pro. Pour une exigence stricte d'isolement avec Pro, décrivez votre scénario à sales@rustdesk.com."
metadata:
  description: "RustDesk Server Pro auto-hébergé en air-gapped ? Non : sa licence exige un accès sortant régulier à rustdesk.com ; l'isolement total n'est pas pris en charge."
  keywords: "rustdesk server pro hors ligne, rustdesk air-gapped, rustdesk auto-hébergé connexion internet, vérification de licence rustdesk server pro, déploiement rustdesk hors ligne, rustdesk a-t-il besoin d'internet"
---

Non — un déploiement auto-hébergé de RustDesk Server Pro n'est pas conçu pour fonctionner entièrement hors ligne ou en environnement air-gapped. La licence Pro doit joindre rustdesk.com par une connexion sortante pour rester valide — à l'activation comme en continu pendant que le serveur tourne — si bien qu'un réseau totalement isolé sort du modèle pris en charge.

## La réponse courte

La [FAQ officielle sur la vérification de licence](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-often-does-pro-check-license) décrit une vérification périodique : le serveur contacte rustdesk.com sur le port 443 environ une fois par jour et, si une vérification échoue, réessaie jusqu'à ce qu'elle réussisse ou qu'environ sept jours se soient écoulés — après quoi la licence n'est plus validée. Ce délai de grâce intégré signifie qu'une brève coupure internet ne casse pas immédiatement votre déploiement, mais qu'un serveur hors ligne en permanence, si. Vos services ID et de relais restent auto-hébergés ; les sessions directes circulent entre les terminaux et les sessions relayées passent par votre relais. Un proxy est pris en charge : vous pouvez autoriser le chemin HTTPS sortant requis et verrouiller le reste du réseau.

## En détail

Cette exigence concerne **Server Pro**. **RustDesk Server OSS (le serveur communautaire gratuit)** n'a aucune vérification de licence. Le client RustDesk et Server OSS sont sous licence AGPL ; Server Pro est un logiciel serveur auto-hébergé, commercial et propriétaire. Dans un réseau isolé, les clients et les services ID/relais locaux ont toujours besoin de routes fonctionnelles, des bonnes clés et des autorisations de plateforme. Les sessions directes négociées par ID circulent entre les terminaux ; les sessions relayées passent par votre serveur. Les sessions par ID sont chiffrées de bout en bout lorsque les clients disposent de la clé publique de votre serveur, alors que [l'accès direct par adresse IP n'est pas chiffré](https://github.com/rustdesk/rustdesk/wiki/FAQ) : il ne remplace donc pas une connexion par ID correctement configurée.

Un autre flux est à prendre en compte : la **compilation d'un client personnalisé**. Si vous générez depuis Server Pro un client à votre marque ou préconfiguré, la compilation s'exécute sur le service de build de RustDesk ; elle nécessite donc elle aussi un accès sortant. La configuration soumise est supprimée une fois la compilation terminée et le programme d'installation est retiré automatiquement après environ un jour : téléchargez-le et conservez-le dans votre propre dépôt.

Pour un réseau strictement air-gapped, c'est le détail décisif : un serveur qui ne peut _jamais_ joindre rustdesk.com sort du modèle par défaut ; si vos exigences d'isolement sont strictes, faites confirmer votre scénario exact par RustDesk avant de vous engager. Pour la configuration bien plus courante, « majoritairement isolée, aux flux sortants très encadrés », prévoyez un chemin HTTPS sortant vers rustdesk.com — en direct ou via un proxy — et définissez précisément les domaines, les ports et le processus d'approbation avant de rédiger la politique de pare-feu. Consultez la [documentation RustDesk](https://rustdesk.com/docs), et notez que cette même exigence de licence explique pourquoi vous [ne pouvez pas faire tourner Server Pro sans aucun accès internet, même en l'installant sans Docker](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/installscript/).

## Recensez chaque dépendance sortante

Les équipes sécurité et les [MSP](/fr/blog/rustdesk-pour-les-msp-un-outil-unique-auto-heberge-et-personnalisable-a) qui servent des environnements verrouillés posent généralement cette question avant même d'installer RustDesk. Leur liste de flux sortants pour Server Pro est courte : validation de la licence auprès de rustdesk.com en HTTPS, service de compilation des clients personnalisés si vous générez des clients à votre marque, mises à jour des clients, SMTP si votre serveur de messagerie est hors du réseau, et tout fournisseur d'identité externe que vous connectez. Le serveur ID/rendez-vous, le relais et la console tournent à l'intérieur de votre réseau : une règle de pare-feu précise remplace l'ouverture excessive du réseau.

## Questions connexes

- Domaines et ports sortants : consultez la [documentation RustDesk](https://rustdesk.com/docs).
- [Puis-je installer RustDesk Server Pro sans Docker sur une simple VM ?](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/installscript/)
- Générer un client personnalisé à votre marque : consultez la [documentation RustDesk](https://rustdesk.com/docs).

Vous préparez un déploiement verrouillé ou quasi air-gapped ? Ouvrez le chemin de licence et les flux sortants que vous utilisez réellement, gardez tout le reste en interne, et écrivez à [sales@rustdesk.com](mailto:sales@rustdesk.com) si votre exigence est un isolement permanent.
