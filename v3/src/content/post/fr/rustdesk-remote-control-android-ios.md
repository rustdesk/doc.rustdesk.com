---
publishDate: 2026-07-07T17:09:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'fr'
translationKey: 'rustdesk-remote-control-android-ios'
draft: false
title: 'Contrôle à distance RustDesk sur Android et iOS : ce qui fonctionne'
excerpt: "RustDesk peut contrôler à distance des téléphones Android et transforme Android, iPhone et iPad en contrôleurs pour vos ordinateurs. L'application iOS fonctionne uniquement comme contrôleur."
image: '~/assets/images/blog/rustdesk-remote-control-android-ios-og.webp'
category: 'Guides'
tags: ['RustDesk', 'Mobile']
author: 'RustDesk Team'
slug: 'controle-a-distance-rustdesk-sur-android-et-ios-ce-qui-fonctionne'
faq:
  - question: 'Puis-je contrôler à distance un téléphone Android avec RustDesk ?'
    answer: "Oui. Sur l'appareil Android, vous démarrez le service de capture d'écran de RustDesk (qui exige une invite de consentement à l'écran) et vous activez le service d'accessibilité RustDesk Input pour que les appuis et balayages distants soient injectés. Le partage d'écran nécessite Android 6 ou version ultérieure ; le partage de l'audio système interne, Android 10 ou version ultérieure. Certains fabricants restreignent l'accessibilité pour les applications installées hors boutique : vous devrez peut-être d'abord autoriser les paramètres restreints."
  - question: 'RustDesk peut-il contrôler un iPhone ou un iPad ?'
    answer: "Non. L'application RustDesk pour iOS/iPadOS fonctionne uniquement comme contrôleur : un iPhone ou un iPad sert à contrôler des appareils Windows, macOS, Linux et Android. RustDesk n'implémente ni l'hébergement, ni le partage d'écran, ni la saisie à distance sous iOS. D'autres éditeurs proposent la visualisation d'écran iOS en présence de l'utilisateur, et Apple offre un contrôle à distance avec consentement dans les appels FaceTime."
  - question: 'Puis-je utiliser mon téléphone pour contrôler mon ordinateur ?'
    answer: "Oui. Les applications RustDesk pour Android et iOS sont des contrôleurs complets : connectez-vous à une machine Windows, macOS ou Linux par son ID et contrôlez-la avec un pavé tactile à l'écran ou un mode souris, ainsi qu'un clavier logiciel. Certains usages du presse-papiers, du transfert de fichiers et des touches spéciales varient selon l'OS mobile. Contrôler un ordinateur depuis un téléphone est le cas d'usage mobile le plus fiable."
  - question: 'Les applications mobiles RustDesk sont-elles open source ?'
    answer: "Oui. Les clients mobiles partagent la même base de code open source sous licence AGPL que le client de bureau. Les versions Android sont disponibles sur les releases GitHub officielles de RustDesk et sur F-Droid sous le nom com.carriez.flutter_hbb ; le contrôleur iOS est disponible sur l'App Store d'Apple. RustDesk n'est actuellement pas distribué via Google Play."
  - question: 'Puis-je configurer un appareil Android pour un contrôle sans surveillance ?'
    answer: "En partie. RustDesk peut maintenir son service de capture actif grâce à une notification au premier plan et le relancer au démarrage, mais le consentement de capture d'écran, le clavier bloqué sur l'écran de verrouillage et le déverrouillage manuel nécessaire après un redémarrage rendent peu fiable un contrôle Android vraiment sans surveillance. Considérez le contrôle Android comme de l'assistance en présence de l'utilisateur plutôt que comme un accès permanent sans intervention."
metadata:
  description: "RustDesk sur Android et iOS : contrôlez Android à distance, pilotez vos ordinateurs depuis votre mobile, et pourquoi l'appli iPhone/iPad n'est qu'un contrôleur."
  keywords: 'contrôle à distance RustDesk Android iOS, contrôler un téléphone à distance avec RustDesk, RustDesk hôte Android, contrôler Android à distance, RustDesk iOS, contrôler un iPhone à distance, application mobile RustDesk'
---

RustDesk peut réellement contrôler un appareil Android dès que son propriétaire accorde les autorisations de capture d'écran et de saisie, et les deux applications mobiles font d'excellents _contrôleurs_ pour vos ordinateurs. L'application iOS fonctionne uniquement comme contrôleur : RustDesk n'implémente ni l'hébergement ni le partage d'écran sous iOS, vous ne pouvez donc pas prendre la main sur un iPhone ou un iPad avec RustDesk. Ce guide explique ce qui fonctionne, ce qui ne fonctionne pas et pourquoi, afin que vous puissiez planifier en fonction des capacités réelles.

