---
publishDate: 2026-07-03T09:40:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'fr'
translationKey: 'upgrade-rustdesk-license-mid-subscription'
draft: false
title: "Mettre à niveau sa licence RustDesk en cours d'abonnement : comment ça marche"
excerpt: "Ajoutez des utilisateurs ou des appareils à RustDesk Server Pro en cours de période, comprenez la nouvelle échéance à un an et le crédit de la durée déjà payée, puis actualisez votre licence pour appliquer les limites."
image: ~/assets/images/blog/upgrade-rustdesk-license-mid-subscription-og.webp
category: 'Tarifs'
tags: ['RustDesk', 'Tarifs', 'Licences']
author: 'RustDesk Team'
slug: 'mettre-a-niveau-sa-licence-rustdesk-en-cours-dabonnement-comment-ca'
faq:
  - question: "Puis-je mettre à niveau ma licence RustDesk en cours d'abonnement ?"
    answer: "Oui. Augmentez le nombre d'utilisateurs ou d'appareils gérés à tout moment dans le portail en libre-service. La mise à niveau porte l'expiration à un an complet à compter de la date de mise à niveau et crédite la valeur restante déjà payée de votre licence actuelle. Actualisez la même licence dans la console web pour appliquer immédiatement les nouvelles limites ; sinon, elles s'appliquent automatiquement sous 24 heures environ."
  - question: "Comment le prix d'une mise à niveau de licence RustDesk est-il calculé ?"
    answer: "Une mise à niveau de RustDesk Server Pro porte la licence à un an complet à compter de la date de mise à niveau et crédite la valeur restante déjà payée de la licence actuelle. Les nouveaux utilisateurs ou appareils sont facturés pour une année entière ; la capacité existante n'est facturée que pour la prolongation au-delà de son ancienne échéance. La FAQ officielle du Wiki présente un calcul détaillé, et le portail en libre-service affiche le total avant paiement."
  - question: "Pourquoi mes nouveaux appareils n'apparaissent-ils pas après la mise à niveau de ma licence ?"
    answer: "Les nouvelles limites s'appliquent automatiquement sous 24 heures environ, lors de la prochaine vérification de licence de Server Pro. Pour les appliquer immédiatement, actualisez la licence dans la console web de Server Pro : cliquez sur Modifier, puis sur OK sans changer la clé. L'actualisation récupère aussitôt les droits mis à jour, et la clé de licence reste la même."
  - question: 'Comment actualiser ma licence dans la console web ?'
    answer: "Après le paiement, ouvrez les paramètres de licence dans la console web de Server Pro, cliquez sur Modifier, puis sur OK sans changer la clé. Cela récupère les droits mis à jour ; la clé de licence reste la même. Sans actualisation, les nouvelles limites s'appliquent automatiquement sous 24 heures environ, lors de la vérification périodique suivante."
  - question: 'Où puis-je acheter la mise à niveau ou renouveler ma licence ?'
    answer: "Utilisez le portail de licence en libre-service sur rustdesk.com/self-host/account/. Connectez-vous avec l'adresse e-mail utilisée sur la page de paiement lors de l'achat de la licence ; si vous ne savez plus de quelle adresse il s'agit, contactez support@rustdesk.com. Le portail conserve aussi vos factures et vos renouvellements."
  - question: "Puis-je rétrograder ou réduire le nombre de postes en cours d'abonnement ?"
    answer: "Les rétrogradations et les réductions de postes sur une licence RustDesk Server Pro passent par l'équipe RustDesk : écrivez à sales@rustdesk.com en indiquant l'e-mail de votre licence et la modification souhaitée. Le portail en libre-service rustdesk.com/self-host/account/ gère les mises à niveau, que vous pouvez acheter à tout moment, ainsi que les renouvellements et les factures."

metadata:
  description: "Mise à niveau de RustDesk Server Pro en cours de période : échéance à un an, crédit de la valeur restante, calcul officiel et actualisation de la licence."
  keywords: "mise à niveau licence RustDesk en cours d'abonnement, ajouter des appareils licence RustDesk, prix mise à niveau licence RustDesk, augmenter les appareils gérés RustDesk, actualiser la licence console web RustDesk, licence RustDesk par utilisateur et par appareil"
---

Vous pouvez mettre à niveau votre licence RustDesk Server Pro en cours d'abonnement pour ajouter des [appareils gérés](/fr/blog/quest-ce-qui-compte-comme-appareil-gere-dans-rustdesk) ou des comptes utilisateurs. Les [règles officielles de mise à niveau](https://github.com/rustdesk/rustdesk/wiki/FAQ#renew--upgrade-license) portent l'expiration à un an complet à compter de la date de mise à niveau. Le calcul crédite la valeur restante déjà payée de votre licence actuelle : la nouvelle capacité est facturée pour douze mois, et la capacité existante pour la période supplémentaire au-delà de son ancienne échéance. Il ne s'agit pas simplement de facturer les utilisateurs ou appareils ajoutés sur les jours restants.

## Comment effectuer la mise à niveau

Effectuez la mise à niveau dans le [portail de licence en libre-service](https://rustdesk.com/self-host/account/). Connectez-vous avec l'adresse e-mail utilisée sur la page de paiement lors de votre premier achat de licence ; si vous ne savez plus de quelle adresse il s'agit, écrivez à [support@rustdesk.com](mailto:support@rustdesk.com). C'est aussi dans ce portail que vous renouvelez votre licence et téléchargez vos factures.

Après le paiement, actualisez la licence dans votre [console web](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/license/#actualiser-la-licence) : cliquez sur **Modifier**, puis sur **OK** sans changer la clé. Les nouvelles limites s'appliquent immédiatement ; sans actualisation, elles s'appliquent automatiquement sous 24 heures environ, lors de la vérification périodique suivante. La clé de licence existante est conservée.

Par exemple, l'[exemple de calcul officiel](https://github.com/rustdesk/rustdesk/wiki/FAQ#is-it-over-charge-in-upgrade) décrit une mise à niveau le 14 août 2025 d'une licence qui expirait auparavant le 12 mars 2026. L'ajout de 100 appareils reporte l'échéance au 14 août 2026 : les nouveaux appareils sont facturés pour un an, et les 10 utilisateurs et 800 appareils existants pour la prolongation d'environ cinq mois. L'exemple illustre la méthode, pas les tarifs actuels ; pour votre achat, référez-vous au total affiché dans le portail et à la [tarification actuelle](https://rustdesk.com/pricing).

## Qui pose cette question

La croissance est le déclencheur habituel : un administrateur ou un [MSP](/fr/blog/rustdesk-pour-les-msp-un-outil-unique-auto-heberge-et-personnalisable-a) qui avait dimensionné la licence pour le parc d'alors intègre désormais de nouveaux terminaux, collaborateurs ou sites clients en cours d'année. La préoccupation sous-jacente est généralement double : savoir s'il est possible d'augmenter la capacité en cours de période, et si la facturation sera équitable.

## Questions connexes

- [Comment RustDesk compte les utilisateurs et les appareils gérés, et licence par utilisateur ou par appareil](/fr/blog/quest-ce-qui-compte-comme-appareil-gere-dans-rustdesk)
- Actualiser votre licence dans la console web : voir la [documentation RustDesk](https://rustdesk.com/docs).

Votre déploiement grandit ? Effectuez la mise à niveau depuis le [portail en libre-service](https://rustdesk.com/self-host/account/) dès que votre équipe a besoin de plus de capacité.
