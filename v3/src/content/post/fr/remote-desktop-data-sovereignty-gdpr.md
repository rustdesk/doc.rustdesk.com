---
publishDate: 2026-07-04T17:05:00Z
lang: 'fr'
translationKey: 'remote-desktop-data-sovereignty-gdpr'
draft: false
title: "Souveraineté des données et RGPD pour le bureau à distance : l'auto-hébergement"
excerpt: "Comment l'auto-hébergement donne aux équipes soumises à réglementation le contrôle des serveurs de rendez-vous, de relais et des données d'appareils — et quelles questions de RGPD et de conformité restent ouvertes."
image: '~/assets/images/blog/remote-desktop-data-sovereignty-gdpr-og.png'
category: 'Sécurité'
tags: ['RustDesk', 'Sécurité', 'GDPR', 'Auto-hébergement']
author: 'RustDesk Team'
slug: 'souverainete-des-donnees-et-rgpd-pour-le-bureau-a-distance-lauto'
faq:
  - question: 'RustDesk est-il conforme à ISO 27001, SOC 2 ou HIPAA ?'
    answer: "RustDesk est auto-hébergé, donc la conformité repose avant tout sur votre environnement : vous exploitez l'accès à distance au sein de votre propre périmètre ISO 27001 ou HIPAA et de vos contrôles existants, et le logiciel open source peut être audité directement plutôt que pris sur la foi d'une promesse. Si vous avez spécifiquement besoin d'un rapport SOC 2 fourni par l'éditeur, d'un BAA signé, d'un DPA ou de questionnaires de sécurité complétés, demandez à sales@rustdesk.com ce qui est disponible pour votre cas d'usage."
  - question: "L'auto-hébergement de RustDesk aide-t-il à la conformité RGPD ?"
    answer: "Oui — il vous donne le contrôle qui est généralement au cœur du RGPD : vous choisissez où résident les données du serveur d'identification/rendez-vous, du relais, de la console et des appareils, et pouvez les maintenir dans la région sur une infrastructure que vous exploitez. C'est une base solide plutôt qu'une garantie automatique, car le RGPD est un programme dans son ensemble — base légale, rôles de responsable/sous-traitant, conservation, contrôle d'accès, localisation des terminaux et réponse aux incidents restent à définir par vos soins, le responsable du traitement demeurant responsable."
  - question: 'Où vont réellement les données de session RustDesk ?'
    answer: "RustDesk tente d'abord une connexion pair-à-pair directe ; en cas d'échec, le trafic passe par le relais que vous avez configuré. L'auto-hébergement retire du chemin un serveur de rendez-vous et de relais exploité par l'éditeur, mais une session entre deux terminaux situés dans des pays différents traverse tout de même ces réseaux — l'emplacement du serveur seul ne suffit pas à confiner tout le trafic dans une seule juridiction."
  - question: "Puis-je conserver les données de bureau à distance au sein de l'UE avec RustDesk ?"
    answer: "Vous pouvez placer le serveur d'identification/rendez-vous, le relais, la console et les données d'appareils stockées dans un centre de données situé dans l'UE. Pour contraindre également le trafic de session, les deux terminaux doivent se trouver dans ce périmètre et la politique doit forcer le trafic à passer par votre relais approuvé ; documentez la localisation des terminaux et le routage en plus de l'emplacement du serveur."
  - question: 'Quelles fonctionnalités de RustDesk aident à respecter le RGPD ?'
    answer: "L'auto-hébergement conserve les données sur une infrastructure que vous contrôlez : la télémétrie d'usage que le service RustDesk hébergé traiterait normalement reste sur votre propre serveur lorsque vous vous auto-hébergez, et au-delà de la vérification de licence Server Pro, peu d'éléments doivent encore atteindre rustdesk.com. Server Pro ajoute des journaux d'audit intégrés avec rotation des journaux, un contrôle d'accès granulaire et un rôle de contrôle (Control Role), le SSO/LDAP et la 2FA sur les appareils contrôlés, un mode confidentialité et un consentement par connexion, ainsi que la suppression directe des utilisateurs, des appareils et des enregistrements (y compris via l'API REST) pour répondre aux demandes d'effacement et de conservation."
metadata:
  description: "Souveraineté des données du bureau à distance et RGPD : ce que l'auto-hébergement permet de contrôler, en quoi les sessions directes et relayées diffèrent, et pourquoi la conformité exige plus que le simple emplacement du serveur."
  keywords: 'souveraineté des données bureau à distance, accès à distance RGPD, résidence des données bureau à distance, conformité accès à distance auto-hébergé'
---

Si votre organisation est soumise au RGPD, à des règles de confidentialité propres au secteur de la santé, ou à une exigence du secteur public du type « nos données restent sur notre infrastructure », une seule question détermine quels outils de bureau à distance vous pouvez même envisager de présélectionner : **où vont réellement les données de session ?**

