---
title: SELinux
weight: 100
---

一部のディストリビューション（Fedoraなど）では、SELinuxがデフォルトで有効になっており、RustDeskサービスが正常に開始・実行できなくなります。

ターミナルで `sestatus` を実行して、SELinuxが有効になっているかどうかを確認できます。

有効かどうかによって、以下のような2つの異なる出力が表示されます：

```sh
# 有効
SELinux status: enabled
...

# 無効
SELinux status: disabled
...
```

### SELinuxポリシーの追加

SELinuxの紹介については、[SELinux/Tutorials](https://wiki.gentoo.org/wiki/SELinux/Tutorials)を参照してください。

ここでは、Fedora 38を例にSELinuxポリシーを追加する方法を紹介します。

```sh
sudo dnf install selinux-policy-devel make
```

SELinuxポリシーを追加するには、プロセスのセキュリティコンテキストにあるサービスの種類を決定する必要があります。

```sh
$ ps -eZ | grep rustdesk
system_u:system_r:init_t:s0 80439 ? 00:00:02 rustdesk
```

`system_u:system_r:init_t:s0` は RustDeskプロセスのセキュリティコンテキストで、3番目のフィールド `init_t` がプロセスの種類です。

SELinux型ルールを記述する方法は2つあります：

1. デフォルトの `init_t` にルールを追加する。
2. 新しい型 `rustdesk_t` を追加してルールを追加する。

最初の方法は比較的小さな変更ですが、デフォルトの `init_t` が変更されるため、`init_t` 型を使用する他のサービスに認可を追加することと同等です。**使用は推奨されません。**

2番目の方法は、ゼロからルールを追加することです。追加する必要があるルールが多く、異なるシステムでは違いがある可能性があります。実際の使用中にいくつかの調整が必要になる場合があります。

#### デフォルト型の使用

RustDeskサービスのデフォルト型は `init_t` で、これは[SELinuxのコンテキスト継承ルール](https://wiki.gentoo.org/wiki/SELinux/Tutorials/How_does_a_process_get_into_a_certain_context)によって決定されます。

**注意**：デフォルト型を変更すると、他のサービスのポリシーも変更される可能性があります。この方法は慎重に使用してください！

ルールファイル `rustdesk.te` を編集します：

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

実行：

```sh
$ checkmodule -M -m -o rustdesk.mod rustdesk.te && semodule_package -o rustdesk.pp -m rustdesk.mod && sudo semodule -i rustdesk.pp
$ sudo semodule -l | grep rustdesk
```

#### 型 `rustdesk_t` の作成

1. 新しいディレクトリを作成：`mkdir rustdesk-selinux-1.0`。
2. SELinuxポリシーファイルを作成：`touch Makefile rustdesk.te rustdesk.fc rustdesk.if`。

```text
.
├── Makefile
├── rustdesk.fc
├── rustdesk.if
└── rustdesk.te
```

`rustdesk.te` はメインのポリシーファイルです。
この例では、このファイルは主に3つの部分から構成されています：

1. GitHubのselinux-policyリポジトリの[`init.te`](https://github.com/fedora-selinux/selinux-policy/blob/rawhide/policy/modules/system/init.te)。
2. 監査ログ、`grep rustdesk /var/log/audit/audit.log | audit2allow -a -M test`。
3. テストシステムの `init_t` ポリシー、`sesearch -A | grep 'allow init_t ' | sed 's/allow init_t /allow rustdesk_t /g'`。

一部のポリシーは重複しており、一部は冗長ですが、`rustdesk_t` で動作するため問題ありません。

**SELinuxポリシーファイルの複雑さと詳細な技術的内容のため、簡潔性のため完全な技術設定内容はここでは省略されています。完全な設定については英語版を参照してください。**

### SELinuxポリシーの自動生成（sepolicy）

```sh
$ # 依存関係をインストール
$ sudo dnf install -y rpm rpm-build binutils
$ # ポリシーを生成
$ sepolicy generate --init /usr/lib/rustdesk/rustdesk
$ tree
.
├── rustdesk.fc
├── rustdesk.if
├── rustdesk_selinux.spec
├── rustdesk.sh
└── rustdesk.te
$ # rustdesk.teを編集
$
$
$ # rpmパッケージrustdesk_selinux-1.0-1.fc38.src.rpmを生成
$ sudo ./rustdesk.sh
$ # パッケージをインストール
$ sudo dnf install -y rustdesk_selinux-1.0-1.fc38.src.rpm
$ # サービスを再起動
$ sudo systemctl restart rustdesk
```

#### 反復的なポリシーの追加

```sh
$ cd /tmp
$ grep rustdesk_t /var/log/audit/audit.log | audit2allow -a -M rustdesk_tmp
$ cd <rustdesk-selinux-1.0>
$ # rustdesk_tmp.teをrustdesk.teにマージ
$ make clean && make && sudo make install-policy
```

### 参考文献

- [SELinux/Tutorials](https://wiki.gentoo.org/wiki/SELinux/Tutorials)
- [SELinux Policy module installation](https://fedoraproject.org/wiki/SELinux/IndependentPolicy#SELinux_Policy_module_installation)
- [How to create SELinux custom policy rpm package](https://lukas-vrabec.com/index.php/2015/07/07/how-to-create-selinux-custom-policy-rpm-package/)