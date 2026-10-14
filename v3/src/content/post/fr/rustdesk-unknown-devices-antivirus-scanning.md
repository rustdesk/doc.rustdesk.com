---
publishDate: 2026-06-30T13:46:00Z
updateDate: 2026-10-14T00:00:00Z
lang: fr
translationKey: rustdesk-unknown-devices-antivirus-scanning
draft: false
title: "Des appareils inconnus dans votre console RustDesk ? Enquêtez d'abord"
excerpt: "Des appareils inconnus dans votre console RustDesk ? Le sandboxing antivirus est une explication possible, mais il faut d'abord écarter une fuite de configuration ou un enregistrement non autorisé."
image: ~/assets/images/blog/rustdesk-unknown-devices-antivirus-scanning-og.webp
category: 'Déploiement'
tags: ['RustDesk', 'Déploiement', 'Sécurité']
author: RustDesk Team
slug: 'des-appareils-inconnus-dans-votre-console-rustdesk-enquetez-dabord'
faq:
  - question: "Pourquoi des appareils inconnus, que je n'ai jamais installés, apparaissent-ils dans ma console RustDesk ?"
    answer: "Le sandboxing des antivirus ou des solutions de protection des terminaux peut créer des enregistrements temporaires, mais un appareil inconnu peut aussi révéler une fuite de configuration, un jeton de déploiement exposé, un enregistrement non autorisé ou une erreur de déploiement. Traitez-le comme un incident de sécurité tant que les journaux, les identifiants, les clés, les jetons et les registres de déploiement n'en ont pas établi la cause ; restreignez ensuite l'enregistrement de nouveaux appareils."
  - question: "Comment empêcher totalement l'enregistrement d'appareils inconnus ?"
    answer: "Si votre liste d'appareils est stable et que vous n'ajoutez pas régulièrement de machines, désactivez l'enregistrement de nouveaux appareils dans la console via Paramètres → Autres → Désactiver les nouveaux appareils sur la console web (Disable new devices on web console). Plus rien ne peut alors s'enregistrer, sandbox ou non. Si vous intégrez encore régulièrement des appareils, utilisez plutôt un jeton de déploiement afin que vos vrais déploiements continuent de fonctionner."
  - question: 'Comment exiger un jeton de déploiement pour les nouveaux appareils ?'
    answer: "Activez Paramètres → Autres → Exiger le déploiement pour les nouveaux appareils, créez un jeton API disposant de l'autorisation Appareils en lecture et écriture, et exécutez rustdesk --deploy --token <api_token> lors de chaque installation autorisée (avec sudo sous macOS et Linux). Une sandbox ne peut emprunter ce chemin d'enregistrement que si elle obtient aussi le jeton. Tenez les jetons à l'écart des clients distribués et des scripts publics, limitez leurs autorisations et renouvelez tout jeton exposé."
  - question: "Comment distinguer un scan antivirus bénin d'une véritable intrusion ?"
    answer: "Un enregistrement de courte durée qui coïncide avec un scan de sécurité connu et n'est suivi d'aucune session peut appuyer l'hypothèse de la sandbox. Des sessions inattendues, des enregistrements répétés, l'utilisation d'identifiants valides ou la distribution d'un client configuré en dehors de son canal prévu n'ont rien de bénin et justifient une réponse à incident."

metadata:
  description: "Appareils inconnus dans la console RustDesk : comment distinguer le sandboxing antivirus d'une fuite de configuration ou d'un enregistrement non autorisé."
  keywords: "appareil inconnu rustdesk, appareil fantôme rustdesk, enregistrement aléatoire d'appareil rustdesk, sandbox antivirus rustdesk, désactiver nouveaux appareils rustdesk, rustdesk --deploy"
---

La présence d'un appareil inconnu dans la console RustDesk ne suffit pas à en identifier la cause. Le sandboxing antivirus est une explication connue, mais le même symptôme peut aussi résulter d'une fuite de configuration, d'un enregistrement non autorisé, d'un jeton exposé ou d'une erreur de déploiement.

## La réponse courte

Certains produits antivirus ou EDR exécutent les binaires inconnus dans des sandboxes cloud. Si une sandbox reçoit un build du client contenant votre configuration serveur et parvient à joindre le serveur ID, elle peut s'enregistrer brièvement. Toutefois, une adresse IP de fournisseur cloud ou un nom de machine inhabituel ne prouve **pas** cette explication : les attaquants utilisent eux aussi des hébergeurs cloud. Conservez et examinez les preuves avant de classer l'incident.

## En détail

### Pourquoi cela se produit

Les clients RustDesk peuvent s'enregistrer auprès du serveur ID/rendez-vous configuré dès qu'ils s'exécutent et parviennent à le joindre. L'exécution en sandbox est donc une cause plausible, comme l'explique une [discussion publique sur GitHub](https://github.com/rustdesk/rustdesk-server-pro/discussions/307), mais cela signifie aussi que toute personne disposant d'un client configuré ou d'éléments de déploiement valides peut produire un enregistrement similaire.

