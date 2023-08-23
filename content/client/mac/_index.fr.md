---
title: Mac 
weight: 3
---

### Installation
------

Ouvrez le fichier .dmg et faites glisser "RustDesk" vers "Applications" comme ci-dessous.
![](/docs/en/client/mac/images/dmg.png)

Assurez-vous que vous avez quitté les instance des "RustDesk" en cours d'exécution. Assurez-vous également d'avoir quitter le service "RustDesk" si affiché dans la barre d'état.

![](/docs/en/client/mac/images/tray.png)

### Autoriser l'exécution de "RustDesk"

| Déverrouillez pour modifier | Cliquez sur "App Store et développeurs identifiés" |
| ---- | ---- |
|![](/docs/en/client/mac/images/allow2.png)|![](/docs/en/client/mac/images/allow.png)|

### Activer les autorisations

{{% notice note %}}
En raison du changement de politique de sécurité de MacOS, notre API qui capture les entrées du côté local ne fonctionne plus du tout. Vous devez activer l'autorisation "Surveillance des entrées" du côté Mac.
Voir ceci: [https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923)

Cela ne semble pas être une solution miracle, nous devons résoudre le problème avec notre prochaine version Flutter.
{{% /notice %}}

Pour capturer l'écran, vous devez accorder à "RustDesk" l'autorisation d'**accessibilité** et l'autorisation d'**enregistrement d'écran**. "RustDesk" vous guidera vers la fenêtre des paramètres.

| Lien vers la configuration accessibilité | Fenêtre configuration accessibilité |
| ---- | ---- |
|![](/docs/en/client/mac/images/acc.png)|![](/docs/en/client/mac/images/acc3.png?v2)|

Si vous avez bien activé les permissions dans la fenêtre des paramètres, mais que "RustDesk" vous avertit toujours. Veuillez supprimer "RustDesk" de la liste de la fenêtre paramètres d'accessibilité par le bouton **"-"**, cliquez sur le bouton **"+"** et sélectionnez "RustDesk" dans **"/Applications"**.

| boutons "-" et  "+" | Sélectionnez "RustDesk"  |
| ---- | ---- |
|![](/docs/en/client/mac/images/acc2.png)|![](/docs/en/client/mac/images/add.png?v2)|

Veuillez suivre les mêmes étapes que ci-dessus pour l'autorisation **enregistrement d'écran**.

![](/docs/en/client/mac/images/screen.png?v2)
