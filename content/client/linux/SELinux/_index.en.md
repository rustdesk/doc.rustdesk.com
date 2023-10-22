---
title: SELinux
weight: 100
---

Some distros (such as Fedora) enable SELinux by default, which will cause the RustDesk service to fail to start and run normally.

You can run `sestatus` in the terminal to check whether SELinux is enabled.

Depending on whether it is enabled or not, you can see two different outputs as follows:

```bash
# Enabled
SELinux status: enabled
...

# Disabled
SELinux status: disabled
...
```

## Add SELinux Policies

For an introduction to SELinux, please refer to [SELinux/Tutorials](https://wiki.gentoo.org/wiki/SELinux/Tutorials).

Here we take Fedora 38 as an example to introduce how to add SELinux policies.

```bash
sudo dnf install selinux-policy-devel make
```

Adding SELinux policies requires determining the type of service, which is in the security context of the process.

```bash
$ ps -eZ | grep rustdesk
system_u:system_r:init_t:s0 80439 ? 00:00:02 rustdesk
```

`system_u:system_r:init_t:s0` is the security context of the rustdesk process, where the third field `init_t` is the type of the process.

There are two ways to write SELinux type rules:

1. Add rules to the default `init_t`.
2. Add a new type `rustdesk_t` and add rules.

The first method has relatively minor modifications, but because the default `init_t` is changed, it is equivalent to adding authorization to other services using the `init_t` type. **Not recommended for use**.

The second method is to add rules from scratch. There will be many rules that need to be added, and different systems may have differences. It may be necessary to make some adjustments during actual use.

### Use The Default Type

The default type of the RustDesk service is `init_t``, which is determined by [the context inheritance rules of SELinux](https://wiki.gentoo.org/wiki/SELinux/Tutorials/How_does_a_process_get_into_a_certain_context).

**CAUTION**: Modifying the default type means that the policies of other services may also change. Please use this method with caution!

Edit the rule file rustdesk.te:

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

#!!!! This avc can be allowed using the boolean 'nis_enabled'
allow init_t ephemeral_port_t:tcp_socket name_connect;

#!!!! This avc can be allowed using the boolean 'domain_can_mmap_files'
allow init_t sudo_exec_t:file map;


#============= init_t wayland ==============
allow init_t event_device_t:chr_file { open read write };

#!!!! This avc can be allowed using the boolean 'domain_can_mmap_files'
allow init_t user_tmp_t:file map;

```

Run:

```bash
$ checkmodule -M -m -o rustdesk.mod rustdesk.te && semodule_package -o rustdesk.pp -m rustdesk.mod && sudo semodule -i rustdesk.pp
$ sudo semodule -l | grep rustdesk
```

### Create A Type "rustdesk_t"

1 Create a new directory. `mkdir rustdesk-selinux-1.0` 。
2. Create SELinux policy files. `touch Makefile rustdesk.te rustdesk.fc rustdesk.if` 。

```text
.
├── Makefile
├── rustdesk.fc
├── rustdesk.if
└── rustdesk.te
```

The contents of each file are as follows.

rustdes.te:

```text

policy_module(rustdesk, 1.0)

type rustdesk_t;
type rustdesk_exec_t;

gen_require(`
        # used for direct running of init scripts
        # by admin domains
        attribute direct_run_init;
        attribute direct_init;
        attribute direct_init_entry;

        attribute init_script_domain_type;
        attribute initrc_transition_domain;
        # Attribute used for systemd so domains can allow systemd to create sock_files
        attribute init_sock_file_type;
        # Attribute for directories that systemd will watch based on path units
        # (see systemd.path(5) for more info) (Deprecated)
        attribute init_watch_path_type;

        # Mark process types as daemons
        attribute daemon;
        attribute systemprocess;
        attribute systemprocess_entry;

        # Mark file type as a daemon run directory
        attribute daemonrundir;

        class passwd rootok;
        class dbus { acquire_svc send_msg };
        class process execmem;

        type abrt_dump_oops_t;
        type abrt_upload_watch_t;
        type adjtime_t;
        type aiccu_t;
        type amanda_inetd_exec_t;
        type amanda_t;
        type antivirus_t;
        type apcupsd_power_t;
        type auditd_etc_t;
        type autofs_device_t;
        type binfmt_misc_fs_t;
        type bitlbee_exec_t;
        type bitlbee_t;
        type boltd_var_lib_t;
        type boltd_var_run_t;
        type boothd_t;
        type bootloader_exec_t;
        type bootloader_t;
        type bpf_t;
        type bugzilla_script_t;
        type certwatch_t;
        type cgroup_t;
        type chkpwd_exec_t;
        type chkpwd_t;
        type chronyc_t;
        type chronyd_exec_t;
        type chronyd_keys_t;
        type chronyd_restricted_t;
        type chroot_exec_t;
        type cifs_helper_t;
        type cinder_domain;
        type cloudform_domain;
        type collectd_script_t;
        type comsat_exec_t;
        type comsat_t;
        type config_home_t;
        type console_device_t;
        type consolekit_log_t;
        type container_kvm_t;
        type container_runtime_domain;
        type container_runtime_tmpfs_t;
        type container_var_lib_t;
        type crack_t;
        type cups_brf_t;
        type cupsd_exec_t;
        type cupsd_lpd_exec_t;
        type cupsd_lpd_t;
        type cupsd_t;
        type cvs_exec_t;
        type cvs_t;
        type data_home_t;
        type dbskkd_exec_t;
        type dbskkd_t;
        type default_context_t;
        type default_t;
        type devicekit_disk_t;
        type devicekit_power_t;
        type devicekit_t;
        type device_t;
        type devlog_t;
        type devpts_t;
        type dhcpc_state_t;
        type dhcp_state_t;
        type dirsrvadmin_script_t;
        type dri_device_t;
        type dspam_script_t;
        type efivarfs_t;
        type ephemeral_port_t;
        type etc_aliases_t;
        type etc_runtime_t;
        type etc_t;
        type event_device_t;
        type faillog_t;
        type fetchmail_t;
        type fingerd_exec_t;
        type fingerd_t;
        type fixed_disk_device_t;
        type flatpak_helper_t;
        type fprintd_exec_t;
        type fprintd_t;
        type fprintd_var_lib_t;
        type fsadm_t;
        type ftpd_exec_t;
        type ftpd_t;
        type fwupd_cache_t;
        type fwupd_t;
        type gconfdefaultsm_t;
        type geoclue_t;
        type getty_exec_t;
        type getty_t;
        type gitd_exec_t;
        type git_system_t;
        type gnome_home_type;
        type gnomesystemmm_t;
        type guest_t;
        type home_bin_t;
        type home_root_t;
        type hostname_etc_t;
        type httpd_log_t;
        type httpd_t;
        type httpd_tmp_t;
        type hugetlbfs_t;
        type ibacm_t;
        type ibacm_var_run_t;
        type inetd_child_exec_t;
        type inetd_child_t;
        type initctl_t;
        type init_exec_t;
        type initrc_state_t;
        type initrc_t;
        type initrc_var_run_t;
        type init_t;
        type init_tmp_t;
        type init_var_lib_t;
        type init_var_run_t;
        type insights_client_t;
        type install_exec_t;
        type install_t;
        type ipsec_conf_file_t;
        type ipsec_t;
        type ipsec_var_run_t;
        type irqbalance_t;
        type iscsi_var_lib_t;
        type jockey_t;
        type journalctl_exec_t;
        type kadmind_t;
        type kdump_crash_t;
        type kdumpctl_t;
        type kdump_t;
        type keepalived_unconfined_script_t;
        type kernel_t;
        type kmod_exec_t;
        type kmod_t;
        type kmscon_t;
        type kmsg_device_t;
        type krb5_keytab_t;
        type ktalkd_exec_t;
        type ktalkd_t;
        type l2tpd_t;
        type lastlog_t;
        type ld_so_cache_t;
        type lldpad_t;
        type loadkeys_t;
        type locale_t;
        type lvm_control_t;
        type lvm_etc_t;
        type lvm_t;
        type lvm_var_run_t;
        type machineid_t;
        type mail_spool_t;
        type mandb_t;
        type mdadm_t;
        type mdadm_var_run_t;
        type memcached_t;
        type memory_device_t;
        type mnt_t;
        type modemmanager_t;
        type modules_dep_t;
        type modules_object_t;
        type mon_procd_t;
        type mount_t;
        type mount_var_run_t;
        type mptcpd_t;
        type munin_plugin_domain;
        type munin_t;
        type mysqld_t;
        type mythtv_script_t;
        type naemon_t;
        type nagios_plugin_domain;
        type nagios_system_plugin_t;
        type named_conf_t;
        type named_zone_t;
        type net_conf_t;
        type netlabel_mgmt_t;
        type networkmanager_dispatcher_plugin;
        type NetworkManager_dispatcher_t;
        type NetworkManager_priv_helper_t;
        type NetworkManager_t;
        type nfsd_fs_t;
        type nfsidmap_t;
        type ninfod_t;
        type nrpe_exec_t;
        type nrpe_t;
        type nsfs_t;
        type openshift_cgroup_read_t;
        type openshift_net_read_t;
        type oracleasm_t;
        type passwd_file_t;
        type pcscd_t;
        type pdns_t;
        type pegasus_openlmi_domain;
        type pkcs_slotd_t;
        type pkcs_slotd_tmpfs_t;
        type plymouthd_t;
        type plymouth_exec_t;
        type policykit_t;
        type postfix_exec_t;
        type print_spool_t;
        type proc_net_t;
        type proc_security_t;
        type ptchown_t;
        type pulseaudio_home_t;
        type qmail_tcp_env_exec_t;
        type qmail_tcp_env_t;
        type qpidd_t;
        type quota_exec_t;
        type quota_t;
        type radiusd_t;
        type random_device_t;
        type random_seed_t;
        type rdisc_t;
        type rhsmcertd_t;
        type rlogind_exec_t;
        type rlogind_t;
        type root_t;
        type rpm_script_t;
        type rpm_var_cache_t;
        type rpm_var_lib_t;
        type rshd_exec_t;
        type rshd_t;
        type rsync_exec_t;
        type rsync_t;
        type rustdesk_exec_t;
        type rustdesk_t;
        type sblim_domain;
        type security_t;
        type selinux_config_t;
        type selinux_login_config_t;
        type semanage_store_t;
        type session_dbusd_tmp_t;
        type shell_exec_t;
        type smbcontrol_t;
        type smokeping_cgi_script_t;
        type spc_t;
        type speech_dispatcher_t;
        type sshd_exec_t;
        type sshd_t;
        type ssh_keysign_t;
        type sslh_t;
        type sssd_var_lib_t;
        type staff_t;
        type stratisd_data_t;
        type stunnel_exec_t;
        type stunnel_t;
        type sudo_exec_t;
        type sulogin_exec_t;
        type sulogin_t;
        type svc_start_exec_t;
        type svc_start_t;
        type svirt_file_type;
        type svirt_sandbox_domain;
        type svirt_t;
        type svirt_tcg_t;
        type swat_exec_t;
        type swat_t;
        type sysctl_kernel_t;
        type sysfs_t;
        type syslogd_t;
        type systemd_bootchart_t;
        type system_dbusd_t;
        type system_dbusd_var_run_t;
        type systemd_coredump_t;
        type systemd_gpt_generator_t;
        type systemd_home_t;
        type systemd_hostnamed_t;
        type systemd_hwdb_t;
        type systemd_importd_t;
        type systemd_initctl_t;
        type systemd_journal_upload_t;
        type systemd_localed_t;
        type systemd_logger_t;
        type systemd_logind_inhibit_var_run_t;
        type systemd_logind_sessions_t;
        type systemd_logind_t;
        type systemd_logind_var_run_t;
        type systemd_machined_t;
        type systemd_modules_load_t;
        type systemd_mount_directory;
        type systemd_networkd_exec_t;
        type systemd_networkd_t;
        type systemd_network_generator_t;
        type systemd_notify_t;
        type systemd_passwd_agent_exec_t;
        type systemd_passwd_agent_t;
        type systemd_passwd_var_run_t;
        type systemd_pstore_t;
        type systemd_resolved_exec_t;
        type systemd_resolved_t;
        type systemd_rfkill_t;
        type systemd_rfkill_var_lib_t;
        type systemd_sleep_t;
        type systemd_socket_proxyd_t;
        type systemd_sysctl_t;
        type systemd_systemctl_exec_t;
        type systemd_timedated_t;
        type systemd_timedated_var_lib_t;
        type systemd_tmpfiles_t;
        type systemd_userdbd_runtime_t;
        type systemd_userdbd_t;
        type tangd_db_t;
        type tangd_t;
        type targetclid_t;
        type tcpd_exec_t;
        type tcpd_t;
        type telnetd_exec_t;
        type telnetd_t;
        type tftpd_exec_t;
        type tftpd_t;
        type thin_domain;
        type thumb_t;
        type timedatex_t;
        type tlp_t;
        type tmpfs_t;
        type tmpreaper_t;
        type tmp_t;
        type tpm_device_t;
        type tty_device_t;
        type udev_rules_t;
        type udev_t;
        type unconfined_dbusd_t;
        type unconfined_service_t;
        type unconfined_t;
        type unlabeled_t;
        type unreserved_port_t;
        type updpwd_exec_t;
        type updpwd_t;
        type urandom_device_t;
        type usbtty_device_t;
        type user_devpts_t;
        type user_fonts_cache_t;
        type user_home_dir_t;
        type user_home_t;
        type user_t;
        type user_tmp_t;
        type user_tty_device_t;
        type usr_t;
        type uucpd_exec_t;
        type uucpd_t;
        type uuidd_t;
        type uuidd_var_run_t;
        type var_lib_nfs_t;
        type var_lib_t;
        type var_log_t;
        type var_run_t;
        type var_spool_t;
        type var_t;
        type virsh_t;
        type virtd_t;
        type virt_etc_rw_t;
        type virtio_device_t;
        type vnstatd_t;
        type watchdog_device_t;
        type watchdog_t;
        type wireguard_t;
        type wireless_device_t;
        type wtmp_t;
        type xdm_exec_t;
        type xdm_t;
        type xdm_var_lib_t;
        type xenconsoled_t;
        type xend_t;
        type xguest_t;
        type xserver_port_t;
        type xserver_t;
')

###############################################################################
#
# Part 1. The following rules are mainly from the opensource `init.te`
#               https://github.com/fedora-selinux/selinux-policy/blob/rawhide/policy/modules/system/init.te
#
#         Note: Part 1 will probably be mostly the same as Part 3. But it's acceptable for now.
#

init_daemon_domain(rustdesk_t, rustdesk_exec_t)

domain_role_change_exemption(rustdesk_t)
domain_subj_id_change_exemption(rustdesk_t)
domain_obj_id_change_exemption(rustdesk_t)
role system_r types rustdesk_t;
corecmd_shell_entry_type(rustdesk_t)
typeattribute rustdesk_t init_script_domain_type;


########################################

# Use capabilities. old rule:
allow rustdesk_t self:capability ~{ audit_control audit_write sys_module };
allow rustdesk_t self:capability2 ~{ mac_admin mac_override };
allow rustdesk_t self:cap_userns all_cap_userns_perms;
allow rustdesk_t self:tcp_socket { listen accept };
allow rustdesk_t self:packet_socket create_socket_perms;
allow rustdesk_t self:key manage_key_perms;
allow rustdesk_t self:bpf { map_create map_read map_write prog_load prog_run };

allow rustdesk_t self:file mounton;
allow rustdesk_t self:fifo_file rw_fifo_file_perms;

allow rustdesk_t self:service manage_service_perms;
allow rustdesk_t self:user_namespace create;

# Re-exec itself
can_exec(rustdesk_t, rustdesk_exec_t)
# executing content in /run/initramfs
manage_files_pattern(rustdesk_t, initrc_state_t, initrc_state_t)
can_exec(rustdesk_t, initrc_state_t)

allow rustdesk_t initrc_t:unix_stream_socket { connectto create_stream_socket_perms };
allow rustdesk_t initrc_t:tcp_socket create_stream_socket_perms;
allow initrc_t rustdesk_t:unix_stream_socket { connectto rw_stream_socket_perms sendto };
allow initrc_t rustdesk_t:fifo_file rw_fifo_file_perms;

manage_files_pattern(rustdesk_t, init_tmp_t, init_tmp_t)
manage_dirs_pattern(rustdesk_t, init_tmp_t, init_tmp_t)
manage_lnk_files_pattern(rustdesk_t, init_tmp_t, init_tmp_t)
manage_sock_files_pattern(rustdesk_t, init_tmp_t, init_tmp_t)
files_tmp_filetrans(rustdesk_t, init_tmp_t, { file sock_file })
allow rustdesk_t init_tmp_t:file map;

manage_dirs_pattern(rustdesk_t, init_var_lib_t, init_var_lib_t)
manage_files_pattern(rustdesk_t, init_var_lib_t, init_var_lib_t)
manage_lnk_files_pattern(rustdesk_t, init_var_lib_t, init_var_lib_t)
manage_sock_files_pattern(rustdesk_t, init_var_lib_t, init_var_lib_t)
files_var_lib_filetrans(rustdesk_t, init_var_lib_t, { dir file })
allow rustdesk_t init_var_lib_t:dir mounton;
allow rustdesk_t init_var_lib_t:file map;

manage_dirs_pattern(rustdesk_t, init_var_run_t, init_var_run_t)
manage_files_pattern(rustdesk_t, init_var_run_t, init_var_run_t)
manage_lnk_files_pattern(rustdesk_t, init_var_run_t, init_var_run_t)
manage_sock_files_pattern(rustdesk_t, init_var_run_t, init_var_run_t)
manage_fifo_files_pattern(rustdesk_t, init_var_run_t, init_var_run_t)
manage_blk_files_pattern(rustdesk_t, init_var_run_t, init_var_run_t)
manage_chr_files_pattern(rustdesk_t, init_var_run_t, init_var_run_t)
files_pid_filetrans(rustdesk_t, init_var_run_t, { dir file blk_file chr_file fifo_file})
allow rustdesk_t init_var_run_t:dir mounton;
allow rustdesk_t init_var_run_t:file mounton;
allow rustdesk_t init_var_run_t:sock_file relabelto;
allow rustdesk_t init_var_run_t:blk_file { getattr relabelto };
allow rustdesk_t init_var_run_t:chr_file { getattr relabelto };
allow rustdesk_t init_var_run_t:fifo_file { getattr relabelto };

allow rustdesk_t machineid_t:file manage_file_perms;
files_pid_filetrans(rustdesk_t, machineid_t, file, "machine-id")
files_etc_filetrans(rustdesk_t, machineid_t, file, "machine-id")
allow rustdesk_t machineid_t:file mounton;

allow rustdesk_t initctl_t:fifo_file manage_fifo_file_perms;
dev_filetrans(rustdesk_t, initctl_t, fifo_file)

# Modify utmp.
allow rustdesk_t initrc_var_run_t:file { rw_file_perms setattr };

kernel_read_system_state(rustdesk_t)
kernel_share_state(rustdesk_t)
kernel_stream_connect(rustdesk_t)
kernel_rw_stream_socket_perms(rustdesk_t)
kernel_rw_unix_dgram_sockets(rustdesk_t)
kernel_mounton_systemd_ProtectKernelTunables(rustdesk_t)
kernel_read_core_if(rustdesk_t)
kernel_mounton_core_if(rustdesk_t)
kernel_mounton_all_sysctls(rustdesk_t)
kernel_get_sysvipc_info(rustdesk_t)
kernel_load_module(rustdesk_t)
kernel_read_all_proc(rustdesk_t)
kernel_list_all_proc(rustdesk_t)
kernel_mounton_all_proc(rustdesk_t)

# There is bug in kernel in 4.16 where lot of domains requesting module_request, for now dontauditing
kernel_dontaudit_request_load_module(rustdesk_t)

corecmd_exec_chroot(rustdesk_t)
corecmd_exec_bin(rustdesk_t)

corenet_all_recvfrom_netlabel(rustdesk_t)
corenet_tcp_bind_all_ports(rustdesk_t)
corenet_udp_bind_all_ports(rustdesk_t)

dev_create_all_files(rustdesk_t)
dev_create_all_chr_files(rustdesk_t)
dev_list_sysfs(rustdesk_t)
dev_manage_sysfs(rustdesk_t)
dev_mounton_all_device_nodes(rustdesk_t)
dev_setattr_all_blk_files(rustdesk_t)
dev_setattr_all_chr_files(rustdesk_t)
dev_read_urand(rustdesk_t)
dev_read_raw_memory(rustdesk_t)
# Early devtmpfs
dev_rw_generic_chr_files(rustdesk_t)
dev_filetrans_all_named_dev(rustdesk_t)
dev_write_watchdog(rustdesk_t)
dev_rw_inherited_input_dev(rustdesk_t)
dev_rw_dri(rustdesk_t)
dev_rw_tpm(rustdesk_t)

domain_getpgid_all_domains(rustdesk_t)
domain_kill_all_domains(rustdesk_t)
domain_signal_all_domains(rustdesk_t)
domain_signull_all_domains(rustdesk_t)
domain_sigstop_all_domains(rustdesk_t)
domain_sigchld_all_domains(rustdesk_t)
domain_read_all_domains_state(rustdesk_t)
domain_getattr_all_domains(rustdesk_t)
domain_setrlimit_all_domains(rustdesk_t)
domain_rlimitinh_all_domains(rustdesk_t)
domain_noatsecure_all_domains(rustdesk_t)
domain_setpriority_all_domains(rustdesk_t)

files_read_config_files(rustdesk_t)
files_read_all_pids(rustdesk_t)
files_map_all_pids(rustdesk_t)
files_read_system_conf_files(rustdesk_t)
files_rw_generic_pids(rustdesk_t)
files_dontaudit_search_isid_type_dirs(rustdesk_t)
files_read_isid_type_files(rustdesk_t)
files_read_etc_runtime_files(rustdesk_t)
files_manage_all_locks(rustdesk_t)
files_manage_etc_runtime_files(rustdesk_t)
files_manage_etc_symlinks(rustdesk_t)
files_etc_filetrans_etc_runtime(rustdesk_t, file)
# Run /etc/X11/prefdm:
files_exec_etc_files(rustdesk_t)
files_read_usr_files(rustdesk_t)
files_write_root_dirs(rustdesk_t)
# file descriptors inherited from the rootfs:
files_dontaudit_rw_root_files(rustdesk_t)
files_dontaudit_rw_root_chr_files(rustdesk_t)
files_dontaudit_mounton_modules_object(rustdesk_t)
files_manage_mnt_dirs(rustdesk_t)
files_manage_mnt_files(rustdesk_t)
files_read_mnt_symlinks(rustdesk_t)
files_mounton_etc(rustdesk_t)
files_create_default_dir(rustdesk_t)
files_remount_rootfs(rustdesk_t)
files_create_var_dirs(rustdesk_t)
files_watch_non_security_dirs(rustdesk_t)
files_watch_non_security_files(rustdesk_t)
files_watch_non_security_lnk_files(rustdesk_t)

fs_read_efivarfs_files(rustdesk_t)
fs_setattr_efivarfs_files(rustdesk_t)
fs_read_nfsd_files(rustdesk_t)

fstools_getattr_swap_files(rustdesk_t)

mcs_process_set_categories(rustdesk_t)

mls_file_read_all_levels(rustdesk_t)
mls_file_write_all_levels(rustdesk_t)
mls_file_downgrade(rustdesk_t)
mls_file_upgrade(rustdesk_t)
mls_fd_use_all_levels(rustdesk_t)
mls_fd_share_all_levels(rustdesk_t)
mls_process_set_level(rustdesk_t)
mls_process_write_down(rustdesk_t)
mls_socket_read_all_levels(rustdesk_t)
mls_socket_write_all_levels(rustdesk_t)
mls_rangetrans_source(rustdesk_t)

selinux_set_all_booleans(rustdesk_t)
selinux_load_policy(rustdesk_t)
selinux_mounton_fs(rustdesk_t)
allow rustdesk_t security_t:security load_policy;

selinux_compute_access_vector(rustdesk_t)
selinux_compute_create_context(rustdesk_t)
selinux_compute_user_contexts(rustdesk_t)
selinux_validate_context(rustdesk_t)
selinux_compute_relabel_context(rustdesk_t)
selinux_unmount_fs(rustdesk_t)

term_create_pty_dir(rustdesk_t)
term_use_unallocated_ttys(rustdesk_t)
term_setattr_unallocated_ttys(rustdesk_t)
term_use_console(rustdesk_t)
term_use_all_inherited_terms(rustdesk_t)
term_use_usb_ttys(rustdesk_t)
term_use_all_ptys(rustdesk_t)
term_setattr_all_ptys(rustdesk_t)
term_use_virtio_console(rustdesk_t)
term_watch_console_dev(rustdesk_t)
term_watch_reads_console_dev(rustdesk_t)
term_watch_unallocated_ttys(rustdesk_t)
term_watch_reads_unallocated_ttys(rustdesk_t)
term_watch_user_ttys(rustdesk_t)
term_watch_reads_user_ttys(rustdesk_t)

# Run init scripts.
init_domtrans_script(rustdesk_t)
init_exec_notrans_direct_init_entry(rustdesk_t)

libs_rw_ld_so_cache(rustdesk_t)

logging_create_devlog_dev(rustdesk_t)
logging_send_syslog_msg(rustdesk_t)
logging_send_audit_msgs(rustdesk_t)
logging_manage_generic_logs(rustdesk_t)
logging_mmap_generic_logs(rustdesk_t)
logging_relabel_devlog_dev(rustdesk_t)
logging_manage_audit_config(rustdesk_t)
logging_create_syslog_netlink_audit_socket(rustdesk_t)
logging_write_var_log_dirs(rustdesk_t)
logging_manage_var_log_symlinks(rustdesk_t)

seutil_read_config(rustdesk_t)
seutil_read_login_config(rustdesk_t)
seutil_read_default_contexts(rustdesk_t)
seutil_read_module_store(rustdesk_t)

miscfiles_manage_localization(rustdesk_t)
miscfiles_filetrans_named_content(rustdesk_t)

udev_manage_rules_files(rustdesk_t)

userdom_use_user_ttys(rustdesk_t)
userdom_manage_tmp_dirs(rustdesk_t)
userdom_manage_tmp_sockets(rustdesk_t)
userdom_delete_user_tmp_files(rustdesk_t)
userdom_delete_user_home_content_files(rustdesk_t)
userdom_connectto_stream(rustdesk_t)
userdom_rw_inherited_user_pipes(rustdesk_t)
userdom_transition_login_userdomain(rustdesk_t)
userdom_nnp_transition_login_userdomain(rustdesk_t)
userdom_noatsecure_login_userdomain(rustdesk_t)
userdom_sigchld_login_userdomain(rustdesk_t)
userdom_use_user_ptys(rustdesk_t)
userdom_watch_user_ptys(rustdesk_t)
userdom_watch_reads_user_ptys(rustdesk_t)

allow rustdesk_t self:process setsched;

ifdef(`distro_redhat',`
	fs_manage_tmpfs_files(rustdesk_t)
	fs_manage_tmpfs_symlinks(rustdesk_t)
	fs_manage_tmpfs_sockets(rustdesk_t)
	fs_manage_tmpfs_chr_files(rustdesk_t)
	fs_exec_tmpfs_files(rustdesk_t)
	fs_read_tmpfs_symlinks(rustdesk_t)
	fs_tmpfs_filetrans(rustdesk_t, initctl_t, fifo_file)
	fs_tmpfs_filetrans_named_content(rustdesk_t)
    fs_relabelfrom_tmpfs_lnk_files(rustdesk_t)

	logging_stream_connect_syslog(rustdesk_t)
	logging_relabel_syslog_pid_socket(rustdesk_t)
')

corecmd_shell_domtrans(rustdesk_t, initrc_t)

storage_raw_rw_fixed_disk(rustdesk_t)

sysnet_read_dhcpc_state(rustdesk_t)

allow rustdesk_t self:system all_system_perms;
allow rustdesk_t self:system module_load;
allow rustdesk_t self:unix_dgram_socket { create_socket_perms sendto };
allow rustdesk_t self:process { setkeycreate setsockcreate setfscreate setrlimit setexec };
allow rustdesk_t self:process { getcap setcap };
allow rustdesk_t self:unix_stream_socket { create_stream_socket_perms connectto recvfrom };
allow rustdesk_t self:netlink_kobject_uevent_socket create_socket_perms; 
allow rustdesk_t self:netlink_selinux_socket create_socket_perms;
allow rustdesk_t self:unix_dgram_socket lock;
# Until systemd is fixed
allow daemon rustdesk_t:socket_class_set { getopt read getattr ioctl setopt write };
allow rustdesk_t self:udp_socket create_socket_perms;
allow rustdesk_t self:netlink_route_socket create_netlink_socket_perms;

allow rustdesk_t initrc_t:unix_dgram_socket create_socket_perms;

kernel_list_unlabeled(rustdesk_t)
kernel_read_unlabeled_lnk_files(rustdesk_t)
kernel_read_network_state(rustdesk_t)
kernel_rw_all_sysctls(rustdesk_t)
kernel_rw_security_state(rustdesk_t)
kernel_rw_usermodehelper_state(rustdesk_t)
kernel_read_software_raid_state(rustdesk_t)
kernel_unmount_debugfs(rustdesk_t)
kernel_setsched(rustdesk_t)
kernel_mounton_kernel_sysctl(rustdesk_t)

dev_write_kmsg(rustdesk_t)
dev_write_urand(rustdesk_t)
dev_rw_lvm_control(rustdesk_t)
dev_rw_autofs(rustdesk_t)
dev_manage_generic_symlinks(rustdesk_t)
dev_manage_generic_dirs(rustdesk_t)
dev_manage_generic_files(rustdesk_t)
dev_read_generic_chr_files(rustdesk_t)
dev_relabel_generic_dev_dirs(rustdesk_t)
dev_relabel_all_dev_nodes(rustdesk_t)
dev_relabel_all_dev_files(rustdesk_t)
dev_manage_sysfs_dirs(rustdesk_t)
dev_relabel_sysfs_dirs(rustdesk_t)
dev_rw_wireless(rustdesk_t)

files_search_all(rustdesk_t)
files_mounton_all_mountpoints(rustdesk_t)
files_unmount_all_file_type_fs(rustdesk_t)
files_remount_all_file_type_fs(rustdesk_t)
files_mounton_kernel_symbol_table(rustdesk_t)
files_manage_all_pid_dirs(rustdesk_t)
files_write_all_pid_sockets(rustdesk_t)
files_manage_etc_dirs(rustdesk_t)
files_manage_generic_tmp_dirs(rustdesk_t)
files_relabel_all_pid_dirs(rustdesk_t)
files_relabel_all_pid_files(rustdesk_t)
files_create_all_pid_sockets(rustdesk_t)
files_delete_all_pids(rustdesk_t)
files_exec_generic_pid_files(rustdesk_t)
files_create_all_pid_pipes(rustdesk_t)
files_create_all_spool_sockets(rustdesk_t)
files_delete_all_spool_sockets(rustdesk_t)
files_create_var_lib_dirs(rustdesk_t)
files_create_var_lib_symlinks(rustdesk_t)
files_read_var_lib_symlinks(rustdesk_t)
files_manage_urandom_seed(rustdesk_t)
files_list_locks(rustdesk_t)
files_list_spool(rustdesk_t)
files_list_var(rustdesk_t)
files_write_var_dirs(rustdesk_t)
files_manage_var_symlinks(rustdesk_t)
files_setattr_var_dirs(rustdesk_t)
files_list_boot(rustdesk_t)
files_list_home(rustdesk_t)
files_create_lock_dirs(rustdesk_t)
files_relabel_all_files(rustdesk_t)
files_read_kernel_modules(rustdesk_t)
files_map_kernel_modules(rustdesk_t)
files_dontaudit_mounton_isid(rustdesk_t)
files_delete_tmp_files(rustdesk_t)
files_delete_tmp_pipes(rustdesk_t)
files_delete_tmp_sockets(rustdesk_t)
fs_getattr_all_fs(rustdesk_t)
fs_manage_cgroup_dirs(rustdesk_t)
fs_manage_cgroup_files(rustdesk_t)
fs_manage_bpf_dirs(rustdesk_t)
fs_manage_bpf_files(rustdesk_t)
fs_manage_hugetlbfs_dirs(rustdesk_t)
fs_manage_tmpfs_dirs(rustdesk_t)
fs_relabel_tmpfs_blk_file(rustdesk_t)
fs_relabel_tmpfs_chr_file(rustdesk_t)
fs_relabel_pstore_dirs(rustdesk_t)
fs_relabel_tmpfs_dirs(rustdesk_t)
fs_relabel_tmpfs_files(rustdesk_t)
fs_relabel_tmpfs_fifo_files(rustdesk_t)
fs_mount_all_fs(rustdesk_t)
fs_unmount_all_fs(rustdesk_t)
fs_remount_all_fs(rustdesk_t)
fs_list_all(rustdesk_t)
fs_list_auto_mountpoints(rustdesk_t)
fs_register_binary_executable_type(rustdesk_t)
fs_relabel_tmpfs_sock_file(rustdesk_t)
fs_rw_tmpfs_files(rustdesk_t)	
fs_relabel_cgroup_dirs(rustdesk_t)
fs_search_cgroup_dirs(rustdesk_t)
# for network namespaces
fs_read_nsfs_files(rustdesk_t)

storage_getattr_removable_dev(rustdesk_t)

term_relabel_ptys_dirs(rustdesk_t)

auth_relabel_login_records(rustdesk_t)
auth_relabel_pam_console_data_dirs(rustdesk_t)
auth_manage_faillog(rustdesk_t)

clock_read_adjtime(rustdesk_t)

init_read_script_state(rustdesk_t)

seutil_read_file_contexts(rustdesk_t)

systemd_exec_systemctl(rustdesk_t)
systemd_manage_home_content(rustdesk_t)
systemd_manage_unit_dirs(rustdesk_t)
systemd_manage_random_seed(rustdesk_t)
systemd_manage_all_unit_files(rustdesk_t)
systemd_logger_stream_connect(rustdesk_t)
systemd_login_manage_pid_files(rustdesk_t)
systemd_config_all_services(rustdesk_t)
systemd_relabelto_fifo_file_passwd_run(rustdesk_t)
systemd_relabel_unit_dirs(rustdesk_t)
systemd_relabel_unit_files(rustdesk_t)
systemd_relabel_unit_symlinks(rustdesk_t)
systemd_login_status(rustdesk_t)
systemd_map_networkd_exec_files(rustdesk_t)
systemd_map_resolved_exec_files(rustdesk_t)
systemd_rfkill_setattr_lib(rustdesk_t)
systemd_rfkill_mounton_var_lib(rustdesk_t)
systemd_rfkill_manage_lib_dirs(rustdesk_t)
systemd_timedated_mounton_var_lib(rustdesk_t)
systemd_mounton_inhibit_dir(rustdesk_t)
systemd_timedated_manage_lib_dirs(rustdesk_t)
systemd_login_mounton_pid_dirs(rustdesk_t)
systemd_mounton_inherited_logind_sessions_dirs(rustdesk_t)
systemd_delete_private_tmp(rustdesk_t)
systemd_userdbd_stream_connect(rustdesk_t)
systemd_userdbd_runtime_filetrans(rustdesk_t)
systemd_userdbd_runtime_manage_symlinks(rustdesk_t)
systemd_write_inherited_logind_sessions_pipes(rustdesk_t)

create_sock_files_pattern(rustdesk_t, init_sock_file_type, init_sock_file_type)

create_dirs_pattern(rustdesk_t, var_log_t, var_log_t)

auth_use_nsswitch(rustdesk_t)
auth_rw_login_records(rustdesk_t)
auth_rw_lastlog(rustdesk_t)
auth_domtrans_chk_passwd(rustdesk_t)
auth_manage_passwd(rustdesk_t)

allow rustdesk_t var_run_t:dir relabelto;

allow rustdesk_t daemon:unix_stream_socket create_stream_socket_perms;
allow rustdesk_t daemon:unix_dgram_socket create_socket_perms;
allow rustdesk_t daemon:tcp_socket create_stream_socket_perms;
allow rustdesk_t daemon:udp_socket create_socket_perms;
allow daemon rustdesk_t:unix_dgram_socket sendto;
# need write to /var/run/systemd/notify
init_write_pid_socket(daemon)
allow daemon rustdesk_t:unix_stream_socket { append write read getattr ioctl };

allow rustdesk_t daemon:process siginh;

ifdef(`hide_broken_symptoms',`
	# RHEL4 systems seem to have a stray
	# fds open from the initrd
	ifdef(`distro_rhel4',`
		kernel_dontaudit_use_fds(daemon)
	')

	dontaudit daemon rustdesk_t:dir search_dir_perms;
	dontaudit daemon rustdesk_t:file read_file_perms;
')

dontaudit systemprocess rustdesk_t:unix_stream_socket getattr;

allow rustdesk_t daemon:unix_stream_socket create_stream_socket_perms;
allow rustdesk_t daemon:unix_dgram_socket create_socket_perms;
allow daemon rustdesk_t:unix_stream_socket ioctl;
allow daemon rustdesk_t:unix_dgram_socket sendto;

# Handle upstart/systemd direct transition to a executable
allow rustdesk_t systemprocess:process { dyntransition siginh };
allow rustdesk_t systemprocess:unix_stream_socket create_stream_socket_perms;
allow rustdesk_t systemprocess:unix_dgram_socket create_socket_perms;
allow systemprocess rustdesk_t:unix_dgram_socket sendto;
allow systemprocess rustdesk_t:unix_stream_socket { append write read getattr ioctl };


###############################################################################
#
# Part 2. The following rules are generated by
#               `grep rustdesk /var/log/audit/audit.log | audit2allow -a -M test`
#

#============= rustdesk_t ==============
allow rustdesk_t self:process execmem;
allow rustdesk_t data_home_t:dir { add_name create remove_name write };
allow rustdesk_t config_home_t:dir { write add_name remove_name };
allow rustdesk_t data_home_t:file { create link open read rename setattr unlink write };
allow rustdesk_t config_home_t:file { create link open read rename setattr unlink write };
allow rustdesk_t sudo_exec_t:file { execute execute_no_trans map open read } ;
allow rustdesk_t systemd_logind_t:dbus send_msg;
allow rustdesk_t tmp_t:file { setattr open setattr unlink write unlink };
allow rustdesk_t user_tmp_t:file { open write read link unlink map };
allow systemd_coredump_t rustdesk_exec_t:file read;
allow rustdesk_t event_device_t:chr_file { append open ioctl lock read write };
allow rustdesk_t session_dbusd_tmp_t:sock_file write;
allow rustdesk_t unconfined_dbusd_t:unix_stream_socket connectto;
allow unconfined_t rustdesk_exec_t:file { execute getattr open read };
allow init_t rustdesk_exec_t:file getattr;
allow rustdesk_t pulseaudio_home_t:file { read open write lock };
allow rustdesk_t user_fonts_cache_t:dir { add_name remove_name } ;
allow rustdesk_t user_fonts_cache_t:file { create open read write lock unlink };

#!!!! This avc can be allowed using the boolean 'nis_enabled'
allow rustdesk_t unreserved_port_t:tcp_socket name_connect;
allow rustdesk_t xserver_port_t:tcp_socket name_connect;
allow rustdesk_t xserver_t:unix_stream_socket connectto;
allow rustdesk_t ephemeral_port_t:tcp_socket name_connect;


###############################################################################
#
# Part 3. The following rules are from the system installed rules.
#               `dnf install setools-console`
#               `sesearch -A | grep 'allow init_t ' | sed 's/allow init_t /allow rustdesk_t /g'`
#

#============= merge from init_t ==============
allow rustdesk_t abrt_dump_oops_t:dbus send_msg;
allow rustdesk_t abrt_upload_watch_t:dbus send_msg;
allow rustdesk_t adjtime_t:file { ioctl lock open read };
allow rustdesk_t aiccu_t:dbus send_msg;
allow rustdesk_t amanda_inetd_exec_t:file ioctl;
allow rustdesk_t amanda_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t antivirus_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t apcupsd_power_t:file { ioctl lock open read };
allow rustdesk_t auditd_etc_t:dir { add_name remove_name write };
allow rustdesk_t auditd_etc_t:file { append create ioctl link lock open read rename setattr unlink watch watch_reads write };   
allow rustdesk_t autofs_device_t:chr_file { append ioctl lock open read write };
allow rustdesk_t base_ro_file_type:file { execute execute_no_trans map };
allow rustdesk_t binfmt_misc_fs_t:file { append ioctl lock open read write };
allow rustdesk_t bitlbee_exec_t:file ioctl;
allow rustdesk_t bitlbee_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t boltd_var_lib_t:dir { add_name create link mounton remove_name rename reparent rmdir setattr unlink watch_reads write };
allow rustdesk_t boltd_var_lib_t:fifo_file { append create ioctl link lock open read rename setattr unlink write };
allow rustdesk_t boltd_var_lib_t:lnk_file { append create ioctl link lock read rename setattr unlink watch_reads write };       
allow rustdesk_t boltd_var_lib_t:sock_file { append create ioctl link lock open read rename setattr unlink write };
allow rustdesk_t boltd_var_run_t:dir mounton;
allow rustdesk_t boolean_type:dir { getattr ioctl lock open read search };
allow rustdesk_t boolean_type:file { append getattr ioctl lock open read write };
allow rustdesk_t boothd_t:dbus send_msg;
allow rustdesk_t bootloader_exec_t:file { execute ioctl map open read };
allow rustdesk_t bootloader_t:process transition;
allow rustdesk_t bpf_t:dir { add_name create link remove_name rename reparent rmdir setattr unlink watch_reads };
allow rustdesk_t bpf_t:dir { create link rename reparent rmdir setattr unlink watch_reads };
allow rustdesk_t bpf_t:file { append create ioctl link lock open read rename setattr unlink watch_reads write };
allow rustdesk_t bugzilla_script_t:dbus send_msg;
allow rustdesk_t certwatch_t:dbus send_msg;
allow rustdesk_t cgroup_t:dir { add_name create link remove_name rename reparent rmdir setattr unlink watch_reads };
allow rustdesk_t cgroup_t:dir { create link rename reparent rmdir setattr unlink watch_reads };
allow rustdesk_t cgroup_t:file { append create link rename setattr unlink watch_reads write };
allow rustdesk_t cgroup_t:lnk_file { append create ioctl link lock rename setattr unlink watch_reads write };
allow rustdesk_t chkpwd_exec_t:file { execute ioctl map open read };
allow rustdesk_t chkpwd_t:process transition;
allow rustdesk_t chronyc_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t chronyd_exec_t:file ioctl;
allow rustdesk_t chronyd_keys_t:file { ioctl lock open read };
allow rustdesk_t chronyd_restricted_t:dbus send_msg;
allow rustdesk_t chronyd_restricted_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t chronyd_restricted_t:process transition;
allow rustdesk_t chroot_exec_t:file { execute execute_no_trans ioctl lock map open read };
allow rustdesk_t cifs_helper_t:dbus send_msg;
allow rustdesk_t cinder_domain:dbus send_msg;
allow rustdesk_t cloudform_domain:dbus send_msg;
allow rustdesk_t collectd_script_t:dbus send_msg;
allow rustdesk_t comsat_exec_t:file { execute ioctl map open read };
allow rustdesk_t comsat_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t comsat_t:process transition;
allow rustdesk_t comsat_t:unix_stream_socket { accept append bind connect create getattr getopt ioctl listen lock read setattr setopt shutdown write };
allow rustdesk_t configfile:file { ioctl lock open read };
allow rustdesk_t configfile:lnk_file read;
allow rustdesk_t console_device_t:chr_file { read watch watch_reads };
allow rustdesk_t consolekit_log_t:dir { add_name remove_name write };
allow rustdesk_t consolekit_log_t:file { append create ioctl link lock open read rename setattr unlink watch_reads write };     
allow rustdesk_t container_kvm_t:dbus send_msg;
allow rustdesk_t container_runtime_domain:dbus send_msg;
allow rustdesk_t container_runtime_tmpfs_t:file { ioctl lock open read };
allow rustdesk_t container_runtime_tmpfs_t:lnk_file read;
allow rustdesk_t container_var_lib_t:dir { create link rename reparent rmdir setattr unlink watch_reads };
allow rustdesk_t container_var_lib_t:file { append create ioctl link lock open read rename setattr unlink watch_reads write };  
allow rustdesk_t container_var_lib_t:lnk_file { append create ioctl link lock read rename setattr unlink watch_reads write };   
allow rustdesk_t crack_t:dbus send_msg;
allow rustdesk_t cups_brf_t:dbus send_msg;
allow rustdesk_t cupsd_exec_t:file ioctl;
allow rustdesk_t cupsd_lpd_exec_t:file ioctl;
allow rustdesk_t cupsd_lpd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t cupsd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t cvs_exec_t:file ioctl;
allow rustdesk_t cvs_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t daemon:fifo_file { append getattr ioctl lock open write };
allow rustdesk_t daemon:process siginh;
allow rustdesk_t daemon:tcp_socket { accept append bind connect create getattr getopt ioctl listen lock read setattr setopt shutdown write };
allow rustdesk_t daemon:udp_socket { append bind connect create getattr getopt ioctl lock read setattr setopt shutdown write }; 
allow rustdesk_t daemon:unix_dgram_socket { append bind connect create getattr getopt ioctl lock read setattr setopt shutdown write };
allow rustdesk_t daemon:unix_stream_socket { accept append bind connect create getattr getopt ioctl listen lock read setattr setopt shutdown write };
allow rustdesk_t dbskkd_exec_t:file { execute ioctl map open read };
allow rustdesk_t dbskkd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t dbskkd_t:process transition;
allow rustdesk_t dbskkd_t:unix_stream_socket { accept append bind connect create getattr getopt ioctl listen lock read setattr setopt shutdown write };
allow rustdesk_t default_context_t:file { ioctl lock open read };
allow rustdesk_t default_t:dir create;
allow rustdesk_t devicekit_disk_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t devicekit_power_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t devicekit_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t device_node:blk_file { getattr mounton relabelfrom relabelto setattr };
allow rustdesk_t device_node:chr_file { create getattr mounton relabelfrom relabelto setattr };
allow rustdesk_t device_node:dir { getattr relabelfrom relabelto };
allow rustdesk_t device_node:fifo_file { getattr relabelfrom relabelto };
allow rustdesk_t device_node:file { create getattr mounton open relabelfrom relabelto };
allow rustdesk_t device_node:lnk_file { getattr relabelfrom relabelto };
allow rustdesk_t device_node:sock_file { getattr relabelfrom relabelto };
allow rustdesk_t device_t:chr_file { append ioctl lock open read write };
allow rustdesk_t device_t:dir { create link rename reparent rmdir setattr unlink watch_reads };
allow rustdesk_t device_t:file { append ioctl link lock read rename setattr unlink watch_reads write };
allow rustdesk_t device_t:lnk_file { append create ioctl link lock rename setattr unlink watch_reads write };
allow rustdesk_t devlog_t:lnk_file { append create ioctl link lock rename setattr unlink watch_reads write };
allow rustdesk_t devlog_t:sock_file { create ioctl link lock read rename setattr unlink };
allow rustdesk_t devpts_t:chr_file { append ioctl lock read write };
allow rustdesk_t devpts_t:dir create;
allow rustdesk_t dhcpc_state_t:file { ioctl lock open read };
allow rustdesk_t dhcp_state_t:file setattr;
allow rustdesk_t direct_init_entry:file execute_no_trans;
allow rustdesk_t dirsrvadmin_script_t:dbus send_msg;
allow rustdesk_t domain:dir { getattr ioctl lock open read search };
allow rustdesk_t domain:file { getattr ioctl lock open read };
allow rustdesk_t domain:lnk_file { getattr read };
allow rustdesk_t domain:process { getattr getpgid noatsecure rlimitinh setrlimit setsched sigchld sigkill signal signull sigstop };
allow rustdesk_t dri_device_t:chr_file { append ioctl lock map open read write };
allow rustdesk_t dspam_script_t:dbus send_msg;
allow rustdesk_t efivarfs_t:file { ioctl lock open read setattr };
allow rustdesk_t etc_aliases_t:dir { add_name remove_name write };
allow rustdesk_t etc_aliases_t:file { append create ioctl link lock open read rename setattr unlink watch_reads write };        
allow rustdesk_t etc_aliases_t:lnk_file { append create ioctl link lock read rename setattr unlink watch_reads write };
allow rustdesk_t etc_runtime_t:dir { add_name create link remove_name rename reparent rmdir setattr unlink watch_reads write }; 
allow rustdesk_t etc_runtime_t:file { append create link rename setattr unlink watch_reads write };
allow rustdesk_t etc_t:dir { add_name create link mounton remove_name rename reparent rmdir setattr unlink watch_reads write }; 
allow rustdesk_t etc_t:dir { create link mounton rename reparent rmdir setattr unlink watch_reads };
allow rustdesk_t etc_t:lnk_file { append create ioctl link lock rename setattr unlink watch_reads write };
allow rustdesk_t faillog_t:dir { add_name create link remove_name rename reparent rmdir setattr unlink watch_reads write };     
allow rustdesk_t faillog_t:file { append create ioctl link lock open read rename setattr unlink watch_reads write };
allow rustdesk_t faillog_t:file { create link open read rename setattr unlink watch_reads write };
allow rustdesk_t fetchmail_t:dbus send_msg;
allow rustdesk_t filesystem_type:dir { getattr ioctl lock open read search write };
allow rustdesk_t filesystem_type:filesystem { getattr mount remount unmount };
allow rustdesk_t file_type:blk_file { getattr relabelfrom relabelto };
allow rustdesk_t file_type:chr_file { getattr relabelfrom relabelto };
allow rustdesk_t file_type:dir { getattr ioctl lock open read relabelfrom relabelto search };
allow rustdesk_t file_type:fifo_file { getattr relabelfrom relabelto };
allow rustdesk_t file_type:file { getattr relabelfrom relabelto };
allow rustdesk_t file_type:filesystem { getattr remount unmount };
allow rustdesk_t file_type:lnk_file { getattr relabelfrom relabelto };
allow rustdesk_t file_type:sock_file { getattr relabelfrom relabelto };
allow rustdesk_t fingerd_exec_t:file ioctl;
allow rustdesk_t fingerd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t fixed_disk_device_t:blk_file { append ioctl lock open read write };
allow rustdesk_t fixed_disk_device_t:chr_file { append ioctl lock open read write };
allow rustdesk_t fixed_disk_device_t:lnk_file read;
allow rustdesk_t flatpak_helper_t:dbus send_msg;
allow rustdesk_t fprintd_exec_t:file { ioctl lock };
allow rustdesk_t fprintd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t fprintd_var_lib_t:dir { mounton setattr };
allow rustdesk_t fsadm_t:dbus send_msg;
allow rustdesk_t fsadm_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t ftpd_exec_t:file ioctl;
allow rustdesk_t ftpd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t fwupd_cache_t:dir { remove_name rmdir write };
allow rustdesk_t fwupd_cache_t:file unlink;
allow rustdesk_t fwupd_t:dbus send_msg;
allow rustdesk_t gconfdefaultsm_t:dbus send_msg;
allow rustdesk_t geoclue_t:dbus send_msg;
allow rustdesk_t geoclue_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t getty_exec_t:file ioctl;
allow rustdesk_t getty_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t gitd_exec_t:file ioctl;
allow rustdesk_t git_system_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t gnome_home_type:dir { add_name create link remove_name rename reparent rmdir setattr unlink watch_reads write };
allow rustdesk_t gnome_home_type:file { append create ioctl link lock map open read rename setattr unlink watch_reads write };  
allow rustdesk_t gnome_home_type:lnk_file { append create ioctl link lock read rename setattr unlink watch_reads write };       
allow rustdesk_t gnome_home_type:sock_file { append create ioctl link lock open read rename setattr unlink write };
allow rustdesk_t gnomesystemmm_t:dbus send_msg;
allow rustdesk_t guest_t:dbus send_msg;
allow rustdesk_t home_bin_t:file { execute execute_no_trans ioctl map open read };
allow rustdesk_t home_root_t:lnk_file read;
allow rustdesk_t hostname_etc_t:file unlink;
allow rustdesk_t httpd_log_t:dir { add_name create setattr write };
allow rustdesk_t httpd_tmp_t:file unlink;
allow rustdesk_t httpd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t hugetlbfs_t:dir { add_name create link remove_name rename reparent rmdir setattr unlink watch_reads };
allow rustdesk_t hugetlbfs_t:dir { create link rename reparent rmdir setattr unlink watch_reads };
allow rustdesk_t ibacm_t:netlink_rdma_socket { append bind connect create getattr getopt ioctl lock read setattr setopt shutdown write };
allow rustdesk_t ibacm_var_run_t:fifo_file { append ioctl link lock read rename setattr write };
allow rustdesk_t ibacm_var_run_t:lnk_file { append create ioctl link lock rename setattr unlink watch_reads write };
allow rustdesk_t ibacm_var_run_t:sock_file { ioctl link lock read rename };
allow rustdesk_t inetd_child_exec_t:file ioctl;
allow rustdesk_t inetd_child_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t initctl_t:fifo_file { append create ioctl link lock open read rename setattr unlink write };
allow rustdesk_t init_exec_t:file { entrypoint execute execute_no_trans ioctl lock map open read };
allow rustdesk_t initrc_state_t:dir { add_name remove_name write };
allow rustdesk_t initrc_state_t:file { append create execute execute_no_trans ioctl link lock map open read rename setattr unlink watch_reads write };
allow rustdesk_t initrc_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t initrc_t:process transition;
allow rustdesk_t initrc_t:tcp_socket { accept append bind connect create getattr getopt ioctl listen lock read setattr setopt shutdown write };
allow rustdesk_t initrc_t:unix_dgram_socket { append bind connect create getattr getopt ioctl lock read setattr setopt shutdown write };
allow rustdesk_t initrc_t:unix_stream_socket { accept append bind connect connectto create getattr getopt ioctl listen lock read setattr setopt shutdown write };
allow rustdesk_t initrc_var_run_t:file { append setattr write };
allow rustdesk_t init_script_file_type:file { execute ioctl map open read };
allow rustdesk_t init_script_file_type:service { disable enable reload start status stop };
allow rustdesk_t init_t:association sendto;
allow rustdesk_t init_t:bpf { map_create map_read map_write prog_load prog_run };
allow rustdesk_t init_t:capability2 { audit_read block_suspend bpf checkpoint_restore epolwakeup perfmon syslog wake_alarm };   
allow rustdesk_t init_t:capability { audit_write audit_control sys_module chown dac_override dac_read_search fowner fsetid ipc_lock ipc_owner kill lease linux_immutable mknod net_admin net_bind_service net_broadcast net_raw setfcap setgid setpcap setuid sys_admin sys_boot sys_chroot sys_nice sys_pacct sys_ptrace sys_rawio sys_resource sys_time sys_tty_config };
allow rustdesk_t init_t:cap_userns { audit_control audit_write chown dac_override dac_read_search fowner fsetid ipc_lock ipc_owner kill lease linux_immutable mknod net_admin net_bind_service net_broadcast net_raw setfcap setgid setpcap setuid sys_admin sys_boot sys_chroot sys_module sys_nice sys_pacct sys_ptrace sys_rawio sys_resource sys_time sys_tty_config };
allow rustdesk_t init_t:dir watch;
allow rustdesk_t init_t:fifo_file { create link rename setattr unlink append getattr ioctl lock open read write };
allow rustdesk_t init_t:file { append mounton write };
allow rustdesk_t init_t:key { create read setattr view write };
allow rustdesk_t init_t:lnk_file { ioctl lock };
allow rustdesk_t init_t:lockdown { confidentiality integrity };
allow rustdesk_t init_tmp_t:dir { add_name create link remove_name rename reparent rmdir setattr unlink watch_reads write };    
allow rustdesk_t init_tmp_t:file { create link map open rename setattr unlink watch_reads write };
allow rustdesk_t init_tmp_t:lnk_file { append create ioctl link lock read rename setattr unlink watch_reads write };
allow rustdesk_t init_tmp_t:sock_file { append create ioctl link lock open read rename setattr unlink write };
allow rustdesk_t init_t:netlink_audit_socket { append bind connect create getattr getopt ioctl lock nlmsg_read nlmsg_relay nlmsg_tty_audit read setattr setopt shutdown write };
allow rustdesk_t init_t:netlink_kobject_uevent_socket { append bind connect create getattr getopt ioctl lock read setattr setopt shutdown write };
allow rustdesk_t init_t:netlink_route_socket { append bind connect create getattr getopt ioctl lock nlmsg_read nlmsg_write read setattr setopt shutdown write };
allow rustdesk_t init_t:netlink_selinux_socket { append bind connect create getattr getopt ioctl lock read setattr setopt shutdown write };
allow rustdesk_t init_t:packet_socket { append bind connect create getattr getopt ioctl lock read setattr setopt shutdown write };
allow rustdesk_t init_t:peer recv;
allow rustdesk_t init_t:process { fork getcap getsched setcap setexec setfscreate setkeycreate setsockcreate };
allow rustdesk_t init_t:sem { associate create destroy getattr read setattr unix_read unix_write write };
allow rustdesk_t init_t:service { disable enable reload start status stop };
allow rustdesk_t init_t:shm { associate create destroy getattr lock read setattr unix_read unix_write write };
allow rustdesk_t init_t:system { disable enable halt ipc_info module_load module_request reboot reload start status stop syslog_console syslog_mod syslog_read undefined };
allow rustdesk_t init_t:tcp_socket { accept append bind connect create getattr getopt ioctl listen lock read setattr setopt shutdown write };
allow rustdesk_t init_t:udp_socket { append bind connect create getattr getopt ioctl lock read setattr setopt shutdown write }; 
allow rustdesk_t init_t:unix_dgram_socket { append bind connect create getattr getopt ioctl lock read sendto setattr setopt shutdown write };
allow rustdesk_t init_t:unix_stream_socket { accept append bind connect create getattr getopt ioctl listen lock read recvfrom sendto setattr setopt shutdown write };
allow rustdesk_t init_t:user_namespace create;
allow rustdesk_t init_var_lib_t:dir { add_name create link mounton remove_name rename reparent rmdir setattr unlink watch_reads write };
allow rustdesk_t init_var_lib_t:dir { create link mounton rename reparent rmdir setattr unlink watch_reads };
allow rustdesk_t init_var_lib_t:file { append create ioctl link lock map open read rename setattr unlink watch_reads write };   
allow rustdesk_t init_var_lib_t:lnk_file { append create ioctl link lock read rename setattr unlink watch_reads write };        
allow rustdesk_t init_var_lib_t:sock_file { append create ioctl link lock open read rename setattr unlink write };
allow rustdesk_t init_var_run_t:blk_file { append create ioctl link lock open read rename setattr unlink write };
allow rustdesk_t init_var_run_t:chr_file { append create ioctl link lock open read rename setattr unlink write };
allow rustdesk_t init_var_run_t:dir mounton;
allow rustdesk_t init_var_run_t:fifo_file { append ioctl link lock read rename setattr write };
allow rustdesk_t init_var_run_t:file { append create link mounton rename setattr watch_reads write };
allow rustdesk_t init_var_run_t:lnk_file { append create ioctl link lock rename setattr unlink watch_reads write };
allow rustdesk_t init_var_run_t:sock_file { ioctl link lock read rename };
allow rustdesk_t init_var_run_t:sock_file { ioctl link lock rename };
allow rustdesk_t insights_client_t:fifo_file read;
allow rustdesk_t install_exec_t:file { execute ioctl map open read };
allow rustdesk_t install_t:dbus send_msg;
allow rustdesk_t install_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t install_t:process transition;
allow rustdesk_t install_t:unix_stream_socket { accept append bind connect connectto create getattr getopt ioctl listen lock read setattr setopt shutdown write };
allow rustdesk_t ipsec_conf_file_t:file { ioctl lock open read };
allow rustdesk_t ipsec_t:unix_stream_socket connectto;
allow rustdesk_t ipsec_var_run_t:file { append create link rename setattr watch_reads write };
allow rustdesk_t irqbalance_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t iscsi_var_lib_t:file { ioctl lock open read };
allow rustdesk_t jockey_t:dbus send_msg;
allow rustdesk_t journalctl_exec_t:file { execute execute_no_trans ioctl lock map open read };
allow rustdesk_t kadmind_t:dbus send_msg;
allow rustdesk_t kdump_crash_t:file { ioctl lock open read };
allow rustdesk_t kdumpctl_t:dbus send_msg;
allow rustdesk_t kdump_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t keepalived_unconfined_script_t:dbus send_msg;
allow rustdesk_t kernel_t:dbus send_msg;
allow rustdesk_t kernel_t:fd use;
allow rustdesk_t kernel_t:fifo_file { append getattr ioctl lock read write };
allow rustdesk_t kernel_t:system ipc_info;
allow rustdesk_t kernel_t:unix_dgram_socket { getattr ioctl read write };
allow rustdesk_t kernel_t:unix_stream_socket { append bind connect getopt ioctl lock read setattr setopt shutdown write };      
allow rustdesk_t kmod_exec_t:file ioctl;
allow rustdesk_t kmod_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t kmscon_t:dbus send_msg;
allow rustdesk_t kmsg_device_t:chr_file { append ioctl lock open write };
allow rustdesk_t krb5_keytab_t:file { ioctl lock open read };
allow rustdesk_t ktalkd_exec_t:file ioctl;
allow rustdesk_t ktalkd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t l2tpd_t:dbus send_msg;
allow rustdesk_t lastlog_t:file { append ioctl lock open read setattr write };
allow rustdesk_t lastlog_t:file { open read setattr write };
allow rustdesk_t ld_so_cache_t:file { append write };
allow rustdesk_t lldpad_t:dbus send_msg;
allow rustdesk_t loadkeys_t:dbus send_msg;
allow rustdesk_t locale_t:dir { add_name create link remove_name rename reparent rmdir setattr unlink watch_reads write };      
allow rustdesk_t locale_t:file { append create link rename setattr unlink watch_reads write };
allow rustdesk_t locale_t:lnk_file { append create ioctl link lock rename setattr unlink watch_reads write };
allow rustdesk_t lockfile:dir { add_name create link remove_name rename reparent rmdir setattr unlink watch_reads write };      
allow rustdesk_t lockfile:file { append create ioctl link lock open read rename setattr unlink watch_reads write };
allow rustdesk_t lockfile:lnk_file { append create ioctl link lock read rename setattr unlink watch_reads write };
allow rustdesk_t login_userdomain:process2 nnp_transition;
allow rustdesk_t login_userdomain:process transition;
allow rustdesk_t lvm_control_t:chr_file { append ioctl lock open read write };
allow rustdesk_t lvm_etc_t:file map;
allow rustdesk_t lvm_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t lvm_var_run_t:fifo_file { append ioctl lock read write };
allow rustdesk_t machineid_t:file { append create link mounton rename setattr unlink watch_reads write };
allow rustdesk_t mail_spool_t:lnk_file read;
allow rustdesk_t mandb_t:dbus send_msg;
allow rustdesk_t mdadm_t:unix_stream_socket connectto;
allow rustdesk_t mdadm_var_run_t:file { append create link rename setattr watch_reads write };
allow rustdesk_t memcached_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t memory_device_t:chr_file { ioctl lock map open read };
allow rustdesk_t mnt_t:dir { add_name create link remove_name rename reparent rmdir setattr unlink watch_reads write };
allow rustdesk_t mnt_t:dir { create link rename reparent rmdir setattr unlink watch_reads };
allow rustdesk_t mnt_t:file { append create ioctl link lock open read rename setattr unlink watch_reads write };
allow rustdesk_t mnt_t:lnk_file read;
allow rustdesk_t modemmanager_t:dbus send_msg;
allow rustdesk_t modemmanager_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t modules_dep_t:file { ioctl lock map open read };
allow rustdesk_t modules_object_t:dir mounton;
allow rustdesk_t modules_object_t:file { ioctl lock map open read };
allow rustdesk_t modules_object_t:lnk_file read;
allow rustdesk_t mon_procd_t:dbus send_msg;
allow rustdesk_t mountpoint:dir mounton;
allow rustdesk_t mountpoint:file mounton;
allow rustdesk_t mount_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t mount_var_run_t:file { append create link rename setattr watch_reads write };
allow rustdesk_t mptcpd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t munin_plugin_domain:dbus send_msg;
allow rustdesk_t munin_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t mysqld_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t mythtv_script_t:dbus send_msg;
allow rustdesk_t naemon_t:dbus send_msg;
allow rustdesk_t nagios_plugin_domain:dbus send_msg;
allow rustdesk_t nagios_system_plugin_t:dbus send_msg;
allow rustdesk_t named_conf_t:dir { create link rename reparent rmdir setattr unlink watch_reads };
allow rustdesk_t named_conf_t:file { append create link rename setattr unlink watch_reads write };
allow rustdesk_t named_zone_t:dir setattr;
allow rustdesk_t net_conf_t:dir { add_name remove_name write };
allow rustdesk_t net_conf_t:fifo_file { append create ioctl link lock open read rename setattr unlink write };
allow rustdesk_t netlabel_mgmt_t:dbus send_msg;
allow rustdesk_t networkmanager_dispatcher_plugin:dbus send_msg;
allow rustdesk_t NetworkManager_dispatcher_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t NetworkManager_priv_helper_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t NetworkManager_t:unix_stream_socket connectto;
allow rustdesk_t nfsd_fs_t:file { ioctl lock open read };
allow rustdesk_t nfsidmap_t:dbus send_msg;
allow rustdesk_t ninfod_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t non_security_file_type:dir create;
allow rustdesk_t non_security_file_type:dir { mounton setattr write };
allow rustdesk_t non_security_file_type:dir setattr;
allow rustdesk_t non_security_file_type:dir watch;
allow rustdesk_t non_security_file_type:file mounton;
allow rustdesk_t non_security_file_type:file watch;
allow rustdesk_t non_security_file_type:lnk_file watch;
allow rustdesk_t nrpe_exec_t:file ioctl;
allow rustdesk_t nrpe_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t nsfs_t:file { getattr ioctl lock open read };
allow rustdesk_t nsswitch_domain:dbus send_msg;
allow rustdesk_t openshift_cgroup_read_t:dbus send_msg;
allow rustdesk_t openshift_net_read_t:dbus send_msg;
allow rustdesk_t oracleasm_t:dbus send_msg;
allow rustdesk_t passwd_file_t:file { append create link rename setattr unlink watch_reads write };
allow rustdesk_t pcscd_t:unix_stream_socket connectto;
allow rustdesk_t pdns_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t pegasus_openlmi_domain:dbus send_msg;
allow rustdesk_t pidfile:dir { add_name create link remove_name rename reparent rmdir setattr unlink watch_reads write };       
allow rustdesk_t pidfile:fifo_file { create open unlink };
allow rustdesk_t pidfile:file { ioctl lock map open read unlink };
allow rustdesk_t pidfile:lnk_file read;
allow rustdesk_t pidfile:sock_file { append create open setattr unlink write };
allow rustdesk_t pkcs_slotd_tmpfs_t:file unlink;
allow rustdesk_t pkcs_slotd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t pkcs_slotd_t:shm destroy;
allow rustdesk_t plymouthd_t:unix_stream_socket connectto;
allow rustdesk_t plymouth_exec_t:file { execute execute_no_trans ioctl lock map open read };
allow rustdesk_t policykit_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t port_type:tcp_socket name_bind;
allow rustdesk_t port_type:udp_socket name_bind;
allow rustdesk_t postfix_exec_t:file { execute execute_no_trans ioctl lock map open read };
allow rustdesk_t print_spool_t:dir { add_name create link remove_name rename reparent rmdir setattr unlink watch_reads write }; 
allow rustdesk_t print_spool_t:fifo_file { append create ioctl link lock open read rename setattr unlink write };
allow rustdesk_t print_spool_t:file { append create ioctl link lock map open read rename setattr unlink watch_reads write };    
allow rustdesk_t print_spool_t:lnk_file { append create ioctl link lock read rename setattr unlink watch_reads write };
allow rustdesk_t proc_net_t:lnk_file { getattr read };
allow rustdesk_t proc_security_t:file { append write };
allow rustdesk_t proc_type:dir { getattr ioctl lock mounton open read search };
allow rustdesk_t proc_type:file { getattr ioctl lock mounton open read };
allow rustdesk_t ptchown_t:dbus send_msg;
allow rustdesk_t ptynode:chr_file { append ioctl lock open read write };
allow rustdesk_t qmail_tcp_env_exec_t:file { execute ioctl map open read };
allow rustdesk_t qmail_tcp_env_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t qmail_tcp_env_t:process transition;
allow rustdesk_t qmail_tcp_env_t:unix_stream_socket { accept append bind connect create getattr getopt ioctl listen lock read setattr setopt shutdown write };
allow rustdesk_t qpidd_t:dbus send_msg;
allow rustdesk_t quota_exec_t:file { execute ioctl map open read };
allow rustdesk_t quota_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t quota_t:process transition;
allow rustdesk_t quota_t:unix_stream_socket { accept append bind connect create getattr getopt ioctl listen lock read setattr setopt shutdown write };
allow rustdesk_t radiusd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t random_device_t:chr_file { ioctl lock open read };
allow rustdesk_t random_seed_t:file { append create ioctl link lock open read rename setattr unlink watch_reads write };        
allow rustdesk_t rdisc_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t rhsmcertd_t:dbus send_msg;
allow rustdesk_t rlogind_exec_t:file ioctl;
allow rustdesk_t rlogind_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t root_t:dir write;
allow rustdesk_t rpm_script_t:unix_stream_socket { append bind connect getattr getopt ioctl lock read setattr setopt shutdown write };
allow rustdesk_t rpm_var_cache_t:file { ioctl lock open read };
allow rustdesk_t rpm_var_cache_t:lnk_file read;
allow rustdesk_t rpm_var_lib_t:file { ioctl lock map open read };
allow rustdesk_t rpm_var_lib_t:lnk_file read;
allow rustdesk_t rshd_exec_t:file { execute ioctl map open read };
allow rustdesk_t rshd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t rshd_t:process transition;
allow rustdesk_t rshd_t:tcp_socket { accept append bind connect create getattr getopt ioctl listen lock read setattr setopt shutdown write };
allow rustdesk_t rshd_t:unix_stream_socket { accept append bind connect create getattr getopt ioctl listen lock read setattr setopt shutdown write };
allow rustdesk_t rsync_exec_t:file ioctl;
allow rustdesk_t rsync_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t rustdesk_exec_t:file { entrypoint execute ioctl lock map open read };
allow rustdesk_t rustdesk_t:association sendto;
allow rustdesk_t rustdesk_t:bpf { map_create map_read map_write prog_load prog_run };
allow rustdesk_t rustdesk_t:capability2 { audit_read block_suspend bpf checkpoint_restore epolwakeup perfmon syslog wake_alarm };
allow rustdesk_t rustdesk_t:capability { audit_write chown dac_override dac_read_search fowner fsetid ipc_lock ipc_owner kill lease linux_immutable mknod net_admin net_bind_service net_broadcast net_raw setfcap setgid setpcap setuid sys_admin sys_boot sys_chroot sys_nice sys_pacct sys_ptrace sys_rawio sys_resource sys_time sys_tty_config };
allow rustdesk_t rustdesk_t:capability sys_module;
allow rustdesk_t rustdesk_t:cap_userns { audit_control audit_write chown dac_override dac_read_search fowner fsetid ipc_lock ipc_owner kill lease linux_immutable mknod net_admin net_bind_service net_broadcast net_raw setfcap setgid setpcap setuid sys_admin sys_boot sys_chroot sys_module sys_nice sys_pacct sys_ptrace sys_rawio sys_resource sys_time sys_tty_config };
allow rustdesk_t rustdesk_t:dbus send_msg;
allow rustdesk_t rustdesk_t:dir watch;
allow rustdesk_t rustdesk_t:fifo_file { create link rename setattr unlink };
allow rustdesk_t rustdesk_t:fifo_file open;
allow rustdesk_t rustdesk_t:file { append mounton write };
allow rustdesk_t rustdesk_t:key { create read setattr view write };
allow rustdesk_t rustdesk_t:lnk_file { ioctl lock };
allow rustdesk_t rustdesk_t:lockdown { confidentiality integrity };
allow rustdesk_t rustdesk_t:netlink_audit_socket { append bind connect create lock nlmsg_read nlmsg_relay nlmsg_tty_audit setattr shutdown };
allow rustdesk_t rustdesk_t:netlink_kobject_uevent_socket { append bind connect create lock setattr shutdown };
allow rustdesk_t rustdesk_t:netlink_route_socket { append bind connect create lock nlmsg_read nlmsg_write setattr shutdown };   
allow rustdesk_t rustdesk_t:netlink_selinux_socket { append bind connect create lock setattr shutdown };
allow rustdesk_t rustdesk_t:packet_socket { append bind connect create lock setattr shutdown };
allow rustdesk_t rustdesk_t:peer recv;
allow rustdesk_t rustdesk_t:process { fork getcap getsched setcap setexec setfscreate setkeycreate setsockcreate };
allow rustdesk_t rustdesk_t:sem { associate create destroy getattr read setattr unix_read unix_write write };
allow rustdesk_t rustdesk_t:service { disable enable reload start status stop };
allow rustdesk_t rustdesk_t:shm { associate create destroy getattr lock read setattr unix_read unix_write write };
allow rustdesk_t rustdesk_t:system { disable enable halt ipc_info module_load module_request reboot reload start status stop syslog_console syslog_mod syslog_read undefined };
allow rustdesk_t rustdesk_t:unix_stream_socket { connectto recvfrom };
allow rustdesk_t rustdesk_t:user_namespace create;
allow rustdesk_t sblim_domain:dbus send_msg;
allow rustdesk_t security_t:file map;
allow rustdesk_t security_t:security { check_context compute_av compute_create compute_relabel compute_user load_policy };      
allow rustdesk_t selinux_config_t:file { ioctl lock open read };
allow rustdesk_t selinux_config_t:lnk_file read;
allow rustdesk_t selinux_login_config_t:file { ioctl lock open read };
allow rustdesk_t selinux_login_config_t:lnk_file read;
allow rustdesk_t semanage_store_t:file { ioctl lock open read };
allow rustdesk_t semanage_store_t:lnk_file read;
allow rustdesk_t session_dbusd_tmp_t:dir { add_name create link remove_name rename reparent rmdir setattr unlink watch_reads write };
allow rustdesk_t shell_exec_t:file entrypoint;
allow rustdesk_t smbcontrol_t:dbus send_msg;
allow rustdesk_t smokeping_cgi_script_t:dbus send_msg;
allow rustdesk_t spc_t:dbus send_msg;
allow rustdesk_t speech_dispatcher_t:dbus send_msg;
allow rustdesk_t spoolfile:sock_file { create open setattr unlink };
allow rustdesk_t sshd_exec_t:file ioctl;
allow rustdesk_t sshd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t ssh_keysign_t:dbus send_msg;
allow rustdesk_t sslh_t:dbus send_msg;
allow rustdesk_t sssd_var_lib_t:sock_file { create setattr unlink };
allow rustdesk_t staff_t:fd use;
allow rustdesk_t stratisd_data_t:lnk_file read;
allow rustdesk_t stunnel_exec_t:file ioctl;
allow rustdesk_t stunnel_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t sulogin_exec_t:file ioctl;
allow rustdesk_t sulogin_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t svc_start_exec_t:file ioctl;
allow rustdesk_t svc_start_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t svirt_file_type:chr_file { append create ioctl link lock open read rename setattr unlink write };
allow rustdesk_t svirt_file_type:dir { add_name create link remove_name rename reparent rmdir setattr unlink watch_reads write };
allow rustdesk_t svirt_file_type:fifo_file { append create ioctl link lock open read rename setattr unlink write };
allow rustdesk_t svirt_file_type:file { append create ioctl link lock open read rename setattr unlink watch_reads write };      
allow rustdesk_t svirt_file_type:lnk_file { append create ioctl link lock read rename setattr unlink watch_reads write };       
allow rustdesk_t svirt_sandbox_domain:process transition;
allow rustdesk_t svirt_sandbox_domain:unix_dgram_socket sendto;
allow rustdesk_t svirt_tcg_t:dbus send_msg;
allow rustdesk_t svirt_t:dbus send_msg;
allow rustdesk_t swat_exec_t:file { execute ioctl map open read };
allow rustdesk_t swat_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t swat_t:process transition;
allow rustdesk_t swat_t:unix_stream_socket { accept append bind connect create getattr getopt ioctl listen lock read setattr setopt shutdown write };
allow rustdesk_t sysctl_kernel_t:file mounton;
allow rustdesk_t sysctl_type:dir { getattr ioctl lock mounton open read search };
allow rustdesk_t sysctl_type:file { append getattr ioctl lock open read setattr write };
allow rustdesk_t sysfs_t:dir { add_name create link remove_name rename reparent rmdir setattr unlink watch_reads };
allow rustdesk_t sysfs_t:dir { create link rename reparent rmdir setattr unlink watch_reads };
allow rustdesk_t sysfs_t:file { append create ioctl link lock open read rename setattr unlink watch_reads write };
allow rustdesk_t sysfs_t:lnk_file { append create ioctl link lock read rename setattr unlink watch_reads write };
allow rustdesk_t syslogd_t:netlink_audit_socket { append bind connect create getattr getopt ioctl lock nlmsg_read nlmsg_write read setattr setopt shutdown write };
allow rustdesk_t syslogd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_bootchart_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t system_dbusd_t:dbus acquire_svc;
allow rustdesk_t system_dbusd_var_run_t:sock_file { read watch };
allow rustdesk_t systemd_coredump_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_gpt_generator_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_home_t:dir { add_name create link remove_name rename reparent rmdir setattr unlink watch_reads write };
allow rustdesk_t systemd_home_t:file { append create ioctl link lock open read rename setattr unlink watch_reads write };       
allow rustdesk_t systemd_home_t:lnk_file { append create ioctl link lock read rename setattr unlink watch_reads write };        
allow rustdesk_t systemd_hostnamed_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_hwdb_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_importd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_initctl_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_journal_upload_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_localed_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_logger_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_logger_t:unix_stream_socket connectto;
allow rustdesk_t systemd_logind_inhibit_var_run_t:dir mounton;
allow rustdesk_t systemd_logind_inhibit_var_run_t:fifo_file write;
allow rustdesk_t systemd_logind_sessions_t:dir mounton;
allow rustdesk_t systemd_logind_sessions_t:fifo_file write;
allow rustdesk_t systemd_logind_t:fd use;
allow rustdesk_t systemd_logind_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_logind_t:system status;
allow rustdesk_t systemd_logind_var_run_t:dir mounton;
allow rustdesk_t systemd_logind_var_run_t:file { append create link rename setattr watch_reads write };
allow rustdesk_t systemd_machined_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_modules_load_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_mount_directory:dir { create mounton };
allow rustdesk_t systemd_networkd_exec_t:file map;
allow rustdesk_t systemd_networkd_t:netlink_route_socket { append bind connect create getattr getopt ioctl lock nlmsg_read nlmsg_write read setattr setopt shutdown write };
allow rustdesk_t systemd_networkd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_network_generator_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_notify_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_passwd_agent_exec_t:file { execute ioctl lock map open read };
allow rustdesk_t systemd_passwd_agent_exec_t:file { ioctl lock };
allow rustdesk_t systemd_passwd_agent_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_passwd_var_run_t:fifo_file { append ioctl link lock read rename setattr write };
allow rustdesk_t systemd_passwd_var_run_t:file { append create link rename setattr watch_reads write };
allow rustdesk_t systemd_passwd_var_run_t:sock_file { ioctl link lock read rename };
allow rustdesk_t systemd_private_tmp_type:dir { remove_name rmdir write };
allow rustdesk_t systemd_private_tmp_type:fifo_file unlink;
allow rustdesk_t systemd_private_tmp_type:file unlink;
allow rustdesk_t systemd_private_tmp_type:lnk_file unlink;
allow rustdesk_t systemd_private_tmp_type:sock_file unlink;
allow rustdesk_t systemd_pstore_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_resolved_exec_t:file map;
allow rustdesk_t systemd_resolved_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_rfkill_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_rfkill_var_lib_t:dir { add_name create link mounton remove_name rename reparent rmdir setattr unlink watch_reads write };
allow rustdesk_t systemd_sleep_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_socket_proxyd_t:unix_stream_socket connectto;
allow rustdesk_t systemd_sysctl_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_systemctl_exec_t:file { execute execute_no_trans ioctl lock map open read };
allow rustdesk_t systemd_timedated_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_timedated_var_lib_t:dir { add_name create link mounton remove_name rename reparent rmdir setattr unlink watch_reads write };
allow rustdesk_t systemd_timedated_var_lib_t:lnk_file read;
allow rustdesk_t systemd_tmpfiles_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemd_unit_file_type:dir { add_name create link remove_name rename reparent rmdir setattr unlink watch_reads write };
allow rustdesk_t systemd_unit_file_type:file { append create ioctl link lock open read rename setattr unlink watch_reads write };
allow rustdesk_t systemd_unit_file_type:lnk_file { append create ioctl link lock read rename setattr unlink watch_reads write };
allow rustdesk_t systemd_unit_file_type:service { disable enable reload start status stop };
allow rustdesk_t systemd_userdbd_runtime_t:lnk_file { append create ioctl link lock rename setattr unlink watch_reads write };  
allow rustdesk_t systemd_userdbd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t systemprocess:process { dyntransition siginh };
allow rustdesk_t systemprocess:unix_dgram_socket { append bind connect create getattr getopt ioctl lock read setattr setopt shutdown write };
allow rustdesk_t systemprocess:unix_stream_socket { accept append bind connect create getattr getopt ioctl listen lock read setattr setopt shutdown write };
allow rustdesk_t tangd_db_t:file { ioctl lock open read };
allow rustdesk_t tangd_t:dbus send_msg;
allow rustdesk_t targetclid_t:dbus send_msg;
allow rustdesk_t tcpd_exec_t:file { execute ioctl map open read };
allow rustdesk_t tcpd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t tcpd_t:process transition;
allow rustdesk_t tcpd_t:tcp_socket { accept append bind connect create getattr getopt ioctl listen lock read setattr setopt shutdown write };
allow rustdesk_t tcpd_t:unix_stream_socket { accept append bind connect create getattr getopt ioctl listen lock read setattr setopt shutdown write };
allow rustdesk_t telnetd_exec_t:file ioctl;
allow rustdesk_t telnetd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t tftpd_exec_t:file ioctl;
allow rustdesk_t tftpd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t thin_domain:dbus send_msg;
allow rustdesk_t thumb_t:dbus send_msg;
allow rustdesk_t timedatex_t:dbus send_msg;
allow rustdesk_t tlp_t:dbus send_msg;
allow rustdesk_t tmpfs_t:chr_file { append create ioctl link lock open read rename setattr unlink write };
allow rustdesk_t tmpfs_t:dir { create link rename reparent rmdir setattr unlink watch_reads };
allow rustdesk_t tmpfs_t:file { append create execute execute_no_trans ioctl link lock map open read rename setattr unlink watch_reads write };
allow rustdesk_t tmpfs_t:lnk_file { append create ioctl link lock read rename setattr unlink watch_reads write };
allow rustdesk_t tmpfs_t:sock_file { append create ioctl link lock open read rename setattr unlink write };
allow rustdesk_t tmpreaper_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t tmp_t:dir { create link rename reparent rmdir setattr unlink watch_reads };
allow rustdesk_t tmp_t:fifo_file unlink;
allow rustdesk_t tmp_t:sock_file unlink;
allow rustdesk_t tpm_device_t:chr_file { append ioctl lock open read write };
allow rustdesk_t tty_device_t:chr_file { append ioctl lock open read watch watch_reads write };
allow rustdesk_t ttynode:chr_file { append ioctl lock read write };
allow rustdesk_t udev_rules_t:dir { add_name remove_name write };
allow rustdesk_t udev_rules_t:file { append create ioctl link lock open read rename setattr unlink watch_reads write };
allow rustdesk_t udev_t:netlink_kobject_uevent_socket { append bind connect create getattr getopt ioctl lock read setattr setopt shutdown write };
allow rustdesk_t unconfined_service_t:fifo_file { append getattr ioctl lock open write };
allow rustdesk_t unconfined_service_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t unconfined_service_t:process { siginh transition };
allow rustdesk_t unconfined_service_t:tcp_socket { accept append bind connect create getattr getopt ioctl listen lock read setattr setopt shutdown write };
allow rustdesk_t unconfined_service_t:udp_socket { append bind connect create getattr getopt ioctl lock read setattr setopt shutdown write };
allow rustdesk_t unconfined_service_t:unix_dgram_socket { append bind connect create getattr getopt ioctl lock read setattr setopt shutdown write };
allow rustdesk_t unconfined_service_t:unix_stream_socket { accept append bind connect create getattr getopt ioctl listen lock read setattr setopt shutdown write };
allow rustdesk_t unlabeled_t:file { ioctl lock open read };
allow rustdesk_t unlabeled_t:lnk_file read;
allow rustdesk_t updpwd_exec_t:file { execute ioctl map open read };
allow rustdesk_t updpwd_t:process transition;
allow rustdesk_t urandom_device_t:chr_file { append write };
allow rustdesk_t usbtty_device_t:chr_file { append ioctl lock open read write };
allow rustdesk_t user_devpts_t:chr_file { watch watch_reads };
allow rustdesk_t userdomain:fifo_file { append getattr ioctl lock read write };
allow rustdesk_t userdomain:unix_stream_socket { append bind connect connectto getattr getopt ioctl lock read setattr setopt shutdown write };
allow rustdesk_t userdomain:unix_stream_socket connectto;
allow rustdesk_t user_home_dir_t:lnk_file read;
allow rustdesk_t user_home_t:file unlink;
allow rustdesk_t user_t:fd use;
allow rustdesk_t user_tmp_t:dir { add_name create link remove_name rename reparent rmdir setattr unlink watch_reads write };    
allow rustdesk_t user_tmp_t:dir { create link rename reparent rmdir setattr unlink watch_reads };
allow rustdesk_t user_tmp_t:sock_file { append create ioctl link lock open read rename setattr unlink write };
allow rustdesk_t user_tty_device_t:chr_file { open watch watch_reads };
allow rustdesk_t usr_t:dir { add_name remove_name write };
allow rustdesk_t uucpd_exec_t:file ioctl;
allow rustdesk_t uucpd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t uuidd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t uuidd_var_run_t:fifo_file { append ioctl link lock read rename setattr write };
allow rustdesk_t uuidd_var_run_t:lnk_file { append create ioctl link lock rename setattr unlink watch_reads write };
allow rustdesk_t uuidd_var_run_t:sock_file { ioctl link lock read rename };
allow rustdesk_t var_lib_nfs_t:file { append create ioctl link lock open read rename setattr unlink watch_reads write };        
allow rustdesk_t var_lib_t:dir { add_name create remove_name setattr write };
allow rustdesk_t var_lib_t:dir { create setattr };
allow rustdesk_t var_lib_t:file { append create ioctl link lock open read rename setattr unlink watch_reads write };
allow rustdesk_t var_lib_t:lnk_file { create read write };
allow rustdesk_t var_log_t:dir { add_name create remove_name setattr write };
allow rustdesk_t var_log_t:dir { create setattr };
allow rustdesk_t var_log_t:file { append create ioctl link lock map open read rename setattr unlink watch_reads write };        
allow rustdesk_t var_log_t:file { create link map open read rename setattr unlink watch_reads write };
allow rustdesk_t var_log_t:lnk_file { append create ioctl link lock read rename setattr unlink watch_reads write };
allow rustdesk_t var_run_t:file { append execute execute_no_trans write };
allow rustdesk_t var_run_t:lnk_file unlink;
allow rustdesk_t var_spool_t:dir { add_name remove_name write };
allow rustdesk_t var_t:dir { add_name create remove_name setattr write };
allow rustdesk_t var_t:dir { create setattr };
allow rustdesk_t var_t:lnk_file { append create ioctl link lock rename setattr unlink watch_reads write };
allow rustdesk_t virsh_t:dbus send_msg;
allow rustdesk_t virtd_t:unix_stream_socket connectto;
allow rustdesk_t virt_etc_rw_t:file { ioctl lock open read };
allow rustdesk_t virt_etc_rw_t:lnk_file read;
allow rustdesk_t virtio_device_t:chr_file { append ioctl lock open read write };
allow rustdesk_t vnstatd_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t watchdog_device_t:chr_file { append ioctl lock open write };
allow rustdesk_t watchdog_t:dbus send_msg;
allow rustdesk_t wireguard_t:dbus send_msg;
allow rustdesk_t wireless_device_t:chr_file { append ioctl lock open read write };
allow rustdesk_t wtmp_t:file { append ioctl lock open read write };
allow rustdesk_t wtmp_t:file { open read write };
allow rustdesk_t xdm_exec_t:file ioctl;
allow rustdesk_t xdm_t:process2 { nnp_transition nosuid_transition };
allow rustdesk_t xdm_var_lib_t:file { ioctl lock open read };
allow rustdesk_t xdm_var_lib_t:lnk_file read;
allow rustdesk_t xenconsoled_t:dbus send_msg;
allow rustdesk_t xend_t:dbus send_msg;
allow rustdesk_t xguest_t:dbus send_msg;
allow rustdesk_t xserver_port_t:tcp_socket name_connect;
allow rustdesk_t xserver_t:tcp_socket { accept append bind connect create getattr getopt ioctl listen lock read setattr setopt shutdown write };
allow rustdesk_t xserver_t:unix_stream_socket connectto;


```

rustdesk.fc:

```text

/usr/bin/rustdesk --  gen_context(system_u:object_r:rustdesk_exec_t,s0)
```

rustdesk.if:

```text

## <summary>RustDesk</summary>
```

Makefile:

```makefile

TARGET?=rustdesk
MODULES?=${TARGET:=.pp.bz2}
SHAREDIR?=/usr/share
SELINUXTYPE?=targeted

all: ${TARGET:=.pp.bz2}

%.pp.bz2: %.pp
	@echo Compressing $^ -\> $@
	bzip2 -9 $^

%.pp: %.te
	make -f ${SHAREDIR}/selinux/devel/Makefile $@

clean:
	rm -f *~  *.tc *.pp *.pp.bz2
	rm -rf tmp *.tar.gz

man: install-policy
	sepolicy manpage --path . --domain ${TARGET}_t

install-policy: all
	semodule -i ${TARGET}.pp.bz2

install: man
	install -D -m 644 ${TARGET}.pp.bz2 ${DESTDIR}${SHAREDIR}/selinux/packages/${SELINUXTYPE}/${TARGET}.pp.bz2
	install -D -m 644 ${TARGET}_selinux.8 ${DESTDIR}${SHAREDIR}/man/man8/

```

#### Enable Directly

View the security context of rustdesk before modification:

```sh
$ ls -lZ /usr/lib/rustdesk/rustdesk
-rwxr-xr-x. 1 root root system_u:object_r:lib_t:s0 25456 Oct  8 19:58 /usr/lib/rustdesk/rustdesk
$ ps -eZ | grep rustdesk
system_u:system_r:init_t:s0       80439 ?        00:00:02 rustdesk
```

Run:

```sh

$ cd rustdesk-selinux-1.0
$ make
$ sudo make install-policy
$ semodule -l | grep rustdesk
rustdesk
$ sudo chcon -t rustdesk_exec_t /usr/bin/rustdesk
$ sudo systemctl restart rustdesk

```

View the security context again:

```sh
$ ls -lZ /usr/lib/rustdesk/rustdesk
-rwxr-xr-x. 1 root root system_u:object_r:rustdesk_exec_t:s0 25456 Oct  8 19:58 /usr/lib/rustdesk/rustdesk
$ ps -eZ | grep rustdesk
system_u:system_r:rustdesk_t:s0  110565 ?        00:00:00 rustdesk
```

#### Enable through rpm installation

Create new spec file `rustdesk-selinux.spec`:

```sh

%global modulename rustdesk
%global selinuxtype targeted

Name:			     rustdesk-selinux
Version:		     1.0
Release:		     1%{?dist}
License:		     AGPL-3.0
Summary:             RustDesk SELinux policy
BuildArch:           noarch
Requires:            selinux-policy-%{selinuxtype}
Requires(post):      selinux-policy-%{selinuxtype}
BuildRequires:       selinux-policy-devel

Source0:			%{name}-%{version}.tar.gz

%description
Custom SELinux policy module

%prep
%setup -q

%build
make


%install
install -D -m 0644 %{modulename}.pp.bz2 %{buildroot}%{_datadir}/selinux/packages/%{selinuxtype}/%{modulename}.pp.bz2
install -D -p -m 0644 %{modulename}.if %{buildroot}%{_datadir}/selinux/devel/include/distributed/%{modulename}.if


# SELinux contexts are saved so that only affected files can be
# relabeled after the policy module installation
%pre
%selinux_relabel_pre -s %{selinuxtype}

%post
semodule -d %{modulename} &> /dev/null || true
%selinux_modules_install -s %{selinuxtype} %{_datadir}/selinux/packages/%{selinuxtype}/%{modulename}.pp.bz2
%selinux_relabel_post -s %{selinuxtype}
chcon -t rustdesk_exec_t /usr/bin/rustdesk

if [ "$1" -le "1" ]; then # First install
   # the daemon needs to be restarted for the custom label to be applied
   %systemd_postun_with_restart %{modulename}.service
fi

%postun
if [ $1 -eq 0 ]; then
    %selinux_modules_uninstall -s %{selinuxtype} %{modulename}
    semodule -e %{modulename} &> /dev/null || true
    %selinux_relabel_post -s %{selinuxtype}
fi

%posttrans
%selinux_relabel_post -s %{selinuxtype}

%files
%{_datadir}/selinux/packages/%{selinuxtype}/%{modulename}.pp.*
%{_datadir}/selinux/devel/include/distributed/%{modulename}.if
%ghost %verify(not md5 size mode mtime) %{_sharedstatedir}/selinux/%{selinuxtype}/active/modules/200/%{modulename}

%changelog
* Mon Oct 16 2023 test <test@rustdesk.com> - 0.1.0-1
- First Build


```

Run:

```sh

$ sudo dnf install rpm-build
$ tar -zcf rustdesk-selinux-1.0.tar.gz rustdesk-selinux-1.0
$ mkdir -p ~/rpmbuild/SOURCES && mv rustdesk-selinux-1.0.tar.gz ~/rpmbuild/SOURCES/
$ rpmbuild -ba rustdesk-selinux.spec

```

After the packaging is completed, execute the installation rpm.

## Troubleshooting

### Iteratively Add Policies

```sh
$ cd /tmp
$ grep rustdesk_t /var/log/audit/audit.log | audit2allow -a -M rustdesk_tmp
$ cd <rustdesk-selinux-1.0>
$ # merge rustdesk_tmp.te to rustdesk.te
$ make clean && make && sudo make install-policy
```

## References

1. [SELinux/Tutorials](https://wiki.gentoo.org/wiki/SELinux/Tutorials)
1. [SELinux_Policy_module_installation](https://fedoraproject.org/wiki/SELinux/IndependentPolicy#SELinux_Policy_module_installation)
1. [how-to-create-selinux-custom-policy-rpm-package](https://lukas-vrabec.com/index.php/2015/07/07/how-to-create-selinux-custom-policy-rpm-package/)
