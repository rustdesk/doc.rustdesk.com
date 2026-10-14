---
publishDate: 2026-07-04T17:05:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'fr'
translationKey: 'remote-desktop-data-sovereignty-gdpr'
draft: false
title: "Souveraineté des données et RGPD pour le bureau à distance : l'auto-hébergement"
excerpt: "Comment l'auto-hébergement donne aux équipes réglementées la maîtrise du rendez-vous, du relais et des données d'appareils — et quelles questions de RGPD et de conformité restent ouvertes."
image: '~/assets/images/blog/remote-desktop-data-sovereignty-gdpr-og.webp'
category: 'Sécurité'
tags: ['RustDesk', 'Sécurité', 'GDPR', 'Auto-hébergement']
author: 'RustDesk Team'
slug: 'souverainete-des-donnees-et-rgpd-pour-le-bureau-a-distance-lauto'
faq:
  - question: 'RustDesk est-il conforme à ISO 27001, SOC 2 ou HIPAA ?'
    answer: "RustDesk auto-hébergé s'évalue dans votre propre programme de conformité : le serveur ID/rendez-vous, le relais et la console s'exécutent sur une infrastructure que vous exploitez, et relèvent donc de votre périmètre ISO 27001, de vos contrôles SOC 2 ou de vos mesures de protection HIPAA, comme le reste de votre environnement. L'auto-hébergement est une mesure de déploiement, pas une certification. Demandez à sales@rustdesk.com quels rapports, BAA, DPA ou justificatifs d'achat sont disponibles pour votre scénario."
  - question: "L'auto-hébergement de RustDesk aide-t-il à la conformité RGPD ?"
    answer: "Oui. Il vous donne le contrôle qui est généralement au cœur du RGPD : vous choisissez où résident le serveur ID/rendez-vous, le relais, la console et les données d'appareils, et pouvez les garder dans la région, sur une infrastructure que vous exploitez. C'est une base solide, pas une garantie automatique, car le RGPD est un programme : base légale, rôles de responsable du traitement et de sous-traitant, conservation, contrôle d'accès, localisation des terminaux et réponse aux incidents restent à définir, et le responsable du traitement demeure responsable."
  - question: 'Où vont réellement les données de session RustDesk ?'
    answer: "RustDesk tente d'abord une connexion pair-à-pair directe ; en cas d'échec, le trafic passe par le relais que vous avez configuré. L'auto-hébergement retire du chemin un serveur de rendez-vous et de relais exploité par un éditeur, mais une session entre des terminaux situés dans des pays différents traverse tout de même les réseaux de ces pays : l'emplacement du serveur ne suffit pas à confiner tout le trafic dans une seule juridiction."
  - question: "Puis-je conserver les données de bureau à distance au sein de l'UE avec RustDesk ?"
    answer: "Oui. Vous pouvez placer le serveur ID/rendez-vous, le relais, la console et les données d'appareils stockées dans un centre de données situé dans l'UE. Pour encadrer aussi le trafic de session, les deux terminaux doivent se trouver dans ce périmètre et une politique doit forcer le passage par votre relais approuvé ; documentez la localisation des terminaux et le routage en plus de l'emplacement des serveurs."
  - question: 'Quelles fonctionnalités de RustDesk aident à respecter le RGPD ?'
    answer: "RustDesk Server Pro fournit des journaux d'audit à durée de conservation configurable (Paramètres > Autre > Conservation des journaux (jours), où 0 conserve les journaux indéfiniment), le Contrôle d'accès et le Rôle de contrôle pour le moindre privilège, le SSO LDAP/OIDC, le consentement à chaque connexion, le mode de confidentialité sous Windows et macOS, et la suppression des utilisateurs et des appareils via la console ou l'API pour les demandes d'effacement. L'auto-hébergement vous permet de choisir où tout cela s'exécute."
metadata:
  description: "Bureau à distance, souveraineté et RGPD : ce que l'auto-hébergement maîtrise, sessions directes ou relayées, et pourquoi l'emplacement du serveur ne suffit pas."
  keywords: 'souveraineté des données bureau à distance, accès à distance RGPD, résidence des données bureau à distance, conformité accès à distance auto-hébergé'
---

Si votre organisation est soumise au RGPD, à des règles de confidentialité du secteur de la santé ou à une exigence du secteur public du type « nos données restent sur notre infrastructure », une question détermine les outils de bureau à distance que vous pouvez même présélectionner : **où vont réellement les données de session ?**

