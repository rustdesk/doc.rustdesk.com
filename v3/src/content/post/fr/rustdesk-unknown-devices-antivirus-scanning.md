---
publishDate: 2026-06-30T13:46:00Z
lang: fr
translationKey: rustdesk-unknown-devices-antivirus-scanning
draft: false
title: "Des appareils inconnus dans votre console RustDesk ? Enquêtez d'abord"
excerpt: "Vous voyez des appareils inconnus dans votre console RustDesk ? Le sandboxing antivirus est une explication possible, mais il faut d'abord écarter une configuration compromise ou un enregistrement non autorisé."
image: ~/assets/images/blog/rustdesk-unknown-devices-antivirus-scanning-og.png
category: 'Déploiement'
tags: ['RustDesk', 'Déploiement', 'Sécurité']
author: RustDesk Team
slug: 'des-appareils-inconnus-dans-votre-console-rustdesk-enquetez-dabord'
faq:
  - question: "Pourquoi des appareils inconnus, que je n'ai jamais installés, apparaissent-ils dans ma console RustDesk ?"
    answer: "Le sandboxing des antivirus ou des solutions de protection des terminaux peut créer des enregistrements temporaires, mais un appareil inconnu peut aussi indiquer une configuration compromise, un jeton de déploiement exposé, un enregistrement non autorisé ou une erreur de déploiement. Traitez-le comme un incident de sécurité tant que les journaux, les identifiants, les clés, les jetons et les registres de déploiement n'ont pas permis d'en identifier la cause ; restreignez ensuite l'enregistrement de nouveaux appareils."
  - question: "Comment empêcher totalement l'enregistrement de nouveaux appareils inconnus ?"
    answer: "Si votre liste d'appareils est stable et que vous n'ajoutez pas régulièrement de nouvelles machines, désactivez l'enregistrement de nouveaux appareils dans la console via Paramètres → Autres → Désactiver les nouveaux appareils sur la console web. Plus aucun appareil ne pourra s'enregistrer, qu'il s'agisse d'un sandbox ou non. Si vous continuez à déployer régulièrement de nouveaux appareils, utilisez plutôt un jeton de déploiement afin que vos déploiements réels continuent de fonctionner."
  - question: 'Comment exiger un jeton de déploiement pour les nouveaux appareils ?'
    answer: "Activez Paramètres → Autres → Exiger un déploiement pour les nouveaux appareils dans la console web, créez un jeton API avec la permission Devices définie sur Lecture et écriture, puis faites en sorte que votre processus d'installation exécute rustdesk --deploy --token <api_token> sur chaque nouvel appareil (avec sudo sous macOS et Linux). Seuls les appareils présentant un jeton valide peuvent s'enregistrer : un scan antivirus en sandbox ne peut donc pas s'ajouter lui-même, tandis que votre RMM ou votre déploiement scripté continue de fonctionner normalement."
  - question: "Comment distinguer un scan antivirus bénin d'une véritable intrusion ?"
    answer: "Un enregistrement de courte durée qui coïncide avec un scan de sécurité connu et qui n'est suivi d'aucune session peut appuyer l'hypothèse du sandbox. Des sessions inattendues, un enregistrement répété, l'utilisation d'identifiants valides ou la distribution d'un client configuré en dehors de son canal prévu ne sont pas bénins et justifient une réponse à incident."

metadata:
  description: "Les appareils inconnus dans votre console RustDesk nécessitent une enquête. Découvrez comment distinguer le sandboxing antivirus d'une configuration compromise ou d'un enregistrement non autorisé."
  keywords: "appareil inconnu rustdesk, appareil fantôme rustdesk, enregistrement aléatoire d'appareil rustdesk, sandbox antivirus rustdesk, désactiver nouveaux appareils rustdesk, rustdesk --deploy"
---

La présence d'un appareil inconnu dans la console RustDesk ne suffit pas à en identifier la cause. Le sandboxing antivirus est une explication connue, mais le même symptôme peut aussi résulter d'une configuration compromise, d'un enregistrement non autorisé, d'un jeton exposé ou d'une erreur de déploiement.

## La réponse courte

Certains produits antivirus/EDR exécutent des binaires inconnus dans des sandboxes cloud. Si un sandbox reçoit une version du client contenant votre configuration serveur et parvient à atteindre le serveur d'ID, il peut s'enregistrer brièvement. Cependant, une adresse IP appartenant à un fournisseur cloud ou un nom de machine inhabituel ne prouve **pas** cette explication ; les attaquants utilisent eux aussi des hébergeurs cloud. Conservez et examinez les preuves avant d'écarter l'incident.

## En détail

### Pourquoi cela se produit

Les clients RustDesk peuvent s'enregistrer auprès du serveur d'ID/rendez-vous configuré dès qu'ils s'exécutent et parviennent à l'atteindre. Cela fait de l'exécution en sandbox une cause plausible, comme l'explique une [discussion publique sur GitHub](https://github.com/rustdesk/rustdesk-server-pro/discussions/307), mais cela signifie aussi que toute personne disposant d'un client configuré ou de données de déploiement valides peut produire un enregistrement similaire.

