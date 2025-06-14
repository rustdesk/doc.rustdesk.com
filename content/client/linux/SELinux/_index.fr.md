---
title: SELinux
weight: 100
---

Certaines distributions (comme Fedora) activent SELinux par défaut, ce qui empêchera le service RustDesk de démarrer et de fonctionner normalement.

Vous pouvez exécuter `sestatus` dans le terminal pour vérifier si SELinux est activé.

Selon qu'il soit activé ou non, vous pouvez voir deux sorties différentes comme suit :

```sh
# Activé
SELinux status: enabled
...

# Désactivé
SELinux status: disabled
...
```

### Ajouter des politiques SELinux

Pour une introduction à SELinux, veuillez vous référer à [SELinux/Tutorials](https://wiki.gentoo.org/wiki/SELinux/Tutorials).

Ici, nous prenons Fedora 38 comme exemple pour présenter comment ajouter des politiques SELinux.

```sh
sudo dnf install selinux-policy-devel make
```

L'ajout de politiques SELinux nécessite de déterminer le type de service, qui se trouve dans le contexte de sécurité du processus.

```sh
$ ps -eZ | grep rustdesk
system_u:system_r:init_t:s0 80439 ? 00:00:02 rustdesk
```

`system_u:system_r:init_t:s0` est le contexte de sécurité du processus RustDesk, où le troisième champ `init_t` est le type du processus.

Il existe deux façons d'écrire les règles de type SELinux :

1. Ajouter des règles au `init_t` par défaut.
2. Ajouter un nouveau type `rustdesk_t` et ajouter des règles.

La première méthode a des modifications relativement mineures, mais parce que le `init_t` par défaut est modifié, cela équivaut à ajouter une autorisation à d'autres services utilisant le type `init_t`. **Non recommandé pour l'utilisation.**

La deuxième méthode consiste à ajouter des règles à partir de zéro. Il y aura de nombreuses règles qui doivent être ajoutées, et différents systèmes peuvent avoir des différences. Il peut être nécessaire de faire quelques ajustements lors de l'utilisation réelle.

#### Utiliser le type par défaut

Le type par défaut du service RustDesk est `init_t`, qui est déterminé par [les règles d'héritage de contexte de SELinux](https://wiki.gentoo.org/wiki/SELinux/Tutorials/How_does_a_process_get_into_a_certain_context).

**Attention** : Modifier le type par défaut signifie que les politiques d'autres services peuvent également changer. Veuillez utiliser cette méthode avec prudence !

Modifiez le fichier de règles `rustdesk.te` :

```text
module rustdesk 1.0;

require {
        type event_device_t;
        type xserver_t;
        type xserver_port_t;
        type sudo_exec_t;
        type init_t;
        type ephemeral_port_t;
        type user_tmp_t;
        type user_fonts_cache_t;
        type pulseaudio_home_t;
        type session_dbusd_tmp_t;
        type unconfined_dbusd_t;
        class process execmem;
        class file { open read create write execute execute_no_trans map setattr lock link unlink };
        class unix_stream_socket connectto;
        class tcp_socket name_connect;
        class dir { add_name remove_name };
        class sock_file write;
        class chr_file { open read write } ;
}

#============= init_t ==============
allow init_t xserver_t:unix_stream_socket connectto;
allow init_t sudo_exec_t:file { open read execute execute_no_trans };
allow init_t user_tmp_t:file { open write setattr };
allow init_t self:process execmem;
allow init_t user_fonts_cache_t:dir { add_name remove_name };
allow init_t user_fonts_cache_t:file { read write create open link lock unlink };
allow init_t xserver_port_t:tcp_socket name_connect;
allow init_t pulseaudio_home_t:file { read write open lock };
allow init_t session_dbusd_tmp_t:sock_file write;
allow init_t unconfined_dbusd_t:unix_stream_socket connectto;

#!!!! This AVC can be allowed using the boolean 'nis_enabled'
allow init_t ephemeral_port_t:tcp_socket name_connect;

#!!!! This AVC can be allowed using the boolean 'domain_can_mmap_files'
allow init_t sudo_exec_t:file map;

#============= init_t Wayland ==============
allow init_t event_device_t:chr_file { open read write };

#!!!! This AVC can be allowed using the boolean 'domain_can_mmap_files'
allow init_t user_tmp_t:file map;

```

Exécutez :

```sh
$ checkmodule -M -m -o rustdesk.mod rustdesk.te && semodule_package -o rustdesk.pp -m rustdesk.mod && sudo semodule -i rustdesk.pp
$ sudo semodule -l | grep rustdesk
```

#### Créer un type `rustdesk_t`

1. Créer un nouveau répertoire : `mkdir rustdesk-selinux-1.0`.
2. Créer des fichiers de politique SELinux : `touch Makefile rustdesk.te rustdesk.fc rustdesk.if`.

```text
.
├── Makefile
├── rustdesk.fc
├── rustdesk.if
└── rustdesk.te
```

`rustdesk.te` est le fichier de politique principal.
Dans cet exemple, ce fichier provient principalement de 3 parties :

1. [`init.te`](https://github.com/fedora-selinux/selinux-policy/blob/rawhide/policy/modules/system/init.te) dans le dépôt selinux-policy de GitHub.
2. Journal d'audit, `grep rustdesk /var/log/audit/audit.log | audit2allow -a -M test`.
3. La politique `init_t` du système de test, `sesearch -A | grep 'allow init_t ' | sed 's/allow init_t /allow rustdesk_t /g'`.

Certaines politiques sont dupliquées et certaines sont redondantes, mais c'est correct puisque cela fonctionne sur `rustdesk_t`.

**En raison de la complexité des fichiers de politique SELinux et de leur contenu technique détaillé, le contenu de configuration technique complet est omis ici pour des raisons de concision. Veuillez vous référer à la version anglaise pour la configuration complète.**

### Génération automatique de politique SELinux (sepolicy)

```sh
$ # installer les dépendances
$ sudo dnf install -y rpm rpm-build binutils
$ # générer la politique
$ sepolicy generate --init /usr/lib/rustdesk/rustdesk
$ tree
.
├── rustdesk.fc
├── rustdesk.if
├── rustdesk_selinux.spec
├── rustdesk.sh
└── rustdesk.te
$ # Modifier le rustdesk.te
$
$
$ # générer le package rpm rustdesk_selinux-1.0-1.fc38.src.rpm
$ sudo ./rustdesk.sh
$ # installer le package
$ sudo dnf install -y rustdesk_selinux-1.0-1.fc38.src.rpm
$ # redémarrer le service
$ sudo systemctl restart rustdesk
```

#### Ajouter des politiques de manière itérative

```sh
$ cd /tmp
$ grep rustdesk_t /var/log/audit/audit.log | audit2allow -a -M rustdesk_tmp
$ cd <rustdesk-selinux-1.0>
$ # fusionner rustdesk_tmp.te dans rustdesk.te
$ make clean && make && sudo make install-policy
```

### Références

- [SELinux/Tutorials](https://wiki.gentoo.org/wiki/SELinux/Tutorials)
- [SELinux Policy module installation](https://fedoraproject.org/wiki/SELinux/IndependentPolicy#SELinux_Policy_module_installation)
- [How to create SELinux custom policy rpm package](https://lukas-vrabec.com/index.php/2015/07/07/how-to-create-selinux-custom-policy-rpm-package/)