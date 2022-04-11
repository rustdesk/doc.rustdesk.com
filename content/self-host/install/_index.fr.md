---
title: Linux
weight: 10
---


### Installer NodeJs
Veuillez [Télécharger](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi) et installer.
NodeJs est l'environnement d'exécution de pm2, vous devez donc d'abord installer NodeJs。

### Installer pm2
Entrez ci-dessous dans cmd.exe, appuyez sur la touche Entrée pour chaque ligne et exécutez-les ligne par ligne.
```
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### Exécutez hbbr et hbbs
Téléchargez la version Windows du [programme serveur](https://github.com/rustdesk/rustdesk-server/releases), en supposant que vous la décompressez sur le lecteur C. Exécutez respectivement les quatre lignes de commandes suivantes.
```
cd c:\rustdesk-server-windows-x64
pm2 start hbbr.exe -- -m <Adresse e-mail enregistrée>
pm2 start hbbs.exe -- -r <L'adresse de l'hôte sur lequel hbbr est exécuté> -m <Adresse e-mail enregistrée>
pm2 save
```

### Afficher le journal
```
pm2 log hbbr
pm2 log hbbs
```

### Modifier l'e-mail
Par exemple, la nouvelle adresse e-mail enregistrée est test@test.com, et l'adresse publique de hbbr est test.hbbr.com
```
pm2 delete hbbr hbbs
cd c:\rustdesk-server-windows-x64
pm2 start hbbr.exe -- -m test@test.com
pm2 start hbbs.exe -- -r test.hbbr.com -m test@test.com
pm2 save
```