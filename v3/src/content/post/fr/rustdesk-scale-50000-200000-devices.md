---
publishDate: 2026-07-09T10:47:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'fr'
translationKey: 'rustdesk-scale-50000-200000-devices'
draft: false
title: "RustDesk peut-il monter en charge jusqu'à 200 000 appareils ?"
excerpt: "Le contexte opérationnel interne de RustDesk pour planifier un grand parc : ce que montre l'observation du serveur public et ce qu'un déploiement auto-hébergé doit encore valider."
image: '~/assets/images/blog/rustdesk-scale-50000-200000-devices-og.webp'
category: 'Déploiement'
tags: ['RustDesk', 'Déploiement', 'Entreprise']
author: 'RustDesk Team'
slug: 'rustdesk-peut-il-monter-en-charge-jusqua-200-000-appareils'
faq:
  - question: "Combien d'appareils un serveur RustDesk auto-hébergé peut-il gérer ?"
    answer: "Le serveur public de RustDesk a enregistré plus de deux millions de terminaux en ligne sur un seul hôte de 12 cœurs et 32 Go le 7 juillet 2026 (télémétrie interne, et non un benchmark audité). Pour RustDesk Server Pro, considérez 200 000 appareils comme un objectif de planification et validez la charge de la base de données, de la console et des relais lors d'un pilote."
  - question: 'Que faut-il ajuster pour atteindre 200 000 appareils ?'
    answer: "À 200 000 appareils, ce sont les écritures en base de données, la capacité des relais et la charge de la console qui comptent le plus. Testez la charge de RustDesk Server Pro par étapes : changements d'état des appareils en ligne, sessions à distance simultanées, bande passante des relais, mise en cache, performances d'écriture en base et activité de la console de gestion, avec votre propre charge de travail plutôt que la seule présence des terminaux."
  - question: "RustDesk Server Pro prend-il en charge la haute disponibilité ou l'équilibrage de charge ?"
    answer: "Oui, pour les relais : RustDesk Server Pro prend en charge plusieurs serveurs relais répartis par région, et les relais hbbr ne nécessitent pas de licence. Une licence Pro est liée à un seul serveur hbbs (ID/rendez-vous) : la haute disponibilité du serveur ID et de la base de données relève donc de la conception ; planifiez le basculement et la reprise avec RustDesk avant le déploiement."

metadata:
  description: "Contexte opérationnel interne de RustDesk pour planifier 200 000 appareils, et les variables de charge qu'un déploiement Server Pro auto-hébergé doit valider."
  keywords: 'rustdesk montée en charge 200000 appareils, rustdesk 50000 appareils, évolutivité serveur rustdesk auto-hébergé, déploiement rustdesk entreprise, capacité rustdesk server pro, bureau à distance pour grands parcs'
---

La télémétrie interne de RustDesk a enregistré **plus de deux millions de terminaux en ligne** sur un seul hôte du serveur public doté d'un **processeur 12 cœurs et de 32 Go de RAM**, le 7 juillet 2026.

Deux réserves en délimitent la portée. D'abord, « terminaux en ligne » désigne les appareils signalés en ligne à cet instant, et non deux millions de sessions de contrôle à distance simultanées. Ensuite, il s'agit d'une observation interne en production, et non d'un benchmark audité de manière indépendante ni d'une garantie pour Server Pro : un déploiement Server Pro ajoute des écritures en base de données, de l'activité d'audit, l'utilisation de la console, le traitement des politiques et du trafic relayé.

## La réponse courte

**200 000 appareils en ligne sont un objectif de planification réaliste pour Server Pro.** L'observation du serveur public citée plus haut se situe un ordre de grandeur au-dessus, sur un seul hôte de 12 cœurs et 32 Go. Ce que vous validez lors d'un pilote, c'est la charge que Server Pro ajoute à la simple présence des terminaux : changements d'état des appareils, politiques, écritures d'audit, utilisation de la console et sessions relayées simultanées.

## En détail

Les questions de montée en charge font partie de celles que nous posent le plus souvent les équipes informatiques qui quittent TeamViewer ou AnyDesk, en particulier celles qui planifient des parcs de plusieurs dizaines ou centaines de milliers d'appareils. La réponse dépend du nombre d'appareils qui restent en ligne, de la fréquence à laquelle leur état change, du nombre de sessions à distance simultanées et du volume de trafic qui passe par le relais.

Pour un déploiement Server Pro, validez ce que le chiffre du serveur public ne couvre pas. La mise en cache et les performances d'écriture en base de données comptent à mesure que les appareils se connectent et se déconnectent. La bande passante et le CPU du relais dépendent du nombre, de la durée, de la résolution et du codec des sessions relayées simultanées. Les requêtes de la console, la conservation des journaux d'audit, les groupes d'appareils, les politiques et les intégrations ajoutent une charge que la seule présence des terminaux ne mesure pas. Reproduisez dans un test de charge représentatif le nombre d'appareils en ligne visé, les changements d'état des connexions, les sessions directes et relayées simultanées, la conservation des données et l'activité d'administration.

Pour un pilote Server Pro reproductible, consignez les versions du client et du serveur, le matériel, ainsi que l'emplacement de la base de données et des relais. Augmentez par étapes la présence et les changements d'état des appareils en ligne tout en exécutant les requêtes de console, les mises à jour de politiques et les écritures d'audit prévues. Mesurez le taux de réussite des enregistrements et des reconnexions, le temps d'établissement des connexions, la latence de la base de données, le CPU et la RAM, la croissance du disque et le débit des relais. Incluez le pic de sessions simultanées et un exercice de reprise, et gardez ces mesures distinctes du nombre de terminaux en ligne.

La haute disponibilité et l'équilibrage de charge méritent le même traitement. Les relais se déploient horizontalement : vous pouvez en exécuter plusieurs et les répartir par région, et les relais hbbr ne nécessitent pas de licence. Une licence Pro est liée à un seul serveur hbbs : concevez donc explicitement le basculement du serveur ID et de la base de données, et revoyez-le avec RustDesk pour les très grands parcs.

Dimensionnez ensuite les licences : Server Pro licencie les comptes utilisateurs et les appareils gérés, et les offres standard incluent des connexions simultanées illimitées. Choisissez le palier adapté à votre parc sur [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Qui pose cette question

Les architectes qui planifient des déploiements pluriannuels — dans les entreprises, chez les grands [MSP](/fr/blog/rustdesk-pour-les-msp-un-outil-unique-auto-heberge-et-personnalisable-a) et dans les programmes informatiques du secteur public — placent cette question en tête de leur liste de vérifications. Ces acheteurs quittent généralement un outil commercial pour des raisons de coût ou de souveraineté des données, et doivent avoir la certitude qu'une plateforme auto-hébergée grandira avec eux au lieu de se heurter à un mur en cours de contrat.

## Questions connexes

- Limites de connexions simultanées et licences pour un grand nombre d'appareils : voir les [tarifs RustDesk](https://rustdesk.com/pricing).
- [Puis-je migrer un parc TeamViewer ou AnyDesk existant vers RustDesk ?](/fr/blog/la-meilleure-alternative-a-teamviewer-en-auto-hebergement)

Vous planifiez un déploiement à grande échelle ? Contactez l'[équipe RustDesk](mailto:sales@rustdesk.com) pour dimensionner un déploiement auto-hébergé adapté à votre nombre d'appareils, à vos exigences de performance et à votre calendrier de croissance.
