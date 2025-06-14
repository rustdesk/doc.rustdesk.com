---
title: Synology DSM 7.2
weight: 20
---
<!-- For translators: When translating elements like "buttons", don't just translate, please refer actual naming in their interface. -->
Après la mise à jour DSM 7.2, Synology a renommé son paquet "Docker" en "Container Manager". Il apporte une nouvelle interface graphique, et vient avec "docker-compose" dans son interface graphique, ce qui vous permet de créer Docker plus facilement.

### Modèles supportés et exigences

Container Manager apporte le support ARM64 pour certains modèles d'entrée de gamme, comme la série J, pour la liste détaillée des modèles supportés, veuillez vérifier le [site web Synology](https://www.synology.com/en-us/dsm/packages/ContainerManager).
La plupart du temps, vous n'aurez pas besoin d'installer de RAM supplémentaire pour installer Docker et RustDesk Server.

### 1. Installer Container Manager (Docker)

Ouvrez "Centre de Paquets", recherchez et installez "Container Manager".

![](images/dsm7_install_container_manager_though_package_center.png)

### 2. Créer un dossier

Après avoir installé "Container Manager", il créera un Dossier Partagé appelé `docker`, mettons les données de notre serveur ici.

Ouvrez votre File Station, créez un dossier nommé `rustdesk-server` (ou comme vous le souhaitez). Puis créez un dossier nommé `data` dedans comme sur l'image.

![](images/dsm7_create_required_folders.png)

### 3. Créer un conteneur

Ouvrez votre Container Manager, allez dans Projet et cliquez sur Créer.

Entrez le nom de projet `rustdesk-server` et changez Source de "Télécharger compose.yml" à "Créer compose.yml", et copiez le contenu suivant dans la boîte.

![](images/dsm7_creating_project_init.png?v2)

```yaml
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest # Veuillez changer ceci en rustdesk/rustdesk-server-pro:latest si vous voulez installer Pro.
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: host
    depends_on:
      - hbbr
    restart: always

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest # Veuillez changer ceci en rustdesk/rustdesk-server-pro:latest si vous voulez installer Pro.
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: host
    restart: always

# Parce qu'on utilise le mode host docker
# Au cas où vous oublieriez les ports :
# 21114 TCP pour console web, disponible seulement dans la version Pro
# 21115 TCP pour test de type NAT
# 21116 TCP TCP hole punching
# 21116 UDP heartbeat/serveur ID
# 21117 TCP relay
```

Veuillez ignorer `Paramètres du portail web` puis terminer.

### 4. Vérifier que ça fonctionne

Ouvrez votre File Station, vous devriez voir `id_ed25519`, `id_ed25519.pub` dans votre dossier `docker/rustdesk-server/data`. Vous pourriez le télécharger et l'ouvrir via n'importe quel éditeur de texte ou utiliser [Synology Text Editor](https://www.synology.com/en-us/dsm/packages/TextEditor). C'est la clé publique dont vous avez besoin pour votre client RustDesk.

La clé publique ressemblera à ceci :

![](images/dsm7_viewing_public_key_though_syno_text_editor.png)

Vérifiez [ici](/docs/en/client) pour configurer votre client. Seuls `serveur ID` et `Clé` sont nécessaires. `Serveur relay` n'est pas nécessaire car nous l'avons configuré dans `hbbs`, `hbbs` fournira cette information automatiquement.

### 5. Configurer la redirection de port sur votre routeur

Allez sur la page web d'administration de votre routeur, trouvez tout ce qui concerne la `Redirection de port`, cela devrait apparaître dans les paramètres `WAN` ou `Pare-feu`.

Si vous ne trouvez toujours pas le paramètre, recherchez sur Google `{Marque du routeur} + redirection de port` ou `{Modèle du routeur} + redirection de port`. Si cet appareil vient de votre FAI, demandez-leur.

Ouvrez ces ports requis :
  * `21114` TCP pour console web, disponible seulement dans la version Pro
  * `21115` TCP pour test de type NAT
  * `21116` TCP TCP hole punching
  * `21116` UDP heartbeat/serveur ID
  * `21117` TCP relay