Avec la plupart des produits d'accès à distance grand public, la réponse est « par le cloud de l'éditeur ». Votre technicien se connecte, votre terminal se connecte, et le trafic est acheminé par des serveurs que vous ne possédez pas, dans une juridiction que vous ne contrôlez peut-être pas. Pour de nombreux acheteurs, cela ne pose aucun problème. Pour les équipes soumises à réglementation, c'est un problème de conformité avant même que quiconque ait partagé un écran.

Ce guide traite de la **souveraineté des données du bureau à distance** : ce que cela signifie, pourquoi c'est important pour les acheteurs soumis à réglementation et les acheteurs européens, et quelles parties d'un déploiement d'accès à distance l'auto-hébergement permet de contrôler. Nous prendrons RustDesk comme exemple concret.

## Ce que signifie la « souveraineté des données » pour l'accès à distance

La souveraineté des données est le principe selon lequel les données sont soumises aux lois du pays où elles sont physiquement stockées et traitées. Pour le support à distance, les données sensibles ne se limitent pas aux fichiers que vous transférez — il s'agit de la session elle-même : ce qui s'affiche à l'écran, la liste des appareils que vous gérez, les métadonnées de connexion et, souvent, l'acheminement des pixels en temps réel.

Les questions essentielles sont les suivantes : **quels systèmes stockent les métadonnées, quels systèmes relaient le trafic, et où se trouvent les deux terminaux ?** L'auto-hébergement peut retirer du chemin un service de rendez-vous ou de relais exploité par l'éditeur, mais il ne peut pas garantir qu'une session entre des terminaux situés dans des pays différents reste dans une seule juridiction.

## La différence fondamentale : cloud de l'éditeur ou votre propre infrastructure

C'est ici que l'architecture, et non le marketing, détermine le résultat.

**RustDesk Server Pro est auto-hébergé.** Le serveur d'identification/rendez-vous, le serveur de relais, la console web et les données des appareils gérés fonctionnent sur l'infrastructure de votre choix. RustDesk tente d'abord d'établir une connexion pair-à-pair directe par perforation NAT (hole punching) ; en cas d'échec, le trafic de session passe par le relais que vous avez configuré. Cela vous donne le contrôle de la couche rendez-vous/relais et des données d'appareils stockées, mais les terminaux et leurs routes réseau déterminent toujours où circule le trafic direct.

