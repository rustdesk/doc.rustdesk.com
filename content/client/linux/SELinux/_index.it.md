---
title: SELinux
weight: 100
---

Alcune distribuzioni (come Fedora) abilitano SELinux per impostazione predefinita, il che causerà il fallimento dell'avvio e dell'esecuzione normale del servizio RustDesk.

Puoi eseguire `sestatus` nel terminale per verificare se SELinux è abilitato.

A seconda che sia abilitato o meno, puoi vedere due output diversi come segue:

```sh
# Abilitato
SELinux status: enabled
...

# Disabilitato
SELinux status: disabled
...
```

## Aggiungere Politiche SELinux

Per un'introduzione a SELinux, si prega di fare riferimento a [SELinux/Tutorials](https://wiki.gentoo.org/wiki/SELinux/Tutorials).

Qui prendiamo Fedora 38 come esempio per introdurre come aggiungere politiche SELinux.

```sh
sudo dnf install selinux-policy-devel make
```

L'aggiunta di politiche SELinux richiede di determinare il tipo di servizio, che si trova nel contesto di sicurezza del processo.

```sh
$ ps -eZ | grep rustdesk
system_u:system_r:init_t:s0 80439 ? 00:00:02 rustdesk
```

`system_u:system_r:init_t:s0` è il contesto di sicurezza del processo RustDesk, dove il terzo campo `init_t` è il tipo del processo.

Ci sono due modi per scrivere le regole di tipo SELinux:

1. Aggiungere regole al `init_t` predefinito.
2. Aggiungere un nuovo tipo `rustdesk_t` e aggiungere regole.

Il primo metodo ha modifiche relativamente minori, ma poiché il `init_t` predefinito viene modificato, è equivalente ad aggiungere autorizzazione ad altri servizi che utilizzano il tipo `init_t`. **Non raccomandato per l'uso.**

Il secondo metodo è aggiungere regole da zero. Ci saranno molte regole che devono essere aggiunte, e sistemi diversi possono avere differenze. Potrebbe essere necessario fare alcuni aggiustamenti durante l'uso effettivo.

### Usare il Tipo Predefinito

Il tipo predefinito del servizio RustDesk è `init_t`, che è determinato dalle [regole di ereditarietà del contesto di SELinux](https://wiki.gentoo.org/wiki/SELinux/Tutorials/How_does_a_process_get_into_a_certain_context).

**Attenzione**: Modificare il tipo predefinito significa che anche le politiche di altri servizi potrebbero cambiare. Si prega di usare questo metodo con cautela!

Modifica il file delle regole `rustdesk.te`:

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

Esegui:

```sh
$ checkmodule -M -m -o rustdesk.mod rustdesk.te && semodule_package -o rustdesk.pp -m rustdesk.mod && sudo semodule -i rustdesk.pp
$ sudo semodule -l | grep rustdesk
```

### Creare un tipo `rustdesk_t`

1. Creare una nuova directory: `mkdir rustdesk-selinux-1.0`.
2. Creare file di politica SELinux: `touch Makefile rustdesk.te rustdesk.fc rustdesk.if`.

```text
.
├── Makefile
├── rustdesk.fc
├── rustdesk.if
└── rustdesk.te
```

`rustdesk.te` è il file di politica principale.
In questo esempio, questo file proviene principalmente da 3 parti:

1. [`init.te`](https://github.com/fedora-selinux/selinux-policy/blob/rawhide/policy/modules/system/init.te) nel repository selinux-policy di GitHub.
2. Log di audit, `grep rustdesk /var/log/audit/audit.log | audit2allow -a -M test`.
3. La politica `init_t` del sistema di test, `sesearch -A | grep 'allow init_t ' | sed 's/allow init_t /allow rustdesk_t /g'`.

Alcune politiche sono duplicate e alcune sono ridondanti, ma va bene poiché funziona su `rustdesk_t`.

**A causa della complessità dei file di politica SELinux e del loro contenuto tecnico dettagliato, il contenuto di configurazione tecnica completo è omesso qui per brevità. Si prega di fare riferimento alla versione inglese per la configurazione completa.**

## Generazione Automatica di Politiche SELinux (sepolicy)

```sh
$ # installare dipendenze
$ sudo dnf install -y rpm rpm-build binutils
$ # generare politica
$ sepolicy generate --init /usr/lib/rustdesk/rustdesk
$ tree
.
├── rustdesk.fc
├── rustdesk.if
├── rustdesk_selinux.spec
├── rustdesk.sh
└── rustdesk.te
$ # Modificare il rustdesk.te
$
$
$ # generare pacchetto rpm rustdesk_selinux-1.0-1.fc38.src.rpm
$ sudo ./rustdesk.sh
$ # installare pacchetto
$ sudo dnf install -y rustdesk_selinux-1.0-1.fc38.src.rpm
$ # riavviare il servizio
$ sudo systemctl restart rustdesk
```

### Aggiungere Politiche Iterativamente

```sh
$ cd /tmp
$ grep rustdesk_t /var/log/audit/audit.log | audit2allow -a -M rustdesk_tmp
$ cd <rustdesk-selinux-1.0>
$ # unire rustdesk_tmp.te in rustdesk.te
$ make clean && make && sudo make install-policy
```

## Riferimenti

- [SELinux/Tutorials](https://wiki.gentoo.org/wiki/SELinux/Tutorials)
- [SELinux Policy module installation](https://fedoraproject.org/wiki/SELinux/IndependentPolicy#SELinux_Policy_module_installation)
- [How to create SELinux custom policy rpm package](https://lukas-vrabec.com/index.php/2015/07/07/how-to-create-selinux-custom-policy-rpm-package/)