Dans un service hébergé par un éditeur, c'est généralement l'éditeur qui exploite la coordination et stocke les données de gestion et de compte. Les flux de la session peuvent circuler directement entre les terminaux ou passer par un relais. Une analyse des flux de données doit distinguer ces chemins : une mise en relation « par le cloud » ne signifie pas que chaque paquet d'écran y transite.

Ce guide traite de la **souveraineté des données du bureau à distance** : ce qu'elle signifie, pourquoi elle compte pour les acheteurs réglementés et européens, et quelles parties d'un déploiement d'accès à distance l'auto-hébergement permet de maîtriser. Nous prendrons RustDesk comme exemple concret.

## Ce que signifie la « souveraineté des données » pour l'accès à distance

La souveraineté des données est le principe selon lequel les données sont soumises aux lois du pays où elles sont physiquement stockées et traitées. Pour l'assistance à distance, les données sensibles ne se limitent pas aux fichiers que vous transférez : c'est la session elle-même — ce qui s'affiche à l'écran, la liste des appareils que vous gérez, les métadonnées de connexion et, souvent, l'acheminement des pixels en temps réel.

Les questions essentielles sont les suivantes : **quels systèmes stockent les métadonnées, quels systèmes relaient le trafic, et où se trouvent les deux terminaux ?** L'auto-hébergement peut retirer du chemin un service de rendez-vous ou de relais exploité par un éditeur, mais il ne peut pas garantir qu'une session entre des terminaux situés dans des pays différents reste dans une seule juridiction.

## La différence fondamentale : cloud de l'éditeur ou votre propre infrastructure

C'est ici que l'architecture, et non le marketing, détermine le résultat.

**RustDesk Server Pro est auto-hébergé.** Le serveur ID/rendez-vous, le serveur relais, la console web et les données des appareils gérés s'exécutent sur l'infrastructure de votre choix. RustDesk tente d'abord d'établir une connexion pair-à-pair directe par perforation de NAT (hole punching) ; en cas d'échec, le trafic de session passe par le relais que vous avez configuré. Vous maîtrisez ainsi la couche rendez-vous/relais et les données d'appareils stockées, mais ce sont toujours les terminaux et leurs routes réseau qui déterminent où circule le trafic direct.