|                                       | Outils cloud propriétaires       | RustDesk auto-hébergé                                                                                  |
| ------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Où les sessions sont coordonnées      | Le cloud de l'éditeur            | Votre serveur d'identification/rendez-vous                                                             |
| Où circule le trafic de session       | Routage défini par l'éditeur     | Direct entre les terminaux lorsque possible ; sinon via votre relais                                   |
| Qui contrôle la résidence des données | L'éditeur                        | Vous choisissez l'emplacement côté serveur et la politique de relais ; les terminaux comptent toujours |
| Auditabilité du client                | Généralement à code source fermé | [Open source (AGPL)](https://github.com/rustdesk/rustdesk) — à lire et à compiler vous-même            |
| Qui exploite le serveur               | L'éditeur                        | Votre équipe                                                                                           |

Les équipes qui évaluent l'auto-hébergement citent souvent la possibilité de choisir l'emplacement et l'opérateur des systèmes de rendez-vous, de relais et de gestion. Il s'agit d'un contrôle significatif, mais il doit être documenté conjointement avec la localisation des terminaux et le comportement de routage.

## Avantage 1 : vous contrôlez l'emplacement des données côté serveur

Placer les services d'identification, de relais et de gestion dans un centre de données allemand vous permet de documenter où résident ces services et les données qu'ils stockent. Si les deux terminaux se trouvent également dans le périmètre requis et que la politique force le trafic à passer par un relais approuvé, vous pouvez concevoir un itinéraire plus contraint. Sans ces contrôles supplémentaires, l'emplacement du serveur seul ne permet pas d'établir que tout le trafic de session reste en Allemagne.

## Avantage 2 : l'open source permet de le prouver, pas seulement d'y croire

La souveraineté des données ne concerne pas uniquement l'emplacement — elle concerne aussi le fait de savoir ce que fait réellement le logiciel. Le cœur de RustDesk est **open source sous licence AGPL**. Vous (ou votre équipe sécurité) pouvez lire le code, auditer exactement ce que fait le client, le compiler vous-même, et exploiter indéfiniment le serveur communautaire gratuit. Cette auditabilité compte plus que d'ordinaire pour l'accès à distance : parce que le logiciel se voit confier le contrôle total d'une machine, les acheteurs des secteurs réglementés veulent de plus en plus vérifier eux-mêmes ce que fait un client plutôt que de s'en remettre à la parole de l'éditeur. Pouvoir inspecter le client par vous-même constitue une réponse concrète à la question « comment le savoir ? »

## Avantage 3 : la souveraineté sans surcoût de licence

Les plans standards de RustDesk sont facturés **par utilisateur connecté plus par appareil géré**, et incluent un nombre illimité de connexions simultanées ; [Customized V2](https://rustdesk.com/pricing#custom2) limite et facture au contraire les connexions simultanées. Vous pouvez [mettre à niveau une licence](/fr/blog/mettre-a-niveau-sa-licence-rustdesk-en-cours-dabonnement-comment-ca) au fil de l'évolution de vos besoins. Vérifiez la grille tarifaire actuelle avant tout achat.

L'architecture s'adapte également à la taille de votre parc : RustDesk publie un [guide de planification pour les grands parcs](/fr/blog/rustdesk-peut-il-monter-en-charge-jusqua-200-000-appareils) destiné aux équipes qui évaluent des déploiements de plus grande ampleur. Pour le [contrôle d'accès par utilisateur](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/permissions/), les déploiements auto-hébergés incluent une [console web](https://rustdesk.com/docs), un générateur de client personnalisé à votre marque, des groupes d'appareils avec un carnet d'adresses partagé, et [LDAP/SSO](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/ldap/) (OIDC) disponible à partir du plan Basic.

## Comment RustDesk s'intègre aux exigences ISO 27001, SOC 2 ou HIPAA

Les équipes achats en entreprise et les équipes du secteur de la santé demandent presque toujours comment un outil d'accès à distance s'articule avec ISO 27001, SOC 2 ou HIPAA. Avec un produit cloud, vous héritez de la certification de _son_ infrastructure par l'éditeur — et vous en dépendez. Le modèle de RustDesk est différent, et pour les équipes soumises à réglementation, cette différence joue généralement en votre faveur : parce que vous **vous auto-hébergez**, l'accès à distance s'exécute au sein de l'environnement que vous contrôlez et auditez déjà, et relève donc de _votre_ périmètre ISO 27001 ou HIPAA et de _vos_ contrôles existants, plutôt que de ceux d'un tiers. Vous placez le serveur d'identification, le relais et la console sur une infrastructure déjà couverte par votre programme, et — parce que RustDesk est [open source](https://github.com/rustdesk/rustdesk) — votre équipe sécurité peut lire et vérifier exactement ce qu'il fait dans le cadre d'une évaluation, plutôt que de faire confiance à un binaire fermé.

Quelques remarques pratiques :

- L'auto-hébergement conserve les systèmes sensibles — rendez-vous, relais, console et données d'appareils — sur du matériel que vous possédez, ce qui est précisément ce qu'un contrôle de résidence des données ou HIPAA cherche généralement à garantir. La liste de contrôle de déploiement plus loin dans cet article transforme cela en contrôles documentés.
- Si votre processus d'achat exige spécifiquement un rapport SOC 2 fourni par l'éditeur, un Business Associate Agreement (BAA) signé, un DPA, ou des questionnaires de sécurité complétés, demandez à l'équipe RustDesk à l'adresse [sales@rustdesk.com](mailto:sales@rustdesk.com) ce qui est actuellement disponible pour votre cas d'usage.
- RustDesk étant open source, la question « comment savoir ce qu'il fait ? » trouve sa réponse dans l'inspection du code, et non dans un certificat qu'il faudrait croire sur parole.

En résumé, l'auto-hébergement vous permet d'intégrer l'accès à distance dans le programme de conformité que vous exploitez déjà — une position souvent plus solide, pour une équipe soumise à réglementation, que la location d'une boîte noire certifiée.

## Les contrôles qui soutiennent un programme RGPD auto-hébergé

L'auto-hébergement constitue la fondation, et RustDesk apporte par-dessus des contrôles concrets sur lesquels les équipes auto-hébergées s'appuient pour respecter le RGPD dans la pratique :

- **La télémétrie va vers votre serveur, pas vers RustDesk.** Les données d'usage décrites dans la politique de confidentialité de RustDesk — démarrage de l'application, adresse IP, statistiques machine de base, horaires de session et identifiants RustDesk — sont celles que traite le **service hébergé public** de RustDesk ; lorsque vous exploitez vos propres serveurs d'identification/rendez-vous et de relais, ces données restent au contraire sur **votre** infrastructure. Au-delà de la vérification de licence Server Pro, peu d'éléments doivent encore atteindre rustdesk.com — vérifiez les connexions sortantes exactes pour la version du client et les paramètres que vous déployez. Cela permet, par défaut, de conserver les données de session et d'usage sur une infrastructure que vous contrôlez, une posture solide de minimisation des données.
- **Rotation et conservation intégrées des journaux d'audit.** Les journaux d'audit de Server Pro se déclinent en quatre catégories — connexion, transfert de fichiers, alarme et opération sur la console — avec une **rotation des journaux intégrée** afin que les données d'audit ne soient pas conservées indéfiniment (limitation de la conservation), et vous pouvez les exporter depuis la console web ou via l'API REST pour vos registres de traitement.
- **Accès granulaire et circonscrit.** Les affectations par utilisateur, les groupes d'appareils, les règles inter-groupes et un rôle de contrôle (Control Role — ce qu'un technicien peut faire pendant une session : clavier/souris, presse-papiers, transfert de fichiers, audio, caméra, terminal, impression, enregistrement, et plus encore) appliquent le principe du moindre privilège et la limitation des finalités, avec en appui le SSO/LDAP et la 2FA sur les appareils contrôlés.
- **Mode confidentialité et consentement par connexion.** Le poste contrôlé peut exiger une confirmation pour toute connexion entrante et peut noircir son écran (mode confidentialité, pris en charge sous Windows et macOS) pendant une session, limitant l'exposition accidentelle de données personnelles à l'écran.
- **Suppression selon vos propres conditions.** Les données résidant sur votre serveur, vous pouvez désactiver ou supprimer des utilisateurs, supprimer des appareils et des enregistrements — y compris via l'API REST — et traiter directement les demandes d'effacement et de conservation.
- **Infrastructure régionale et auto-exploitée.** Le serveur d'identification/rendez-vous, le relais, la console et les données stockées s'exécutent là où vous les placez, sur du matériel que vous contrôlez.
- **Même la génération de clients personnalisés ne laisse aucune trace.** La génération d'un client à votre marque est la seule étape qui fait appel au service de compilation de RustDesk, et elle est délibérément conçue comme éphémère : la configuration de compilation que vous soumettez n'est pas conservée sur le serveur de compilation de RustDesk (elle est supprimée dès la fin de la compilation), et le programme d'installation généré est automatiquement supprimé après environ un jour — c'est donc à vous de le télécharger et de le conserver.

Ce sont des leviers qu'un programme RGPD peut réellement actionner : vous devez toujours les documenter et les exploiter, mais vous n'êtes pas dans l'attente qu'un éditeur donne suite à une demande émanant d'une personne concernée.

## Une souveraineté que vous pouvez démontrer

Héberger vous-même le rendez-vous, le relais, la console et les données stockées donne à un programme de conformité quelque chose de concret : une infrastructure que vous placez, exploitez et auditez. C'est une fondation plutôt qu'un aboutissement, mais c'est l'élément sur lequel tout le reste repose.

## Liste de contrôle de déploiement pour le RGPD et la souveraineté

L'auto-hébergement vous donne des choix ; le déploiement doit transformer ces choix en contrôles :

- Documentez la localisation du serveur d'identification, du relais, de la console, des sauvegardes, des journaux et des administrateurs.
- Cartographiez séparément les routes pair-à-pair directes et les routes relayées. Un serveur situé en Allemagne ne maintient pas en Allemagne une session directe entre l'Allemagne et un autre pays.
- Déterminez dans quels cas le relais doit être forcé, lorsque le fait de router le trafic par un emplacement contrôlé importe davantage que la performance du pair-à-pair.
- Consignez la finalité, la durée de conservation et la politique d'accès applicables aux métadonnées d'appareils, de comptes, d'audit et de connexion.
- Appliquez des groupes d'appareils fondés sur le moindre privilège, l'authentification MFA/SSO lorsqu'elle est disponible, et un processus de gestion des arrivées, mutations et départs (joiner-mover-leaver) pour les techniciens.
- Placez la console web derrière HTTPS, restreignez l'accès réseau administratif, et testez la restauration des sauvegardes.
- Réalisez l'évaluation juridique appropriée — registre des activités de traitement, examen des sous-traitants, analyse des transferts et analyse d'impact relative à la protection des données (AIPD) — selon votre cas d'usage.

RustDesk peut soutenir une architecture de souveraineté, mais le responsable du traitement demeure responsable de l'architecture et de sa base légale.

## Évaluez-le au sein de votre propre périmètre

Vous pouvez procéder à l'évaluation selon vos propres conditions. Auto-hébergez dès aujourd'hui le serveur communautaire gratuit et open source, ou écrivez à [sales@rustdesk.com](mailto:sales@rustdesk.com) pour connaître les conditions d'évaluation actuelles des fonctionnalités Pro. Consultez les plans actuels et le détail des fonctionnalités sur [rustdesk.com/pricing](https://rustdesk.com/pricing). Vous préférez d'abord regarder ? Une démonstration vidéo complète est disponible sur la [chaîne YouTube de RustDesk](https://www.youtube.com/@rustdesk).
