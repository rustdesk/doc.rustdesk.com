---
publishDate: 2026-07-03T08:18:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'fr'
translationKey: 'avoid-remote-desktop-scams'
draft: false
title: 'Arnaques au bureau à distance : comment les repérer et les éviter'
excerpt: "Comment fonctionnent les arnaques à l'accès à distance, les signaux d'alerte qui les trahissent, et la marche à suivre exacte si un escroc a déjà pris le contrôle de votre ordinateur."
image: '~/assets/images/blog/avoid-remote-desktop-scams-og.webp'
category: 'Sécurité'
tags: ['Sécurité', 'Dépannage']
author: 'RustDesk Team'
slug: 'arnaques-au-bureau-a-distance-comment-les-reperer-et-les-eviter'
faq:
  - question: "Qu'est-ce qu'une arnaque au bureau à distance ?"
    answer: "Il s'agit d'une forme de fraude dans laquelle un criminel vous convainc d'installer un logiciel d'accès à distance légitime, puis l'utilise pour prendre le contrôle de votre ordinateur, généralement pour transférer de l'argent, voler des données ou installer un logiciel malveillant. Les outils utilisés sont les mêmes que ceux employés quotidiennement par les équipes informatiques. Ce qui en fait une arnaque, c'est que la personne au bout du fil vous a contacté sous un faux prétexte et vous a convaincu de lui accorder l'accès."
  - question: 'Un escroc peut-il accéder à mon ordinateur si je ne lui ai jamais communiqué de code ni rien installé ?'
    answer: "Généralement non. Dans une arnaque classique au faux support technique, refuser d'installer l'outil de l'appelant ou de partager un code de connexion suffit à stopper la tentative. D'autres voies existent toutefois : un accès sans surveillance configuré auparavant, des identifiants volés, un logiciel malveillant ou des services exposés comme RDP. Si vous constatez des sessions ou une activité de compte inexpliquées, déconnectez l'appareil et enquêtez, même si vous n'avez jamais communiqué de code."
  - question: "Que dois-je faire dès que je réalise que j'ai été victime d'une arnaque ?"
    answer: "Déconnectez l'appareil, conservez les preuves, supprimez les logiciels d'accès à distance non autorisés et changez vos mots de passe depuis un autre appareil de confiance, en commençant par la messagerie et la banque. Contactez rapidement votre banque ou l'émetteur de votre carte. Aux États-Unis, signalez les faits à FTC ReportFraud et au FBI IC3, et envisagez une alerte de fraude ou un gel de crédit auprès des agences américaines d'évaluation du crédit. Ailleurs, contactez la police locale, l'autorité compétente en matière de fraude et le service local de protection de l'identité."
  - question: 'Utiliser RustDesk me protège-t-il des arnaques ?'
    answer: "Non. Aucun outil de bureau à distance, RustDesk compris, ne peut vous mettre totalement à l'abri des arnaques : si quelqu'un vous pousse à installer un client et à lui lire un code de connexion, il peut prendre le contrôle sur n'importe quelle plateforme. RustDesk vous donne en revanche davantage de maîtrise : l'auto-hébergement place le serveur ID et le relais sous votre contrôle, le Contrôle d'accès de Server Pro et une liste blanche d'ID ou d'IP limitent qui peut se connecter, et le client open source peut être audité."
metadata:
  description: "Comment fonctionnent les arnaques à l'accès à distance, les signaux d'alerte à surveiller et que faire si un escroc a déjà pris le contrôle de votre ordinateur."
  keywords: "arnaque au bureau à distance, arnaque à l'accès à distance, arnaque au support technique, comment éviter une arnaque à l'accès à distance, escroc prend le contrôle de mon ordinateur à distance, signaler une arnaque au support technique"
---

Une arnaque au bureau à distance est une forme de fraude dans laquelle un criminel vous convainc d'installer un logiciel d'accès à distance légitime, puis l'utilise pour prendre le contrôle de votre ordinateur — afin de vider un compte bancaire, voler des données ou installer un logiciel malveillant. Les outils eux-mêmes sont les mêmes que ceux utilisés quotidiennement par les services informatiques. Ce qui transforme cela en arnaque, c'est qui se trouve à l'autre bout du fil et la manière dont cette personne s'y est prise pour obtenir votre confiance.

Ce guide se veut délibérément neutre vis-à-vis des éditeurs. N'importe quel produit de bureau à distance peut être détourné de cette manière, RustDesk y compris. L'objectif ici est de vous aider à reconnaître ce scénario, à le refuser, et à vous en sortir si vous en avez déjà été victime.

## Comment fonctionne une arnaque à l'accès à distance

