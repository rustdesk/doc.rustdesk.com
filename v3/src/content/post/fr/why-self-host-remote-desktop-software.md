---
publishDate: 2026-07-07T18:21:00Z
lang: 'fr'
translationKey: 'why-self-host-remote-desktop-software'
draft: false
title: 'Pourquoi héberger vous-même votre logiciel de bureau à distance'
excerpt: "Pourquoi les équipes qui quittent TeamViewer et AnyDesk choisissent d'auto-héberger leur bureau à distance : contrôle des données, coûts prévisibles et aucun cloud intermédiaire."
image: ~/assets/images/blog/why-self-host-remote-desktop-software-og.webp
category: 'Guides'
tags: ['RustDesk', 'Auto-hébergement']
author: 'RustDesk Team'
slug: 'pourquoi-heberger-vous-meme-votre-logiciel-de-bureau-a-distance'
faq:
  - question: "Que signifie l'auto-hébergement d'un logiciel de bureau à distance ?"
    answer: "Cela signifie faire fonctionner, sur une infrastructure que vous contrôlez, le serveur qui coordonne les connexions et relaie le trafic lorsque la connectivité directe échoue, plutôt que de faire transiter les sessions par le cloud d'un fournisseur. Avec RustDesk Server Pro, le serveur ID/rendez-vous, le relais, la console et les données de déploiement stockées s'exécutent sur votre propre infrastructure."
  - question: "Que représente concrètement la gestion d'un serveur RustDesk auto-hébergé ?"
    answer: "Les exigences matérielles sont faibles et l'essentiel du travail est ponctuel : vous provisionnez un petit hôte Linux, vous n'ouvrez que les ports que vous utilisez (les clients natifs nécessitent TCP 21115-21117 et UDP 21116), vous configurez le TLS au niveau d'un reverse proxy et vous planifiez des sauvegardes ; ensuite, il ne reste que l'application régulière des correctifs et la supervision, avec le support RustDesk disponible en cas de problème."
  - question: "L'auto-hébergement aide-t-il pour la résidence des données et la conformité RGPD ?"
    answer: "Oui — il vous donne un contrôle réel sur ce point : vous choisissez où s'exécutent le rendez-vous, le relais, la console et les données des appareils. Il s'agit toutefois d'une base plutôt que d'une garantie absolue, car les connexions directes continuent de circuler entre les points de terminaison — le maintien du trafic à l'intérieur du pays et le respect des obligations RGPD dépendent donc aussi de la manière dont vous acheminez et exploitez le déploiement."
  - question: "L'auto-hébergement convient-il à toutes les équipes ?"
    answer: "L'auto-hébergement convient aux équipes qui souhaitent garder le contrôle de leurs données et de leur infrastructure. Cela implique bien de faire fonctionner un serveur — une charge modeste, et surtout ponctuelle à mettre en place — donc si vous préférez ne faire tourner aucun serveur, un SaaS géré constitue le modèle alternatif. Mais RustDesk Server Pro est conçu pour être auto-hébergé précisément afin que vos données restent sur votre propre infrastructure, sans cloud fournisseur intermédiaire — et pour les équipes qui exploitent déjà une infrastructure, cette maîtrise est tout l'intérêt de la démarche."

metadata:
  description: "L'argumentaire en faveur de l'auto-hébergement des logiciels de bureau à distance : contrôle des données, coûts prévisibles, aucune dépendance à un fournisseur, aucune panne de cloud. RustDesk comme exemple concret."
  keywords: 'pourquoi auto-héberger le bureau à distance, avantages du bureau à distance auto-hébergé, accès à distance sur site, bureau à distance sans cloud fournisseur'
---

La plupart des logiciels de bureau à distance sont vendus d'une seule façon : sous forme d'abonnement cloud, où les serveurs du fournisseur négocient — et relaient souvent — chaque session. Il existe une autre façon de gérer l'accès à distance, et elle n'a rien de nouveau — elle est simplement moins mise en avant, car elle ne s'accompagne pas d'un abonnement cloud récurrent. C'est la décision d'**auto-héberger votre logiciel de bureau à distance** : faire fonctionner, sur une infrastructure que vous contrôlez, le serveur qui coordonne les connexions et relaie le trafic lorsque la connectivité directe échoue. Cet article plaide en faveur de ce modèle et utilise RustDesk comme exemple concret.

## Ce que signifie réellement « auto-héberger son bureau à distance »

Le prix de la commodité du tout-cloud, c'est que votre liste d'appareils, vos métadonnées de connexion et parfois le trafic de vos sessions transitent par un tiers, soumis à sa disponibilité, à sa tarification et à sa posture de sécurité.

