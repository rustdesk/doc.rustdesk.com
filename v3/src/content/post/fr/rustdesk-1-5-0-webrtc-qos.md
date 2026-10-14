---
publishDate: 2026-10-14T00:00:00Z
lang: fr
translationKey: rustdesk-1-5-0-webrtc-qos
title: 'RustDesk 1.5.0 : connexions directes WebRTC et améliorations de QoS'
excerpt: "RustDesk 1.5.0 ajoute des chemins WebRTC, l'accès direct depuis le client web et des ajustements de QoS pour le délai, la congestion et les cibles de FPS."
image: ~/assets/images/blog/web-client.jpg
category: Version
slug: rustdesk-1-5-0-webrtc-qos-fr
tags:
  - WebRTC
  - QoS
  - client Web
  - version
---

Nous avons récemment partagé une expérience concrète : après la mise à niveau vers la version 1.5.0, l'accès à un Mac à la maison depuis un autre continent semblait plus fluide qu'auparavant. La [publication d'origine](https://x.com/rustdesk/status/2110243829978898520) décrit cette expérience. Voici les changements précis apportés dans la version 1.5.0 aux connexions et à l'adaptation de la transmission de l'écran.

La [PR #15684](https://github.com/rustdesk/rustdesk/pull/15684) a introduit la prise en charge du canal de données WebRTC (Data Channel). Les tentatives de connexion ICE sont lancées en parallèle et mises en concurrence avec les mécanismes existants de hole punching TCP et UDP et les chemins directs IPv6. Lorsqu'un relais est prêt, mais qu'une tentative de connexion directe est encore en cours, RustDesk maintient une courte fenêtre de préférence pour une connexion directe. Il peut utiliser le relais lorsque cette fenêtre expire ou que les tentatives directes échouent. Cela ajoute des possibilités de connexion directe pour certaines connexions qui nécessitaient auparavant un relais.

**Le client web peut désormais lui aussi se connecter directement.** Auparavant, les sessions RustDesk dans un navigateur devaient passer par un serveur relais. Lorsque les conditions réseau le permettent et qu'ICE sélectionne un chemin direct, les données de la session peuvent désormais circuler directement entre le navigateur et l'appareil distant, ce qui peut éviter la latence et les limites de bande passante d'un relais. Une connexion WebRTC acheminée via TURN reste relayée. L'intégration transporte le protocole RustDesk via Data Channel ; RustDesk continue d'assurer l'encodage et le décodage vidéo.

Les changements de QoS proviennent de la [PR #16082](https://github.com/rustdesk/rustdesk/pull/16082). Elle corrige les fortes baisses de fréquence d'images provoquées par l'ancienne politique après une seule réponse lente ou un bref blocage, suivies d'une récupération lente. Les changements de la version 1.5.0 comprennent :

- **Amélioration du délai de référence.** Le faible délai de référence propre à chaque connexion est utilisé dès la première réponse, avec une adaptation progressive aux changements stables de cette référence pour réduire les erreurs d'appréciation sur les liaisons à forte latence.
- **Confirmation des fluctuations ordinaires du délai.** Les réductions ordinaires de la fréquence d'images nécessitent trois réponses défavorables consécutives. Un délai supplémentaire très élevé et l'expiration du délai d'attente des sondes peuvent toujours déclencher des réductions plus rapides.
- **Priorité au débit lorsque les conditions le permettent.** Lors de l'ajustement ordinaire face à la congestion, le débit est réduit en premier lorsque l'adaptation automatique du débit est activée et que le débit peut encore baisser, au lieu de compter uniquement sur moins d'images alors que l'encodeur maintient son débit cible.
- **Montée en régime initiale et rétablissement plus rapides de la fréquence d'images cible.** Deux réponses consécutives présentant un faible délai supplémentaire sur une liaison sans perturbation peuvent accélérer la montée de la cible au démarrage. Après une congestion, deux réponses favorables peuvent rétablir la fréquence d'images cible précédente. Le contrôleur annule ce rétablissement si la congestion réapparaît rapidement ensuite.

Ces politiques utilisent des données de retour sur le délai qui empruntent le même chemin que la transmission de l'écran. Ces données incluent les données en attente dans la couche de transport, l'aller-retour réseau et l'ordonnancement des réponses du client. Elles indiquent les variations de charge au lieu de mesurer le délai de mise en file d'attente de façon isolée. [Implémentation de la QoS dans la version 1.5.0](https://github.com/rustdesk/rustdesk/blob/1.5.0/src/server/video_qos.rs).

Pour le changement accélérant le démarrage, l'auteur de la PR a comparé ce changement à son commit parent lors d'un test au bureau sur une liaison locale : le temps de démarrage nécessaire pour atteindre la **cible de 60 FPS** est passé de **7.99 secondes à 2.98 secondes**. Cela mesure l'effet de ce changement sur la montée en régime de la fréquence d'images cible au démarrage dans ce test. [Compte rendu du test](https://github.com/rustdesk/rustdesk/pull/16082#issuecomment-5597385117).

Passez à [RustDesk 1.5.0](https://github.com/rustdesk/rustdesk/releases/tag/1.5.0) ou essayez le nouveau chemin de connexion dans le [client web](https://rustdesk.com/web). WebRTC doit être pris en charge par les deux pairs et par le serveur. Il est désactivé par défaut pour les serveurs auto-hébergés ; activez-le explicitement avec `enable-webrtc=Y`. Pour Server Pro, la documentation indique une prise en charge à partir de la version 1.8.7. Consultez le [guide des paramètres](https://rustdesk.com/docs/fr/self-host/client-configuration/advanced-settings/#enable-webrtc) pour la configuration.
