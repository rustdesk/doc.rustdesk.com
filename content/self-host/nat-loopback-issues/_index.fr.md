---
title: Problèmes de NAT Loopback
weight: 500
pre: "<b>2.5. </b>"
---

{{% notice note %}}
Cette explication implique des connaissances complexes en réseaux, nous avons besoin de votre aide pour améliorer sa lisibilité.
{{% /notice %}}


Pour plus de détails sur le NAT Loopback, veuillez consulter la page [Wikipedia](https://en.m.wikipedia.org/wiki/Network_address_translation#NAT_hairpinning).

Lorsque vous déployez le serveur RustDesk sur votre réseau domestique ou tout autre environnement réseau qui se trouve derrière un pare-feu NAT, le serveur RustDesk et vos clients **DOIVENT** soit :
A : Utiliser l'adresse IP locale pour accéder les uns aux autres OU :
B : Avoir un pare-feu qui prend en charge et a activé le NAT Loopback.

Vous pourriez remarquer que vous ne pouvez pas vous connecter à votre serveur via votre **IP publique** ou **domaine** (qui en théorie pointe vers votre IP publique).

# Problème
Dans cet exemple, nous suivrons ce qui se passe lorsque les appareils LAN tentent de se connecter à `rustdesk.example.com`. Supposons que l'IP publique de votre routeur soit `172.16.16.1`, l'IP LAN de votre serveur soit `192.168.11.20` et le domaine que vous souhaitez soit `rustdesk.example.com`, et vous avez un client utilisant '192.168.11.2'.

Lorsque vous configurez un serveur derrière le NAT du routeur, vous pouvez ajouter une redirection de port dans le routeur pour changer tout message entrant vers l'IP PUBLIQUE 172.16.16.1 pour aller au serveur à 192.168.11.20

Lorsqu'un appareil LAN veut accéder à Internet, disons un serveur web sur 8.8.8.8, il envoie la demande comme venant de 192.168.11.2, et l'envoie au routeur. Le routeur interceptera cette demande et réécrira cette demande vers 8.8.8.8 comme venant de 172.16.16.1. Lorsque 8.8.8.8 répond à 172.16.16.1, le routeur vérifiera une connexion précédente et reroutera cette réponse vers 192.168.11.2.

Si l'utilisateur à 8.8.8.8 envoie un message à notre réseau en utilisant 172.16.16.1, la règle de redirection de port réécrira la destination de 172.16.16.1 vers le serveur à 192.168.11.20 en laissant la source de la demande comme 8.8.8.8 pour que le serveur puisse répondre (plus ou moins) directement à 8.8.8.8.

Si l'utilisateur à 8.8.8.8 décide d'essayer de pirater notre réseau et prétend envoyer ses messages depuis 192.168.11.2, le routeur sait que le trafic venant de 192.168.11.2 n'est valide que depuis les appareils LAN et bloquera généralement ce trafic.

Le problème survient lorsque vous essayez de boucler dans le LAN. Si l'appareil LAN essaie de se connecter à `rustdesk.example.com`, qui sera `172.16.16.1`. À ce point, le routeur a beaucoup de choix à faire. Il vient d'envoyer un message de son port LAN vers son port WAN venant DE 192.168.11.2 allant vers 172.16.16.1. Une fois qu'il atteint le port WAN, ce message est indissociable par lui-même de l'exemple ci-dessus où quelqu'un sur Internet essayait de pirater notre réseau.

La fonctionnalité NAT Loopback changera effectivement la partie source "De 192.168.11.2" de l'adresse plus tôt dans le processus pour qu'elle sache qu'elle doit utiliser la table NAT pour faire passer les messages dans les deux sens entre le serveur et le client.

S'il y a un problème avec les connexions seulement lorsque vous êtes à l'intérieur du LAN, mais ça fonctionne bien depuis l'extérieur, c'est peut-être le problème que vous rencontrez.


# Solutions
Il y a trois façons de résoudre ce problème.

## 1. Configurer le NAT Loopback sur votre routeur
Vous pourriez configurer le NAT Loopback sur votre routeur si vous savez comment faire, mais configurer cela nécessite des connaissances en réseaux. Certains routeurs n'ont pas la capacité d'ajuster ce paramètre, donc ce n'est pas la meilleure option pour tout le monde.

{{% notice note %}}
Un article de [MikroTik](https://help.mikrotik.com/docs/display/ROS/NAT#NAT-HairpinNAT) l'explique très bien. Vous pourriez commencer à apprendre à partir d'ici.
{{% /notice %}}

## 2. Déployer un serveur DNS sur votre LAN
D'abord, choisissez lequel vous préférez, [AdGuard Home](https://github.com/AdguardTeam/AdGuardHome/wiki/Docker) ou [Pi-hole](https://github.com/pi-hole/docker-pi-hole). Vous pourriez le déployer via docker, ou vous pourriez le déployer sur le même serveur que votre serveur RustDesk. L'exemple ci-dessous vous montrera quelques étapes pour cet exemple.

Tous les deux sont des bloqueurs de publicités basés sur DNS, mais vous pourriez désactiver cette fonctionnalité si vous ne voulez pas bloquer les publicités.

D'abord, pointez votre `domaine` vers l'IP LAN de votre serveur RustDesk (par exemple `192.168.11.20`). Ensuite, allez dans les paramètres `DHCP` de votre routeur (Attention : PAS WAN) et définissez votre `Première` IP DNS sur le serveur où vous avez déployé AdGuard Home ou Pi-hole. Le DNS `Secondaire` pourrait être le DNS de votre FAI ou autre DNS public, ex. `1.1.1.1` pour Cloudflare ou `8.8.8.8` pour Google, et c'est terminé !

Voici un exemple :
### AdGuard Home
Bloquer les publicités peut causer des problèmes, si vous ne voulez pas comprendre la solution et voulez désactiver cette fonctionnalité, cliquez sur le bouton "Désactiver la protection".

![](images/adguard_home_disable_protection.png)
<br>

Allez dans les paramètres "Réécritures DNS".

![](images/adguard_home_click_dns_rewrites.png)
<br>

Cliquez sur "Ajouter une réécriture DNS", puis tapez votre `domaine` et l'`IP LAN` du serveur dans le champ.

![](images/adguard_home_dns_rewrite_dialog.png)

Voici à quoi ressemble le résultat final.

![](images/adguard_home_dns_rewrite_final_result.png)

***N'oubliez pas d'assigner votre AdGuard Home au DHCP LAN de votre routeur !***
<hr>

### Pi-hole
Bloquer les publicités peut causer des problèmes, si vous ne voulez pas comprendre la solution et voulez désactiver cette fonctionnalité, cliquez sur le bouton "Indéfiniment" dans le sous-menu "Désactiver le blocage".

![](images/pi_hole_disable_blocking.png)

Allez dans "DNS local → Enregistrements DNS".
Tapez votre `domaine` et `IP` dans la boîte, puis cliquez sur "Ajouter".

Pour vérifier les résultats finaux, regardez les lignes jaunes dans cette image.

![](images/pi_hole_local_dns_dns_records.png)

***N'oubliez pas d'assigner votre Pi-hole au DHCP LAN de votre routeur !***

## 3. Ajouter des règles à votre fichier hosts
Cette méthode n'est recommandée que si vous avez un petit nombre d'appareils. Si vous avez beaucoup d'appareils, la méthode DNS est préférée. Sinon, vous devriez faire cela manuellement sur chaque appareil qui a besoin d'accéder au serveur.

{{% notice warning %}}
Si cette méthode est utilisée sur un appareil portable comme un ordinateur portable, il ne pourra pas se connecter au serveur lorsqu'il est en dehors de votre LAN.
{{% /notice %}}

Chemin pour différents OS :

### Windows
```text
C:\Windows\system32\drivers\etc\hosts
```
Vous pouvez éditer avec des privilèges élevés ou vous pouvez copier ce fichier sur le `Bureau` et l'éditer. Après l'avoir édité, copiez-le de retour au chemin original.

### macOS
```text
/etc/hosts
```
Vous pourriez utiliser `vim`, il est pré-installé.
```sh
sudo vim /etc/hosts
```

### Linux
```text
/etc/hosts
```
Vous pourriez utiliser `vim` ou `nano`.
```sh
sudo vim /etc/hosts
```

<hr>

Le format est le même dans les trois systèmes d'exploitation. `IP` d'abord suivi du `domaine`. Une entrée par ligne.

Par exemple :
```text
192.168.11.20   rustdesk.example.com
```