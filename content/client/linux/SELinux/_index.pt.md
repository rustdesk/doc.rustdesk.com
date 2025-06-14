---
title: SELinux
weight: 100
---

Algumas distribuições (como Fedora) habilitam SELinux por padrão, o que fará com que o serviço RustDesk falhe ao iniciar e executar normalmente.

Você pode executar `sestatus` no terminal para verificar se o SELinux está habilitado.

Dependendo se está habilitado ou não, você pode ver duas saídas diferentes como a seguir:

```sh
# Habilitado
SELinux status: enabled
...

# Desabilitado
SELinux status: disabled
...
```

### Adicionar Políticas SELinux

Para uma introdução ao SELinux, consulte [SELinux/Tutorials](https://wiki.gentoo.org/wiki/SELinux/Tutorials).

Aqui usamos o Fedora 38 como exemplo para introduzir como adicionar políticas SELinux.

```sh
sudo dnf install selinux-policy-devel make
```

Adicionar políticas SELinux requer determinar o tipo de serviço, que está no contexto de segurança do processo.

```sh
$ ps -eZ | grep rustdesk
system_u:system_r:init_t:s0 80439 ? 00:00:02 rustdesk
```

`system_u:system_r:init_t:s0` é o contexto de segurança do processo RustDesk, onde o terceiro campo `init_t` é o tipo do processo.

Existem duas maneiras de escrever regras de tipo SELinux:

1. Adicionar regras ao `init_t` padrão.
2. Adicionar um novo tipo `rustdesk_t` e adicionar regras.

O primeiro método tem modificações relativamente menores, mas porque o `init_t` padrão é alterado, é equivalente a adicionar autorização a outros serviços usando o tipo `init_t`. **Não recomendado para uso.**

O segundo método é adicionar regras do zero. Haverá muitas regras que precisam ser adicionadas, e diferentes sistemas podem ter diferenças. Pode ser necessário fazer alguns ajustes durante o uso real.

#### Usar o Tipo Padrão

O tipo padrão do serviço RustDesk é `init_t`, que é determinado pelas [regras de herança de contexto do SELinux](https://wiki.gentoo.org/wiki/SELinux/Tutorials/How_does_a_process_get_into_a_certain_context).

**Cuidado**: Modificar o tipo padrão significa que as políticas de outros serviços também podem mudar. Use este método com cuidado!

Edite o arquivo de regras `rustdesk.te`:

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

Execute:

```sh
$ checkmodule -M -m -o rustdesk.mod rustdesk.te && semodule_package -o rustdesk.pp -m rustdesk.mod && sudo semodule -i rustdesk.pp
$ sudo semodule -l | grep rustdesk
```

#### Criar um tipo `rustdesk_t`

1. Criar um novo diretório: `mkdir rustdesk-selinux-1.0`.
2. Criar arquivos de política SELinux: `touch Makefile rustdesk.te rustdesk.fc rustdesk.if`.

```text
.
├── Makefile
├── rustdesk.fc
├── rustdesk.if
└── rustdesk.te
```

`rustdesk.te` é o arquivo de política principal.
Neste exemplo, este arquivo vem principalmente de 3 partes:

1. [`init.te`](https://github.com/fedora-selinux/selinux-policy/blob/rawhide/policy/modules/system/init.te) no repositório selinux-policy do GitHub.
2. Log de auditoria, `grep rustdesk /var/log/audit/audit.log | audit2allow -a -M test`.
3. A política `init_t` do sistema de teste, `sesearch -A | grep 'allow init_t ' | sed 's/allow init_t /allow rustdesk_t /g'`.

Algumas políticas são duplicadas e algumas são redundantes, mas isso é ok, pois funciona no `rustdesk_t`.

**Devido à complexidade dos arquivos de política SELinux e seu conteúdo técnico detalhado, o conteúdo de configuração técnica completa é omitido aqui para brevidade. Consulte a versão em inglês para a configuração completa.**

### Geração Automática de Política SELinux (sepolicy)

```sh
$ # instalar dependências
$ sudo dnf install -y rpm rpm-build binutils
$ # gerar política
$ sepolicy generate --init /usr/lib/rustdesk/rustdesk
$ tree
.
├── rustdesk.fc
├── rustdesk.if
├── rustdesk_selinux.spec
├── rustdesk.sh
└── rustdesk.te
$ # Editar o rustdesk.te
$
$
$ # gerar pacote rpm rustdesk_selinux-1.0-1.fc38.src.rpm
$ sudo ./rustdesk.sh
$ # instalar pacote
$ sudo dnf install -y rustdesk_selinux-1.0-1.fc38.src.rpm
$ # reiniciar o serviço
$ sudo systemctl restart rustdesk
```

#### Adicionar Políticas Iterativamente

```sh
$ cd /tmp
$ grep rustdesk_t /var/log/audit/audit.log | audit2allow -a -M rustdesk_tmp
$ cd <rustdesk-selinux-1.0>
$ # mesclar rustdesk_tmp.te no rustdesk.te
$ make clean && make && sudo make install-policy
```

### Referências

- [SELinux/Tutorials](https://wiki.gentoo.org/wiki/SELinux/Tutorials)
- [SELinux Policy module installation](https://fedoraproject.org/wiki/SELinux/IndependentPolicy#SELinux_Policy_module_installation)
- [How to create SELinux custom policy rpm package](https://lukas-vrabec.com/index.php/2015/07/07/how-to-create-selinux-custom-policy-rpm-package/)