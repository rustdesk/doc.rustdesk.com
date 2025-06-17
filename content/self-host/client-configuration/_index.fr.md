---
title: Configuration du Client
weight: 300
pre: "<b>2.3. </b>"
---

## Aperçu

Il existe plusieurs façons de configurer les clients RustDesk pour utiliser votre propre serveur auto-hébergé, nous en couvrirons quelques-unes ci-dessous.

## 1. Générateur de client personnalisé (Pro uniquement, plan de base ou plan personnalisé)

Vous pouvez avoir votre propre nom, logo, icône, configuration, signature et plus encore.

Actuellement, Windows X64, Mac Arm64 / X64, [Linux](https://twitter.com/rustdesk/status/1788905463678951787), Android Arm 64 sont pris en charge.

[Vidéo](https://twitter.com/rustdesk/status/1769171628426944539)

![](/docs/en/self-host/client-configuration/images/custom-client-qs.png)
![](/docs/en/self-host/client-configuration/images/web_console_custom_client_config.jpeg)

## 2. Configuration manuelle

Dans la page d'accueil du client RustDesk, cliquez sur le bouton de menu [ &#8942; ] à côté de votre ID puis cliquez sur Réseau, vous pouvez maintenant déverrouiller les paramètres en utilisant des privilèges élevés et définir votre `ID`, `Relais`, `API` et `Clé`. Il est important de noter que cette `Clé` est la clé publique utilisée pour le chiffrement de connexion, distincte de la clé de licence fournie avec votre achat de version Pro.

![](/docs/en/self-host/client-configuration//docs/en/self-host/client-configuration/images/network-config.png)

Entrez l'hôte ou l'adresse IP `hbbs` dans la zone de saisie **Serveur ID** (côté local + côté distant). Les deux autres adresses peuvent être laissées vides, RustDesk les déduira automatiquement (si pas spécialement défini), et le Serveur Relais fait référence à `hbbr` (port 21117).

par exemple

```nolang
hbbs.example.com
```

ou

```nolang
hbbs.example.com:21116
```

### Définir la `Clé`

Pour établir une connexion chiffrée à votre serveur auto-hébergé, vous devez entrer sa clé publique. La clé est généralement générée lors de la première exécution de `hbbs` et peut être trouvée dans le fichier `id_ed25519.pub` dans votre répertoire de travail / dossier de données.

En tant qu'utilisateur `Pro`, vous pourrez également récupérer la `Clé` depuis la [console web](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/).

![](/docs/en/self-host/rustdesk-server-pro/console//docs/en/self-host/client-configuration/images/console-home.png?v2)

### Définir le `Serveur API`

Ceci est pour les utilisateurs `Pro` uniquement. Lorsque vous pouvez vous connecter sur la console web, mais échouez à vous connecter sur le client RustDesk, c'est probablement que vous n'avez pas défini le `Serveur API` correctement.

Si votre Serveur API ne fonctionne pas sur le port par défaut `21114` (vous pourriez ne pas ajouter ce port au pare-feu si vous venez de la version open source), veuillez spécifier explicitement le `Serveur API`.
par exemple si votre Serveur API fonctionne sur le port HTTPS par défaut, veuillez spécifier le `Serveur API` avec `https://hbbs.example.com`.

Si vous ne pouvez toujours pas confirmer la valeur du `Serveur API`, veuillez aller à la page d'accueil de la console web, le `Serveur API` est montré dans l'image ci-dessus (La zone de saisie avec le label `API:`).

## 3. Configuration par Import ou Export

1. Utilisez les étapes [ci-dessus](https://rustdesk.com/docs/en/self-host/client-configuration/#manual-config) pour configurer le Client RustDesk sur un appareil.
2. En utilisant la machine ci-dessus, allez dans Paramètres puis Réseau et déverrouillez.
3. Cliquez sur `Exporter la Config Serveur`.
4. Collez la chaîne copiée dans Notepad ou similaire.
5. Allez au nouveau client, copiez ce qui précède dans le presse-papiers.
6. Allez dans Paramètres puis Réseau dans le Client RustDesk, déverrouillez et cliquez sur `Importer la Config Serveur`.
7. Il collera automatiquement les paramètres.
8. Cliquez sur `Appliquer`.

## 4. Configuration automatique

La façon la plus facile de configurer automatiquement est d'utiliser les scripts de déploiement trouvés [ici](https://rustdesk.com/docs/en/self-host/client-deployment/).

## 5. Importer la config depuis `Pro` via le presse-papiers

![](/docs/en/self-host/rustdesk-server-pro/console//docs/en/self-host/client-configuration/images/console-home.png?v2)

https://github.com/rustdesk/rustdesk-server-pro/discussions/372#discussioncomment-10473298

## 6. Utiliser la ligne de commande `--config`
`rustdesk.exe --config <chaîne-config>`

Vous pouvez obtenir la chaîne de configuration depuis la console web (vous pouvez la voir sur l'image ci-dessus) ou depuis le client RustDesk "Paramètres → Réseau" ([ici](https://github.com/rustdesk/rustdesk/discussions/7118) est une discussion à ce sujet).