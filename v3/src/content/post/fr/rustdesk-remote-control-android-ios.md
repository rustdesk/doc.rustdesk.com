---
publishDate: 2026-07-07T17:09:00Z
lang: 'fr'
translationKey: 'rustdesk-remote-control-android-ios'
draft: false
title: 'Contrôle à distance RustDesk sur Android et iOS : ce qui fonctionne'
excerpt: 'Comment RustDesk contrôle à distance les téléphones Android, transforme les iPhone et iPad en contrôleurs, et pourquoi aucun éditeur ne peut contrôler iOS à distance.'
image: '~/assets/images/blog/rustdesk-remote-control-android-ios-og.webp'
category: 'Guides'
tags: ['RustDesk', 'Mobile']
author: 'RustDesk Team'
slug: 'controle-a-distance-rustdesk-sur-android-et-ios-ce-qui-fonctionne'
faq:
  - question: 'Puis-je contrôler à distance un téléphone Android avec RustDesk ?'
    answer: "Oui. Sur l'appareil Android, vous démarrez le service de capture d'écran de RustDesk (qui nécessite une invite de consentement à l'écran) et vous activez le service d'accessibilité RustDesk Input afin que les appuis et glissements distants soient injectés. Le partage d'écran nécessite Android 6 ou version ultérieure ; le partage de l'audio système interne nécessite Android 10 ou version ultérieure. Certains fabricants restreignent l'accessibilité pour les applications installées manuellement (sideloading), il se peut donc que vous deviez d'abord autoriser les paramètres restreints."
  - question: 'RustDesk peut-il contrôler un iPhone ou un iPad ?'
    answer: "Non, et ce quelle que soit l'application de bureau à distance utilisée — c'est une limite de la plateforme iOS, pas de RustDesk. Les restrictions d'Apple sur l'enregistrement d'écran et l'exécution en arrière-plan ne permettent à aucune application tierce d'être contrôlée à distance en tant qu'hôte, si bien qu'aucun éditeur n'offre de véritable contrôle à distance d'un iPhone ou d'un iPad. Ce que l'application iOS/iPadOS de RustDesk fait très bien, en revanche, c'est fonctionner comme contrôleur : utilisez un iPhone ou un iPad pour contrôler vos machines Windows, macOS, Linux et Android."
  - question: 'Puis-je utiliser mon téléphone pour contrôler mon ordinateur ?'
    answer: "Oui. Les applications RustDesk pour Android et iOS fonctionnent comme des clients contrôleurs complets. Vous pouvez vous connecter depuis l'une ou l'autre à une machine Windows, macOS ou Linux et la contrôler à l'aide d'un pavé tactile à l'écran ou d'un mode souris. C'est le cas d'usage mobile le plus fiable, et il fonctionne exactement comme le client de bureau."
  - question: 'Les applications mobiles RustDesk sont-elles open source ?'
    answer: "Oui. Les clients mobiles partagent la même base de code open source sous licence AGPL que le client de bureau. Les builds Android sont disponibles depuis les releases GitHub officielles de RustDesk et sur F-Droid sous le nom com.carriez.flutter_hbb ; le contrôleur iOS est disponible sur l'App Store d'Apple. RustDesk n'est actuellement pas distribué via Google Play."
  - question: 'Puis-je configurer un appareil Android pour un contrôle non surveillé permanent ?'
    answer: "Partiellement. RustDesk peut maintenir son service de capture actif grâce à une notification au premier plan et le redémarrer au démarrage de l'appareil, mais le consentement de capture d'écran, le clavier bloqué sur l'écran de verrouillage et la nécessité de déverrouiller manuellement après un redémarrage rendent le contrôle Android véritablement non surveillé peu fiable. Considérez le contrôle Android comme de l'assistance en présence de l'utilisateur plutôt que comme un accès permanent sans intervention."
metadata:
  description: "RustDesk sur Android et iOS : contrôlez Android à distance, utilisez l'une ou l'autre application mobile pour piloter vos ordinateurs de bureau, et découvrez ce qu'Apple autorise sur iPhone et iPad."
  keywords: 'contrôle à distance RustDesk Android iOS, contrôler un téléphone à distance avec RustDesk, RustDesk hôte Android, contrôler Android à distance, RustDesk iOS, contrôler un iPhone à distance, application mobile RustDesk'
---

« Puis-je prendre le contrôle à distance d'un téléphone ? » est l'une des questions les plus fréquentes posées à RustDesk, et elle mérite une réponse honnête plutôt qu'un discours marketing. En résumé : RustDesk peut réellement contrôler un appareil Android, les deux applications mobiles font d'excellents _contrôleurs_ pour vos ordinateurs, et — ce que les gens n'aiment pas entendre — il n'est actuellement pas possible de prendre le contrôle à distance d'un iPhone ou d'un iPad. Ce guide explique précisément ce qui fonctionne, ce qui ne fonctionne pas, et pourquoi, afin que vous puissiez planifier en fonction des capacités réelles plutôt que d'hypothèses.