|                                       | Outils hébergés par l'éditeur    | RustDesk auto-hébergé                                                                                  |
| ------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Où les sessions sont coordonnées      | Le cloud de l'éditeur            | Votre serveur ID/rendez-vous                                                                           |
| Où circule le trafic de session       | Routage défini par l'éditeur     | Direct entre les terminaux lorsque c'est possible ; sinon via votre relais                             |
| Qui contrôle la résidence des données | L'éditeur                        | Vous choisissez l'emplacement côté serveur et la politique de relais ; les terminaux comptent toujours |
| Auditabilité du client                | Généralement à code source fermé | [Open source (AGPL)](https://github.com/rustdesk/rustdesk) — à lire et à compiler vous-même            |
| Qui exploite le serveur               | L'éditeur                        | Votre équipe                                                                                           |

Les équipes qui évaluent l'auto-hébergement citent souvent ce contrôle en premier : choisir l'emplacement et l'opérateur des systèmes de rendez-vous, de relais et de gestion.

## Avantage 1 : vous contrôlez l'emplacement des données côté serveur

Placez les services ID, de relais et de gestion dans un centre de données allemand, et vous pouvez documenter précisément où résident ces services et les données qu'ils stockent. Gardez les deux terminaux dans le périmètre requis et forcez le trafic à passer par ce relais approuvé : vous pouvez alors encadrer aussi l'itinéraire de la session.

## Avantage 2 : l'open source vous permet de vérifier le client

Le **client RustDesk et RustDesk Server OSS (le serveur communautaire gratuit) sont [sous licence AGPL](https://github.com/rustdesk/rustdesk)** ; **Server Pro est un logiciel serveur auto-hébergé, commercial et propriétaire**. Votre équipe sécurité peut lire le code du client, auditer ce qu'il fait sur un terminal et le compiler elle-même. C'est encore plus important que d'habitude pour l'accès à distance : le logiciel se voit confier le contrôle complet d'une machine, et les acheteurs réglementés veulent de plus en plus vérifier ce que fait un client plutôt que de croire l'éditeur sur parole.

## Avantage 3 : un autre modèle de licence serveur

Les offres standard de RustDesk sont licenciées **par compte utilisateur et par appareil géré** et incluent des connexions simultanées illimitées ; seule [Customized V2](https://rustdesk.com/pricing#custom2) licencie un nombre défini de connexions simultanées. Vous pouvez [mettre à niveau une licence](/fr/blog/mettre-a-niveau-sa-licence-rustdesk-en-cours-dabonnement-comment-ca) à tout moment, au gré de l'évolution de vos besoins.

Le modèle suit la taille de votre parc : le [guide de planification pour les grands parcs](/fr/blog/rustdesk-peut-il-monter-en-charge-jusqua-200-000-appareils) couvre les déploiements jusqu'à 200 000 appareils. Server Pro ajoute un [Contrôle d'accès](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/permissions/) par utilisateur et par groupe d'appareils, ainsi que le SSO LDAP/OIDC et la génération de client personnalisé dès l'offre Basic.

## Comment RustDesk s'intègre aux exigences ISO 27001, SOC 2 ou HIPAA

Les services achats des entreprises et les équipes du secteur de la santé demandent presque toujours comment un outil d'accès à distance s'inscrit dans ISO 27001, SOC 2 ou HIPAA. Avec un produit cloud, vous dépendez de la certification que l'éditeur a obtenue pour sa propre infrastructure et de ses conditions de responsabilité partagée. RustDesk auto-hébergé fonctionne à l'inverse : le serveur ID/rendez-vous, le relais et la console s'exécutent sur une infrastructure que votre programme couvre déjà ; vous les évaluez donc dans votre propre périmètre ISO 27001, vos contrôles SOC 2 ou vos mesures de protection HIPAA, et votre équipe sécurité peut inspecter le code source du client dans le cadre de cette évaluation. L'auto-hébergement est une mesure de déploiement, pas une certification : c'est l'évaluation qui l'intègre au périmètre.

Quelques remarques pratiques :

- L'auto-hébergement vous permet de choisir l'emplacement et l'opérateur du rendez-vous, du relais, de la console et des données de gestion stockées. Documentez le routage des terminaux, les sauvegardes et les accès administrateurs en regard de ces emplacements.
- Si votre processus d'achat exige spécifiquement un rapport SOC 2 côté éditeur, un Business Associate Agreement (BAA) signé, un DPA ou des questionnaires de sécurité complétés, demandez à l'équipe RustDesk, à l'adresse [sales@rustdesk.com](mailto:sales@rustdesk.com), ce qui est actuellement disponible pour votre scénario.
- Le client étant open source, la question « comment savoir ce qu'il fait ? » trouve sa réponse dans l'inspection du code ; les rapports d'assurance d'un éditeur répondent à une autre question d'achat.

En bref, l'auto-hébergement intègre l'accès à distance au programme de conformité que vous gérez déjà. Pour une équipe réglementée, c'est souvent une position plus solide que de s'en remettre à la certification, par un éditeur, d'une infrastructure qu'elle ne peut pas inspecter.

## Les contrôles qui soutiennent un programme RGPD auto-hébergé

L'auto-hébergement constitue la fondation ; par-dessus, RustDesk fournit des contrôles concrets sur lesquels les équipes auto-hébergées s'appuient dans un programme RGPD :

- **Les données serveur restent là où vous les placez, avec une courte liste de flux sortants.** Les services ID/rendez-vous, relais et de gestion Pro auto-hébergés traitent leurs données de déploiement là où vous les exécutez. Les flux sortants à documenter sont la validation de licence Pro (HTTPS vers rustdesk.com environ une fois par jour), le service de compilation de clients personnalisés, les mises à jour des clients, SMTP si vous configurez un serveur de messagerie externe, et tout fournisseur d'identité externe que vous connectez. Voir le [guide Server Pro hors ligne et air-gapped](/fr/blog/rustdesk-server-pro-peut-il-fonctionner-hors-ligne-ou-en-environnement).
- **Une conservation des journaux d'audit configurable.** Les [journaux d'audit de Server Pro](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/audit-logs/#visibilité-et-conservation-des-journaux) couvrent les connexions, les transferts de fichiers, les alarmes et les opérations de console. Dans **Paramètres → Autre → Conservation des journaux (jours)**, `0` conserve tous les journaux indéfiniment ; une valeur positive supprime les journaux plus anciens, avec un nettoyage toutes les heures. Définissez séparément la conservation des exports et des sauvegardes.
- **Un accès granulaire et circonscrit.** Le [Contrôle d'accès](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/permissions/) détermine qui peut atteindre quels appareils au moyen d'affectations par utilisateur, de groupes d'appareils et de règles inter-groupes (les autorisations des groupes d'utilisateurs et des groupes d'appareils se cumulent). Le carnet d'adresses partagé ne fait qu'organiser les entrées ; il ne constitue pas une frontière d'accès. Le [Rôle de contrôle](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/control-role/) limite ce qu'un technicien peut faire pendant une session — clavier/souris, presse-papiers, transfert de fichiers, audio, caméra, terminal, impression, enregistrement, etc. Associés au SSO/LDAP et à la 2FA sur les appareils contrôlés, ces mécanismes appliquent le moindre privilège et la limitation des finalités.
- **Mode de confidentialité et consentement à chaque connexion.** Le poste contrôlé peut exiger une approbation pour chaque connexion entrante, et le mode de confidentialité (pris en charge sous Windows et macOS) noircit l'écran local pendant une session, ce qui limite l'exposition accidentelle de données personnelles à l'écran.
- **Une suppression selon vos propres conditions.** Les données résidant sur votre serveur, vous pouvez désactiver ou supprimer des utilisateurs, supprimer des appareils et des enregistrements — y compris via l'API REST — et traiter directement les demandes d'effacement et de conservation.
- **Une infrastructure régionale, exploitée par vous.** Le serveur ID/rendez-vous, le relais, la console et les données stockées s'exécutent là où vous les placez, sur du matériel que vous contrôlez.
- **Des builds de clients personnalisés éphémères.** La génération d'un client à votre marque est la seule étape qui utilise le service de compilation de RustDesk, et elle est volontairement de courte durée : la configuration de build que vous soumettez est supprimée dès la fin de la compilation, et l'installateur généré est supprimé automatiquement au bout d'environ une journée. Vous le téléchargez donc pour le conserver dans votre propre dépôt approuvé.

Ce sont des leviers qu'un programme RGPD peut réellement actionner : vous devez toujours les documenter et les exploiter, mais vous n'attendez pas qu'un éditeur donne suite à la demande d'une personne concernée.

## Une souveraineté que vous pouvez démontrer

Héberger vous-même le rendez-vous, le relais, la console et les données stockées donne à un programme de conformité quelque chose de concret : une infrastructure que vous placez, exploitez et auditez. C'est une fondation plutôt qu'un aboutissement, mais c'est l'élément sur lequel tout le reste repose.

## Liste de contrôle de déploiement pour le RGPD et la souveraineté

L'auto-hébergement vous donne des choix ; le déploiement doit transformer ces choix en contrôles :

- Documentez la localisation du serveur ID, du relais, de la console, des sauvegardes, des journaux et des administrateurs.
- Cartographiez séparément les routes pair-à-pair directes et les routes relayées. Un serveur situé en Allemagne ne maintient pas en Allemagne une session directe entre l'Allemagne et un autre pays.
- Déterminez dans quels cas le relais doit être forcé, parce que le passage par un emplacement maîtrisé compte davantage que les performances du pair-à-pair.
- Consignez la finalité, la durée de conservation et la politique d'accès applicables aux métadonnées d'appareils, de comptes, d'audit et de connexion.
- Appliquez des groupes d'appareils fondés sur le moindre privilège, la MFA et le SSO lorsqu'ils sont disponibles, ainsi qu'un processus d'arrivées, de mobilités et de départs (joiner-mover-leaver) pour les techniciens.
- Placez la console web derrière HTTPS, restreignez l'accès réseau d'administration et testez la restauration des sauvegardes.
- Réalisez l'évaluation juridique appropriée — registre des activités de traitement, examen des sous-traitants, analyse des transferts et analyse d'impact relative à la protection des données (AIPD) — selon votre cas d'usage.

RustDesk peut soutenir une architecture de souveraineté, mais le responsable du traitement demeure responsable de cette architecture et de sa base légale.

## Évaluez RustDesk dans votre propre périmètre

Vous pouvez évaluer RustDesk selon vos propres conditions. Auto-hébergez Server OSS dès aujourd'hui, ou écrivez à [sales@rustdesk.com](mailto:sales@rustdesk.com) pour connaître les conditions d'évaluation actuelles des fonctionnalités Pro. Consultez les offres actuelles et le détail des fonctionnalités sur [rustdesk.com/pricing](https://rustdesk.com/pricing). Vous préférez d'abord regarder ? Une démonstration vidéo complète est disponible sur la [chaîne YouTube de RustDesk](https://www.youtube.com/@rustdesk).
