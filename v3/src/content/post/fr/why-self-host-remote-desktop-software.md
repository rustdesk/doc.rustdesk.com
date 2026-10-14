---
publishDate: 2026-07-07T18:21:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'fr'
translationKey: 'why-self-host-remote-desktop-software'
draft: false
title: 'Pourquoi héberger vous-même votre logiciel de bureau à distance'
excerpt: "Pourquoi les équipes qui quittent TeamViewer et AnyDesk auto-hébergent leur bureau à distance : vous choisissez où tournent les serveurs, qui les exploite et ce que vous payez."
image: ~/assets/images/blog/why-self-host-remote-desktop-software-og.webp
category: 'Guides'
tags: ['RustDesk', 'Auto-hébergement']
author: 'RustDesk Team'
slug: 'pourquoi-heberger-vous-meme-votre-logiciel-de-bureau-a-distance'
faq:
  - question: "Que signifie l'auto-hébergement d'un logiciel de bureau à distance ?"
    answer: "Auto-héberger un logiciel de bureau à distance, c'est faire tourner le serveur de connexion (le service ID/rendez-vous de RustDesk) et le relais de secours sur une infrastructure que vous contrôlez, plutôt que dans le cloud d'un éditeur. Avec RustDesk Server Pro, la console web et les données des appareils s'y trouvent aussi ; les sessions directes circulent toujours d'un terminal à l'autre."
  - question: "Que représente concrètement l'exploitation d'un serveur RustDesk auto-hébergé ?"
    answer: "Un petit hôte Linux, quelques ports ouverts et une maintenance de routine. Provisionnez une VM, ouvrez TCP 21115-21117 et UDP 21116 pour les clients RustDesk natifs, placez la console et l'API de Server Pro derrière HTTPS sur le port 443, et planifiez des sauvegardes dont vous avez testé la restauration. Ensuite, le travail courant consiste à appliquer les correctifs, superviser, gérer la capacité du relais et renouveler les certificats."
  - question: "L'auto-hébergement aide-t-il pour la résidence des données et la conformité au RGPD ?"
    answer: "Oui. Auto-héberger RustDesk vous permet de choisir où tournent l'ID/rendez-vous, le relais, la console et les données des appareils, et qui les exploite : c'est précisément le contrôle visé par les règles de résidence des données. Il s'agit d'un levier de déploiement, pas d'une certification de conformité : les sessions directes circulent toujours entre les terminaux, et la conformité au RGPD dépend aussi du routage, de la conservation et de votre démarche globale."
  - question: "L'auto-hébergement convient-il à toutes les équipes ?"
    answer: "Non, mais il convient à la plupart des équipes qui exploitent déjà leur propre infrastructure et veulent maîtriser leurs serveurs d'accès à distance. RustDesk Server OSS, le serveur communautaire gratuit, est sans frais de licence, et RustDesk Server Pro ajoute la console web, le Contrôle d'accès et le SSO. Les équipes qui ne veulent exploiter aucun serveur seront mieux servies par un service géré."

metadata:
  description: "Pourquoi auto-héberger son bureau à distance : vous choisissez où tournent les serveurs et qui les exploite. L'exemple de RustDesk Server OSS et Server Pro."
  keywords: 'pourquoi auto-héberger le bureau à distance, avantages du bureau à distance auto-hébergé, accès à distance sur site, bureau à distance sans cloud fournisseur'
---

La plupart des outils de bureau à distance sont vendus d'une seule façon : sous forme d'abonnement cloud, les serveurs de l'éditeur coordonnant les sessions et les relayant lorsqu'un trajet direct échoue. L'auto-hébergement déplace ces rôles sur une infrastructure que vous contrôlez : les clients se coordonnent via votre serveur ID/rendez-vous, se connectent en direct lorsque c'est possible et se rabattent sur votre relais sinon. Cet article plaide en faveur de ce modèle, avec RustDesk Server OSS (le serveur communautaire gratuit) et Server Pro comme exemple concret.

## Ce que signifie réellement « auto-héberger son bureau à distance »

Le prix de la commodité du tout-cloud, c'est que votre liste d'appareils, vos métadonnées de connexion et parfois le trafic de vos sessions passent par un tiers — tributaires de sa disponibilité, de sa tarification et de sa posture de sécurité.