Les deux applications mobiles partagent la base de code du client RustDesk, sous licence AGPL ; RustDesk Server OSS (le serveur communautaire gratuit) est lui aussi sous licence AGPL, tandis que Server Pro est un logiciel serveur auto-hébergé, commercial et propriétaire. Les versions Android sont disponibles sur les [releases GitHub officielles de RustDesk](https://github.com/rustdesk/rustdesk/releases) et sur [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) sous le nom `com.carriez.flutter_hbb`, avec une large couverture d'appareils — versions arm64, arm32 et x86_64, plus un APK universel ; le contrôleur iOS est sur l'App Store. RustDesk n'est [actuellement pas distribué via Google Play](/fr/blog/rustdesk-et-les-arnaques-a-lacces-a-distance-ce-que-nous-faisons) : il a volontairement retiré l'application Android en réponse à des abus liés aux arnaques. Même base de code, même cœur auditable.

## Le résumé en un tableau

| Scénario                                               | Pris en charge ? | Remarques                                                                 |
| ------------------------------------------------------ | ---------------- | ------------------------------------------------------------------------- |
| Contrôler un PC Windows/macOS/Linux **depuis** Android | Oui              | Contrôleur complet ; mode pavé tactile ou souris                          |
| Contrôler un PC **depuis** un iPhone/iPad              | Oui              | Contrôleur complet ; mode pavé tactile ou souris                          |
| Contrôler **un appareil Android** (en tant qu'hôte)    | Oui              | Nécessite le consentement de capture d'écran + le service d'accessibilité |
| Contrôler **un appareil iOS** avec RustDesk            | **Non**          | RustDesk pour iOS est une application de contrôle                         |
| Visualiser à distance un écran iOS avec RustDesk       | **Non**          | La visualisation d'écran entrante n'est pas implémentée dans RustDesk     |

Le reste de l'article détaille simplement chacune de ces lignes.

## Utiliser votre téléphone comme contrôleur (la partie facile)

C'est le cas d'usage qui « fonctionne tout simplement ». Installez RustDesk sur votre appareil Android ou iOS, et il devient un contrôleur complet pour n'importe quel hôte RustDesk — votre PC Windows, votre [Mac](https://rustdesk.com/docs/fr/client/mac/), votre [machine Linux](/fr/blog/rustdesk-pour-linux-le-bureau-a-distance-open-source). Saisissez l'ID cible et le mot de passe, et vous obtenez l'écran distant avec un pavé tactile à l'écran, un mode souris et un clavier logiciel. Certains usages du presse-papiers, des fichiers et des touches spéciales varient selon l'OS mobile. Rien de particulier n'est requis côté téléphone, puisque vous ne faites qu'_envoyer_ des commandes, sans être vous-même contrôlé.

Si votre métier consiste à « réparer un ordinateur où que je sois », un téléphone équipé de RustDesk est un outil vraiment efficace.

## Contrôler un appareil Android (en tant qu'hôte)

RustDesk peut transformer un téléphone ou une tablette Android en hôte contrôlable. La capture d'écran et la saisie à distance reposent sur des services Android distincts, et tous deux nécessitent une configuration.

**Capture d'écran.** RustDesk utilise l'API `MediaProjection` d'Android pour capturer l'affichage. Lorsque vous appuyez sur **Démarrer le service** dans l'application, Android affiche une invite de consentement demandant l'autorisation d'enregistrer l'écran — cette boîte de dialogue est obligatoire et ne peut pas être contournée en silence. Le partage d'écran nécessite **Android 6 ou version ultérieure** ; la capture de l'**audio système interne** du téléphone nécessite **Android 10 ou version ultérieure**. Tant que cette autorisation de capture n'est pas accordée, aucune connexion entrante ne voit rien.

**Saisie à distance.** Voir l'écran ne revient pas à le contrôler. Pour injecter des appuis, des balayages et des événements clavier, RustDesk enregistre un [`AccessibilityService`](https://deepwiki.com/rustdesk/rustdesk/6.5-mobile-platforms) nommé **RustDesk Input**, que vous activez dans **Paramètres → Accessibilité**. Il traduit les événements de souris et de gestes distants en gestes Android et peut déclencher des actions système comme Retour, Accueil et Applications récentes.

**Rester actif.** RustDesk maintient une notification de service au premier plan et, en option, une fenêtre flottante superposée pour qu'Android ne tue pas le processus de capture, et il peut relancer le service au démarrage.

Place maintenant aux limites, car le modèle de sécurité d'Android en impose de bien réelles :

- **Le consentement est requis pour démarrer la capture.** Quelqu'un (ou une préapprobation) doit accepter l'invite d'enregistrement de l'écran.
- **L'écran de verrouillage bloque la saisie.** Android n'autorise pas un service d'accessibilité à taper sur l'écran de verrouillage sécurisé : si l'appareil se verrouille, vous ne pouvez généralement pas saisir le code de déverrouillage à distance — une limite [documentée par des utilisateurs sur le terrain](https://blog.wirelessmoves.com/2025/10/remote-android-support-with-rustdesk-part-1.html).
- **Les redémarrages exigent un déverrouillage manuel.** Après un redémarrage, l'appareil doit généralement être déverrouillé sur place avant que le contrôle ne reprenne.
- **Restrictions des fabricants (OEM).** Sur les versions de certains fabricants, l'interrupteur d'accessibilité **RustDesk Input** reste grisé pour les applications installées hors boutique tant que vous n'avez pas autorisé les « paramètres restreints » (appui long sur l'icône de l'application → Infos sur l'appli → Autoriser les paramètres restreints). Chez certains fabricants, des gestionnaires de batterie agressifs peuvent aussi tuer le service en arrière-plan.

En pratique : le contrôle Android excelle pour l'**assistance en présence de l'utilisateur** — aider quelqu'un qui tient son téléphone en main — tandis que l'accès **sans surveillance et sans intervention** est le point fort de l'hôte de bureau, car les systèmes d'exploitation mobiles restreignent l'accès persistant en arrière-plan. Adaptez la plateforme à la tâche. (Pour les ordinateurs, le [guide de configuration de l'accès sans surveillance](/fr/blog/acces-non-surveille-rustdesk-guide-de-configuration) couvre le vrai sujet.)