L'auto-hébergement inverse cette logique. Avec RustDesk Server Pro, le serveur ID/rendez-vous, le relais, la console et les données de déploiement stockées s'exécutent sur **votre infrastructure**. Les sessions directes continuent de circuler entre les points de terminaison ; les sessions relayées utilisent le relais que vous avez configuré. RustDesk est [open source (AGPL)](https://github.com/rustdesk/rustdesk) et le serveur communautaire gratuit fonctionne indéfiniment.

## Cloud uniquement vs auto-hébergé, en un coup d'œil

|                                   | Outil cloud classique                | Auto-hébergé (RustDesk Server Pro)                                                                                                                                                                                        |
| --------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Où les sessions sont négociées    | Cloud du fournisseur                 | Votre machine sur site ou VPS                                                                                                                                                                                             |
| Résidence des données             | Contrôlée par le fournisseur         | Les services côté serveur s'exécutent sur une infrastructure que vous contrôlez ; [les chemins entre points de terminaison restent importants](/fr/blog/souverainete-des-donnees-et-rgpd-pour-le-bureau-a-distance-lauto) |
| Limites de connexions simultanées | Souvent par canal/poste              | Illimitées sur les plans standards ; mesurées sur Customized V2                                                                                                                                                           |
| Modèle tarifaire                  | Abonnement cloud par poste/par canal | [Par utilisateur connecté + par appareil géré](https://rustdesk.com/pricing) ([tarifs](https://rustdesk.com/pricing))                                                                                                     |
| Code source                       | Fermé                                | Open source (AGPL), auditable                                                                                                                                                                                             |
| Dépendance aux pannes             | Disponibilité du fournisseur         | Vos propres opérations                                                                                                                                                                                                    |
| Qui gère le serveur               | Le fournisseur                       | Vous                                                                                                                                                                                                                      |

L'auto-hébergement ne signifie pas renoncer à la montée en charge ou aux fonctionnalités. RustDesk publie des [recommandations de planification pour les grands parcs](/fr/blog/rustdesk-peut-il-monter-en-charge-jusqua-200-000-appareils) destinées aux équipes qui doivent gérer des parcs plus importants. Pour les [MSP](/fr/blog/rustdesk-pour-les-msp-un-outil-unique-auto-heberge-et-personnalisable-a) et l'IT interne, il existe une [console web auto-hébergée](https://rustdesk.com/docs), un générateur de client personnalisé à votre marque, ainsi que des [groupes d'appareils et un carnet d'adresses partagé](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/permissions/) pour le contrôle d'accès par utilisateur. [LDAP/SSO](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/ldap/) (OIDC) est disponible à partir du plan Basic.

## Ce qu'implique concrètement la gestion du serveur

Ce contrôle s'accompagne d'un peu de travail opérationnel — moins que ce que la plupart des équipes imaginent, et pour l'essentiel ponctuel. Voici la réalité concrète :

- **Provisionner un hôte.** Les exigences matérielles de RustDesk sont faibles, si bien qu'une VM Linux modeste — sur site ou un VPS peu coûteux — suffit à faire tourner les services ID/rendez-vous et relais. Dimensionnez-la en fonction de votre nombre d'appareils et de la part du trafic qui finit relayée plutôt qu'en pair-à-pair.
- **N'ouvrir que les ports utilisés.** Les clients natifs RustDesk nécessitent **TCP 21115-21117 et UDP 21116** pour le test NAT, les services de connexion, l'enregistrement, le heartbeat et le relais. N'exposez pas toute la plage 21114-21119. TCP 21118-21119 correspondent aux backends WebSocket, et TCP 21114 au backend HTTP API/console de la version Pro. Lorsqu'un reverse proxy HTTPS/WSS fait office de façade pour l'API Pro et les services WebSocket, n'exposez publiquement que le port TCP 443 pour ce trafic, et gardez 21114 ainsi que 21118-21119 en interne. Le port public 443 ne remplace pas les ports principaux des clients natifs lorsque ceux-ci se connectent également. Consultez la [référence officielle des ports](https://rustdesk.com/docs/en/self-host/).
- **Configurer le TLS.** Terminez HTTPS et WSS au niveau du reverse proxy afin que les identifiants, les appels API et le trafic du client navigateur utilisent le port public TCP 443, plutôt que d'exposer la console/API en HTTP en clair ou les backends WebSocket bruts.
- **Sauvegarder.** Le serveur contient votre inventaire d'appareils, les comptes utilisateurs, le carnet d'adresses et les règles d'accès. Planifiez des sauvegardes — et testez réellement que vous pouvez les restaurer.
- **Maintenir un rythme de correctifs.** De nouvelles versions du serveur sortent régulièrement, et vous êtes responsable du système d'exploitation sous-jacent. Décidez qui applique les mises à jour et à quelle fréquence.
- **Le superviser.** Le service de coordination vous appartient désormais, donc vous surveillez la disponibilité, l'espace disque et le débit du relais, et vous êtes responsable des alertes et de la reprise.

Rien de tout cela n'est exotique, et l'essentiel n'est à mettre en place qu'une seule fois. Si une question se pose à un moment ou à un autre, le [support RustDesk](mailto:support@rustdesk.com) peut vous accompagner.

## Comment évaluer l'auto-hébergement

- **Commencez par le serveur communautaire.** Le cœur du produit est sous licence AGPL — déployez le serveur open source gratuit dès cet après-midi, auditez-le et faites-le tourner aussi longtemps que vous le souhaitez, sans frais.
- **Besoin des fonctionnalités Pro ?** Les tarifs actuels des plans sont disponibles sur [rustdesk.com/pricing](https://rustdesk.com/pricing), et [sales@rustdesk.com](mailto:sales@rustdesk.com) peut vous indiquer les options d'évaluation disponibles en ce moment.
- **Vous préférez regarder plutôt qu'installer ?** Une démonstration vidéo complète est disponible sur la [chaîne YouTube de RustDesk](https://www.youtube.com/@rustdesk).

Si des hausses de prix, du code fermé ou un cloud que vous ne contrôlez pas sont ce qui vous a poussé à chercher une alternative, l'auto-hébergement est la solution structurelle, pas une simple remise. Pour une équipe qui exploite déjà une infrastructure, c'est une étape suivante, pas un saut : possédez le serveur, possédez les données, possédez les coûts.