Avant de qualifier l'incident, examinez les journaux d'enregistrement et de connexion du serveur, l'heure de première apparition de l'appareil ainsi que son adresse IP source, les registres de déploiement et le canal de distribution des clients personnalisés. Le cas échéant, changez les mots de passe exposés, les jetons API/de déploiement, ainsi que la configuration ou les clés du serveur. Vérifiez si les mêmes identifiants ont été réutilisés ailleurs et si l'appareil inconnu a tenté ou établi une session.

### Comment l'empêcher

Deux paramètres de la console permettent de résoudre ce problème ; celui qui vous convient dépend du fait que vous intégriez encore activement ou non de nouveaux appareils réels.

**Option 1 — désactiver entièrement l'enregistrement de nouveaux appareils.** Si votre liste d'appareils est globalement stable et que vous n'ajoutez pas régulièrement de nouvelles machines, c'est la solution la plus simple : rendez-vous dans **Paramètres → Autres → Désactiver les nouveaux appareils sur la console web**. Plus aucun nouvel appareil ne pourra s'enregistrer, qu'il s'agisse d'un sandbox ou non.

**Option 2 — exiger un jeton de déploiement.** Si vous déployez encore régulièrement de nouveaux appareils (un MSP qui intègre des clients, une équipe IT qui image de nouvelles machines), un paramètre global consistant à « désactiver les nouveaux appareils » vous mettrait des bâtons dans les roues. Activez plutôt **Paramètres → Autres → Exiger un déploiement pour les nouveaux appareils**, créez un jeton API (permission Devices, Lecture et écriture), puis faites en sorte que votre processus d'installation exécute la [commande de déploiement documentée](https://rustdesk.com/docs/en/self-host/client-deployment/#explicit-deployment-for-new-devices) sur chaque appareil :

```
rustdesk --deploy --token <api_token>
```

Le nom exact de l'option peut changer d'une version à l'autre : considérez ceci comme illustratif et vérifiez la syntaxe actuelle dans la documentation de RustDesk Server Pro avant de l'intégrer à un script. Seul un appareil présentant un jeton valide est ajouté à votre inventaire. Un scan antivirus en sandbox — qui n'a aucun moyen de connaître ou de fournir ce jeton — échoue à s'enregistrer, tandis que votre déploiement réel continue de fonctionner normalement. C'est aussi le mécanisme que les MSP utilisent pour intégrer des appareils via un RMM ou une installation scriptée, sans qu'un technicien ait à se connecter manuellement sur chaque machine.

**Un contrôle connexe, plus ciblé :** si vous préférez laisser l'enregistrement ouvert mais simplement garder les appareils non assignés hors de vue tant que vous ne les avez pas examinés, il existe aussi **Paramètres → Autres → Seul l'administrateur peut accéder aux appareils non assignés** — cette option n'empêche pas l'enregistrement, mais elle garantit que les utilisateurs standards ne pourront ni voir ni toucher à quoi que ce soit qui apparaît avant que vous ayez eu l'occasion de l'examiner.

### Comment évaluer le résultat

L'enregistrement seul ne prouve pas qu'un attaquant a contrôlé un autre terminal, mais il s'agit tout de même d'une activité non autorisée tant qu'elle n'est pas expliquée. Un enregistrement de courte durée qui coïncide avec un scan de sécurité connu et qui n'est suivi d'aucun accès peut appuyer l'hypothèse du sandbox. Des sessions inattendues, un enregistrement répété, l'utilisation d'identifiants valides ou la distribution d'un client configuré en dehors de son canal prévu nécessitent une réponse à incident.

## Qui pose cette question

Les nouveaux opérateurs de serveurs — administrateurs IT comme MSP — rencontrent généralement ce cas de figure quelques jours après la mise en place d'un serveur auto-hébergé, avant d'avoir renforcé les contrôles d'enregistrement. Une enquête rapide est essentielle, car un scan bénin et un enregistrement non autorisé peuvent se ressembler dans la console.

## Questions connexes

- Générer un client personnalisé à votre marque : consultez la [documentation RustDesk](https://rustdesk.com/docs).
- [Qu'est-ce qui compte comme appareil géré dans RustDesk ?](/fr/blog/quest-ce-qui-compte-comme-appareil-gere-dans-rustdesk)
- [Consultez les versions actuelles de RustDesk et les correctifs de sécurité](https://github.com/rustdesk/rustdesk/releases)
- [RustDesk pour les MSP : un outil unique, auto-hébergé et personnalisable](/fr/blog/rustdesk-pour-les-msp-un-outil-unique-auto-heberge-et-personnalisable-a)
  Vous voyez un appareil que vous ne reconnaissez pas ? Conservez les journaux pertinents, restreignez les nouveaux enregistrements, changez tout secret potentiellement exposé, et contactez le support RustDesk en fournissant des détails de diagnostic non sensibles si la cause reste incertaine.
