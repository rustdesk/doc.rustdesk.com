---
title: Licence
weight: 15
---

## Acheter une licence

Veuillez obtenir votre licence depuis [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), entrez une adresse email valide dans la page de paiement Stripe. La licence (et la facture dans un mail séparé) sera envoyée à votre email une fois le paiement effectué avec succès.

![](/docs/en/self-host/rustdesk-server-pro/license/images/stripe.jpg)

## Définir la licence

Vous devrez entrer la licence dans la console web (`http://<rustdesk-server-pro-ip>:21114`), ou changer la licence plus tard.

| Définir la licence | Changer la licence |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/set.png) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/change.png) |

## Renouveler/mettre à niveau la licence

Renouveler/mettre à niveau la licence peut être trouvé via le [portail de licence en libre-service](https://rustdesk.com/self-host/account/) comme décrit ci-dessous, connectez-vous avec l'email que vous avez utilisé pour acheter la licence comme l'image ci-dessus.

| Page de licence avec actions de renouvellement/mise à niveau | Fenêtre de mise à niveau |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/renew.jpg?v2) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/upgrade.png) |

Après avoir effectué le paiement, veuillez actualiser la licence [comme ci-dessous](/docs/en/self-host/rustdesk-server-pro/license/#refresh-license) pour l'activer.

### Actualiser la licence
Après le paiement, vous devez procéder à la console web pour l'activer manuellement comme ci-dessous. Cliquez simplement sur `Modifier`, puis `OK`, pas besoin de modifier quoi que ce soit, car votre clé de licence reste la même.

![](/docs/en/self-host/rustdesk-server-pro/license/images/updatelic.jpg)

## Factures, Récupération de Licence et Migration

La licence ne peut être utilisée que sur une machine (pour hbbs uniquement, hbbr ne nécessite pas de licence), si vous voulez migrer vers une autre machine, récupérer votre licence ou télécharger des factures, veuillez aller sur [https://rustdesk.com/self-host/account/](https://rustdesk.com/self-host/account/). Connectez-vous avec l'adresse email utilisée pour le paiement Stripe, déliez l'ancienne machine de laquelle vous voulez migrer comme ci-dessous, quand vous définissez la licence dans la console web du nouveau serveur, elle assignera la licence et s'enregistrera automatiquement dans la console.

![](/docs/en/self-host/rustdesk-server-pro/license/images/unbind.jpg)

## Proxy
Si votre serveur ne peut pas accéder à internet pour vérifier la licence directement, vous pouvez ajouter un proxy, par exemple `proxy=http://username:password@example.com:8080 ./hbbs`.

Alternativement, vous pouvez ajouter `proxy=http://username:password@example.com:8080` au fichier `.env` sous le répertoire de travail (où résident les fichiers `id_ed25519` / `db.sqlite3`).

`http` peut être remplacé par `https` ou `socks5`. S'il n'y a pas de `username` / `password` / `port`, cela peut être `proxy=http://example.com`.