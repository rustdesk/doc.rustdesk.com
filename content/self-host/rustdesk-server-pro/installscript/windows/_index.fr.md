---
title: Installation Windows
weight: 5
---

{{% notice note %}}
La politique de sécurité Windows est délicate, si ce tutoriel ne fonctionne pas pour vous, ou si vous rencontrez une connexion instable, veuillez migrer vers un serveur Linux.
{{% /notice %}}

{{% notice note %}}
La version GUI, `RustDeskServer.setup.exe` n'est plus maintenue, non recommandée.
{{% /notice %}}

## Installer

Le Microsoft Visual C++ Redistributable est requis pour exécuter rustdesk sur Windows. Vous pouvez le télécharger [ici](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist)

1. Obtenez votre licence depuis [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), consultez la page [licence](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) pour plus de détails.
2. Téléchargez l'installateur Windows depuis [GitHub](https://github.com/rustdesk/rustdesk-server-pro/releases/latest).
3. Décompressez l'installateur Windows.
4. Exécutez l'installateur et suivez les étapes à l'écran. Ou installez manuellement avec [PM2 ou NSSM](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/windows/).
5. Une fois terminé, ouvrez RustDesk Server.
6. Suivez les invites qui vous guident à travers l'installation.
7. Cliquez sur `Services` puis sur `Start`.
8. Une fois l'installation terminée, allez à `http://youripaddress:21114`.
9. Connectez-vous avec le nom d'utilisateur `admin` et le mot de passe `test1234`.
10. Entrez votre code de licence acheté à l'étape 1.

## Utiliser IIS comme Proxy

Veuillez vous assurer que `Dynamic Content Compression` est installé (c'est une fonctionnalité IIS qui peut être installée avec les Rôles Serveur).
1. Ouvrez IIS (ou installez-le).
2. Créez un nouveau site web pour RustDesk avec les liaisons (idéalement 443) et le certificat pertinent. Les paramètres de base doivent pointer vers un dossier vide. (Si vous utilisez le site par défaut, assurez-vous qu'il n'y a pas d'autres fichiers dans le dossier).
3. Sur IIS, installez [Application Request Routing](https://www.iis.net/downloads/microsoft/application-request-routing) et [URL Rewrite](https://learn.microsoft.com/en-us/iis/extensions/url-rewrite-module/using-the-url-rewrite-module).

## Application Request Routing

1. Sous l'hôte du serveur IIS, ouvrez Application Request Routing.
2. Allez dans Server Proxy Settings.
3. Activez le proxy et tous les paramètres apparaîtront, vous pouvez les laisser par défaut.
4. Sauvegardez les paramètres et nous pouvons passer à l'étape suivante : URL Rewrite.

## URL Rewrite

1. Ouvrez le site sur IIS dans le volet gauche et double-cliquez sur URL Rewrite.
2. Cliquez sur `Add rules`.
3. Configurez une nouvelle règle de proxy inverse.
4. Configurez l'adresse locale (l'adresse 21114) \
Règle entrante – l'adresse interne RustDesk 21114 \
Règles sortantes – `From` est l'adresse interne RustDesk 21114 et `To` est l'adresse externe. \
Note : Pas de http / https avant les adresses – elles sont gérées automatiquement. Aussi, assurez-vous que toutes les adresses sont accessibles à la fois en interne et en externe.

## Compression

1. Désactivez `Dynamic Content Compression`.

## Dépannage

Si vous avez une erreur 500.52, ajoutez les variables mentionnées : [IIS acting as reverse proxy: Where the problems start](https://techcommunity.microsoft.com/t5/iis-support-blog/iis-acting-as-reverse-proxy-where-the-problems-start/ba-p/846259).

Vous devrez peut-être changer vos paramètres SSL vers "Require SSL → Ignore".
