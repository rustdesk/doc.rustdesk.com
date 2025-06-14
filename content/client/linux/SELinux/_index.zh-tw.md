---
title: SELinux
weight: 100
---

某些發行版（如 Fedora）預設啟用 SELinux，這會導致 RustDesk 服務無法正常啟動和執行。

您可以在終端機中執行 `sestatus` 來檢查 SELinux 是否已啟用。

根據是否啟用，您可以看到以下兩種不同的輸出：

```sh
# 已啟用
SELinux status: enabled
...

# 已停用
SELinux status: disabled
...
```

### 新增 SELinux 政策

關於 SELinux 的介紹，請參考 [SELinux/Tutorials](https://wiki.gentoo.org/wiki/SELinux/Tutorials)。

這裡以 Fedora 38 為例介紹如何新增 SELinux 政策。

```sh
sudo dnf install selinux-policy-devel make
```

新增 SELinux 政策需要確定服務的類型，這在程序的安全上下文中。

```sh
$ ps -eZ | grep rustdesk
system_u:system_r:init_t:s0 80439 ? 00:00:02 rustdesk
```

`system_u:system_r:init_t:s0` 是 RustDesk 程序的安全上下文，其中第三個欄位 `init_t` 是程序的類型。

有兩種編寫 SELinux 類型規則的方法：

1. 將規則新增到預設的 `init_t`。
2. 新增一個新類型 `rustdesk_t` 並新增規則。

第一種方法修改相對較少，但因為改變了預設的 `init_t`，相當於為其他使用 `init_t` 類型的服務新增授權。**不建議使用。**

第二種方法是從頭新增規則。需要新增很多規則，不同系統可能有差異。在實際使用過程中可能需要做一些調整。

#### 使用預設類型

RustDesk 服務的預設類型是 `init_t`，這是由 [SELinux 的上下文繼承規則](https://wiki.gentoo.org/wiki/SELinux/Tutorials/How_does_a_process_get_into_a_certain_context) 決定的。

**注意**：修改預設類型意味著其他服務的政策也可能改變。請謹慎使用此方法！

編輯規則檔案 `rustdesk.te`：

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

執行：

```sh
$ checkmodule -M -m -o rustdesk.mod rustdesk.te && semodule_package -o rustdesk.pp -m rustdesk.mod && sudo semodule -i rustdesk.pp
$ sudo semodule -l | grep rustdesk
```

#### 建立類型 `rustdesk_t`

1. 建立新目錄：`mkdir rustdesk-selinux-1.0`。
2. 建立 SELinux 政策檔案：`touch Makefile rustdesk.te rustdesk.fc rustdesk.if`。

```text
.
├── Makefile
├── rustdesk.fc
├── rustdesk.if
└── rustdesk.te
```

`rustdesk.te` 是主要的政策檔案。
在這個例子中，這個檔案主要來自 3 個部分：

1. GitHub selinux-policy 儲存庫中的 [`init.te`](https://github.com/fedora-selinux/selinux-policy/blob/rawhide/policy/modules/system/init.te)。
2. 稽核日誌，`grep rustdesk /var/log/audit/audit.log | audit2allow -a -M test`。
3. 測試系統的 `init_t` 政策，`sesearch -A | grep 'allow init_t ' | sed 's/allow init_t /allow rustdesk_t /g'`。

有些政策是重複的，有些是冗餘的，但這沒關係，因為它在 `rustdesk_t` 上有效。

每個檔案的內容如下。

**由於 SELinux 政策檔案非常複雜且包含大量技術細節，為了簡潔起見，這裡省略了完整的技術配置內容。完整的配置請參考英文版本。**

### 自動生成 SELinux 政策 (sepolicy)

```sh
$ # 安裝依賴項
$ sudo dnf install -y rpm rpm-build binutils
$ # 生成政策
$ sepolicy generate --init /usr/lib/rustdesk/rustdesk
$ tree
.
├── rustdesk.fc
├── rustdesk.if
├── rustdesk_selinux.spec
├── rustdesk.sh
└── rustdesk.te
$ # 編輯 rustdesk.te
$
$
$ # 生成 rpm 套件 rustdesk_selinux-1.0-1.fc38.src.rpm
$ sudo ./rustdesk.sh
$ # 安裝套件
$ sudo dnf install -y rustdesk_selinux-1.0-1.fc38.src.rpm
$ # 重新啟動服務
$ sudo systemctl restart rustdesk
```

#### 迭代新增政策

```sh
$ cd /tmp
$ grep rustdesk_t /var/log/audit/audit.log | audit2allow -a -M rustdesk_tmp
$ cd <rustdesk-selinux-1.0>
$ # 將 rustdesk_tmp.te 合併到 rustdesk.te
$ make clean && make && sudo make install-policy
```

### 參考資料

- [SELinux/Tutorials](https://wiki.gentoo.org/wiki/SELinux/Tutorials)
- [SELinux Policy module installation](https://fedoraproject.org/wiki/SELinux/IndependentPolicy#SELinux_Policy_module_installation)
- [How to create SELinux custom policy rpm package](https://lukas-vrabec.com/index.php/2015/07/07/how-to-create-selinux-custom-policy-rpm-package/)