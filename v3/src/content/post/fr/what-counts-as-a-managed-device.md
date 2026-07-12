---
publishDate: 2026-07-02T14:43:00Z
lang: 'fr'
translationKey: 'what-counts-as-a-managed-device'
draft: false
title: "Qu'est-ce qui compte comme appareil géré dans RustDesk ?"
excerpt: 'Sur les forfaits RustDesk standard, chaque appareil que vous configurez pour y accéder compte une seule fois. Le forfait Customized V2 ne comptabilise que les appareils assignés à un groupe ou à un utilisateur ; les appareils ponctuels ne sont pas comptabilisés.'
image: '~/assets/images/blog/what-counts-as-a-managed-device-og.png'
category: 'Tarifs'
tags: ['RustDesk', 'Tarifs', 'Licences']
author: 'RustDesk Team'
slug: 'quest-ce-qui-compte-comme-appareil-gere-dans-rustdesk'
faq:
  - question: 'Comment RustDesk comptabilise-t-il les appareils gérés ?'
    answer: "Sur les forfaits standard, chaque appareil que vous configurez pour y accéder compte comme un appareil géré, une seule fois — assisté ou non assisté, que vous vous y connectiez une fois ou mille fois. Le forfait Customized V2 fonctionne différemment : seuls les appareils assignés à un groupe d'appareils ou à un utilisateur comptent dans votre nombre d'appareils sous licence."
  - question: 'Comment sont comptabilisés les appareils utilisés pour une assistance ponctuelle ?'
    answer: "Avec le forfait Customized V2, seuls les appareils assignés à un groupe d'appareils ou à un utilisateur comptent comme appareils gérés. Une machine à laquelle vous vous connectez une seule fois pour une assistance spontanée — et que vous n'assignez jamais — n'est pas comptabilisée dans votre nombre d'appareils sous licence et n'est pas désactivée. Pour un travail majoritairement ponctuel, Customized V2 est donc mieux adapté que de comptabiliser chaque terminal."

metadata:
  description: 'Comment RustDesk comptabilise les appareils gérés : les forfaits standard comptent une fois chaque appareil accessible ; Customized V2 ne comptabilise que les appareils assignés à un groupe ou à un utilisateur.'
  keywords: "qu'est-ce qu'un appareil géré, comptage des appareils rustdesk, licence rustdesk vs teamviewer, licence appareil assisté vs non assisté, assistance ponctuelle rustdesk, licence assistance à distance msp"
---

Si vous venez du modèle par siège de TeamViewer, la règle de comptage des forfaits standard de RustDesk est étonnamment simple : **chaque appareil auquel vous voulez accéder compte comme un appareil géré, comptabilisé une seule fois.** Le forfait **[Customized V2](https://rustdesk.com/pricing#custom2)** fonctionne différemment — seuls les appareils que vous assignez à un groupe ou à un utilisateur sont comptabilisés — ce qui en fait le choix idéal pour une assistance ponctuelle intensive.

## La réponse courte

Sur les forfaits standard, un « appareil géré » est toute machine à laquelle vous souhaitez pouvoir accéder, et le serveur comptabilise chacune une seule fois. Peu importe :

- que l'appareil soit **assisté** (quelqu'un se trouve devant) ou **non assisté** (un serveur sans écran, une borne interactive ou un poste de travail toujours actif),
- que vous vous y connectiez **une fois** ou **plusieurs fois**,
- la fréquence à laquelle vous y accédez.

Si votre activité relève surtout d'une assistance spontanée et ponctuelle, le comptage plus restreint du forfait **[Customized V2](https://rustdesk.com/pricing#custom2)**, détaillé plus bas, est conçu exactement pour ce cas de figure.

## En détail

Ce qui _change_ réellement la donne, c'est le forfait. Avec le forfait **[Customized V2](https://rustdesk.com/pricing#custom2)**, la définition d'un appareil géré est plus restreinte : seuls les appareils que vous **assignez à un groupe d'appareils ou à un utilisateur** comptent dans votre nombre d'appareils sous licence. Les machines auxquelles vous accédez uniquement pour une assistance ponctuelle — et que vous n'assignez jamais — ne sont pas comptabilisées, et elles ne sont pas désactivées. Si vous préférez que ces appareils non assignés n'apparaissent pas du tout dans la console, le [paramètre client `register-device`](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#register-device) permet de le contrôler, et il prend effet dès que le nombre de connexions simultanées sous licence atteint 2 ou plus. En pratique, une telle session d'assistance rapide n'affiche qu'un ID et un mot de passe à usage unique pour une seule connexion assistée, si bien qu'une interaction véritablement ponctuelle n'a jamais besoin d'une place permanente dans votre parc. Si une grande partie de votre activité ressemble à cela, Customized V2 est généralement le choix le plus adapté — envoyez un e-mail à [sales@rustdesk.com](mailto:sales@rustdesk.com) en décrivant votre scénario pour connaître les conditions actuelles, ou consultez [rustdesk.com/pricing](https://rustdesk.com/pricing).

Par exemple, imaginez un [MSP](/fr/blog/rustdesk-pour-les-msp-un-outil-unique-auto-heberge-et-personnalisable-a) avec 20 techniciens prenant en charge environ 1 000 machines clientes : il devrait satisfaire **les deux** dimensions de la licence — suffisamment d'utilisateurs de connexion pour les 20 techniciens, et suffisamment d'appareils gérés pour les machines maintenues accessibles. Pour les terminaux qui ne font l'objet que d'une intervention ponctuelle unique, la règle Customized V2 ci-dessus s'applique ; les quotas actuels sont disponibles sur [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Qui se pose cette question

Quiconque tente de convertir un nombre de sièges TeamViewer ou AnyDesk en unités RustDesk se heurte d'abord à cette définition, car les unités de licence ne se correspondent pas de façon directe. Les forfaits payants de RustDesk exigent une capacité à la fois pour les personnes qui se connectent et pour les appareils sous gestion.

## Questions connexes

- Licence par utilisateur ou par appareil, connexions simultanées et comptage des appareils pour Server Pro : voir [tarifs RustDesk](https://rustdesk.com/pricing).
- [Vous venez de TeamViewer — comment la tarification de RustDesk se compare-t-elle pour les MSP ?](/fr/blog/rustdesk-vs-teamviewer-lalternative-auto-hebergee)

Vous dimensionnez votre parc et vous ne savez pas si les interventions ponctuelles doivent entrer dans votre décompte d'appareils ? Consultez les conditions actuelles sur [rustdesk.com/pricing](https://rustdesk.com/pricing) ou contactez l'équipe avant d'acheter.