Avant de qualifier l'incident, examinez les journaux d'enregistrement et de connexion du serveur, l'heure de première apparition de l'appareil et son adresse IP source, les registres de déploiement et le canal de distribution des clients personnalisés. Selon le cas, changez les mots de passe exposés, les jetons API ou de déploiement, ainsi que la configuration ou les clés du serveur. Vérifiez si les mêmes identifiants ont été réutilisés ailleurs et si l'appareil inconnu a tenté ou établi une session.

### Comment l'empêcher

Deux paramètres de la console règlent le problème ; le bon choix dépend de si vous intégrez encore activement de vrais nouveaux appareils.

**Option 1 — désactiver entièrement l'enregistrement de nouveaux appareils.** Si votre liste d'appareils est globalement stable et que vous n'ajoutez pas régulièrement de machines, c'est la solution la plus simple : allez dans **Paramètres → Autres → Désactiver les nouveaux appareils sur la console web** (Disable new devices on web console). Plus aucun nouvel appareil ne peut s'enregistrer, sandbox ou non.

**Option 2 — exiger un jeton de déploiement.** Si vous déployez encore régulièrement de nouveaux appareils (un MSP qui intègre des clients, une équipe informatique qui prépare de nouvelles machines), un réglage global « désactiver les nouveaux appareils » vous mettrait des bâtons dans les roues. Activez plutôt **Paramètres → Autres → Exiger le déploiement pour les nouveaux appareils**, créez un jeton API (autorisation Appareils, Lecture et écriture), puis faites exécuter par votre processus d'installation la [commande de déploiement documentée](https://rustdesk.com/docs/fr/self-host/client-deployment/#déploiement-explicite-des-nouveaux-appareils) sur chaque appareil :

```
rustdesk --deploy --token <api_token>
```

La [documentation de déploiement](https://rustdesk.com/docs/fr/self-host/client-deployment/#déploiement-explicite-des-nouveaux-appareils) décrit ce chemin d'enregistrement. Exiger un jeton peut bloquer une sandbox qui ne reçoit que le client configuré, **à condition que le jeton ne figure ni dans ce client ni dans ses supports d'installation**. Une sandbox ou un attaquant disposant d'un jeton valide peut tout de même enregistrer un appareil. Protégez la distribution des jetons, accordez les autorisations minimales nécessaires et renouvelez tout jeton susceptible d'avoir fuité.

**Un contrôle voisin, plus ciblé :** si vous préférez laisser l'enregistrement ouvert mais garder les appareils non assignés hors de vue tant que vous ne les avez pas examinés, il existe aussi **Paramètres → Autres → Seul l'administrateur peut accéder aux appareils non assignés** (Only admin can access unassigned devices). Ce réglage n'empêche pas l'enregistrement, mais les utilisateurs ordinaires ne pourront ni voir ni toucher ce qui apparaît avant que vous ayez pu l'examiner.

### Comment évaluer le résultat

Un enregistrement seul ne prouve pas qu'un attaquant a pris le contrôle d'un autre terminal, mais il reste une activité non autorisée tant qu'il n'est pas expliqué. Un enregistrement de courte durée qui coïncide avec un scan de sécurité connu et n'est suivi d'aucun accès peut appuyer l'hypothèse de la sandbox. Des sessions inattendues, des enregistrements répétés, l'utilisation d'identifiants valides ou la distribution d'un client configuré en dehors de son canal prévu exigent une réponse à incident.

## Qui pose cette question

Les nouveaux exploitants de serveurs — administrateurs informatiques comme MSP — y sont généralement confrontés quelques jours après la mise en place d'un serveur auto-hébergé, avant d'avoir resserré les contrôles d'enregistrement. Enquêter tôt est essentiel, car un scan bénin et un enregistrement non autorisé peuvent se ressembler dans la console.

## Questions connexes

- Générer un client personnalisé à votre marque : consultez la [documentation RustDesk](https://rustdesk.com/docs).
- [Qu'est-ce qui compte comme appareil géré dans RustDesk ?](/fr/blog/quest-ce-qui-compte-comme-appareil-gere-dans-rustdesk)
- [Consultez les versions actuelles de RustDesk et leurs correctifs de sécurité](https://github.com/rustdesk/rustdesk/releases)
- [RustDesk pour les MSP : un outil unique, auto-hébergé et personnalisable à votre marque](/fr/blog/rustdesk-pour-les-msp-un-outil-unique-auto-heberge-et-personnalisable-a)

Vous voyez un appareil que vous ne reconnaissez pas ? Conservez les journaux pertinents, restreignez les nouveaux enregistrements, changez tout secret potentiellement exposé, et contactez le support RustDesk en fournissant des éléments de diagnostic non sensibles si la cause reste incertaine.