Les deux applications mobiles sont, comme le reste de RustDesk, open source sous licence AGPL. Les builds Android sont disponibles depuis les [releases GitHub officielles de RustDesk](https://github.com/rustdesk/rustdesk/releases) et sur [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) sous le nom `com.carriez.flutter_hbb`, avec une large couverture d'appareils — builds arm64, arm32 et x86_64, plus un APK universel ; le contrôleur iOS est disponible sur l'App Store. RustDesk n'est [actuellement pas distribué via Google Play](/fr/blog/rustdesk-et-les-arnaques-a-lacces-a-distance-ce-que-nous-faisons) : l'application Android a été volontairement retirée en réponse à des abus liés à des arnaques. Même base de code, même noyau auditable.

## Le résumé en un tableau

| Scénario                                                    | Pris en charge ? | Remarques                                                                 |
| ----------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------- |
| Contrôler un PC Windows/macOS/Linux **depuis** Android      | Oui              | Contrôleur complet ; mode pavé tactile ou souris                          |
| Contrôler un PC **depuis** un iPhone/iPad                   | Oui              | Contrôleur complet                                                        |
| Contrôler **un appareil Android** (en tant qu'hôte)         | Oui              | Nécessite le consentement de capture d'écran + le service d'accessibilité |
| Contrôler **un appareil iOS** (iPhone/iPad en tant qu'hôte) | **Non**          | Restrictions Apple ; non implémenté                                       |
| Visualiser un écran iOS à distance                          | **Non**          | Non pris en charge actuellement                                           |

Le reste de l'article détaille simplement chacune de ces lignes.

## Utiliser votre téléphone comme contrôleur (la partie facile)

C'est le cas d'usage qui « fonctionne tout simplement ». Installez RustDesk sur votre appareil Android ou iOS, et il devient un contrôleur complet pour n'importe quel hôte RustDesk — votre bureau Windows, votre [Mac](https://rustdesk.com/docs/fr/client/mac/), votre [machine Linux](/fr/blog/rustdesk-pour-linux-le-bureau-a-distance-open-source). Saisissez l'ID cible et le mot de passe, et vous obtenez l'écran distant avec un pavé tactile à l'écran, un mode souris, un clavier logiciel et le transfert de fichiers. Rien de particulier n'est requis côté téléphone, puisque vous ne faites qu'_envoyer_ le contrôle, sans être vous-même contrôlé.

Si votre mission consiste à « dépanner un ordinateur depuis n'importe où », un téléphone équipé de RustDesk est un outil véritablement efficace, et il se comporte exactement comme le client de bureau.

## Contrôler un appareil Android (en tant qu'hôte)

C'est là que RustDesk fait quelque chose que la plupart des outils de contrôle à distance ne savent pas faire : il peut transformer un téléphone ou une tablette Android en hôte contrôlable. Deux sous-systèmes Android rendent cela possible, et tous deux nécessitent une configuration explicite.

**Capture d'écran.** RustDesk utilise l'API `MediaProjection` d'Android pour capturer l'affichage. Lorsque vous appuyez sur **Démarrer le service** dans l'application, Android affiche une invite de consentement demandant l'autorisation d'enregistrer l'écran — cette boîte de dialogue est obligatoire et ne peut pas être contournée silencieusement. Le partage d'écran nécessite **Android 6 ou version ultérieure** ; la capture de l'**audio système interne** du téléphone nécessite **Android 10 ou version ultérieure**. Tant que cette autorisation de capture n'est pas accordée, aucune connexion entrante ne peut rien voir.

**Entrée à distance.** Voir l'écran ne revient pas à le contrôler. Pour injecter des appuis, des glissements et des événements clavier, RustDesk enregistre un [`AccessibilityService`](https://deepwiki.com/rustdesk/rustdesk/6.5-mobile-platforms) appelé **RustDesk Input**, que vous activez dans **Paramètres → Accessibilité**. Il traduit les événements de souris et de gestes distants en gestes Android et peut déclencher des actions système comme Retour, Accueil et Applications récentes.

**Rester actif.** RustDesk maintient une notification de service au premier plan et, en option, une fenêtre flottante superposée afin qu'Android ne mette pas fin au processus de capture, et il peut redémarrer le service au démarrage de l'appareil.

Voici maintenant les limites, car le modèle de sécurité d'Android en impose de bien réelles :

- **Le consentement est requis pour démarrer la capture.** Une personne (ou une préapprobation) doit accepter l'invite d'enregistrement de l'écran.
- **L'écran de verrouillage bloque la saisie.** Android n'autorise pas un service d'accessibilité à saisir du texte sur l'écran de verrouillage sécurisé ; ainsi, si l'appareil se verrouille, il est généralement impossible de saisir le code de déverrouillage à distance — une limite [documentée par des utilisateurs expérimentés](https://blog.wirelessmoves.com/2025/10/remote-android-support-with-rustdesk-part-1.html).
- **Les redémarrages nécessitent un déverrouillage manuel.** Après un redémarrage, l'appareil doit généralement être déverrouillé en personne avant que le contrôle ne reprenne.
- **Restrictions des fabricants (OEM).** Sur certaines versions propres à un fabricant, le commutateur d'accessibilité **RustDesk Input** reste grisé pour les applications installées manuellement (sideloading) tant que vous n'autorisez pas les « paramètres restreints » (appui long sur l'icône de l'application → Infos sur l'application → autoriser les paramètres restreints). Chez certains fabricants, des gestionnaires de batterie trop agressifs peuvent également interrompre le service en arrière-plan.

En pratique : le contrôle Android excelle pour l'**assistance en présence de l'utilisateur** — aider quelqu'un qui tient son téléphone en main — tandis que l'accès **non surveillé et permanent** reste le point fort de l'hôte de bureau, car les systèmes d'exploitation mobiles restreignent l'accès persistant en arrière-plan. Adaptez la plateforme à la tâche. (Pour les ordinateurs de bureau, le [guide de configuration de l'accès non surveillé](/fr/blog/acces-non-surveille-rustdesk-guide-de-configuration) couvre ce véritable cas d'usage.)

## Contrôler un appareil iOS : ce qu'Apple autorise

Voici la partie qu'on nous demande sans cesse et à laquelle d'autres répondent vaguement ; nous allons donc être directs : **aucune application de bureau à distance ne peut contrôler un iPhone ou un iPad à distance — RustDesk y compris.** Sur iOS, l'application RustDesk est un contrôleur performant — elle se connecte _vers l'extérieur_ pour contrôler vos ordinateurs — mais Apple n'autorise aucune application tierce à agir comme un hôte contrôlable à distance sur iOS.

La raison, c'est Apple. iOS restreint fortement l'exécution en arrière-plan, l'enregistrement d'écran et toute forme d'injection d'entrée synthétique, ce qui explique pourquoi aucune application tierce n'offre de véritable _contrôle_ à distance d'un iPhone. Il ne s'agit pas d'un oubli de la part de RustDesk, mais bien d'un mur imposé par la plateforme — la prise en charge d'iOS comme hôte est une [fonctionnalité demandée à plusieurs reprises sur GitHub](https://github.com/rustdesk/rustdesk/discussions/4839) qui reste non implémentée. Les API de diffusion d'Apple (ReplayKit) peuvent en principe diffuser un écran, mais il s'agit d'une diffusion initiée par l'application elle-même, et non de quelque chose qu'un tiers distant peut récupérer — la visualisation à distance d'iOS par des applications tierces reste donc indisponible, et le contrôle à distance complet d'iOS depuis un autre appareil n'est pas quelque chose que le système d'exploitation autorise aux tiers.

Donc, si votre besoin consiste précisément à « prendre le contrôle à distance d'un iPhone », aucun outil de bureau à distance actuel ne peut le faire — c'est un mur imposé par la plateforme iOS que tous les éditeurs rencontrent, et non une lacune propre à RustDesk, comme le souligne notre comparatif [RustDesk vs AnyDesk](/fr/blog/rustdesk-vs-anydesk-bureau-a-distance-open-source-et-auto-heberge). Nous préférons vous le dire clairement dès le départ plutôt que de vous laisser le découvrir après la configuration.

## Une remarque sur la confidentialité et l'auto-hébergement

Comme les applications mobiles sont open source et utilisent le même protocole que le client de bureau, vous pouvez les pointer vers votre propre [serveur RustDesk auto-hébergé](/fr/blog/pourquoi-heberger-vous-meme-votre-logiciel-de-bureau-a-distance) plutôt que vers le réseau public — les sessions mobiles sont alors prises en charge par une infrastructure que vous contrôlez, y compris l'ID. Pour les flux d'assistance à distance impliquant des appareils personnels, cet aspect de souveraineté des données compte plus que d'habitude.

Le compromis est toujours le même : vous devez héberger et sécuriser ce serveur vous-même — une tâche modeste compte tenu des faibles exigences — et pour de nombreuses équipes, conserver les données de session sur leur propre terrain en vaut largement la peine.

## Pour commencer

Téléchargez les builds Android depuis les [releases GitHub officielles](https://github.com/rustdesk/rustdesk/releases) ou installez le paquet depuis [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/). RustDesk n'est [actuellement pas distribué via Google Play](/fr/blog/rustdesk-et-les-arnaques-a-lacces-a-distance-ce-que-nous-faisons) ; le contrôleur iOS reste disponible sur l'App Store d'Apple. Pour contrôler un téléphone, celui-ci doit être sous Android — acceptez l'invite de capture d'écran et activez le service d'accessibilité RustDesk Input. Pour contrôler vos ordinateurs depuis un téléphone, les deux applications mobiles fonctionnent directement, sans configuration particulière. Les offres actuelles sont disponibles sur [rustdesk.com/pricing](https://rustdesk.com/pricing), et [sales@rustdesk.com](mailto:sales@rustdesk.com) peut vous accompagner pour Server Pro. Vous voulez d'abord le voir en action ? [Découvrez RustDesk en action](https://www.youtube.com/@rustdesk).