## iOS : contrôleur RustDesk, visualisation d'écran et contrôle de la saisie

**RustDesk pour iOS est un contrôleur, pas un hôte.** Il sert à contrôler des ordinateurs ou des appareils Android pris en charge. La visualisation d'écran et le contrôle de la saisie entrants sous iOS ne sont pas implémentés dans RustDesk, comme l'explique la [demande de fonctionnalité d'hôte iOS](https://github.com/rustdesk/rustdesk/discussions/4839).

D'autres éditeurs adoptent une autre approche. Les API de diffusion d'Apple permettent un partage d'écran lancé par l'utilisateur, et [AnyDesk documente la visualisation à distance entrante sous iOS/iPadOS 12 et versions ultérieures](https://support.anydesk.com/docs/anydesk-for-ios-ipados-tvos), sans contrôle de la saisie à distance. Un technicien qui regarde un écran pendant que son propriétaire tape dessus, ce n'est pas le même flux de travail que le contrôler.

Apple propose aussi un [contrôle à distance avec consentement dans FaceTime](https://support.apple.com/guide/iphone/request-give-remote-control-a-facetime-call-iph5d70f34a3/ios), sous réserve de ses conditions d'appareil, de région et de version d'OS. Si votre flux d'assistance exige de voir l'écran d'un iPhone, utilisez un outil qui implémente ce flux ; pour contrôler des ordinateurs depuis un iPhone ou un iPad, l'application de contrôle RustDesk est le bon choix.

## Une remarque sur la confidentialité et l'auto-hébergement

Comme les applications mobiles sont open source et parlent le même protocole que le client de bureau, vous pouvez les pointer vers votre propre [serveur RustDesk auto-hébergé](/fr/blog/pourquoi-heberger-vous-meme-votre-logiciel-de-bureau-a-distance) plutôt que vers le réseau public — les sessions mobiles sont alors mises en relation par une infrastructure que vous contrôlez, ID compris. Pour les flux d'assistance qui touchent des appareils personnels, cet enjeu de souveraineté des données compte plus que d'habitude.

Le compromis reste le même : vous exploitez et sécurisez ce serveur vous-même — mises à jour, supervision, sauvegardes et planification de capacité comprises — et pour beaucoup d'équipes, garder les données de session sur leur propre terrain en vaut largement la peine.

## Pour commencer

Téléchargez les versions Android depuis les [releases GitHub officielles](https://github.com/rustdesk/rustdesk/releases) ou installez le paquet depuis [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/). RustDesk n'est [actuellement pas distribué via Google Play](/fr/blog/rustdesk-et-les-arnaques-a-lacces-a-distance-ce-que-nous-faisons) ; le contrôleur iOS reste disponible sur l'App Store d'Apple. Pour contrôler un téléphone, celui-ci doit être sous Android — acceptez l'invite de capture d'écran et activez le service d'accessibilité RustDesk Input. Pour contrôler vos ordinateurs depuis un téléphone, les deux applications mobiles fonctionnent d'emblée. Les offres actuelles figurent sur [rustdesk.com/pricing](https://rustdesk.com/pricing), et [sales@rustdesk.com](mailto:sales@rustdesk.com) peut vous aider pour Server Pro. Vous voulez d'abord le voir ? [Découvrez RustDesk en action](https://www.youtube.com/@rustdesk).
