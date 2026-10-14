---
publishDate: 2026-06-29T16:16:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'fr'
translationKey: 'rustdesk-for-enterprise'
draft: false
title: "RustDesk pour l'entreprise : auto-hébergé, évolutif, compatible AD"
excerpt: "Pourquoi les équipes IT d'entreprise choisissent RustDesk : maîtrise des données grâce à l'auto-hébergement, AD/LDAP, contrôle d'accès par groupe d'appareils et tarification prévisible pour les grands parcs."
image: '~/assets/images/blog/rustdesk-for-enterprise-og.webp'
category: 'Guides'
tags: ['RustDesk', 'Entreprise', 'Auto-hébergement']
author: 'RustDesk Team'
slug: 'rustdesk-pour-lentreprise-auto-heberge-evolutif-compatible-ad'
faq:
  - question: "RustDesk peut-il être déployé massivement sur un parc d'entreprise ?"
    answer: "Oui. RustDesk fournit un MSI Windows pour une installation silencieuse et sans intervention via msiexec, déployable par stratégie de groupe (GPO), Microsoft Intune, un RMM ou des outils de packaging, et le générateur de client personnalisé (à partir de l'offre Basic) livre un client préconfiguré pour votre propre serveur."
  - question: "RustDesk dispose-t-il d'une API REST ?"
    answer: "Oui. RustDesk Server Pro expose une API REST, autorisée par des jetons d'API créés dans la console web, ainsi que des outils de gestion Python en ligne de commande. Des scripts peuvent intégrer, inventorier, attribuer et supprimer des appareils, et gérer en masse utilisateurs, groupes, carnets d'adresses et journaux d'audit, au lieu de tout faire depuis la console web."
  - question: "RustDesk prend-il en charge Active Directory et le SSO pour l'identité en entreprise ?"
    answer: "Oui. RustDesk Server Pro inclut LDAP/Active Directory et le SSO OIDC à partir de l'offre Basic : les techniciens s'authentifient auprès de votre source d'identité existante plutôt que d'une liste d'utilisateurs distincte. L'offre Individual n'inclut ni LDAP/AD ni le SSO OIDC."
  - question: 'Les entreprises peuvent-elles conserver les données RustDesk sur leur propre infrastructure ?'
    answer: "Oui, c'est le modèle même de RustDesk Server Pro. Vous auto-hébergez le serveur ID/rendez-vous, le relais, la console web et les données d'appareils stockées sur une infrastructure que vous exploitez. Les sessions directes circulent entre les terminaux et les sessions relayées passent par votre propre relais : documentez donc le routage des terminaux en plus de l'emplacement des serveurs."
  - question: 'Comment fonctionne la tarification de RustDesk pour les grands parcs ?'
    answer: "La licence RustDesk Server Pro porte sur les comptes utilisateurs et les appareils gérés, et les offres standard incluent des connexions simultanées illimitées ; seule l'offre Customized V2 prévoit un nombre défini de connexions simultanées. Une mise à niveau s'achète à tout moment et porte la licence à un an complet à compter de la date de mise à niveau, en créditant la valeur restante déjà payée. Dimensionnez les deux compteurs sur rustdesk.com/pricing."
metadata:
  description: "RustDesk en entreprise : ID, relais et console auto-hébergés, LDAP/AD et SSO OIDC, accès par groupe d'appareils, déploiement MSI et simultanéité illimitée."
  keywords: "RustDesk pour l'entreprise, déploiement RustDesk en entreprise, support à distance intégré à Active Directory, architecture RustDesk en entreprise"
---

## Gardez l'accès à distance sur une infrastructure que vous contrôlez

RustDesk Server Pro fait tourner l'ID/rendez-vous, le relais, la console web et les données d'appareils à l'intérieur de votre périmètre, avec LDAP/AD et le SSO OIDC dès l'offre Basic et des connexions simultanées illimitées sur les offres standard. Cela couvre les points sur lesquels se jouent généralement les évaluations en entreprise : maîtrise de l'infrastructure, identité, politique d'accès, auditabilité, montée en charge et prévisibilité des licences.

Le client RustDesk et RustDesk Server OSS (le serveur communautaire gratuit) sont sous licence AGPL ; Server Pro est un logiciel serveur auto-hébergé, commercial et propriétaire.

## La différence fondamentale : vous l'hébergez, donc vous le contrôlez

