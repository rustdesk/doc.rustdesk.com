---
title: Linux 
weight: 4
---

### 安装

#### Ubuntu (>= 16)

```bash
# 请忽略磁盘错误使用报告
sudo apt install -fy ./rustdesk-<version>.deb
```

#### CentOS/Fedora (>= 18)

```sh
sudo yum localinstall ./rustdesk-<version>.rpm
```

#### Arch/Manjaro

```sh
sudo pacman -U ./rustdesk-<version>.pkg.tar.zst
```

#### openSUSE (>= Leap 15.0 或 Tumbleweed)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<version>-suse.rpm
```

### ~~需要 X11~~

~~RustDesk 尚未支持 Wayland; 您需要手动切换到 X11。~~

RustDesk 从 1.2.0 版本开始实验性支持 Wayland。