L'auto-hébergement inverse cette logique. Avec RustDesk, votre équipe exploite les services ID/rendez-vous et de relais, et Server Pro place aussi la console web et les données d'appareils stockées sur votre infrastructure. Les sessions directes circulent entre les terminaux ; les sessions relayées passent par votre relais. Le **client et Server OSS de RustDesk sont [sous licence AGPL](https://github.com/rustdesk/rustdesk)** ; **Server Pro est un logiciel serveur auto-hébergé, commercial et propriétaire**.

## Cloud uniquement vs auto-hébergé, en un coup d'œil

|                                                   | Outil cloud classique                                                 | Auto-hébergé (RustDesk Server Pro)                                                                                                                                                                                  |
| ------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Où les sessions sont mises en relation            | Cloud de l'éditeur                                                    | Votre machine sur site ou votre VPS                                                                                                                                                                                 |
| Résidence des données                             | Contrôlée par l'éditeur                                               | Les services côté serveur tournent sur une infrastructure que vous contrôlez ; [les trajets entre terminaux restent déterminants](/fr/blog/souverainete-des-donnees-et-rgpd-pour-le-bureau-a-distance-lauto) |
| Connexions simultanées/canaux sous licence        | Quota selon l'offre                                                   | Illimités sur les offres standard ; Customized V2 prévoit un quota sous licence                                                                                                                                     |
| Modèle tarifaire                                  | Utilisateurs, terminaux et quotas de connexion propres à chaque produit | [Comptes utilisateurs plus appareils gérés](https://rustdesk.com/pricing) ; Customized V2 inclut aussi la simultanéité dans la licence                                                                           |
| Code source                                       | Selon le produit, souvent propriétaire                                | Client AGPL auditable                                                                                                                                                                                               |
| Dépendance en cas de panne                        | Disponibilité de l'éditeur                                            | Votre propre exploitation                                                                                                                                                                                           |
| Qui exploite le serveur                           | L'éditeur                                                             | Vous                                                                                                                                                                                                                |

L'auto-hébergement ne vous coûte aucune capacité. Pour les [MSP](/fr/blog/rustdesk-pour-les-msp-un-outil-unique-auto-heberge-et-personnalisable-a) et l'IT interne, Server Pro ajoute une console web auto-hébergée avec un [Contrôle d'accès](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/permissions/) par utilisateur et par groupe d'appareils, ainsi qu'un générateur de client personnalisé et le [SSO LDAP/OIDC](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/ldap/) à partir de l'offre Basic. Il ne vous coûte pas non plus en montée en charge : le serveur public de RustDesk a enregistré plus de deux millions de terminaux en ligne sur un seul hôte de 12 cœurs et 32 Go le 7 juillet 2026 (télémétrie interne), et le [guide de planification pour les grands parcs](/fr/blog/rustdesk-peut-il-monter-en-charge-jusqua-200-000-appareils) détaille ce qu'il faut valider pour Server Pro.

## Ce qu'implique concrètement l'exploitation du serveur

Ce contrôle s'accompagne d'un travail d'exploitation : une mise en place initiale, puis une maintenance de routine. Voici la liste concrète :

- **Provisionner un hôte.** Les besoins matériels de RustDesk sont faibles : une VM Linux modeste — sur site ou sur un VPS peu coûteux — fait tourner les services ID/rendez-vous et de relais. Dimensionnez-la selon votre nombre d'appareils et la part du trafic qui finit relayée plutôt qu'en pair-à-pair.
- **N'ouvrir que les ports utilisés.** Les clients RustDesk natifs exigent **TCP 21115-21117 et UDP 21116** pour le test NAT, les services de connexion, l'enregistrement, le heartbeat et le relais. N'exposez pas toute la plage 21114-21119. TCP 21118-21119 correspondent aux backends WebSocket, et TCP 21114 au backend HTTP de l'API et de la console Pro. Lorsqu'un reverse proxy HTTPS/WSS sert de façade à l'API Pro et aux services WebSocket, n'exposez publiquement que TCP 443 pour ce trafic et gardez 21114 et 21118-21119 en interne. Le port public 443 ne remplace pas les ports principaux des clients natifs lorsque ceux-ci se connectent aussi. Voir la [référence officielle des ports](https://rustdesk.com/docs/fr/self-host/).
- **Configurer le TLS.** Terminez HTTPS et WSS au niveau du reverse proxy pour que les identifiants, les appels d'API et le trafic du client navigateur passent par le port public TCP 443, au lieu d'exposer la console/l'API en HTTP clair ou les backends WebSocket bruts.
- **Sauvegarder.** Le serveur contient votre inventaire d'appareils, les comptes utilisateurs, le carnet d'adresses et les règles d'accès. Planifiez des sauvegardes — et vérifiez réellement que vous savez les restaurer.
- **Tenir un rythme de correctifs.** De nouvelles versions du serveur sortent au fil du temps, et le système d'exploitation sous-jacent est à votre charge. Décidez qui applique les mises à jour, et à quelle fréquence.
- **Le superviser.** Le service de coordination est désormais le vôtre : vous surveillez la disponibilité, le disque et le débit du relais, et vous êtes responsable des alertes et de la reprise.

Rien de tout cela n'a d'exotique pour une équipe qui exploite déjà des serveurs Linux. Désignez un responsable et un calendrier pour les mises à jour, les sauvegardes, le renouvellement des certificats et les tests de restauration, et le serveur tourne comme n'importe quelle infrastructure de routine.

## Comment évaluer l'auto-hébergement

- **Commencez par Server OSS.** Déployez-le cet après-midi, inspectez le code et faites-le tourner aussi longtemps que vous le souhaitez : il n'y a ni frais de licence ni expiration, seulement votre propre hébergement et votre bande passante.
- **Besoin des fonctionnalités Pro ?** Les tarifs actuels des offres figurent sur [rustdesk.com/pricing](https://rustdesk.com/pricing), et [sales@rustdesk.com](mailto:sales@rustdesk.com) peut vous indiquer les options d'évaluation disponibles en ce moment.
- **Vous préférez regarder plutôt qu'installer ?** Une démonstration vidéo complète est disponible sur la [chaîne YouTube de RustDesk](https://www.youtube.com/@rustdesk).

Si des hausses de prix, du code fermé ou le cloud d'un éditeur vous ont poussé à chercher ailleurs, l'auto-hébergement est la solution structurelle, pas une remise : vous choisissez où tournent les serveurs et qui les exploite. Pour une équipe qui exploite déjà une infrastructure, c'est une étape suivante, pas un saut : faites un pilote sur Server OSS, dimensionnez le relais pour vos pics de sessions, et migrez le parc lorsque le flux de travail tient.
