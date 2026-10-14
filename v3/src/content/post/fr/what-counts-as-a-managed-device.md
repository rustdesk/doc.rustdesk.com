---
publishDate: 2026-07-02T14:43:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'fr'
translationKey: 'what-counts-as-a-managed-device'
draft: false
title: "Qu'est-ce qui compte comme appareil géré dans RustDesk ?"
excerpt: "Sur les offres standard de RustDesk Server Pro, chaque appareil que vous configurez pour y accéder compte une fois. Customized V2 ne compte que les appareils affectés à un groupe ou à un utilisateur ; les appareils ponctuels ne sont pas comptés."
image: '~/assets/images/blog/what-counts-as-a-managed-device-og.webp'
category: 'Tarifs'
tags: ['RustDesk', 'Tarifs', 'Licences']
author: 'RustDesk Team'
slug: 'quest-ce-qui-compte-comme-appareil-gere-dans-rustdesk'
faq:
  - question: 'Comment RustDesk compte-t-il les appareils gérés ?'
    answer: "Sur les offres standard, chaque appareil que vous configurez pour y accéder compte comme un appareil géré, une seule fois — en présence de l'utilisateur ou sans surveillance, que vous vous y connectiez une fois ou mille fois. Customized V2 compte différemment : seuls les appareils affectés à un groupe d'appareils ou à un utilisateur entrent dans votre nombre d'appareils sous licence."
  - question: 'Comment sont comptés les appareils utilisés pour une assistance ponctuelle ?'
    answer: "Avec l'offre Customized V2, seuls les appareils affectés à un groupe d'appareils ou à un utilisateur comptent comme appareils gérés. Une machine à laquelle vous vous connectez une seule fois pour une assistance spontanée — et que vous n'affectez jamais — n'entre pas dans votre nombre d'appareils sous licence et n'est pas désactivée. Pour une activité surtout ponctuelle, Customized V2 convient donc mieux qu'un comptage de chaque terminal."

metadata:
  description: "Appareils gérés RustDesk : les offres standard comptent une fois chaque appareil joignable ; Customized V2, seuls ceux affectés à un groupe ou à un utilisateur."
  keywords: "qu'est-ce qu'un appareil géré, comptage des appareils rustdesk, licence rustdesk vs teamviewer, licence appareil sans surveillance ou en présence de l'utilisateur, assistance ponctuelle rustdesk, licence assistance à distance msp"
---

RustDesk Server Pro compte les comptes utilisateurs autorisés et les appareils gérés. Sur ses offres standard, **chaque appareil auquel vous voulez accéder compte comme un appareil géré, une seule fois.** L'offre **[Customized V2](https://rustdesk.com/pricing#custom2)** compte différemment — seuls les appareils que vous affectez à un groupe ou à un utilisateur sont comptés — ce qui en fait l'offre adaptée à une assistance ponctuelle intensive.

## La réponse courte

Sur les offres standard, un « appareil géré » est toute machine que vous voulez pouvoir joindre, et le serveur compte chacune une seule fois. Peu importe :

- que l'appareil soit utilisé **en présence de l'utilisateur** (quelqu'un est devant) ou **sans surveillance** (un serveur headless, une borne ou un poste toujours allumé),
- que vous vous y connectiez **une fois** ou **de nombreuses fois**,
- la fréquence à laquelle vous y accédez.

Si votre activité relève surtout d'une assistance spontanée et ponctuelle, le comptage plus restreint de l'offre **[Customized V2](https://rustdesk.com/pricing#custom2)**, détaillé ci-dessous, est conçu précisément pour ce cas.

## En détail

Ce qui modifie le comptage, c'est l'offre. Avec l'offre **[Customized V2](https://rustdesk.com/pricing#custom2)**, la définition d'un appareil géré est plus restreinte : seuls les appareils que vous **affectez à un groupe d'appareils ou à un utilisateur** entrent dans votre nombre d'appareils sous licence. Les machines que vous ne joignez que pour une assistance ponctuelle — et que vous n'affectez jamais — ne sont pas comptées, et elles ne sont pas désactivées. Si vous préférez que ces appareils non affectés n'apparaissent pas du tout dans la console, le [paramètre client `register-device`](https://rustdesk.com/docs/fr/self-host/client-configuration/advanced-settings/#register-device) le permet ; il prend effet dès que le nombre de connexions simultanées sous licence est d'au moins 2. En pratique, une telle session d'assistance rapide n'affiche qu'un ID et un mot de passe à usage unique pour une seule connexion en présence de l'utilisateur : une intervention vraiment ponctuelle n'a donc jamais besoin d'une place permanente dans votre parc. Si une grande partie de votre activité ressemble à cela, Customized V2 est généralement le meilleur choix — écrivez à [sales@rustdesk.com](mailto:sales@rustdesk.com) en décrivant votre scénario pour connaître les conditions actuelles, ou consultez [rustdesk.com/pricing](https://rustdesk.com/pricing).

Par exemple, imaginez un [MSP](/fr/blog/rustdesk-pour-les-msp-un-outil-unique-auto-heberge-et-personnalisable-a) de 20 techniciens qui prend en charge environ 1 000 machines clientes : il doit couvrir **les deux** dimensions de la licence — assez de comptes utilisateurs pour les 20 techniciens et assez d'appareils gérés pour les machines maintenues joignables. Pour les terminaux qui ne font l'objet que d'une intervention unique, la règle Customized V2 ci-dessus s'applique ; les quotas actuels figurent sur [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Les connexions simultanées sont une unité de licence distincte

Les offres Server Pro standard (Individual, Basic, Customized) incluent des connexions simultanées illimitées ; seule l'offre [Customized V2](https://rustdesk.com/pricing#custom2) en prévoit un nombre défini. Selon la [définition de la simultanéité](https://github.com/rustdesk/rustdesk/wiki/FAQ#concurrent-connections) de RustDesk, une connexion simultanée est un appareil de contrôle actif, un « canal », et non chaque onglet de session sortante : un poste de technicien avec cinq onglets de session utilise un canal, et trois postes de contrôle actifs en même temps en utilisent trois. Sur Customized V2, dimensionnez séparément les comptes utilisateurs, les appareils gérés et les canaux.

## Qui se pose cette question

Quiconque convertit un nombre de postes TeamViewer ou AnyDesk en unités RustDesk bute d'abord sur cette définition, car les unités de licence ne se correspondent pas une à une. Les offres payantes de RustDesk exigent de la capacité à la fois pour les personnes qui se connectent et pour les appareils maintenus sous gestion.

## Questions connexes

- Licence par utilisateur ou par appareil, connexions simultanées et comptage des appareils Server Pro : voir la [tarification RustDesk](https://rustdesk.com/pricing).
- [Vous venez de TeamViewer ? Comment la tarification de RustDesk se compare-t-elle pour les MSP ?](/fr/blog/rustdesk-vs-teamviewer-lalternative-auto-hebergee)

Vous dimensionnez un parc sans savoir si les interventions ponctuelles doivent entrer dans votre décompte d'appareils ? Consultez les conditions actuelles sur [rustdesk.com/pricing](https://rustdesk.com/pricing) ou interrogez l'équipe avant d'acheter.