RustDesk Server Pro est **auto-hébergé** : c'est votre équipe, et non un éditeur, qui exploite les serveurs ([pourquoi les équipes choisissent l'auto-hébergement](/fr/blog/pourquoi-heberger-vous-meme-votre-logiciel-de-bureau-a-distance)). Ce simple fait architectural explique la plupart des avantages présentés ci-dessous, et il fait du **[client sous licence AGPL](https://github.com/rustdesk/rustdesk)** bien plus qu'un argument : une équipe sécurité qui doit justifier chaque agent installé sur un terminal de production peut lire le code source et compiler le client elle-même, si bien que « nous pouvons auditer exactement ce qui s'exécute » devient une case du cahier des charges que vous pouvez réellement cocher.

## Les questions d'architecture d'entreprise à régler en premier

Avant de comparer les grilles de fonctionnalités, explicitez la conception du déploiement :

| Décision               | Ce que la conception doit préciser                                                                                                                       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identité               | Source OIDC ou LDAP, politique MFA, accès d'urgence (« break-glass ») et cycle de vie des comptes                                                       |
| Autorisation           | Propriété des groupes d'appareils, rôles des techniciens, périmètre des prestataires externes et modèle d'approbation                                   |
| Réseau                 | Emplacement de l'ID et du relais, politique direct/relais, ports exposés et routage régional                                                            |
| Disponibilité          | Hypothèses de capacité, supervision, sauvegardes, objectifs de reprise et architecture multi-relais                                                     |
| Gestion des terminaux  | Versions d'OS prises en charge, packaging du client, application des configurations et SLA de mise à jour                                               |
| Opérations de sécurité | Journalisation, conservation, alertes, réponse aux vulnérabilités et responsabilité des incidents                                                       |
| Licences               | Comptes utilisateurs et appareils gérés nécessaires, et éventuel quota de connexions simultanées [Customized V2](https://rustdesk.com/pricing#custom2) |

RustDesk fournit les composants d'accès à distance et les contrôles d'entreprise ; c'est votre architecture qui détermine s'ils répondent aux exigences de disponibilité, de conformité et d'exploitation de l'organisation.

## Maîtrise des données et conformité

L'auto-hébergement vous permet de choisir l'emplacement et l'exploitant du serveur de rendez-vous, du relais, de la console et des données d'appareils stockées. Les sessions directes circulent toujours entre les terminaux : l'emplacement du serveur ne garantit donc pas à lui seul un trafic cantonné au territoire national ni la conformité au RGPD. Documentez l'ensemble du [flux de données et des contrôles de conformité](/fr/blog/souverainete-des-donnees-et-rgpd-pour-le-bureau-a-distance-lauto).

Server Pro enregistre des [journaux d'audit](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/audit-logs/) pour les connexions, les transferts de fichiers, les alarmes et les opérations de la console. Réglez **Paramètres > Autre > Conservation des journaux (jours)** sur un nombre positif pour supprimer automatiquement les journaux plus anciens (le nettoyage s'exécute toutes les heures) ; `0` conserve les journaux indéfiniment. Vous pouvez désactiver ou supprimer des utilisateurs et des appareils dans la console ou via l'API pour traiter les demandes d'effacement. Les flux sortants à prévoir sont la validation de la licence Pro, le service de compilation des clients personnalisés, les mises à jour des clients et tout fournisseur d'identité externe que vous connectez.

C'est aussi une raison discrète des migrations motivées par les coûts. Beaucoup d'équipes d'entreprise ne sont pas seulement agacées par le prix : elles paient un service cloud et un ensemble de fonctionnalités qu'elles n'utilisent pas pleinement. L'auto-hébergement inverse cette logique : vous provisionnez ce dont vous avez besoin, et vous ne louez plus le centre de données de quelqu'un d'autre comme intermédiaire obligatoire.

## Montée en charge et licence des connexions simultanées

Les déploiements d'entreprise butent sur deux plafonds : le plafond technique et le plafond tarifaire. RustDesk répond aux deux.

Sur le plan technique, le serveur public de RustDesk a enregistré plus de deux millions de terminaux en ligne sur un seul hôte de 12 cœurs et 32 Go le 7 juillet 2026 (télémétrie interne, ni benchmark audité ni garantie pour Server Pro). Pour Server Pro, le [guide de planification pour 200 000 appareils](/fr/blog/rustdesk-peut-il-monter-en-charge-jusqua-200-000-appareils) détaille la charge de base de données, de console et de relais à valider lors d'un pilote.

La licence RustDesk porte **sur les comptes utilisateurs et les appareils gérés**. Les offres standard incluent des connexions simultanées illimitées ; seule l'offre [Customized V2](https://rustdesk.com/pricing#custom2) en prévoit un nombre défini. Vous pouvez [effectuer une mise à niveau en cours d'abonnement](/fr/blog/mettre-a-niveau-sa-licence-rustdesk-en-cours-dabonnement-comment-ca) à tout moment : elle porte la licence à un an complet à compter de la date de mise à niveau et crédite la valeur restante déjà payée de la licence actuelle.

## L'AD/LDAP et le contrôle d'accès qu'attendent vos administrateurs

L'accès à distance en entreprise doit répondre à la question « qui peut atteindre quelles machines, et pouvons-nous le prouver ? ». Les offres payantes de RustDesk incluent **LDAP et le SSO (OIDC) à partir de l'offre Basic** : vous provisionnez l'accès des techniciens à partir de la source d'identité que vous exploitez déjà, au lieu de maintenir une liste d'utilisateurs parallèle.

Le [Contrôle d'accès](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/permissions/) détermine qui peut joindre quels appareils, au moyen d'affectations d'utilisateurs, de groupes d'appareils et de règles entre groupes. Un appareil appartient à un seul groupe d'appareils, et les autorisations des groupes d'utilisateurs et des groupes d'appareils se cumulent. Le carnet d'adresses partagé organise les entrées d'appareils pour les techniciens ; ce n'est pas une frontière d'accès. Le [Rôle de contrôle](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/control-role/) limite ce qu'un technicien peut faire pendant une session. Le générateur de client personnalisé commence lui aussi à l'offre Basic ; [voir la grille des offres](https://rustdesk.com/pricing).

## Déploiement massif et automatisation

Déployer l'accès à distance à la main sur des milliers de terminaux est exclu ; RustDesk prend donc en charge les méthodes de déploiement standard en entreprise. Sous Windows, il fournit un **package MSI** pour une installation silencieuse et sans intervention via `msiexec /qn`, que vous pouvez pousser par **stratégie de groupe (GPO), Microsoft Intune, un RMM ou tout outil de packaging**, avec des paramètres en ligne de commande pour l'emplacement d'installation, les raccourcis et les options. Associez-le au [générateur de client personnalisé](https://rustdesk.com/docs/fr/self-host/client-configuration/#1-générateur-de-client-personnalisé-pro-uniquement-plan-de-base-ou-plan-personnalisé) pour que le client déployé soit préconfiguré d'emblée avec votre propre serveur et vos paramètres, sans configuration machine par machine.

Pour l'exploitation du parc, appuyez-vous sur la [référence MSI pour Windows](https://rustdesk.com/docs/fr/client/windows/msi/), le [guide de déploiement des clients](https://rustdesk.com/docs/fr/self-host/client-deployment/) et les [outils API/CLI de Server Pro](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/console/#outils-de-gestion-python-cli). Les outils de gestion couvrent les utilisateurs, les appareils, les groupes, les carnets d'adresses, les stratégies et les audits. Limitez les autorisations des jetons d'API à la tâche visée, et testez l'intégration, la désactivation et la suppression pendant un pilote.

## Contrôles de recette avant le déploiement

Avant le déploiement, vérifiez la matrice d'accès utilisateurs-appareils prévue, la récupération des identités, l'accès sans surveillance, les mises à jour des clients, la capacité du relais en pointe, la conservation des journaux et la restauration des sauvegardes. Ces contrôles de recette transforment la maîtrise d'une infrastructure auto-hébergée en un déploiement d'entreprise exploitable.

## Le contrôle en entreprise, à vos conditions

À l'échelle de l'entreprise, l'argument est simple : l'ID/relais, la console et les données stockées vivent à l'intérieur de votre périmètre, reliés à votre système d'identité et à vos politiques d'accès, sans qu'aucun éditeur ne fasse tourner le cœur du système. C'est la posture que demandent les équipes achats et sécurité, et RustDesk Server Pro est conçu pour l'offrir.

## Essayez avant de vous engager

Vous pouvez évaluer **[sans appel commercial](https://www.youtube.com/@rustdesk)**. Deux options :

- **Validez l'architecture avec Server OSS.** Il est gratuit, sans frais de licence ni expiration, et tourne sur votre propre réseau — un moyen à faible enjeu de démontrer le modèle auto-hébergé à votre équipe sécurité.
- **Pour les fonctionnalités Pro — identité, contrôle d'accès, génération de clients —** consultez les offres actuelles sur [rustdesk.com/pricing](https://rustdesk.com/pricing), puis écrivez à [sales@rustdesk.com](mailto:sales@rustdesk.com) pour connaître les conditions d'évaluation proposées à votre organisation.

Dans les deux cas, déployez un serveur dans votre propre environnement et validez-le avant de vous engager.