La [Federal Trade Commission américaine](https://consumer.ftc.gov/articles/how-spot-avoid-and-report-tech-support-scams) et le [FBI](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/tech-support-scams) décrivent tous deux un scénario remarquablement cohérent :

1. **L'appât.** Une fenêtre pop-up vous avertit que « votre ordinateur est infecté », ou vous recevez un appel, un e-mail ou un SMS inattendu. L'expéditeur usurpe l'identité d'un nom auquel vous faites confiance — Microsoft, Apple, Amazon, votre banque, un fournisseur de services publics, ou même votre propre service informatique.
2. **L'urgence fabriquée.** Votre compte est compromis, un virus se propage, un remboursement vous attend, ou votre service va être coupé. Selon la FTC, les escrocs « veulent que vous agissiez avant d'avoir eu le temps de réfléchir » — la pression pour vous précipiter est justement l'objectif recherché.
3. **L'installation de l'outil.** On vous demande de télécharger un « logiciel d'assistance à distance gratuit » pour qu'ils puissent « réparer » le problème. C'est un logiciel bien réel — c'est justement ce qui rend la manœuvre crédible.
4. **L'octroi de l'accès.** On vous demande de lire le code de connexion ou le mot de passe affiché à l'écran, ou d'accepter la session entrante. Un ID d'appareil seul ne donne généralement pas le contrôle ; c'est en partageant le code ou en acceptant la demande que vous leur ouvrez la porte.
5. **La prise de contrôle.** Ils simulent une analyse antivirus, ouvrent votre site bancaire, transfèrent de l'argent ou créent de nouveaux comptes. Le [bureau du FBI à Boston](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software) a averti que les escrocs utilisent cet accès pour ouvrir des comptes en cryptomonnaie et liquider les véritables soldes bancaires de leurs victimes.

Ces pertes ne sont pas théoriques. Dans ce même avertissement du FBI, les enquêteurs ont décrit le cas d'un couple du Maine qui, après qu'une fenêtre pop-up leur a demandé d'appeler un numéro pour « Fidelity », a reçu pour instruction d'installer un logiciel de bureau à distance et de laisser de faux représentants « Microsoft » et « Fidelity » surveiller leurs comptes — perdant ainsi environ **1,1 million de dollars**.

## Les signaux d'alerte

Presque toutes les arnaques à l'accès à distance déclenchent au moins l'un de ces signaux :

- **Un contact non sollicité.** Un inconnu vous contacte pour résoudre un problème informatique que vous n'avez jamais signalé. La FTC est catégorique à ce sujet : elle et ses administrateurs de remboursement « ne vous demanderont jamais de payer par cartes-cadeaux » ni « ne demanderont un accès à distance à votre appareil ». Ni Microsoft, ni Apple, ni votre banque ne le feront non plus.
- **Une fenêtre pop-up avec un numéro de téléphone.** Les alertes de sécurité légitimes ne vous demandent jamais d'appeler une ligne d'assistance. Ce numéro appartient à l'escroc.
- **La pression et l'urgence.** « Faites ceci immédiatement ou vous perdrez tout » est une tactique de manipulation, pas une procédure d'assistance.
- **Une demande d'installer un logiciel et de lire un code à voix haute.** C'est le rouage central de l'arnaque. Aucun appelant honnête n'en a besoin.
- **Un basculement vers l'argent.** Cartes-cadeaux, virements bancaires, cryptomonnaie, ou un « remboursement » mystérieusement trop élevé qu'il faudrait « renvoyer ».
- **Rester en ligne pendant que vous vous connectez.** Ils veulent vous regarder saisir vos identifiants bancaires.

## Assistance légitime ou arnaque

|                              | Assistance à distance légitime                           | Une arnaque                                                        |
| ---------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| Qui prend l'initiative       | Vous les contactez, à un numéro que vous avez recherché  | Ils vous contactent à l'improviste                                 |
| Le problème                  | Un problème que vous avez déjà signalé                   | Un problème qu'ils ont « découvert » et porté à votre connaissance |
| Urgence                      | Planifiée, sans précipitation                            | « Agissez maintenant, sinon… »                                     |
| Le code de connexion         | Vous choisissez de le partager, en connaissance de cause | On vous met la pression pour le lire à voix haute rapidement       |
| Paiement                     | Facturation normale, le cas échéant                      | Cartes-cadeaux, virement, cryptomonnaie, « remboursements »        |
| Accès aux services bancaires | Jamais nécessaire pour réparer un PC                     | Le véritable objectif                                              |

## Que faire si vous avez déjà donné accès à un escroc

Si vous réalisez en plein appel ou après coup que vous avez été victime d'une arnaque, agissez rapidement et dans l'ordre :

1. **Déconnectez-vous d'Internet.** Désactivez le Wi-Fi ou débranchez le câble réseau pour couper immédiatement leur session.
2. **Désinstallez l'application d'accès à distance** qu'on vous a fait installer. Si vous ne savez pas comment faire, un technicien local de confiance peut vous aider.
3. **Recherchez les logiciels malveillants.** Effectuez une analyse antivirus complète ; envisagez un nettoyage professionnel si des machines sensibles étaient concernées. Partez du principe qu'ils ont pu laisser quelque chose derrière eux.
4. **Changez vos mots de passe depuis un autre appareil de confiance** — messagerie et comptes bancaires en premier, puis tout ce qui partage un mot de passe.
5. **Appelez votre banque et les émetteurs de vos cartes.** Signalez la fraude, renseignez-vous sur l'annulation des virements, et surveillez toute activité non autorisée.
6. **Protégez votre identité.** Si vous avez communiqué des informations personnelles, placez une alerte de fraude ou un gel de crédit auprès des trois grandes agences américaines d'évaluation du crédit : Equifax, Experian et TransUnion.
7. **Signalez les faits dans votre juridiction.** **Aux États-Unis**, déposez un signalement auprès de la FTC sur [ReportFraud.ftc.gov](https://reportfraud.ftc.gov) et auprès du [FBI IC3](https://www.ic3.gov). Hors des États-Unis, contactez la police locale et l'autorité compétente pour le signalement des fraudes ; demandez à votre banque quelles mesures locales de protection de l'identité appliquer.

## Comment le prévenir

La prévention repose sur quelques habitudes simples :

- **N'installez jamais de logiciel d'accès à distance à la demande de quelqu'un qui vous a contacté.** Inversez la logique : si vous avez besoin d'aide, trouvez vous-même le vrai numéro de l'éditeur et appelez-le.
- **Ne lisez jamais un code de connexion à voix haute** à quelqu'un que vous n'avez pas contacté vous-même délibérément.
- **Considérez les numéros de téléphone affichés dans les pop-ups comme faux.** Fermez le navigateur — forcez sa fermeture si nécessaire — plutôt que d'appeler.
- **Ralentissez.** L'urgence est l'outil de l'escroc. Une institution réelle vous laissera raccrocher et rappeler.
- **Parlez-en.** Ces arnaques ciblent de manière disproportionnée les personnes âgées et les personnes sous stress. Un simple « est-ce que ça te semble normal ? » posé à un proche suffit souvent à rompre le charme.

## La place des outils de bureau à distance

Il vaut la peine de le répéter : le logiciel n'est pas le coupable. Les outils de bureau à distance sont ce qui permet aux équipes informatiques de faire fonctionner les ordinateurs du monde entier, et une seule et même application peut être une bouée de sauvetage ou une arme selon qui la tient. Blâmer tel ou tel produit passe à côté de l'essentiel — la véritable défense consiste à contrôler qui vous laissez entrer.

Cela dit, si vous _assurez_ de l'assistance à distance à titre professionnel, quelques choix structurels réduisent votre exposition. Auto-héberger le serveur RustDesk place les services ID/rendez-vous et relais sur une infrastructure que vous contrôlez. Ce sont alors vos propres contrôles qui déterminent qui peut se connecter : appliquez une [hygiène de base de l'accès sans surveillance](/fr/blog/acces-non-surveille-rustdesk-guide-de-configuration), avec des mots de passe permanents forts et uniques et la 2FA de connexion, ajoutez une liste blanche d'IP ou d'ID sur les appareils contrôlés, et utilisez le [Contrôle d'accès](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/permissions/) par utilisateur et par groupe d'appareils de Server Pro. Et comme RustDesk est [open source](https://github.com/rustdesk/rustdesk), vous ou une équipe sécurité pouvez auditer exactement ce qu'il fait sur vos machines.

Rien de tout cela ne rend RustDesk — ni aucun autre outil — totalement à l'abri des arnaques. Un utilisateur poussé à installer un client et à lire un code à voix haute peut être victime d'une arnaque sur n'importe quelle plateforme. La structure réduit certains risques ; elle ne remplace jamais la règle simple au cœur de chaque avertissement ci-dessus : ne confiez jamais le contrôle de votre ordinateur à quelqu'un qui _vous_ a contacté.

Si vous souhaitez approfondir la manière dont certains outils spécifiques gèrent la sécurité et comment leur identité est usurpée, consultez nos guides complémentaires sur la question de savoir si [AnyDesk est sûr](/fr/blog/anydesk-est-il-sur-chiffrement-incident-de-securite-de-2024-et-arnaques) et si [Chrome Remote Desktop est sûr](/fr/blog/chrome-remote-desktop-est-il-sur-un-avis-honnete).
